import React, { useState } from 'react';
import { 
  Sliders, TrendingUp, Cpu, Users, DollarSign, Activity, AlertTriangle, 
  CheckCircle, Globe, ShieldCheck, HelpCircle, ArrowUpRight, Scale, 
  HeartHandshake, ChevronRight, Play, RefreshCw, BarChart, FileText, Landmark
} from 'lucide-react';

interface ImprovementItem {
  id: number;
  name: string;
  dimension: 'Revenue' | 'Growth' | 'Product' | 'Infrastructure' | 'Team';
  revenueImpact: 'Critical' | 'High' | 'Medium' | 'Low';
  strategicImpact: 'Critical' | 'High' | 'Medium' | 'Low';
  cost: 'High' | 'Medium' | 'Low';
  time: string;
  description: string;
  metricBenefit: string;
  arrLift: number; // $ value
  latencySaved: number; // ms value
  churnDrop: number; // % value
  magicNumBoost: number; // multiplier value
  capNeeded: number; // $ upfront cost equivalent
}

const TOP_20_IMPROVEMENTS: ImprovementItem[] = [
  {
    id: 1,
    name: "Seat-Limit Enforcement Engine",
    dimension: "Revenue",
    revenueImpact: "Critical",
    strategicImpact: "High",
    cost: "Low",
    time: "2 Weeks",
    description: "Automatic Stripe webhook overrides charging $45/mo for extra registered outbox accounts.",
    metricBenefit: "+$193,000 ARR • 8% NRR Increase",
    arrLift: 193000,
    latencySaved: 0,
    churnDrop: -0.2,
    magicNumBoost: 0.12,
    capNeeded: 15000
  },
  {
    id: 2,
    name: "Concurrent Login Auditor",
    dimension: "Revenue",
    revenueImpact: "High",
    strategicImpact: "Medium",
    cost: "Low",
    time: "3 Weeks",
    description: "Identifies seat-sharing configurations based on mismatched geo-IP coordinates.",
    metricBenefit: "+$52,000 ARR • Promotes Seat Scalability",
    arrLift: 52000,
    latencySaved: 0,
    churnDrop: -0.1,
    magicNumBoost: 0.04,
    capNeeded: 12000
  },
  {
    id: 3,
    name: "Annual Contract Upgrades",
    dimension: "Revenue",
    revenueImpact: "High",
    strategicImpact: "High",
    cost: "Low",
    time: "2 Weeks",
    description: "Launches in-app modals discounting yearly agreements by 20% to lock customer cohorts.",
    metricBenefit: "+$140,000 Cash Injection • Drastically extends runway",
    arrLift: 140000,
    latencySaved: 0,
    churnDrop: -1.2,
    magicNumBoost: 0.08,
    capNeeded: 8000
  },
  {
    id: 4,
    name: "Advanced DKIM Custom Domain Tiers",
    dimension: "Revenue",
    revenueImpact: "High",
    strategicImpact: "High",
    cost: "Medium",
    time: "1 Month",
    description: "Premium outbound white-label package hosting custom DNS zones with dedicated subnets.",
    metricBenefit: "+$115,000 ARR • Attracts Enterprise High-volume plans",
    arrLift: 115000,
    latencySaved: 0,
    churnDrop: -0.5,
    magicNumBoost: 0.09,
    capNeeded: 35000
  },
  {
    id: 5,
    name: "Interactive AI Sequence Sandbox",
    dimension: "Growth",
    revenueImpact: "High",
    strategicImpact: "High",
    cost: "Low",
    time: "1 Month",
    description: "Embedded landing page sequence optimizer allowing visitors to test sequence flows immediately.",
    metricBenefit: "+64% Traffic Registrations • SaaS Magic Number Scale",
    arrLift: 80000,
    latencySaved: 0,
    churnDrop: 0,
    magicNumBoost: 0.28,
    capNeeded: 14000
  },
  {
    id: 6,
    name: "Regional EMEA & GCC Partner Portal",
    dimension: "Growth",
    revenueImpact: "Critical",
    strategicImpact: "Critical",
    cost: "Low",
    time: "6 Weeks",
    description: "High-level affiliate program offering 30% first year payouts to localized business firms.",
    metricBenefit: "+$340,000 ARR Pipeline • High International Reach",
    arrLift: 340000,
    latencySaved: 0,
    churnDrop: 0,
    magicNumBoost: 0.35,
    capNeeded: 25000
  },
  {
    id: 7,
    name: "Day-3 SPF Setup Alert Automation",
    dimension: "Growth",
    revenueImpact: "High",
    strategicImpact: "High",
    cost: "Low",
    time: "1 Week",
    description: "Monitors DNS state; delivers step-by-step SPF text assets if setups remain incomplete.",
    metricBenefit: "-38% Onboarding Attrition Rate • Better Deliverability",
    arrLift: 65000,
    latencySaved: 0,
    churnDrop: -0.8,
    magicNumBoost: 0.06,
    capNeeded: 5000
  },
  {
    id: 8,
    name: "Predictive Lead Enroller",
    dimension: "Growth",
    revenueImpact: "Medium",
    strategicImpact: "High",
    cost: "Medium",
    time: "3 Weeks",
    description: "Programmatic firmographic queries routing high-value target signups straight to Sales channels.",
    metricBenefit: "Shortens response cycles • Auto pipeline segmentation",
    arrLift: 48000,
    latencySaved: 0,
    churnDrop: 0,
    magicNumBoost: 0.11,
    capNeeded: 22000
  },
  {
    id: 9,
    name: "Core Pre-Flight DNS Setup Wizard",
    dimension: "Product",
    revenueImpact: "Critical",
    strategicImpact: "Critical",
    cost: "Low",
    time: "2 Weeks",
    description: "Visual, click-to-copy step-by-step instruction panel for registrars.",
    metricBenefit: "-2.4% Overall Churn Rate • Tenant setups surge from 40% to 78%",
    arrLift: 210000,
    latencySaved: 0,
    churnDrop: -2.4,
    magicNumBoost: 0.15,
    capNeeded: 18000
  },
  {
    id: 10,
    name: "Multi-Account Sequence Sync",
    dimension: "Product",
    revenueImpact: "Medium",
    strategicImpact: "High",
    cost: "Medium",
    time: "1 Month",
    description: "Synchronizes campaigns across multiple outbound addresses inside a unified timeline.",
    metricBenefit: "Strengthens product moat • Improves retention",
    arrLift: 60000,
    latencySaved: -5,
    churnDrop: -0.6,
    magicNumBoost: 0.05,
    capNeeded: 45000
  },
  {
    id: 11,
    name: "Zero-Copy Cloud Data Sharing",
    dimension: "Product",
    revenueImpact: "High",
    strategicImpact: "High",
    cost: "High",
    time: "2 Months",
    description: "Secure data lake integration linking data straight to customers Snowflake/BigQuery workspaces.",
    metricBenefit: "+35% Growth on Enterprise tiers • Hardens client lock-in",
    arrLift: 280000,
    latencySaved: -12,
    churnDrop: -1.0,
    magicNumBoost: 0.18,
    capNeeded: 95000
  },
  {
    id: 12,
    name: "Smart AI Personalizer",
    dimension: "Product",
    revenueImpact: "Medium",
    strategicImpact: "High",
    cost: "Medium",
    time: "3 Weeks",
    description: "Applies contextual LLMs to customize draft messages using linked CRM assets.",
    metricBenefit: "Optimized response counts • Modern tech stack positioning",
    arrLift: 95000,
    latencySaved: 0,
    churnDrop: -0.4,
    magicNumBoost: 0.07,
    capNeeded: 38000
  },
  {
    id: 13,
    name: "Dynamic Cost-Based Model Router",
    dimension: "Infrastructure",
    revenueImpact: "Medium",
    strategicImpact: "High",
    cost: "Low",
    time: "2 Weeks",
    description: "Directs routine parsing tasks to Gemini-3.5-Flash, saving Pro models for sequence editing.",
    metricBenefit: "Minimizes API bills • Defends standard gross margins",
    arrLift: 30000,
    latencySaved: -35,
    churnDrop: -0.2,
    magicNumBoost: 0.05,
    capNeeded: 16000
  },
  {
    id: 14,
    name: "Multi-Zone Sovereignty Zones",
    dimension: "Infrastructure",
    revenueImpact: "Critical",
    strategicImpact: "Critical",
    cost: "High",
    time: "2 Months",
    description: "Establishes secure, isolated databases in Frankfurt and Moro Hub UAE for regulatory compliance.",
    metricBenefit: "Unblocks $1,400,000 enterprise pipelines across EU/EMEA",
    arrLift: 420000,
    latencySaved: -18,
    churnDrop: -0.5,
    magicNumBoost: 0.25,
    capNeeded: 120000
  },
  {
    id: 15,
    name: "DMARC Outbox Rotation Hub",
    dimension: "Infrastructure",
    revenueImpact: "High",
    strategicImpact: "High",
    cost: "Medium",
    time: "1 Month",
    description: "Automatic rotation of sending domains whenever provider throttling indices are flagged.",
    metricBenefit: "Guarantees continuous delivery logs • Protects client reputation",
    arrLift: 130000,
    latencySaved: -5,
    churnDrop: -1.4,
    magicNumBoost: 0.12,
    capNeeded: 55000
  },
  {
    id: 16,
    name: "SOC2 Compliance & SSO Logins",
    dimension: "Infrastructure",
    revenueImpact: "High",
    strategicImpact: "Critical",
    cost: "Medium",
    time: "6 Weeks",
    description: "Secure Federated SSO / SAML integration with audit logging automated checklists.",
    metricBenefit: "Satisfies internal corporate auditing • Closes mid-market sales",
    arrLift: 185000,
    latencySaved: 0,
    churnDrop: -0.3,
    magicNumBoost: 0.15,
    capNeeded: 60000
  },
  {
    id: 17,
    name: "Solutions Engineering Team",
    dimension: "Team",
    revenueImpact: "High",
    strategicImpact: "High",
    cost: "Medium",
    time: "1 Month",
    description: "Dedicated resources deployed to configure enterprise setups and custom servers.",
    metricBenefit: "Slashes enterprise onboarding velocity from 14 days down to 2",
    arrLift: 120000,
    latencySaved: 0,
    churnDrop: -0.6,
    magicNumBoost: 0.14,
    capNeeded: 70000
  },
  {
    id: 18,
    name: "Customer Success CSE Pod Scaling",
    dimension: "Team",
    revenueImpact: "High",
    strategicImpact: "Medium",
    cost: "Medium",
    time: "1 Month",
    description: "Systemic recruitment triggers adding a dedicated support specialist for every 35 accounts.",
    metricBenefit: "Defends active SLA contracts • Drives account expansion",
    arrLift: 110000,
    latencySaved: 0,
    churnDrop: -1.0,
    magicNumBoost: 0.10,
    capNeeded: 65000
  },
  {
    id: 19,
    name: "Outbound Deliverability Specialist",
    dimension: "Team",
    revenueImpact: "Medium",
    strategicImpact: "High",
    cost: "Medium",
    time: "3 Weeks",
    description: "Specialized analyst resolving blacklistings and monitoring IP warmups actively.",
    metricBenefit: "Defends core deliverability reputations • Halts churn drift",
    arrLift: 75000,
    latencySaved: 0,
    churnDrop: -0.8,
    magicNumBoost: 0.05,
    capNeeded: 50000
  },
  {
    id: 20,
    name: "Automated Sprint Triage Rules",
    dimension: "Team",
    revenueImpact: "Medium",
    strategicImpact: "High",
    cost: "Low",
    time: "1 Week",
    description: "Re-channels development resources into setup bug resolution when ticket spikes occur.",
    metricBenefit: "Aligns engineer focus with exact cohort feedback",
    arrLift: 40000,
    latencySaved: -15,
    churnDrop: -0.5,
    magicNumBoost: 0.04,
    capNeeded: 10000
  }
];

