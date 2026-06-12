import React from 'react';
import { 
  Server, ShieldAlert, Activity, Database, Cloud, 
  CheckCircle2, XCircle, AlertTriangle, ArrowRight,
  Terminal, Lock, HardDrive, RefreshCcw, Gauge
} from 'lucide-react';

export default function StagingDeploymentAssessment() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Cloud className="w-4 h-4" />
            DevOps & SRE Assessment
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Staging Deployment Readiness
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Evaluation of infrastructure, containerization, routing, and disaster recovery posture for the EffectiveBuzz staging environment.
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
            <span className="text-4xl font-black text-amber-500 font-mono">62</span>
            <span className="text-lg font-bold text-slate-500">/100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Assessment Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Answer Section */}
          <section className="bg-amber-950/20 border border-amber-900/50 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <h2 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2 uppercase font-mono tracking-wider">
              Executive Determination
            </h2>
            <p className="text-xl font-bold text-white mb-2">
              Can EffectiveBuzz be deployed to staging today?
            </p>
            <div className="flex items-center gap-3 mt-4 bg-[#0b101b] border border-amber-900/50 p-4 rounded-lg">
              <XCircle className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <span className="font-bold text-amber-500 text-lg tracking-wider">NO, NOT YET.</span>
                <p className="text-sm text-slate-300 mt-1">
                  While application code is solid, core infrastructure vectors (Dockerization, Redis, Coolify setup) are missing or undefined. Deploying now would require risky manual server configuration.
                </p>
              </div>
            </div>
          </section>

          {/* Infrastructure Matrix */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50">
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Infrastructure Matrix Review</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><XCircle className="w-4 h-4 text-rose-500" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Docker</h4>
                    <p className="text-xs text-slate-400 mt-1">Dockerfile and docker-compose.yml are entirely missing. Image build stages and node environment configuration are undefined.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><XCircle className="w-4 h-4 text-rose-500" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Coolify / CD</h4>
                    <p className="text-xs text-slate-400 mt-1">No continuous deployment pipelines are configured to bridge GitHub to the target Coolify VPS instance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><XCircle className="w-4 h-4 text-amber-500" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Redis</h4>
                    <p className="text-xs text-slate-400 mt-1">State management for queues (email sending) and rate limiting is not provisioned natively.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">PostgreSQL</h4>
                    <p className="text-xs text-slate-400 mt-1">Schema and pooling are ready. Needs target connection string via Coolify resource provisioning.</p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Domain Routing & SSL</h4>
                    <p className="text-xs text-slate-400 mt-1">Coolify handles Traefik dynamic routing and Let's Encrypt SSL natively once the container is bound.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><XCircle className="w-4 h-4 text-rose-500" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Environment Variables</h4>
                    <p className="text-xs text-slate-400 mt-1">Secrets mapping strategy (.env sync) is not documented for the VPS pipeline.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><XCircle className="w-4 h-4 text-rose-500" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Monitoring & Logging</h4>
                    <p className="text-xs text-slate-400 mt-1">No APM (Datadog/Sentry) is configured. We rely solely on raw stdout tailing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><XCircle className="w-4 h-4 text-rose-500" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Backups</h4>
                    <p className="text-xs text-slate-400 mt-1">Postgres WAL archiving or snapshot backups (pg_dump) are not yet scheduled.</p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Deployment Risks */}
          <section className="bg-rose-950/10 border border-rose-900/30 rounded-xl p-6">
            <h2 className="text-sm font-bold text-rose-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              Deployment Risks
            </h2>
            <div className="space-y-4">
              <div className="bg-[#0b101b] border border-slate-800 p-4 rounded-lg">
                <span className="flex items-center gap-2 font-bold text-rose-400 mb-2">
                  <AlertTriangle className="w-4 h-4" /> No Container Standard
                </span>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Attempting to deploy a raw Node.js process without a defined multi-stage Dockerfile guarantees "it works on my machine" drift. Native dependencies for Prisma/Bcrypt will fail to compile on the target VPS architecture if not isolated.
                </p>
              </div>
              <div className="bg-[#0b101b] border border-slate-800 p-4 rounded-lg">
                <span className="flex items-center gap-2 font-bold text-rose-400 mb-2">
                  <AlertTriangle className="w-4 h-4" /> Missing Disaster Recovery
                </span>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Deploying to staging without an automated PostgreSQL backup volume means a container reset could permanently wipe test data, delaying QA validation cycles.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Checklists & Rollback */}
        <div className="space-y-6">

          {/* Infrastructure Missing list */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-5">
            <h2 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <Server className="w-4 h-4 text-indigo-400" />
              Missing Infrastructure
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <Terminal className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Multi-stage Node.js `Dockerfile`</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <Terminal className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Docker Compose payload (`docker-compose.yml`) linking DB, Redis, and Web.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <Database className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>S3 Bucket configuration for automated PG cron backups.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <Activity className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Sentry DSN for crash reporting.</span>
              </li>
            </ul>
          </section>

          {/* Staging Checklist */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h2 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Staging Checklist
            </h2>
            <div className="space-y-3">
              {[
                { checked: false, label: 'Write production Dockerfile' },
                { checked: false, label: 'Provision Coolify VPS (Ubuntu 22.04)' },
                { checked: false, label: 'Map domain: staging.effectivebuzz.com' },
                { checked: false, label: 'Inject Stripe Test Webhook Secrets' },
                { checked: false, label: 'Inject Gemini API Key securely' },
                { checked: false, label: 'Push via Git Webhook trigger' },
                { checked: false, label: 'Run Prisma Deploy/Migrate script' }
              ].map((item, idx) => (
                <label key={idx} className="flex items-start gap-3 cursor-not-allowed group">
                  <div className="relative flex items-center justify-center w-5 h-5 border border-slate-600 rounded bg-slate-900 mt-0.5">
                    {/* Unchecked state */}
                  </div>
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
            <button className="w-full mt-6 bg-indigo-600/50 text-indigo-300 py-2 rounded border border-indigo-500/30 text-xs font-mono font-bold uppercase tracking-wider cursor-not-allowed">
              Awaiting Engineering
            </button>
          </section>

          {/* Rollback Plan */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-5">
            <h2 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <RefreshCcw className="w-4 h-4 text-slate-500" />
              Rollback Plan
            </h2>
            <ol className="list-decimal pl-4 space-y-2 text-xs text-slate-400 leading-relaxed marker:text-slate-600">
              <li>In Coolify dashboard, select previous successful deployment hash.</li>
              <li>Click 'Redeploy' to hot-swap Traefik routing to the older container.</li>
              <li>If schema corrupted, scale down Web containers.</li>
              <li>Restore PG baseline from automated hourly snapshot.</li>
              <li>Scale Web containers back up.</li>
            </ol>
          </section>

        </div>

      </div>

    </div>
  );
}
