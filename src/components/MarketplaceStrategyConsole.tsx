import React, { useState, useEffect } from 'react';
import { 
  Store, Layers, DollarSign, ShieldCheck, Users, Scale, Percent, 
  Sliders, Search, Award, Activity, CheckCircle, MessageSquare, 
  AlertTriangle, RefreshCw, FileText, TrendingUp, Bot, Zap, 
  BookOpen, ChevronRight, Play, ArrowUpRight, ArrowDownRight, Info
} from 'lucide-react';

interface ParticipantType {
  id: string;
  name: string;
  role: string;
  icon: any;
  valueProp: string;
  primaryMetric: string;
  exampleProduct: string;
  apiNeed: string;
}

const PARTICIPANTS: ParticipantType[] = [
  {
    id: 'agencies',
    name: 'Agencies',
    role: 'Growth & Scale Providers',
    icon: Users,
    valueProp: 'Outsource comprehensive campaign management, cold outbox execution, and bespoke account-based marketing (ABM) operations directly into tenant workspaces.',
    primaryMetric: 'Deliverability & Response Rate (Goal: >25% open, >5% positive reply)',
    exampleProduct: 'End-to-End Enterprise GTM Launch (30-Day Setup & Active Nurturing)',
    apiNeed: 'Multi-Tenant Workspace Invitation APIs, Secure Team Seat Delegation Webhooks.'
  },
  {
    id: 'sdr_teams',
    name: 'SDR Teams',
    role: 'On-Demand Human Prospectors',
    icon: Activity,
    valueProp: 'Freelance or agency-led Sales Development Representatives who execute human qualification, record-cleaning, and direct follow-up phone calls on cold interest leads.',
    primaryMetric: 'Meeting Booking Velocity (Goal: >15 Qualified Meetings per Month)',
    exampleProduct: 'Dedicated Part-Time Tech SDR Squad (Leads qualification of warm replies)',
    apiNeed: 'CRM Lead Hand-off Listeners, In-App Communication Panel Overlay Integrations.'
  },
  {
    id: 'consultants',
    name: 'Consultants',
    role: 'Strategic GTM Advisory',
    icon: Award,
    valueProp: 'RevOps strategists, positioning masters, and sales copywriting coaches who design tactical sequencing plans, refine client messaging, and audit outbound processes.',
    primaryMetric: 'Client Lifetime Value Extension (Goal: Lower Churn, Enhance ROI metrics)',
    exampleProduct: '3-Year Strategic Outbound Playbook & Copywriting Alignment Audit',
    apiNeed: 'Strategy Center Read-Only Auditing Credentials, Custom Decision Panel Exporting.'
  },
  {
    id: 'revops_experts',
    name: 'Revenue Operations Experts',
    role: 'Data & Workflow Architects',
    icon: Layers,
    valueProp: 'Technical integration engineers who craft customized Zapier/Make loops, design custom CRM synching pipelines, and configure DNS/deliverability architectures.',
    primaryMetric: 'Pipeline Synchronization SLA (Goal: <2 min latency, 100% field parity)',
    exampleProduct: 'DNS Deliverability Stabilization Kit (DKIM/SPF Repair + CRM Integration)',
    apiNeed: 'Developer Console Access, Full-Spectrum REST Outbox and Custom Object Routing APIs.'
  },
  {
    id: 'prompt_creators',
    name: 'AI Prompt Creators',
    role: 'Generative Intelligence Engineers',
    icon: Bot,
    valueProp: 'AI prompt engineers who author high-relevance Outreach Copywriting templates, RAG custom instructions, and Reply Classification structures to drive automated response loops.',
    primaryMetric: 'Conversational Conversion Rate (Goal: >12% reply interest uplift)',
    exampleProduct: 'FinTech Hyper-Personalization Icebreaker Prompt Library (Gemini native)',
    apiNeed: 'Prompt Repository Webhook Publish/Subscribe APIs, Prompt Latency Monitors.'
  }
];

