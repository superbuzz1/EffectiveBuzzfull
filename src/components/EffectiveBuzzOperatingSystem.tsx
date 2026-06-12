import React from 'react';
import { 
  Terminal, Cpu, Network, Database, 
  Rocket, Search, Target, Zap, 
  RefreshCw, Activity, Layers
} from 'lucide-react';

export default function EffectiveBuzzOperatingSystem() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Terminal className="w-4 h-4" />
            System Architecture
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            EffectiveBuzz Operating System
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            The fundamental meta-framework that governs how EffectiveBuzz builds product, acquires users, processes feedback, and compounds revenue. 
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 px-6 py-4 rounded-xl shrink-0">
          <div>
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> OS Status
            </div>
            <div className="text-xl font-black text-emerald-400 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Online / V1.0
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Core Engine */}
        <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -z-10 group-hover:bg-blue-500/10 transition-colors"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">The Core Engine</h2>
              <div className="text-xs font-mono text-blue-400 mt-0.5">Product & Engineering</div>
            </div>
          </div>
          
          <ul className="space-y-4">
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5"><Database className="w-3 h-3 text-slate-400" /></div>
              <div>
                <span className="text-sm font-bold text-slate-200">Data Ingestion Wrapper</span>
                <p className="text-xs text-slate-400 mt-1">Automated pipelines extracting strict context from CRM, Gmail DOM, and LinkedIn profiles. Zero manual data entry allowed.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5"><Zap className="w-3 h-3 text-amber-400" /></div>
              <div>
                <span className="text-sm font-bold text-slate-200">LLM Orchestration Layer</span>
                <p className="text-xs text-slate-400 mt-1">Routing inputs to the fastest/cheapest models (Claude/Gemini) with strict JSON schema fallback parsing.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5"><Layers className="w-3 h-3 text-emerald-400" /></div>
              <div>
                <span className="text-sm font-bold text-slate-200">Native Injection UI</span>
                <p className="text-xs text-slate-400 mt-1">Chrome Extension content scripts bringing the AI directly to where the user works. No dashboard forced-logins.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Growth Flywheel */}
        <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -z-10 group-hover:bg-emerald-500/10 transition-colors"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">The Distribution Flywheel</h2>
              <div className="text-xs font-mono text-emerald-400 mt-0.5">Go-to-Market System</div>
            </div>
          </div>
          
          <ul className="space-y-4">
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5"><Target className="w-3 h-3 text-rose-400" /></div>
              <div>
                <span className="text-sm font-bold text-slate-200">Hyper-Niche Outbound</span>
                <p className="text-xs text-slate-400 mt-1">Dogfooding our own tool to run outbound campaigns exclusively targeting SDRs at B2B Series A SaaS companies.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5"><Network className="w-3 h-3 text-blue-400" /></div>
              <div>
                <span className="text-sm font-bold text-slate-200">Viral "Sent via" Signatures</span>
                <p className="text-xs text-slate-400 mt-1">Every AI-generated draft defaults to containing a subtle promotional snippet, turning users into acquisition channels.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5"><RefreshCw className="w-3 h-3 text-violet-400" /></div>
              <div>
                <span className="text-sm font-bold text-slate-200">Case-Study Content Loop</span>
                <p className="text-xs text-slate-400 mt-1">Extracting anonymous reply-rate data from paid users to continually publish "Proof of Work" LinkedIn content.</p>
              </div>
            </li>
          </ul>
        </section>

      </div>

      {/* Execution Meta-Rhythm (Full Width) */}
      <section className="bg-gradient-to-br from-indigo-950/40 to-slate-900/40 border border-indigo-900/50 rounded-xl p-8 shadow-lg">
        <h2 className="text-sm font-bold text-indigo-400 mb-6 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-indigo-900/50 pb-3">
          <Search className="w-4 h-4" />
          The Execution Meta-Rhythm
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-indigo-900/30 -translate-y-1/2 z-0"></div>

          <div className="relative z-10 bg-[#0b101b] border border-indigo-900/50 p-5 rounded-lg text-center shadow-lg">
             <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 mx-auto font-mono text-sm border border-indigo-500/30">1</div>
             <h3 className="text-sm font-bold text-white mb-1">State Check</h3>
             <p className="text-[10px] text-slate-400">Log MRR, Active Users, and technical constraints. Baseline the current reality.</p>
          </div>

          <div className="relative z-10 bg-[#0b101b] border border-indigo-900/50 p-5 rounded-lg text-center shadow-lg">
             <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 mx-auto font-mono text-sm border border-indigo-500/30">2</div>
             <h3 className="text-sm font-bold text-white mb-1">Constraint Isolation</h3>
             <p className="text-[10px] text-slate-400">Ask the Next Action Engine: "What is the single bottleneck preventing MRR growth?"</p>
          </div>

          <div className="relative z-10 bg-[#0b101b] border border-indigo-900/50 p-5 rounded-lg text-center shadow-[0_0_15px_rgba(16,185,129,0.1)] border-emerald-900/50">
             <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 mx-auto font-mono text-sm border border-emerald-500/30">3</div>
             <h3 className="text-sm font-bold text-white mb-1">Surgical Strike</h3>
             <p className="text-[10px] text-slate-400">Deploy all engineering and growth resources for 7 days against the isolated constraint.</p>
          </div>

          <div className="relative z-10 bg-[#0b101b] border border-indigo-900/50 p-5 rounded-lg text-center shadow-lg">
             <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 mx-auto font-mono text-sm border border-indigo-500/30">4</div>
             <h3 className="text-sm font-bold text-white mb-1">Validation & Reset</h3>
             <p className="text-[10px] text-slate-400">Measure if constraint moved. If yes, return to Step 1. If not, debug and retry Strike.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
