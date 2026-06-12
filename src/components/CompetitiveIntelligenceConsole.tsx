import React, { useState } from 'react';
import { 
  ShieldAlert, Bot, TrendingUp, Users, Building, AlertCircle, Plus, 
  RotateCcw, Sparkles, Check, ChevronRight, HelpCircle, FileText, 
  Search, ShieldCheck, Mail, ArrowUpRight, Award, Zap, HardHat, RefreshCw
} from 'lucide-react';

interface InboundSignal {
  id: string;
  source: 'Competitors' | 'Market Trends' | 'AI Advancements' | 'Customer Demand';
  title: string;
  intensity: 'HIGH' | 'MEDIUM' | 'LOW';
  impactScore: number; // 0.0 to 10.0
  age: string;
  content: string;
  recommendation: string;
  pivotedEmailTemplate: string;
}

const INITIAL_SIGNALS: InboundSignal[] = [
  {
    id: "sig_1",
    source: "Competitors",
    title: "OutreachPro drops annual enterprise contract seat prices by 40%",
    intensity: "HIGH",
    impactScore: 8.8,
    age: "12m ago",
    content: "Our primary competitor OutreachPro just deployed a massive pricing shift on their checkout page, slashing standard enterprise seat caps. This aggressively targets mid-market companies.",
    recommendation: "Generate custom outbound sequences targeting legacy OutreachPro customers, highlighting long-term API performance and zero artificial volume limits on our base tier.",
    pivotedEmailTemplate: "Subject: Beyond seat caps: Securing unlimited scaling\nHi {{contact_name}},\n\nWith recent industry pricing adjustments, traditional seat models are squeezing scale. Unlike OutreachPro's new restricted annual caps, EffectiveBuzz provides raw, un-throttled delivery tiers. Let's align on Tuesday so we can review your volume efficiency plans."
  },
  {
    id: "sig_2",
    source: "AI Advancements",
    title: "Gemini 3.5 Flash slashes token ingestion costs by 60%",
    intensity: "HIGH",
    impactScore: 9.2,
    age: "45m ago",
    content: "New Gemini model releases drastically reduce API billing parameters. This allows for extremely cost-effective context generation on raw CRM documents.",
    recommendation: "Upgrade our core reply extraction engine's background pipelines to leverage Flash instantly. This will scale our personalized outbound outreach rate with negligible margin impacts.",
    pivotedEmailTemplate: "Subject: Next-Gen AI context mapping for {{company_name}}\nHi {{contact_name}},\n\nWith computational API pricing collapsing, enterprise companies are actively embedding LLM loops to analyze CRM intent. Rather than hardcoded sequence builders, EffectiveBuzz automates context mapping on-the-fly. Do you have 10 minutes next Thursday?"
  },
  {
    id: "sig_3",
    source: "Customer Demand",
    title: "G2 review aggregators flag 250+ complaints about HubSpot SMTP delivery rates",
    intensity: "MEDIUM",
    impactScore: 7.4,
    age: "2h ago",
    content: "A sudden rise in G2 software complaints reveals widespread frustration with legacy SMTP configurations, causing marketing dispatches to land in junk blocks.",
    recommendation: "Launch direct marketing campaigns targeting companies using HubSpot integration with security-first SPF and DKIM self-repair diagnostic checks.",
    pivotedEmailTemplate: "Subject: Bypassing spam filters at {{company_name}}\nHi {{contact_name}},\n\nWe noticed a sudden spike in HubSpot SMTP deliverability anomalies across tech enterprises. Correcting SPF configurations shouldn't be an afterthought. EffectiveBuzz incorporates closed-loop DNS diagnosis. Can I share a quick diagnostics report with you?"
  },
  {
    id: "sig_4",
    source: "Market Trends",
    title: "GDPR enforcement panels implement strict $40m penalties over untracked scraping audits",
    intensity: "MEDIUM",
    impactScore: 6.9,
    age: "4h ago",
    content: "European Union regulation entities are intensifying target inspections on un-consented scraping directories used by standard marketing databases.",
    recommendation: "Highlight our 100% compliant opt-in lead capture architecture, positioning EffectiveBuzz as the safe compliance moat in GDPR zones.",
    pivotedEmailTemplate: "Subject: Eliminating GDPR liability in {{industry}} list-building\nHi {{contact_name}},\n\nWith GDPR inspection penalties reaching new regulatory highs, legacy data scrapers are becoming an operational risk. EffectiveBuzz leverages 100% compliant, opt-in lead validation. Let's connect on Tuesday."
  },
  {
    id: "sig_5",
    source: "Competitors",
    title: "Apollo.io launches native LinkedIn automation extensions on Chrome Store",
    intensity: "LOW",
    impactScore: 3.5,
    age: "1d ago",
    content: "Simple automated Chrome browser extension updates released to automatically scrap contacts directly from sales navigator listings.",
    recommendation: "Classify under observational tracker. Focus on our deeper multi-hop backend platform integrations rather than fragile browser-side scrapers.",
    pivotedEmailTemplate: "Subject: Scraping extensions vs Full-Stack operations\nHi {{contact_name}},\n\nWhile simple Chrome extensions help grab single emails, enterprise outreach requires structured backend delivery ecosystems that don't depend on fragile browser sessions. Here is our platform overview."
  }
];

