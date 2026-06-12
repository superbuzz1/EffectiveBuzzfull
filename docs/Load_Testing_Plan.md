# EffectiveBuzz: Load Testing & Scalability Validation Strategy

**Prepared By:** Principal Performance Engineer & Site Reliability Engineering (SRE)  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Target Scale:** 10,000 Workspaces | 1,000 Concurrent Users | 100,000 Prospects/Workspace | 100,000 AI Jobs Daily | 1,000,000 Emails Monthly

---

## SECTION 1 — Performance Objectives

To assure enterprise-grade reliability, we define strict Service Level Objectives (SLOs) across all critical paths.

*   **API Latency Targets:** 
    *   P95 response time < 200ms for standard read operations.
    *   P95 response time < 400ms for standard write operations.
    *   All heavy processing (file uploads, AI triggers) must return `202 Accepted` asynchronously under 50ms.
*   **Database Targets:** 
    *   Query execution P95 < 50ms.
    *   Connection pool utilization remaining below 70% during peak load.
*   **Queue Targets:** 
    *   Enqueuing a job takes < 10ms.
    *   Job extraction/start latency < 2 seconds for high-priority queues.
*   **AI Processing Targets:** 
    *   Gemini 1.5 Flash task completion P95 < 3 seconds.
    *   Gemini 1.5 Pro deep research task completion P95 < 15 seconds.
*   **Email Processing Targets:** 
    *   Webhook delivery ingestion < 50ms.
    *   Outbound sync processing capacity > 1,000 emails/minute.

---

## SECTION 2 — Load Test Scenarios

We will utilize `k6` to simulate these critical user journeys scaling up to 1,000 concurrent Virtual Users (VUs) peaking over a 15-minute ramp.

*   **Scenario 1: Authentication:** Simulate burst login events (morning 9 AM spikes). Test JWT generation overhead, bcrypt hashing limits, and Redis session retrieval.
*   **Scenario 2: Prospect Import:** Simulate 50 power users simultaneously uploading 10,000-row CSVs. Test API stream buffering, memory limits, and BullMQ chunking throughput.
*   **Scenario 3: Prospect Search:** Query the 1-Billion-row `Prospect` table with multi-variable filters (Title OR Location AND Revenue). Validate compound index hits.
*   **Scenario 4: Campaign Creation:** Simulate concurrent workspace administrators drafting campaigns, linking sending domains, and validating prospect segments.
*   **Scenario 5: Email Generation:** Push 10,000 template render requests natively through the Node.js event loop to test CPU-bound string manipulation limits.
*   **Scenario 6: AI Research:** Flood the `ai:heavy:pro` queue with 5,000 parallel jobs. Validate worker concurrency and graceful error-handling backpressure via mocked Gemini endpoints.
*   **Scenario 7: Reply Analysis:** Simulate high-velocity inbound email webhooks mapped to the semantic classification worker.
*   **Scenario 8: Stripe Billing:** Test concurrency of the credit reduction ledger and auto-refill triggers via parallel transactions to ensure no race conditions.
*   **Scenario 9: Webhook Processing:** Blast the Resend delivery webhooks at 1,000 req/sec to test payload ingestion efficiency and check for DB update deadlocks.

---

## SECTION 3 — Database Stress Testing

**Review:** PostgreSQL, Prisma, Indexing, Connection Pooling.

*   **Bottlenecks:** 
    *   Prisma's baseline connection behavior (1 connection per concurrent query) exhaust DB limits immediately.
    *   PostgreSQL table bloat on the massive `Prospect` and `AiJob` tables under heavy write loads.
    *   Transaction deadlocks during sequence status updates.
*   **Optimization Plan:**
    *   Deploy **PgBouncer** (Transaction Mode) globally to multiplex Node.js container connections.
    *   Implement declarative table partitioning on `Prospect` by `tenantId` and `AiJob` by `created_at` timestamp.
    *   Apply partial B-Tree indexes on `(tenantId, status)` where `status = PENDING`.
*   **Capacity Estimates:** A baseline database instance (e.g., 32GB RAM/8 vCPUs) handling 5,000+ IOPS can comfortably sustain the 100k daily AI job updates as long as connections are pooled through PgBouncer.

---

## SECTION 4 — Redis & BullMQ Stress Testing

**Review:** Queue Throughput, Worker Capacity, Retry Behavior, Dead Letter Queues (DLQ).

