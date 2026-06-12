# Distributed Async AI Processing Architecture

**Prepared By:** Principal Distributed Systems Architect  
**Date:** June 7, 2026  
**Scope:** Production-Grade Asynchronous AI Engine (Redis, BullMQ, PostgreSQL, Prisma, Gemini)

---

## 1. Executive Summary

Executing generative AI requests synchronously within an API request lifecycle is an anti-pattern that leads to `504 Gateway Timeouts`, exhausted database connection pools, and massive user friction. 

To achieve our target scale (100,000+ AI Jobs Daily), we must decouple the API request from the AI execution. This architecture defines a globally resilient asynchronous processing topology where the Express API acts purely as a fast ingest layer (responding with `202 Accepted`), heavily buffered by **Redis + BullMQ**, and executed by highly concurrent worker fleets.

---

## 2. Queue Architecture (BullMQ + Redis)

We deploy a partitioned queue strategy to prevent "noisy neighbor" problems and separate fast, high-volume tasks from slow, complex tasks.

### Queue Definitions
*   **`ai:fast:flash`**: High-priority, low-latency queues processing tasks via `gemini-1.5-flash` (e.g., intent classification, short icebreakers).
*   **`ai:heavy:pro`**: Deep reasoning queues using `gemini-1.5-pro` (e.g., full account research, multi-variable lead scoring). Target concurrency is strictly limited to prevent rate limiting.
*   **`ai:batch:import`**: Background jobs for chunking large CSV uploads and spawning individual lead research jobs.

### Redis Configuration
*   **Deployment:** Redis Cluster (or AWS ElastiCache) in High Availability mode (Primary + Replica).
*   **Eviction Policy:** `noeviction` (Critical: Queue data must never be automatically evicted).
*   **Memory Management:** BullMQ `removeOnComplete` and `removeOnFail` constraints are strictly enforced to prevent Redis Out-Of-Memory (OOM) crashes.

---

## 3. Worker Architecture

Workers are stateless, decoupled Docker containers scaled horizontally based on queue depth metrics.

*   **Concurrency Model:** Because AI generation is I/O-bound (waiting on Google's servers), Node.js workers can support high concurrency. Target: **50 concurrent jobs per worker container**.
*   **Connection Multiplexing:** 50 concurrent jobs across 20 worker containers equals 1,000 active database operations. Prisma natively opens a connection per query. **PgBouncer** is strictly required in transaction mode to prevent PostgreSQL connection exhaustion.
*   **Graceful Shutdown:** Workers listen for `SIGTERM` (during deployment/scaling). BullMQ's `worker.close()` is awaited to ensure active Gemini jobs complete or are gracefully returned to the queue before the pod terminates.

---

## 4. Retry Strategy & Backoff Implementation

Errors interacting with the Gemini API are inevitable (e.g., network drops, quota exhaustion).

*   **429 Too Many Requests:** Indicates AI tier saturation. 
    *   *Action:* Exponential backoff. Retry in 10s, 30s, 90s, up to 5 attempts.
*   **5xx Internal Server Errors (Google):** Google API outages. 
    *   *Action:* Linear backoff. Retry in 60s, up to 10 attempts.
*   **400 Bad Request / Token Limits:** User prompt is malformed or exceeds standard context windows.
    *   *Action:* Do **not** retry. Immediately fail the job and route to the Dead Letter Queue.

**BullMQ Configuration:**
```typescript
{
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 10000 // 10 seconds, 100s, 1000s...
  }
}
```

---

## 5. Dead Letter Queue (DLQ) & Failure Remediation

Jobs that exhaust all retry attempts represent systemic failures requiring intervention.

*   **DLQ Mechanism:** BullMQ automatically shifts exhausted jobs to the `failed` set. We deploy a specialized background cron worker that drains the `failed` set every 15 minutes and writes permanently failed jobs to the PostgreSQL `DeadLetterJob` table.
*   **Remediation UI:** The Admin console allows Support Engineers to query the `DeadLetterJob` table, view the exact stack trace (e.g., "Prompt safety filter triggered"), adjust the input payload, and press "Replay Job", which injects it back into the BullMQ pipeline.
*   **Credit Refund:** If a job hits the DLQ, an atomic database transaction refunds the AI Credits to the user's workspace ledger.

---

## 6. Idempotency Strategy (Exactly-Once Semantics)

Network partitions may cause BullMQ to deliver a job twice, or a worker to crash *after* Gemini returns a result but *before* Prisma saves it to Postgres. We must guarantee users are not double-charged credits.

### The Idempotency Key
Every job receives a deterministic UUID upon API ingest: `UUIDv5(TenantId + ActionType + TargetId)`.

### Execution Flow
1. Worker receives job.
2. Prisma queries: `SELECT status FROM AiJob WHERE id = idempotency_key`. 
3. If `status == 'COMPLETED'`, the worker immediately returns success without invoking Gemini.
4. If `status == 'PENDING'`, the worker calls `UPDATE AiJob SET status = 'PROCESSING'` utilizing row-level database locks (`SELECT FOR UPDATE`).
5. Invokes Gemini API.
6. Saves result atomically inside a single Prisma `$transaction`:
   - `UPDATE AiJob SET status = 'COMPLETED', result = X`
   - `UPDATE CreditLedger SET balance = balance - 1`

---

## 7. Monitoring Strategy

Visibility into the async pipeline is critical for SLA maintenance.

1.  **Queue Depth (Prometheus):** BullMQ state exporter continuously tracks `waiting`, `active`, `completed`, and `failed` counts per queue.
2.  **Processing Latency (Grafana):** P95 Wait Time (Time in queue) vs. P95 Execution Time (Time waiting on Gemini). If Wait Time spikes but Execution Time is stable, we aggressively scale worker pods.
3.  **Gemini Error Rate:** Alerting threshold set if `Gemini 429 Error Rate > 5%` over 5 minutes, indicating we need to proactively throttle BullsMQ `RateLimiter` definitions.

---

## 8. Database Schema (Prisma)

The structured state machine required to track async jobs persistently.

```prisma
// schema.prisma

enum JobStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}

enum QueueType {
  AI_FLASH
  AI_PRO
  BATCH_IMPORT
}

model AiJob {
  id              String      @id @default(uuid()) // Idempotency key
  tenantId        String
  workspace       Workspace   @relation(fields: [tenantId], references: [id])
  
  queueType       QueueType
  status          JobStatus   @default(PENDING)
  
  // Job Data
  payload         Json        // Initial prompt instructions and inputs
  result          Json?       // The successfully generated output
  errorDetails    String?     // Stack trace or API rejection reason
  
  // Auditing
  attempts        Int         @default(0)
  totalTokens     Int         @default(0)
  startedAt       DateTime?
  completedAt     DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@index([tenantId, status])
  @@index([status, createdAt])
}

model DeadLetterJob {
  id              String      @id @default(uuid())
  originalJobId   String      @unique
  tenantId        String
  payload         Json
  lastError       String
  replayed        Boolean     @default(false)
  createdAt       DateTime    @default(now())
}
```
