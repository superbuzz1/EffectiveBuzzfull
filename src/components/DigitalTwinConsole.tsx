import React, { useState, useEffect } from 'react';
import { 
  Network, Server, Database, Layers, ShieldCheck, Heart, Sparkles, Sliders, 
  Settings, MessageSquare, Compass, BarChart, BookOpen, AlertTriangle, Cpu, 
  Mail, GitPullRequest, CreditCard, Shield, Users, Building2, Globe, Landmark, 
  Award, DollarSign, Activity, TrendingUp, RefreshCw, Layers3, PlaySquare, ArrowRight,
  Zap, ToggleLeft, ToggleRight, CheckSquare, Sparkle, Search, HelpCircle, HardDrive
} from 'lucide-react';

interface EntityNode {
  id: string;
  label: string;
  icon: any;
  category: 'product' | 'customer' | 'revenue' | 'infra' | 'ops';
  description: string;
  attributes: { name: string; type: string; desc: string }[];
}

export default function DigitalTwinConsole() {
  const [activeTab, setActiveTab] = useState<'entity' | 'sources' | 'sim' | 'decision' | 'forecast'>('entity');
  const [selectedEntityId, setSelectedEntityId] = useState<string>('product_seq');
  
  // Simulation Sliders React State
  const [dnsWizardCompletion, setDnsWizardCompletion] = useState<number>(40); // 40% (10% to 100%)
  const [mailboxLimitEnforce, setMailboxLimitEnforce] = useState<boolean>(false); // Strict rules or not
  const [sovereignPodsDeploy, setSovereignPodsDeploy] = useState<boolean>(false); // Unlocks local data residency
  const [aiSandboxLaunch, setAiSandboxLaunch] = useState<boolean>(false); // Increases visitor-to-signup rate

  // Decision Engine state
  const [activeDecisionScenario, setActiveDecisionScenario] = useState<'dns_churn' | 'seat_theft' | 'cpu_spike' | 'gcc_sovereign'>('dns_churn');
  const [decisionOutput, setDecisionOutput] = useState<{
    status: string;
    analysis: string;
    actions: string[];
    riskScore: number;
  } | null>(null);
  const [isRunningDecision, setIsRunningDecision] = useState<boolean>(false);

  // Live Data Pipeline Events (Visual feed)
  const [dataEvents, setDataEvents] = useState<{ id: string; time: string; source: string; message: string; type: 'success' | 'warning' | 'info' }[]>([]);
  const [isFeedPaused, setIsFeedPaused] = useState<boolean>(false);

  // Baseline, high-fidelity constants
  const baseARR = 1248000;
  const baseSupportTickets = 180;
  const baseActivationRate = 40;
  const baseVisitorToSignup = 7.0;

  // Derive Dynamic Calculations
  const calculatedVisitorToSignup = aiSandboxLaunch ? 11.5 : baseVisitorToSignup;
  const simulatedSignupsCount = Math.round(45000 * (calculatedVisitorToSignup / 100));
  
  const simulatedActivationRate = Math.round(baseActivationRate + (dnsWizardCompletion - 40) * 0.5);
  const simulatedActiveSdrActivations = Math.round(simulatedSignupsCount * (simulatedActivationRate / 100));
  
  const simulatedSupportTickets = Math.max(18, Math.round(baseSupportTickets - (dnsWizardCompletion - 40) * 1.8));
  
  const simulatedSeatExpansionARR = mailboxLimitEnforce ? 193000 : 45000;
  const simulatedSovereignPipelineARR = sovereignPodsDeploy ? 1400000 : 0;
  const simulatedValuePerClient = 31200;
  
  const simulatedAcquisitionsARR = Math.round((simulatedActiveSdrActivations * 0.05) * simulatedValuePerClient);
  
  const currentSimulatedARR = baseARR + simulatedSeatExpansionARR + simulatedSovereignPipelineARR + (aiSandboxLaunch ? 245000 : 0);
  const currentSimulatedLTV = Math.round(31200 * (1 + (dnsWizardCompletion / 200)));
  const currentSimulatedCAC = Math.round(3428 / (sovereignPodsDeploy ? 1.15 : 1.0));
  const currentLtvToCac = (currentSimulatedLTV / currentSimulatedCAC).toFixed(1);

  // Ingest stream events simulation
  useEffect(() => {
    if (isFeedPaused) return;
    const sources = ['CDC Postgres', 'Stripe Hook', 'Prometheus Ingest', 'SMTP Mailhook', 'Gemini Router'];
    const msgs = [
      'Upsert completed in CRM dataset for lead_id ',
      'Invoice payment captured successfully for account_id acct_',
      'API gateway queries routed to Gemini-3.5-Flash (latency: 195ms)',
      'Spam check completed: SPF pass, DKIM validation aligned',
      'Cognitive token route optimized to flash tier saving 0.04 microcents',
      'Tenant seat sharing trigger alerted on account profile_limit: '
    ];

    const interval = setInterval(() => {
      setDataEvents(prev => {
        const sourceIndex = Math.floor(Math.random() * sources.length);
        const s = sources[sourceIndex];
        const m = msgs[Math.floor(Math.random() * msgs.length)] + Math.floor(Math.random() * 900 + 100);
        const typ = m.includes('saving') || m.includes('aligned') || m.includes('captured') ? 'success' : m.includes('limit') ? 'warning' : 'info';
        
        const newEv = {
          id: `ev-${Date.now()}-${Math.random()}`,
          time: new Date().toLocaleTimeString(),
          source: s,
          message: m,
          type: typ as any
        };
        return [newEv, ...prev.slice(0, 14)];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isFeedPaused]);

  // Setup initial feed elements
  useEffect(() => {
    setDataEvents([
      { id: '1', time: '10:14:02 AM', source: 'CDC Postgres', message: 'Read master row replica for dim_customers_crm', type: 'info' },
      { id: '2', time: '10:14:15 AM', source: 'Stripe Hook', message: 'Invoice payment captured successfully for account_id acct_891', type: 'success' },
      { id: '3', time: '10:14:26 AM', source: 'Prometheus Ingest', message: 'Polled health status indicator. Port 3000 ingress online', type: 'success' },
      { id: '4', time: '10:14:38 AM', source: 'SMTP Mailhook', message: 'Deliverability alert: SPF failing status on workspace node e6b', type: 'warning' }
    ]);
  }, []);

  const triggerDecisionEngine = () => {
    setIsRunningDecision(true);
    setDecisionOutput(null);
    setTimeout(() => {
      setIsRunningDecision(false);
      if (activeDecisionScenario === 'dns_churn') {
        setDecisionOutput({
          status: 'ACTION GRANTED - RUNTIME CONFIGURED',
          analysis: 'DMARC/SPF onboarding hurdles cause 42% of customer service inquiries. The twin recommends hot-deploying the diagnostic micro-wizard directly inside client accounts on day-1 of registration.',
          actions: [
            'Trigger step 1 in-app DNS diagnostic wizard layout to client accounts',
            'Redirect domain validation traffic to fast DNS ping test endpoints',
            'Decrease target customer support team ticket queue count estimation by 40%'
          ],
          riskScore: 24
        });
      } else if (activeDecisionScenario === 'seat_theft') {
        setDecisionOutput({
          status: 'COGNITIVE OPTIMIZATION TRIGGERED',
          analysis: 'License audits report that several professional client accounts share a single login token to use multiple outboxes. Enforcing automatic limit checks will upgrade ARR velocity.',
          actions: [
            'Clamp outbound sequences to 3 mailbox accounts limit per user license seat',
            'Deploy dynamic billing checkout surcharge gateway on Stripe for extra mailboxes',
            'Trigger soft contextual warning to overlapping tenant administrations'
          ],
          riskScore: 12
        });
      } else if (activeDecisionScenario === 'cpu_spike') {
        setDecisionOutput({
          status: 'LATENCY AUTOPILOT ADJUSTMENT',
          analysis: 'Platform response times scaled past 300ms during sequence campaigns synthesis. The cognitive router automatically partitions simple response generation workloads to Gemini Flash.',
          actions: [
            'Direct standard response classifications to fast Gemini-3.5-Flash pod',
            'Hedge core heavy sequence analysis tasks for full model executions',
            'Reduce blended infrastructure cost per million tokens from $0.85 standard to $0.55'
          ],
          riskScore: 8
        });
      } else if (activeDecisionScenario === 'gcc_sovereign') {
        setDecisionOutput({
          status: 'COMPLIANCE BRIDGE TRIGGERED',
          analysis: 'Stalled pipeline audit detects $1.4M in high-value sales deals requiring strict localized cloud structures in Europe and GCC regions. Deploying geo-replicated slices clears compliance fences.',
          actions: [
            'Initiate Frankfurt AWS and Dubai Moro Hub virtual partition pools',
            'Map isolated logical customer tables to targeted physical database zones',
            'Unblock pipeline with strict compliance certificates presentation'
          ],
          riskScore: 18
        });
      }
    }, 1100);
  };

  // Entity Model Data definition representing the entire enterprise
  const entityNetwork: Record<string, EntityNode> = {
    product_seq: {
      id: 'product_seq',
      label: 'Campaign Sequences Engine',
      icon: MessageSquare,
      category: 'product',
      description: 'The core outbound delivery manager, routing automated sequences, verifying SPF headers, and utilizing cognitive routers.',
      attributes: [
        { name: 'routing_policy', type: 'ENUM [flash_priority, quality_priority]', desc: 'Directs sequence text classification workflows.' },
        { name: 'daily_limit', type: 'INTEGER', desc: 'Sets max outreach volumes permitted over accounts.' },
        { name: 'token_cost_average', type: 'DECIMAL (microcents)', desc: 'Measures structural model billing efficiency.' }
      ]
    },
    crm_leads: {
      id: 'crm_leads',
      label: 'Multi-Tenant Lead CRM',
      icon: Users,
      category: 'customer',
      description: 'The secure lead repository, executing customer data isolation rules, lead scores, and tracking SPF delivery records.',
      attributes: [
        { name: 'lead_score_index', type: 'INTEGER (1-100)', desc: 'Calculates structural prospect fitness scores.' },
        { name: 'spf_dkim_aligned', type: 'BOOLEAN', desc: 'Monitors domain health to bypass provider spam traps.' },
        { name: 'lifecycle_state', type: 'ENUM [lead, contact, customer]', desc: 'Tracks status variations for sales attribution.' }
      ]
    },
    revenue_stripe: {
      id: 'revenue_stripe',
      label: 'Stripe Billing System',
      icon: CreditCard,
      category: 'revenue',
      description: 'Governs recurring client subscriptions, enforces mailbox seat boundaries, and audits revenue expansions.',
      attributes: [
        { name: 'base_mrr_value', type: 'DECIMAL', desc: 'Base recurring income collected monthly.' },
        { name: 'seat_overage_charge', type: 'DECIMAL ($45/mo)', desc: 'Automatic charging for excessive profile limits.' },
        { name: 'customer_nrr_factor', type: 'DECIMAL', desc: 'Calculates cohort expand ratios for series A audits.' }
      ]
    },
    infra_gcp: {
      id: 'infra_gcp',
      label: 'GCP Cloud Infrastructure',
      icon: HardDrive,
      category: 'infra',
      description: 'Handles container clusters running Express, tracking system latency, uptime pings, and localized database replicas.',
      attributes: [
        { name: 'api_latency_ms', type: 'DECIMAL (ms)', desc: 'Average query response delay in ms.' },
        { name: 'geo_isolation_pods', type: 'BOOLEAN', desc: 'True if client segments are routed to localized physical assets.' },
        { name: 'concurrency_channels', type: 'INTEGER', desc: 'Tracks active websocket campaign deliveries.' }
      ]
    },
    marketing_funnel: {
      id: 'marketing_funnel',
      label: 'Organic Marketing Funnel',
      icon: Sparkles,
      category: 'ops',
      description: 'Maps inbound traffic rates, visitor-to-signup conversion points, and public sandbox activations.',
      attributes: [
        { name: 'uniques_monthly', type: 'INTEGER (45,000)', desc: 'Absolute traffic landing on client public pages.' },
        { name: 'visitor_signup_ratio', type: 'DECIMAL (%)', desc: 'Current traffic signup rate (Simulated: ' + calculatedVisitorToSignup + '%).' },
        { name: 'activation_time_value', type: 'INTEGER (days)', desc: 'Elapsed timeframe before customer sets custom DNS keys.' }
      ]
    }
  };

  const selectedEntity = entityNetwork[selectedEntityId] || entityNetwork.product_seq;

  return (
    <div className="space-y-6">
      {/* Dynamic Digital Twin Banner */}
      <div className="bg-gradient-to-r from-[#10b981]/15 via-indigo-500/5 to-transparent border border-emerald-900/30 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-[#10b981]/10 text-[#10b981] text-xs font-mono font-bold uppercase tracking-wider">
                Enterprise Eidolon Replica
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Real-Time Company Twin v1.02</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300">
              Project Eidolon: EffectiveBuzz Company-Wide Cognitive Twin
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              An architect-designed live twin linking Product telemetry, Customer behavior indices, Revenue models, and Infrastructure compute. Simulates growth triggers and runs automated cognitive playbooks.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-emerald-400">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Telemetry: Connected</span>
          </div>
        </div>
      </div>

      {/* Main Feature Tab Swapper */}
      <div className="flex border-b border-zinc-800 pb-0.5 gap-4">
        {[
          { id: 'entity', label: '1. Entity Model Mapping', icon: Network, color: 'text-emerald-400' },
          { id: 'sources', label: '2. Real-time Streams Ingest', icon: Database, color: 'text-indigo-400' },
          { id: 'sim', label: '3. What-If Parametric Engine', icon: Sliders, color: 'text-amber-400' },
          { id: 'decision', label: '4. Cognitive Decision Engine', icon: Cpu, color: 'text-pink-400' },
          { id: 'forecast', label: '5. Time-Series Projections', icon: TrendingUp, color: 'text-blue-400' }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-white font-bold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-400'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Workspace Display Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* 1. ENTITY MODEL VIEWPORT */}
        {activeTab === 'entity' && (
          <React.Fragment>
            {/* Interactive entity network topology layout graph map */}
            <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Enterprise Component Graph Topology</span>
                <p className="text-xs text-zinc-400 leading-normal">
                  View structural links across operational systems. Click on any component to inspect its live DB schema metadata mapping.
                </p>
              </div>

              {/* Dynamic Interactive Node Canvas */}
              <div className="relative bg-slate-950 border border-slate-900 rounded-xl p-8 min-h-[300px] flex flex-col justify-between items-center overflow-hidden">
                
                {/* SVG Connections Layer (Backdrop) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <line x1="50%" y1="20%" x2="20%" y2="50%" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
                  <line x1="50%" y1="20%" x2="80%" y2="50%" stroke="#818cf8" strokeWidth="2" />
                  <line x1="20%" y1="50%" x2="50%" y2="85%" stroke="#34d399" strokeWidth="2" />
                  <line x1="80%" y1="50%" x2="50%" y2="85%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" />
                  <line x1="50%" y1="20%" x2="50%" y2="85%" stroke="#f59e0b" strokeWidth="1" />
                </svg>

                {/* Top Node (Product Seq Engine) */}
                <button
                  onClick={() => setSelectedEntityId('product_seq')}
                  className={`relative z-10 px-4 py-2.5 rounded-lg border transition-all cursor-pointer font-mono text-xs flex items-center gap-2 ${
                    selectedEntityId === 'product_seq'
                      ? 'bg-[#10b981]/15 border-[#10b981] text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Product Sequences Engine</span>
                </button>

                {/* Middle Left and Middle Right Nodes */}
                <div className="w-full flex justify-between px-2 md:px-12 my-6">
                  <button
                    onClick={() => setSelectedEntityId('marketing_funnel')}
                    className={`relative z-10 px-4 py-2.5 rounded-lg border transition-all cursor-pointer font-mono text-xs flex items-center gap-2 ${
                      selectedEntityId === 'marketing_funnel'
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg'
                        : 'bg-slate-900 border-slate-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Inbound Funnel Tracker</span>
                  </button>

                  <button
                    onClick={() => setSelectedEntityId('revenue_stripe')}
                    className={`relative z-10 px-4 py-2.5 rounded-lg border transition-all cursor-pointer font-mono text-xs flex items-center gap-2 ${
                      selectedEntityId === 'revenue_stripe'
                        ? 'bg-indigo-500/15 border-indigo-500 text-white shadow-lg'
                        : 'bg-slate-900 border-slate-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Stripe Billing Ledger</span>
                  </button>
                </div>

                {/* Lower Middle Nodes */}
                <div className="w-full flex justify-around px-8 mb-4">
                  <button
                    onClick={() => setSelectedEntityId('crm_leads')}
                    className={`relative z-10 px-4 py-2.5 rounded-lg border transition-all cursor-pointer font-mono text-xs flex items-center gap-2 ${
                      selectedEntityId === 'crm_leads'
                        ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg'
                        : 'bg-slate-900 border-slate-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Multi-Tenant Prospect CRM</span>
                  </button>

                  <button
                    onClick={() => setSelectedEntityId('infra_gcp')}
                    className={`relative z-10 px-4 py-2.5 rounded-lg border transition-all cursor-pointer font-mono text-xs flex items-center gap-2 ${
                      selectedEntityId === 'infra_gcp'
                        ? 'bg-pink-500/15 border-pink-500 text-white shadow-lg'
                        : 'bg-slate-900 border-slate-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <HardDrive className="w-3.5 h-3.5 text-pink-400" />
                    <span>GCP Cluster Nodes</span>
                  </button>
                </div>

                <div className="text-[10px] text-zinc-500 font-mono mt-2">
                  Interactive State Layer — Links represents direct functional causal vectors
                </div>
              </div>
            </div>

            {/* Inspect Entity Details on Right */}
            <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] p-5 rounded-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2.5 border-b border-zinc-800">
                  <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                    <Database className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase">{selectedEntity.label}</h4>
                    <span className="text-[9px] text-zinc-500 font-mono">Component Metadata Schema Attributes</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-normal font-mono">
                  {selectedEntity.description}
                </p>

                {/* Attributes specifications */}
                <div className="space-y-2 pt-1">
                  {selectedEntity.attributes.map((attr, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-900 space-y-1">
                      <div className="flex justify-between items-center text-[10.5px] font-mono">
                        <strong className="text-white font-semibold flex items-center gap-1">
                          <span className="text-[#10b981]">▸</span> {attr.name}
                        </strong>
                        <span className="px-1 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 text-[8.5px] font-bold">
                          {attr.type}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-mono pl-3">{attr.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-zinc-900/40 rounded-xl border border-zinc-805 text-[10px] text-zinc-500 font-mono leading-relaxed">
                <strong>Structural Linkage:</strong> Modifying parameters associated with these variables updates company-wide calculations in real-time on our projection engines.
              </div>
            </div>
          </React.Fragment>
        )}

        {/* 2. REAL-TIME DATA STREAM INGEST VIEWPORT */}
        {activeTab === 'sources' && (
          <div className="lg:col-span-12 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4 font-mono">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Live Stream Ingest pipelines (CDC Hub)</span>
                <p className="text-xs text-zinc-500 leading-normal">
                  Observe incoming transactional events linked over Debezium event transport pipelines.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFeedPaused(!isFeedPaused)}
                  className={`px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs cursor-pointer ${
                    isFeedPaused ? 'text-amber-400' : 'text-zinc-500'
                  }`}
                >
                  {isFeedPaused ? '⚡ RESUME PIPELINE' : '⫦ PAUSE PIPELINE'}
                </button>
                <div className={`w-2 h-2 rounded-full ${isFeedPaused ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 animate-ping'}`} />
              </div>
            </div>

            {/* Ingest Feed Code panel */}
            <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl max-h-[380px] overflow-y-auto space-y-2 font-mono scrollbar-thin scrollbar-thumb-zinc-800">
              {dataEvents.map((evt) => (
                <div key={evt.id} className="text-xs flex items-center justify-between p-2 rounded bg-slate-900/40 border border-slate-900 hover:border-zinc-800 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-zinc-500 font-bold shrink-0">{evt.time}</span>
                    <span className="px-1.5 py-0.5 text-[8.5px] font-bold rounded bg-slate-950 border border-slate-800 text-zinc-400 shrink-0">
                      {evt.source}
                    </span>
                    <span className="text-zinc-300 leading-normal truncate max-w-[280px] sm:max-w-md lg:max-w-2xl">{evt.message}</span>
                  </div>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    evt.type === 'success' ? 'bg-emerald-400' : evt.type === 'warning' ? 'bg-amber-400 animate-pulse' : 'bg-[#818cf8]'
                  } shrink-0 ml-4`} />
                </div>
              ))}
            </div>

            {/* Trace Statistics Footnote */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              {[
                { label: 'Event Processing Latency', val: '14ms', change: 'Blended average', color: 'text-emerald-400' },
                { label: 'Debezium Replication Offset', val: 'L_0x12FA', change: 'Postgres transactional master', color: 'text-indigo-400' },
                { label: 'Stripe webhook retry speed', val: '100.0% Success', change: 'Standard verification', color: 'text-cyan-400' },
                { label: 'Prometheus query tick rate', val: '15-sec polling', change: 'Autopilot checks', color: 'text-pink-400' }
              ].map((stat, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-900">
                  <span className="text-[10px] text-zinc-500 block uppercase font-bold">{stat.label}</span>
                  <strong className={`text-sm block mt-1 ${stat.color}`}>{stat.val}</strong>
                  <span className="text-[9px] text-zinc-600 block mt-0.5">{stat.change}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SIMULATION PARAMS ADJUSTER VIEWPORT */}
        {activeTab === 'sim' && (
          <React.Fragment>
            {/* Control Sliders and checklist */}
            <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#10b981] font-bold uppercase tracking-wider block">Eidolon Parameters Panel</span>
                  <h4 className="text-sm font-bold text-white uppercase font-mono">Tune Simulation Variables</h4>
                  <p className="text-[11px] text-zinc-500 font-mono">
                    Slide variables to manipulate organizational metrics and project outcomes.
                  </p>
                </div>

                <div className="space-y-3.5 pt-2">
                  {/* Slider 1: Wizard Complete */}
                  <div className="space-y-1.5 font-mono">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400 uppercase font-semibold text-[10.5px]">DNS HELP COMPLETION:</span>
                      <strong className="text-amber-400 font-mono text-[11.5px]">{dnsWizardCompletion}%</strong>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={dnsWizardCompletion}
                      onChange={(e) => setDnsWizardCompletion(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-amber-400"
                    />
                    <p className="text-[9px] text-zinc-500">Improves user activation; lowers technical support ticket load.</p>
                  </div>

                  {/* Toggle 1: Mailbox Limit Enforcement */}
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                    <div className="space-y-0.5 font-mono">
                      <span className="text-[10.5px] text-zinc-300 font-bold uppercase block">ENFORCE MAILBOX CAPITAL CAP:</span>
                      <p className="text-[9px] text-zinc-500 max-w-[190px]">Capping accounts at 3 mailboxes limits login sharing and generates $45/mo overages.</p>
                    </div>
                    <button
                      onClick={() => setMailboxLimitEnforce(!mailboxLimitEnforce)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                        mailboxLimitEnforce 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold' 
                          : 'bg-slate-950 border-slate-900 text-zinc-500'
                      }`}
                    >
                      {mailboxLimitEnforce ? 'ENFORCED' : 'SOFT OVERLAY'}
                    </button>
                  </div>

                  {/* Toggle 2: Geo Replication Pods */}
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                    <div className="space-y-0.5 font-mono">
                      <span className="text-[10.5px] text-zinc-300 font-bold uppercase block">GCC & EU COMPLIANCE SLICES:</span>
                      <p className="text-[9px] text-zinc-500 max-w-[190px]">Active local databases in Frankfurt AWS and UAE Moro Hub.</p>
                    </div>
                    <button
                      onClick={() => setSovereignPodsDeploy(!sovereignPodsDeploy)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                        sovereignPodsDeploy 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold' 
                          : 'bg-slate-950 border-slate-900 text-zinc-500'
                      }`}
                    >
                      {sovereignPodsDeploy ? 'PROVISIONED' : 'BLOCKED'}
                    </button>
                  </div>

                  {/* Toggle 3: AI Sandbox Generator */}
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                    <div className="space-y-0.5 font-mono">
                      <span className="text-[10.5px] text-zinc-300 font-bold uppercase block">FRONT PAGE AI PLAYGROUND SANDBOX:</span>
                      <p className="text-[9px] text-zinc-500 max-w-[190px]">Launches a text editor canvas, boosting signups by 64%.</p>
                    </div>
                    <button
                      onClick={() => setAiSandboxLaunch(!aiSandboxLaunch)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                        aiSandboxLaunch 
                          ? 'bg-[#10b981]/10 border-emerald-500/30 text-[#10b981] font-bold' 
                          : 'bg-slate-950 border-slate-900 text-zinc-500'
                      }`}
                    >
                      {aiSandboxLaunch ? 'ACTIVE' : 'INACTIVE'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 text-[9.5px] font-mono text-zinc-500 leading-normal">
                <strong>Simulated Formula:</strong> Operations calculations recalculate instantly across all connected time-series displays.
              </div>
            </div>

            {/* Calculations telemetry indicators */}
            <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4 font-mono text-xs">
              <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider">Causal Calculations Metrics Panel</span>

              {/* Calculations Display Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Metric A: ARR Run Rate */}
                <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold">
                    <span>ARR RUN-RATE VALUE</span>
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <strong className="text-lg font-bold text-white">${currentSimulatedARR.toLocaleString()}</strong>
                  <span className="text-[9.5px] text-[#10b981] block font-semibold">
                    +{mailboxLimitEnforce ? '$193,000' : '$45,000'} limit allocation added
                  </span>
                </div>

                {/* Metric B: Customer Support Tickets */}
                <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold">
                    <span>MONTHLY TICKET FREQUENCY</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  </div>
                  <strong className="text-lg font-bold text-white">{simulatedSupportTickets} active tickets</strong>
                  <span className="text-[9.5px] text-zinc-400 block">
                    Calculated queue workload is {simulatedSupportTickets <= 60 ? 'Optimal' : 'Saturated'}
                  </span>
                </div>

                {/* Metric C: DNS Activations */}
                <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold">
                    <span>SDR SEQUENCE ACTIVATION</span>
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <strong className="text-lg font-bold text-white">{simulatedActivationRate}% success</strong>
                  <span className="text-[9.5px] text-amber-500 block font-semibold">
                    Simulates {simulatedActiveSdrActivations} active activations
                  </span>
                </div>

                {/* Metric D: LTV/CAC Ratio */}
                <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold">
                    <span>LTV-TO-CAC EFFICIENCY</span>
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <strong className="text-lg font-bold text-white">{currentLtvToCac}x value</strong>
                  <span className="text-[9.5px] text-indigo-400 block">
                    LTV: ${currentSimulatedLTV.toLocaleString()} | CAC: ${currentSimulatedCAC.toLocaleString()}
                  </span>
                </div>

              </div>

              <div className="p-3.5 bg-slate-950 border border-zinc-900 rounded-xl">
                <span className="text-white font-bold block text-[10.5px] mb-1">PARAMETRIC SUMMARY TRANSCRIPT</span>
                <p className="text-[10px] text-zinc-400 leading-normal">
                  Launching the AI playground on the landing page boosts Monthly Traffic conversion rate to <span className="text-white font-bold">{calculatedVisitorToSignup}%</span>. When this aligns with our diagnostic guides (currently simulated at <span className="text-white font-bold">{dnsWizardCompletion}% Completion</span>), the total activations expand to <span className="text-[#10b981] font-bold">{simulatedActiveSdrActivations} clients</span>. This operational trajectory ensures critical pre-Series A milestones are fully achieved.
                </p>
              </div>
            </div>
          </React.Fragment>
        )}

        {/* 4. DYNAMIC COGNITIVE DECISION ENGINE VIEWPORT */}
        {activeTab === 'decision' && (
          <div className="lg:col-span-12 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-5 font-mono text-xs">
            <div className="space-y-1 pb-3 border-b border-zinc-805">
              <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider block">Cognitive Decision Framework</span>
              <h4 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
                <Cpu className="w-4 h-4 text-pink-400" /> Eidolon Real-Time Strategic Playbooks
              </h4>
              <p className="text-[11px] text-zinc-500 font-mono">
                Observe how the AI model intercepts anomalously drifting telemetry values and outputs executable remediation scripts.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
              {/* Select Scenario Category */}
              <div className="lg:col-span-1 space-y-2">
                {[
                  { id: 'dns_churn', label: '1. Onboarding DNS Churn', desc: 'SPF onboarding bottlenecks', active: activeDecisionScenario === 'dns_churn' },
                  { id: 'seat_theft', label: '2. Login Seat-Theft', desc: 'Over-sharing professional profiles', active: activeDecisionScenario === 'seat_theft' },
                  { id: 'cpu_spike', label: '3. Cognitive CPU spikes', desc: 'Outbox latency optimizing', active: activeDecisionScenario === 'cpu_spike' },
                  { id: 'gcc_sovereign', label: '4. Sovereign Sales pipeline', desc: 'Bypass physical data boundaries', active: activeDecisionScenario === 'gcc_sovereign' }
                ].map((scen) => (
                  <button
                    key={scen.id}
                    onClick={() => {
                      setActiveDecisionScenario(scen.id as any);
                      setDecisionOutput(null);
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer block space-y-0.5 ${
                      scen.active 
                        ? 'bg-pink-500/10 border-pink-500/40 text-white' 
                        : 'bg-slate-950 border-slate-900 text-zinc-500 hover:text-zinc-400'
                    }`}
                  >
                    <span className="font-bold text-xs block leading-tight">{scen.label}</span>
                    <span className="text-[9px] text-zinc-500 font-normal leading-normal">{scen.desc}</span>
                  </button>
                ))}

                <button
                  onClick={triggerDecisionEngine}
                  disabled={isRunningDecision}
                  className="w-full py-2.5 bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 mt-4 font-mono uppercase"
                >
                  {isRunningDecision ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Running Prompts...
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 fill-slate-950" />
                      Trigger AI Decision
                    </>
                  )}
                </button>
              </div>

              {/* Action Outputs Pane */}
              <div className="lg:col-span-3 bg-slate-950 border border-slate-900 rounded-xl p-5 min-h-[220px] flex flex-col justify-between">
                {decisionOutput ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9.5px] font-bold">
                          {decisionOutput.status}
                        </span>
                        <span className="text-[10px] text-zinc-500">Eidolon Response Script</span>
                      </div>
                      <span className="text-[10px] text-rose-400 font-bold uppercase">
                        Enterprise Risk Exposure: {decisionOutput.riskScore}%
                      </span>
                    </div>

                    <p className="text-zinc-300 text-xs leading-relaxed font-normal">
                      <strong>Scenario Analysis:</strong> {decisionOutput.analysis}
                    </p>

                    <div className="space-y-2">
                      <span className="text-[10px] text-pink-400 font-bold uppercase block tracking-wider">EXECUTE STRUCTURAL INTEGRATION ACTIONS:</span>
                      {decisionOutput.actions.map((act, id) => (
                        <div key={id} className="p-2.5 bg-slate-900/60 rounded border border-slate-800 text-[11px] text-zinc-400 leading-relaxed flex items-start gap-2">
                          <span className="text-pink-400 font-bold">✔</span>
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="m-auto text-center space-y-2 max-w-sm py-12">
                    <Cpu className="w-8 h-8 text-zinc-600 mx-auto animate-pulse" />
                    <strong className="text-zinc-400 text-xs block">Decision Framework Safe-State</strong>
                    <p className="text-[10.5px] text-zinc-500 leading-relaxed">
                      Select one of the scenario categories on the left and click "Trigger AI Decision" to run cognitive recommendation models.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 5. TIME-SERIES FORECAST ENGINE VIEWPORT */}
        {activeTab === 'forecast' && (
          <React.Fragment>
            {/* Forecast Chart Panel using fully custom SVG representation responding dynamically to sliders */}
            <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-5">
              <div className="flex justify-between items-center font-mono">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">12-Month ARR Trajectory Projections</span>
                  <h4 className="text-sm font-bold text-white uppercase">Predictive Time-Series Forecast Chart</h4>
                </div>
                <div className="flex bg-slate-950 p-1.5 rounded border border-zinc-800 text-[9px] uppercase tracking-wider text-zinc-400 font-bold select-none">
                  Model: Auto-Regressive Ingress Composite
                </div>
              </div>

              {/* High-Fidelity Custom Animated SVG Chart */}
              <div className="relative bg-slate-950 border border-slate-900 rounded-xl p-6 min-h-[250px] font-mono">
                {/* Visual Legend overlays */}
                <div className="flex flex-wrap gap-4 text-[9px] font-bold text-zinc-400 mb-2 pl-6">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-emerald-400 rounded-full" /> Baseline Run-Rate: ${(baseARR/1000000).toFixed(3)}M</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-indigo-500 rounded-full" /> Simulated Capital Scale: ${(currentSimulatedARR/1000000).toFixed(3)}M</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-rose-500 rounded-full" /> Vulnerability curve: $1.12M</span>
                </div>

                {/* SVG Graph block */}
                <svg viewBox="0 0 500 200" className="w-full h-48 mt-4 overflow-visible">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="480" y2="20" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />
                  <line x1="40" y1="70" x2="480" y2="70" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />
                  <line x1="40" y1="120" x2="480" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />
                  <line x1="40" y1="170" x2="480" y2="170" stroke="#1f2937" strokeWidth="1" />

                  {/* Left Axis label limits */}
                  <text x="32" y="24" fill="#64748b" fontSize="8" textAnchor="end">$2.40M</text>
                  <text x="32" y="74" fill="#64748b" fontSize="8" textAnchor="end">$1.60M</text>
                  <text x="32" y="124" fill="#64748b" fontSize="8" textAnchor="end">$0.80M</text>
                  <text x="32" y="174" fill="#64748b" fontSize="8" textAnchor="end">Start</text>

                  {/* Lower timeline ticks */}
                  <text x="40" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Q2 (Current)</text>
                  <text x="150" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Q3 2026</text>
                  <text x="260" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Q4 2026</text>
                  <text x="370" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Q1 2027</text>
                  <text x="480" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Q2 2027</text>

                  {/* Vulnerable Run-rate line (lower red path) */}
                  <path
                    d="M 40,123 L 150,126 L 260,131 L 370,133 L 480,134"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    strokeDasharray="4"
                    className="transition-all duration-700"
                  />

                  {/* Base standard static run-rate line */}
                  <path
                    d="M 40,123 L 150,115 L 260,105 L 370,95 L 480,84"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="2"
                  />

                  {/* Dynamic simulated line responding to State Variables */}
                  {/* We map calculated currentSimulatedARR to the y height of final point: 
                      170 represents Start ($0M), Y proportional logic */}
                  <path
                    d={`M 40,123 L 150,${Math.round(123 - (currentSimulatedARR - baseARR) * 0.00002)} L 260,${Math.round(112 - (currentSimulatedARR - baseARR) * 0.000035)} L 370,${Math.round(98 - (currentSimulatedARR - baseARR) * 0.000055)} L 480,${Math.round(82 - (currentSimulatedARR - baseARR) * 0.00007)}`}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3.5"
                    className="transition-all duration-700 ease-out"
                  />

                  {/* Node highlight endpoints */}
                  <circle cx="480" cy={Math.round(82 - (currentSimulatedARR - baseARR) * 0.00007)} r="4" fill="#818cf8 animate-ping" />
                  <circle cx="480" cy={Math.round(82 - (currentSimulatedARR - baseARR) * 0.00007)} r="3" fill="#6366f1" />
                </svg>

                <div className="absolute right-4 bottom-12 bg-slate-900 border border-slate-800 p-2 rounded text-[9.5px] font-mono text-zinc-400">
                  Projected End-ARR Value: <span className="text-[#10b981] font-bold">${currentSimulatedARR.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Inspect Projection details */}
            <div className="lg:col-span-4 bg-[#111827] border border-[#1f2937] p-5 rounded-xl flex flex-col justify-between font-mono text-xs">
              <div className="space-y-4">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">Forecast Core Audits</span>
                
                <div className="space-y-3">
                  {[
                    { label: 'Baseline target MRR', val: `$${Math.round(baseARR / 12).toLocaleString()}`, desc: 'Initial baseline collected without enforcing variable updates.' },
                    { label: 'Forecasted target MRR', val: `$${Math.round(currentSimulatedARR / 12).toLocaleString()}`, desc: 'Optimized parameter scaling includes overage surcharges and local pipeline gains.' },
                    { label: 'Vulnerability Floor', val: '$1.12M ARR', desc: 'Worst case model simulation under continuing SPF onboarding churn and contract overlaps.' }
                  ].map((track, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 border border-slate-900 rounded-lg space-y-1">
                      <strong className="text-zinc-400 text-[10px] block uppercase">{track.label}</strong>
                      <div className="text-sm font-bold text-white">{track.val}</div>
                      <p className="text-[9.5px] text-zinc-500 leading-normal font-normal">{track.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-[9.5px] text-zinc-500 leading-normal mt-4">
                <strong>Inference:</strong> The Forecast model recalculates time-series trajectories based on historical transactional metrics overlaid with dynamic parametric adjustments on our What-If simulator.
              </div>
            </div>
          </React.Fragment>
        )}

      </div>
    </div>
  );
}