export default function CorporateOptimizationConsole() {
  // Navigation filters
  const [activeDimension, setActiveDimension] = useState<'All' | 'Revenue' | 'Growth' | 'Product' | 'Infrastructure' | 'Team'>('All');
  const [sortBy, setSortBy] = useState<'revenue' | 'strategic' | 'cost' | 'time'>('revenue');

  // Interactive Checklist of Approved Projects (state arrays of IDs)
  const [approvedIds, setApprovedIds] = useState<number[]>([1, 9]); // Default start with SPF setup and seat overage approved
  const [selectedItem, setSelectedItem] = useState<ImprovementItem>(TOP_20_IMPROVEMENTS[8]); // default selection DNS wizard

  // Toggle approval mapping
  const handleToggleApproval = (id: number) => {
    if (approvedIds.includes(id)) {
      setApprovedIds(prev => prev.filter(item => item !== id));
    } else {
      setApprovedIds(prev => [...prev, id]);
    }
  };

  // Helper selectors
  const getRankScore = (rank: 'Critical' | 'High' | 'Medium' | 'Low') => {
    if (rank === 'Critical') return 4;
    if (rank === 'High') return 3;
    if (rank === 'Medium') return 2;
    return 1;
  };

  const getRankBadgeStyle = (rank: 'Critical' | 'High' | 'Medium' | 'Low') => {
    if (rank === 'Critical') return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    if (rank === 'High') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    if (rank === 'Medium') return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
    return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
  };

  const getDimensionIcon = (dim: 'Revenue' | 'Growth' | 'Product' | 'Infrastructure' | 'Team') => {
    if (dim === 'Revenue') return <DollarSign className="w-3.5 h-3.5 text-emerald-400" />;
    if (dim === 'Growth') return <TrendingUp className="w-3.5 h-3.5 text-blue-400" />;
    if (dim === 'Product') return <Sliders className="w-3.5 h-3.5 text-yellow-400" />;
    if (dim === 'Infrastructure') return <Cpu className="w-3.5 h-3.5 text-purple-400" />;
    return <Users className="w-3.5 h-3.5 text-pink-400" />;
  };

  // Filter & sort
  const filteredItems = TOP_20_IMPROVEMENTS
    .filter(item => activeDimension === 'All' || item.dimension === activeDimension)
    .sort((a, b) => {
      if (sortBy === 'revenue') return getRankScore(b.revenueImpact) - getRankScore(a.revenueImpact);
      if (sortBy === 'strategic') return getRankScore(b.strategicImpact) - getRankScore(a.strategicImpact);
      if (sortBy === 'cost') return getRankScore(b.cost) - getRankScore(a.cost);
      // fallback time sort length of task
      return a.time.localeCompare(b.time);
    });

  // Calculate live dynamic outcomes based on approved modifications
  const baselineARR = 1248000;
  const baselineLatency = 140; // ms
  const baselineChurn = 8.5; // %
  const baselineMagicNum = 0.95;

  const totalArrLift = approvedIds.reduce((sum, id) => {
    const item = TOP_20_IMPROVEMENTS.find(x => x.id === id);
    return sum + (item ? item.arrLift : 0);
  }, 0);

  const totalLatencyReduction = approvedIds.reduce((sum, id) => {
    const item = TOP_20_IMPROVEMENTS.find(x => x.id === id);
    return sum + (item ? item.latencySaved : 0);
  }, 0);

  const totalChurnDrop = approvedIds.reduce((sum, id) => {
    const item = TOP_20_IMPROVEMENTS.find(x => x.id === id);
    return sum + (item ? item.churnDrop : 0);
  }, 0);

  const totalMagicNumBoost = approvedIds.reduce((sum, id) => {
    const item = TOP_20_IMPROVEMENTS.find(x => x.id === id);
    return sum + (item ? item.magicNumBoost : 0);
  }, 0);

  const totalCapExpended = approvedIds.reduce((sum, id) => {
    const item = TOP_20_IMPROVEMENTS.find(x => x.id === id);
    return sum + (item ? item.capNeeded : 0);
  }, 0);

  // Computed Vitals
  const liveARR = baselineARR + totalArrLift;
  const liveLatency = Math.max(48, baselineLatency + totalLatencyReduction);
  const liveChurn = Math.max(1.2, parseFloat((baselineChurn + totalChurnDrop).toFixed(2)));
  const liveMagicNum = parseFloat((baselineMagicNum + totalMagicNumBoost).toFixed(2));

  // VC Rating assessment scale
  const getVCRating = (magicNum: number, churn: number) => {
    if (magicNum >= 1.5 && churn <= 2.5) return { label: 'AAA Venture Grade', style: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' };
    if (magicNum >= 1.2 && churn <= 4.0) return { label: 'AA High Performer', style: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10' };
    if (magicNum >= 0.9 && churn <= 6.0) return { label: 'BBB Normal Growth', style: 'text-amber-400 border-amber-500/20 bg-amber-500/10' };
    return { label: 'C- Class Distress', style: 'text-rose-400 border-rose-500/20 bg-rose-500/10' };
  };

  const vcMetrics = getVCRating(liveMagicNum, liveChurn);

  // Quick action presets
  const handleApproveAllCritical = () => {
    const criticalIds = TOP_20_IMPROVEMENTS.filter(x => x.revenueImpact === 'Critical' || x.strategicImpact === 'Critical').map(x => x.id);
    setApprovedIds(criticalIds);
  };

  const handleResetBoard = () => {
    setApprovedIds([1, 9]); // default baseline
  };

  return (
    <div className="space-y-6">
      {/* C-Suite Banner header */}
      <div className="bg-gradient-to-r from-blue-500/15 via-zinc-500/5 to-transparent border border-blue-900/30 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-blue-500/10 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
                C-Suite Strategic Gateway
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Operations Optimization Protocol</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300">
              Corporate Optimization & Operational Roadmap
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Model, prioritize and approve the top 20 structural optimizations mapped across active corporate operations. Approve cards to dynamically recalibrate live SaaS metrics including ARR, deliverability latency, and market multipliers.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-blue-400">
            <Scale className="w-4 h-4 text-blue-400" />
            <span>Joint Consensus Active</span>
          </div>
        </div>
      </div>

      {/* Dynamic Simulation Metrics Widget */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Dynamic ARR */}
        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <div className="text-[9.5px] text-zinc-500 font-bold uppercase block">RUN-RATE ARR</div>
          <div className="flex items-baseline gap-1.5">
            <strong className="text-lg font-bold text-white">${liveARR.toLocaleString()}</strong>
            {totalArrLift > 0 && <span className="text-emerald-400 text-[10px]font-bold">+{Math.round(totalArrLift/1000)}k</span>}
          </div>
          <p className="text-[9px] text-zinc-500">Includes approved IP-gains.</p>
        </div>

        {/* Dynamic Latency */}
        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <div className="text-[9.5px] text-zinc-500 font-bold uppercase block">SYSTEM LATENCY</div>
          <div className="flex items-baseline gap-1.5">
            <strong className="text-lg font-bold text-white">{liveLatency}ms</strong>
            {totalLatencyReduction < 0 && <span className="text-blue-400 text-[10px] font-bold">{totalLatencyReduction}ms</span>}
          </div>
          <p className="text-[9px] text-zinc-500">Latency is optimized by Tech updates.</p>
        </div>

        {/* Churn target */}
        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <div className="text-[9.5px] text-zinc-500 font-bold uppercase block">COHORT CHURN RISK</div>
          <div className="flex items-baseline gap-1.5">
            <strong className={`text-lg font-bold ${liveChurn > 5 ? 'text-amber-400' : 'text-emerald-400'}`}>{liveChurn}% Churn</strong>
          </div>
          <p className="text-[9px] text-zinc-500">Reduced from 8.5% default index.</p>
        </div>

        {/* Magic Number */}
        <div className="p-4 bg-slate-950 border border-[#1f2937] rounded-xl space-y-1 font-mono">
          <div className="text-[9.5px] text-zinc-500 font-bold uppercase block">COMPUTED SAAS MAGIC NO.</div>
          <div className="flex items-baseline gap-1.5">
            <strong className="text-lg font-bold text-white">{liveMagicNum}x Multiplier</strong>
          </div>
          <p className="text-[9px] text-zinc-400 font-bold">Goal is to sustain &gt;1.2x.</p>
        </div>

        {/* Venture Grade assessment */}
        <div className="col-span-2 lg:col-span-1 p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono flex flex-col justify-between">
          <div className="text-[9.5px] text-zinc-500 font-bold uppercase block">VC GRADE ASSESSMENT</div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-center border ${vcMetrics.style}`}>
            {vcMetrics.label}
          </span>
          <div className="text-[9px] text-zinc-500 text-center">Cap Spent: ${(totalCapExpended/1000).toFixed(0)}k</div>
        </div>

      </div>

      {/* Board Alignment Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#111827] border border-[#1f2937] rounded-xl gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-zinc-400 font-mono">
            <strong>Approved Projects:</strong> {approvedIds.length} of 20
          </span>
          <span className="h-4 w-px bg-zinc-800 hidden sm:block" />
          <div className="flex gap-1">
            {['CEO', 'COO', 'CTO', 'CRO', 'CFO'].map((role, idx) => {
              // highlight roles satisfied
              const isSatisfied = approvedIds.length >= (idx + 1) * 3;
              return (
                <span 
                  key={role} 
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border transition ${
                    isSatisfied 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : 'bg-slate-950 border-slate-900 text-zinc-500'
                  }`}
                  title={`${role} consensus attained past key thresholds.`}
                >
                  ✓ {role}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleApproveAllCritical}
            className="px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-bold hover:bg-indigo-600/30 transition cursor-pointer"
          >
            Approve All Critical Path
          </button>
          <button
            onClick={handleResetBoard}
            className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-mono hover:text-white transition cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Split Console Panel Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Priority cards index list */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Headers and filters layout */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Operational Node filter</span>
                <div className="flex flex-wrap gap-1">
                  {['All', 'Revenue', 'Growth', 'Product', 'Infrastructure', 'Team'].map((dim) => (
                    <button
                      key={dim}
                      onClick={() => setActiveDimension(dim as any)}
                      className={`px-2.5 py-1 text-xs font-mono rounded-md border transition cursor-pointer ${
                        activeDimension === dim 
                          ? 'bg-blue-600/15 border-blue-500/30 text-blue-400 font-bold' 
                          : 'bg-slate-950 border-slate-900 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {dim}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sorting triggers */}
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Prioritization Variable</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-950 border border-slate-900 rounded px-2 py-1 text-xs font-mono text-zinc-400 outline-none cursor-pointer"
                >
                  <option value="revenue">Rev Impact (Critical First)</option>
                  <option value="strategic">Strategic Impact (High First)</option>
                  <option value="cost">Cost (Low First)</option>
                  <option value="time">Time to Implement (Shortest)</option>
                </select>
              </div>
            </div>

            {/* Rendered cards grid */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin">
              {filteredItems.map((item) => {
                const isApproved = approvedIds.includes(item.id);
                const isSelected = selectedItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex justify-between items-center gap-4 ${
                      isSelected 
                        ? 'bg-slate-950 border-blue-500/40 shadow-inner' 
                        : 'bg-slate-950/60 border-slate-900 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex gap-3 items-start min-w-0">
                      {/* Checkbox trigger to toggle approval */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleApproval(item.id);
                        }}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition cursor-pointer ${
                          isApproved 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                            : 'bg-[#111827] border-zinc-800 text-transparent hover:border-zinc-600'
                        }`}
                      >
                        ✓
                      </button>
                      
                      <div className="space-y-1 min-w-0 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="p-0.5 rounded bg-[#111827] border border-slate-900 shrink-0">
                            {getDimensionIcon(item.dimension)}
                          </span>
                          <span className="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wide">
                            {item.dimension} • Proj {item.id}
                          </span>
                        </div>
                        <h5 className="text-[12.5px] font-bold text-white tracking-tight truncate">
                          {item.name}
                        </h5>
                        <p className="text-[11px] text-zinc-400 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Meta Indicators badges */}
                    <div className="flex flex-col items-end shrink-0 gap-1.5 font-mono">
                      <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold border ${getRankBadgeStyle(item.revenueImpact)}`}>
                        Rev: {item.revenueImpact}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-medium">
                        TTV: {item.time}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          <p className="text-[10px] text-zinc-500 font-mono leading-normal bg-slate-950 p-3 rounded-lg border border-slate-900">
            <strong>Prioritization Rules:</strong> Every item corresponds to real-world SaaS optimizations. Selecting item exposes its cost metrics, strategic trade-offs, and critical warnings.
          </p>

        </div>

        {/* Right Side: High-Touch C-Suite Triage Inspection Pane */}
        <div className="lg:col-span-4 bg-[#111827] border border-[#1f2937] p-5 rounded-xl flex flex-col justify-between space-y-4 font-mono text-xs">
          
          <div className="space-y-5">
            <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">C-Suite Inspection Pane</span>
              <span className="p-1 rounded bg-[#1f2937] text-[10px] text-white font-bold font-mono">
                Proj {selectedItem.id}
              </span>
            </div>

            {/* Selected item detail contents */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="px-1.5 py-0.5 rounded bg-zinc-950 border border-slate-800 text-[9.5px] text-zinc-400 font-bold uppercase tracking-wide">
                  {selectedItem.dimension} NODE
                </span>
                <h4 className="text-sm font-bold text-white tracking-tight pt-1">
                  {selectedItem.name}
                </h4>
              </div>

              <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
                {selectedItem.description}
              </p>

              {/* Multi-variable rating block */}
              <div className="space-y-2 pt-3 border-t border-slate-900 text-[10.5px]">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Revenue Impact:</span>
                  <span className={`px-1.5 py-0.5 rounded font-bold text-[9px] border ${getRankBadgeStyle(selectedItem.revenueImpact)}`}>
                    {selectedItem.revenueImpact}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Strategic Impact:</span>
                  <span className={`px-1.5 py-0.5 rounded font-bold text-[9px] border ${getRankBadgeStyle(selectedItem.strategicImpact)}`}>
                    {selectedItem.strategicImpact}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Implementation Cost:</span>
                  <span className="text-white font-bold">{selectedItem.cost} (${(selectedItem.capNeeded/1000).toFixed(0)}k est)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Time-to-Value (TTV):</span>
                  <span className="text-white font-semibold">{selectedItem.time}</span>
                </div>
              </div>

              {/* Dynamic Recalculator projection widget */}
              <div className="p-3.5 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5">
                <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wide">Simulated ROI Payoff:</span>
                <span className="text-[12px] text-white font-bold block">{selectedItem.metricBenefit}</span>
                <p className="text-[10px] text-zinc-400 font-normal leading-normal pt-1">
                  If approved, this item adds a projected <span className="text-white font-semibold">${selectedItem.arrLift.toLocaleString()} ARR</span>, reduces system latency by <span className="text-white font-semibold">{Math.abs(selectedItem.latencySaved)}ms</span>, and adds +{selectedItem.magicNumBoost} to the overall Magic Number efficiency.
                </p>
              </div>

            </div>
          </div>

          {/* Quick toggle action inside details */}
          <div className="space-y-3">
            <button
              onClick={() => handleToggleApproval(selectedItem.id)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border ${
                approvedIds.includes(selectedItem.id)
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-indigo-600/20 border-indigo-500/30 text-indigo-400 hover:bg-indigo-600/35'
              }`}
            >
              {approvedIds.includes(selectedItem.id) ? (
                <>✓ Approved by Board Consensus</>
              ) : (
                <>✗ Pending C-Suite Approval</>
              )}
            </button>
            <div className="text-[9px] text-zinc-500 font-normal leading-normal text-center">
              Requires subsequent compliance tracking. Mapped to /docs/Corporate_Optimization_Roadmap.md.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
