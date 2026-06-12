import React from 'react';
import { 
  ShieldCheck, Activity, Gauge, Users, AlertOctagon, 
  AlertTriangle, Info, TrendingUp, CheckCircle, Flame,
  FileCheck2, ShieldAlert
} from 'lucide-react';

export default function ProductionCodeReviewReport() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <FileCheck2 className="w-4 h-4" />
            Cross-Functional Review Board
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Comprehensive Production Code Review
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Consolidated architectural review combining perspectives from Principal Engineering, Security, DevOps, and QA.
          </p>
        </div>

        {/* Section 1: Code Quality Score */}
        <div className="flex items-center gap-6 bg-[#0b101b] border border-slate-800 p-4 rounded-xl">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">SEC_01</span>
            <div className="text-sm text-slate-400 font-bold uppercase tracking-wide">Quality Score</div>
          </div>
          <div className="w-px h-10 bg-slate-800"></div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white font-mono">88</span>
            <span className="text-lg font-bold text-slate-500">/100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Section 2: Security Review */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
          <h2 className="text-sm font-bold text-rose-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider text-[11px]">
            <span className="text-slate-600">SEC_02</span>
            <ShieldCheck className="w-4 h-4" />
            Security Review
          </h2>
          <div className="space-y-3 text-sm text-slate-300">
            <p><strong>Verdict:</strong> <span className="text-emerald-400 font-medium">Strong Baseline</span></p>
            <ul className="list-disc pl-4 space-y-1 text-slate-400">
              <li>Prisma natively parameterizes all queries, neutralizing SQL injection vectors.</li>
              <li>`gen_random_uuid()` prevents object enumeration attacks on Tenant and User tables.</li>
              <li>Required: Ensure production database connection string enforces `sslmode=verify-full`.</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Performance Review */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
          <h2 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider text-[11px]">
            <span className="text-slate-600">SEC_03</span>
            <Gauge className="w-4 h-4" />
            Performance Review
          </h2>
          <div className="space-y-3 text-sm text-slate-300">
            <p><strong>Verdict:</strong> <span className="text-emerald-400 font-medium">Optimized</span></p>
            <ul className="list-disc pl-4 space-y-1 text-slate-400">
              <li>Connection singleton implementation is flawless and will prevent hot-reload exhaustion.</li>
              <li>Missing `@@index([tenantId])` on User model. Will cause full table scans during intra-tenant user queries as dataset grows.</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Scalability Review */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
          <h2 className="text-sm font-bold text-amber-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider text-[11px]">
            <span className="text-slate-600">SEC_04</span>
            <Activity className="w-4 h-4" />
            Scalability Review
          </h2>
          <div className="space-y-3 text-sm text-slate-300">
            <p><strong>Verdict:</strong> <span className="text-amber-400 font-medium">Needs Attention</span></p>
            <ul className="list-disc pl-4 space-y-1 text-slate-400">
              <li>Raw Postgres connections cap at ~100. If deploying to serverless/Vercel, we will instantly hit connection limits during traffic spikes.</li>
              <li>Must implement PgBouncer or Prisma Accelerate for proper connection pooling in a serverless environment.</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Multi-Tenant Review */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
          <h2 className="text-sm font-bold text-violet-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider text-[11px]">
            <span className="text-slate-600">SEC_05</span>
            <Users className="w-4 h-4" />
            Multi-Tenant Review
          </h2>
          <div className="space-y-3 text-sm text-slate-300">
            <p><strong>Verdict:</strong> <span className="text-emerald-400 font-medium">Logically Sound</span></p>
            <ul className="list-disc pl-4 space-y-1 text-slate-400">
              <li>Explicit FK from User to Tenant via `tenantId` is strictly enforced.</li>
              <li>Cascade delete rule correctly purges siloed data if a workspace is deleted.</li>
              <li>Pending implementation: Application-level middleware to enforce contextual scoping on every API request.</li>
            </ul>
          </div>
        </section>

      </div>

      {/* Sections 6, 7, 8: Issues Matrix */}
      <div className="bg-[#0b101b] border border-slate-800 rounded-xl overflow-hidden mt-8">
        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Issue Tracker Matrix</h2>
        </div>
        
        <div className="divide-y divide-slate-800/60">
          
          {/* Section 6: Critical Issues */}
          <div className="p-6">
            <h3 className="text-[11px] font-bold text-slate-500 mb-3 flex items-center gap-2 uppercase font-mono tracking-wider">
              <span>SEC_06</span>
              <AlertOctagon className="w-4 h-4 text-slate-600" />
              Critical Issues (Blockers)
            </h3>
            <div className="bg-slate-900 border border-slate-800 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-sm text-slate-400 font-medium tracking-wide">ZERO CRITICAL ISSUES IDENTIFIED</p>
              <p className="text-xs text-slate-500 mt-1">Implementation successfully clears core sanity checks.</p>
            </div>
          </div>

          {/* Section 7: High Priority Issues */}
          <div className="p-6 bg-amber-950/5">
            <h3 className="text-[11px] font-bold text-slate-500 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <span>SEC_07</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              High Priority Issues
            </h3>
            <div className="space-y-3">
              <div className="bg-[#0d131f] border border-amber-900/40 p-4 rounded-lg flex items-start gap-4">
                <div className="mt-0.5"><AlertTriangle className="w-4 h-4 text-amber-500" /></div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Missing Foreign Key Index</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    The User model contains relationship `tenantId` but lacks an explicit B-Tree index. This will cause full table scans when looking up users for a specific workspace.
                  </p>
                  <div className="mt-3 bg-slate-950 px-3 py-2 rounded border border-slate-800 font-mono text-[10px] text-amber-300">
                    Fix: Add `@@index([tenantId])` to the User model.
                  </div>
                </div>
              </div>
              
              <div className="bg-[#0d131f] border border-amber-900/40 p-4 rounded-lg flex items-start gap-4">
                <div className="mt-0.5"><AlertTriangle className="w-4 h-4 text-amber-500" /></div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Missing Database Startup Timeout Handler</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    If `DATABASE_URL` is unreachable, `await prisma.$connect()` will hang until default timeout. Node.js process needs a strict timeout wrapper to crash fast and allow orchestrator restarts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8: Medium Priority Issues */}
          <div className="p-6 bg-indigo-950/5">
            <h3 className="text-[11px] font-bold text-slate-500 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <span>SEC_08</span>
              <Info className="w-4 h-4 text-indigo-400" />
              Medium Priority Issues
            </h3>
            <div className="space-y-3 mt-2 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <p><strong>Environment Configuration:</strong> <span className="text-slate-400">The Prisma schema requires `DATABASE_URL` but `.env.example` mapping is missing from the submitted artifacts.</span></p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <p><strong>Logging Sanitization:</strong> <span className="text-slate-400">Development query logging is active, but parameters should be actively redacted in staging to prevent PII leakage to Datadog/CloudWatch.</span></p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Section 9: Recommended Improvements */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider text-[11px]">
            <span className="text-slate-600">SEC_09</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Recommended Improvements
          </h2>
          <div className="space-y-4">
            <div className="bg-[#0b101b] border border-slate-800 p-3 rounded-lg text-sm">
              <span className="block font-bold text-emerald-400 mb-1">Implement Soft Deletion</span>
              <span className="text-slate-400 text-xs leading-relaxed">Relying purely on Cascade Delete is dangerous for revenue-generating records. Consider adding a `deletedAt` timestamp instead of physically removing `Tenant` rows.</span>
            </div>
              <div className="bg-[#0b101b] border border-slate-800 p-3 rounded-lg text-sm">
              <span className="block font-bold text-emerald-400 mb-1">Row Level Security (RLS)</span>
              <span className="text-slate-400 text-xs leading-relaxed">Since Prisma doesn't natively support Postgres RLS, we should implement a Prisma Client extension enforcing `.where(&#123; tenantId: ctx.tenantId &#125;)` implicitly on all queries.</span>
            </div>
          </div>
        </section>

        {/* Section 10: Go / No-Go Recommendation */}
        <section className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div>
            <h2 className="text-sm font-bold text-indigo-300 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider text-[11px]">
              <span className="text-slate-500">SEC_10</span>
              <ShieldAlert className="w-4 h-4" />
              Final Verdict
            </h2>
            <div className="text-sm text-slate-300 leading-relaxed mb-6">
              The foundational schema and persistence layer is structurally sound. Security constraints via UUID and FK enforcement meet enterprise standards.
            </div>
          </div>

          <div className="bg-[#0b101b] border border-indigo-500/50 p-4 rounded-lg flex flex-col items-center justify-center text-center shadow-[0_0_15px_rgba(99,102,241,0.1)]">
            <span className="text-[10px] font-bold text-indigo-400 uppercase font-mono tracking-widest mb-1">Execution Status</span>
            <span className="text-xl font-bold text-white tracking-widest">CONDITIONAL GO</span>
            <span className="text-xs text-slate-400 mt-2 max-w-xs">Proceed to deployment pending the resolution of High Priority items (SEC_07) in the immediate fast-follow commit.</span>
          </div>
        </section>

      </div>

    </div>
  );
}
