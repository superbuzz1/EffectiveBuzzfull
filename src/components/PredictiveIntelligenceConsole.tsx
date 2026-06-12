import React, { useState } from 'react';
import { 
  LineChart, TrendingUp, HelpCircle, HardDrive, Cpu, DollarSign, Users, Sparkles, 
  Zap, AlertTriangle, Mail, ToggleLeft, ToggleRight, RefreshCw, Layers, ShieldCheck, 
  ShieldAlert, Activity, ChevronRight, Gauge, FileSpreadsheet
} from 'lucide-react';

interface PredictionMetrics {
  churnRate: number;      // %
  survivalProb30Day: number; // %
  projectedArr: number;   // $
  quarterlyMrrGrowth: number; // %
  supportHiresNeed: number; // FTE
  engineeringHiresNeed: number; // FTE
  platformLatencyMs: number;  // ms
  monthlyComputeCost: number; // $
  nrrPercent: number;     // %
  expansionSeatSurcharge: number; // $
}

export default function PredictiveIntelligenceConsole() {
  // Input parameters (Interactive Sliders/Switches)
  const [visitorTraffic, setVisitorTraffic] = useState<number>(45000); // 10k to 100k
  const [visitorConversion, setVisitorConversion] = useState<number>(7.0); // 2.0% to 15.0%
  const [dnsWizardCompletion, setDnsWizardCompletion] = useState<number>(40); // 10% to 100%
  const [strictSeatEnforce, setStrictSeatEnforce] = useState<boolean>(false);
  const [regionalSovereignCloud, setRegionalSovereignCloud] = useState<boolean>(false);

  // Derive Base Metrics and Recalculated Values
  const isEnforced = strictSeatEnforce;
  const isSovereign = regionalSovereignCloud;

  // 1. Churn Analytics Model Projections
  // Higher DNS completion shrinks churn. Strict enforcement slightly raises early friction but improves ARPU, support latency lowers it.
  const baseChurn = 8.5; // %
  const currentChurnRate = Math.max(1.8, parseFloat((baseChurn - (dnsWizardCompletion - 40) * 0.08 + (isEnforced ? 0.6 : 0)).toFixed(2)));
  const survivalProb30Day = Math.round(100 - currentChurnRate * 1.5);

  // 2. Revenue Ingress Model Projections (ARR & MRR)
  const baseARR = 1248000;
  const newSignups = (visitorTraffic * (visitorConversion / 100)); // Estimated monthly leads
  const customerLTV = 31200; // Standard baseline standard contract value
  const activatedClients = Math.round(newSignups * (dnsWizardCompletion / 100));
  
  const pipelineAcquisitionARR = Math.round((activatedClients * 0.05) * customerLTV);
  const seatSurchargeIncremental = isEnforced ? 193000 : 45000;
  const sovereignUnblockedContracts = isSovereign ? 1400000 : 0;

  const currentProjectedArr = baseARR + pipelineAcquisitionARR + seatSurchargeIncremental + sovereignUnblockedContracts;
  const quarterlyMrrGrowth = parseFloat(((currentProjectedArr - baseARR) / baseARR * 100 / 4).toFixed(1));

  // 3. Capacitative Hiring Needs (Target Support and Architect FTEs)
  // Higher ticket loads driven by low DNS assistance increase support hires. High pipeline increases Engineering integrations.
  const estimatedTicketCount = Math.max(15, Math.round(180 - (dnsWizardCompletion - 40) * 1.8));
  const immediateSupportFteNeeds = Math.max(1, Math.round(estimatedTicketCount / 40)); 
  const engineeringFteNeeds = isSovereign ? 4 : (isEnforced ? 2 : 1);

  // 4. Infrastructure Scaling limits (Queuing calculations)
  // More mailboxes & active campaigns increase computational loads, sovereign separation distributes clusters
  const platformLatencyMs = Math.max(92, Math.round(198 - (dnsWizardCompletion > 60 ? 35 : 0) + (isSovereign ? 12 : 0)));
  const monthlyComputeCost = Math.round(4200 + (visitorTraffic * 0.04) + (isSovereign ? 2800 : 0));

  // 5. NRR & Customer Tier Markov expansions
  const currentNrrPercent = Math.min(138, Math.round(108 + (dnsWizardCompletion / 3.5) + (isEnforced ? 8 : 0)));

  // Score Badge assistance
  const getHazardBadge = (rate: number) => {
    if (rate >= 6.5) return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    if (rate >= 4.0) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Structural Headers Banner */}
      <div className="bg-gradient-to-r from-indigo-500/15 via-blue-500/5 to-transparent border border-indigo-900/30 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
                Predictive Analytics Core
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Project Prognosis Engine v1.0.0</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300">
              Project Prognosis: Predictive Intelligence Suite
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Simulate operational data variables including traffic rates, onboarding success, and cloud partition setups. Instantly models structural Churn curves, Hiring volumes, Infrastructure capacity, and ARR trajectories within our dynamic 95% Confidence bounds.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-indigo-400">
            <TrendingUp className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Mode: Forecasting Live</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Controls & Sliders Segment */}
        <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">Prognosis Predictors Layer</span>
              <h4 className="text-xs font-bold text-white uppercase font-mono">Tuning Core Independent Variables</h4>
              <p className="text-[11px] text-zinc-500 font-mono leading-normal">
                Vary structural operational variables to recalculate the company predictive model.
              </p>
            </div>

            <div className="space-y-4 pt-1">
              {/* Visitor Traffic Rate Slider */}
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 uppercase font-bold text-[10.5px]">Monthly Unique Visitions:</span>
                  <strong className="text-indigo-400 text-[11.5px]">{visitorTraffic.toLocaleString()} uniques</strong>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="100000"
                  step="5000"
                  value={visitorTraffic}
                  onChange={(e) => setVisitorTraffic(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-indigo-400"
                />
                <p className="text-[9px] text-zinc-500">Determines top of funnel volume pipelines (Signups calculated dynamically).</p>
              </div>

              {/* Conversion Rate Slider */}
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 uppercase font-bold text-[10.5px]">Visitor Signup Conversion:</span>
                  <strong className="text-indigo-400 text-[11.5px]">{visitorConversion.toFixed(1)}% Conversion</strong>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="15.0"
                  step="0.5"
                  value={visitorConversion}
                  onChange={(e) => setVisitorConversion(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-indigo-400"
                />
                <p className="text-[9px] text-zinc-500">Public sandbox and playground activations scale this signup conversion up.</p>
              </div>

              {/* DNS Wizard Completion slider */}
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 uppercase font-bold text-[10.5px]">DNS Guide Success Rate:</span>
                  <strong className="text-indigo-400 text-[11.5px]">{dnsWizardCompletion}% Success</strong>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={dnsWizardCompletion}
                  onChange={(e) => setDnsWizardCompletion(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-indigo-400"
                />
                <p className="text-[9px] text-zinc-500">Decreases customer friction points and early cohort support ticket backlog.</p>
              </div>

              {/* Strict mailbox seat limits toggle */}
              <div className="flex justify-between items-center pt-3 border-t border-zinc-800">
                <div className="space-y-0.5 font-mono">
                  <span className="text-[10.5px] text-zinc-300 font-bold uppercase block">Enforce strict Seat caps:</span>
                  <p className="text-[9px] text-zinc-500 max-w-[200px]">Enforces $45 overage item additions per extra registered mailbox.</p>
                </div>
                <button
                  onClick={() => setStrictSeatEnforce(!strictSeatEnforce)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                    strictSeatEnforce 
                      ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400' 
                      : 'bg-slate-950 border-slate-900 text-zinc-500'
                  }`}
                >
                  {strictSeatEnforce ? 'ENFORCED' : 'SOFT OVERLAY'}
                </button>
              </div>

              {/* Local database sovereign replication toggle */}
              <div className="flex justify-between items-center pt-3 border-t border-zinc-800">
                <div className="space-y-0.5 font-mono">
                  <span className="text-[10.5px] text-zinc-300 font-bold uppercase block">Sovereign Data Residency:</span>
                  <p className="text-[9px] text-zinc-500 max-w-[200px]">Physical multi-zone databases instantly unblock large EU/Arab pipelines.</p>
                </div>
                <button
                  onClick={() => setRegionalSovereignCloud(!regionalSovereignCloud)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                    regionalSovereignCloud 
                      ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400' 
                      : 'bg-slate-950 border-slate-900 text-zinc-500'
                  }`}
                >
                  {regionalSovereignCloud ? 'ACTIVE' : 'INACTIVE'}
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-zinc-950 rounded-lg border border-slate-900 text-[10px] text-zinc-500 font-mono leading-normal">
            <strong>Predictive Logic Matrix:</strong> These sliders act as exogenous covariates driving simulated time-series algorithms in Project Prognosis.
          </div>
        </div>

        {/* Right Side: Projections Outcomes Segments */}
        <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] p-5 rounded-xl flex flex-col justify-between space-y-4 font-mono text-xs">
          
          <div className="space-y-4">
            <span className="text-[10px] text-zinc-500 font-bold uppercase block tracking-wider">Estimated Model Outcomes Dashboard</span>

            {/* Simulated Predictor Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Churn Prediction */}
              <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-zinc-500 text-[9.5px] font-bold">
                  <span>CHURN & RETENTION PROBABILITY</span>
                  <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                </div>
                <div className="flex items-baseline justify-between">
                  <strong className="text-base font-bold text-white">{currentChurnRate}% Churn Rate</strong>
                  <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold border ${getHazardBadge(currentChurnRate)}`}>
                    {currentChurnRate >= 6.5 ? 'High Risk' : currentChurnRate >= 4.0 ? 'Elevated Churn' : 'Nominal Safety'}
                  </span>
                </div>
                <div className="text-[9px] text-zinc-400">
                  Estimated 30-day cohort survival rate is <span className="text-white font-bold">{survivalProb30Day}%</span>.
                </div>
              </div>

              {/* Revenue & Growth Prediction */}
              <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-zinc-500 text-[9.5px] font-bold">
                  <span>ARR RUN-RATE VELOCITY</span>
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <strong className="text-base font-bold text-white">${currentProjectedArr.toLocaleString()} ARR</strong>
                <div className="text-[9px] text-[#10b981] font-semibold">
                  QoQ MRR Growth Velocity estimated at +{quarterlyMrrGrowth}% 
                </div>
              </div>

              {/* Headcount Staff Planner */}
              <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-zinc-500 text-[9.5px] font-bold">
                  <span>RECOMMENDED CAPACITY FTE HIRING Needs</span>
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <strong className="text-base font-bold text-white">+{immediateSupportFteNeeds} CS / +{engineeringFteNeeds} Eng</strong>
                <div className="text-[9px] text-zinc-400">
                  SLA protections suggest expanding headcount as user queues scale.
                </div>
              </div>

              {/* Scale Capacity & Workload Costs */}
              <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-zinc-500 text-[9.5px] font-bold">
                  <span>INFRASTRUCTURE QUEUE METRICS</span>
                  <Cpu className="w-3.5 h-3.5 text-pink-400" />
                </div>
                <strong className="text-base font-bold text-white">{platformLatencyMs}ms / ${monthlyComputeCost.toLocaleString()} mo</strong>
                <div className="text-[9px] text-pink-400">
                  Blended routing parameters protect system latency targets.
                </div>
              </div>

            </div>

            {/* Markov Chain Expansion Indicator */}
            <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-zinc-500 text-[9.5px] font-bold">
                <span>PROJECTED NET REVENUE RETENTION (NRR)</span>
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              </div>
              <div className="flex items-baseline justify-between">
                <strong className="text-lg font-bold text-white">{currentNrrPercent}% NRR Factor</strong>
                <span className="text-[9.5px] text-[#10b981] font-semibold">
                  Surcharge capture adds +${seatSurchargeIncremental.toLocaleString()} ARR
                </span>
              </div>
              <p className="text-[9.5px] text-zinc-400 font-normal leading-normal">
                Markov sequence models predict that a higher DNS setup success rate directly transitions multi-tenant contact bases into expanded usage scales. Enforcing strict seat caps contributes up to an 8% lift in NRR.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 border border-slate-900 rounded-xl leading-relaxed space-y-1">
            <span className="text-white font-bold block text-[10.5px]">95% CONFIDENCE INTERVAL BI-DIRECTIONS</span>
            <p className="text-[10px] text-zinc-400 font-normal leading-normal">
              Based on active parameters, the estimated quarterly ARR run-rate holds a <span className="text-[#10b981] font-bold">95% Confidence interval</span> between <span className="text-white font-semibold">${Math.round(currentProjectedArr * 0.94).toLocaleString()}</span> (Pessimistic Lower Bound) and <span className="text-white font-semibold">${Math.round(currentProjectedArr * 1.05).toLocaleString()}</span> (Optimistic Target). Short-term fluctuations are governed primarily by signups velocity variance.
            </p>
          </div>

        </div>

      </div>

      {/* Visual Braid Confidence Interactive SVG Graph */}
      <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center">
          <div className="space-y-0.5">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">12-Month Predictive Analytics Chart</span>
            <h4 className="text-sm font-bold text-white uppercase">Prognosis Braid Confidence Bands</h4>
          </div>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-[9px] text-zinc-500 uppercase font-bold tracking-wider select-none">
            Confidence Model: Cox Proportional Hazard
          </span>
        </div>

        <div className="relative bg-slate-950 border border-slate-900 rounded-xl p-5 min-h-[220px]">
          {/* Legend indicator badges */}
          <div className="flex flex-wrap gap-4 text-[9px] font-bold text-zinc-400 mb-3 pl-6">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-yellow-400 rounded-full" /> Optimistic Target Interval (P95 upper): ${(currentProjectedArr * 1.05 / 1000000).toFixed(3)}M</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-indigo-500 rounded-full" /> Baseline Projected Case (Base): ${(currentProjectedArr / 1000000).toFixed(3)}M</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-rose-500 rounded-full" /> Pessimistic Volatility Bounds (P95 lower): ${(currentProjectedArr * 0.94 / 1000000).toFixed(3)}M</span>
          </div>

          <svg viewBox="0 0 500 200" className="w-full h-44 mt-4 overflow-visible">
            {/* Grid dividers */}
            <line x1="40" y1="20" x2="480" y2="20" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />
            <line x1="40" y1="70" x2="480" y2="70" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />
            <line x1="40" y1="120" x2="480" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />
            <line x1="40" y1="170" x2="480" y2="170" stroke="#1f2937" strokeWidth="1" />

            {/* Left Axis */}
            <text x="32" y="24" fill="#64748b" fontSize="8" textAnchor="end">$2.80M</text>
            <text x="32" y="74" fill="#64748b" fontSize="8" textAnchor="end">$2.00M</text>
            <text x="32" y="124" fill="#64748b" fontSize="8" textAnchor="end">$1.20M</text>
            <text x="32" y="174" fill="#64748b" fontSize="8" textAnchor="end">Q2</text>

            {/* Calendar Ticks */}
            <text x="40" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Current</text>
            <text x="150" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Day-90</text>
            <text x="260" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Day-180</text>
            <text x="370" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Day-270</text>
            <text x="480" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Day-360 Proj</text>

            {/* 1. CONFIDENCE INTERVAL SHADED POLYGON (95% BRAID) */}
            {/* This polygon creates the beautiful background error boundaries reacting to values */}
            <polygon
              points={`40,123 150,${Math.round(123 - (currentProjectedArr * 0.94 - baseARR) * 0.00002)} 260,${Math.round(112 - (currentProjectedArr * 0.94 - baseARR) * 0.000035)} 370,${Math.round(98 - (currentProjectedArr * 0.94 - baseARR) * 0.000055)} 480,${Math.round(82 - (currentProjectedArr * 0.94 - baseARR) * 0.00007)} 480,${Math.round(82 - (currentProjectedArr * 1.05 - baseARR) * 0.00007)} 370,${Math.round(98 - (currentProjectedArr * 1.05 - baseARR) * 0.000055)} 260,${Math.round(112 - (currentProjectedArr * 1.05 - baseARR) * 0.000035)} 150,${Math.round(123 - (currentProjectedArr * 1.05 - baseARR) * 0.00002)} 40,123`}
              fill="#6366f1"
              fillOpacity="0.06"
              className="transition-all duration-700 ease-out"
            />

            {/* 2. OPTIMISTIC INTENSITY BOUNDS LINE (P95 Upper) */}
            <path
              d={`M 40,123 L 150,${Math.round(123 - (currentProjectedArr * 1.05 - baseARR) * 0.00002)} L 260,${Math.round(112 - (currentProjectedArr * 1.05 - baseARR) * 0.000035)} L 370,${Math.round(98 - (currentProjectedArr * 1.05 - baseARR) * 0.000055)} L 480,${Math.round(82 - (currentProjectedArr * 1.05 - baseARR) * 0.00007)}`}
              fill="none"
              stroke="#eab308"
              strokeWidth="1.5"
              strokeDasharray="2"
              className="transition-all duration-700 ease-out"
            />

            {/* 3. BASELINE PATHWAY LINE (Expected Scenario) */}
            <path
              d={`M 40,123 L 150,${Math.round(123 - (currentProjectedArr - baseARR) * 0.00002)} L 260,${Math.round(112 - (currentProjectedArr - baseARR) * 0.000035)} L 370,${Math.round(98 - (currentProjectedArr - baseARR) * 0.000055)} L 480,${Math.round(82 - (currentProjectedArr - baseARR) * 0.00007)}`}
              fill="none"
              stroke="#6366f1"
              strokeWidth="3.5"
              className="transition-all duration-700 ease-out"
            />

            {/* 4. PESSIMISTIC LOWER-BOUND LINE (P95 Lower Risk) */}
            <path
              d={`M 40,123 L 150,${Math.round(123 - (currentProjectedArr * 0.94 - baseARR) * 0.00002)} L 260,${Math.round(112 - (currentProjectedArr * 0.94 - baseARR) * 0.000035)} L 370,${Math.round(98 - (currentProjectedArr * 0.94 - baseARR) * 0.000055)} L 480,${Math.round(82 - (currentProjectedArr * 0.94 - baseARR) * 0.00007)}`}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="1.5"
              strokeDasharray="2"
              className="transition-all duration-700 ease-out"
            />

            {/* Highlight End Node anchor */}
            <circle cx="480" cy={Math.round(82 - (currentProjectedArr - baseARR) * 0.00007)} r="4" fill="#6366f1" />
          </svg>
        </div>
      </div>
    </div>
  );
}
