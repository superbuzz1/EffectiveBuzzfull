import React, { useState, useEffect } from 'react';
import { 
  Briefcase, TrendingUp, Cpu, Sliders, ShieldCheck, ChevronRight, Play, 
  HelpCircle, Sparkles, RefreshCw, AlertTriangle, PlayCircle, Plus, 
  FileText, ArrowDownRight, ArrowUpRight, Scale, Users, Ban, Layers, Coins,
  RotateCcw
} from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  category: 'Build Next' | 'Stop Building' | 'Invest In' | 'Automate' | 'Delegate';
  roleOrigin: 'CEO' | 'CTO' | 'CPO' | 'CRO' | 'Board Chair' | 'Founder';
  revenueImpactValue: number; // 1 to 10 scale (revenue impact)
  strategicImportanceValue: number; // 1 to 10 scale (strategic value)
  effortSprints: number; // 1 to 5 scale (estimated effort)
  status: 'Draft' | 'Active Pipeline' | 'On Hold' | 'Deprecating';
  description: string;
}

const INITIAL_ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: "road_1",
    title: "AI-driven DNS & Deliverability Recovery",
    category: "Build Next",
    roleOrigin: "CTO",
    revenueImpactValue: 9.5,
    strategicImportanceValue: 9.8,
    effortSprints: 3,
    status: "Active Pipeline",
    description: "Automatically repair SPF and DKIM configuration records to address severe HubSpot/SMTP delivery rate penalties."
  },
  {
    id: "road_2",
    title: "Compliance-First GDPR Lead Capture Directory",
    category: "Build Next",
    roleOrigin: "CPO",
    revenueImpactValue: 8.5,
    strategicImportanceValue: 9.0,
    effortSprints: 1.5,
    status: "Active Pipeline",
    description: "Deploy opt-in compliant lists in high-intensity European GDPR zones to offer absolute delivery safety."
  },
  {
    id: "road_3",
    title: "Gemini-3.5-Flash Core Prompt Router Integration",
    category: "Invest In",
    roleOrigin: "CTO",
    revenueImpactValue: 9.0,
    strategicImportanceValue: 9.5,
    effortSprints: 5,
    status: "Active Pipeline",
    description: "Multi-model prompt dispatch system routing high volume context-mapping tasks to ultra-low cost LLM nodes."
  },
  {
    id: "road_4",
    title: "Autonomous Outbound Nurture Conversation Loops",
    category: "Automate",
    roleOrigin: "CRO",
    revenueImpactValue: 9.2,
    strategicImportanceValue: 8.8,
    effortSprints: 2,
    status: "Active Pipeline",
    description: "Pivoting email replies dynamically through classification LLM filters to book discovery slots automatically."
  },
  {
    id: "road_5",
    title: "Legacy Browser Extension Client-Side Scrapers",
    category: "Stop Building",
    roleOrigin: "CPO",
    revenueImpactValue: 1.5,
    strategicImportanceValue: 2.0,
    effortSprints: 1,
    status: "Deprecating",
    description: "De-prioritize manual scraper extension development. Redirect scarce developers toward backend compliance maps."
  },
  {
    id: "road_6",
    title: "Individual Outbox Warm-Up DNS Registration",
    category: "Delegate",
    roleOrigin: "CEO",
    revenueImpactValue: 6.5,
    strategicImportanceValue: 6.0,
    effortSprints: 2,
    status: "Draft",
    description: "Offload initial inbox ramp-up configurations and secondary domain registrations to Customer Support Enablement."
  },
  {
    id: "road_7",
    title: "Multi-Region Sandbox Failover Cluster",
    category: "Invest In",
    roleOrigin: "Board Chair",
    revenueImpactValue: 7.0,
    strategicImportanceValue: 8.5,
    effortSprints: 4,
    status: "Draft",
    description: "Maintain a live-replicated secondary environment to assure enterprise SLA boundaries under high-volume spikes."
  }
];

