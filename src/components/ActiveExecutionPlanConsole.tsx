import React, { useState, useEffect } from 'react';
import { 
  Building2, ShieldCheck, DollarSign, Briefcase, Users, FileText, 
  Layers, Settings, Check, RefreshCw, HelpCircle, Sparkles, 
  TrendingUp, Compass, Award, ArrowUpRight, AlertTriangle, Shield, 
  Cpu, Network, Database, Globe, Landmark, ChevronRight, ArrowRight, 
  MessageSquare, LineChart, Coins, GitPullRequest, Calendar, CheckSquare, 
  Target, UserPlus, FileCheck, Landmark as FinanceIcon
} from 'lucide-react';

// Monthly operational milestone blueprints
interface MonthlyMilestone {
  month: number;
  title: string;
  department: 'Product' | 'Engineering' | 'Revenue' | 'Operations' | 'Finance';
  description: string;
  deliverables: string[];
  dependency: string;
}

const MONTHLY_MILESTONES_BLUEPRINTS: MonthlyMilestone[] = [
  {
    month: 1,
    title: 'SOC2 Launch & Dual-Enclave Prep',
    department: 'Engineering',
    description: 'Establish secure audit boundaries and complete foundational schema migration to TimescaleDB.',
    deliverables: ['Audit readiness criteria checklist co-signed', 'Encryption keys stored in sandboxed Hardware Security Modules'],
    dependency: 'Internal penetration testing validation data'
  },
  {
    month: 2,
    title: 'Double-Blind PII Scrubber Deploy',
    department: 'Product',
    description: 'Implement dynamic PII filters to sanitise raw prospecting databases before LLM processing.',
    deliverables: ['Real-time regex, NLP masking pipelines configured', 'Differential privacy noise generation toggles'],
    dependency: 'SOC2 data processing rules and legal oversight'
  },
  {
    month: 3,
    title: 'Healthcare & NPI Lookup Integrations',
    department: 'Revenue',
    description: 'Deploy direct license matching APIs for pharmaceutical GTM pilot teams.',
    deliverables: ['National Provider Identifier (NPI) verification flow', 'Veeva systems sync webhook listeners active'],
    dependency: 'Compliance approvals for clinical outreach networks'
  },
  {
    month: 4,
    title: 'Knowledge Graph alpha indexes',
    department: 'Engineering',
    description: 'Compile initial multi-hop CRM tables into unified entity-relationship formats.',
    deliverables: ['14.2M distinct company-to-buyer triplet nodes mapped', 'Dual-channel pg_vector search indices established'],
    dependency: 'Core database cluster scaling and server upgrades'
  },
  {
    month: 5,
    title: 'Dynamic Multi-tenant Portals',
    department: 'Operations',
    description: 'Offer dedicated branding assets and billing templates to outsourced lead agencies.',
    deliverables: ['White-label configuration module active', 'Tenant billing ledger integrated with Stripe Connect'],
    dependency: 'Dynamic organization token routing checks'
  },
  {
    month: 6,
    title: 'Agent Marketplace Sandbox beta',
    department: 'Product',
    description: 'Roll out the playground for third-party prompt creators and SDR developers.',
    deliverables: ['Isolating VM container execution rules active', 'Evaluation budget limiter configuration sliders'],
    dependency: 'Secure VPC egress rules configured by DevOps team'
  },
  {
    month: 7,
    title: 'Dynamic Stripe Webhooks sync',
    department: 'Finance',
    description: 'Integrate real-time usage parameters to automate variable query-credits invoicing.',
    deliverables: ['Stripe billing Connect accounts live', 'Usage overage automatic calculation handlers active'],
    dependency: 'Operations portal audit checklists co-signed'
  },
  {
    month: 8,
    title: 'Monte Carlo Forecaster Rollout',
    department: 'Finance',
    description: 'Deploy predictive mathematical run-rates and churn models with confidence intervals.',
    deliverables: ['D3 visual line regression plotting panels', 'Revenue impact stop-words filters established'],
    dependency: 'Historical ARR database tables populated'
  },
  {
    month: 9,
    title: 'Salesforce AppExchange Listings',
    department: 'Revenue',
    description: 'Launch official native integration apps in Salesforce and HubSpot GTM directories.',
    deliverables: ['AppExchange security review questionnaire complete', 'One-click CRM contact sync package live'],
    dependency: 'SOC2 Type II attestation certificate file'
  },
  {
    month: 10,
    title: 'Dynamic Domain Cooling Gates',
    department: 'Engineering',
    description: 'Build safe anti-spam triggers that auto-throttle sender outboxes on low-response alerts.',
    deliverables: ['Automatic MX record monitoring threads active', 'IP cooling sequence scheduling loops active'],
    dependency: 'AI SDR linear outbox routing code approval'
  },
  {
    month: 11,
    title: 'Sovereign VPC Deploy Templates',
    department: 'Operations',
    description: 'Establish automated CloudFormation and Terraform packages for institutional enclaves.',
    deliverables: ['Single-tenant infrastructure deployment scripts complete', 'Encrypted database replication pipelines verified'],
    dependency: 'AWS Nitro Private Enclave software license agreement'
  },
  {
    month: 12,
    title: 'Executive Financial Cockpit v1',
    department: 'Product',
    description: 'Assemble final high-density, real-time board dashboards combining accounting and product logs.',
    deliverables: ['Co-signed executive board summary reports exporter', 'Unified team KPI tracking ledger interface live'],
    dependency: 'All departments metrics schema standardisation'
  }
];

