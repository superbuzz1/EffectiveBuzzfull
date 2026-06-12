# EffectiveBuzz: Enterprise Revenue Knowledge Graph Architecture
**Version:** 1.0.0-PROD  
**Classification:** CHIEF DATA PLATFORM ARCHITECT SPECIFICATION  
**Author:** Lead Data Platform Architect  
**Date:** June 12, 2026  

---

## EXECUTIVE DATA PLATFORM SCHEMA
A strategic modern organization requires more than standalone tables; it demands a **Revenue Knowledge Graph (RKG)** that maps interactions across the entire sales lifecycle. By representing **Companies, Prospects, Campaigns, Emails, Meetings, Opportunities, and Customers** as nodes and edges, EffectiveBuzz uncovers hidden sales paths, automates deep attribution, and powers model-guided context retrieval.

```
                  ┌────────────────────────┐
                  │        Campaign        │
                  └───────────┬────────────┘
                              │ LAUNCHED_WITH
                              ▼
                  ┌────────────────────────┐
                  │         Email          │
                  └───────────┬────────────┘
                              │ SENT_TO (outbound)
                              ▼
┌──────────────┐  REPRESENTS  ┌────────────────────────┐  CREATED_UNDER ┌──────────────┐
│   Company    │◄─────────────┤        Prospect        ├───────────────►│ Opportunity  │
└──────┬───────┘              └───────────┬────────────┘                └──────┬───────┘
       │                                  │ ATTENDED                           │
       │ UNDER_CONTRACT                   ▼                                    │ TRANSITIONED
       │                      ┌────────────────────────┐                       ▼
       └─────────────────────►│        Meeting         │                ┌──────────────┐
                              └────────────────────────┘                │   Customer   │
                                                                        └──────────────┘
```

---

## 1. GRAPH SCHEMA (NODE DEFINITIONS)

The RKG defines strict schema layers, mapping properties and indices for high-volume traversals:

### Node A: `Company` (Enterprise Entity)
*   **Description:** Represents a target or existing business organizational workspace.
*   **Properties:**
    *   `id` (STRING, Unique Index): Unique domain hash (e.g., `"corp_stripe_com"`).
    *   `name` (STRING): Legal name of company.
    *   `industry` (STRING): Primary industry sector.
    *   `employees` (INT): Headcount scale.
    *   `estimatedARR` (DECIMAL): Annual recurring revenue benchmark.
    *   `dnsStatus` (STRING): Registered status of core DNS records (e.g., `"SPF_incomplete"`).

### Node B: `Prospect` (Contact Entity)
*   **Description:** Represents a human contact linked to a company target workspace.
*   **Properties:**
    *   `id` (STRING, Unique Index): Verified email address.
    *   `firstName` / `lastName` (STRING): Personal names.
    *   `roleRank` (STRING): Hierarchical rank (e.g., `"C_SUITE"`, `"LEAD"`).
    *   `sentimentScore` (FLOAT, 0.0-1.0): Current sentiment bias inferred by the Reply Agent.

### Node C: `Campaign` (Marketing Loop Entity)
*   **Description:** Represents an outbound sequencing marketing loop.
*   **Properties:**
    *   `id` (STRING, Unique Index): Campaign UUID.
    *   `name` (STRING): Description of hook theme.
    *   `model` (STRING): Underlying model powering sequences (e.g., `"gemini-3.5-flash"`).
    *   `status` (STRING): Running state.

### Node D: `Email` (Outbox Transaction Entity)
*   **Description:** Represents an outbox dispatch or incoming response payload.
*   **Properties:**
    *   `id` (STRING, Unique Index): Internet Message-ID header.
    *   `subject` (STRING): Subject line copy.
    *   `status` (STRING): Dispatch state (e.g., `"DELIVERED"`, `"BOUNCED"`, `"OPENED"`).
    *   `vectorEmbedding` (FLOAT[]): 768-dimension semantic token representation.

### Node E: `Meeting` (Sales Validation Entity)
*   **Description:** Represents an interactive call or calendar appointment block.
*   **Properties:**
    *   `id` (STRING, Unique Index): Calendar event ID.
    *   `scheduledTime` (TIMESTAMP): Date-time.
    *   `transcriptSummary` (STRING): Core takeaways from transcript analysis.
    *   `outcomeState` (STRING): Sales outcome (e.g., `"DEMO_COMPLETED"`, `"NO_SHOW"`).

### Node F: `Opportunity` (Financial Pipeline Entity)
*   **Description:** Represents an active negotiation sequence or sales deal record.
*   **Properties:**
    *   `id` (STRING, Unique Index): CRM record UUID.
    *   `amount` (DECIMAL): Estimated pipeline contract value.
    *   `stage` (STRING): Sales funnel phase (e.g., `"PROPOSAL"`, `"CLOSED_WON"`).
    *   `forecastRisk` (FLOAT): Estimated failure variance indicators.

