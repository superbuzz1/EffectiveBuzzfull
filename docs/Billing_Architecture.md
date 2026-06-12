# Production-Grade Billing & Ledger Architecture

**Prepared By:** Senior FinTech Systems Architect
**Date:** June 7, 2026
**Target:** EffectiveBuzz Multi-tenant SaaS (Starter, Growth, Scale, Enterprise)

---

## 1. Executive Summary

The current billing implementation is exposed to race conditions, webhook retry vulnerabilities (double-crediting), and lacks a hardened audit trail. This document outlines a robust, idempotent billing system built on PostgreSQL and Stripe, acting as a double-entry ledger for AI credits and subscription state.

---

## 2. Event Processing Architecture (Stripe Webhooks)

To ensure high availability and prevent webhook timeouts, the webhook ingestion layer is decoupled from the business logic layer.

### Ingestion Flow
1. **API Gateway:** Receives Stripe POST `/api/v2/billing/webhook`.
2. **Synchronous Validation:** Validates Stripe Signature (`constructEvent`).
3. **Idempotency Check (Fast-Path):** Checks if `stripe_event_id` exists in PostgreSQL `StripeWebhookEvent` table. If it exists, returns `200 OK` safely.
4. **Persist & Ack:** Inserts the raw event JSON into PostgreSQL (`status: PENDING`) and immediately returns `200 OK` to Stripe.
5. **Enqueuing:** Publishes the event ID to a reliable message queue (e.g., BullMQ or AWS SQS).

### Processing Flow
1. **Worker Selection:** A dedicated Billing Worker picks up the event.
2. **State Machine Expansion:** The worker handles specific events (`invoice.payment_succeeded`, `customer.subscription.updated`, etc.).
3. **Ledger Transaction:** Executes all database operations inside a single `SERIALIZABLE` PostgreSQL transaction.
4. **Mark Processed:** Updates `StripeWebhookEvent` to `PROCESSED`.

---

## 3. Database Schema (PostgreSQL)

We rely on a robust relational schema to maintain state and auditability.

```sql
-- 1. Webhook Event Storage (Idempotency & Replay Protection)
CREATE TABLE StripeWebhookEvent (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stripe_event_id VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(255) NOT NULL,
    payload JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, PROCESSED, FAILED
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_stripe_event_status ON StripeWebhookEvent(status);

-- 2. Subscription State
CREATE TABLE TenantSubscription (
    tenant_id VARCHAR(255) PRIMARY KEY,
    stripe_customer_id VARCHAR(255) UNIQUE,
    stripe_subscription_id VARCHAR(255) UNIQUE,
    plan_code VARCHAR(50) NOT NULL, -- STARTER, GROWTH, SCALE, ENTERPRISE
    status VARCHAR(50) NOT NULL,    -- ACTIVE, PAST_DUE, CANCELED, INCOMPLETE
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Double-Entry Credit Ledger (Immutable Audit Trail)
CREATE TABLE AiCreditLedger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(255) NOT NULL REFERENCES TenantSubscription(tenant_id),
    transaction_type VARCHAR(50) NOT NULL, -- ALLOCATION, USAGE, REFUND, EXPIRATION
    amount INTEGER NOT NULL,               -- Positive for allocation, Negative for usage
    balance_after INTEGER NOT NULL,        -- Running balance for O(1) reads
    reference_id VARCHAR(255),             -- Stripe Invoice ID, AI Job ID
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_ledger_tenant ON AiCreditLedger(tenant_id);
```

---

## 4. Idempotency & Replay Protection

### Idempotency Strategy
The `stripe_event_id` column in `StripeWebhookEvent` has a `UNIQUE` constraint. 
- If Stripe retries a webhook due to a network blip, the `INSERT` will fail with a Postgres collision. The API securely catches this collision, assumes it has already been captured, and returns `200 OK` to Stripe to stop retries.

