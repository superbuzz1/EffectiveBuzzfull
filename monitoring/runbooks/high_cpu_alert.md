# High CPU Alert Runbook

**Alert Name**: `HighCpuUsage`
**Severity**: Warning / Critical

## Description
Triggered when CPU usage exceeds 85% for more than 5 minutes on the API worker nodes.

## Immediate Mitigation
1. Open the **Grafana Dashboard** and isolate the spike: Is it a single instance or cluster-wide?
2. Use **Loki** to check for abnormal error logs or bulk requests.
   - Query: `{job="lead-machine-api"} |= "error"`
3. If it is a rogue background job (e.g., massive CSV import), pause the worker queue temporarily.

## Root Cause Analysis
- Check if `api/v2/prospects/import` is being abused.
- Analyze if the rate limiters are functioning properly.

## Follow Up
- Scale out additional replica instances if this is legitimate organic traffic.
- File a Jira ticket for evaluating index optimization or moving jobs to an async worker.
