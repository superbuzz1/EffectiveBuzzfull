import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Server, FileText, CheckCircle2, 
  AlertTriangle, Clock, Activity, Building, UploadCloud,
  Eye, CheckSquare
} from 'lucide-react';

export default function SOC2ComplianceDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'controls'>('overview');

  const [controls] = useState([
    { id: 'CC1.1', title: 'Security Policy', status: 'Implemented', owner: 'CTO', lastReview: 'Oct 1' },
    { id: 'CC1.2', title: 'Risk Assessment', status: 'Implemented', owner: 'CISO', lastReview: 'Oct 5' },
    { id: 'CC2.1', title: 'Access Control (RBAC)', status: 'Implemented', owner: 'Engineering', lastReview: 'Oct 12' },
    { id: 'CC3.1', title: 'Data Encryption (At Rest)', status: 'Implemented', owner: 'DevOps', lastReview: 'Oct 12' },
    { id: 'CC4.1', title: 'Incident Response Plan', status: 'In Review', owner: 'CISO', lastReview: 'Pending' },
    { id: 'CC5.1', title: 'Continuous Monitoring', status: 'Implemented', owner: 'DevOps', lastReview: 'Oct 14' },
  ]);

  return (
    <div className="space-y-6 animate-feed relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Area */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> ENTERPRISE TRUST
              </span>
            </div>
            <h1 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2.5">
              <Lock className="w-6 h-6 text-blue-400" />
              SOC 2 Type II Compliance Center
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              Track real-time audit readiness, view continuous infrastructure monitoring, and manage the 120+ technical controls required to achieve and maintain SOC 2 Type II certification.
            </p>
          </div>
          
          <div className="flex gap-2 bg-slate-950/50 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'overview' 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Audit Readiness
            </button>
            <button
              onClick={() => setActiveTab('controls')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'controls' 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Trust Service Criteria
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-feed">
          {/* Main Status Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Audit Readiness Score</h3>
                  <p className="text-sm text-gray-400">Targeting Type II Audit Period: Nov 2026 - May 2027</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white tracking-tight">92<span className="text-xl text-gray-500 font-normal">%</span></div>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-bold mt-1 inline-block">On Track</span>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white font-bold flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400"/> Security (Core)</span>
                    <span className="text-emerald-400 font-mono">100%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white font-bold flex items-center gap-1.5"><Server className="w-4 h-4 text-blue-400"/> Availability</span>
                    <span className="text-blue-400 font-mono">95%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 w-[95%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white font-bold flex items-center gap-1.5"><Eye className="w-4 h-4 text-amber-400"/> Confidentiality</span>
                    <span className="text-amber-400 font-mono">82%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-[82%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800 bg-slate-900/50">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Continuous Monitoring Infrastructure</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">AWS CloudTrail</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">All API calls logged and immutable. Alerting enabled for root access.</p>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Datadog APM</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Real-time threat detection and anomalous behavior tracking active.</p>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Vanta Integration</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Continuous automated evidence collection syncing hourly.</p>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Penetration Test</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Scheduled for Q1 2027. Vendor selection currently in progress.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Evidence & Action Items */}
          <div className="space-y-6">
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-xl">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider font-mono">Required Action Items</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white">Approve BCP Document</div>
                    <div className="text-xs text-gray-400 mt-1">The Business Continuity Plan needs CEO sign-off.</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white">Upload Q3 Access Review</div>
                    <div className="text-xs text-gray-400 mt-1">Quarterly logical access review evidence missing.</div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                <UploadCloud className="w-4 h-4" /> Upload Evidence
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/20 rounded-xl p-6 shadow-xl">
              <div className="flex justify-center mb-4">
                <Building className="w-10 h-10 text-blue-400" />
              </div>
              <h4 className="text-white font-bold text-center mb-2">Share Trust Report</h4>
              <p className="text-xs text-blue-200/70 text-center leading-relaxed mb-4">
                Generate a watermarked, NDA-gated Trust Center link for enterprise prospects.
              </p>
              <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold rounded-lg transition-all">
                Generate Secure Link
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'controls' && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl shadow-xl overflow-hidden animate-feed">
          <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Trust Services Criteria (TSC)</h3>
              <p className="text-xs text-gray-500 mt-1">Mapping to AICPA framework standards.</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0b1120] text-xs uppercase font-mono text-gray-500 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">Ref</th>
                  <th className="px-6 py-4 font-semibold">Control Description</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Owner</th>
                  <th className="px-6 py-4 font-semibold">Last Checked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {controls.map((control) => (
                  <tr key={control.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 font-mono text-blue-400 text-xs font-bold">
                      {control.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {control.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-md border font-medium flex items-center gap-1.5 w-fit ${
                        control.status === 'Implemented' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {control.status === 'Implemented' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {control.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-xs">
                      {control.owner}
                    </td>
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                      {control.lastReview}
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
