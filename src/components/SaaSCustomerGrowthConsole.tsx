import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, Target, ShieldCheck, Share2, Award, 
  BookOpen, Layers, Zap, Gift, Sparkles, MessageSquare, 
  Briefcase, Calendar, BarChart2, CheckCircle2, ArrowRight
} from 'lucide-react';

interface GrowthChannel {
  id: string;
  name: string;
  type: 'Organic' | 'Paid' | 'Viral' | 'Inbound' | 'Outbound';
  description: string;
  difficulty: 'Low' | 'Medium' | 'High';
  estimatedCac: string;
  expectedLtv: string;
  monthlyTrafficTarget: string;
  distributionTactics: string[];
}

const CUSTOMER_ACQUISITION_CHANNELS: GrowthChannel[] = [
  {
    id: 'outbound-sdr',
    name: 'SDR Campaign Automation & Lead Scraping',
    type: 'Outbound',
    description: 'Targeted scrapers extracting contact handles of VPs of Revenue and Founders scaling their lead generation outbox pipelines.',
    difficulty: 'Medium',
    estimatedCac: '$120 / customer',
    expectedLtv: '$3,600 / customer',
    monthlyTrafficTarget: '1,500 qualified leads enriched',
    distributionTactics: [
      'Daily rotation and warmups of custom proxy sender domains',
      'Integration of double-blind PII scrubbers to maximize inbox placement',
      'Dynamic insertion of personalized LinkedIn connection event cues'
    ]
  },
  {
    id: 'plg-loop',
    name: 'Viral Email Footer Signature Loops',
    type: 'Viral',
    description: '"Powered by EffectiveBuzz Outbox" branding on footer notifications of outgoing automated cold emails dispatched via early systems.',
    difficulty: 'Low',
    estimatedCac: '$5 / customer',
    expectedLtv: '$1,800 / customer',
    monthlyTrafficTarget: '5,000 impressions / user / month',
    distributionTactics: [
      'One-click removal of watermarks on paid plans to drive conversion',
      'Disseminate customizable signups inside every delivery report loop',
      'Deploy localized invitation coefficients on user onboarding dashboards'
    ]
  },
  {
    id: 'partnership-network',
    name: 'Sovereign Marketing Agencies Alliances',
    type: 'Inbound',
    description: 'Value aggregation partnerships with specialized lead-gen and B2B cold outreach agencies hosting 30+ client assets standard.',
    difficulty: 'High',
    estimatedCac: '$300 / agency',
    expectedLtv: '$12,000 / agency bundle',
    monthlyTrafficTarget: '20 agency discovery workshops',
    distributionTactics: [
      'Offer private whitelabel custom outbox sub-allocation options',
      'Build dynamic bulk sub-tenant workspaces for easy monitoring',
      'Host quarterly technical sales optimization roundtables'
    ]
  },
  {
    id: 'organic-seo',
    name: 'Deliverability & Domain Health Authority',
    type: 'Organic',
    description: 'Publishing deep-dive technical guidelines about DMARC compliance, cold domain cooling cycles, and outbound copywriting templates.',
    difficulty: 'High',
    estimatedCac: '$40 / customer',
    expectedLtv: '$2,400 / customer',
    monthlyTrafficTarget: '8,000 monthly unique visitors',
    distributionTactics: [
      'Weekly diagnostic checklists hosted under public tools directory',
      'Interactive online SPF/DKIM validation tools mapped to email health',
      'Building in public and publishing transparent outbox response outcomes'
    ]
  }
];

interface SalesMotion {
  motion: string;
  scaleType: 'Product-Led Growth (PLG)' | 'Sales-Led Growth (SLG)';
  cycleLength: string;
  avgContractValue: string;
  closingRate: string;
  primaryMetric: string;
  operationalTactic: string;
}

