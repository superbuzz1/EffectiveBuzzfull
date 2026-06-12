import React from 'react';
import { 
  AlertTriangle, Target, Zap, 
  Lightbulb, PauseCircle, CheckCircle2,
  ListOrdered, CalendarSync, ShieldAlert,
  Rocket
} from 'lucide-react';

export default function WeeklyRealityReview() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarSync className="w-4 h-4" />
            Weekly Diagnostic
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Weekly Reality Review
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Strict, data-driven evaluation of the current week. No forward-looking roadmaps. No vision documents. Only immediate constraints and the exact execution required to unblock MRR.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 bg-slate-900 border border-slate-700 px-6 py-4 rounded-xl shrink-0">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            Current MRR
          </div>
          <div className="text-xl font-black text-emerald-400">$49</div>
        </div>
      </div>

      {/* The Singular Directive */}
      <section className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
        <h2 className="text-xs font-mono font-bold text-emerald-400 mb-2 tracking-widest uppercase flex items-center gap-2">
          <Zap className="w-4 h-4" />
          The One Thing
        </h2>
        <div className="text-lg md:text-xl font-bold text-white mt-2 leading-relaxed">
          "If EffectiveBuzz could only accomplish one thing this week, it should be <span className="text-emerald-400 border-b border-emerald-500/50 pb-0.5">shipping the V1 Chrome Extension wrapper</span>."
        </div>
        <p className="text-sm text-slate-400 mt-3">
          Our 12 beta users are experiencing critical retention drop-off because they refuse to leave their Gmail inbox to generate replies. Until we inject the AI directly into their existing workflow, all other features are irrelevant.
        </p>
      </section>

      {/* 4 Key Identifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0b101b] border border-red-900/50 rounded-xl p-5">
          <div className="text-xs font-mono text-red-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Biggest Bottleneck
          </div>
          <p className="text-sm text-slate-300">UX Friction. Forcing SDRs to context-switch away from Gmail to our standalone dashboard.</p>
        </div>
        
        <div className="bg-[#0b101b] border border-blue-900/50 rounded-xl p-5">
          <div className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Target className="w-4 h-4" /> Revenue Opp.
          </div>
          <p className="text-sm text-slate-300">Upgrading our single $49/mo user to a multi-seat team account once the Chrome Extension proves daily utility.</p>
        </div>

        <div className="bg-[#0b101b] border border-amber-900/50 rounded-xl p-5">
          <div className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Engineering Risk
          </div>
          <p className="text-sm text-slate-300">DOM Brittleness. Relying on scraping Gmail/LinkedIn classes that could change at any moment.</p>
        </div>

        <div className="bg-[#0b101b] border border-orange-900/50 rounded-xl p-5">
          <div className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <PauseCircle className="w-4 h-4" /> Unnecessary Work
          </div>
          <p className="text-sm text-slate-300">Building advanced analytics dashboards. We do not have enough users for analytics to matter.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Priorities & Action Plan */}
        <div className="lg:col-span-2 space-y-6">
          
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              7-Day Action Plan
            </h2>
            <div className="space-y-3 relative">
              <div className="absolute left-3.5 top-4 bottom-4 w-px bg-slate-800"></div>
              
              <div className="flex gap-4 items-start relative z-10">
                <div className="w-7 h-7 rounded-full bg-slate-900 border border-emerald-500/50 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">1</div>
                <div className="bg-slate-900/50 p-3 flex-1 rounded border border-slate-800">
                  <span className="text-sm font-bold text-slate-200">Initialize Chrome Extension Repository</span>
                  <p className="text-xs text-slate-400 mt-1">Set up React + Vite + CRXJS framework. Establish manifest.v3 structure.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start relative z-10">
                <div className="w-7 h-7 rounded-full bg-slate-900 border border-emerald-500/50 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">2</div>
                <div className="bg-slate-900/50 p-3 flex-1 rounded border border-slate-800">
                  <span className="text-sm font-bold text-slate-200">Content Script Targeting</span>
                  <p className="text-xs text-slate-400 mt-1">Write DOM observers specifically for Gmail's compose window class selectors.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start relative z-10">
                <div className="w-7 h-7 rounded-full bg-slate-900 border border-emerald-500/50 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">3</div>
                <div className="bg-slate-900/50 p-3 flex-1 rounded border border-slate-800">
                  <span className="text-sm font-bold text-slate-200">Backend API Bridge</span>
                  <p className="text-xs text-slate-400 mt-1">Expose a secure `/api/extension/generate` endpoint on our Node.js server.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start relative z-10">
                <div className="w-7 h-7 rounded-full bg-slate-900 border border-emerald-500/50 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">4</div>
                <div className="bg-slate-900/50 p-3 flex-1 rounded border border-slate-800">
                  <span className="text-sm font-bold text-slate-200">Inject Draft & Paste</span>
                  <p className="text-xs text-slate-400 mt-1">Allow the extension to request the draft, and programmatically insert it into the Gmail content container.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start relative z-10">
                <div className="w-7 h-7 rounded-full bg-slate-900 border border-emerald-500/50 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">5</div>
                <div className="bg-slate-900/50 p-3 flex-1 rounded border border-slate-800">
                  <span className="text-sm font-bold text-slate-200">Local Install & Test</span>
                  <p className="text-xs text-slate-400 mt-1">Package the extension unpacked and install it directly on our 1 paying customer's machine via an onboarding call.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
             <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <ListOrdered className="w-4 h-4 text-blue-400" />
              Top 5 Priorities (Ranked)
            </h2>
            <ol className="text-sm text-slate-300 space-y-3 list-decimal pl-5 marker:text-blue-500 font-medium tracking-wide">
              <li>Deploy V1 Chrome Extension for Gmail.</li>
              <li>Hand-hold our 1 paying customer to guarantee they send 50 replies this week.</li>
              <li>Manually onboard 3 more beta users to paid $49/mo accounts.</li>
              <li>Fix API latency spiking over 4.5 seconds for complex prompt generation.</li>
              <li>Write 1 case study based strictly on the first paying customer's reply-rate lift.</li>
            </ol>
          </section>

        </div>

        {/* Right Column: Risks & Opps */}
        <div className="space-y-6">
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Top 5 Risks
            </h2>
            <ul className="text-xs text-slate-300 space-y-3 list-disc pl-4 marker:text-rose-500/50 leading-relaxed">
              <li><strong>Zero Retention:</strong> If we don't fix the Gmail UX friction, all 12 beta users will churn.</li>
              <li><strong>DOM changes:</strong> Gmail updates UI classes, breaking the new extension immediately.</li>
              <li><strong>API Costs:</strong> Uncapped endpoints allow users to burn through token budgets.</li>
              <li><strong>Hallucinations:</strong> The AI drafts a bad response, breaking trust with early adopters.</li>
              <li><strong>Approval Delays:</strong> Chrome Web Store rejects the extension, delaying launch by 14 days.</li>
            </ul>
          </section>

          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              Top 5 Opportunities
            </h2>
            <ul className="text-xs text-slate-300 space-y-3 list-disc pl-4 marker:text-emerald-500/50 leading-relaxed">
              <li>Getting the Chrome Extension installed via manual Zoom calls increases stickiness 10x.</li>
              <li>Using the first paying customer's positive data to upsell their entire 5-person SDR team.</li>
              <li>Adding a "Drafted via EffectiveBuzz" signature hook to organically acquire more SDRs.</li>
              <li>Scraping LinkedIn data manually for customers to remove typing friction on their end.</li>
              <li>Shadow-testing prompt adjustments server-side without needing extension updates.</li>
            </ul>
          </section>
        </div>

      </div>

    </div>
  );
}
