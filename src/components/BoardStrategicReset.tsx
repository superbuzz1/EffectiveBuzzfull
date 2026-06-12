import React, { useState } from 'react';
import { 
  Landmark, Compass, ShieldAlert, Globe, Cpu, Users, Layers, 
  TrendingUp, CheckCircle2, ChevronRight, Sparkles, RefreshCw, 
  AlertCircle, Shield, Activity, FileText, DollarSign, Award, Briefcase, 
  Zap, Database, MapPin, Gauge, Lock, ArrowUpRight
} from 'lucide-react';

interface StrategicPillar {
  id: string;
  title: string;
  category: 'Product' | 'Revenue' | 'Team' | 'Infrastructure' | 'AI Systems';
  rating: 'Urgent Reset' | 'Optimizing' | 'Healthy';
  statusDescription: string;
  actionItem: string;
}

export default function BoardStrategicReset() {
  const [selectedHorizon, setSelectedHorizon] = useState<'1yr' | '3yr' | '5yr'>('1yr');
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  
  // Interactive Simulator Variables
  const [strategicFulfill, setStrategicFulfill] = useState({
    productFocus: 80, // % focus towards Deliverability & Sync rather than plain AI writes
    expansionPricing: true,
    localHostingGCC: false,
    dualTierRouting: true,
  });

  // Derived Board Assessment calculations
  const productFocusValue = strategicFulfill.productFocus;
  const simulatedChurn = Math.max(0.4, 1.8 - (productFocusValue / 70) - (strategicFulfill.expansionPricing ? 0.2 : 0)).toFixed(2);
  const targetARR = (1.248 * (1 + (productFocusValue / 100) + (strategicFulfill.expansionPricing ? 0.35 : 0) + (strategicFulfill.localHostingGCC ? 0.45 : 0))).toFixed(2);
  const profitMargin = (81.4 + (strategicFulfill.dualTierRouting ? 4.2 : -5.5)).toFixed(1);

  const pillars: StrategicPillar[] = [
    {
      id: 'product',
      title: 'The Deliverability & Integration Mandate',
      category: 'Product',
      rating: 'Urgent Reset',
      statusDescription: 'Sellers suffer sequence failures on raw AI-writing models. Low delivery rates limit customer lifetime value.',
      actionItem: 'Pivot platform focus directly to the Pre-Flight Deliverability Shield & DNS status diagnostics dashboard.'
    },
    {
      id: 'revenue',
      title: 'The Expansion & ARPU Playbook',
      category: 'Revenue',
      rating: 'Optimizing',
      statusDescription: 'Startups distribute administrative logins across infinite domains, missing seat scale monetization.',
      actionItem: 'Enforce extra mailbox seat surcharges ($45/mo) and bundle Deliverability warmup protections as automated $50/mo add-ons.'
    },
    {
      id: 'team',
      title: 'Lead Deliverability Engineer & EMEA VAR',
      category: 'Team',
      rating: 'Urgent Reset',
      statusDescription: 'We lack core system-design domain expertise to configure subdomain routing and scale EMEA agency sales.',
      actionItem: 'Hire a specialist Deliverability Systems Lead immediately and certify 10 Value-Added Reseller (VAR) agencies.'
    },
    {
      id: 'infra',
      title: 'GDPR & GCC Regional Database Nodes',
      category: 'Infrastructure',
      rating: 'Optimizing',
      statusDescription: 'A cumulative $1.4M in pending enterprise pipelines is stalled due to localized data-residency audits.',
      actionItem: 'Instantly launch isolated Frankfurt AWS database nodes and UAE Moro Hub pod networks with a 40% GTM premium.'
    },
    {
      id: 'ai',
      title: 'Cognitive Dual-Tier Optimization',
      category: 'AI Systems',
      rating: 'Healthy',
      statusDescription: 'Generating repetitive outbound outlines on dedicated deep models dilutes structural gross operating margins.',
      actionItem: 'Leverage the automated prompt Cognitive Router, directing lightweight operations to Gemini Flash and maintaining margins.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Board Reset Header */}
      <div className="bg-gradient-to-r from-teal-500/10 via-amber-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-amber-500/10 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                Board Strategic Alignment Deck
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Joint Governance Committee Council</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              EffectiveBuzz Corporate Strategic Reset Planning Suite
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Act as the Board of Directors to review core product domains, revenue monetization playbooks, global server architectures, and execute optimized 1-Year, 3-Year, and 5-Year expansion horizons.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-amber-400">
            <Landmark className="w-4 h-4 text-amber-400" />
            <span>Resolution: APPROVED FOR IMMEDIATE ROLLOUT</span>
          </div>
        </div>
      </div>

      {/* Dynamic Strategic Modulator Console */}
      <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-2.5">
          <Gauge className="w-5 h-5 text-amber-400" />
          <div>
            <h4 className="text-sm font-semibold text-white font-display font-bold">Dynamic Board-Level Decision Modulator</h4>
            <p className="text-[10px] text-gray-400 font-mono">Simulate the direct financial impact of executing our strategic directives simultaneously.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls section */}
          <div className="lg:col-span-7 space-y-4 font-mono text-xs text-zinc-300">
            {/* Slider: Deliverability Redirect */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-400 uppercase">PIVOT PRODUCT FOCUS (Deliverability vs Plain AI writing):</span>
                <span className="text-amber-400 font-bold">{strategicFulfill.productFocus}% focus</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={strategicFulfill.productFocus}
                onChange={(e) => setStrategicFulfill(prev => ({ ...prev, productFocus: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-amber-400"
              />
              <p className="text-[9px] text-gray-500">Redirects general writing assets to build Pre-Flight Spam Filters & diagnostic tools.</p>
            </div>

            {/* Switch Toggles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <button
                onClick={() => setStrategicFulfill(prev => ({ ...prev, expansionPricing: !prev.expansionPricing }))}
                className={`p-2.5 border rounded-lg text-left transition-all relative overflow-hidden flex flex-col justify-between h-20 ${
                  strategicFulfill.expansionPricing
                    ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-300'
                    : 'bg-transparent border-gray-800 text-gray-500 hover:text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[9px] tracking-wider uppercase font-bold">Seat Expanding</span>
                  <Lock className={`w-3.5 h-3.5 ${strategicFulfill.expansionPricing ? 'text-emerald-400 animate-pulse' : 'text-gray-600'}`} />
                </div>
                <div>
                  <strong className="block text-[10px] leading-tight">Mailbox Seat Charge</strong>
                  <span className="text-[8.5px] text-zinc-500 block mt-0.5">Charge $45/mo extra seat</span>
                </div>
              </button>

              <button
                onClick={() => setStrategicFulfill(prev => ({ ...prev, localHostingGCC: !prev.localHostingGCC }))}
                className={`p-2.5 border rounded-lg text-left transition-all relative overflow-hidden flex flex-col justify-between h-20 ${
                  strategicFulfill.localHostingGCC
                    ? 'bg-blue-500/5 border-blue-500/30 text-blue-300'
                    : 'bg-transparent border-gray-800 text-gray-500 hover:text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[9px] tracking-wider uppercase font-bold">Sovereign Pods</span>
                  <Globe className={`w-3.5 h-3.5 ${strategicFulfill.localHostingGCC ? 'text-blue-400' : 'text-gray-600'}`} />
                </div>
                <div>
                  <strong className="block text-[10px] leading-tight">GCC Moro Hosting</strong>
                  <span className="text-[8.5px] text-zinc-500 block mt-0.5">Bypass Middle East residency audits</span>
                </div>
              </button>

              <button
                onClick={() => setStrategicFulfill(prev => ({ ...prev, dualTierRouting: !prev.dualTierRouting }))}
                className={`p-2.5 border rounded-lg text-left transition-all relative overflow-hidden flex flex-col justify-between h-20 ${
                  strategicFulfill.dualTierRouting
                    ? 'bg-teal-500/5 border-teal-500/30 text-teal-300'
                    : 'bg-transparent border-gray-800 text-gray-500 hover:text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[9px] tracking-wider uppercase font-bold">Dual Router AI</span>
                  <Cpu className={`w-3.5 h-3.5 ${strategicFulfill.dualTierRouting ? 'text-teal-400' : 'text-gray-600'}`} />
                </div>
                <div>
                  <strong className="block text-[10px] leading-tight">Cognitive Router</strong>
                  <span className="text-[8.5px] text-zinc-500 block mt-0.5">Stabilize margins to Flash</span>
                </div>
              </button>
            </div>
          </div>

          {/* Results display panel */}
          <div className="lg:col-span-5 bg-slate-950 border border-gray-900 rounded-xl p-4.5 space-y-3 font-mono text-center">
            <span className="text-[9px] text-gray-500 block uppercase tracking-wider font-bold">Estimated Post-Reset Business Health</span>
            
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-2 border border-gray-900 rounded-lg bg-zinc-900/10">
                <span className="text-[8px] text-zinc-500 block">LOGO CHURN</span>
                <strong className={`text-base font-bold block mt-0.5 ${parseFloat(simulatedChurn) < 0.8 ? 'text-emerald-400' : 'text-amber-400'}`}>{simulatedChurn}%</strong>
                <span className="text-[7.5px] text-zinc-500 block mt-0.5">Target: &lt;0.5%</span>
              </div>

              <div className="p-2 border border-gray-900 rounded-lg bg-zinc-900/10">
                <span className="text-[8px] text-zinc-500 block">SIMULATED ARR</span>
                <strong className="text-base font-bold text-white block mt-0.5">${targetARR}M</strong>
                <span className="text-[7.5px] text-zinc-500 block mt-0.5">Growth Loop</span>
              </div>

              <div className="p-2 border border-gray-900 rounded-lg bg-zinc-900/10">
                <span className="text-[8px] text-zinc-500 block">BLENDED MARGIN</span>
                <strong className="text-base font-bold text-teal-400 block mt-0.5">{profitMargin}%</strong>
                <span className="text-[7.5px] text-zinc-500 block mt-0.5">SaaS Core</span>
              </div>
            </div>

            <div className="text-[10px] text-zinc-400 text-left bg-[#111827]/60 p-2.5 rounded border border-gray-900 leading-relaxed">
              <strong className="text-amber-400 block mb-0.5 text-[9px] uppercase font-bold">BOARD RECOMMENDATION SYNC:</strong>
              {parseFloat(simulatedChurn) < 0.8 
                ? "Perfect alignment achieved. Pivot toward deliverability protects brand equity, secures high annual retention and stabilizes ARR." 
                : "Active product pivot needed. Increase general deliverability engineering focus to reduce raw client campaign churn loops."
              }
            </div>
          </div>
        </div>
      </div>

      {/* Main Core Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Sidebar Selector */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-950 rounded-lg border border-gray-900 text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
            Strategic Horizon Portals
          </div>
          <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
            {[
              { id: '1yr', label: 'I. 1-Year Horizon Reset', icon: Zap, period: 'FY 2026/27 Focus', color: 'text-amber-400' },
              { id: '3yr', label: 'II. 3-Year Horizon Reset', icon: Globe, period: 'FY 2028 Scaling Node', color: 'text-indigo-400' },
              { id: '5yr', label: 'III. 5-Year Category Horizon', icon: Award, period: 'FY 2030 Hegemony', color: 'text-teal-400' }
            ].map((hz) => {
              const Icon = hz.icon;
              return (
                <button
                  key={hz.id}
                  onClick={() => setSelectedHorizon(hz.id as any)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                    selectedHorizon === hz.id
                      ? 'bg-[#111827] border-amber-500/50 text-white shadow-lg'
                      : 'bg-transparent border-slate-900 text-gray-400 hover:bg-[#111827]/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <Icon className={`w-4 h-4 ${hz.color}`} />
                    <strong className="font-display font-bold leading-none">{hz.label}</strong>
                  </div>
                  <p className="text-[10px] text-gray-500 pl-6 group-hover:text-gray-400">{hz.period}</p>
                </button>
              );
            })}
          </div>

          {/* Quick Pillars Assessment Status Tracker */}
          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-2.5 font-mono text-[10.5px]">
            <span className="text-[9px] text-amber-400 uppercase tracking-wider font-bold block mb-1">Board Assessment Status Matrix</span>
            
            <div className="flex gap-1.5 flex-wrap">
              {pillars.map((pil) => (
                <button
                  key={pil.id}
                  onClick={() => setSelectedPillar(selectedPillar === pil.id ? 'all' : pil.id)}
                  className={`px-2 py-1 rounded border text-[9px] uppercase font-bold transition-all cursor-pointer ${
                    selectedPillar === pil.id 
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                      : pil.rating === 'Urgent Reset'
                      ? 'bg-rose-500/5 border-rose-500/10 text-rose-400 hover:bg-rose-500/10'
                      : pil.rating === 'Optimizing'
                      ? 'bg-indigo-500/5 border-indigo-500/10 text-indigo-400 hover:bg-indigo-500/10'
                      : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10'
                  }`}
                >
                  {pil.category}
                </button>
              ))}
            </div>

            <p className="text-[9px] text-zinc-500 mt-2">Click categories to filter our deep status cards inside the secondary viewport.</p>
          </div>
        </div>

        {/* Viewport for Horizontals & Pillars */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl shadow-xl space-y-6">
          
          {/* Section A: Selected Horizon View */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4" /> Selected Strategic Corporate Horizon Blueprint
              </span>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded font-mono uppercase font-bold">
                {selectedHorizon === '1yr' ? '1-Year Execution' : selectedHorizon === '3yr' ? '3-Year Horizon' : '5-Year Vision'}
              </span>
            </div>

            {selectedHorizon === '1yr' && (
              <div className="space-y-3 font-mono text-xs text-zinc-300 leading-relaxed">
                <div className="p-3.5 bg-slate-950 border border-gray-900 rounded-xl space-y-2">
                  <span className="text-amber-400 font-bold uppercase text-[9.5px] block">1-Year Objective: Revenue & Deliverability Stabilization</span>
                  <p>
                    Ensure core domain preservation and prevent customer outbound campaigns from hitting spam filters. Change standard pricing matrices to enable landing seat gains.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  <div className="bg-slate-950 p-3 rounded-lg border border-gray-900 space-y-1">
                    <strong className="text-white text-[11px] block">Product & Churn Protection</strong>
                    <p className="text-zinc-400 text-[10px]">Implement the Deliverability Shield as a dynamic, high-margin $50/mo monthly plugin.</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-gray-900 space-y-1">
                    <strong className="text-white text-[11px] block">Hiring Priorities & Scale</strong>
                    <p className="text-zinc-400 text-[10px]">Hire 1 specialized Systems Architect and launch standard multicurrency Stripe billing.</p>
                  </div>
                </div>

                <div className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-lg text-amber-400 text-[10px] flex justify-between items-center">
                  <span><strong>FY26 ARR target:</strong> Crossing $3,500,000 threshold</span>
                  <span><strong>Blended Logo Churn goal:</strong> &lt; 0.5%</span>
                </div>
              </div>
            )}

            {selectedHorizon === '3yr' && (
              <div className="space-y-3 font-mono text-xs text-zinc-300 leading-relaxed">
                <div className="p-3.5 bg-slate-950 border border-gray-900 rounded-xl space-y-2">
                  <span className="text-indigo-400 font-bold uppercase text-[9.5px] block">3-Year Objective: Sovereign Cloud Nodes & Ecosystem Scale</span>
                  <p>
                    Scale EffectiveBuzz outward into highly restrictive healthcare, banking, and European/Middle East corporate entities by clearing regional residency security audits.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  <div className="bg-slate-950 p-3 rounded-lg border border-gray-900 space-y-1">
                    <strong className="text-white text-[11px] block">Sovereign Data Residency Pods</strong>
                    <p className="text-zinc-400 text-[10px]">Utilize Moro Hub UAE server hosts and Frankfurt AWS region hosts under a 40% GTM premium.</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-gray-900 space-y-1">
                    <strong className="text-white text-[11px] block">Certification Academy loops</strong>
                    <p className="text-zinc-400 text-[10px]">Accreditate independent RevOps integrators to drive indirect client lead acquisition channels.</p>
                  </div>
                </div>

                <div className="bg-indigo-500/5 border border-indigo-500/10 p-3 rounded-lg text-indigo-400 text-[10px] flex justify-between items-center">
                  <span><strong>FY28 NRR target:</strong> Exceeding 118% year-over-year</span>
                  <span><strong>Consolidated ARR:</strong> Scaling up past $12,000,000</span>
                </div>
              </div>
            )}

            {selectedHorizon === '5yr' && (
              <div className="space-y-3 font-mono text-xs text-zinc-300 leading-relaxed">
                <div className="p-3.5 bg-slate-950 border border-gray-900 rounded-xl space-y-2">
                  <span className="text-teal-400 font-bold uppercase text-[9.5px] block">5-Year Objective: Category Hegemony & M&A Readiness</span>
                  <p>
                    Transition the outbound application into an automatic, end-to-end Autonomous Revenue coordinator. Consolidate leading enterprise accounts to claim market dominant shares.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  <div className="bg-slate-950 p-3 rounded-lg border border-gray-900 space-y-1">
                    <strong className="text-white text-[11px] block">Self-Healed Sequence Loops</strong>
                    <p className="text-zinc-400 text-[10px]">Automate sequence adjustments and campaign status on actual reply detections without manual reps.</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-gray-900 space-y-1">
                    <strong className="text-white text-[11px] block">Liquidation & Scale Readiness</strong>
                    <p className="text-zinc-400 text-[10px]">Prepare corporate credentials and governance transparency for public markets or top strategic buyers.</p>
                  </div>
                </div>

                <div className="bg-teal-500/5 border border-teal-500/10 p-3 rounded-lg text-teal-400 text-[10px] flex justify-between items-center">
                  <span><strong>FY30 ARR target:</strong> Crossing $30,000,000 dominant scale</span>
                  <span><strong>Enterprise cohort mix:</strong> Representing 65% of entire MRR</span>
                </div>
              </div>
            )}
          </div>

          {/* Section B: Board Assessment Pillars Cards */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
              Core Corporate Audit Card Pillars
            </h4>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {pillars
                .filter((p) => selectedPillar === 'all' || p.id === selectedPillar)
                .map((pil) => {
                  return (
                    <div key={pil.id} className="p-3.5 bg-slate-950 border border-gray-900 rounded-lg space-y-2 hover:border-amber-500/10 transition-all font-mono text-xs">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span className={`p-1 rounded font-bold text-[9px] uppercase tracking-wide border ${
                            pil.rating === 'Urgent Reset'
                              ? 'bg-rose-500/5 border-rose-500/20 text-rose-400'
                              : pil.rating === 'Optimizing'
                              ? 'bg-indigo-500/5 border-indigo-500/20 text-indigo-400'
                              : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                          }`}>
                            {pil.rating}
                          </span>
                          <strong className="text-white text-[12px] font-display font-bold leading-tight">{pil.title}</strong>
                        </div>
                        <span className="text-[10px] text-zinc-500 block uppercase font-bold">{pil.category}</span>
                      </div>

                      <p className="text-zinc-400 text-[10.5px] leading-relaxed pl-1">
                        {pil.statusDescription}
                      </p>

                      <div className="bg-[#111827]/60 p-2.5 rounded border border-gray-950 text-[10px] leading-relaxed text-zinc-300">
                        <strong className="text-amber-400 uppercase tracking-wider text-[8.5px] block mb-1">Board Directive Priority action:</strong>
                        {pil.actionItem}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Simple Calendar icon
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} className={props.className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