const SALES_MOTIONS_MATRIX: SalesMotion[] = [
  {
    motion: 'Self-Serve Starter Outbox',
    scaleType: 'Product-Led Growth (PLG)',
    cycleLength: '1-3 days pilot window',
    avgContractValue: '$1,500 / year',
    closingRate: '12% self-serve converting',
    primaryMetric: 'Time to First Outbox Launch (TTFOL)',
    operationalTactic: 'Automate step-by-step SPF configurations, immediately prompting sample first-line dynamic hook generation.'
  },
  {
    motion: 'Mid-Market Team Suite',
    scaleType: 'Sales-Led Growth (SLG)',
    cycleLength: '14-25 days closing timeline',
    avgContractValue: '$9,600 / year',
    closingRate: '35% trial-to-signed contracts',
    primaryMetric: 'Demo-to-Pilot Conversion Coefficient',
    operationalTactic: '1-on-1 personalized founder assessment audits, custom lead list scraping matching the client ICP on discovery calls.'
  }
];

interface PartnerProgram {
  partnerType: string;
  valueProp: string;
  revShareTier: string;
  activationChecklist: string[];
}

const PARTNER_PROGRAMS_BLUEPRINTS: PartnerProgram[] = [
  {
    partnerType: 'HubSpot & CRM Integration Enablers',
    valueProp: 'Offer CRM consultants a dedicated connector tool to auto-sync enriched lead contact status histories without API middleware overhead.',
    revShareTier: '20% lifetime cash-back on active client subscriptions',
    activationChecklist: [
      'Deploy automated HubSpot Integration connectors into developer playbooks',
      'Establish a dual-branded listing page on the Partner Integration Directory',
      'Co-promote continuous pipeline synchronization templates to sales operations leads'
    ]
  },
  {
    partnerType: 'Growth & Outreach Agencies',
    valueProp: 'Enable high-volume B2B lead generation teams to set up whitelabeled outbox seats for all client records under one master terminal.',
    revShareTier: '15% agency client margin commission or custom whitelabel pricing',
    activationChecklist: [
      'Generate whitelabel client monitoring dashboards custom styled',
      'Establish priority 15-minute Slack webhook customer support SLAs',
      'Provide monthly delivery logs showing domain spam health diagnostic reports'
    ]
  }
];

interface ReferralProgram {
  referralType: string;
  customerIncentive: string;
  friendIncentive: string;
  viralMultiplier: string;
}

const REFERRAL_PROGRAMS_BLUEPRINTS: ReferralProgram[] = [
  {
    referralType: 'The Outbox Capacity Bonus Plan',
    customerIncentive: '+1,500 active domain lead upload capacity forever',
    friendIncentive: '15% discount for first 3 active months',
    viralMultiplier: 'Est. 1.25x scaling coefficient'
  },
  {
    referralType: 'The Paid Affiliate Kickback program',
    customerIncentive: '$150 cash payouts via integrated Stripe Connect networks',
    friendIncentive: 'Free deliverability auditing tools setup template',
    viralMultiplier: 'Est. 1.15x conversion volume uptick'
  }
];

interface ContentCalendarDay {
  day: string;
  theme: string;
  channel: string;
  targetObjective: string;
  kpiMonitor: string;
}

const CONTENT_STRATEGY_SCHEDULE: ContentCalendarDay[] = [
  {
    day: 'Monday',
    theme: 'Outbound Copywriting Audit Analysis',
    channel: 'LinkedIn + Newsletter',
    targetObjective: 'Showcase exact first-line hook variants before and after PII cleanups.',
    kpiMonitor: '35%+ newsletter open frequency'
  },
  {
    day: 'Wednesday',
    theme: 'Deliverability & Domain SPF Diagnostics',
    channel: 'Substack / Blog Hub',
    targetObjective: 'Technical deep-dive on modern mailbox cooling cycles under strict constraints.',
    kpiMonitor: '80+ technical downloads per guide'
  },
  {
    day: 'Friday',
    theme: 'SaaS Builder Journey / Building in Public',
    channel: 'X/Twitter + LinkedIn',
    targetObjective: 'Detailed telemetry logs and conversion updates from the past week.',
    kpiMonitor: '12,000+ organic weekly impressions'
  }
];

