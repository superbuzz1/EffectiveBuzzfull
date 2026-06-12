import React from 'react';
import { 
  Rocket, Users, Target, Headphones, MessageSquare, 
  BarChart3, AlertOctagon, TrendingUp, CalendarDays,
  CheckCircle2, ListTodo, Activity
} from 'lucide-react';

export default function ClosedBetaLaunchPlaybook() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Rocket className="w-4 h-4" />
            Go-To-Market Operations
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Closed Beta Launch Playbook
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Strategic execution plan for onboarding the initial cohort of 50 users, gathering high-fidelity product feedback, and securing early referenceable case studies.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-indigo-500/10 border border-indigo-500/20 px-5 py-3 rounded-lg shrink-0">
          <Target className="w-6 h-6 text-indigo-400" />
          <div>
            <div className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-wider">Target Cohort</div>
            <div className="text-lg font-bold text-indigo-400">50 Active Users</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core Playbook Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Selection Criteria */}
            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
              <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
                <Users className="w-4 h-4 text-emerald-400" />
                1. Selection Criteria
              </h2>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>B2B founders or Head of Sales with existing outbound motions (not starting from scratch).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>Currently paying &gt;$200/mo for legacy point solutions (Apollo, Lemlist).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>Agreed to a mandatory 30-minute feedback call on Day 14.</span>
                </li>
              </ul>
            </section>

            {/* Onboarding Process */}
            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
              <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
                <ListTodo className="w-4 h-4 text-blue-400" />
                2. High-Touch Onboarding
              </h2>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5 font-bold">1.</span>
                  <span>"White-Glove" Setup: Hand-hold domain authentication and CRM sync over Zoom.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5 font-bold">2.</span>
                  <span>Template Migration: Manually port their highest-performing sequences into EffectiveBuzz.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5 font-bold">3.</span>
                  <span>First Send: Ensure they launch at least one live campaign before exiting the onboarding call.</span>
                </li>
              </ul>
            </section>

            {/* Feedback & Support */}
            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6 md:col-span-2">
              <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
                <Headphones className="w-4 h-4 text-amber-400" />
                3. Operations: Feedback & Support
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> Feedback Loop</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Establish a private shared Slack/Discord channel for the Beta Cohort. Actively poll weekly on 1 core flow (e.g., "How intuitive was the AI prompt editor?"). Do not rely on passive feedback forms.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Support SLA</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Engineering guarantees a &lt;1 hour response time during PST business hours. Bugs impacting campaign delivery are treated as Sev-1 and hotfixed same-day.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Timeline Execution Plan */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden relative">
            <div className="px-6 py-4 border-b border-slate-800 bg-[#0b101b]">
              <h2 className="text-sm font-bold text-white flex items-center gap-2 uppercase font-mono tracking-wider">
                <CalendarDays className="w-4 h-4 text-indigo-400" />
                Execution Timeline
              </h2>
            </div>
            
            <div className="p-6 relative">
              <div className="absolute left-[39px] top-8 bottom-8 w-px bg-slate-800"></div>
              
              <div className="space-y-6">
                {/* Day 1 */}
                <div className="relative flex gap-6">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 z-10">
                    <span className="text-[10px] font-bold text-slate-300">D1</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 mb-1">Onboarding Sprint (Day 1)</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Deploy personalized invitation links. Execute 1:1 setup calls. Ensure all 50 users connect their email accounts and run their first AI qualification test. Zero friction tolerance.
                    </p>
                  </div>
                </div>
                
                {/* Week 1 */}
                <div className="relative flex gap-6">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 z-10">
                    <span className="text-[10px] font-bold text-slate-300">W1</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 mb-1">First Campaign Results (Week 1)</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Monitor deliverability rates intensely. Proactively reach out to users with bounce rates &gt;2%. Ship UI/UX hotfixes based on initial confusion patterns observed in logs.
                    </p>
                  </div>
                </div>

                {/* Week 2 */}
                <div className="relative flex gap-6">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 z-10">
                    <span className="text-[10px] font-bold text-slate-300">W2</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 mb-1">Feedback Interviews (Week 2)</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Conduct mandatory 30-min feedback calls. Probe for "Aha!" moments. Identify the exact feature that makes them want to pay. Map missing features blocking migration.
                    </p>
                  </div>
                </div>

                {/* Week 4 */}
                <div className="relative flex gap-6">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0 z-10 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                    <span className="text-[10px] font-bold text-indigo-400">W4</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-indigo-300 mb-1">Conversion & Conclusion (Week 4)</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Present specialized early-adopter pricing. Transition active, successful beta testers onto paid plans. Unsuccessful users offboarded with an exit interview to define product roadmap gaps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar: Metrics & Signals */}
        <div className="space-y-6">

          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-5">
            <h2 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Success Metrics
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Activation Rate</span>
                  <span className="font-bold text-emerald-400">Target: 80%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[80%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Users launching &gt;1 campaign.</p>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">W2 Retention Rate</span>
                  <span className="font-bold text-emerald-400">Target: 60%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[60%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Users returning to check AI replies in Week 2.</p>
              </div>
            </div>
          </section>

          <section className="bg-rose-950/10 border border-rose-900/30 rounded-xl p-5">
            <h2 className="text-xs font-bold text-rose-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <AlertOctagon className="w-4 h-4" />
              Churn Signals (Intervene)
            </h2>
            <ul className="space-y-3 text-xs text-slate-300 marker:text-rose-500 list-disc pl-4">
              <li>0 logins within 72 hours of initial onboarding.</li>
              <li>Campaign created but left in 'Draft' status for &gt;48 hours.</li>
              <li>High bounce rates (&gt;5%) leading to account suppression limits.</li>
              <li>User explicitly exports their CRM data.</li>
            </ul>
          </section>

          <section className="bg-emerald-950/10 border border-emerald-900/30 rounded-xl p-5">
            <h2 className="text-xs font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <TrendingUp className="w-4 h-4" />
              Expansion Signals (Upsell)
            </h2>
            <ul className="space-y-3 text-xs text-slate-300 marker:text-emerald-500 list-disc pl-4">
              <li>User manually reviews and approves &gt;50 AI-generated replies.</li>
              <li>User invites a teammate to their workspace.</li>
              <li>User hits weekly email sending limit and requests a quota increase.</li>
              <li>Unsolicited positive feedback via email/Slack.</li>
            </ul>
          </section>

        </div>

      </div>

    </div>
  );
}
