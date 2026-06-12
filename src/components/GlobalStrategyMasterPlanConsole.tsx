import React, { useState, useEffect } from 'react';
import { 
  Building2, ShieldCheck, DollarSign, Briefcase, Users, FileText, 
  Layers, Settings, Search, Check, Play, RefreshCw, BarChart2, 
  HelpCircle, Sparkles, TrendingUp, Compass, Award, ArrowUpRight, 
  AlertTriangle, Shield, Cpu, Network, Database, Globe, Landmark, 
  ChevronRight, ArrowRight, MessageSquare, LineChart, Coins, GitPullRequest
} from 'lucide-react';

interface StrategicCapability {
  id: string;
  name: string;
  shortDesc: string;
  pillars: string[];
  currentStatus: string;
  confidenceScore: number;
  highlightMetric: string;
  ctoSpec: string;
}

const MASTER_CAPABILITIES: StrategicCapability[] = [
  {
    id: 'rev_intel',
    name: 'Advanced Revenue Intelligence',
    shortDesc: 'Securing multi-tenant telemetry and automated signal matching for mid-market revenue divisions.',
    pillars: ['Zero-knowledge data enclaves', 'Cohort-based revenue benchmarks', 'Automatic signal filters'],
    currentStatus: 'v1.4 Sandbox Ready',
    confidenceScore: 96,
    highlightMetric: '99.8% Lead Accuracy Rate',
    ctoSpec: 'Decoupled double-blind tokenization queues utilizing client-side RSA/AES-256 wrapping.'
  },
  {
    id: 'ai_sdr',
    name: 'Autonomous AI SDR Orchestrator',
    shortDesc: 'Multi-agent hyper-personalized copywriters and linear outbox sequencing engines.',
    pillars: ['Contextual RAG-infused prompt generation', 'Spam trigger analytics', 'Automated meeting link routing'],
    currentStatus: 'Production Ready',
    confidenceScore: 98,
    highlightMetric: '3.4x Booking Response Lift',
    ctoSpec: 'Microservices dispatching task brokers under isolated docker layers on demand.'
  },
  {
    id: 'forecasting',
    name: 'Predictive Forecasting & Run Rate',
    shortDesc: 'Prognostic statistical simulations and churn intelligence bands with confidence intervals.',
    pillars: ['Monte Carlo churn projections', 'SaaS Magic Number runrate analysis', 'Expansion trigger matrices'],
    currentStatus: 'Beta Sandbox Active',
    confidenceScore: 91,
    highlightMetric: '+/- 2.4% Forecasting Precision',
    ctoSpec: 'D3 and custom mathematical models mapping linear regression coefficients on historic ingestion logs.'
  },
  {
    id: 'rev_ops',
    name: 'Revenue Operations (RevOps) Engine',
    shortDesc: 'Flexible rule-action workflow graphs mapping SDR behaviors to enterprise pipelines.',
    pillars: ['Linear workflow DAG creators', 'Unified tenant billings ledger', 'Stripe metadata webhooks integration'],
    currentStatus: 'Production Ready',
    confidenceScore: 95,
    highlightMetric: '15-Min Integration Synchronization',
    ctoSpec: 'Node-based event scheduler routing webhook events through safe retry retry-queues.'
  },
  {
    id: 'knowledge_graph',
    name: 'Global Revenue Knowledge Graph',
    shortDesc: 'Enterprise CRM entities interlocked via RDF triplets for true outbound mapping.',
    pillars: ['Dynamic entity-relationship model', 'Multi-hop querying engine', 'AI triplet extractor pipelines'],
    currentStatus: 'Alpha Active',
    confidenceScore: 87,
    highlightMetric: '14.2M Business Triplet Nodes',
    ctoSpec: 'Graph node indices storing high-density vector representations matching relational GTM nodes.'
  },
  {
    id: 'marketplace',
    name: 'Sovereign AI Agent Marketplace',
    shortDesc: 'Secure third-party SDR packaging, evaluation limits, sandboxed prompt runs, and revenue splits.',
    pillars: ['Sandboxed Web Container execution', 'Strict evaluation quotas', 'Stripe Connect payment distributions'],
    currentStatus: 'v1.0 Blueprint Ingested',
    confidenceScore: 92,
    highlightMetric: '30% Default Ecosystem Dev Split',
    ctoSpec: 'Secured VM-tier isolated network controls restricting outbound API calls during agent testing steps.'
  }
];