### Replay Protection & Ordering
Stripe does NOT guarantee ordered delivery (e.g., a `subscription.updated` might arrive before `subscription.created`).
- The worker uses the `created` timestamp embedded *inside* the Stripe payload. 
- If a worker processes an event with timestamp `T1`, but the database `TenantSubscription.updated_at` is at `T2` (where `T2 > T1`), the event is acknowledged but ignored as stale, preventing older events from corrupting newer states.

---

## 5. Subscription State Machine

A tenant’s billing state moves through strict definitions:
- **ACTIVE:** Invoice paid. Can allocate credits and execute AI jobs.
- **PAST_DUE:** Payment failed. AI processing is paused. Grace period behavior applies.
- **CANCELED:** Subscription ended. All access revoked.

**Transition Rules:**
- `invoice.payment_succeeded` triggers `PAST_DUE` -> `ACTIVE`.
- `invoice.payment_failed` triggers `ACTIVE` -> `PAST_DUE`.
- `customer.subscription.deleted` triggers `ANY` -> `CANCELED`.

---

## 6. Credit Allocation & Usage Metering

### Allocation Engine
When `invoice.payment_succeeded` arrives:
1. Identify the line item and Plan (e.g., Growth Tier = 10,000 credits).
2. Insert a row into `AiCreditLedger` representing the `ALLOCATION` (+10,000).
3. If the plan includes carry-over logic, expire old credits first using an `EXPIRATION` transaction.

### Usage Metering
1. When an AI Job completes, the Worker requests a token deduction.
2. The Database executes an atomic operation:
   ```sql
   INSERT INTO AiCreditLedger (tenant_id, transaction_type, amount, balance_after, reference_id)
   VALUES (
      'tenant_x', 'USAGE', -25, 
      (SELECT balance_after FROM AiCreditLedger WHERE tenant_id='tenant_x' ORDER BY created_at DESC LIMIT 1) - 25, 
      'ai_job_abc123'
   );
   ```
3. A background cron job safely aggregates daily ledger `USAGE` rows and pushes to Stripe Metered Billing APIs to reflect on the next invoice.

---

## 7. Failed Payment & Refund Handling

### Failed Payments (`invoice.payment_failed`)
1. Stripe enters Smart Retries mechanism (Dunning).
2. Our webhook captures the failure and moves `TenantSubscription.status` to `PAST_DUE`.
3. Client API requests are immediately intercepted with a `402 Payment Required` HTTP code.
4. Triggers an automated notification (Email/Slack) to the customer to update their card.

### Refunds (`charge.refunded`)
1. Identify the associated `ALLOCATION` from the original charge.
2. Immediately write a `REFUND` transaction to `AiCreditLedger` deducting the proportional credits.
3. If balance drops below 0, it becomes a negative balance, accurately reflecting the deficit.

---

## 8. Failure Recovery Plan

**Scenario:** Worker crashes halfway through allocating credits.
**Solution:** The database operation is atomic (`BEGIN` ... `COMMIT`). It rolls back cleanly. The `StripeWebhookEvent` remains `PENDING`. Another worker assumes the job (or it is manually replayed from the DLQ) and processes it securely.

**Scenario:** Database outage during webhook delivery.
**Solution:** API Gateway returns `500`. Stripe's exponential backoff will automatically retry the webhook for up to 3 days until the database recovers.

---

## 9. Implementation Roadmap

1. **Phase 1: Foundation (Weeks 1-2):** Deploy `StripeWebhookEvent` and `TenantSubscription` schemas. Update webhooks to simply log raw payloads and ignore business logic. Verify zero missed events.
2. **Phase 2: The Ledger (Weeks 3-4):** Create `AiCreditLedger`. Redirect all `getMetrics()` and `deductCredits()` logic to read and write exclusively to the new SQL ledger inside transactions.
3. **Phase 3: Asynchronous Workers (Weeks 5-6):** Move webhook parsing into the BullMQ worker. Fully implement the idempotency and stale-event ignore logic.
4. **Phase 4: Metering Synchronization (Week 7):** Deploy the background Cron to sync Postgres Ledger usage with Stripe Metered APIs. Enable Enterprise usage-based billing.
