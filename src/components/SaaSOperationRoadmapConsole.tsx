import React, { useState, useEffect } from 'react';
import { 
  Compass, TrendingUp, Users, DollarSign, Cpu, Settings, 
  Map, CheckCircle, Radio, Clock, AlertCircle, ArrowUpRight, 
  Layers, Database, UserPlus, Zap, BarChart2, ShieldCheck
} from 'lucide-react';

interface MonthlyOperationalTarget {
  month: number;
  phase: string;
  mrrTarget: number;
  customerTarget: number;
  hiringRequirement: string;
  infraRequirement: string;
  milestoneTitle: string;
  deliverables: string[];
}

const BOOTSTRAP_ROADMAP_BLUEPRINTS: MonthlyOperationalTarget[] = [
  {
    month: 1,
    phase: 'Ideation & Inception',
    mrrTarget: 0,
    customerTarget: 0,
    hiringRequirement: 'Founder/Solopreneur focus',
    infraRequirement: 'Base Local Dev Sandbox setup',
    milestoneTitle: 'Outbox Alpha Prototype',
    deliverables: [
      'Implement central outbound email dispatch pipeline',
      'Deploy raw metadata schema on a standard local cluster',
      'Prepare initial SaaS copywriter script models'
    ]
  },
  {
    month: 2,
    phase: 'Inception & Validation',
    mrrTarget: 250,
    customerTarget: 1,
    hiringRequirement: 'Advisory/Technical Mentorship',
    infraRequirement: 'Database migration to cloud DB',
    milestoneTitle: 'First Paid Validation Pilot',
    deliverables: [
      'Onboard 1 strategic beta pilot using custom billing link',
      'Test raw lead deliverability and email domain cooling parameters',
      'Draft security parameters documentation'
    ]
  },
  {
    month: 3,
    phase: 'Validation & Warm Loops',
    mrrTarget: 750,
    customerTarget: 3,
    hiringRequirement: 'Contract Outsource Content Specialist',
    infraRequirement: 'Automated Daily Database Backups',
    milestoneTitle: 'Multi-Tenant Auth Engine Active',
    deliverables: [
      'Enable multiple organization namespaces and routing gates',
      'Generate initial double-blind PII stripping loops',
      'Validate email activity tracking log streams'
    ]
  },
  {
    month: 4,
    phase: 'Early Gravity Scaling',
    mrrTarget: 1500,
    customerTarget: 6,
    hiringRequirement: 'Part-Time Developer Contractor',
    infraRequirement: 'Nginx load balancing configurations',
    milestoneTitle: 'Stripe Billing Webhook Sync',
    deliverables: [
      'Connect dynamic usage credit matrices to Stripe invoicing',
      'Enable real-time Slack webhook telemetry logs',
      'Launch public "Building in Public" outreach campaigns'
    ]
  },
  {
    month: 5,
    phase: 'Early Gravity Scaling',
    mrrTarget: 2500,
    customerTarget: 10,
    hiringRequirement: 'Dedicated Lead Gen Freelancer',
    infraRequirement: 'Base API throttling gateways active',
    milestoneTitle: 'Apollo Integration Launch',
    deliverables: [
      'Automate B2B lead enrichment pipeline directly in-app',
      'Build localized dynamic contact tagging interfaces',
      'Optimize database write operations to avoid thread fatigue'
    ]
  },
  {
    month: 6,
    phase: 'Systemization Runway',
    mrrTarget: 3800,
    customerTarget: 15,
    hiringRequirement: 'First Full-Time React Developer',
    infraRequirement: 'Staging environment replication clusters',
    milestoneTitle: 'SDR Outbox Copilot v2',
    deliverables: [
      'Deploy localized prompt template evaluation playground',
      'Implement basic multi-domain warmers',
      'Establish incident reporting status panels'
    ]
  },
  {
    month: 7,
    phase: 'Systemization Runway',
    mrrTarget: 5000,
    customerTarget: 20,
    hiringRequirement: 'Customer Support and Success Agent',
    infraRequirement: 'SOC2 readiness monitoring setup',
    milestoneTitle: 'Incident Telemetry Gateways',
    deliverables: [
      'Establish <1 hour ticket resolution support SLAs',
      'Automate monthly activity reports exports for clients',
      'Conduct code audit to clean vulnerable dependency files'
    ]
  },
  {
    month: 8,
    phase: 'Acceleration Ramp',
    mrrTarget: 6200,
    customerTarget: 25,
    hiringRequirement: 'Technical Sales Executive recruiter',
    infraRequirement: 'TimescaleDB partitioned tables',
    milestoneTitle: 'CRM Dynamic Bidirectional Sync',
    deliverables: [
      'Integrate two-way contact status logs with HubSpot',
      'Reduce domain loading latency down below 120ms',
      'Deploy automated email deliverability diagnostic grids'
    ]
  },
  {
    month: 9,
    phase: 'Acceleration Ramp',
    mrrTarget: 7000,
    customerTarget: 28,
    hiringRequirement: 'Compliance Audit Consultant',
    infraRequirement: 'AWS Nitro Enclaves sandbox preparation',
    milestoneTitle: 'HIPAA and BAA Schema Audits',
    deliverables: [
      'Secure co-signed Business Associate Agreement templates',
      'Audit PII log database encryption vectors',
      'Publish secure enterprise platform compliance page'
    ]
  },
  {
    month: 10,
    phase: 'Enterprise Integration',
    mrrTarget: 8333, // 100k ARR Threshold
    customerTarget: 33,
    hiringRequirement: 'VP of Engineering / Growth Lead',
    infraRequirement: 'HIPAA Compliant Enclaves Active',
    milestoneTitle: 'First $100k ARR Milestone Reached',
    deliverables: [
      'Complete onboarding sequence for mid-market clients',
      'Establish dynamic custom pricing contract generation system',
      'Host direct technical showcase webinars with agency founders'
    ]
  },
  {
    month: 11,
    phase: 'Enterprise Integration',
    mrrTarget: 10000,
    customerTarget: 40,
    hiringRequirement: 'Lead GTM Data Scientist',
    infraRequirement: 'Multi-region Database replication',
    milestoneTitle: 'Agent Marketplace Beta Ingest',
    deliverables: [
      'Open VM sandboxed loops for third-party SDR templates',
      'Deploy secure Stripe Connect billing payout pipelines',
      'Verify 99.99% overall server uptime bounds'
    ]
  },
  {
    month: 12,
    phase: 'Predictable Revenue Cloud',
    mrrTarget: 12000, // Safe buffer above $100k ARR
    customerTarget: 48,
    hiringRequirement: 'Board Strategic Advisor team',
    infraRequirement: 'Single-Tenant Private VPC templates',
    milestoneTitle: 'Consolidated Board Operational Audit',
    deliverables: [
      'Sustain net raw customer satisfaction scores above 94%',
      'Deliver final operational metrics exporter to Seed board investors',
      'Automate dynamic domain cooling queues across 10,000+ active pools'
    ]
  }
];

