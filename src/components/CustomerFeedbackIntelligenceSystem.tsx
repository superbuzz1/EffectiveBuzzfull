import React from 'react';
import { 
  Brain, MessageSquare, Filter, Star, 
  Activity, TrendingUp, Calendar, LayoutGrid, 
  ArrowRight, ShieldAlert, Zap, Target
} from 'lucide-react';

export default function CustomerFeedbackIntelligenceSystem() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Brain className="w-4 h-4" />
            Product & Customer Success
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Customer Feedback Intelligence
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            The operational framework for extracting, classifying, and acting upon qualitative user data to drive product prioritization and maximize retention.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-indigo-500/10 border border-indigo-500/30 px-6 py-4 rounded-xl shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          <div>
            <div className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Next Goal
            </div>
            <div className="text-xl font-black text-indigo-400">Churn &lt; 3%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column */}
        <div className="space-y-6">
          
          {/* Section 1: Customer Interview Framework */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              1. Customer Interview Framework
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-900 border-l-2 border-blue-500 p-3 rounded">
                <span className="block text-[10px] font-mono text-blue-400 uppercase mb-1">Origin Trigger</span>
                <p className="text-xs text-slate-300 italic">"What happened in your business that caused you to search for a solution like EffectiveBuzz?"</p>
              </div>
              <div className="bg-slate-900 border-l-2 border-emerald-500 p-3 rounded">
                <span className="block text-[10px] font-mono text-emerald-400 uppercase mb-1">Value Extraction</span>
                <p className="text-xs text-slate-300 italic">"What exact problem does this solve for you today that you couldn't solve before?"</p>
              </div>
              <div className="bg-slate-900 border-l-2 border-amber-500 p-3 rounded">
                <span className="block text-[10px] font-mono text-amber-400 uppercase mb-1">Competitive Matrix</span>
                <p className="text-xs text-slate-300 italic">"Before you paid for us, what alternatives did you seriously consider?"</p>
              </div>
              <div className="bg-slate-900 border-l-2 border-rose-500 p-3 rounded">
                <span className="block text-[10px] font-mono text-rose-400 uppercase mb-1">Friction Mapping</span>
                <p className="text-xs text-slate-300 italic">"What was the main thing that almost prevented you from signing up?"</p>
              </div>
            </div>
          </section>

          {/* Section 2: Feature Request Framework */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Filter className="w-4 h-4 text-emerald-400" />
              2. Feature Request Classification
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-rose-950/20 border border-rose-900/40 p-3 rounded-lg">
                <span className="block text-[10px] font-mono font-bold text-rose-500 uppercase">Critical (Build Now)</span>
                <p className="text-xs text-slate-400 mt-1">Blocks core workflow. User cannot send campaigns without this. (e.g., Deliverability tracking).</p>
              </div>
              <div className="bg-amber-950/20 border border-amber-900/40 p-3 rounded-lg">
                <span className="block text-[10px] font-mono font-bold text-amber-500 uppercase">Important (Next Sprint)</span>
                <p className="text-xs text-slate-400 mt-1">Slightly degrades value. Causes manual workarounds. (e.g., Native CRM Sync).</p>
              </div>
              <div className="bg-blue-950/20 border border-blue-900/40 p-3 rounded-lg">
                <span className="block text-[10px] font-mono font-bold text-blue-400 uppercase">Nice to Have (Backlog)</span>
                <p className="text-xs text-slate-400 mt-1">Quality of life improvements. No revenue risk. (e.g., Dark mode UI toggle).</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Ignore (Discard)</span>
                <p className="text-xs text-slate-400 mt-1">Outside core ICP thesis. Attempts to turn the product into a generic CRM.</p>
              </div>
            </div>
          </section>

          {/* Section 4 & 5: Signals */}
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Activity className="w-4 h-4 text-violet-400" />
              4 & 5. Account Health Signals
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><ShieldAlert className="w-3 h-3" /> Retention Risk Monitors</h3>
                <div className="pl-4 border-l-2 border-slate-800 space-y-3">
                  <div>
                    <span className="text-xs font-bold text-slate-300">The "Ghost" Account (Churn Risk)</span>
                    <p className="text-xs text-slate-400">Zero logins in 14 days. Zero campaigns sent in 30 days. Billing failure warning.</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-300">The "Frustrated" Account (At Risk)</span>
                    <p className="text-xs text-slate-400">High login frequency but zero campaign launches. Multiple support tickets on the same issue.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><TrendingUp className="w-3 h-3" /> Expansion & Upsell Monitors</h3>
                <div className="pl-4 border-l-2 border-slate-800 space-y-3">
                  <div>
                    <span className="text-xs font-bold text-slate-300">Seat Expansion Candidate</span>
                    <p className="text-xs text-slate-400">Inviting multiple non-licensed users. Sharing logins across IP addresses.</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-300">Enterprise Upgrade Candidate</span>
                    <p className="text-xs text-slate-400">Maxing out API limits. Requesting SAML/SSO or custom MSA agreements.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Section 3: Satisfaction */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Star className="w-4 h-4 text-amber-400" />
              3. Satisfaction Framework
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div>
                  <span className="text-sm font-bold text-slate-200 block">NPS Score (Net Promoter)</span>
                  <span className="text-xs text-slate-400">"How likely are you to recommend us?"</span>
                </div>
                <div className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded">Target: 40+</div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div>
                  <span className="text-sm font-bold text-slate-200 block">Product/Market Fit Score</span>
                  <span className="text-xs text-slate-400">"How disappointed if we disappeared?"</span>
                </div>
                <div className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded">Target: 40%</div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div>
                  <span className="text-sm font-bold text-slate-200 block">Feature Usage Score</span>
                  <span className="text-xs text-slate-400">Percentage of core workflow used.</span>
                </div>
                <div className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded">Target: 80%</div>
              </div>
            </div>
          </section>

          {/* Section 7: Prioritization Matrix */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <LayoutGrid className="w-4 h-4 text-indigo-400" />
              7. Product Prioritization Matrix
            </h2>
            <div className="overflow-hidden rounded-lg border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 uppercase font-mono">
                  <tr>
                    <th className="px-3 py-2 font-bold tracking-wider">Vector</th>
                    <th className="px-3 py-2 font-bold tracking-wider">Weight</th>
                    <th className="px-3 py-2 font-bold tracking-wider">Definition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-[#0b101b]">
                  <tr>
                    <td className="px-3 py-3 font-bold text-emerald-400 flex items-center gap-1.5"><DollarSign className="w-3 h-3"/> Revenue Impact</td>
                    <td className="px-3 py-3 font-mono">Multiplier</td>
                    <td className="px-3 py-3 text-slate-400">Does this unblock closed-lost deals or enable higher-tier pricing?</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-bold text-blue-400 flex items-center gap-1.5"><Users className="w-3 h-3"/> Customer Impact</td>
                    <td className="px-3 py-3 font-mono">+ 1 to 5</td>
                    <td className="px-3 py-3 text-slate-400">How many <em>paying</em> users have requested this explicitly?</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-bold text-rose-400 flex items-center gap-1.5"><Zap className="w-3 h-3"/> Engineering Effort</td>
                    <td className="px-3 py-3 font-mono">- 1 to 5</td>
                    <td className="px-3 py-3 text-slate-400">Complexity. Is it a 1-day script or a 2-month architectural rewrite?</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6 & 8: Review & Action Plan */}
          <section className="bg-indigo-950/20 border border-indigo-900/50 rounded-xl p-6">
            <h2 className="text-sm font-bold text-indigo-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-indigo-900/50 pb-3">
              <Calendar className="w-4 h-4" />
              6 & 8. Review & Action Cadence
            </h2>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                 <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-slate-900 text-slate-500 group-[.is-active]:text-emerald-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                   <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                 </div>
                 <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded bg-slate-900/50 border border-slate-800">
                    <span className="font-bold text-slate-200 text-sm block">Weekly: Triage sync</span>
                    <p className="text-xs text-slate-400 mt-1">Review raw tickets. Categorize bugs vs feature requests.</p>
                 </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                 <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-slate-900 text-slate-500 group-[.is-active]:text-blue-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                   <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                 </div>
                 <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded bg-slate-900/50 border border-slate-800">
                    <span className="font-bold text-slate-200 text-sm block">Monthly: The Board</span>
                    <p className="text-xs text-slate-400 mt-1">Run Prioritization Matrix. Lock next 30-day Dev Sprint.</p>
                 </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                 <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-slate-900 text-slate-500 group-[.is-active]:text-amber-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                   <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                 </div>
                 <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded bg-slate-900/50 border border-slate-800">
                    <span className="font-bold text-slate-200 text-sm block">Quarterly: Strategy</span>
                    <p className="text-xs text-slate-400 mt-1">Review churn cohorts, NPS shifts, and adjust overarching roadmap.</p>
                 </div>
              </div>

            </div>
          </section>

        </div>

      </div>

    </div>
  );
}

// local icons for table component
function DollarSign(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
}
function Users(props: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
