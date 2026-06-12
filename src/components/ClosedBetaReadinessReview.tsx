import React from 'react';
import { 
  Rocket, ShieldAlert, Target, CheckCircle2, XCircle, 
  AlertTriangle, Users, Mail, Bot, CreditCard, Activity,
  LifeBuoy, CheckSquare, BarChart3, AlertOctagon
} from 'lucide-react';

export default function ClosedBetaReadinessReview() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Rocket className="w-4 h-4" />
            Executive Steering Committee
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Closed Beta Readiness Assessment
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Consolidated Go/No-Go evaluation combining perspectives from Product, Engineering, Security, QA, and Customer Success.
          </p>
        </div>

        {/* Section 1: Readiness Score */}
        <div className="flex items-center gap-6 bg-[#0b101b] border border-slate-800 p-4 rounded-xl shrink-0">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">Metric 01</span>
            <div className="text-sm text-slate-400 font-bold uppercase tracking-wide">Readiness</div>
          </div>
          <div className="w-px h-10 bg-slate-800"></div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-amber-500 font-mono">74</span>
            <span className="text-lg font-bold text-slate-500">/100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Assessment & Issues */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Answer Section */}
          <section className="bg-amber-950/20 border border-amber-900/50 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <h2 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2 uppercase font-mono tracking-wider">
              Executive Determination
            </h2>
            <p className="text-xl font-bold text-white mb-2">
              Can EffectiveBuzz launch Closed Beta today?
            </p>
            <div className="flex items-center gap-3 mt-4 bg-[#0b101b] border border-amber-900/50 p-4 rounded-lg">
              <AlertOctagon className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <span className="font-bold text-amber-500 text-lg tracking-wider">CONDITIONAL NO / HOLD</span>
                <p className="text-sm text-slate-300 mt-1">
                  Core AI and CRM functionalities are solid, but significant gaps in Email Deliverability Infrastructure, Billing verification, and Customer Support channels act as strict blockers for external user onboarding.
                </p>
              </div>
            </div>
          </section>

          {/* Issue Tracker */}
          <div className="bg-[#0b101b] border border-slate-800 rounded-xl overflow-hidden mt-8">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50">
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Discovered Impediments Matrix</h2>
            </div>
            
            <div className="divide-y divide-slate-800/60">
              
              {/* Section 2: Critical Blockers */}
              <div className="p-6 bg-rose-950/10">
                <h3 className="text-[11px] font-bold text-slate-500 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
                  <AlertOctagon className="w-4 h-4 text-rose-500" />
                  <span className="text-slate-600">SEC_02</span>
                  Critical Blockers
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-900 border border-rose-900/40 p-4 rounded-lg flex items-start gap-4">
                    <div className="mt-0.5"><Mail className="w-4 h-4 text-rose-500" /></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Email SMTP Infrastructure Unverified</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        OAuth2 connections for Google Workspace/O365 are configured in code but lack Google Cloud App Verification. Google will flag our app as "Unverified" and block user logins, freezing campaign sending.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-900 border border-rose-900/40 p-4 rounded-lg flex items-start gap-4">
                    <div className="mt-0.5"><CreditCard className="w-4 h-4 text-rose-500" /></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Stripe Webhook Mismatch</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Billing service relies on Stripe webhooks for subscription provisioning, but the webhook endpoint fails signature validation in staging. Paid users will experience immediate service lockouts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: High Priority Issues */}
              <div className="p-6 bg-amber-950/5">
                <h3 className="text-[11px] font-bold text-slate-500 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-600">SEC_03</span>
                  High Priority Issues
                </h3>
                <div className="space-y-3">
                  <div className="bg-[#0d131f] border border-amber-900/40 p-4 rounded-lg flex items-start gap-4">
                    <div className="mt-0.5"><Bot className="w-4 h-4 text-amber-500" /></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">AI Prompt Injection Vulnerability</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Sales AI agents are susceptible to complex prompt injection if users paste manipulated sequences into their lead data. System prompt needs a strict sandboxing layer.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#0d131f] border border-amber-900/40 p-4 rounded-lg flex items-start gap-4">
                    <div className="mt-0.5"><LifeBuoy className="w-4 h-4 text-amber-500" /></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Lack of In-App Support Channels</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Beta users have no formalized way to report bugs or request help. We need a live chat widget (Intercom/Crisp) or a dedicated support ticketing form integrated before onboarding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Medium Priority Issues */}
              <div className="p-6 bg-indigo-950/5">
                <h3 className="text-[11px] font-bold text-slate-500 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-600">SEC_04</span>
                  Medium Priority Issues
                </h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold mt-0.5">•</span>
                    <p><strong>Analytics Resolution:</strong> <span className="text-slate-400">Open tracking pixels occasionally bypass AdBlockers, throwing off engagement metrics by ~5-10%.</span></p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold mt-0.5">•</span>
                    <p><strong>UX Polish:</strong> <span className="text-slate-400">Campaign sequence builder lacks drag-and-drop reordering; users must delete and recreate steps if they make a mistake.</span></p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Checklists & Metrics */}
        <div className="space-y-6">

          {/* Section 5: Beta Launch Checklist */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h2 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-600 text-[10px]">SEC_05</span>
              Beta Launch Checklist
            </h2>
            <div className="space-y-3">
              {[
                { checked: true, label: 'Core CRUD Operations Validated' },
                { checked: true, label: 'Multi-Tenant Isolation Confirmed' },
                { checked: true, label: 'Database Backup Schedule Established' },
                { checked: false, label: 'Google OAuth App Verification Approved' },
                { checked: false, label: 'Stripe Webhooks Passing E2E' },
                { checked: false, label: 'In-App Support Widget Deployed' },
                { checked: false, label: 'Beta Invitation Email Sequence Ready' },
                { checked: false, label: 'Terms of Service & Privacy Policy Live' }
              ].map((item, idx) => (
                <label key={idx} className={`flex items-start gap-3 ${item.checked ? 'opacity-70' : ''}`}>
                  <div className={`relative flex items-center justify-center w-5 h-5 border rounded mt-0.5 shrink-0 ${
                    item.checked 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-500' 
                      : 'bg-slate-900 border-slate-600'
                  }`}>
                    {item.checked && <CheckSquare className="w-3.5 h-3.5" />}
                  </div>
                  <span className={`text-sm ${item.checked ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
            <button className="w-full mt-6 bg-rose-600/20 text-rose-400 py-2 rounded border border-rose-500/30 text-xs font-mono font-bold uppercase tracking-wider cursor-not-allowed">
              Awaiting Blocker Resolution
            </button>
          </section>

          {/* Section 6: Success Metrics */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-5">
            <h2 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span className="text-slate-600 text-[10px]">SEC_06</span>
              Beta Success Metrics
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <div className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest mb-1">Target Engagement</div>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-medium text-slate-300">Daily Active Users (DAU)</span>
                  <span className="text-sm font-bold text-white">&gt; 60%</span>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <div className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest mb-1">Target Conversion</div>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-medium text-slate-300">Free to Paid Conv.</span>
                  <span className="text-sm font-bold text-white">&gt; 12%</span>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <div className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-widest mb-1">System Stability</div>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-medium text-slate-300">API Uptime</span>
                  <span className="text-sm font-bold text-white">99.9%</span>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <div className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest mb-1">Deliverability</div>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-medium text-slate-300">Spam Placement Rate</span>
                  <span className="text-sm font-bold text-white">&lt; 2%</span>
                </div>
              </div>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
