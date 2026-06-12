# EffectiveBuzz: Enterprise Audit Logging Architecture

**Prepared By:** Compliance Architect  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Objective:** Architect an immutable, highly searchable, and compliance-ready (SOC 2, ISO 27001, GDPR) audit logging framework to provide absolute visibility into enterprise tenant activity.

---

## SECTION 1 — Audit Event Taxonomy

To satisfy enterprise InfoSec requirements, every system mutation and sensitive read must be captured with deterministic context.

*   **Logins & Identity:** `user.login.success`, `user.login.failed`, `user.logout`, `user.mfa.challenged`, `sso.saml.asserted`.
*   **Permission Changes:** `role.granted`, `role.revoked`, `scim.user.provisioned`, `scim.user.deprovisioned`, `api_key.created`.
*   **Data Access (Reads/Exports):** `prospects.exported_csv`, `crm.list.viewed`, `analytics.dashboard.accessed`. (Note: Routine reads are sampled; bulk exports are explicitly logged).
*   **Campaign Launches:** `campaign.created`, `campaign.launched`, `campaign.paused`, `email.sequence.approved`.
*   **AI Actions:** `ai.prompt.executed`, `ai.draft.generated`, `ai.reply.categorized`, `ai.context.modified`.
*   **Billing Events:** `billing.subscription.upgraded`, `billing.payment.failed`, `billing.ai_credits.purchased`, `invoice.downloaded`.

---

## SECTION 2 — Database Schema

Audit logs must be immutable. Traditional PostgreSQL tables will bloat rapidly; therefore, we utilize an append-only architecture, preferably using a specialized OLAP columnar database like ClickHouse or time-series partitioned PostgreSQL.

**Table: `AuditLogs` (Append-Only)**

*   `id` (UUID, Primary Key)
*   `timestamp` (DateTime, UTC, Indexed)
*   `tenantId` (UUID, Indexed) - Workspace/Enterprise identifier.
*   `actorId` (UUID, Indexed) - The user, API Key, or System Service that invoked the action.
*   `actorType` (Enum: `User`, `Admin`, `System`, `SCIM_API`)
*   `action` (String, Indexed) - From the Event Taxonomy (e.g., `role.granted`).
*   `resourceType` (String) - What was acted upon (e.g., `Campaign`, `User`).
*   `resourceId` (String) - The ID of the resource affected.
*   `ipAddress` (String) - Originating IP masking for GDPR where needed.
*   `userAgent` (String) - Browser or API client identifier.
*   `severity` (Enum: `Info`, `Warning`, `Critical`)
*   `metadata` (JSONB) - Flexible payload storing the delta (e.g., `{"previousRole": "SDR", "newRole": "Manager"}`).

---

## SECTION 3 — Retention Policies

To balance compliance mandates with storage costs, retention is tiered according to data lifecycle management principles.

*   **Hot Storage (0 - 90 Days):**
    *   Logs are immediately queryable within the EffectiveBuzz Enterprise Admin UI.
    *   Sub-second search latency via indexed OLAP database.
*   **Warm Storage (91 - 365 Days):**
    *   Logs remain in the primary database but are shifted to lower-cost, slower SSDs/HDDs via data tiering. 
    *   Still accessible via API but with slightly higher latency.
*   **Cold Storage (1 Year - 7 Years):**
    *   Continuous archival to AWS S3 / Google Cloud Storage multi-regional buckets.
    *   Encrypted via Customer-Managed Encryption Keys (CMEK).
    *   Accessible only via asynchronous request (e.g., "Request Audit Archive", delivered via secure email link within 24 hours).
*   **Hard Deletion (End of Life):**
    *   Automated complete destruction after 7 years to comply with maximum data retention hygiene policies, unless placed under an active Legal Hold.

---

## SECTION 4 — Search Architecture

Enterprise IT administrators require the ability to rapidly hunt for threats or investigate internal disputes.

*   **Data Engine:** Use ClickHouse or Elasticsearch to ingest high-velocity unstructured JSON metadata logs without locking relational database rows.
*   **UI Features (The Admin Console):**
    *   **Faceted Filtering:** Filter by `Action Type`, `Actor`, `Date Range`, and `Severity`.
    *   **Free-Text Search:** Tokenized search across the `metadata` JSON blob to find specific prospect IDs or configuration changes.
    *   **Saved Searches:** Allow CISOs to save recurring filters (e.g., "Show all bulk exports conducted outside of 9 AM - 5 PM").
*   **Query Rate Limiting:** Enforce strict query governors on complex metadata searches to prevent tenant-induced Denial of Service (DoS) on the analytics cluster.

---

## SECTION 5 — Export Architecture

Enterprises rarely view logs in the vendor's UI; they aggregate them into their own Security Information and Event Management (SIEM) systems.

*   **Real-time Streaming (SIEM Integration):**
    *   Architecture: Webhook/EventBridge model.
    *   Implementation: EffectiveBuzz pushes JSON log payloads directly to the Enterprise's Amazon EventBridge, Datadog, Splunk (via HTTP Event Collector), or generic HTTPS webhook in near real-time (< 30 seconds).
*   **Scheduled Delivery:**
    *   Daily or weekly automated delivery of compressed `.csv` or `.json.gz` log dumps to a Customer-owned Amazon S3 bucket, authenticated via IAM Role Trust Policies.
*   **On-Demand Export API:**
    *   A paginated REST endpoint (`GET /api/v1/audit-logs`) secured by highly privileged API tokens, allowing custom enterprise scripts to poll for new events dynamically using a `since_timestamp` parameter.
