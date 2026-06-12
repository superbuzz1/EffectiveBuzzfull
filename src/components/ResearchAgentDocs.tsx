import React, { useState } from 'react';
import { 
  Cpu, Code, Play, RefreshCw, Layers, ShieldCheck, ArrowRight, Check, Copy, 
  HelpCircle, Settings, Braces, Terminal, FileJson, AlertCircle, Sparkles, 
  Search, ShieldAlert, CheckCircle2, List, Clipboard, Sliders, ChevronRight, Gauge
} from 'lucide-react';

export default function ResearchAgentDocs() {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'specs' | 'sandbox' | 'eval-error'>('blueprint');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Specs subtabs
  const [specsSubtab, setSpecsSubtab] = useState<'prompt' | 'input-schema' | 'output-schema' | 'json-examples'>('prompt');

  // Sandbox inputs and simulator states
  const [companyName, setCompanyName] = useState('NeuraCore AI');
  const [websiteUrl, setWebsiteUrl] = useState('https://neuracore.io');
  const [targetPersona, setTargetPersona] = useState('VP of Product / Head of Sales');
  const [industryFocus, setIndustryFocus] = useState('B2B Enterprise AI SaaS');
  const [customBrief, setCustomBrief] = useState('Targeting prospects looking to optimize API response latencies and scale GPU workloads without excessive multi-cloud egress fees.');

  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<any | null>(null);
  const [playgroundView, setPlaygroundView] = useState<'styled' | 'json'>('styled');

  const handleCopyCode = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // SYSTEM PROMPT FOR THE RESEARCH AGENT
  const SYSTEM_PROMPT_CONTENT = `You are the Lead Market Intelligence Research Agent for EffectiveBuzz, a premium enterprise B2B SaaS platform.
Your objective is to conduct comprehensive company research, prospect profile parsing, industry ecosystem mapping, target pain point discovery, and dynamic buying signal detection.

Return a highly structured YAML-safe JSON object adhering STRICTLY to the defined output JSON Schema.

### CORE OBJECTIVES & INSTRUCTIONS:
1. COMPANY INTELLIGENCE EXTRACTION:
   - Identify precise core descriptions, scale (employee tiers, funding signals, revenue bracket approximations), and target market segment definitions.
   - Build a comprehensive competitive matrix identifying primary alternatives and target defensive differentiators.

2. PROSPECT PROFILE MAPPING:
   - Match prospect persona target titles with expected key metrics, internal department goals, and operational blindspots.

3. STRATEGIC PAIN POINT DETECTION:
   - Uncover corporate-level structural bottlenecks, technical execution hurdles, and workflow inefficiencies.
   - Separate pain points into 3 categories: Technical (API scaling, latency, architectural limits), Financial (egress premiums, hardware efficiency, wasted SaaS spend), and Strategic (slow market entries, competitor pressures).
   - Provide concrete evidence, quotes, or online references (e.g., public GitHub commit discussions, Glassdoor employee feedback, tech blog posts) where available to ground findings.

4. REAL-TIME BUYING SIGNAL SCORING:
   - Examine standard buying triggers: Active hiring roles (e.g., looking for VP of Sales or AI Engineer), recent executive hires, funding rounds announcements, massive API version changes, or strategic compliance objectives (SOC2, HIPAA).
   - Compute an aggregate "Outreach Priority Fit Score" (0-100) combining ICP compatibility percentages and temporal signal urgency weights.

### SYSTEM GUARDRAILS & ANTI-HALLUCINATION PROTOCOLS:
1. STRICT TRUTH GAUNTLET: If specific data points (e.g., funding parameters or specific company stats) are not actively present in URL contexts or general maps grounding, you MUST return "UNKNOWN" or omit speculative assertions. Under no circumstance should you synthesize false figures, fictitious URLs, or fake quotes.
2. OUTBOUND INTEGRITY CONTROL: Avoid generating generic or conversational introductory greetings inside outbound copy hooks. Focus entirely on contextual, personalized trigger-based insights.
3. CONFORMANCE CONSTRAINT: Output MUST be perfectly parseable via JSON engines without leading text summaries, trailing annotations, or backtick wraps.`;

  // INPUT JSON SCHEMA
  const INPUT_SCHEMA_CONTENT = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ResearchAgentInput",
  "type": "object",
  "properties": {
    "companyName": {
      "type": "string",
      "description": "Clean legal or trade name of the target account."
    },
    "websiteUrl": {
      "type": "string",
      "format": "uri",
      "description": "Base landing page URL or technical documentation endpoint to analyze."
    },
    "industryFocus": {
      "type": "string",
      "description": "Primary market segment or vertical orientation of the target organization."
    },
    "targetPersonaTitle": {
      "type": "string",
      "description": "Job title or buyer persona scope for corporate outbound personalization."
    },
    "contextBrief": {
      "type": "string",
      "description": "Optional custom guidelines, internal sales parameters, or specific features to evaluate."
    }
  },
  "required": ["companyName", "websiteUrl", "industryFocus", "targetPersonaTitle"]
}`;

  // OUTPUT JSON SCHEMA
  const OUTPUT_SCHEMA_CONTENT = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ResearchAgentOutput",
  "type": "object",
  "properties": {
    "companyMetadata": {
      "type": "object",
      "properties": {
        "legalName": { "type": "string" },
        "yearFounded": { "type": ["integer", "null"] },
        "employeeCountTier": { "type": "string", "enum": ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"] },
        "fundingStage": { "type": "string" },
        "competitiveQuadrantTags": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["legalName", "employeeCountTier", "fundingStage"]
    },
    "industryAnalysis": {
      "type": "object",
      "properties": {
        "marketClassification": { "type": "string" },
        "growthTrendIndicators": { "type": "array", "items": { "type": "string" } },
        "criticalRegulatoryCompliance": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["marketClassification", "criticalRegulatoryCompliance"]
    },
    "prospectPersonaProfile": {
      "type": "object",
      "properties": {
        "buyerTitle": { "type": "string" },
        "primaryKPITargets": { "type": "array", "items": { "type": "string" } },
        "operationalBlindspots": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["buyerTitle", "primaryKPITargets", "operationalBlindspots"]
    },
    "detectedPainPoints": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "category": { "type": "string", "enum": ["Technical", "Financial", "Strategic"] },
          "description": { "type": "string" },
          "severityLevel": { "type": "string", "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
          "evidenceReference": { 
            "type": "string",
            "description": "Quote, public resource URL, tech stack dependency trace, or website audit artifact grounding the pain point."
          }
        },
        "required": ["category", "description", "severityLevel", "evidenceReference"]
      }
    },
    "buyingSignals": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "triggerType": { "type": "string", "enum": ["HiringExpansion", "ExecutiveSwap", "FundingInbound", "TechMigration", "ComplianceDeadline"] },
          "urgencyImpact": { "type": "string", "enum": ["LOW", "MEDIUM", "HIGH"] },
          "detectedSignalDetail": { "type": "string" },
          "recommendedOutreachHook": { "type": "string" }
        },
        "required": ["triggerType", "urgencyImpact", "detectedSignalDetail", "recommendedOutreachHook"]
      }
    },
    "fitAssessment": {
      "type": "object",
      "properties": {
        "icpAlignmentPercentage": { "type": "integer", "minimum": 0, "maximum": 100 },
        "outreachFitScore": { "type": "integer", "minimum": 0, "maximum": 100 },
        "qualifyingLogSummary": { "type": "string" }
      },
      "required": ["icpAlignmentPercentage", "outreachFitScore", "qualifyingLogSummary"]
    }
  },
  "required": ["companyMetadata", "industryAnalysis", "prospectPersonaProfile", "detectedPainPoints", "buyingSignals", "fitAssessment"]
}`;

  // EXAMPLE EXTRANEOUS JSON LOG
  const EXAMPLE_INPUT_JSON = `{
  "companyName": "NeuraCore AI",
  "websiteUrl": "https://neuracore.io",
  "industryFocus": "B2B Enterprise AI SaaS",
  "targetPersonaTitle": "VP of Product / Head of Sales",
  "contextBrief": "Focusing heavily on concerns around API latency spikes, high LLM token costs, GPU idle time, and SaaS quota overcharges."
}`;

  const EXAMPLE_OUTPUT_JSON = `{
  "companyMetadata": {
    "legalName": "NeuraCore Technologies Corp",
    "yearFounded": 2024,
    "employeeCountTier": "51-200",
    "fundingStage": "Series A ($12.5M, Lead Investor: Sequoia Capital)",
    "competitiveQuadrantTags": ["Real-time LLM caching", "Custom fine-tune hosting", "Alternative to Pinecone & Langchain Enterprises"]
  },
  "industryAnalysis": {
    "marketClassification": "Generative Artificial Intelligence Developer Infrastructures",
    "growthTrendIndicators": [
      "Exponential demand for sub-50ms API routing in financial agents deployment",
      "Severe GPU hardware supply squeeze driving interest in cloud-agnostic model orchestrators"
    ],
    "criticalRegulatoryCompliance": ["SOC2 Type II", "GDPR (Model Weight Data Protection Clauses)", "HIPAA Compliance (PHI Sanitization on API limits)"]
  },
  "prospectPersonaProfile": {
    "buyerTitle": "VP of Product / Head of Sales Operations",
    "primaryKPITargets": [
      "Gross Margins optimization over paid LLM models (e.g., OpenAI / Gemini consumption keys)",
      "Customer acquisition velocity (CAC Payback Tiers under 12 months)",
      "Daily active user API retention rate"
    ],
    "operationalBlindspots": [
      "Uncapped token costs and egress charges causing pricing tier overruns on basic plan tiers",
      "Sales agents pitching trials that burn significant CPU/GPU compute tokens with near-zero conversions"
    ]
  },
  "detectedPainPoints": [
    {
      "category": "Technical",
      "description": "Extreme latency spikes (averaging over 850ms) during concurrent developer requests, tracked back to suboptimal API route pooling structures.",
      "severityLevel": "HIGH",
      "evidenceReference": "Public developer forum bug report thread (#401) 'Critical timeout thresholds during concurrent embeddings parsing on NeuraCore endpoints'."
    },
    {
      "category": "Financial",
      "description": "Massive runaway infrastructure fees caused by GPU compute nodes remaining fully idle in regions outside active developer workspace times.",
      "severityLevel": "CRITICAL",
      "evidenceReference": "Tech blog post by engineering lead 'Adventures in Scaling GPU clusters: how an overlooked thread-pool cost us $45k in idle billing cycles'."
    },
    {
      "category": "Strategic",
      "description": "Difficulty validating Enterprise SOC2 pipelines, delaying sales pipelines with enterprise financial prospects.",
      "severityLevel": "MEDIUM",
      "evidenceReference": "GitHub open roadmap issue #89 'Build secure compliance gateway proxy to validate local LLM logs for financial customers'."
    }
  ],
  "buyingSignals": [
    {
      "triggerType": "HiringExpansion",
      "urgencyImpact": "HIGH",
      "detectedSignalDetail": "NeuraCore AI is actively recruiting for 3 senior sales development representatives and a Lead Enterprise Solution Architect with expertise in SOC2-compliant proxy integrations.",
      "recommendedOutreachHook": "Leverage the Solutions Architect opening to showcase how EffectiveBuzz automates Enterprise client security checks, shortening POCs by 45 days."
    },
    {
      "triggerType": "FundingInbound",
      "urgencyImpact": "MEDIUM",
      "detectedSignalDetail": "Announced $12.5M Series A round 14 days ago. Press release lists plans to double engineering footprint in EMEA and establish dedicated secure enterprise pipelines.",
      "recommendedOutreachHook": "Congratulate on the capital inflow, then immediately mention the risk of multi-region egress costs as they scale, pitching our centralized regional routers."
    }
  ],
  "fitAssessment": {
    "icpAlignmentPercentage": 96,
    "outreachFitScore": 92,
    "qualifyingLogSummary": "NeuraCore AI exhibits perfect alignment with the EffectiveBuzz Enterprise profile: strong funding runway, verified technical scale issues, active sales hiring expansion, and high public traces of pricing overruns."
  }
}`;

  // RUN DYNAMIC SIMULATION LOGIC
  const startAgentSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setSimulationResult(null);
    setSimLogs([]);

    const runLogs = [
      `Initializing Research Agent pipeline for company: "${companyName}"...`,
      `Matching tenant active quotas and SOC2 compliance controls... (OK)`,
      `Booting Web Crawler and routing connection via secure regional proxy...`,
      `Scanning website DOM and technical documents on: "${websiteUrl}"...`,
      `Scanning public developer communities, hiring boards, and tech channels...`,
      `Found 3 open positions for sales expansion and 1 engineering technical roadblock.`,
      `Running Gemini 3.5 Flash model parsing context data...`,
      `Running Pain Point Parser on context. Persona target: "${targetPersona}"`,
      `Categorizing pain points... Found Technical, Financial, and Strategic bottlenecks.`,
      `Calculating temporal Signal Urgency & Outbound Priority Fit score...`,
      `Running guardrail validation engine to check structured schema conformity...`,
      `Self-grading accuracy score: 98% (Format: Validated).`,
      `Writing structured report into Multi-Tenant PostgreSQL database...`,
      `Finished agent execution turn. Generating visual output!`
    ];

    for (let i = 0; i < runLogs.length; i++) {
      setSimulationStep(i + 1);
      setSimLogs(prev => [...prev, runLogs[i]]);
      // Rapid animated delays mapping to a high-speed execution run
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    // Parse the example output JSON into state to showcase gorgeous interactive findings
    setSimulationResult(JSON.parse(EXAMPLE_OUTPUT_JSON));
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          AI Engineering & Intelligence Center
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">AI Research Agent Specification</h2>
        <p className="text-sm text-gray-400 mt-1 max-w-3xl leading-relaxed">
          Comprehensive blueprint representing the architectural layout, pipeline processing, and execution schemas 
          for the EffectiveBuzz automated B2B Market Intelligence & Sales qualifying Agent.
        </p>
      </div>

      {/* Main Tab Bar Controls */}
      <div className="flex border-b border-gray-800 pb-0.5 gap-2 overflow-x-auto">
        {[
          { id: 'blueprint' as const, label: '1. Pipeline Blueprint', icon: Layers, color: 'text-indigo-400' },
          { id: 'specs' as const, label: '2. System Prompt & Schemas', icon: Terminal, color: 'text-emerald-400' },
          { id: 'sandbox' as const, label: '3. Interactive Sandbox Simulator', icon: Play, color: 'text-blue-400' },
          { id: 'eval-error' as const, label: '4. Evaluation & SLA Errors', icon: ShieldAlert, color: 'text-rose-400' },
        ].map(tb => {
          const Icon = tb.icon;
          return (
            <button
              key={tb.id}
              onClick={() => setActiveTab(tb.id)}
              className={`pb-3 text-xs sm:text-sm font-medium border-b-2 font-display transition-all flex items-center gap-2 whitespace-nowrap px-1 ${
                activeTab === tb.id
                  ? 'border-emerald-500 text-emerald-400 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${tb.color}`} />
              {tb.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Blueprint */}
      {activeTab === 'blueprint' && (
        <div className="space-y-6 animate-feed">
          <div className="bg-[#0f172a] rounded-xl border border-gray-800 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider text-emerald-400">Agentic Market Pipeline Architecture</h3>
            <p className="text-xs text-secondary leading-relaxed">
              The Research Agent operates as an autonomous, event-driven state machine. It is triggered when new leads lists are uplinks, or during programmatic scheduling triggers inside multi-tenant CRM nodes.
            </p>

            {/* Pipeline visual diagram blocks */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
              {[
                { step: '1', title: 'Input Parse Hub', desc: 'Accepts basic domains, customer briefs and qualifying benchmarks from workspace config.', active: true },
                { step: '2', title: 'Context Harvester', desc: 'Crawls website URL, processes HTML layout, inspects public hiring SDR logs, and locates API documents.', active: true },
                { step: '3', title: 'Gemini Sparkles', desc: 'Synthesizes gathered metadata to qualify ICP affinity, categorize structural pain points, and scoring buying triggers.', active: true },
                { step: '4', title: 'Compliance Check', desc: 'Validates raw output profiles via rigid JSON-schema engines. Isolates variables into workspace tenant spaces.', active: true },
                { step: '5', title: 'Outbox Copy sync', desc: 'Saves qualifying reports, and passes critical pain triggers to CRM copywriters to deploy outreach hooks.', active: true },
              ].map((step, idx) => (
                <div key={idx} className="relative bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center border border-emerald-500/20">
                      {step.step}
                    </span>
                    <h4 className="text-xs font-semibold text-white">{step.title}</h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{step.desc}</p>
                  </div>
                  {idx < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 p-0.5 bg-slate-950 border border-zinc-800 rounded-full">
                      <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key agent features overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <Search className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-mono font-bold uppercase text-indigo-300">Target Segment crawling</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Crawls digital footprints securely using proxies to avoid rate blocks. Scrapes job opening listings to locate active resource expansion, engineering issues, and enterprise sales pushes.
              </p>
            </div>

            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-mono font-bold uppercase text-emerald-400">Triple Pain Classification</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Translates messy technical threads, system blog articles, and PR logs into classified pain points mapping Technical limits, Financial outlays, and Competitor Strategic challenges.
              </p>
            </div>

            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-mono font-bold uppercase text-blue-300">Actionable Signal hooks</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Triggers programmatic alerts when scoring fits go over targeted thresholds, offering ready-made sales copy routes addressing target executive needs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Specs (System prompt, Input/Output Schemas, JSON Examples) */}
      {activeTab === 'specs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-feed">
          {/* Subtab Left menu */}
          <div className="lg:col-span-3 bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-1.5 h-fit">
            <span className="text-[10px] text-gray-400 font-mono font-bold block mb-2 uppercase tracking-wide">Developer Specs Menu</span>
            {[
              { id: 'prompt' as const, label: 'System Instructions Prompt', icon: Terminal, color: 'text-indigo-400' },
              { id: 'input-schema' as const, label: 'Input JSON Schema', icon: Braces, color: 'text-emerald-400' },
              { id: 'output-schema' as const, label: 'Output JSON Schema', icon: Braces, color: 'text-emerald-400' },
              { id: 'json-examples' as const, label: 'Realistic JSON Exemplars', icon: FileJson, color: 'text-blue-400' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setSpecsSubtab(item.id)}
                  className={`w-full text-left p-2 rounded-lg text-xs font-mono flex items-center gap-2.5 transition-all ${
                    specsSubtab === item.id 
                      ? 'bg-slate-900 border border-slate-700 text-white font-bold' 
                      : 'border border-transparent text-gray-400 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.color} shrink-0`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Spec code views */}
          <div className="lg:col-span-9 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            {specsSubtab === 'prompt' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-indigo-400">System Instruction Spec (SystemPrompt)</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Primary instruction framework mounted inside the Gemini 3.5 Flash model during call execution.</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(SYSTEM_PROMPT_CONTENT, 'prompt')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-gray-700 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-300 transition-all cursor-pointer"
                  >
                    {copiedText === 'prompt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedText === 'prompt' ? 'Copied Prompt' : 'Copy System Prompt'}
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 overflow-x-auto max-h-[480px] overflow-y-auto">
                  <pre className="text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">{SYSTEM_PROMPT_CONTENT}</pre>
                </div>
              </div>
            )}

            {specsSubtab === 'input-schema' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-emerald-450">Input Schema Draft Proposal</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Parameters required when initiating an asynchronous research execution turn.</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(INPUT_SCHEMA_CONTENT, 'input-schema')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-gray-700 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-300 transition-all cursor-pointer"
                  >
                    {copiedText === 'input-schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedText === 'input-schema' ? 'Copied Schema' : 'Copy Input Schema'}
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 overflow-x-auto max-h-[450px] overflow-y-auto">
                  <pre className="text-xs text-emerald-400 font-mono leading-normal">{INPUT_SCHEMA_CONTENT}</pre>
                </div>
              </div>
            )}

            {specsSubtab === 'output-schema' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-emerald-450">Output Structured JSON Schema</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Mandates exact key patterns, array formats and severity structures to prevent parsing failures.</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(OUTPUT_SCHEMA_CONTENT, 'output-schema')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-gray-700 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-300 transition-all cursor-pointer"
                  >
                    {copiedText === 'output-schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedText === 'output-schema' ? 'Copied Schema' : 'Copy Output Schema'}
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 overflow-x-auto max-h-[450px] overflow-y-auto">
                  <pre className="text-xs text-indigo-300 font-mono leading-normal">{OUTPUT_SCHEMA_CONTENT}</pre>
                </div>
              </div>
            )}

            {specsSubtab === 'json-examples' && (
              <div className="space-y-6">
                {/* Input block */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-1 flex-wrap gap-2">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Example Input Payload</span>
                    <button
                      onClick={() => handleCopyCode(EXAMPLE_INPUT_JSON, 'input-ex')}
                      className="px-2 py-0.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-300 transition-all cursor-pointer"
                    >
                      {copiedText === 'input-ex' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy Payload
                    </button>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 overflow-x-auto max-h-[140px] overflow-y-auto text-[11px]">
                    <pre className="text-emerald-400 font-mono">{EXAMPLE_INPUT_JSON}</pre>
                  </div>
                </div>

                {/* Output block */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-1 flex-wrap gap-2">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Example Structured Outputs (Strict Grounding Output)</span>
                    <button
                      onClick={() => handleCopyCode(EXAMPLE_OUTPUT_JSON, 'output-ex')}
                      className="px-2 py-0.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-300 transition-all cursor-pointer"
                    >
                      {copiedText === 'output-ex' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy Output Report
                    </button>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 overflow-x-auto max-h-[260px] overflow-y-auto text-[11px]">
                    <pre className="text-zinc-300 font-mono leading-relaxed">{EXAMPLE_OUTPUT_JSON}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Sandbox & Simulation */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6 animate-feed">
          {/* Main Controls split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Run parameters configuration on left column */}
            <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
              <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-bold block border-b border-gray-800 pb-2">
                1. Configure Agent Run Tasks
              </span>

              <div className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Target Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Base Domain / URL Context</label>
                  <input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="e.g. https://acme.org"
                    className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 font-mono text-zinc-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Industry Classification Focus</label>
                  <input
                    type="text"
                    value={industryFocus}
                    onChange={(e) => setIndustryFocus(e.target.value)}
                    placeholder="e.g. Fintech SaaS Platform"
                    className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Target Executive Buyer Title</label>
                  <input
                    type="text"
                    value={targetPersona}
                    onChange={(e) => setTargetPersona(e.target.value)}
                    placeholder="e.g. Chief Technology Officer (CTO)"
                    className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Dynamic Special Focus Brief</label>
                  <textarea
                    rows={3}
                    value={customBrief}
                    onChange={(e) => setCustomBrief(e.target.value)}
                    placeholder="e.g. Specific technologies, competing features or compliance limits..."
                    className="w-full bg-slate-950 border border-slate-850 rounded p-2.5 focus:outline-none focus:border-blue-500 text-zinc-300 leading-normal"
                  />
                </div>

                <button
                  type="button"
                  onClick={startAgentSimulation}
                  disabled={isSimulating}
                  className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold font-display rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      Executing Pipeline Steps...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
                      Trigger AI Simulation Run
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Simulated Live Console logs output */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <div className="bg-slate-950 border border-gray-800 rounded-xl p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      Research Pipeline Console Terminals
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">Node: Agent-v3.5-flash</span>
                  </div>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto font-mono text-[10px] leading-relaxed text-blue-300">
                    {simLogs.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        Awaiting configuration triggers. Adjust specifications on the left pane and press "Trigger AI Simulation Run" to start crawling and analysis cycles.
                      </div>
                    ) : (
                      simLogs.map((lg, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-gray-500 shrink-0">[{idx + 1}]</span>
                          <span className={`${idx === simLogs.length - 1 && isSimulating ? 'text-white font-bold animate-pulse' : 'text-zinc-300'}`}>
                            {lg}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {isSimulating && (
                  <div className="border-t border-gray-800 pt-3 flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                      <span>Active Step: {simulationStep}/14</span>
                    </div>
                    <span>Estimated time remaining: {Math.max((14 - simulationStep) * 0.6, 0).toFixed(0)} seconds</span>
                  </div>
                )}
              </div>

              {/* Quick SLA info indicator */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-bold block">Estimated API execution metrics:</span>
                  <div className="flex items-center gap-3.5 pt-1">
                    <div className="text-xs">Latency: <span className="text-[#818cf8] font-bold">1.42s</span></div>
                    <div className="text-xs">Model: <span className="text-indigo-400 font-bold font-mono">gemini-2.5-flash</span></div>
                    <div className="text-xs">Compliance: <span className="text-emerald-400 font-bold">Structured Schema Valid</span></div>
                  </div>
                </div>
                <div className="p-2 bg-slate-950 border border-slate-850 rounded-lg hidden sm:block">
                  <Gauge className="w-8 h-8 text-indigo-400" />
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATION RESULTS INTERACTIVE REPORT */}
          {simulationResult && (
            <div className="bg-[#0d131f] border border-[#1f2937] rounded-xl p-5 md:p-6 shadow-2xl animate-feed space-y-5">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 flex-wrap gap-3">
                <div>
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/35 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold tracking-wider leading-none">
                    ✔ Simulation Results Complete (100% Conformance)
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight mt-1">Generated Market Intelligence Dossier</h3>
                </div>

                {/* Styled vs JSON mode toggles */}
                <div className="flex bg-[#1e293b] rounded-lg p-0.5 border border-zinc-700 font-mono text-xs text-gray-400">
                  <button
                    onClick={() => setPlaygroundView('styled')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                      playgroundView === 'styled' 
                        ? 'bg-blue-500 text-slate-950 font-bold' 
                        : 'hover:text-white'
                    }`}
                  >
                    Executive Aesthetic Report
                  </button>
                  <button
                    onClick={() => setPlaygroundView('json')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                      playgroundView === 'json' 
                        ? 'bg-blue-500 text-slate-950 font-bold' 
                        : 'hover:text-white'
                    }`}
                  >
                    Raw Output JSON Schema
                  </button>
                </div>
              </div>

              {playgroundView === 'styled' ? (
                <div className="space-y-6">
                  {/* Row 1: Key Metadata & Fit Score Gauge */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Score gauge */}
                    <div className="md:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-850 flex flex-col justify-between text-center space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider">Outbound Priority Score</span>
                        <div className="text-4xl sm:text-5xl font-mono text-teal-400 font-black tracking-tight mt-2">{simulationResult.fitAssessment.outreachFitScore}<span className="text-sm font-sans font-semibold text-gray-500">/100</span></div>
                        <p className="text-[10px] text-gray-500 italic mt-1">(Combines ICP affinity alignment index and signals timestamp weights)</p>
                      </div>

                      <div className="bg-[#111827] border border-gray-800 p-2.5 rounded text-left text-[11px] leading-relaxed text-gray-300">
                        <strong>Architect qualifying decision:</strong> {simulationResult.fitAssessment.qualifyingLogSummary}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-zinc-400 font-mono text-[10px]">
                        <div className="p-2 bg-[#111827] rounded border border-gray-800">
                          ICP Alignment: <strong className="text-white font-bold">{simulationResult.fitAssessment.icpAlignmentPercentage}%</strong>
                        </div>
                        <div className="p-2 bg-[#111827] rounded border border-gray-800">
                          Signal Urgency: <strong className="text-white font-bold">HIGH</strong>
                        </div>
                      </div>
                    </div>

                    {/* Meta listings card */}
                    <div className="md:col-span-8 bg-slate-950 p-5 rounded-xl border border-slate-850 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4 text-xs">
                        <div>
                          <h4 className="text-[10px] font-mono uppercase text-teal-400 font-bold">Corporate Metadata</h4>
                          <h5 className="text-sm font-bold text-white mt-1">{simulationResult.companyMetadata.legalName}</h5>
                        </div>
                        <ul className="space-y-2 text-[11px] text-zinc-300">
                          <li>Founded Year: <strong className="text-white font-bold">{simulationResult.companyMetadata.yearFounded}</strong></li>
                          <li>Employee Tiers: <strong className="text-white font-bold">{simulationResult.companyMetadata.employeeCountTier} staff</strong></li>
                          <li>Funding stage: <strong className="text-indigo-300 font-bold font-mono">{simulationResult.companyMetadata.fundingStage}</strong></li>
                        </ul>
                      </div>

                      <div className="space-y-3 text-xs">
                        <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block border-b border-gray-800 pb-1">Industry Ecosystem Tags</span>
                        <div className="flex flex-wrap gap-1.5">
                          {simulationResult.companyMetadata.competitiveQuadrantTags.map((t: string, idx: number) => (
                            <span key={idx} className="bg-[#1a2333] hover:bg-slate-800 border border-slate-700/60 text-indigo-250 px-2 py-0.5 rounded text-[10px] font-mono transition-colors">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="pt-2 text-[11px] text-zinc-400 leading-relaxed font-sans">
                          <strong>Vertical categorizes:</strong> {simulationResult.industryAnalysis.marketClassification}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Target Persona, Goals & Operational Blindspots */}
                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-4">
                    <h4 className="text-xs font-mono uppercase text-indigo-400 font-bold flex items-center gap-1.5 border-b border-gray-800 pb-2">
                      <List className="w-3.5 h-3.5 text-indigo-400" />
                      Target Persona Profile: {simulationResult.prospectPersonaProfile.buyerTitle}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-300 leading-relaxed">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-white tracking-wide uppercase font-bold block">Primary Targets KPI</span>
                        <ul className="list-disc pl-3.5 space-y-1.5 leading-normal">
                          {simulationResult.prospectPersonaProfile.primaryKPITargets.map((kpi: string, idx: number) => (
                            <li key={idx}>{kpi}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-rose-450 tracking-wide uppercase font-bold block">Operational Blindspots</span>
                        <ul className="list-disc pl-3.5 space-y-1.5 leading-normal text-zinc-400">
                          {simulationResult.prospectPersonaProfile.operationalBlindspots.map((b: string, idx: number) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Detected Corporate Pain Points */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-rose-400 font-bold block border-b border-gray-800 pb-1.5">
                      Uncovered Operational Pain Bottlenecks
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {simulationResult.detectedPainPoints.map((pain: any, idx: number) => {
                        const colors = {
                          Technical: 'border-l-4 border-l-blue-500 bg-sky-950/20 text-sky-400',
                          Financial: 'border-l-4 border-l-rose-500 bg-rose-950/20 text-rose-400',
                          Strategic: 'border-l-4 border-l-amber-500 bg-amber-950/20 text-amber-400'
                        };
                        const cls = colors[pain.category as keyof typeof colors] || colors.Technical;

                        return (
                          <div key={idx} className={`p-4 bg-slate-950 border border-slate-850 rounded-xl flex flex-col justify-between space-y-3.5 ${cls}`}>
                            <div className="space-y-1.5 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-mono font-bold tracking-wide uppercase">{pain.category}</span>
                                <span className="text-[8px] font-bold bg-[#271010]/50 text-rose-400 border border-rose-500/20 px-1.5 py-0.5 rounded leading-none">
                                  {pain.severityLevel}
                                </span>
                              </div>
                              <p className="text-zinc-300 font-sans leading-relaxed text-[11px]">{pain.description}</p>
                            </div>

                            <div className="p-2 bg-[#1c283c]/35 rounded border border-slate-800/80 text-[10px] font-mono text-gray-400 leading-normal">
                              <span className="text-[#818cf8] font-bold uppercase block text-[9px] mb-0.5">Evidence Reference:</span>
                              {pain.evidenceReference}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 4: Real-time Buying Signals & Outreach Hooks */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-indigo-400 font-bold block border-b border-gray-800 pb-1.5">
                      Detected Urgent Buying Signals & Context Hooks
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {simulationResult.buyingSignals.map((sig: any, idx: number) => (
                        <div key={idx} className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-3 flex flex-col justify-between">
                          <div className="space-y-1.5 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="bg-[#1e1a3b] text-[#818cf8] px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold border border-indigo-500/10">
                                {sig.triggerType}
                              </span>
                              <span className="font-mono text-[9px] text-[#818cf8]">Urgency: <strong className="text-white font-bold">{sig.urgencyImpact}</strong></span>
                            </div>
                            <p className="text-zinc-300 font-sans leading-relaxed text-[11px]">{sig.detectedSignalDetail}</p>
                          </div>

                          <div className="p-2.5 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/15 rounded-lg text-[10px] text-zinc-300 leading-normal font-mono select-all">
                            <span className="text-emerald-400 font-bold block text-[9px] uppercase tracking-wide mb-1">Recommended Outreach Hook:</span>
                            "{sig.recommendedOutreachHook}"
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* RAW JSON LOGS */
                <div className="space-y-2 font-mono text-[11px]">
                  <pre className="p-4 bg-slate-950 border border-slate-850 text-emerald-400 rounded-xl overflow-x-auto leading-relaxed max-h-[460px] overflow-y-auto">
                    {JSON.stringify(simulationResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Evaluation and SLAs Errors */}
      {activeTab === 'eval-error' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-feed">
          
          {/* Column Left: SLA Eval criteria table */}
          <div className="lg:col-span-6 bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-xl space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Model Evaluation & Compliance Benchmarks</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">Physical evaluation metrics used inside continuous verification integrations.</p>
            </div>

            <div className="border border-slate-850 rounded-lg overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-mono text-zinc-300">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-[10px] uppercase text-indigo-400 font-bold">
                    <th className="p-2.5">Grading Metric</th>
                    <th className="p-2.5">Pass Ceiling</th>
                    <th className="p-2.5">Failure Penalty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/65 text-[10.5px]">
                  <tr className="hover:bg-slate-900/35">
                    <td className="p-2.5 font-bold text-white">Syntax Schema Valid</td>
                    <td className="p-2.5">100% strict matching on all parameters keys.</td>
                    <td className="p-2.5 text-rose-400">Pipeline rejection. Automatically triggers retry steps.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/35">
                    <td className="p-2.5 font-bold text-white">Hallucination Audit</td>
                    <td className="p-2.5">&lt;1% assertive statements lacking clear DOM or index grounds.</td>
                    <td className="p-2.5 text-amber-400">Suspends target dossier; triggers deep search maps backup checks.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/35">
                    <td className="p-2.5 font-bold text-white">Fit Precision Delta</td>
                    <td className="p-2.5">Delta variance under 10% on identical sector profiles.</td>
                    <td className="p-2.5 text-gray-500">Flags lead record to human sales reviewer queue.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/35">
                    <td className="p-2.5 font-bold text-white">Inference Latency Limit</td>
                    <td className="p-2.5">Mean execution times under 2.50s on B2B accounts.</td>
                    <td className="p-2.5 text-indigo-400 font-bold">Swaps execution clusters from Pro to Flash, alerting metrics.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/15 p-3 rounded text-[11px] leading-relaxed text-zinc-350">
              <strong>Continuous Alignment Loop:</strong> Real-time human CRM reviews (e.g., dismissing specific pains or adjusting fit weights) automatically append few-shot training indexes back to the agent prompts, guaranteeing self-tuning intelligence.
            </div>
          </div>

          {/* Column Right: Error handling strategies */}
          <div className="lg:col-span-6 bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-xl space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Edge-Case Recovery & Error Handling Flow</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">Reliability layers guaranteeing zero campaign interruptions under network spikes.</p>
            </div>

            <div className="space-y-3.5 text-xs">
              {[
                { title: '1. Rate Limit Triggers (429 HTTP)', type: 'API', desc: 'Applies exponential backoff using jitter matrices (Initial: 2s, Max: 32s, Max retries: 4 tries) before dropping workloads.' },
                { title: '2. Scraping Block / DOM Obfuscation', type: 'Crawler', desc: 'If standard crawler results are blocked, the pipeline cascades to a secondary search API or queries global domain indices, avoiding empty outputs.' },
                { title: '3. Schema Conformity Fracture', type: 'JSON Parse', desc: 'If prompt outputs are damaged or truncated due to model timeout limits, a secondary repair agent parses the fragment code to restructure parameters safely.' },
                { title: '4. Memory Multi-Tenant Leaks Protection', type: 'Tenant Space', desc: 'Logical context boundary validations. The workspace database layer asserts that the computed context does not leaks or refer to parameters outside the active SQL workspace tenantId.' }
              ].map((err, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-850 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-bold text-white">{err.title}</h4>
                    <span className="text-[9px] bg-slate-900 text-gray-400 px-2 py-0.5 rounded font-mono font-bold">{err.type}</span>
                  </div>
                  <p className="text-[11px] text-gray-450 leading-relaxed font-sans">{err.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
