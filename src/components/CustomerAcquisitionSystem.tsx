import React from 'react';
import { 
  Users, Target, Rocket, Mail, MessageSquare, 
  MonitorPlay, ShieldAlert, Workflow, BarChart, 
  CalendarDays, CheckCircle2, TrendingUp, Filter
} from 'lucide-react';

export default function CustomerAcquisitionSystem() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-4 h-4" />
            Revenue Operations Playbook
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Customer #2–#10 Acquisition System
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Transitioning from the unscalable "first sale" to a repeatable mechanism. A strict playbook designed to secure the next 10 logos and drive us to the $1k MRR milestone.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-indigo-500/10 border border-indigo-500/30 px-6 py-4 rounded-xl shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          <div>
            <div className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Next Goal
            </div>
            <div className="text-2xl font-black text-indigo-400">10 Paying Logos</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Playbook) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: ICP */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Target className="w-4 h-4 text-emerald-400" />
              1. Verified Ideal Customer Profile (ICP)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                 <span className="block text-[10px] font-mono text-emerald-500 uppercase mb-1">Company Profile</span>
                 <span className="text-sm text-slate-200 font-medium">B2B SaaS, $1M-$5M ARR</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                 <span className="block text-[10px] font-mono text-emerald-500 uppercase mb-1">Target Persona</span>
                 <span className="text-sm text-slate-200 font-medium">Founder / Head of Outbound</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg sm:col-span-2">
                 <span className="block text-[10px] font-mono text-emerald-500 uppercase mb-1">Pain Point</span>
                 <span className="text-sm text-slate-200 font-medium">Sending volume but getting zero replies. Struggling to hit quota because traditional mass-email is hitting spam filters.</span>
              </div>
            </div>
          </section>

          {/* Section 2: Channels */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Rocket className="w-4 h-4 text-amber-400" />
              2. Acquisition Channels (Ranked)
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Cold Email (Dogfooding)', roi: 'Highest', limit: 'Scaleable', desc: 'Use EffectiveBuzz to sell EffectiveBuzz.' },
                { name: 'LinkedIn Direct', roi: 'High', limit: 'Volume Capped', desc: 'Sales Navigator connection requests targeting exact ICP.' },
                { name: 'Beta Referrals', roi: 'Medium-High', limit: 'Small N', desc: 'Leverage the first cohort for lookalike introductions.' },
                { name: 'Niche Communities', roi: 'Medium', limit: 'Moderation Risk', desc: 'Slack/Discord channels for RevOps and Sales.' },
                { name: 'Partnerships', roi: 'Low (Short-term)', limit: 'Slow cycle', desc: 'B2B Sales consultants.' }
              ].map((channel, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="mb-2 sm:mb-0">
                    <span className="text-sm font-bold text-slate-200">{i + 1}. {channel.name}</span>
                    <p className="text-xs text-slate-400 mt-1">{channel.desc}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{channel.roi}</span>
                    <span className="text-[10px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded">{channel.limit}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Sequences */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Mail className="w-4 h-4 text-blue-400" />
              3. Master Outreach Sequence
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-4">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">Day 1: Initial Message</span>
                <p className="text-xs text-slate-300 mt-1 italic">"Hi [Name], noticing [Company] is scaling outbound. I built an AI agent that drafts hyper-personalized responses based on your specific site data—it's what wrote this email exactly. Open to seeing if it beats your current Lemlist/Apollo baseline?"</p>
              </div>
              <div className="border-l-2 border-slate-600 pl-4">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Day 3: Follow-up #1 (Value)</span>
                <p className="text-xs text-slate-300 mt-1 italic">"Quick bump on this—one of our early beta users (B2B SaaS founder) just doubled their reply rate using this contextual approach instead of templates. Takes 2 mins to hook up to your inbox."</p>
              </div>
              <div className="border-l-2 border-slate-600 pl-4">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Day 7: Follow-up #2 (Social Proof)</span>
                <p className="text-xs text-slate-300 mt-1 italic">"Just wrapping up our closed beta and opening up 10 'Charter Member' slots at a heavily discounted legacy rate. Thought of [Company]. Let me know if you want a 5-min demo."</p>
              </div>
              <div className="border-l-2 border-rose-500 pl-4">
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase">Day 12: Breakup Message</span>
                <p className="text-xs text-slate-300 mt-1 italic">"Looks like bad timing for [Company]. I'll pause outreach. If you ever feel the pain of writing manual context for leads again, you know where to find me. Keep crushing it."</p>
              </div>
            </div>
          </section>

          {/* Section 4 & 5: Demo & Objections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
              <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
                <MonitorPlay className="w-4 h-4 text-violet-400" />
                4. The 15-Min Demo
              </h2>
              <ol className="list-decimal pl-4 space-y-2 text-xs text-slate-300 marker:text-violet-500">
                <li><strong className="text-slate-200">Minutes 0-3:</strong> Discovery mapping (Identify their current tool stack).</li>
                <li><strong className="text-slate-200">Minutes 3-8:</strong> The 'Aha' Demo—show the unified triage inbox approving a perfect AI draft.</li>
                <li><strong className="text-slate-200">Minutes 8-12:</strong> Outcome Review—show the actual success metrics from Customer #1.</li>
                <li><strong className="text-slate-200">Minutes 12-15:</strong> The Close—Drop the onboarding link.</li>
              </ol>
            </section>

            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
              <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                5. Defense Matrix
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-rose-400">Objection: "We already use Apollo AI."</span>
                  <p className="text-xs text-slate-300 mt-0.5">Response: "Apollo is great for volume. We are an overlay for *relevance*. We integrate with your existing pipe to convert the bounces."</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-rose-400">Objection: "Too expensive ($49/mo)."</span>
                  <p className="text-xs text-slate-300 mt-0.5">Response: "If it books exactly one extra meeting per month, does it pay for itself?"</p>
                </div>
              </div>
            </section>
          </div>
          
          {/* Section 9: Action Plan */}
          <section className="bg-indigo-950/20 border border-indigo-900/50 rounded-xl p-6">
            <h2 className="text-sm font-bold text-indigo-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-indigo-900/50 pb-3">
              <CalendarDays className="w-4 h-4" />
              9. Execute: 5-Day Sprint
            </h2>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="text-xs font-mono font-bold text-slate-500 uppercase mt-0.5 w-12 shrink-0">Day 1</div>
                <p className="text-sm text-slate-300">Scrape 500 hyper-targeted ICP leads from LinkedIn Sales Navigator.</p>
              </div>
              <div className="flex gap-4">
                <div className="text-xs font-mono font-bold text-slate-500 uppercase mt-0.5 w-12 shrink-0">Day 2</div>
                <p className="text-sm text-slate-300">Load into EffectiveBuzz dogfooding engine. Tweak initial sequence prompts.</p>
              </div>
              <div className="flex gap-4">
                <div className="text-xs font-mono font-bold text-slate-500 uppercase mt-0.5 w-12 shrink-0">Day 3</div>
                <p className="text-sm text-slate-300">Launch Batch A (100 leads). Monitor immediate bounce/reply rates.</p>
              </div>
              <div className="flex gap-4">
                <div className="text-xs font-mono font-bold text-indigo-400 uppercase mt-0.5 w-12 shrink-0">Day 4</div>
                <p className="text-sm text-indigo-200">Field replies. Execute 15-minute demos. Push to 7-Day trial.</p>
              </div>
              <div className="flex gap-4">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase mt-0.5 w-12 shrink-0">Day 5</div>
                <p className="text-sm text-emerald-200">Volume scaling. Launch Batch B (200 leads) utilizing winning permutations.</p>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column (Metrics & Funnel) */}
        <div className="space-y-6">

          {/* Section 6: Funnel */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-6 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Workflow className="w-4 h-4 text-emerald-400" />
              6. Conversion Funnel
            </h2>
            <div className="pl-4 border-l-2 border-slate-800 space-y-5 relative">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                <span className="block text-xs font-bold text-slate-300">Discovery (Asynchronous)</span>
                <span className="block text-[10px] text-slate-500 mt-1">Cold email reply triggers validation.</span>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <span className="block text-xs font-bold text-blue-400">Demo (15 Minutes)</span>
                <span className="block text-[10px] text-slate-500 mt-1">Synchronous zoom. Display 'Aha' moment.</span>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                <span className="block text-xs font-bold text-indigo-400">Trial (7 Days)</span>
                <span className="block text-[10px] text-slate-500 mt-1">White-glove onboarding. First campaign sent.</span>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <span className="block text-xs font-bold text-emerald-400">Payment</span>
                <span className="block text-[10px] text-slate-500 mt-1">Trial exhaustion mapping to Stripe checkout.</span>
              </div>
            </div>
          </section>

          {/* Section 7 & 8: Metrics */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <BarChart className="w-4 h-4 text-amber-400" />
              7 & 8. Weekly Dashboard
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Conversations</span>
                  <span className="font-bold text-slate-400">Target: 25 / wk</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-600 w-[0%] rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Demos Booked</span>
                  <span className="font-bold text-blue-400">Target: 10 / wk</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[0%] rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Active Trials</span>
                  <span className="font-bold text-indigo-400">Target: 5 / wk</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[0%] rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">New Customers</span>
                  <span className="font-bold text-emerald-400">Target: 2.5 / wk</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[0%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-emerald-500/70 mt-2 text-center font-mono tracking-wider">Velocity Required: 4 Weeks to 10 Logos</p>
              </div>
            </div>

          </section>

        </div>

      </div>

    </div>
  );
}
