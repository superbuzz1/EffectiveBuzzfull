# Performance Engineering Review & Scaling Strategy

**Prepared By:** Principal Performance Engineer
**Date:** June 7, 2026
**Scope:** EffectiveBuzz Multi-Tenant SaaS
**Target Scale:** 
- 10,000 Workspaces
- 100,000 Prospects per Workspace (1 Billion Total Prospects)
- 100,000 AI Jobs / Day
- 1,000,000 Emails / Month

---

## 1. Executive Summary: Capacity Outlook

### Current Capacity (Baseline Architecture)
- **Database:** Single monolithic PostgreSQL instance. Cannot handle 1 Billion rows without heavy partitioning and optimized querying. Will experience severe index bloat and slow `COUNT()` queries.
- **Queue/Workers:** Synchronous jobs would completely paralyze the API. With BullMQ (as designed in the new architecture), the queue can handle 100k jobs/day (~1.15 jobs/sec), but limits will be based on Gemini API quota capabilities, not internal throughput.
- **Express API:** Single Node.js thread can handle ~1,000-2,000 req/sec if purely I/O bound. However, Prisma connection pooling limits and JSON serialization overhead will bottleneck at ~500 concurrent users without horizontal scaling.

### Future Capacity (Target Architecture)
- **Database:** Distributed/Partitioned PostgreSQL (or Citus) handling 1B+ rows across tenant boundaries with sub-50ms query times for indexed lookups.
- **Queue/Workers:** Auto-scaling worker fleet capable of bursting to 1,000 jobs/sec, buffered reliably by Redis, constrained only by LLM costs/quotas.
- **Express API:** Fleet of load-balanced stateless containers, aggressively caching hot paths (like dashboard metrics) in Redis, supporting 10k+ concurrent active users.

---

## 2. Bottlenecks & Scaling Limits

### A. The Prisma + Connection Pool Bottleneck
- **Risk:** Prisma is notorious for heavy memory usage and inefficient connection pooling across multiple horizontal Node.js containers. With 50 API nodes to handle load, you might exhaust PostgreSQL's `max_connections` (typically 100).
- **Limit:** Database Connection Exhaustion.
- **Mitigation:** Deploy PgBouncer as a connection multiplexer between Prisma and PostgreSQL. Switch Prisma to use the `pgBouncer` mode.

### B. The 1 Billion Row Prospect Table
- **Risk:** `10,000 workspaces * 100,000 prospects = 1,000,000,000 rows`. Standard B-Tree indexes on `tenantId` will suffer from slow insert times due to index rebalancing, and vacuuming will lag. Large `OFFSET / LIMIT` pagination will take seconds to execute.
- **Limit:** High I/O wait times and disk throughput saturation on PostgreSQL.
- **Mitigation:** Implement PostgreSQL Table Partitioning by `tenant_id` (Hash partitioning) or range partition by `created_at`. Use Cursor-based pagination (`id > last_seen_id`) exclusively instead of `OFFSET`.

### C. Gemini API Rate Limits & Cost
- **Risk:** Google limits throughput based on tier. 100k jobs/day is entirely feasible, but bursts of 1,000 jobs in a minute might hit `429 Too Many Requests`.
- **Mitigation:** BullMQ strict rate limiters. Implement LLM routing if Gemini fails, failover to Claude 3 Haiku or GPT-4o-mini to maintain system availability.

---

## 3. Database Optimization (PostgreSQL)

1. **Partitioning:** Partition the `Prospect` and `EmailMessage` tables.
2. **Indexing Strategy:** 
   - Composite standard index: `CREATE INDEX idx_prospect_tenant_status ON Prospect(tenant_id, status)`.
   - Use `BRIN` (Block Range Indexes) for time-series heavy tables like `AuditLogs` or `AiJob` where data is naturally ordered by insertion time.
3. **Avoid COUNT(*):** Exact counts on 1B rows are impossible to compute synchronously. Use materialized views or maintained counter tables via triggers for displaying "Total Prospects" in the UI.

---

## 4. Caching Strategy (Redis)

- **Read-Heavy, Write-Infrequent Data:** Workspace configurations, prompt templates, and feature flags must be cached in Redis with a TTL of 1 hour.
- **Aggregated Dashboard Metrics:** Caching analytics queries. Instead of calculating open rates constantly, a background worker updates a Redis Hash `metrics:tenant:{id}:current_month` every 5 minutes.
- **Invalidation:** Cache invalidation policies should trigger on `UPDATE` or `DELETE` events for specific entities in the database services.

---

## 5. Queue Optimization (BullMQ)

- **Redis Memory Management:** Ensure jobs are removed after completion to avoid Redis OOM (Out of Memory) crashes.
   ```typescript
   { removeOnComplete: true, removeOnFail: { age: 24 * 3600 } } // keep failed for 24h
   ```
- **Concurrency vs External I/O:** AI workers handle HTTP requests primarily. Node.js can handle high concurrency for I/O. Set BullMQ worker concurrency to 50-100 per pod to maximize throughput without blocking the event loop.
- **Job Payload Size:** Never put full file contents (e.g., CSV imports) inside the BullMQ payload. Store the file in S3/Postgres, pass the `fileId` to the queue, and let the worker stream it.

---

## 6. API Optimization (Express)

- **JSON Serialization Overhead:** Returning 50,000 rows in a single JSON API response will block the event loop and crash the pod. Stream large datasets or cap page sizes at 100.
- **Compression:** Enable `gzip` or `brotli` in Express or at the Cloudflare edge for JSON heavily populated with redundant text (like list of emails).
- **Stateless Auth:** Continue using JWTs instead of session state to ensure horizontal scaling of API nodes is trivial.

---

## 7. Cost Optimization

- **AI Token Economics:** 
  - 100k jobs/day at an average of ~800 prompt tokens and ~200 completion tokens.
  - Caching identical prompts: Implement a Redis-backed semantic cache or exact-match cache for identical lead research tasks.
- **Database Storage:** 1B rows of standard prospect data will require ~500GB-1TB of SSD storage. Offload old cold data (e.g., failed emails from 2 years ago) to AWS S3 / Glacier, replacing the row with a tombstone entry.
- **Compute Efficiency:** Move background non-AI tasks (like sending webhooks or calculating daily billing) to low-cost Spot Instances or serverless functions, keeping reserved CPU exclusively for API latency and Core AI Workers.

---

## 8. Scaling Roadmap

### Phase 1: High Availability (0 -> 1M Prospects)
- **Goal:** Stabilize current growth.
- **Action:** Move Postgres and Redis to managed services (e.g., AWS RDS / Elasticache) outside of Coolify for automated backups, read-replicas, and point-in-time recovery. Deploy API and Worker containers behind an application load balancer.

### Phase 2: Async Resilience (1M -> 10M Prospects)
- **Goal:** Unblock the API, avoid 504s.
- **Action:** Fully implement the BullMQ architecture. Connect PgBouncer to lower DB connection stress. Optimize React client to heavily utilize stale-while-revalidate (SWR/React Query) and polling mechanisms.

### Phase 3: Distributed Data (10M -> 1B Prospects)
- **Goal:** Handle massive data influx without latency degradation.
- **Action:** Implement Hash Partitioning by `tenantId` in PostgreSQL. Stand up clickhouse or a dedicated Time-Series database purely for Email Tracking and Audit Logs. Enable cross-regional API deployments via Cloudflare Workers to reduce global latency.