### Node G: `Customer` (Contracted Account Entity)
*   **Description:** Represents an active workspace tenant paying for the platform.
*   **Properties:**
    *   `id` (STRING, Unique Index): Payment tenant UUID.
    *   `contractARR` (DECIMAL): Confirmed active ARR contribution.
    *   `churnRisk` (FLOAT): Monitored churn probability.
    *   `renewalDate` (DATE): Planned contract renewal timeline.

---

## 2. RELATIONSHIP ENGINE & CARDINALITY MODEL

Edges in the RKG are strongly-typed, directed, and carry active state parameters:

```
┌─────────────────┬───────────────────┬─────────────────┬───────────────────┐
│ Source Node     │ Edge Class        │ Target Node     │ Cardinality Ratio │
├─────────────────┼───────────────────┼─────────────────┼───────────────────┤
│ Prospect        │ REPRESENTS        │ Company         │ N:1               │
│ Campaign        │ LAUNCHED_WITH     │ Email           │ 1:N               │
│ Email           │ SENT_TO           │ Prospect        │ N:1               │
│ Prospect        │ ATTENDED          │ Meeting         │ N:M               │
│ Prospect        │ CREATED_UNDER     │ Opportunity     │ N:1               │
│ Opportunity     │ TRANSITIONED      │ Customer        │ 1:1               │
│ Customer        │ UNDER_CONTRACT    │ Company         │ 1:1               │
└─────────────────┴───────────────────┴─────────────────┴───────────────────┘
```

*   **Attribute Propagation:** Relationships carry transaction-level metrics (e.g., `Email -[OPENED_AT {time}]-> Prospect` or `Prospect -[BOOKED {channel, date}]-> Meeting`).
*   **Transitive Derivation:** If `Prospect` is linked to `Company` and coordinates high semantic scores across `Meeting` logs, the `Opportunity` node dynamically inherits positive win-rate boosts.

---

## 3. GRAPH QUERY STRATEGY (CYPHER & HYBRID SQL)

The RKG leverages Neo4j Cypher and hybrid relational SQL structures to run high-speed multi-hop operations:

### A. Cypher Query: Multi-Hop Attribution & Conversion Chain
Detects which sequence campaigns successfully initiated emails leading to closed opportunities:
```cypher
MATCH (c:Campaign)-[:LAUNCHED_WITH]->(e:Email)-[:SENT_TO]->(p:Prospect)
MATCH (p)-[:CREATED_UNDER]->(o:Opportunity)-[:TRANSITIONED]->(cust:Customer)
WHERE o.stage = "CLOSED_WON"
RETURN c.name AS CampaignName, SUM(cust.contractARR) AS TotalARRWon
ORDER BY TotalARRWon DESC
```

### B. Cypher Query: Warm Contact Mapping & Meeting Discovery
Lists companies that have high sentiment reply metrics but no booked meeting:
```cypher
MATCH (comp:Company)<-[:REPRESENTS]-(p:Prospect)
MATCH (e:Email)-[r:RECEIVED_FROM]->(p)
WHERE p.sentimentScore > 0.82
AND NOT (p)-[:ATTENDED]->(:Meeting)
RETURN comp.name AS TargetCompany, p.id AS ExpertContact, p.sentimentScore AS Sentiment
LIMIT 10
```

---

## 4. AI EXTRACTION & INTEGRATION STRATEGY

Unstructured communications (such as emails and meeting transcripts) are synthesized into structured triplets on the fly:

```
Unstructured Text (Email) ────────► Gemini Model ────────► Graph Triplets ────────► DB Ingestion
(e.g., "I chatted with Sarah                              (Sarah:Prospect)-        (Graph db nodes)
from Stripe and scheduled                                  [:BOOKED]->(Meeting)
a sync for Monday.")
```

1.  **AI-Guided Extraction (NLP Triplets):** On inbound events, specialized Gemini-3.5-Flash processors parse incoming messages to extract entities, verifying names against CRM records and appending relationships.
2.  **Entity Resolution & Deduplication:** When a contact interacts with different emails (`s.jobs@apple.com` and `jobs@apple.com`), the system runs cosine-similarity passes across metadata histories to merge matching profiles.
3.  **Graph-Augmented QA (GraphRAG):** When generating sequence responses, the Reply Agent queries the local graph database first, loading exact historical relationships (e.g., *"Sarah booked a demo last month but had SPF failures"*) to dynamically form high-context personalization strings.

---
**ENTERPRISE REVENUE KNOWLEDGE GRAPH SPECIFICATION SECURED**  
Lead Data Platform Architect | EffectiveBuzz Data Infrastructure Group | June 12, 2026
