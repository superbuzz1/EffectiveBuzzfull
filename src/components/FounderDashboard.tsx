import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Award, ShieldAlert, Sparkles, RefreshCw, BarChart, Percent, Coins, ShieldCheck, HelpCircle } from 'lucide-react';

export default function FounderDashboard() {
  // Configurable parameters for What-If calculations
  const [arpu, setArpu] = useState<number>(299);
  const [logoChurn, setLogoChurn] = useState<number>(0.78);
  const [conversionRate, setConversionRate] = useState<number>(4.25);
  const [activationRate, setActivationRate] = useState<number>(88.5);
  const [monthlyBurn, setMonthlyBurn] = useState<number>(40000);
  const [activeUsers, setActiveUsers] = useState<number>(366);

  // Dynamic calculations based on adjustable parameters
  const calculatedMRR = activeUsers * arpu;
  const calculatedARR = calculatedMRR * 12;
  const rawCAC = 1850;
  const calculatedLTV = Math.round((arpu * 0.82) / (logoChurn / 100)); // factoring in 82% margin
  const ltvToCacRatio = (calculatedLTV / rawCAC).toFixed(1);

  // Status limits derived dynamically
  const cashBalance = 980000;
  const calculatedRunway = (cashBalance / monthlyBurn).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Welcome Executive Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-indigo-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                Founder Portfolio
              </span>
              <span className="text-[10px] text-gray-400 font-mono">Updated: Real-time via Stripe webhook connectors</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              CEO Founder Dashboard & Performance Cockpit
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Confidential operational dashboard. Adjust metrics below to model future projections, track underlying units, and manage cash timelines.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div className="font-mono">
              Rule of 40: <strong className="text-emerald-400 font-bold">55.0%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Metric Cards Grid (The 10 Metrics That Matter Most) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: MRR */}
        <div className="bg-[#111827] border border-[#1f2937] p-4.5 rounded-xl shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800/60 mb-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">1. MRR</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <h4 className="text-xl font-bold text-white font-display">${calculatedMRR.toLocaleString()}</h4>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            +12.4% MoM • Goal: $100k
          </p>
          <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-3">
            <div className="h-full bg-emerald-400 rounded transition-all duration-300" style={{ width: `${Math.min(100, (calculatedMRR / 100000) * 100)}%` }}></div>
          </div>
        </div>

        {/* Metric 2: ARR */}
        <div className="bg-[#111827] border border-[#1f2937] p-4.5 rounded-xl shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800/60 mb-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">2. ARR Run-rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h4 className="text-xl font-bold text-white font-display">${calculatedARR.toLocaleString()}</h4>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            $1.0M Run-rate Goal achieved
          </p>
          <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-3">
            <div className="h-full bg-emerald-400 rounded transition-all duration-300" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Metric 3: CAC */}
        <div className="bg-[#111827] border border-[#1f2937] p-4.5 rounded-xl shadow-lg relative overflow-hidden group hover:border-[#818cf8]/30 transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800/60 mb-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">3. Fully-Loaded CAC</span>
            <DollarSign className="w-4 h-4 text-blue-400" />
          </div>
          <h4 className="text-xl font-bold text-white font-display">${rawCAC.toLocaleString()}</h4>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Payback Target: ≤ 12 Mo
          </p>
          <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-3">
            <div className="h-full bg-blue-400 rounded" style={{ width: '65%' }}></div>
          </div>
        </div>

        {/* Metric 4: LTV */}
        <div className="bg-[#111827] border border-[#1f2937] p-4.5 rounded-xl shadow-lg relative overflow-hidden group hover:border-[#818cf8]/30 transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800/60 mb-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">4. Customer LTV</span>
            <Coins className="w-4 h-4 text-indigo-400" />
          </div>
          <h4 className="text-xl font-bold text-white font-display">${calculatedLTV.toLocaleString()}</h4>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            LTV:CAC Ratio: <strong className="text-emerald-400 font-medium">{ltvToCacRatio}x</strong>
          </p>
          <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-3">
            <div className="h-full bg-indigo-400 rounded transition-all duration-300" style={{ width: `${Math.min(100, (calculatedLTV / 15000) * 100)}%` }}></div>
          </div>
        </div>

        {/* Metric 5: Churn Rate */}
        <div className="bg-[#111827] border border-[#1f2937] p-4.5 rounded-xl shadow-lg relative overflow-hidden group hover:border-red-500/20 transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800/60 mb-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">5. Logo Churn</span>
            <ShieldAlert className="w-4 h-4 text-[#ef4444]" />
          </div>
          <h4 className="text-xl font-bold text-white font-display">{logoChurn}% <span className="text-[10px] text-gray-500">/mo</span></h4>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Target limit: &lt; 1.0%
          </p>
          <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-3">
            <div className="h-full bg-emerald-400 rounded transition-all duration-300" style={{ width: `${Math.max(10, 100 - (logoChurn * 80))}%` }}></div>
          </div>
        </div>

        {/* Metric 6: NRR */}
        <div className="bg-[#111827] border border-[#1f2937] p-4.5 rounded-xl shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800/60 mb-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">6. Net Retention</span>
            <Percent className="w-4 h-4 text-emerald-400" />
          </div>
          <h4 className="text-xl font-bold text-white font-display">118.0%</h4>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Target: ≥ 115% mid-market
          </p>
          <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-3">
            <div className="h-full bg-emerald-400 rounded" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* Metric 7: Activation */}
        <div className="bg-[#111827] border border-[#1f2937] p-4.5 rounded-xl shadow-lg relative overflow-hidden group hover:border-[#818cf8]/30 transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800/60 mb-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">7. Activation Rate</span>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
          <h4 className="text-xl font-bold text-white font-display">{activationRate}%</h4>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Subdomain & DNS verifications
          </p>
          <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-3">
            <div className="h-full bg-indigo-400 rounded transition-all duration-300" style={{ width: `${activationRate}%` }}></div>
          </div>
        </div>

        {/* Metric 8: Conversion */}
        <div className="bg-[#111827] border border-[#1f2937] p-4.5 rounded-xl shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800/60 mb-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">8. Trial-to-Paid</span>
            <Percent className="w-4 h-4 text-blue-400" />
          </div>
          <h4 className="text-xl font-bold text-white font-display">{conversionRate}%</h4>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Benchmark: 4.0% average
          </p>
          <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-3">
            <div className="h-full bg-blue-400 rounded transition-all duration-300" style={{ width: `${Math.min(100, (conversionRate / 6) * 100)}%` }}></div>
          </div>
        </div>

        {/* Metric 9: Pipeline */}
        <div className="bg-[#111827] border border-[#1f2937] p-4.5 rounded-xl shadow-lg relative overflow-hidden group hover:border-[#818cf8]/30 transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800/60 mb-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">9. Sales Pipeline</span>
            <BarChart className="w-4 h-4 text-[#818cf8]" />
          </div>
          <h4 className="text-xl font-bold text-white font-display">$2.42M</h4>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Weighted Target: $785k
          </p>
          <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-3">
            <div className="h-full bg-[#818cf8] rounded" style={{ width: '70%' }}></div>
          </div>
        </div>

        {/* Metric 10: Runway */}
        <div className="bg-[#111827] border border-[#1f2937] p-4.5 rounded-xl shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800/60 mb-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">10. Cash Runway</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <h4 className="text-xl font-bold text-white font-display">{calculatedRunway} <span className="text-[10px] text-gray-500">months</span></h4>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Cash Balance: $980k SFB
          </p>
          <div className="w-full bg-slate-950 h-1 rounded overflow-hidden mt-3">
            <div className="h-full bg-emerald-400 rounded transition-all duration-300" style={{ width: `${Math.min(100, (parseFloat(calculatedRunway) / 36) * 100)}%` }}></div>
          </div>
        </div>
      </div>

      {/* Grid of Sliders and Projections segment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders panel - User Modeling Area */}
        <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-xl space-y-4">
          <div className="border-b border-gray-800 pb-2.5">
            <h4 className="text-sm font-semibold text-white flex items-center gap-1.5 font-display">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              What-If Performance Modeler
            </h4>
            <p className="text-[10px] text-gray-400">
              Drag parameters to model revenue expansion and unit scenarios instantly.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Input 1: Active customers */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-gray-400 uppercase">Paid Workspaces count:</span>
                <span className="text-emerald-400 font-bold">{activeUsers} workspaces</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="5"
                value={activeUsers}
                onChange={(e) => setActiveUsers(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded bg-indigo-500/20 appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Input 2: ARPU */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-gray-400 uppercase">Average Billing Space ARPU:</span>
                <span className="text-emerald-400 font-bold">${arpu} / mo</span>
              </div>
              <input
                type="range"
                min="50"
                max="1200"
                step="5"
                value={arpu}
                onChange={(e) => setArpu(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded bg-indigo-500/20 appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Input 3: Logo Churn */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-gray-400 uppercase">Monthly Logo Churn:</span>
                <span className={`font-bold ${logoChurn > 1.2 ? 'text-red-400' : logoChurn < 0.6 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                  {logoChurn}% / mo
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.01"
                value={logoChurn}
                onChange={(e) => setLogoChurn(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded bg-indigo-500/20 appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Input 4: trial activation */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-gray-400 uppercase">onboarding activation rate:</span>
                <span className="text-indigo-400 font-bold">{activationRate}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="0.5"
                value={activationRate}
                onChange={(e) => setActivationRate(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded bg-indigo-500/20 appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Input 5: Conversion Rate */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-gray-400 uppercase">lead trial conversion:</span>
                <span className="text-indigo-400 font-bold">{conversionRate}%</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.05"
                value={conversionRate}
                onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded bg-indigo-500/20 appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Input 6: Monthly Burn */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-gray-400 uppercase">Monthly Operating Burn Rate:</span>
                <span className="text-red-400 font-bold">${monthlyBurn.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min="10000"
                max="150000"
                step="1000"
                value={monthlyBurn}
                onChange={(e) => setMonthlyBurn(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded bg-indigo-500/20 appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Projections Panel on Right - The modeled outcome based on metrics */}
        <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-gray-800 pb-2.5 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white font-display">Modeled Growth & Economic Outcomes</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Calculated unit economics run under an active 82% margin constraint.</p>
              </div>
              <span className="text-[9px] font-mono font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
                SIMULATOR
              </span>
            </div>

            {/* Modeled metrics breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-950 rounded-lg border border-gray-900 space-y-1">
                <span className="text-[9px] font-mono text-gray-500 uppercase">Modeled Annual Revenue (ARR)</span>
                <h5 className="text-xl font-bold font-display text-emerald-400">${calculatedARR.toLocaleString()}</h5>
                <span className="text-[9px] text-gray-400 font-mono">Annualized Recurring Run Rate</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-gray-900 space-y-1">
                <span className="text-[9px] font-mono text-gray-500 uppercase">Future LTV projection</span>
                <h5 className="text-xl font-bold font-display text-indigo-400">${calculatedLTV.toLocaleString()}</h5>
                <span className="text-[9px] text-gray-400 font-mono">LTV:CAC ratio is <strong className="text-emerald-300">{ltvToCacRatio}x</strong></span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-gray-900 space-y-1">
                <span className="text-[9px] font-mono text-gray-500 uppercase">Modeled Cash Runway</span>
                <h5 className="text-xl font-bold font-display text-emerald-300">{calculatedRunway} months</h5>
                <span className="text-[9px] text-gray-400 font-mono">Assuming SVB reserve of $980,000</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-gray-900 space-y-1">
                <span className="text-[9px] font-mono text-gray-500 uppercase">CAC Payback Speed</span>
                <h5 className="text-xl font-bold font-display text-white">
                  {Math.round((rawCAC / (arpu * 0.82)) * 10) / 10} <span className="text-xs text-gray-500 font-sans font-normal">months</span>
                </h5>
                <span className="text-[9px] text-gray-400 font-mono">Period required to self-finance CAC</span>
              </div>
            </div>

            {/* Simulated Analysis Note */}
            <div className="p-3 bg-indigo-950/15 border border-indigo-500/20 rounded-lg flex items-start gap-2.5 text-[10px] text-indigo-300 leading-relaxed font-mono">
              <HelpCircle className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
              <div>
                <strong>CEO Strategic Insights:</strong> Reducing Logo Churn from <span className="font-bold underline">0.78%</span> to <span className="font-bold text-emerald-400">0.40%</span> increases LTV from <strong>$31,438</strong> to <strong>$61,295</strong>, accelerating our LTV:CAC leverage ratio past <strong className="text-emerald-400">33x</strong>. Reducing onboarding friction is our single highest-leverage retention optimization vector.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-900 text-[9px] text-gray-500 font-mono text-center">
            Effective-GAAP Compliant • Multi-Tenant Portfolio Metrics • Silicon Valley Bank Sandbox Account
          </div>
        </div>

      </div>
    </div>
  );
}
