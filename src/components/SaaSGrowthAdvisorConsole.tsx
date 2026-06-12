import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, Target, DollarSign, Calendar, ClipboardList, 
  Play, Check, HelpCircle, Sparkles, RefreshCw, Layers, Award,
  CheckCircle, ArrowRight, BookOpen, Clock, Activity, MessageSquare, Shield, Zap
} from 'lucide-react';

interface GrowthChannel {
  name: string;
  type: 'Outbound' | 'Inbound' | 'Organic' | 'Strategic';
  description: string;
  weeklyEffortHours: number;
  expectedLeads: string;
  costEstimate: string;
  tacticalPlan: string;
}

const ACQUISITION_CHANNELS_BLUEPRINTS: GrowthChannel[] = [
  {
    name: 'Apollo + LinkedIn hyper-targeted Outreach',
    type: 'Outbound',
    description: 'Scraping B2B SaaS VP of Sales and Outreach/GTM leads matching seed funding or scale headcount triggers.',
    weeklyEffortHours: 12,
    expectedLeads: '15-20 target prospects',
    costEstimate: '$99/mo Apollo plan',
    tacticalPlan: 'Send 50 personalized connect notices per day prioritizing active hirings.'
  },
  {
    name: 'Warm Agency & Founder Networks referral loops',
    type: 'Strategic',
    description: 'Offering existing beta agency owners a 25% recurring performance kickback for every peer they onboard.',
    weeklyEffortHours: 6,
    expectedLeads: '3-5 highly warm intros',
    costEstimate: '$0 capital outlay',
    tacticalPlan: 'Host 1-on-1 dynamic consulting workshops audit templates for agency CEOs.'
  },
  {
    name: 'SaaS Outbound Tooling Indie Communities',
    type: 'Organic',
    description: 'Sharing real outcome logs, template conversions and deliverability metrics on LinkedIn/Reddit/IndieHackers.',
    weeklyEffortHours: 8,
    expectedLeads: '5-10 inbound lookups',
    costEstimate: '$0',
    tacticalPlan: 'Deconstruct a winning SaaS sales hook twice a week with zero sales pitch gating.'
  },
  {
    name: 'Product Hunt + Cold Email Community Launches',
    type: 'Inbound',
    description: 'Establishing high-visibility community launches offering customized "Starter Credit" vouchers to early adopters.',
    weeklyEffortHours: 15,
    expectedLeads: '30-40 self-serve trials',
    costEstimate: '$45 directory listings',
    tacticalPlan: 'Build momentum with a transparent "Building in Public" target list of 300 advocates.'
  }
];

interface SalesStep {
  step: number;
  phase: string;
  owner: 'Founder' | 'Automated';
  metric: string;
  tactics: string[];
}

const SALES_PROCESS_STEPS: SalesStep[] = [
  {
    step: 1,
    phase: 'Lead Intake & Enrichment',
    owner: 'Automated',
    metric: 'Enrichment speed < 5 min',
    tactics: [
      'Automatically scrape active headcount changes via LinkedIn APIs',
      'Assess current domain spam vulnerabilities and cooling times',
      'Inject target bio variables into the client scoring context'
    ]
  },
  {
    step: 2,
    phase: 'Dynamic Outbound Sequence Dispatch',
    owner: 'Automated',
    metric: '30% target response rate',
    tactics: [
      'Deploy localized SDR copywriting templates with personalized first line hooks',
      'Dynamic inbox cooling auto-throttling to prevent spam-filter flags',
      'Follow up on day 3 with concrete contextual delivery benchmarks'
    ]
  },
  {
    step: 3,
    phase: 'Warm Qualification Check',
    owner: 'Founder',
    metric: 'Booking to schedule: > 75%',
    tactics: [
      'Filter incoming replies for active interest, budget, or calendar access',
      'Manually send brief, low-friction customized video showing prospect specific pipelines',
      'Redirect qualified targets to a clean, frictionless booking scheduler'
    ]
  },
  {
    step: 4,
    phase: 'The Value-Focused Demo Call',
    owner: 'Founder',
    metric: 'Demo closing rate: > 35%',
    tactics: [
      'Execute continuous platform walkthrough showing prospect custom templates in real-time',
      'Co-sign an actionable 14-day trial pilot roadmap targeting immediate CAC savings',
      'Offer transparent base licensing quotes paired with dynamic usage volume tiers'
    ]
  },
  {
    step: 5,
    phase: 'The 14-Day Pilot Success Gate',
    owner: 'Founder',
    metric: 'SDR adoption score: > 85%',
    tactics: [
      'Conduct a mandatory 15-minute quick setup onboarding sync',
      'Monitor daily delivery volumes to verify campaign performance',
      'Trigger custom user activation notifications automatically on pilot successes'
    ]
  }
];

