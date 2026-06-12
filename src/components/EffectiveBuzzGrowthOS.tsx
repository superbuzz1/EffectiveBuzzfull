import React from 'react';
import { 
  Compass, LayoutDashboard, RefreshCcw, HeartHandshake, 
  ListOrdered, Calendar, AlertTriangle, Lightbulb, 
  Target, TrendingUp, Users, Activity, ShieldAlert,
  Rocket
} from 'lucide-react';

export default function EffectiveBuzzGrowthOS() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            Executive Operating System
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            EffectiveBuzz Growth OS
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            The comprehensive system for scaling from 0 to 1,000 customers. Integrating product, revenue, engineering, and customer success into a singular execution framework.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/30 px-6 py-4 rounded-xl shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <div>
            <div className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Growth Stage
            </div>
            <div className="text-xl font-black text-emerald-400">Scale Phase</div>
          </div>
        </div>
      </div>

      {/* Top Level: North Star & Highest ROI Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section 1: North Star */}
        <section className="bg-indigo-950/20 border border-indigo-900/50 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>
          <h2 className="text-sm font-bold text-indigo-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <Compass className="w-4 h-4" />
            1. North Star Metric
          </h2>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-white">Active Contextual Replies Sent</h3>
            <p className="text-sm text-slate-300">
              The aggregate number of AI-drafted, contextually relevant replies approved and sent by users per week.
            </p>
            <p className="text-xs text-slate-400 mt-2 italic border-l-2 border-indigo-500/50 pl-3">
              Why: MRR is delayed. "Contextual Replies Sent" is the immediate atomic unit of value. If this number compounds, churn tends to zero and MRR follows automatically.
            </p>
          </div>
        </section>

        {/* Section 9: Highest ROI */}
        <section className="bg-amber-950/20 border border-amber-900/50 rounded-xl p-6">
          <h2 className="text-sm font-bold text-amber-500 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <Target className="w-4 h-4" />
            9. Single Highest ROI Action
          </h2>
          <div className="flex items-start gap-4 h-full">
            <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center shrink-0">
               <Rocket className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-200">Native CRM Bi-Directional Sync</h3>
              <p className="text-sm text-slate-400 mt-2">
                Removing double-data entry friction for early adopters is the single most critical unlock for activating larger sales teams and converting trials into self-serve annual contracts.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Section 2: Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              2. Weekly Founder Dashboard
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Core Revenue</span>
                <span className="block text-2xl font-bold text-emerald-400 mt-1">$____</span>
                <span className="block text-xs text-slate-400 mt-1">MRR</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Customer Base</span>
                <span className="block text-2xl font-bold text-blue-400 mt-1">___</span>
                <span className="block text-xs text-slate-400 mt-1">Active Accounts</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Platform Health</span>
                <span className="block text-2xl font-bold text-rose-400 mt-1">___%</span>
                <span className="block text-xs text-slate-400 mt-1">Churn Rate</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Top of Funnel</span>
                <span className="block text-2xl font-bold text-indigo-400 mt-1">___</span>
                <span className="block text-xs text-slate-400 mt-1">Demos Booked</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Activation</span>
                <span className="block text-2xl font-bold text-purple-400 mt-1">___%</span>
                <span className="block text-xs text-slate-400 mt-1">Trial to Paid</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Product Usage</span>
                <span className="block text-2xl font-bold text-amber-400 mt-1">___</span>
                <span className="block text-xs text-slate-400 mt-1">AI Uses / Wk</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 sm:col-span-2">
                <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Health Score</span>
                <span className="block text-2xl font-bold text-white mt-1">___ / 100</span>
                <span className="block text-xs text-slate-400 mt-1">Composite DAU/MAU + Sentiment</span>
              </div>
            </div>
          </section>

          {/* Section 4: Customer Success */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              4. Customer Success Framework
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-800 rounded p-4 bg-slate-900/50">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">1. Onboarding</h3>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4 marker:text-slate-600">
                  <li>White-glove data ingestion setup.</li>
                  <li>Drafting the first 5 prompts together.</li>
                  <li>Connecting the inbox via OAuth.</li>
                </ul>
              </div>
              <div className="border border-slate-800 rounded p-4 bg-slate-900/50">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">2. Activation (Aha!)</h3>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4 marker:text-emerald-900">
                  <li>First AI-drafted reply approved.</li>
                  <li>First meeting booked via EffectiveBuzz.</li>
                  <li>Time-to-1st-value &lt; 24 hours.</li>
                </ul>
              </div>
              <div className="border border-slate-800 rounded p-4 bg-slate-900/50">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">3. Retention</h3>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4 marker:text-blue-900">
                  <li>Monthly QBR on reply rates.</li>
                  <li>Automated trigger for "Ghost" accounts (0 logins in 5 days).</li>
                  <li>Priority routing for support tickets.</li>
                </ul>
              </div>
              <div className="border border-slate-800 rounded p-4 bg-slate-900/50">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">4. Expansion</h3>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4 marker:text-indigo-900">
                  <li>Upselling Team Seats to SDR managers.</li>
                  <li>Unlocking API / Advanced Data Syncs for Enterprise.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: 90-Day Plan */}
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Calendar className="w-4 h-4 text-violet-400" />
              6. 90-Day Execution Plan
            </h2>
            <div className="space-y-4">
              <div className="bg-[#0b101b] p-4 rounded-lg border border-slate-800">
                <h3 className="text-xs font-bold font-mono text-violet-400 uppercase">Month 1: The "10 Logo" Baseline</h3>
                <ul className="text-xs text-slate-300 mt-2 space-y-1 pl-4 list-disc marker:text-slate-600">
                  <li>Execute Dogfooding Playbook to manually recruit 10 paying customers.</li>
                  <li>Nail the white-glove onboarding script.</li>
                  <li>Validate willingness-to-pay at $49/mo threshold.</li>
                </ul>
              </div>
              <div className="bg-[#0b101b] p-4 rounded-lg border border-slate-800">
                <h3 className="text-xs font-bold font-mono text-violet-400 uppercase">Month 2: Friction Eradication</h3>
                <ul className="text-xs text-slate-300 mt-2 space-y-1 pl-4 list-disc marker:text-slate-600">
                  <li>Deploy Native CRM Sync based on M1 feedback.</li>
                  <li>Convert 10 logos into measurable Case Studies.</li>
                  <li>Transition from founder-led outbound to automated sequence loops.</li>
                </ul>
              </div>
              <div className="bg-[#0b101b] p-4 rounded-lg border border-slate-800">
                <h3 className="text-xs font-bold font-mono text-violet-400 uppercase">Month 3: Velocity & Expansion</h3>
                <ul className="text-xs text-slate-300 mt-2 space-y-1 pl-4 list-disc marker:text-slate-600">
                  <li>Introduce $99/mo Multi-Seat "SDR Team" tier based on initial wins.</li>
                  <li>Activate Referral program for early customers.</li>
                  <li>Push towards the 100-customer milestone via case study distribution.</li>
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Frameworks & Risks */}
        <div className="space-y-6">

          {/* Section 3: Growth Loops */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <RefreshCcw className="w-4 h-4 text-emerald-400" />
              3. Growth Loops
            </h2>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Referral Loop</span>
                <p className="text-xs text-slate-300 mt-1">"Viral" signature: "<em>Drafted contextually via EffectiveBuzz</em>". Highly activated SDRs naturally share high reply rates with other SDRs.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Product Loop</span>
                <p className="text-xs text-slate-300 mt-1">More replies sent → Better success data logged → Tighter prompt optimizations → Higher future reply rates.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Success Loop</span>
                <p className="text-xs text-slate-300 mt-1">High NPS survey → Automated trigger to write G2 review or share case study → Generates inbound validated leads.</p>
              </div>
            </div>
          </section>

          {/* Section 5: Prioritization */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <ListOrdered className="w-4 h-4 text-amber-400" />
              5. Eng Priority Matrix
            </h2>
            <div className="space-y-2">
              <div className="bg-slate-900 border border-slate-800 p-2 rounded flex justify-between items-center">
                <span className="text-xs text-slate-300 font-bold">1. Revenue Impact</span>
                <span className="text-xs font-mono text-emerald-500 font-bold">10x</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2 rounded flex justify-between items-center">
                <span className="text-xs text-slate-300 font-bold">2. Customer Impact</span>
                <span className="text-xs font-mono text-blue-500 font-bold">5x</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2 rounded flex justify-between items-center">
                <span className="text-xs text-slate-300 font-bold">3. Eng Effort</span>
                <span className="text-xs font-mono text-rose-500 font-bold">-1x</span>
              </div>
              <p className="text-[10px] text-slate-500 italic mt-2">
                Rule: If it doesn't demonstrably increase MRR or unblock a churn risk, it stays in the backlog.
              </p>
            </div>
          </section>

          {/* Sections 7 & 8: Risks & Opportunities */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <div className="space-y-6">
              
              {/* Risks */}
              <div>
                 <h2 className="text-sm font-bold text-rose-400 mb-3 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-2">
                  <ShieldAlert className="w-4 h-4" />
                  7. Top 10 Risks
                </h2>
                <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4 marker:text-rose-500/50">
                  <li>API Rate limits blocking scale.</li>
                  <li>CRM fragmentation (Salesforce vs HubSpot).</li>
                  <li>"AI Slop" fatigue from prospects.</li>
                  <li>Platform dependency (OAuth lockouts).</li>
                  <li>Competitor cloning core workflow.</li>
                  <li>Spam filter algorithm updates.</li>
                  <li>Early churn due to manual sync friction.</li>
                  <li>SDR resistance to workflow changes.</li>
                  <li>Underpricing for enterprise support.</li>
                  <li>Token cost inflation crushing margins.</li>
                </ul>
              </div>

              {/* Opps */}
              <div>
                 <h2 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-2">
                  <Lightbulb className="w-4 h-4" />
                  8. Top 10 Opportunities
                </h2>
                <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4 marker:text-emerald-500/50">
                  <li>Enterprise team rollouts (Land & Expand).</li>
                  <li>Self-serve signups via product-led growth.</li>
                  <li>Integrations marketplace (Apollo, Lemlist).</li>
                  <li>Agency/Consultant reseller partnerships.</li>
                  <li>Automated objection-handling replies.</li>
                  <li>LinkedIn Voice/Social expansion.</li>
                  <li>Vertical-specific prompt libraries.</li>
                  <li>Premium "Done-for-you" setup fees.</li>
                  <li>Aggregating industry-wide reply analytics.</li>
                  <li>Raising prices once ROI is provable.</li>
                </ul>
              </div>

            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
