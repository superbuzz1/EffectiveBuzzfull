import React, { useState } from 'react';
import { 
  Compass, Sparkles, TrendingUp, Cpu, Settings, DollarSign, 
  Activity, FileText, CheckCircle2, ArrowRight, Landmark, ChevronRight, 
  Scale, XOctagon, ArrowUpRight, Percent, Briefcase, Award, Cloud, 
  BookOpen, ThumbsUp, HelpCircle, Heart, ShieldAlert, AlertTriangle, 
  Check, RefreshCw, BarChart3, Database, MessageSquare, Flame, Layers
} from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  category: string;
  description: string;
  targetMetric: string;
  estimatedEffort: string;
  estimatedRoi: string;
  strategicRationale: string;
}

export default function CPOQuarterlyRoadmap() {
  const [activeView, setActiveView] = useState<'all' | 'now' | 'later' | 'discard' | 'recommendations'>('all');
  const [roadmapMetrics, setRoadmapMetrics] = useState({
    featureRequests: 740,        // number of requests this quarter
    apiUsageGrowth: 85,          // % growth YoY
    customerCsat: 82,            // % CSAT score
    churnRate: 0.72,             // % monthly logo churn
  });

  // Dynamic status/warning states based on metric sliders
  const isChurnAlert = roadmapMetrics.churnRate > 1.5;
  const isCsatCritical = roadmapMetrics.customerCsat < 75;
  const isApiSpiking = roadmapMetrics.apiUsageGrowth > 100;

  // Let's model a robust collection of CPO roadmap items
  const featuresNow: FeatureItem[] = [
    {
      id: 'preflight-shield',
      title: 'Pre-Flight Deliverability Shield',
      category: 'Deliverability',
      description: 'An active content parser and spam evaluator that blocks outbound sequences containing high-risk phrases before they can tarnish corporate domains.',
      targetMetric: isChurnAlert ? 'CRITICAL Churn Mitigation' : 'Core Logo Retention & Domain Health',
      estimatedEffort: 'Medium',
      estimatedRoi: '9.8x',
      strategicRationale: 'SDR outbound campaign performance is directly dependent on domain health. Protecting primary customer domains dramatically extends user contracts and lifetime value.'
    },
    {
      id: 'dual-router',
      title: 'Dual-Tier LLM Cognitive Router',
      category: 'AI Core',
      description: 'An automated prompt router directing standard lead categorization queries to fast, cost-effective models (Gemini Flash), reserving deep reasoning operations to advanced reasoning models.',
      targetMetric: isApiSpiking ? 'CRITICAL Margin Stabilization' : 'Operating Cost Reduction & Query Latency',
      estimatedEffort: 'Medium',
      estimatedRoi: '8.4x',
      strategicRationale: `API logs show high volume. Routing queries dynamically maintains our ${isApiSpiking ? 'spiking' : 'stable'} gross operating margins of 81.4%.`
    },
    {
      id: 'crm-sync',
      title: 'Bidirectional Salesforce & HubSpot Sync Driver',
      category: 'Integrations',
      description: 'Direct system connectors pulling contact lists, logging active conversation notes, synchronizing sequence status, and pushing qualified leads directly inside native target CRM environments.',
      targetMetric: 'Enterprise Average Contract Value (ACV)',
      estimatedEffort: 'High',
      estimatedRoi: '7.8x',
      strategicRationale: 'Enterprise RevOps teams refuse to maintain separate isolated data lists. Deep bidirectional sync drivers embed EffectiveBuzz directly inside their Daily workflow.'
    }
  ];

  const featuresLater: FeatureItem[] = [
    {
      id: 'localized-pods',
      title: 'Frankfurt (eu-central-1) AWS Local Database Pods',
      category: 'Security',
      description: 'Deploy physically isolated multi-tenant database systems and encrypted pgvector clusters locally to support GDPR sovereign compliance requirements.',
      targetMetric: 'Western Europe Pipeline Conversions (DACH/Nordics)',
      estimatedEffort: 'High',
      estimatedRoi: '6.9x',
      strategicRationale: 'Clears sovereign regulatory objections for heavy EU enterprise contracts, currently blocking $1.4M in potential strategic pipeline.'
    },
    {
      id: 'onboarding-wizard',
      title: 'DNS Setup Health Wizard & Domain Auto-Verification',
      category: 'Deliverability',
      description: 'An interactive, step-by-step diagnostic panel that validates custom DNS settings including SPF, DKIM, and DMARC instantly with guided copy-paste directives.',
      targetMetric: isCsatCritical ? 'CRITICAL CSAT Lift' : 'Onboarding Time-To-Value & User Activation',
      estimatedEffort: 'Low',
      estimatedRoi: '6.2x',
      strategicRationale: 'Speeds up workspace activation rates and reduces technical support ticket overhead, which currently represents 42% of customer setup calls.'
    },
    {
      id: 'certified-academies',
      title: 'Unified accredited "Autonomous Revenue Engineer" Framework',
      category: 'Ecosystem',
      description: 'Publish accredited educational curriculums, level-1 video tutorials, and interactive testing environments to turn external RevOps consultants into certified advocates.',
      targetMetric: 'Organic Referral Loops & Total CAC Reduction',
      estimatedEffort: 'Medium',
      estimatedRoi: '5.8x',
      strategicRationale: 'Leverages modern agency channels and certified advocates to sourcing warm institutional accounts, creating a capital-efficient acquisition pipeline.'
    }
  ];

  const featuresDiscarded: FeatureItem[] = [
    {
      id: 'proprietary-llm',
      title: 'Proprietary B2B Foundation Outreach LLM',
      category: 'AI Core',
      description: 'Construct, pre-train, and host our own base sequence generation model on dedicated high-performance GPU instances.',
      targetMetric: 'Marginal Token Cost Optimization',
      estimatedEffort: 'EXTREMELY High',
      estimatedRoi: '0.1x (Negative)',
      strategicRationale: 'Pre-training base models requires millions in capital and yields no workflow defense advantage. Third-party model APIs are depreciating in price too rapidly to justify custom model pre-training.'
    },
    {
      id: 'social-outbound',
      title: 'B2C Multi-Channel Social Outbound Automation Engine',
      category: 'B2C',
      description: 'Integrate automated sequences targeting personal communication platforms and consumer-focused directories.',
      targetMetric: 'High-Volume User Churn Loops',
      estimatedEffort: 'High',
      estimatedRoi: '1.2x',
      strategicRationale: 'B2C automated outreach results in rapid spam filters, high platform liability, and extreme, unsustainable user churn, distracting from high-ACV enterprise markets.'
    },
    {
      id: 'voice-phone',
      title: 'Integrated Real-time Audio Phone Dialing System',
      category: 'Voice',
      description: 'Install full VoIP dialing layers directly within active multi-tenant workspaces to support manual agent phone calls.',
      targetMetric: 'SDR Utility Expansion',
      estimatedEffort: 'High',
      estimatedRoi: '1.8x',
      strategicRationale: 'Manual calling is already comprehensively covered by specialized tools. Adding voice lines introduces massive regulatory compliance burden and distracts from our main automated focus.'
    }
  ];

  // Dynamic recommendations summary paragraph based on sliders
  const getRoadmapSummaryParagraph = () => {
    let focusText = "balancing enterprise CRM syncing with cost optimization loops.";
    if (isChurnAlert) {
      focusText = "directing all active development focus toward domain health protection and mailbox warmup systems to immediately mitigate our elevated churn.";
    } else if (isCsatCritical) {
      focusText = "accelerating DNS diagnostic wizards and simplified onboarding tools to lift our declining customer CSAT performance.";
    } else if (isApiSpiking) {
      focusText = "prioritizing model routing optimization and latency monitoring systems to stabilize our margins against high api consumption rates.";
    }
    return `EffectiveBuzz has processed ${(roadmapMetrics.apiUsageGrowth * 50000).toLocaleString()} interactive sequences this month. Our quarterly product strategy is highly optimized for capital efficiency, specifically ${focusText}`;
  };

  return (
    <div className="space-y-6">
      {/* CPO Header */}
      <div className="bg-gradient-to-r from-teal-500/10 via-indigo-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-teal-500/10 text-teal-400 text-xs font-mono font-bold uppercase tracking-wider">
                Chief Product Officer Deck
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Quarterly Roadmap & Product Analytics</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              Quarterly Product Strategy & Feature Roadmap
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Model SaaS product decisions across Feature Requests, Usage Analytics, Customer Feedback, and Churn Data. Maintain absolute priority alignment spanning Build Now, Build Later, and Do Not Build tracks.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-teal-400">
            <Compass className="w-4 h-4 text-teal-400" />
            <span>Custodian: Chief Product Officer</span>
          </div>
        </div>
      </div>

      {/* CPO Analytics Workbench (Interactive Sliders) */}
      <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-2.5">
          <Activity className="w-5 h-5 text-teal-400" />
          <div>
            <h4 className="text-sm font-semibold text-white font-display">Live Product Telemetry & Analyst Inputs</h4>
            <p className="text-[10px] text-gray-400 font-mono">Modify current monthly analytics to dynamically recalculate priority lists and core strategic instructions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Feature Requests Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-gray-400 uppercase">QUARTERLY REQUESTS:</span>
              <span className="text-white font-bold">{roadmapMetrics.featureRequests} Requests</span>
            </div>
            <input
              type="range"
              min="100"
              max="2500"
              step="50"
              value={roadmapMetrics.featureRequests}
              onChange={(e) => setRoadmapMetrics(prev => ({ ...prev, featureRequests: parseInt(e.target.value) }))}
              className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-teal-400"
            />
            <span className="text-[9px] text-gray-500 block font-mono">Backlog Growth Rate: +{(roadmapMetrics.featureRequests / 10).toFixed(0)}%/mo</span>
          </div>

          {/* API Growth Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-gray-400 uppercase">YOY API USAGE GROWTH:</span>
              <span className={`font-bold ${isApiSpiking ? 'text-amber-400' : 'text-white'}`}>{roadmapMetrics.apiUsageGrowth}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="250"
              step="10"
              value={roadmapMetrics.apiUsageGrowth}
              onChange={(e) => setRoadmapMetrics(prev => ({ ...prev, apiUsageGrowth: parseInt(e.target.value) }))}
              className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-indigo-400"
            />
            <span className="text-[9px] text-gray-500 block font-mono">{isApiSpiking ? '⚠️ Heavy Load - Optimize Routing Now' : 'Model Latency Grade: Optimal'}</span>
          </div>

          {/* Customer CSAT Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-gray-400 uppercase">CUSTOMER CSAT:</span>
              <span className={`font-bold ${isCsatCritical ? 'text-red-400' : 'text-emerald-400'}`}>{roadmapMetrics.customerCsat}%</span>
            </div>
            <input
              type="range"
              min="60"
              max="98"
              step="1"
              value={roadmapMetrics.customerCsat}
              onChange={(e) => setRoadmapMetrics(prev => ({ ...prev, customerCsat: parseInt(e.target.value) }))}
              className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-emerald-400"
            />
            <span className="text-[9px] text-gray-500 block font-mono">Target benchmark is &gt;80%</span>
          </div>

          {/* Churn Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-gray-400 uppercase">MONTHLY LOGO CHURN:</span>
              <span className={`font-bold ${isChurnAlert ? 'text-red-400' : 'text-teal-400'}`}>{roadmapMetrics.churnRate}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="4.5"
              step="0.1"
              value={roadmapMetrics.churnRate}
              onChange={(e) => setRoadmapMetrics(prev => ({ ...prev, churnRate: parseFloat(e.target.value) }))}
              className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-rose-400"
            />
            <span className="text-[9px] text-gray-500 block font-mono">{isChurnAlert ? '💥 Churn Spike: Prioritize Domain Health' : 'Log Churn Benchmark: Low'}</span>
          </div>
        </div>

        {/* Live Warning Alerts */}
        {(isChurnAlert || isCsatCritical || isApiSpiking) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-gray-800/60 text-xs font-mono">
            {isChurnAlert && (
              <div className="bg-rose-500/5 border border-rose-500/20 px-3.5 py-2 rounded-lg text-rose-400 flex items-start gap-2">
                <Flame className="w-4 h-4 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <strong className="block font-bold">Churn Risk Alert: {roadmapMetrics.churnRate}%</strong>
                  <span>Pre-Flight Deliverability features moved to CRITICAL category immediately.</span>
                </div>
              </div>
            )}
            {isCsatCritical && (
              <div className="bg-amber-500/5 border border-amber-500/20 px-3.5 py-2 rounded-lg text-amber-400 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Declining CSAT Protection: {roadmapMetrics.customerCsat}%</strong>
                  <span>Onboarding Wizards must be accelerated to decrease initial time-to-value.</span>
                </div>
              </div>
            )}
            {isApiSpiking && (
              <div className="bg-indigo-500/5 border border-indigo-500/20 px-3.5 py-2 rounded-lg text-indigo-400 flex items-start gap-2">
                <Cpu className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Heavy API Platform Load: {roadmapMetrics.apiUsageGrowth}% Growth</strong>
                  <span>Model Routing Optimization prioritized to safe-guard server gross profit margins.</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Roadmap Board Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Categories Tab Selector */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-950 rounded-lg border border-gray-900 text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
            Roadmap Portals
          </div>
          <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
            {[
              { id: 'all', label: '1. Master Roadmap Grid', icon: Layers, desc: 'Interactive view of all backlog priorities.', color: 'text-teal-400' },
              { id: 'now', label: '2. Build Now Track', icon: PlayCircleIcon, desc: 'High ROI core priorities committed immediately.', color: 'text-emerald-400' },
              { id: 'later', label: '3. Build Later Backlog', icon: CalendarIcon, desc: 'Strategic additions reserved for scale stages.', color: 'text-indigo-400' },
              { id: 'discard', label: '4. Do Not Build (De-risked)', icon: XOctagon, desc: 'Eliminated feature scopes protecting our capital.', color: 'text-rose-400' },
              { id: 'recommendations', label: '5. Quarterly Recommendations', icon: FileText, desc: 'CPO co-signed board recommendations.', color: 'text-teal-300' }
            ].map((bt) => {
              const Icon = bt.icon;
              return (
                <button
                  key={bt.id}
                  onClick={() => setActiveView(bt.id as any)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                    activeView === bt.id
                      ? 'bg-[#111827] border-teal-500/50 text-white shadow-lg'
                      : 'bg-transparent border-slate-900 text-gray-400 hover:bg-[#111827]/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <Icon className={`w-4 h-4 ${bt.color}`} />
                    <strong className="font-display font-bold leading-none">{bt.label}</strong>
                  </div>
                  <p className="text-[10px] text-gray-500 pl-6 group-hover:text-gray-400">{bt.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Quick Metrics Core Box */}
          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-2.5 font-mono text-[10.5px]">
            <span className="text-[9px] text-teal-400 uppercase tracking-wider font-bold block mb-1">CPO Roadmap Metrics Summary</span>
            <div className="flex justify-between items-center text-zinc-400 border-b border-gray-900 pb-1.5">
              <span>Build Commitments:</span>
              <span className="text-emerald-400 font-bold">3 High Intensity</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400 border-b border-gray-900 pb-1.5">
              <span>Backlog Scope Depth:</span>
              <span className="text-indigo-400 font-bold">{roadmapMetrics.featureRequests} Requests</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Strategic Focus:</span>
              <span className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-teal-300 font-bold">
                {isChurnAlert ? 'SDR Deliverability' : isCsatCritical ? 'Activation Efficiency' : 'Workflow Depth'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Render viewport */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl shadow-xl">
          
          {/* Dashboard Summary Paragraph */}
          <div className="bg-slate-950 border border-gray-900 p-4 rounded-lg text-xs leading-relaxed text-zinc-400 font-mono mb-5">
            <span className="text-[9px] text-[#22d3ee] uppercase tracking-wider font-bold block mb-1">CPO EXECUTIVE TAKEAWAY</span>
            {getRoadmapSummaryParagraph()}
          </div>

          {/* 1. MASTER ROADMAP GRID */}
          {activeView === 'all' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Comprehensive Product Board Grid
                </span>
                <span className="text-[10px] bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">
                  All Tracks
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                {/* Build Now preview */}
                <div className="space-y-3">
                  <h5 className="font-bold text-emerald-400 uppercase text-[10px] border-b border-gray-900 pb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Track A: Build Now (Next 90 Days)
                  </h5>
                  {featuresNow.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-950/50 border border-gray-900 rounded-lg hover:border-emerald-500/20 transition-all">
                      <div className="flex justify-between items-start mb-1">
                        <strong className="text-white text-[11.5px] leading-tight block">{item.title}</strong>
                        <span className="text-[9px] font-bold text-emerald-400 font-mono">{item.estimatedRoi} ROI</span>
                      </div>
                      <p className="text-zinc-500 text-[10px] leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                  ))}
                </div>

                {/* Build Later preview */}
                <div className="space-y-3">
                  <h5 className="font-bold text-indigo-400 uppercase text-[10px] border-b border-gray-900 pb-1.5 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Track B: Build Later (Strategic Backlog)
                  </h5>
                  {featuresLater.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-950/50 border border-gray-900 rounded-lg hover:border-indigo-500/20 transition-all">
                      <div className="flex justify-between items-start mb-1">
                        <strong className="text-white text-[11.5px] leading-tight block">{item.title}</strong>
                        <span className="text-[9px] font-bold text-indigo-300 font-mono">{item.estimatedRoi} ROI</span>
                      </div>
                      <p className="text-zinc-500 text-[10px] leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. BUILD NOW TRACK */}
          {activeView === 'now' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Build Now (High ROI / Next 90 Days Commitment)
                </span>
              </div>

              <div className="space-y-3.5">
                {featuresNow.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-950 border border-gray-900 rounded-lg space-y-2 hover:border-emerald-500/25 transition-all font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-900 border border-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                          {item.category}
                        </span>
                        <strong className="text-white text-sm font-display leading-tight">{item.title}</strong>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">{item.estimatedRoi} Est. ROI</span>
                    </div>

                    <p className="text-zinc-300 text-xs leading-relaxed">{item.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-gray-950 text-[10.5px]">
                      <div className="bg-slate-900/40 p-2 rounded">
                        <span className="text-zinc-500 uppercase text-[8.5px] block">Target Business Metric</span>
                        <span className="text-white font-semibold block mt-0.5">{item.targetMetric}</span>
                      </div>
                      <div className="bg-slate-900/40 p-2 rounded">
                        <span className="text-zinc-500 uppercase text-[8.5px] block">CPO Strategic Rationale</span>
                        <span className="text-zinc-400 block mt-0.5 leading-snug">{item.strategicRationale}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. BUILD LATER TRACK */}
          {activeView === 'later' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Build Later (Optimized Strategic Backlog)
                </span>
              </div>

              <div className="space-y-3.5">
                {featuresLater.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-950 border border-gray-900 rounded-lg space-y-2 hover:border-indigo-500/25 transition-all font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-900 border border-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                          {item.category}
                        </span>
                        <strong className="text-white text-sm font-display leading-tight">{item.title}</strong>
                      </div>
                      <span className="text-xs font-bold text-indigo-300">{item.estimatedRoi} Est. ROI</span>
                    </div>

                    <p className="text-zinc-300 text-xs leading-relaxed">{item.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-gray-950 text-[10.5px]">
                      <div className="bg-slate-900/40 p-2 rounded">
                        <span className="text-zinc-500 uppercase text-[8.5px] block">Target Expansion Metric</span>
                        <span className="text-white font-semibold block mt-0.5">{item.targetMetric}</span>
                      </div>
                      <div className="bg-slate-900/40 p-2 rounded">
                        <span className="text-zinc-500 uppercase text-[8.5px] block">Strategic Scaling Value</span>
                        <span className="text-zinc-400 block mt-0.5 leading-snug">{item.strategicRationale}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. DO NOT BUILD TRACK */}
          {activeView === 'discard' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                  <XOctagon className="w-4 h-4" /> Track C: Do Not Build (De-risked Feature Waste)
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-rose-500/5 border border-rose-500/10 p-3.5 rounded-lg text-rose-300 text-xs font-mono">
                  <strong>Risk Control:</strong> To maintain clean capital runway, we have explicitly eliminated these features due to poor structural defendability, negative ROI, or dilution of our core sales outbound focus.
                </div>

                {featuresDiscarded.map((item) => (
                  <div key={item.id} className="p-3.5 bg-slate-950 border border-gray-900 rounded-lg space-y-1.5 hover:border-rose-500/10 transition-all font-mono text-xs">
                    <div className="flex justify-between items-center text-zinc-300">
                      <strong className="text-white text-sm font-display block leading-tight">{item.title}</strong>
                      <span className="text-[10px] bg-red-500/10 text-rose-400 border border-red-500/20 px-1.5 py-0.5 rounded font-bold">ROI: {item.estimatedRoi}</span>
                    </div>
                    <p className="text-zinc-400 text-xsLeading">{item.description}</p>
                    <p className="text-[10.5px] text-zinc-400 pt-1 border-t border-gray-950">
                      <strong className="text-rose-400 uppercase text-[9px] mr-1 block sm:inline-block">CPO Discard Reason:</strong>
                      {item.strategicRationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. QUARTERLY RECOMMENDATIONS */}
          {activeView === 'recommendations' && (
            <div className="space-y-5 font-mono text-xs text-zinc-300 leading-relaxed">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-widest flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Chief Product Officer Quarterly Blueprint Recommendations
                </span>
                <span className="text-[10px] bg-teal-500/10 text-teal-300 border border-teal-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">
                  Q3-Q4 Board Ready
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-950 border border-gray-900 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-2 text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <strong className="text-sm">Recommendation 1: Ship Pre-Flight Deliverability Shield in Q3</strong>
                  </div>
                  <p className="text-zinc-400 pl-4">
                    Deploy standard spam filters and active mailbox warmups as a premium workspace add-on. This secures a strong logo retention framework and addresses ISP delivery policy fluctuations directly.
                  </p>
                  <p className="text-teal-400 text-[10px] pl-4"><strong>Key Target Outcome:</strong> Logo churn drops from {roadmapMetrics.churnRate}% down below 0.5% structure-wide.</p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-gray-900 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-2 text-white">
                    <span className="w-2 h-2 rounded-full bg-[#818cf8]"></span>
                    <strong className="text-sm">Recommendation 2: Certify Bidirectional CRM Sync Drivers</strong>
                  </div>
                  <p className="text-zinc-400 pl-4">
                    Release deep interactive integrations with Salesforce AppExchange and HubSpot App Marketplace. This will consolidate contact logs and sequence behaviors, creating high product switching barriers.
                  </p>
                  <p className="text-[#818cf8] text-[10px] pl-4"><strong>Key Target Outcome:</strong> Enterprise-tier pipelines will expand to represent 35% of overall ACV weights.</p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-gray-900 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-2 text-white">
                    <span className="w-2 h-2 rounded-full bg-[#22d3ee]"></span>
                    <strong className="text-sm">Recommendation 3: Optimize Dual-Tier Cognitive Model Selection</strong>
                  </div>
                  <p className="text-zinc-400 pl-4">
                    Maintain continuous model prompt adjustments based on Levenshtein distances of SDR alterations. Routing common operations dynamically protects our blended gross profit margins of 81.4%.
                  </p>
                  <p className="text-[#22d3ee] text-[10px] pl-4"><strong>Key Target Outcome:</strong> Blended execution cost remains strictly under $1.90 per 1,000 automated sequences.</p>
                </div>
              </div>

              <div className="p-3.5 bg-zinc-950/40 border border-gray-900 text-center rounded-lg text-zinc-500 text-[10px]">
                Co-signed & submitted for quarterly board review and operational roadmap approval.
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Simple placeholder icons to ensure no TS errors if lucide icons are named differently
const PlayCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} className={props.className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} className={props.className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