interface WeeklyKpiSpec {
  metric: string;
  targetTenants: string;
  importance: string;
  icon: any;
}

const WEEKLY_KPI_BLUEPRINTS: WeeklyKpiSpec[] = [
  { metric: 'New Qualified Leads Enriched', targetTenants: '150 leads / week', importance: 'Feeds the outreach loop', icon: Target },
  { metric: 'Target Response Conversions', targetTenants: '15% response success Rate', importance: 'Validates template effectiveness', icon: Users },
  { metric: 'Discovery Demos Hosted', targetTenants: '5 live walkthroughs / week', importance: 'Founder assessment opportunity', icon: Clock },
  { metric: 'Paid Subscription Onboarding', targetTenants: '1-2 new tenants / week', importance: 'Direct vector to hit $10,000 MRR', icon: DollarSign },
  { metric: 'Net Active Subscribers', targetTenants: '20-30 active accounts', importance: 'Sustains monthly baseline health', icon: CheckCircle }
];

interface DailyTask {
  timeBlock: string;
  activity: string;
  focus: string;
  checklist: string[];
}

const DAILY_FOUNDER_ROUTINES: DailyTask[] = [
  {
    timeBlock: '08:30 - 11:30',
    activity: 'Outbound & Connect Generation',
    focus: 'Filling pipeline top-of-funnel',
    checklist: [
      'Review and enrich 30 new target accounts on Apollo',
      'Send 15 hyper-personalized connection updates on LinkedIn',
      'Cool down and rotate active sender domain registers'
    ]
  },
  {
    timeBlock: '11:40 - 13:00',
    activity: 'Active Client Logs & Pipeline Audit',
    focus: 'Maintaining low churn loops',
    checklist: [
      'Verify deliverability metrics for active customer outboxes',
      'Audit PII stripping log queues if any warning labels trigger',
      'Solve customer setup tickets within 30 minutes threshold'
    ]
  },
  {
    timeBlock: '14:00 - 16:30',
    activity: 'Valuable Discovery Demos & Trials Closings',
    focus: 'Driving direct MRR conversion',
    checklist: [
      'Host scheduled platform demos showing custom-tailored candidate outboxes',
      'Follow up on outstanding trial clients with dynamic pilot stats reports',
      'Onboard new trial accounts into dedicated Slack webhook lines'
    ]
  },
  {
    timeBlock: '16:40 - 18:00',
    activity: 'Community Building & Public Sharing',
    focus: 'Generating organic inbound interest',
    checklist: [
      'Write and schedule 1 detailed Outbound execution guide on LinkedIn',
      'Contribute value threads on targeted founder forums and communities',
      'Iterate on customer feedback with the CPO quarterly plan'
    ]
  }
];

