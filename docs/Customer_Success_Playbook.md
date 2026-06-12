# Customer Success & High-Retention Playbook

**Prepared By:** Head of Customer Success  
**Date:** June 7, 2026  
**Target Goal:** Net Revenue Retention (NRR) > 110% | Gross Revenue Retention (GRR) > 95%  
**Audience:** Customer Success team, Founders, Product Operations  

---

## 1. Executive Summary: The NRR Engine

In B2B SaaS, particularly AI outreach products, scaling to high valuations is driven entirely by **Net Revenue Retention (NRR)**. If our customers churn due to low deliverability, bad AI personalization, or high complexity, our acquisition engine becomes meaningless.

This playbook establishes a highly structured **Customer Success (CS)** motion, shifting from reactive support to proactive success engineering. Our target is to achieve **>110% NRR** by guiding accounts to their first meeting booked within 14 days, monitoring user health programmatically via database metrics, and utilizing low-friction credit-expansion loops.

---

## 2. Customer Journey & Milestone-Based Onboarding

We divide customer lifecycles into strict transition phases. The "Time-to-Value (TTV)" metric dominates the first 14 days of an account.

```
       [ Phase 1: Integration ] ──► (Hour 0 - Hour 24)
                 * Connect Gmail/Microsoft accounts via Clean OAuth.
                 * Set up tracking domains and warm-up pipelines.
                           │
                           ▼
       [ Phase 2: First Send ] ──► (Day 1 - Day 3)
                 * Upload first list of verified prospects.
                 * AI generation of initial sequence and launch.
                           │
                           ▼
       [ Phase 3: The Aha! Moment ] ──► (Day 4 - Day 14)
                 * Capture first reply and view AI intent classification.
                 * FIRST BOOKED MEETING logged in CRM.
```

### CS High-Touch Protocol (Growth & Scale Tiers)
- **Day 1: Kickoff Strategic Call (15 Minutes):** Establish their ICP, review their value proposition, and configure the target sender emails.
- **Day 7: Performance Check-in (Automated/Manual Blend):** Scan open rate and bounce rates. If open rates are <30%, trigger a CS team email to manually assist with DNS settings (SPF/DKIM/DMARC) or suggest warm-up optimizations.
- **Day 14: Review & Scale:** Review positive replies and audit the AI classification correctness. Optimize prompt templates.

---

## 3. Account Health Score Framework (SaaS Metrics)

Health scores are calculated nightly via automated PostgreSQL aggregations and piped to our CS dashboard. We rank account health on a scale of `0 to 100` based on 5 weighted pillars:

```
    [ Active Mailbox Ratio ] (30% weight) -- Connected vs. active mailboxes
              +
    [ AI Verification Rate ] (20% weight) -- % of generated drafts sent without manual edits
              +
    [ Credit Run Rate ]      (25% weight) -- Monthly credit depletion speed
              +
    [ Email Open Rate ]      (15% weight) -- Average campaign open rates
              +
    [ Login Velocity ]       (10% weight) -- Weekly active users (WAU) per account
```

### Health Categories & Actions
*   **Green (Score 80 - 100): Healthy and Scaling.**
    *   *System Action:* Flag for expansion. Target for custom annual contract discounts, referral requests, or enterprise upgrade prompts.
*   **Yellow (Score 50 - 79): Mild Risk / Under-optimized.**
    *   *System Action:* Trigger automated tip workflows in-app showing the user how to A/B test sequence copy and optimize subject lines.
*   **Red (Score < 50): Critical Churn Risk.**
    *   *System Action:* Raise P3 CS alert in Slack. CSM is assigned to perform an immediate manual audit of the campaign deliverability logs, research prospect data, and pitch a custom remediation call.

---

## 4. Key Retention Metrics (The CS Dashboard)

Our team tracks these 4 core metrics at every weekly review:

1.  **Weekly Active Workspace (WAW) Ratio:** Active workspaces executing at least 1 campaign / Total workspaces. Target: `> 75%`.
2.  **Edit Rate Decay:** The speed at which users reduce editing AI-generated copy. Target: `Edits drop from 60% on Day 1 to <25% by Day 30`. (Indicates trust in the AI engine).
3.  **Deliverability Index:** Percentage of connected mailboxes with a bounce rate under 2%. Target: `> 95%`.
4.  **Meeting Booking Velocity:** Average number of days between workspace signup and first CRM-logged meeting booking. Target: `< 11 days`.

---

## 5. Seamless Expansion Strategy (Upsells & Cross-sells)

To exceed 110% NRR, we must expand accounts naturally without aggressive high-pressure sales calls.

### A. The "Auto-Refill" Credit Trigger
- When credit balance falls below 10%, present a toggle in the Billing panel: *"Enable smart credit auto-refill"*.
- **Mechanism:** Automatically buy an extra package of 1,000 credits for $20 when they run out, avoiding campaign pause.

### B. Team Growth Seats (The CS Script)
- When a single account seat exceeds 8 hours a week inside the Inbox and Campaign dashboards:
  - *Trigger Email:* *"Hey [Admin Name], you're spending a lot of time reviewing drafts. Would you like to add 2 Manager Seats so your sales leads can review their own generated sequences directly?"*

### C. The Dedicated IP / Domain Upsell
- Once an agency account reaches 30+ connected mailboxes, prompt an automatic upgrade to Scale/Enterprise:
  - *"You've hit the volume threshold for shared tracking domains. Upgrade to our dedicated infrastructure bundle to secure isolated IP pools and a private tracking server."*

---

## 6. Proactive Churn Prevention System

Churn is rarely a surprise; it is preceded by weeks of quiet product abandonment (Ghosting).

### Scenario A: Sinking Deliverability (The Firewall)
- **Symptom:** Workspace bounce rate spikes above 5% on a newly uploaded prospect list.
- **Action Plan:**
  1. We pause the active campaign queue automatically to protect the mailbox reputation.
  2. Display an in-app wizard: *"Deliverability Warning. Your bounce rate is high, putting your domain at risk. Let us automatically verify your list for free."*
  3. Offer a free 1,000 email-validation voucher via an integration with a cleansing provider.

### Scenario B: Low Event Engagement (The Re-engagement Loop)
- **Symptom:** Workspace has not executed an AI job or sent an email in 7 days.
- **Action Plan:**
  1. Trigger an automated webhook email from the Founder: *"Hey [Name], noted your campaign is paused. Did the AI copy not hit the right tone, or did the prospect list have formatting issues? I'm happy to jump on a call and script a custom prompt structure for your company."*
  2. CS team schedules a manual sync audit.

### Scenario C: Payment Method Failure (The Grace Period)
- **Symptom:** Stripe payment fails on invoice renewal.
- **Action Plan:**
  1. Do not instantly terminate access (this drives immediate, high-friction churn).
  2. Transition account to `Past Due` and keep active for 7 days (Soft Grace Period).
  3. Customize the in-app experience: Add a non-invasive header banner showing: *"Renewal failed. Please update credit card to preserve active campaigns."*
  4. Auto-retry billing at Day 3, 5, and 7 before moving account to `Canceled` state.
