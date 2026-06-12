# EffectiveBuzz: Churn Prediction & Retention Architecture

**Prepared By:** Customer Retention Architect  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Objective:** Predict and proactively intercept customer churn by translating platform telemetry into actionable Customer Health Scores and Retention Playbooks.

---

## SECTION 1 — Customer Health Score (CHS) Model

The Customer Health Score is a 100-point index updated dynamically based on a trailing 14-day window. A healthy account (80+ points) actively leverages the core AI and sending engines.

**Signal Weighting & Scoring (100 Points Total):**

1.  **AI Usage (30 Points):** 
    *   *Metric:* AI Credits consumed vs. Monthly Allocation.
    *   *Logic:* Generating personalized text is our core value. If AI generation stops, churn is imminent.
    *   *Score:* >70% usage = 30 pts; 30-70% = 15 pts; <30% = 0 pts.

2.  **Campaign Activity (25 Points):** 
    *   *Metric:* Number of active, sending campaigns.
    *   *Logic:* An empty outbox means the revenue engine has stalled.
    *   *Score:* >2 Active = 25 pts; 1 Active = 15 pts; 0 Active = 0 pts.

3.  **Email Volume (15 Points):** 
    *   *Metric:* Rolling 7-day outbound volume vs. historical baseline.
    *   *Logic:* Steady volume indicates consistent pipeline generation. Sudden drops indicate abandoned workflows.
    *   *Score:* Stable/Growing = 15 pts; 50% Drop = 5 pts; Zero Volume = 0 pts.

4.  **Login Frequency (15 Points):** 
    *   *Metric:* Distinct days logged in over the last 14 days.
    *   *Logic:* Power users check the Unified Inbox and Analytics 3-5 times a week.
    *   *Score:* 5+ days = 15 pts; 2-4 days = 7 pts; 0-1 days = 0 pts.

5.  **Team Activity (15 Points):** 
    *   *Metric:* Percentage of invited seats that are actively logging in.
    *   *Logic:* Single-player mode is a high churn risk. Multi-player adoption embeds the tool.
    *   *Score:* 100% active = 15 pts; 50% active = 7 pts; 1 active user = 0 pts.

---

## SECTION 2 — Churn Score Model

The Churn Score translates the CHS and data velocity into a predictive risk tier, dictating the intensity of the Customer Success intervention.

*   **Healthy (CHS: 80 - 100)**
    *   *Risk:* Low
    *   *Action:* Nurture for expansion, ask for referrals, feature in case studies.
*   **At Risk (CHS: 50 - 79)**
    *   *Risk:* Medium
    *   *Action:* Automated re-engagement workflows, in-app feature adoption prompts.
*   **Critical (CHS: < 50)**
    *   *Risk:* High
    *   *Action:* Immediate human intervention, executive outreach, 1:1 strategy session.

**Velocity Modifier (The "Sudden Drop" Rule):** 
Regardless of the overall CHS, if a workspace's AI Usage or Email Volume drops by >80% over a 7-day period, their Churn Risk is immediately escalated to **Critical**.

---

## SECTION 3 — Alert System

The telemetry engine feeds directly into the CS escalation pipeline.

*   **High-Risk Slack Alert:** Triggered immediately in `#cs-churn-alerts` when an account drops below 50 CHS or hits the Velocity Modifier.
    *   *Payload:* Workspace Name, Current CHS, Dropped Metric (e.g., "AI Usage dropped 90%"), ARR value.
*   **Billing Failure Alert:** Triggered upon failed Stripe subscription renewal or AI usage overage block.
    *   *Payload:* Immediate CSM notification to prevent service interruption.
*   **Daily Triage Dashboard:** A CRM view sorting all accounts by "Lowest Health Score" and "Consecutive Days Inactive."

---

## SECTION 4 — Retention Playbooks

Standard Operating Procedures (SOPs) based on the exact behavioral signal causing the Churn Risk.

### Playbook 1: "The Ghost Town" 
*   **Trigger:** Zero logins and zero campaign activity for 10 days.
*   **Diagnosis:** The user forgot about the tool or failed to integrate it into their daily routine.
*   **Action:** 
    *   *Automated:* Send an "ROI Digest" email showing inactive leads they are missing out on.
    *   *Human:* Loom video from the CSM showing a new benchmark template working well in their specific industry.

### Playbook 2: "Writer's Block"
*   **Trigger:** High logins, but low AI Usage and zero active campaigns.
*   **Diagnosis:** The user is logging in, looking at the screen, but doesn't know how to prompt the AI or structure a sequence.
*   **Action:** 
    *   *In-App:* Trigger a guided walkthrough of the "Campaign Wizard."
    *   *Human:* Email offering a free "Copywriting Tear-down" session to build their first drip sequence for them.

### Playbook 3: "The Campaign Crash"
*   **Trigger:** High AI Usage, high Email Volume, but Zero Inbox Activity (no replies).
*   **Diagnosis:** They are sending high volumes but getting zero engagement (likely poor deliverability or fundamentally flawed targeting). 
*   **Action:** 
    *   *Human:* Immediate technical intervention. The CSM pauses their campaigns and initiates an SPF/DKIM/DMARC deliverability audit to ensure they aren't landing in spam.

### Playbook 4: "The Champion Departure"
*   **Trigger:** Team Activity drops from multiple engaged users to zero, or the billing admin email bounces.
*   **Diagnosis:** Our internal champion left the company, and the rest of the team abandoned the tool.
*   **Action:** 
    *   *Human:* Research the company on LinkedIn to find the new VP of Sales or SDR Manager. Cold email them: "Your team has an active EffectiveBuzz account. I'd love to give you a 15-minute tour of how the previous manager was using it to book 15 meetings a month."
