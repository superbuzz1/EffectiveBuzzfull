# API Latency Degradation Runbook

**Alert Name**: `HighApiLatency`
**Severity**: Critical

## Description
Triggered when the 95th percentile (P95) of API requests exceeds 2 seconds for 2 minutes consecutively.

## Immediate Mitigation
1. Check the Dashboard to identify the exact HTTP routes experiencing high latency.
2. If the latency is concentrated around the `/api/v2/ai/*` routes, check the Gemini API connection status. Ensure network egress to Google APIs is unblocked.
3. If it's concentrated on database calls, inspect the database connection pool using the APM tools.

## Root Cause Analysis
- Ensure there are no long-running transactions locking database resources.
- Rate limiting may have been bypassed or configured too generously.

## Follow Up
- Reduce the timeout thresholds in upstream reverse proxies to prevent cascading failures.
- Implement more aggressive caching using Redis for heavily requested read paths.
