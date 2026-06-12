import React, { useState } from 'react';
import { 
  TrendingUp, Users, Target, Shield, Server, DollarSign, Activity, 
  Briefcase, AlertOctagon, Compass, Layers, CheckCircle2, ChevronRight, 
  Sparkles, RefreshCw, Star, Info, PieChart, ShieldAlert, Zap
} from 'lucide-react';

interface BoardPerspective {
  role: 'ceo' | 'chair' | 'independent' | 'investor';
  title: string;
  name: string;
  icon: any;
  quote: string;
  focusMetrics: { label: string; current: string; simulated: string; icon: any }[];
  strategicPriority: string;
}

interface StrategicRisk {
  id: string;
  risk: string;
  impact: string;
  severity: 'CRITICAL' | 'MEDIUM' | 'LOW';
  mitigation: string;
}

interface StrategicOpportunity {
  id: string;
  opp: string;
  source: string;
  projectedARR: string;
  roiScore: string;
}

export default function QuarterlyBoardReport() {
  const [activeTab, setActiveTab ] = useState<'dashboard' | 'risks' | 'capital' | 'hiring' | 'product'>('dashboard');
  const [activePerspective, setActivePerspective ] = useState<'ceo' | 'chair' | 'independent' | 'investor'>('ceo');

  // Interactive Parameters for Simulation
  const [simulation, setSimulation] = useState({
    growthCapitalScale: 40, // 40% (20% to 70%) allocation to growth
    productCapitalScale: 40, // 40% (20% to 70%) allocation to product
    reserveCapitalScale: 20, // 20% target reserve
    onboardingFixPriority: 50, // 50% technical setup wizard rollout
    mailboxCapThreshold: 3, // mailbox constraints
    regionalVarEnable: true, // reseller channel active
  });

  // Dynamic Metrics Formulation
  const baseARR = 1248000;
  const simulatedVarRevenue = simulation.regionalVarEnable ? 285000 : 0;
  const simulatedSaaSSeatIncrease = simulation.mailboxCapThreshold <= 3 ? 193000 : 45000;
  const simulatedARR = baseARR + simulatedVarRevenue + simulatedSaaSSeatIncrease;

  // LTV and CAC dynamics based on product tuning
  const simulatedLTV = Math.round(31200 * (1 + (simulation.onboardingFixPriority / 200)));
  const simulatedCAC = Math.round(3428 / (simulation.regionalVarEnable ? 1.2 : 1.0));
  const simulatedLtvToCac = (simulatedLTV / simulatedCAC).toFixed(1);

  // Capital allocation values based on sum limit scaling
  const totalCapitalInAir = 1500000; // $1.5M Cash Account Runway
  const growthCapitalBudget = Math.round(totalCapitalInAir * (simulation.growthCapitalScale / 100));
  const productCapitalBudget = Math.round(totalCapitalInAir * (simulation.productCapitalScale / 100));
  const reserveCapitalBudget = Math.round(totalCapitalInAir * (100 - simulation.growthCapitalScale - simulation.productCapitalScale) / 100);

  const activeCustomerSdrActivations = Math.round(40 + (simulation.onboardingFixPriority * 0.4));
  const monthlySupportTickets = Math.max(25, Math.round(180 - (simulation.onboardingFixPriority * 1.6)));

  // Core perspective viewpoints
  const perspectives: Record<'ceo' | 'chair' | 'independent' | 'investor', BoardPerspective> = {
    ceo: {
      role: 'ceo',
      title: 'Chief Executive Officer',
      name: 'Corporate Executive Director Team',
      icon: Briefcase,
      quote: "EffectiveBuzz is executing robustly in Q2. By resolving DMARC onboarding hurdles and rolling out EMEA VAR partner licensing, we clear high contract pipelines and protect our 81% token operating margin.",
      focusMetrics: [
        { label: 'Annual Recurring Revenue (ARR)', current: '$1.248M', simulated: `$${simulatedARR.toLocaleString()}`, icon: DollarSign },
        { label: 'Sequence Configuration Success', current: '40%', simulated: `${activeCustomerSdrActivations}%`, icon: Zap }
      ],
      strategicPriority: 'Direct execution of regional VAR expansion, automated configuration diagnostics, and SaaS contract monetizations.'
    },
    chair: {
      role: 'chair',
      title: 'Board Chairman',
      name: 'Lead Board Governance Committee',
      icon: Star,
      quote: "Capital preservation and resource allocation accuracy are critical to securing our pre-Series A window. We must maintain disciplined reserves while funding clear technical bottlenecks.",
      focusMetrics: [
        { label: 'Runway Allotment Budget', current: '$1.50M Cash Pool', simulated: `$${totalCapitalInAir.toLocaleString()} Cash`, icon: Server },
        { label: 'Corporate Reserves Safe Cushion', current: '$300K Safe-Cove', simulated: `$${Math.max(0, reserveCapitalBudget).toLocaleString()}`, icon: Shield }
      ],
      strategicPriority: 'Governance oversight, budget limit adherence, and protecting shareholder interests across capital slices.'
    },
    independent: {
      role: 'independent',
      title: 'Independent Board Director',
      name: 'Risk & Audit Committee Oversight',
      icon: Info,
      quote: "Compliance is NOT a cost center. Stricter EMEA GDPR guidelines and UAE localization laws are strategic gatekeepers. Building geographic replication hubs removes sales bottlenecks and seals contract safety.",
      focusMetrics: [
        { label: 'Support Case Slashes', current: '180 cases monthly', simulated: `${monthlySupportTickets} active cases`, icon: Activity },
        { label: 'EMEA GDPR / UAE Data Clear', current: 'Blocked Pipeline', simulated: simulation.regionalVarEnable ? 'GCC & EU Compliant' : 'Regional Lock', icon: ShieldAlert }
      ],
      strategicPriority: 'Ensuring absolute regulatory audits, optimizing subscription model limits, and reducing technical customer support strain.'
    },
    investor: {
      role: 'investor',
      title: 'Lead Series A Investor',
      name: 'Institutional Capital Strategic Partner',
      icon: Target,
      quote: "The unit economics at EffectiveBuzz are stellar. At a 9.1x LTV-to-CAC, we have established a robust business engine. Tightening team profile sharing maps adds immediate margin protection.",
      focusMetrics: [
        { label: 'Capital LTV-to-CAC Efficiency Ratio', current: '9.1x Standard', simulated: `${simulatedLtvToCac}x Optimized`, icon: TrendingUp },
        { label: 'Customer Lifetime Contract Value', current: '$31,200 standard', simulated: `$${simulatedLTV.toLocaleString()}`, icon: Layers }
      ],
      strategicPriority: 'ARR growth scaling velocity, valuation metrics defense, and preparing the framework for institutional Series A pipelines.'
    },
  };

  const selectedPerspective = perspectives[activePerspective];

  return (
    <div className="space-y-6">
      {/* Interactive Board Title Ring */}
      <div className="bg-gradient-to-r from-violet-500/15 via-indigo-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-violet-500/10 text-violet-400 text-xs font-mono font-bold uppercase tracking-wider">
                Executive Governance Board
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Quarterly Board Report & Corporate Simulator</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Q2 2026 Strategic Board Council & Valuation Metric Suite
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Conduct board oversight through the shared lenses of the CEO, Board Chair, Independent Director, and Lead Series A Investor. Tweak capital variables, run pipeline conversions, and review actionable roadmaps.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-violet-400">
            <PieChart className="w-4 h-4 text-violet-400" />
            <span>ARR Run-Rate: ${(simulatedARR/1000000).toFixed(3)}M</span>
          </div>
        </div>
      </div>

      {/* Board Perspectives Core Navigation */}
      <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-gray-900 pb-3">
          <div className="space-y-0.5">
            <span className="text-xs font-mono text-zinc-400 font-bold uppercase block">1. SELECT BOARD MEMBER PERSPECTIVE:</span>
            <p className="text-[10px] text-zinc-500 font-mono">Observe operational dynamics through dedicated executive profiles</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(perspectives) as ('ceo' | 'chair' | 'independent' | 'investor')[]).map((key) => {
              const pers = perspectives[key];
              const Icon = pers.icon;
              return (
                <button
                  key={key}
                  id={`btn_perspective_${key}`}
                  onClick={() => setActivePerspective(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    activePerspective === key
                      ? 'bg-violet-500/10 border-violet-500/30 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{pers.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Perspective Detail Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-7 space-y-3.5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-zinc-900 text-zinc-400 font-mono text-[9px] font-bold border border-zinc-800">
                  {selectedPerspective.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
              </div>
              <blockquote className="text-[12.5px] italic text-zinc-300 font-display leading-relaxed border-l-2 border-violet-500/50 pl-4 py-1">
                "{selectedPerspective.quote}"
              </blockquote>
            </div>
            <div className="p-3 bg-violet-500/[0.02] border border-violet-500/10 rounded-lg">
              <span className="text-[9.5px] font-bold font-mono text-violet-400 uppercase tracking-widest block mb-1">STRATEGIC GOAL DIRECTIVE:</span>
              <p className="text-[10.5px] font-mono text-zinc-400 leading-relaxed">{selectedPerspective.strategicPriority}</p>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-2.5">
            {selectedPerspective.focusMetrics.map((met, idx) => {
              const Icon = met.icon;
              return (
                <div key={idx} className="p-4 bg-slate-900/40 border border-slate-900/80 rounded-xl space-y-1 font-mono">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold flex items-center gap-1.5 tracking-wider">
                    <Icon className="w-3.5 h-3.5 text-violet-400" /> {met.label}
                  </span>
                  <div className="flex items-baseline gap-2.5 pt-1">
                    <span className="text-[10.5px] text-zinc-500 font-normal">Q2 Current: {met.current}</span>
                    <ChevronRight className="w-3 h-3 text-zinc-600" />
                    <span className="text-sm font-bold text-emerald-400">Projected Mode: {met.simulated}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Structural Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Playbook Sliders Container */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-950 rounded-lg border border-gray-900 text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
            Quarterly Parameter Adjuster
          </div>

          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-4 font-mono text-xs text-zinc-400">
            
            {/* Control A: Capital Allocation Sliders */}
            <div className="space-y-2 pb-2.5 border-b border-gray-900">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-400 uppercase font-semibold">GROWTH CAPITAL BUDGET:</span>
                <span className="text-violet-400 font-bold">{simulation.growthCapitalScale}% ({Math.round(simulation.growthCapitalScale * 15000)}k)</span>
              </div>
              <input
                type="range"
                min="20"
                max="70"
                step="5"
                value={simulation.growthCapitalScale}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setSimulation(prev => {
                    const currentProd = prev.productCapitalScale;
                    const maxAllowedProd = 100 - val;
                    return {
                      ...prev,
                      growthCapitalScale: val,
                      productCapitalScale: Math.min(currentProd, maxAllowedProd)
                    };
                  });
                }}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-violet-400"
              />
              <p className="text-[9px] text-gray-500">Capital dedicated to global partner alliances and pipeline multipliers.</p>
            </div>

            {/* Control B: Product Capital Allocation */}
            <div className="space-y-2 pb-2.5 border-b border-gray-900">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-400 uppercase font-semibold">PRODUCT CAPITAL BUDGET:</span>
                <span className="text-indigo-400 font-bold">{simulation.productCapitalScale}% ({Math.round(simulation.productCapitalScale * 1500)}k)</span>
              </div>
              <input
                type="range"
                min="20"
                max="70"
                step="5"
                value={simulation.productCapitalScale}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setSimulation(prev => {
                    const currentGrowth = prev.growthCapitalScale;
                    const maxAllowedGrowth = 100 - val;
                    return {
                      ...prev,
                      productCapitalScale: val,
                      growthCapitalScale: Math.min(currentGrowth, maxAllowedGrowth)
                    };
                  });
                }}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-indigo-400"
              />
              <p className="text-[9px] text-gray-500">Funds DNS onboarding tools and physical geo-replicated data slices.</p>
            </div>

            {/* Control C: Onboarding Fix Bandwidth */}
            <div className="space-y-2 pb-2.5 border-b border-gray-900">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-400 uppercase font-semibold">DNS DIAGNOSTIC PRIORITY:</span>
                <span className="text-amber-400 font-bold">{simulation.onboardingFixPriority}% rollout</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={simulation.onboardingFixPriority}
                onChange={(e) => setSimulation(prev => ({ ...prev, onboardingFixPriority: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-amber-400"
              />
              <p className="text-[9px] text-gray-500">Directs developers to implement automated SPF/DKIM verification checks.</p>
            </div>

            {/* Control D: Mailbox Cap Monopolization */}
            <div className="space-y-2 pb-2 border-b border-gray-900">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-400 uppercase font-semibold">MAILBOX SEAT LIMIT:</span>
                <span className="text-rose-400 font-bold">{simulation.mailboxCapThreshold} profile limit</span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={simulation.mailboxCapThreshold}
                onChange={(e) => setSimulation(prev => ({ ...prev, mailboxCapThreshold: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-rose-400"
              />
              <p className="text-[9px] text-gray-500">Enforces license updates, capping extra mailboxes at $45/mo surcharge.</p>
            </div>

            {/* Control E: Reseller Channel Activation (Checkbox / Toggle) */}
            <div className="flex justify-between items-center pt-1.5">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider block">EMEA/GCC VAR CHANNELS:</span>
                <p className="text-[8.5px] text-gray-500 max-w-[170px]">Partner referral networks driving high ARR pipelines.</p>
              </div>
              <button
                onClick={() => setSimulation(prev => ({ ...prev, regionalVarEnable: !prev.regionalVarEnable }))}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer border ${
                  simulation.regionalVarEnable 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : 'bg-slate-900 border-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                {simulation.regionalVarEnable ? 'ACTIVE' : 'INACTIVE'}
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-2 font-mono text-[9px] text-zinc-500">
            <span className="text-[9.5px] text-violet-400 font-bold uppercase block tracking-wider">Strategic Runway Security</span>
            <p className="leading-relaxed">
              Based on Series A requirements, we target an LTV-to-CAC efficiency of 9.5x+ while retaining at least $250k in corporate cushion pools.
            </p>
          </div>
        </div>

        {/* Dynamic Display Panels Viewports */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-violet-400" /> Strategic Alignment Centers
            </span>
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'dashboard', label: '1. Executive overview' },
                { id: 'risks', label: '2. Strategic risks' },
                { id: 'capital', label: '3. Capital allocation' },
                { id: 'hiring', label: '4. Hiring proposal' },
                { id: 'product', label: '5. Product roadmap' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-2.5 py-1 rounded text-[9.5px] uppercase font-bold font-mono transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-violet-500/10 border border-violet-500/20 text-white' 
                      : 'text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Viewport 1: Executive Overview */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 font-mono text-xs">
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                The corporate dashboard monitors key SaaS financials, conversion pathways, team capacity and market positioning. Modify parameters on the left to simulate operational projections and safeguard expansion targets.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-950 border border-gray-900/80 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-900 pb-2">
                    <span className="text-white font-bold block text-xs">Key SaaS Projections</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-500">Simulated ARR:</span>
                      <strong className="text-white">${simulatedARR.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-500">Customer Lifetime Value:</span>
                      <strong className="text-white">${simulatedLTV.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-500">LTV-to-CAC Efficiency:</span>
                      <strong className="text-emerald-400 font-bold">{simulatedLtvToCac}x</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-gray-900/80 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-900 pb-2">
                    <span className="text-white font-bold block text-xs">Support & Activation</span>
                    <Activity className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-500">Onboarding Activations:</span>
                      <strong className="text-white">{activeCustomerSdrActivations}% Success</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-500">Monthly Support Tickets:</span>
                      <strong className="text-blue-400 font-bold">{monthlySupportTickets} active</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-500">Platform Average Latency:</span>
                      <strong className="text-amber-400">198ms</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-zinc-900/50 rounded-xl border border-zinc-800 text-[10px] text-zinc-400 leading-normal">
                <strong>Series A Target Note:</strong> Venture capital funds typically target an LTV-to-CAC threshold above 6.0x and predictable customer contract expansion rates. Our currently simulated LTV-to-CAC of <span className="text-white font-bold">{simulatedLtvToCac}x</span> places EffectiveBuzz in the top decile of early SaaS providers.
              </div>
            </div>
          )}

          {/* Viewport 2: Strategic Risks & Safeguards */}
          {activeTab === 'risks' && (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {[
                {
                  title: 'Onboarding SPF/DKIM Configuration Churn',
                  type: 'Operational',
                  severity: 'CRITICAL',
                  impact: 'Friction locks 60% of new users before setup completion, spiking customer diagnostics tickets.',
                  mitigation: 'Allocate development resources and complete rollout of automated guides wizard (Simulated: ' + simulation.onboardingFixPriority + '% complete).'
                },
                {
                  title: 'Single-Seat Account Profile Inflation',
                  type: 'Revenue Leak',
                  severity: 'MEDIUM',
                  impact: 'B2B outreach teams bypass corporate multi-seat tiers by sharing individual credentials.',
                  mitigation: simulation.mailboxCapThreshold <= 3 ? 'Enforced Stripe limits (currently capped below 4 profiles). Potential seat expansion revenue successfully secured.' : 'Standard parameters active. User account leakage risks still persist.'
                },
                {
                  title: 'Data Residency Sovereignty Rules',
                  type: 'Regulatory compliance',
                  severity: 'HIGH',
                  impact: 'Stalls pending European Enterprise configurations across major localized sales channels.',
                  mitigation: 'Implement physical geo-replicas (Frankfurt AWS / UAE Moro) under appropriate product budgets.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-3 font-mono text-xs hover:border-violet-500/20 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[8.5px] uppercase font-bold border ${
                          item.severity === 'CRITICAL' 
                            ? 'bg-rose-500/5 border-rose-500/25 text-rose-400 animate-pulse' 
                            : 'bg-amber-500/5 border-amber-500/20 text-amber-400'
                        }`}>
                          {item.severity} Risk
                        </span>
                        <span className="text-zinc-500 text-[9px]">{item.type}</span>
                      </div>
                      <strong className="text-white text-[12.5px] font-display font-medium leading-tight block mt-1">{item.title}</strong>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-[10.5px] leading-relaxed pl-1">{item.impact}</p>

                  <div className="bg-violet-500/[0.02] p-2.5 rounded border border-violet-500/10 text-[10px] text-violet-400/90 leading-relaxed">
                    <strong>Mitigation Guideline:</strong> {item.mitigation}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Viewport 3: Runway Capital Allocation */}
          {activeTab === 'capital' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 bg-slate-950 border border-gray-900 rounded-xl space-y-2">
                <span className="text-violet-400 font-bold uppercase text-[9.5px] block">Runway Allotment Matrix ($1.5M Safe Pool)</span>
                <p className="leading-relaxed text-[10.5px] text-zinc-400">
                  Manage core liquidity to ensure scalable sales expansion while avoiding capital starvation across engineering and reserve margins.
                </p>
              </div>

              <div className="space-y-4 pr-1">
                {[
                  { name: 'Growth and Sales Capital Allotment', percent: simulation.growthCapitalScale, budget: growthCapitalBudget, details: 'Funds regional marketing partnerships, Arab country localization networks, and Series A pipeline setups.', color: 'bg-violet-500' },
                  { name: 'Product Optimization and Compliancy', percent: simulation.productCapitalScale, budget: productCapitalBudget, details: 'Underwrites self-guided DNS guides, advanced Salesforce plugins, and geographic databases.', color: 'bg-indigo-500' },
                  { name: 'Corporate Safe Reserves Pool', percent: 100 - simulation.growthCapitalScale - simulation.productCapitalScale, budget: reserveCapitalBudget, details: 'Acts as safety cushion to hedge model API costs fluctuation and operational buffers.', color: 'bg-emerald-500' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1 text-zinc-300">
                    <div className="flex justify-between items-center text-[11px]">
                      <strong className="text-white font-medium">{item.name}</strong>
                      <span className="text-violet-400 font-bold text-[11.5px]">{item.percent}% (${item.budget.toLocaleString()})</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded overflow-hidden">
                      <div className={`${item.color} h-full rounded`} style={{ width: `${item.percent}%` }} />
                    </div>
                    <p className="text-[10px] text-zinc-500 font-normal leading-relaxed mt-1 block">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Viewport 4: Q2/Q3 Hiring Pipeline */}
          {activeTab === 'hiring' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 bg-slate-950 border border-gray-900 rounded-xl text-zinc-400 leading-normal">
                <strong>Hiring Roadmap Proposal:</strong> Strategic headcount expansions submitted to the Board to protect release cycles and expand indirect enterprise revenues.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'VP of Engineering',
                    role: 'Core Architecture',
                    timeline: 'Immediate (Q3)',
                    desc: 'Prioritize scalable database designs, coordinate CRM webhook brokers, and manage production deploy frameworks.'
                  },
                  {
                    title: 'RevOps Channel Partner Manager',
                    role: 'Indirect Alliances',
                    timeline: 'Mid-Q3 2026',
                    desc: 'Recruit, license, and optimize European and UAE CRM consulting agencies with localized 30% revenue sharing setups.'
                  },
                  {
                    title: 'Technical Customer Success Lead',
                    role: 'Enterprise Onboarding',
                    timeline: 'Target end Q4',
                    desc: 'Own dedicated server deliverables configurations, run security penetrations, and secure SOC2 assurance certifications.'
                  }
                ].map((job, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-2.5">
                    <div className="border-b border-gray-900 pb-1.5">
                      <strong className="text-white text-xs block leading-tight">{job.title}</strong>
                      <span className="text-[10px] text-violet-400 font-bold mt-1 block uppercase">{job.role}</span>
                    </div>
                    <p className="text-zinc-400 text-[10.5px] leading-relaxed">{job.desc}</p>
                    <div className="bg-slate-900 border border-slate-800 text-[9px] px-2 py-0.5 rounded text-zinc-400 font-bold self-start inline-block">
                      Timeline: {job.timeline}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Viewport 5: Product Execution Tracks */}
          {activeTab === 'product' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 bg-slate-950 border border-gray-900 rounded-xl text-zinc-400 leading-normal">
                <strong>Product Alignment Horizon Roadmap:</strong> Continuous verification targets optimized for SaaS revenue monetization and client activation.
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    priority: 'Horizon 1',
                    title: 'Pre-Flight Setup DNS Configuration Wizards',
                    focus: 'Onboarding Diagnostic',
                    timeline: 'Target Launch: Q3',
                    metric: 'Lowers manual diagnostics ticket loads by -40%'
                  },
                  {
                    priority: 'Horizon 2',
                    title: 'Enforcing Stripe Active Mailbox Seat Limits',
                    focus: 'SaaS Monetization',
                    timeline: 'Target Launch: Q3',
                    metric: 'Unclogs team credentials leaks to boost NRR'
                  },
                  {
                    priority: 'Horizon 3',
                    title: 'Physically Isolated Geographically Replicated Pools',
                    focus: 'Sovereign EU & GCC compliance',
                    timeline: 'Target Launch: Q4',
                    metric: 'Unstalls large pipeline government enterprise accounts'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 border border-gray-100/5 rounded-xl space-y-2 hover:border-violet-500/10 transition-all text-zinc-300">
                    <div className="flex justify-between items-center text-[9px]">
                      <strong className="text-violet-400 uppercase font-bold">{item.priority}</strong>
                      <span className="bg-slate-900 border border-slate-800 text-zinc-500 px-1.5 rounded font-bold uppercase">{item.focus}</span>
                    </div>
                    <div>
                      <strong className="text-white text-[11px] block">{item.title}</strong>
                      <div className="flex justify-between text-[10.5px] text-zinc-400 mt-1">
                        <span>{item.timeline}</span>
                        <strong className="text-violet-400 font-normal">{item.metric}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
