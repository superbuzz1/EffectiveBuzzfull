import React from 'react';
import { 
  MessageSquare, BarChart3, TrendingUp, AlertTriangle, 
  Lightbulb, CheckCircle2, UserX, Target, ThumbsUp, 
  RefreshCcw, ArrowRight
} from 'lucide-react';

export default function BetaFeedbackAnalysis() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-4 h-4" />
            Product & Engineering Sync
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Closed Beta Feedback Analysis
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Synthesis of qualitative and quantitative signals from the first 50 Beta users. Mapping friction points to actionable engineering sprints for the V1 commercial release.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 rounded-lg shrink-0">
          <Target className="w-6 h-6 text-emerald-400" />
          <div>
            <div className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider">Cohort Health</div>
            <div className="text-lg font-bold text-emerald-400">Positive Signals</div>
          </div>
        </div>
      </div>

      {/* Quantitative Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0b101b] border border-slate-800 p-4 rounded-xl">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">Active Beta Users</div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">42</span>
            <span className="text-xs text-slate-500 mb-1">/ 50</span>
          </div>
          <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[84%]"></div>
          </div>
        </div>
        <div className="bg-[#0b101b] border border-slate-800 p-4 rounded-xl">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">Campaigns Launched</div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">128</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
            <TrendingUp className="w-3 h-3" /> +15 this week
          </div>
        </div>
        <div className="bg-[#0b101b] border border-slate-800 p-4 rounded-xl">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">AI Replies Gen.</div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">4,205</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
            <TrendingUp className="w-3 h-3" /> High adoption
          </div>
        </div>
        <div className="bg-rose-950/10 border border-rose-900/30 p-4 rounded-xl">
          <div className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-widest mb-1">Early Churn</div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-rose-400">8</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-rose-500 font-bold">
            <UserX className="w-3 h-3" /> Ghosted post-onboarding
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        
        {/* Core Insights */}
        <div className="space-y-6">
          
          <section className="bg-emerald-950/10 border border-emerald-900/30 rounded-xl p-6">
            <h2 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <ThumbsUp className="w-4 h-4" />
              What They Loved (Value Drivers)
            </h2>
            <ul className="space-y-4">
              <li className="bg-[#0b101b] p-4 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-200 block mb-1">AI Reply Context Awareness</span>
                <p className="text-sm text-slate-400 leading-relaxed">
                  "The Gemini agent picked up on a nuanced objection about SOC2 compliance that my SDRs usually miss. It drafted a perfect redirect to our security page."
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase">Core Moat Validation</span>
                </div>
              </li>
              <li className="bg-[#0b101b] p-4 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-200 block mb-1">Unified Inbox Speed</span>
                <p className="text-sm text-slate-400 leading-relaxed">
                  "Not having to context-switch between Gmail and Apollo is saving me 2 hours a day. The triage workflow is incredibly fast."
                </p>
              </li>
            </ul>
          </section>

          <section className="bg-amber-950/10 border border-amber-900/30 rounded-xl p-6">
            <h2 className="text-sm font-bold text-amber-500 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Friction Points (UX/UI)
            </h2>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/30">1</div>
                <div>
                  <strong className="text-slate-200 block mb-1">Campaign Builder Sequence Logic</strong>
                  <span className="text-slate-400">Users are confused by the delay nodes between emails. Many accidentally set "Delay 0 Days" causing double sends.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/30">2</div>
                <div>
                  <strong className="text-slate-200 block mb-1">Data CSV Import Mapping</strong>
                  <span className="text-slate-400">The automatic column matcher failed on ZoomInfo exports because of custom header names (`Person_First_Name`). Forced manual mapping is tedious.</span>
                </div>
              </li>
            </ul>
          </section>

        </div>

        {/* Action Plan */}
        <div className="space-y-6">
          
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <Lightbulb className="w-4 h-4 text-indigo-400" />
              Feature Requests (Ranked)
            </h2>
            <div className="space-y-3">
              {[
                { name: 'LinkedIn Automation / Omni-channel', votes: 34, status: 'Backlog (Q3)' },
                { name: 'A/B Testing for AI Prompts', votes: 28, status: 'In Sprint' },
                { name: 'HubSpot Native Integration', votes: 22, status: 'In Sprint' },
                { name: 'Custom Domain Tracking Setup Wizard', votes: 15, status: 'Planning' }
              ].map((feat, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800/60">
                  <span className="text-sm text-slate-300">{feat.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-mono">{feat.votes} requests</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      feat.status === 'In Sprint' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {feat.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-6">
            <h2 className="text-sm font-bold text-indigo-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <RefreshCcw className="w-4 h-4" />
              V1 Iteration Sprints (Next 14 Days)
            </h2>
            <div className="relative pl-4 border-l border-indigo-500/30 space-y-6 mt-4">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                <h3 className="text-sm font-bold text-white mb-1">Sprint A: UX Polish & Safety</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  Implement node validation in the campaign builder (prevent 0-day delays). Add alias support for CSV column mapping to auto-detect common ZoomInfo/Apollo headers.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                <h3 className="text-sm font-bold text-white mb-1">Sprint B: The CRM Gap</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  Deliver the HubSpot integration. 22 users cited lack of bidirectional HubSpot sync as a strict blocker for paying for the product post-beta.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <h3 className="text-sm font-bold text-slate-300 mb-1">Sprint C: Billing Core</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  Lock down Stripe Checkout flows, enforce quotas, and flip the switch to end the free beta period.
                </p>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg text-sm font-mono font-bold tracking-wider transition-colors flex items-center justify-center gap-2">
              Approve V1 Sprint Plan <ArrowRight className="w-4 h-4" />
            </button>
          </section>

        </div>

      </div>

    </div>
  );
}
