import React from 'react';
import { 
  FileCheck2, Search, Target, BookOpen, 
  Repeat, UserCheck, AlertTriangle, Lightbulb,
  DollarSign, Zap, Crosshair
} from 'lucide-react';

export default function FirstPayingCustomerPostMortem() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <FileCheck2 className="w-4 h-4" />
            Revenue Operations Sync
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            First Customer Post-Mortem
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Deconstructing the mechanics of our first closed-won deal. Extracting the core value drivers, overcoming the blockers, and establishing the exact formula to systematically acquire the next 10 logos.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/30 px-6 py-4 rounded-xl shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <div>
            <div className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" /> Deal Status
            </div>
            <div className="text-xl font-black text-emerald-400">Closed Won</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Deal Analysis Breakdown */}
        <div className="space-y-6">
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Search className="w-4 h-4 text-indigo-400" />
              Deal Mechanics Review
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                  <h3 className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest mb-2">Why They Bought</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">Pain avoidance. They were spending 12 hours a week manually contextualizing emails that were still bouncing. We bought their time back.</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                  <h3 className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest mb-2">Core Feature</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">The unified triage inbox. Being able to approve AI drafts directly without swapping tabs was the "aha!" moment.</p>
                </div>
                <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-lg">
                  <h3 className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-widest mb-2">The Near-Blocker</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">Lack of native HubSpot sync. They almost walked because of dual data entry. We mitigated via Zapier workaround promise.</p>
                </div>
                <div className="bg-[#0b101b] border border-slate-800 p-4 rounded-lg">
                  <h3 className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest mb-2">Winning Messaging</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">Focusing on "Contextual AI" vs "Mass Email." They bought the sniper, not the shotgun approach.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-amber-950/10 border border-amber-900/30 rounded-xl p-6">
            <h2 className="text-sm font-bold text-amber-500 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <Lightbulb className="w-4 h-4" />
              Strategic Lessons Learned
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="mt-0.5"><Zap className="w-4 h-4 text-amber-500" /></div>
                <div>
                  <span className="font-bold text-slate-200 text-sm">Sell the Workflow, Not the AI</span>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Users don't care about LLMs. They care that the triage view lets them clear 50 emails in 4 minutes instead of an hour.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5"><Zap className="w-4 h-4 text-amber-500" /></div>
                <div>
                  <span className="font-bold text-slate-200 text-sm">CRM Integration is a Strict Prerequisite</span>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">To scale beyond early adopters, native HubSpot/Salesforce sync must be prioritized in the next sprint.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5"><Zap className="w-4 h-4 text-amber-500" /></div>
                <div>
                  <span className="font-bold text-slate-200 text-sm">Onboarding Quality Dictates WTP</span>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">The willingness to pay (WTP) was established during the high-touch onboarding when they saw the first campaign launch perfectly.</p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* Actionable Playbooks */}
        <div className="space-y-6">
          <section className="bg-emerald-950/10 border border-emerald-900/30 rounded-xl p-6">
            <h2 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-emerald-900/40 pb-3">
              <UserCheck className="w-4 h-4" />
              Verified Ideal Customer Profile (ICP)
            </h2>
            <div className="space-y-3">
              <div className="bg-[#0b101b] p-3 rounded border border-slate-800">
                <span className="block text-[10px] font-mono text-emerald-500 uppercase mb-1">Company Stage</span>
                <span className="text-sm text-slate-200 font-medium">B2B SaaS, $1M - $5M ARR (Seed / Series A)</span>
              </div>
              <div className="bg-[#0b101b] p-3 rounded border border-slate-800">
                <span className="block text-[10px] font-mono text-emerald-500 uppercase mb-1">Target Persona</span>
                <span className="text-sm text-slate-200 font-medium">Founder or Head of Sales leading outbound directly</span>
              </div>
              <div className="bg-[#0b101b] p-3 rounded border border-slate-800">
                <span className="block text-[10px] font-mono text-emerald-500 uppercase mb-1">Pain Indicator</span>
                <span className="text-sm text-slate-200 font-medium">Currently using Apollo/Lemlist but complaining about low response rates and burning domains.</span>
              </div>
            </div>
          </section>

          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Refined Sales Playbook
            </h2>
            <ol className="list-decimal pl-4 space-y-3 text-xs text-slate-300 marker:text-blue-500">
              <li>
                <strong className="text-slate-200 block mb-0.5">The Hook:</strong>
                Target ICPs complaining on LinkedIn about email deliverability. DM them offering an "inbox triage time-study".
              </li>
              <li>
                <strong className="text-slate-200 block mb-0.5">The Pitch:</strong>
                "Don't replace your reps; give them a sniper rifle. EffectiveBuzz contextually drafts responses based on your specific website."
              </li>
              <li>
                <strong className="text-slate-200 block mb-0.5">The Demo:</strong>
                Do not show the dashboard first. Show the unified inbox. Replicate the exact specific "aha!" moment of hitting 'Approve' on a perfect AI draft.
              </li>
              <li>
                <strong className="text-slate-200 block mb-0.5">The Objection Handle:</strong>
                For the CRM objection, immediately push them to the native CSV export or map the Zapier template live.
              </li>
            </ol>
          </section>

          <section className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
            <h2 className="text-sm font-bold text-indigo-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <Repeat className="w-4 h-4" />
              The Next 10 Logos Plan
            </h2>
            <ul className="space-y-4 text-xs text-slate-300">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold shrink-0">1</div>
                <p>Run a LinkedIn Sales Navigator extract matching the exact verified ICP.</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold shrink-0">2</div>
                <p>Use EffectiveBuzz (Dogfooding) to execute the refined playbook messaging to 100 highly targeted leads.</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold shrink-0">3</div>
                <p>Convert 10 to paid by leveraging the case study and success metrics from Customer 1.</p>
              </li>
            </ul>
          </section>
        </div>

      </div>

    </div>
  );
}
