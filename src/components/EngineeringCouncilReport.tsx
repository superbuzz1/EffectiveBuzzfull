import React, { useState } from 'react';
import { 
  Cpu, Server, Shield, Database, Activity, RefreshCw, AlertTriangle, 
  CheckCircle2, Flame, Layers, ChevronRight, Users, Clock, Terminal, 
  HardDrive, TrendingUp, AlertCircle, Sparkles, DollarSign
} from 'lucide-react';

interface PriorityItem {
  id: string;
  title: string;
  category: 'Critical Fix' | 'Scaling Priority' | 'Refactoring' | 'Security Priority';
  owner: string;
  impactScore: number; // 1-10
  costScore: 'High' | 'Medium' | 'Low';
  description: string;
  plan: string;
  metricAtStake: string;
}

export default function EngineeringCouncilReport() {
  const [activeTab, setActiveTab] = useState<'audit' | 'priorities' | 'capacity' | 'sign'>('audit');

  // Interactive System Performance Variables
  const [systemState, setSystemState] = useState({
    routerEfficiency: 88, // % queries to Gemini Flash
    onboardingFixFocus: 65, // % resource allocated to DNS fixes
    containerCpuScale: 48, // % base DB CPU load
    activeMailboxLimiting: false, // Stripe seat block enabled
  });

  // Derived real-time metrics
  const calculatedBlendedCostPerMil = (3.50 * (1 - (systemState.routerEfficiency / 100)) + 0.15 * (systemState.routerEfficiency / 100)).toFixed(2);
  const supportTicketsRemaining = Math.max(12, Math.round(180 - (systemState.onboardingFixFocus * 1.8)));
  const calculatedLatency = Math.round(198 - (systemState.onboardingFixFocus * 0.3));
  const estimatedSaaSARR = (1248000 + (systemState.activeMailboxLimiting ? 187200 : 0)).toLocaleString();

  const priorityItems: PriorityItem[] = [
    {
      id: 'dns_shield',
      title: 'Automated SPF/DKIM Pre-Flight Setup diagnostic Wizard',
      category: 'Critical Fix',
      owner: 'VP of Engineering / Core Support SDK',
      impactScore: 9.8,
      costScore: 'Low',
      description: 'Implement automated lookup scripts into dashboard configuration modules to validate DMARC/SPF/DKIM records instantly upon addition.',
      plan: 'Alleviates onboarding bottlenecks, converting manual verification tickets into client-driven self-service setups.',
      metricAtStake: 'Reduces top queue cases by -40%'
    },
    {
      id: 'billing_lock',
      title: 'Active Sender Limit Guards & Stripe Webhook Integrations',
      category: 'Scaling Priority',
      owner: 'Principal Architect / GTM Integrations',
      impactScore: 8.4,
      costScore: 'Medium',
      description: 'Enforce threshold guards strictly within email queue handlers to cap active sending profiles at 3 unless an upgraded multi-mailbox tier is unlocked.',
      plan: 'Prevents credential sharing among mid-market campaigns and drives organic SaaS monetization.',
      metricAtStake: 'Directly unlocks +15% ARR expand potential'
    },
    {
      id: 'crm_connectors',
      title: 'Native Bidirectional Salesforce & HubSpot Connectors',
      category: 'Refactoring',
      owner: 'Principal Architect / OAuth Infrastructure',
      impactScore: 7.8,
      costScore: 'High',
      description: 'Refactor standard data schemas to support real-time message brokering, multi-tenant state hooks, and high-frequency rate-limiting buffers.',
      plan: 'Reduces reliance on clientCSV uploads, creating a crucial switching barrier for corporate enterprise teams.',
      metricAtStake: 'Supports $50k+ Average Contract Value (ACV) limits'
    },
    {
      id: 'frankfurt_frank',
      title: 'EU Isolated (AWS Frankfurt) and regional Moro Hub Database Clouds',
      category: 'Security Priority',
      owner: 'CISO Security Group / DevOps Infra',
      impactScore: 7.2,
      costScore: 'High',
      description: 'Instantiate regulatory isolated geographic SQL replicas matching strict regional data sovereignty and storage guidelines.',
      plan: 'Bypasses severe compliance friction to unlock restricted enterprise sales pipelines immediately.',
      metricAtStake: 'Unstalls $1.4M pending regional enterprise pipeline cases'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Engineering Council Board Header */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider animate-pulse">
                Engineering Council Board
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Consolidated Tech-Stack, Security & Infrastructure Operations Audit</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              Strategic Engineering Council & Architecture Alignment
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Act as the Chief Technology Officer (CTO), VP of Engineering, Principal Architect, and Security Lead. Fine-tune cognitive routing parameters, allocate resource schedules, analyze system limits, and audit compliance.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-cyan-400">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Stack Status: STABLE</span>
          </div>
        </div>
      </div>

      {/* Real-Time Measured Performance Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-cyan-500/10 transition-all">
          <span className="text-zinc-500 text-[10px] uppercase font-bold block tracking-wider">Calculated Token Cost</span>
          <strong className="text-2xl font-bold text-cyan-400 block mt-0.5">${calculatedBlendedCostPerMil}</strong>
          <span className="text-[10px] text-emerald-400 block mt-1">
            Blended token expenditure per million
          </span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-blue-500/10 transition-all">
          <span className="text-zinc-500 text-[10px] uppercase font-bold block tracking-wider">Simulated Support Caseload</span>
          <strong className="text-2xl font-bold text-blue-400 block mt-0.5">{supportTicketsRemaining} tickets</strong>
          <span className="text-[10px] text-zinc-400 block mt-1">
            Setup fix allocation: <span className="text-white font-bold">{systemState.onboardingFixFocus}%</span>
          </span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-amber-500/10 transition-all">
          <span className="text-zinc-500 text-[10px] uppercase font-bold block tracking-wider">Query Latency Metric</span>
          <strong className="text-2xl font-bold text-amber-400 block mt-0.5">{calculatedLatency}ms</strong>
          <span className="text-[10px] text-zinc-400 block mt-1">
            Database CPU load: {systemState.containerCpuScale}% peak
          </span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-rose-500/10 transition-all">
          <span className="text-zinc-500 text-[10px] uppercase font-bold block tracking-wider">Projected SaaS ARR Run-Rate</span>
          <strong className="text-2xl font-bold text-rose-400 block mt-0.5">${estimatedSaaSARR}</strong>
          <span className="text-[10px] text-zinc-500 block mt-1">
            Mailbox blocks: {systemState.activeMailboxLimiting ? 'ENABLED (+$187k)' : 'DISABLED'}
          </span>
        </div>
      </div>

      {/* Main Structural Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Module Section */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-950 rounded-lg border border-gray-900 text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">
            Interactive Architecture Controls
          </div>

          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-4 font-mono text-xs text-zinc-400">
            
            {/* Control A */}
            <div className="space-y-2 pb-2.5 border-b border-gray-900">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-400 uppercase font-semibold">1. COGNITIVE FLASH ROUTING:</span>
                <span className="text-cyan-400 font-bold">{systemState.routerEfficiency}% Flash</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="2"
                value={systemState.routerEfficiency}
                onChange={(e) => setSystemState(prev => ({ ...prev, routerEfficiency: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-cyan-400"
              />
              <p className="text-[9px] text-gray-500 font-normal">Controls what percentage of general classifications are sent to lower-cost Gemini Flash models.</p>
            </div>

            {/* Control B */}
            <div className="space-y-2 pb-2.5 border-b border-gray-900">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-400 uppercase font-semibold">2. DNS FIX ENGINE ALLOCATION:</span>
                <span className="text-blue-400 font-bold">{systemState.onboardingFixFocus}% focus</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={systemState.onboardingFixFocus}
                onChange={(e) => setSystemState(prev => ({ ...prev, onboardingFixFocus: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-blue-400"
              />
              <p className="text-[9px] text-gray-500 font-normal">Allocates developer schedules towards resolving manual SPF/DKIM verification problems.</p>
            </div>

            {/* Control C */}
            <div className="space-y-1.5 flex justify-between items-center">
              <div className="space-y-0.5">
                <span className="text-zinc-300 font-semibold block text-[10.5px]">ACTIVE MAILBOX MONETIZATION LOCK:</span>
                <p className="text-[8.5px] text-gray-500 max-w-[190px]">Enforces database mailbox caps to block credential sharing leaks.</p>
              </div>
              <button
                onClick={() => setSystemState(prev => ({ ...prev, activeMailboxLimiting: !prev.activeMailboxLimiting }))}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer border ${
                  systemState.activeMailboxLimiting 
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                    : 'bg-slate-900 border-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                {systemState.activeMailboxLimiting ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-2 font-mono text-[9px] text-zinc-500">
            <span className="text-[9.5px] text-cyan-400 font-bold uppercase block">Architecture Safety Assurance</span>
            <p className="leading-relaxed">
              Every deployed database patch, queue schema mutation, and CRM API sync pipeline is scrutinized for CPU latency footprints, data compliance protocols, and API credential leakage.
            </p>
          </div>
        </div>

        {/* Dynamic Display Panels Viewports */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="w-4 h-4 animate-pulse text-cyan-400" /> Joint Engineering Council Center
            </span>
            <div className="flex gap-1">
              {['audit', 'priorities', 'capacity', 'sign'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-2.5 py-1 rounded text-[9.5px] uppercase font-bold font-mono transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-cyan-500/10 border border-cyan-500/20 text-white' 
                      : 'text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Viewport 1: Performance Stats & Auditing */}
          {activeTab === 'audit' && (
            <div className="space-y-4 font-mono text-xs">
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                The current technical baselines provide robust stability for 3,142 campaigns. However, we must continuously track token burn and setup friction to protect bottom-line product margins.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { title: 'Database CPU Utilization', metric: `${systemState.containerCpuScale}%`, color: 'text-cyan-400', desc: 'Peak load checked during heavy campaign synthesis tasks.' },
                  { title: 'Platform Total Operational Uptime', metric: '99.98%', color: 'text-emerald-400', desc: 'Cumulative metric; zero active service failures documented.' },
                  { title: 'Dynamic API Latency Overhead', metric: `${calculatedLatency}ms`, color: 'text-amber-400', desc: 'Targeting < 150ms through index optimizations and cache setups.' },
                  { title: 'Cognitive Token Router Efficiency', metric: `${systemState.routerEfficiency}% Flash`, color: 'text-blue-400', desc: 'Conserves precious API tokens during lightweight text revisions.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 border border-gray-900 rounded-xl flex justify-between items-center hover:border-slate-800 transition-all">
                    <div className="space-y-0.5">
                      <strong className="text-white text-[11px] block">{item.title}</strong>
                      <span className="text-zinc-500 text-[10.5px] font-normal leading-normal">{item.desc}</span>
                    </div>
                    <strong className={`text-sm font-bold ${item.color} shrink-0`}>
                      {item.metric}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Viewport 2: Candidate Priority Tracks */}
          {activeTab === 'priorities' && (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {priorityItems.map((item) => (
                <div key={item.id} className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-3 font-mono text-xs hover:border-cyan-500/20 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-bold border ${
                          item.category === 'Critical Fix'
                            ? 'bg-rose-500/5 border-rose-500/20 text-rose-400 font-extrabold'
                            : item.category === 'Scaling Priority'
                            ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400'
                            : item.category === 'Refactoring'
                            ? 'bg-blue-500/5 border-blue-500/20 text-blue-400'
                            : 'bg-amber-500/5 border-amber-500/20 text-amber-400 animate-pulse'
                        }`}>
                          {item.category}
                        </span>
                        <span className="text-zinc-500 text-[9px]">Lead: {item.owner}</span>
                      </div>
                      <strong className="text-white text-[12px] font-display font-medium leading-tight block mt-1">{item.title}</strong>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-[8px] text-zinc-500 uppercase block font-semibold">Priority Score</span>
                      <strong className="text-cyan-400 text-sm font-bold">{item.impactScore}</strong>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-[10.5px] leading-relaxed pl-1">{item.description}</p>

                  <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 text-[10px] text-zinc-400 leading-normal">
                    <strong className="text-white">Execution Plan:</strong> {item.plan}
                  </div>

                  <div className="flex justify-between items-center pt-1.5 border-t border-slate-900 text-[9.5px]">
                    <span className="text-zinc-500 font-normal">Overhead cost: <strong className="text-white font-semibold">{item.costScore}</strong></span>
                    <strong className="text-cyan-400">{item.metricAtStake}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Viewport 3: Allocation Proposals */}
          {activeTab === 'capacity' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 bg-slate-950 border border-gray-900 rounded-xl space-y-2">
                <span className="text-cyan-400 font-bold uppercase text-[9px] block">Quarterly Resource Distribution Proposals</span>
                <p className="leading-relaxed text-[10.5px] text-zinc-400">
                  Allocating optimal engineer blocks prevents development pipeline starvation while keeping platform response speeds and security compliance layers protected.
                </p>
              </div>

              <div className="space-y-3.5 pl-1 pt-1.5">
                {[
                  { category: 'Onboarding SPF/DKIM automation builds', percent: '40% developers bandwidth', details: 'Focused strictly on mitigating onboarding support queue cases.' },
                  { category: 'CRM integrations & API refactor blocks', percent: '40% system engineers bandwidth', details: 'Rebuilding Salesforce / HubSpot natively to support high ACV sales targets.' },
                  { category: 'Cognitive token margin protection audits', percent: '20% platform architecture block', details: 'Refining the Dual-Tier router setups to maintain optimal gross margins.' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1 text-zinc-300">
                    <div className="flex justify-between items-center text-[10.5px]">
                      <strong className="text-white font-medium">{item.category}</strong>
                      <span className="text-cyan-400 font-bold text-[11px] font-mono">{item.percent}</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded overflow-hidden">
                      <div className="bg-cyan-400 h-full rounded" style={{ width: idx === 0 ? '40%' : idx === 1 ? '40%' : '20%' }} />
                    </div>
                    <p className="text-[10px] text-zinc-500 font-normal mt-1 block leading-normal">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Viewport 4: Co-Signatures */}
          {activeTab === 'sign' && (
            <div className="space-y-5 font-mono text-xs text-zinc-300">
              <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl flex items-center gap-3">
                <Users className="w-6 h-6 text-cyan-400 shrink-0 animate-bounce" />
                <div className="text-zinc-400 leading-normal">
                  <strong>Consolidated Signature Resolution:</strong> Certified by the board of engineering leaders on June 7, 2026. Prioritizes the automated setup diagnostic wizard before weekend traffic loads.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { rank: 'Chief Technology Officer (CTO)', focus: 'Strategic Architecture & Budgets', desc: 'Focusing on token margins and keeping absolute platform uptime above 99.98% baseline rates.' },
                  { rank: 'VP of Engineering', focus: 'Release schedules & support load', desc: 'Fast-tracking DKIM self-service utilities to instantly release support desk capabilities.' },
                  { rank: 'Principal Architect', focus: 'Database designs & scaling', desc: 'Optimizing regional isolated clusters to facilitate GCC data sovereignty migrations.' },
                  { rank: 'Security Lead (CISO)', focus: 'GDPR, GCC residency & tokens keys security', desc: 'Validating OAuth credentials flow and restricting system limits to eliminate profile leaks.' }
                ].map((signer, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-1.5">
                    <strong className="text-white text-xs block border-b border-slate-900 pb-1.5 uppercase font-medium">{signer.rank}</strong>
                    <div className="text-[10px] text-cyan-400 font-bold font-mono">{signer.focus}</div>
                    <p className="text-zinc-400 text-[10.5px] leading-relaxed font-normal">{signer.desc}</p>
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
