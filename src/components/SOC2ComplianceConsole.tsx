import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Activity, Server, FileText, 
  CheckCircle, AlertTriangle, Eye, Key, Shield,
  Database, GlobeLock, UserCheck
} from 'lucide-react';

export default function SOC2ComplianceConsole() {
  const [activeTab, setActiveTab] = useState<'overview' | 'audit' | 'rls'>('overview');

  const [auditLogs] = useState([
    { id: 'AL-9021', time: '10 mins ago', user: 'system_admin', event: 'RLS Policy Updated', resource: 'public.meetings', status: 'Success' },
    { id: 'AL-9020', time: '1 hr ago', user: 'api_service', event: 'MFA Enforced', resource: 'auth.users', status: 'Success' },
    { id: 'AL-9019', time: '2 hrs ago', user: 'unknown_ip', event: 'Failed SSH Login', resource: 'prod-db-cluster', status: 'Blocked' },
    { id: 'AL-9018', time: '5 hrs ago', user: 'ci_runner', event: 'Secrets Rotated', resource: 'vault.stripe_keys', status: 'Success' },
  ]);

  const renderBadge = (status: string) => {
    if (status === 'Success') return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3"/> {status}</span>;
    if (status === 'Blocked') return <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit"><AlertTriangle className="w-3 h-3"/> {status}</span>;
    return <span className="bg-slate-700/50 text-slate-300 border border-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider w-fit">{status}</span>;
  };

  return (
    <div className="space-y-6 animate-feed relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Area */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> PHASE 4: ENTERPRISE SCALE
              </span>
            </div>
            <h1 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2.5">
              <Lock className="w-6 h-6 text-blue-400" />
              SOC 2 Type II Compliance & Security
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              Enterprise-grade security perimeter. Enforcing strict Row-Level Security (RLS) for tenant isolation, automated KMS secret rotation, and immutable audit logging to maintain continuous SOC 2 readiness.
            </p>
          </div>

          <div className="flex gap-2 bg-slate-950/50 p-1 rounded-lg border border-slate-800">
            {[
              { id: 'overview', label: 'Security Posture' },
              { id: 'rls', label: 'Tenant Isolation' },
              { id: 'audit', label: 'Audit Logs' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-feed">
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-center">
            <span className="text-[10px] text-gray-500 font-mono uppercase block mb-2">SOC 2 Readiness Score</span>
            <div className="text-4xl font-bold text-white tracking-tight">98<span className="text-lg text-gray-500 font-normal">/100</span></div>
            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Audit Ready</div>
          </div>
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-center">
            <span className="text-[10px] text-gray-500 font-mono uppercase block mb-2">Data Encryption</span>
            <div className="text-2xl font-bold text-white tracking-tight">AES-256 <span className="text-lg text-gray-500 font-normal">GCM</span></div>
            <div className="text-xs text-blue-400 mt-2 flex items-center gap-1"><Key className="w-3 h-3" /> KMS Auto-Rotate Enabled</div>
          </div>
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-center">
            <span className="text-[10px] text-gray-500 font-mono uppercase block mb-2">Access Control</span>
            <div className="text-2xl font-bold text-white tracking-tight">RBAC & MFA</div>
            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><UserCheck className="w-3 h-3" /> 100% MFA Enforced</div>
          </div>

          <div className="md:col-span-3 bg-gradient-to-br from-slate-900 to-[#0f172a] border border-slate-800 rounded-xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider font-mono">Continuous Compliance Controls</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Data at Rest Encryption', desc: 'All databases and EBS volumes are encrypted using AWS KMS keys.', icon: Database, status: 'Compliant' },
                { title: 'Data in Transit', desc: 'Strict TLS 1.3 enforcement for all external API endpoints and internal microservices.', icon: GlobeLock, status: 'Compliant' },
                { title: 'Vulnerability Management', desc: 'Automated weekly Snyk scans and container dependency patching.', icon: Shield, status: 'Compliant' },
                { title: 'Immutable Audit Logging', desc: 'All mutations stream to WORM (Write Once Read Many) AWS S3 buckets.', icon: FileText, status: 'Compliant' },
              ].map((control, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex gap-4 hover:border-slate-700 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <control.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white">{control.title}</h4>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">{control.status}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{control.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rls' && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl shadow-xl overflow-hidden animate-feed">
          <div className="p-6 border-b border-slate-800 bg-slate-900/50">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" /> PostgreSQL Row-Level Security (RLS)
            </h3>
            <p className="text-xs text-gray-500 mt-1">Tenant isolation logic guaranteeing organizations can only query their own data.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
              <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">policy.sql</span>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">Active</span>
              </div>
              <pre className="p-4 text-xs font-mono text-blue-300 overflow-x-auto leading-relaxed">
{`-- Enable RLS on core tables
ALTER TABLE "public"."campaigns" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."leads" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."emails" ENABLE ROW LEVEL SECURITY;

-- Create Isolation Policies
CREATE POLICY "Tenant Isolation Policy" ON "public"."campaigns"
  FOR ALL
  USING (
    tenant_id = (SELECT auth.jwt() ->> 'tenant_id')::uuid
  )
  WITH CHECK (
    tenant_id = (SELECT auth.jwt() ->> 'tenant_id')::uuid
  );`}
              </pre>
            </div>
            
            <div className="flex items-center gap-3 bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <p className="text-xs text-blue-200/70 leading-relaxed">
                By relying on database-level constraint policies mapping to JWT claims, tenant data leakage is structurally impossible even in the event of an application-layer bug.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl shadow-xl overflow-hidden animate-feed">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Immutable Audit Trail</h3>
              <p className="text-xs text-gray-500 mt-1">Real-time system and access logs required for compliance.</p>
            </div>
            <button className="px-3 py-1.5 text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-md transition-colors flex items-center gap-2">
              <Eye className="w-3 h-3" /> Export to SIEM
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0b1120] text-xs uppercase font-mono text-gray-500 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">Event ID</th>
                  <th className="px-6 py-4 font-semibold">Time</th>
                  <th className="px-6 py-4 font-semibold">Actor</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                  <th className="px-6 py-4 font-semibold">Target Resource</th>
                  <th className="px-6 py-4 text-right font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 font-mono text-gray-400 text-xs">{log.id}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{log.time}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-slate-800 text-gray-300 px-2 py-1 rounded-md border border-slate-700 font-mono">
                        {log.user}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{log.event}</td>
                    <td className="px-6 py-4 font-mono text-xs text-blue-400">{log.resource}</td>
                    <td className="px-6 py-4 flex justify-end">
                      {renderBadge(log.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