export default function GlobalStrategyMasterPlanConsole() {
  const [activeLeaderRole, setActiveLeaderRole] = useState<'ceo' | 'cto' | 'cso'>('ceo');
  const [selectedCapabilityId, setSelectedCapabilityId] = useState<string>('rev_intel');

  // Dynamic Strategic Projection state parameters
  const [marketAdoptionMultiplier, setMarketAdoptionMultiplier] = useState<number>(1.2); // x multiplier
  const [sdrConversionRate, setSdrConversionRate] = useState<number>(4.5); // % basic conversion rate 
  const [marketplaceSplitPercent, setMarketplaceSplitPercent] = useState<number>(30); // % dev share

  const [simulatedArr, setSimulatedArr] = useState<number[]>([]);
  const [requiredGpus, setRequiredGpus] = useState<number[]>([]);

  // Calculate Year 1-5 financial targets based on simulator parameters
  useEffect(() => {
    const baseClients = 250;
    const baseArpu = 24000; // $24k ARR contract default
    const yearScale = [1.0, 2.1, 4.4, 8.9, 17.5];

    const arrProjection = yearScale.map((scale, index) => {
      // client growth scales by marketAdoptionMultiplier
      const projectedClients = Math.round(baseClients * scale * marketAdoptionMultiplier);
      // premium yield scales with sdrConversionRate
      const arpuImpact = baseArpu * (1 + (sdrConversionRate - 3) * 0.12);
      // marketplace commission bonus based on split
      const marketplaceRevenueBonus = projectedClients * 5000 * (marketplaceSplitPercent / 30);
      
      return Math.round((projectedClients * arpuImpact) + marketplaceRevenueBonus);
    });

    const gpuScale = arrProjection.map(arr => {
      // GPU density maps to total transaction processing capacity
      return Math.max(16, Math.round(arr / 120000));
    });

    setSimulatedArr(arrProjection);
    setRequiredGpus(gpuScale);
  }, [marketAdoptionMultiplier, sdrConversionRate, marketplaceSplitPercent]);

  return (
    <div id="global-strategy-master-plan" className="space-y-8 animate-fadeIn text-slate-100">
      
      {/* 1. Header Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
            Executive Leadership Board
          </div>
          <h1 className="text-2xl font-bold font-display text-white mt-1">
            Global Revenue Intelligence Cloud
          </h1>
          <p className="text-xs text-gray-400 max-w-xl mt-1 leading-relaxed">
            Consolidated 5-Year Strategic Master Plan co-signed by the Founder, CEO, CTO, and CSO mapping the next evolution of multi-tenant enterprise outbound technology.
          </p>
        </div>

        {/* Dynamic Multi-role Switcher */}
        <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl max-w-sm self-start md:self-center">
          <button 
            onClick={() => setActiveLeaderRole('ceo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeLeaderRole === 'ceo' 
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            CEO Vision
          </button>
          <button 
            onClick={() => setActiveLeaderRole('cto')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeLeaderRole === 'cto' 
                ? 'bg-indigo-500 text-white shadow-md font-bold' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            CTO Architecture
          </button>
          <button 
            onClick={() => setActiveLeaderRole('cso')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition relative ${
              activeLeaderRole === 'cso' 
                ? 'bg-[#1e1b4b] border border-indigo-500/50 text-indigo-200 shadow-md font-bold' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            CSO Strategy
          </button>
        </div>
      </div>

      {/* 2. Consolidated 5-Year Vision Card */}
      <div className="p-6 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-gray-500">
          <Globe className="w-64 h-64" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase font-bold tracking-wider px-3 py-1 rounded-full">
              Global Platform Vision Statement
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">
              To build the unified cognitive network orchestrating outbound pipelines, matching signals, and dynamic marketplaces across 10,000 global organizations.
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl font-sans">
              "Over the next 5 years, sales teams will shift from manual campaign configuration to sovereign multi-agent networks that auto-heal contact databases, launch contextual sequences on raw signals, and settle commission-splits instantly with zero human operational leakage."
            </p>
          </div>

          <div className="md:col-span-4 bg-zinc-900/60 border border-zinc-800 p-5 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800 pb-2">
              <span>Platform Target Group:</span>
              <span className="text-emerald-400 font-bold uppercase text-[10px]">Tier-1 Global SaaS & Fintech</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800 pb-2">
              <span>Primary Engine Mode:</span>
              <span className="text-indigo-400 font-bold uppercase text-[10px]">Zero-Knowledge Sovereign</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Current Architecture:</span>
              <span className="bg-zinc-800/80 px-2 py-0.5 rounded text-[10.5px] border border-zinc-700 text-white">Full-Stack Active (v4.8)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ROLE CANVAS 1: CEO VISION */}
      {activeLeaderRole === 'ceo' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* CEO Metrics Plan and Interactive Revenue Projections Simulator */}
            <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 lg:p-8 space-y-6">
              <div>
                <span className="text-xs text-indigo-400 font-mono uppercase font-bold tracking-widest block">Operational Simulator</span>
                <h3 className="text-lg font-bold font-display text-white mt-1">
                  5-Year Revenue Projection & Scale Simulator
                </h3>
                <p className="text-xs text-zinc-400">
                  Slide parameters to audit predicted ARR growth trends, target margins, and minimum GPU requirements over a 5-year scaling runway.
                </p>
              </div>

              {/* Sliders container */}
              <div className="bg-zinc-950/60 p-5 border border-zinc-805 rounded-xl space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-zinc-300">
                    <span>Global Market Adoption Multiplier</span>
                    <span className="text-emerald-400 font-bold">{marketAdoptionMultiplier}x standard expansion</span>
                  </div>
                  <input 
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.1"
                    value={marketAdoptionMultiplier}
                    onChange={(e) => setMarketAdoptionMultiplier(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-zinc-800 cursor-pointer h-1.5 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-zinc-300">
                    <span>Target Outbound Conversion Rate (AI SDR)</span>
                    <span className="text-[#818cf8] font-bold">{sdrConversionRate}% Response Success</span>
                  </div>
                  <input 
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.5"
                    value={sdrConversionRate}
                    onChange={(e) => setSdrConversionRate(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-zinc-800 cursor-pointer h-1.5 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-zinc-300">
                    <span>AI Agent Marketplace Split Plan</span>
                    <span className="text-zinc-300 font-bold">{marketplaceSplitPercent}% Dev Commission</span>
                  </div>
                  <input 
                    type="range"
                    min="10"
                    max="45"
                    step="5"
                    value={marketplaceSplitPercent}
                    onChange={(e) => setMarketplaceSplitPercent(Number(e.target.value))}
                    className="w-full accent-zinc-500 bg-zinc-800 cursor-pointer h-1.5 rounded-lg"
                  />
                </div>
              </div>

              {/* Calculated dynamic visual bar charts: Year 1 to 5 ARR Targets */}
              <div className="space-y-4">
                <span className="text-xs text-zinc-400 font-mono uppercase tracking-wide block">5-Year Target ARR Projections (USD)</span>
                <div className="grid grid-cols-5 gap-3 h-48 items-end bg-zinc-950/40 p-4 border border-zinc-850 rounded-xl relative">
                  {simulatedArr.map((arr, index) => {
                    // Normalize height relative to Year 5 ARR maximum of $25M
                    const percentHeight = Math.min(100, Math.max(10, (arr / 20000000) * 100));
                    return (
                      <div key={index} className="flex flex-col items-center justify-end h-full group relative">
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full mb-1.5 bg-zinc-900 border border-zinc-800 p-1.5 rounded text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition z-25 pointer-events-none whitespace-nowrap">
                          ARR: ${(arr / 1000000).toFixed(2)}M
                          <span className="block text-[8px] text-zinc-400">GPUs required: {requiredGpus[index]}</span>
                        </div>

                        <div 
                          className="w-full hover:brightness-110 cursor-pointer rounded-t-lg transition-all duration-300"
                          style={{ 
                            height: `${percentHeight}%`,
                            background: index === 4 
                              ? 'linear-gradient(to top, #10b981, #34d399)' 
                              : 'linear-gradient(to top, #4f46e5, #818cf8)'
                          }}
                        />
                        <span className="text-[10px] font-mono font-bold text-zinc-500 mt-2 block">Y{index+1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950 p-4 border border-zinc-800 rounded-xl text-xs space-y-1">
                  <span className="text-zinc-500 font-mono tracking-wider block uppercase text-[8px]">YEAR 5 CLIENT CAP:</span>
                  <p className="text-sm font-bold text-white font-mono">
                    {Math.round(250 * 17.5 * marketAdoptionMultiplier)} Custom Tenants Accounted
                  </p>
                </div>
                <div className="bg-zinc-950 p-4 border border-zinc-800 rounded-xl text-xs space-y-1">
                  <span className="text-zinc-500 font-mono tracking-wider block uppercase text-[8px]">ESTIMATED SYSTEM MARGIN:</span>
                  <p className="text-sm font-bold text-emerald-400 font-mono">
                    84.2% Gross Operating Target Margin
                  </p>
                </div>
              </div>

            </div>

            {/* CEO Human Capital and Team Structure Hierarchy Map */}
            <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 lg:p-8 space-y-5">
              <div>
                <span className="text-xs text-indigo-400 font-mono uppercase font-bold tracking-widest block">Organizational Design</span>
                <h3 className="text-lg font-bold font-display text-white mt-1">
                  Team Structure & Human Capital Plan
                </h3>
                <p className="text-xs text-zinc-400">
                  Sovereign operational divisions engineered to run our high-velocity enterprise pipeline.
                </p>
              </div>

              {/* Team Divisions block maps */}
              <div className="space-y-3">
                
                {/* Board Division Card */}
                <div className="p-3.5 bg-zinc-950 border border-zinc-805 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold font-display text-white">Board & Executive Officers</span>
                    <span className="text-[9px] font-mono bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded">6 Headcount</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    Lead by CEO, CTO, CSO, COO, CRO, and CFO directing resource allocators.
                  </p>
                </div>

                {/* Engineering Division Card */}
                <div className="p-3.5 bg-indigo-950/30 border border-indigo-900/60 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold font-display text-indigo-300 flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" />
                      R&D Core Engineering (CTO Node)
                    </span>
                    <span className="text-[9px] font-mono bg-indigo-950 border border-indigo-800 text-indigo-300 px-1.5 py-0.5 rounded">42 Seats</span>
                  </div>
                  <ul className="text-[10.5px] text-zinc-400 list-disc list-inside space-y-0.5 font-sans">
                    <li>Dynamic Sandbox & Docker isolation team</li>
                    <li>RAG & LLM alignment pipeline operators</li>
                    <li>Knowledge database cluster engineers</li>
                  </ul>
                </div>

                {/* Sales & Growth Division Card */}
                <div className="p-3.5 bg-emerald-950/20 border border-emerald-900/50 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold font-display text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Revenue Operations & Solutions (CRO Node)
                    </span>
                    <span className="text-[9px] font-mono bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded">24 Seats</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    Account Executives, RevOps Integration managers, and outbound SDR sequence advisors.
                  </p>
                </div>

                {/* Operations & Success Division Card */}
                <div className="p-3.5 bg-zinc-950 border border-zinc-805 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold font-display text-zinc-300">Compliance & Sovereign Success</span>
                    <span className="text-[9px] font-mono bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded">12 Seats</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    Dedicated support engineers, customer success analysts, and legal/HIPAA coordinators.
                  </p>
                </div>

              </div>

              {/* Strategic Target Note */}
              <div className="bg-[#1e1b4b]/40 border border-indigo-950 p-3.5 rounded-lg text-xs font-mono text-zinc-300">
                <strong>Strategic Target ACV:</strong> $34,800 median customer pricing model to maintain 8.4x CAC payback efficiency limits.
              </div>
            </div>
          </div>
          
        </div>
      )}

      {/* ROLE CANVAS 2: CTO ARCHITECTURE */}
      {activeLeaderRole === 'cto' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* CTO Core System Capabilities Mapping */}
            <div className="lg:col-span-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 lg:p-8 space-y-6">
              <div>
                <span className="text-xs text-indigo-400 font-mono uppercase font-bold tracking-widest block">Developer Spec</span>
                <h3 className="text-lg font-bold font-display text-white mt-1">
                  Sovereign Engineering Capabilities
                </h3>
                <p className="text-xs text-zinc-400">
                  Select a capability to inspect its target software component schema and cryptographic container spec.
                </p>
              </div>

              {/* List of Capabilities */}
              <div className="space-y-2">
                {MASTER_CAPABILITIES.map(spec => {
                  const isSelected = spec.id === selectedCapabilityId;
                  return (
                    <button
                      key={spec.id}
                      onClick={() => setSelectedCapabilityId(spec.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 ${
                        isSelected 
                          ? 'bg-zinc-950 border-indigo-400 text-white shadow'
                          : 'bg-zinc-900/60 border-zinc-800 text-gray-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold font-display">{spec.name}</span>
                        <span className="text-[9px] font-mono text-indigo-400">{spec.currentStatus}</span>
                      </div>
                      <p className="text-[10.5px] text-zinc-400 mt-1 font-sans line-clamp-1">{spec.shortDesc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spec Details Card */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Selected spec specifications pane */}
              {(() => {
                const s = MASTER_CAPABILITIES.find(x => x.id === selectedCapabilityId) || MASTER_CAPABILITIES[0];
                return (
                  <div className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-2xl space-y-5">
                    <div className="border-b border-zinc-800 pb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider block">
                        COGNITIVE SPECIFICATION SHEET
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1 font-display">{s.name}</h4>
                    </div>

                    <div className="space-y-4 text-xs font-sans">
                      <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-850">
                        <span className="font-mono text-[9px] uppercase font-bold text-indigo-400 block mb-1">Architecture Implementation Spec (CTO spec):</span>
                        <p className="text-zinc-300 leading-relaxed leading-normal">{s.ctoSpec}</p>
                      </div>

                      <div className="space-y-2">
                        <span className="font-mono text-[9px] uppercase font-bold text-amber-500 block">Core Technical Pillars:</span>
                        <div className="flex flex-col gap-2 pt-1 font-sans">
                          {s.pillars.map((p, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-zinc-400">
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-4">
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase block leading-none">Internal confidence target</span>
                          <span className="text-sm font-mono text-white font-bold">{s.confidenceScore}% alignment</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase block leading-none">Simulated audit focus</span>
                          <span className="text-sm font-mono text-emerald-400 font-bold">{s.highlightMetric}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* CTO Strategic Infrastructure Roadmap */}
              <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-500 uppercase font-bold block">Security & Clusters Plan</span>
                  <h4 className="text-xs text-zinc-400">Future Cloud Infrastructure Roadmap Parameters</h4>
                </div>

                <div className="space-y-3 font-mono text-[10px] text-zinc-300">
                  <div className="p-3 bg-zinc-950 border border-zinc-850 rounded flex items-center justify-between">
                    <span>Database Engine:</span>
                    <strong>TimescaleDB + Dual-Channel pg_vector</strong>
                  </div>
                  <div className="p-3 bg-zinc-950 border border-zinc-850 rounded flex items-center justify-between">
                    <span>Target Enclaves:</span>
                    <strong>AWS Nitro Private Sandbox Nodes</strong>
                  </div>
                  <div className="p-3 bg-zinc-950 border border-zinc-850 rounded flex items-center justify-between">
                    <span>Load Balancer Strategy:</span>
                    <strong>NGINX Dual Ingress (Port 3000 Active Proxy)</strong>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ROLE CANVAS 3: CSO STRATEGY */}
      {activeLeaderRole === 'cso' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* 5-Year Roadmap Timeline */}
          <div className="bg-zinc-900/40 border border-zinc-805 rounded-2xl p-6 lg:p-8 space-y-6">
            <div>
              <span className="text-xs text-indigo-400 font-mono uppercase font-bold tracking-widest block">Horizon Milestones</span>
              <h3 className="text-lg font-bold font-display text-white mt-1">
                5-Year Strategic GTM & Product Release Roadmap
              </h3>
              <p className="text-xs text-zinc-400">
                Quarterly chronological plans mapping key developments, market penetration strategies, and platform roll-outs.
              </p>
            </div>

            {/* Release blocks timeline representing Year 1 to 5 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              
              {/* Year 1 */}
              <div className="p-4 bg-zinc-950 border border-zinc-805 rounded-xl space-y-2 relative">
                <span className="text-[10px] font-mono font-bold text-indigo-400 block">YEAR 1 (Q1 - Q4)</span>
                <span className="text-xs font-bold text-white block">Horizon Pilot launch</span>
                <p className="text-[10.5px] font-sans text-zinc-400 leading-relaxed">
                  Establish core multi-tenant lead CRMs, OAuth adapters, and localized SDR writing pipelines.
                </p>
                <div className="text-[9px] font-mono text-zinc-500">Milestone ACV target: $15,000</div>
              </div>

              {/* Year 2 */}
              <div className="p-4 bg-zinc-950 border border-zinc-805 rounded-xl space-y-2 relative">
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-mono font-bold text-indigo-400 block">YEAR 2</span>
                <span className="text-xs font-bold text-white block">Intelligence Network</span>
                <p className="text-[10.5px] font-sans text-zinc-400 leading-relaxed">
                  Deploy double-blind PII stripping arrays, anonymized cohorts, and secure file loaders.
                </p>
                <div className="text-[9px] font-mono text-zinc-500">Milestone ACV target: $28,000</div>
              </div>

              {/* Year 3 */}
              <div className="p-4 bg-zinc-950 border border-indigo-950 rounded-xl space-y-2 relative">
                <span className="text-[10px] font-mono font-bold text-[#818cf8] block">YEAR 3</span>
                <span className="text-xs font-bold text-white block">The Knowledge Graph</span>
                <p className="text-[10.5px] font-sans text-zinc-400 leading-relaxed">
                  Launch the multi-hop dynamic entity mapping graphs matching buyer nodes to signals automatically.
                </p>
                <div className="text-[9px] font-mono text-zinc-500">Milestone ACV target: $45,000</div>
              </div>

              {/* Year 4 */}
              <div className="p-4 bg-zinc-950 border border-zinc-805 rounded-xl space-y-2 relative">
                <span className="text-[10px] font-mono font-bold text-zinc-400 block">YEAR 4</span>
                <span className="text-xs font-bold text-white block">Agent Marketplace</span>
                <p className="text-[10.5px] font-sans text-zinc-400 leading-relaxed">
                  Open evaluation engines for third-party developer sandboxed agents and custom outbound templates.
                </p>
                <div className="text-[9px] font-mono text-zinc-500">Milestone ACV target: $60,000</div>
              </div>

              {/* Year 5 */}
              <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-xl space-y-2 relative shadow-lg">
                <span className="text-[10px] font-mono font-bold text-emerald-400 block">YEAR 5</span>
                <span className="text-xs font-bold text-white block">Citadel Global Cloud</span>
                <p className="text-[10.5px] font-sans text-emerald-300 leading-relaxed">
                  Achieving unified enterprise global cloud node deployments on completely sandboxed VPC targets.
                </p>
                <div className="text-[9px] font-mono text-emerald-400 font-bold">Milestone ACV target: $120,000</div>
              </div>

            </div>
          </div>

          {/* CSO Defensive Competitive Moats */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            <div className="md:col-span-7 bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-5">
              <div>
                <span className="text-xs text-indigo-400 font-mono uppercase font-bold tracking-widest block">Moats and Defensibility</span>
                <h3 className="text-sm font-bold font-display text-white mt-1">
                  Brand & Product Defensibility Pillars
                </h3>
                <p className="text-xs text-zinc-400">
                  Our strategic defenses engineered to sustain absolute market primacy over the next decade.
                </p>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div className="p-4 bg-zinc-950 border border-zinc-805 rounded-xl">
                  <span className="font-bold text-white font-mono text-[9px] uppercase tracking-wide block text-[#818cf8] mb-1">
                    Moat 1: High Data Gravity Network
                  </span>
                  <p className="text-zinc-400">
                    With every lead scored and campaign message parsed, the global outbound scoring weights become more precise. This feedback loop ensures competitors face severe payload conversion gaps.
                  </p>
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-805 rounded-xl">
                  <span className="font-bold text-white font-mono text-[9px] uppercase tracking-wide block text-emerald-400 mb-1">
                    Moat 2: Regulatory Lock-In / Enclave Primacy
                  </span>
                  <p className="text-zinc-400">
                    By deploying native HSM (Hardware Security Module) decryption inside sandboxed VPC enclaves, we can acquire enterprise hospital networks and bank pipelines that cannot legally use legacy scrapers.
                  </p>
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-805 rounded-xl">
                  <span className="font-bold text-white font-mono text-[9px] uppercase tracking-wide block text-amber-500 mb-1">
                    Moat 3: Ecosystem Marketplace Lock-In
                  </span>
                  <p className="text-zinc-400">
                    Outsourced SDR agency owners and individual prompt creators generate highly customized templates, billing client accounts directly inside the EffectiveBuzz cockpit.
                  </p>
                </div>
              </div>
            </div>

            {/* Strategic Risks & Warnings card */}
            <div className="md:col-span-5 bg-zinc-950/60 border border-red-950 p-6 rounded-2xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="p-1.5 bg-red-950/60 border border-red-900/80 rounded-lg text-red-400 w-fit">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">CSO Strategic Threat Analysis</h4>
                <p className="text-xs text-zinc-450 leading-relaxed font-sans mt-2">
                  Market barriers and systemic threats we must continuously navigate:
                </p>
              </div>

              <div className="my-6 space-y-4 text-[11px] font-sans text-zinc-350">
                <div className="flex gap-2.5">
                  <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p><strong>Database licensing spikes:</strong> Mitigated by migrating core schemas to PostgreSQL / open-source distributed tables.</p>
                </div>
                <div className="flex gap-2.5">
                  <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p><strong>SDR spam-filtering updates:</strong> Mitigated by active domain cooling and dynamic inbox pacing algorithms.</p>
                </div>
              </div>

              <div className="p-3 bg-zinc-900 border border-zinc-850 rounded text-[10px] font-mono text-zinc-400">
                Ref Strategic Manual Index: EB-CSO-844.2026
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