export default function MarketplaceStrategyConsole() {
  const [activeSubTab, setActiveSubTab] = useState<'ecosystem' | 'architecture' | 'revenue' | 'trust' | 'governance'>('ecosystem');
  const [selectedParticipant, setSelectedParticipant] = useState<string>('agencies');
  
  // Revenue Simulation States
  const [targetGmv, setTargetGmv] = useState<number>(5000000); // 5M USD
  const [agencyTakeRate, setAgencyTakeRate] = useState<number>(15); // %
  const [promptTakeRate, setPromptTakeRate] = useState<number>(20); // %
  const [sponsorAdSpend, setSponsorAdSpend] = useState<number>(120000); // USD Annual
  const [memberPremiumSaaS, setMemberPremiumSaaS] = useState<number>(75); // $ per user seat on premium matching
  const [activePartnerCount, setActivePartnerCount] = useState<number>(120);

  // Trust Scoring States
  const [slaSla, setSlaSla] = useState<number>(96); // SLA % (0-100)
  const [qualityGrade, setQualityGrade] = useState<number>(8.8); // 1-10 rating
  const [transactionsCompleted, setTransactionsCompleted] = useState<number>(45); 
  const [responseSec, setResponseSec] = useState<number>(45); // Average minutes response latency
  const [trustScore, setTrustScore] = useState<number>(89.5);

  // Governance Checklist States
  const [govCompliance, setGovCompliance] = useState({
    kycCompleted: true,
    dataIsloationStrict: true,
    escrowDepositEnforced: true,
    spamGuardsActive: true,
    disputeMediationTracked: false,
    auditTrailImmutable: true
  });

  const [simulationLogStr, setSimulationLogStr] = useState<string>('Reputation scoring module online. Feed signals continuous.');

  // Live Metric Telemetry Simulation
  const [completedTradesToday, setCompletedTradesToday] = useState<number>(14);
  const [activeEscrowHeld, setActiveEscrowHeld] = useState<number>(314800);

  useEffect(() => {
    // Dynamic recalculation of trust score
    const slaCoeff = 0.35;
    const qualityCoeff = 0.25;
    // Volume score scaled from 0-10 based on completions (capped at 10)
    const volumeScore = Math.min(10.0, transactionsCompleted / 5);
    const volumeCoeff = 0.25;
    // Response speed score (faster is better, < 15 mins = 10, > 180 mins = 2)
    const rawRespScore = Math.max(1, 10 - (responseSec / 30));
    const responseCoeff = 0.15;

    const computedLocalScore = (slaSla * 0.1 * slaCoeff) * 10 + 
                               (qualityGrade * qualityCoeff) * 10 + 
                               (volumeScore * volumeCoeff) * 10 + 
                               (rawRespScore * responseCoeff) * 10;
    
    setTrustScore(Math.round(computedLocalScore * 10) / 10);
  }, [slaSla, qualityGrade, transactionsCompleted, responseSec]);

  // Periodic visual tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCompletedTradesToday(prev => prev + (Math.random() > 0.70 ? 1 : 0));
      setActiveEscrowHeld(prev => prev + (Math.random() > 0.50 ? 1400 : -800));

      const logSec = [
        "Reputation sync: Recalculated transaction metrics for user 'SDR_PRO_32'.",
        "Escrow safety: Locked automatic holding deposit for Contract ID #EB-92381.",
        "Listing audit: AI scan passed on model template 'Outbound Icebreaker v4' by creator 'PromptGeek'.",
        "Compliance tick: Zero GDPR opt-out violations reported on active agency accounts today."
      ];
      setSimulationLogStr(logSec[Math.floor(Math.random() * logSec.length)]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const toggleGovItem = (key: keyof typeof govCompliance) => {
    setGovCompliance(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Math for Revenue Model
  const agencyGmvPortion = targetGmv * 0.65; // Agencies / SDRs represent 65% of volume
  const serviceCommission = agencyGmvPortion * (agencyTakeRate / 100);
  const promptGmvPortion = targetGmv * 0.35; // Expert prompts & consultations represent 35%
  const promptCommission = promptGmvPortion * (promptTakeRate / 100);
  const premiumMemberPortion = (activePartnerCount * 0.45) * memberPremiumSaaS * 12; // 45% pay premium SaaS surcharge
  const totalMarketRevenue = serviceCommission + promptCommission + sponsorAdSpend + premiumMemberPortion;
  const blendedTakeRate = (totalMarketRevenue / targetGmv) * 100;

  const currentParticipant = PARTICIPANTS.find(p => p.id === selectedParticipant) || PARTICIPANTS[0];
  const ParticipantIconComp = currentParticipant.icon;

  return (
    <div id="marketplace-strategy-console" className="space-y-8 animate-fadeIn text-slate-100">
      
      {/* Strategic Header & Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Store className="w-4 h-4 shrink-0" />
            Strategic Transformation Framework
          </div>
          <h1 className="text-2xl font-bold font-display text-white mt-1">
            B2B Marketplace Conversion Roadmap
          </h1>
          <p className="text-xs text-gray-400 max-w-xl mt-1 leading-relaxed">
            Architectural transformation strategy and dynamic validation simulator to pivot EffectiveBuzz from local multi-tenant SaaS into a collaborative hub for agencies, engineers, and expert prompt creators.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-slate-900/60 p-2 border border-slate-800 rounded-xl text-xs h-fit self-center">
          <div className="px-3 py-1 bg-slate-950/80 rounded-lg border border-slate-800">
            <span className="text-[10px] text-gray-500 block leading-tight font-mono">Simulated Escrow</span>
            <span className="font-bold text-emerald-400 font-mono">${activeEscrowHeld.toLocaleString()} USD</span>
          </div>
          <div className="px-3 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-300">
            <span className="text-[10px] text-emerald-400/70 block leading-tight font-mono">Daily Matchings</span>
            <span className="font-bold font-mono">+{completedTradesToday} active</span>
          </div>
        </div>
      </div>

      {/* Top Level Metric Slabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-1 hover:border-slate-700 transition duration-200">
          <span className="text-[10px] text-gray-400 font-mono block uppercase">Marketplace GMV Target</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-white font-mono">${(targetGmv / 1000000).toFixed(1)}M</span>
            <span className="text-xs text-gray-500 font-sans">USD/Year</span>
          </div>
          <p className="text-[10px] text-gray-500">Configurable in the Revenue section</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-1 hover:border-slate-700 transition duration-200">
          <span className="text-[10px] text-gray-400 font-mono block uppercase">Gross Platform Yield</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-indigo-400 font-mono">${(totalMarketRevenue / 1000).toFixed(1)}k</span>
            <span className="text-xs text-gray-500 font-sans">USD/Year</span>
          </div>
          <p className="text-[10px] text-gray-500">Equivalent to <span className="text-emerald-400 font-semibold">{blendedTakeRate.toFixed(1)}% yield</span></p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-1 hover:border-slate-700 transition duration-200">
          <span className="text-[10px] text-gray-400 font-mono block uppercase">Active Curated Partners</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-white font-mono">{activePartnerCount} Members</span>
            <span className="text-xs text-emerald-400 font-semibold font-mono">SOC2-Ready</span>
          </div>
          <p className="text-[10px] text-gray-500">KYC audited & trust scored</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-1 hover:border-slate-700 transition duration-200">
          <span className="text-[10px] text-gray-400 font-mono block uppercase">System Security State</span>
          <div className="flex items-center gap-1.5 pt-0.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs text-gray-200 font-semibold font-mono">100% GTM Enforced</span>
          </div>
          <p className="text-[10px] text-gray-500">GDPR & SLA policies live</p>
        </div>
      </div>

      {/* Main Tab Controller */}
      <div className="border-b border-slate-800 bg-slate-950/60 p-1 rounded-xl flex flex-wrap gap-1">
        {[
          { id: 'ecosystem', label: '1. Participant Ecosystem', icon: Users, desc: 'Partner Archetypes & API profiles' },
          { id: 'architecture', label: '2. Marketplace Architecture', icon: Layers, desc: 'System nodes & lead handoffs' },
          { id: 'revenue', label: '3. Multi-Channel Revenue Model', icon: DollarSign, desc: 'Interactive commission calculator' },
          { id: 'trust', label: '4. Trust & Reputation System', icon: ShieldCheck, desc: 'Dynamic performance algorithms' },
          { id: 'governance', label: '5. Governance Framework', icon: Scale, desc: 'Compliance bounds & safety logs' }
        ].map(tab => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex-1 min-w-[150px] p-3 rounded-lg text-left border transition-all duration-200 ${
                activeSubTab === tab.id
                  ? 'bg-slate-900 border-indigo-700 text-white shadow-lg shadow-indigo-950/10'
                  : 'bg-transparent border-transparent text-gray-400 hover:bg-slate-900/40 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <TabIcon className={`w-4 h-4 shrink-0 ${activeSubTab === tab.id ? 'text-indigo-400' : 'text-gray-500'}`} />
                <span className="text-xs font-bold leading-none">{tab.label}</span>
              </div>
              <p className="text-[9px] text-gray-400 mt-1 block font-sans truncate">{tab.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Tab Render Box */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur min-h-[400px]">
        
        {/* TAB 1: ECOSYSTEM */}
        {activeSubTab === 'ecosystem' && (
          <div className="space-y-6">
            <div className="flex justify-between items-start flex-wrap gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Target Marketplace Participants</h3>
                <p className="text-xs text-gray-400">
                  Curating 5 key high-value contributor profiles necessary to fulfill end-to-end B2B outbound loops.
                </p>
              </div>
              <div className="text-xs bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-indigo-300 font-mono">
                Matching Pool: Active verification
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Selector Deck */}
              <div className="md:col-span-5 space-y-2">
                {PARTICIPANTS.map(p => {
                  const Icon = p.icon;
                  const isCur = p.id === selectedParticipant;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedParticipant(p.id)}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-4 transition-all ${
                        isCur 
                          ? 'bg-indigo-950/40 border-indigo-750 text-white shadow-md' 
                          : 'bg-slate-950/40 border-slate-800/80 text-gray-400 hover:bg-slate-900/60 hover:text-white'
                      }`}
                    >
                      <div className={`p-2 rounded-lg border ${
                        isCur ? 'bg-indigo-500/20 text-indigo-300 border-indigo-700' : 'bg-slate-900 border-slate-800 text-gray-500'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold block leading-none">{p.name}</span>
                        <span className="text-[10px] text-gray-400 block mt-1 tracking-wide font-mono">{p.role}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 shrink-0" />
                    </button>
                  );
                })}
              </div>

              {/* Right Detail Card */}
              <div className="md:col-span-7 bg-slate-950/40 border border-slate-800/80 p-6 rounded-2xl space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-indigo-400 font-bold">
                    <ParticipantIconComp className="w-3.5 h-3.5 shrink-0" />
                    Strategic Participant Profile
                  </div>
                  <h4 className="text-xl font-bold text-white font-display mt-1">{currentParticipant.name}</h4>
                  <span className="text-xs text-gray-400 font-mono italic block mt-0.5">{currentParticipant.role}</span>
                </div>

                <div className="space-y-4 text-xs leading-relaxed">
                  <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <span className="font-mono text-[10px] text-gray-400 block mb-1 uppercase font-bold">1. Marketplace Value Proposition</span>
                    <p className="text-gray-300 font-sans">{currentParticipant.valueProp}</p>
                  </div>

                  <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <span className="font-mono text-[10px] text-gray-400 block mb-1 uppercase font-bold">2. Primary SLA Benchmark</span>
                    <p className="text-emerald-300 font-medium font-mono">{currentParticipant.primaryMetric}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-indigo-950/20 rounded-xl border border-indigo-950/40">
                      <span className="font-mono text-[10px] text-indigo-300 block mb-1 uppercase font-bold">Example Offering</span>
                      <p className="text-gray-200 font-sans font-medium">{currentParticipant.exampleProduct}</p>
                    </div>
                    <div className="p-3.5 bg-indigo-950/20 rounded-xl border border-indigo-950/40">
                      <span className="font-mono text-[10px] text-indigo-300 block mb-1 uppercase font-bold">Core API Requirements</span>
                      <p className="text-gray-200 font-sans font-mono text-[10px]">{currentParticipant.apiNeed}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 p-3 rounded-lg text-[11px] text-gray-500 border border-slate-800/60 space-y-2">
                  <span className="font-mono text-[9px] uppercase font-bold block text-gray-400">Architect Integration Blueprint Detail:</span>
                  <p>
                    System invokes automated webhook testing upon partner application, spinning up temporary sandbox sandboxes on the developer nodes to check API routing compliance before active marketplace listing permission is established.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARCHITECTURE */}
        {activeSubTab === 'architecture' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white font-display">System Node Architecture</h3>
              <p className="text-xs text-gray-400">
                Outlining how data, payments, configuration states, and lead loops flow securely between multi-tenant boundaries.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Dynamic Flow Map */}
              <div className="lg:col-span-7 bg-slate-950/40 border border-slate-800/80 p-6 rounded-2xl">
                <div className="text-[10px] font-mono text-[#818cf8] font-bold block uppercase tracking-wider mb-4">
                  MULTI-TENANT CORE INTERSECT WIREMAP
                </div>
                
                {/* Simulated SVG / Canvas Diagram representation */}
                <div className="relative border border-slate-800/80 bg-slate-900/40 rounded-xl p-4 min-h-[300px] flex flex-col justify-between overflow-hidden">
                  
                  {/* Decorative backdrop mesh */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

                  {/* Top Row: External Source Nodes */}
                  <div className="flex justify-between relative z-10">
                    <div className="bg-slate-900 border border-indigo-500/30 px-3 py-1.5 rounded-lg text-center font-mono w-[30%]">
                      <span className="text-[9px] text-[#818cf8] block font-bold">CORE SAAS CORE</span>
                      <span className="text-[11px] font-semibold text-white">Client Tenant</span>
                    </div>
                    <div className="flex items-center justify-center font-mono text-[10px] text-gray-500 flex-1">
                      <span className="border-t border-dashed border-slate-700 w-full text-center relative py-1">
                        Invite <span className="absolute -top-1 font-sans text-xs">➔</span>
                      </span>
                    </div>
                    <div className="bg-slate-900 border border-emerald-500/35 px-3 py-1.5 rounded-lg text-center font-mono w-[30%] animate-pulse">
                      <span className="text-[9px] text-emerald-400 block font-bold">MATCHMAKER HUB</span>
                      <span className="text-[11px] font-semibold text-white">Marketplace Portal</span>
                    </div>
                  </div>

                  {/* Connectors Mid Row */}
                  <div className="flex justify-around items-center h-16 relative z-10">
                    <div className="h-full border-l border-dashed border-slate-800 w-1"></div>
                    <div className="h-full border-l border-dashed border-slate-800 w-1"></div>
                  </div>

                  {/* Middle Row: Escrow and Integration Layer */}
                  <div className="flex justify-between items-center relative z-10">
                    <div className="bg-slate-950/90 border border-yellow-500/25 px-2.5 py-1.5 rounded-md text-center max-w-[28%] font-mono text-[10px]">
                      <span className="text-[8px] text-yellow-400 uppercase font-bold block">Protected API</span>
                      <span className="text-gray-300">Stripe Escrow Wallet</span>
                    </div>
                    
                    <div className="text-center bg-slate-950/90 border border-indigo-500/20 px-3 py-2 rounded-lg max-w-[38%] shadow-md">
                      <span className="text-[10px] text-indigo-300 font-mono block font-bold">SANDBOX SECURE RBAC</span>
                      <p className="text-[9px] text-gray-400 leading-tight mt-0.5">Isolated partner session tokens (read-only leads/scopes)</p>
                    </div>

                    <div className="bg-slate-950/90 border border-emerald-500/25 px-2.5 py-1.5 rounded-md text-center max-w-[28%] font-mono text-[10px]">
                      <span className="text-[8px] text-emerald-300 uppercase font-bold block">Audit Enforcer</span>
                      <span className="text-gray-300">SLA Monitor Node</span>
                    </div>
                  </div>

                  {/* Connectors Bottom Row */}
                  <div className="flex justify-around items-center h-16 relative z-10">
                    <div className="h-full border-l border-dashed border-slate-800 w-1"></div>
                    <div className="h-full border-l border-dashed border-slate-800 w-1"></div>
                  </div>

                  {/* Bottom Row: Executable Core Database */}
                  <div className="flex justify-between relative z-10">
                    <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-center font-mono w-[30%]">
                      <span className="text-[9px] text-gray-400 block uppercase font-bold">Lead Routing</span>
                      <span className="text-[11px] font-semibold text-white">Prospect CRM DB</span>
                    </div>
                    <div className="flex items-center justify-center font-mono text-[10px] text-gray-500 flex-1">
                      <span className="border-t border-dashed border-slate-700 w-full text-center relative py-1">
                        SLA Telemet <span className="absolute -top-1 font-sans text-xs">➔</span>
                      </span>
                    </div>
                    <div className="bg-indigo-950/40 border border-indigo-500/40 px-3 py-1.5 rounded-lg text-center font-mono w-[30%]">
                      <span className="text-[9px] text-indigo-400 block font-bold">RKG MATRIX</span>
                      <span className="text-[11px] font-semibold text-white">Rev-Knowledge Graph</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-[11px] text-gray-400 bg-slate-950/30 p-2.5 rounded-lg border border-slate-800/50">
                  <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>
                    <strong>Isolated Sandboxing Mode:</strong> External partners can NEVER browse native Stripe keys or direct customer databases. All data is scoped, sanitized, and marshaled over explicit OAuth tokens.
                  </span>
                </div>
              </div>

              {/* Text Strategy Specification */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-indigo-300">3-Tier Interface Matrix</h4>
                  <p className="text-xs text-gray-400 mt-1">Our transition strategy separates functions cleanly:</p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      num: 'Tier-1',
                      title: 'Direct Client Interface (SaaS)',
                      desc: 'Customers declare outbound campaign scopes, define required ICP metrics, allocate budget thresholds, and manage automatic partner matching queues.'
                    },
                    {
                      num: 'Tier-2',
                      title: 'Marketplace Matchmaker Engine',
                      desc: 'A public-facing directories and portfolio service listing vetted Agencies, Prompters, and Consultancies integrated with direct Stripe Escrow funding.'
                    },
                    {
                      num: 'Tier-3',
                      title: 'Isolated Execution Sandboxes',
                      desc: 'A background service initializing isolated REST workspaces with customized API scopes for partner agents, preventing raw system or tenant parameter leaks.'
                    }
                  ].map(spec => (
                    <div key={spec.num} className="border-l-2 border-indigo-500/50 pl-3 space-y-1">
                      <span className="font-mono text-[10px] font-extrabold text-[#818cf8] tracking-wider block">{spec.num} - {spec.title}</span>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">{spec.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REVENUE */}
        {activeSubTab === 'revenue' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white font-display">Multi-Channel Revenue Model Simulator</h3>
              <p className="text-xs text-gray-400">
                Adjust platform variables dynamically to compute annualized gross fees, commission splits, and net marketplace revenue margins.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sliders Console */}
              <div className="lg:col-span-6 bg-slate-950/40 border border-slate-800/80 p-6 rounded-2xl space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-400 block uppercase">Simulator Variable Deck</span>
                  <h4 className="text-sm text-gray-300 mt-1 font-sans">Slide targets below to forecast expansion yield:</h4>
                </div>

                <div className="space-y-4">
                  {/* Slider 1: Target GMV */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400 font-sans">Simulated Market GMV</span>
                      <span className="text-white font-bold">${(targetGmv / 1000000).toFixed(1)}M USD</span>
                    </div>
                    <input 
                      type="range" 
                      min="1000000" 
                      max="20000000" 
                      step="500000"
                      value={targetGmv} 
                      onChange={(e) => setTargetGmv(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 cursor-pointer"
                    />
                  </div>

                  {/* Slider 2: Agency Take Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400 font-sans">Agency & SDR Take Rate</span>
                      <span className="text-white font-bold">{agencyTakeRate}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="30" 
                      value={agencyTakeRate} 
                      onChange={(e) => setAgencyTakeRate(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800 cursor-pointer"
                    />
                  </div>

                  {/* Slider 3: Prompt Take Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400 font-sans">Prompt & Consultation Commission</span>
                      <span className="text-white font-bold">{promptTakeRate}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="40" 
                      value={promptTakeRate} 
                      onChange={(e) => setPromptTakeRate(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 cursor-pointer"
                    />
                  </div>

                  {/* Slider 4: Partners Count */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400 font-sans">Vetted Active Partners</span>
                      <span className="text-white font-bold">{activePartnerCount} Agencies/Creators</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="500" 
                      value={activePartnerCount} 
                      onChange={(e) => setActivePartnerCount(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-800 cursor-pointer"
                    />
                  </div>

                  {/* Slider 5: Premium SaaS surcharge */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400 font-sans">Premium Match Matching Seat Surcharge</span>
                      <span className="text-white font-bold">${memberPremiumSaaS} / Seat / Month</span>
                    </div>
                    <input 
                      type="range" 
                      min="25" 
                      max="200" 
                      step="5"
                      value={memberPremiumSaaS} 
                      onChange={(e) => setMemberPremiumSaaS(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Forecast outputs */}
              <div className="lg:col-span-6 bg-slate-950/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wide">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Annualized Platform Yield Breakdown
                  </div>
                  <h4 className="text-xl font-bold font-display text-white mt-1">Projected Fees Forecast</h4>
                </div>

                <div className="space-y-3.5 my-6">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800/60">
                    <span className="text-gray-400">1. Agency & SDR Matching (GMV: ${(agencyGmvPortion / 1000000).toFixed(2)}M)</span>
                    <span className="font-mono font-bold text-white">${serviceCommission.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800/60">
                    <span className="text-gray-400">2. Prompt Libraries & Advisory (GMV: ${(promptGmvPortion / 1000000).toFixed(2)}M)</span>
                    <span className="font-mono font-bold text-white">${promptCommission.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800/60">
                    <span className="text-gray-400">3. Partner Premium Placement Match Seats</span>
                    <span className="font-mono font-bold text-white">${premiumMemberPortion.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800/60">
                    <span className="text-gray-400">4. Directory Corporate Sponsoring Listing Support</span>
                    <span className="font-mono font-bold text-white">${sponsorAdSpend.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-indigo-550/15 border border-indigo-500/25 rounded-xl text-sm font-semibold">
                    <span className="text-indigo-200">Total Net Projected Revenue Yield:</span>
                    <span className="font-mono text-emerald-300 font-bold text-base">${totalMarketRevenue.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-[11px] leading-relaxed text-gray-400 space-y-1">
                  <span className="font-mono text-[9px] uppercase font-bold text-emerald-400 block pb-0.5">Platform Strategic Margin Target:</span>
                  <p>
                    Transitioning to a transactional platform enables EffectiveBuzz to extract a blended <strong className="text-white">{blendedTakeRate.toFixed(1)}% of all platform activity services</strong>, scaling MRR infinitely without linear operational support costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TRUST & REPUTATION */}
        {activeSubTab === 'trust' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white font-display">Trust & Reputation Algorithm Engine</h3>
              <p className="text-xs text-gray-400">
                Interactive simulator demonstrating SLA, verification tiers, automated badging models, and penalty thresholds.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Score Adjuster deck */}
              <div className="lg:col-span-6 bg-slate-950/40 border border-slate-800/80 p-6 rounded-2xl space-y-5">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-500 block uppercase">Signal Metrics Input</span>
                  <h4 className="text-sm text-gray-300 mt-1 font-sans">Simulate partner performance events:</h4>
                </div>

                <div className="space-y-4">
                  {/* Metric 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400 font-sans flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-indigo-400" />
                        SLA Compliance Ratio
                      </span>
                      <span className="text-white font-mono font-bold">{slaSla}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="75" 
                      max="100" 
                      value={slaSla} 
                      onChange={(e) => setSlaSla(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 cursor-pointer"
                    />
                  </div>

                  {/* Metric 2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400 font-sans flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        Average Deliverability Rating
                      </span>
                      <span className="text-white font-mono font-bold">{qualityGrade}/10</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="10" 
                      step="0.1"
                      value={qualityGrade} 
                      onChange={(e) => setQualityGrade(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800 cursor-pointer"
                    />
                  </div>

                  {/* Metric 3 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400 font-sans flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                        Completed Transaction Volume
                      </span>
                      <span className="text-white font-mono font-bold">{transactionsCompleted} matches</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={transactionsCompleted} 
                      onChange={(e) => setTransactionsCompleted(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-800 cursor-pointer"
                    />
                  </div>

                  {/* Metric 4 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400 font-sans flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                        Response Time Latency
                      </span>
                      <span className="text-white font-mono font-bold">{responseSec} mins</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="200" 
                      step="5"
                      value={responseSec} 
                      onChange={(e) => setResponseSec(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic trust verdict panel */}
              <div className="lg:col-span-6 bg-slate-950/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-amber-400 font-extrabold pb-0.5">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    AUTONOMOUS METRIC VERDICT LAB
                  </div>
                  <h4 className="text-lg font-bold text-white font-display">Calculated Reputation Profile</h4>
                </div>

                <div className="my-6 text-center space-y-4">
                  <div className="inline-block relative">
                    <div className="w-24 h-24 rounded-full border-4 border-slate-800 bg-slate-900 flex flex-col items-center justify-center shadow-inner mx-auto">
                      <span className="text-2xl font-bold font-mono text-white leading-none">{trustScore}</span>
                      <span className="text-[9px] text-gray-500 font-mono mt-1">SCORE</span>
                    </div>
                    
                    {/* Ring indicator coloring */}
                    <div className={`absolute top-0 left-0 w-24 h-24 rounded-full border-4 ${
                      trustScore >= 88 ? 'border-emerald-500/60 scale-105' : trustScore >= 75 ? 'border-indigo-500/40 scale-105' : 'border-red-500/40 scale-105'
                    } transition-all pointer-events-none`}></div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Trust Tier Status</span>
                    {trustScore >= 88 ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-semibold">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        Elite Outbound Partner (Gold Badge)
                      </div>
                    ) : trustScore >= 70 ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-semibold">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                        Verified Active Contributor
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-300 text-xs font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        High-Risk Warning (Search Penalized)
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-850 p-3.5 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-slate-800 pb-1.5">
                    <span className="text-gray-400 uppercase">Live Signal Monitor Log</span>
                    <span className="text-gray-600">Simulating ticks</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono font-medium italic select-none">
                    "{simulationLogStr}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GOVERNANCE */}
        {activeSubTab === 'governance' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white font-display">Compliance & Governance Playbook</h3>
              <p className="text-xs text-gray-400">
                Enforcing rigorous structural rails for escrow payments, active KYC, dispute mediations, and data isolation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column Checkbox control */}
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-wider block font-bold">
                  Enforceable Security Controls
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      key: 'kycCompleted',
                      title: 'Automatic Identity/KYC Verification',
                      desc: 'Forces direct corporate registration, corporate registry check, and bank account onboarding before listing active services.'
                    },
                    {
                      key: 'dataIsloationStrict',
                      title: 'Multi-Tenant Data Hardening',
                      desc: 'Guarantees that partner access keys are strictly isolated at database level. Zero direct database queries across tenant limits can occur.'
                    },
                    {
                      key: 'escrowDepositEnforced',
                      title: 'Stripe escrow-backed contracts',
                      desc: 'Platform automatically holds fund deposit before agency project initialization, protecting developers and clients alike.'
                    },
                    {
                      key: 'spamGuardsActive',
                      title: 'Outgoing Anti-Spam Safeguards',
                      desc: 'Automated monitoring metrics preventing high-volume blast templates from abusing outbound system reputational pools.'
                    },
                    {
                      key: 'disputeMediationTracked',
                      title: 'Platform-Mediated Dispute Loop',
                      desc: 'Interactive dispute center resolving delivery disagreements with system escrow withholding and neutral review board.'
                    },
                    {
                      key: 'auditTrailImmutable',
                      title: 'Immutable Ledger Audit Logs',
                      desc: 'Records all transaction, lead hand-off, and feedback event modifications in a non-modifiable chronological audit sequence.'
                    }
                  ].map(item => {
                    const activeVal = govCompliance[item.key as keyof typeof govCompliance];
                    return (
                      <button
                        key={item.key}
                        onClick={() => toggleGovItem(item.key as any)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          activeVal 
                            ? 'bg-slate-950/60 border-indigo-500/40 text-white' 
                            : 'bg-slate-950/20 border-slate-850 text-gray-400 hover:border-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            activeVal ? 'bg-indigo-500 border-indigo-400' : 'bg-transparent border-slate-700'
                          }`}>
                            {activeVal && <span className="text-[10px] font-bold text-slate-950">✓</span>}
                          </div>
                          <div>
                            <span className="text-xs font-bold block leading-tight">{item.title}</span>
                            <p className="text-[10px] text-gray-400 mt-1 leading-normal font-sans">{item.desc}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column Strategic overview text */}
              <div className="lg:col-span-5 bg-slate-950/40 border border-slate-800 p-6 rounded-2xl space-y-6">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-red-400 font-bold uppercase pb-0.5">
                    <Scale className="w-3.5 h-3.5" />
                    Regulatory Bounds Checklist
                  </div>
                  <h4 className="text-sm font-bold text-white">Platform Mediation Protocols</h4>
                </div>

                <div className="space-y-4 text-xs font-sans text-gray-300 leading-relaxed">
                  <div className="space-y-1 bg-slate-900/60 p-3.5 rounded-xl border border-slate-850">
                    <span className="font-mono text-[9px] font-bold text-[#818cf8] uppercase tracking-wider block">GDPR Outbound Integrity</span>
                    <p>
                      Agencies and prompt authors are audited under zero-tolerance rules for unsolicited marketing, forcing automated opting registries blockages.
                    </p>
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3.5 rounded-xl border border-slate-850">
                    <span className="font-mono text-[9px] font-bold text-[#818cf8] uppercase tracking-wider block">SOC-2 Audit Ledger Integrity</span>
                    <p>
                      Any third-party consultant added to an workspace inherits custom RBAC parameters with complete activity logging. Read-only tokens prevent core data exfiltration risks.
                    </p>
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3.5 rounded-xl border border-slate-850">
                    <span className="font-mono text-[9px] font-bold text-amber-400 uppercase tracking-wider block">Arbitration Escalation Levels</span>
                    <p>
                      Disputes triggers automatic human auditor inspection of the system outbound records and reply audits, releasing or returning held escrow within 7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
