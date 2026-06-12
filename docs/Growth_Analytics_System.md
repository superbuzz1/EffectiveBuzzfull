# EffectiveBuzz: Growth Analytics & Data Architecture

**Prepared By:** Growth Data Architect  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Objective:** Establish a rigid, scalable data tracking infrastructure aligned to the AARRR funnel (Acquisition, Activation, Retention, Revenue, Referral) to drive product-led growth decisions.

---

## SECTION 1 — Tracking Architecture

To ensure data integrity and avoid "spaghetti tracking," we will implement a centralized Customer Data Platform (CDP) model.

*   **Data Collection Layer (PostHog):** 
    Responsible for capturing client-side events, session recordings, and server-side backend events (via Node.js SDK). PostHog acts as both our product analytics GUI and our event router.
*   **Data Warehouse (Google BigQuery):**
    All raw events from PostHog, billing data from Stripe, and production database snapshots (PostgreSQL) are piped into BigQuery for complex joining and cohort analysis.
*   **Identity Resolution Engine:**
    *   `anonymousId`: Assigned upon landing exactly on the website.
    *   `userId`: Mapped to the user upon signup (UUID). `alias` is called to merge anonymous history.
    *   `groupId`: Mapped to the `workspaceId`. *Critical for B2B analytics metrics.*
*   **Visualization Layer (Metabase/Preset):**
    Sits on top of BigQuery to serve Executive and Marketing dashboards that require cross-system data joins (e.g., Marketing Ad Spend vs. Stripe MRR).

---

## SECTION 2 — Event Taxonomy (The AARRR Funnel)

We employ a strict **Object-Action** naming convention (e.g., `Campaign Launched`, never `launch_campaign`) formatted in Proper Case to maintain database cleanliness.

### 1. Acquisition Events (Top of Funnel)
Tracks the pathway from stranger to signed-up user.
*   `Page Viewed` (Props: `url`, `referrer`, `utm_source`, `utm_campaign`)
*   `Demo Started` 
*   `Demo Step Completed` (Props: `step_name`, `time_spent`)
*   `Signup Initiated` 
*   `Signup Completed` (Props: `signup_method`, `domain_type`)

### 2. Activation Events (Time-to-Value)
Tracks the critical path to the "Aha!" moment.
*   `Workspace Created` (Props: `workspace_name`, `team_size`)
*   `Mailbox Connected` (Props: `provider` e.g., Gmail/Outlook)
*   `Prospects Imported` (Props: `import_method`, `prospect_count`, `valid_count`)
*   `AI Draft Generated` (Props: `generation_time_ms`, `token_cost`, `model_used`)
*   `Campaign Launched` (Props: `campaign_id`, `prospect_count`, `sequence_steps`)

### 3. Retention Events (Habit Formation)
Tracks ongoing core value utilization.
*   `Session Started` (Props: `device_type`, `os`)
*   `Inbox Viewed` 
*   `Reply Categorized` (Props: `ai_sentiment_label`, `override_applied` boolean)
*   `Analytics Dashboard Viewed` 
*   `Campaign Paused` (Props: `reason`)

### 4. Revenue Events (Monetization)
Server-side events triggered via Stripe Webhooks.
*   `Trial Started` (Props: `trial_length_days`)
*   `Subscription Upgraded` (Props: `old_plan`, `new_plan`, `mrr_delta`)
*   `Subscription Canceled` (Props: `churn_reason`, `retained_mrr`)
*   `AI Credits Purchased` (Props: `credit_package_amount`, `purchase_price`)
*   `AI Usage Limit Hit` (Props: `plan_limit`)

### 5. Referral Events (Viral Loops)
Tracks organic expansion and multi-player adoption.
*   `Team Invite Sent` (Props: `role_assigned`)
*   `Team Invite Accepted`
*   `Referral Link Copied`
*   `Workspace Shared View Created`

---

## SECTION 3 — Standardized Event Properties

Every event dispatched to the tracking engine MUST inherit a global payload context to allow for deep segmentation. 

**Global Properties:**
*   `workspace_id`
*   `user_id`
*   `plan_tier` (Free, Starter, Growth, Scale, Enterprise)
*   `user_role` (Admin, Manager, Member)
*   `billing_status` (Trialing, Active, Past_Due, Canceled)

---

## SECTION 4 — Dashboard Framework

To prevent data overwhelm, analytics are segmented into three persona-specific macro dashboards.

### 1. Executive Board (The Business Engine)
*Owned by: CEO, CRO*
*   **Net New MRR:** Split by expansion vs. new acquisition.
*   **LTV to CAC Ratio:** By marketing channel.
*   **Blended Gross Margin:** Tracking Stripe Revenue vs. Gemini API + Server costs.
*   **Gross Logo Churn:** Monthly churn percentage.
*   **Activation Rate:** % of total signups that hit `Campaign Launched`.

### 2. Product Analytics Board (The Growth Engine)
*Owned by: CPO, Growth PMs*
*   **Time-To-Value (TTV):** Median time from `Signup Completed` to `Campaign Launched`.
*   **AI Quality Index:** % of `AI Draft Generated` events that are edited by the user before sending.
*   **Feature Adoption Funnel:** Signup → Connect Mailbox → Import CSV → Generate AI → Launch. (Visualized as a drop-off funnel).
*   **Weekly Active Workspaces (WAW):** Cohorted heatmaps of login frequency.

### 3. Marketing & Acquisition Board (The Funnel Engine)
*Owned by: VP Marketing*
*   **Lead Velocity Rate:** Week-over-week growth in qualified signups.
*   **Interactive Demo Conversion:** % of `Demo Started` that result in `Signup Completed`.
*   **Trial Conversion Rate:** % of `Trial Started` that result in `Subscription Upgraded`.
*   **Attribution mapping:** Traffic volumes and conversion rates split by `utm_source` (LinkedIn vs. Organic vs. Referrals).
