import React from 'react';
import { 
  Building2, AlertTriangle, Lightbulb, Code2, 
  Target, DollarSign, Users, PauseCircle, 
  PlayCircle, Calendar, CalendarDays, Zap,
  Activity, ArrowRight
} from 'lucide-react';

export default function ExecutiveExecutionReport() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Activity className="w-4 h-4" />
            Executive Leadership Council
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Weekly Execution Report
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Strict, reality-based evaluation from the CEO, CTO, CRO, CPO, CFO, and VP Eng. Zero forward-looking assumptions. Zero theoretical roadmaps. Just raw telemetry and brutal constraint isolation.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 px-6 py-4 rounded-xl shrink-0">
          <div>
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" /> Telemetry Sync
            </div>
            <div className="text-xl font-black text-white px-1">12 Users | 1 Paid | $49 MRR</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-indigo-950/20 border border-indigo-900/50 rounded-xl p-6">
              <h2 className="text-sm font-bold text-indigo-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-indigo-900/50 pb-3">
                <Building2 className="w-4 h-4" />
                1. Current Company Stage
              </h2>
              <div className="text-2xl font-black text-white mb-2">Pre-PMF / Closed Beta</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                We have initial validation (1 paying customer), but zero repeatability or sticky retention due to extreme UX friction. We are in the "do things that don't scale" phase.
              </p>
            </section>

            <section className="bg-rose-950/20 border border-rose-900/50 rounded-xl p-6 shadow-[0_0_15px_rgba(225,29,72,0.05)]">
              <h2 className="text-sm font-bold text-rose-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-rose-900/50 pb-3">
                <AlertTriangle className="w-4 h-4" />
                2. Top 3 Bottlenecks
              </h2>
              <ol className="text-sm text-slate-300 space-y-2 list-decimal pl-4 marker:text-rose-500 font-medium tracking-wide">
                <li>SDRs must context-switch to our dashboard to write emails.</li>
                <li>No automated bi-directional CRM syncing.</li>
                <li>Manual copy-pasting of prospect data blocks scale.</li>
              </ol>
            </section>
          </div>

          <section className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-6">
            <h2 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-emerald-900/50 pb-3">
              <Lightbulb className="w-4 h-4" />
              3. Top 3 Opportunities
            </h2>
            <ol className="text-sm text-slate-300 space-y-2 list-decimal pl-4 marker:text-emerald-500 font-medium tracking-wide">
              <li>Injecting AI directly into Gmail/LinkedIn via Chrome Extension.</li>
              <li>Upselling the 1 paid user's entire team (5 seats @ $99/mo).</li>
              <li>Extracting a hard-data case study from the 1st paid user to drive outbound.</li>
            </ol>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
              <h2 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
                <Code2 className="w-4 h-4" />
                4. Engineering Priorities
              </h2>
               <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 marker:text-blue-900">
                  <li>Build Content Script observers for Gmail.</li>
                  <li>Secure Service Worker API bridging.</li>
                  <li>Reduce text generation latency &lt; 2.5s.</li>
               </ul>
            </section>
            
            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
              <h2 className="text-sm font-bold text-violet-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
                <Target className="w-4 h-4" />
                5. Product Priorities
              </h2>
               <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 marker:text-violet-900">
                  <li>Design the "Draft" button UI inside Gmail.</li>
                  <li>Simplify the context-window extraction.</li>
                  <li>Ensure drafted replies look identical to human ones.</li>
               </ul>
            </section>

            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
              <h2 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
                <DollarSign className="w-4 h-4" />
                6. Revenue Priorities
              </h2>
               <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 marker:text-emerald-900">
                  <li>Convert 3 active beta testers to the $49/mo plan.</li>
                  <li>Pitch the SDR Manager of our 1 paid user.</li>
                  <li>Identify the exact ROI metric for the case study.</li>
               </ul>
            </section>

            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
              <h2 className="text-sm font-bold text-amber-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
                <Users className="w-4 h-4" />
                7. Customer Priorities
              </h2>
               <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 marker:text-amber-900">
                  <li>Get on a Zoom call with the 1 paid user to watch them work.</li>
                  <li>Manually install the extension on their machine.</li>
                  <li>Debug prompt hallucinations directly with them.</li>
               </ul>
            </section>
          </div>

        </div>

        {/* Right Column: Execution */}
        <div className="lg:col-span-4 space-y-6">
          
          <section className="bg-orange-950/20 border border-orange-900/50 rounded-xl p-6">
            <h2 className="text-sm font-bold text-orange-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-orange-900/50 pb-3">
              <PauseCircle className="w-4 h-4" />
              8. What To Stop Doing
            </h2>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 marker:text-orange-900">
              <li>Building marketing pages.</li>
              <li>Designing advanced analytics dashboards.</li>
              <li>Worrying about RBAC or complex billing logic.</li>
              <li>Cold emailing hundreds of generic leads.</li>
            </ul>
          </section>

          <section className="bg-blue-950/20 border border-blue-900/50 rounded-xl p-6">
            <h2 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-blue-900/50 pb-3">
              <PlayCircle className="w-4 h-4" />
              9. What To Double Down On
            </h2>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 marker:text-blue-900">
              <li>High-touch white-glove onboarding for early users.</li>
              <li>Rapidly iterating the core AI prompt logic.</li>
              <li>Bringing the product directly to where users live.</li>
            </ul>
          </section>

          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6 border-l-4 border-l-indigo-500">
            <h2 className="text-sm font-bold text-indigo-400 mb-3 flex items-center gap-2 uppercase font-mono tracking-wider">
              <CalendarDays className="w-4 h-4" /> 10. 7-Day Plan
            </h2>
             <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
              <li>Build Chrome Extension V1.</li>
              <li>Deploy backend API bridge.</li>
              <li>Local install on Paid User #1's machine.</li>
            </ul>
          </section>

          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6 border-l-4 border-l-violet-500">
            <h2 className="text-sm font-bold text-violet-400 mb-3 flex items-center gap-2 uppercase font-mono tracking-wider">
              <Calendar className="w-4 h-4" /> 11. 30-Day Plan
            </h2>
             <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
              <li>Onboard remaining 11 beta users to Extension.</li>
              <li>Convert 5+ to $49/mo paid tier.</li>
              <li>Extract ROI Case Study for top-of-funnel marketing.</li>
            </ul>
          </section>

        </div>
        
        {/* Full Width Footer Section */}
        <div className="lg:col-span-12">
           <section className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.15)] group hover:border-emerald-500/50 transition-colors">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-xs font-mono font-bold text-emerald-400 mb-2 tracking-widest uppercase flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    12. Single Highest ROI Action
                  </h2>
                  <div className="text-2xl font-black text-white mt-1 leading-snug">
                    "If EffectiveBuzz could only accomplish one thing this week, what should it be?"
                  </div>
                  <div className="text-xl font-bold text-emerald-400 mt-4 flex items-start gap-3 bg-slate-950/50 p-4 border border-emerald-500/20 rounded-lg">
                    <ArrowRight className="w-6 h-6 shrink-0 mt-0.5" />
                    <span>Ship the V1 Chrome Extension wrapper to eradicate context-switching friction and capture sticky daily active usage.</span>
                  </div>
                </div>
              </div>
           </section>
        </div>

      </div>

    </div>
  );
}
