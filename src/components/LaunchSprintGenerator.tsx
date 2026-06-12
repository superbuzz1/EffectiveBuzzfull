import React, { useState } from 'react';
import { 
  Clock, ShieldCheck, DollarSign, Layers, CheckSquare, Sparkles, 
  Settings, Check, RefreshCw, AlertTriangle, Cpu, Network, Database, 
  ArrowRight, FileText, Target, PlayCircle, BarChart3, HelpCircle,
  Code2, Archive, ListTodo, Send, CheckCircle2, CloudLightning, BadgePercent
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  track: string;
  estimate: number;
  criteria: string;
  completed?: boolean;
}

interface SprintData {
  gapAnalysis: string;
  nextSmallestStep: string;
  sprint1: Task[];
  launchChecklists: {
    codeReview: string[];
    stagingDeploy: string[];
    closedBeta: string[];
    customerAcquisition: string[];
    launchReview: string[];
  };
}

export default function LaunchSprintGenerator() {
  const [goal, setGoal] = useState<string>('First Paid Customer');
  const [intensity, setIntensity] = useState<string>('Cruising Speed (Agile)');
  const [monetization, setMonetization] = useState<string>('Usage-Based Credits');
  const [customNotes, setCustomNotes] = useState<string>('');
  
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [data, setData] = useState<SprintData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Active sub-tab under checklist section
  const [checklistTab, setChecklistTab] = useState<'codeReview' | 'stagingDeploy' | 'closedBeta' | 'customerAcquisition' | 'launchReview'>('codeReview');

  // Local task tracking states
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const scanSteps = [
    { label: "Indexing repository schema & files (server.ts, prisma/schema.prisma)...", delay: 900 },
    { label: "Analyzing API Gateway Multi-Tenant Isolation limits (authRoutes.ts)...", delay: 1000 },
    { label: "Validating Stripe Checkout Webhook endpoints (billingRoutes.ts)...", delay: 800 },
    { label: "Synthesizing AI personalizer feedback parameters & Levenshtein scores...", delay: 1100 },
    { label: "Compiling micro-sprint tasks and Jira-ready deliverables with Gemini...", delay: 1200 }
  ];

  const handleStartAnalysis = async () => {
    setIsScanning(true);
    setScanStep(0);
    setError(null);
    setData(null);

    // Dynamic scanning effects
    for (let i = 0; i < scanSteps.length; i++) {
      setScanStep(i);
      await new Promise((resolve) => setTimeout(resolve, scanSteps[i].delay));
    }

    try {
      const response = await fetch('/api/sprint/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, intensity, monetization, customNotes })
      });

      if (!response.ok) {
        throw new Error(`Server returned error status: ${response.status}`);
      }

      const resJson = await response.json();
      if (resJson.success) {
        setData(resJson.data);
        setLocalTasks(resJson.data.sprint1 || []);
        
        // Populate initial checklists checkboxes
        const checklistObj: Record<string, boolean> = {};
        Object.keys(resJson.data.launchChecklists || {}).forEach((key) => {
          (resJson.data.launchChecklists[key as keyof typeof resJson.data.launchChecklists] || []).forEach((item: string, idx: number) => {
            checklistObj[`${key}-${idx}`] = false;
          });
        });
        setCompletedItems(checklistObj);
      } else {
        throw new Error(resJson.error || "Analysis failed unexpectedly.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during code audit generation.");
    } finally {
      setIsScanning(false);
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setLocalTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const toggleChecklistItem = (key: string) => {
    setCompletedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalHours = localTasks.reduce((acc, curr) => acc + (curr.completed ? 0 : curr.estimate), 0);
  const completedHours = localTasks.reduce((acc, curr) => acc + (curr.completed ? curr.estimate : 0), 0);
  const progressPercent = localTasks.length > 0 
    ? Math.round((localTasks.filter(t => t.completed).length / localTasks.length) * 100) 
    : 0;

  return (
    <div className="space-y-8" id="launch-sprint-generator-root">
      
      {/* Header section with branding */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            Strategic Launchpad Portal
          </div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight">
            Repository Deep Analysis & Launch Sprint Generator
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-4xl">
            Scan underlying project routers, database integrations, and code assets. Construct the absolute next smallest, high-yield product slices to accelerate first revenue capture.
          </p>
        </div>
        
        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-xs text-gray-400 font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
            Analysis Engine active
          </span>
        </div>
      </div>

      {/* Simulator Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Parameters Form */}
        <div className="lg:col-span-5 bg-[#0e1626] border border-slate-800/80 rounded-xl p-5 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800/70 pb-3">
            <Settings className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-semibold font-display text-slate-200">
              Launch Optimization Parameters
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 font-mono block mb-1.5 font-semibold uppercase">
                Primary Launch Goal
              </label>
              <select 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="First Paid Customer">First Paid Customer (The First-Dollar Value Loop)</option>
                <option value="Closed Beta Launch">Closed Beta Launch (Cohort of Early Agencies)</option>
                <option value="Staging Deploy">Staging Deploy (Compliance & Stress Validation)</option>
                <option value="First 50 Users">First 50 Users (In-App Sells Active)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-mono block mb-1.5 font-semibold uppercase">
                Execution Velocity / Intensity
              </label>
              <select 
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
                className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Lightweight Solo">Lightweight Solo (Single developer, 30h/week)</option>
                <option value="Cruising Speed (Agile)">Cruising Speed (Small hybrid team, standard agile)</option>
                <option value="Blazing Speed (Sprinting)">Blazing Speed (Full stack sprint, immediate launch)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-mono block mb-1.5 font-semibold uppercase">
                Monetization Model Flow
              </label>
              <select 
                value={monetization}
                onChange={(e) => setMonetization(e.target.value)}
                className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Usage-Based Credits">Usage-Based Credits (Pay-per-personalized-draft)</option>
                <option value="Monthly Subscription Tier">Monthly Subscription Tier ($95/mo standard seat)</option>
                <option value="Hybrid High-Touch Contracts">Hybrid High-Touch (Pilot customization retainer)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-mono block mb-1.5 font-semibold uppercase">
                Custom Directives / Sprint Scope
              </label>
              <textarea 
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="E.g., Prioritize DNS deliverability checking, skip custom OAuth for now, enforce strict security reviews..."
                rows={3}
                className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={handleStartAnalysis}
            disabled={isScanning}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
              isScanning 
                ? 'bg-slate-800 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 active:translate-y-0.5'
            }`}
          >
            {isScanning ? (
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
            ) : (
              <PlayCircle className="w-4 h-4 text-white" />
            )}
            Initiate Repository Deep Analysis & Build Sprint
          </button>
        </div>

        {/* Right Side: Scan Status / Explainer Panel */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950/40 border border-slate-800/60 rounded-xl p-5">
          {isScanning ? (
            <div className="flex flex-col items-center justify-center h-full py-12 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-indigo-400 animate-pulse" />
                </div>
              </div>
              
              <div className="text-center space-y-2 max-w-sm">
                <span className="text-xs text-indigo-400 font-mono uppercase tracking-wider font-semibold">
                  AUDITING CODEBASE GAPS
                </span>
                <p className="text-xs text-slate-300 font-mono leading-relaxed px-4 animate-pulse">
                  {scanSteps[scanStep].label}
                </p>
              </div>

              {/* Simulation steps bars */}
              <div className="w-full max-w-xs bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full transition-all duration-500" 
                  style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : data ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  Live Scanner Feedback
                </span>
                <span className="text-[10px] bg-slate-900 text-emerald-400 border border-slate-800 px-2.5 py-0.5 rounded font-mono">
                  Analysis Complete (Mode: {data.sprint1.length > 0 && !error ? 'GEMINI' : 'FALLBACK'})
                </span>
              </div>

              {/* Glowing Callout: The Next Smallest Step */}
              <div className="bg-emerald-500/[0.03] border border-emerald-500/20 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-5">
                  <CloudLightning className="w-12 h-12 text-emerald-400" />
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-bold uppercase">
                  <Target className="w-3.5 h-3.5" />
                  Primary Launch Answer - Next Smallest Step
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium">
                  {data.nextSmallestStep}
                </p>
              </div>

              {/* Gap Analysis Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-indigo-300 uppercase font-mono tracking-wider">
                  Repository Gaps Audited
                </h3>
                <div className="bg-[#070b13] border border-slate-900 rounded-lg p-4 max-h-[160px] overflow-y-auto text-[11px] text-gray-300 leading-relaxed font-mono space-y-2 whitespace-pre-wrap">
                  {data.gapAnalysis}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 h-full space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Network className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h3 className="text-sm font-semibold text-slate-200 font-display">
                  Awaiting Repository Trigger
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Configure your primary launch goals on the left pane and run the audit. The engine will scan database tables, CORS controls, and authorization logic to produce a localized Sprint board.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/5 border border-red-500/20 p-3.5 rounded-lg text-xs flex items-start gap-2.5 text-red-400 font-mono mt-3">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <div>
                <span className="font-bold">Execution Error:</span> {error}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generated Sprint Results */}
      {data && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Active Sprint Dashboard Header */}
          <div className="border-t border-slate-800 pt-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-indigo-400 font-mono uppercase tracking-wider font-bold">
                  Agile Sprint Workspace
                </span>
                <h2 className="text-xl font-bold font-display text-white tracking-tight mt-1">
                  Sprint 1: The First-Dollar Value Loop
                </h2>
              </div>

              {/* Progress Summary cards */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Burndown Velocity</span>
                  <span className="text-sm font-bold text-slate-200">
                    {completedHours}h / {totalHours + completedHours}h
                  </span>
                </div>
                <div className="w-28 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {progressPercent}% Done
                </span>
              </div>
            </div>

            {/* Micro-Tickets Jira-Like Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localTasks.map((task) => (
                <div 
                  key={task.id}
                  className={`border transition-all p-4 rounded-xl flex flex-col justify-between space-y-4 ${
                    task.completed 
                      ? 'bg-slate-900/30 border-slate-800 opacity-60' 
                      : 'bg-[#0b101b] border-slate-800/80 hover:border-slate-700/80 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded font-mono font-bold">
                        {task.id}
                      </span>
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold ${
                        task.track === 'Backend' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        task.track === 'Frontend' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                        'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {task.track}
                      </span>
                    </div>

                    <h3 className={`text-xs font-semibold leading-relaxed font-display ${task.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                      {task.title}
                    </h3>

                    <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                      <span className="font-semibold text-slate-300">Acceptance Criteria:</span> {task.criteria}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800/60 pt-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      Estimate: {task.estimate} SP (h)
                    </div>

                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`text-[10px] font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                        task.completed 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold'
                          : 'bg-slate-900 border-slate-800 text-gray-400 hover:text-white hover:border-slate-600'
                      }`}
                    >
                      {task.completed ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          Done
                        </>
                      ) : (
                        'Resolve Ticket'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Release Engineering & Go-To-Market Matrix Checklist Section */}
          <div className="border-t border-slate-800 pt-6 space-y-6">
            <div>
              <span className="text-xs text-indigo-400 font-mono uppercase tracking-wider font-bold">
                Operations & Release Matrix Playbook
              </span>
              <h2 className="text-lg font-bold font-display text-white tracking-tight mt-1">
                Sequential Sandbox Verification Checklist
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Confirm execution alignment metrics across code quality benchmarks, deploy milestones, and closed beta onboarding checks.
              </p>
            </div>

            {/* Checklist Tabs mapping exactly to chronological milestones (37.6 - 38.0) */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3">
              {[
                { id: 'codeReview', label: '37.6 Code Review criteria', icon: Code2, desc: 'STRIDE checks' },
                { id: 'stagingDeploy', label: '37.7 Deploy Staging', icon: CloudLightning, desc: 'Container setup' },
                { id: 'closedBeta', label: '37.8 Closed Beta Launch', icon: Archive, desc: 'Early onboarding' },
                { id: 'customerAcquisition', label: '37.9 GTM Client Capture', icon: BadgePercent, desc: 'First customer' },
                { id: 'launchReview', label: '38.0 Production Review', icon: BarChart3, desc: 'Metrics metrics' }
              ].map((btn) => {
                const Icon = btn.icon;
                return (
                  <button
                    key={btn.id}
                    onClick={() => setChecklistTab(btn.id as any)}
                    className={`p-2.5 px-4 rounded-lg flex items-center gap-2 text-xs transition-all border ${
                      checklistTab === btn.id 
                        ? 'bg-indigo-600 border-indigo-600 text-white font-semibold'
                        : 'bg-[#0d131f] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <div className="text-left leading-none">
                      <span className="block text-[11px] font-bold">{btn.label}</span>
                      <span className={`block text-[8px] mt-0.5 uppercase font-mono ${checklistTab === btn.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {btn.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Matrix Column List */}
            <div className="bg-[#0e1626]/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/70 pb-3">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                  Active Audit Ledger: {checklistTab.replace(/([A-Z])/g, ' $1')}
                </span>
                
                {/* Visual score */}
                <span className="text-xs text-indigo-400 font-mono">
                  Checked: {
                    Object.keys(completedItems).filter(k => k.startsWith(checklistTab) && completedItems[k]).length
                  } / {
                    data.launchChecklists[checklistTab]?.length || 0
                  }
                </span>
              </div>

              {/* Dynamic checklist elements rendering */}
              <div className="space-y-3">
                {data.launchChecklists[checklistTab]?.map((item, idx) => {
                  const key = `${checklistTab}-${idx}`;
                  const isChecked = completedItems[key];
                  return (
                    <div 
                      key={idx}
                      onClick={() => toggleChecklistItem(key)}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-indigo-500/[0.02] border-indigo-500/20 opacity-80' 
                          : 'bg-[#070b13] border-slate-900 hover:border-slate-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                        isChecked 
                          ? 'bg-indigo-600 border-indigo-500 text-white' 
                          : 'border-slate-800 bg-[#070b13]'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      
                      <div className="space-y-0.5">
                        <p className={`text-xs leading-relaxed ${isChecked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {item}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
