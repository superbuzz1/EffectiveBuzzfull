# EffectiveBuzz: Enterprise Deployment & Infrastructure Architecture

**Prepared By:** Principal Cloud Architect  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Objective:** Architect a highly available, fault-tolerant, and geographically distributed enterprise infrastructure to guarantee 99.99% uptime, strict data residency compliance, and rapid disaster recovery capabilities.

---

## SECTION 1 — Data Residency Strategy (Multi-Region)

Enterprise customers (specifically in the EU and APAC) require absolute assurance that their data, including prospect Personally Identifiable Information (PII) and AI generation payloads, does not cross geopolitical boundaries.

*   **Regional Pods:** The EffectiveBuzz infrastructure is divided into isolated, self-standing environments (Pods). 
    *   **US Region (us-east):** N. Virginia (Default for North America & Global).
    *   **EU Region (eu-central):** Frankfurt, Germany (Strict GDPR compliance).
    *   **APAC Region (ap-southeast):** Singapore (Optimized for Asia-Pacific latency and local compliance).
*   **The "Zero-Bleed" Data Model:** 
    *   Compute, Memory (Redis/BullMQ), and Database (PostgreSQL) are 100% physically isolated within their respective Regional Pods. 
    *   When an Enterprise signs up, they physically select their deployment region. Prospect CSVs uploaded to the EU Pod will *never* transit through US servers.
*   **Global Routing Layer:**
    *   A Global Anycast routing network (e.g., Cloudflare or AWS Global Accelerator) uses standard latency-based routing to hit a centralized Auth Router. 
    *   Upon Authentication, the user's JWT dictates their assigned data region, and API traffic is transparently proxied to the correct Regional Pod (e.g., `eu.api.effectivebuzz.com`).

---

## SECTION 2 — Failover Architecture 

Infrastructure must survive complete cluster or Availability Zone (AZ) outages seamlessly.

*   **Stateless Compute (Active-Active within Region):**
    *   The Node.js/Backend applications run as stateless containerized microservices (via AWS ECS/Fargate or GCP Cloud Run).
    *   Traffic is load-balanced simultaneously across 3 disparate Availability Zones (AZs) within the region. If AZ-A goes offline, the Load Balancer instantly drains connections and shifts 100% of traffic to AZ-B and AZ-C.
*   **Database Topology (Active-Passive within Region):**
    *   The primary PostgreSQL database operates in a Multi-AZ cluster. 
    *   **Primary Node:** Handles Writes/Reads in AZ-A.
    *   **Hot Standby Node:** Handles Read-Replicas in AZ-B with synchronous replication. 
    *   **Automated Failover:** If the Primary Node fails, election mechanisms automatically promote the Hot Standby to Primary within 30-60 seconds. Application DB parameters automatically route new queries to the promoted node.
*   **Message Queues (Redis/BullMQ):**
    *   Queues are configured in a highly-available Redis Cluster spanning multiple AZs. In the event of a node crash, active AI generation jobs are retained in memory and retried automatically.

---

## SECTION 3 — Disaster Recovery (DR)

Defining the exact thresholds and runbooks if an entire Cloud Region (e.g., US-East-1) goes offline.

*   **RPO (Recovery Point Objective): 15 Minutes.** The maximum acceptable data loss in a catastrophic regional failure. Achieved via continuous Write-Ahead Log (WAL) streaming.
*   **RTO (Recovery Time Objective): 2 Hours.** The maximum acceptable time the EffectiveBuzz platform can be completely offline during a regional disaster.
*   **Cross-Region DR Strategy (US Example):**
    *   To maintain Data Residency, DR failover regions must exist within the same geopolitical boundaries (e.g., US-East fails over to US-West; EU-Frankfurt fails over to EU-Dublin).
    *   Infrastructure as Code (Terraform) scripts are maintained to instantly spin up exact replicas of the networking, compute, and load balancing layers in the secondary region.
    *   Databases are configured with cross-region asynchronous replicas purely for DR activation (read-only until promoted).

---

## SECTION 4 — Backup Strategy

Protecting against accidental data deletion, ransomware, and database corruption beyond physical hardware failures.

*   **Continuous Archiving (Point-In-Time Recovery - PITR):**
    *   PostgreSQL Write-Ahead Logs (WAL) are streamed continuously to secure object storage (Amazon S3 / Google Cloud Storage).
    *   This allows DBAs to restore the database to *any exact second* within the last 7 days (e.g., restoring the database to exactly 14:03:22 PM before a malicious user dropped a table).
*   **Automated Daily Snapshots:**
    *   Full storage-volume snapshots are executed daily at 02:00 AM local regional time.
    *   Retention: Retained for 35 days in hot storage.
*   **Long-Term Archival (Cold Storage):**
    *   Weekly snapshots are compressed, encrypted via Customer-Managed Encryption Keys (CMEK), and moved to Glacier/Coldline storage for 1-7 years depending on specific Enterprise compliance contracts.
*   **Backup Immutability & Air-Gapping:**
    *   S3 Object Lock (WORM - Write Once, Read Many) is applied to all backup buckets to prevent rogue administrators or ransomware from deleting historical backups.
    *   Backups are physically replicated to a distinct, "Air-Gapped" AWS/GCP account with completely segregated IAM access controls.
*   **Testing Cadence:**
    *   Automated scripts execute a "Dry-Run" database restore into an isolated staging VPC every 30 days to validate backup integrity and measure RTO compliance.
