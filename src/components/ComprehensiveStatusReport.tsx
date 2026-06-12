import React from 'react';
import { 
  Activity, AlertTriangle, Lightbulb, PauseCircle, 
  Target, Zap, Calendar, Database, CheckCircle2, 
  XCircle, Server, FileCode2, Terminal, Briefcase
} from 'lucide-react';

export default function ComprehensiveStatusReport() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Activity className="w-4 h-4" />
            Global State Assessment
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Comprehensive Status Report
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            A brutal, reality-based evaluation of EffectiveBuzz. Filtering out visionary roadmaps to focus strictly on the immediate constraints blocking the path to $1,000 MRR.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 px-6 py-4 rounded-xl shrink-0">
          <div>
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Maturity Level
            </div>
            <div className="text-xl font-black text-white">Closed Beta / V1</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: The Reality Data (Inputs) */}
        <div className="lg:col-span-4 space-y-6">
          
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-5 shadow-lg">
            <h2 className="text-xs font-bold text-slate-300 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-2">
              <Server className="w-3.5 h-3.5" /> Current Telemetry
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-slate-900 px-3 py-2 rounded">
                <span className="text-xs text-slate-400">Current Users</span>
                <span className="text-sm font-bold text-white">~12</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900 px-3 py-2 rounded">
                <span className="text-xs text-slate-400">Paying Customers</span>
                <span className="text-sm font-bold text-emerald-400">1</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900 px-3 py-2 rounded">
                <span className="text-xs text-slate-400">Current MRR</span>
                <span className="text-sm font-bold text-emerald-400">$49</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900 px-3 py-2 rounded">
                <span className="text-xs text-slate-400">Deployment</span>
                <span className="text-sm font-bold text-blue-400">Production</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900 px-3 py-2 rounded">
                <span className="text-xs text-slate-400">Team Size</span>
                <span className="text-sm font-bold text-white">Founding Team</span>
              </div>
            </div>
          </section>

          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-5 shadow-lg">
             <h2 className="text-xs font-bold text-slate-300 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> State of Product
            </h2>
            <div className="space-y-4">
              <div>
                <span className="block text-[10px] font-mono text-emerald-500 uppercase mb-1">Working</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Dashboard UI', 'AI Prompts', 'Auth', 'Billing (Stripe)', 'Marketing UI'].map(tag => (
                    <span key={tag} className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">{tag}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-rose-500 uppercase mb-1">Missing / Incomplete</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Chrome Extension', 'Native CRM Sync', 'Inbox Injection', 'Reliable Scraping Worker'].map(tag => (
                    <span key={tag} className="text-[10px] bg-rose-500/10 text-rose-400 px-2 py-1 rounded border border-rose-500/20">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-orange-950/20 border border-orange-900/50 rounded-xl p-5 shadow-lg">
            <h2 className="text-xs font-bold text-orange-400 mb-3 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-orange-900/50 pb-2">
              <PauseCircle className="w-3.5 h-3.5" /> 4. Unnecessary Work
            </h2>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 marker:text-orange-900">
              <li>Building standalone inbox UI features.</li>
              <li>Advanced analytics and reporting charts.</li>
              <li>Role-based Access Control (RBAC).</li>
              <li>Team workspaces (until single-player is sticky).</li>
              <li>Voice AI integrations.</li>
            </ul>
          </section>
        </div>

        {/* Right Column: Execution & Diagnosic (Outputs) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-5">
              <h2 className="text-xs font-bold text-rose-400 mb-3 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-2">
                <AlertTriangle className="w-3.5 h-3.5" /> 2. Top Blockers
              </h2>
              <ol className="text-xs text-slate-300 space-y-2 list-decimal pl-4 marker:text-rose-500 font-medium">
                <li>UX requires context switching away from Gmail.</li>
                <li>Lack of native HubSpot/Salesforce bi-directional sync.</li>
                <li>Manual copy-pasting of prospect data into the app.</li>
                <li>Unpredictable prompt token latency (&gt; 3 seconds).</li>
                <li>Zero quantified case studies for marketing.</li>
                <li>Outbound distribution relies solely on founder grind.</li>
                <li>OAuth connection stability for automated sending.</li>
                <li>Risk of AI hallucinating embarrassing outreach.</li>
                <li>High cost of acquiring accurate contact data.</li>
                <li>No automated viral loop among SDR teams.</li>
              </ol>
            </section>

            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-5">
               <h2 className="text-xs font-bold text-emerald-400 mb-3 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-2">
                <Lightbulb className="w-3.5 h-3.5" /> 3. Top Opportunities
              </h2>
              <ol className="text-xs text-slate-300 space-y-2 list-decimal pl-4 marker:text-emerald-500 font-medium">
                <li>Browser extension wrapper over Gmail UI.</li>
                <li>Upselling single-users into full SDR team accounts.</li>
                <li>"Drafted by EffectiveBuzz" referral signatures.</li>
                <li>Integrations with Sales Navigator scraping.</li>
                <li>Vertical-specific prompt libraries (e.g., SaaS vs Healthcare).</li>
                <li>Automated objection-handling drafts.</li>
                <li>Partnering with B2B outbound agencies as resellers.</li>
                <li>Shadow-testing AI replies vs Human replies for metrics.</li>
                <li>Pricing based on 'Replies Generated' instead of seats.</li>
                <li>Open-sourcing a basic prompt template strategy.</li>
              </ol>
            </section>
          </div>

          <section className="bg-indigo-950/20 border border-indigo-900/50 rounded-xl overflow-hidden">
            <div className="bg-indigo-900/30 px-5 py-3 border-b border-indigo-900/50">
               <h2 className="text-sm font-bold text-indigo-400 flex items-center gap-2 uppercase font-mono tracking-wider">
                <Calendar className="w-4 h-4" /> 5 & 6. Phased Execution Plans
              </h2>
            </div>
            <div className="p-5 flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative">
                <div className="absolute top-0 right-0 p-2 text-indigo-500/20"><Terminal className="w-12 h-12" /></div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 bg-indigo-500/20 inline-block px-2 py-1 rounded">30-Day Plan (First 10)</h3>
                <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 relative z-10">
                  <li>Build & deploy Gmail Chrome Extension wrapper.</li>
                  <li>Implement basic webhook sync for HubSpot logs.</li>
                  <li>Manually hand-hold 10 active beta users to conversion.</li>
                  <li>Extract 2 hard-data case studies on reply rate lift.</li>
                </ul>
              </div>
              <div className="hidden md:block w-px bg-indigo-900/50"></div>
              <div className="flex-1 relative">
                 <div className="absolute top-0 right-0 p-2 text-indigo-500/20"><Target className="w-12 h-12" /></div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 bg-indigo-500/20 inline-block px-2 py-1 rounded">90-Day Plan ($1k MRR)</h3>
                <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 relative z-10">
                  <li>Launch $99/mo Multi-Seat tier for SDR Teams.</li>
                  <li>Automate Sales Navigator scraping to remove copy-paste.</li>
                  <li>Launch outbound sequences targeting managers of current users.</li>
                  <li>Implement baked-in viral sharing referral mechanics.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <h2 className="text-xs font-bold text-emerald-400 mb-3 flex items-center gap-2 uppercase font-mono tracking-wider">
              <Zap className="w-4 h-4" /> 7. Single Highest ROI Action (Next 14 Days)
            </h2>
            <p className="text-lg font-bold text-white leading-relaxed">
              Build and deploy the Chrome Extension framework.
            </p>
            <p className="text-sm text-emerald-50/80 mt-2">
              If the AI generation flow is not native to the inbox (Gmail/LinkedIn), the friction of context-switching will kill daily active usage. Do not build more dashboard features until the extension is live and driving 10x more usage per user.
            </p>
          </section>

        </div>

      </div>

    </div>
  );
}
