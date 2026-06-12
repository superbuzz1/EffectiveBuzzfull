import React, { useState } from 'react';
import { 
  Beaker, Check, Plus, RotateCcw, Play, AlertTriangle, HelpCircle,
  TrendingUp, Award, Layers, Percent, Settings, Sliders, PlayCircle,
  Clock, ShieldAlert, Cpu, CheckCircle, RefreshCcw, Mail, Target, Coins,
  ChevronRight, Sparkles, AlertCircle
} from 'lucide-react';

interface Experiment {
  id: string;
  name: string;
  category: 'Email Copy' | 'Subject Lines' | 'ICP Segments' | 'Pricing' | 'Onboarding';
  status: 'Draft' | 'Running' | 'Concluded';
  metric: string;
  variantA: { name: string; impressions: number; conversions: number };
  variantB: { name: string; impressions: number; conversions: number };
  rolloutProgress: number; // 0 to 100
  autopilot: boolean;
}

const INITIAL_EXPERIMENTS: Experiment[] = [
  {
    id: "exp_1",
    name: "Short Conversational Pitch Intro vs Bulleted Solution Features",
    category: "Email Copy",
    status: "Running",
    metric: "Reply Rate",
    variantA: { name: "A: Control (Conversational Intro)", impressions: 2400, conversions: 182 },
    variantB: { name: "B: Treatment (Bulleted Features)", impressions: 2450, conversions: 236 },
    rolloutProgress: 50,
    autopilot: true
  },
  {
    id: "exp_2",
    name: "Urgency-Based Case Study vs Direct Calendly Invite Header",
    category: "Subject Lines",
    status: "Running",
    metric: "Open Rate",
    variantA: { name: "A: Control (Quick Case Study)", impressions: 4500, conversions: 1220 },
    variantB: { name: "B: Treatment (Let's align Mon/Tue?)", impressions: 4600, conversions: 1445 },
    rolloutProgress: 50,
    autopilot: false
  },
  {
    id: "exp_3",
    name: "Fintech VC vs Series A Bootstrapped Founders Target Cohorts",
    category: "ICP Segments",
    status: "Running",
    metric: "Demo Booking Rate",
    variantA: { name: "A: Control (Fintech VC)", impressions: 1200, conversions: 78 },
    variantB: { name: "B: Treatment (Bootstrapped Founders)", impressions: 1100, conversions: 61 },
    rolloutProgress: 50,
    autopilot: true
  },
  {
    id: "exp_4",
    name: "Usage-Based Seat Cap vs Annual Unlimited Contract Option",
    category: "Pricing",
    status: "Concluded",
    metric: "Conversion Rate",
    variantA: { name: "A: Control (Usage-Based)", impressions: 1800, conversions: 54 },
    variantB: { name: "B: Treatment (Annual Unlimited)", impressions: 1850, conversions: 89 },
    rolloutProgress: 100,
    autopilot: true
  },
  {
    id: "exp_5",
    name: "Interactive App Setup Tour Wizard vs Instant Sandbox Dashboard",
    category: "Onboarding",
    status: "Draft",
    metric: "Product Activation Rate",
    variantA: { name: "A: Control (Onboarding Checklist Wizard)", impressions: 0, conversions: 0 },
    variantB: { name: "B: Treatment (Instant Access Sandbox App)", impressions: 0, conversions: 0 },
    rolloutProgress: 0,
    autopilot: false
  }
];

