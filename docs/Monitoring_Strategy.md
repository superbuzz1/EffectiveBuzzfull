# Production Monitoring Strategy & SRE Architecture

**Prepared By:** Site Reliability Engineer
**Date:** June 7, 2026
**Scope:** EffectiveBuzz Multi-Tenant SaaS
**Stack:** Grafana, Prometheus, Loki, Uptime Kuma

---

## 1. Monitoring Architecture

Our observability stack relies on the **MELT** paradigm (Metrics, Events, Logs, Traces).
- **Metrics (Prometheus):** Time-series data scraped from `prom-client` in Express, BullMQ Exporters, Postgres Exporter, and Redis Exporter.
- **Logs (Loki):** Centralized structured JSON logging forwarded by Promtail from Docker containers.
- **Dashboards & Alerts (Grafana/Alertmanager):** Unified visualization layer and alert routing mechanism.
- **Synthetic Monitoring (Uptime Kuma):** External probes checking overall SaaS uptime and basic API health checks every 30 seconds.

---

## 2. Dashboards (Grafana)

We maintain four standard dashboards.

### A. The Golden Signals (Executive & On-call)
Focuses on the four golden signals of monitoring:
- **Latency:** P50, P90, P99 API response times.
- **Traffic:** Total HTTP requests/sec.
- **Errors:** HTTP 5xx and 4xx rates.
- **Saturation:** Node.js event loop lag, CPU/Memory per container.

### B. Asynchronous Workers & Queue Health (BullMQ)
Monitors the critical AI and Email pipelines.
- **Queue Depth:** Total pending jobs categorized by queue (`outreach`, `scoring`, `inbound`).
- **Processing Rate:** Jobs completed per second.
- **AI Job Failures:** Failed jobs per minute (Tracks prompt errors or Gemini timeouts).
- **Queue Wait Time:** Time between enqueuing and processing. (Target: < 2 seconds for real-time queues).

### C. Financial & Critical Services (Stripe & Email)
- **Stripe Webhook Delivery:** Success (200 OK) vs Failure (500) rate for incoming webhooks.
- **Stripe Processing Lag:** Time taken to process webhook and update ledger.
- **Email Delivery State:** Sent vs Bounced vs Rejected. Mapped from webhook events.
- **API Token Limits:** Remaining Gemini API quota and token usage velocity.

### D. Infrastructure (Postgres & Redis)
- **Postgres:** Active connections, query cache hit rate, long-running queries (>1s), deadlocks, disk I/O.
- **Redis:** Memory usage, cache hit ratio, connected clients, command latency.

---

## 3. Alert Rules (Prometheus & Alertmanager)

Alerts are categorized by severity.

### [CRITICAL] (P1 - Wakes up On-Call Engineer)
- **`ApiHighErrorRate`:** > 5% of API requests return HTTP 5xx over 5 minutes.
- **`DatabaseDown`:** Postgres exporter unreachable or unable to execute `SELECT 1` for 2 minutes.
- **`WorkerQueueStalled`:** Queue depth > 5000 and processing rate is 0 for 5 minutes. (Indicates workers crashed or stuck).
- **`StripeWebhookFailures`:** > 3 consecutive failed stripe webhooks over 10 minutes. (Immediate revenue impact).

### [HIGH] (P2 - Notifies Team via Slack/PagerDuty, Response req < 1h)
- **`ApiLatencyDegraded`:** P95 latency > 2.5 seconds for 10 minutes.
- **`HighAiFailureRate`:** > 10% of AI jobs end in a failed state over 15 minutes. (Likely Gemini API degradation).
- **`PostgresConnectionExhaustion`:** Active connections > 90% of `max_connections`.

### [WARNING] (P3 - Slack Notification during business hours)
- **`HighMemoryUsage`:** Node.js container memory > 85% of limit.
- **`QueueDepthGrowing`:** Inflow rate exceeds outflow rate for > 30 minutes.

---

## 4. Escalation Procedures

When a **CRITICAL (P1)** alert triggers:
1. **Minute 0:** Alertmanager fires PagerDuty. Primary On-Call Engineer receives automated call/SMS.
2. **Minute 5:** If Primary doesn't acknowledge, Secondary On-Call Engineer is paged.
3. **Minute 15:** If the issue is complex (e.g., database corruption) or impacts >10% of customers, SRE escalates to Engineering Manager & CTO.
4. **Minute 30:** A public incident is declared on `status.effectivebuzz.com`.
5. **Post-Resolution:** A mandatory blameless Post-Mortem is documented within 48 hours.

---

## 5. Incident Playbooks

### Playbook: Queue Backlog (WorkerQueueStalled)
**Symptoms:** Emails aren't sending. AI generation hangs indefinitely. Queue depth dashboard shows spike.
**Action Plan:**
1. Check Loki logs: `{job="ai-workers"} |= "error" or "timeout"`.
2. Determine if the bottleneck internal (Redis/Postgres) or external (Gemini/Resend).
3. If external (Gemini rate-limited), pause specific queues to avoid burning retries. Notify customers via status page.
4. If internal, horizontally scale worker containers (`docker compose up --scale worker=10`).

### Playbook: Stripe Webhooks Failing
**Symptoms:** Customers report upgrading but not receiving credits. Alert `StripeWebhookFailures` firing.
**Action Plan:**
1. Identify if it's an API route issue (`500 Internal Server Error`) or a database lock issue.
2. Verify Stripe dashboard for webhook delivery logs.
3. If the DB is saturated, increase connection pool limits temporarily.
4. Standardize replay: Once fixed, use Stripe CLI to replay failed events: `stripe events resend <event_id>`.

---

## 6. Recovery Procedures

### Data Corruption or Unintended Wipe
1. Activate Maintenance Mode to restrict traffic.
2. Identify the exact time of corruption.
3. Spin up an isolated PostgreSQL instance from the automated S3 daily backup or the latest WAL (Write-Ahead Log) point-in-time state.
4. Verify data integrity manually.
5. Perform a DNS cutover or container environment variable update to point to the restored cluster.

### Complete Cluster Outage (Data Center Level)
1. Execute multi-region failover.
2. Re-provision Coolify and infrastructure via Terraform/Ansible in a secondary AWS/GCP region.
3. Restore from external S3 bucket backups.
4. Reroute Cloudflare DNS logic to the new IP range. (Target RTO: < 4 hours).
