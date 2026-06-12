# EffectiveBuzz: Revenue Operations & Forecasting Architecture

**Prepared By:** Revenue Operations Architect  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Objective:** Architect a predictive forecasting and pipeline intelligence engine that translates raw outbound activity into highly accurate revenue predictions, risk detection, and win probability models.

---

## SECTION 1 — Win Probability Scoring

Win probability is dynamically calculated for every active prospect in the pipeline using a weighted machine learning composite score (0-100%).

*   **Signals & Weighting:**
    *   *AI Intent Sentiment (35%):* Nuanced analysis by the Inbox Agent. A reply stating "Let's review this next quarter" is weighted lower than "I'm available Thursday to see a demo."
    *   *ICP Match Score (25%):* Calculated by the Scoring Agent during the initial research phase. High match to historical closed-won profiles yields a higher baseline probability.
    *   *Engagement Velocity (25%):* Time-to-reply. Prospects who reply to an outbound email within 2 hours have a exponentially higher win probability than those who reply 5 days later.
    *   *Stakeholder Authority (15%):* Title matching (e.g., "VP of Sales" vs "Sales Development Rep").
*   **Decay Mechanics:** Win probability decays by 2% for every 24 hours a deal remains stagnant without a clear next step or calendar booking.

## SECTION 2 — Pipeline Risk Detection

Risk detection acts as an early warning system for Sales Managers, flagging accounts that appear active but possess hidden qualitative risks.

*   **The "Happy Ears" Detector:** The AI scans email thread sentiment. If the SDR marks the lead as "High Probability" but the AI detects objection keywords (e.g., "budget freeze," "re-org," "existing vendor contract"), the deal is flagged with a `Qualitative Mismatch Risk`.
*   **Single-Threading Risk:** Deals where the SDR is only communicating with one stakeholder. The system flags the account: *"Warning: Single-threaded. Recommend generating a secondary campaign targeting the CFO."*
*   **Ghosting Detection:** If a positive reply was received, but there has been zero outbound or inbound activity for >7 days, the system triggers a `Stalled Deal` alert to the manager's dashboard.
*   **Competitor Mention Trap:** The AI Inbox Agent specifically parses for competitor names. If detected, the deal is flagged, and the Qualification Agent automatically suggests a battle-card handling script to the SDR.

## SECTION 3 — Revenue Prediction

Translating leading indicators (outlets) into lagging indicators (revenue).

*   **The Conversion Waterfall Model:**
    *   *Stage 1:* Total Outbound Volume (e.g., 10,000 emails sent)
    *   *Stage 2:* Historical Open -> Reply Rate (e.g., 5% = 500 replies)
    *   *Stage 3:* Historical Positive Sentiment % (e.g., 20% = 100 positive intents)
    *   *Stage 4:* Meeting Booking Rate (e.g., 50% = 50 booked meetings)
    *   *Stage 5:* Historical Close Rate & ACV (Average Contract Value). 
*   **Dynamic ACV Application:** The system does not use a flat ACV. It looks at the company size and industry of the current active pipeline and applies tailored expected deal values.
*   **The "Pipeline Coverage" Metric:** The system calculates if the SDR team has enough raw top-of-funnel volume firing today to hit their revenue quota 60 days from now, explicitly accounting for the sales cycle length.

## SECTION 4 — Forecasting

Forecasting moves away from SDR "gut feelings" towards a purely deterministic, AI-driven model.

*   **The Nightly Forecast Agent:** A batch job runs every night via BullMQ. It aggregates every single prospect's Win Probability * Estimated Deal Value.
*   **Three-Tiered Forecast Output:**
    *   *Commit:* > 80% Win Probability (Contracts out, verbal yes recorded in email).
    *   *Best Case:* 40% - 79% Win Probability (Positive replies, meetings booked but not held).
    *   *Pipeline:* < 40% Win Probability (Campaigns currently in flight).
*   **Cohort Analysis:** The dashboard allows managers to view the forecast grouped by SDR, by specific Outreach Campaign (e.g., "Did the ZIRP-era startup campaign generate more Commit revenue than the Series-B campaign?"), and by industry vertical.
*   **Accuracy Tracking:** The system logs its own prediction accuracy. If the Forecast Agent predicted $50k in revenue for Q2 and the SDRs only closed $30k, the model initiates a recursive analysis to adjust its internal Win Probability weighting for Q3.
