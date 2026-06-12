import React, { useState, useEffect } from 'react';
import { Users, ShieldAlert, Cpu, Heart, Database, Send, Plus, RefreshCw, Layers, Check, X } from 'lucide-react';
import { Tenant, SystemLog } from '../types';

interface AdminConsoleProps {
  currentRole: string;
  onChangeRole: (role: 'Owner' | 'Admin' | 'Member' | 'Agent') => void;
  onTenantAdded: () => void;
}

export default function AdminConsole({ currentRole, onChangeRole, onTenantAdded }: AdminConsoleProps) {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [isRefreshingLogs, setIsRefreshingLogs] = useState(false);

  // New Tenant Form State
  const [isAddingTenant, setIsAddingTenant] = useState(false);
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantDomain, setNewTenantDomain] = useState('');
  const [newTenantPlan, setNewTenantPlan] = useState<'Growth' | 'Professional' | 'Enterprise'>('Growth');

  useEffect(() => {
    fetchTenants();
    fetchLogs();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await fetch('/api/tenants');
      const data = await res.json();
      setTenants(data);
    } catch (err) {
      console.error('Failed to resolve tenants:', err);
    }
  };

  const fetchLogs = async () => {
    setIsRefreshingLogs(true);
    try {
      const res = await fetch('/api/logs');
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error('Failed to load system logs:', err);
    } finally {
      setIsRefreshingLogs(false);
    }
  };

  const handleAddTenantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantName || !newTenantDomain) return;

    try {
      const res = await fetch('/api/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTenantName,
          domain: newTenantDomain,
          plan: newTenantPlan
        })
      });
      const data = await res.json();
      setTenants(prev => [...prev, data]);
      setNewTenantName('');
      setNewTenantDomain('');
      setIsAddingTenant(false);
      onTenantAdded(); // Notify upstream (App.tsx) so picker updates
      fetchLogs(); // Reload logs to showcase new tenant log
    } catch (err) {
      console.error('Failed to add tenant:', err);
    }
  };

  // RBAC permissions matrix mapping
  const permissionsMatrix = [
    { action: "Configure Billing & Stripe Subscription", roles: { Owner: true, Admin: false, Member: false, Agent: false } },
    { action: "Modify Schema / Provision New Tenants", roles: { Owner: true, Admin: true, Member: false, Agent: false } },
    { action: "Create Campaign / Upload Leads List", roles: { Owner: true, Admin: true, Member: false, Agent: false } },
    { action: "Run Outbound AI Agent Copywriter (Gemini)", roles: { Owner: true, Admin: true, Member: true, Agent: false } },
    { action: "Read CRM Lead Board Records", roles: { Owner: true, Admin: true, Member: true, Agent: true } },
    { action: "View Live Gateway System Logs & Performance", roles: { Owner: true, Admin: true, Member: false, Agent: false } }
  ];

  return (
    <div className="space-y-6">
      {/* Top Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Column Left: Tenant Management + RBAC Selector */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* RBAC PROFILE SWITCHER CARD */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-xl">
            <span className="text-xs uppercase font-mono tracking-widest text-[#818cf8] font-bold block border-b border-gray-800 pb-2">
              RBAC Role Identity Simulator
            </span>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Toggle your simulated system roles profile to verify the SaaS security context in real-time.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {['Owner', 'Admin', 'Member', 'Agent'].map((role) => (
                <button
                  key={role}
                  onClick={() => onChangeRole(role as any)}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                    currentRole === role
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            <div className="p-3 bg-slate-900/40 rounded border border-gray-800 text-[10px] text-gray-400 leading-relaxed">
              Your profile is encapsulated in JWT scopes on Express endpoints, validated per query.
            </div>
          </div>

          {/* TENANT MANAGER MODULE */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-gray-800">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold block">
                Tenant Database Schemas
              </span>
              <button
                onClick={() => setIsAddingTenant(!isAddingTenant)}
                className="p-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all text-[11px] font-bold flex items-center gap-0.5"
              >
                <Plus className="w-3.5 h-3.5" /> Provision
              </button>
            </div>

            {isAddingTenant && (
              <form onSubmit={handleAddTenantSubmit} className="p-3 bg-slate-900 border border-gray-800 rounded-lg space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-400">Organization Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Studio"
                    value={newTenantName}
                    onChange={(e) => setNewTenantName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-400">Domain Prefix</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. acmefans.com"
                    value={newTenantDomain}
                    onChange={(e) => setNewTenantDomain(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-400">Subscription Band</label>
                  <select
                    value={newTenantPlan}
                    onChange={(e) => setNewTenantPlan(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-850 rounded px-2 py-1.5 focus:outline-none focus:border-emerald-500 text-white"
                  >
                    <option value="Growth">Growth</option>
                    <option value="Professional">Professional</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsAddingTenant(false)}
                    className="px-2 py-1 bg-slate-850 hover:bg-slate-800 text-gray-400 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded font-bold"
                  >
                    Save Tenant
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {tenants.map(t => (
                <div key={t.id} className="p-2.5 bg-slate-900 border border-slate-850 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-semibold text-white">{t.name}</h5>
                    <span className="text-[10px] text-gray-400 font-mono italic">{t.domain}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] uppercase font-mono font-bold bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                      {t.plan}
                    </span>
                    <span className="text-[9px] font-mono text-gray-500 block mt-1">PG Schema: {t.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column Right: Interactive Permission Grid Matrix */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white">RBAC Permission Matrix Grid</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Live validation mapping explaining how endpoints enforce RBAC per user role.
            </p>
          </div>

          <div className="border border-slate-850 rounded-lg overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-gray-300 leading-normal">
              <thead>
                <tr className="bg-[#182235]/40 border-b border-gray-800 text-gray-400 text-[10px] uppercase font-mono">
                  <th className="p-3">SaaS Client Action</th>
                  <th className="p-3 text-center">Owner</th>
                  <th className="p-3 text-center">Admin</th>
                  <th className="p-3 text-center">Member</th>
                  <th className="p-3 text-center">Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-mono text-[11px]">
                {permissionsMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="p-3 text-gray-100 font-sans">{item.action}</td>
                    <td className="p-3 text-center">
                      <Check className="w-4 h-4 mx-auto text-emerald-400" />
                    </td>
                    <td className="p-3 text-center">
                      {item.roles.Admin ? (
                        <Check className="w-4 h-4 mx-auto text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 mx-auto text-rose-500" />
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {item.roles.Member ? (
                        <Check className="w-4 h-4 mx-auto text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 mx-auto text-rose-500" />
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {item.roles.Agent ? (
                        <Check className="w-4 h-4 mx-auto text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 mx-auto text-rose-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-lg text-xs leading-relaxed text-amber-300 font-sans flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" strokeWidth={2.5} />
            <div>
              <strong>Simulated Permission Enforcement:</strong> When you select a role of <strong>"Agent"</strong>, then navigate to your Outbound Workspace or Campaigns pane, constructing new records will be blocked at the routing gate.
            </div>
          </div>
        </div>

      </div>

      {/* SYSTEM TELEMETRY EVENT LOGS GRID */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Live Server Telemetry Logging Feed
            </h3>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Displays live incoming transaction logs generated by the Node Express server.
            </p>
          </div>
          <button
            onClick={fetchLogs}
            disabled={isRefreshingLogs}
            className="p-1 px-3 rounded bg-slate-900 border border-slate-800 text-gray-300 hover:text-white hover:bg-slate-800 transition-all text-xs font-mono flex items-center gap-1.5"
          >
            {isRefreshingLogs ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            Refresh Logs
          </button>
        </div>

        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 bg-slate-950 p-2.5 rounded-lg border border-slate-850 font-mono text-[10px] divide-y divide-gray-900">
          {logs.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No server activity recorded. Trigger outbound campaigns to populate telemetry logs.
            </div>
          ) : (
            logs.map(lg => (
              <div key={lg.id} className="py-2 flex flex-col md:flex-row md:items-center justify-between gap-1.5 leading-normal">
                <div className="flex items-start gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                    lg.level === 'warn' ? 'bg-amber-500/20 text-amber-400' :
                    lg.level === 'error' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {lg.level.toUpperCase()}
                  </span>
                  <div>
                    <span className="text-gray-500 mr-2">[{new Date(lg.timestamp).toLocaleTimeString()}]</span>
                    <span className="text-purple-400 font-bold mr-1">{lg.service}:</span>
                    <span className="text-gray-300">{lg.message}</span>
                  </div>
                </div>
                {lg.durationMs !== undefined && (
                  <span className="text-gray-500">Latency: <strong className="text-[#818cf8] font-bold">{lg.durationMs}ms</strong></span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