interface TeamHireBlueprint {
  role: string;
  department: 'Engineering' | 'Revenue' | 'Operations' | 'Finance' | 'Executive' | 'Product';
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  priority: 'Immediate' | 'High' | 'Strategic';
  annualCost: number;
  reason: string;
}

const HIRING_ROADMAP_BLUEPRINTS: TeamHireBlueprint[] = [
  { role: 'VP of Engineering', department: 'Engineering', quarter: 'Q1', priority: 'Immediate', annualCost: 195000, reason: 'To manage the scaling 20+ dev team and supervise security audits.' },
  { role: 'Security Compliance Architect', department: 'Engineering', quarter: 'Q1', priority: 'Immediate', annualCost: 165000, reason: 'For SOC2 hardening and AWS Nitro Enclave compliance.' },
  { role: 'Enterprise Account Executive', department: 'Revenue', quarter: 'Q2', priority: 'High', annualCost: 120000, reason: 'To convert growing mid-market pipeline into $45k+ ACV contracts.' },
  { role: 'Developer Relations Manager', department: 'Product', quarter: 'Q2', priority: 'Strategic', annualCost: 110000, reason: 'To seed the initial developer community for the Agent Marketplace.' },
  { role: 'Graph Database Engineer', department: 'Engineering', quarter: 'Q2', priority: 'High', annualCost: 175050, reason: 'To scale and optimise the dual-channel Revenue Knowledge Graph.' },
  { role: 'Billing Systems Specialist', department: 'Finance', quarter: 'Q3', priority: 'Strategic', annualCost: 95000, reason: 'To manage granular payment splits and Stripe webhook architectures.' },
  { role: 'Customer Success Coordinator', department: 'Operations', quarter: 'Q3', priority: 'Immediate', annualCost: 85000, reason: 'To handle user onboarding and maintain net negative churn filters.' },
  { role: 'VP of Strategic Partnerships', department: 'Executive', quarter: 'Q4', priority: 'Strategic', annualCost: 180000, reason: 'For global alliances with Salesforce, HubSpot, and healthcare EHRs.' }
];

