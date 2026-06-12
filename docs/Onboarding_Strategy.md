# EffectiveBuzz: Onboarding & Product-Led Growth Strategy

**Prepared By:** Product-Led Growth Architect & Customer Success Director  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Objective:** Drive user activation by delivering the "Aha!" moment (first successful AI-driven campaign) in under 15 minutes.

---

## SECTION 1 — Activation Definition

To build a high-conversion PLG funnel, we must precisely quantify user success milestones.

*   **First Value Event (The "Wow" Moment):** The user connects an email account and watches the AI instantly generate a highly personalized, well-researched cold email draft for a specific prospect.
*   **Activation Event (The Anchor):** The user successfully clicks `Launch` on their first campaign targeting at least 10 prospects.
*   **Time-To-Value (TTV) Target:** Under 15 Minutes from signup to campaign launch.

---

## SECTION 2 — Onboarding Journey

The path to first value must be tightly constrained. We remove all unnecessary configuration and force focus on the golden path.

1.  **Signup & Workspace Creation:**
    *   Frictionless Google/Microsoft OAuth signup. 
    *   *Step:* "Name your workspace and sync your primary sending email."
2.  **Import Prospects:**
    *   *Step:* "Let's find your first targets." User uploads a small test CSV or manually inputs a single LinkedIn URL.
3.  **AI Research & Lead Scoring:**
    *   *System Action:* EffectiveBuzz dynamically enriches the prospect data visually on-screen. 
    *   *Aha Moment:* User watches the AI extract pain points and map them to the user's product value prop in real-time.
4.  **Generate Outreach (The Sequence Builder):**
    *   *Step:* User clicks "Generate Sequence." The engine produces a 3-step personalized drip campaign based on the AI's research. The user reviews and hits approve.
5.  **Launch Campaign:**
    *   *Step:* Final pre-flight checklist. The user activates the workflow, sending the first batch to the Resend/SMTP outbox.
6.  **Analyze Replies & Inbox:**
    *   *Step:* The user lands on the unified Inbox dashboard, ready to view classified AI replies (e.g., "Meeting Booked", "Not Interested").

---

## SECTION 3 — Product Tours & In-App Routing

We avoid long, tedious video tutorials in favor of contextual, action-oriented guidance.

*   **The "Launch in 5" Checklist:** A persistent, floating checklist widget in the bottom right corner summarizing the 4 steps to launch the first campaign. Rewards completion with digital confetti.
*   **Interactive Tours (Action-Driven):** 
    *   Instead of pointing at UI elements, pulse a beacon on the "Import Leads" button. The tour does not advance until the user actually uploads data.
*   **Contextual Tooltips:** 
    *   Hovering over "AI Lead Score" reveals a tooltip explaining *why* the AI assigned a 92/100 (e.g., "Prospect recently raised Series A, matches Ideal Customer Profile").
*   **Walkthroughs (Shadow Mode):** Provide a pre-loaded "Dummy Campaign" upon creation so users can click through a fully populated workspace to understand the end-state before importing their own data.

---

## SECTION 4 — Empty States (UX Copy & Guidance)

Empty dashboards cause churn. Every empty state must sell the value of the feature and provide a direct Call-To-Action (CTA).

*   **No Prospects (CRM View):**
    *   *Graphic:* A magnifying glass parsing a database.
    *   *Copy:* "Your revenue engine needs fuel. Import your target accounts to let our AI begin deep research."
    *   *CTA:* `[ Import CSV ]` or `[ View Sample Data ]`
*   **No Campaigns (Campaigns View):**
    *   *Graphic:* A paper airplane waiting on a runway.
    *   *Copy:* "Ready to start conversations? Create a campaign to turn your prospect list into booked meetings."
    *   *CTA:* `[ Create First Campaign ]`
*   **No Replies (Inbox View):**
    *   *Graphic:* A quiet, clean mailbox.
    *   *Copy:* "The calm before the storm. Once your campaigns send, responses will be automatically categorized here."
    *   *CTA:* `[ Review Active Campaigns ]`
*   **No Analytics (Analytics View):**
    *   *Graphic:* A faded benchmark chart.
    *   *Copy:* "Graphs look better going up and to the right. Launch a campaign to start tracking open rates, positive replies, and AI conversions."
    *   *CTA:* `[ Start Sending ]`

---

## SECTION 5 — Activation Metrics

We track cohort retention dynamically via these Boolean flags on the User/Workspace profile.

*   **Day 1 Activation (The Setup):** Connected >= 1 sending email AND imported >= 5 prospects.
*   **Day 7 Activation (The Value):** Launched >= 1 campaign and AI generated >= 10 emails.
*   **Day 30 Activation (The Habit):** Logged in >= 4 distinct days this week, replied to >= 1 inbound email via the EffectiveBuzz Unified Inbox.

---

## SECTION 6 — Success Metrics (KPI Framework)

The Customer Success team monitors these metrics weekly to measure PLG effectiveness:

1.  **Time To First Campaign (TTFC):** Median time from signup to active sending status. (Target: < 15 mins).
2.  **Activation Rate:** % of signups that hit the Day 7 Activation milestone. (Target: > 45%).
3.  **Draft Edit Rate:** % of AI-generated emails that require human edits before sending. (Target: < 30%. High edits mean the AI context needs tuning).
4.  **Free-to-Paid Conversion Rate:** % of trial users who upgrade to Starter or Growth. (Target: > 8%).

---

## SECTION 7 — Customer Success Automation

To scale guidance without bloating CS headcount, we programmatically trigger communications based on behavioral telemetry.

*   **Welcome Email (T+0 Mins):** From the Founder. Plain text. "Welcome to EffectiveBuzz. The fastest way to see the magic is to drop a LinkedIn URL into the prospect engine and watch it write."
*   **In-App Message (Day 2 - Non-Activated):** If the user hasn't launched a campaign. "Stuck on setting up your campaign? Watch a 2-minute Loom showing how I launched mine today."
*   **Upgrade Prompt (Usage Trigger):** When a user is 80% through their free AI research credits. "Your campaigns are humming! You have 150 AI credits left. Upgrade to Growth to unlock unlimited scaling."
*   **Re-Engagement Campaign (Day 10 - Inactive):** "We noticed you haven't logged in recently. Here are 3 top-performing B2B cold email templates we verified last week. Want to try them out?"
