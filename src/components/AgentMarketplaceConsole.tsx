import React, { useState, useEffect } from 'react';
import { 
  Cpu, Layers, DollarSign, ShieldCheck, Scale, Sliders, Activity, 
  Code, AlertTriangle, TrendingUp, Bot, Zap, CheckCircle, RefreshCw, 
  FileText, Play, Info, Lock, Key, Award, ArrowUpRight, Check, Eye
} from 'lucide-react';

interface AgentProfile {
  id: string;
  name: string;
  role: string;
  icon: any;
  manifest: string;
  distMethod: string;
  revSlicing: string;
  qualityMetric: string;
  securityFence: string;
  capabilities: string[];
}

const AGENTS: AgentProfile[] = [
  {
    id: 'research',
    name: 'Research Agent',
    role: 'Deep Web Intelligence & Lead Enriched Scraper',
    icon: Cpu,
    manifest: `{
  "agent_id": "eb-core-research-v2",
  "version": "2.4.1",
  "engine": "gemini-2.5-pro",
  "io_contract": {
    "inputs": {
      "target_domain": "string",
      "icp_variables": "object"
    },
    "outputs": {
      "enriched_leads_set": "array",
      "confidence_matrix": "object"
    }
  },
  "compute_class": "gpu-t4-burst"
}`,
    distMethod: 'Distributed over isolated Docker nodes, version-tagged by build pipelines, published on the global registry over encrypted REST channels with CORS verification.',
    revSlicing: '80% Agent Creator direct license, 12% EffectiveBuzz platform maintenance fee, 8% dynamic compute and gas pool rebate.',
    qualityMetric: 'Hallucination margin < 1.2%, prompt validation rate: 99.8%. Continuous verification over cold training records.',
    securityFence: 'Encrypted isolated sandboxing, keyless OAuth session storage, strict network rules restricting raw socket requests to verified servers only.',
    capabilities: [
      'Automatic industry lookup & company headcount scraping',
      'Target leadership email validation & contact discovery',
      'Context-aware signal analysis from press releases'
    ]
  },
  {
    id: 'outreach',
    name: 'Outreach Agent',
    role: 'Generative Hyper-Personalized Prospect Writer',
    icon: Bot,
    manifest: `{
  "agent_id": "eb-outreach-writer-v3",
  "version": "3.1.0",
  "engine": "gemini-2.5-flash",
  "io_contract": {
    "inputs": {
      "lead_scorecard": "object",
      "strategic_narrative": "string"
    },
    "outputs": {
      "copywriting_drafts": "array",
      "best_performing_path": "string"
    }
  },
  "compute_class": "cpu-standard-optimized"
}`,
    distMethod: 'Integrated dynamically on campaign triggers. Published via secure webhooks and managed via central orchestrator logs with zero state leaks.',
    revSlicing: '75% Prompt Eng & Copywriter split, 15% platform matching fee, 10% premium deliverability pool bonus.',
    qualityMetric: 'Positive client sentiment score: > 4.4/5.0. Strict grammar, compliance parsing, dynamic filter checks.',
    securityFence: 'Outgoing email scanning to prevent data leaks. Immutable system execution logs recorded in the chronometer ledger.',
    capabilities: [
      'Hyper-personalized icebreaker generating (RAG supported)',
      'Language parity translation based on contact geolocation',
      'Spam flag analysis prior to deliverability outposting'
    ]
  },
  {
    id: 'qualification',
    name: 'Qualification Agent',
    role: 'Conversational Dialogue Evaluator & SDR Lead Scoring',
    icon: Award,
    manifest: `{
  "agent_id": "eb-evaluator-qualifier-v1",
  "version": "1.0.8",
  "engine": "gemini-2.5-flash",
  "io_contract": {
    "inputs": {
      "inbound_reply_payload": "string",
      "qualification_rubric": "object"
    },
    "outputs": {
      "is_qualified": "boolean",
      "interest_score_0_to_10": "number",
      "objection_classification": "string"
    }
  },
  "compute_class": "cpu-high-frequency"
}`,
    distMethod: 'Distributed over low-latency region nodes. Mounted directly on inbound webhooks from GSuite and Outlook collectors.',
    revSlicing: '70% Creator license fee, 20% validation partner check payouts, 10% platform matching processing surcharge.',
    qualityMetric: 'Classification precision: 96.5% F1-Score. Human-in-the-loop override triggered automatically on ambiguity < 80% confidence.',
    securityFence: 'PII stripping pipeline active. Anonymizes contact details before model dispatching to respect strict GDPR/SOC-2 privacy limits.',
    capabilities: [
      'Reply intent classification & micro-signal logging',
      'Automatic meeting links delivery on trigger detection',
      'Objection handling reasoning suggesting & reply drafting'
    ]
  },
  {
    id: 'forecast',
    name: 'Forecast Agent',
    role: 'Predictive Intelligence & Revenue Outbound Modeling',
    icon: TrendingUp,
    manifest: `{
  "agent_id": "eb-predictive-forecaster-v5",
  "version": "5.0.2",
  "engine": "gemini-2.5-pro",
  "io_contract": {
    "inputs": {
      "historical_transactions_set": "array",
      "confidence_levels": "array"
    },
    "outputs": {
      "projected_mrr": "object",
      "capital_burn_runway_days": "number",
      "outbound_conversion_forecasts": "array"
    }
  },
  "compute_class": "gpu-t4-burst"
}`,
    distMethod: 'Exclusive executive dashboard module. Direct node-to-node streaming over read-only database connections with locked VPC limits.',
    revSlicing: '85% Quantitative strategic creator split, 10% secure data-tenant surcharge, 5% platform matching fee.',
    qualityMetric: 'Variance margin < 3.5% vs real fiscal statistics across 3-month predictive horizons. Confidence limits at 90-95%.',
    securityFence: 'Zero outbound network connections. Complete database isolated containerized execution. Clean state deletes upon thread completion.',
    capabilities: [
      'Monte Carlo pipeline conversions simulations',
      'Confidence interval calculation on customer acquisition cost',
      'Automatic pipeline alerting regarding pacing gaps & churn hikes'
    ]
  }
];

