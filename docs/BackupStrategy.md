# Backup Strategy

## 1. Database (PostgreSQL)

### Automated Backups via Coolify
Coolify includes built-in backup solutions for databases.
- **Frequency**: Daily at 02:00 AM UTC.
- **Retention**: Keep last 7 days of daily backups, 4 weekly backups.
- **Destination**: Replicate backups to an external AWS S3 bucket.

### Manual Database Dumps
Before major migrations or deployment, operations engineers should take a manual backup.
```bash
docker exec -t my-app-postgres pg_dumpall -c -U postgres > backup_`date +%Y-%m-%d"_"%H_%M_%S`.sql
```

## 2. In-Memory Store & Cache (Redis)

- **AOF (Append Only File)**: AOF is enabled by default in our `docker-compose.yml` (`--appendonly yes`) ensuring that every write operation is logged. In the event of a Redis container restart, the dataset is rebuilt from the AOF.
- **Volume Persistence**: Redis data is mounted to a persistent volume (`redis_data`). Coolify manages underlying host volumes, ensuring container recreations do not result in data loss.

## 3. Discrepancy & Auditing Files
All audit logs, usage metrics, and Stripe billing states must be considered source-of-truth.
In case of catastrophic failure, Stripe Webhooks can be re-sent using the Stripe CLI to sync subscription status.
