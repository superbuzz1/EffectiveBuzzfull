import React, { useState } from 'react';
import { ShieldCheck, Server, AlertTriangle, Battery, Clock, Network, CheckCircle, RefreshCw } from 'lucide-react';
import { ServiceStatus, Incident } from '../types';

export default function StatusMonitor() {
  const [activeTab, setActiveTab] = useState<'status' | 'incidents'>('status');

  // Service Status Array
  const services: ServiceStatus[] = [
    { name: "Global Ingress API Gateway", status: "operational", uptime24h: 99.99, latencyMs: 14 },
    { name: "Outbound agent worker node-01", status: "operational", uptime24h: 99.95, latencyMs: 180 },
    { name: "Cloud SQL Postgres Cluster Core", status: "operational", uptime24h: 99.99, latencyMs: 2 },
    { name: "Redis Caching Memorystore", status: "operational", uptime24h: 100.0, latencyMs: 0.8 },
    { name: "Google Gemini API Integration Broker", status: "operational", uptime24h: 99.98, latencyMs: 340 }
  ];

  // System Incidents registries
  const incidents: Incident[] = [
    {
      id: "inc-1",
      title: "Gemini API rate limiting latency spike",
      status: "resolved",
      severity: "minor",
      createdAt: "2026-06-02T14:20:00Z",
      updatedAt: "2026-06-02T15:10:00Z",
      updates: [
        { timestamp: "2026-06-02T15:10:00Z", message: "Resolved. Prompt token caching rules deployed, reducing Gemini gateway overhead by 40%." },
        { timestamp: "2026-06-02T14:35:00Z", message: "Investigating. Intermittent timeouts noted during peak multi-tenant campaign batching." }
      ]
    },
    {
      id: "inc-2",
      title: "Cloud SQL Failover Cluster Re-balancing",
      status: "resolved",
      severity: "major",
      createdAt: "2026-05-24T03:10:00Z",
      updatedAt: "2026-05-24T03:45:00Z",
      updates: [
        { timestamp: "2026-05-24T03:45:00Z", message: "Resolved failover cluster replication and synchronized replication streams." }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* SLA summary Banner */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono tracking-widest text-[#818cf8] font-bold block">
              Operational SLA Standard Indicator
            </span>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-display font-light text-white tracking-tight">
                99.98% <span className="text-xs text-gray-400 font-normal font-sans">Uptime Score (90 Days)</span>
              </h2>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 bg-slate-900 rounded-lg border border-gray-800 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-mono text-gray-400 block mb-1">Average Ping</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">14.5ms</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-gray-800 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-mono text-gray-400 block mb-1">Active Incident</span>
              <span className="text-xs font-mono text-gray-400 font-bold">None</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 pb-0.5 gap-4">
        <button
          onClick={() => setActiveTab('status')}
          className={`pb-3 text-sm font-medium border-b-2 font-display transition-all ${
            activeTab === 'status'
              ? 'border-emerald-500 text-emerald-400 font-semibold'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          All System Nodes Status
        </button>
        <button
          onClick={() => setActiveTab('incidents')}
          className={`pb-3 text-sm font-medium border-b-2 font-display transition-all ${
            activeTab === 'incidents'
              ? 'border-emerald-500 text-emerald-400 font-semibold'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Incident Log Registry ({incidents.length})
        </button>
      </div>

      {activeTab === 'status' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Services Monitors Column */}
          <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-semibold text-white">Live Node Telemetry Indexes</h3>
            
            <div className="space-y-3">
              {services.map((srv, idx) => (
                <div key={idx} className="p-3 bg-slate-900 border border-slate-850 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs leading-none">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">{srv.name}</h4>
                      <div className="flex gap-2 text-[10px] text-gray-500 mt-1.5 font-mono">
                        <span>Latency: <strong className="text-gray-300">{srv.latencyMs}ms</strong></span>
                        <span>•</span>
                        <span>24h SLA: <strong className="text-gray-300">{srv.uptime24h}%</strong></span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded inline-block text-center font-bold">
                    {srv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column visual analytics graphs representing VPC Telemetries */}
          <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Network Traffic & Capacity</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">Estimated queue workload analytics.</p>
            </div>

            {/* Custom SVG telemetry bars */}
            <div className="space-y-4 text-xs font-mono">
              {/* CPU Load bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-400">Core API Frontend Memory Limit</span>
                  <span className="text-white">44.8%</span>
                </div>
                <div className="w-full bg-slate-900 border border-gray-800 rounded h-2.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded" style={{ width: '44.8%' }}></div>
                </div>
              </div>

              {/* Message Queue Load bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-400">BullMQ Backlog Enqueued Emails</span>
                  <span className="text-white">12 / 10,000 max</span>
                </div>
                <div className="w-full bg-slate-900 border border-gray-800 rounded h-2.5 overflow-hidden">
                  <div className="bg-blue-400 h-full rounded" style={{ width: '3%' }}></div>
                </div>
              </div>

              {/* Caches memory load bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-400">Redis Cache Index Capacity</span>
                  <span className="text-white">11.4% (58MB)</span>
                </div>
                <div className="w-full bg-slate-900 border border-gray-800 rounded h-2.5 overflow-hidden">
                  <div className="bg-purple-400 h-full rounded" style={{ width: '11.4%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-[#182235]/40 border border-[#1f2937] p-3 rounded-lg text-[11px] leading-relaxed text-gray-300">
              <span className="font-semibold text-white block mb-0.5">SRE Monitoring Protocols:</span>
              Prometheus exporter monitors are configured globally on container pipelines. Triggers automatic node autoscaling when cluster CPU crosses 70% bounds over dynamic 3-minute windows.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'incidents' && (
        <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-semibold text-white">Operational Incident Log Registry</h3>
          
          <div className="space-y-4">
            {incidents.map((inc) => (
              <div key={inc.id} className="p-4 bg-slate-900 border border-slate-850 rounded-xl space-y-3.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-gray-800">
                  <div>
                    <h4 className="font-semibold text-white text-sm">{inc.title}</h4>
                    <span className="text-[10px] text-gray-500 font-mono italic">ID: {inc.id} • Created: {new Date(inc.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-mono font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {inc.status}
                    </span>
                    <span className="text-[9px] uppercase font-mono font-bold bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full border border-gray-700">
                      Severity: {inc.severity}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pr-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">Status Log Updates Feed:</span>
                  <div className="space-y-2 border-l border-gray-800 pl-3">
                    {inc.updates.map((upd, uIdx) => (
                      <div key={uIdx} className="space-y-1 relative">
                        <div className="absolute -left-[16px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></div>
                        <span className="text-[9px] font-mono text-gray-500 block">{new Date(upd.timestamp).toLocaleString()}</span>
                        <p className="text-gray-300 text-[11px] leading-relaxed">{upd.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
