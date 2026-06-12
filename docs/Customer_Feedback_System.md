# Customer Feedback System & Sentiment Engine

**Prepared By:** Customer Experience (CX) Architect  
**Date:** June 7, 2026  
**Product:** EffectiveBuzz B2B AI Revenue Platform  
**Target:** Maximize user engagement, isolate product friction, and increase Net Revenue Retention (NRR > 110%) by establishing a closed-loop customer feedback engine.

---

## 1. Executive Summary

Customer feedback is the primary sensor for identifying Product-Market Fit (PMF) decay and proactive churn threats. In a high-velocity SaaS, static forms are ignored. EffectiveBuzz requires a **unified, multi-channel feedback collection system** that programmatically aggregates raw touchpoints, classifies them using AI sentiment analysis, and routes them directly to engineering or customer success based on customer value and urgency.

This architecture outlines the intake channels, categorization models, AI-assisted classification engine, PostgreSQL tracking schema, and closing-the-loop product workflows.

---

## 2. Multi-Channel Collection System (UX Touchpoints)

We ingest feedback from five core sources to build a complete customer record:

```
  ┌────────────────────────────────────────────────────────┐
  │                 FEEDBACK INGESTION PIPELINE            │
  └────────────────────────────────────────────────────────┘
                              │
    ┌──────────────┬──────────┴───┬──────────────┬─────────────┐
    │              │              │              │             │
[ In-App ]     [ Support ]   [ Surveys ]   [ Interviews ]  [ Churn ]
(Micro-forms,  (Zendesk,     (NPS, PMF,     (CSM Zoom     (Post-cancel
Thunbs up/dn)   Intercom)     Typeform)      transcripts)  surveys)
    │              │              │              │             │
    └──────────────┼──────────────┴──────────────┼─────────────┘
                   ▼                             ▼
         [ HTTP JSON REST API ]        [ Manual CSV/S3 Stream ]
                   │                             │
                   └──────────────┬──────────────┘
                                  ▼
                    [ queue:feedback:ingestion ]
```

### Ingestion Definitions
*   **In-App Micro-feedback:** Contextual, single-click inputs (e.g., rating an AI-generated draft copy with a thumbs-up/down, or a floating modal: *"Help us improve this view"*).
*   **Support Tickets:** Continuous sync with Zendesk/Intercom via outbound webhooks.
*   **Direct Interviews:** Sales/CS team copies call notes or Zoom Otter.ai transcripts into the system.
*   **Structured Surveys:** Programmatic delivery of the NPS and Sean Ellis PMF surveys.
*   **Exit / Churn Interviews:** Mandated 3-question survey triggered automatically when a user clicks "Cancel Subscription" in the billing portal.

---

## 3. Categorization & Intent Model

Each raw feedback item is parsed by Gemini and mapped into one of five functional categories:

1.  **AI Performance & Copy Quality:** Complaints about hallucination, generic styles, incorrect prospect facts, or poor scoring accuracy.
2.  **Deliverability & Sending:** Mailbox connection drops, bounces, tracking domain setup confusion, or cold domains hitting spam folders.
3.  **UI/UX & Usability:** Drag-and-drop CSV upload errors, slow table loads, confusing campaign configuration, or dashboard latency.
4.  **Billing & Pricing:** Querying usage logs, credit consumption, upgrade limits, overage billing transparency, or coupon failures.
5.  **Integrations:** Requests for deeper programmatic mappings (HubSpot, Salesforce, Pipedrive, custom webhooks).

---

## 4. AI-Driven Sentiment Analysis Pipeline

To process feedback at scale without manual support overhead, incoming raw text is processed via our **AI Sentiment Pipeline**. 

### The Evaluation Dimensions
-  **Primary Sentiment Score:** Floating-point value from `-1.0` (Severe Anger/Frustration) to `+1.0` (Elated/High Delight).
-  **Urgency Matrix:** Categorized as `HIGH` (Blocks business operations), `MEDIUM` (Workflow friction), or `LOW` (Polite feature request).
-  **Implicit Threat Check (Churn Flag):** A binary boolean indicating if the customer explicitly mentions canceling their plan, switching to a competitor (e.g., Clay/Instantly), or leaving a 1-star review.

