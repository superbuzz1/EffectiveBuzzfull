import React, { useState } from 'react';
import { 
  ShieldAlert, Settings, RefreshCw, BarChart2, Calendar, 
  CheckCircle2, Users, Flame, Landmark, Activity, Clock, 
  HelpCircle, Sparkles, DollarSign, Cpu, TrendingUp, AlertCircle,
  Database, Mail, Percent, ArrowUpRight, BarChart
} from 'lucide-react';

interface WeeklyTicket {
  id: string;
  category: string;
  count: number;
  avgResolveTime: string;
  severity: 'High' | 'Medium' | 'Low';
}

export default function COOWeeklyOperatingPlan() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'operating' | 'actions' | 'team'>('metrics');

  // Operational Simulation Factors
  const [operationalParams, setOperationalParams] = useState({
    activeCampaigns: 3142,
    spfSetupRate: 58, // % onboarding success rate
    cognitiveRouterRate: 88, // % queries routed to cheaper nodes
    weeklyAdmins: 603,
  });

  // Simulated metrics
  const supportTicketsVolume = Math.round(180 - (operationalParams.spfSetupRate * 1.5));
  const weeklyCostEst = Math.round(5200 - (operationalParams.cognitiveRouterRate * 35));
  const mockSdrFrictionHours = (24 * (1 - (operationalParams.spfSetupRate / 100))).toFixed(1);

  // Tickets distribution list state
  const [ticketsList, setTicketsList] = useState<WeeklyTicket[]>([
    { id: '1', category: 'DKIM/SPF Setup & DNS Diagnostics Support', count: 42, avgResolveTime: '5.2h', severity: 'High' },
    { id: '2', category: 'API Rate-Limiting Overflows & Quotas', count: 28, avgResolveTime: '2.1h', severity: 'Medium' },
    { id: '3', category: 'Lapsed Seat Expansion & Multi-Tenant Login Audits', count: 18, avgResolveTime: '1.4h', severity: 'Low' },
    { id: '4', category: 'Stripe Multicurrency Declined Purchases', count: 12, avgResolveTime: '0.8h', severity: 'Low' }
  ]);

  return (
    <div className="space-y-6">
      {/* COO Strategic Plan Header */}
      <div className="bg-gradient-to-r from-teal-500/10 via-indigo-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-teal-500/10 text-teal-400 text-xs font-mono font-bold uppercase tracking-wider">
                Chief Operating Officer Board
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Weekly Operating Metrics & Churn Optimizer Dashboard</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              EffectiveBuzz Operational Audit & Weekly Action Blueprint
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Act as the Chief Operating Officer of EffectiveBuzz to configure system-design parameters, analyze customer tickets, audit AI execution cognitive margins, and clear onboarding bottlenecks before weekend operations.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-teal-400">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Weekly Target: Day-1 Setups</span>
          </div>
        </div>
      </div>

      {/* Main Real-Time Operational Output Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-teal-500/10 transition-all">
          <span className="text-zinc-500 text-[9.5px] uppercase block tracking-wider font-bold">Simulated Multi-Tenant Tickets</span>
          <strong className="text-2xl font-bold text-teal-400 block mt-0.5">{supportTicketsVolume} Active</strong>
          <span className="text-[10px] text-zinc-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>Audit Level: {operationalParams.spfSetupRate}% Onboarding SPF Rate</span>
          </span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-indigo-500/10 transition-all">
          <span className="text-zinc-500 text-[9.5px] uppercase block tracking-wider font-bold">Weekly AI Server API Cost</span>
          <strong className="text-2xl font-bold text-indigo-400 block mt-0.5">${weeklyCostEst.toLocaleString()}</strong>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Saved {operationalParams.cognitiveRouterRate}% with Flash</span>
          </span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-[#f43f5e]/10 transition-all">
          <span className="text-zinc-500 text-[9.5px] uppercase block tracking-wider font-bold">Time-to-Outbound-Sequence</span>
          <strong className="text-2xl font-bold text-rose-400 block mt-0.5">{mockSdrFrictionHours} Hrs</strong>
          <span className="text-[10px] text-zinc-500 block">Baseline TTV: Target &lt; 2.0 Hrs</span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-amber-500/10 transition-all">
          <span className="text-zinc-500 text-[9.5px] uppercase block tracking-wider font-bold">Active System Campaign Load</span>
          <strong className="text-2xl font-bold text-amber-400 block mt-0.5">{operationalParams.activeCampaigns.toLocaleString()}</strong>
          <span className="text-[10px] text-zinc-400 font-semibold uppercase">Uptime Core Rate: 99.98%</span>
        </div>
      </div>

      {/* Main Interactive Controls Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Tab Switcher Selector Panels */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-950 rounded-lg border border-gray-900 text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold font-display">
            Operating Sub-Portals
          </div>
          <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
            {[
              { id: 'metrics', label: '1. Root Cause Audit & Modulator', icon: Settings, desc: 'Optimize onboarding and AI cost metrics.', color: 'text-teal-400' },
              { id: 'operating', label: '2. Support Tickets Distribution', icon: HelpCircle, desc: 'Browse the open support issues index.', color: 'text-indigo-400' },
              { id: 'actions', label: '3. Top 5 Operational Steps', icon: CheckCircle2, desc: 'Review the chronological weekly tasks.', color: 'text-amber-400' },
              { id: 'team', label: '4. COO Departmental Matrix', icon: Users, desc: 'Synchronize cross-functional efforts.', color: 'text-rose-400' },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                    activeTab === tab.id
                      ? 'bg-[#111827] border-teal-500/50 text-white shadow-lg'
                      : 'bg-transparent border-slate-900 text-gray-400 hover:bg-[#111827]/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <Icon className={`w-4 h-4 ${tab.color}`} />
                    <strong className="font-display font-bold leading-none">{tab.label}</strong>
                  </div>
                  <p className="text-[10px] text-gray-500 pl-6 group-hover:text-gray-400">{tab.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Interactive Operating Modulators */}
          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-3 font-mono text-[10.5px]">
            <span className="text-[9px] text-[#14b8a6] uppercase tracking-wider font-bold block mb-1">Weekly Metric Tuning Knobs</span>
            
            {/* Knob 1 */}
            <div className="space-y-2 border-b border-gray-900 pb-2.5">
              <div className="flex justify-between items-center text-zinc-400">
                <span>DNS / SPF Success Rate:</span>
                <span className="text-white font-bold">{operationalParams.spfSetupRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                step="5"
                value={operationalParams.spfSetupRate}
                onChange={(e) => setOperationalParams(prev => ({ ...prev, spfSetupRate: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-teal-400"
              />
            </div>

            {/* Knob 2 */}
            <div className="space-y-2 border-b border-gray-900 pb-2.5">
              <div className="flex justify-between items-center text-zinc-400">
                <span>Cognitive Flash Redirects:</span>
                <span className="text-white font-bold">{operationalParams.cognitiveRouterRate}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="4"
                value={operationalParams.cognitiveRouterRate}
                onChange={(e) => setOperationalParams(prev => ({ ...prev, cognitiveRouterRate: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-indigo-400"
              />
            </div>

            {/* Knob 3 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-zinc-400">
                <span>Active Campaign Threshold:</span>
                <span className="text-white font-bold">{operationalParams.activeCampaigns} campaigns</span>
              </div>
              <input
                type="range"
                min="1500"
                max="5000"
                step="100"
                value={operationalParams.activeCampaigns}
                onChange={(e) => setOperationalParams(prev => ({ ...prev, activeCampaigns: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Display Panels Viewports */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl shadow-xl">
          
          {/* Viewport A: Modulator Analytics */}
          {activeTab === 'metrics' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4" /> Weekly Operational Metrics Audit
                </span>
                <span className="text-[10px] bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2.5 py-0.5 rounded font-mono uppercase font-bold">
                  Weekly Scope
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                    <strong className="text-stone-300">1. Problem Diagnosis: Setup Friction</strong>
                    <span className="text-[8px] bg-rose-500/10 text-rose-400 px-1 rounded uppercase font-bold">URGENT</span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    SPF, DKIM, and DMARC configurations represent <strong className="text-white">42% of our cumulative support group tickets</strong> this week. This bottlenecks onboarding speeds and increases Day-7 churn vectors.
                  </p>
                  <div className="bg-slate-900/60 p-2.5 rounded border border-gray-910 text-teal-400 text-[10.5px]">
                    <strong>COO Strategic Core Mandate:</strong> Deploy automated, interactive setup diagnostics wizards inside user settings sheets to prevent manual server audits entirely.
                  </div>
                </div>

                <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                    <strong className="text-stone-300">2. Operational Opportunity: Mailbox Scaling Surcharges</strong>
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1 rounded uppercase font-bold">OPPORTUNITY</span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    Over <strong className="text-white">45% of Mid-Market administrative profiles</strong> distribute single admin emails across infinite domains to bypass monetization thresholds.
                  </p>
                  <div className="bg-slate-900/60 p-2.5 rounded border border-gray-910 text-indigo-400 text-[10.5px]">
                    <strong>Expansion Loop Implementation:</strong> Bill $45/mo for every additional mailbox mapped beyond standard allowance blocks.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Viewport B: Customer Tickets */}
          {activeTab === 'operating' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Interactive Customer Support Queues Index
                </span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded font-mono uppercase font-bold">
                  Queue Distribution
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {ticketsList.map((ticket) => (
                  <div key={ticket.id} className="p-3.5 bg-slate-950 border border-gray-900 rounded-xl flex justify-between items-center hover:border-indigo-500/20 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[8.5px] uppercase font-bold border ${
                          ticket.severity === 'High' 
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                            : ticket.severity === 'Medium' 
                            ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' 
                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        }`}>
                          {ticket.severity} Severity
                        </span>
                        <span className="text-zinc-500 text-[9.5px]">Ticket #{ticket.id}</span>
                      </div>
                      <strong className="text-white text-[11px] block">{ticket.category}</strong>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[9.5px] text-zinc-500 block uppercase">Volume Ratio</span>
                      <strong className="text-stone-300 text-[11px] block">{ticket.count} cases</strong>
                      <span className="text-[9px] text-zinc-500">Avg Resolve: {ticket.avgResolveTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Viewport C: Top 5 Actions */}
          {activeTab === 'actions' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> COO Chronological Weekly Action Roadmap Plan
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded font-mono uppercase font-bold">
                  Committed Actions
                </span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: 'Commitment I: Technical Wizard Launch',
                    desc: 'Build out guided SPF / DKIM configuration panels directly in the account settings route to resolve setup friction.',
                    owner: 'Engineering Support Integration',
                    impact: 'Support Load: Cut by -40%'
                  },
                  {
                    step: 'Commitment II: Stripe Expansion Loop',
                    desc: 'Introduce multi-mailbox usage scaling triggers to limit standard lists to 3 Active mailbox accounts by default.',
                    owner: 'Billing Committee / Finance Systems',
                    impact: 'Expansion ARR: +15%'
                  },
                  {
                    step: 'Commitment III: Cognitive Router Audit',
                    desc: 'Run validation tests across our prompt routing schemas, retaining token costs strictly under $1.90 per 1,000 requests.',
                    owner: 'Systems Architecture Group',
                    impact: 'Gross Margins: > 81%'
                  },
                  {
                    step: 'Commitment IV: Deliverability Recruiting Pipeline',
                    desc: 'Constitute active hiring review cycles to secure an experienced Deliverability Lead Architect.',
                    owner: 'HR/Recruiting Team Baseline',
                    impact: 'Engineering Capacity: Clean setup pipeline'
                  },
                  {
                    step: 'Commitment V: EMEA VAR Channel Commissioning',
                    desc: 'Engage regional RevOps and CRM design consultants on standard commission matrices to drive localized lead loops.',
                    owner: 'Regional GTM Sales Advisory',
                    impact: 'Regional Lead Velocity: +28%'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-1.5 hover:border-amber-500/10 transition-all font-mono text-xs text-zinc-400">
                    <div className="flex justify-between items-center text-amber-400 font-bold text-[10px]">
                      <span>{item.step}</span>
                      <span className="bg-slate-900 border border-slate-800 text-stone-500 font-semibold px-1.5 py-0.5 rounded text-[8.5px]">Weekly Target</span>
                    </div>
                    <p className="text-zinc-200 leading-relaxed text-[11px]">{item.desc}</p>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-900 text-[10px] text-zinc-500">
                      <span>Owner: {item.owner}</span>
                      <strong className="text-emerald-400 font-semibold block">{item.impact}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Viewport D: Team Priorities */}
          {activeTab === 'team' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> COO Departmental Matrix & Cross-Functional Targets
                </span>
                <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-0.5 rounded font-mono uppercase font-bold">
                  Synergy Roadmap
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    role: 'Engineering & Delivery',
                    p1: 'Deploy dynamic DNS widgets and automate DKIM checking.',
                    p2: 'Analyze AI cognitive latency benchmarks across routes.',
                    stat: 'Uptime Standard: > 99.98%'
                  },
                  {
                    role: 'Sales & Marketing',
                    p1: 'Deploy Stripe multi-seat licensing models for mailboxes.',
                    p2: 'Acquire EMEA agency channels with 30% first-year commissions.',
                    stat: 'Seat Expansion ARR Target: 15%'
                  },
                  {
                    role: 'Customer Success & Support',
                    p1: 'Deploy pre-flight spam filter diagnostics resources to clear queues.',
                    p2: 'Initiate quarterly user NPS survey monitors.',
                    stat: 'Target Ticket Deflection: +35%'
                  },
                  {
                    role: 'RevOps & Finance',
                    p1: 'Audit weekly token cost vs. gross revenue outcomes.',
                    p2: 'Maintain structural platform gross margins over 81%.',
                    stat: 'Profit Margin Baseline: Checked'
                  }
                ].map((dept, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 border border-gray-900 rounded-xl space-y-3 font-mono text-xs">
                    <strong className="text-white text-xs block border-b border-gray-900 pb-1.5 uppercase tracking-wide flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
                      {dept.role}
                    </strong>
                    <div className="space-y-1.5 text-zinc-400 text-[10.5px]">
                      <div>
                        <strong className="text-rose-400 uppercase text-[9px] block">Priority 1:</strong>
                        <span>{dept.p1}</span>
                      </div>
                      <div>
                        <strong className="text-zinc-500 uppercase text-[9px] block font-semibold">Priority 2:</strong>
                        <span>{dept.p2}</span>
                      </div>
                    </div>
                    <div className="bg-[#111827]/60 p-2 rounded text-[10px] text-emerald-400 font-semibold">
                      {dept.stat}
                    </div>
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