export default function ContinuousRoadmapConsole() {
  const [items, setItems] = useState<RoadmapItem[]>(INITIAL_ROADMAP_ITEMS);
  const [selectedRole, setSelectedRole] = useState<'ALL' | 'CEO' | 'CTO' | 'CPO' | 'CRO' | 'Board Chair'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'Build Next' | 'Stop Building' | 'Invest In' | 'Automate' | 'Delegate'>('ALL');
  
  // Custom Initiative Form States
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState<'Build Next' | 'Stop Building' | 'Invest In' | 'Automate' | 'Delegate'>('Build Next');
  const [newRole, setNewRole] = useState<'CEO' | 'CTO' | 'CPO' | 'CRO' | 'Board Chair' | 'Founder'>('CEO');
  const [newRev, setNewRev] = useState<number>(8.0);
  const [newStrat, setNewStrat] = useState<number>(8.5);
  const [newEff, setNewEff] = useState<number>(3);
  const [newDesc, setNewDesc] = useState('');

  const [feedbackAlert, setFeedbackAlert] = useState<string | null>(null);

  // Live Simulated Telemetry States (Simulates real-time updates from market signals & ARR)
  const [liveArrValue, setLiveArrValue] = useState<number>(18240500); 
  const [liveChurnRiskRating, setLiveChurnRiskRating] = useState<number>(4.2);
  const [liveTelemetryLog, setLiveTelemetryLog] = useState<string>("Continuous telemetry link active. Syncing CRM records...");

  // Calculate dynamic Strategy Priority Score: (Impact * Importance) / Effort
  const calculateScore = (item: RoadmapItem) => {
    const raw = (item.revenueImpactValue * item.strategicImportanceValue) / Math.max(0.5, item.effortSprints);
    return Math.round(raw * 10) / 10;
  };

  // Live telemetry simulation ticks
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate micro fluctuations in metrics
      setLiveArrValue(prev => prev + (Math.random() > 0.55 ? 1200 : -450));
      setLiveChurnRiskRating(prev => {
        const delta = (Math.random() - 0.5) * 0.1;
        return Math.min(10.0, Math.max(0.0, Math.round((prev + delta) * 100) / 100));
      });

      // Randomized intelligence logs
      const randomLogs = [
        "Ingested customer feedback pattern: Deliverability complaints down by 2% following DNS test.",
        "Scraping listener: OutreachPro website pricing changes verified, baseline severity index locked.",
        "RKG update: New entity linkage established between active deals and model routers.",
        "Board dashboard: Computing optimal capital allocation margins on continuous loop.",
        "Growth telemetry: Linear experiment canary conversion holds steady at 12.4% yield."
      ];
      setLiveTelemetryLog(randomLogs[Math.floor(Math.random() * randomLogs.length)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleCreateInitiative = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: RoadmapItem = {
      id: `road_${Date.now()}`,
      title: newTitle,
      category: newCat,
      roleOrigin: newRole,
      revenueImpactValue: Number(newRev),
      strategicImportanceValue: Number(newStrat),
      effortSprints: Number(newEff),
      status: 'Active Pipeline',
      description: newDesc || "No continuous description available."
    };

    setItems(prev => [newItem, ...prev]);
    setNewTitle('');
    setNewDesc('');
    
    setFeedbackAlert(`Successfully formulated Board directive: "${newItem.title}" with Priority Score: ${calculateScore(newItem)}!`);
    setTimeout(() => setFeedbackAlert(null), 4500);
  };

  const handleUpdateStatus = (id: string, nextStatus: 'Draft' | 'Active Pipeline' | 'On Hold' | 'Deprecating') => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: nextStatus };
      }
      return item;
    }));
    setFeedbackAlert(`Initiative status updated.`);
    setTimeout(() => setFeedbackAlert(null), 3000);
  };

  const handleResetDefaults = () => {
    setItems(INITIAL_ROADMAP_ITEMS);
    setFeedbackAlert("Executive Strategic Roadmap reverted to recommended default configuration.");
  };

  // Filter items based on selections
  const filteredItems = items.filter(item => {
    const roleMatch = selectedRole === 'ALL' || item.roleOrigin === selectedRole;
    const catMatch = selectedCategory === 'ALL' || item.category === selectedCategory;
    return roleMatch && catMatch;
  });

  // Sort items descending by computed score
  const sortedAndFiltered = [...filteredItems].sort((a, b) => calculateScore(b) - calculateScore(a));

  return (
    <div className="space-y-6">
      
      {/* Dynamic Leadership Header */}
      <div className="bg-gradient-to-r from-violet-500/15 via-zinc-500/5 to-transparent border border-violet-900/30 rounded-xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-violet-500/15 text-violet-400 text-xs font-mono font-bold uppercase tracking-wider">
                EXECUTIVE COMMITTEE COOP
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Live Strategic Alignment Engine</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300">
              Continuously Updated Strategic Roadmap
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Synthesize insights across Revenue Metrics, Churn Risks, and Competitive Intelligence. This continuous console alignments priorities from C-Suite officers to defend ARR limits and guide roadmap investments dynamically.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 font-mono text-right shrink-0 bg-slate-950 p-3 rounded-lg border border-slate-900">
            <span className="text-[9px] text-zinc-500 font-bold block uppercase tracking-wider">LIVE ARR METRIC TICKER</span>
            <strong className="text-sm font-bold text-emerald-400">${liveArrValue.toLocaleString()} ARR</strong>
            <span className="text-[8.5px] text-zinc-500">Churn Risk Level: <span className="text-amber-400">{liveChurnRiskRating}/10</span></span>
          </div>
        </div>
      </div>

      {feedbackAlert && (
        <div className="p-3 bg-violet-500/15 border border-violet-500/30 rounded-xl text-xs font-mono text-violet-400 flex items-center gap-2 animate-fadeIn">
          <ShieldCheck className="w-4 h-4" />
          <span>{feedbackAlert}</span>
        </div>
      )}

      {/* Live System Operational Log Bar */}
      <div className="p-3 bg-[#111827] border border-[#1f2937] rounded-lg flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2.5 text-zinc-400">
          <RefreshCw className="w-3.5 h-3.5 text-violet-400 animate-spin" />
          <span><strong>Dynamic Ingestion Feed:</strong> {liveTelemetryLog}</span>
        </div>
        <button
          onClick={handleResetDefaults}
          className="text-zinc-500 hover:text-white flex items-center gap-1 transition text-[9px] font-bold tracking-tight cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> REVERT ROADMAP
        </button>
      </div>

      {/* Strategic Role Filters & Categories Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Officer Filter */}
        <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl space-y-2.5">
          <span className="text-[10px] text-zinc-500 font-bold block uppercase font-mono">
            Filter by Executive Board Owner
          </span>
          <div className="flex flex-wrap gap-1.5 font-mono text-[10.5px]">
            {['ALL', 'CEO', 'CTO', 'CPO', 'CRO', 'Board Chair'].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role as any)}
                className={`px-3 py-1.5 rounded transition font-medium cursor-pointer ${
                  selectedRole === role 
                    ? 'bg-violet-600 text-white font-bold' 
                    : 'bg-slate-950 text-zinc-400 hover:text-white border border-slate-900/60'
                }`}
              >
                {role === 'ALL' ? 'Show All Owners' : role}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl space-y-2.5">
          <span className="text-[10px] text-zinc-500 font-bold block uppercase font-mono">
            Filter by Strategic Action Category
          </span>
          <div className="flex flex-wrap gap-1.5 font-mono text-[10.5px]">
            {['ALL', 'Build Next', 'Stop Building', 'Invest In', 'Automate', 'Delegate'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-3 py-1.5 rounded transition font-medium cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-rose-600 text-white font-bold' 
                    : 'bg-slate-950 text-zinc-400 hover:text-white border border-slate-900/60'
                }`}
              >
                {cat === 'ALL' ? 'Show All Actions' : cat}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Main Roadmap Board Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        
        {/* Left Column: Directives sorted by Priority Score */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl flex justify-between items-center">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
              Active Strategy Rankings (Priority Score Descending)
            </span>
            <span className="text-[9.5px] text-zinc-500">
              Formula: <code className="text-violet-400 font-bold">(Impact * Importance) / Effort</code>
            </span>
          </div>

          <div className="space-y-3.5">
            {sortedAndFiltered.length === 0 ? (
              <div className="p-8 text-center bg-[#111827] border border-dashed border-zinc-800 text-zinc-500 rounded-xl">
                No active directives match the current filter selection criteria.
              </div>
            ) : (
              sortedAndFiltered.map((item) => {
                const pScore = calculateScore(item);
                const isHighPriority = pScore >= 15.0;
                
                return (
                  <div 
                    key={item.id} 
                    className="p-4 bg-[#111827] border border-[#1f2937] rounded-xl space-y-3 shadow-sm hover:border-zinc-700/60 transition"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                            item.category === 'Build Next' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                            item.category === 'Stop Building' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                            item.category === 'Invest In' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' :
                            item.category === 'Automate' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                            'bg-violet-500/10 border-violet-500/20 text-violet-400'
                          }`}>
                            {item.category}
                          </span>
                          <span className="font-bold text-[10px] bg-slate-950 px-2 py-0.5 rounded text-zinc-400">
                            Owner: {item.roleOrigin}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white pt-1">
                          {item.title}
                        </h4>
                      </div>

                      {/* Strategic Priority Badge block */}
                      <div className="p-2.5 bg-slate-950 rounded border border-slate-900 text-center shrink-0 min-w-[120px]">
                        <span className="text-[8px] text-zinc-500 block uppercase font-bold tracking-wider">Priority Score</span>
                        <strong className={`text-sm font-bold block ${isHighPriority ? 'text-violet-400' : 'text-zinc-300'}`}>
                          {pScore}
                        </strong>
                      </div>
                    </div>

                    <p className="text-zinc-400 text-[11px] leading-relaxed bg-slate-950/40 p-3 rounded border border-slate-900/50">
                      {item.description}
                    </p>

                    {/* Numeric Ranking Details */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-[10px] text-zinc-500 pt-2 border-t border-zinc-900">
                      <div>
                        <span>Rev Impact:</span> <strong className="text-zinc-300">{item.revenueImpactValue} / 10</strong>
                      </div>
                      <div>
                        <span>Importance:</span> <strong className="text-zinc-300">{item.strategicImportanceValue} / 10</strong>
                      </div>
                      <div>
                        <span>Effort Rank:</span> <strong className="text-zinc-300">{item.effortSprints} Sprints</strong>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Status:</span>
                        <select
                          value={item.status}
                          onChange={(e: any) => handleUpdateStatus(item.id, e.target.value)}
                          className="bg-slate-950 border border-zinc-800 rounded px-1.5 py-0.5 text-[9.5px] text-amber-400 font-bold outline-none cursor-pointer"
                        >
                          <option value="Draft">Draft</option>
                          <option value="Active Pipeline">Live</option>
                          <option value="On Hold">Hold</option>
                          <option value="Deprecating">Done/Stop</option>
                        </select>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Add Custom Board Directive Framework */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-3.5">
            <div className="flex items-center gap-1.5 pb-2 border-b border-zinc-800">
              <FileText className="w-4 h-4 text-violet-400" />
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                Executive Directive Formulator
              </span>
            </div>

            <form onSubmit={handleCreateInitiative} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9.5px] text-zinc-400 block font-bold">Directive Title / Goal</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Expand outbound compliance routing maps..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-zinc-900 rounded-lg px-2.5 py-2 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] text-zinc-400 block font-bold">Action Category</label>
                <select
                  value={newCat}
                  onChange={(e: any) => setNewCat(e.target.value)}
                  className="w-full bg-slate-950 border border-zinc-900 rounded-lg px-2.5 py-2 text-zinc-300 outline-none"
                >
                  <option value="Build Next">Build Next (Short-term)</option>
                  <option value="Stop Building">Stop Building (Deprecate)</option>
                  <option value="Invest In">Invest In (Strategic R&D)</option>
                  <option value="Automate">Automate (Efficiency Loop)</option>
                  <option value="Delegate">Delegate (Staff Release)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] text-zinc-400 block font-bold">Direct Executive Sponsor</label>
                <select
                  value={newRole}
                  onChange={(e: any) => setNewRole(e.target.value)}
                  className="w-full bg-slate-950 border border-zinc-900 rounded-lg px-2.5 py-2 text-zinc-300 outline-none"
                >
                  <option value="CEO">Founder CEO</option>
                  <option value="CTO">Chief Technology Officer (CTO)</option>
                  <option value="CPO">Chief Product Officer (CPO)</option>
                  <option value="CRO">Chief Revenue Officer (CRO)</option>
                  <option value="Board Chair">Board Chair</option>
                </select>
              </div>

              {/* Numerical Weights */}
              <div className="grid grid-cols-3 gap-1.5">
                <div className="space-y-1">
                  <label className="text-[8.5px] text-zinc-400 block font-bold">Rev Impact (1-10)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="10"
                    value={newRev}
                    onChange={(e) => setNewRev(parseFloat(e.target.value) || 8.0)}
                    className="w-full bg-slate-950 border border-zinc-900 rounded px-2 py-1 text-white text-center outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[8.5px] text-zinc-400 block font-bold">Importance (1-10)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="10"
                    value={newStrat}
                    onChange={(e) => setNewStrat(parseFloat(e.target.value) || 8.5)}
                    className="w-full bg-slate-950 border border-zinc-900 rounded px-2 py-1 text-white text-center outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[8.5px] text-zinc-400 block font-bold">Effort Sprints (1-5)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="5"
                    value={newEff}
                    onChange={(e) => setNewEff(parseFloat(e.target.value) || 3)}
                    className="w-full bg-slate-950 border border-zinc-900 rounded px-2 py-1 text-white text-center outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] text-zinc-400 block font-bold">Directive Context Brief</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Provide supporting board metrics..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-zinc-900 rounded-lg p-2.5 text-zinc-300 leading-normal outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Commit Executive Order
              </button>
            </form>

            <div className="pt-3 border-t border-zinc-800 text-[10px] text-zinc-500 leading-normal">
              <strong>Interactive Calculations:</strong> The dynamic Score matrix evaluates ARR allocation efficiency on submission. High scores filter automatically to lead core delivery priorities.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
