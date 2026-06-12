# EffectiveBuzz: RAG Memory & Cognitive Architecture

**Prepared By:** AI Systems Architect  
**Date:** June 7, 2026  
**Project:** EffectiveBuzz  
**Objective:** Architect a Retrieval-Augmented Generation (RAG) system that provides the EffectiveBuzz AI agent with long-term memory, ensuring hyper-personalized outreach based on historical CRM interactions, past emails, and institutional knowledge.

---

## SECTION 1 — Embedding Strategy

To optimize for both semantic matching and high-speed retrieval, we employ a dual-embedding model strategy.

*   **Primary Embedding Model:** `text-embedding-004` (Google). Optimized for capturing deep semantic meaning in conversational text (emails, meeting notes) and structured data (CRM fields). Output dimensions: 768.
*   **Vector Normalization:** All embeddings are normalized to unit length to allow the use of Dot Product (which is computationally cheaper) instead of Cosine Similarity for vector distance calculations.
*   **Metadata Enrichment:** Embeddings are never stored naked. Every vector is injected with deterministic metadata (`workspaceId`, `prospectId`, `campaignId`, `documentType`, `timestamp`) to allow for hard pre-filtering before the semantic search begins, guaranteeing multi-tenant data isolation.

## SECTION 2 — Chunking Strategy

Different data sources require distinct chunking strategies to preserve context without diluting the semantic weight.

*   **CRM Data (Structured):**
    *   *Strategy:* "Entity-Based Chunking." CRM records are not split. We serialize the entire prospect profile (Title, Company, Funding, Custom Fields) into a single dense JSON/YAML string and embed the entire profile as one chunk.
*   **Emails & Replies (Conversational):**
    *   *Strategy:* "Thread-Based Chunking." Individual emails are embedded as single chunks. For long threads, we use a rolling window of the last 3 replies to preserve the immediate context, while archiving older replies into a summarized "Thread Memory" chunk.
*   **Campaigns & Templates (Instructional):**
    *   *Strategy:* "Semantic Boundary Chunking." Split by explicit boundaries (e.g., Step 1, Step 2).
*   **Meeting Notes (Unstructured Long-Form):**
    *   *Strategy:* "Recursive Character Text Splitter" with an overlap. Chunk size: 512 tokens, Overlap: 50 tokens. This ensures that action items or pain points split across paragraphs retain their surrounding context.
*   **Knowledge Base (Static):**
    *   *Strategy:* "Header-Based Chunking," splitting by markdown headers (H1, H2) to isolate specific product FAQs or objection-handling scripts.

## SECTION 3 — Retrieval Architecture

To generate highly contextual outreach, retrieval must be multi-staged and extremely precise.

*   **Stage 1: Pre-Filtering (Deterministic)**
    *   Before sending the query to the vector database, the system enforces a hard metadata filter: `WHERE workspaceId = $USER_TENANT`. It further restricts by `prospectId` to only pull memories relevant to the exact person being emailed.
*   **Stage 2: Semantic Search (Dense Retrieval)**
    *   The user's prompt (e.g., "Draft an email to Sarah mentioning our last call") is converted to an embedding. The Vector DB retrieves the Top-K (K=10) most semantically similar chunks.
*   **Stage 3: Keyword Expansion (Sparse / BM25)**
    *   Simultaneously, a traditional BM25 keyword search is executed to catch exact matches (e.g., finding the exact feature name "AutoDialer" which might be missed by pure semantic vectors).
*   **Stage 4: Reciprocal Rank Fusion (RRF) & Re-Ranking**
    *   The Dense and Sparse results are merged via RRF. A lightweight cross-encoder model then re-ranks the combined Top 5 results based on immediate relevance to the specific outbound intent before passing them into the Gemini Context Window.

## SECTION 4 — Memory Architecture

EffectiveBuzz AI requires both short-term conversational context and long-term strategic memory.

*   **Short-Term Memory (The Scratchpad):**
    *   Stored in Redis. Captures the immediate drafting context (e.g., "AI, make it shorter," "AI, sound more aggressive"). This memory is flushed as soon as the campaign sequence is officially approved.
*   **Long-Term Memory (The "Brain"):**
    *   Stored in the Vector DB. Comprises historical email threads, CRM notes, and previous meeting transcripts. 
*   **Reflective Memory (Auto-Summarization):**
    *   To prevent the context window from bloating over time, a background worker runs every night. If a prospect has >20 email interactions, a Gemini Flash model reads the entire thread and creates a single "Summary Memory" chunk (e.g., "Sarah values speed, hates long emails, previously objected to pricing"). The 20 raw chunks are archived, and the single Summary Chunk takes priority.

## SECTION 5 — Vector Database Design

*   **Infrastructure Selection:** PostgreSQL with the `pgvector` extension.
    *   *Justification:* Since we already run PostgreSQL for the transactional database, adding `pgvector` reduces infrastructure complexity, guarantees ACID compliance, and allows us to JOIN relational CRM data with Vector embeddings in a single query.
*   **Index Strategy:** `HNSW` (Hierarchical Navigable Small World).
    *   Optimized for lightning-fast approximate nearest neighbor (ANN) search over millions of vectors.
*   **Schema Design (`WorkspaceMemories`):**
    *   `id` (UUID, Primary Key)
    *   `workspaceId` (UUID, Foreign Key, Indexed)
    *   `prospectId` (UUID, Foreign Key, Nullable, Indexed)
    *   `sourceType` (Enum: `CRM`, `EMAIL`, `MEETING`, `CAMPAIGN`, `KB`)
    *   `content` (Text) - The raw chunked text fed to the LLM.
    *   `embedding` (vector(768)) - The pgvector column with the HNSW index.
    *   `metadata` (JSONB) - Additional filtering tags (e.g., sentiment, tags).

---
