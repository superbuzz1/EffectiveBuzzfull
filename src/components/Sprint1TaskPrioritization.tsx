import React from 'react';
import { 
  ShieldAlert, Activity, CheckCircle2, AlertTriangle, PlayCircle, 
  Database, Lock, CreditCard, Sparkles, Layout, Zap, ArrowRight,
  Target, Rocket, Flag, FileWarning
} from 'lucide-react';

export default function Sprint1TaskPrioritization() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Executive Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <Activity className="w-4 h-4" />
          CTO / VP Eng / Product Owner Execution Directive
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight">
          Sprint 1: Task Prioritization & Execution Strategy
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
          Critical execution order derived from cross-functional analysis combining Business Impact, Revenue Impact, Technical Risk, Security Risk, Dependencies, and Time-To-Complete metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Section 1: Recommended Execution Order */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl overflow-hidden p-6 relative group hover:border-slate-700 transition-colors">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-sm">SEC_01</span>
              Recommended Execution Order
            </h2>
            <div className="space-y-1">
              {[
                { n: 1, title: 'Provision PostgreSQL Production DB', time: '1 Day', icon: Database, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                { n: 2, title: 'Configure Next.js/Vite Auth Guard', time: '1 Day', icon: Lock, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                { n: 3, title: 'Implement Zero-Trust RBAC Middleware', time: '2 Days', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-400/10' },
                { n: 4, title: 'Implement Stripe Webhook Listener', time: '2 Days', icon: CreditCard, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                { n: 5, title: 'Integrate Gemini Outbound Agent', time: '4 Days', icon: Sparkles, color: 'text-violet-400', bg: 'bg-violet-400/10' },
                { n: 6, title: 'Design Marketing Landing Page', time: '2 Days', icon: Layout, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-3 border-b border-slate-800/50 last:border-0 hover:bg-slate-900/30 px-2 rounded-lg transition-colors">
                  <div className="text-2xl font-bold font-mono text-slate-700 w-6">{item.n}</div>
                  <div className={`p-2 rounded-md ${item.bg}`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-200">{item.title}</div>
                  </div>
                  <div className="text-xs font-mono text-slate-500">{item.time}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Task Breakdowns */}
          <div className="space-y-6">
            <section className="bg-[#0b101b] border border-amber-900/30 rounded-xl p-6 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Database className="w-24 h-24" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-amber-400 font-mono text-sm">SEC_02: TASK #1</span>
                Provision PostgreSQL Production DB
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed mb-4">
                <strong>Why this must be built first:</strong> Database infrastructure is the absolute bedrock block. Everything—authentication, workspace isolation, user roles, billing tenant IDs, and AI agent memory—requires the underlying schema to exist. Without a reliable production database provisioned via Railway/Supabase with Prisma migrations applied, no other application logic can be safely verified. Technical dependencies demand this resolves first.
              </div>
            </section>

            <section className="bg-[#0b101b] border border-blue-900/30 rounded-xl p-6 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Lock className="w-24 h-24" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-blue-400 font-mono text-sm">SEC_03: TASK #2</span>
                Configure Next.js / Vite Auth Guard
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed mb-4">
                <strong>Why it follows Task #1:</strong> Once the database is ready to store Users, we must secure the perimeter. Implementing JWT route protection ensures that no unauthenticated requests reach the private application space. It establishes identity context, which is mandatory before handling billing webhooks or agent actions.
              </div>
            </section>

            <section className="bg-[#0b101b] border border-rose-900/30 rounded-xl p-6 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldAlert className="w-24 h-24" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-rose-400 font-mono text-sm">SEC_04: TASK #3</span>
                Implement Zero-Trust RBAC Middleware
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed mb-4">
                <strong>Why it follows Task #2:</strong> Authentication proves <em>who</em> you are; Authorization (RBAC) proves <em>what you can do</em>. Building strict tenant isolation ('Admin', 'Owner', 'Member') prevents catastrophic cross-workspace data bleed. We execute this immediately following Auth to lock down security posture before adding revenue and AI engines.
              </div>
            </section>

            <section className="bg-[#0b101b] border border-emerald-900/30 rounded-xl p-6 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CreditCard className="w-24 h-24" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-emerald-400 font-mono text-sm">SEC_05: TASK #4</span>
                Implement Stripe Webhook Listener
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed mb-4">
                <strong>Why it follows Task #3:</strong> With isolated tenant workspaces secured by RBAC, we can now safely listen for revenue. Stripe Webhooks (`invoice.paid`, `checkout.session.completed`) map payments to users. This task guarantees infrastructure is mathematically tied to MRR generation, opening the gate to 'First Dollar'.
              </div>
            </section>

            <section className="bg-[#0b101b] border border-violet-900/30 rounded-xl p-6 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-24 h-24" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-violet-400 font-mono text-sm">SEC_06: TASK #5</span>
                Integrate Gemini Outbound Agent
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed mb-4">
                <strong>Why it follows Task #4:</strong> Once users can pay (Task 4) securely in a locked workspace (Task 3), we deliver the core product value. Building the AI Agent is logically delayed to this position because the agent's function relies heavily on writing to the authorized database and requires billing active status.
              </div>
            </section>

            <section className="bg-[#0b101b] border border-cyan-900/30 rounded-xl p-6 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Layout className="w-24 h-24" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-cyan-400 font-mono text-sm">SEC_07: TASK #6</span>
                Design Marketing Landing Page
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed mb-4">
                <strong>Why it follows Task #5:</strong> The landing page acts as the surface area to capture the market. It is prioritized last because engineering must guarantee the underlying value (the AI, billing, security) is demonstrably sound before investing GTM resources into generating top-of-funnel traffic.
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar / Strategic Assessment */}
        <div className="space-y-6">
          
          <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <Target className="w-4 h-4 text-emerald-400" />
              Path Analysis
            </h2>
            <div className="space-y-4">
              <div className="bg-[#0b101b] p-3 rounded-lg border border-slate-800/80">
                <div className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Path to Closed Beta</div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-xs font-mono text-slate-300">T1</span>
                  <ArrowRight className="w-3 h-3 text-slate-600 mt-1" />
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-xs font-mono text-slate-300">T2</span>
                  <ArrowRight className="w-3 h-3 text-slate-600 mt-1" />
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-xs font-mono text-slate-300">T3</span>
                  <ArrowRight className="w-3 h-3 text-slate-600 mt-1" />
                  <span className="px-1.5 py-0.5 rounded bg-violet-900/30 border border-violet-800 text-xs font-mono text-violet-300">T5 (AI)</span>
                </div>
              </div>
              <div className="bg-[#0b101b] p-3 rounded-lg border border-slate-800/80">
                <div className="text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Path to First Customer / $1K MRR</div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-xs font-mono text-slate-300">Beta Path</span>
                  <ArrowRight className="w-3 h-3 text-slate-600 mt-1" />
                  <span className="px-1.5 py-0.5 rounded bg-emerald-900/30 border border-emerald-800 text-xs font-mono text-emerald-300">T4 (Billing)</span>
                  <ArrowRight className="w-3 h-3 text-slate-600 mt-1" />
                  <span className="px-1.5 py-0.5 rounded bg-cyan-900/30 border border-cyan-800 text-xs font-mono text-cyan-300">T6 (GTM)</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-rose-950/20 border border-rose-900/50 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <FileWarning className="w-4 h-4 text-rose-400" />
              Highest Risk Items
            </h2>
            <ul className="space-y-3">
              <li className="text-sm text-slate-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong className="text-rose-300">Gemini Agent Prompting (T5):</strong> High hallucination risk. Output testing loops will dominate timeline.</span>
              </li>
              <li className="text-sm text-slate-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span><strong className="text-amber-300">RBAC Leaks (T3):</strong> Severe enterprise data liability if zero-trust architecture fails across workspaces.</span>
              </li>
            </ul>
          </section>

          <section className="bg-indigo-950/30 border border-indigo-500/50 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
            <h2 className="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-2 uppercase font-mono tracking-wider">
              <Flag className="w-4 h-4" />
              Final Recommendation
            </h2>
            <div className="text-sm text-slate-300 mb-4">
              Single task that must be implemented next without exception:
            </div>
            <div className="bg-slate-950 border border-indigo-500/50 p-4 rounded-lg text-center">
              <div className="text-xs text-indigo-400 font-mono font-bold uppercase tracking-widest mb-1">Task 1</div>
              <div className="text-lg font-bold text-white">Provision PostgreSQL Production DB</div>
            </div>
            <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 py-2.5 rounded-lg text-sm font-bold font-mono tracking-wider transition-all flex items-center justify-center gap-2">
              <PlayCircle className="w-4 h-4" />
              Initialize Execution
            </button>
          </section>

        </div>
      </div>
    </div>
  );
}
