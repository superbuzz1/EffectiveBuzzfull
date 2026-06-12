import React from 'react';
import { 
  Building2, AlertTriangle, Route, 
  DollarSign, PauseCircle, PlayCircle, Code2, 
  TrendingUp, Target, Search, Zap, Activity
} from 'lucide-react';

export default function RealityBasedCTOReview() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Search className="w-4 h-4" />
            Reality-Based Assessment
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            EffectiveBuzz CTO/CRO Review
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Strictly practical evaluation separating future vision from current reality. Identifying the immediate bottlenecks blocking the path to the first 10 customers and $1k MRR.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 px-6 py-4 rounded-xl shrink-0">
          <div>
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Current Stage
            </div>
            <div className="text-xl font-black text-white">Closed Beta / Early Revenue</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 4 & 5: Fastest Paths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section className="bg-indigo-950/20 border border-indigo-900/50 rounded-xl p-6">
              <h2 className="text-sm font-bold text-indigo-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-indigo-900/50 pb-3">
                <Route className="w-4 h-4" />
                4. Path to First Paying Customers
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                <strong>Manual Dogfooding:</strong> Do not build an automated self-serve funnel yet. Scrape 500 ICPs, load them into your own tool, draft highly contextual emails pitching your tool, and get on Zoom calls to manually onboard the first 5 buyers.
              </p>
            </section>

            <section className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-6">
              <h2 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-emerald-900/50 pb-3">
                <DollarSign className="w-4 h-4" />
                5. Path to $1,000 MRR
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                <strong>Sell $99/mo 'SDR Squad' Tiers:</strong> You only need 10 paying teams. Move past single-user accounts immediately. Convert the first few successful individual beta users into team-wide deployments by proving their individual reply rate lift.
              </p>
            </section>
          </div>

          {/* Section 6 & 7: Feature Reality */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-bold text-rose-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
                  <PauseCircle className="w-4 h-4" />
                  6. Features to Delay
                </h2>
                <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 marker:text-rose-900">
                  <li>AI Voice Agents (Distraction, stick to text).</li>
                  <li>Deep Analytics Dashboards (Use Metabase/Mixpanel).</li>
                  <li>Multi-Language Support (Validate English first).</li>
                  <li>Automated Billing Portals (Use Stripe links manually).</li>
                  <li>Role-Based Access Control (RBAC).</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
                  <PlayCircle className="w-4 h-4" />
                  7. Must Build Now
                </h2>
                <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 marker:text-emerald-900">
                  <li>Chrome Extension (to draft replies directly in Gmail/LinkedIn).</li>
                  <li>CRITICAL: Native HubSpot/Salesforce Bi-Directional sync.</li>
                  <li>Prompt Testing Sandbox (for internal use to improve output quality).</li>
                  <li>OAuth Inbox Integration (frictionless sending).</li>
                  <li>Reliable web-scraping microservice for context gathering.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8 & 9: Priorities */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
                  <Code2 className="w-4 h-4" />
                  8. Eng Priorities
                </h2>
                <ol className="text-xs text-slate-300 space-y-2 list-decimal pl-4 marker:text-blue-500 font-medium">
                  <li>Eliminate hallucinations in drafted replies.</li>
                  <li>Reduce text generation latency to &lt; 2 seconds.</li>
                  <li>Stabilize the OAuth email sending connection.</li>
                </ol>
              </div>
              
              <div>
                <h2 className="text-sm font-bold text-violet-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
                  <TrendingUp className="w-4 h-4" />
                  9. Growth Priorities
                </h2>
                <ol className="text-xs text-slate-300 space-y-2 list-decimal pl-4 marker:text-violet-500 font-medium">
                  <li>Secure 3 compelling Case Studies with hard data (Reply Rate %).</li>
                  <li>Execute outbound sequence targeting SDRs using EffectiveBuzz.</li>
                  <li>Locking a distribution partnership with a B2B sales consultant.</li>
                </ol>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Risks & Bottlenecks & ROI */}
        <div className="space-y-6">

          {/* Section 10: Highest ROI Action */}
          <section className="bg-amber-950/20 border border-amber-900/50 rounded-xl p-6 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <h2 className="text-sm font-bold text-amber-500 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-amber-900/50 pb-3">
              <Zap className="w-4 h-4" />
              10. Highest ROI Action (Next 14 Days)
            </h2>
            <p className="text-sm text-slate-200 font-medium leading-relaxed">
              Ship the <strong>Chrome Extension wrapper</strong> and get it locally installed on 10 target ICP computers.
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Forcing SDRs to context-switch to a standalone webapp dashboard will kill retention. EffectiveBuzz must inject itself directly into their existing Gmail/LinkedIn workflow to achieve sticky daily active usage.
            </p>
          </section>

          {/* Section 2: Bottlenecks */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Activity className="w-4 h-4 text-orange-400" />
              2. Top Bottlenecks
            </h2>
            <div className="pl-4 border-l-2 border-orange-500/30 space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-300">1. Workflow Friction</span>
                <p className="text-[10px] text-slate-500 mt-0.5">SDRs won't leave Gmail to use a secondary dashboard.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-300">2. CRM Sync Overhead</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Manual logging of sent emails prevents scaled usage.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-300">3. Trust Deficit</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Users fear AI will send something embarrassing to a lead.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-300">4. Context Gathering Latency</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Slow web scraping breaks the instantaneous magic.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-300">5. Case Study Deficit</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Zero hard data to prove ROI to cautious VPs of Sales.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Risks */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              3. Top Risks
            </h2>
             <div className="pl-4 border-l-2 border-rose-500/30 space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-300">1. Apollo/Outreach Cloning</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Incumbents native-build contextual AI before we get distribution.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-300">2. OpenAI Margin Compression</span>
                <p className="text-[10px] text-slate-500 mt-0.5">API costs scale linearly but pricing is fixed flat-fee.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-300">3. LinkedIn/Google Crackdowns</span>
                <p className="text-[10px] text-slate-500 mt-0.5">API access revoked or strict anti-bot measures enacted.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-300">4. Sales Nav Scraping Changes</span>
                <p className="text-[10px] text-slate-500 mt-0.5">DOM changes break our underlying context-fetching engine.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-300">5. Premature Scaling</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Spending on ads before nailing 60-day cohort retention.</p>
              </div>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
