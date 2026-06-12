import React from 'react';
import { 
  Database, Shield, Server, Layout, CheckCircle, Flame, RefreshCcw, 
  Layers, HardDrive, Cpu, Terminal, Key, Activity, Code
} from 'lucide-react';

export default function Sprint1Task1Spec() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Visual Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <Database className="w-4 h-4" />
          Technical Design Document (TDD)
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight">
          Task #1: Provision PostgreSQL Production DB Specification
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
          Robust implementation spec for spinning up the production database layer, verifying schema isolation primitives, and establishing database persistence connection pools.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core Sections */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SECTION 1: Architecture Changes */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              1. Architecture Changes
            </h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                Introduce a centralized data persistence tier decoupled from the stateless server app logic. 
                Configure a production-grade <strong>PostgreSQL instance</strong> (v15/v16) acting as the ultimate system of record.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Introduce an ORM mapping abstraction layer (Prisma/Drizzle) supporting strong-typing.</li>
                <li>Implement a secure backend pooling mechanism (using `pg-pool` or serverless DB connection limits) to prevent connection leaks under burst user behavior.</li>
                <li>Inject database secrets natively via secure server environment variables, totally inaccessible from browser space.</li>
              </ul>
            </div>
          </section>

          {/* SECTION 2: Database Changes */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-amber-500" />
              2. Database Changes
            </h2>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>Definition of our Core Entity Schema Models targeting early Tenant and User isolation:</p>
              
              <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950 font-mono text-xs p-4">
                <span className="text-amber-400">// Core Tenant / Workspace Schema</span><br />
                <span className="text-purple-400">table</span> Tenant &#123;<br />
                &nbsp;&nbsp;id: <span className="text-indigo-400">UUID</span> (Primary Key, default: gen_random_uuid())<br />
                &nbsp;&nbsp;name: <span className="text-emerald-400">VARCHAR(255)</span><br />
                &nbsp;&nbsp;stripeCustomerId: <span className="text-emerald-400">VARCHAR(255)</span> (Unique, Optional)<br />
                &nbsp;&nbsp;createdAt: <span className="text-indigo-400">TIMESTAMP</span> (default: now())<br />
                &#125;
              </div>

              <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950 font-mono text-xs p-4">
                <span className="text-amber-400">// Core User Identity Schema</span><br />
                <span className="text-purple-400">table</span> User &#123;<br />
                &nbsp;&nbsp;id: <span className="text-indigo-400">UUID</span> (Primary Key, default: gen_random_uuid())<br />
                &nbsp;&nbsp;email: <span className="text-emerald-400">VARCHAR(255)</span> (Unique, Index)<br />
                &nbsp;&nbsp;passwordHash: <span className="text-emerald-400">VARCHAR(255)</span><br />
                &nbsp;&nbsp;tenantId: <span className="text-indigo-400">UUID</span> (Foreign Key matching Tenant.id)<br />
                &nbsp;&nbsp;role: <span className="text-emerald-400">VARCHAR(50)</span> (values: 'owner', 'admin', 'member')<br />
                &nbsp;&nbsp;createdAt: <span className="text-indigo-400">TIMESTAMP</span> (default: now())<br />
                &#125;<br />
                <span className="text-amber-400">// Indicies: CREATE INDEX idx_user_email ON User(email);</span>
              </div>
            </div>
          </section>

          {/* SECTION 3: API Changes */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              3. API Changes
            </h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>Addition of server health parameters returning operational status of database connection:</p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs space-y-1">
                <div><span className="text-emerald-400 font-bold">GET</span> /api/health</div>
                <div className="text-slate-500">// Sample response payload format:</div>
                <div className="text-slate-300">&#123;</div>
                <div className="text-slate-300">&nbsp;&nbsp;"status": "ok",</div>
                <div className="text-slate-300">&nbsp;&nbsp;"database": "connected",</div>
                <div className="text-slate-300">&nbsp;&nbsp;"poolActiveConnections": 3</div>
                <div className="text-slate-300">&#125;</div>
              </div>
            </div>
          </section>

          {/* SECTION 4: Backend Changes */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              4. Backend Changes
            </h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Initialization module:</strong> Instantiate a secure database connection module resolving `DATABASE_URL` via environment. Check connectivity on module launch and crash gracefully with context logs if unavailable.</li>
                <li><strong>DB Migration Scripts:</strong> Configure automated migrations directory (e.g. `/prisma/migrations`) executing structural changes as atomic transactions.</li>
              </ul>
            </div>
          </section>

          {/* SECTION 5: Frontend Changes */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Layout className="w-5 h-5 text-blue-400" />
              5. Frontend Changes
            </h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                Incorporate dynamic infrastructure health signals into the Status Monitoring Dashboard. 
                Alert the engineering team immediately within the admin visual overlay if the system-of-record metrics drop or database transactions fail latency checks.
              </p>
            </div>
          </section>

          {/* SECTION 6: Security Requirements */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-rose-400" />
              6. Security Requirements
            </h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Encryption Transit:</strong> All SQL client connections must force SSL mode (`?sslmode=require`).</li>
                <li><strong>Secret Isolation:</strong> Do not prefix secret variables with `VITE_`; secure credentials must remain exclusively server-side.</li>
                <li><strong>Input Sanitization:</strong> Always parameterize SQL queries using ORM methods or explicit values mapping to prevent SQL injection vulnerabilities.</li>
              </ul>
            </div>
          </section>

        </div>

        {/* Sidebar / Additional Operational Details */}
        <div className="space-y-6">

          {/* SECTION 7: Testing Requirements */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <Activity className="w-4 h-4 text-emerald-400" />
              7. Testing Requirements
            </h2>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Verify database client initializes without error using a valid connection string.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Run transactional tests inserting Mock Tenants and asserting accurate UUID retrieval.</span>
              </li>
            </ul>
          </section>

          {/* SECTION 8: Rollback Strategy */}
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <RefreshCcw className="w-4 h-4 text-amber-500" />
              8. Rollback Strategy
            </h2>
            <div className="text-xs text-slate-300 leading-relaxed space-y-2">
              <p>
                <strong>Migration Reverse:</strong> If deployment encounters issues, execute automatic structural revert transactions (e.g., `npx prisma db push --force-reset` for staging, or applying specific down-migration SQL files).
              </p>
              <p>
                <strong>Version Pinning:</strong> Maintain static database configurations so we can switch back to the previous stable release instantly.
              </p>
            </div>
          </section>

          {/* SECTION 9: Acceptance Criteria */}
          <section className="bg-emerald-950/20 border border-emerald-950 rounded-xl p-6">
            <h2 className="text-xs font-bold text-emerald-300 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
              <Code className="w-4 h-4 text-emerald-400" />
              9. Acceptance Criteria
            </h2>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">•</span>
                <span>Active cloud-hosted PostgreSQL DB is provisioned and listening.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">•</span>
                <span>System database tables (Tenant, User) exist and possess strict FK constraints.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">•</span>
                <span>Server baseline reports database state as connected.</span>
              </li>
            </ul>
          </section>

        </div>

      </div>

    </div>
  );
}
