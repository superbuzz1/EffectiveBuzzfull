import React from 'react';
import { 
  TrendingUp, Users, Target, Search, BarChart, 
  LineChart, Workflow, Rocket, Zap, Clock, ShieldCheck
} from 'lucide-react';

export default function First1kMRRPlan() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-4 h-4" />
            Go-To-Market Growth
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            The Path to $1,000 MRR
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Transitioning from the first unscalable sales to repeatable, organic growth mechanisms. Strategy encompasses pricing architecture, acquisition channels, and conversion funnels to reach the first major revenue milestone within 45 days.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#0b101b] border border-amber-500/30 px-6 py-4 rounded-xl shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <div>
            <div className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider mb-1">Target Revenue</div>
            <div className="text-3xl font-black text-amber-400">$1,000<span className="text-sm font-medium text-amber-500/70">/mo</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* The Math (Pricing) */}
        <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-5 md:col-span-1 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <BarChart className="w-4 h-4 text-blue-400" />
              The Math
            </h2>
            <div className="space-y-4">
              <div>
                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Standard Tier</span>
                <div className="text-xl font-bold text-white">$49 / mo</div>
                <div className="text-xs text-slate-400 mt-1">Need: <span className="text-emerald-400 font-bold">21 users</span></div>
              </div>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0b101b] px-2 text-[10px] font-mono text-slate-500 uppercase">OR</span>
                </div>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Pro Tier</span>
                <div className="text-xl font-bold text-white">$99 / mo</div>
                <div className="text-xs text-slate-400 mt-1">Need: <span className="text-emerald-400 font-bold">11 users</span></div>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-xs text-blue-300 leading-relaxed font-mono">
            Strategy: Push the $99/mo tier as the default for teams. Offer $49/mo exclusively as downsell for solo founders.
          </div>
        </div>

        {/* Distribution Channels */}
        <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-6 md:col-span-3">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
            <Rocket className="w-4 h-4 text-emerald-400" />
            Acquisition Channels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-200">1. Dogfooding (Cold Email)</h3>
                <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded">Primary</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Use EffectiveBuzz to sell EffectiveBuzz. Target VP Sales & RevOps on LinkedIn. Show them they are receiving an AI-generated email that looks 100% human. "I built this to do exactly what it just did to you."
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-200">2. Founder Personal Brand</h3>
                <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Organic</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Build in public on LinkedIn and X. Document the journey of building the AI engine. Share prompt engineering secrets. Post screenshots of 80% open rates to build FOMO.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-200">3. Micro-Launches</h3>
                <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Burst Traffic</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Launch distinct sub-tools for free (e.g., "Free AI Subject Line Rater" or "Spam Word Checker") on Product Hunt and Hacker News to capture top-of-funnel leads.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-200">4. Beta Referrals</h3>
                <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded">High Conv</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Leverage the initial closed beta cohort. Provide a 2-for-1 lifetime deal if they successfully refer another Founder/Sales Leader who converts to a paid plan.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* The Funnel */}
      <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
        <h2 className="text-sm font-bold text-white mb-6 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
          <Workflow className="w-4 h-4 text-violet-400" />
          The Self-Serve Conversion Funnel
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-slate-800 z-0"></div>

          {/* Phase 1 */}
          <div className="flex-1 relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-slate-300 font-bold mb-3 shadow-lg">1</div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg text-center w-full shadow-lg">
              <h3 className="text-sm font-bold text-white mb-1">Traffic & Landing</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                Clear value prop: "Stop sending slop. AI emails that actually get replies." Primary CTA: Start 7-Day Free Trial.
              </p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="flex-1 relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 font-bold mb-3 shadow-[0_0_15px_rgba(99,102,241,0.2)]">2</div>
            <div className="bg-indigo-950/20 border border-indigo-900/40 p-4 rounded-lg text-center w-full shadow-lg">
              <h3 className="text-sm font-bold text-indigo-300 mb-1">The "Aha!" Moment</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                Onboarding forces them to connect email and generate 1 AI campaign before accessing the main dashboard. Immediate value delivery.
              </p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="flex-1 relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-slate-300 font-bold mb-3 shadow-lg">3</div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg text-center w-full shadow-lg">
              <h3 className="text-sm font-bold text-white mb-1">Trial Exhaustion</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                Day 5 automated email shows stats: "You've saved X hours. Trial ends in 48 hours. Enter card to keep sending."
              </p>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="flex-1 relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 font-bold mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">4</div>
            <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-lg text-center w-full shadow-lg">
              <h3 className="text-sm font-bold text-emerald-400 mb-1">Conversion</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                Stripe payment intent succeeds. Automated welcome email from Founder. Setup 30-day CS check-in sequence to combat early churn.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
