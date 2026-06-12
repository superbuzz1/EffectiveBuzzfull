import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, Sparkles, Scale, Percent, 
  ArrowUpRight, Landmark, Users, ChevronRight, Briefcase, 
  ShieldAlert, Layers, Play, Settings, RefreshCw, BarChart2,
  Calendar, CheckCircle2, ChevronDown, Award, Globe, Building2, Flame
} from 'lucide-react';

interface RevenueRecommendation {
  id: string;
  rank: number;
  title: string;
  expectedRoi: number;
  expectedAnnualYield: number;
  difficulty: 'Low' | 'Medium' | 'High';
  segment: 'SME' | 'Mid-Market' | 'Enterprise';
  problem: string;
  strategy: string;
}

export default function CROGrowthPlan() {
  const [activeTab, setActiveTab ] = useState<'funnel' | 'pricing' | 'recommendations' | 'quarterly' | 'scale_roadmap'>('scale_roadmap');
  const [scaleSubTab, setScaleSubTab] = useState<'hiring' | 'marketing' | 'sales' | 'cs' | 'timeline'>('timeline');
  
  // Dynamic pricing controls
  const [pricingScale, setPricingScale] = useState({
    growthBase: 95,
    proBase: 299,
    enterpriseBase: 3500,
    seatCost: 45,
    deliverabilityAddon: 50,
  });

  // Dynamic pipeline metrics
  const [pipelineMetrics, setPipelineMetrics] = useState({
    discoveryAmount: 1800000,
    discoveryWinRate: 10,
    pilotAmount: 1650000,
    pilotWinRate: 30,
    negotiationAmount: 1400000,
    negotiationWinRate: 60,
  });

  // Dynamic segment volumes
  const [segmentVolumes, setSegmentVolumes] = useState({
    smeCount: 420,
    midMarketCount: 181,
    enterpriseCount: 2,
  });

  // Calculating total weighted pipeline revenue
  const weightedDiscovery = (pipelineMetrics.discoveryAmount * pipelineMetrics.discoveryWinRate) / 100;
  const weightedPilot = (pipelineMetrics.pilotAmount * pipelineMetrics.pilotWinRate) / 100;
  const weightedNegotiation = (pipelineMetrics.negotiationAmount * pipelineMetrics.negotiationWinRate) / 100;
  const totalUnweightedPipeline = pipelineMetrics.discoveryAmount + pipelineMetrics.pilotAmount + pipelineMetrics.negotiationAmount;
  const totalWeightedPipeline = weightedDiscovery + weightedPilot + weightedNegotiation;
  const blendedWinRate = ((totalWeightedPipeline / totalUnweightedPipeline) * 100);

  // Calculating active MRR & ARR from configurations
  const activeSmeMrr = segmentVolumes.smeCount * pricingScale.growthBase;
  const activeMidMarketMrr = segmentVolumes.midMarketCount * pricingScale.proBase;
  const activeEnterpriseMrr = segmentVolumes.enterpriseCount * pricingScale.enterpriseBase;
  
  // Simulated seat expansions & deliverability addon attachment rates
  const simulatedSeatAddons = (segmentVolumes.smeCount * 0.15 * pricingScale.seatCost * 1.5) + (segmentVolumes.midMarketCount * 0.45 * pricingScale.seatCost * 3.5);
  const simulatedDeliverabilityAddons = (segmentVolumes.smeCount * 0.25 * pricingScale.deliverabilityAddon) + (segmentVolumes.midMarketCount * 0.60 * pricingScale.deliverabilityAddon);
  
  const totalBaseMrr = activeSmeMrr + activeMidMarketMrr + activeEnterpriseMrr;
  const totalAdditionalMrr = simulatedSeatAddons + simulatedDeliverabilityAddons;
  const totalMonthlyRevenues = totalBaseMrr + totalAdditionalMrr;
  const activeArr = totalMonthlyRevenues * 12;

  // Recommendations data
  const recommendations: RevenueRecommendation[] = [
    {
      id: 'residency',
      rank: 1,
      title: 'GCC Regional Sovereign Cloud & Moro Hub Surcharges',
      expectedRoi: 10.2,
      expectedAnnualYield: 480000,
      difficulty: 'High',
      segment: 'Enterprise',
      problem: 'Saudi and UAE enterprise pipeline holds $1.2M pending. Local hosting compliance laws explicitly forbid global multi-tenant databases.',
      strategy: 'Deploy dedicated localized database pods with Moro Hub inside Saudi Arabia or UAE, applying an active 40% GTM regional premium.'
    },
    {
      id: 'warmup',
      rank: 2,
      title: 'Active Deliverability Shield & Mailbox Warmup Bundle Add-on',
      expectedRoi: 8.8,
      expectedAnnualYield: 340000,
      difficulty: 'Low',
      segment: 'SME',
      problem: 'Customer domain health fluctuates during heavy outreach campaigns, causing early contract churn.',
      strategy: 'Standardize warmup capabilities as an automatic add-on ($50/mo list value), boosting customer activation metrics and mailbox security.'
    },
    {
      id: 'crm',
      rank: 3,
      title: 'Enterprise Bidirectional Salesforce & HubSpot Sync Premium',
      expectedRoi: 8.4,
      expectedAnnualYield: 290000,
      difficulty: 'Medium',
      segment: 'Enterprise',
      problem: 'Enterprise sales teams refuse manual spreadsheets, demanding native sync of sequences, status, and lead scoring.',
      strategy: 'Launch certified AppExchange connectors. Lock sync frequencies below 15-minute cycles inside the updated Premium Custom plans.'
    },
    {
      id: 'seat',
      rank: 4,
      title: 'SaaS Outbound Seat & Mailbox Scaling Surcharges',
      expectedRoi: 7.6,
      expectedAnnualYield: 220000,
      difficulty: 'Low',
      segment: 'Mid-Market',
      problem: 'Mid-market clients distribute single admin logins across infinite campaigns, bypassing natural scale monetization.',
      strategy: 'Include 3 mailboxes in standard plans, charging an active $45/mo for each extra seat to establish expansion-based loops.'
    },
    {
      id: 'var',
      rank: 5,
      title: 'Regional EMEA Value-Added Reseller (VAR) Certified Networks',
      expectedRoi: 7.2,
      expectedAnnualYield: 180000,
      difficulty: 'Medium',
      segment: 'Mid-Market',
      problem: 'Direct enterprise sales hiring inside non-domestic European regions is capital intensive and slow.',
      strategy: 'Partner with regional premium CRM integrators and RevOps advisors, offering 30% recurring Year-1 commissions to accelerate lead loops.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* CRO Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-indigo-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                Chief Revenue Officer Dashboard
              </span>
              <span className="text-[10px] text-gray-500 font-mono">CRO Board-Grade Pipeline & Monetization Analyzer</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              Enterprise Revenue Growth & Pipeline Expansion Plan
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Simulate customer GTM parameters, adjust seat/addon models, calculate weighted opportunities, and outline chronological revenue goals designed by the Sales Leadership Committee.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-emerald-400">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Target ROI Mode: Active</span>
          </div>
        </div>
      </div>

      {/* Main Dynamic High-Performance Output Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-emerald-500/10 transition-all">
          <span className="text-zinc-500 text-[9.5px] uppercase block tracking-wider font-bold">Simulated Active ARR</span>
          <strong className="text-2xl font-bold text-white block mt-0.5">${activeArr.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>MRR Rate: ${(totalMonthlyRevenues).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</span>
          </span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-[#818cf8]/10 transition-all">
          <span className="text-zinc-500 text-[9.5px] uppercase block tracking-wider font-bold">Unweighted GTM Pipeline</span>
          <strong className="text-2xl font-bold text-[#818cf8] block mt-0.5">${totalUnweightedPipeline.toLocaleString()}</strong>
          <span className="text-[10px] text-zinc-400 block">Total active institutional leads</span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-teal-500/10 transition-all">
          <span className="text-zinc-500 text-[9.5px] uppercase block tracking-wider font-bold">Pipeline Weighted Value</span>
          <strong className="text-2xl font-bold text-teal-400 block mt-0.5">${totalWeightedPipeline.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
          <span className="text-[10px] text-emerald-400">
            Blended Win Rate: {blendedWinRate.toFixed(1)}%
          </span>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-4.5 rounded-xl space-y-1 font-mono hover:border-amber-500/10 transition-all">
          <span className="text-zinc-500 text-[9.5px] uppercase block tracking-wider font-bold">GTM SaaS LTV-to-CAC Ratio</span>
          <strong className="text-2xl font-bold text-amber-400 block mt-0.5">9.1x</strong>
          <span className="text-[10px] text-zinc-500">Industry benchmark: &gt;3.0x</span>
        </div>
      </div>

      {/* Interactive Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Tab Selection Panel */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-950 rounded-lg border border-gray-900 text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
            Interactive Modules
          </div>
          <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
            {[
              { id: 'funnel', label: '1. Pipeline Yield Simulator', icon: Layers, desc: 'Calculate weighted values across funnel stages.', color: 'text-emerald-400' },
              { id: 'pricing', label: '2. Pricing & Expansion Engine', icon: Settings, desc: 'Model seat expansions & high-margin addons.', color: 'text-indigo-400' },
              { id: 'recommendations', label: '3. Impact-Ranked Options', icon: Scale, desc: 'Strategic priorities judged by direct ARR impact.', color: 'text-amber-400' },
              { id: 'quarterly', label: '4. Chronological Growth Plan', icon: Calendar, desc: 'The 4-Quarter GTM milestones model.', color: 'text-teal-400' },
              { id: 'scale_roadmap', label: '5. 10 to 100 Scaling Plan', icon: Users, desc: 'War Room: recruitment, outreach, & validation roadmap.', color: 'text-purple-400' }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                    activeTab === tab.id
                      ? 'bg-[#111827] border-emerald-500/50 text-white shadow-lg'
                      : 'bg-transparent border-slate-900 text-gray-400 hover:bg-[#111827]/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <Icon className={`w-4 h-4 ${tab.color}`} />
                    <strong className="font-display font-bold leading-none">{tab.label}</strong>
                  </div>
                  <p className="text-[10px] text-gray-500 pl-6 group-hover:text-gray-400">{tab.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Core Segments Details Container */}
          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-3 font-mono text-[10.5px]">
            <span className="text-[9px] text-[#10b981] uppercase tracking-wider font-bold block mb-1">Customer GTM Segment Mix</span>
            
            <div className="space-y-2 border-b border-gray-900 pb-2.5">
              <div className="flex justify-between items-center text-zinc-400">
                <span>SME Cohort:</span>
                <span className="text-white font-bold">{segmentVolumes.smeCount} Accounts</span>
              </div>
              <input
                type="range"
                min="100"
                max="800"
                step="20"
                value={segmentVolumes.smeCount}
                onChange={(e) => setSegmentVolumes(prev => ({ ...prev, smeCount: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            <div className="space-y-2 border-b border-gray-900 pb-2.5">
              <div className="flex justify-between items-center text-zinc-400">
                <span>Mid-Market Cohort:</span>
                <span className="text-white font-bold">{segmentVolumes.midMarketCount} Accounts</span>
              </div>
              <input
                type="range"
                min="50"
                max="350"
                step="10"
                value={segmentVolumes.midMarketCount}
                onChange={(e) => setSegmentVolumes(prev => ({ ...prev, midMarketCount: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-indigo-400"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-zinc-400">
                <span>Enterprise Cohort:</span>
                <span className="text-white font-bold">{segmentVolumes.enterpriseCount} Accounts</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={segmentVolumes.enterpriseCount}
                onChange={(e) => setSegmentVolumes(prev => ({ ...prev, enterpriseCount: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Tab Viewport Grid */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl shadow-xl">
          
          {/* Funnel Yield View */}
          {activeTab === 'funnel' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Multi-Stage Pipeline GTM Simulator
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded font-mono uppercase font-bold">
                  Funnel Model
                </span>
              </div>

              <div className="space-y-5 font-mono text-xs">
                {/* Discovery details */}
                <div className="bg-slate-950 p-4 rounded-xl border border-gray-900 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <strong className="text-white text-sm">Stage 1: Discovery / Pipeline Building</strong>
                      <p className="text-[10px] text-gray-500 mt-0.5">Initial outbound sequences and product demo meetings booked.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 block uppercase">Weighted Value</span>
                      <strong className="text-white font-bold">${weightedDiscovery.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#10b981] uppercase block">STAGE VOL_VALUE:</span>
                      <strong className="text-white text-xs block">${pipelineMetrics.discoveryAmount.toLocaleString()}</strong>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-zinc-500 uppercase block">Expected Win Rate:</span>
                        <span className="text-emerald-400 font-bold">{pipelineMetrics.discoveryWinRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="25"
                        step="1"
                        value={pipelineMetrics.discoveryWinRate}
                        onChange={(e) => setPipelineMetrics(prev => ({ ...prev, discoveryWinRate: parseInt(e.target.value) }))}
                        className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-emerald-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Pilot details */}
                <div className="bg-slate-950 p-4 rounded-xl border border-gray-900 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <strong className="text-white text-sm">Stage 2: Pilot / Interactive Evaluation</strong>
                      <p className="text-[10px] text-gray-500 mt-0.5">Two-week pilot trials connected with actual client company domains.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 block uppercase">Weighted Value</span>
                      <strong className="text-white font-bold">${weightedPilot.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] text-indigo-400 uppercase block">STAGE VOL_VALUE:</span>
                      <strong className="text-white text-xs block">${pipelineMetrics.pilotAmount.toLocaleString()}</strong>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-zinc-500 uppercase block">Expected Win Rate:</span>
                        <span className="text-indigo-400 font-bold">{pipelineMetrics.pilotWinRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="55"
                        step="5"
                        value={pipelineMetrics.pilotWinRate}
                        onChange={(e) => setPipelineMetrics(prev => ({ ...prev, pilotWinRate: parseInt(e.target.value) }))}
                        className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-indigo-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Negotiation details */}
                <div className="bg-slate-950 p-4 rounded-xl border border-gray-900 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <strong className="text-white text-sm">Stage 3: Negotiation / Contract Closure</strong>
                      <p className="text-[10px] text-gray-500 mt-0.5">Procurement reviews, SOC 2 clearance, SLA/legal co-sign actions.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 block uppercase">Weighted Value</span>
                      <strong className="text-white font-bold">${weightedNegotiation.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] text-amber-400 uppercase block">STAGE VOL_VALUE:</span>
                      <strong className="text-white text-xs block">${pipelineMetrics.negotiationAmount.toLocaleString()}</strong>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-zinc-500 uppercase block">Expected Win Rate:</span>
                        <span className="text-amber-400 font-bold">{pipelineMetrics.negotiationWinRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="90"
                        step="5"
                        value={pipelineMetrics.negotiationWinRate}
                        onChange={(e) => setPipelineMetrics(prev => ({ ...prev, negotiationWinRate: parseInt(e.target.value) }))}
                        className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing & Expansion View */}
          {activeTab === 'pricing' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Settings className="w-4 h-4" /> SaaS Pricing & Expansion Model Calculator
                </span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">
                  Scale Factors
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                {/* Cohort Base Prices card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-gray-900 space-y-4">
                  <h5 className="font-bold text-stone-200 text-xs border-b border-gray-900 pb-1.5">
                    Model Cohort Base Subscription Pricing
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-zinc-500 uppercase block">SME Base Plan:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-400">$</span>
                        <input
                          type="number"
                          value={pricingScale.growthBase}
                          onChange={(e) => setPricingScale(prev => ({ ...prev, growthBase: Math.max(1, parseInt(e.target.value) || 0) }))}
                          className="bg-slate-900 border border-slate-800 text-white rounded px-2 py-1 w-full font-bold focus:outline-none focus:border-emerald-500/40"
                        />
                        <span className="text-zinc-500">/mo</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] text-zinc-500 uppercase block">Mid-Market Base Plan:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-400">$</span>
                        <input
                          type="number"
                          value={pricingScale.proBase}
                          onChange={(e) => setPricingScale(prev => ({ ...prev, proBase: Math.max(1, parseInt(e.target.value) || 0) }))}
                          className="bg-slate-900 border border-slate-800 text-white rounded px-2 py-1 w-full font-bold focus:outline-none focus:border-indigo-500/40"
                        />
                        <span className="text-zinc-500">/mo</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] text-zinc-500 uppercase block">Enterprise Base Plan:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-400">$</span>
                        <input
                          type="number"
                          value={pricingScale.enterpriseBase}
                          onChange={(e) => setPricingScale(prev => ({ ...prev, enterpriseBase: Math.max(1, parseInt(e.target.value) || 0) }))}
                          className="bg-slate-900 border border-slate-800 text-white rounded px-2 py-1 w-full font-bold focus:outline-none focus:border-amber-500/40"
                        />
                        <span className="text-zinc-500">/mo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expansion Addons Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-gray-900 space-y-3">
                    <span className="text-[9px] text-emerald-400 uppercase tracking-wider font-bold block">1. Outbound Mailbox Seat Expansion Surcharges</span>
                    <p className="text-[10px] text-zinc-400 leading-relaxed">
                      SDR scale drives seats. Every custom domain mailbox added beyond standard platform allowances is billed monthly.
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-910 pt-2 text-[10.5px]">
                      <span className="text-zinc-500">Proposed Seat Price:</span>
                      <div className="flex items-center gap-1">
                        <span className="text-zinc-400">$</span>
                        <input
                          type="number"
                          value={pricingScale.seatCost}
                          onChange={(e) => setPricingScale(prev => ({ ...prev, seatCost: Math.max(1, parseInt(e.target.value) || 0) }))}
                          className="bg-slate-900 border border-slate-800 text-white font-bold rounded px-1.5 py-0.5 w-14 text-center"
                        />
                        <span className="text-zinc-500">/mo</span>
                      </div>
                    </div>
                    <div className="bg-slate-900/40 p-2 rounded text-[10px] text-[#10b981]">
                      <strong>Target Expansion MRR:</strong> ${(simulatedSeatAddons).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-gray-900 space-y-3">
                    <span className="text-[9px] text-indigo-400 uppercase tracking-wider font-bold block">2. Deliverability Protection Warmup bundle Addon</span>
                    <p className="text-[10px] text-zinc-400 leading-relaxed">
                      Packaged diagnostics and active deliverability protection to ensure clean sender authority records.
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-910 pt-2 text-[10.5px]">
                      <span className="text-zinc-500">Warmup Addon Price:</span>
                      <div className="flex items-center gap-1">
                        <span className="text-zinc-400">$</span>
                        <input
                          type="number"
                          value={pricingScale.deliverabilityAddon}
                          onChange={(e) => setPricingScale(prev => ({ ...prev, deliverabilityAddon: Math.max(1, parseInt(e.target.value) || 0) }))}
                          className="bg-slate-900 border border-slate-800 text-white font-bold rounded px-1.5 py-0.5 w-14 text-center"
                        />
                        <span className="text-zinc-500">/mo</span>
                      </div>
                    </div>
                    <div className="bg-slate-900/40 p-2 rounded text-[10px] text-[#818cf8]">
                      <strong>Target Expansion MRR:</strong> ${(simulatedDeliverabilityAddons).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Impact-Ranked Recommendations */}
          {activeTab === 'recommendations' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Scale className="w-4 h-4" /> CRO Revenue Expansion recommendations (Ranked by impact)
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">
                  GTM Priorities
                </span>
              </div>

              <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
                {recommendations.map((rec) => {
                  return (
                    <div key={rec.id} className="p-4 bg-slate-950 border border-gray-900 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-amber-500/20 transition-all font-mono text-xs">
                      <div className="space-y-1.5 md:max-w-[75%]">
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold px-1.5 py-0.5 rounded text-[9px]">
                            Rank {rec.rank}
                          </span>
                          <span className="text-[9px] text-zinc-500">Cohort Weight: {rec.segment}</span>
                          <span className="bg-slate-900 border border-slate-800 text-stone-400/90 font-semibold px-1.5 py-0.5 rounded text-[8.5px]">
                            Difficulty: {rec.difficulty}
                          </span>
                        </div>
                        <strong className="text-white text-sm font-display leading-tight">{rec.title}</strong>
                        
                        <div className="space-y-1 text-[11px] leading-relaxed pt-1.5 border-t border-slate-900/60">
                          <p className="text-zinc-500">
                            <strong className="text-rose-400 uppercase text-[9px] mr-1">Pain Point:</strong>
                            {rec.problem}
                          </p>
                          <p className="text-zinc-300">
                            <strong className="text-emerald-400 uppercase text-[9px] mr-1">Strategy:</strong>
                            {rec.strategy}
                          </p>
                        </div>
                      </div>

                      <div className="text-left md:text-right w-full md:w-auto shrink-0 border-t md:border-t-0 border-gray-950 pt-2.5 md:pt-0 flex md:flex-col justify-between items-center md:items-end">
                        <span className="text-[8.5px] text-zinc-500 uppercase block leading-none">Expected Yield / Yr</span>
                        <strong className="text-emerald-400 text-sm font-bold block mt-1">${rec.expectedAnnualYield.toLocaleString()}</strong>
                        <span className="text-[10px] text-amber-400 font-bold mt-1 inline-flex items-center gap-1 font-mono">
                          {rec.expectedRoi}x ROI <ArrowUpRight className="w-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chronological 4-Quarter Growth Plan */}
          {activeTab === 'quarterly' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Chronological 4-Quarter Revenue Growth Blueprint
                </span>
                <span className="text-[10px] bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">
                  FY 2026/27 Plan
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl flex items-center gap-3">
                  <Flame className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div className="font-mono text-xs text-zinc-400">
                    <strong>Growth Mandate:</strong> Push unweighted pipelines to $8M+ with optimized seat monetizations, local residency surcharges, and partner-sourced EMEA channels. Target Net Revenues Retention exceeding <strong>118%</strong> over 12 months.
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      quarter: 'Phase I: Q3 2026',
                      title: 'Delivery & Expansion Protection',
                      details: 'Launch mailbox warmup addons ($50/mo), seat expansions ($45/mo) in Stripe base, and automatic alert blocks to sustain clean domain authority.',
                      metrics: 'Logo Churn Goal: < 0.6% / Mo'
                    },
                    {
                      quarter: 'Phase II: Q4 2026',
                      title: 'Enterprise Sync & Integrations',
                      details: 'Ship certified Salesforce/HubSpot bidirectional GTM sync packages, standardize upfront annual contracts block discounts (-15%), and launch Euro-regional database infrastructure pods.',
                      metrics: 'Enterprise Pipeline Gain: +30%'
                    },
                    {
                      quarter: 'Phase III: Q1 2027',
                      title: 'Sovereign Middle East Launch',
                      details: 'Launch GCC local database node hosts through Moro Hub. Open Middle East institutional pipelines, applying standard 40% GTM compliance premiums.',
                      metrics: 'Est GCC ARR Intake: $450k+'
                    },
                    {
                      quarter: 'Phase IV: Q2 2027',
                      title: 'Capital Optimization & Scale',
                      details: 'Scale out local EMEA channel resellers. Expand enterprise tier weights to represent over 40% of total active business ARR targets.',
                      metrics: 'Blended GTM Win Rate: > 28.5%'
                    }
                  ].map((p, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-gray-900 space-y-2 hover:border-teal-500/20 transition-all font-mono text-xs">
                      <div className="flex justify-between items-center text-teal-400">
                        <strong className="text-white text-xs leading-none">{p.quarter}</strong>
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                      </div>
                      <strong className="text-zinc-200 block text-sm font-display leading-tight">{p.title}</strong>
                      <p className="text-zinc-400 leading-relaxed text-[11px]">{p.details}</p>
                      
                      <div className="bg-slate-900/40 p-2 rounded text-[10px] text-emerald-400 font-semibold mt-1">
                        {p.metrics}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scale 10 to 100 Customers Strategic War Room Tab */}
          {activeTab === 'scale_roadmap' && (
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-gray-800 pb-4 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-purple-400" /> 10 to 100 Paying Customers Scaling War Room
                  </span>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                    A comprehensive, high-velocity blueprint to scale EffectiveBuzz subscription revenues from the early Closed Beta cohort to 100 premium paying accounts.
                  </p>
                </div>
                
                {/* Cohort Progress indicator */}
                <div className="flex items-center gap-4 bg-slate-950 p-2.5 border border-gray-900 rounded-xl font-mono text-xs max-w-sm shrink-0">
                  <div className="space-y-1 w-full">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-zinc-500 uppercase">Target Velocity</span>
                      <span className="text-purple-400 font-bold">10% of 100 Target</span>
                    </div>
                    <div className="w-32 bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full animate-pulse" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  <div className="shrink-0 text-center px-2 py-0.5 border-l border-zinc-900">
                    <span className="text-[9px] text-zinc-400 block leading-none">Status</span>
                    <strong className="text-emerald-400 text-xs block mt-0.5 font-bold">10 Active</strong>
                  </div>
                </div>
              </div>

              {/* Subtab Selector */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-gray-900 font-mono text-xs">
                {[
                  { id: 'timeline', label: 'Chronological Roadmap', color: 'border-purple-500/30 text-purple-400' },
                  { id: 'hiring', label: 'Hiring Plan', color: 'border-blue-500/30 text-blue-400' },
                  { id: 'marketing', label: 'Marketing Plan', color: 'border-emerald-500/30 text-emerald-400' },
                  { id: 'sales', label: 'Sales Process Plan', color: 'border-amber-500/30 text-amber-400' },
                  { id: 'cs', label: 'Customer Success & NDR Plan', color: 'border-pink-500/30 text-pink-400' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setScaleSubTab(st.id as any)}
                    className={`px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                      scaleSubTab === st.id
                        ? 'bg-slate-900 border-purple-500 text-white shadow'
                        : 'bg-transparent border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Subtab Viewports */}
              <div className="space-y-4 animate-fadeIn">
                {/* 1. CHRONOLOGICAL ROADMAP TIMELINE */}
                {scaleSubTab === 'timeline' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-950/15 border border-purple-900/30 rounded-xl">
                      <h4 className="text-sm font-semibold text-white font-display mb-1 flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-purple-400 animate-pulse" />
                        Execution Milestones: Scale 10 to 100 Paying Users
                      </h4>
                      <p className="text-xs text-zinc-405 leading-relaxed font-sans">
                        Our path is structured into 3 high-performance growth phases. Each cohort transition unlocks targeted hires, content triggers, and specialized pricing structures to boost LTV over 9x.
                      </p>
                    </div>

                    <div className="relative border-l border-zinc-800 ml-3 space-y-5 pt-2 pb-2">
                      {[
                        {
                          phase: 'Phase 1: Founder-Led Foundation (10 to 30 Customers)',
                          focus: 'Focus: Clean execution loops, product stabilization, & organic referral channels.',
                          items: [
                            'Founder acts as main SDR/AE to refine outreach copy & templates.',
                            'Hire first outbound AE assistant to take over introductory qualifications.',
                            'Establish the "Powered by EffectiveBuzz" footer virality inside every campaign email.',
                            'Validate customer pricing and upsell addons on the Starter plans ($95/mo -> $299/mo).'
                          ],
                          status: 'Current'
                        },
                        {
                          phase: 'Phase 2: Outreach Acceleration (30 to 60 Customers)',
                          focus: 'Focus: Launch lead generation agency bundles & bidirectional CRM synchronization.',
                          items: [
                            'Hire a dedicated customer success engineer to guarantee inbox placement SLAs.',
                            'Roll out the HubSpot and Salesforce native bidirectional data sync premiums.',
                            'Establish premium whitelabel panels optimized for marketing & sales agencies who provision accounts for clients.',
                            'Execute 2 co-marketing webinars with CRM integrations and sales consultants.'
                          ],
                          status: 'Upcoming'
                        },
                        {
                          phase: 'Phase 3: Automated Outbound Scale (60 to 100 Customers)',
                          focus: 'Focus: Full sales-rep deployment and systematic cold channel scaling.',
                          items: [
                            'Hire 1 Head of Growth / Senior Sales Leader to run outreach loops systematically.',
                            'Deploy localized Middle East database pods to capture enterprise deals in GCC regions.',
                            'Standardize the expansion seat triggers charging an active $45/mo for additional mailboxes.',
                            'Launch a comprehensive delivery health diagnostic tool to attract high-volume inbound leads.'
                          ],
                          status: 'Locked'
                        }
                      ].map((p, idx) => (
                        <div key={idx} className="relative pl-6 group">
                          <div className="absolute -left-[4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-purple-950/50 group-hover:scale-125 transition-all"></div>
                          <div className="space-y-1.5 p-4 bg-slate-950 border border-gray-905 rounded-xl hover:border-purple-500/20 transition-all font-mono text-xs">
                            <div className="flex justify-between items-center border-b border-gray-900 pb-1.5">
                              <strong className="text-white text-xs leading-none font-display font-bold">{p.phase}</strong>
                              <span className="text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 rounded font-mono font-bold uppercase tracking-wider">
                                {p.status}
                              </span>
                            </div>
                            <em className="text-purple-300 block text-[11px] not-italic font-semibold">{p.focus}</em>
                            
                            <ul className="space-y-1 pl-4 list-disc text-zinc-400 text-[11px] leading-relaxed">
                              {p.items.map((it, i) => (
                                <li key={i}>{it}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. HIRING PLAN */}
                {scaleSubTab === 'hiring' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: 'Outbound AE (Account Executive)',
                          timeframe: 'M1 (Hire at 15 Customers)',
                          role: 'Transition founder-led demo conversations into a repeatable sales process, qualifying daily trial signups and outbound leads.',
                          skills: 'Strong cold calling, outbound cadence management, CRM operations, & product demo loops.',
                          salary: 'Base + Commission'
                        },
                        {
                          title: 'Lead Gen / Scraping Specialist',
                          timeframe: 'M2 (Hire at 30 Customers)',
                          role: 'Own lead discovery, scraping, list cleaning, proxy domain cooling, and enrichment operations inside EffectiveBuzz.',
                          skills: 'GraphQL, custom APIs, scraping proxies, DMARC/SPF technical configurations.',
                          salary: 'FTE Contract'
                        },
                        {
                          title: 'Customer Success Specialist',
                          timeframe: 'M3 (Hire at 50 Customers)',
                          role: 'Manage onboarding audits, email delivery troubleshooting, client training, and expansion upsells.',
                          skills: 'Customer advocacy, deliverability logs auditing, mailbox warmups, & churn mitigation.',
                          salary: 'FTE Salary'
                        },
                        {
                          title: 'VP of Growth / Head of Sales',
                          timeframe: 'M4 (Hire at 70+ Customers)',
                          role: 'Design high-volume channel strategies, recruit sales reps, establish revenue agency partner pipelines, and drive ARR loops.',
                          skills: 'Sales leadership, enterprise playbook formulation, EMEA agency negotiations.',
                          salary: 'FTE + Equity Options'
                        }
                      ].map((h, i) => (
                        <div key={i} className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-3 font-mono text-xs hover:border-blue-500/20 transition-all">
                          <div className="flex justify-between items-start border-b border-gray-900 pb-2">
                            <div>
                              <strong className="text-white text-sm font-display block leading-tight">{h.title}</strong>
                              <span className="text-[10px] text-blue-400 font-bold block mt-0.5">{h.timeframe}</span>
                            </div>
                            <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded text-[9px] font-bold">
                              {h.salary}
                            </span>
                          </div>
                          
                          <div className="space-y-1.5 text-[11px] leading-relaxed">
                            <p className="text-zinc-400">
                              <strong className="text-stone-300 block text-[9.5px] uppercase">Core Mission:</strong>
                              {h.role}
                            </p>
                            <p className="text-zinc-500">
                              <strong className="text-stone-300 block text-[9.5px] uppercase mt-1.5">Required Skills:</strong>
                              {h.skills}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. MARKETING PLAN */}
                {scaleSubTab === 'marketing' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-3 font-mono text-xs hover:border-emerald-500/20 transition-all">
                        <span className="text-[9px] text-emerald-400 uppercase tracking-wider font-bold block">1. Outbound Cold Campaigns</span>
                        <p className="text-zinc-405 leading-relaxed text-[11px]">
                          Erect automated high-relevancy cold outreach cycles targeting VPs of Sales and Sales Operations inside fast-growing B2B software companies and marketing agencies.
                        </p>
                        <div className="bg-slate-900/60 p-2.5 rounded border border-gray-900 text-[10px] space-y-1.5 leading-relaxed text-zinc-450">
                          <strong>Playbook Formula:</strong>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Warm up 15 distinct custom domains for 21 days.</li>
                            <li>Dispatch high-relevancy sequences containing custom audit links.</li>
                            <li>Target daily payload: 150 emails/day per proxy sender.</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-3 font-mono text-xs hover:border-emerald-500/20 transition-all">
                        <span className="text-[9px] text-emerald-400 uppercase tracking-wider font-bold block">2. Inbound Deliverability Lead Magnet</span>
                        <p className="text-zinc-405 leading-relaxed text-[11px]">
                          Publish deep-dive technical guidelines, email copy templates, and live SPF/DKIM record debugging tools under the public platform domain.
                        </p>
                        <div className="bg-slate-900/60 p-2.5 rounded border border-gray-900 text-[10px] space-y-1.5 leading-relaxed text-zinc-450">
                          <strong>Deliverable Focus:</strong>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>DMARC compliance guidelines for Google & Yahoo security shifts.</li>
                            <li>Online free tool: Validate domain spam score & records.</li>
                            <li>Weekly build-in-public conversion posts on Twitter and LinkedIn.</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-3 font-mono text-xs md:col-span-2 hover:border-emerald-500/20 transition-all">
                        <span className="text-[9px] text-emerald-400 uppercase tracking-wider font-bold block">3. Viral Signature Footers</span>
                        <p className="text-zinc-400 leading-relaxed text-[11px]">
                          Leverage outgoing automated campaign volumes. Add highly subtle, customizable &quot;Powered by EffectiveBuzz Outbox&quot; links in the footer of emails sent by trial tier users. This turns every user email campaign into passive viral conversion points.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. SALES PLAN */}
                {scaleSubTab === 'sales' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-3 font-mono text-xs hover:border-amber-500/20 transition-all">
                        <span className="text-[9px] text-amber-400 uppercase tracking-wider font-bold block">High-Intent Outbound Play</span>
                        <p className="text-zinc-405 leading-relaxed text-[11px]">
                          Our outbound sales strategy isn&apos;t blind pitch logs. Focus purely on demonstrating value before the call is even booked.
                        </p>
                        <ul className="space-y-2 text-[10.5px] text-zinc-300 leading-relaxed border-t border-gray-900 pt-2">
                          <li className="flex gap-1.5">
                            <span className="text-emerald-400">⚡</span>
                            <span>Scrape target marketing agencies utilizing basic active outreach.</span>
                          </li>
                          <li className="flex gap-1.5">
                            <span className="text-emerald-400">⚡</span>
                            <span>Generate a custom dynamic deliverability score report for their agency domains.</span>
                          </li>
                          <li className="flex gap-1.5">
                            <span className="text-emerald-400">⚡</span>
                            <span>Attach this diagnostic report to emails asking for a 15-minute optimization audit demo.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-3 font-mono text-xs hover:border-amber-500/20 transition-all">
                        <span className="text-[9px] text-amber-400 uppercase tracking-wider font-bold block">Trial Conversion Milestones</span>
                        <p className="text-zinc-405 leading-relaxed text-[11px]">
                          Optimize our onboarding funnels to make sure users experience &quot;Magic Time&quot; (Time to First Outbox Launch) in less than 5 minutes.
                        </p>
                        <ul className="space-y-2 text-[10.5px] text-zinc-300 leading-relaxed border-t border-gray-900 pt-2">
                          <li className="flex gap-1.5">
                            <span className="text-emerald-400">🎯</span>
                            <span>First-minute DNS autocheck: Wizard guides the user through instant SPF/DKIM copy-paste tasks.</span>
                          </li>
                          <li className="flex gap-1.5">
                            <span className="text-emerald-400">🎯</span>
                            <span>Third-minute lead scraping test: Let them run 20 contacts list queries for free.</span>
                          </li>
                          <li className="flex gap-1.5">
                            <span className="text-emerald-400">🎯</span>
                            <span>Fifth-minute sequence dispatch: Launch outbound validation campaign.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. CUSTOMER SUCCESS & NDR */}
                {scaleSubTab === 'cs' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-3 font-mono text-xs hover:border-pink-500/20 transition-all">
                        <span className="text-[9px] text-pink-400 uppercase tracking-wider font-bold block">Preventing Early Domain Churn</span>
                        <p className="text-zinc-405 leading-relaxed text-[11px]">
                          Cold email setups face structural churn when campaigns damage user sender credentials. We deploy an automatic safety barrier.
                        </p>
                        <div className="bg-slate-900/60 p-2 rounded text-[10px] text-pink-300 space-y-1 leading-relaxed">
                          <strong className="text-stone-300">Active Safety Shields:</strong>
                          <p className="text-zinc-400 text-[11px]">
                            Auto-pause outbound campaigns if bounce rates cross 5.0% or if domain checks identify DMARC/SPF misalignment events. Maintain baseline domain spam logs in the platform.
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-950 border border-gray-900 p-4 rounded-xl space-y-3 font-mono text-xs hover:border-pink-500/20 transition-all">
                        <span className="text-[9px] text-pink-400 uppercase tracking-wider font-bold block">SaaS seat expansion strategy</span>
                        <p className="text-zinc-405 leading-relaxed text-[11px]">
                          Generate secondary revenues through custom seats and deliverability protection addons (targeting NDR &gt; 120%).
                        </p>
                        <div className="bg-slate-900/60 p-2 rounded text-[10px] text-pink-300 space-y-1 leading-relaxed">
                          <strong className="text-stone-300">Expansion Triggers:</strong>
                          <p className="text-zinc-400 text-[11px]">
                            Upsell users automatically when daily output hits capacity limits, charging $45/mo for extra custom mailbox channels and $50/mo for advanced inbox cooling proxies.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
