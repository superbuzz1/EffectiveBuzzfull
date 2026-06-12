# EffectiveBuzz: Platform Transformation & API Architecture

**Prepared By:** Platform Architect  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Objective:** Transform EffectiveBuzz from a SaaS application into a comprehensive, extensible developer platform. Build high-performance public APIs, a robust webhook engine, and third-party developer infrastructure to scale acquisition and entrench product dominance.

---

## SECTION 1 — Public API Strategy

To transform EffectiveBuzz into an open platform, we expose a highly secure, developer-friendly REST/HTTP public API allowing external systems to programmatically orchestrate our autonomous cognitive agents.

### API Architecture & Design Principles
*   **Protocol:** Standard RESTful JSON over HTTPS, with predictable, resource-oriented URLs.
*   **Version Control:** URL-based versioning (`https://api.effectivebuzz.com/v1/...`). Updates that break backwards compatibility will trigger a deprecation cycle.
*   **Authentication:** Dual-option authentication model:
    1.  *API Keys:* For quick scripts and server-to-server integrations. Keys are generated in the Developer Console and must be passed as a client-secret Bearer token: `Authorization: Bearer <eb_live_...>`
    2.  *OAuth 2.0 (Authorization Code Flow with PKCE):* Mandatory for all public integrations, third-party marketplaces, and partner apps.
*   **Standardized Error Payloads:** Compliant with RFC 7807 (Problem Details). E.g.,
    ```json
    {
      "type": "https://api.effectivebuzz.com/errors/rate-limit-exceeded",
      "title": "Rate Limit Exceeded",
      "status": 429,
      "detail": "You have made more than 100 requests in a minute. Retry in 42 seconds.",
      "instance": "/v1/campaigns/cmp-123/generate-outreach"
    }
    ```

### Core REST Endpoints
*   `POST /v1/prospects` - Batch upload prospects with dynamic custom search attributes.
*   `GET /v1/prospects/{id}` - Retrieve enrichment datasets, lead scoring rationales, and history.
*   `POST /v1/campaigns` - Instantiate outbound sequences programmatically.
*   `POST /v1/campaigns/{id}/generate-outreach` - Force run the AI research and drafting queue for a specific prospect.
*   `GET /v1/inbound/threads` - Retrieve replies categorized by current sentiment label (Positive, Negative, etc.).
*   `POST /v1/inbound/threads/{id}/reply` - Send an outbound email or hand-off context back to a human queue.

---

## SECTION 2 — SDK Strategy

We reduce friction for developers by shipping mature, lightweight, strongly-typed wrappers in popular languages, ensuring consistent request formatting and built-in resilience.

### Supported SDK Ecosystem
1.  **TypeScript/JavaScript SDK (`@effectivebuzz/sdk-node`)**
    *   Compatible with Node.js 18+, Bun, Deno, and Edge environments.
    *   Provides full TypeScript autocompletion and type-safe Zod schema parameter validation.
2.  **Python SDK (`effectivebuzz-python`)**
    *   Designed for data scientists and growth engineers automating lists. Fits cleanly into Pandas/NumPy pipelines.
3.  **Go SDK (`effectivebuzz-go`)**
    *   Optimized for high-performance enterprise sync microservices.

### SDK Features & Quality Guidelines
*   **Lazy Instantiation & Initialization:**
    ```typescript
    import { EffectiveBuzz } from '@effectivebuzz/sdk-node';

    // Strongly types client execution, keeping secrets securely hidden server-side
    const buzz = new EffectiveBuzz({ apiKey: process.env.EFFECT_BUZZ_API_KEY });
    ```
*   **Network Resilience & Retries:** SDKs must ship with automatic exponential backoff (starting at 500ms, doubling up to 3 retries) and jitter to gracefully handle transient network errors (`502 Bad Gateway`, `503 Service Unavailable`, `429 Too Many Requests`).
*   **HTTP Keep-Alives:** Enabled by default to reuse TCP connections for high-volume list syncing.

---

## SECTION 3 — Webhook Platform

