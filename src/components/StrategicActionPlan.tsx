import React, { useState } from 'react';
import { 
  TrendingUp, Sparkles, ShieldAlert, Users, Settings, DollarSign, 
  Activity, FileText, CheckCircle2, ArrowRight, Landmark, ChevronRight, 
  Scale, XOctagon, ArrowUpRight, Percent, Briefcase, Award, Cloud, BookOpen 
} from 'lucide-react';

interface StrategicRecommendation {
  id: string;
  rank: number;
  title: string;
  category: 'Product' | 'Infrastructure' | 'Talent' | 'Security' | 'Ecosystem';
  baseRoi: number;
  owner: string;
  challenge: string;
  action: string;
}

export default function StrategicActionPlan() {
  const [strategicFocus, setStrategicFocus] = useState<'roi' | 'active' | 'not-to-build'>('roi');
  const [scalingPriority, setScalingPriority] = useState<'margin' | 'speed' | 'retention'>('retention');
  const [runwaySimulation, setRunwaySimulation] = useState<number>(24);

  // Recommendations
  const recommendations: StrategicRecommendation[] = [
    {
      id: 'shield',
      rank: 1,
      title: 'Pre-Flight Deliverability Shield & DNS Status Diagnostic Dashboard',
      category: 'Product',
      baseRoi: 9.8,
      owner: 'CTO / CPO',
      challenge: 'Google/Microsoft spam updates, mailbox warmups.',
      action: 'Prevent emails containing high-risk spam words from being sent, protecting client domain reputations.'
    },
    {
      id: 'gcc-pod',
      rank: 2,
      title: 'Sovereign GCC Institutional Subdomain Node',
      category: 'Infrastructure',
      baseRoi: 9.4,
      owner: 'CRO / COO / CEO',
      challenge: 'Strict UAE/KSA data residency rules.',
      action: 'Deploy regional data nodes inside Moro Hub/G42 clusters to clear sovereignty audits and capture regional enterprise spending.'
    },
    {
      id: 'engineer-hire',
      rank: 3,
      title: 'Deliverability & Sales Systems Lead Engineer Hire',
      category: 'Talent',
      baseRoi: 9.2,
      owner: 'CTO / COO',
      challenge: 'High cost of specialized system design talent.',
      action: 'Build and optimize DNS diagnostic shields, manage deliverability parameters, and configure automated subdomain routing.'
    },
    {
      id: 'frankfurt-pod',
      rank: 4,
      title: 'AWS Frankfurt Region Physical Pod Deployment',
      category: 'Infrastructure',
      baseRoi: 9.0,
      owner: 'COO / CTO',
      challenge: 'GDPR cross-border compliance audits.',
      action: 'Deploy physically isolated data pods (such as AWS eu-central-1 Frankfurt) to ensure absolute regional data residency.'
    },
    {
      id: 'soc-clearance',
      rank: 5,
      title: 'SOC 2 Type II Security Clearance Program',
      category: 'Security',
      baseRoi: 8.5,
      owner: 'CFO / CTO',
      challenge: 'Compliance preparation overhead and timeline latency.',
      action: 'Formally certify our platform to remove compliance friction for enterprise buyers.'
    },
    {
      id: 'crm-sync',
      rank: 6,
      title: 'Bidirectional Salesforce & HubSpot Sync Driver Suites',
      category: 'Product',
      baseRoi: 8.5,
      owner: 'CPO / CTO',
      challenge: 'API rate limits, multi-tenant locks.',
      action: 'Dynamic, bidirectional syncing that transfers contacts, notes, scoring, and interaction logs directly into CRM systems.'
    },
    {
      id: 'academy-cert',
      rank: 7,
      title: 'Unified Autonomous Revenue Engineer Certification Academy',
      category: 'Ecosystem',
      baseRoi: 8.2,
      owner: 'CPO / CMO',
      challenge: 'Content creation overhead, partner support infrastructure.',
      action: 'Training and certifying independent RevOps consultants turns them into active advocates who specify our platform for their clients.'
    },
    {
      id: 'sales-manager',
      rank: 8,
      title: 'Channel VAR Regional Sales Success Manager Hire',
      category: 'Talent',
      baseRoi: 8.0,
      owner: 'CRO / CEO',
      challenge: 'Variable agency motivation, localized training requirements.',
      action: 'Certify local agencies, support VAR onboarding, and coordinate commission payout workflows.'
    }
  ];

  const notToBuild = [
    { title: 'Proprietary Large Language Model (LLM)', reason: 'Immense resource investments, fast commodity depreciation, and distracts from our core workflow advantage. Leveraging API models keeps our software focused on lead coordination.', roi: '0.1x' },
    { title: 'B2C Social Media Outbound Automation Module', reason: 'B2C outreach experiences high customer churn, strict spam filtering, and low average contract values, which diverts resources from high-value B2B enterprise deals.', roi: '1.2x' },
    { title: 'In-App Real-time Audio Phone Dialing System', reason: 'Standard sales teams already utilize established tools for calling. Building custom audio lines adds maintenance complexity and distracts from asynchronous, high-volume automated campaigns.', roi: '1.8x' }
  ];

  // Dynamic calculations based on priority sliders & selectors
  const multiplier = scalingPriority === 'margin' ? 1.15 : scalingPriority === 'retention' ? 1.25 : 1.0;
  
  return (
    <div className="space-y-6">
      {/* Strategic Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-emerald-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
                C-Suite Strategy Deck
              </span>
              <span className="text-[10px] text-gray-500 font-mono">CEO / VC Partner / Consultant Perspective</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              EffectiveBuzz Elite SaaS Strategic Action Plan
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              An institutional strategy plan assessing growth opportunities, threats, hires, capital allocation, and product focuses, ranked strictly by immediate ROI.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-[#818cf8]">
            <Scale className="w-4 h-4 text-[#818cf8]" />
            <span>Investment Grade: Optimal</span>
          </div>
        </div>
      </div>

      {/* Simulator Inputs & High-Performance Targets */}
      <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2.5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="text-sm font-semibold text-white font-display">SaaS Operational Scaling Controls</h4>
              <p className="text-[10px] text-gray-400 font-mono">Configure priorities to calculate adjusted strategic recommendation returns.</p>
            </div>
          </div>
          
          <div className="flex gap-1 bg-slate-950 border border-gray-900 p-1 rounded-lg">
            {(['retention', 'margin', 'speed'] as const).map((pri) => (
              <button
                key={pri}
                onClick={() => setScalingPriority(pri)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer uppercase ${
                  scalingPriority === pri
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {pri === 'retention' ? 'Retention-First' : pri === 'margin' ? 'Margin-Optimal' : 'Speed-First'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Slider */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-gray-400 uppercase">Simulated Run-rate Capital Runway:</span>
              <span className="text-white font-bold">{runwaySimulation} Months</span>
            </div>
            <input
              type="range"
              min="12"
              max="36"
              step="3"
              value={runwaySimulation}
              onChange={(e) => setRunwaySimulation(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-[#818cf8]"
            />
          </div>

          {/* Quick Metrics */}
          <div className="p-3 bg-slate-950 border border-gray-900 rounded-lg text-center font-mono">
            <span className="text-gray-500 text-[9px] uppercase block">Rule of 40 Score</span>
            <strong className="text-emerald-400 text-sm font-bold block mt-0.5">54.2%</strong>
            <span className="text-[8px] text-zinc-500 block">Growth (38%) + Profit (16.2%)</span>
          </div>

          <div className="p-3 bg-slate-950 border border-gray-900 rounded-lg text-center font-mono">
            <span className="text-gray-500 text-[9px] uppercase block">Adjusted LTV:CAC Target</span>
            <strong className="text-[#818cf8] text-sm font-bold block mt-0.5">9.1x ➔ {(9.1 * multiplier).toFixed(1)}x</strong>
            <span className="text-[8px] text-zinc-500 block">Optimized via {scalingPriority} model</span>
          </div>
        </div>
      </div>

      {/* Main Switcher Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Switcher Navigation */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-950 rounded-lg border border-gray-900 text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
            Deck Interactive Portals
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {[
              { id: 'roi', label: '1. Ranked ROI Recommendations', icon: Scale, count: recommendations.length, color: 'text-indigo-400' },
              { id: 'active', label: '2. Deep Opportunities & Threats', icon: Sparkles, count: 6, color: 'text-emerald-400' },
              { id: 'not-to-build', label: '3. What NOT to Build', icon: XOctagon, count: notToBuild.length, color: 'text-rose-400' }
            ].map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.id}
                  onClick={() => setStrategicFocus(btn.id as any)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                    strategicFocus === btn.id
                      ? 'bg-[#111827] border-indigo-500/50 text-white shadow-lg'
                      : 'bg-transparent border-slate-900 text-gray-400 hover:bg-[#111827]/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <Icon className={`w-4 h-4 ${btn.color}`} />
                    <span className="text-xs font-bold font-display">{btn.label}</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 pl-6">
                    <span>Focus Modules: {btn.count} items</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-2 font-mono text-[10.5px]">
            <span className="text-[9px] text-[#818cf8] uppercase tracking-wider font-bold block mb-1">C-Suite Dynamic Target Dashboard</span>
            <div className="flex justify-between items-center text-zinc-400 border-b border-gray-900 pb-1.5">
              <span>Hiring Priority:</span>
              <span className="text-emerald-400 font-bold font-mono">Systems Engineer</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400 border-b border-gray-900 pb-1.5">
              <span>Security Priority:</span>
              <span className="text-emerald-400 font-bold font-mono">SOC 2 Type II</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Global Pod:</span>
              <span className="text-emerald-400 font-semibold font-mono">Frankfurt (AWS)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl shadow-xl">
          
          {strategicFocus === 'roi' && (
            <div className="space-y-5">
              <div className="border-b border-gray-800 pb-3 flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Scale className="w-4 h-4" /> Recommended Actions Ranked by ROI
                </span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">
                  SaaS Model View
                </span>
              </div>

              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {recommendations.map((rec) => {
                  const adjustedRoi = (rec.baseRoi * multiplier).toFixed(1);
                  return (
                    <div key={rec.id} className="p-3.5 bg-slate-950 border border-gray-900 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-3 hover:border-[#818cf8]/20 transition-all font-mono text-xs">
                      <div className="space-y-1 md:max-w-[75%]">
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-900 border border-slate-800 text-stone-300 font-bold px-1.5 py-0.5 rounded text-[10px]">
                            Rank {rec.rank}
                          </span>
                          <span className="text-[9px] text-[#818cf8] uppercase tracking-wider font-bold">
                            {rec.category}
                          </span>
                          <span className="text-[9px] text-zinc-500 font-mono">Owner: {rec.owner}</span>
                        </div>
                        <strong className="text-white text-[12px] block font-display leading-tight">{rec.title}</strong>
                        <p className="text-zinc-400 text-[10.5px] leading-relaxed mt-1">
                          <span className="text-zinc-500 font-bold uppercase text-[9px] mr-1 block sm:inline-block">Action:</span>
                          {rec.action}
                        </p>
                      </div>

                      <div className="text-left md:text-right w-full md:w-auto shrink-0 border-t md:border-t-0 border-gray-950 pt-2.5 md:pt-0 flex md:flex-col justify-between items-center md:items-end">
                        <span className="text-[9px] text-zinc-500 uppercase block">Model Return</span>
                        <div className="flex items-center gap-1 text-emerald-400 font-bold font-mono text-sm">
                          <span>{adjustedRoi}x</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {strategicFocus === 'active' && (
            <div className="space-y-5">
              <div className="border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Core Growth Opportunities & Strategic Threat Parries
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Opportunities */}
                <div className="space-y-3 font-mono text-xs">
                  <h5 className="font-bold text-emerald-400 uppercase text-[10px] border-b border-gray-905 pb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Growth Pipelines
                  </h5>
                  
                  {[
                    { title: 'Sovereign Middle East Clouds', details: 'Dubai Moro Hub local hosting to clear localized sovereignty audits.', roi: '9.4x' },
                    { title: 'Accredited Lead Academies', details: 'Train RevOps professionals to establish our workspace as the standard.', roi: '8.2x' },
                    { title: 'Agent Reseller Programs (VAR)', details: 'Certify international channels to drive sales without expanding headcount.', roi: '7.5x' }
                  ].map((opp, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/60 border border-gray-900 rounded-lg space-y-1">
                      <div className="flex justify-between items-center">
                        <strong className="text-white text-[11px] block">{opp.title}</strong>
                        <span className="text-emerald-400 font-semibold">{opp.roi}</span>
                      </div>
                      <p className="text-zinc-400 text-[10px] leading-relaxed">{opp.details}</p>
                    </div>
                  ))}
                </div>

                {/* Right: Threats */}
                <div className="space-y-3 font-mono text-xs">
                  <h5 className="font-bold text-red-400 uppercase text-[10px] border-b border-gray-905 pb-1.5 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> Strategic Threat Parries
                  </h5>
                  
                  {[
                    { title: 'Uninformed Low-Cost Wrappers', parry: 'Deeply embed CRM sync drivers and custom databases to increase switching costs.' },
                    { title: 'Abrupt ISP Spam Threshold Shifting', parry: 'Release dynamic Pre-Flight DNS health diagnostic wizards.' },
                    { title: 'Global Data-Residency (GDPR/NDMO)', parry: 'Instantly spin up isolated European AWS database pod nodes.' }
                  ].map((th, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/60 border border-gray-900 rounded-lg space-y-1">
                      <strong className="text-white text-[11px] block">{th.title}</strong>
                      <p className="text-zinc-400 text-[10px] leading-neutral"><strong className="text-rose-400 uppercase text-[9px] mr-1 block">Parry:</strong>{th.parry}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {strategicFocus === 'not-to-build' && (
            <div className="space-y-5">
              <div className="border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                  <XOctagon className="w-4 h-4" /> What NOT to Build: Avoiding Resource Diversions
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-lg text-rose-300">
                  <strong>Strategic Constraint:</strong> Do not build features that do not align with our core B2B model, display low ROI metrics, or add unnecessary complexity to our product structure.
                </div>

                {notToBuild.map((ntb, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 border border-gray-900 rounded-lg space-y-1 hover:border-rose-500/10 transition-all">
                    <div className="flex justify-between items-center text-zinc-300">
                      <strong className="text-white text-[11px] font-display block">{ntb.title}</strong>
                      <span className="text-[10px] bg-red-500/10 text-rose-400 border border-red-500/20 px-1.5 py-0.5 rounded font-bold">Est. ROI: {ntb.roi}</span>
                    </div>
                    <p className="text-zinc-400 text-[10px] leading-relaxed pt-1">
                      <strong className="text-rose-400 uppercase text-[9px] mr-1 inline-block">Reasoning:</strong>
                      {ntb.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Dynamic 24-Month Chronological Action Roadmap */}
      <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-lg space-y-4">
        <div className="border-b border-gray-800 pb-2.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
            <div>
              <h4 className="text-sm font-semibold text-white font-display">24-Month Chronological Strategic Action Plan</h4>
              <p className="text-[10px] text-gray-400 font-mono">Immediate milestones mapped chronologically to scale toward targeted growth milestones.</p>
            </div>
          </div>
          <span className="text-[9px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
            Strategy Execution
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {[
            { 
              phase: 'Phase 1: Months 1-3', 
              milestone: 'Sovereign Proofing', 
              desc: 'Deploy isolated physical data nodes inside Frankfurt (eu-central-1) & complete formal SOC 2 Type II audit steps.' 
            },
            { 
              phase: 'Phase 2: Months 4-6', 
              milestone: 'Domain Health', 
              desc: 'Release Pre-Flight Deliverability diagnostics, configure Moro Hub, and implement bidirectional CRM connectors.' 
            },
            { 
              phase: 'Phase 3: Months 7-12', 
              milestone: 'Ecosystem Scale', 
              desc: 'Accelerate LEVEL-1 certified training academies, and partner with 10 Western Europe reseller VARs.' 
            },
            { 
              phase: 'Phase 4: Months 13-24', 
              milestone: 'Category Supremacy', 
              desc: 'Scale international accounts to represent 45% of total pipelines. Reach targeted ARR scaling targets.' 
            },
          ].map((rd, i) => (
            <div key={i} className="bg-slate-950/50 border border-gray-900 p-3.5 rounded-lg space-y-1.5 text-xs text-left group hover:border-[#818cf8]/25 transition-all">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-indigo-400 font-display">{rd.phase}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <h5 className="font-bold text-white font-display text-[11px]">{rd.milestone}</h5>
              <p className="text-[10px] text-gray-400 leading-relaxed font-mono">
                {rd.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
