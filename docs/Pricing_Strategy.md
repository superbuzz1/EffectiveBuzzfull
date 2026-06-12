# EffectiveBuzz: SaaS Pricing & Monetization Strategy

**Prepared By:** SaaS Pricing Strategist, CFO, & Revenue Operations Consultant
**Date:** June 7, 2026
**Project:** EffectiveBuzz
**Objective:** Maximize CAC payback speed, long-term retention, expansion MRR, and hardware/AI gross margins (>85%).

---

## SECTION 1 — Pricing Model

**Recommendation: Hybrid (Tiered Subscription + Metered Usage)**

*   **Subscription Pricing (Fixed):** Charges a predictable flat monthly rate based on feature complexity and team size (seats).
*   **Usage Pricing (Metered AI Credits):** Charges variably for AI compute (Gemini API token consumption) via "AI Credits" allowing power-users to scale naturally without forcing them into a massive subscription tier prematurely.

**Tradeoffs:**
*   *Pure Subscription:* Gives predictable revenue but crushes gross margins if a power user burns through $500 of AI API calls on a $99 plan.
*   *Pure Usage (PAYG):* Eliminates margin risk but creates unpredictable MRR and induces "taxi-meter anxiety" where users hesitate to use the platform.
*   *Hybrid (Our Choice):* Provides a baseline floor of predictable MRR (good for valuation) while protecting gross margins on variable AI costs. 

---

## SECTION 2 — Plan Structure

Pricing is structured along the value metric of team scaling and AI volume.

### 1. Starter Plan (The "Founder" Tier)
*   **Target:** Solo founders, bootstrapper startups.
*   **Monthly Price:** $99 / mo
*   **Annual Price:** $79 / mo (Billed annually)
*   **User Limits:** 1 Seat (No additional seats allowed)
*   **Workspace Limits:** 1 Workspace, 3 Connected Mailboxes
*   **AI Credits:** 1,000 Credits / mo
*   **Prospect Limits:** 5,000 Active Prospects
*   **Campaign Limits:** 3 Active Campaigns

### 2. Growth Plan (The "SDR Team" Tier)
*   **Target:** Growing sales teams with dedicated SDRs.
*   **Monthly Price:** $299 / mo
*   **Annual Price:** $249 / mo (Billed annually)
*   **User Limits:** 3 Seats included (+$49/mo per additional seat)
*   **Workspace Limits:** 1 Workspace, 10 Connected Mailboxes
*   **AI Credits:** 4,000 Credits / mo
*   **Prospect Limits:** 25,000 Active Prospects
*   **Campaign Limits:** Unlimited Active Campaigns

### 3. Scale Plan (The "Agency" Tier)
*   **Target:** Lead generation agencies and mature outbound organizations.
*   **Monthly Price:** $899 / mo
*   **Annual Price:** $749 / mo (Billed annually)
*   **User Limits:** 10 Seats included (+$39/mo per additional seat)
*   **Workspace Limits:** Up to 5 Workspaces (for client separation), 50 Mailboxes
*   **AI Credits:** 15,000 Credits / mo
*   **Prospect Limits:** 100,000 Active Prospects
*   **Campaign Limits:** Unlimited

### 4. Enterprise Plan (The "Custom" Tier)
*   **Target:** Mid-Market tech, large agencies, compliance-heavy teams.
*   **Monthly Price:** Custom (Starting at $2,500 / mo)
*   **Annual Price:** Custom (Annual contract strictly required)
*   **User Limits:** Unlimited
*   **Workspace Limits:** Unlimited Workspaces
*   **AI Credits:** Custom Volume Commit (Volume discounts applied)
*   **Features:** Custom LLM Fine-Tuning, Dedicated IP pools, SOC2 audit support, Dedicated CSM.

---

## SECTION 3 — AI Credit System

To abstract away raw API tokens, we utilize "AI Credits." 

*   **Credit Allocation:** 
    *   1 Credit = Simple Operation (e.g., Grammar check, basic reply classification via Gemini Flash).
    *   5 Credits = Complex Operation (e.g., Deep company research, multi-variable lead scoring, highly personalized email generation via Gemini Pro).
*   **Credit Consumption:** Consumed sequentially as campaigns process prospects through the pipeline.
*   **Overage Pricing (Stripe Metered Billing):** 
    *   When base allocation is exhausted, auto-refill triggers at **$20 per 1,000 Credits**. 
    *   This ensures we maintain a >80% margin on marginal AI usage.

---

## SECTION 4 — Upgrade Triggers

Product-Led Growth (PLG) relies on frictionless upgrade paths. The UI will gate users contextually:

*   **Usage Triggers:** 
    *   *AI Burn Rate:* When a workspace hits 80% of monthly AI Credit allocation, a warning banner dynamically appears. At 95%, a modal blocks the campaign builder offering a 1-click upgrade to the next tier or a one-time "Credit Top-Up".
    *   *Prospect Cap:* Attempting to upload a CSV that breaks the active prospect limit triggers the "Growth Plan" upsell.
*   **Team Growth Triggers:** 
    *   Clicking `Invite Team Member` while on the Starter Plan immediately launches a modal: "Collaboration requires the Growth Plan. Upgrade now to invite up to 3 users."
*   **Infrastructure Triggers:** 
    *   Adding a 4th email sending domain triggers the payload restrictor, forcing an upgrade from Starter to Growth.

---

## SECTION 5 — Free Trial Strategy

*   **Trial Length:** 7 Days (Reverse Trial). 
    *   *Why:* 14 or 30 days destroys urgency. A 7-day trial forces the user to import data and launch a campaign *this week*.
*   **Trial Limits (Protection against abuse):** 
    *   Full feature access (Growth Tier features are unlocked).
    *   Hard-capped at 250 AI Credits and maximum 50 outbound emails to prevent bad actors from spinning up free accounts to spam networks and drain our API budget.
*   **Conversion Path:**
    *   On Day 5, an automated email sends the user's "Campaign Output Report". 
    *   If no credit card is on file upon Day 7 expiry, the account locks to "Read-Only" mode. Campaigns are paused immediately.

---

## SECTION 6 — Revenue Forecast

Based on the Hybrid model and a Blended Average Revenue Per Account (ARPA) heavily weighted towards the Starter and Growth tiers initially ($210 blended baseline).

| Active Customers | Subscriptions (MRR) | Expansion / Overage (15%) | **Total MRR** | **Carr / ARR** |
| :--- | :--- | :--- | :--- | :--- |
| **10** | $2,100 | $315 | **$2,415** | ~$28,980 |
| **50** | $10,500 | $1,575 | **$12,075** | ~$144,900 |
| **100** | $21,000 | $3,150 | **$24,150** | ~$289,800 |
| **500** | $105,000 | $15,750 | **$120,750** | ~$1,449,000 |

*Note: Expansion revenue acts as a compounding variable. As users succeed on the platform, their AI consumption and user seat requirements naturally rise, driving NRR (Net Revenue Retention) above 115%.*
