import React from 'react';
import { 
  Server, Database, Cloud, Terminal, 
  Settings, Lock, Activity, FileText, RefreshCcw, 
  CheckCircle, ShieldCheck, ListChecks, CheckSquare, HardDrive
} from 'lucide-react';

export default function StagingDeploymentRunbook() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <Terminal className="w-4 h-4" />
          DevOps & SRE Master Runbook
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight">
          Staging Deployment Execution
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
          Comprehensive execution runbook to deploy EffectiveBuzz to the staging environment utilizing Coolify, Docker, PostgreSQL, Redis, and Cloudflare.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* SECTION 1: Infrastructure Checklist */}
        <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <ListChecks className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-600 text-[10px]">SEC_01</span>
            Infrastructure Checklist
          </h2>
          <ul className="space-y-2 text-sm text-slate-300">
             <li className="flex items-start gap-2"><CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Target VPS provisioned (Ubuntu 22.04 LTS).</span></li>
             <li className="flex items-start gap-2"><CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Coolify V4 Engine installed and secured.</span></li>
             <li className="flex items-start gap-2"><CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Cloudflare DNS proxy configured for target IPs.</span></li>
             <li className="flex items-start gap-2"><CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Dedicated Staging Cloud SQL / Railway PG instance active.</span></li>
             <li className="flex items-start gap-2"><CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Redis instance active for session & queue management.</span></li>
          </ul>
        </section>

        {/* SECTION 2: Environment Variables */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <Lock className="w-4 h-4 text-amber-400" />
            <span className="text-slate-600 text-[10px]">SEC_02</span>
            Environment Variables
          </h2>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-400 space-y-1 overflow-x-auto">
            <div><span className="text-indigo-400">NODE_ENV</span>=staging</div>
            <div><span className="text-indigo-400">DATABASE_URL</span>="postgresql://user:pass@host:5432/staging?sslmode=verify-full"</div>
            <div><span className="text-indigo-400">REDIS_URL</span>="rediss://default:pass@host:6379"</div>
            <div><span className="text-indigo-400">STRIPE_SECRET_KEY</span>="sk_test_..."</div>
            <div><span className="text-indigo-400">STRIPE_WEBHOOK_SECRET</span>="whsec_..."</div>
            <div><span className="text-indigo-400">GEMINI_API_KEY</span>="AIza..."</div>
            <div><span className="text-indigo-400">JWT_SECRET</span>="[SECURE_GENERATED_STRING]"</div>
            <div><span className="text-indigo-400">CORS_ORIGIN</span>="https://staging.effectivebuzz.com"</div>
          </div>
        </section>

        {/* SECTION 3: Database Migration Plan */}
        <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <Database className="w-4 h-4 text-blue-400" />
            <span className="text-slate-600 text-[10px]">SEC_03</span>
            Database Migration Plan
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-300">
            <li>Take pre-deployment snapshot of the staging database.</li>
            <li>Run <code className="text-indigo-300 bg-indigo-500/10 px-1 rounded">npx prisma migrate deploy</code> within the CI/CD deployment pipeline before traffic cutover.</li>
            <li>Verify structural alignment using a sanity check query on new tables (e.g., Tenant, User).</li>
            <li>If migration fails, pipeline aborts automatically.</li>
          </ol>
        </section>

        {/* SECTION 4: Redis Configuration */}
        <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <Server className="w-4 h-4 text-rose-400" />
            <span className="text-slate-600 text-[10px]">SEC_04</span>
            Redis Configuration
          </h2>
          <div className="space-y-3 text-sm text-slate-300">
            <p>Dedicated Redis instance for BullMQ queues and rate-limiting.</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Max Memory:</strong> 2GB limit.</li>
              <li><strong>Eviction Policy:</strong> <code className="text-rose-300">allkeys-lru</code> (remove least recently used keys when memory is full).</li>
              <li><strong>Persistence:</strong> Disabled (AOF/RDB off) as staging queues are considered ephemeral.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 5: Docker Deployment Plan */}
        <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <Cloud className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-600 text-[10px]">SEC_05</span>
            Docker Deployment Plan
          </h2>
          <div className="space-y-2 text-sm text-slate-300">
            <p>Utilize a Multi-Stage Dockerfile based on <code className="text-cyan-300">node:20-alpine</code>.</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Stage 1 (Deps):</strong> Install all dependencies.</li>
              <li><strong>Stage 2 (Builder):</strong> Generate Prisma client, compile TypeScript via tsc/esbuild.</li>
              <li><strong>Stage 3 (Runner):</strong> Copy <code className="text-slate-300">dist/</code> and Prod node_modules. Expose port 3000. Start process using dumb-init.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 6: Coolify Configuration */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <Settings className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-600 text-[10px]">SEC_06</span>
            Coolify Configuration
          </h2>
          <div className="space-y-3 text-sm text-slate-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>Map repository <code className="text-indigo-300">EffectiveBuzz/core</code> to the project resource.</li>
              <li>Set Build Pack to strictly 'Docker'.</li>
              <li>Define Custom Domains:
                <div className="text-xs font-mono mt-1 text-slate-400">
                  - staging.effectivebuzz.com<br/>
                  - staging-app.effectivebuzz.com<br/>
                  - staging-api.effectivebuzz.com
                </div>
              </li>
              <li>Enable 'Pull Request Deployments' for ephemeral staging environments.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 7: SSL Configuration */}
        <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-600 text-[10px]">SEC_07</span>
            SSL Configuration
          </h2>
          <div className="space-y-2 text-sm text-slate-300">
            <p>End-to-end encryption strategy:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
               <li><strong>Edge (Cloudflare):</strong> SSL/TLS encryption mode set to <span className="text-emerald-400 font-bold">Strict</span>.</li>
               <li><strong>Origin (Coolify):</strong> Traefik dynamic configuration automatically provisions Let's Encrypt certificates per domain.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 8: Monitoring Setup */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <Activity className="w-4 h-4 text-violet-400" />
            <span className="text-slate-600 text-[10px]">SEC_08</span>
            Monitoring Setup
          </h2>
          <div className="space-y-2 text-sm text-slate-300">
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Uptime checks via BetterUptime pinging <code className="text-violet-300">/api/health</code> every 1m.</li>
              <li>Coolify native resource monitoring (CPU, RAM, Network I/O) enabled.</li>
              <li>Datadog APM Agent included in the Docker runner stage for endpoint latency tracking.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 9: Logging Setup */}
        <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="text-slate-600 text-[10px]">SEC_09</span>
            Logging Setup
          </h2>
          <div className="space-y-2 text-sm text-slate-300">
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Application outputs structured JSON logs to <code className="text-amber-300">stdout/stderr</code>.</li>
              <li>Docker daemon captures logs natively, accessible via Coolify UI.</li>
              <li>Vector agent deployed alongside Coolify to ship container logs to Datadog/CloudWatch securely.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 10: Backup Verification */}
        <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <HardDrive className="w-4 h-4 text-blue-400" />
            <span className="text-slate-600 text-[10px]">SEC_10</span>
            Backup Verification
          </h2>
          <div className="space-y-2 text-sm text-slate-300">
            <p>Before any cutover:</p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-400">
               <li>Execute manual <code className="text-blue-300">pg_dump</code> on the staging cluster.</li>
               <li>Encrypt and sync dump to S3 integration buffer.</li>
               <li>Verify file integrity.</li>
            </ol>
          </div>
        </section>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* SECTION 11: Deployment Validation Tests */}
        <section className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-6">
          <h2 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <CheckCircle className="w-4 h-4" />
            <span className="text-emerald-700 text-[10px]">SEC_11</span>
            Deployment Validation
          </h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2"><CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <span>End-to-End: Sign up and create new Workspace.</span></li>
            <li className="flex items-start gap-2"><CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <span>End-to-End: Trigger Stripe Test Webhook.</span></li>
            <li className="flex items-start gap-2"><CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Feature Validation: Dispatch sample AI Gemini generation task.</span></li>
            <li className="flex items-start gap-2"><CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Security validation: Force CORS violation request from external domain.</span></li>
          </ul>
        </section>

        {/* SECTION 12: Rollback Procedure */}
        <section className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-6">
          <h2 className="text-sm font-bold text-rose-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <RefreshCcw className="w-4 h-4" />
            <span className="text-rose-700 text-[10px]">SEC_12</span>
            Rollback Procedure
          </h2>
          <div className="space-y-3 text-sm text-slate-300">
            <p>If post-deployment validation fails:</p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-400">
               <li>Navigate to Coolify Dashboard &rarr; Project &rarr; Deployments.</li>
               <li>Select the immediately preceding healthy deployment hash.</li>
               <li>Click <strong>Redeploy</strong> to hot-swap Traefik routing instantly.</li>
               <li>If the database schema was critically corrupted, initiate PG snapshot restore protocol.</li>
            </ol>
          </div>
        </section>
      </div>

    </div>
  );
}