export default function SaaSGrowthAdvisorConsole() {
  const [activeStrategyTab, setActiveStrategyTab] = useState<'acquisition' | 'sales' | 'pricing' | 'demo' | 'retention' | 'kpis' | 'daily'>('acquisition');

  // Dynamic MRR Calculator parameters
  const [enrichmentRate, setEnrichmentRate] = useState<number>(300); // leads / month
  const [outboxResponseRate, setOutboxResponseRate] = useState<number>(14); // % response conversion 
  const [demoClosingRate, setDemoClosingRate] = useState<number>(30); // % of response to pay
  const [averagePricingTier, setAveragePricingTier] = useState<number>(450); // $ per subscriber / month

  const [projectedMrrMultiplier, setProjectedMrrMultiplier] = useState<number>(0);
  const [weeksTo10k, setWeeksTo10k] = useState<number>(0);
  const [totalSubscribersTarget, setTotalSubscribersTarget] = useState<number>(0);
  const [isComputingRamp, setIsComputingRamp] = useState<boolean>(false);

  // Recalculate MRR projection steps
  useEffect(() => {
    setIsComputingRamp(true);
    const delayTimer = setTimeout(() => {
      // Calculate active conversions
      const potentialResponses = enrichmentRate * (outboxResponseRate / 100);
      const prospectiveNewCustomers = potentialResponses * (demoClosingRate / 100);
      const monthlyMrrDelta = prospectiveNewCustomers * averagePricingTier;

      // Subscribers required to reach $10,000 MRR
      const totalSubscribersRequired = Math.ceil(10000 / averagePricingTier);
      
      // Weeks calculated at 4 weeks per month scale factor
      let calculatedWeeks = 0;
      if (monthlyMrrDelta > 0) {
        calculatedWeeks = Math.round((10000 / monthlyMrrDelta) * 4);
      } else {
        calculatedWeeks = 99; // impossible loop
      }

      setProjectedMrrMultiplier(Math.round(monthlyMrrDelta));
      setWeeksTo10k(Math.max(2, Math.min(52, calculatedWeeks)));
      setTotalSubscribersTarget(totalSubscribersRequired);
      setIsComputingRamp(false);
    }, 400);

    return () => clearTimeout(delayTimer);
  }, [enrichmentRate, outboxResponseRate, demoClosingRate, averagePricingTier]);

  return (
    <div id="saas-growth-advisor-console" className="space-y-8 animate-fadeIn text-slate-100">
      
      {/* Platform Strategy Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-[#818cf8] font-mono text-xs font-bold uppercase tracking-widest">
            <TrendingUp className="w-4 h-4 shrink-0 text-[#818cf8] animate-pulse" />
            SaaS Growth Strategic playbook
          </div>
          <h1 className="text-2xl font-bold font-display text-white mt-1">
            Reaching First $10,000 MRR Console
          </h1>
          <p className="text-xs text-gray-400 max-w-xl mt-1 leading-relaxed">
            A practical, founder-centric roadmap mapping high-velocity customer acquisition channels, optimized trial demo flows, and dynamic local pricing models to scale EffectiveBuzz to $10k MRR.
          </p>
        </div>

        {/* Global Conversion Target Badge */}
        <div className="flex flex-wrap items-center gap-3 bg-zinc-900/60 p-2 border border-zinc-800 rounded-xl text-xs self-start md:self-center">
          <div className="px-3 py-1 bg-zinc-950/80 rounded-lg border border-zinc-805">
            <span className="text-[10px] text-gray-400 block leading-tight font-mono">Milestone Objective</span>
            <span className="font-bold text-emerald-400 font-mono">$10,000 MRR ARR Threshold</span>
          </div>
          <div className="px-3 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400 text-center">
            <span className="text-[10px] text-zinc-400 block leading-tight font-mono">Estimated Subscriptions</span>
            <span className="font-bold font-mono">{totalSubscribersTarget} Active Tenants</span>
          </div>
        </div>
      </div>

      {/* Dynamic Milestones Calculator & Ramp-rate Simulator Dashboard */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl">
        <div className="border-b border-zinc-850 pb-4">
          <div className="flex items-center gap-1 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider pb-0.5">
            <Zap className="w-4 h-4 text-emerald-400" />
            Strategic Runway Calculator
          </div>
          <h3 className="text-base font-semibold text-white font-display">
            The $10,000 MRR Ramp Simulator & Yield Curve
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Adjust outbound parameter leads, response loops, and pricing assumptions to calculate exactly how many calendar weeks separate EffectiveBuzz from our first $10k MRR sprint gate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Controls Column (5 span) */}
          <div className="lg:col-span-5 bg-zinc-950/40 border border-zinc-850 p-5 rounded-xl space-y-4 font-sans">
            <span className="text-[10.5px] font-mono text-[#818cf8] font-bold uppercase tracking-wider block">
              Simulation Tuning Parameters
            </span>

            {/* Enrichment Rate */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Monthly Enriched Prospect Leads</span>
                <span className="text-white font-bold">{enrichmentRate} targeted accounts</span>
              </div>
              <input 
                type="range"
                min="100"
                max="800"
                step="50"
                value={enrichmentRate}
                onChange={(e) => setEnrichmentRate(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-zinc-800 cursor-pointer h-1 rounded"
              />
            </div>

            {/* Response Rate */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Outbound Conversion Rate Success</span>
                <span className="text-indigo-400 font-bold">{outboxResponseRate}% response rate</span>
              </div>
              <input 
                type="range"
                min="5"
                max="30"
                step="1"
                value={outboxResponseRate}
                onChange={(e) => setOutboxResponseRate(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-zinc-800 cursor-pointer h-1 rounded"
              />
            </div>

            {/* Closing Rate */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Demo Walkthrough Closing Rate</span>
                <span className="text-white font-bold">{demoClosingRate}% pilot-to-paid</span>
              </div>
              <input 
                type="range"
                min="10"
                max="50"
                step="5"
                value={demoClosingRate}
                onChange={(e) => setDemoClosingRate(Number(e.target.value))}
                className="w-full accent-zinc-500 bg-zinc-800 cursor-pointer h-1 rounded"
              />
            </div>

            {/* Average ARPU */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Average Subscriber ACV Tier</span>
                <span className="text-emerald-400 font-bold">${averagePricingTier} / Month</span>
              </div>
              <input 
                type="range"
                min="250"
                max="1250"
                step="50"
                value={averagePricingTier}
                onChange={(e) => setAveragePricingTier(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-zinc-800 cursor-pointer h-1 rounded"
              />
            </div>
          </div>

          {/* Outcomes visualizer Column (7 span) */}
          <div className="lg:col-span-7 bg-zinc-950/60 border border-zinc-850 p-6 rounded-xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400 uppercase text-[10px] tracking-wider block font-bold">
                Projected Scaling Acceleration
              </span>
              {isComputingRamp && <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />}
            </div>

            {/* 3 Metric counters */}
            <div className="grid grid-cols-3 gap-4 my-5 text-center">
              <div className="bg-zinc-900 border border-zinc-805 p-3.5 rounded-lg">
                <span className="text-[9px] text-zinc-500 font-mono uppercase block mb-1">Time to Target</span>
                <span className="text-xl font-mono text-white font-bold block">{weeksTo10k} Weeks</span>
                <span className="text-[8px] text-emerald-400 block font-mono mt-0.5">Est. Q1 Horizon</span>
              </div>

              <div className="bg-zinc-900 border border-zinc-805 p-3.5 rounded-lg">
                <span className="text-[9px] text-zinc-500 font-mono uppercase block mb-1">Monthly MRR Growth</span>
                <span className="text-xl font-mono text-emerald-400 font-bold block">+${projectedMrrMultiplier.toLocaleString()}</span>
                <span className="text-[8px] text-zinc-500 block font-mono mt-0.5">Cumulative speed</span>
              </div>

              <div className="bg-zinc-900 border border-zinc-805 p-3.5 rounded-lg">
                <span className="text-[9px] text-zinc-500 font-mono uppercase block mb-1">Required Base</span>
                <span className="text-xl font-mono text-indigo-300 font-bold block">{totalSubscribersTarget} Tenants</span>
                <span className="text-[8px] text-zinc-550 block font-mono mt-0.5">At average ARPU</span>
              </div>
            </div>

            {/* Dynamic visual graph modeling weeks conversion timeline */}
            <div className="p-4 bg-zinc-900/60 border border-zinc-850 rounded-lg space-y-1">
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block font-bold">
                Conversion Pipeline Modeling
              </span>
              <p className="text-[11px] text-zinc-400 leading-normal font-sans">
                By targeting <strong>{enrichmentRate} leads / month</strong>, we yield approximately <strong>{Math.round(enrichmentRate * (outboxResponseRate/100))} responses</strong>. Standard demo closings lead to <strong>{Math.round(enrichmentRate * (outboxResponseRate/100) * (demoClosingRate/100))} new paid subscribers per month</strong>.
              </p>
              <div className="text-[10px] font-mono text-zinc-500 pt-1.5 border-t border-zinc-850/80">
                Strategic feedback: {weeksTo10k < 20 ? '✔ Highly Optimized Runway' : '⚠️ Top-of-Funnel Enrichment volume needs increase'}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Strategic Playbook Content Sections navigation switches */}
      <div className="border-b border-zinc-800 bg-zinc-950/65 p-1 rounded-xl flex flex-wrap gap-1">
        {[
          { id: 'acquisition', label: '1. Acquisition Plan', icon: Target },
          { id: 'sales', label: '2. Sales Process Loop', icon: Layers },
          { id: 'pricing', label: '3. Pricing Strategies', icon: DollarSign },
          { id: 'demo', label: '4. Demo Playbook', icon: Play },
          { id: 'retention', label: '5. Retention Strategy', icon: Shield },
          { id: 'kpis', label: '6. Weekly KPIs', icon: Activity },
          { id: 'daily', label: '7. Founder Daily Routines', icon: ClipboardList }
        ].map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveStrategyTab(item.id as any)}
              className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 transition ${
                activeStrategyTab === item.id
                  ? 'bg-zinc-900 border-zinc-700 text-white shadow'
                  : 'bg-transparent border-transparent text-gray-400 hover:bg-zinc-900/40 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label.split(' ')[1] || item.label}</span>
            </button>
          );
        })}
      </div>

      {/* DYNAMIC FOCUS PANE */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 lg:p-8 backdrop-blur min-h-[350px]">
        
        {/* SUBTAB 1: CUSTOMER ACQUISITION PLAN */}
        {activeStrategyTab === 'acquisition' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">1. Customer Acquisition Channels & Scaling Strategy</h3>
              <p className="text-xs text-zinc-400">Targeting targeted SDR, agency, and technology lists with contextual, low-friction entry angles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ACQUISITION_CHANNELS_BLUEPRINTS.map((chan, idx) => (
                <div key={idx} className="p-5 bg-zinc-950 border border-zinc-805 rounded-xl space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1 bg-indigo-500 h-full" />
                  <div className="flex justify-between items-center text-xs font-mono font-semibold">
                    <span className="text-white font-display text-sm font-semibold">{chan.name}</span>
                    <span className="bg-zinc-900 px-2 py-0.5 rounded text-indigo-400 text-[10px]">
                      {chan.type}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-zinc-400 font-sans leading-relaxed">
                    {chan.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-[10.5px] font-mono border-t border-zinc-900 pt-3">
                    <div>
                      <span className="text-zinc-550 uppercase text-[9px] block">Weekly Commitment:</span>
                      <strong className="text-white">{chan.weeklyEffortHours} Hours / week</strong>
                    </div>
                    <div>
                      <span className="text-zinc-550 uppercase text-[9px] block">Expected Yield Target:</span>
                      <strong className="text-emerald-400">{chan.expectedLeads}</strong>
                    </div>
                  </div>

                  <div className="bg-zinc-900 p-2 text-[10.5px] font-sans text-indigo-300 rounded border border-zinc-850">
                    <strong>Tactics Checklist:</strong> {chan.tacticalPlan}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 2: SALES PROCESS */}
        {activeStrategyTab === 'sales' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">2. Multi-Step Sales & Client Conversion Sequencer</h3>
              <p className="text-xs text-zinc-400">Systematized workflow mapping lead ingestion and outreach directly into closed contracts.</p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {SALES_PROCESS_STEPS.map(step => (
                <div key={step.step} className="p-4 bg-zinc-950/60 border border-zinc-805 rounded-xl flex gap-4 relative">
                  <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono font-bold flex items-center justify-center shrink-0">
                    {step.step}
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="text-xs font-bold text-white font-display">{step.phase}</span>
                      <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                        Owner: {step.owner} | Metric target: {step.metric}
                      </span>
                    </div>

                    <ul className="text-xs text-zinc-400 pl-4 list-disc space-y-1">
                      {step.tactics.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 3: PRICING STRATEGY */}
        {activeStrategyTab === 'pricing' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display font-bold">3. Local Pricing Strategies & SaaS Economics</h3>
              <p className="text-xs text-zinc-405 mt-1 font-sans">
                Three highly-audited standard subscription tiers designed to support CAC recovery boundaries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Tier */}
              <div className="bg-zinc-950/60 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">1. Entry Level Tier</span>
                  <h4 className="text-sm font-bold text-white uppercase font-display">Starter GTM Outbox</h4>
                  <p className="text-2xl font-mono text-indigo-400 font-bold pt-2">$1,250 / mo</p>
                </div>

                <div className="border-t border-zinc-900 my-4 pt-4 text-xs text-zinc-400 leading-normal space-y-2">
                  <span className="font-bold text-zinc-500 uppercase text-[9px] font-mono block">Inclusions Profile:</span>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Up to 5,000 active leads</li>
                    <li>2 active user seats</li>
                    <li>Automatic PII strippers</li>
                  </ul>
                </div>

                <p className="text-[10px] text-zinc-500 font-mono">Billed monthly recurring.</p>
              </div>

              {/* Growth Tier */}
              <div className="bg-zinc-950/80 border border-indigo-400/50 p-5 rounded-xl flex flex-col justify-between relative shadow-lg">
                <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-indigo-500 text-slate-950 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                  MOST VIABLE ROAD TO $10K MRR
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest block font-bold">2. Optimal Scaling Plan</span>
                  <h4 className="text-sm font-bold text-white uppercase font-display">Growth Team Outbox</h4>
                  <p className="text-2xl font-mono text-emerald-400 font-bold pt-2">$2,800 / mo</p>
                </div>

                <div className="border-t border-indigo-950/50 my-4 pt-4 text-xs text-zinc-300 leading-normal space-y-2">
                  <span className="font-bold text-indigo-400 uppercase text-[9px] font-mono block">Featured Core Expansion:</span>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Up to 15,000 active leads</li>
                    <li>8 active SDR user seats</li>
                    <li>Knowledge Graph lookup access</li>
                  </ul>
                </div>

                <p className="text-[10px] text-indigo-300 font-mono">Dynamic multi-outbox matching.</p>
              </div>

              {/* Enterprise Tier */}
              <div className="bg-zinc-950/60 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">3. Institutional Scale</span>
                  <h4 className="text-sm font-bold text-white uppercase font-display">Sovereign VPC Enclave</h4>
                  <p className="text-2xl font-mono text-white font-bold pt-2">Custom / Quote</p>
                </div>

                <div className="border-t border-zinc-900 my-4 pt-4 text-xs text-zinc-400 leading-normal space-y-2">
                  <span className="font-bold text-zinc-500 uppercase text-[9px] font-mono block">Institutional Security:</span>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Infinite active outbox leads</li>
                    <li>Sovereign AWS Nitro VPC</li>
                    <li>HIPAA medical BAA models</li>
                  </ul>
                </div>

                <p className="text-[10px] text-zinc-500 font-mono">BAA SLA custom terms.</p>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: DEMO STRATEGY PLAYBOOK */}
        {activeStrategyTab === 'demo' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">4. The Value-Led Platform Demo Playbook</h3>
              <p className="text-xs text-zinc-400">Chronological list of custom-client points and interactive demonstration milestones.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              
              {/* Phase 1 */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                <div className="flex justify-between items-center font-mono">
                  <span className="text-[#818cf8] font-bold text-xs">MINUTE 0 - 5: THE DISCOVERY</span>
                  <span className="p-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-500 text-[9px]">Phase 1</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase">Context Gathering</h4>
                <p className="text-[11.5px] text-zinc-400 leading-relaxed">
                  Avoid dry feature checklists. Ask immediate, direct questions: *"How many cold domains are you rotating?"* or *"What is your current average SDR delivery spam score?"*
                </p>
                <span className="text-[9.5px] font-mono text-[#818cf8] block">Goal: Locate current team workflow waste points.</span>
              </div>

              {/* Phase 2 */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                <div className="flex justify-between items-center font-mono">
                  <span className="text-emerald-400 font-bold text-xs">MINUTE 5 - 15: VISUAL PROOF</span>
                  <span className="p-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-500 text-[9px]">Phase 2</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase">Live Scrape Walkthrough</h4>
                <p className="text-[11.5px] text-zinc-400 leading-relaxed">
                  Perform real-time profile lookup of active target leads. Show live double-blind PII stripping and custom, personalized first-line hook writing loops in under 45 seconds.
                </p>
                <span className="text-[9.5px] font-mono text-emerald-400 block">Goal: Complete shock validation under pressure.</span>
              </div>

              {/* Phase 3 */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                <div className="flex justify-between items-center font-mono">
                  <span className="text-amber-500 font-bold text-xs">MINUTE 15 - 25: THE PILOT CLOSE</span>
                  <span className="p-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-500 text-[9px]">Phase 3</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase">14-Day Trial Alignment</h4>
                <p className="text-[11.5px] text-zinc-400 leading-relaxed">
                  Outline pilot success expectations. Define clear KPI verification tracks: *"If we double-book your calendar in 14 days, you agree to convert to our Growth tier."* 
                </p>
                <span className="text-[9.5px] font-mono text-amber-500 block">Goal: Secure co-signed billing contract triggers.</span>
              </div>

            </div>
          </div>
        )}

        {/* SUBTAB 5: RETENTION STRATEGY */}
        {activeStrategyTab === 'retention' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">5. Churn Mitigation & Corporate Retention Checklist</h3>
              <p className="text-xs text-zinc-400">Ongoing client support parameters, feedback integrations, and logo churn thresholds.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-zinc-950/60 p-5 border border-zinc-805 rounded-xl space-y-4">
                <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-wider block font-bold">
                  Weekly onboarding retention checkmarks
                </span>
                
                <div className="space-y-2 text-xs leading-normal font-sans">
                  <div className="flex gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>15-minute quick setup sync:</strong> Co-establish active MX records and domain proxy warmers.</span>
                  </div>
                  <div className="flex gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>In-app team seat training:</strong> Guide core SDRs on template writing and RAG injection controls.</span>
                  </div>
                  <div className="flex gap-2.5">
                    <CheckCircle className="w-4 h-4 text-zinc-650 shrink-0 mt-0.5" />
                    <span><strong>Day-7 delivery report callback:</strong> Push clear report files of candidate outbox conversions automatically.</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950/60 p-5 border border-zinc-805 rounded-xl space-y-4 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] text-amber-500 uppercase tracking-wider block font-bold text-amber-550">
                    SLA thresholds & support limits
                  </span>
                  <p className="text-xs text-zinc-400 mt-1">Our customer satisfaction parameters:</p>
                </div>

                <div className="space-y-2 text-xs leading-normal font-sans text-zinc-300">
                  <p><strong>Support response time:</strong> Under 30 minutes for ticket resolution on active client groups.</p>
                  <p><strong>Logo churn safety threshold:</strong> Target monthly logo churn &lt; 1.5% boundary line.</p>
                  <p><strong>Ecosystem Feedback:</strong> Automatic Slack channels alerting team on active client pilot responses.</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SUBTAB 6: WEEKLY KPIS */}
        {activeStrategyTab === 'kpis' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">6. Active Weekly Operational Metric Monitors</h3>
              <p className="text-xs text-zinc-400">Weekly performance thresholds designed to track progress toward the $10,000 MRR milestone.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {WEEK_WEEKLY_KPI_BLUEPRINTS()}
            </div>
          </div>
        )}

        {/* SUBTAB 7: DAILY FOUNDER ROUTINES */}
        {activeStrategyTab === 'daily' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">7. Daily Founder Operational Routine Playbook</h3>
              <p className="text-xs text-zinc-400">Strict chronological daily schedules designed for early-stage B2B founder scaling execution.</p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto font-sans">
              {DAILY_FOUNDER_ROUTINES.map((sc, i) => (
                <div key={i} className="p-4 bg-zinc-950/50 border border-zinc-805 rounded-xl relative flex flex-col md:flex-row gap-4 justify-between items-start">
                  
                  {/* Left Column (time block) */}
                  <div className="space-y-1.5 md:w-1/4 shrink-0">
                    <span className="font-mono text-xs text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-1 rounded inline-block border border-indigo-500/20">
                      {sc.timeBlock}
                    </span>
                    <p className="text-[11px] text-zinc-500 font-mono tracking-wide uppercase pt-1">{sc.focus}</p>
                  </div>

                  {/* Details column */}
                  <div className="flex-1 space-y-2">
                    <h4 className="text-xs font-bold text-white font-display">Activity: {sc.activity}</h4>
                    <div className="space-y-1 text-xs text-zinc-400 pl-4 list-disc">
                      {sc.checklist.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Signature Board Co-sign Footnote */}
      <div className="bg-zinc-950 p-6 border border-zinc-850 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <span className="text-emerald-400 font-bold block uppercase text-[10px]">VERIFIED PLATFORM ACTION SHEET</span>
          <p className="text-zinc-400">EffectiveBuzz Growth Runway Plan: EB-SGR-TH-10K</p>
        </div>
        <div className="text-[10px] text-zinc-550 italic uppercase sm:text-right">
          Last Strategic Re-indexing Date: June 2026
        </div>
      </div>

    </div>
  );

  // Quick helper rendering Weekly KPIs
  function WEEK_WEEKLY_KPI_BLUEPRINTS() {
    return WEEKLY_KPI_BLUEPRINTS.map((item, idx) => {
      const Icon = item.icon;
      return (
        <div key={idx} className="p-4 bg-zinc-950 border border-zinc-805 rounded-xl space-y-2 relative text-center">
          <div className="mx-auto h-8 h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center justify-center">
            <Icon className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-[10px] text-[#818cf8] font-mono tracking-wide font-bold uppercase block leading-tight">
            KPI Metric {idx+1}
          </span>
          <h4 className="text-[11px] font-bold text-white uppercase font-display block h-8 leading-tight">
            {item.metric}
          </h4>
          <div className="p-1.5 bg-zinc-900 rounded text-xs font-mono text-emerald-400 font-bold border border-zinc-850">
            {item.targetTenants}
          </div>
          <p className="text-[9.5px] text-zinc-550 leading-relaxed font-sans mt-2">
            Importance: {item.importance}
          </p>
        </div>
      );
    });
  }
}