export default function ActiveExecutionPlanConsole() {
  const [activeTab, setActiveTab] = useState<'summary' | 'quarterly' | 'monthly' | 'hiring' | 'simulator' | 'risks'>('summary');
  
  // Interactive Simulator variables
  const [salesWinRate, setSalesWinRate] = useState<number>(2.4); // % Win rate
  const [devSprintIndex, setDevSprintIndex] = useState<number>(90); // % Engineering output efficiency
  const [gtmMarketingSpend, setGtmMarketingSpend] = useState<number>(180000); // $ budget
  const [governanceScrutiny, setGovernanceScrutiny] = useState<'Standard' | 'Enterprise SOC2' | 'Sovereign Militant'>('Enterprise SOC2');

  // Calculated projections states
  const [simulatedEndArr, setSimulatedEndArr] = useState<number>(4200000);
  const [simulatedCustomers, setSimulatedCustomers] = useState<number>(145);
  const [simulatedBurnRate, setSimulatedBurnRate] = useState<number>(145000);
  const [simulatedRiskScore, setSimulatedRiskScore] = useState<number>(28);
  const [isProjecting, setIsProjecting] = useState<boolean>(false);

  // Active status variables
  const [checkedMilestones, setCheckedMilestones] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false
  });

  const toggleMilestone = (monthNum: number) => {
    setCheckedMilestones(prev => ({
      ...prev,
      [monthNum]: !prev[monthNum]
    }));
  };

  // Run planning models projection
  useEffect(() => {
    setIsProjecting(true);
    const timeOut = setTimeout(() => {
      let baseArr = 3200000; // $3.2M current ARR
      let baseCust = 65;
      let baseBurn = 120000;
      let baseRiskStatus = 35;

      // Sales Win Rate impact
      baseArr += (salesWinRate - 2.0) * 1400000;
      baseCust += Math.round((salesWinRate - 2.0) * 35);
      
      // Dev Sprint index impact
      baseArr += (devSprintIndex - 80) * 15000;
      baseRiskStatus -= (devSprintIndex - 80) * 0.35; // high efficiency drops technical risk

      // Marketing budget impact
      baseArr += (gtmMarketingSpend - 100000) * 4.5;
      baseCust += Math.round((gtmMarketingSpend - 100000) * 0.0002);
      baseBurn += (gtmMarketingSpend - 100000) * 0.35;

      // Governance Scrutiny
      if (governanceScrutiny === 'Sovereign Militant') {
        baseArr += 950000; // premium enterprise contracts
        baseBurn += 65000; // compliance labor expensive
        baseRiskStatus -= 20; // lower compliance security vulnerability
      } else if (governanceScrutiny === 'Standard') {
        baseArr -= 350000;
        baseRiskStatus += 24; // high security operations risk
      }

      setSimulatedEndArr(Math.max(1500000, Math.round(baseArr)));
      setSimulatedCustomers(Math.max(25, Math.round(baseCust)));
      setSimulatedBurnRate(Math.max(75000, Math.round(baseBurn)));
      setSimulatedRiskScore(Math.min(95, Math.max(5, Math.round(baseRiskStatus))));

      setIsProjecting(false);
    }, 550);

    return () => clearTimeout(timeOut);
  }, [salesWinRate, devSprintIndex, gtmMarketingSpend, governanceScrutiny]);

  return (
    <div id="active-execution-plan-console" className="space-y-8 animate-fadeIn text-slate-250">
      
      {/* 1. Dashboard Executive Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Target className="w-4 h-4 text-emerald-400 animate-pulse" />
            Strategic Operations Registry
          </div>
          <h1 className="text-2xl font-bold font-display text-white mt-1">
            Effective-BUZZ 12-Month Tactical Execution Plan
          </h1>
          <p className="text-xs text-gray-400 max-w-2xl mt-1 leading-relaxed">
            Consolidated operational matrix co-signed by **CEO, CTO, CPO, CRO, COO, and CFO**. Deploying high-fidelity R&D pathways to transform outbound prospecting into fully predictable corporate revenue arrays.
          </p>
        </div>

        {/* Global Context Indicators */}
        <div className="flex flex-wrap items-center gap-3 bg-zinc-950/40 p-2 border border-zinc-850 rounded-xl text-xs self-start lg:self-center">
          <div className="px-3 py-1 bg-zinc-900 rounded-lg">
            <span className="text-[10px] text-zinc-500 block font-mono">Current Run ARR</span>
            <span className="font-bold text-white font-mono">$3.2M Seed stage</span>
          </div>
          <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg">
            <span className="text-[10px] text-indigo-400 block font-mono">12-Month Target KPI</span>
            <span className="font-bold font-mono text-emerald-400">$10.0M ARR Horizon</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Switcher for 10 Required Sections */}
      <div className="bg-zinc-950/60 border border-zinc-800 p-1 rounded-xl flex flex-wrap gap-1">
        {[
          { id: 'summary', label: '1. Company Stage & Objectives', desc: 'Sections 1 & 2: Horizon targets' },
          { id: 'quarterly', label: '2. Quarterly Deliverables', desc: 'Section 3: Q1-Q4 roadmap' },
          { id: 'monthly', label: '3. Monthly Milestones Check-sheet', desc: 'Section 4: Months 1–12 checks' },
          { id: 'hiring', label: '4. Capital Allocation & Hiring', desc: 'Sections 5 & 6: Department quotas' },
          { id: 'simulator', label: '5. Tactical Strategy Simulator', desc: 'Sections 7 & 8: Interactive projections' },
          { id: 'risks', label: '6. Risk Register & Metrics', desc: 'Sections 9 & 10: Critical bounds' }
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => setActiveTab(btn.id as any)}
            className={`flex-1 min-w-[140px] text-left p-3 rounded-lg border transition duration-150 ${
              activeTab === btn.id
                ? 'bg-zinc-900 border-zinc-700 text-white shadow-md'
                : 'bg-transparent border-transparent text-gray-400 hover:bg-zinc-900/30 hover:text-white'
            }`}
          >
            <span className="text-xs font-bold block leading-none">{btn.label}</span>
            <p className="text-[9px] text-zinc-400 mt-1 block font-sans truncate">{btn.desc}</p>
          </button>
        ))}
      </div>

      {/* MAIN LAYOUT CANVAS */}
      <div className="bg-zinc-900/45 border border-zinc-800 rounded-2xl p-6 lg:p-8 backdrop-blur min-h-[400px]">
        
        {/* TAB 1: SECTION 1 (Current Company Stage) & SECTION 2 (Next 12-Month Objectives) */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">SECTION 1 & 2: Corporate Stage & 12-Month Global Objectives</h3>
              <p className="text-xs text-zinc-400 mt-1">Audit of of our current SaaS economics matrix and explicit performance targets designed for hyper-scale expansion.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* SECTION 1: Current Company Stage Card */}
              <div className="md:col-span-4 bg-zinc-950/60 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-[#818cf8] uppercase tracking-wider block font-bold">SECTION 1</span>
                  <h4 className="text-sm font-bold text-white">Current Company Stage Audit</h4>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
                  <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-805 space-y-1">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block">Capital Funding Profile</span>
                    <p className="text-white font-bold">$3.2M Seed Capital Runrate</p>
                    <p className="text-zinc-400 text-[11px]">Primary investors include elite B2B infrastructure tech partners.</p>
                  </div>

                  <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-805 space-y-1">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block">Active Product Footprint</span>
                    <p className="text-white font-bold">SDR Copywriter & Outbox v1.4</p>
                    <p className="text-zinc-400 text-[11px]">65 custom mid-market tenants actively routing outbound pipelines.</p>
                  </div>

                  <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 space-y-1">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block">Human Resource Capacity</span>
                    <p className="text-zinc-400">20 full-time operators across Engineering, Sales, and Support vectors.</p>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Next 12-Month Objectives (Revenue, Customer, Product, Infrastructure) */}
              <div className="md:col-span-8 space-y-5">
                <div>
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">SECTION 2</span>
                  <h4 className="text-sm font-bold text-white">Next 12-Month Objectives & Growth Vectors</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Revenue Goals */}
                  <div className="p-4 bg-zinc-950/40 border border-zinc-805 rounded-xl space-y-1.5 hover:border-zinc-700 transition">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono">
                      <DollarSign className="w-4 h-4 shrink-0" />
                      Revenue Goals
                    </div>
                    <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1 leading-normal">
                      <li>Achieve $10M ARR milestone by Month 12</li>
                      <li>Scale ACV (Annual Contract Value) to $35,000</li>
                      <li>Sustain Net Revenue Retention (NRR) &gt; 118%</li>
                    </ul>
                  </div>

                  {/* Customer Goals */}
                  <div className="p-4 bg-zinc-950/40 border border-zinc-805 rounded-xl space-y-1.5 hover:border-zinc-700 transition">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs font-mono">
                      <Users className="w-4 h-4 shrink-0" />
                      Customer Segment Goals
                    </div>
                    <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1 leading-normal">
                      <li>Acquire 250+ certified enterprise accounts</li>
                      <li>Maintain monthly logo churn rate &lt; 1.0%</li>
                      <li>Secure reference cases in SaaS & Fintech</li>
                    </ul>
                  </div>

                  {/* Product Goals */}
                  <div className="p-4 bg-zinc-950/40 border border-zinc-805 rounded-xl space-y-1.5 hover:border-zinc-700 transition">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
                      <Cpu className="w-4 h-4 shrink-0" />
                      Product Feature Goals
                    </div>
                    <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1 leading-normal">
                      <li>Release the double-blind PII stripping array</li>
                      <li>Deploy multi-hop dynamic entity mapper</li>
                      <li>Launch secure Developer Agent Marketplace</li>
                    </ul>
                  </div>

                  {/* Infrastructure Goals */}
                  <div className="p-4 bg-zinc-950/40 border border-zinc-805 rounded-xl space-y-1.5 hover:border-zinc-700 transition">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-xs font-mono">
                      <Database className="w-4 h-4 shrink-0" />
                      Infrastructure SLA Goals
                    </div>
                    <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1 leading-normal">
                      <li>Host operations inside AWS Nitro Private Enclaves</li>
                      <li>Transition database clusters to partitioned tables</li>
                      <li>Guaranteed 99.99% Core API Gateway uptime</li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: SECTION 3: Quarterly Deliverables Plan (Q1, Q2, Q3, Q4) */}
        {activeTab === 'quarterly' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">SECTION 3: Quarterly Chronological Execution Tracks</h3>
              <p className="text-xs text-zinc-400 mt-1">High-level tactical goals partitioned by year-quarters co-signed by operational architects.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Q1 Card */}
              <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3 relative hover:border-indigo-500/30 transition duration-200">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-indigo-400 font-bold font-mono">Q1 (MONTHS 1–3)</span>
                  <span className="text-[9px] bg-zinc-900 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">SECURITY GATE</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase font-display border-b border-zinc-900 pb-2">Platform Hardening</h4>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Hardening security perimeters, launching official SOC2 Type II audit trackers, and implementing raw outbox telemetry sanitizer vectors.
                </p>
                <div className="bg-zinc-900 p-2 border border-zinc-850/80 rounded text-[10px] font-mono text-zinc-300">
                  Focus: HIPAA & SOC2 Compliances
                </div>
              </div>

              {/* Q2 Card */}
              <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3 relative hover:border-indigo-500/30 transition duration-200">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-indigo-400 font-bold font-mono">Q2 (MONTHS 4–6)</span>
                  <span className="text-[9px] bg-zinc-900 text-indigo-300 px-1.5 py-0.5 rounded font-mono font-bold">GRAPH STACK</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase font-display border-b border-zinc-900 pb-2">Cognitive Relations</h4>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Inception of the Revenue Knowledge Graph. Deploying vector indices mapping B2B entities, signals, and dynamic company movements.
                </p>
                <div className="bg-zinc-900 p-2 border border-zinc-850/80 rounded text-[10px] font-mono text-zinc-300">
                  Focus: 14.2M Entity Graph Nodes
                </div>
              </div>

              {/* Q3 Card */}
              <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3 relative hover:border-indigo-500/30 transition duration-200">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-indigo-400 font-bold font-mono">Q3 (MONTHS 7–9)</span>
                  <span className="text-[9px] bg-zinc-900 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">ECOSYSTEM LIVE</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase font-display border-b border-zinc-900 pb-2">Agent Marketplace</h4>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Deploying sandboxed VM developer evaluation pipelines. Integrating Stripe Connect payment split mechanics to incentivize creators.
                </p>
                <div className="bg-zinc-900 p-2 border border-zinc-850/80 rounded text-[10px] font-mono text-zinc-300">
                  Focus: Developer Evaluation Limits
                </div>
              </div>

              {/* Q4 Card */}
              <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3 relative hover:border-indigo-500/30 transition duration-200">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-indigo-400 font-bold font-mono">Q4 (MONTHS 10–12)</span>
                  <span className="text-[9px] bg-zinc-900 text-[#a78bfa] px-1.5 py-0.5 rounded font-mono font-bold">CITADEL NODE</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase font-display border-b border-zinc-900 pb-2">Citadel Enterprise</h4>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Launching single-tenant private virtual node deploys. Integration with international currency settings and national directories.
                </p>
                <div className="bg-zinc-900 p-2 border border-zinc-850/80 rounded text-[10px] font-mono text-zinc-300">
                  Focus: Dedicated Single VPCs
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: SECTION 4: Monthly Milestones Check-sheet (Month 1-12) */}
        {activeTab === 'monthly' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">SECTION 4: Monthly Operational Task Milestones (Interact & Update)</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Toggle milestone check-boxes to simulate technical progression across the 12-month GTM runway.
              </p>
            </div>

            {/* List timeline of 12 months with checks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MONTHLY_MILESTONES_BLUEPRINTS.map(m => {
                const isChecked = !!checkedMilestones[m.month];
                return (
                  <div 
                    key={m.month}
                    className={`p-4 rounded-xl border transition-all duration-200 flex gap-3.5 relative overflow-hidden ${
                      isChecked 
                        ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400' 
                        : 'bg-zinc-950 border-zinc-850 text-white'
                    }`}
                  >
                    {/* Vertical Active Line Indicator */}
                    <div className={`absolute top-0 left-0 w-1 h-full ${
                      isChecked ? 'bg-emerald-500' : 'bg-indigo-500'
                    }`} />

                    {/* Interactive Checkbox */}
                    <button 
                      onClick={() => toggleMilestone(m.month)}
                      className={`h-5 w-5 shrink-0 rounded-md border flex items-center justify-center transition-colors mt-0.5 ${
                        isChecked 
                          ? 'bg-emerald-500 border-emerald-600 text-slate-950' 
                          : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[4]" />
                    </button>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex justify-between items-center flex-wrap gap-1">
                        <span className="font-mono text-[10px] text-indigo-400 font-bold uppercase">
                          Month {m.month} Milestone
                        </span>
                        <span className="text-[8.5px] font-mono bg-zinc-900 px-1.5 py-0.5 rounded text-gray-400 border border-zinc-800">
                          {m.department}
                        </span>
                      </div>
                      <h4 className={`text-xs font-bold font-display ${isChecked ? 'line-through text-zinc-500' : 'text-white'}`}>
                        {m.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-normal font-sans">
                        {m.description}
                      </p>
                      
                      {/* Deliverables lists */}
                      <div className="space-y-1 pt-1.5 border-t border-zinc-900">
                        <span className="text-[8px] font-mono uppercase text-zinc-500 block">Deliverables verification:</span>
                        <ul className="text-[10px] text-zinc-400 list-disc list-inside space-y-0.5 pl-1">
                          {m.deliverables.map((del, i) => (
                            <li key={i}>{del}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-[9px] font-mono text-zinc-550 pt-1">
                        Dependency: {m.dependency}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: SECTION 5 (Hiring Roadmap) & SECTION 6 (Revenue Roadmap) */}
        {activeTab === 'hiring' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">SECTION 5 & 6: Departmental Hiring Quotas & Revenue Roadmap</h3>
              <p className="text-xs text-zinc-400 mt-1">Audit of of our structural personnel requirements and direct sales pipeline burn allocations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Hiring roadmap Column */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-wider block font-bold">SECTION 5</span>
                  <h4 className="text-xs font-bold text-white uppercase font-display">Core Departmental Hiring Roadmap</h4>
                </div>

                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-2">
                  {HIRING_ROADMAP_BLUEPRINTS.map((h, i) => (
                    <div key={i} className="p-3.5 bg-zinc-950 border border-zinc-805 rounded-xl space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white font-display">{h.role}</span>
                        <span className="text-[9.5px] font-mono text-emerald-400 font-bold">${h.annualCost.toLocaleString()}/yr</span>
                      </div>
                      <div className="flex gap-2 text-[9px] font-mono text-zinc-400 pt-0.5">
                        <span className="bg-zinc-900 px-1 rounded border border-zinc-800">{h.department}</span>
                        <span className="bg-zinc-900 px-1 rounded border border-zinc-800">Target Quarter: {h.quarter}</span>
                        <span className="text-indigo-400 font-bold">Priority: {h.priority}</span>
                      </div>
                      <p className="text-[10.5px] text-zinc-400 font-sans pt-1 leading-normal">
                        Reason: {h.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue roadmap Column */}
              <div className="md:col-span-5 bg-zinc-950/60 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">SECTION 6</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Segment Revenue Allocation Structure</h4>
                </div>

                <div className="space-y-4 my-6">
                  <div className="bg-zinc-900 p-4 border border-zinc-805 rounded-lg space-y-1">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block">Target pricing ACV model</span>
                    <p className="text-xl font-bold text-white font-mono">$35,000 / Year Account ACV</p>
                    <p className="text-zinc-400 text-[11px] font-sans">Enables healthy customer acquisition payback triggers under 9 months.</p>
                  </div>

                  <div className="bg-zinc-900 p-4 border border-zinc-805 rounded-lg space-y-1">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block">Gross Margin Safety Bound</span>
                    <p className="text-xl font-bold text-emerald-400 font-mono">82% Minimum Baseline Target</p>
                    <p className="text-zinc-400 text-[11px] font-sans">Covers LLM inference token fees and cloud secure enclaves hosting buffers.</p>
                  </div>
                </div>

                <div className="bg-indigo-950/20 border border-indigo-950 p-3 rounded text-[10px] font-mono text-zinc-300">
                  Note: CFO models project operational breakeven by Month 9 under median expansion scenarios.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: SECTION 7 (Product Roadmap) & SECTION 8 (Infrastructure Roadmap) - Interactive Projections */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">SECTIONS 7 & 8: Tactical R&D & Systems Roadmap Simulator</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Slide parameters to see real-time projections of our Month 1-12 software deployment sprints and compute platform infrastructure scaling.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Simulator controls */}
              <div className="lg:col-span-5 bg-zinc-950/60 border border-zinc-800 p-6 rounded-2xl space-y-5">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">Simulator Controls</span>

                <div className="space-y-4">
                  
                  {/* Win speed rate */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-zinc-300">
                      <span>Outbound Conversion Rate Index</span>
                      <span className="text-emerald-400 font-bold">{salesWinRate}% Success Win</span>
                    </div>
                    <input 
                      type="range"
                      min="1.0"
                      max="6.0"
                      step="0.2"
                      value={salesWinRate}
                      onChange={(e) => setSalesWinRate(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-zinc-800 cursor-pointer h-1 rounded"
                    />
                  </div>

                  {/* Dev Sprint Index */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-zinc-300">
                      <span>Engineering Velocity Target</span>
                      <span className="text-indigo-400 font-bold">{devSprintIndex}% efficiency</span>
                    </div>
                    <input 
                      type="range"
                      min="60"
                      max="130"
                      value={devSprintIndex}
                      onChange={(e) => setDevSprintIndex(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-zinc-800 cursor-pointer h-1 rounded"
                    />
                  </div>

                  {/* GTM Marketing Spend */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-zinc-300">
                      <span>SDR Campaign Marketing Spend</span>
                      <span className="text-white font-bold">${gtmMarketingSpend.toLocaleString()} USD</span>
                    </div>
                    <input 
                      type="range"
                      min="50000"
                      max="350000"
                      step="25000"
                      value={gtmMarketingSpend}
                      onChange={(e) => setGtmMarketingSpend(Number(e.target.value))}
                      className="w-full accent-zinc-400 bg-zinc-800 cursor-pointer h-1 rounded"
                    />
                  </div>

                  {/* Governance Level */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase">Compliance Scrutiny Scale</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'Standard', label: 'Standard Filters' },
                        { id: 'Enterprise SOC2', label: 'SOC2 / HIPAA' },
                        { id: 'Sovereign Militant', label: 'BAA VPC Keys' }
                      ].map(lvl => (
                        <button
                          key={lvl.id}
                          onClick={() => setGovernanceScrutiny(lvl.id as any)}
                          className={`py-1.5 px-0.5 text-[9px] font-mono font-bold border rounded transition duration-100 ${
                            governanceScrutiny === lvl.id
                              ? 'bg-indigo-900 border-indigo-500 text-white shadow'
                              : 'bg-zinc-900 border-zinc-850 text-zinc-500 hover:text-zinc-350'
                          }`}
                        >
                          {lvl.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Simulator outputs */}
              <div className="lg:col-span-7 bg-zinc-950/60 border border-zinc-850 p-6 rounded-2xl flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">Year-End Run Projections</span>
                    <h4 className="text-xs text-zinc-400">Section 7 & 8 simulated metrics:</h4>
                  </div>
                  {isProjecting && <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />}
                </div>

                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="bg-zinc-900 p-4 border border-zinc-800 rounded-xl space-y-1">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block">Projected Year-End ARR</span>
                    <span className="text-xl font-bold font-mono text-emerald-400">${simulatedEndArr.toLocaleString()}</span>
                  </div>

                  <div className="bg-zinc-900 p-4 border border-zinc-800 rounded-xl space-y-1">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block">Total Customers Mapped</span>
                    <span className="text-xl font-bold font-mono text-white">{simulatedCustomers} Tenants</span>
                  </div>

                  <div className="bg-zinc-900 p-4 border border-zinc-800 rounded-xl space-y-1">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block">Monthly Capital Burn-rate</span>
                    <span className="text-xl font-bold font-mono text-red-400">${simulatedBurnRate.toLocaleString()}/mo</span>
                  </div>

                  <div className="bg-zinc-900 p-4 border border-zinc-800 rounded-xl space-y-1">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block">Calculated System Security Risk</span>
                    <span className={`text-xl font-bold font-mono ${simulatedRiskScore > 45 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {simulatedRiskScore}% Score
                    </span>
                  </div>
                </div>

                {/* Vertical execution metrics */}
                <div className="space-y-2 border-t border-zinc-850 pt-4">
                  <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                    SECTION 7 & 8 Technical Track Statuses
                  </span>
                  <div className="space-y-1.5 font-mono text-[10px] text-zinc-350">
                    <div className="flex justify-between">
                      <span>SECTION 7: Outbox writing sprint release confidence:</span>
                      <strong className="text-indigo-400">{Math.min(100, Math.round(devSprintIndex * 1.05))}% Confidence</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>SECTION 8: TimescaleDB replication target safety bounds:</span>
                      <strong className="text-emerald-400">99.993% SLA Verified</strong>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 6: SECTION 9 (Risk Register) & SECTION 10 (Success Criteria) */}
        {activeTab === 'risks' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display">SECTION 9 & 10: Strategic Risk Register & Success Matrix</h3>
              <p className="text-xs text-zinc-400 mt-1">Tactical analysis of corporate bottlenecks and objective verification keys approved by board members.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* SECTION 9: Risk Register */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-red-400 uppercase block font-bold">SECTION 9</span>
                  <h4 className="text-xs font-bold text-white uppercase font-display">Systemic Threat Matrix & Mitigations</h4>
                </div>

                <div className="space-y-3 font-sans text-xs">
                  
                  {/* Risk 1 */}
                  <div className="p-3.5 bg-zinc-950/60 border border-red-950 rounded-xl space-y-1">
                    <div className="flex justify-between items-center bg-red-950/25 px-2 py-0.5 rounded border border-red-900 border-opacity-30">
                      <span className="font-bold text-red-400 font-mono text-[9px] uppercase">1. Outbox Spam-Filter Flags</span>
                      <span className="text-[9px] text-red-500 font-mono font-bold">SEVERE RISK VULNERABILITY</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] pt-1 leading-normal">
                      Harsh security updates from email networks causing outbound SDR deliverability cascades.
                    </p>
                    <p className="text-emerald-400 text-[10px] font-mono pt-1">
                      Mitigation: Implement real-time MX records monitoring algorithms to dynamically switch proxy outboxes after Month 4.
                    </p>
                  </div>

                  {/* Risk 2 */}
                  <div className="p-3.5 bg-zinc-950/60 border border-zinc-805 rounded-xl space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white font-mono text-[9px] uppercase">2. Database Index Scaling Limits</span>
                      <span className="text-[9px] text-amber-500 font-mono font-bold">MEDIUM THREAT LEVEL</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-normal">
                      High-density vector records on pg_vector delaying multi-hop querying times above the 200ms target line.
                    </p>
                    <p className="text-indigo-300 text-[10px] font-mono pt-1">
                      Mitigation: Partition database index structures based on buyer geographical pods by Month 6.
                    </p>
                  </div>

                  {/* Risk 3 */}
                  <div className="p-3.5 bg-zinc-950/60 border border-zinc-805 rounded-xl space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white font-mono text-[9px] uppercase">3. Developer Onboarding Lags</span>
                      <span className="text-[9px] text-zinc-500 font-mono">STABILIZED RISK VECTOR</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-normal">
                      Delay in acquiring graph database experts slowing core capabilities implementation of the Knowledge Graph stack.
                    </p>
                    <p className="text-[#818cf8] text-[10px] font-mono pt-1">
                      Mitigation: Utilize dedicated external integration consultancies under secure BAA NDA contracts by Month 3.
                    </p>
                  </div>

                </div>
              </div>

              {/* SECTION 10: Success Criteria */}
              <div className="md:col-span-5 bg-zinc-950/60 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">SECTION 10</span>
                  <h4 className="text-sm font-bold text-white mt-1 font-display">Executive End-Year Success Thresholds</h4>
                </div>

                <div className="space-y-4 my-6 text-xs text-zinc-300">
                  
                  {/* CEO Threshold */}
                  <div className="flex gap-2 font-sans">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                      ✔
                    </div>
                    <div>
                      <strong className="text-white block font-mono text-[9px] uppercase leading-tight">CEO Verification Key:</strong>
                      <span className="text-zinc-400">Secure co-signed reference case studies with at least 5 different digital SDR agencies.</span>
                    </div>
                  </div>

                  {/* CTO/CPO Threshold */}
                  <div className="flex gap-2 font-sans">
                    <div className="h-5 w-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0">
                      ✔
                    </div>
                    <div>
                      <strong className="text-white block font-mono text-[9px] uppercase leading-tight">CTO/CPO Verification Key:</strong>
                      <span className="text-zinc-400">Complete 0% exfiltration leakage audit on HIPAA-compliant enclaves databases.</span>
                    </div>
                  </div>

                  {/* CFO Threshold */}
                  <div className="flex gap-2 font-sans">
                    <div className="h-5 w-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0">
                      ✔
                    </div>
                    <div>
                      <strong className="text-white block font-mono text-[9px] uppercase leading-tight">CFO Verification Key:</strong>
                      <span className="text-zinc-400">Establish dynamic recurring automated subscription billing engine maintaining NRR &gt; 118%.</span>
                    </div>
                  </div>

                </div>

                <div className="p-3 bg-zinc-900 border border-zinc-850 rounded text-[9.5px] font-mono text-zinc-500">
                  Ref Corporate Protocol: EB-EXE-VER-2026
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Signature Board Co-sign Footnote */}
      <div className="bg-zinc-950 p-6 border border-zinc-850 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <span className="text-emerald-400 font-bold block uppercase text-[10px]">CO-SIGNED & VALIDATED BY BOARD OF OFFICERS</span>
          <p className="text-zinc-400">EffectiveBuzz Platform Executive Leadership Council</p>
        </div>
        <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-zinc-300 uppercase">
          <span className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">CEO: Signed</span>
          <span className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">CTO: Signed</span>
          <span className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded font-bold text-indigo-400">CFI APPROVED</span>
        </div>
      </div>

    </div>
  );
}
