# EffectiveBuzz: Sprint 2 Execution Plan (Core SaaS Logic & Growth)

**Prepared By:** VP of Engineering  
**Date:** June 17, 2026  
**Project:** EffectiveBuzz  
**Objective:** Scale the AI outreach engine with lead enrichment and quality guardrails while initiating the inbound growth loop.

---

## SPRINT 2 OVERVIEW

With the foundational multi-tenant architecture, billing, and basic AI drafting in place, Sprint 2 focuses on **Data Depth**, **Output Quality**, and **Executive Visibility**.

| Milestone | Module | Priority | Focus |
| --- | --- | --- | --- |
| **Task 1: Lead Enrichment** | AI Outreach | CRITICAL | Web Scraping & Context Enrichment |
| **Task 2: Quality Guardrails** | AI Safety | HIGH | Spam & Cliché Checker |
| **Task 3: Executive Console** | Analytics | MEDIUM | ARR & Performance Tracking |
| **Task 4: Inbound Loop** | Conversational | MEDIUM | Embeddable Chat Widget v1 |

---

## TASK 1: Lead Enrichment Engine (EB-TASK-302)

**Objective:** Move beyond static company descriptions by scraping real-time data from prospect websites to fuel high-fidelity AI drafts.

*   **1.1 Web Scraper Service:** Implement a backend utility to fetch and parse target URLs, extracting landing page meta-tags and core "hero" text.
*   **1.2 Enrichment Controller:** Create endpoints to store and retrieve enriched company profiles within the tenant-isolated schema.
*   **1.3 AI Context Integration:** Update `DraftingService.ts` to automatically inject scraped value drivers into the Gemini prompts.

---

## TASK 2: AI Quality Guardrails (EB-STORY-301)

**Objective:** Protect domain reputation by ensuring AI drafts are free from "spammy" language and overused sales clichés.

*   **2.1 Cliché Analyzer:** Build a regex and NLP-based checker to identify high-risk phrases (e.g., "revolutionary," "once-in-a-lifetime," "synergy").
*   **2.2 Edit-Delta Tracker:** Implement backend logic to track the Levenshtein distance between AI drafts and human-approved versions to measure AI performance.
*   **2.3 Review UI Update:** Add "Deliverability Score" and "Cliché Warnings" to the `DraftReview` interface.

---

## TASK 3: Executive Command Center (EB-EPIC-05)

**Objective:** Provide workspace owners and EB executives with high-level visibility into platform health and financial growth.

*   **3.1 Analytics Aggregator:** Develop optimized PostgreSQL queries to aggregate ARR, active subscriptions, and total outreach volume per tenant.
*   **3.2 Performance Dashboard:** Build the `Analytics` surface using Recharts to visualize conversion rates and credit usage trends.
*   **3.3 Alert System:** Implement the "Integration Health" card to flag tenants with failing DNS or disconnected CRMs.

---

## TASK 4: Conversational Inbound Concierge (EB-EPIC-06)

**Objective:** Launch the first version of the embeddable chat widget to capture and qualify inbound leads automatically.

*   **4.1 Widget Script:** Build a lightweight, asynchronously loading React component that can be embedded on any site via a `<script>` tag.
*   **4.2 Qualification API:** Implement the `/api/v2/conversational/qualify` endpoint to process chat transcripts and auto-create leads in the CRM.
*   **4.3 Widget Styling:** Ensure the widget follows the "Liquid Glass" design system for a premium, low-friction user experience.

---

## DEFINITION OF DONE (DD)

*   [ ] **Lead Enrichment:** Scraped data is successfully used in 100% of generation requests.
*   [ ] **Quality Guardrails:** Deliverability score is visible in the Draft Review UI.
*   [ ] **Executive Console:** ARR and Edit-Delta charts are rendering live data.
*   [ ] **Inbound Loop:** Chat widget successfully auto-provisions a lead in the DB.
*   [ ] **Verification:** All 104+ existing tests pass, and new tests cover 100% of new routes.
*   [ ] **Deployment:** Sprint 2 code is live on `effectivebuzz.online`.
