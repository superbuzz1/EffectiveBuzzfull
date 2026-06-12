import React, { useState } from 'react';
import { 
  Compass, ArrowUpRight, CheckCircle2, AlertCircle, XCircle, 
  HelpCircle, Sparkles, DollarSign, Cpu, Settings, Activity, 
  Users, BarChart2, Calendar, Award, Shield, FileText, ChevronRight
} from 'lucide-react';

interface ProductFeature {
  id: string;
  title: string;
  track: 'Build Now' | 'Build Next' | 'Build Later' | 'Do Not Build';
  revImpact: 'High' | 'Medium' | 'Low' | 'Negative';
  custImpact: 'High' | 'Medium' | 'Low' | 'Negative';
  engCost: 'High' | 'Medium' | 'Low';
  champion: 'CPO' | 'CTO' | 'CS' | 'CRO';
  description: string;
  benefit: string;
  reasonIfEliminated?: string;
}

export default function ProductCouncilReport() {
  const [activeTab, setActiveTab ] = useState<'matrix' | 'features' | 'roi' | 'council'>('matrix');

  // Interactive Product Parameters
  const [params, setParams] = useState({
    devFocusDeliverability: 85, // % development speed towards Deliverability Shield
    apiRouteRatioFlash: 88, // % queries redirected via Cognitive Router to save token budget
    crmSyncCommitment: 60, // % focus towards Salesforces/HubSpot connector modules
  });

  // Calculate dynamic business consequences based on council parameters
  const estimatedTicketReduction = Math.round(params.devFocusDeliverability * 0.45);
  const coreSdrFrictionHours = (24 * (1 - (params.devFocusDeliverability / 100))).toFixed(1);
  const computedMonthlyTokenBill = Math.round(5200 - (params.apiRouteRatioFlash * 35));
  const estimatedSecurityComplianceMRR = Math.round((params.crmSyncCommitment / 100) * 45000);
  const activeSaaSRevenueARR = (1248000 + (estimatedSecurityComplianceMRR * 12)).toLocaleString();

  const features: ProductFeature[] = [
    {
      id: 'shield',
      title: 'Pre-Flight Deliverability Shield & DNS diagnostics',
      track: 'Build Now',
      revImpact: 'High',
      custImpact: 'High',
      engCost: 'Low',
      champion: 'CS',
      description: 'Interactive sub-setting portal resolving DKIM, SPF and DMARC record generation instantly from the account dashboard.',
      benefit: 'Eliminates 42% of customer setup assistance support tickets and dramatically speeds up Time-To-Value (TTV).'
    },
    {
      id: 'router',
      title: 'Dual-Tier LLM Cognitive Cost Router',
      track: 'Build Now',
      revImpact: 'High',
      custImpact: 'Medium',
      engCost: 'Medium',
      champion: 'CTO',
      description: 'Route generic, simple text adjustments to Gemini Flash nodes while retaining advanced synthesis loops for deep reasoning systems.',
      benefit: 'Secures high gross profit margins (+4.2% lift) and prevents high-cost API envelope leakage.'
    },
    {
      id: 'sync',
      title: 'Bidirectional Salesforce & HubSpot Sync',
      track: 'Build Next',
      revImpact: 'High',
      custImpact: 'High',
      engCost: 'High',
      champion: 'CRO',
      description: 'Certified SaaS connectors that dynamically update records on state alterations, lead scoring, and reply events.',
      benefit: 'Reduces manual CSV imports, locking high ACV enterprise teams onto the corporate platform.'
    },
    {
      id: 'seat',
      title: 'SDR Outbound Seat & Mailbox Limits',
      track: 'Build Next',
      revImpact: 'Medium',
      custImpact: 'Medium',
      engCost: 'Low',
      champion: 'CRO',
      description: 'Limit standard startup subscription tiers to 3 active mailboxes; auto-bill $45/mo for every additional mailbox mapped.',
      benefit: 'Drives organic corporate account expansion directly via customer usage scales.'
    },
    {
      id: 'sovereign',
      title: 'GDPR & GCC Regional Database Clouds',
      track: 'Build Later',
      revImpact: 'Medium',
      custImpact: 'Low',
      engCost: 'High',
      champion: 'CTO',
      description: 'Physically separated postgreSQL database zones localized inside Moro Hub UAE and AWS Frankfurt clusters.',
      benefit: 'Bypasses sovereign data-security auditing friction, unlocking $1.4M in blocked enterprise pipelines.'
    },
    {
      id: 'academy',
      title: 'Certified Outbound Engineer Training Courses',
      track: 'Build Later',
      revImpact: 'Medium',
      custImpact: 'Medium',
      engCost: 'Low',
      champion: 'CPO',
      description: 'A certificate program designed for regional CRM and RevOps consultancy advisors to sell EffectiveBuzz platforms.',
      benefit: 'Establishes indirect lead pipelines, expanding B2B outreach loops with minimal sales hiring costs.'
    },
    {
      id: 'scratch_llm',
      title: 'Custom B2B Generative Outreach LLM',
      track: 'Do Not Build',
      revImpact: 'Negative',
      custImpact: 'Low',
      engCost: 'High',
      champion: 'CTO',
      description: 'Attempting to self-train specialized foundational neural networks for custom sequence writing and campaigns.',
      benefit: 'None. Commercial systems deprecate rapidly. Training is highly resource-intensive and has zero structural defenses.',
      reasonIfEliminated: 'Requires millions in operational server investments without yielding competitive barriers over fast commercial APIs.'
    },
    {
      id: 'b2c_automation',
      title: 'Multi-Channel B2C Consumer Social Spammer',
      track: 'Do Not Build',
      revImpact: 'Negative',
      custImpact: 'Negative',
      engCost: 'High',
      champion: 'CPO',
      description: 'Launch B2C features to automatically message consumer social domains.',
      benefit: 'Vulnerability to domain blockages and severe platform spam penalties.',
      reasonIfEliminated: 'Severe platform violations, extremely low client quality, and unviable support ratios that threaten corporate B2B focus.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Product Council Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-rose-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
                Quarterly Product Council Report
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Consolidated Executive Leadership Board Action Deck</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              Strategic Product Council & Feature Prioritization Matrix
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Model product directives co-signed by the CPO, CTO, Head of Customer Success, and CRO. Optimize development ratios, audit API budgets, and inspect ranked priority pipelines.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-indigo-400 animate-pulse">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Reporting: Q3 Horizon</span>
          </div>
        </div>
      </div>

      {/* Main Dynamic ROI Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-emerald-500/10 transition-all">
          <span className="text-zinc-500 text-[9.5px] uppercase block tracking-wider font-bold">Simulated Ticket Reduction</span>
          <strong className="text-2xl font-bold text-emerald-400 block mt-0.5">-{estimatedTicketReduction}% cases</strong>
          <span className="text-[10px] text-zinc-400">DNS Setup Speed: {coreSdrFrictionHours} hours</span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-[#818cf8]/10 transition-all">
          <span className="text-zinc-500 text-[9.5px] uppercase block tracking-wider font-bold">Weekly Token Costs</span>
          <strong className="text-2xl font-bold text-[#818cf8] block mt-0.5">${computedMonthlyTokenBill.toLocaleString()}</strong>
          <span className="text-[10px] text-emerald-400">Router efficiency: {params.apiRouteRatioFlash}%</span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-amber-500/10 transition-all">
          <span className="text-zinc-500 text-[9.5px] uppercase block tracking-wider font-bold">Simulated Active ARR</span>
          <strong className="text-2xl font-bold text-amber-400 block mt-0.5">${activeSaaSRevenueARR}</strong>
          <span className="text-[10px] text-[#f43f5e] font-semibold">NRR Runway Factor: 114.2%</span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-rose-500/10 transition-all">
          <span className="text-zinc-500 text-[9.5px] uppercase block tracking-wider font-bold">Platform Gross Margin</span>
          <strong className="text-2xl font-bold text-rose-400 block mt-0.5">81.4%</strong>
          <span className="text-[10px] text-zinc-500">Benchmark SaaS: &gt;75%</span>
        </div>
      </div>

      {/* Main Structural Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Section */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-950 rounded-lg border border-gray-900 text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
            Interactive Roadmap Modulators
          </div>
          
          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-4 font-mono text-xs">
            
            {/* Control 1 */}
            <div className="space-y-2 pb-2 border-b border-gray-900">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-400 uppercase">DELIVERABILITY SHIELD FOCUS:</span>
                <span className="text-emerald-400 font-bold">{params.devFocusDeliverability}% focus</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={params.devFocusDeliverability}
                onChange={(e) => setParams(prev => ({ ...prev, devFocusDeliverability: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-emerald-400"
              />
              <p className="text-[9px] text-gray-500">Allocates engineering resources to DNS setup automation and diagnostic shields.</p>
            </div>

            {/* Control 2 */}
            <div className="space-y-2 pb-2 border-b border-gray-900">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-400 uppercase">COGNITIVE ROUTER REDIRECT:</span>
                <span className="text-indigo-400 font-bold">{params.apiRouteRatioFlash}% speed</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="4"
                value={params.apiRouteRatioFlash}
                onChange={(e) => setParams(prev => ({ ...prev, apiRouteRatioFlash: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-indigo-400"
              />
              <p className="text-[9px] text-gray-500">Optimizes token economics by routing simple validation cycles through Gemini Flash.</p>
            </div>

            {/* Control 3 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-400 uppercase">CRM INTEGRATION SPEED:</span>
                <span className="text-amber-400 font-bold">{params.crmSyncCommitment}% target</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={params.crmSyncCommitment}
                onChange={(e) => setParams(prev => ({ ...prev, crmSyncCommitment: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-amber-400"
              />
              <p className="text-[9px] text-gray-500">Accelerates HubSpot and Salesforce connectors to appeal to higher ACV accounts.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-2.5 font-mono text-[10px]">
            <span className="text-[9px] text-[#818cf8] uppercase tracking-wider font-bold block">Consolidated Committee Roles</span>
            <div className="grid grid-cols-2 gap-1.5 font-bold text-center">
              <div className="p-1.5 rounded bg-emerald-500/5 text-emerald-400 border border-emerald-500/10">CS CHAMPION</div>
              <div className="p-1.5 rounded bg-indigo-500/5 text-indigo-400 border border-indigo-500/10">CTO AUDIT</div>
              <div className="p-1.5 rounded bg-amber-500/5 text-amber-400 border border-amber-500/10">CRO REVENUES</div>
              <div className="p-1.5 rounded bg-rose-500/5 text-rose-400 border border-rose-500/10">CPO HORIZON</div>
            </div>
            <p className="text-[8.5px] text-zinc-500 leading-normal">Each role co-signs recommended prioritization tracks based on strict ROI matrices.</p>
          </div>
        </div>

        {/* Viewport content */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Comprehensive Product Priorities Council Matrix
            </span>
            <div className="flex gap-1">
              {['matrix', 'features', 'roi', 'council'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-2.5 py-1 rounded text-[9.5px] uppercase font-bold font-mono transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-indigo-500/10 border border-indigo-500/30 text-white' 
                      : 'text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab 1: Priority Tracks Matrix */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                The Product Council filters incoming candidate requirements into four clear structural horizons to manage engineering load and protect gross operating margins.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: '1. Build Now (Immediate Run)',
                    color: 'border-emerald-500/25 bg-emerald-500/5 text-emerald-400',
                    badge: 'Q3 COMMIT',
                    items: [
                      'Active Pre-Flight Deliverability Shield',
                      'Dual-Tier Cognitive Prompt Cost Router'
                    ]
                  },
                  {
                    title: '2. Build Next (Q4 Horizon)',
                    color: 'border-indigo-500/25 bg-indigo-500/5 text-indigo-400',
                    badge: 'PLANNED',
                    items: [
                      'Certified SFDC / HubSpot Sync Connectors',
                      'Multi-Mailbox Billing Seat Limits'
                    ]
                  },
                  {
                    title: '3. Build Later (Scaling Phase)',
                    color: 'border-amber-500/25 bg-amber-500/5 text-amber-400',
                    badge: '6-12 MONTHS',
                    items: [
                      '物理 separated Moro Hub & AWS Frankfurt nodes',
                      'EMEA certified channel VAR curricula'
                    ]
                  },
                  {
                    title: '4. Do Not Build (Explicitly Eliminated)',
                    color: 'border-rose-500/25 bg-rose-500/5 text-rose-400',
                    badge: 'ELIMINATED',
                    items: [
                      'Training our custom Sequence Foundation LLM',
                      'Multi-Channel B2C Consumer Messaging'
                    ]
                  }
                ].map((track, i) => (
                  <div key={i} className={`p-4 border rounded-xl space-y-3 font-mono text-xs ${track.color}`}>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                      <strong className="text-white text-xs">{track.title}</strong>
                      <span className="text-[8px] bg-black/40 px-1 py-0.5 rounded font-bold">{track.badge}</span>
                    </div>
                    <ul className="space-y-1.5 text-zinc-300 pl-1 list-disc list-inside">
                      {track.items.map((item, idx) => (
                        <li key={idx} className="text-[10.5px] leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Detailed Candidate List */}
          {activeTab === 'features' && (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {features.map((feat) => {
                const isEliminated = feat.track === 'Do Not Build';
                return (
                  <div key={feat.id} className={`p-4 bg-slate-950 border rounded-xl space-y-3 font-mono text-xs hover:border-indigo-500/20 transition-all ${
                    isEliminated ? 'border-rose-500/10 opacity-75' : 'border-gray-900'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-1.5 py-0.5 rounded text-[8.5px] uppercase font-bold border ${
                            feat.track === 'Build Now'
                              ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                              : feat.track === 'Build Next'
                              ? 'bg-indigo-500/5 border-indigo-500/20 text-[#818cf8]'
                              : feat.track === 'Build Later'
                              ? 'bg-amber-500/5 border-amber-500/20 text-amber-400'
                              : 'bg-rose-500/5 border-rose-500/20 text-rose-400'
                          }`}>
                            {feat.track}
                          </span>
                          <span className="text-zinc-500 text-[9px]">Champion: {feat.champion}</span>
                        </div>
                        <strong className="text-white text-[12px] font-display font-medium leading-tight block mt-1">{feat.title}</strong>
                      </div>
                      <div className="flex gap-1 shrink-0 text-right">
                        <span className="text-[8.5px] bg-slate-900 px-1.5 py-0.5 rounded text-zinc-400 border border-slate-800">
                          Rev: {feat.revImpact}
                        </span>
                        <span className="text-[8.5px] bg-slate-900 px-1.5 py-0.5 rounded text-zinc-400 border border-slate-800">
                          Cost: {feat.engCost}
                        </span>
                      </div>
                    </div>

                    <p className="text-zinc-400 text-[10.5px] leading-relaxed pl-1">{feat.description}</p>
                    
                    {isEliminated ? (
                      <div className="bg-rose-500/5 p-2 rounded border border-rose-500/10 text-[10px] text-rose-300">
                        <strong>Council Elimination Reason:</strong> {feat.reasonIfEliminated}
                      </div>
                    ) : (
                      <div className="bg-emerald-500/5 p-2 rounded border border-emerald-500/10 text-[10px] text-emerald-400">
                        <strong>Expected Outcome:</strong> {feat.benefit}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 3: Prioritized Council ROI Rankings */}
          {activeTab === 'roi' && (
            <div className="space-y-4 font-mono text-zinc-300 text-xs">
              <div className="p-3.5 bg-slate-950 border border-gray-900 rounded-xl space-y-2">
                <span className="text-[#818cf8] font-bold uppercase text-[9px] block">Rigor Validation Methodology</span>
                <p className="leading-relaxed text-[10.5px] text-zinc-400">
                  Products are audited across User Lifespan Retentions (CPO), Database Computing Overheads and latency parameters (CTO), CS ticket volumes, and ACV Expansion contracts (CRO).
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { rank: 1, title: 'Pre-Flight Deliverability Shield', roi: '9.8x', reason: 'Resolves DKIM support blockages, protecting 42% support load and reducing early cohort churn.' },
                  { rank: 2, title: 'Dual-Tier Prompt Cost Router', roi: '8.4x', reason: 'Conserves server margin budgets (+4.2% lift) by routing standard requests to Gemini Flash.' },
                  { rank: 3, title: 'HubSpot & Salesforce native connector sync', roi: '7.8x', reason: 'Locks mid-market revenue and makes the outbound campaign workflow highly stickier.' },
                  { rank: 4, title: 'Standard Outbound seats charging structure', roi: '7.6x', reason: 'Directly triggers organic monthly expansions from growing marketing teams.' },
                  { rank: 5, title: 'Physically Isolated Sovereign Clouds', roi: '6.9x', reason: 'Unlocks restricted Middle-East institutional pipeline contracts with compliance premiums.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-gray-900 rounded-xl flex justify-between items-center hover:border-indigo-500/20 transition-all">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-[11px]">Rank #{item.rank}: {item.title}</strong>
                        <span className="bg-[#818cf8]/10 text-[#818cf8] text-[8px] font-bold px-1 rounded uppercase">Active Priority</span>
                      </div>
                      <p className="text-zinc-500 text-[10.5px] mt-0.5">{item.reason}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[8px] text-zinc-500 uppercase block">Expected ROI</span>
                      <strong className="text-emerald-400 text-sm font-bold flex items-center gap-1">
                        {item.roi} <ArrowUpRight className="w-3.5 h-3.5" />
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Joint Council Certifications */}
          {activeTab === 'council' && (
            <div className="space-y-5 font-mono text-xs">
              <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl flex items-center gap-3">
                <Users className="w-6 h-6 text-indigo-400 shrink-0" />
                <div className="text-zinc-400">
                  <strong>Council Resolution Signature:</strong> Unanimously certified for immediate Q3 iteration cycles during the general Board assembly on June 7, 2026.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    author: 'Chief Product Officer (CPO)',
                    focus: 'CSAT Lift & SDR Workflow',
                    desc: 'Prioritizing Pre-Flight diagnostics over plain copywriting templates. Focus on improving onboarding speeds to lower Day-1 support friction.'
                  },
                  {
                    author: 'Chief Technology Officer (CTO)',
                    focus: 'Marginal economics & Database Isolation',
                    desc: 'Optimizing token bills via Dual-Tier prompt classification, retaining multi-region Postgres setups strictly under regulatory standards.'
                  },
                  {
                    author: 'Head of Customer Success',
                    focus: 'Logo Churn Reduction',
                    desc: 'Protecting clients against domain blockages, aiming to systematically deflect DKIM/setup support queues.'
                  },
                  {
                    author: 'Head of Revenue (CRO)',
                    focus: 'Expansion loops & ACV Weight',
                    desc: 'Capitalizing on seat allocations to expand standard user contracts securely, unlocking DACH enterprise prospects.'
                  }
                ].map((member, i) => (
                  <div key={i} className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-2">
                    <strong className="text-white text-xs block uppercase border-b border-slate-900 pb-1.5">{member.author}</strong>
                    <div className="text-[10px] text-[#818cf8] font-bold">{member.focus}</div>
                    <p className="text-zinc-400 leading-relaxed text-[10.5px]">{member.desc}</p>
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
