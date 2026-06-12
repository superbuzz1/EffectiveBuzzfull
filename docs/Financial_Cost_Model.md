# EffectiveBuzz: Financial & Infrastructure Cost Model

**Prepared By:** SaaS CFO & FinOps Architect  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  

---

## SECTION 1 — Infrastructure Cost Analysis

**Review:**  
Deploying on bare-metal via Coolify (Hetzner / AWS EC2 equivalent) keeps baseline fixed costs exceptionally low compared to managed PaaS solutions (like Vercel or Heroku).

*   **Database Costs (PostgreSQL):** Scaling vertically.
*   **Redis Costs:** High RAM requirements for BullMQ job queue state.
*   **Storage Costs (S3):** Minimal (CSV uploads, logs).
*   **Network & Monitoring:** Cloudflare Pro + basic Datadog/Grafana.

**Monthly Cost Estimates:**

| Customers | Server Compute | Database Storage | Redis RAM | Misc (Net/Mon) | **Total Build Cost** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **10** | $50 | $20 | $20 | $50 | **$140 / mo** |
| **50** | $100 | $50 | $40 | $100 | **$290 / mo** |
| **100** | $200 | $100 | $80 | $150 | **$530 / mo** |
| **500** | $800 | $300 | $200 | $350 | **$1,650 / mo** |
| **1000** | $1,500 | $600 | $400 | $600 | **$3,100 / mo** |

---

## SECTION 2 — AI Cost Analysis (Gemini)

**Review:**  
AI Compute is our primary Cost of Goods Sold (COGS). To defend gross margins, 90% of requests (formatting, short-text evaluation, simple classification) route to **Gemini 1.5 Flash**, reserving **Gemini 1.5 Pro** for deep prospect research and complex lead scoring.

**Outputs & Averages:**
*   **Per Prospect (Enrichment via Flash):** ~$0.0005 
*   **Per Email (Generation/Scoring via Flash):** ~$0.0003
*   **Per Research Job (Deep Analysis via Pro):** ~$0.0120
*   **Per Active Workspace (Blended Monthly Average, Assuming 10k actions):** ~$15.00 / mo

---

## SECTION 3 — Email Cost Analysis

**Review:**  
Workspace connections (OAuth Gmail/Outlook) carry zero direct infrastructure cost. System transaction and automated cold delivery rely on Resend.

**Outputs & Averages:**
*   **Per Email Sent (Resend via API):** ~$0.0004
*   **Per Active Workspace (Avg 3k emails/mo via Resend):** ~$1.20 / mo

*(Note: Custom tracking domains/dedicated IPs scale at a flat rate of ~$30/mo per dedicated IP pool, amortized across higher tier customers).*

---

## SECTION 4 — Unit Economics

Based on blended pricing tiers: Starter ($99), Growth ($299), Scale ($899), Enterprise ($2000+).

| Metric | Starter ($99/mo) | Growth ($299/mo) | Scale ($899/mo) | Enterprise ($2000/mo) |
| :--- | :--- | :--- | :--- | :--- |
| **Gross Margin** | 82% | 88% | 91% | 85% (Lowered by fine-tuning costs) |
| **CAC Target** | $150 | $500 | $1,800 | $5,000 |
| **Payback Period**| 1.8 months | 1.9 months | 2.2 months | 2.9 months |
| **LTV (Predicted)**| $1,100 | $4,500 | $18,000 | $60,000+ |

---

## SECTION 5 — Optimization Opportunities

**Identify:**
*   **High Cost Components:** Gemini 1.5 Pro inference on low-intent or unverified prospects. 
*   **Low ROI Components:** Storing multi-year historical delivery logs in standard PostgreSQL instead of cheap S3 cold storage.
*   **Scaling Risks:** Redis memory bloat due to retained successful AI payload jobs in BullMQ.

**Optimization Plans:**

*   **30-Day Plan (Immediate Beta Fixes):**
    *   Set strict `removeOnComplete` defaults in BullMQ to curb Redis memory costs.
    *   Hardcode prompt logic to route basic grammar/reply-classification strictly to Gemini 1.5 Flash.
*   **90-Day Plan (Post-Launch Refinement):**
    *   Implement Semantic Context Caching (via Redis) to skip Gemini API calls entirely if a similar company profile was recently researched by another workspace.
    *   Enforce UI usage limits (hard-stops) to prevent user misconfigurations from looping infinite AI tasks and driving up API bills.
*   **180-Day Plan (Scale Defenses):**
    *   Move historical campaign data out of active PostgreSQL into Amazon S3/Athena to compress active database compute costs.
    *   Negotiate Volume Commit discounts with Google Cloud for Gemini API access to drop endpoint costs by ~25%.

---

## SECTION 6 — Revenue Forecast

Assuming a blended Average Revenue Per User (ARPU) of **$210/mo** (heavy weighting towards Starter/Growth in early market entry).

| Active Customers | Estimated MRR | Estimated ARR | Blended COGS (Infra + AI) |
| :--- | :--- | :--- | :--- |
| **10** | $2,100 | $25,200 | $300 (14%) |
| **50** | $10,500 | $126,000 | $1,050 (10%) |
| **100** | $21,000 | $252,000 | $2,000 (9.5%) |
| **500** | $105,000 | $1,260,000 | $9,000 (8.5%) |

**Conclusion:** The unit economics are intensely healthy (Gross Margins consistently >85% at scale). Provided we maintain semantic caching and aggressively limit Gemini 1.5 Pro usage through platform tiering restrictions, the business models exponential cash-flow readiness prior to the 500-customer mark.
