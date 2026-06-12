import React, { useState } from 'react';
import { 
  Shield, Zap, Cpu, Database, Award, Network, TrendingUp, 
  UserCheck, Lock, Activity, Hammer, CheckCircle2, AlertTriangle, 
  HelpCircle, ChevronRight, Sparkles, RefreshCw, BarChart3, Bookmark, ExternalLink 
} from 'lucide-react';

interface MoatArea {
  id: string;
  name: string;
  targetYear: string;
  pithySlogan: string;
  category: 'Data' | 'AI' | 'Workflow' | 'Ecosystem' | 'Integrations' | 'Brand';
  description: string;
  strategicInitiatives: string[];
  compoundingFeedbackLoop: string;
  defensibilityMetric: string;
  threatMitigation: string;
}

export default function StrategicMoatAdvisor() {
  const [selectedAreaId, setSelectedAreaId] = useState<string>('data');
  const [threatScenario, setThreatScenario] = useState<'cloner' | 'legacy' | 'agent'>('cloner');
  const [moatingLevers, setMoatingLevers] = useState({
    hitlVerificationRate: 85,
    crmSyncDepth: 70,
    sovereignIsolation: 50,
    developerApiAdoption: 40,
    brandNps: 75,
  });

  const moatAreas: MoatArea[] = [
    {
      id: 'data',
      name: 'Proprietary Intent Graph & vector DB',
      targetYear: 'Year 1-2',
      pithySlogan: 'Uncopyable multi-tenant interaction history and response profiles.',
      category: 'Data',
      description: 'While outbound lead lists can be easily purchased and copied, response profiles and multi-channel conversational loops cannot. We store encrypted, structured objection histories, conversion timings, and deliverability parameters in regional PostgreSQL pgvector stores.',
      strategicInitiatives: [
        'Compile anonymized corporate reaction histories into a central, searchable Intent Graph.',
        'Index objection-handling results to automatically map customer pain-points.',
        'Track and optimize domain reputation records, providing a secure historical deliverability repository.'
      ],
      compoundingFeedbackLoop: 'More campaigns run in our system yields larger interaction datasets. Larger datasets deliver higher accuracy in intent classification, which books more local meetings, fueling more activity.',
      defensibilityMetric: 'Proprietary Vector Store: Over 10M+ curated conversational interaction pairs.',
      threatMitigation: 'Defeats low-cost data scrapers who lack real transactional conversion feedback loops.'
    },
    {
      id: 'ai',
      name: 'Dual-Tier LLM Optimization & HITL Loops',
      targetYear: 'Year 1-3',
      pithySlogan: 'Compounding cognitive loops that optimize prompt engineering.',
      category: 'AI',
      description: 'Avoid simple LLM proxy wrappers. We build a double-layered platform: common requests route to fast, economical models (Gemini Flash), while complex analytical problems leverage reasoning architectures. Human-In-The-Loop approvals measure Levenshtein deltas to automatically optimize prompts through npm run QA:eval sweeps.',
      strategicInitiatives: [
        'Automate continuous prompt regression analysis to maintain system precision.',
        'Track and feed user edit deltas back into contextual model pipelines.',
        'In corporate robust validation layers, reducing average edit distances below 10%.'
      ],
      compoundingFeedbackLoop: 'SDR draft revisions serve as training data. As human alterations drop, prompt quality increases, reducing manual steps and conserving platform output margins.',
      defensibilityMetric: 'Average Human Edit Delta: Dropping from 28% down to < 10.5% over 12 months.',
      threatMitigation: 'Defeats commodity wrappers who experience rising LLM bills, slower response speeds, and high draft edit overhead.'
    },
    {
      id: 'workflow',
      name: 'Deliverability Shield & Multi-Tenant DAGs',
      targetYear: 'Year 2-4',
      pithySlogan: 'Deeply embedded operational gates protecting domain safety.',
      category: 'Workflow',
      description: 'Operational lock-in occurs when replacing a tool compromises critical business infrastructure. Our Pre-Flight Deliverability Shield evaluates and blocks risky emails before delivery, protecting core company domain reputations.',
      strategicInitiatives: [
        'Build live visual DNS indicators validating SPF, DKIM, and DMARC settings.',
        'Deploy configurable rule-action DAGs to coordinate complex lead workflows securely without data loss.',
        'Implement automated mailbox warmups, protecting domains during high-volume spikes.'
      ],
      compoundingFeedbackLoop: 'Low-churn operations protect core company domain reputations. High deliverability rates keep customers from switching, preserving safe campaign environments.',
      defensibilityMetric: 'Logo Churn Protection: Kept strictly under 0.8% per month.',
      threatMitigation: 'Defeats standalone message sequencers who offer no protective limits or domain reputation diagnostics.'
    },
    {
      id: 'ecosystem',
      name: 'Sovereign Academies & Growth Partner VARs',
      targetYear: 'Year 3-5',
      pithySlogan: 'Cultivating the next generation of Autonomous Revenue Engineers.',
      category: 'Ecosystem',
      description: 'Build an industry-standard credentialing framework. By creating the certified "Autonomous Revenue Engineer" course, we train sales operation experts to treat our platform as the default operational toolkit.',
      strategicInitiatives: [
        'Launch Level-1 certification academies for modern RevOps teams and consultants.',
        'Onboard Value-Added Resellers (VARs) who drive localized sales and configuration operations.',
        'Establish our public certification registry, elevating partner credentials globally.'
      ],
      compoundingFeedbackLoop: 'More certified engineers create an organic advocate network, driving inbound lead pipelines and decreasing customer acquisition costs.',
      defensibilityMetric: 'Certified Global Champions: Target of 5,000+ certified engineers by Year 3.',
      threatMitigation: 'Defeats competitors who rely strictly on paid Google ads or cold sales teams to expand.'
    },
    {
      id: 'integrations',
      name: 'Bidirectional Salesforce & HubSpot Sync',
      targetYear: 'Year 2-3',
      pithySlogan: 'Durable bidirectional system integrations that store record histories.',
      category: 'Integrations',
      description: 'Deeper integration builds product stickiness. Our platform goes beyond standard Zapier links to offer direct, bidirectional database syncing with top CRM registers. This sync structure tracks notes, logs, scores, and activity pipelines in real time.',
      strategicInitiatives: [
        'Develop secure refresh-token synchronization protocols with Salesforce, HubSpot, and MS Dynamics.',
        'Provide custom webhooks and robust API endpoints for internal IT databases.',
        'Incorporate dynamic profile enrichment triggers, keeping external contact databases accurate.'
      ],
      compoundingFeedbackLoop: 'As more lead data flows smoothly between systems, our platform cements its position as the core communication engine, creating high switching costs.',
      defensibilityMetric: 'Bidirectional Sync Depth: Over 98% of users with CRM credentials maintain active links.',
      threatMitigation: 'Defeats tools that offer only simple, one-way CSV bulk downloads and lack direct database syncing.'
    },
    {
      id: 'brand',
      name: 'The "Send Less, Book More" Philosophy',
      targetYear: 'Year 1-5',
      pithySlogan: 'Category leadership focused on highly respectful, intentional engagement.',
      category: 'Brand',
      description: 'In an era of generic bulk outbound spam, position EffectiveBuzz as the premium, compliant choice. Our "Send Less, Book More" strategy treats mass spamming as an existential brand reputation hazard, establishing higher quality standards for outbound communications.',
      strategicInitiatives: [
        'Champion qualitative outbound standards at industry events and digital portals.',
        'Deploy compliance-first marketing structures emphasizing sovereignty and data protection.',
        'Create high-contrast industry research reports showing modern outbound response comparisons.'
      ],
      compoundingFeedbackLoop: 'High-quality outreach yields better conversion volumes, establishing our brand as the premium, compliant, and modern choice.',
      defensibilityMetric: 'Organic Referral Rate: Over 42% of new customer pipelines originate via organic channels.',
      threatMitigation: 'Defeats cheap spam systems that face swift ISP bans, domain blocks, and negative customer sentiment.'
    }
  ];

  const selectedArea = moatAreas.find(m => m.id === selectedAreaId) || moatAreas[0];

  // Dynamic calculations based on lever state
  const rawMoatScore = 
    (moatingLevers.hitlVerificationRate * 0.25) +
    (moatingLevers.crmSyncDepth * 0.20) +
    (moatingLevers.sovereignIsolation * 0.15) +
    (moatingLevers.developerApiAdoption * 0.20) +
    (moatingLevers.brandNps * 0.20);
  
  const moatDecibels = Math.round(rawMoatScore * 1.2);
  const projectedLtvMultiplier = (1 + (rawMoatScore / 100) * 0.75).toFixed(2);
  const estimatedCostReduction = Math.round((moatingLevers.hitlVerificationRate * 0.4) + (moatingLevers.developerApiAdoption * 0.2));

  // Competitive Defense Scenarios and Defense Outcomes
  const attackScenarios = {
    cloner: {
      title: 'The AI Cloner ($19/mo wrapper)',
      attackerProfile: 'Uses standard LLM APIs and cheap lead lists to offer basic cold outreach. Undercuts pricing by 80%.',
      effectiveness: {
        data: 'DEFEATED — Lacks proprietary Intent Graph and historical response logs, leading to immediate domain reputation issues.',
        ai: 'DEFEATED — Standard templates lack dynamic human adjustments, resulting in low conversion rates.',
        workflow: 'DEFEATED — Lacks pre-flight delivery protections, triggering fast domain bans and high account churn.',
        generalDefenseScore: 98,
        narrative: 'The Cloner is quickly filtered out by spam algorithms. EffectiveBuzz maintains long-term contracts due to superior deliverability and domain reputation protection.'
      }
    },
    legacy: {
      title: 'The Legacy Suite Giant (Apollo / HubSpot)',
      attackerProfile: 'Massive database platforms attempting to integrate basic AI messaging add-ons to keep contacts in-suite.',
      effectiveness: {
        data: 'CONTAINED — Their large static databases lack modern behavioral metadata and intent-based sequence automation.',
        ai: 'DEFEATED — Standard system-wide prompt structures do not incorporate localized human feedback streams.',
        workflow: 'DEFEATED — Legacy CRM models are too slow to deploy specialized, highly dynamic subdomain DNS shields.',
        generalDefenseScore: 85,
        narrative: 'While legacy firms offer general database storage, complex sales engineering groups prefer EffectiveBuzz as their dedicated, high-performance execution engine.'
      }
    },
    agent: {
      title: 'The Autonomous Agent Startup',
      attackerProfile: 'Agile venture-backed startups building fully autonomous sales teams using advanced machine learning models.',
      effectiveness: {
        data: 'PARRIED — EffectiveBuzz leverages active historical conversational vector sets to out-optimize raw model architectures.',
        ai: 'SUPERIOR — Our high-contrast dual-tier routing models keep operating margins high and cost structures competitive.',
        workflow: 'SUPERIOR — Our deep, bidirectional software connections prevent data sync fragmentation issues.',
        generalDefenseScore: 90,
        narrative: 'Startups face high customer churn due to poor workflow integration. EffectiveBuzz delivers reliable value by embedding directly into existing corporate system states.'
      }
    }
  };

  const selectedScenario = attackScenarios[threatScenario];

  return (
    <div className="space-y-6">
      {/* Strategic Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-indigo-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                Strategic Moat & Defense Desk
              </span>
              <span className="text-[10px] text-gray-500 font-mono">5-Year Strategy & Category Moat</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              5-Year Strategic Moat Cockpit
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Model and simulate defensive advantages spanning proprietary interactive intent graphs, prompt optimization algorithms, operational workflow protections, partner ecosystems, system integrations, and brand-building programs.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-emerald-400">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Defensive Index: Strong</span>
          </div>
        </div>
      </div>

      {/* Real-time Moat Strength Score & Lever Cockpit */}
      <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-2.5">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <div>
            <h4 className="text-sm font-semibold text-white font-display">Interactive Moat Multiplier Simulator</h4>
            <p className="text-[10px] text-gray-400">Modify GTM and operational metrics to simulate compounding defensibility and customer contract values.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Sliders */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-gray-400 uppercase">HITL VERIFICATION RATE:</span>
                <span className="text-white font-semibold">{moatingLevers.hitlVerificationRate}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="95"
                step="5"
                value={moatingLevers.hitlVerificationRate}
                onChange={(e) => setMoatingLevers(prev => ({ ...prev, hitlVerificationRate: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-gray-400 uppercase">CRM BIDIRECTIONAL SYNC DEPTH:</span>
                <span className="text-white font-semibold">{moatingLevers.crmSyncDepth}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="98"
                step="5"
                value={moatingLevers.crmSyncDepth}
                onChange={(e) => setMoatingLevers(prev => ({ ...prev, crmSyncDepth: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-[#818cf8]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-gray-400 uppercase">SOVEREIGN GDPR DATA PODS:</span>
                <span className="text-white font-semibold">{moatingLevers.sovereignIsolation}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="10"
                value={moatingLevers.sovereignIsolation}
                onChange={(e) => setMoatingLevers(prev => ({ ...prev, sovereignIsolation: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-[#22d3ee]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-gray-400 uppercase">DEVELOPER MODULE DEPTH:</span>
                <span className="text-white font-semibold">{moatingLevers.developerApiAdoption}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="90"
                step="5"
                value={moatingLevers.developerApiAdoption}
                onChange={(e) => setMoatingLevers(prev => ({ ...prev, developerApiAdoption: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-indigo-400"
              />
            </div>
          </div>

          {/* Computed Scores */}
          <div className="lg:col-span-4 bg-slate-950 border border-gray-900 rounded-xl p-4 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-500 uppercase block">Moat Index</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-emerald-400 font-display">{moatDecibels}</span>
                <span className="text-[10px] font-mono text-gray-400">dB</span>
              </div>
              <span className="text-[8px] text-zinc-500 block leading-tight font-mono">Defensive Decibels (Logarithmic)</span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-500 uppercase block">Est. LTV Multiplier</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-indigo-300 font-display">{projectedLtvMultiplier}x</span>
              </div>
              <span className="text-[8px] text-zinc-500 block leading-tight font-mono">Based on compounding contract retention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Six Main Defensive Areas Exploration Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side Buttons */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-950 rounded-lg border border-gray-900 text-[10px] font-mono text-gray-400 uppercase tracking-wider font-bold">
            Defensive Leverage Points
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {moatAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedAreaId(area.id)}
                className={`text-left p-3 rounded-lg border transition-all cursor-pointer relative overflow-hidden ${
                  selectedAreaId === area.id
                    ? 'bg-[#111827] border-emerald-500/40 text-white shadow-md'
                    : 'bg-transparent border-slate-900 text-gray-400 hover:bg-[#111827]/40 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-display">{area.name}</span>
                  <Award className={`w-3.5 h-3.5 ${selectedAreaId === area.id ? 'text-emerald-400' : 'text-gray-700'}`} />
                </div>
                <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-gray-400">
                  <span className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-emerald-300">
                    {area.category} Moat
                  </span>
                  <span>Timeline: {area.targetYear}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Content Display */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl shadow-xl space-y-6">
          <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 text-[9px] font-mono font-bold uppercase tracking-wider">
                  {selectedArea.category} Advantage Blueprint
                </span>
                <span className="text-[10px] font-mono text-zinc-500">{selectedArea.targetYear}</span>
              </div>
              <h4 className="text-md font-bold text-white font-display mt-1">{selectedArea.name}</h4>
              <p className="text-[11px] text-gray-400 font-mono mt-0.5 italic">"{selectedArea.pithySlogan}"</p>
            </div>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed font-mono">
            {selectedArea.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Core Initiatives */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-gray-800/60 pb-1.5">
                <Hammer className="w-3.5 h-3.5 text-emerald-400" />
                Key Strategic Initiatives
              </h5>
              <ul className="space-y-2.5 text-xs">
                {selectedArea.strategicInitiatives.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-zinc-400 leading-relaxed font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Loop Defensibility Section */}
            <div className="space-y-4">
              <div className="space-y-1.5 bg-slate-950 border border-slate-900 p-3 rounded-lg">
                <h6 className="text-[10px] font-bold text-indigo-400 uppercase font-mono tracking-wider">The Compounding Loop</h6>
                <p className="text-[11px] text-zinc-400 leading-normal font-mono">{selectedArea.compoundingFeedbackLoop}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                <div className="p-2.5 bg-slate-950/60 border border-gray-900 rounded-lg">
                  <span className="text-[9px] text-zinc-500 uppercase block">Moat Metric</span>
                  <span className="text-zinc-300 font-bold block mt-0.5 leading-tight">{selectedArea.defensibilityMetric}</span>
                </div>
                <div className="p-2.5 bg-slate-950/60 border border-gray-900 rounded-lg">
                  <span className="text-[9px] text-zinc-500 uppercase block">Competitive Barrier</span>
                  <span className="text-emerald-400 font-bold block mt-0.5 leading-tight">{selectedArea.threatMitigation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Defense Plan Simulator */}
      <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-lg space-y-4">
        <div className="border-b border-gray-800 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-400" />
            <div>
              <h4 className="text-sm font-semibold text-white font-display">Competitor Defense Plan Simulator</h4>
              <p className="text-[10px] text-gray-400">Simulate how the EffectiveBuzz strategic moat parries current market competitive attacks.</p>
            </div>
          </div>

          <div className="flex gap-1 bg-slate-950 border border-gray-900 p-1 rounded-lg">
            {(['cloner', 'legacy', 'agent'] as const).map((scen) => (
              <button
                key={scen}
                onClick={() => setThreatScenario(scen)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer uppercase ${
                  threatScenario === scen
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {scen === 'cloner' ? 'AI Cloner' : scen === 'legacy' ? 'Legacy Giant' : 'New Agent Startup'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch font-mono text-xs">
          {/* Attacker Context */}
          <div className="md:col-span-1.5 bg-slate-950 border border-gray-900 p-4 rounded-lg flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[9px] text-red-400 uppercase font-bold tracking-wider block">Assault Vector Profile</span>
              <h5 className="text-xs font-bold text-white font-display leading-tight">{selectedScenario.title}</h5>
              <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
                {selectedScenario.attackerProfile}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-900 flex justify-between items-center">
              <span className="text-[10px] text-gray-500 uppercase font-bold">Deflected Success:</span>
              <span className="text-emerald-400 text-xs font-bold">{selectedScenario.generalDefenseScore}% Deflected</span>
            </div>
          </div>

          {/* Defense breakdown blocks */}
          <div className="md:col-span-2.5 grid grid-cols-1 gap-3">
            {[
              { label: 'Data Defense Matrix', defense: selectedScenario.effectiveness.data, color: 'text-indigo-300' },
              { label: 'AI Cognitive Defense', defense: selectedScenario.effectiveness.ai, color: 'text-[#818cf8]' },
              { label: 'Workflow Shield Defense', defense: selectedScenario.effectiveness.workflow, color: 'text-emerald-400' }
            ].map((eff, i) => (
              <div key={i} className="bg-slate-950/40 border border-gray-900 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5">
                <div>
                  <span className="text-[9px] text-gray-500 uppercase font-bold block">{eff.label}</span>
                  <span className={`text-[11px] ${eff.color} font-bold mt-0.5 block leading-normal`}>{eff.defense}</span>
                </div>
                <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  Active Shield
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 border border-gray-900 p-3 rounded-lg text-[10.5px] leading-relaxed text-zinc-300 font-mono italic">
          <strong className="text-indigo-400 not-italic uppercase font-bold font-mono text-[9.5px] mr-1.5 block sm:inline-block">Strategy Outcomes:</strong>
          {selectedScenario.narrative}
        </div>
      </div>

      {/* Chronological 5-Year Roadmap Timeline */}
      <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-lg space-y-4">
        <div className="border-b border-gray-800 pb-2.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
            <div>
              <h4 className="text-sm font-semibold text-white font-display">5-Year Strategic Defensibility Roadmap</h4>
              <p className="text-[10px] text-gray-400 font-mono">Compounding defense milestones mapped chronologically to secure category monopoly.</p>
            </div>
          </div>
          <span className="text-[9px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
            Moat Execution
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {[
            { 
              year: 'Year 1', 
              focus: 'Intent Database', 
              desc: 'Vector indexing of all objection replies. Implement dual-tier routing to reduce standard campaign overhead margins.' 
            },
            { 
              year: 'Year 2', 
              focus: 'Shield & API Sync', 
              desc: 'Deploy pre-flight spam filtering shields. Release refresh-token Salesforce and HubSpot database connectors.' 
            },
            { 
              year: 'Year 3', 
              focus: 'Partner Network', 
              desc: 'Launch the Certified Autonomous Revenue Engineer programs. Onboard regional agency VAR distribution structures.' 
            },
            { 
              year: 'Year 4', 
              focus: 'Sovereign Nodes', 
              desc: 'Initiate fully isolated EU data residency bounds and UAE sovereign datacenters for global enterprise buyers.' 
            },
            { 
              year: 'Year 5', 
              focus: 'Brand Monopoly', 
              desc: 'Cement standard "Send Less, Book More" quality-first positioning. Render bulk blast legacy tools fully obsolete.' 
            },
          ].map((rd, i) => (
            <div key={i} className="bg-slate-950/50 border border-gray-900 p-3.5 rounded-lg space-y-1.5 text-xs text-left group hover:border-indigo-500/25 transition-all">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-indigo-400 font-display">{rd.year}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <h5 className="font-bold text-white font-display text-[11px]">{rd.focus}</h5>
              <p className="text-[10px] text-gray-400 leading-relaxed font-mono">
                {rd.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