*   **Queue Throughput:** Redis handles ~100k ops/sec easily, making Memory the chief bottleneck. High volume implies we must aggressively purge successful jobs to prevent OOM errors.
*   **Worker Capacity:** Node.js workers can concurrency process ~50 AI API calls simultaneously (I/O bound). We require horizontal scaling (e.g., 10 worker pods processing 50 concurrent jobs = 500 parallel inflight AI requests).
*   **Retry Behavior:** Inject HTTP 500/429 errors into the Gemini mock. Verify BullMQ's exponential backoffs process gracefully without locking the queues.
*   **Dead Letter Queues:** Verify that jobs exceeding retry allocation (or hitting 400 Bad Request limits) route permanently to the failed queue and trigger slack alerts.
*   **Scaling Recommendations:** 
    *   Deploy Redis cluster with `maxmemory-policy noeviction`. 
    *   Enable autoscaling for BullMQ Worker containers based directly on the `waiting` queue depth length.

---

## SECTION 5 — Gemini Capacity Planning

**Review:** Rate Limits, Request Volume, Token Usage, Cost Impact.

*   **Rate Limits:** Baseline Gemini API limits (e.g., 360 RPM) will block our scaling out of the gate. We require Google Cloud Enterprise Quotas (minimum 2,000 RPM) prior to Beta.
*   **Token Usage Forecast:** 
    *   Average Input: 1,500 tokens (Prospect data context + rules).
    *   Average Output: 150 tokens.
    *   Daily Volume: 165,000,000 tokens per day.
*   **Cost Impact:** Executing 165M tokens/day exclusively on Gemini 1.5 Pro models is economically unviable for SaaS margins. 
*   **Capacity Forecast & Mitigation:** We must route >= 85% of tasks (reply detection, generic sequencing, grammar checks) to **Gemini 1.5 Flash**. Use Pro strictly for complex multi-variable lead scoring. Implement a Redis-backed sliding-window rate limiter to enforce fair-usage per tenant and prevent system-wide 429 errors.

---

## SECTION 6 — Infrastructure Scaling Plan

**Review:** Docker, Coolify, Cloudflare.

*   **Horizontal Scaling Strategy:** 
    *   Extract workers and API servers from a single overarching Coolify node into a Swarm or K8s deployment. 
    *   Autoscale API compute nodes based on CPU usage (> 70%).
    *   Autoscale Worker nodes based on BullMQ queue depth.
*   **Vertical Scaling Strategy:** 
    *   PostgreSQL and Redis must be scaled vertically (more RAM/CPU) early on to maintain architectural simplicity before implementing horizontal Read Replicas (planned for v1.0).

---

## SECTION 7 — Monitoring Requirements

*   **Required Metrics:**
    *   API: HTTP Requests/sec, Error Rates (4xx, 5xx), P95 Latency.
    *   Database: Active/Idle connection counts, Query P95 latency, Cache Hit Ratio.
    *   Queues: Depth metrics (`waiting`, `active`, `failed`), Job Wait Latency vs. Execution Latency.
    *   LLM: API 429 Frequency, Daily Token Burn Rate, Task Success Rate.
*   **Alert Thresholds:**
    *   Global API 5xx rate > 1% for 3 minutes (PagerDuty).
    *   Database CPU > 85% for 5 minutes (PagerDuty).
    *   BullMQ Wait Time > 3 minutes (Slack Notification).
*   **Dashboard Requirements:** A unified Grafana/Datadog "Mission Control" reflecting real-time queue health, API response, and Stripe checkout volumes.

---

## SECTION 8 — Failure Testing

We will execute "Game Days" to intentionally break the staging environment:

*   **Database Failure Tests:** Kill the primary PostgreSQL node. Ensure the application degrades gracefully (returning `503 Unavailable` rather than holding requests endlessly) and queues buffer jobs effectively.
*   **Redis Failure Tests:** Simulate Redis OOM. Ensure the application stops accepting new jobs gracefully with clear user feedback.
*   **Queue Failure Tests:** Shut down all BullMQ workers while blasting the API with 10,000 jobs. Verify the API stays fast and jobs buffer strictly in Redis. Spin workers back up to process the backlog smoothly.
*   **API Failure Tests:** Inject latency and random network partitions into the Gemini API connection route. Ensure connection pools aren't saturated waiting on dropped packets.

---

## SECTION 9 — Go/No-Go Criteria

### Closed Beta Criteria
*   **Performance Requirement:** API read P95 < 500ms; DB connections stable under 250 concurrent users; Worker pods proven to back off successfully gracefully on injected Gemini 429s.
*   *Status:* Mandatory.

### Public Beta Criteria
*   **Performance Requirement:** API read P95 < 200ms; multi-node API deployment proven; queue handles 5,000 jobs/minute burst without DLQ leakage; PgBouncer connection multiplexing fully validated in production simulation.
*   *Status:* Mandatory before opening gates.

### v1.0 Release Criteria
*   **Performance Requirement:** Enterprise AI Quotas secured; Sustained load test of 10,000 Workspaces / 100,000 daily jobs passes with zero failed/dropped Stripe webhooks and 99.99% uptime.
*   *Status:* Mandatory for general availability.
