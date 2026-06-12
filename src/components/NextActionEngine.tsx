import React from 'react';
import { 
  Terminal, ArrowRight, Cpu, PlayCircle, 
  AlertCircle, CheckCircle2, Zap, GitCommit,
  GitBranch, Crosshair
} from 'lucide-react';

export default function NextActionEngine() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Crosshair className="w-4 h-4" />
            Paradigm Shift
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Next Action Engine
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Replacing rigid linear roadmaps ("Phase 41") with a state-driven decision matrix. 
            Input the exact reality of the business. Output the singularly focused next step required to unblock the system.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 px-6 py-4 rounded-xl shrink-0">
          <div>
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Engine Status
            </div>
            <div className="text-xl font-black text-emerald-400 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Processing Reality
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* State Payload (Left Column) */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                <Terminal className="w-4 h-4" />
                STATE_PAYLOAD.json
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Inputs</div>
            </div>
            <div className="p-4 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto">
              <div><span className="text-blue-400">const</span> <span className="text-emerald-300">effectiveBuzzState</span> <span className="text-blue-400">=</span> {'{'}</div>
              <div className="pl-4 text-slate-400">// Financials</div>
              <div className="pl-4">mrr: <span className="text-amber-400">49</span>,</div>
              <div className="pl-4">paying_customers: <span className="text-amber-400">1</span>,</div>
              <div className="pl-4">active_beta_users: <span className="text-amber-400">12</span>,</div>
              <br/>
              <div className="pl-4 text-slate-400">// Tech Validations</div>
              <div className="pl-4">core_ai_generation_proven: <span className="text-amber-400">true</span>,</div>
              <div className="pl-4">payment_processing_live: <span className="text-amber-400">true</span>,</div>
              <br/>
              <div className="pl-4 text-slate-400">// Structural Blockers</div>
              <div className="pl-4">has_chrome_extension: <span className="text-amber-400">false</span>,</div>
              <div className="pl-4">has_native_crm_sync: <span className="text-amber-400">false</span>,</div>
              <div className="pl-4">workflow_friction: <span className="text-emerald-300">"CRITICAL"</span></div>
              <div>{'}'};</div>
            </div>
          </section>

          <section className="bg-rose-950/20 border border-rose-900/50 rounded-xl p-6">
            <h2 className="text-sm font-bold text-rose-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-rose-900/50 pb-3">
              <AlertCircle className="w-4 h-4" />
              Critical Constraints
            </h2>
            <ul className="text-sm text-slate-300 space-y-3">
               <li>SDRs refuse to switch tabs to generate replies.</li>
               <li>Copy-pasting data manually prevents large-scale rollout.</li>
               <li>MRR cannot scale past $500 without fixing the workflow location.</li>
            </ul>
          </section>
        </div>

        {/* Logic Tree & Output (Right Column) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col">
          
          {/* Decision Tree Processing */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6 flex-1 flex flex-col relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none rounded-xl"></div>
            
            <h2 className="text-sm font-bold text-slate-300 mb-6 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <GitBranch className="w-4 h-4 text-blue-400" />
              Decision Matrix Evaluation
            </h2>

            <div className="space-y-6 flex-1 relative">
              {/* Vertical connector line */}
              <div className="absolute left-3.5 top-8 bottom-8 w-px bg-slate-800"></div>

              {/* Node 1 */}
              <div className="relative flex items-start gap-4">
                <div className="relative z-10 w-7 h-7 bg-slate-900 border border-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200">Is value hypothesis valid?</div>
                  <div className="text-xs text-slate-400 mt-1">Yes. 1 paying customer validates "Willingness to Pay". Proceed to UX barriers.</div>
                </div>
              </div>

              {/* Node 2 */}
              <div className="relative flex items-start gap-4">
                <div className="relative z-10 w-7 h-7 bg-slate-900 border border-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200">Is top of funnel the issue?</div>
                  <div className="text-xs text-slate-400 mt-1">No. 12 active beta users exist. Converting them requires fixing the product, not running ads.</div>
                </div>
              </div>

              {/* Node 3 (Terminal/Failure that branches to action) */}
              <div className="relative flex items-start gap-4">
                <div className="relative z-10 w-7 h-7 bg-slate-900 border border-rose-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                   <AlertCircle className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-rose-300">Does UX match SDR workflow?</div>
                  <div className="text-xs text-rose-400/80 mt-1">No. `has_chrome_extension === false`. This is a fatal retention blocker. Halt scaling sequence.</div>
                </div>
              </div>
            </div>

          </section>

          {/* The Singular Directive */}
          <section className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.15)] group hover:border-emerald-500/50 transition-colors">
             <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
             
             <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xs font-mono font-bold text-emerald-400 mb-2 tracking-widest uppercase flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    EXECUTABLE_DIRECTIVE
                  </h2>
                  <h3 className="text-2xl font-black text-white mt-1 leading-snug">
                    Build the Chrome extension.
                  </h3>
                  <p className="text-sm text-emerald-50 mt-3 max-w-lg leading-relaxed opacity-90">
                    Do not build dashboards. Do not build marketing sites. Inject the AI directly into Gmail & LinkedIn to eradicate context-switching friction. 
                  </p>
                </div>
                <div className="hidden sm:flex w-12 h-12 rounded-full border-2 border-emerald-500/30 items-center justify-center bg-emerald-500/10 group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-6 h-6 text-emerald-400" />
                </div>
             </div>

          </section>

        </div>

      </div>

    </div>
  );
}