export default function AgentMarketplaceConsole() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('research');
  const [activeSubTab, setActiveSubTab] = useState<'packaging' | 'distribution' | 'revenue' | 'quality' | 'security'>('packaging');
  
  // Custom Manifest State for visual modification
  const [currentManifest, setCurrentManifest] = useState<string>('');
  
  // Dynamic Simulation Variables
  const [sandboxActive, setSandboxActive] = useState<boolean>(false);
  const [sandboxLog, setSandboxLog] = useState<string[]>([]);
  const [confidenceRate, setConfidenceRate] = useState<number>(94.5);
  const [hitlThreshold, setHitlThreshold] = useState<number>(85); // %
  const [leakAlert, setLeakAlert] = useState<boolean>(false);
  const [piiStripperActive, setPiiStripperActive] = useState<boolean>(true);
  
  // Revenue Sliders
  const [monthlyAgentQueries, setMonthlyAgentQueries] = useState<number>(250000);
  const [averageQueryCost, setAverageQueryCost] = useState<number>(0.08); // $0.08 per query
  const [platformCommissionSlice, setPlatformCommissionSlice] = useState<number>(15); // %
  const [computeGasSlice, setComputeGasSlice] = useState<number>(8); // %
  
  // Simulated stats ticker
  const [activeRuntimeContainers, setActiveRuntimeContainers] = useState<number>(842);
  const [pushedSlaViolationsCount, setPushedSlaViolationsCount] = useState<number>(0);

  const selectedAgent = AGENTS.find(a => a.id === selectedAgentId) || AGENTS[0];

  useEffect(() => {
    setCurrentManifest(selectedAgent.manifest);
  }, [selectedAgentId]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate small metric shifts
      setActiveRuntimeContainers(prev => prev + (Math.random() > 0.6 ? 2 : Math.random() > 0.8 ? -3 : 0));
      if (Math.random() > 0.985) {
        setPushedSlaViolationsCount(prev => prev + 1);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSandboxLaunch = () => {
    if (sandboxActive) {
      setSandboxActive(false);
      setSandboxLog([]);
      return;
    }

    setSandboxActive(true);
    setSandboxLog([
      `Initializing Isolated Sandbox Node for type: ${selectedAgent.name}...`,
      `Verified compute class resource limits.`,
      `Deploying mock micro-container boundary (Strictly Read-Only Access Model Keyless).`,
    ]);

    setTimeout(() => {
      setSandboxLog(prev => [
        ...prev,
        `Applying security layer: IAM Rule EB-SANDBOX-READONLY applied.`,
        `CORS & Origin checked. Leakage detector active.`
      ]);
    }, 1000);

    setTimeout(() => {
      setSandboxLog(prev => [
        ...prev,
        `Parsing input payload JSON structures... Success.`,
        `LLM response stream connected securely.`,
        `Executing Agent Logic code: No token leakage detected.`,
        `Task processed successfully (Lat: 82ms, Confidence: ${confidenceRate}%).`
      ]);
    }, 2500);
  };

  const executeSecurityTest = () => {
    setLeakAlert(true);
    setSandboxLog(prev => [
      ...prev,
      `[CRITICAL WARNING] Security simulation test trigger: Injecting synthetic Credit Card info / raw password into system pipeline.`,
    ]);

    setTimeout(() => {
      if (piiStripperActive) {
        setSandboxLog(prev => [
          ...prev,
          `[SECURED] PII leakage firewall blocked the request. Masked targets mapped to '****_REDACTED_****'.`,
          `[SUCCESS] 0 leaked data items detected across model parameters.`
        ]);
        setLeakAlert(false);
      } else {
        setSandboxLog(prev => [
          ...prev,
          `[FAILURE] leak warning! Raw PII elements bypassed limits and dispatching proceeded. Immediate SLA containment required!`
        ]);
      }
    }, 1500);
  };

  // Math calculated values
  const totalSpend = monthlyAgentQueries * averageQueryCost;
  const platformRevenueShare = totalSpend * (platformCommissionSlice / 100);
  const computeGasSystemRevenue = totalSpend * (computeGasSlice / 100);
  const developerRevenuePayout = totalSpend - (platformRevenueShare + computeGasSystemRevenue);

  return (
    <div id="agent-marketplace-console" className="space-y-8 animate-fadeIn text-slate-100">
      
      {/* Structural Header & Dynamic Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Cpu className="w-4 h-4 shrink-0" />
            AI Platform Strategy
          </div>
          <h1 className="text-2xl font-bold font-display text-white mt-1">
            Autonomous Agent Marketplace Architecture
          </h1>
          <p className="text-xs text-gray-400 max-w-xl mt-1 leading-relaxed">
            Platform strategy framework governing high-fidelity Research, Outreach, Qualification, and Forecast Agents. Use this simulator to inspect secure compilation, revenue sharing models, evaluation loops, and containment sandboxing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-slate-900/60 p-2 border border-slate-800 rounded-xl text-xs self-center">
          <div className="px-3 py-1 bg-slate-950/80 rounded-lg border border-slate-800">
            <span className="text-[10px] text-gray-500 block leading-tight font-mono">Active Sandbox Node Containers</span>
            <span className="font-bold text-indigo-400 font-mono">{activeRuntimeContainers} Online</span>
          </div>
          <div className="px-3 py-1 bg-red-500/10 rounded-lg border border-red-500/20 text-red-300">
            <span className="text-[10px] text-red-400/70 block leading-tight font-mono">SLA Deviations</span>
            <span className="font-bold font-mono">{pushedSlaViolationsCount} registered</span>
          </div>
        </div>
      </div>

      {/* Choose Agent Deck */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {AGENTS.map(agent => {
          const IconComp = agent.icon;
          const isSelected = agent.id === selectedAgentId;
          return (
            <button
              key={agent.id}
              onClick={() => {
                setSelectedAgentId(agent.id);
                setSandboxActive(false);
                setSandboxLog([]);
              }}
              className={`text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                isSelected 
                  ? 'bg-indigo-950/40 border-indigo-500/50 text-white shadow-lg' 
                  : 'bg-slate-900/50 border-slate-800 text-gray-400 hover:border-slate-700/60 hover:bg-slate-900/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg border ${isSelected ? 'bg-indigo-500/20 text-indigo-300 border-indigo-600' : 'bg-slate-950 text-gray-500'}`}>
                  <IconComp className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold font-display">{agent.name}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-sans mt-2 line-clamp-2 leading-relaxed">{agent.role}</p>
              
              {isSelected && (
                <div className="absolute top-0 right-0 w-1.5 h-full bg-indigo-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Tab Switcher representing the 5 strategy criteria */}
      <div className="border-b border-slate-800 bg-slate-950/60 p-1 rounded-xl flex flex-wrap gap-1">
        {[
          { id: 'packaging', label: '1. Agent Packaging', desc: 'Secure manifest, schemas, contracts' },
          { id: 'distribution', label: '2. Agent Distribution', desc: 'Registry discoverability & orchestration' },
          { id: 'revenue', label: '3. Multi-Channel Revenue Sharing', desc: 'Platform fee take & compute splits' },
          { id: 'quality', label: '4. Quality Control & Evaluations', desc: 'Hallucination indexing & HITL thresholds' },
          { id: 'security', label: '5. Technical Security Controls', desc: 'SANDBOX runtime, network fencing, PII checks' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveSubTab(tab.id as any);
              setSandboxActive(false);
              setSandboxLog([]);
            }}
            className={`flex-1 min-w-[150px] p-3 rounded-lg text-left border transition-all duration-200 ${
              activeSubTab === tab.id
                ? 'bg-slate-900 border-indigo-800 text-white shadow-lg'
                : 'bg-transparent border-transparent text-gray-400 hover:bg-slate-900/40 hover:text-white'
            }`}
          >
            <span className="text-xs font-bold block leading-none">{tab.label}</span>
            <p className="text-[9px] text-gray-400 mt-1 block font-sans truncate">{tab.desc}</p>
          </button>
        ))}
      </div>

      {/* Context Strategy Console Space */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur min-h-[420px]">
        
        {/* TAB 1: PACKAGING */}
        {activeSubTab === 'packaging' && (
          <div className="space-y-6">
            <div className="flex justify-between items-start flex-wrap gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-semibold text-white font-display">1. Unified Agent Packaging Manifest Specification</h3>
                <p className="text-xs text-gray-400 mt-1 font-sans">
                  Design contract declaring strict inputs, outputs schema mappings, memory limits, and hardware runtime variables.
                </p>
              </div>
              <div className="text-[10px] bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1.5 rounded-lg text-indigo-300 font-mono uppercase">
                Schema: Draft-2026-v2 Live
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Manifest Editor / Inspector Panel */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex justify-between items-center bg-slate-950 px-4 py-2 border-t border-x border-slate-800 rounded-t-xl">
                  <span className="font-mono text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-indigo-400" />
                    manifest.json (Editable Schema Playground)
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded">VALID</span>
                </div>
                <textarea
                  value={currentManifest}
                  onChange={(e) => setCurrentManifest(e.target.value)}
                  className="w-full h-80 bg-slate-950 font-mono text-xs text-gray-300 p-4 rounded-b-xl border-b border-x border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition"
                  placeholder="Insert custom manifest package format details..."
                />
              </div>

              {/* Theoretical Core Explanation */}
              <div className="md:col-span-5 space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider text-indigo-300">Packaging Requirements Strategy</h4>
                  <p className="text-xs text-gray-400 mt-1">Every Agent package submitted must fulfill 3 architectural mandates:</p>
                </div>

                <div className="space-y-4 text-xs font-sans text-gray-300 leading-relaxed">
                  <div className="border-l-2 border-indigo-500/50 pl-3.5 space-y-1">
                    <span className="font-semibold text-white block">A. Strictly Defined Input/Output Port Structs</span>
                    <p className="text-gray-400 font-normal leading-normal">
                      Agents must declare strict schema objects. Unhandled data properties are parsed out immediately at the platform boundaries to maintain zero structural errors.
                    </p>
                  </div>

                  <div className="border-l-2 border-indigo-500/50 pl-3.5 space-y-1">
                    <span className="font-semibold text-white block">B. Declared Compute Class Limits</span>
                    <p className="text-gray-400 font-normal leading-normal">
                      Developers select optimized compute clusters (e.g. CPU-Standard, GPU-T4 Boost, TPU High-Mem) bound directly to predictable pay-as-you-go micro-tariffs.
                    </p>
                  </div>

                  <div className="border-l-2 border-indigo-500/50 pl-3.5 space-y-1">
                    <span className="font-semibold text-white block">C. Explicit Local Geolocation Limits</span>
                    <p className="text-gray-400 font-normal leading-normal">
                      Packages declare compliance regions (EU-GDPR, US-West, APAC-SG). Computes must stay within boundary silos, preventing multi-hop cross-continent transit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DISTRIBUTION */}
        {activeSubTab === 'distribution' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">2. Agent Distribution Registry & Orchestration</h3>
              <p className="text-xs text-gray-400 mt-1 font-sans">
                Outlining discoverability protocols, sandbox storefront index, deployment orchestration, and secure lifecycle tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Orchestration flow chart visualization */}
              <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-2xl space-y-4">
                <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-widest block font-bold">
                  Orchestrated Lifecycle Nodes
                </span>

                <div className="space-y-3 font-mono text-[11px]">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-gray-300">Phase 1: CI/CD Manifest Register</span>
                    <span className="text-emerald-400 font-bold">GitHub Sync Node</span>
                  </div>
                  <div className="text-center text-gray-500 select-none py-1">⬇</div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-gray-300">Phase 2: Automated Sandbox Test Verification</span>
                    <span className="text-orange-400 font-bold">Heuristic Scan Engine</span>
                  </div>
                  <div className="text-center text-gray-500 select-none py-1">⬇</div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-gray-300">Phase 3: Public Registry Listing Publish</span>
                    <span className="text-[#818cf8] font-bold">Elastic Discover Index</span>
                  </div>
                  <div className="text-center text-gray-500 select-none py-1">⬇</div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-gray-300">Phase 4: Multi-Tenant Workspace Integration</span>
                    <span className="text-emerald-400 font-bold">RBAC Auth Injection</span>
                  </div>
                </div>
              </div>

              {/* Distribution Specifications Text Card */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider text-indigo-300">Strategy Matrix Checklist</h4>
                  <p className="text-xs text-gray-400 mt-1">Platform mechanisms supporting infinite horizontal distribution scaling:</p>
                </div>

                <div className="space-y-4 text-xs font-sans text-gray-300 leading-relaxed">
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-white block font-mono text-[10px] uppercase text-[#818cf8]">Discoverability & Searching Index</span>
                    <p className="text-gray-300">
                      Agents are searched based on capabilities, token price efficiency, confidence logs, and verified developer rating. Semantic matching matches required campaign profiles automagically.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-white block font-mono text-[10px] uppercase text-emerald-400">Version Control and Hot Rollbacks</span>
                    <p className="text-gray-300">
                      The marketplace enforces semantic version tagging (e.g. 1.0.0, 1.0.1-beta). Tenants can freeze specific versions or subscribe locks to minor releases to safeguard workflow continuity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REVENUE */}
        {activeSubTab === 'revenue' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">3. Pricing Plan & Micro-Slicing Revenue Model</h3>
              <p className="text-xs text-gray-400 mt-1 font-sans">
                Determine transaction yields, licensing tiers, platform take margins, and compute gas allocations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dynamic Slicing Calculator Control */}
              <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">Dynamic Variable Pricing Engine</span>
                  <p className="text-xs text-gray-400 mt-1 font-sans">Slide inputs to forecast commission payouts:</p>
                </div>

                <div className="space-y-4">
                  {/* Monthly target */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">Monthly Projected Queries</span>
                      <span className="text-white font-bold">{monthlyAgentQueries.toLocaleString()} / mo</span>
                    </div>
                    <input 
                      type="range"
                      min="50000"
                      max="2000000"
                      step="50000"
                      value={monthlyAgentQueries}
                      onChange={(e) => setMonthlyAgentQueries(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 cursor-pointer"
                    />
                  </div>

                  {/* Avg API Cost */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">Average Price Per Invocation</span>
                      <span className="text-white font-bold">${averageQueryCost.toFixed(2)}</span>
                    </div>
                    <input 
                      type="range"
                      min="0.01"
                      max="0.50"
                      step="0.01"
                      value={averageQueryCost}
                      onChange={(e) => setAverageQueryCost(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800 cursor-pointer"
                    />
                  </div>

                  {/* Platform portion */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">Platform Take Rate Surcharge</span>
                      <span className="text-indigo-400 font-bold">{platformCommissionSlice}%</span>
                    </div>
                    <input 
                      type="range"
                      min="5"
                      max="30"
                      value={platformCommissionSlice}
                      onChange={(e) => setPlatformCommissionSlice(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Outputs Summary */}
              <div className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                    Calculated Dynamic Distribution Splits
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">Expected Invoicing Allocations</h4>
                </div>

                <div className="space-y-3.5 my-6 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-gray-400">Total Invoice Revenue Generated:</span>
                    <span className="font-mono font-bold text-white">${totalSpend.toLocaleString(undefined, {maximumFractionDigits:0})} / Month</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-gray-400">A. Marketplace Yield (Commission Slices):</span>
                    <span className="font-mono font-bold text-indigo-300">${platformRevenueShare.toLocaleString(undefined, {maximumFractionDigits:0})} / Month</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-gray-400">B. Compute Gas Network Reserve Fee:</span>
                    <span className="font-mono font-bold text-amber-500">${computeGasSystemRevenue.toLocaleString(undefined, {maximumFractionDigits:0})} / Month</span>
                  </div>

                  <div className="flex justify-between p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold rounded-xl">
                    <span className="text-gray-200">C. Net Developer / Creator Direct Payoff:</span>
                    <span className="font-mono text-emerald-400 font-bold text-sm select-all">
                      ${developerRevenuePayout.toLocaleString(undefined, {maximumFractionDigits:0})}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-500 leading-normal font-sans">
                  *Our co-commission matching engine leverages instant split transfers to reward prompt creators immediately upon invocation completion, eliminating outstanding accounts receivable latency.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: QUALITY CONTROL */}
        {activeSubTab === 'quality' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">4. Quality Control, SLA Evaluators & Benchmarks</h3>
              <p className="text-xs text-gray-400 mt-1 font-sans">
                Simulate evaluation loops, continuous verification parameters, hallucination margins, and dynamic human-in-the-loop (HITL) manual override locks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Quality Evaluators Settings Panel */}
              <div className="bg-slate-950/60 border border-slate-800 p-6 rounded-2xl space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">Interactive Quality Config Panel</span>
                  <p className="text-xs text-gray-400 mt-0.5">Control pipeline safety parameters:</p>
                </div>

                <div className="space-y-4">
                  {/* Slider 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">Target Benchmark Confidence Level</span>
                      <span className="text-white font-bold">{confidenceRate}%</span>
                    </div>
                    <input 
                      type="range"
                      min="80"
                      max="99"
                      step="0.5"
                      value={confidenceRate}
                      onChange={(e) => setConfidenceRate(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800"
                    />
                  </div>

                  {/* Slider 2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">HITL Manual Routing Threshold</span>
                      <span className="text-white font-bold">Below {hitlThreshold}% confidence</span>
                    </div>
                    <input 
                      type="range"
                      min="70"
                      max="95"
                      value={hitlThreshold}
                      onChange={(e) => setHitlThreshold(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800"
                    />
                  </div>

                  {/* Manual trigger simulation log list */}
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-850 text-[10px] space-y-1 font-mono text-gray-400">
                    <span className="text-white block font-bold uppercase text-[9px] mb-1">Live Evaluation Rules Active:</span>
                    <p>✔ Heuristics: Zero toxic keyword classification limits deployed.</p>
                    <p>✔ Hallucination Indexing: Grounding references verified with external search engine nodes.</p>
                    <p>✔ Intent Guardrails: Output is quarantined immediately when confidence drops below {hitlThreshold}%.</p>
                  </div>
                </div>
              </div>

              {/* Continuous Testing Simulation Space */}
              <div className="bg-slate-950/60 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block tracking-wider">
                    Execution Sandbox Tester
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">Dynamic Sandbox Execution Playground</h4>
                </div>

                {/* Simulated console feed */}
                <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-3 h-48 overflow-y-auto space-y-1 font-mono text-[10px] text-gray-300">
                  {sandboxLog.length === 0 ? (
                    <span className="text-gray-600 block italic leading-relaxed text-center py-12 select-none">
                      Launch the sandbox simulation to watch lifecycle evaluations run...
                    </span>
                  ) : (
                    sandboxLog.map((log, index) => (
                      <p key={index} className={
                        log.includes('[CRITICAL') 
                          ? 'text-red-400 font-bold' 
                          : log.includes('[SECURED') || log.includes('[SUCCESS') 
                            ? 'text-emerald-400 font-bold' 
                            : 'text-gray-300'
                      }>
                        &gt; {log}
                      </p>
                    ))
                  )}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={handleSandboxLaunch}
                    className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-xs rounded-lg transition-transform flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {sandboxActive ? "Stop Container" : "Deploy Simulation Sandbox"}
                  </button>

                  <button 
                    disabled={!sandboxActive}
                    onClick={executeSecurityTest}
                    className="px-3.5 py-2 bg-slate-900 border border-slate-800 text-xs font-semibold rounded-lg hover:border-slate-700 disabled:opacity-50 text-gray-300 transition-colors"
                  >
                    Test Exfiltration Alert
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SECURITY CONTROLS */}
        {activeSubTab === 'security' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">5. Security Isolation, Access Controls & PII Leak Firewall</h3>
              <p className="text-xs text-gray-400 mt-1 font-sans">
                Reviewing advanced multi-tenant isolation schemas, credential masking, network fencings, and active PII token filters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Checkbox settings */}
              <div className="md:col-span-7 space-y-4">
                <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-wider block font-bold">
                  Immutable Security Safeguards
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setPiiStripperActive(!piiStripperActive)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      piiStripperActive 
                        ? 'bg-slate-950/60 border-indigo-500/40 text-white shadow-md' 
                        : 'bg-slate-950/10 border-slate-850 text-gray-500 hover:border-slate-850'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                        piiStripperActive ? 'bg-indigo-500 border-indigo-400' : 'bg-transparent border-slate-700'
                      }`}>
                        {piiStripperActive && <Check className="w-3.5 h-3.5 text-slate-900 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="text-xs font-bold block">PII Stripping Filter</span>
                        <p className="text-[10px] text-gray-400 mt-1 leading-normal font-sans">
                          Anonymizes and purges raw emails, credit cards, or telephone numbers prior to sending payloads to common model endpoints.
                        </p>
                      </div>
                    </div>
                  </button>

                  <div className="text-left p-4 rounded-xl border bg-slate-950/60 border-indigo-500/40 text-white shadow-md">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 w-4 h-4 rounded border bg-indigo-500 border-indigo-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-slate-900 stroke-[3]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold block">Credential Masking Firewall</span>
                        <p className="text-[10px] text-gray-400 mt-1 leading-normal font-sans">
                          Intercepts system variables and strips tenant API secrets from LLM request logs completely. Prevents credential exfiltrations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-left p-4 rounded-xl border bg-slate-950/60 border-indigo-500/40 text-white shadow-md">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 w-4 h-4 rounded border bg-indigo-500 border-indigo-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-slate-900 stroke-[3]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold block">Containerized GPU Sandboxes</span>
                        <p className="text-[10px] text-gray-400 mt-1 leading-normal font-sans">
                          Isolates executable python/javascript loops within strict ephemeral docker sandboxes. Prevents container intrusion hacks.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-left p-4 rounded-xl border bg-slate-950/60 border-indigo-500/40 text-white shadow-md">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 w-4 h-4 rounded border bg-indigo-500 border-indigo-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-slate-900 stroke-[3]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold block">Network Fencing Controls</span>
                        <p className="text-[10px] text-gray-400 mt-1 leading-normal font-sans">
                          Limits outbound HTTP calls from running Agent containers exclusively to white-listed domains approved during listing verification.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanatory Sidebar Details */}
              <div className="md:col-span-5 bg-slate-950/40 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block">
                      Leakage Diagnostics Hub
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">Secure Containment Strategy</h4>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    By implementing an **isolated proxy network routing**, the platform guarantees that raw, sensitive secrets (such as Stripe API keys, customer lists, CRM passwords) stay in high-security keychains and are never sent as raw parameters to models. 
                  </p>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] leading-relaxed text-gray-400 space-y-1">
                    <span className="font-mono text-[9px] uppercase font-bold text-emerald-400 block pb-0.5">
                      Encrypted Key Management Vault:
                    </span>
                    <p>
                      Platform integrates directly with high-performance security stores to fetch dynamic key tokens on-demand, caching them with a TTL configuration under 120 seconds.
                    </p>
                  </div>
                </div>

                {leakAlert && (
                  <div className="mt-4 p-3 bg-red-955/20 border border-red-500/35 text-red-300 text-[11px] rounded-lg animate-pulse">
                    ⚠️ <strong>Leak Alert:</strong> Synthetic PII bypass simulation triggered! Secure filter checking active.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
