import React, { useState } from 'react';
import { 
  Cpu, Database, Layers, Search, Zap, Sparkles, Code, Play, RefreshCw, 
  FileJson, Terminal, ChevronRight, Sliders, Check, Copy, ArrowRight, Lock, ShieldCheck, Mail, FileText, Compass, AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';

interface DataSource {
  id: 'crm' | 'documents' | 'emails' | 'campaigns' | 'meeting_notes';
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
  rawSample: string;
  parsedText: string;
}

const dataSources: DataSource[] = [
  {
    id: 'crm',
    name: 'CRM Workspace Cont.',
    icon: Database,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    rawSample: `{\n  "prospectId": "p-90122",\n  "fullName": "Marcus Vance",\n  "company": "CloudFin Networks Inc.",\n  "industry": "Fintech Infrastructure",\n  "contractLimit": 250000,\n  "lastActivityDate": "2026-05-12T14:24:00Z",\n  "ownerName": "Sarah Jenkins",\n  "qualificationLogs": "Verified CFO sign-off authority. Holds $250k budget. Complains of high cross-region DB latency charges."\n}`,
    parsedText: "PROSPECT Marcus Vance [p-90122] from CloudFin Networks Inc. (Fintech Infrastructure). Account Owner: Sarah Jenkins. Last Activity: May 12, 2026. Qualification metrics state Marcus holds ultimate CFO sign-off up to $250k. Primary buyer challenge: Paying excessive cloud fees due to cross-region database latency issues."
  },
  {
    id: 'documents',
    name: 'SLA & Security PDF',
    icon: FileText,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20',
    rawSample: "EffectiveBuzz Enterprise Security Policy (Doc: SEC-402, Rev. 11):\nSection 4.1.2: Multi-tenant data segregation. All system nodes MUST authenticate tenant requests on ingress. Physical isolation of cloud storage objects is enforced using randomized GCP path namespaces. In-transit data is encrypted using TLS 1.3, while at-rest database disks are sealed under AES-256 keys managed by local VPC Keyring configurations.",
    parsedText: "EffectiveBuzz Security Policy Document SEC-402 Rev 11 states: Tenant data partition boundaries are strictly enforced. All data in-transit is secured via TLS 1.3 and at-rest databases are encrypted using AES-256 keys. Partition namespaces prevent multi-tenant index overlaps in vector query searches."
  },
  {
    id: 'emails',
    name: 'Transactional Emails',
    icon: Mail,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    rawSample: "From: d.reynolds@apexinfra.io\nTo: contacts@effectivebuzz.com\nSubject: Routing Latency Spike On Multicast Namespaces\nDate: 2026-06-01\nHey Team, we hit a 32% latency slowdown in our secondary outbound marketing pool yesterday around 3 PM EST. We need immediate architecture assistance to optimize routing rules or relocate our database proxy nearer to us. Let me know what data logs you need.",
    parsedText: "EMAIL From d.reynolds@apexinfra.io Subject: Routing Latency Slowdown on Outbound Marketing Namespaces. Relates that their outbound delivery flow dropped in latency performance by 32% on June 1st. Seeking support on relocations of proxy setups."
  },
  {
    id: 'campaigns',
    name: 'Outbound Sequences',
    icon: Sparkles,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    rawSample: `{\n  "campaignId": "camp-7781a",\n  "subjectPattern": "Slicing egress bandwidth by 45% for :company",\n  "cohortName": "VPC DevOps Leads",\n  "isAbTest": true,\n  "steps": [\n    { "step": 1, "delayDays": 0, "promptSeed": "Briefly state how Zero-Trust routed networks save cost on Kubernetes." }\n  ]\n}`,
    parsedText: "CAMPAIGN Outbound Sequence [camp-7781a] Cohort: 'VPC DevOps Leads'. A/B Testing enabled. Step 1 focuses on cost reduction in Kubernetes egress fees through Zero-Trust secure network isolation."
  },
  {
    id: 'meeting_notes',
    name: 'Discovery Notes',
    icon: ChevronRight,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    rawSample: "Call transcript - June 4 Discovery Zoom. Client Champion: Tim Henderson.\nTim: 'Our main headache are cross-region state sync spikes. We have 5 regional clusters reporting into US-Central. Standard VPC egress charges are draining our Series-A capital lines.'\nSDR: 'Understood. Our proxy system targets exactly this - caching transit tables reduces overall bandwidth bills.'",
    parsedText: "MEETING CALL TRANSCRIPT June 4th Discovery with Tim Henderson. Tim explains Apex's main architectural pain: Cross-region state sync overhead. Multi-regional Kubernetes database reporting triggers heavy Cloud provider egress bills."
  }
];

export default function RAGArchitectureView() {
  const [selectedSource, setSelectedSource] = useState<DataSource['id']>('meeting_notes');
  const [chunkSize, setChunkSize] = useState<number>(256);
  const [overlapPct, setOverlapPct] = useState<number>(20);
  const [chunkingMode, setChunkingMode] = useState<'recursive' | 'fixed' | 'semantic'>('recursive');
  const [embeddingModel, setEmbeddingModel] = useState<'text-embedding-004' | 'ada-002' | 'multilingual-v3'>('text-embedding-004');
  const [retrievalMode, setRetrievalMode] = useState<'dense' | 'hybrid' | 'reranked'>('hybrid');
  const [cachingEnabled, setCachingEnabled] = useState<boolean>(true);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Search Simulator State
  const [searchQuery, setSearchQuery] = useState<string>("What did Tim Henderson say about high Kubernetes egress fees?");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchLogs, setSearchLogs] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<any | null>(null);

  // General Copy Helper
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const activeSource = dataSources.find(s => s.id === selectedSource) || dataSources[0];

  // Dynamically Compute Simulated Chunks
  const overlapCharacters = Math.floor((chunkSize * (overlapPct / 100)) * 0.7);
  const textWords = activeSource.parsedText.split(' ');
  
  // Create mock chunks based on sliders
  const chunk1Words = textWords.slice(0, Math.min(textWords.length, Math.round(chunkSize / 6)));
  const overlapWords = textWords.slice(Math.max(0, chunk1Words.length - Math.round(overlapCharacters / 6)), chunk1Words.length);
  const chunk2Words = overlapWords.concat(textWords.slice(chunk1Words.length, chunk1Words.length + Math.round(chunkSize / 6)));

  const chunk1Text = chunk1Words.join(' ');
  const chunk2Text = chunk2Words.join(' ');
  const overlapTextOutput = overlapWords.join(' ');

  // Simulate Retrieval Action
  const triggerRetrievalSimulation = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setSearchLogs([]);
    setSearchResult(null);

    const logs = [
      `[Semantic Cache] Scanning Tier-1 cache for matching query string md5...`,
      cachingEnabled && searchQuery.toLowerCase().includes("tim henderson")
        ? `[Semantic Cache] Tier-1 Cache Miss. Scanning Tier-2 Semantic Vector Space...`
        : `[Semantic Cache] Cache Hook disabled or Cache Miss. Routing to Live Index Retrieval Pipeline.`,
      `[Embedding Gateway] Forwarding query text "[${searchQuery}]" to Google GenAI Embedding broker...`,
      `[Embedding Gateway] Ingested 12 input tokens. Retreived L2-Normalized float32[] array with 768 dimensions. [Latency: 110ms]`,
      `[Vector Search] Query Vector computed. Running pgvector distance query on table [tenant_knowledge_embeddings]...`,
      retrievalMode === 'dense' 
        ? `[Index Scan] Executing cosine similarity scan with HNSW network indexes...`
        : `[Index Scan] Hybrid index route initialized: Launching PG dense vector scan + BM25 keyword matching...`,
      retrievalMode === 'hybrid' || retrievalMode === 'reranked' 
        ? `[RRF Indexer] Blending dense cosine distances (Weight: 0.65) and BM25 sparse scores (Weight: 0.35) using Reciprocal Rank Fusion...`
        : `[RRF Indexer] Skipped. Using dense vector cosine similarity metrics solely.`,
      retrievalMode === 'reranked'
        ? `[Rerank Pipeline] Ingesting top 12 raw candidates. Emitting to cross-encoder-rerank-v2 for precise relevance scoring...`
        : `[Rerank Pipeline] Skipped. Direct cosine weight mapping utilized.`,
      `[Security Guard] Validated tenant ownership criteria [tenant_id = 'tenant-1']. Blocked 4 other tenant indexes.`,
      `[Pipeline Resolved] Assembled isolated Context payload successfully.`
    ];

    for (let i = 0; i < logs.length; i++) {
      setSearchLogs(prev => [...prev, logs[i]]);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Set Dynamic Results
    setSearchResult({
      cachingUsed: cachingEnabled ? 'Tier-2 Semantic Match (L2 Cosine: 0.08)' : 'None (Completed Live DB Query)',
      latencyMs: cachingEnabled ? 6 : 142,
      strategyUsed: retrievalMode === 'dense' ? 'Dense Embedding Search' : retrievalMode === 'hybrid' ? 'Hybrid DB (pg_vector + BM25)' : 'Context-Aware Reranked Retrieval (Cross-Encoder)',
      retrievedChunks: [
        {
          source: 'Meeting notes transcript: Tim Henderson (Apex Infra)',
          similarityScore: 0.94,
          text: activeSource.parsedText
        },
        {
          source: 'CRM Lead Context Log: Sarah Jenkins (Apex Cloud)',
          similarityScore: 0.72,
          text: "Marcus Vance mentioned Sarah Jenkins advocacy. Apex Platforms wants automated VPC routed pipelines to secure regional cluster transactions with Zero-Trust ingress layers."
        }
      ]
    });
    setIsSearching(false);
  };

  // SQL Schema snippet
  const PG_VECTOR_SCHEMA_CODE = `-- 1. Enable pgvector extension on Cloud SQL database
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the unified Multi-Tenant knowledge table
CREATE TABLE IF NOT EXISTS tenant_knowledge_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(100) NOT NULL,
    source_type VARCHAR(50) NOT NULL REFERENCES tenant_data_sources(id) ON DELETE CASCADE,
    document_id VARCHAR(100),
    chunk_index INT NOT NULL,
    text_content TEXT NOT NULL,
    semantic_embedding vector(768) NOT NULL, -- 768 dimensions for text-embedding-004
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

-- 3. Provision Highly Scalable Hierarchical Navigable Small World (HNSW) Vector Index
CREATE INDEX IF NOT EXISTS knowledge_vector_hnsw_idx 
ON tenant_knowledge_embeddings 
USING hnsw (semantic_embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 4. Composite index to enforce absolute strict tenant row boundary isolation
CREATE INDEX IF NOT EXISTS knowledge_tenant_source_idx 
ON tenant_knowledge_embeddings(tenant_id, source_type);`;

  // SQL Query snippet
  const PG_VECTOR_QUERY_CODE = `-- Perform a context-aware isolated multi-tenant hybrid vector query
SELECT 
    document_id,
    source_type,
    text_content,
    metadata->>'author' as chunk_author,
    -- Calculate cosine distance (1 - cosine similarity) using operator <=>
    (1 - (semantic_embedding <=> :query_vector)) AS similarity_score
FROM tenant_knowledge_embeddings
WHERE 
    tenant_id = :activeTenantId 
    AND source_type IN (:allowedSources)
ORDER BY semantic_embedding <=> :query_vector
LIMIT :topK;`;

  return (
    <div className="space-y-6 animate-feed">
      {/* 1. Interactive Source Ingestion & Chunking Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Source Selector & Parser Panel */}
        <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold block">
              1. Multi-Format Knowledge Sources Ingestion
            </span>
            <span className="text-[10px] font-mono text-gray-400">INPUT DATA PIPELINE</span>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            EffectiveBuzz consumes data from diverse sources. Click a workspace source below to view the original ingested JSON/raw file format vs. the clean normalized plaintext representation prepared for the embedding parser.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
            {dataSources.map(ds => {
              const Icon = ds.icon;
              return (
                <button
                  key={ds.id}
                  onClick={() => setSelectedSource(ds.id)}
                  className={`p-2 rounded-lg border text-xs font-medium flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                    selectedSource === ds.id 
                      ? `${ds.bgColor} ${ds.borderColor} ${ds.color} ring-1 ring-emerald-500/30 scale-[1.02]` 
                      : 'bg-slate-950/60 border-slate-900 text-gray-400 hover:text-white hover:bg-slate-900/30'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-[10px] truncate w-full">{ds.name}</span>
                </button>
              );
            })}
          </div>

          {/* Raw vs Parsed Terminals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-mono">
            <div className="space-y-1">
              <span className="text-[9px] text-gray-400 uppercase font-mono tracking-wider font-bold block">Raw API payload packet:</span>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 h-[120px] overflow-y-auto text-gray-300">
                <pre className="whitespace-pre-wrap leading-relaxed">{activeSource.rawSample}</pre>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-teal-400 uppercase font-mono tracking-wider font-bold block">Ingestion Parsed Text Output:</span>
                <span className="text-[8px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-1 rounded">UTF-8 String</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 h-[120px] overflow-y-auto text-emerald-300/90">
                <p className="leading-relaxed font-sans font-medium text-emerald-400/95">{activeSource.parsedText}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Chunking Strategy Playground */}
        <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-sky-400 font-bold block">
                2. Real-Time Dynamic Chunker Playground
              </span>
              <span className="text-[10px] font-mono text-gray-500">CHUNK COMPILER</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Adjust chunk properties in real-time. Overlapping sections guarantee thematic context is held continuously across database boundaries, removing semantic loss during query parsing.
            </p>

            {/* Inputs sliders */}
            <div className="space-y-3 p-3 bg-slate-950 rounded-lg border border-slate-850">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-400">Chunk Token Size:</span>
                    <span className="text-sky-300">{chunkSize} tokens</span>
                  </div>
                  <input 
                    type="range" 
                    min={128} 
                    max={1024} 
                    step={64}
                    value={chunkSize}
                    onChange={(e) => setChunkSize(Number(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded" 
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-400">Overlap Ratio:</span>
                    <span className="text-sky-300">{overlapPct}%</span>
                  </div>
                  <input 
                    type="range" 
                    min={10} 
                    max={30} 
                    step={5}
                    value={overlapPct}
                    onChange={(e) => setOverlapPct(Number(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded" 
                  />
                </div>
              </div>

              {/* Chunk separator selector */}
              <div className="flex items-center gap-3 text-xs pt-1 border-t border-gray-900 mt-2">
                <span className="text-gray-400 font-mono">Splitting Model:</span>
                <div className="flex gap-1.5 bg-slate-900 p-0.5 rounded border border-slate-800 text-[10px] font-bold">
                  {[
                    { id: 'recursive' as const, label: 'Recursive Character' },
                    { id: 'fixed' as const, label: 'Fixed Token Grid' },
                    { id: 'semantic' as const, label: 'Semantic Markdown Line' }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setChunkingMode(m.id)}
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                        chunkingMode === m.id ? 'bg-sky-400 text-slate-950' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated chunks output terminal */}
            <div className="space-y-2 text-[11px] font-mono">
              <div className="p-3 bg-slate-950 rounded-lg border border-sky-900/30 space-y-2">
                <div>
                  <span className="text-[9px] bg-sky-500/15 text-sky-400 border border-sky-500/20 px-1.5 py-0.5 rounded font-bold uppercase">CHUNK #1</span>
                  <p className="text-gray-300 font-sans mt-1 leading-normal">{chunk1Text}</p>
                </div>
                {overlapWords.length > 0 && (
                  <div className="bg-amber-500/5 border border-dashed border-amber-500/20 p-1.5 rounded text-[10px]">
                    <span className="text-[8px] font-bold text-amber-500 block uppercase font-mono">Overlap Namespace segment:</span>
                    <p className="italic text-amber-400/90 leading-tight font-sans mt-0.5">"... {overlapTextOutput} ..."</p>
                  </div>
                )}
                <div className="border-t border-gray-800/80 pt-2">
                  <span className="text-[9px] bg-slate-800 text-slate-350 border border-gray-700 px-1.5 py-0.5 rounded font-bold uppercase">CHUNK #2</span>
                  <p className="text-gray-400 font-sans mt-1 leading-normal">{chunk2Text}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-gray-500 flex justify-between bg-slate-950 px-3 py-2 rounded-lg border border-slate-900">
            <span>Aggregated chunks computed: <strong>{Math.ceil(textWords.length / (chunkSize / 6 * (1 - overlapPct/100)))}</strong></span>
            <span>Target split latency: <strong>~12ms</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Embedded & Vector Model Strategy */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
          <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold block">
            3. Embedding Layer & Latency SLA Metrics
          </span>
          <span className="text-[10px] font-mono text-gray-400 font-bold">EMBEDDING METRICS</span>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed font-sans">
          Each text chunk is mapped into coordinates utilizing Google's secure vertex embedding models. High-contrast multi-lingual matching parameters guarantee fast distance computing checks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
            <label className="text-[10px] font-mono text-gray-400 uppercase font-bold block">Target API Embedding Model</label>
            <select
              value={embeddingModel}
              onChange={(e) => setEmbeddingModel(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:border-amber-400 text-xs font-mono cursor-pointer"
            >
              <option value="text-embedding-004">text-embedding-004 (Google)</option>
              <option value="ada-002">text-embedding-3-small (OpenAI)</option>
              <option value="multilingual-v3">cohere-embed-multilingual-v3</option>
            </select>

            <ul className="space-y-1.5 text-xs text-gray-400 pt-1.5 font-mono">
              <li className="flex justify-between"><span>Vector dimensions:</span> <strong className="text-white">{embeddingModel === 'text-embedding-004' ? '768 dims' : embeddingModel === 'ada-002' ? '1536 dims' : '1024 dims'}</strong></li>
              <li className="flex justify-between"><span>Max context input:</span> <strong className="text-white">2,048 tokens</strong></li>
              <li className="flex justify-between"><span>L2-norm norm:</span> <strong className="text-emerald-400">Automatic normalized</strong></li>
              <li className="flex justify-between"><span>Distance operators:</span> <strong className="text-white">Cosine similarity / dot-product</strong></li>
            </ul>
          </div>

          <div className="md:col-span-2 bg-[#090d16] border border-slate-850 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-gray-400 uppercase font-black tracking-widest block border-b border-gray-900 pb-1.5 mb-2">Simulated Normalized L2 Embeddings vector Output</span>
            <div className="bg-slate-950 p-3 rounded border border-slate-900 font-mono text-[11px] text-zinc-400 overflow-x-auto max-h-[100px] leading-relaxed">
              {embeddingModel === 'text-embedding-004' ? (
                <code>[-0.0189421, 0.0514032, 0.1245091, -0.0984123, 0.8123541, 0.0031122, -0.1541023, 0.0411209, -0.0123945, 0.1984210, -0.2154120, 0.0094123, 0.4512903, 0.1120412, -0.0381290, 0.0941203, 0.1194201, -0.1741295, ..., +750 dimensions]</code>
              ) : embeddingModel === 'ada-002' ? (
                <code>[-0.0054123, 0.0811942, -0.1102941, -0.0412042, 0.6912041, -0.0211942, -0.0941204, 0.1123940, -0.0091241, 0.2284912, -0.1541029, -0.0019412, 0.3812940, 0.0094122, -0.0981240, 0.1184912, 0.5812941, -0.2281941, ..., +1518 dimensions]</code>
              ) : (
                <code>[-0.0122941, 0.0761294, -0.1849112, -0.0123941, 0.7412940, -0.0094123, -0.1194210, 0.0984120, -0.0041290, 0.2012941, -0.1849120, -0.0054123, 0.4129401, 0.0811294, -0.0761294, 0.1094120, 0.3294101, -0.1984210, ..., +1006 dimensions]</code>
              )}
            </div>
            <p className="text-[10px] text-gray-500 font-sans mt-3">
              Normalized embeddings guarantee that cosine distance operations reduce to trivial unit floating point dot-products, speeding up database search indexing.
            </p>
          </div>
        </div>
      </div>

      {/* 3. pgvector Database Schema Definition & Direct SQL Execution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PostgreSQL pgvector schemas */}
        <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-lg space-y-3.5">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-bold block">
              4. Complete PG pgvector Database DDl Schema
            </span>
            <button
              onClick={() => handleCopyText(PG_VECTOR_SCHEMA_CODE, 'ddl-copy')}
              className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 border border-gray-800 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-300 transition-colors cursor-pointer"
            >
              {copiedText === 'ddl-copy' ? <Check className="w-3" /> : <Copy className="w-3" />}
              {copiedText === 'ddl-copy' ? 'Copied' : 'Copy DDL'}
            </button>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            Our Cloud SQL database runs PostgreSQL with the <code>pgvector</code> extension. By using <code>HNSW</code> cosine vector indexes, vector distance computations run in <strong className="text-white">O(log N)</strong> complexity rather than raw tablescans.
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 font-mono text-[11px] leading-relaxed max-h-[290px] overflow-y-auto text-teal-400/90 shadow-inner">
            <pre>{PG_VECTOR_SCHEMA_CODE}</pre>
          </div>
        </div>

        {/* Real-world Vector Search Query snippet */}
        <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-lg space-y-3.5">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-teal-400 font-bold block">
              5. Isolated Multi-Tenant Vector Query
            </span>
            <button
              onClick={() => handleCopyText(PG_VECTOR_QUERY_CODE, 'query-copy')}
              className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 border border-gray-800 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-300 transition-colors cursor-pointer"
            >
              {copiedText === 'query-copy' ? <Check className="w-3" /> : <Copy className="w-3" />}
              {copiedText === 'query-copy' ? 'Copied' : 'Copy SQL'}
            </button>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            This SQL snippet describes how queries validate tenant boundary partitions. By forcing a strict filter match on <code className="text-purple-400">tenant_id</code> before referencing vector parameters, we ensure zero cross-tenant database leaks.
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 font-mono text-[11px] leading-relaxed max-h-[290px] overflow-y-auto text-teal-400/90 shadow-inner">
            <pre>{PG_VECTOR_QUERY_CODE}</pre>
          </div>
        </div>
      </div>

      {/* 4. Complete Retrieval Sandbox */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
          <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-bold block">
            6. Interactive Live Retrieval & Hybrid Ranking Sandbox
          </span>
          <span className="text-[10px] font-mono text-gray-400">RETRIEVAL ENGINES</span>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed font-sans">
          Test our retrieval layers. Enter a question mapping our business cohorts data (e.g. Acme, Tim Henderson, latency spikes, K8s egress bills) and choose the search strategy.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
          {/* Inputs Column */}
          <div className="lg:col-span-5 space-y-4 text-xs font-mono">
            {/* Strategy Select */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 space-y-2">
              <span className="text-gray-400">Retrieval Search Strategy:</span>
              <div className="flex flex-col gap-1.5 pt-1.5">
                {[
                  { id: 'dense' as const, label: 'Dense Vector Cosine Match', desc: 'Fast semantic scans; optimized for conceptual subjects.' },
                  { id: 'hybrid' as const, label: 'Hybrid search (pgvector + BM25 keyword)', desc: 'Blends conceptual embeddings and exact keyword indices.' },
                  { id: 'reranked' as const, label: 'Cross-Encoder Reranked Context', desc: 'Queries top 20 candidates, then computes precision re-weighting.' }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setRetrievalMode(r.id)}
                    className={`w-full text-left p-2 rounded border text-xs leading-normal font-sans transition-all cursor-pointer ${
                      retrievalMode === r.id 
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-300 font-semibold' 
                        : 'bg-slate-900 border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="block font-semibold font-mono text-[10px] uppercase tracking-wide">{r.label}</span>
                    <span className="text-[9px] text-gray-400 font-normal">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cache Mode */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-gray-400 block font-bold font-mono">Double-Tier Semantic Caching:</span>
                <p className="text-[10px] text-gray-500 font-sans">Eliminates repeated model calls for query distances &lt; 0.12</p>
              </div>
              <button
                type="button"
                onClick={() => setCachingEnabled(!cachingEnabled)}
                className={`px-3 py-1 rounded text-[10.5px] font-bold font-mono transition-all cursor-pointer ${
                  cachingEnabled ? 'bg-emerald-500 text-slate-950 shadow-inner' : 'bg-slate-800 text-gray-400'
                }`}
              >
                {cachingEnabled ? 'ACTIVE (Redis)' : 'DISABLED'}
              </button>
            </div>

            {/* Query Search */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase font-black tracking-widest block">User Search Query:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={triggerRetrievalSimulation}
                  disabled={isSearching}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold rounded flex items-center gap-1.5 transition-all text-xs cursor-pointer"
                >
                  {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                  Execute
                </button>
              </div>
            </div>
          </div>

          {/* Console Output column */}
          <div className="lg:col-span-7 bg-[#090d16] border border-slate-850 rounded-xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-gray-900 pb-1.5">
                <span className="text-[10px] uppercase font-mono font-bold text-gray-400">Search Engine Pipeline Console</span>
                <span className="text-[9px] bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 px-1.5 py-0.5 rounded uppercase font-mono font-bold">STRICT_RBAC_ACTIVE</span>
              </div>

              {/* Logs display */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 h-[170px] overflow-y-auto text-[10.5px] font-mono text-gray-400 leading-relaxed space-y-1 shadow-inner">
                {searchLogs.length === 0 ? (
                  <p className="text-gray-500 italic">No query has been executed yet. Click "Execute" to run the search simulation engine pipelines...</p>
                ) : (
                  searchLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-1">
                      <span className="text-emerald-500 shrink-0">➜</span>
                      <span>{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Results Frame */}
            {searchResult && (
              <div className="bg-slate-950 p-4 rounded-lg border border-teal-900/40 space-y-3 p-3 animate-feed">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-900 pb-2 text-[10px] font-mono">
                  <div className="text-emerald-400">Query Resolved Successfully</div>
                  <div className="text-zinc-400">Latency: <span className="text-orange-400 font-bold font-mono">{searchResult.latencyMs}ms</span></div>
                  <div className="text-zinc-400">Cache Key: <span className="text-emerald-300 font-mono">{searchResult.cachingUsed}</span></div>
                </div>

                <div className="space-y-2.5">
                  {searchResult.retrievedChunks.map((c: any, i: number) => (
                    <div key={i} className="text-xs p-2.5 bg-slate-900/80 rounded border border-slate-850/60 leading-normal space-y-1">
                      <div className="flex justify-between text-[10px] font-mono font-bold">
                        <span className="text-sky-300 truncate max-w-[70%]">{c.source}</span>
                        <span className="text-emerald-400/90 bg-emerald-500/10 px-1 rounded">Score similarity: {c.similarityScore}</span>
                      </div>
                      <p className="text-gray-300 leading-normal font-sans font-normal pt-1">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Caching & Semantic Efficiency Metrics */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-lg space-y-4">
        <h3 className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold block border-b border-gray-800 pb-2">
          7. Two-Tier High-Efficiency Caching Speclist
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-300 font-mono text-[10.5px] font-black uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              Tier 1: Key-value Query Cache (TTL Standard Redis)
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              Direct key mapping captures identical incoming query strings. Before computing embeddings, an MD5 hash of the lower-case query is mapped to the standard Redis cache. When a match is found, cached content returns in <strong>&lt; 1 millisecond</strong>, eliminating 100% of pipeline overhead.
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2.5">
            <div className="flex items-center gap-2 text-[#818cf8] font-mono text-[10.5px] font-black uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              Tier 2: Vector-based Semantic Cache
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              Matches incoming query vectors against previously compiled query embeddings. Under standard cosine boundaries (<code className="text-purple-400">distance &lt; 0.12</code>), the system leverages generative outputs of previous searches to construct responses, shaving off 1.5 seconds from server turnaround.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