export default function ExperimentationPlatformConsole() {
  const [experiments, setExperiments] = useState<Experiment[]>(INITIAL_EXPERIMENTS);
  const [selectedExp, setSelectedExp] = useState<Experiment>(INITIAL_EXPERIMENTS[0]);
  const [activeTab, setActiveTab ] = useState<'dashboard' | 'simulator' | 'strategy'>('dashboard');

  // Input bindings for adding a custom experiment
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'Email Copy' | 'Subject Lines' | 'ICP Segments' | 'Pricing' | 'Onboarding'>('Email Copy');
  const [newMetric, setNewMetric] = useState('Conversion Rate');
  const [newVariantAName, setNewVariantAName] = useState('A: Control');
  const [newVariantBName, setNewVariantBName] = useState('B: Treatment');

  // Interactive Live Playground Override Form parameters
  const [tempImpressionsA, setTempImpressionsA] = useState<number>(selectedExp.variantA.impressions);
  const [tempConversionsA, setTempConversionsA] = useState<number>(selectedExp.variantA.conversions);
  const [tempImpressionsB, setTempImpressionsB] = useState<number>(selectedExp.variantB.impressions);
  const [tempConversionsB, setTempConversionsB] = useState<number>(selectedExp.variantB.conversions);

  const [feedbackAlert, setFeedbackAlert] = useState<string | null>(null);

  // Sync state whenever the selected experiment transitions
  const syncFormFields = (exp: Experiment) => {
    setSelectedExp(exp);
    setTempImpressionsA(exp.variantA.impressions);
    setTempConversionsA(exp.variantA.conversions);
    setTempImpressionsB(exp.variantB.impressions);
    setTempConversionsB(exp.variantB.conversions);
  };

  // Normal Distribution Cumulative Density Function (CDF) Approximation
  const normalCDF = (z: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.39894228 * Math.exp(-(z * z) / 2);
    const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return z > 0 ? 1 - p : p;
  };

  // Heavy duty Statistical analysis engine for chosen metrics
  const calculateStatisticalOutput = (na: number, ca: number, nb: number, cb: number) => {
    if (na <= 0 || nb <= 0) {
      return { pA: 0, pB: 0, lift: 0, zScore: 0, pValue: 1, significant: false, bayesianB: 50 };
    }

    const pA = ca / na;
    const pB = cb / nb;
    const lift = pA > 0 ? ((pB - pA) / pA) * 100 : 0;

    // Pooled standard error calculations
    const pooledP = (ca + cb) / (na + nb);
    if (pooledP <= 0 || pooledP >= 1) {
      return { pA, pB, lift, zScore: 0, pValue: 1, significant: false, bayesianB: 50 };
    }

    const standardError = Math.sqrt(pooledP * (1 - pooledP) * ((1 / na) + (1 / nb)));
    const zScore = (pB - pA) / standardError;
    const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
    const significant = pValue < 0.05;

    // Approximated Bayesian probability of B outperforming A based on Normal CDF variance
    // With diffuse prior parameter bounds
    const diff = pB - pA;
    const pooledVariance = (pA * (1 - pA)) / na + (pB * (1 - pB)) / nb;
    let bayesianB = 50;
    if (pooledVariance > 0) {
      const bayesianZ = diff / Math.sqrt(pooledVariance);
      bayesianB = Math.round(normalCDF(bayesianZ) * 1000) / 10;
    }

    return {
      pA: pA * 100,
      pB: pB * 100,
      lift,
      zScore,
      pValue,
      significant,
      bayesianB
    };
  };

  const stats = calculateStatisticalOutput(
    tempImpressionsA, tempConversionsA,
    tempImpressionsB, tempConversionsB
  );

  // Handle Form for launching a brand new experiment
  const handleCreateExperiment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newExp: Experiment = {
      id: `exp_${Date.now()}`,
      name: newName,
      category: newCategory,
      status: "Draft",
      metric: newMetric,
      variantA: { name: newVariantAName, impressions: 0, conversions: 0 },
      variantB: { name: newVariantBName, impressions: 0, conversions: 0 },
      rolloutProgress: 0,
      autopilot: false
    };

    setExperiments(prev => [...prev, newExp]);
    setNewName('');
    syncFormFields(newExp);
    setFeedbackAlert(`Growth experiment successfully drafted in category: "${newCategory}"! Deploy traffic to begin tracking.`);
    setTimeout(() => setFeedbackAlert(null), 5000);
  };

  // Modify currently selected simulation variables
  const handleApplySimulation = (e: React.FormEvent) => {
    e.preventDefault();
    setExperiments(prev => prev.map(exp => {
      if (exp.id === selectedExp.id) {
        return {
          ...exp,
          variantA: { ...exp.variantA, impressions: tempImpressionsA, conversions: tempConversionsA },
          variantB: { ...exp.variantB, impressions: tempImpressionsB, conversions: tempConversionsB },
          status: (tempImpressionsA > 0 || tempImpressionsB > 0) ? 'Running' : exp.status
        };
      }
      return exp;
    }));

    setFeedbackAlert(`Injected custom conversions to Variant telemetry. Statistical engines recomputed.`);
    setTimeout(() => setFeedbackAlert(null), 5000);
  };

  // Adjust live canary traffic rollout ramp allocation
  const handleUpdateRollout = (progress: number) => {
    setExperiments(prev => prev.map(exp => {
      if (exp.id === selectedExp.id) {
        return { ...exp, rolloutProgress: progress };
      }
      return exp;
    }));
    setSelectedExp(prev => ({ ...prev, rolloutProgress: progress }));
  };

  // Toggle Auto-Winner Deployment Setting
  const handleToggleAutopilot = () => {
    const updatedVal = !selectedExp.autopilot;
    setExperiments(prev => prev.map(exp => {
      if (exp.id === selectedExp.id) {
        return { ...exp, autopilot: updatedVal };
      }
      return exp;
    }));
    setSelectedExp(prev => ({ ...prev, autopilot: updatedVal }));
    setFeedbackAlert(`Automatic winner detection autopilot toggled ${updatedVal ? 'ON' : 'OFF'} for ${selectedExp.name}.`);
    setTimeout(() => setFeedbackAlert(null), 4000);
  };

  const handleResetExperiments = () => {
    setExperiments(INITIAL_EXPERIMENTS);
    syncFormFields(INITIAL_EXPERIMENTS[0]);
    setFeedbackAlert("Growth Experimentation Platform reverted to basic defaults.");
    setTimeout(() => setFeedbackAlert(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Platform Title Banner */}
      <div className="bg-gradient-to-r from-violet-500/15 via-zinc-500/5 to-transparent border border-violet-900/30 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-violet-500/10 text-violet-400 text-xs font-mono font-bold uppercase tracking-wider">
                CHIEF GROWTH SCIENTIST SPECIFICATION
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">B/B Multivariate Core Engine</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300">
              Growth Experimentation & Multi-Arm Platform
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Launch, model, and deploy statistical tests for Email Copy, Subject Lines, ICP Targets, Pricing Schemes, and Onboarding Flows. Features live Frequentist & Bayesian metrics estimators.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-zinc-300">
            <Beaker className="w-4 h-4 text-violet-400 animate-pulse" />
            <span>Telemetry Stack Online</span>
          </div>
        </div>
      </div>

      {/* Alert banner */}
      {feedbackAlert && (
        <div className="p-3 bg-violet-500/10 border border-violet-500/30 rounded-xl text-xs font-mono text-violet-400 flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-violet-400" />
          <span>{feedbackAlert}</span>
        </div>
      )}

      {/* Primary Dashboard Metrics summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">ACTIVE EXPERIMENTS</span>
          <strong className="text-lg font-bold text-white">
            {experiments.filter(e => e.status === 'Running').length} Running
          </strong>
          <p className="text-[9px] text-zinc-500">Continuous telemetry tracking</p>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">STATISTICAL POWER</span>
          <strong className="text-lg font-bold text-violet-400">80.0% Power</strong>
          <p className="text-[9px] text-zinc-500">M.S.E. minimum size bound</p>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">CONFIDENCE THRESHOLD</span>
          <strong className="text-lg font-bold text-white">95% (α = 0.05)</strong>
          <p className="text-[9px] text-zinc-500">Two-tailed Z-score boundary</p>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">TOTAL LOGGED TRAFFIC</span>
          <strong className="text-lg font-bold text-emerald-400">
            {experiments.reduce((sum, e) => sum + e.variantA.impressions + e.variantB.impressions, 0).toLocaleString()}
          </strong>
          <p className="text-[9px] text-zinc-500">Deduplicated visitor buckets</p>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-zinc-800 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
            activeTab === 'dashboard' 
              ? 'border-violet-500 text-violet-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          1. Platform Monitor & Creator
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
            activeTab === 'simulator' 
              ? 'border-violet-500 text-violet-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          2. Raw Modeler & A/B Statistical Simulator
        </button>
        <button
          onClick={() => setActiveTab('strategy')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
            activeTab === 'strategy' 
              ? 'border-violet-500 text-violet-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          3. Rollout Controls & Circuit Breakers
        </button>
      </div>

      {/* TAB 1: Platform Monitor & Draft Creator */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left panel: Experiment lists select */}
          <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider font-mono">
                Experiment Ledger Registry
              </span>
              <button 
                onClick={handleResetExperiments}
                className="text-[9px] text-zinc-500 hover:text-zinc-300 font-mono flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset default list
              </button>
            </div>

            <div className="space-y-2">
              {experiments.map((exp) => {
                const isSelected = selectedExp.id === exp.id;
                const totalImpressions = exp.variantA.impressions + exp.variantB.impressions;
                return (
                  <button
                    key={exp.id}
                    onClick={() => syncFormFields(exp)}
                    className={`w-full p-3.5 rounded-lg border text-left flex flex-col gap-2 transition cursor-pointer font-mono ${
                      isSelected 
                        ? 'bg-slate-950 border-violet-500/40 text-violet-400' 
                        : 'bg-slate-950/30 border-slate-900 text-zinc-400 hover:border-zinc-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] uppercase font-bold text-indigo-400">
                        {exp.category}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold border ${
                        exp.status === 'Running' 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                          : exp.status === 'Concluded' 
                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-500'
                      }`}>
                        {exp.status}
                      </span>
                    </div>

                    <span className="text-xs font-semibold leading-normal text-white">
                      {exp.name}
                    </span>

                    <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-900">
                      <span>Goal: {exp.metric}</span>
                      <span>{totalImpressions.toLocaleString()} Visitors</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right panel: Live telemetry metrics & Draft Sandbox form */}
          <div className="lg:col-span-7 space-y-6">

            {/* Quick overview of selected Test */}
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4 font-mono">
              <div className="border-b border-zinc-800 pb-2.5">
                <span className="text-[9.5px] uppercase font-bold text-violet-400">
                  Target Live Telemetry Scope
                </span>
                <h4 className="text-sm font-bold text-white pt-1">{selectedExp.name}</h4>
              </div>

              {/* Real-time stats calculation */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold block">
                    {selectedExp.variantA.name}
                  </span>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-xs text-white">
                      {selectedExp.variantA.conversions} / {selectedExp.variantA.impressions}
                    </span>
                    <strong className="text-sm text-zinc-400">
                      {selectedExp.variantA.impressions > 0 
                        ? ((selectedExp.variantA.conversions / selectedExp.variantA.impressions) * 100).toFixed(2) 
                        : "0.00"}%
                    </strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold block">
                    {selectedExp.variantB.name}
                  </span>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-xs text-white">
                      {selectedExp.variantB.conversions} / {selectedExp.variantB.impressions}
                    </span>
                    <strong className="text-sm text-emerald-400">
                      {selectedExp.variantB.impressions > 0 
                        ? ((selectedExp.variantB.conversions / selectedExp.variantB.impressions) * 100).toFixed(2) 
                        : "0.00"}%
                    </strong>
                  </div>
                </div>
              </div>

              {/* Direct calculations summaries */}
              <div className="p-3 bg-[#0a0f1d] border border-slate-900 rounded-lg flex flex-col md:flex-row justify-between gap-4 text-xs">
                <div>
                  <span className="text-zinc-500 text-[10px] block font-bold uppercase">Calculated Relative Lift</span>
                  <strong className={`text-sm ${stats.lift >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-bold`}>
                    {stats.lift >= 0 ? '+' : ''}{stats.lift.toFixed(2)}%
                  </strong>
                </div>

                <div>
                  <span className="text-zinc-500 text-[10px] block font-bold uppercase">Z-Hypothesis p-value</span>
                  <strong className="text-sm text-white font-bold block">
                    {stats.pValue.toFixed(4)}
                  </strong>
                </div>

                <div>
                  <span className="text-zinc-500 text-[10px] block font-bold uppercase">Significance Confirmed</span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                    stats.significant 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    {stats.significant ? 'Significant' : 'Not Significant'}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 text-[10px] block font-bold uppercase">Bayesian Prob of Winner</span>
                  <strong className="text-sm text-violet-400 font-bold">
                    {stats.bayesianB}% B &gt; A
                  </strong>
                </div>
              </div>

            </div>

            {/* Launch / Draft Brand-New Experiment Form */}
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
              <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider font-mono">
                Platform Experiment Creator Flow
              </span>

              <form onSubmit={handleCreateExperiment} className="font-mono text-xs space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 block">Category Dimension</label>
                    <select
                      value={newCategory}
                      onChange={(e: any) => setNewCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-300 outline-none"
                    >
                      <option value="Email Copy">Email Copy</option>
                      <option value="Subject Lines">Subject Lines</option>
                      <option value="ICP Segments">ICP Segments</option>
                      <option value="Pricing">Pricing</option>
                      <option value="Onboarding">Onboarding</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 block">Primary Success Goal</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Reply Rate"
                      value={newMetric}
                      onChange={(e) => setNewMetric(e.target.value)}
                      className="w-full bg-slate-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 block">Deploy Autopilot</label>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-zinc-500">Auto winner allocation</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 block">Hypothesis Title & Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DNS Protection vs Generic Outbound Value Pitch"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-slate-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 block">Control Version (A) Label</label>
                    <input
                      type="text"
                      required
                      value={newVariantAName}
                      onChange={(e) => setNewVariantAName(e.target.value)}
                      className="w-full bg-slate-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 block">Treatment Version (B) Label</label>
                    <input
                      type="text"
                      required
                      value={newVariantBName}
                      onChange={(e) => setNewVariantBName(e.target.value)}
                      className="w-full bg-slate-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-400 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white rounded font-bold transition flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Commit Draft Experiment
                </button>
              </form>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: Statistical Modeler & Simulator */}
      {activeTab === 'simulator' && (
        <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-6 font-mono text-xs">
          
          <div className="border-b border-zinc-800 pb-2.5 flex justify-between items-center flex-wrap gap-2">
            <div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                Z-Test & Beta Proportion Playground
              </span>
              <h4 className="text-sm font-bold text-white pt-1">
                Override & Model Conversions: "{selectedExp.name}"
              </h4>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-zinc-400 text-[10px]">
              Sub-type: {selectedExp.category}
            </div>
          </div>

          <form onSubmit={handleApplySimulation} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5 p-3.5 bg-slate-950 border border-slate-900 rounded-lg">
              <span className="text-[10px] text-violet-400 font-bold block uppercase pb-1 border-b border-zinc-900">
                Variant A (Control)
              </span>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-[9.5px] text-zinc-500 block">A: Sample Size (Impressions)</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={tempImpressionsA}
                    onChange={(e) => setTempImpressionsA(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-zinc-800 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9.5px] text-zinc-500 block">A: Output Conversions</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={tempConversionsA}
                    onChange={(e) => setTempConversionsA(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-zinc-800 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 p-3.5 bg-slate-950 border border-slate-900 rounded-lg">
              <span className="text-[10px] text-emerald-400 font-bold block uppercase pb-1 border-b border-zinc-900">
                Variant B (Treatment)
              </span>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-[9.5px] text-zinc-500 block">B: Sample Size (Impressions)</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={tempImpressionsB}
                    onChange={(e) => setTempImpressionsB(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-zinc-800 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9.5px] text-zinc-500 block">B: Output Conversions</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={tempConversionsB}
                    onChange={(e) => setTempConversionsB(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-zinc-800 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Run calculation overview column */}
            <div className="col-span-1 md:col-span-2 space-y-3.5">
              <div className="p-3 bg-violet-500/5 border border-violet-500/10 rounded-lg space-y-2 text-zinc-300">
                <div className="flex justify-between text-[11px]">
                  <span>Baseline Conv. (A):</span>
                  <span className="text-white font-bold">{stats.pA.toFixed(3)}%</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Treatment Conv. (B):</span>
                  <span className="text-emerald-400 font-bold">{stats.pB.toFixed(3)}%</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Absolute Difference:</span>
                  <span className="text-white font-bold">{(stats.pB - stats.pA).toFixed(3)}%</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Statistical Value Z:</span>
                  <span className="text-violet-400 font-bold">{stats.zScore.toFixed(4)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <RefreshCcw className="w-3.5 h-3.5" /> Force Sync Telemetry Bounds
              </button>
            </div>
          </form>

          {/* Mathematical formulation insights block */}
          <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-3">
            <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wide">
              Data Science Hypothesis & Bounds formulation
            </span>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              We apply standard two-tailed hypothesis testing of independent proportions. Standard Error uses pooled proportion <span className="text-white font-mono">p_pooled = (conversions_A + conversions_B) / (impressions_A + impressions_B)</span>, isolating differences from statistical fluctuations.
            </p>
            {stats.significant ? (
              <div className="p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded text-emerald-400 text-[10.5px] flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>
                  <strong>Hypothesis Confirmed:</strong> Variant B achieves statistical importance with &lt;5% probability of error (p-value: {stats.pValue.toFixed(6)}).
                </span>
              </div>
            ) : (
              <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-500 text-[10.5px] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>
                  <strong>Inconclusive Test:</strong> P-Value remains above threshold. Acquire more traffic inputs to overcome baseline noise safely.
                </span>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 3: Rollout Controls & Circuit Breakers */}
      {activeTab === 'strategy' && (
        <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-6 font-mono text-xs">
          
          <div className="border-b border-zinc-800 pb-2.5">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
              Automated winner routing & safety thresholds
            </span>
            <h4 className="text-sm font-bold text-white pt-1">Rollout Controls & Auto-Ramping Settings</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: Rollout Progress */}
            <div className="md:col-span-7 space-y-4">
              <span className="text-violet-400 font-bold block text-[11px] uppercase">
                Active Traffic Allocation Ramp: {selectedExp.rolloutProgress}% Winner
              </span>

              {/* Slider simulation */}
              <div className="p-4 bg-slate-950 border border-slate-950 rounded-xl space-y-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={selectedExp.rolloutProgress}
                  onChange={(e) => handleUpdateRollout(parseInt(e.target.value))}
                  className="w-full accent-violet-500 cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
                />

                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>0% A/B Sandbox split</span>
                  <span>50% Controlled Equal Split (Run phase)</span>
                  <span>100% Full Rollout (Acknowledge Winner)</span>
                </div>
              </div>

              {/* Autopilot Controller */}
              <div className="p-4 bg-[#0a0f1d] border border-slate-900 rounded-xl flex items-center justify-between">
                <div className="space-y-1 max-w-sm">
                  <strong className="text-white text-xs block">AI-Driven Auto-Promotion (Autopilot)</strong>
                  <p className="text-[10px] text-zinc-500 leading-normal">
                    Instantly routes 100% of outbound platform queues to Treatment B if the Z-test confirms confidence levels crossing &gt;95.1% bounds.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleToggleAutopilot}
                  className={`px-3 py-1.5 rounded font-bold text-xs uppercase transition border cursor-pointer ${
                    selectedExp.autopilot
                      ? 'bg-violet-600 text-white border-violet-500'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {selectedExp.autopilot ? "Autopilot ON" : "Autopilot OFF"}
                </button>
              </div>
            </div>

            {/* Right Column: Platform Circuit Breaker Telemetry */}
            <div className="md:col-span-5 p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-3.5">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold uppercase text-[10px]">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Automated Metric Circuit Breakers</span>
              </div>
              <p className="text-zinc-500 text-[10.5px] leading-normal">
                If outbound telemetry detects an anomalous spike in adverse indicators (e.g., mail bounces, high error counts), operations instant-rolls back the campaign to the 100% control state.
              </p>

              <div className="space-y-2 text-[10.5px]">
                <div className="p-2 bg-[#1b0f13] border border-rose-950 rounded flex justify-between text-rose-400">
                  <span>Email Bounce Rate Spike limit:</span>
                  <strong className="font-bold">&gt;15.0%</strong>
                </div>
                <div className="p-2 bg-[#1b0f13] border border-rose-950 rounded flex justify-between text-rose-400">
                  <span>Adverse Revenue conversion crash:</span>
                  <strong className="font-bold">&gt;30.0%</strong>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
