import React, { useState } from 'react';
import { 
  Cpu, Award, RotateCcw, ShieldAlert, Sparkles, Filter, Check, 
  ChevronRight, ArrowRight, UserCheck, Play, RefreshCw, Layers, 
  HelpCircle, ThumbsUp, ThumbsDown, MessageSquare, AlertCircle, FileCode, CheckCircle
} from 'lucide-react';

interface AgentSnapshot {
  id: string;
  name: string;
  version: string;
  stabilityScore: number; // 0 - 100
  lastEvolution: string;
  promptSnippet: string;
  learningsCount: number;
}

interface FeedbackEvent {
  id: number;
  source: 'Customer' | 'Campaign' | 'Meeting' | 'Revenue';
  agentInvolved: string;
  description: string;
  outcomeMetric: string;
  proposedFix: string;
}

const INITIAL_AGENTS: AgentSnapshot[] = [
  {
    id: "research",
    name: "Research Agent",
    version: "v2.0.4",
    stabilityScore: 94,
    lastEvolution: "4 hours ago",
    promptSnippet: "Identify firmographic triggers such as pending hosting migrations or DNS status drift.",
    learningsCount: 142
  },
  {
    id: "scoring",
    name: "Scoring Agent",
    version: "v2.1.0",
    stabilityScore: 96,
    lastEvolution: "1 hour ago",
    promptSnippet: "Assign hot tier status to signups with >$50k budget with custom enterprise parameters.",
    learningsCount: 98
  },
  {
    id: "outreach",
    name: "Outreach Agent",
    version: "v1.9.8",
    stabilityScore: 89,
    lastEvolution: "2 days ago",
    promptSnippet: "Craft sequencing messages focusing on SPF/DKIM diagnostic modules, avoiding spam indicators.",
    learningsCount: 310
  },
  {
    id: "reply",
    name: "Reply Agent",
    version: "v2.2.1",
    stabilityScore: 95,
    lastEvolution: "12 mins ago",
    promptSnippet: "Extract purchase timeframe signals from incoming customer request text strings.",
    learningsCount: 167
  },
  {
    id: "qualification",
    name: "Qualification Agent",
    version: "v2.0.1",
    stabilityScore: 92,
    lastEvolution: "Yesterday",
    promptSnippet: "Trigger Discovery scheduling triggers once double-confirmed authority index matches profile.",
    learningsCount: 75
  },
  {
    id: "forecast",
    name: "Forecast Agent",
    version: "v2.3.0",
    stabilityScore: 97,
    lastEvolution: "2 hours ago",
    promptSnippet: "Regress future run-rates with dynamic penalty variables based on active cohort count drop.",
    learningsCount: 54
  }
];

const INITIAL_EVENTS: FeedbackEvent[] = [
  {
    id: 1,
    source: "Customer",
    agentInvolved: "Research Agent",
    description: "Multi-tenant workspaces are churning at 4% due to incomplete SPF record setups",
    outcomeMetric: "-2.4% ARR Leakage",
    proposedFix: "Inject immediate SPF detection criteria into early target scanning script templates"
  },
  {
    id: 2,
    source: "Campaign",
    agentInvolved: "Outreach Agent",
    description: "Sequence CTAs emphasizing pricing plans trigger 15% bounce index on Gmail sending pools",
    outcomeMetric: "12% Open Rate Drop",
    proposedFix: "Rotate template copies dynamically to prioritize non-commercial deliverability hooks"
  },
  {
    id: 3,
    source: "Meeting",
    agentInvolved: "Qualification Agent",
    description: "Deals passing initial qualification fail in technical discovery due to budget mismatches",
    outcomeMetric: "35% Deal Stall",
    proposedFix: "Require strict explicit budget configuration before booking Discovery pipelines"
  },
  {
    id: 4,
    source: "Revenue",
    agentInvolved: "Forecast Agent",
    description: "SaaS Magic Number underpredicts EMEA region growth due to local VAR partnerships",
    outcomeMetric: "0.15x Multiplier Delta",
    proposedFix: "Refine expansion variables inside EMEA time-series modules conditionally"
  }
];

