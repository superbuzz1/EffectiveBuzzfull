# EffectiveBuzz: AI Agent Orchestration Architecture

**Prepared By:** AI Agent Architect  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Objective:** Architect the multi-agent orchestration framework that enables specialized AI agents to collaborate autonomously, passing context and state to drive the end-to-end outbound revenue motion.

---

## SECTION 1 — The Agent Ecosystem

EffectiveBuzz utilizes a Swarm/Hierarchical multi-agent architecture. Instead of one massive, slow prompt, specialized agents handle specific domains, significantly reducing hallucination and improving latency.

1.  **Research Agent:** (The Data Gatherer). Scrapes recent news, LinkedIn profiles, 10-K filings, and company websites. Outputs structured Markdown dossiers.
2.  **Scoring Agent:** (The Analyst). Ingests the Research Agent's dossier and the User's ICP definition. Outputs a predictive Lead Score (0-100) and a rationale. 
3.  **Outreach Agent:** (The Copywriter). Takes the dossier, the score, and historical winning templates to draft hyper-personalized, multi-step email sequences.
4.  **Inbox Agent:** (The Router). Monitors incoming replies 24/7. Extracts intent (Positive, Negative, OOO, Later) and updates CRM status.
5.  **Qualification Agent:** (The SDR). If a reply is "interested but has questions," this agent drafts conversational replies handling objections based on the Knowledge Base.
6.  **Forecast Agent:** (The Manager). A daily batch agent that reads the aggregate Pipeline and Lead Scores to output a probabilistic ARR forecast for the workspace.

---

## SECTION 2 — Orchestration Layer

The Orchestrator acts as the "Manager," directing traffic, handling error retries, and determining which agent to invoke next. We utilize a directed acyclic graph (DAG) framework (e.g., LangGraph or custom state machine) on top of Node.js.

*   **The State Object:** As a prospect moves through the pipeline, a centralized `ProspectState` JSON object is passed between agents.
    ```json
    {
      "prospectId": "123",
      "status": "researching",
      "researchDossier": null,
      "leadScore": null,
      "drafts": [],
      "intent": null
    }
    ```
*   **The Router (Supervisor):** 
    *   Trigger: A user uploads a CSV.
    *   Step 1: Router calls the **Research Agent**.
    *   Step 2: Router waits for Research Agent payload. If successful, updates the `ProspectState` and calls the **Scoring Agent**.
    *   Step 3: If Score > 75, Router calls **Outreach Agent**. If Score < 75, Router marks prospect as "Archived" and terminates the loop (saving AI tokens).
*   **Human-in-the-Loop (HITL) Interrupts:** The Orchestrator halts execution at critical boundaries. E.g., The Outreach Agent generates the drafts, but the Orchestrator pauses the DAG, waiting for the human user to click `[Approve]` before officially passing state to the Email Dispatcher.

---

## SECTION 3 — Agent Communication

Agents do not "talk" to each other via natural language; they communicate via strict, structured JSON payloads mapped to defined Zod schemas. This ensures determinism.

*   **Schema Enforcement:** The Orchestrator enforces structured outputs using the Gemini API `responseSchema` mechanic. If the Scoring Agent fails to provide a numerical score, the Orchestrator intercepts the error and re-prompts the Scoring Agent automatically.
*   **Event-Driven Pub/Sub:** For asynchronous agents (like the Inbox Agent), communication happens via events.
    *   *Event:* `webhook.email.received`
    *   *Subscriber:* **Inbox Agent** wakes up, analyzes, and emits event: `intent.positive`.
    *   *Subscriber:* **Qualification Agent** hears `intent.positive`, reads the thread, and drafts a calendar link reply.

---

## SECTION 4 — Memory Sharing

Agents must operate with shared context to avoid redundant work and contradictory behavior.

*   **The Context Injection Pipeline:** When the Orchestrator wakes up an agent, it injects three memory types:
    1.  *Global Rules:* (e.g., "Always keep emails under 100 words.")
    2.  *The RAG Vector Payload:* The Top 3 most relevant historical interactions retrieved from PostgreSQL `pgvector`.
    3.  *The Current `ProspectState`:* The immediate findings from the preceding agents.
*   **The Feedback Loop:** 
    *   When the **Inbox Agent** categorizes a reply as "Positive," it writes that success back into the Vector DB. 
    *   The next time the **Outreach Agent** writes an email to a similar company, it pulls that "Positive" memory, recognizing which angle actually worked in reality. Over time, the agents train themselves on the user's specific market.

---

## SECTION 5 — Queue Strategy

Multi-agent systems can easily trigger API rate limits. Execution must be decoupled and queued.

*   **Infrastructure:** Redis + BullMQ (Node.js).
*   **Queue Segmentation by Speed & Model:**
    *   **`queue:inbox` (Priority 1):** Real-time. Requires sub-second response to categorize replies instantly. Powered by `gemini-2.5-flash`.
    *   **`queue:research` (Priority 2):** High volume, medium latency. Can take 1-5 minutes per prospect. Powered by `gemini-2.5-flash`.
    *   **`queue:generation` (Priority 3):** High compute. Dedicated to the Outreach Agent. Rate-limited strictly (e.g., 50 concurrent jobs) to prevent API 429 Too Many Requests errors. Powered by `gemini-1.5-pro` for deep reasoning.
    *   **`queue:forecast` (Priority 4):** Nightly batch jobs. Runs at 2:00 AM UTC when system load is minimal.
*   **Dead Letter Queues (DLQ):** If an agent fails 3 times (e.g., the website it is trying to scrape is down), the job is moved to the DLQ. The orchestrator flags the prospect in the CRM UI as `[AI Fault - Manual Intervention Required]`.
