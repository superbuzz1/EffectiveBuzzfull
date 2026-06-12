# EffectiveBuzz: Product Prioritization & Governance Framework

**Prepared By:** Chief Product Officer  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Objective:** Establish a rigorous, data-driven methodology for feature prioritization balancing engineering effort, strategic business impact, and rapid PMF iteration.

---

## SECTION 1 — Product Governance

### The Product Council
Product governance is managed by the Product Council (CPO, CTO, CRO, CEO), meeting monthly. The Council's mandate is to align engineering output with the ARR targets and strategic vision.

### Input Funnel & Triage
1.  **Customer Feedback:** Aggregated by Customer Success and Sales into the "Voice of Customer" backlog.
2.  **Engineering Tech Debt:** Submitted by the CTO/Engineering Leads to ensure scalability.
3.  **Strategic Bets:** Sourced from the CEO/CPO to expand TAM and defend against competitors.

### Intake Rules (The Default to "No")
*   No feature enters the immediate sprint without passing the RICE scoring threshold.
*   Feature requests driven by a single loud customer are blocked unless corroborated by >5 additional ICP accounts or tied to an Enterprise deal >$50k ARR.

---

## SECTION 2 — Roadmap Scoring Framework

To evaluate feature requests objectively, EffectiveBuzz employs a hybrid scoring model depending on the confidence level and scope of the initiative.

### 1. RICE Framework (For Core Roadmap & Heavy Engineering Features)
*Used for features requiring >2 weeks of engineering effort.*
*   **Reach:** How many users will this impact in a quarter? (e.g., 500 users)
*   **Impact:** How much will this move the needle on our North Star metric? (3 = Massive, 2 = High, 1 = Medium, 0.5 = Low)
*   **Confidence:** How sure are we about these estimates? (100% = High, 80% = Medium, 50% = Low)
*   **Effort:** How many "Person-Months" will this take? (e.g., 2 person-months)
*   **Score Calculation:** (Reach x Impact x Confidence) / Effort.

### 2. ICE Framework (For Growth Experiments & PLG Tweaks)
*Used by the Growth Team for rapid A/B tests and UX optimizations.*
*   **Impact:** If this works, how big is the impact? (Scale 1-10)
*   **Confidence:** How confident are we that this will work? (Scale 1-10)
*   **Ease:** How easy is it to build and launch? (Scale 1-10)
*   **Score Calculation:** Impact * Confidence * Ease.

### 3. MoSCoW Method (For Sprint Scoping & Release Boundaries)
*Used once a feature is approved, to define the Minimum Viable Product (MVP) boundaries.*
*   **Must Have:** Critical for the release. Without this, the feature is useless.
*   **Should Have:** Important, but not absolutely vital. Can be fast-followed.
*   **Could Have:** Nice to have. Only included if engineering finishes early.
*   **Won't Have:** Explicitly out of scope for this current cycle.

---

## SECTION 3 — Quarterly Planning System

### Weeks 1-4: The Discovery Phase
*   Product Managers conduct user interviews.
*   CSM data and Sales loss-reasons are compiled.
*   Initial PRDs (Product Requirement Documents) are drafted for top initiatives.

### Weeks 5-8: The Scoring & Scoping Phase
*   All proposed initiatives are run through the RICE framework.
*   Engineering provides t-shirt size estimates (Small, Medium, Large) to determine the "Effort" denominator.
*   The top 5 initiatives based on RICE scores are advanced to the Product Council.

### Weeks 9-10: The Product Council Lock
*   The Council debates the top 5 RICE initiatives against the strategic company goals.
*   A "Cut-line" is established based on available engineering capacity.
*   The upcoming Quarterly Roadmap is locked.

### Weeks 11-12: Sprint Preparation
*   PMs apply the MoSCoW method to the approved initiatives to strip out bloat.
*   Design hand-offs and engineering sprint architecture are finalized.
*   The company is briefed on the Q-Next Roadmap.