export default function SaaSCustomerGrowthConsole() {
  const [activeSegment, setActiveSegment] = useState<'channels' | 'sales_motions' | 'partners_referrals' | 'community_content' | 'simulator'>('channels');

  // Interactive CRO Growth Simulator state
  const [monthlyOutboundEnriched, setMonthlyOutboundEnriched] = useState<number>(2500);
  const [outboundCvr, setOutboundCvr] = useState<number>(1.2); // % of enriched leads that become paid users
  const [viralKCoefficient, setViralKCoefficient] = useState<number>(0.15); // viral invites conversion / user / mo
  const [partnerConsultantIntros, setPartnerConsultantIntros] = useState<number>(5); // partner references per month
  const [churnRateCoefficient, setChurnRateCoefficient] = useState<number>(2.5); // % monthly customer logo churn

  // Computed Outputs
  const [activeSubscribers, setActiveSubscribers] = useState<number>(0);
  const [estimatedMrr, setEstimatedMrr] = useState<number>(0);
  const [monthsTo1kCustomers, setMonthsTo1kCustomers] = useState<number>(12);
  const [isSimulatingRun, setIsSimulatingRun] = useState<boolean>(false);

  // Growth dynamic model simulation over 24 months to find target crossing of 1,000 customers
  useEffect(() => {
    setIsSimulatingRun(true);
    const delayTimer = setTimeout(() => {
      let currentUsers = 0;
      let targetMonth = -1;
      const averagePrice = 350; // $ Average ARPU blending self-serve and high tier

      // Run projection monthly loops up to 36 months
      for (let m = 1; m <= 36; m++) {
        // 1. Direct Outbound acquisition
        const outboundAcquired = monthlyOutboundEnriched * (outboundCvr / 100);
        
        // 2. Partner channel acquisitions
        const partnerAcquired = partnerConsultantIntros * 4; // 1 partner close has downstream sub-tenants

        // 3. Current active viral multiplication loops
        const viralAcquired = currentUsers * viralKCoefficient;

        // Total additions
        const totalNewUsers = outboundAcquired + partnerAcquired + viralAcquired;

        // Churn reduction
        const churnedUsers = currentUsers * (churnRateCoefficient / 100);

        // Net users change
        currentUsers = Math.max(0, currentUsers + totalNewUsers - churnedUsers);

        if (currentUsers >= 1000 && targetMonth === -1) {
          targetMonth = m;
        }
      }

      setActiveSubscribers(Math.ceil(currentUsers));
      setEstimatedMrr(Math.ceil(currentUsers * averagePrice));
      setMonthsTo1kCustomers(targetMonth === -1 ? 36 : targetMonth);
      setIsSimulatingRun(false);
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [monthlyOutboundEnriched, outboundCvr, viralKCoefficient, partnerConsultantIntros, churnRateCoefficient]);

  return (
    <div id="saas-customer-growth-system" className="space-y-8 animate-fadeIn text-slate-100 font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-widest">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            CRO & VP OF GROWTH STRATEGY DASHBOARD
          </div>
          <h1 className="text-2xl font-bold font-display text-white mt-1">
            Customer Growth System: First 1,000 Users
          </h1>
          <p className="text-xs text-gray-400 max-w-2xl mt-1 leading-relaxed">
            Constructing a highly structured scaling loop for EffectiveBuzz. Seamlessly integrates organic footer viral parameters, high-intent agency partner channels, and thematic diagnostic content.
          </p>
        </div>

        {/* Global Conversion Target Badge */}
        <div className="flex flex-wrap items-center gap-3 bg-zinc-950/40 p-2 border border-zinc-850 rounded-xl text-xs self-start lg:self-center">
          <div className="px-3 py-1 bg-zinc-900 rounded-lg">
            <span className="text-[10px] text-zinc-500 block font-mono">Scaling Target</span>
            <span className="font-bold text-white font-mono">1,000 Active Customers</span>
          </div>
          <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg">
            <span className="text-[10px] text-purple-400 block font-mono">Blended ARPU Index</span>
            <span className="font-bold font-mono text-emerald-400">$350 / Month</span>
          </div>
        </div>
      </div>

      {/* DYNAMIC 1,000 CUSTOMER RAMP SIMULATOR */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-805 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none" />
        
        <div className="border-b border-zinc-850 pb-4">
          <div className="flex items-center gap-1.5 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider pb-0.5">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            CRO Interactive Customer Acquisition Simulator
          </div>
          <h3 className="text-base font-semibold text-white font-display">
            The 1,000-User Growth Curve & Multipliers
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Adjust outbound traffic volume, viral invitation coefficients, and partner program referral pipelines to calculate estimated scale-times and monthly recurring revenues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Inputs Column */}
          <div className="lg:col-span-5 bg-zinc-950/50 border border-zinc-850 p-5 rounded-xl space-y-4">
            <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">
              Simulation Tuning Control Block
            </span>

            {/* Outbound Traffic */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Monthly Outbound Enriched Leads</span>
                <span className="text-white font-bold">{monthlyOutboundEnriched} leads</span>
              </div>
              <input 
                type="range"
                min="500"
                max="5000"
                step="250"
                value={monthlyOutboundEnriched}
                onChange={(e) => setMonthlyOutboundEnriched(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-zinc-800 cursor-pointer h-1 rounded"
              />
            </div>

            {/* Outbound Conversion */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Outbound Conversion Rate</span>
                <span className="text-emerald-400 font-bold">{outboundCvr}% list-to-paid</span>
              </div>
              <input 
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={outboundCvr}
                onChange={(e) => setOutboundCvr(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-zinc-800 cursor-pointer h-1 rounded"
              />
            </div>

            {/* Viral K Coefficient */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Viral Coefficient (K-Factor)</span>
                <span className="text-pink-400 font-bold">K = {viralKCoefficient}</span>
              </div>
              <input 
                type="range"
                min="0.05"
                max="0.50"
                step="0.05"
                value={viralKCoefficient}
                onChange={(e) => setViralKCoefficient(Number(e.target.value))}
                className="w-full accent-pink-500 bg-zinc-800 cursor-pointer h-1 rounded"
              />
              <span className="text-[10px] text-zinc-500 block leading-none">Ratio of active users sharing footers.</span>
            </div>

            {/* Partner intros */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Active Agency Partner Intros</span>
                <span className="text-[#818cf8] font-bold">{partnerConsultantIntros} / month</span>
              </div>
              <input 
                type="range"
                min="1"
                max="15"
                step="1"
                value={partnerConsultantIntros}
                onChange={(e) => setPartnerConsultantIntros(Number(e.target.value))}
                className="w-full accent-indigo-400 bg-zinc-800 cursor-pointer h-1 rounded"
              />
            </div>

            {/* Churn Rate */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Monthly Logo Churn Ratio</span>
                <span className="text-zinc-400 font-bold">{churnRateCoefficient}% / month</span>
              </div>
              <input 
                type="range"
                min="1.0"
                max="7.0"
                step="0.5"
                value={churnRateCoefficient}
                onChange={(e) => setChurnRateCoefficient(Number(e.target.value))}
                className="w-full accent-zinc-500 bg-zinc-800 cursor-pointer h-1 rounded"
              />
            </div>

          </div>

          {/* Outcomes Visualizer */}
          <div className="lg:col-span-7 bg-zinc-950/70 border border-zinc-850 p-6 rounded-xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
              <span className="uppercase text-[9px] tracking-widest block font-bold text-zinc-500">
                MODEL PREDICTIONS OVER A 24-MONTH HORIZON
              </span>
              {isSimulatingRun && <Zap className="w-3.5 h-3.5 text-indigo-400 animate-spin" />}
            </div>

            {/* 3 Metric cards */}
            <div className="grid grid-cols-3 gap-4 my-5 text-center font-mono">
              <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-lg">
                <span className="text-[8.5px] text-zinc-500 block uppercase mb-1">Time to 1k Users</span>
                <span className="text-2xl font-bold text-white block">
                  {monthsTo1kCustomers === 36 ? '36+ Mo' : `${monthsTo1kCustomers} Months`}
                </span>
                <span className="text-[8px] text-indigo-400 block font-mono mt-0.5">Scaling Runway</span>
              </div>

              <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-lg">
                <span className="text-[8.5px] text-zinc-500 block uppercase mb-1">Projected MRR</span>
                <span className="text-2xl font-bold text-emerald-400 block">${estimatedMrr.toLocaleString()}</span>
                <span className="text-[8px] text-zinc-500 block font-mono mt-0.5">Average Blended ARPU</span>
              </div>

              <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-lg">
                <span className="text-[8.5px] text-zinc-500 block uppercase mb-1">Active Subscribers</span>
                <span className="text-2xl font-bold text-indigo-300 block">{activeSubscribers}</span>
                <span className="text-[8px] text-zinc-550 block font-mono mt-0.5">Active Tenants</span>
              </div>
            </div>

            {/* Diagnostic review text */}
            <div className="p-4 bg-zinc-900 border border-zinc-805 rounded-lg space-y-1 text-xs">
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block font-bold text-indigo-400">
                CRO GTM Pipeline Analysis:
              </span>
              <p className="text-zinc-405 leading-normal">
                {monthsTo1kCustomers <= 12 
                  ? '✔ OPTIMIZED SAAS GTM: Excellent. Highly active viral K-factor and low churn under 3% allows EffectiveBuzz to comfortably reach the 1,000 customers scaling gate within the next 12 calendar months.'
                  : '⚠️ RUNWAY EXTENSION RECOMMENDED: Reaching 1,000 customers exceeds the 12-month GTM horizon. We recommend optimizing your footer viral watermark loop and increasing active agency partner referral channels.'}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* STRATEGY TAB CHOOSER */}
      <div className="bg-zinc-950/60 border border-zinc-800 p-1.5 rounded-xl flex flex-wrap gap-1">
        {[
          { id: 'channels', label: '1. Acquisition Channels', icon: Target },
          { id: 'sales_motions', label: '2. Sales Motions Profile', icon: Layers },
          { id: 'partners_referrals', label: '3. Referral & Partner Systems', icon: Award },
          { id: 'community_content', label: '4. Community & Content Strategy', icon: BookOpen }
        ].map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSegment(item.id as any)}
              className={`flex-1 min-w-[130px] py-2.5 px-3.5 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 transition ${
                activeSegment === item.id
                  ? 'bg-zinc-900 border-zinc-700 text-white shadow'
                  : 'bg-transparent border-transparent text-gray-400 hover:bg-zinc-900/40 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* DYNAMIC DETAILS SHEET */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 lg:p-8 backdrop-blur min-h-[350px]">
        
        {/* SUBTAB 1: ACQUISITION CHANNELS */}
        {activeSegment === 'channels' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-805 pb-4">
              <h3 className="text-base font-semibold text-white font-display">1. Strategic Customer Acquisition Funnels</h3>
              <p className="text-xs text-zinc-400">Targeted client acquisition loops combining dynamic outbound scraping with organic, high-converting product features.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CUSTOMER_ACQUISITION_CHANNELS.map(chan => (
                <div key={chan.id} className="p-5 bg-zinc-950 border border-zinc-805 rounded-xl space-y-4 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono font-semibold">
                      <span className="text-white text-sm font-semibold font-display block">{chan.name}</span>
                      <span className="bg-zinc-900 px-2 py-0.5 rounded text-indigo-400 text-[10px]">
                        {chan.type}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-2.5">
                      {chan.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-[10px] font-mono border-t border-zinc-900 pt-3 mt-3">
                      <div>
                        <span className="text-zinc-550 block uppercase text-[8px]">Est. CAC:</span>
                        <strong className="text-white block">{chan.estimatedCac}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-550 block uppercase text-[8px]">Expected LTV:</span>
                        <strong className="text-emerald-400 block">{chan.expectedLtv}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-550 block uppercase text-[8px]">Weekly Target:</span>
                        <strong className="text-[#818cf8] block">{chan.monthlyTrafficTarget}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-850 p-2 text-[11px] font-sans text-indigo-300 rounded mt-4">
                    <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase block mb-1">Execution Tactics Matrix</span>
                    <ul className="list-disc list-inside space-y-1 text-zinc-300">
                      {chan.distributionTactics.map((t, idx) => (
                        <li key={idx} className="leading-tight">{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 2: SALES MOTIONS PROFILE */}
        {activeSegment === 'sales_motions' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-805 pb-4">
              <h3 className="text-base font-semibold text-white font-display">2. Product-Led-Growth (PLG) vs. Sales-Led-Growth (SLG)</h3>
              <p className="text-xs text-zinc-400">Two distinct sales tracks optimized to guide self-serve startups and high-touch corporate clients into paid licenses.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {SALES_MOTIONS_MATRIX.map((item, idx) => (
                <div key={idx} className="p-6 bg-zinc-950 border border-zinc-805 rounded-xl space-y-4 relative">
                  <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-mono px-3 py-0.5 rounded-full uppercase">
                    {item.scaleType}
                  </div>

                  <div className="border-b border-zinc-900 pb-3">
                    <h4 className="text-sm font-bold text-white font-display">{item.motion}</h4>
                    <p className="text-[11px] text-zinc-550 font-mono uppercase tracking-wide mt-1">Operational sales cycle: {item.cycleLength}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="bg-zinc-900/40 p-2.5 rounded border border-zinc-850">
                      <span className="text-zinc-500 uppercase text-[9px] block">Avg Contract Value</span>
                      <strong className="text-white">{item.avgContractValue}</strong>
                    </div>
                    <div className="bg-zinc-900/40 p-2.5 rounded border border-zinc-850">
                      <span className="text-zinc-500 uppercase text-[9px] block">Target Closing Rate</span>
                      <strong className="text-emerald-400">{item.closingRate}</strong>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 bg-indigo-500/5 rounded border border-indigo-500/10 space-y-1">
                      <span className="font-mono text-[9px] block text-indigo-400 uppercase tracking-wider font-bold">Primary Success North-Star Metric:</span>
                      <p className="text-xs font-semibold text-white leading-tight">{item.primaryMetric}</p>
                    </div>

                    <div className="p-3 bg-zinc-900 rounded border border-zinc-850 text-xs text-zinc-400">
                      <span className="font-mono text-[9px] block text-zinc-500 uppercase tracking-widest font-bold mb-1">GTM Implementation Tactic Calendar</span>
                      <p className="leading-relaxed text-[11px]">{item.operationalTactic}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 3: REFERRAL & PARTNER PROGRAMS */}
        {activeSegment === 'partners_referrals' && (
          <div className="space-y-8">
            
            {/* Partners program section */}
            <div className="space-y-4">
              <div className="border-b border-zinc-805 pb-3">
                <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-wider block font-bold">Departmental Track A</span>
                <h3 className="text-sm font-bold text-white uppercase font-display">B2B Integration Partners Programs</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PARTNER_PROGRAMS_BLUEPRINTS.map((b, idx) => (
                  <div key={idx} className="p-5 bg-zinc-950 border border-zinc-805 rounded-xl space-y-4">
                    <div className="flex justify-between items-start border-b border-zinc-900 pb-3 gap-2">
                      <h4 className="text-xs font-bold text-white uppercase">{b.partnerType}</h4>
                      <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-mono shrink-0">
                        {b.revShareTier}
                      </span>
                    </div>

                    <p className="text-[11.5px] text-zinc-400 leading-relaxed">
                      <strong>Target Value Proposition:</strong> {b.valueProp}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-zinc-900">
                      <span className="text-[10px] font-mono text-zinc-550 uppercase block font-bold">Activation Playbook Checklist:</span>
                      
                      <div className="space-y-1.5 text-xs text-zinc-300">
                        {b.activationChecklist.map((item, id) => (
                          <div key={id} className="flex gap-2 items-start">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                            <span className="leading-tight">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Referrals program section */}
            <div className="space-y-4 pt-4 border-t border-zinc-850">
              <div className="border-b border-zinc-805 pb-3">
                <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-wider block font-bold">Departmental Track B</span>
                <h3 className="text-sm font-bold text-white uppercase font-display">Customer Referral & Virality Expansion Programs</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {REFERRAL_PROGRAMS_BLUEPRINTS.map((b, idx) => (
                  <div key={idx} className="p-5 bg-zinc-950 border border-zinc-805 rounded-xl space-y-4">
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-3 font-mono text-xs">
                      <h4 className="font-bold text-white uppercase">{b.referralType}</h4>
                      <span className="text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold">
                        {b.viralMultiplier}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                      <div className="p-3 bg-zinc-900/65 rounded border border-zinc-850">
                        <span className="text-[9px] text-zinc-500 block uppercase font-bold">Referrer Incentive:</span>
                        <span className="text-white block mt-1 leading-normal">{b.customerIncentive}</span>
                      </div>
                      <div className="p-3 bg-zinc-900/65 rounded border border-zinc-850">
                        <span className="text-[9px] text-zinc-500 block uppercase font-bold">Referred Friend Incentive:</span>
                        <span className="text-emerald-400 block mt-1 leading-normal">{b.friendIncentive}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SUBTAB 4: COMMUNITY & CONTENT STRATEGY */}
        {activeSegment === 'community_content' && (
          <div className="space-y-8">
            
            {/* Community Strategy section */}
            <div className="space-y-4">
              <div className="border-b border-zinc-805 pb-3">
                <h3 className="text-sm font-bold text-white uppercase font-display">CRO B2B Community Strategy Strategy</h3>
                <p className="text-xs text-zinc-400">Establishing sustainable organic feedback loops and peer interaction centers matching active GTM leads.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
                
                <div className="p-5 bg-zinc-950 border border-zinc-805 rounded-xl space-y-3">
                  <span className="font-mono text-[9px] text-indigo-400 uppercase tracking-widest block font-bold">Community Element A</span>
                  <h4 className="text-xs font-bold text-white uppercase">The Outbox deliverability roundtables</h4>
                  <p className="text-zinc-400 leading-relaxed text-[11.5px]">
                    Arrange weekly, zero-fluff 30-minute founder diagnostic workshops. Review active domain cooling schedules, DNS validation errors, DMARC alignment scripts, and inbox deliverability metrics live on dynamic screens.
                  </p>
                  <span className="text-[9.5px] font-mono text-emerald-400 block">Goal: Establish trusted industry baseline authority.</span>
                </div>

                <div className="p-5 bg-zinc-950 border border-zinc-805 rounded-xl space-y-3">
                  <span className="font-mono text-[9px] text-indigo-400 uppercase tracking-widest block font-bold">Community Element B</span>
                  <h4 className="text-xs font-bold text-white uppercase font-display">Cold outreach template library workspace</h4>
                  <p className="text-zinc-400 leading-relaxed text-[11.5px]">
                    Deploy an interactive community hub workspace where active SDR leads and B2B marketers can submit, rank, and download proven high-converting cold email copy templates matching distinct industry verticals.
                  </p>
                  <span className="text-[9.5px] font-mono text-purple-300 block">Goal: Organic invite loops and template distributions.</span>
                </div>

              </div>
            </div>

            {/* Content Strategy section */}
            <div className="space-y-4 pt-4 border-t border-zinc-850">
              <div className="border-b border-zinc-805 pb-3">
                <h3 className="text-sm font-bold text-white uppercase font-display">Themed Content Calendar & Distribution</h3>
                <p className="text-xs text-zinc-400 font-sans">Three structured technical publication runways designed to secure organic inbound visitors without ad spend.</p>
              </div>

              <div className="space-y-3.5 max-w-4xl mx-auto">
                {CONTENT_STRATEGY_SCHEDULE.map((item, idx) => (
                  <div key={idx} className="p-4 bg-zinc-950/60 border border-zinc-805 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="space-y-1.5 md:w-1/4 shrink-0">
                      <span className="font-mono text-xs text-indigo-300 font-bold bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20 inline-block">
                        {item.day}
                      </span>
                      <p className="text-[10px] text-zinc-550 font-mono tracking-wider uppercase">{item.channel}</p>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white">{item.theme}</h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-normal">{item.targetObjective}</p>
                    </div>

                    <div className="bg-zinc-900/60 p-2.5 border border-zinc-850 rounded font-mono text-xs text-emerald-400 text-center shrink-0">
                      <span className="text-[8px] text-zinc-500 uppercase block">Weekly KPI:</span>
                      <strong>{item.kpiMonitor}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* FOOTNOTE BLOCK */}
      <div className="bg-zinc-950 p-6 border border-zinc-850 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <span className="text-emerald-400 font-bold block uppercase text-[10px]">VERIFIED GTM SCALE RUNWAY PLAN</span>
          <p className="text-zinc-400">EffectiveBuzz Chief Revenue Officer Strategy: EB-CRO-K1000</p>
        </div>
        <div className="text-[10px] text-zinc-550 italic uppercase sm:text-right">
          Interactive Operational Version: v2.4.1
        </div>
      </div>

    </div>
  );
}
