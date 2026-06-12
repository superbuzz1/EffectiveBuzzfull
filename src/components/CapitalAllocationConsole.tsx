import React, { useState, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, Cpu, Users, Sparkles, Sliders, ShieldCheck, 
  AlertTriangle, RefreshCw, Layers, GraduationCap, Coins, PieChart, BarChart, 
  ArrowUpRight, Landmark, Gauge, Activity, Compass, Flame
} from 'lucide-react';

interface AllocationBreakdown {
  productPercent: number;
  marketingPercent: number;
  engineeringPercent: number;
  hiringPercent: number;
}

export default function CapitalAllocationConsole() {
  // Configurable Parameters
  const [capitalPool, setCapitalPool] = useState<number>(5000000); // $1M to $10M
  
  // Custom Allocations
  const [productPercent, setProductPercent] = useState<number>(30);
  const [marketingPercent, setMarketingPercent] = useState<number>(35);
  const [engineeringPercent, setEngineeringPercent] = useState<number>(20);
  const [hiringPercent, setHiringPercent] = useState<number>(15);

  // Auto-correction handler to guarantee 100% total allocation
  const handlePercentChange = (type: 'product' | 'marketing' | 'engineering' | 'hiring', newVal: number) => {
    // Basic greedy normalization
    const difference = newVal - (
      type === 'product' ? productPercent :
      type === 'marketing' ? marketingPercent :
      type === 'engineering' ? engineeringPercent :
      hiringPercent
    );

    const otherTypes = ['product', 'marketing', 'engineering', 'hiring'].filter(t => t !== type);
    
    // Distribute the inverse change evenly amongst others
    const step = difference / 3;

    if (type === 'product') {
      setProductPercent(newVal);
      setMarketingPercent(prev => Math.max(0, Math.min(100, Math.round(prev - step))));
      setEngineeringPercent(prev => Math.max(0, Math.min(100, Math.round(prev - step))));
      setHiringPercent(prev => Math.max(0, Math.min(100, Math.round(100 - newVal - Math.round(marketingPercent - step) - Math.round(engineeringPercent - step)))));
    } else if (type === 'marketing') {
      setMarketingPercent(newVal);
      setProductPercent(prev => Math.max(0, Math.min(100, Math.round(prev - step))));
      setEngineeringPercent(prev => Math.max(0, Math.min(100, Math.round(prev - step))));
      setHiringPercent(prev => Math.max(0, Math.min(100, Math.round(100 - newVal - Math.round(productPercent - step) - Math.round(engineeringPercent - step)))));
    } else if (type === 'engineering') {
      setEngineeringPercent(newVal);
      setProductPercent(prev => Math.max(0, Math.min(100, Math.round(prev - step))));
      setMarketingPercent(prev => Math.max(0, Math.min(100, Math.round(prev - step))));
      setHiringPercent(prev => Math.max(0, Math.min(100, Math.round(100 - newVal - Math.round(productPercent - step) - Math.round(marketingPercent - step)))));
    } else {
      setHiringPercent(newVal);
      setProductPercent(prev => Math.max(0, Math.min(100, Math.round(prev - step))));
      setMarketingPercent(prev => Math.max(0, Math.min(100, Math.round(prev - step))));
      setEngineeringPercent(prev => Math.max(0, Math.min(100, Math.round(100 - newVal - Math.round(productPercent - step) - Math.round(marketingPercent - step)))));
    }
  };

  // Re-normalize if sum is not 100 because of routing decimals
  const totalAllocated = productPercent + marketingPercent + engineeringPercent + hiringPercent;
  
  // Tactical Presets
  const applyPreset = (preset: 'conservative' | 'balanced' | 'hyper') => {
    if (preset === 'conservative') {
      setProductPercent(40);
      setMarketingPercent(20);
      setEngineeringPercent(25);
      setHiringPercent(15);
    } else if (preset === 'balanced') {
      setProductPercent(30);
      setMarketingPercent(35);
      setEngineeringPercent(20);
      setHiringPercent(15);
    } else {
      setProductPercent(20);
      setMarketingPercent(50);
      setEngineeringPercent(15);
      setHiringPercent(15);
    }
  };

  // Exact dollar metrics
  const productDollars = (capitalPool * productPercent) / 100;
  const marketingDollars = (capitalPool * marketingPercent) / 100;
  const engineeringDollars = (capitalPool * engineeringPercent) / 100;
  const hiringDollars = (capitalPool * hiringPercent) / 100;

  // Derive ROI Strategic Outputs based on Venture Capital formula
  // Product: Boosts Net Revenue Retention (NRR) and decreases churn
  const baseNrr = 102; // %
  const projectedNrr = Math.min(142, Math.round(baseNrr + (productPercent * 0.8) + (engineeringPercent * 0.2)));
  const calculatedChurn = Math.max(1.5, parseFloat((8.5 - (productPercent * 0.12) - (engineeringPercent * 0.1)).toFixed(2)));

  // Marketing: drives top line conversion customer acquisition, but decreases payback standard timing when optimized
  const calculatedPaybackMonths = Math.max(6.5, parseFloat((18.5 - (marketingPercent * 0.18) - (productPercent * 0.08)).toFixed(1)));
  // SaaS Magic Number = New ARR in Quarter / Sales and Marketing spend of prior quarter
  const magicNumber = parseFloat(((marketingPercent * 0.04) + (productPercent * 0.01) + (engineeringPercent * 0.005)).toFixed(2));

  // Hiring: scales solution delivery. If low but marketing high, generates queue choke.
  const solvedQueuesSLA = Math.round(85 + (hiringPercent * 0.8) - (marketingPercent > 45 ? 12 : 0));

  // Burn Rates & Post-Money Enterprise Valuation Multiples
  // Capital pool spent over 24-month horizon
  const monthlyBurnRate = Math.round(capitalPool / 24);
  const coreMultiple = parseFloat((6.5 + (magicNumber * 2.8) + (projectedNrr > 120 ? 2.5 : 0) - (calculatedChurn > 6 ? 1.0 : 0)).toFixed(1));
  const currentArr = 1850000; // Company baseline ARR
  const estimatedNewArr = Math.round((marketingDollars * (magicNumber / 1.5)) + (productDollars * 0.15));
  const postMoneyArr = currentArr + estimatedNewArr;
  const estimatedPostValuation = Math.round(postMoneyArr * coreMultiple);

  // Financial status alerts
  const isHighLeff = magicNumber >= 1.25;
  const isBurnThreat = monthlyBurnRate > 350000;

  return (
    <div className="space-y-6">
      {/* Executive Strategic Baner */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-zinc-500/5 to-transparent border border-emerald-950/30 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 animate-fade-in">
              <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                Capital Allocation Engine
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Series-A Portfolio Modeler</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-200">
              CFO & Venture Capital Director Forum
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Model Series-A funding distributions. Dynamically allocates R&D, client outreach campaigns, platform optimizations, and headcount parameters to maximize SaaS Magic Numbers, Net Retention, and exit valuations.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-emerald-400">
            <Coins className="w-4 h-4 text-emerald-400" />
            <span>Target Term: 24-Mo Runway</span>
          </div>
        </div>
      </div>

      {/* Preset Action Grid Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => applyPreset('conservative')}
          className="p-3 text-left rounded-xl bg-slate-950 border border-slate-900 hover:border-zinc-700 transition font-mono space-y-1 cursor-pointer"
        >
          <span className="text-[11px] text-orange-400 font-bold block">Preset: Conservative Burn</span>
          <span className="text-[10px] text-zinc-500 block">40% R&D • 20% Mktg • 25% Eng • 15% Hiring</span>
        </button>
        <button
          onClick={() => applyPreset('balanced')}
          className="p-3 text-left rounded-xl bg-slate-950 border border-slate-900 hover:border-zinc-700 transition font-mono space-y-1 cursor-pointer"
        >
          <span className="text-[11px] text-emerald-400 font-bold block">Preset: Balanced Growth</span>
          <span className="text-[10px] text-zinc-500 block">30% R&D • 35% Mktg • 20% Eng • 15% Hiring</span>
        </button>
        <button
          onClick={() => applyPreset('hyper')}
          className="p-3 text-left rounded-xl bg-slate-950 border border-slate-900 hover:border-zinc-700 transition font-mono space-y-1 cursor-pointer"
        >
          <span className="text-[11px] text-pink-400 font-bold block">Preset: Hyper-Scale GTM</span>
          <span className="text-[10px] text-zinc-500 block">20% R&D • 50% Mktg • 15% Eng • 15% Hiring</span>
        </button>
      </div>

      {/* Primary Simulator Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Interactive Section */}
        <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Capital Pool Setup</span>
              <h4 className="text-xs font-bold text-white uppercase font-mono">Tuning Investment Inputs</h4>
            </div>

            {/* Total Capital Pool slider */}
            <div className="space-y-1.5 font-mono pt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400 uppercase font-bold text-[10px]">Series-A Funding Capital:</span>
                <strong className="text-emerald-400 text-[11.5px]">${(capitalPool / 1000000).toFixed(1)}M USD</strong>
              </div>
              <input
                type="range"
                min="1000000"
                max="10000000"
                step="500000"
                value={capitalPool}
                onChange={(e) => setCapitalPool(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-emerald-400"
              />
              <p className="text-[9px] text-zinc-500">The primary liquid capital assets to distribute across corporate branches.</p>
            </div>

            {/* Interactive sliders list with feedback */}
            <div className="space-y-4 pt-3 border-t border-slate-800">
              
              {/* Product R&D */}
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-semibold text-[10.5px]">Product R&D (Core IP):</span>
                  <span className="text-emerald-400 font-bold">{productPercent}% (${(productDollars/1000).toLocaleString()}k)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="1"
                  value={productPercent}
                  onChange={(e) => handlePercentChange('product', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-emerald-400"
                />
                <p className="text-[9px] text-zinc-500">Expands self-onboarding guides and customer satisfaction thresholds.</p>
              </div>

              {/* Marketing GTM */}
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-semibold text-[10.5px]">GTM Marketing (Ad-spend):</span>
                  <span className="text-emerald-400 font-bold">{marketingPercent}% (${(marketingDollars/1000).toLocaleString()}k)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="1"
                  value={marketingPercent}
                  onChange={(e) => handlePercentChange('marketing', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-emerald-400"
                />
                <p className="text-[9px] text-zinc-500">Paid customer acquisition, regional VAR commissions, and pipelines campaigns.</p>
              </div>

              {/* Engineering Scale */}
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-semibold text-[10.5px]">Engineering & Systems:</span>
                  <span className="text-emerald-400 font-bold">{engineeringPercent}% (${(engineeringDollars/1000).toLocaleString()}k)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="1"
                  value={engineeringPercent}
                  onChange={(e) => handlePercentChange('engineering', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-emerald-400"
                />
                <p className="text-[9px] text-zinc-500">Minimizes server latencies while managing geographical sovereign endpoints.</p>
              </div>

              {/* Staff Hiring Needs */}
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-semibold text-[10.5px]">Staffing Capacity:</span>
                  <span className="text-emerald-400 font-bold">{hiringPercent}% (${(hiringDollars/1000).toLocaleString()}k)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="1"
                  value={hiringPercent}
                  onChange={(e) => handlePercentChange('hiring', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-emerald-400"
                />
                <p className="text-[9px] text-zinc-500">Recruits critical Solutions Engineers, CSEs, and sales resources.</p>
              </div>

            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg text-[10px] text-zinc-500 font-mono">
            <strong>System Balancer Guard:</strong> Modifying any single parameter automatically scales downstream elements to maintain total sum at exactly <span className="text-white font-bold">{totalAllocated}%</span>.
          </div>
        </div>

        {/* Right Financial Reports Canvas */}
        <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-5 flex flex-col justify-between font-mono text-xs">
          
          <div className="space-y-4">
            <span className="text-[10px] text-zinc-500 font-bold uppercase block tracking-wider">Dynamic ROI Outcomes</span>

            {/* Grid display metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* SaaS Magic Number */}
              <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5">
                <div className="flex justify-between items-center text-zinc-500 text-[9.5px] font-bold">
                  <span>SAAS CAPITAL EFFICIENCY</span>
                  <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="flex items-baseline justify-between">
                  <strong className="text-base font-bold text-white">{magicNumber}x Magic No.</strong>
                  <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold border ${
                    magicNumber >= 1.25 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                  }`}>
                    {magicNumber >= 1.25 ? 'High Efficiency' : 'Nominal Return'}
                  </span>
                </div>
                <p className="text-[9px] text-zinc-400">
                  Target ARR growth generated per marketing dollar invested.
                </p>
              </div>

              {/* CAC Payback Months */}
              <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5">
                <div className="flex justify-between items-center text-zinc-500 text-[9.5px] font-bold">
                  <span>CUSTOMER PAYBACK LIFECYCLE</span>
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <strong className="text-base font-bold text-white">{calculatedPaybackMonths} Months</strong>
                <p className="text-[9px] text-zinc-400 font-normal">
                  Estimated duration required to recoup CAC offsets on contract values.
                </p>
              </div>

              {/* Net Revenue Retention (NRR) */}
              <div className="p-4 bg-[#1e293b]/50 border border-[#334155] rounded-xl space-y-1.5">
                <div className="flex justify-between items-center text-zinc-400 text-[9.5px] font-bold">
                  <span>NET REVENUE RETENTION</span>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                </div>
                <div className="flex justify-between items-baseline">
                  <strong className="text-base font-bold text-white">{projectedNrr}% NRR Factor</strong>
                  <span className="text-[9px] text-rose-500 font-bold">{calculatedChurn}% Churn</span>
                </div>
                <p className="text-[9px] text-zinc-300">
                  Driven by core product stability adjustments.
                </p>
              </div>

              {/* Operational Runway & monthly burn */}
              <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5">
                <div className="flex justify-between items-center text-zinc-500 text-[9.5px] font-bold">
                  <span>CAPITAL DISBURSEMENT VELOCITY</span>
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <div className="flex justify-between items-baseline">
                  <strong className="text-base font-bold text-white">${monthlyBurnRate.toLocaleString()}/mo</strong>
                  <span className="text-[9.5px] text-zinc-500 font-semibold">Pre-Exit</span>
                </div>
                <p className="text-[9px] text-zinc-400">
                  Secures a critical <span className="text-white font-bold">24-month runway</span> window.
                </p>
              </div>

            </div>

            {/* Strategic Exit Metrics Panel */}
            <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-zinc-500 text-[9.5px] font-bold">
                <span>PROJECTED ENTERPRISE VALUATION (EXIT MODEL)</span>
                <Landmark className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2.5">
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase">Projected ARR Base:</span>
                  <strong className="text-base font-extrabold text-white">${postMoneyArr.toLocaleString()} ARR</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 block uppercase">Valuation Multiple:</span>
                  <strong className="text-base font-extrabold text-emerald-400">{coreMultiple}x</strong>
                </div>
              </div>
              <div className="flex justify-between items-center bg-[#0f172a] border border-[#1e293b] p-3 rounded-lg">
                <span className="text-[10px] text-zinc-300 font-semibold uppercase">ESTIMATED VALUATION OUTCOME:</span>
                <strong className="text-[#10b981] font-bold text-base font-sans">${(estimatedPostValuation / 1000000).toFixed(2)}M USD</strong>
              </div>
            </div>
          </div>

          {/* Strategic Warnings Column */}
          <div className="space-y-2">
            {engineeringPercent < 15 && (
              <div className="flex gap-2.5 items-start p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
                <AlertTriangle className="w-4 h-4 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase block text-amber-400">High Technical Debt Warning:</span>
                  <p className="text-[10px] text-amber-300 leading-normal">
                    Engineering allocations lower than 15% increase server latency. SLA parameters could slip to sub-80ms triggers causing multi-tenant core contract cancellations.
                  </p>
                </div>
              </div>
            )}
            
            {productPercent < 20 && (
              <div className="flex gap-2.5 items-start p-3 bg-rose-500/15 border border-rose-500/20 rounded-xl text-rose-500">
                <AlertTriangle className="w-4 h-4 mt-0.5 animate-pulse" />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase block text-rose-400">Low Onboarding Polish:</span>
                  <p className="text-[10px] text-rose-300 leading-normal">
                    Product allocations lower than 20% limit self-setup guides. Early cohorts suffer setup friction, driving projected Churn to elevated levels.
                  </p>
                </div>
              </div>
            )}

            {productPercent >= 20 && engineeringPercent >= 15 && (
              <div className="flex gap-2.5 items-start p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500">
                <ShieldCheck className="w-4 h-4 mt-0.5 text-emerald-400" />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase block text-emerald-400">Stable Resource Balance:</span>
                  <p className="text-[10px] text-zinc-400 leading-normal">
                    R&D and Technical scaling investments meet seed board thresholds. Minimizes risk profile for secondary tranche distributions.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Capital Spend over 12m Projection Graph */}
      <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Portfolio Cash Burn Forecast</span>
            <h4 className="text-sm font-bold text-white uppercase">Liquidity and Capital Run-Down Timeline</h4>
          </div>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-[9px] text-zinc-500 uppercase font-bold select-none">
            Run-down Period: 24 Months
          </span>
        </div>

        <div className="relative bg-slate-950 border border-slate-900 rounded-xl p-5 min-h-[220px]">
          {/* Chart Legend */}
          <div className="flex flex-wrap gap-4 text-[9px] font-bold text-zinc-400 mb-3 pl-6">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-emerald-400 rounded-full" /> Remaining Reserve Pool: ${(capitalPool / 1000000).toFixed(2)}M</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-indigo-500 rounded-full" /> Monthly Sunk Burn Rate: ${(monthlyBurnRate / 1000).toFixed(0)}k/mo</span>
            {isBurnThreat && <span className="text-pink-400 flex items-center gap-1 font-bold">⚠️ Accelerated Burn Threshold Slipped</span>}
          </div>

          <svg viewBox="0 0 500 200" className="w-full h-44 mt-4 overflow-visible">
            {/* Grid layout */}
            <line x1="40" y1="20" x2="480" y2="20" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />
            <line x1="40" y1="70" x2="480" y2="70" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />
            <line x1="40" y1="120" x2="480" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />
            <line x1="40" y1="170" x2="480" y2="170" stroke="#1f2937" strokeWidth="1" />

            {/* Left Axis labels */}
            <text x="32" y="24" fill="#64748b" fontSize="8" textAnchor="end">${((capitalPool * 1.0)/1000000).toFixed(1)}M</text>
            <text x="32" y="74" fill="#64748b" fontSize="8" textAnchor="end">${((capitalPool * 0.6)/1000000).toFixed(1)}M</text>
            <text x="32" y="124" fill="#64748b" fontSize="8" textAnchor="end">${((capitalPool * 0.22)/1000000).toFixed(1)}M</text>
            <text x="32" y="174" fill="#64748b" fontSize="8" textAnchor="end">0.0M</text>

            {/* Timestamps */}
            <text x="40" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Current</text>
            <text x="150" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Month-6</text>
            <text x="260" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Month-12</text>
            <text x="370" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Month-18</text>
            <text x="480" y="188" fill="#64748b" fontSize="8" textAnchor="middle">Month-24 Exit</text>

            {/* Capital Reserve Line (Linear decaying slope based on Burn parameter) */}
            <path
              d="M 40,25 L 150,60 L 260,95 L 370,130 L 480,165"
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              className="transition-all duration-700 ease-out"
            />

            {/* Target IRR Growth Compound Curve */}
            <path
              d={`M 40,165 Q 150,${Math.round(165 - (estimatedNewArr * 0.015))} 260,${Math.round(145 - (estimatedNewArr * 0.035))} 370,${Math.round(112 - (estimatedNewArr * 0.055))} 480,${Math.round(80 - (estimatedNewArr * 0.075))}`}
              fill="none"
              stroke="#6366f1"
              strokeWidth="2.5"
              strokeDasharray="3"
              className="transition-all duration-700 ease-out"
            />

            {/* Chart bullet node points */}
            <circle cx="40" cy="25" r="4" fill="#10b981" />
            <circle cx="480" cy="165" r="4" fill="#10b981" />
            <circle cx="480" cy={Math.round(80 - (estimatedNewArr * 0.075))} r="4.5" fill="#6366f1" />
          </svg>
        </div>
      </div>
    </div>
  );
}
