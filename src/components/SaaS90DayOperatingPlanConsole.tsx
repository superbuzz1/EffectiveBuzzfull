import React, { useState } from 'react';
import { 
  Compass, TrendingUp, Users, DollarSign, Cpu, Clock, 
  Map, CheckCircle, Radio, ShieldAlert, Award, FileText, 
  Settings, ChevronRight, Activity, LineChart, Sparkles, CheckCircle2,
  Lock, Calendar, HelpCircle, CheckSquare, Zap, Target
} from 'lucide-react';

interface DepartmentGoals {
  revenue: string[];
  customer: string[];
  product: string[];
  engineering: string[];
  marketing: string[];
}

interface PeriodPlan {
  period: string;
  codename: string;
  subtitle: string;
  overallHealthStatus: 'HEALTHY' | 'STABILIZING' | 'AGGRESSIVE';
  primaryFocus: string;
  metrics: {
    targetMrr: number;
    activeCustomers: number;
    dauWauRatio: number;
    conversionRate: number;
  };
  goals: DepartmentGoals;
  criticalMilestones: {
    title: string;
    owner: string;
    completed: boolean;
  }[];
}

export default function SaaS90DayOperatingPlanConsole() {
  const [activeTab, setActiveTab] = useState<'days_1_30' | 'days_31_60' | 'days_61_90' | 'dashboard'>('dashboard');
  
  // Interactive Simulator States
  const [targetAverageSeatPrice, setTargetAverageSeatPrice] = useState<number>(149); // default $149/mo
  const [estimatedDailyOutreach, setEstimatedDailyOutreach] = useState<number>(500); // default 500 cold emails sent/day
  const [expectedResponseRate, setExpectedResponseRate] = useState<number>(2.5); // default 2.5%
  const [estimatedConversionToTrial, setEstimatedConversionToTrial] = useState<number>(15.0); // default 15% from response to trial

  // Interactive Priority Tasks
  const [priorities, setPriorities] = useState([
    { id: 1, title: 'Draft and warm 15 proxy outbound domains to absolute delivery health', period: 'days_1_30', dept: 'Marketing', stage: 'In Progress' },
    { id: 2, title: 'Establish double-blind PII stripping gateways inside LLM request pipelines', period: 'days_1_30', dept: 'Engineering', stage: 'Completed' },
    { id: 3, title: 'Deploy automatic email cooling mechanisms to pause outbound on 5%+ bounce telemetry', period: 'days_1_30', dept: 'Engineering', stage: 'In Progress' },
    { id: 4, title: 'Onboard early 10 Closed Beta trial agencies into active dashboard workspace', period: 'days_1_30', dept: 'Customer Success', stage: 'Completed' },
    { id: 5, title: 'Publish dynamic deliverability lookup guides directly on platform landing domain', period: 'days_1_30', dept: 'Marketing', stage: 'Completed' },
    { id: 6, title: 'Roll out co-marketing webinars with CRM partners illustrating bidirectional contacts sync', period: 'days_31_60', dept: 'Marketing', stage: 'Pending' },
    { id: 7, title: 'Deploy Regional Arabic/Emirati LLM processing enclaves for GCC compliance logs', period: 'days_31_60', dept: 'Engineering', stage: 'Pending' },
    { id: 8, title: 'Automate Stripe usage invoices based on dynamic query and search credit overages', period: 'days_31_60', dept: 'Operations', stage: 'In Progress' },
    { id: 9, title: 'Optimize time-to-first-campaign launch flow to require less than 5 minutes onboarding', period: 'days_31_60', dept: 'Product', stage: 'In Progress' },
    { id: 10, title: 'Scale pricing configuration to charge an additional passive $45/mo seat expansion tier', period: 'days_61_90', dept: 'Revenue', stage: 'Pending' },
    { id: 11, title: 'Incorporate real-time Slack incident status pages and latency alerts under global paths', period: 'days_61_90', dept: 'Engineering', stage: 'Pending' },
    { id: 12, title: 'Onboard 100 enterprise outbound accounts to secure $15k steady MRR threshold', period: 'days_61_90', dept: 'Revenue', stage: 'Pending' }
  ]);

  const toggleTask = (id: number) => {
    setPriorities(prev => prev.map(t => {
      if (t.id === id) {
        let nextStage = 'Pending';
        if (t.stage === 'Pending') nextStage = 'In Progress';
        else if (t.stage === 'In Progress') nextStage = 'Completed';
        else nextStage = 'Pending';
        return { ...t, stage: nextStage };
      }
      return t;
    }));
  };

  // Static 90-Day Plan Dataset based strictly on the executive alignment
  const operatingPlan: Record<'days_1_30' | 'days_31_60' | 'days_61_90', PeriodPlan> = {
    days_1_30: {
      period: 'Days 1 to 30',
      codename: 'Operation Deep-Freeze Warming',
      subtitle: 'Stabilization, Closed Beta telemetry, and proxy domain setup.',
      overallHealthStatus: 'STABILIZING',
      primaryFocus: 'Establishing solid inbox deliverability foundation, onboarding the first 10 Closed Beta trial agencies, and solidifying double-blind PII safety gates.',
      metrics: {
        targetMrr: 1500,
        activeCustomers: 10,
        dauWauRatio: 35,
        conversionRate: 12.5
      },
      goals: {
        revenue: [
          'Secure initial validator revenue by converting 10 Closed Beta pilot users onto Starter Plans ($95/mo -> $299/mo).',
          'Deploy basic Stripe recurring subscription pipelines via direct webhook syncing.',
          'Define the upsell metrics threshold charging $0.05 per active scraper API query over baseline.'
        ],
        customer: [
          'Acquire and onboard the first 10 seed marketing agencies to test workspace boundaries.',
          'Monitor the Time to First Outbox Campaign — target is under 15 minutes of initial setup.',
          'Formulate strict CS loops: provide real-world slack support channels with 2-hour response guarantees.'
        ],
        product: [
          'Enable multi-tenant organization boundaries and dedicated sub-user permission sets (RBAC).',
          'Deploy the "Powered by EffectiveBuzz" viral tracking footer into final outgoing cold campaign templates.',
          'Clean trial UI workflow to isolate and simplify SMTP/DNS wizard configuration steps.'
        ],
        engineering: [
          'Incorp double-blind PII stripping triggers before scrubbing lead data with Gemini nodes.',
          'Establish the automatic mailbox cooling defense line: pause campaigns if bounce telemetry exceeds 5.0%.',
          'Optimize lead extraction queries to handle up to 50 concurrent scraping threads without API timeouts.'
        ],
        marketing: [
          'Purchase, register, and cold-warm 15 distinct custom proxy outreach domains for 21 days straight.',
          'Publish high-relevancy guides about DMARC compliance shifts directly on public domain.',
          'Generate weekly "Building in Public" reports on LinkedIn to attract self-serve outbound leads.'
        ]
      },
      criticalMilestones: [
        { title: 'SOC2 Security Boundaries and Vault Enclaving', owner: 'CTO - Principal Architect', completed: true },
        { title: 'PII Scrubbing Lambda Middleware Execution', owner: 'Staff DeVops', completed: true },
        { title: 'Outboard Proxy Domain Delivery Warming', owner: 'CRO & GTM Team', completed: false }
      ]
    },
    days_31_60: {
      period: 'Days 31 to 60',
      codename: 'Operation Outbound Resonance',
      subtitle: 'Outbound acceleration, CRM bi-sync integrations, and Middle-East expansion.',
      overallHealthStatus: 'AGGRESSIVE',
      primaryFocus: 'Accelerating cold marketing outbound volume, launching bi-directional Salesforce & HubSpot data syncs, and pursuing first enterprise contracts.',
      metrics: {
        targetMrr: 6000,
        activeCustomers: 40,
        dauWauRatio: 52,
        conversionRate: 18.0
      },
      goals: {
        revenue: [
          'Scale MRR aggressively toward $6,000 ARR trajectory by signing 30 additional paying customers.',
          'Construct enterprise premium addon pricing tiers (Whitelabel administrative panel access).',
          'Introduce bulk lead enrichment discounts for pre-purchased credits packages.'
        ],
        customer: [
          'Maintain average customer health score above 85% by establishing weekly delivery health diagnostic reviews.',
          'Lower campaign launch activation threshold to less than 5 minutes total onboarding.',
          'Train agency customer teams on advanced cold writing prompt structures used in our CRM.'
        ],
        product: [
          'Roll out native CRM bi-directional connectors (HubSpot, Salesforce, and Zoho CRM sync).',
          'Incorporate lead scoring agent variables inside the central campaign scheduler.',
          'Introduce localized Arabic UI translation and regional interface components.'
        ],
        engineering: [
          'Deploy secondary physical database pods localized in EMEA (Dubai/Riyadh cloud zones).',
          'Integrate automated OpenAI/Gemini cost calculators to flag low-margin account routes.',
          'Implement queue performance rate throttling to withstand 200k outbound emails dispatched daily.'
        ],
        marketing: [
          'Execute 2 co-marketing webinars with CRM ecosystem optimization advisors.',
          'Setup an automated interactive Outbox Deliverability Score Checker tool on our landing page.',
          'Initiate specialized outbound cold outreach targeting High-Growth B2B agencies and SaaS companies.'
        ]
      },
      criticalMilestones: [
        { title: 'HubSpot and Salesforce Bidirectional CRM Webhooks', owner: 'CPO & Senior Devs', completed: false },
        { title: 'Dubai Isolated Cluster Pod Infrastructure Deployment', owner: 'DevOps Architect', completed: false },
        { title: 'Strategic Partner Program Launch for Sales Agencies', owner: 'CRO - Lead Agency', completed: false }
      ]
    },
    days_61_90: {
      period: 'Days 61 to 90',
      codename: 'Operation Revenue Compounder',
      subtitle: 'NDR expansion, seat expansion triggers, and market domination.',
      overallHealthStatus: 'HEALTHY',
      primaryFocus: 'Unlocking secondary SaaS expansion revenues, introducing self-serve seat addons, and targeting high NDR parameters to maintain enterprise trajectory.',
      metrics: {
        targetMrr: 15000,
        activeCustomers: 100,
        dauWauRatio: 74,
        conversionRate: 24.5
      },
      goals: {
        revenue: [
          'Convert the active Closed Beta cohort into paying core accounts to reach $15,000 clean MRR.',
          'Deploy passive seat expansion pricing matrix ($45/mo for additional automated mailboxes added).',
          'Establish enterprise multi-year discounts for partners committing over $1,200/mo ARR.'
        ],
        customer: [
          'Target Net Dollar Retention (NDR) above 120% through upsells and protection addon products.',
          'Automate CS onboarding flows so less than 10% of new accounts require manual developer support.',
          'Launch continuous NPS surveys with real-time feedback connected directly into product Council alerts.'
        ],
        product: [
          'Build an AI-powered Reply Analysis Dashboard categorizing target interest parameters in real time.',
          'Introduce a self-serve partner billing terminal with granular user and seat assignment configurations.',
          'Refine the AI agent system with continuous prompt-tuning recommendations based on user win rates.'
        ],
        engineering: [
          'Replicate server instances and implement secondary hot-failover disaster nodes on isolated pipelines.',
          'Ensure 99.99% system availability SLA by setting up multi-region horizontal scaling rules.',
          'Incorporate real-time Slack telemetry logs for instant infrastructure bottlenecks diagnosis.'
        ],
        marketing: [
          'Launch co-sponsored CRM templates featuring integration case-studies.',
          'Erect high-ticket target account lists (1,000 B2B high-intent records) managed by inbound sales SDRs.',
          'Initiate an automated referral discount code commission program for current active customers.'
        ]
      },
      criticalMilestones: [
        { title: 'Self-serve Expansion Invoicing & Seat Upsell Automation', owner: 'CFO & CRO Teams', completed: false },
        { title: 'Hot-Failover Cloud Load Balancer and Timescale cluster', owner: 'CTO - Principal dev', completed: false },
        { title: '100 Active Paying Accounts Celebration and Retrospective', owner: 'CEO - Executive team', completed: false }
      ]
    }
  };

  // Live Simulated Calculations
  const calculatedMonthlyEmails = estimatedDailyOutreach * 30;
  const calculatedResponses = Math.round(calculatedMonthlyEmails * (expectedResponseRate / 100));
  const calculatedTrialsCreated = Math.round(calculatedResponses * (estimatedConversionToTrial / 100));
  const calculatedMonthlyArrAdded = calculatedTrialsCreated * targetAverageSeatPrice * 12;
  const calculatedMonthlyMrrAdded = calculatedTrialsCreated * targetAverageSeatPrice;

  const totalCalculatedProgress = Math.round(
    (priorities.filter(t => t.stage === 'Completed').length / priorities.length) * 100
  );

  return (
    <div className="space-y-6" id="saas-90day-operating-plan-root">
      
      {/* High-Impact Executive Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-gray-800 pb-5 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold uppercase tracking-widest border border-emerald-500/20">
              BOARD-DECK APPROVED
            </span>
            <span className="text-xs text-indigo-400 font-mono font-bold flex items-center gap-1">
              <Calendar className="w-3 h-3" /> CONFIDENTIAL Q3 OPERATING DOCUMENT
            </span>
          </div>
          <h2 className="text-xl font-bold font-display text-white tracking-tight flex items-center gap-2 mt-1">
            <Compass className="w-5.5 h-5.5 text-indigo-400" />
            EffectiveBuzz 90-Day Operating Plan Console
          </h2>
          <p className="text-[11px] text-zinc-400 max-w-2xl leading-normal font-sans">
            The cross-functional operating blueprint designed by the Executive Leadership Team to systematically scale EffectiveBuzz from initial closed-beta launch payload to $15k steady ARR trajectory (100 premium accounts).
          </p>
        </div>

        {/* Executive Board Co-Signatures */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 border border-gray-900 rounded-xl max-w-sm shrink-0">
          <div className="space-y-1">
            <span className="text-[8px] text-zinc-500 block font-mono font-bold uppercase tracking-wider">ELT CO-SIGNER CERTIFICATES</span>
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-300">
              <span className="bg-emerald-500/10 text-emerald-400 px-1 rounded font-bold border border-emerald-500/15">CEO ✓</span>
              <span className="bg-indigo-500/10 text-indigo-400 px-1 rounded font-bold border border-indigo-500/15">CTO ✓</span>
              <span className="bg-purple-500/10 text-purple-400 px-1 rounded font-bold border border-purple-500/15">CRO ✓</span>
              <span className="bg-amber-500/10 text-amber-400 px-1 rounded font-bold border border-amber-500/15">CPO ✓</span>
              <span className="bg-pink-500/10 text-pink-400 px-1 rounded font-bold border border-pink-500/15">CS ✓</span>
            </div>
            <span className="text-[8.5px] text-zinc-500 block italic leading-none">Authentication payload: SHA-256 Verified SOC2 Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-gray-900 font-mono text-xs">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 min-w-[120px] px-3 py-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center ${
            activeTab === 'dashboard'
              ? 'bg-slate-900 border border-slate-800 text-white font-bold shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          📈 Master Executive Dashboard
        </button>
        <button
          onClick={() => setActiveTab('days_1_30')}
          className={`flex-1 min-w-[120px] px-3 py-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center ${
            activeTab === 'days_1_30'
              ? 'bg-slate-900 border border-emerald-500/30 text-emerald-400 font-bold shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          ❄️ Days 1-30: Warming & Telemetry
        </button>
        <button
          onClick={() => setActiveTab('days_31_60')}
          className={`flex-1 min-w-[120px] px-3 py-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center ${
            activeTab === 'days_31_60'
              ? 'bg-slate-900 border border-indigo-500/30 text-indigo-400 font-bold shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          ⚡ Days 31-60: Outbound Resonance
        </button>
        <button
          onClick={() => setActiveTab('days_61_90')}
          className={`flex-1 min-w-[120px] px-3 py-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center ${
            activeTab === 'days_61_90'
              ? 'bg-slate-900 border border-purple-500/30 text-purple-400 font-bold shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🏆 Days 61-90: Revenue Compounder
        </button>
      </div>

      {/* Render Dynamic Working Window */}
      <div className="space-y-6 animate-fadeIn">
        
        {/* TAB 1: EXECUTIVE CENTRAL OVERVIEW & FINANCIAL SIMULATOR */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* SaaS Runway Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-1 hover:border-emerald-500/20 transition-all font-mono">
                <span className="text-[9px] text-gray-500 uppercase font-bold block">Current Closed Beta Stage</span>
                <div className="flex justify-between items-center">
                  <strong className="text-emerald-400 text-lg font-display">Active & Running</strong>
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-2">
                  10 strategic launch agency pilots are completing initial DNS config validations.
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-1 hover:border-indigo-500/20 transition-all font-mono">
                <span className="text-[9px] text-gray-500 uppercase font-bold block">Target End of Day 90 MRR</span>
                <strong className="text-white text-lg font-display">$15,000 / mo</strong>
                <p className="text-[10px] text-zinc-500">
                  Equivalent to signed $180,000 contracts annual run-rate benchmark.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-1 hover:border-purple-500/20 transition-all font-mono">
                <span className="text-[9px] text-gray-500 uppercase font-bold block">Customer Velocity Benchmark</span>
                <strong className="text-[#c084fc] text-lg font-display">100 Premium SaaS</strong>
                <p className="text-[10px] text-zinc-500">
                  Scaling from 10 closed-beta accounts during the first 30 days framework.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-1 hover:border-indigo-500/20 transition-all font-mono">
                <span className="text-[9px] text-gray-500 uppercase font-bold block">Execution Priority Complete</span>
                <div className="flex justify-between items-center mb-1">
                  <strong className="text-white text-lg font-display">{totalCalculatedProgress}%</strong>
                  <span className="text-[9px] text-indigo-400 font-bold">{priorities.filter(p=>p.stage==='Completed').length} / {priorities.length} Tasks</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${totalCalculatedProgress}%` }}></div>
                </div>
              </div>
            </div>

            {/* Direct Multi-Channel Analytical Sandbox */}
            <div className="bg-slate-950 border border-gray-900 rounded-xl p-5 space-y-4 font-mono">
              <div className="border-b border-gray-900 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white font-display flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    ELT Dynamic Outbound Marketing & Pricing Simulator
                  </h3>
                  <p className="text-[10px] text-zinc-500 mt-0.5 font-sans">
                    Finetune outreach parameters below. The CRO & CFO algorithms will compute the resulting MRR impact to test system viability before launch.
                  </p>
                </div>
                <span className="text-[10px] text-zinc-400 border border-gray-900 px-2 py-0.5 bg-slate-900 rounded">
                  Live Mathematical Model
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 3 Active Slider Configs */}
                <div className="space-y-4 border-r border-gray-900/60 pr-0 lg:pr-6">
                  {/* Slider 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-400 font-medium">Average Seat Price ($ / month)</span>
                      <strong className="text-white">${targetAverageSeatPrice}</strong>
                    </div>
                    <input 
                      type="range" 
                      min="49" 
                      max="399" 
                      value={targetAverageSeatPrice} 
                      onChange={(e) => setTargetAverageSeatPrice(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-900 rounded-lg"
                    />
                    <span className="text-[9px] text-zinc-600 block">Baseline target: Starter $95, Growth $299</span>
                  </div>

                  {/* Slider 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-400 font-medium">Outbound Email Volume (Sent / day / workspace)</span>
                      <strong className="text-white">{estimatedDailyOutreach} emails</strong>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="2000" 
                      value={estimatedDailyOutreach} 
                      onChange={(e) => setEstimatedDailyOutreach(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-900 rounded-lg"
                    />
                    <span className="text-[9px] text-zinc-600 block">Scaled secure domains output. Avoid domain burns</span>
                  </div>

                  {/* Slider 3 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-400 font-medium">Expected Response Rate (%)</span>
                      <strong className="text-white">{expectedResponseRate}%</strong>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="10.0" 
                      step="0.5"
                      value={expectedResponseRate} 
                      onChange={(e) => setExpectedResponseRate(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-900 rounded-lg"
                    />
                    <span className="text-[9px] text-zinc-600 block">Responsive lead diagnostic campaigns achieve 2-4% averages</span>
                  </div>
                </div>

                {/* Outputs & Projected Runway */}
                <div className="bg-slate-900/40 p-4 border border-gray-900 rounded-lg flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[8.5px] uppercase text-zinc-500 font-bold block">Computed Monthly Volumetrics</span>
                    
                    <div className="flex justify-between items-center text-[11px] border-b border-gray-900 pb-1.5">
                      <span className="text-zinc-400">Monthly Outreach Yield:</span>
                      <strong className="text-white">{calculatedMonthlyEmails.toLocaleString()} emails</strong>
                    </div>
                    
                    <div className="flex justify-between items-center text-[11px] border-b border-gray-900 pb-1.5">
                      <span className="text-zinc-400">Total Response Leads:</span>
                      <strong className="text-indigo-400 font-bold">{calculatedResponses} accounts</strong>
                    </div>

                    <div className="flex justify-between items-center text-[11px] border-b border-gray-900 pb-1.5">
                      <span className="text-zinc-400">Est. MQL trials created (15% sync):</span>
                      <strong className="text-purple-400 font-bold">{calculatedTrialsCreated} trials</strong>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-950">
                    <div className="text-[10px] text-zinc-500">Projected MRR added per month:</div>
                    <strong className="text-[#a855f7] text-xl font-display font-semibold block mt-0.5">
                      +${calculatedMonthlyMrrAdded.toLocaleString()} / mo
                    </strong>
                    <span className="text-[8.5px] text-emerald-400 font-medium mt-1 block">
                      Target contract value added: +${calculatedMonthlyArrAdded.toLocaleString()} ARR runrate
                    </span>
                  </div>
                </div>

                {/* Simulated CSO Advisory Comment box */}
                <div className="bg-slate-900/65 p-4 border border-indigo-950 rounded-lg flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[8.5px] uppercase text-indigo-400 font-bold block">ELT CRO & CFO Executive Counsel</span>
                    <strong className="text-white text-xs block mt-1">
                      {targetAverageSeatPrice < 100 
                        ? '⚠️ Margin Squeeze Risk Detected' 
                        : targetAverageSeatPrice > 250 
                        ? '🔥 Premium Segment Focus Required' 
                        : '✅ Balanced Tier Matrix'
                      }
                    </strong>
                    <p className="text-[10.5px] text-gray-400 leading-normal pt-1 font-sans">
                      {targetAverageSeatPrice < 100 
                        ? 'Pricing below $100 requires exceptionally high campaign volumes. This will increase domain burn risk and server memory overhead. Try to package whitelabel diagnostic options to keep average contract value above $150.'
                        : targetAverageSeatPrice > 250
                        ? 'Premium pricing targets higher-end midsize marketing agencies. Our outreach copywriter templates and bi-directional Salesforce connectors are critical selling hooks here.'
                        : 'Perfect. Pricing at $149 enables a sustainable payback of our core customer acquisition costs (under 4.2 months payback) while minimizing customer resistance during trials.'
                      }
                    </p>
                  </div>
                  
                  <div className="bg-slate-950 p-2 border border-gray-900 rounded text-[9.5px] text-zinc-400 mt-3 font-mono leading-relaxed">
                    <strong>Payback Matrix:</strong> Blended CAC: <strong className="text-purple-400">$380</strong> | Target LTV: <strong className="text-emerald-400">$3,458</strong> (9.1x Ratio)
                  </div>
                </div>

              </div>
            </div>

            {/* Complete Chronological Horizontal Operating Path */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Unified Chronological Operating Path</span>
                <span className="text-[10px] text-indigo-400 italic font-mono font-bold">10 to 100 Customer Core Road</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    id: 'days_1_30',
                    title: 'Phase 1: Days 1-30',
                    codename: 'Operation Warm-Freeze',
                    focus: 'Deliverability, seed stabilization & 10 Closed Beta trial conversions.',
                    target: 'Target: $1.5k MRR | 10 Customers'
                  },
                  {
                    id: 'days_31_60',
                    title: 'Phase 2: Days 31-60',
                    codename: 'Operation Resonance Scaling',
                    focus: 'Bi-sync HubSpot webhooks, Middle-East deployment & pipeline expansion.',
                    target: 'Target: $6.0k MRR | 40 Customers'
                  },
                  {
                    id: 'days_61_90',
                    title: 'Phase 3: Days 61-90',
                    codename: 'Operation Compound Revenue',
                    focus: 'Seat upsells ($45/mo), AI analytics dashboard & 100 paid users saturation.',
                    target: 'Target: $15.0k MRR | 100 Customers'
                  }
                ].map((ph, idx) => (
                  <button
                    key={ph.id}
                    onClick={() => setActiveTab(ph.id as any)}
                    className="p-4 bg-slate-950 border border-gray-900 hover:border-indigo-500/30 rounded-xl space-y-2 text-left cursor-pointer transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-indigo-400 uppercase">{ph.title}</span>
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <strong className="text-xs text-white block mt-0.5 font-display font-bold leading-tight group-hover:text-amber-300 transition-colors">{ph.codename}</strong>
                    <p className="text-[10.5px] text-zinc-400 leading-normal font-sans">{ph.focus}</p>
                    <div className="bg-slate-900 p-1.5 rounded border border-gray-950 font-mono text-[9.5px] text-zinc-400 mt-2 block">
                      {ph.target}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Functional Priorities Checklist */}
            <div className="bg-slate-950 border border-gray-900 p-5 rounded-xl space-y-4 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-900 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-white font-display">
                    Interactive Q3 Functional Task Checklist
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-sans">
                    Monitor chronological requirements mapped across critical departments. Toggle completion state below to track team performance.
                  </p>
                </div>
                
                {/* Visual statistics */}
                <div className="flex items-center gap-4 bg-slate-900 p-2 border border-gray-800 rounded-lg text-[10px]">
                  <div>
                    <span className="text-zinc-500 block leading-none">Completed</span>
                    <strong className="text-emerald-400 text-xs block mt-1 font-bold">{priorities.filter(t=>t.stage==='Completed').length} / {priorities.length}</strong>
                  </div>
                  <div className="border-l border-zinc-900 pl-3">
                    <span className="text-zinc-500 block leading-none">In-Progress</span>
                    <strong className="text-amber-400 text-xs block mt-1 font-bold">{priorities.filter(t=>t.stage==='In Progress').length}</strong>
                  </div>
                  <div className="border-l border-zinc-900 pl-3">
                    <span className="text-zinc-500 block leading-none">Pending/Locked</span>
                    <strong className="text-zinc-400 text-xs block mt-1 font-bold">{priorities.filter(t=>t.stage==='Pending').length}</strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {priorities.map((task) => (
                  <div 
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex items-start gap-2.5 hover:bg-slate-900/60 ${
                      task.stage === 'Completed'
                        ? 'bg-slate-900/30 border-emerald-950/40 text-stone-400'
                        : task.stage === 'In Progress'
                        ? 'bg-indigo-950/5 border-indigo-900/40 text-white'
                        : 'bg-slate-950 border-gray-900 text-zinc-300'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {task.stage === 'Completed' ? (
                        <div className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">✓</div>
                      ) : task.stage === 'In Progress' ? (
                        <div className="w-4 h-4 rounded-full border-2 border-indigo-500 animate-spin border-t-transparent"></div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-600"></div>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className={`text-[11px] leading-relaxed font-sans ${task.stage === 'Completed' ? 'line-through text-zinc-505' : ''}`}>
                        {task.title}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono select-none">
                        <span className="px-1.5 py-0.2 px-1 bg-slate-900/80 border border-gray-900 rounded text-zinc-400">
                          {task.dept}
                        </span>
                        
                        <span className={`px-1.5 py-0.2 rounded font-bold uppercase ${
                          task.period === 'days_1_30' ? 'text-emerald-400' : task.period === 'days_31_60' ? 'text-indigo-400' : 'text-purple-400'
                        }`}>
                          {task.period === 'days_1_30' ? 'D1-30' : task.period === 'days_31_60' ? 'D31-60' : 'D61-90'}
                        </span>

                        <span className={`px-1 rounded font-bold ${
                          task.stage === 'Completed' ? 'text-emerald-400 bg-emerald-950/10' : task.stage === 'In Progress' ? 'text-amber-400 bg-amber-950/10' : 'text-zinc-500 bg-zinc-950/20'
                        }`}>
                          {task.stage}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2, 3, 4: DETAIL PAGES FOR PLAN PERIODS */}
        {activeTab !== 'dashboard' && (
          <div className="space-y-6">
            
            {/* Period Title Segment */}
            <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                  {operatingPlan[activeTab].period} Operating Blueprint
                </span>
                <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-400" />
                  {operatingPlan[activeTab].codename}
                </h3>
                <p className="text-[10.5px] text-zinc-405 italic leading-relaxed font-sans">
                  "{operatingPlan[activeTab].subtitle}"
                </p>
              </div>

              {/* Status block info */}
              <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg border border-gray-800 shrink-0">
                <div className="text-right">
                  <span className="text-[8.5px] text-zinc-500 block uppercase font-bold">End of Period MRR</span>
                  <strong className="text-white text-base block font-display font-extrabold mt-0.5">
                    ${operatingPlan[activeTab].metrics.targetMrr.toLocaleString()} / mo
                  </strong>
                </div>
                <div className="border-l border-zinc-900 pl-3">
                  <span className="text-[8.5px] text-zinc-500 block uppercase font-bold">Target Paying Users</span>
                  <strong className="text-indigo-400 text-base block font-display font-extrabold mt-0.5">
                    {operatingPlan[activeTab].metrics.activeCustomers} accounts
                  </strong>
                </div>
              </div>
            </div>

            {/* Department Goals Framework - Detailed Columns */}
            <div className="font-mono text-xs text-zinc-400 space-y-4">
              
              <div className="p-4 bg-indigo-950/10 border border-indigo-900/20 rounded-xl space-y-1.5">
                <strong className="text-white text-sm font-display block">Primary Focus Period Agenda:</strong>
                <p className="text-zinc-300 font-sans leading-relaxed text-[11px]">
                  {operatingPlan[activeTab].primaryFocus}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Revenue Goals */}
                <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-2 hover:border-indigo-500/20 transition-all">
                  <div className="flex items-center gap-2 border-b border-gray-900 pb-2 mb-2">
                    <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <DollarSign className="w-3.5 h-3.5" />
                    </div>
                    <strong className="text-white text-xs uppercase tracking-wide">Revenue & Financial Goals</strong>
                  </div>
                  
                  <ul className="space-y-2 pl-4 list-disc text-[11px] leading-relaxed text-zinc-350 font-sans">
                    {operatingPlan[activeTab].goals.revenue.map((g, idx) => (
                      <li key={idx}>{g}</li>
                    ))}
                  </ul>
                </div>

                {/* 2. Customer Goals */}
                <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-2 hover:border-indigo-500/20 transition-all">
                  <div className="flex items-center gap-2 border-b border-gray-900 pb-2 mb-2">
                    <div className="w-6 h-6 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <strong className="text-white text-xs uppercase tracking-wide">Customer Success & Core Retention Goals</strong>
                  </div>
                  
                  <ul className="space-y-2 pl-4 list-disc text-[11px] leading-relaxed text-zinc-350 font-sans">
                    {operatingPlan[activeTab].goals.customer.map((g, idx) => (
                      <li key={idx}>{g}</li>
                    ))}
                  </ul>
                </div>

                {/* 3. Product Goals */}
                <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-2 hover:border-indigo-500/20 transition-all">
                  <div className="flex items-center gap-2 border-b border-gray-900 pb-2 mb-2">
                    <div className="w-6 h-6 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <strong className="text-white text-xs uppercase tracking-wide">Product Core Capabilities Goals</strong>
                  </div>
                  
                  <ul className="space-y-2 pl-4 list-disc text-[11px] leading-relaxed text-zinc-350 font-sans">
                    {operatingPlan[activeTab].goals.product.map((g, idx) => (
                      <li key={idx}>{g}</li>
                    ))}
                  </ul>
                </div>

                {/* 4. Engineering Goals */}
                <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-2 hover:border-indigo-500/20 transition-all">
                  <div className="flex items-center gap-2 border-b border-gray-900 pb-2 mb-2">
                    <div className="w-6 h-6 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <strong className="text-white text-xs uppercase tracking-wide">Systems Security & Engineering Goals</strong>
                  </div>
                  
                  <ul className="space-y-2 pl-4 list-disc text-[11px] leading-relaxed text-zinc-350 font-sans">
                    {operatingPlan[activeTab].goals.engineering.map((g, idx) => (
                      <li key={idx}>{g}</li>
                    ))}
                  </ul>
                </div>

                {/* 5. Marketing Goals */}
                <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-2 md:col-span-2 hover:border-indigo-500/20 transition-all">
                  <div className="flex items-center gap-2 border-b border-gray-900 pb-2 mb-2">
                    <div className="w-6 h-6 rounded bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center">
                      <Radio className="w-3.5 h-3.5" />
                    </div>
                    <strong className="text-white text-xs uppercase tracking-wide">Acquisition & GTM Marketing Goals</strong>
                  </div>
                  
                  <ul className="space-y-2 pl-4 list-disc text-[11px] leading-relaxed text-zinc-350 font-sans">
                    {operatingPlan[activeTab].goals.marketing.map((g, idx) => (
                      <li key={idx}>{g}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Tab Milestone Metrics tracker */}
            <div className="bg-slate-950 border border-gray-900 p-5 rounded-xl space-y-3 font-mono text-xs">
              <span className="text-[9px] text-[#818cf8] uppercase tracking-wider font-bold block">
                Period Critical Board-Reportable Deliverables
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {operatingPlan[activeTab].criticalMilestones.map((m, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 border border-gray-950 rounded-lg space-y-1.5 flex flex-col justify-between">
                    <div>
                      <strong className="text-white text-xs block font-display leading-tight">{m.title}</strong>
                      <span className="text-[9.5px] text-zinc-400 block mt-1 font-mono">Owner: {m.owner}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-[10px] pt-1">
                      <span className={`w-2 h-2 rounded-full ${m.completed ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                      <span className={m.completed ? 'text-emerald-400' : 'text-amber-405'}>
                        {m.completed ? 'Delivered' : 'Assumed Execution'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Critical Operating Threats & Mitigations Panel */}
      <div className="bg-slate-950 border border-amber-950 p-5 rounded-xl space-y-3 font-mono">
        <h3 className="text-sm font-semibold text-white font-display flex items-center gap-2">
          <ShieldAlert className="w-4.5 h-4.5 text-amber-500" />
          Critical Q3 Operating Defensibility & Guardrails
        </h3>
        <p className="text-[10.5px] text-zinc-400 font-sans leading-normal">
          The three critical risk factors identified by the CTO and COO during closed beta sandbox trials, with authorized mitigation procedures:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1.5">
          <div className="p-3 bg-slate-900/60 border border-gray-900 rounded-lg space-y-1 text-xs">
            <strong className="text-amber-400 text-xs block font-bold leading-tight">1. Outreach Domain Reputation Burns</strong>
            <p className="text-zinc-400 font-sans leading-relaxed text-[11px] pt-1">
              <strong>Risk:</strong> Sending too many unvalidated campaigns blocks MX proxies on Gmail and Yahoo server algorithms.
            </p>
            <p className="text-emerald-400 font-sans leading-relaxed text-[10.5px] pt-1">
              <strong>Procedural Shield:</strong> Run automatic sender address health checks and warm each domain for 21 days before dispatching client volume.
            </p>
          </div>

          <div className="p-3 bg-slate-900/60 border border-gray-900 rounded-lg space-y-1 text-xs">
            <strong className="text-amber-400 text-xs block font-bold leading-tight">2. Unpredictable LLM API Overages</strong>
            <p className="text-zinc-400 font-sans leading-relaxed text-[11px] pt-1">
              <strong>Risk:</strong> Infinite prompt optimization loops on the outreach copywriter can quickly inflate Google Cloud Gemini expenses.
            </p>
            <p className="text-emerald-400 font-sans leading-relaxed text-[10.5px] pt-1">
              <strong>Procedural Shield:</strong> Deploy rigorous server-side request throttling guides and alert admin nodes immediately if single-tenant daily query cost surpasses $12.
            </p>
          </div>

          <div className="p-3 bg-slate-900/60 border border-gray-900 rounded-lg space-y-1 text-xs">
            <strong className="text-amber-400 text-xs block font-bold leading-tight">3. Regional Middle-East Data Enclaves</strong>
            <p className="text-zinc-400 font-sans leading-relaxed text-[11px] pt-1">
              <strong>Risk:</strong> B2B sales lead scrapers mapping Emirati pharmaceutical entities violate regional data processing protocols.
            </p>
            <p className="text-emerald-400 font-sans leading-relaxed text-[10.5px] pt-1">
              <strong>Procedural Shield:</strong> Filter output to strictly isolate Middle-East entity scraping and back up compliance records inside isolated regional pods (Dubai).
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
