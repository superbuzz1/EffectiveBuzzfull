import React from 'react';
import { 
  Users, DollarSign, Rocket, CheckCircle2, 
  XCircle, AlertTriangle, Activity, Server,
  Lock, RefreshCw
} from 'lucide-react';

export default function CurrentBusinessStatus() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Activity className="w-4 h-4" />
            Live Telemetry
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Current Business Status
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-2xl leading-relaxed">
            The unvarnished, reality-based snapshot of where EffectiveBuzz currently stands in its lifecycle.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg shrink-0">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-mono text-slate-300">Live Snapshot</span>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase">Current Users</span>
          </div>
          <div className="text-2xl font-black text-white">~12</div>
          <div className="text-xs text-slate-500 mt-1">Active Beta Testers</div>
        </div>
        
        <div className="bg-[#0b101b] border border-emerald-900/30 rounded-xl p-5 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase">Paying Customers</span>
          </div>
          <div className="text-2xl font-black text-emerald-400">1</div>
          <div className="text-xs text-slate-500 mt-1">First validation secured</div>
        </div>

        <div className="bg-[#0b101b] border border-emerald-900/30 rounded-xl p-5 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase">Current MRR</span>
          </div>
          <div className="text-2xl font-black text-emerald-400">$49</div>
          <div className="text-xs text-slate-500 mt-1">Initial Charter Tier</div>
        </div>

        <div className="bg-[#0b101b] border border-blue-900/30 rounded-xl p-5">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Server className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase">Deployment</span>
          </div>
          <div className="text-lg font-bold text-blue-400 mt-1 pb-1">Production</div>
          <div className="text-xs text-slate-500 mt-1">Live, basic MVP infrastructure</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Working & Missing Features */}
        <div className="space-y-6">
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <CheckCircle2 className="w-4 h-4" />
              Working Features
            </h2>
            <ul className="text-sm text-slate-300 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span><strong>Core AI Generation:</strong> Contextual prompt engine converting data into tailored replies.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span><strong>Auth & Accounts:</strong> Secure user login and basic session management.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span><strong>Payment Gateway:</strong> Stripe integration for capturing the first subscription.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span><strong>Web App Dashboard:</strong> Central UI for generating and copying drafts.</span>
              </li>
            </ul>
          </section>

          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-rose-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <XCircle className="w-4 h-4" />
              Missing Features (Critical Path)
            </h2>
            <ul className="text-sm text-slate-300 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-0.5">•</span>
                <span><strong>Chrome Extension:</strong> Absolute necessity to prevent context-switching away from Gmail/LinkedIn.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-0.5">•</span>
                <span><strong>Native CRM Sync:</strong> Missing bi-directional sync (Salesforce/HubSpot) causes double-data entry.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-0.5">•</span>
                <span><strong>Automated Context Scraping:</strong> Users currently have to paste prospect data manually in some cases.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-0.5">•</span>
                <span><strong>Team Workspaces:</strong> Required to sell to SDR managers instead of individual reps.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Blockers & Next Action */}
        <div className="space-y-6">
          <section className="bg-orange-950/20 border border-orange-900/50 rounded-xl p-6">
            <h2 className="text-sm font-bold text-orange-500 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-orange-900/50 pb-3">
              <AlertTriangle className="w-4 h-4" />
              Current Blockers
            </h2>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-bold text-slate-200">1. Workflow Friction</span>
                <p className="text-xs text-slate-400 mt-1">SDRs live in their inbox. Forcing them to open a separate EffectiveBuzz tab to generate a reply drastically reduces daily active usage.</p>
              </div>
              <div>
                <span className="text-sm font-bold text-slate-200">2. Manual Data Entry</span>
                <p className="text-xs text-slate-400 mt-1">Without CRM sync, if a user sends an email via EffectiveBuzz, they have to manually log it in Salesforce. This is a dealbreaker for scale.</p>
              </div>
              <div>
                <span className="text-sm font-bold text-slate-200">3. Distribution Model</span>
                <p className="text-xs text-slate-400 mt-1">Relying on founder-led 1:1 outbound limits velocity. We need a repeatable sequence and case studies to transition to automated acquisition.</p>
              </div>
            </div>
          </section>

          <section className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-6 text-center">
            <Rocket className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <h2 className="text-sm font-bold text-emerald-400 uppercase font-mono tracking-wider mb-2">Immediate Focus</h2>
            <p className="text-lg font-bold text-white mb-2">Build the Chrome Extension</p>
            <p className="text-xs text-emerald-200/70">
              Bring the AI directly into the user's inbox to solve Blocker #1 and unlock sticky daily retention.
            </p>
          </section>
        </div>

      </div>

    </div>
  );
}