export default function SelfImprovingAgentConsole() {
  const [agents, setAgents] = useState<AgentSnapshot[]>(INITIAL_AGENTS);
  const [events, setEvents] = useState<FeedbackEvent[]>(INITIAL_EVENTS);
  const [selectedAgent, setSelectedAgent] = useState<AgentSnapshot>(INITIAL_AGENTS[0]);
  const [approvedLogs, setApprovedLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'evolution' | 'events' | 'safety' | 'canary'>('evolution');
  const [simulatedFeedbackDescription, setSimulatedFeedbackDescription] = useState('');
  const [simulatedSource, setSimulatedSource] = useState<'Customer' | 'Campaign' | 'Meeting' | 'Revenue'>('Customer');
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  // Quick Action: Inject and process feedback loops dynamically
  const handleSimulateFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedFeedbackDescription.trim()) return;

    // determine affected agent based on source
    // Customer -> Research, Campaign -> Outreach, Meeting -> Qualification, Revenue -> Forecast
    let targetAgent = "Research Agent";
    let fix = "Prioritize diagnostic scans";
    if (simulatedSource === 'Campaign') {
      targetAgent = "Outreach Agent";
      fix = "Revise cold intro tone weights";
    } else if (simulatedSource === 'Meeting') {
      targetAgent = "Qualification Agent";
      fix = "Refine budget qualification flags";
    } else if (simulatedSource === 'Revenue') {
      targetAgent = "Forecast Agent";
      fix = "Recalibrate LTV:CAC forecast offsets";
    }

    const newEvent: FeedbackEvent = {
      id: Date.now(),
      source: simulatedSource,
      agentInvolved: targetAgent,
      description: simulatedFeedbackDescription,
      outcomeMetric: "+1 Learning Metric",
      proposedFix: fix
    };

    setEvents(prev => [newEvent, ...prev]);
    
    // Increment learnings on matching Agent
    setAgents(prev => prev.map(ag => {
      if (ag.name === targetAgent) {
        return {
          ...ag,
          learningsCount: ag.learningsCount + 1,
          lastEvolution: "Just Now",
          stabilityScore: Math.min(100, ag.stabilityScore + 1)
        };
      }
      return ag;
    }));

    // Update selected text if highlight matches
    if (selectedAgent.name === targetAgent) {
      setSelectedAgent(prev => ({
        ...prev,
        learningsCount: prev.learningsCount + 1,
        lastEvolution: "Just Now",
        stabilityScore: Math.min(100, prev.stabilityScore + 1)
      }));
    }

    setSimulatedFeedbackDescription('');
    setActiveAlert(`Successfully synthesized feedback vector into the ${targetAgent}! Prompts evolved dynamically.`);
    setTimeout(() => setActiveAlert(null), 5000);
  };

  // HITL (Human-in-the-loop) validation approvals
  const handleApproveFix = (evtId: number, name: string, fix: string) => {
    // Simulates code evolution & version bumps
    setAgents(prev => prev.map(ag => {
      if (ag.name === name) {
        // Increment minor version string segment
        const parts = ag.version.split('.');
        const nextPatch = parseInt(parts[2]) + 1;
        const nextVer = `${parts[0]}.${parts[1]}.${nextPatch}`;
        
        return {
          ...ag,
          version: nextVer,
          lastEvolution: "Just approved",
          promptSnippet: fix
        };
      }
      return ag;
    }));

    // Update highlight panel state immediately
    if (selectedAgent.name === name) {
      const parts = selectedAgent.version.split('.');
      const nextPatch = parseInt(parts[2]) + 1;
      setSelectedAgent(prev => ({
        ...prev,
        version: `${parts[0]}.${parts[1]}.${nextPatch}`,
        lastEvolution: "Just approved",
        promptSnippet: fix
      }));
    }

    // append to audit stream
    setApprovedLogs(prev => [`Approved version upgrade for ${name} to address feedback. Core parameters updated.`, ...prev]);
    // remove event
    setEvents(prev => prev.filter(x => x.id !== evtId));
  };

  const getSourceColor = (src: 'Customer' | 'Campaign' | 'Meeting' | 'Revenue') => {
    if (src === 'Customer') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (src === 'Campaign') return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    if (src === 'Meeting') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
  };

  return (
    <div className="space-y-6">
      {/* C-Suite/Architect header layout */}
      <div className="bg-gradient-to-r from-indigo-500/15 via-zinc-500/5 to-transparent border border-indigo-900/30 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-500/15 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
                AGI Systems Architect Command
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Self-Improving Protocol v2.0.0</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300">
              Autonomous Agent Optimization Hub
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Monitor, simulate, and approve self-tuning feedback loops across Research, Scoring, Outreach, Reply, Qualification and Forecast Agents. System translates customer satisfaction, campaign outcomes and revenue telemetry into optimized prompt instructions and parameters.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-emerald-400">
            <Layers className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Active Closed-Loop Learning</span>
          </div>
        </div>
      </div>

      {/* Alert banner display */}
      {activeAlert && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-400 flex items-center gap-2.5 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{activeAlert}</span>
        </div>
      )}

      {/* Dynamic Evolution metrics statistics dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">ACTIVE REVOLUTIONS</span>
          <strong className="text-lg font-bold text-white">891 Iterations</strong>
          <p className="text-[9px] text-zinc-500">Autonomous cognitive enhancements</p>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">STABILITY THRESHOLD</span>
          <strong className="text-lg font-bold text-emerald-400">93.8% Robustness</strong>
          <p className="text-[9px] text-zinc-500">No alignment collapse triggers</p>
        </div>

        <div className="p-4 bg-slate-950 border border-[#1f2937] rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">FEEDBACK PIPELINE RATE</span>
          <strong className="text-lg font-bold text-white">41.2 events / hr</strong>
          <p className="text-[9px] text-zinc-500">Telemetry ingest from database nodes</p>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">HITL QUEUED REVIEWS</span>
          <strong className={`text-lg font-bold ${events.length > 0 ? 'text-amber-400' : 'text-zinc-500'}`}>
            {events.length} Approvals Pending
          </strong>
          <p className="text-[9px] text-zinc-500">Awaiting human board verify</p>
        </div>

      </div>

      {/* Tabs list switches */}
      <div className="flex border-b border-zinc-800 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('evolution')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
            activeTab === 'evolution' 
              ? 'border-indigo-500 text-indigo-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          1. Fleet Evolution Status
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'events' 
              ? 'border-indigo-500 text-indigo-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          2. Learning Queue ({events.length})
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
            activeTab === 'safety' 
              ? 'border-indigo-500 text-indigo-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          3. Safety Guardrails
        </button>
        <button
          onClick={() => setActiveTab('canary')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
            activeTab === 'canary' 
              ? 'border-indigo-500 text-indigo-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          4. Deployment Ledgers
        </button>
      </div>

      {/* 1. Fleet Evolution Status Panel View */}
      {activeTab === 'evolution' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Agent checklist table */}
          <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider block">Agent Telemetry Fleet</span>
              <span className="text-[10px] text-zinc-400 font-mono">Fleet Size: 6 Core Modules</span>
            </div>

            <div className="space-y-2.5">
              {agents.map((agent) => {
                const isSelected = selectedAgent.id === agent.id;
                return (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex justify-between items-center gap-4 ${
                      isSelected 
                        ? 'bg-slate-950 border-indigo-500/40 shadow-inner' 
                        : 'bg-slate-950/40 border-slate-900 hover:border-zinc-700'
                    }`}
                  >
                    <div className="space-y-1 font-mono min-w-0">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                        <h5 className="text-[12.5px] font-bold text-white tracking-tight">
                          {agent.name}
                        </h5>
                        <span className="px-1.5 py-0.5 rounded bg-zinc-900 text-[9px] text-zinc-500 border border-slate-800">
                          {agent.version}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate max-w-md">
                        {agent.promptSnippet}
                      </p>
                    </div>

                    <div className="flex flex-col items-end shrink-0 font-mono gap-1">
                      <span className="text-xs font-bold text-emerald-400">
                        {agent.learningsCount} Learning Vectors
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        Stable Index: {agent.stabilityScore}%
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Inspections Details */}
          <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] p-5 rounded-xl flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-[10.5px] text-indigo-400 font-bold uppercase tracking-wider block">Cognitive Inspection</span>
                <span className="text-[10px] text-white bg-slate-950 p-1 rounded font-mono font-bold">
                  {selectedAgent.version}
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 text-[10px] block font-bold uppercase">SELECTED ENTITY</span>
                  <strong className="text-sm font-bold text-white pt-0.5 block">{selectedAgent.name}</strong>
                </div>

                <div>
                  <span className="text-zinc-500 text-[10px] block font-bold uppercase">LAST COGNITIVE UPDATE</span>
                  <span className="text-zinc-300 block">{selectedAgent.lastEvolution}</span>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5">
                  <span className="text-emerald-400 text-[10px] font-bold block uppercase tracking-wide">ACTIVE SYSTEM PROMPT RULE</span>
                  <div className="p-2.5 bg-[#0f172a] rounded select-all font-mono text-[11px] text-zinc-300 leading-relaxed max-h-[120px] overflow-y-auto border border-slate-950">
                    "{selectedAgent.promptSnippet}"
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-900">
                    <span className="text-zinc-500 block">LEARNED DATAPOINTS</span>
                    <strong className="text-white text-xs">{selectedAgent.learningsCount} files</strong>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-900">
                    <span className="text-zinc-500 block">STABILITY HEALTH</span>
                    <strong className="text-emerald-400 text-xs">{selectedAgent.stabilityScore}% Pass</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated manual inject block */}
            <form onSubmit={handleSimulateFeedback} className="space-y-3 pt-3 border-t border-zinc-800">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide font-mono">Simulate Telemetry Feedback Loop</label>
                <select
                  value={simulatedSource}
                  onChange={(e) => setSimulatedSource(e.target.value as any)}
                  className="bg-slate-950 border border-zinc-800 rounded px-1.5 py-0.5 text-[9px] font-mono text-zinc-400 max-w-[120px]"
                >
                  <option value="Customer">Customer</option>
                  <option value="Campaign">Campaign</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Revenue">Revenue</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Workspace SPF setup failures detected on DNS scans..."
                  value={simulatedFeedbackDescription}
                  onChange={(e) => setSimulatedFeedbackDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white transition font-mono text-[9px] cursor-pointer"
                >
                  Inject
                </button>
              </div>
            </form>

          </div>

        </div>
      )}

      {/* 2. Learning Queue HITL Panel View */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Events queue list to approve */}
          <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider block">Human-In-The-Loop Triage Queues</span>
              <span className="text-[10px] text-zinc-400 font-mono">Immediate Action Required: {events.length}</span>
            </div>

            {events.length === 0 ? (
              <div className="p-8 text-center bg-slate-950 border border-slate-900 rounded-xl space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs font-mono text-zinc-400">All evolutionary feedback items are merged and approved by board consensus.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {events.map((evt) => (
                  <div key={evt.id} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-3 font-mono">
                    
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold border ${getSourceColor(evt.source)}`}>
                            {evt.source} Outcome
                          </span>
                          <span className="text-[10px] text-zinc-500">Affects pipeline: {evt.agentInvolved}</span>
                        </div>
                        <p className="text-xs text-white font-bold leading-normal pt-1">
                          {evt.description}
                        </p>
                      </div>
                      <span className="text-xs text-rose-400 font-bold shrink-0">{evt.outcomeMetric}</span>
                    </div>

                    {/* Proposed Prompt update */}
                    <div className="p-3 bg-zinc-900/60 rounded-lg space-y-1.5 border border-zinc-800">
                      <span className="text-[9.5px] text-emerald-400 font-bold uppercase block">Proposed Prompt evolution fix:</span>
                      <p className="text-[11px] text-zinc-300 italic">
                        "{evt.proposedFix}"
                      </p>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => handleApproveFix(evt.id, evt.agentInvolved, evt.proposedFix)}
                        className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 rounded-lg text-[10px] font-bold font-mono transition cursor-pointer"
                      >
                        Approve & Merge Prompt vUpdate
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right: Approval Logs history */}
          <div className="lg:col-span-4 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
            <div className="pb-2 border-b border-zinc-800 flex justify-between items-center">
              <span className="text-[10.5px] text-[#3b82f6] font-bold uppercase tracking-wider block">Audit Ledger Trail</span>
              <span className="text-[9px] font-mono text-zinc-500">Live logs</span>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {approvedLogs.length === 0 ? (
                <p className="text-[10px] text-zinc-500 font-mono text-center pt-8">No prompt versions approved in the current session yet.</p>
              ) : (
                approvedLogs.map((log, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 border border-slate-900 rounded-lg text-[9.5px] font-mono text-zinc-400 leading-normal">
                    <span className="text-emerald-500 font-bold">✓ Approved Loop Trigger</span>: {log}
                  </div>
                ))
              )}
            </div>

          </div>

        </div>
      )}

      {/* 3. Safety Guardrails Panel View */}
      {activeTab === 'safety' && (
        <div className="bg-[#111827] border border-[#1f2937] p-6 rounded-xl space-y-6 font-mono text-xs">
          
          <div className="border-b border-zinc-800 pb-3">
            <span className="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider block font-mono">Cognitive Integrity guardrails</span>
            <h4 className="text-sm font-bold text-white pt-1">Sentinel Firewall Configuration Policies</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10.5px] text-indigo-400 font-bold uppercase">PII Redaction filter</span>
                <span className="px-1.5 py-0.5 rounded text-[8.5px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">Active</span>
              </div>
              <p className="text-zinc-400 text-[10.5px] leading-relaxed">
                Applies high-speed Regex and NLP Named Entity Recognition (NER) to wipe out addresses, API tokens, security hashes and personal telephone tags prior to pipeline integration.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10.5px] text-indigo-400 font-bold uppercase">Hallucination Threshold</span>
                <span className="px-1.5 py-0.5 rounded text-[8.5px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">Active</span>
              </div>
              <p className="text-zinc-400 text-[10.5px] leading-relaxed">
                Checks token logprobs real-time during output drafts. Throttles temperature parameters down into static deterministic modes whenever draft uncertainty exceeds 15%.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10.5px] text-indigo-400 font-bold uppercase">Rate-Limiter Circuit Breaker</span>
                <span className="px-1.5 py-0.5 rounded text-[8.5px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">Active</span>
              </div>
              <p className="text-zinc-400 text-[10.5px] leading-relaxed">
                Monitors daily sequential loop execution counts. Caps each individual sending profile outbox to safeguard infrastructure credit balances against runaway loops.
              </p>
            </div>

          </div>

          <div className="p-4 bg-yellow-500/5 border border-yellow-500/15 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
            <div className="space-y-1">
              <h5 className="font-bold text-yellow-400">Compliance Boundary Policy Checklist</h5>
              <p className="text-zinc-400 text-[10px] leading-relaxed">
                The Self-Improving Agent Ecosystem operates in strict adherence to CAN-SPAM specifications. Outward sequences generated during self-optimization automatically exclude spam-correlated prefixes and observe mandatory SPF authentication prior to campaign deployment.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* 4. Deployment Ledgers Panel View */}
      {activeTab === 'canary' && (
        <div className="bg-[#111827] border border-[#1f2937] p-6 rounded-xl space-y-4 font-mono text-xs">
          
          <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
            <div>
              <span className="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider block">Deployment Strategy logs</span>
              <h4 className="text-sm font-bold text-white pt-1">Active Canary Pipelines</h4>
            </div>
            <span className="text-xs text-indigo-400">Strategy: 80% Stable / 20% Canary Split</span>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-2 text-[10px] text-zinc-500 uppercase font-bold border-b border-slate-900 pb-2">
              <div className="col-span-3">Agent Group</div>
              <div className="col-span-2">Stable (PROD)</div>
              <div className="col-span-2">Canary (TEST)</div>
              <div className="col-span-3">Target Routing</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            <div className="grid grid-cols-12 gap-2 py-1 items-center border-b border-slate-900">
              <div className="col-span-3 font-bold text-white">Research Agent</div>
              <div className="col-span-2 text-zinc-400">v2.0.4 (80% vol)</div>
              <div className="col-span-2 text-indigo-400">v2.0.5 (20% vol)</div>
              <div className="col-span-3 text-zinc-500">APAC sending targets</div>
              <div className="col-span-2 text-right"><span className="px-1.5 py-0.5 rounded text-[9px] text-emerald-400 bg-emerald-500/10 font-bold">Stable</span></div>
            </div>

            <div className="grid grid-cols-12 gap-2 py-1 items-center border-b border-slate-900">
              <div className="col-span-3 font-bold text-white">Scoring Agent</div>
              <div className="col-span-2 text-zinc-400">v2.1.0 (80% vol)</div>
              <div className="col-span-2 text-indigo-400">v2.1.1 (20% vol)</div>
              <div className="col-span-3 text-zinc-500">Inbound corporate filter</div>
              <div className="col-span-2 text-right"><span className="px-1.5 py-0.5 rounded text-[9px] text-emerald-400 bg-emerald-500/10 font-bold">Stable</span></div>
            </div>

            <div className="grid grid-cols-12 gap-2 py-1 items-center border-b border-slate-900">
              <div className="col-span-3 font-bold text-white">Outreach Agent</div>
              <div className="col-span-2 text-zinc-400">v1.9.8 (90% vol)</div>
              <div className="col-span-2 text-indigo-400">v1.9.9 (10% vol)</div>
              <div className="col-span-3 text-zinc-500">Warm subnets warmup pools</div>
              <div className="col-span-2 text-right"><span className="px-1.5 py-0.5 rounded text-[9px] text-amber-500 bg-amber-500/10 font-bold">Evaluating</span></div>
            </div>

            <div className="grid grid-cols-12 gap-2 py-1 items-center">
              <div className="col-span-3 font-bold text-white">Forecast Agent</div>
              <div className="col-span-2 text-zinc-400">v2.3.0 (100% vol)</div>
              <div className="col-span-2 text-zinc-500">None (0% vol)</div>
              <div className="col-span-3 text-zinc-500">Core financial ledger</div>
              <div className="col-span-2 text-right"><span className="px-1.5 py-0.5 rounded text-[9px] text-emerald-400 bg-emerald-500/10 font-bold">Stable</span></div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