### Prompt Template (Executed Programmatically via Gemini Service)
```
Analyze the following customer feedback text. Extract the following JSON structure:
{
  "sentiment_score": (Float between -1.0 and 1.0),
  "primary_category": "AI_QUALITY" | "DELIVERABILITY" | "USABILITY" | "BILLING" | "INTEGRAL" | "UNKNOWN",
  "urgency_tier": "HIGH" | "MEDIUM" | "LOW",
  "is_churn_threat": (Boolean),
  "extracted_keywords": [String array of max 5 nouns]
}
Customer feedback:
"--- [Customer Text] ---"
```

---

## 5. Relational Database Schema (PostgreSQL)

To preserve strict tenant isolation while fueling cross-tenant aggregate sentiment dashboard charts, we structure the tables as follows:

```sql
-- Represents a single feedback item collected from any source
CREATE TABLE CustomerFeedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    source_channel VARCHAR(50) NOT NULL, -- IN_APP, SUPPORT, SURVEY, INTERVIEW, CHURN
    raw_content TEXT NOT NULL,
    associated_reference_id VARCHAR(255), -- Support Ticket ID, Campaign ID, Session ID
    
    -- AI Sentiment Analysis Outputs
    sentiment_score REAL DEFAULT 0.0, -- -1.0 to +1.0
    category VARCHAR(100) DEFAULT 'UNKNOWN',
    urgency_tier VARCHAR(50) DEFAULT 'LOW',
    is_churn_threat BOOLEAN DEFAULT FALSE,
    ai_extracted_keywords TEXT[],
    
    -- Status & Resolution Loop
    resolution_status VARCHAR(50) DEFAULT 'NEW', -- NEW, UNDER_REVIEW, SPRINT_CREATED, RESOLVED, IGNORED
    product_action_reference_id UUID, -- References Bug Tracker / Roadmap item
    assigned_owner_id VARCHAR(255),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_feedback_tenant ON CustomerFeedback(tenant_id);
CREATE INDEX idx_feedback_sentiment ON CustomerFeedback(sentiment_score);
CREATE INDEX idx_feedback_category ON CustomerFeedback(category);
CREATE INDEX idx_feedback_churn ON CustomerFeedback(is_churn_threat) WHERE is_churn_threat = TRUE;
```

---

## 6. Proactive Escalation & Close-the-Loop Workflows

To ensure customer feedback actually drives retention improvements, we link database state changes to automated notification systems:

```
                  [ FEEDBACK CAPTURED ]
                            │
                  [ AI Sentiment Run ]
                            │
               Is "is_churn_threat = true" 
               and "sentiment_score < -0.5"?
                ┌───────────┴───────────┐
               YES                      NO
                │                       │
      [ P1 Urgent Workflow ]      [ P2 Normal Loop ]
       * Alert CSM Slack Chanel   * Group into Product Backlog
       * Tag Tenant Status RED    * Map to RICE feature weightings
       * Pre-fill email draft     * Queue for weekly sprint review
```

### The "Close the Loop" CSM Routine
1.  **Direct Customer Update:** When an engineering bug-resolution task resolves an associated `product_action_reference_id`, the system queries all `CustomerFeedback` records linked to that target.
2.  **Automated Success Email:** The customer receives a tailored email from their assigned CSM or the Founder:
    > *"Hi {{first_name}}, when you reached out last month, you mentioned that uploading bulk CSV lists occasionally triggered column mismatch errors on our dashboard.*
    > 
    > *I wanted to let you know we just shipped a brand new CSV smart parser that resolves this. Your dashboard is ready—thank you for helping us make EffectiveBuzz better."*
3.  **Financial Impact:** Closing the feedback loop translates directly into customer advocacy, reducing trial churn by up to **20%** and converting early adopters into high-value case studies.
