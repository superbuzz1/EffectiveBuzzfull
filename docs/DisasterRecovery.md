# Disaster Recovery Plan

## 1. Incident Classification

- **Tier 1 (Critical)**: Complete system outage (App Down, DB Down).
- **Tier 2 (High)**: Major service degraded (AI APIs down, Stripe webhooks failing).
- **Tier 3 (Medium)**: Non-critical feature bug.

## 2. Recovery Objectives

- **RTO (Recovery Time Objective)**: 4 hours for Tier 1 incidents.
- **RPO (Recovery Point Objective)**: 24 hours (last daily backup).

## 3. Step-by-Step Recovery Procedure (Tier 1 - Full Outage)

### Scenario A: Server Crash / Cloudflare 522
1. Verify host node status in Coolify dashboard.
2. If host node is unrecoverable, provision a new VPS.
3. Install Coolify on the new VPS.
4. Re-configure Cloudflare DNS to point to the new VPS IP.
5. Restore PostgreSQL database from S3 Backup via Coolify integrations.
6. Re-deploy application via Coolify using existing GitHub repository branch.

### Scenario B: Database Corruption
1. Shut down the application to prevent further writes.
    ```bash
    docker stop my-app-web
    ```
2. Drop the corrupted database.
3. Import the latest stable backup from S3.
    ```bash
    psql -U postgres -d myapp_prod < latest_backup.sql
    ```
4. Restart the application.

## 4. Communication Plan

1. **Internal**: Notify team on Slack `#alerts` channel immediately.
2. **External**: Update `status.myapp.com` via Uptime Kuma for customers.
3. **Post-Mortem**: Required within 48 hours of addressing a Tier 1 or Tier 2 incident. Contains: Timeline, Root Cause, Mitigation, Prevention.