export default function CompetitiveIntelligenceConsole() {
  const [signals, setSignals] = useState<InboundSignal[]>(INITIAL_SIGNALS);
  const [selectedSig, setSelectedSig] = useState<InboundSignal>(INITIAL_SIGNALS[0]);
  const [activeTab, setActiveTab] = useState<'monitoring' | 'reports' | 'recommendations'>('monitoring');

  // Input fields for simulating a new market intelligence event
  const [simSource, setSimSource] = useState<'Competitors' | 'Market Trends' | 'AI Advancements' | 'Customer Demand'>('Competitors');
  const [simTitle, setSimTitle] = useState('');
  const [simContent, setSimContent] = useState('');
  const [simIntensity, setSimIntensity] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [simImpact, setSimImpact] = useState<number>(8.5);
  const [simRec, setSimRec] = useState('');
  const [simEmail, setSimEmail] = useState('');

  const [feedbackAlert, setFeedbackAlert] = useState<string | null>(null);

  // Quick preset loader to simplify mock simulation
  const loadPreset = (presetType: 'competitor_price' | 'ai_breakthrough' | 'customer_pain') => {
    if (presetType === 'competitor_price') {
      setSimSource('Competitors');
      setSimTitle('Salesforce announces standalone agent framework with $0 markup trial program');
      setSimContent('Salesforce is aggressively offering zero-cost initial agent pilot programs to lock in corporate customers before lock-in margins degrade.');
      setSimIntensity('HIGH');
      setSimImpact(8.7);
      setSimRec('Reposition our platform as the light, rapid-deployment agile choice that installs in hours without Salesforce consultancy bloat.');
      setSimEmail("Subject: Avoid custom developer fees with agile automation\nHi {{contact_name}},\n\nWhile legacy corporate clouds take 6 months of custom consultation setup, EffectiveBuzz hooks directly into your domain workspace in an afternoon. Let's discuss bypassing enterprise bloat next week.");
    } else if (presetType === 'ai_breakthrough') {
      setSimSource('AI Advancements');
      setSimTitle('DeepMind publishes real-time voice latency translation modeling parameters');
      setSimContent('SOTA benchmarks drop voice transcription and semantic routing latency below 80ms globally, making real-time interactive voice agents feasible.');
      setSimIntensity('HIGH');
      setSimImpact(9.5);
      setSimRec('Expand outbound pipelines to support automated interactive audio-validation triggers in our qualification workflows.');
      setSimEmail("Subject: Real-time interactive voice validation loops\nHi {{contact_name}},\n\nWith voice latency collapsing below 80ms, the next frontier in qualification is real-time verification. Let's schedule a call to preview our early test pipelines.");
    } else if (presetType === 'customer_pain') {
      setSimSource('Customer Demand');
      setSimTitle('Reddit r/sales reveals massive dissatisfaction with automated email delivery bots');
      setSimContent('Hundreds of founders discuss high domain burning rates due to dumb automated sequential email bots sending bad spam patterns.');
      setSimIntensity('MEDIUM');
      setSimImpact(7.8);
      setSimRec('Deploy outbox pacing features and promote EffectiveBuzz warm-up pools and self-improving agents over raw bot spammers.');
      setSimEmail("Subject: Stop burn risk on your primary domain\nHi {{contact_name}},\n\nStandard outbound bots are burning enterprise IP pools in weeks by distributing un-segmented lists. EffectiveBuzz mitigates this with warm-up cycles. Let's chat next Tuesday on how to protect your brand.");
    }
    setFeedbackAlert("Simulation preset loaded into generator panel! Press 'Inject Market Signal' to commit.");
    setTimeout(() => setFeedbackAlert(null), 4500);
  };

  const handleInjectMarketSignal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simTitle.trim() || !simContent.trim()) return;

    const newSignal: InboundSignal = {
      id: `sig_${Date.now()}`,
      source: simSource,
      title: simTitle,
      intensity: simIntensity,
      impactScore: Number(simImpact),
      age: "Just now",
      content: simContent,
      recommendation: simRec || "Review general outreach alignment and trigger defensive battlecards.",
      pivotedEmailTemplate: simEmail || "Subject: Optimization alignment for {{company_name}}\nHi {{contact_name}},\n\nWe tracked recent dynamic shifts impacting your industry sector. EffectiveBuzz streamlines delivery buffers. Let's schedule a brief sync."
    };

    setSignals(prev => [newSignal, ...prev]);
    setSelectedSig(newSignal);
    
    // Clear form inputs
    setSimTitle('');
    setSimContent('');
    setSimRec('');
    setSimEmail('');

    setFeedbackAlert(`Successfully injected new market intelligence signal: [${newSignal.source}] ${newSignal.title}`);
    setTimeout(() => setFeedbackAlert(null), 5000);
  };

  const handleResetSignals = () => {
    setSignals(INITIAL_SIGNALS);
    setSelectedSig(INITIAL_SIGNALS[0]);
    setFeedbackAlert("Competitive signals monitor reset to factory defaults.");
  };

  // Live aggregated stats
  const criticalThreatsCount = signals.filter(s => s.impactScore >= 8.0).length;
  const mediumThreatsCount = signals.filter(s => s.impactScore >= 4.0 && s.impactScore < 8.0).length;
  const signalSourcesCount = new Set(signals.map(s => s.source)).size;

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="bg-gradient-to-r from-rose-500/15 via-zinc-500/5 to-transparent border border-rose-900/30 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-rose-500/10 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
                COMPETITIVE INTELLIGENCE DIRECTOR COOP
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Market Signal Monitoring & CRM Pivot Engine</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300">
              Competitive Intelligence Strategy Center
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Track real-time market shifts across Competitors, Market Trends, AI Advancements, and Customer Demand. Dynamically generate sales battlecards and instantly pivot outbound email templates to defend corporate ARR metrics.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-zinc-300">
            <Zap className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Continuous Ticker Active</span>
          </div>
        </div>
      </div>

      {feedbackAlert && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs font-mono text-rose-400 flex items-center gap-2.5 animate-fadeIn">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>{feedbackAlert}</span>
        </div>
      )}

      {/* Critical metrics blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">CRITICAL THREATS (SIM &gt;8.0)</span>
          <strong className="text-lg font-bold text-rose-400">{criticalThreatsCount} Inbound</strong>
          <p className="text-[9px] text-zinc-500">Requires executive response</p>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">OPERATIONAL THREATS</span>
          <strong className="text-lg font-bold text-yellow-500">{mediumThreatsCount} Tracked</strong>
          <p className="text-[9px] text-zinc-500">Product backlog priority</p>
        </div>

        <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono flex flex-col justify-center">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">ACTIVE INGESTION FEEDERS</span>
          <strong className="text-base font-bold text-white">{signalSourcesCount} Core Streams</strong>
          <p className="text-[8.5px] text-zinc-500">Competitors, Market, AI, CRM</p>
        </div>

        <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono flex flex-col justify-center">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">AUTO-OUTBOUND PILLING RATE</span>
          <strong className="text-base font-bold text-emerald-400">100% Dynamic</strong>
          <p className="text-[8.5px] text-zinc-500">Instant template updates</p>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-zinc-800 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
            activeTab === 'monitoring' 
              ? 'border-rose-500 text-rose-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          1. Continuous Monitoring Ingestion
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
            activeTab === 'reports' 
              ? 'border-rose-500 text-rose-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          2. Strategic Ingestion Simulator
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
            activeTab === 'recommendations' 
              ? 'border-rose-500 text-rose-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          3. Outbound Outreach Calibration
        </button>
      </div>

      {/* VIEW 1: Live Monitoring Feed & Active Battlecard details */}
      {activeTab === 'monitoring' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
          
          {/* Left panel: Live Stream list */}
          <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider">
                Live Market Telecom Ticker
              </span>
              <button 
                onClick={handleResetSignals}
                className="text-[9.5px] text-zinc-500 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Default
              </button>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {signals.map((sig) => {
                const isSelected = selectedSig.id === sig.id;
                const isCritical = sig.impactScore >= 8.0;
                return (
                  <button
                    key={sig.id}
                    onClick={() => setSelectedSig(sig)}
                    className={`w-full p-3.5 rounded-lg border text-left flex flex-col gap-2 transition cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-950 border-rose-500/40 text-rose-400' 
                        : 'bg-slate-950/30 border-slate-900 text-zinc-400 hover:border-zinc-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full text-[10px]">
                      <span className={`px-1.5 py-0.5 rounded font-bold uppercase border bg-slate-900 border-slate-800 ${
                        sig.source === 'Competitors' ? 'text-rose-400' :
                        sig.source === 'Market Trends' ? 'text-amber-400' :
                        sig.source === 'AI Advancements' ? 'text-violet-400' : 'text-blue-400'
                      }`}>
                        {sig.source}
                      </span>
                      <span className="text-zinc-500 font-medium">{sig.age}</span>
                    </div>

                    <span className="text-[11.5px] font-semibold text-white leading-normal">
                      {sig.title}
                    </span>

                    <div className="flex items-center justify-between text-[10.5px] pt-1.5 border-t border-zinc-900">
                      <span className="text-zinc-500">Impact Score:</span>
                      <span className={`font-bold ${isCritical ? 'text-rose-400' : 'text-yellow-400'}`}>
                        {sig.impactScore} / 10.0
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right panel: Extracted intelligence battlecard */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
              <div className="border-b border-zinc-800 pb-2.5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-rose-400" />
                  <h4 className="text-sm font-bold text-white">Active Strategic Ingestion Battlecard</h4>
                </div>
                <span className="text-[9.5px] bg-[#fb7185]/15 text-[#f43f5e] px-2 py-0.5 rounded font-bold border border-rose-500/10">
                  SIM REPORT INGESTION
                </span>
              </div>

              <div className="space-y-1.5 p-3.5 bg-slate-950 border border-slate-900 rounded-lg">
                <span className="text-[10px] text-zinc-500 font-bold block uppercase">Core Signal Description</span>
                <p className="text-zinc-300 text-[11.5px] leading-relaxed">
                  {selectedSig.content}
                </p>
              </div>

              {/* Dynamic defense battlecard action plans */}
              <div className="space-y-2">
                <span className="text-[10.5px] text-rose-400 font-bold block uppercase tracking-wide">
                  Defense Placement Recommendations
                </span>
                <ol className="list-decimal pl-5 space-y-1.5 text-zinc-400 leading-relaxed text-[11px]">
                  <li>Verify targeted ICP and segment outboxes on HubSpot instantly.</li>
                  <li><strong>Strategy Prompt Formulation:</strong> {selectedSig.recommendation}</li>
                  <li>Monitor incoming replies daily for negative sentiment alignment spikes to prevent deal slippage.</li>
                </ol>
              </div>

              {/* Quick actions mockup */}
              <div className="pt-2 border-t border-zinc-900 flex justify-between items-start gap-4">
                <div className="text-[10px] text-zinc-500 leading-normal max-w-sm">
                  <strong>Trigger Automation:</strong> Send automated battlecards directly to all outbound SDR accounts currently working target deals.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFeedbackAlert(`Notified 8 sales representative accounts with live target placement templates for: "${selectedSig.title}"`);
                    setTimeout(() => setFeedbackAlert(null), 5000);
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded font-bold tracking-tight text-xs transition shrink-0 cursor-pointer"
                >
                  Notify Sales Squad
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: Strategic Signal Generator Simulator */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
          
          {/* Left panel: Simulator forms */}
          <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
            <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider">
              Inject Simulated Market Signal
            </span>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <label className="text-[9.5px] text-zinc-500 block">Select Quick Simulator Ingestion Presets:</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => loadPreset('competitor_price')}
                  className="p-2.5 bg-slate-950 border border-slate-900 rounded hover:border-rose-500/40 text-left hover:text-white transition cursor-pointer"
                >
                  <Building className="w-3.5 h-3.5 block text-rose-400 mb-1" />
                  <span className="text-[10px] font-bold block">1. Competitor Price Slam</span>
                  <span className="text-[9px] text-zinc-500 block">Salesforce stand-alone</span>
                </button>

                <button
                  type="button"
                  onClick={() => loadPreset('ai_breakthrough')}
                  className="p-2.5 bg-slate-950 border border-slate-900 rounded hover:border-rose-500/40 text-left hover:text-white transition cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5 block text-violet-400 mb-1" />
                  <span className="text-[10px] font-bold block">2. SOTA Latency Drop</span>
                  <span className="text-[9px] text-zinc-500 block">Google speech parameter</span>
                </button>

                <button
                  type="button"
                  onClick={() => loadPreset('customer_pain')}
                  className="p-2.5 bg-slate-950 border border-slate-900 rounded hover:border-rose-500/40 text-left hover:text-white transition cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 block text-blue-400 mb-1" />
                  <span className="text-[10px] font-bold block">3. Competitor Delivery Rant</span>
                  <span className="text-[9px] text-zinc-500 block">Reddit SMTP complain</span>
                </button>
              </div>
            </div>

            {/* Detailed customization form */}
            <form onSubmit={handleInjectMarketSignal} className="space-y-3 pt-3 border-t border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 block">Feeder Stream Type</label>
                  <select
                    value={simSource}
                    onChange={(e: any) => setSimSource(e.target.value)}
                    className="w-full bg-slate-950 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-300 outline-none"
                  >
                    <option value="Competitors">Competitors</option>
                    <option value="Market Trends">Market Trends</option>
                    <option value="AI Advancements">AI Advancements</option>
                    <option value="Customer Demand">Customer Demand</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 block">Threat Intensity</label>
                  <select
                    value={simIntensity}
                    onChange={(e: any) => setSimIntensity(e.target.value as any)}
                    className="w-full bg-slate-950 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-300 outline-none"
                  >
                    <option value="HIGH">HIGH Priority</option>
                    <option value="MEDIUM">MEDIUM Priority</option>
                    <option value="LOW">LOW Priority</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 block">Impact Score [0.0 - 10.0]</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={simImpact}
                    onChange={(e) => setSimImpact(parseFloat(e.target.value) || 0.0)}
                    className="w-full bg-slate-950 border border-zinc-800 rounded px-2.5 py-1 text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 block">Trigger Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OutreachPro adds default DKIM auto-fixing loops..."
                  value={simTitle}
                  onChange={(e) => setSimTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-zinc-800 rounded px-2.5 py-1.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 block">Expanded Telemetry Detail</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide scraping/monitoring source context..."
                    value={simContent}
                    onChange={(e) => setSimContent(e.target.value)}
                    className="w-full bg-slate-950 border border-zinc-800 rounded-lg p-2.5 text-white leading-normal outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 block">Defensive Strategy Playbook Copy</label>
                  <textarea
                    rows={3}
                    placeholder="Provide advice to outbound / product units..."
                    value={simRec}
                    onChange={(e) => setSimRec(e.target.value)}
                    className="w-full bg-slate-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-400 leading-normal outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 block">Pivoted Outbound Email Template</label>
                <textarea
                  rows={2}
                  placeholder="Subject: Beyond blocks\n\nHi {{contact_name}},\n..."
                  value={simEmail}
                  onChange={(e) => setSimEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-zinc-800 rounded-lg p-2.5 text-emerald-400 leading-normal outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded font-bold transition flex items-center justify-center gap-1.5 text-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Inject Market Signal to Ticker
              </button>
            </form>

          </div>

          {/* Right panel: Active SIM Architecture guide */}
          <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4 font-mono text-zinc-400 leading-relaxed text-[11px] flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-white text-xs font-bold block pb-1 border-b border-zinc-800">
                Strategic Importance Matrix (SIM)
              </span>
              <p>
                EffectiveBuzz feeds raw ingested items into modular LLM classifiers that evaluate threat levels using two critical indices:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[10.5px]">
                <li><strong>Baseline Severity:</strong> Evaluation of direct business revenue impact on ARR (e.g. competitor cutting prices by 40% degrades lock-in margins).</li>
                <li><strong>Event Velocity:</strong> Estimate of how rapidly the market shift is propagating through standard customer targets.</li>
              </ul>
              <div className="p-3 bg-slate-950 border border-slate-900 rounded text-[10px] space-y-1 text-slate-300">
                <strong>Standard Core Formulation:</strong>
                <code className="block text-rose-400 font-bold font-mono">
                  Impact Score = Severity * 0.6 + Velocity * 0.4
                </code>
              </div>
            </div>

            <div className="p-3 bg-violet-500/5 rounded border border-violet-500/10 text-[10.5px]">
              <strong>AI Grounding:</strong> By cross-referencing outbound success metrics with inbound competitor signals, our sequence engine dynamically swaps template snippets to stay competitive.
            </div>

          </div>

        </div>
      )}

      {/* VIEW 3: Detailed Outbound Sequence pivot alignment */}
      {activeTab === 'recommendations' && (
        <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-6 font-mono text-xs">
          
          <div className="border-b border-zinc-800 pb-2.5">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
              Programmatic Campaign Outreach Adaptation
            </span>
            <h4 className="text-sm font-bold text-white pt-1">
              Active Outbound Copy Calibration: "{selectedSig.title}"
            </h4>
          </div>

          <p className="text-zinc-400 text-[11px] leading-relaxed">
            When competitive events cross defined thresholds, the system automatically inserts strategic value counter-arguments directly into our active outbound email sequences. Let's inspect the active template pivot:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Template Card */}
            <div className="md:col-span-8 p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-3.5">
              <div className="flex justify-between items-center text-[10px] text-zinc-500 pb-1.5 border-b border-zinc-900">
                <span>Active Pivot Template:</span>
                <span className="text-emerald-400 font-bold font-mono">CALIBRATED IN REALTIME</span>
              </div>

              <div className="p-4 bg-[#0a0f1d] border border-slate-950 rounded text-xs leading-relaxed text-zinc-300 select-all whitespace-pre-wrap font-mono">
                {selectedSig.pivotedEmailTemplate}
              </div>

              <div className="flex justify-between items-center text-[10px] text-zinc-500">
                <span>Variables: {"{{contact_name}}, {{company_name}}"}</span>
                <span>Ready for dispatch channels</span>
              </div>
            </div>

            {/* Ingestion Specs side panel */}
            <div className="md:col-span-4 p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-4">
              <span className="text-rose-400 font-bold text-[10px] uppercase block">
                Sequence Telemetry Check
              </span>
              <p className="text-zinc-500 text-[10.5px] leading-normal">
                This calibrated template addresses raw signals extracted from <strong className="text-zinc-300">"{selectedSig.source}"</strong> sources, calculated with an impact score metric benchmark of <strong className="text-white">{selectedSig.impactScore}/10</strong>.
              </p>

              <div className="p-3 bg-[#111827] rounded text-zinc-300 space-y-1 text-[10px]">
                <strong className="block text-white">Outbox Campaign Rules:</strong>
                <div>• Auto-pivots sequences within seconds.</div>
                <div>• Limits spam blocks with SPF health telemetry.</div>
                <div>• Monitors reply sentiments for CRM updates.</div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