export default function SaaSOperationRoadmapConsole() {
  const [activeStepTab, setActiveStepTab] = useState<'blueprint' | 'hiring_infra' | 'calculator'>('blueprint');
  const [selectedMonth, setSelectedMonth] = useState<number>(1);

  // Dynamic Simulator inputs for Zero-to-$100k ARR Runway
  const [targetAcv, setTargetAcv] = useState<number>(3000); // $ Annual Contract Value per customer
  const [monthlyCloses, setMonthlyCloses] = useState<number>(4); // New customers / Month
  const [mrrChurnRate, setMrrChurnRate] = useState<number>(2); // % monthly logo churn

  // Output calculations
  const [calculatedMonthsTo100k, setCalculatedMonthsTo100k] = useState<number>(10);
  const [achievableArr, setAchievableArr] = useState<number>(120000);
  const [peakCustomersNeeded, setPeakCustomersNeeded] = useState<number>(40);

  useEffect(() => {
    // Math logic modeling Month 1 to 12 MRR progression:
    // Monthly ARR needed for $100k is $8,333 MRR.
    const targetMrr = 8333;
    const monthlyArpu = targetAcv / 12; // ARPU per client
    
    let currentCustomers = 0;
    let currentMrr = 0;
    let monthsElapsed = 0;
    let reached = false;

    for (let m = 1; m <= 36; m++) {
      // Apply churn to previous month customers
      const churnedVal = currentCustomers * (mrrChurnRate / 100);
      currentCustomers = Math.max(0, currentCustomers - churnedVal + monthlyCloses);
      currentMrr = currentCustomers * monthlyArpu;

      if (currentMrr >= targetMrr && !reached) {
        monthsElapsed = m;
        reached = true;
      }
    }

    setCalculatedMonthsTo100k(reached ? monthsElapsed : 36);
    setAchievableArr(Math.round(currentMrr * 12));
    setPeakCustomersNeeded(Math.ceil(targetMrr / monthlyArpu));
  }, [targetAcv, monthlyCloses, mrrChurnRate]);

  const activeTargetDetails = BOOTSTRAP_ROADMAP_BLUEPRINTS.find(b => b.month === selectedMonth) || BOOTSTRAP_ROADMAP_BLUEPRINTS[0];

  return (
    <div id="saas-operation-roadmap" className="space-y-8 animate-fadeIn text-slate-100">
      
      {/* 1. Header Board */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Compass className="w-4 h-4 text-indigo-400 animate-spin" />
            SaaS Operational Accelerator Suite
          </div>
          <h1 className="text-2xl font-bold font-display text-white mt-1">
            Zero to $100k ARR Operational Roadmap
          </h1>
          <p className="text-xs text-gray-400 max-w-2xl mt-1 leading-relaxed">
            Co-signed tactical progression plan mapping the foundational runway from zero traction to a validated $100,000 Annual Run-Rate (ARR) for EffectiveBuzz.
          </p>
        </div>

        {/* ARR Status Badges */}
        <div className="flex flex-wrap items-center gap-3 bg-zinc-950/40 p-2 border border-zinc-850 rounded-xl text-xs self-start lg:self-center">
          <div className="px-3 py-1 bg-zinc-900 rounded-lg">
            <span className="text-[10px] text-zinc-500 block font-mono">ARR Goal State</span>
            <span className="font-bold text-white font-mono">$100,000 / Year</span>
          </div>
          <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg">
            <span className="text-[10px] text-indigo-400 block font-mono">Monthly Target MRR</span>
            <span className="font-bold font-mono text-emerald-400">$8,333 / Month</span>
          </div>
        </div>
      </div>

      {/* Interactive Growth Modeling Engine Dashboard */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <div className="border-b border-zinc-850 pb-4">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider pb-0.5">
            <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
            Interactive Traction Accelerator Model
          </div>
          <h3 className="text-base font-semibold text-white font-display">
            $0 ARR to $100k ARR Ramp Projection Simulator
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Tune average pricing levels, customer acquisition speed, and MRR logo churn assumptions to forecast exactly how many months separate the enterprise from a self-sustaining ARR runway.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Projections controls Column (5 span) */}
          <div className="lg:col-span-5 bg-zinc-950/50 border border-zinc-850 p-5 rounded-xl space-y-4">
            <span className="text-[10.5px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">
              Execution Variable Adjusters
            </span>

            {/* Target ACV Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Average Custom ACV (Annual)</span>
                <span className="text-emerald-400 font-bold">${targetAcv.toLocaleString()} / Yr</span>
              </div>
              <input 
                type="range"
                min="1200"
                max="12000"
                step="600"
                value={targetAcv}
                onChange={(e) => setTargetAcv(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-zinc-800 cursor-pointer h-1 rounded"
              />
              <span className="text-[10px] text-zinc-500 block">Est. Monthly ARPU: ${(targetAcv/12).toFixed(0)} / mo</span>
            </div>

            {/* Monthly Customer Closes */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Monthly Enterprise Client Closes</span>
                <span className="text-indigo-400 font-bold">+{monthlyCloses} accounts / mo</span>
              </div>
              <input 
                type="range"
                min="1"
                max="10"
                step="1"
                value={monthlyCloses}
                onChange={(e) => setMonthlyCloses(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-zinc-800 cursor-pointer h-1 rounded"
              />
            </div>

            {/* Logo Churn */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Monthly Subscriber Logo Churn</span>
                <span className="text-zinc-400 font-bold">{mrrChurnRate}% / mo</span>
              </div>
              <input 
                type="range"
                min="0"
                max="10"
                step="1"
                value={mrrChurnRate}
                onChange={(e) => setMrrChurnRate(Number(e.target.value))}
                className="w-full accent-zinc-500 bg-zinc-800 cursor-pointer h-1 rounded"
              />
            </div>
          </div>

          {/* Calculator outputs visualizer block (7 span) */}
          <div className="lg:col-span-7 bg-zinc-950/75 border border-zinc-850 p-6 rounded-xl flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-450 uppercase tracking-widest block font-bold pointer-events-none text-zinc-500">
              TACTICAL PROGRESSION PATH PREDICTORS
            </span>

            <div className="grid grid-cols-3 gap-4 my-4 font-mono text-center">
              <div className="bg-zinc-900/60 p-4 border border-zinc-850 rounded-lg">
                <span className="text-[9px] text-zinc-500 block uppercase mb-1">Time to $100k ARR</span>
                <span className="text-2xl font-bold text-white block">{calculatedMonthsTo100k} Months</span>
                <span className="text-[8px] text-indigo-400 block mt-0.5">At target close speed</span>
              </div>

              <div className="bg-zinc-900/60 p-4 border border-zinc-850 rounded-lg">
                <span className="text-[9px] text-zinc-500 block uppercase mb-1">Yearly End Runrate</span>
                <span className="text-2xl font-bold text-emerald-400 block">${achievableArr.toLocaleString()}</span>
                <span className="text-[8px] text-zinc-400 block mt-0.5">Sovereign forecast</span>
              </div>

              <div className="bg-zinc-900/60 p-4 border border-zinc-850 rounded-lg">
                <span className="text-[9px] text-zinc-500 block uppercase mb-1">Client Base Goal</span>
                <span className="text-2xl font-bold text-indigo-300 block">{peakCustomersNeeded} Clients</span>
                <span className="text-[8px] text-zinc-500 block mt-0.5">To maintain MRR line</span>
              </div>
            </div>

            <div className="bg-zinc-900 p-4 border border-zinc-805 rounded-lg text-xs space-y-1 font-sans">
              <strong className="text-white block font-mono text-[9px] uppercase tracking-wider text-indigo-400">
                SaaS Operator Strategy Feedback Loop:
              </strong>
              <p className="text-zinc-400 leading-normal">
                {calculatedMonthsTo100k <= 12 
                  ? '✔ OPTIMIZED SAAS GTM: This model validates that your team layout can comfortably hit $100k ARR within the first year. Maintain strict outbound outreach and focus on high payload conversion lines.'
                  : '⚠️ HIGH RISK TIMELINE: Reaching $100k ARR takes too long with these parameters. We recommend either raising pricing ACV bounds above $2,500/Yr or automating larger outbound lead volumes.'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Switchers for Content Tabs */}
      <div className="bg-zinc-950/60 border border-zinc-800 p-1 rounded-xl flex flex-col sm:flex-row gap-1">
        <button
          onClick={() => setActiveStepTab('blueprint')}
          className={`flex-1 py-3 px-4 text-xs font-bold rounded-lg border text-center transition ${
            activeStepTab === 'blueprint'
              ? 'bg-zinc-900 border-zinc-700 text-white shadow'
              : 'bg-transparent border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          1. Monthly Blueprint Timeline (Months 1–12)
        </button>
        <button
          onClick={() => setActiveStepTab('hiring_infra')}
          className={`flex-1 py-3 px-4 text-xs font-bold rounded-lg border text-center transition ${
            activeStepTab === 'hiring_infra'
              ? 'bg-zinc-900 border-zinc-700 text-white shadow'
              : 'bg-transparent border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          2. Combined Hiring & Systems Scaling Guide
        </button>
      </div>

      {/* DYNAMIC FOCUS SHEET */}
      <div className="bg-zinc-900/40 border border-zinc-850 p-6 lg:p-8 rounded-2xl backdrop-blur">
        
        {/* SUBTAB 1: MONTHLY BLUEPRINT TIMELINE */}
        {activeStepTab === 'blueprint' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-4 gap-4">
              <div>
                <h3 className="text-base font-semibold text-white font-display">1. Chronological $0 to $100k ARR Blueprint Matrix</h3>
                <p className="text-xs text-zinc-400">Select any month index to evaluate specific target customer metrics, product deliverables, and hiring quotas.</p>
              </div>

              {/* Month Selector Buttons wrap */}
              <div className="flex flex-wrap gap-1 max-w-sm">
                {BOOTSTRAP_ROADMAP_BLUEPRINTS.map(b => (
                  <button
                    key={b.month}
                    onClick={() => setSelectedMonth(b.month)}
                    className={`h-7 w-7 rounded font-mono text-xs font-bold transition flex items-center justify-center ${
                      selectedMonth === b.month
                        ? 'bg-indigo-500 text-white shadow font-extrabold'
                        : 'bg-zinc-950 text-gray-400 hover:text-white border border-zinc-850'
                    }`}
                  >
                    M{b.month}
                  </button>
                ))}
              </div>
            </div>

            {/* Detail Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 font-sans">
              
              {/* Left Month Summary Card (Month 1 to 12) */}
              <div className="md:col-span-5 bg-zinc-950 p-5 rounded-xl border border-zinc-805 space-y-4">
                <div className="border-b border-zinc-900 pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono tracking-widest block uppercase font-bold">
                      TIMELINES STAGE INDEX
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">
                      Month {activeTargetDetails.month}: {activeTargetDetails.phase}
                    </h4>
                  </div>
                  <span className="text-3xl font-mono text-indigo-400 font-bold opacity-30">M{activeTargetDetails.month}</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-zinc-900/60 rounded border border-zinc-850 flex justify-between">
                    <span>Target MRR Level:</span>
                    <strong className="text-emerald-400">${activeTargetDetails.mrrTarget.toLocaleString()}/mo</strong>
                  </div>
                  <div className="p-3 bg-zinc-900/60 rounded border border-zinc-850 flex justify-between">
                    <span>Active Premium Clients:</span>
                    <strong className="text-white">{activeTargetDetails.customerTarget} accounts</strong>
                  </div>
                  <div className="p-3 bg-zinc-900/60 rounded border border-zinc-850 flex justify-between">
                    <span>Est. Annualized Run-Rate ARR:</span>
                    <strong className="text-[#818cf8]">${(activeTargetDetails.mrrTarget * 12).toLocaleString()}/yr</strong>
                  </div>
                </div>
              </div>

              {/* Right Deliverables details panel (Month details) */}
              <div className="md:col-span-7 bg-zinc-950/30 border border-zinc-805 p-6 rounded-xl space-y-5">
                <div>
                  <span className="text-[10px] text-indigo-300 font-mono uppercase font-bold tracking-wider block">
                    Product and Feature Sprint Deliverables
                  </span>
                  <h4 className="text-sm font-bold text-white font-display mt-0.5">
                    {activeTargetDetails.milestoneTitle}
                  </h4>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-zinc-350">
                  <span className="uppercase text-[9px] font-mono font-bold text-zinc-500 block">Critical Verification Tasks Checklist:</span>
                  <ul className="list-disc list-inside space-y-1.5 pl-1 text-zinc-300">
                    {activeTargetDetails.deliverables.map((item, index) => (
                      <li key={index} className="leading-normal">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-4 mt-2 font-sans">
                    <div className="p-3 bg-zinc-900 rounded border border-zinc-850 space-y-1">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase block leading-none">Hiring Requirement quota:</span>
                      <strong className="text-zinc-300 font-mono text-[10px] leading-tight block">{activeTargetDetails.hiringRequirement}</strong>
                    </div>

                    <div className="p-3 bg-zinc-900 rounded border border-zinc-850 space-y-1">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase block leading-none">Infrastructure standard requirement:</span>
                      <strong className="text-emerald-400 font-mono text-[10px] leading-tight block">{activeTargetDetails.infraRequirement}</strong>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SUBTAB 2: COMBINED HIRING & SYSTEMS SCALING GUIDE */}
        {activeStepTab === 'hiring_infra' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">2. Departmental Human Capital & Infrastructure Progression Plan</h3>
              <p className="text-xs text-zinc-405 mt-1 font-sans">
                A structured analysis of core technical competencies, hiring profiles, and cloud architecture required to sustain growth safely.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-xs">
              
              {/* Hiring roadmap Block */}
              <div className="bg-zinc-950 p-6 border border-zinc-805 rounded-xl space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <span className="font-mono text-[#818cf8] uppercase tracking-wider block font-bold text-[10px]">
                    Departmental Hiring Tracks
                  </span>
                  <UserPlus className="w-4 h-4 text-indigo-400" />
                </div>

                <div className="space-y-3.5 leading-relaxed text-zinc-350">
                  <div className="p-3 bg-zinc-900/60 rounded border border-zinc-850 space-y-1">
                    <strong className="text-white font-display text-[11px] block">Month 1-3: Core Product Team</strong>
                    <p className="text-[10.5px]">Outsourced freelance template and first line dynamic writers to validate raw sequences with minimum immediate runway burn.</p>
                  </div>

                  <div className="p-3 bg-zinc-900/60 rounded border border-zinc-850 space-y-1">
                    <strong className="text-white font-display text-[11px] block">Month 4-6: Systemization Phase</strong>
                    <p className="text-[10.5px]">First full-time frontend developer to polish single-view dashboard transitions and ensure smooth webhook logs loading.</p>
                  </div>

                  <div className="p-3 bg-zinc-900/60 rounded border border-zinc-850 space-y-1">
                    <strong className="text-white font-display text-[11px] block">Month 7-12: Hyper-Acceleration Stage</strong>
                    <p className="text-[10.5px]">Full-time developer SDR managers to recruit custom regional agencies and standard support SLA coordinators.</p>
                  </div>
                </div>
              </div>

              {/* Systems infrastructure scaling Block */}
              <div className="bg-zinc-950 p-6 border border-zinc-850 rounded-xl space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <span className="font-mono text-emerald-400 uppercase tracking-wider block font-bold text-[10px]">
                    Systems Infrastructure Tracks
                  </span>
                  <Database className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="space-y-3.5 leading-relaxed text-zinc-300">
                  <div className="p-3 bg-zinc-900/60 rounded border border-zinc-805 space-y-1">
                    <strong className="text-white font-display text-[11px] block">Month 1-3: Setup and Security Gates</strong>
                    <p className="text-zinc-400 text-[10.5px]">Encrypted pg_vector tables mapping raw CRM entities. Standard automated daily database backup rules active.</p>
                  </div>

                  <div className="p-3 bg-zinc-900/60 rounded border border-zinc-850 space-y-1">
                    <strong className="text-white font-display text-[11px] block">Month 4-6: Load & API Optimizers</strong>
                    <p className="text-zinc-400 text-[10.5px]">NGINX proxy controllers to monitor and throttle client API endpoints to secure 99.9% server responsiveness.</p>
                  </div>

                  <div className="p-3 bg-zinc-900/60 rounded border border-zinc-850 space-y-1">
                    <strong className="text-white font-display text-[11px] block">Month 7-12: HIPAA Secure VPCs</strong>
                    <p className="text-zinc-400 text-[10.5px]">Deploying client custom tenants on AWS Nitro secure hardware modules to safely process pharmaceutical data streams.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Signature Board Co-sign Footnote */}
      <div className="bg-zinc-950 p-6 border border-zinc-850 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <span className="text-emerald-400 font-bold block uppercase text-[10px]">CO-SIGNED & VALIDATED BY BOARD FOR SEED RUNNERS</span>
          <p className="text-zinc-400">EffectiveBuzz Strategic Inception Ledger Blueprint: EB-SOP-M01D12</p>
        </div>
        <div className="text-[10px] text-zinc-550 italic uppercase sm:text-right">
          Last Strategic Re-indexing Date: June 2026
        </div>
      </div>

    </div>
  );
}