A true platform is reactive. Instead of developers polling our databases constantly, our real-time webhook engine streams event payloads instantly to custom public listener URLs.

### Webhook Event Catalog (The Pulse of the Platform)
*   `prospect.researched` - Dispatched when the Research Agent completes initial compilation.
*   `prospect.scored` - Includes numerical ICP score and full analytical rationale.
*   `outreach.drafted` - Fires when AI drafts are staged, allowing programmatic review before sending.
*   `reply.received` - Emits when a prospect responds. Contains categorization metadata.
*   `deal.scheduled` - Dispatched when the EA Agent books a calendar meeting from an email thread.

### Webhook Reliability & Security Architecture
*   **At-Least-Once Delivery Guarantee:** Webhook workers use Redis/BullMQ. If the customer's server fails with a non-2xx status, we retry using exponential backoff over a 24-hour window before dead-lettering the event.
*   **Idempotency Key headers:** Webhook payloads include an `X-EB-Event-Id` header to enable duplication screening on client servers.
*   **Cryptographic Signatures:** Every webhook payload is signed with a SHA256 HMAC signature using a shared secret key generated uniquely per webhook url. Secure signing prevents spoofing:
    ```
    X-EB-Signature: t=1654573200,v1=9f82d3...
    ```
    Clients validate the signature before processing to verify that the webhook originated strictly from EffectiveBuzz servers.

---

## SECTION 4 — Rate Limits & Protection

To preserve database resources and guarantee sub-second API availability (SLA), we enforce clean API limits utilizing a Token Bucket algorithm backed by Redis.

### Rate Limit Tiers

| API Tier | Request Limit | Burst Window | Concurrent Connections |
| :--- | :--- | :--- | :--- |
| **Sandbox / Developer** | 60 requests/min | 10 requests | 2 simultaneous |
| **Growth Tiers** | 600 requests/min | 50 requests | 5 simultaneous |
| **Enterprise Tiers** | 6,000 requests/min | 250 requests | 25 simultaneous |

*   **Header Inspection:** Every API response includes standardized telemetry headers:
    *   `X-RateLimit-Limit`: Maximum requests allowed per window.
    *   `X-RateLimit-Remaining`: Balance left in the current bucket.
    *   `X-RateLimit-Reset`: Time (seconds) until the bucket replenishes.

---

## SECTION 5 — Developer Portal

Developers deserve a world-class workspace. We architect a self-serve developer portal (`developers.effectivebuzz.com`) containing interactive playgrounds, documentation, and live debugger metrics.

### Key Portal Components
*   **Interactive API Playground:** An integrated OpenAPI/Swagger sandbox where auth tokens can be tested directly from the browser canvas.
*   **Live Webhook Debugger:** Real-time event log viewer. Developers can view their exact outbound webhook payloads, inspect the precise HTTP headers sent, and click `[Redeliver]` to test receipt on their local development servers.
*   **API Key Management Console:** Easily generate, name, rotate, or revoke production and sandbox credentials in real time.
*   **Usage Dashboards:** Visual charts showing API success rates (2xx vs 4xx vs 5xx), request latencies, and total monthly billing metrics.

---

## SECTION 6 — Platform Monetization Strategy

Making our ecosystem a highly profitable business model.

*   **API Add-On Tiers:** API access is locked behind the "Growth" and "Enterprise" SaaS tiers, driving up-market expansion revenue natively.
*   **Consumption Surcharges (Overages):** Surcharges are calculated based on API execution volume:
    *   Base plans include a specific monthly limit (e.g., 50,000 calls).
    *   Overages are billed automatically on a utility model via our unified Stripe Connect accounts (e.g., $1.00 per 1,000 extra calls).
*   **Developer App Marketplace Profit Sharing:**
    *   Independent developers can build custom integrations (e.g., "EffectiveBuzz to Slack alerts") and sell them on our Enterprise App Marketplace.
    *   **Take Rate:** EffectiveBuzz captures a clean **20% cut** of all subscription fees billed through the Developer App Marketplace, scaling our revenue without increasing our engineering headcounts.

---
