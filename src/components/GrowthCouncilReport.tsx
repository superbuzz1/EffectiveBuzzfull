import React, { useState } from 'react';
import { 
  BarChart, ArrowUpRight, CheckCircle2, TrendingUp, Users, 
  Target, Mail, DollarSign, Activity, FileText, ChevronRight, 
  HelpCircle, Settings, ShieldAlert, Sparkles, Zap, RefreshCw, Layers
} from 'lucide-react';

interface GrowthOpportunity {
  id: string;
  title: string;
  category: 'Acquisition' | 'Conversion' | 'Retention' | 'Expansion';
  dept: string;
  roi: string;
  roiRaw: number;
  impactLabel: string;
  effortLabel: string;
  description: string;
  tacticalPlan: string;
}

export default function GrowthCouncilReport() {
  const [activeTab, setActiveTab] = useState<'funnel' | 'opportunities' | 'tactics' | 'council'>('funnel');

  // Interactive Growth Parameters for simulation
  const [params, setParams] = useState({
    trafficMultiplier: 1.0, // 1x to 2x traffic scale
    playgroundConversionEffect: 7, // 7% to 12% Visitor to Signup
    deliverabilityRetentionEffect: 58, // 58% to 95% DNS Setup Success Rate
    additionalMailboxMonetization: 45, // $45 seat surcharge
  });

  // Derived Real-Time Simulated Analytics
  const simulatedTraffic = Math.round(45000 * params.trafficMultiplier);
  const visitorConversionRate = params.playgroundConversionEffect;
  const simulatedSignups = Math.round(simulatedTraffic * (visitorConversionRate / 100));
  
  // Trial to success onboarding rate is tied to deliverability setups
  const activeSdrTrialRate = params.deliverabilityRetentionEffect;
  const activatedCount = Math.round(simulatedSignups * (activeSdrTrialRate / 100));

  const monthlyOnboardingSupportTickets = Math.round(180 - (params.deliverabilityRetentionEffect * 1.5));
  const estimatedIncrementalARR = Math.round(
    (simulatedSignups * 0.15 * params.additionalMailboxMonetization * 12) + 
    (simulatedTraffic * (params.playgroundConversionEffect / 100) * 243)
  );

  const totalSaaSARR = (1248000 + estimatedIncrementalARR).toLocaleString();

  const opportunities: GrowthOpportunity[] = [
    {
      id: 'var_network',
      title: 'EMEA regional VAR Reseller Channel Alliances',
      category: 'Acquisition',
      dept: 'SDR Outbound & RevOps',
      roi: '10.2x',
      roiRaw: 10.2,
      impactLabel: 'CRITICAL',
      effortLabel: 'Low Direct Effort',
      description: 'Acquiring localized partners (regional CRM integrators/consultants) in central Europe with a 30% first-year commission setup.',
      tacticalPlan: 'Onboard 10 localized systems consulting groups, providing certified materials and pre-configured templates.'
    },
    {
      id: 'dns_diagnostic',
      title: 'Automated Deliverability Wizards & DNS Diagnostics',
      category: 'Retention',
      dept: 'Customer Success & Core Systems',
      roi: '9.1x',
      roiRaw: 9.1,
      impactLabel: 'HIGH',
      effortLabel: 'Medium effort',
      description: 'A step-by-step interactive DNS setup widget that resolves SPF, DKIM, and DMARC credentials instantly on sign up.',
      tacticalPlan: 'Decrease time-to-first-sequence from 5 days to 2 hours, automatically clearing out 42% support tickets.'
    },
    {
      id: 'sequence_playground',
      title: 'Homepage Outbound Outlines Generator Trial',
      category: 'Conversion',
      dept: 'Growth Engineering & Marketing',
      roi: '8.8x',
      roiRaw: 8.8,
      impactLabel: 'HIGH',
      effortLabel: 'Low effort',
      description: 'Interactive widget on public landing pages lets visitors input their domain to generate 3 custom outbound email options without any signups required.',
      tacticalPlan: 'Boost visitor-to-signup conversion ratios significantly using public generative sandboxes.'
    },
    {
      id: 'seat_limits',
      title: 'Multi-Mailbox Limits & Active Sender Surcharges',
      category: 'Expansion',
      dept: 'Billing Team / Product core',
      roi: '8.4x',
      roiRaw: 8.4,
      impactLabel: 'HIGH',
      effortLabel: 'Low effort',
      description: 'Restrict base packages to 3 active mailboxes; auto-bill $45/mo for extra domains mapped to prevent user profile sharing.',
      tacticalPlan: 'Implement billing threshold updates within Stripe checkout flows to monetize growing outbound operations.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Growth Council Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                Growth Council Board
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Consolidated GTM funnel & conversion optimization matrix</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              Corporate Growth Council report & funnel simulation engine
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Act as the Chief Revenue Officer, VP of Marketing, and Head of Growth. Tweak acquisition velocity, optimize signup-to-trial conversion ratios, and inspect ranked growth playbooks.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-emerald-400">
            <Target className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>Target ARR: $5.0M</span>
          </div>
        </div>
      </div>

      {/* Funnel Performance Indicators bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-emerald-500/10 transition-all">
          <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Simulated Traffic Volume</span>
          <strong className="text-2xl font-bold text-emerald-400 block mt-0.5">{simulatedTraffic.toLocaleString()} Visitors</strong>
          <span className="text-[10px] text-zinc-400 block mt-1">
            Conversion Rate: <span className="text-white font-bold">{visitorConversionRate}%</span>
          </span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-indigo-500/10 transition-all">
          <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Simulated Net Signups</span>
          <strong className="text-2xl font-bold text-indigo-400 block mt-0.5">{simulatedSignups.toLocaleString()} Accounts</strong>
          <span className="text-[10px] text-zinc-400 block mt-1">
            Active SDR Setups: <span className="text-white font-bold">{activeSdrTrialRate}%</span>
          </span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-amber-500/10 transition-all">
          <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Simulated Total ARR</span>
          <strong className="text-2xl font-bold text-amber-400 block mt-0.5">${totalSaaSARR}</strong>
          <span className="text-[10px] text-emerald-400 block mt-1">
            Delta Lift: +${estimatedIncrementalARR.toLocaleString()}
          </span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-rose-500/10 transition-all">
          <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Monthly Support Queue Case load</span>
          <strong className="text-2xl font-bold text-rose-400 block mt-0.5">{monthlyOnboardingSupportTickets} tickets</strong>
          <span className="text-[10px] text-zinc-500 block mt-1">
            Deliverability success rate: {activeSdrTrialRate}%
          </span>
        </div>
      </div>

      {/* Main Structural layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Playbook Sliders section */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-950 rounded-lg border border-gray-900 text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
            Interactive Funnel Modulators
          </div>

          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-4 font-mono text-xs text-zinc-400">
            
            {/* Control A */}
            <div className="space-y-2 pb-2.5 border-b border-gray-900">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-400 uppercase font-semibold">1. TRAFFIC AMPLIFIER:</span>
                <span className="text-emerald-400 font-bold">{params.trafficMultiplier}x scale</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.1"
                value={params.trafficMultiplier}
                onChange={(e) => setParams(prev => ({ ...prev, trafficMultiplier: parseFloat(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-emerald-400"
              />
              <p className="text-[9px] text-gray-500">Accelerates content, Google search SEO positions, and partnerships channels.</p>
            </div>

            {/* Control B */}
            <div className="space-y-2 pb-2.5 border-b border-gray-900">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-400 uppercase font-semibold">2. SANDBOX VISITOR SIGNUP:</span>
                <span className="text-indigo-400 font-bold">{params.playgroundConversionEffect}% Rate</span>
              </div>
              <input
                type="range"
                min="7"
                max="14"
                step="1"
                value={params.playgroundConversionEffect}
                onChange={(e) => setParams(prev => ({ ...prev, playgroundConversionEffect: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-indigo-400"
              />
              <p className="text-[9px] text-gray-500">Optimizes page CTR by embedding free generation samples before login boundaries.</p>
            </div>

            {/* Control C */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-400 uppercase font-semibold">3. DELIVERABILITY SETUP RATIO:</span>
                <span className="text-amber-400 font-bold">{params.deliverabilityRetentionEffect}% Done</span>
              </div>
              <input
                type="range"
                min="58"
                max="95"
                step="2"
                value={params.deliverabilityRetentionEffect}
                onChange={(e) => setParams(prev => ({ ...prev, deliverabilityRetentionEffect: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-amber-400"
              />
              <p className="text-[9px] text-gray-500">Improves Day-7 onboarding stats using automatic deliverability helper wizards.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-2 font-mono text-[9px] text-zinc-500">
            <span className="text-[9.5px] text-emerald-400 font-bold uppercase block">Growth Council Verification Matrix</span>
            <p className="leading-relaxed">
              CRO (ACV Expansion), VP of Marketing (Acquisition/Demos), and Head of Growth (Interactive Flow) collaborate to continuously model and update the core product funnels.
            </p>
          </div>
        </div>

        {/* Viewport content */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Growth Council Strategic Center
            </span>
            <div className="flex gap-1">
              {['funnel', 'opportunities', 'tactics', 'council'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-2.5 py-1 rounded text-[9.5px] uppercase font-bold font-mono transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-white' 
                      : 'text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Viewport 1: Funnel Overview */}
          {activeTab === 'funnel' && (
            <div className="space-y-4 font-mono text-xs">
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                The funnel pipeline below shows the step-by-step conversion rates of leads from their initial entry to active workspace subscription tiers. Adjust the sliders on the left to see potential effects on overall SaaS metrics in real-time.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { stage: '1. Traffic Generation Phase', count: simulatedTraffic, details: 'Unique monthly visitors on site', color: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
                  { stage: '2. User Registration Boundary', count: simulatedSignups, details: `${visitorConversionRate}% visitor-to-signup conversion standard`, color: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' },
                  { stage: '3. Activation & SDR Onboarding', count: activatedCount, details: `${activeSdrTrialRate}% of signups successfully complete custom DNS configuration`, color: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' },
                  { stage: '4. Demo Conversions & Paid Accounts', count: Math.round(activatedCount * 0.15), details: 'Active corporate subscriptions scaled on platform templates', color: 'bg-rose-500/20 text-rose-400 border border-rose-500/30' },
                ].map((step, idx) => (
                  <div key={idx} className={`p-3 rounded-xl flex justify-between items-center ${step.color}`}>
                    <div>
                      <strong className="text-xs block text-white">{step.stage}</strong>
                      <span className="text-[10px] block opacity-85">{step.details}</span>
                    </div>
                    <strong className="text-sm font-bold text-white pr-2">
                      {step.count.toLocaleString()}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Viewport 2: Opportunities Index */}
          {activeTab === 'opportunities' && (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {opportunities.map((opp) => (
                <div key={opp.id} className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-3 font-mono text-xs hover:border-emerald-500/20 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[8.5px] uppercase font-bold">
                          {opp.category} Opportunity
                        </span>
                        <span className="text-zinc-500 text-[9px]">{opp.dept}</span>
                      </div>
                      <strong className="text-white text-[12px] font-display font-medium leading-tight block mt-1">{opp.title}</strong>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[8px] text-zinc-500 uppercase block">Expected ROI</span>
                      <strong className="text-emerald-400 text-sm font-bold flex items-center gap-0.5 justify-end">
                        {opp.roi} <ArrowUpRight className="w-3.5 h-3.5" />
                      </strong>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-[10.5px] leading-relaxed pl-1">{opp.description}</p>
                  
                  <div className="bg-emerald-500/[0.02] p-2.5 rounded border border-emerald-500/10 text-[10px] text-emerald-400/90">
                    <strong>Tactical Blueprint:</strong> {opp.tacticalPlan}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Viewport 3: Execution Tactics */}
          {activeTab === 'tactics' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 bg-slate-950 border border-gray-900 rounded-xl space-y-2">
                <span className="text-emerald-400 font-bold uppercase text-[9px] block">Quarterly Growth Execution Horizons</span>
                <p className="leading-relaxed text-[10.5px] text-zinc-400">
                  The GTM strategy prioritizes high-ROI channels to scale corporate customer contract value organically over four key strategic waves.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { phase: 'Phase I (Acquisition)', title: 'Regional VAR Reseller Licensing Alliances', outcome: 'Establishes indirect channels with regional German (DACH) and GCC systems consultants to localize B2B pipeline generation.' },
                  { phase: 'Phase II (Conversion)', title: 'Embedding Public Outbound Proposal Playgrounds', outcome: 'Boosts organic landing-to-registration conversion from 7% towards 10%+ via public sample sequence generation wizards.' },
                  { phase: 'Phase III (Retention)', title: 'Deploying Pre-Flight Deliverability Wizards', outcome: 'Eliminates DKIM configuration friction directly inside onboarding, reducing current support caseload.' },
                  { phase: 'Phase IV (Expansion)', title: 'Enforcing Stripe Mailbox Account Limits', outcome: 'Tracks corporate mailbox expansions organically, scaling ARPU ratios directly via mailbox numbers.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-gray-900 rounded-xl space-y-1.5 hover:border-emerald-500/10 transition-all text-zinc-300">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-1 text-[9.5px]">
                      <strong className="text-emerald-400 uppercase font-bold">{item.phase}</strong>
                      <span className="bg-slate-900 border border-slate-800 text-zinc-500 text-[8.5px] px-1 rounded font-bold">Planned Target</span>
                    </div>
                    <div>
                      <strong className="text-white text-[11px] block">{item.title}</strong>
                      <p className="text-zinc-400 text-[10.5px] leading-relaxed mt-0.5">{item.outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Viewport 4: Committee Roles */}
          {activeTab === 'council' && (
            <div className="space-y-5 font-mono text-xs">
              <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl flex items-center gap-3">
                <Users className="w-6 h-6 text-emerald-400 shrink-0" />
                <div className="text-zinc-400 leading-normal">
                  <strong>Growth Council Certifications:</strong> Unanimously co-signed and audited by the GTM leaders of EffectiveBuzz on June 7, 2026.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    author: 'Chief Revenue Officer',
                    focus: 'SaaS seat expansion loops',
                    desc: 'Implementing mailbox limit tiers to automatically monetize usage scales, maximizing total ARPU values.'
                  },
                  {
                    author: 'VP of Marketing',
                    focus: 'Lowering CPA & traffic velocity',
                    desc: 'Leveraging organic search indexes, pre-registration proposal sandboxes, and reseller alliances to scale traffic numbers safely.'
                  },
                  {
                    author: 'Head of Growth',
                    focus: 'Interactive conversion funnels',
                    desc: 'Optimizing onboarding paths via deliverability diagnostics to speed TTV speeds and deflect technical support queues.'
                  }
                ].map((member, i) => (
                  <div key={i} className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-2">
                    <strong className="text-white text-xs block uppercase border-b border-slate-900 pb-1.5">{member.author}</strong>
                    <div className="text-[10px] text-emerald-400 font-bold">{member.focus}</div>
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
