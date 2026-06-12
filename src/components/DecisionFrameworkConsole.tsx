import React, { useState } from 'react';
import { 
  Network, Server, Database, Layers, ShieldCheck, Heart, Sparkles, Sliders, 
  Settings, MessageSquare, Compass, BarChart, BookOpen, AlertTriangle, Cpu, 
  Mail, GitPullRequest, CreditCard, Shield, Users, Building2, Globe, Landmark, 
  Award, DollarSign, Activity, TrendingUp, RefreshCw, Zap, CheckCircle2, ChevronRight,
  Gauge, AlertCircle, HelpCircle, HardDrive
} from 'lucide-react';

interface DecisionItem {
  id: string;
  title: string;
  cadence: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  category: 'revenue' | 'product' | 'customer' | 'operational';
  trigger: string;
  decisionText: string;
  impactScore: number; // 1-100
  riskScore: number; // 1-100
  effortScore: number; // 1-100
  status: 'pending' | 'active';
  mitigation: string;
}

export default function DecisionFrameworkConsole() {
  const [activeCadence, setActiveCadence] = useState<'all' | 'daily' | 'weekly' | 'monthly' | 'quarterly'>('all');
  const [activeCategory, setActiveCategory] = useState<'all' | 'revenue' | 'product' | 'customer' | 'operational'>('all');
  const [selectedDecisionId, setSelectedDecisionId] = useState<string>('day_dns_diagnostic');

  // Interactive Decisions activations state
  const [decisions, setDecisions] = useState<DecisionItem[]>([
    {
      id: 'day_seat_limit',
      title: 'Enforce Outbox Seat-Limit Verification & Surcharge Warning',
      cadence: 'daily',
      category: 'revenue',
      trigger: 'Tenant credentials sharing detected with active mailbox count exceeding seat license limits (> 3 senders).',
      decisionText: 'Dynamically flag credentials overlapping, warning client workspace managers, and route accounts to custom checkout links.',
      impactScore: 82,
      riskScore: 24,
      effortScore: 18,
      status: 'pending',
      mitigation: 'Draft automatic warning badges in layout before billing charge, preventing support disputes.'
    },
    {
      id: 'day_dns_diagnostic',
      title: 'Deploy Automated pre-Flight Setup DNS Configuration Diagnostic Wizards',
      cadence: 'daily',
      category: 'customer',
      trigger: 'Customer sequences remain unverified with failing SPF/DKIM validation indices past Day-3.',
      decisionText: 'Unblock client onboarding hurdles using immediate self-guided diagnostic wizards inside workspace dashboards.',
      impactScore: 94,
      riskScore: 18,
      effortScore: 40,
      status: 'pending',
      mitigation: 'Build preloaded configuration helper instructions matched automatically to known hosting providers.'
    },
    {
      id: 'day_cost_routing',
      title: 'Integrate Autopilot Dynamic Gemini Model Routing Policies',
      cadence: 'daily',
      category: 'operational',
      trigger: 'Synthesis cost patterns grow past $0.85/M tokens or outbox campaign volumes spike above 5,000.',
      decisionText: 'Route low-complexity text cleaning and processing queries to Gemini-3.5-Flash pod, reserving Pro model for enterprise content synthesis.',
      impactScore: 78,
      riskScore: 12,
      effortScore: 28,
      status: 'pending',
      mitigation: 'Employ cache-based schema matching to guarantee high contextual accuracy across routing variations.'
    },
    {
      id: 'week_support_triage',
      title: 'Triage Engineering Sprints to Support Caseload Priorities',
      cadence: 'weekly',
      category: 'operational',
      trigger: 'Active ticket backlog cycles expand past 120, with over 40% traceable to custom server setups.',
      decisionText: 'Temporarily assign senior developers to improve in-app diagnostic code tools and support setup portals.',
      impactScore: 84,
      riskScore: 20,
      effortScore: 45,
      status: 'pending',
      mitigation: 'Prevent scope creep by restricting engineers exclusively to diagnostics fixes.'
    },
    {
      id: 'week_bounce_cleanup',
      title: 'Implement Deliverability Target Domain Reputation Cleansing',
      cadence: 'weekly',
      category: 'product',
      trigger: 'Bounce rate averages drift past 4.2% across sequence pipelines, endangering sender pool reputations.',
      decisionText: 'Pause cold-sequences on high-bounce mailboxes and redistribute outbox runs across warm, high-score domains.',
      impactScore: 90,
      riskScore: 35,
      effortScore: 30,
      status: 'pending',
      mitigation: 'Apply automatic cold sender intervals before re-initiating sequences.'
    },
    {
      id: 'month_stripe_integration',
      title: 'Activate stripe Expansion Mailbox Seat Overages',
      cadence: 'monthly',
      category: 'revenue',
      trigger: 'Blended profile bounds exceed professional seat allowances during billing calendar resets.',
      decisionText: 'Directly apply standard $45/mo expansion mailboxes overage charges automatically to Stripe items.',
      impactScore: 88,
      riskScore: 48,
      effortScore: 50,
      status: 'pending',
      mitigation: 'Incentivize compliance by offering a grace periods toggle inside client billing pages.'
    },
    {
      id: 'month_partner_alliance',
      title: 'Onboard Regional Value-Added Reseller Partner channels',
      cadence: 'monthly',
      category: 'customer',
      trigger: 'Indirect partnership pipelines generate less than 15% of inbound sales ARR velocity.',
      decisionText: 'Partner with European and Arab country CRM agencies, guaranteeing 30% first year referral commissions.',
      impactScore: 85,
      riskScore: 15,
      effortScore: 32,
      status: 'pending',
      mitigation: 'Build pre-packaged localized campaigns and sales assets to decrease partner learning barriers.'
    },
    {
      id: 'quarter_sovereign_partition',
      title: 'Deploy physically isolated European and GCC local databases',
      cadence: 'quarterly',
      category: 'operational',
      trigger: 'Enterprise pipeline worth $1.4M is backlogged due to strict EU GDPR data residency or UAE sovereign local storage laws.',
      decisionText: 'Launch distinct, physically segregated database layers inside AWS Frankfurt and Dubai Moro Hub partitions.',
      impactScore: 98,
      riskScore: 82,
      effortScore: 88,
      status: 'pending',
      mitigation: 'Synchronize tenant schema changes centrally while physically segregating user email data fields.'
    },
    {
      id: 'quarter_runway_capital',
      title: 'Execute Series A Treasury Runway reallocation policies',
      cadence: 'quarterly',
      category: 'revenue',
      trigger: 'Cash reserves drift beneath $250k or Series A requirements demand runway performance milestones.',
      decisionText: 'Consolidate Runway, devoting 40% of our $1.5M pool to target partners networks, and 40% to onboarding guides.',
      impactScore: 92,
      riskScore: 16,
      effortScore: 38,
      status: 'pending',
      mitigation: 'Maintain disciplined $300k reserve buffer pools to absorb unexpected operational cost rises.'
    }
  ]);

  // Toggle decision status
  const toggleDecisionStatus = (id: string) => {
    setDecisions(prev => prev.map(dec => {
      if (dec.id === id) {
        return { ...dec, status: dec.status === 'pending' ? 'active' : 'pending' };
      }
      return dec;
    }));
  };

  // Derive simulated metrics dynamically based on decisions state (Active vs Pending)
  const isDnsDiagnosticActive = decisions.find(d => d.id === 'day_dns_diagnostic')?.status === 'active';
  const isSeatLimitActive = decisions.find(d => d.id === 'day_seat_limit')?.status === 'active';
  const isCostRoutingActive = decisions.find(d => d.id === 'day_cost_routing')?.status === 'active';
  const isSupportTriageActive = decisions.find(d => d.id === 'week_support_triage')?.status === 'active';
  const isBounceCleanupActive = decisions.find(d => d.id === 'week_bounce_cleanup')?.status === 'active';
  const isStripeActive = decisions.find(d => d.id === 'month_stripe_integration')?.status === 'active';
  const isPartnerActive = decisions.find(d => d.id === 'month_partner_alliance')?.status === 'active';
  const isSovereignActive = decisions.find(d => d.id === 'quarter_sovereign_partition')?.status === 'active';
  const isRunwayActive = decisions.find(d => d.id === 'quarter_runway_capital')?.status === 'active';

  // Base constants
  const baseARR = 1248000;
  const baseSupportTickets = 180;
  const baseAvgLatency = 198;
  const baseActivationRate = 40;
  const baseLtvToCac = 9.1;

  // Recalculations
  const simulatedSurchargeARR = isStripeActive ? 193000 : (isSeatLimitActive ? 95000 : 45000);
  const simulatedSovereignARR = isSovereignActive ? 1400000 : 0;
  const simulatedPartnerARR = isPartnerActive ? 285000 : 0;
  const totalARR = baseARR + simulatedSurchargeARR + simulatedSovereignARR + simulatedPartnerARR;

  const totalSupportTickets = Math.max(15, baseSupportTickets 
    - (isDnsDiagnosticActive ? 85 : 0) 
    - (isSupportTriageActive ? 45 : 0)
    + (isPartnerActive ? 30 : 0)
  );

  const avgLatency = Math.max(120, baseAvgLatency 
    - (isCostRoutingActive ? 55 : 0) 
    + (isSovereignActive ? 15 : 0)
  );

  const activationRate = Math.min(95, baseActivationRate 
    + (isDnsDiagnosticActive ? 38 : 0) 
    + (isSupportTriageActive ? 12 : 0)
  );

  const simulatedLtvToCac = (baseLtvToCac 
    + (isDnsDiagnosticActive ? 1.4 : 0)
    + (isPartnerActive ? 0.8 : 0)
    - (isSovereignActive ? 0.5 : 0) // setup costs
    + (isRunwayActive ? 1.1 : 0)
  ).toFixed(1);

  // Score badge helper
  const getScoreColor = (score: number, type: 'impact' | 'risk' | 'effort') => {
    if (type === 'impact') {
      if (score >= 85) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      if (score >= 70) return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20';
    } else if (type === 'risk') {
      if (score >= 70) return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      if (score >= 40) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    } else { // effort
      if (score >= 70) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      if (score >= 40) return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  // Filter items
  const filteredDecisions = decisions.filter(dec => {
    const cadenceMatch = activeCadence === 'all' || dec.cadence === activeCadence;
    const categoryMatch = activeCategory === 'all' || dec.category === activeCategory;
    return cadenceMatch && categoryMatch;
  });

  const selectedDecision = decisions.find(d => d.id === selectedDecisionId) || decisions[0];

  return (
    <div className="space-y-6">
      {/* Visual Header Ring */}
      <div className="bg-gradient-to-r from-teal-500/15 via-indigo-500/5 to-transparent border border-teal-900/30 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-teal-500/10 text-teal-400 text-xs font-mono font-bold uppercase tracking-wider">
                Corporate Governance Matrix
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Executive AI Advisor Blueprint</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300">
              Project Eidolon: Strategic AI Decision Framework
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              An interactive operational advisor analyzing Revenue, Product, Customer, and Support metrics. Model real-time tactical decisions across daily, weekly, monthly, and quarterly horizons to evaluate risk and impact values.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-teal-400">
            <Sliders className="w-4 h-4 text-teal-400" />
            <span>Telemetry Mode: Active</span>
          </div>
        </div>
      </div>

      {/* Corporate Telemetry Metrics Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { 
            label: 'Annual recurring revenue', 
            val: `$${totalARR.toLocaleString()}`, 
            change: totalARR > baseARR ? `+$${(totalARR-baseARR).toLocaleString()} scaled` : 'Baseline state', 
            color: 'text-emerald-400', 
            bg: 'border-emerald-950/40 bg-emerald-500/[0.02]',
            icon: DollarSign
          },
          { 
            label: 'Monthly support tickets', 
            val: `${totalSupportTickets} queue count`, 
            change: totalSupportTickets < baseSupportTickets ? `Cuts ticket rates by -${Math.round(100 - (totalSupportTickets/baseSupportTickets)*100)}%` : 'Standard workload', 
            color: totalSupportTickets <= 60 ? 'text-emerald-400' : totalSupportTickets <= 120 ? 'text-amber-400' : 'text-rose-400', 
            bg: 'border-slate-900/80 bg-slate-950/40',
            icon: Mail
          },
          { 
            label: 'SDR Sequence configuration', 
            val: `${activationRate}% Activations`, 
            change: activationRate > baseActivationRate ? `Improved by +${activationRate - baseActivationRate}%` : 'Standard state', 
            color: 'text-amber-400', 
            bg: 'border-amber-950/40 bg-amber-500/[0.02]',
            icon: Zap
          },
          { 
            label: 'Average platform latency', 
            val: `${avgLatency}ms response`, 
            change: avgLatency < baseAvgLatency ? `Reduced latency: -${baseAvgLatency - avgLatency}ms` : 'Target threshold', 
            color: 'text-indigo-400', 
            bg: 'border-slate-900/80 bg-slate-950/40',
            icon: Server
          },
          { 
            label: 'LTV-to-CAC Efficiency', 
            val: `${simulatedLtvToCac}x value`, 
            change: parseFloat(simulatedLtvToCac) >= 9.5 ? 'Series A Optimal decile' : 'Standard target range', 
            color: 'text-pink-400', 
            bg: 'border-slate-900/80 bg-slate-950/40',
            icon: TrendingUp
          }
        ].map((met, idx) => {
          const Icon = met.icon;
          return (
            <div key={idx} className={`p-4 border rounded-xl space-y-1 font-mono transition-all duration-500 ${met.bg}`}>
              <span className="text-zinc-500 text-[9.5px] uppercase font-bold flex items-center gap-1.5 tracking-wider">
                <Icon className="w-3.5 h-3.5 text-zinc-400" /> {met.label}
              </span>
              <strong className={`text-sm md:text-base font-bold block ${met.color}`}>{met.val}</strong>
              <span className="text-[9px] text-zinc-405 block text-zinc-400 truncate">{met.change}</span>
            </div>
          );
        })}
      </div>

      {/* Decisions Controls and Lists Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Hand side filters & selector list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-4">
            
            {/* Filter Cadence */}
            <div className="space-y-1.5 font-mono">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block tracking-wider">Select Cadence Filter:</span>
              <div className="flex flex-wrap gap-1">
                {(['all', 'daily', 'weekly', 'monthly', 'quarterly'] as const).map((cad) => (
                  <button
                    key={cad}
                    onClick={() => setActiveCadence(cad)}
                    className={`px-2.5 py-1 rounded text-[9px] uppercase font-bold transition-all cursor-pointer border ${
                      activeCadence === cad
                        ? 'bg-teal-500/15 border-teal-500/30 text-white'
                        : 'bg-slate-900/40 border-slate-900 text-zinc-500 hover:text-zinc-400'
                    }`}
                  >
                    {cad}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Category */}
            <div className="space-y-1.5 font-mono border-t border-zinc-900 pt-3">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block tracking-wider">Select Category Filter:</span>
              <div className="flex flex-wrap gap-1">
                {(['all', 'revenue', 'product', 'customer', 'operational'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 rounded text-[9px] uppercase font-bold transition-all cursor-pointer border ${
                      activeCategory === cat
                        ? 'bg-teal-500/15 border-teal-500/30 text-white'
                        : 'bg-slate-900/40 border-slate-900 text-zinc-500 hover:text-zinc-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Decisions List */}
          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {filteredDecisions.map((dec) => (
              <button
                key={dec.id}
                onClick={() => setSelectedDecisionId(dec.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer block font-mono space-y-2 ${
                  selectedDecisionId === dec.id
                    ? 'bg-gradient-to-r from-teal-500/[0.03] to-indigo-500/[0.02] border-teal-500/30 text-white shadow-md'
                    : 'bg-slate-950 border-slate-900/80 text-zinc-400 hover:text-zinc-300'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8.5px] uppercase font-bold bg-slate-900 px-1 rounded text-zinc-500 border border-slate-800">
                        {dec.cadence}
                      </span>
                      <span className="text-[8.5px] uppercase font-bold text-teal-400">
                        {dec.category}
                      </span>
                    </div>
                    <strong className="text-xs font-medium block leading-snug text-zinc-200 mt-1">
                      {dec.title}
                    </strong>
                  </div>
                  
                  {/* Active / Pending switch marker */}
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1 ${
                    dec.status === 'active' ? 'bg-emerald-400 animate-ping' : 'bg-slate-700'
                  }`} />
                </div>
              </button>
            ))}

            {filteredDecisions.length === 0 && (
              <div className="text-center p-8 bg-slate-950 border border-slate-900 rounded-xl font-mono text-[10.5px] text-zinc-500">
                No decisions match current selected filters.
              </div>
            )}
          </div>
        </div>

        {/* Right Hand side detailed cockpit parameters block */}
        <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            
            {/* Context Title Info */}
            <div className="flex justify-between items-start border-b border-zinc-800 pb-3">
              <div className="space-y-1 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] uppercase font-bold bg-slate-950 border border-slate-900 px-1.5 py-0.5 rounded text-zinc-400">
                    {selectedDecision.cadence} Cadence playbook
                  </span>
                  <span className="text-[9px] uppercase font-bold text-teal-400">
                    Category: {selectedDecision.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight font-display pr-4 leading-tight">
                  {selectedDecision.title}
                </h4>
              </div>

              {/* Status Switcher Button */}
              <button
                onClick={() => toggleDecisionStatus(selectedDecision.id)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border cursor-pointer transition-all ${
                  selectedDecision.status === 'active'
                    ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                    : 'bg-slate-950 border-slate-900 text-zinc-500 hover:text-zinc-400 hover:border-zinc-800'
                }`}
              >
                {selectedDecision.status === 'active' ? '✔ ACTIVE' : '▸ ACTIVATE'}
              </button>
            </div>

            {/* Core telemetry details */}
            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1 text-zinc-300">
                <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-wider block">TELEMETRY DEVIATION TRIGGER:</span>
                <p className="p-3 bg-slate-950 border border-slate-900 rounded-lg text-[11px] text-zinc-400 leading-relaxed font-normal italic">
                  "{selectedDecision.trigger}"
                </p>
              </div>

              <div className="space-y-1 text-zinc-300">
                <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-wider block">RECOMMENDED DECISION SCRIPT:</span>
                <p className="p-3 bg-slate-950/40 border border-slate-900/60 rounded-lg text-[11.5px] text-zinc-300 leading-relaxed">
                  {selectedDecision.decisionText}
                </p>
              </div>
            </div>

            {/* Dynamic Rank Gauges */}
            <div className="space-y-2.5 pt-1 font-mono text-xs">
              <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-wider block">Strategic Evaluative Rankings:</span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Metric Row A: Impact */}
                <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-zinc-500 text-[10px] font-bold uppercase block tracking-wider">Impact Score</span>
                  <div className="flex justify-between items-baseline pt-0.5">
                    <span className="text-base font-bold text-white">{selectedDecision.impactScore}/100</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border ${getScoreColor(selectedDecision.impactScore, 'impact')}`}>
                      {selectedDecision.impactScore >= 85 ? 'Critical' : 'High'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-1 rounded mt-1.5 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded" style={{ width: `${selectedDecision.impactScore}%` }} />
                  </div>
                </div>

                {/* Metric Row B: Risk */}
                <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-zinc-500 text-[10px] font-bold uppercase block tracking-wider">Risk Score</span>
                  <div className="flex justify-between items-baseline pt-0.5">
                    <span className="text-base font-bold text-white">{selectedDecision.riskScore}/100</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border ${getScoreColor(selectedDecision.riskScore, 'risk')}`}>
                      {selectedDecision.riskScore >= 70 ? 'Critical' : selectedDecision.riskScore >= 40 ? 'Medium' : 'Safety'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-1 rounded mt-1.5 overflow-hidden">
                    <div className="bg-rose-500 h-full rounded" style={{ width: `${selectedDecision.riskScore}%` }} />
                  </div>
                </div>

                {/* Metric Row C: Effort */}
                <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-zinc-500 text-[10px] font-bold uppercase block tracking-wider font-semibold">Effort Rating</span>
                  <div className="flex justify-between items-baseline pt-0.5">
                    <span className="text-base font-bold text-white">{selectedDecision.effortScore}/100</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border ${getScoreColor(selectedDecision.effortScore, 'effort')}`}>
                      {selectedDecision.effortScore >= 70 ? 'High' : selectedDecision.effortScore >= 40 ? 'Medium' : 'Light'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-1 rounded mt-1.5 overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded" style={{ width: `${selectedDecision.effortScore}%` }} />
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="p-3.5 bg-zinc-900/40 rounded-xl border border-zinc-805 text-[10px] text-zinc-400 font-mono leading-relaxed space-y-1">
            <strong className="text-white text-[10.5px] uppercase block">SAFEGUARD & RISK MITIGATION PROTOCOL:</strong>
            <p className="leading-relaxed font-normal">{selectedDecision.mitigation}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
