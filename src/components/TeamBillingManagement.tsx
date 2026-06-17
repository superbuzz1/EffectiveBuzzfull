"use client";
import React, { useState } from 'react';
import { 
  CreditCard, Users, Shield, Zap, CheckCircle2, 
  Building2, ArrowUpRight, Clock, Plus, Trash2, 
  Mail, Settings, MoreVertical
} from 'lucide-react';

export default function TeamBillingManagement() {
  const [activeTab, setActiveTab] = useState<'subscription' | 'seats'>('subscription');
  const [seats, setSeats] = useState([
    { id: 1, email: 'founder@effectivebuzz.com', role: 'Owner', status: 'Active', lastActive: '2 mins ago' },
    { id: 2, email: 'sales@effectivebuzz.com', role: 'Admin', status: 'Active', lastActive: '1 hr ago' },
    { id: 3, email: 'sdr1@effectivebuzz.com', role: 'Member', status: 'Active', lastActive: '4 hrs ago' },
    { id: 4, email: 'sdr2@effectivebuzz.com', role: 'Member', status: 'Pending', lastActive: '-' },
  ]);

  return (
    <div className="space-y-6 animate-feed relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider flex items-center gap-1">
                <CreditCard className="w-3 h-3" /> STRIPE MULTI-TENANT
              </span>
            </div>
            <h1 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2.5">
              <Building2 className="w-6 h-6 text-emerald-400" />
              Team Billing & Seat Management
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              Manage your enterprise workspace. Add new SDR seats, configure role-based access control, and manage your Stripe subscription infrastructure across the team.
            </p>
          </div>
          
          <div className="flex gap-2 bg-slate-950/50 p-1 rounded-lg border border-slate-800">
            {[
              { id: 'subscription', label: 'Subscription Plan' },
              { id: 'seats', label: 'Team Seats' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'subscription' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-feed">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Scale Plan (Annual)</h3>
                  <p className="text-sm text-gray-400">Your next billing date is October 15, 2026.</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white tracking-tight">$4,990<span className="text-sm text-gray-500 font-normal">/yr</span></div>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-bold mt-1 inline-block">Active</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-gray-300">Up to 5 SDR Seats included</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-gray-300">Unlimited Autonomous Automations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-gray-300">Bidirectional Salesforce/HubSpot Sync</span>
                </div>
              </div>

              <div className="flex gap-3 border-t border-slate-800 pt-6">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-emerald-500/20">
                  Upgrade to Enterprise
                </button>
                <button className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors border border-slate-700">
                  Manage in Stripe
                </button>
              </div>
            </div>

            <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800 bg-slate-900/50">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Invoice History</h3>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-[#0b1120] text-xs uppercase font-mono text-gray-500 border-b border-slate-800">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Date</th>
                    <th className="px-5 py-3 font-semibold">Amount</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 text-right font-semibold">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  <tr className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-5 py-4 text-gray-300 font-mono">Oct 15, 2025</td>
                    <td className="px-5 py-4 font-mono font-bold text-white">$4,990.00</td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md">Paid</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold">Download PDF</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-xl p-6 shadow-xl">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30 mb-4">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <h4 className="text-white font-bold mb-2">Need more power?</h4>
              <p className="text-sm text-indigo-200 leading-relaxed mb-4">
                Enterprise plans include dedicated SOC2 clusters, priority support, and infinite seats.
              </p>
              <button className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-lg shadow-indigo-500/20 transition-all">
                Contact Sales
              </button>
            </div>
            
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-xl">
              <h4 className="text-sm font-bold text-white mb-4">Payment Method</h4>
              <div className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-lg">
                <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center border border-slate-700">
                  <span className="text-[10px] font-bold text-white">VISA</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">•••• •••• •••• 4242</div>
                  <div className="text-xs text-gray-500">Expires 12/28</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'seats' && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl shadow-xl overflow-hidden animate-feed">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Workspace Members</h3>
              <p className="text-xs text-gray-500 mt-1">You are currently using 4 of 5 available seats on your plan.</p>
            </div>
            <button className="px-4 py-2 text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Invite Member
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0b1120] text-xs uppercase font-mono text-gray-500 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Last Active</th>
                  <th className="px-6 py-4 text-right font-semibold">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {seats.map((seat) => (
                  <tr key={seat.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-gray-300 border border-slate-700">
                          {seat.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-medium text-white">{seat.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-slate-800 text-gray-300 px-2.5 py-1 rounded-md border border-slate-700 flex items-center gap-1.5 w-fit">
                        {seat.role === 'Owner' ? <Shield className="w-3 h-3 text-emerald-400" /> : <Users className="w-3 h-3 text-gray-400" />}
                        {seat.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-md border font-medium flex items-center gap-1.5 w-fit ${
                        seat.status === 'Active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {seat.status === 'Active' ? <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> : <Clock className="w-3 h-3" />}
                        {seat.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                      {seat.lastActive}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-gray-500 hover:text-white hover:bg-slate-800 rounded transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
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
