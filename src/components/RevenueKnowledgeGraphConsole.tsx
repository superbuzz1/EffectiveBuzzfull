import React, { useState } from 'react';
import { 
  Network, Database, Cpu, Layers, GitBranch, Terminal, ShieldCheck, 
  HelpCircle, Sparkles, Plus, Play, RotateCcw, ArrowRight, Check,
  AlertCircle, MessageSquare, ChevronRight, Activity, Code, DollarSign,
  Building, User, Mail, Calendar, TrendingUp, Handshake
} from 'lucide-react';

interface SchemaNode {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: 'Entity' | 'Transaction' | 'Financial';
  properties: Array<{ name: string; type: string; desc: string }>;
  relationships: Array<{ edge: string; target: string; desc: string }>;
  cypherSample: string;
}

const SCHEMA_NODES: SchemaNode[] = [
  {
    id: "company",
    name: "Company",
    icon: <Building className="w-4 h-4 text-emerald-400" />,
    category: "Entity",
    properties: [
      { name: "id", type: "STRING", desc: "Unique domain hash (e.g. 'stripe_com')" },
      { name: "name", type: "STRING", desc: "Legal corporate entity name" },
      { name: "employees", type: "INT", desc: "Staff head-count indicator" },
      { name: "estimatedARR", type: "DECIMAL", desc: "Inferred yearly run-rate budget" },
      { name: "dnsStatus", type: "STRING", desc: "Current domain records state (e.g. 'Verified')" }
    ],
    relationships: [
      { edge: "UNDER_CONTRACT", target: "Customer", desc: "When sales closure is completed" },
      { edge: "REPRESENTS", target: "Prospect", desc: "Inbound relationship from verified employees" }
    ],
    cypherSample: "MATCH (c:Company) WHERE c.dnsStatus = 'SPF_incomplete'\nRETURN c.name, c.employees LIMIT 20;"
  },
  {
    id: "prospect",
    name: "Prospect",
    icon: <User className="w-4 h-4 text-blue-400" />,
    category: "Entity",
    properties: [
      { name: "id", type: "STRING", desc: "Verified corporate email identifier" },
      { name: "firstName", type: "STRING", desc: "Given first name" },
      { name: "roleRank", type: "STRING", desc: "Hierarchical job code (e.g. 'C_SUITE')" },
      { name: "sentimentScore", type: "FLOAT", desc: "Calculated intent alignment" }
    ],
    relationships: [
      { edge: "REPRESENTS", target: "Company", desc: "Belongs to target business" },
      { edge: "ATTENDED", target: "Meeting", desc: "Participated in direct validation calls" },
      { edge: "CREATED_UNDER", target: "Opportunity", desc: "Generated high pipeline records" }
    ],
    cypherSample: "MATCH (p:Prospect)-[:REPRESENTS]->(c:Company)\nWHERE p.sentimentScore > 0.85\nRETURN p.id, c.name ORDER BY p.sentimentScore DESC;"
  },
  {
    id: "campaign",
    name: "Campaign",
    icon: <Sparkles className="w-4 h-4 text-yellow-400" />,
    category: "Transaction",
    properties: [
      { name: "id", type: "STRING", desc: "UUID generated sequence campaign key" },
      { name: "name", type: "STRING", desc: "Strategic theme title (e.g. 'DNS Security')" },
      { name: "model", type: "STRING", desc: "Underlying LLM generator instance" },
      { name: "status", type: "STRING", desc: "Execution index ('ACTIVE' or 'PAUSED')" }
    ],
    relationships: [
      { edge: "LAUNCHED_WITH", target: "Email", desc: "Generated campaign outbox instances" }
    ],
    cypherSample: "MATCH (camp:Campaign)-[:LAUNCHED_WITH]->(e:Email)\nRETURN camp.name, COUNT(e) AS TotalDispatched;"
  },
  {
    id: "email",
    name: "Email",
    icon: <Mail className="w-4 h-4 text-[#818cf8]" />,
    category: "Transaction",
    properties: [
      { name: "id", type: "STRING", desc: "Unique Internet Message-ID header code" },
      { name: "subject", type: "STRING", desc: "Email subject line content" },
      { name: "status", type: "STRING", desc: "State of transit ('OPENED', 'DELIVERED', 'BOUNCED')" },
      { name: "vectorEmbedding", type: "FLOAT[]", desc: "Semantic representation vectors" }
    ],
    relationships: [
      { edge: "SENT_TO", target: "Prospect", desc: "Outbound target recipient" }
    ],
    cypherSample: "MATCH (e:Email)-[:SENT_TO]->(p:Prospect)-[:REPRESENTS]->(c:Company)\nWHERE e.status = 'OPENED'\nRETURN c.name, COUNT(e) AS OpenedCount;"
  },
  {
    id: "meeting",
    name: "Meeting",
    icon: <Calendar className="w-4 h-4 text-purple-400" />,
    category: "Transaction",
    properties: [
      { name: "id", type: "STRING", desc: "Calendar meeting sequence instance" },
      { name: "scheduledTime", type: "TIMESTAMP", desc: "Execution timestamp link" },
      { name: "transcriptSummary", type: "STRING", desc: "Extracted post-call transcript block" },
      { name: "outcomeState", type: "STRING", desc: "Status values ('DEMO_COMPLETED', 'NO_SHOW')" }
    ],
    relationships: [
      { edge: "ATTENDED", target: "Prospect", desc: "Participating attendees list" }
    ],
    cypherSample: "MATCH (p:Prospect)-[:ATTENDED]->(m:Meeting)\nWHERE m.outcomeState = 'DEMO_COMPLETED'\nRETURN p.id, m.scheduledTime;"
  },
  {
    id: "opportunity",
    name: "Opportunity",
    icon: <TrendingUp className="w-4 h-4 text-pink-400" />,
    category: "Financial",
    properties: [
      { name: "id", type: "STRING", desc: "Active CRM record registration ID" },
      { name: "amount", type: "DECIMAL", desc: "Estimated pipeline deal index" },
      { name: "stage", type: "STRING", desc: "Funnel segment (e.g. 'PROPOSAL', 'CLOSED' )" },
      { name: "forecastRisk", type: "FLOAT", desc: "Calculated risk percentage profile" }
    ],
    relationships: [
      { edge: "CREATED_UNDER", target: "Prospect", desc: "Prospect contact owner link" },
      { edge: "TRANSITIONED", target: "Customer", desc: "When legal conversion wraps up successfully" }
    ],
    cypherSample: "MATCH (o:Opportunity)-[:TRANSITIONED]->(cust:Customer)\nWHERE o.stage = 'CLOSED_WON'\nRETURN SUM(cust.contractARR) AS TotalARRWon;"
  },
  {
    id: "customer",
    name: "Customer",
    icon: <Handshake className="w-4 h-4 text-amber-400" />,
    category: "Financial",
    properties: [
      { name: "id", type: "STRING", desc: "Active checkout workspace identification code" },
      { name: "contractARR", type: "DECIMAL", desc: "Active yearly contract contribution" },
      { name: "churnRisk", type: "FLOAT", desc: "Algorithmic telemetry health index" },
      { name: "renewalDate", type: "DATE", desc: "Future calendar renewal date" }
    ],
    relationships: [
      { edge: "UNDER_CONTRACT", target: "Company", desc: "Provides active commercial coverage" }
    ],
    cypherSample: "MATCH (cust:Customer)-[:UNDER_CONTRACT]->(comp:Company)\nWHERE cust.churnRisk > 0.45\nRETURN comp.name, cust.contractARR, cust.churnRisk;"
  }
];

// Sample list of mock extracted triplets in our local sandboxed index visualization
interface GraphTriplet {
  id: string;
  source: string;
  sourceType: string;
  edge: string;
  target: string;
  targetType: string;
}

const INITIAL_TRIPLETS: GraphTriplet[] = [
  { id: "1", source: "Stripe", sourceType: "Company", edge: "REPRESENTS", target: "Sarah Connor", targetType: "Prospect" },
  { id: "2", source: "Sarah Connor", sourceType: "Prospect", edge: "ATTENDED", target: "Q3 Tech Demo Call", targetType: "Meeting" },
  { id: "3", source: "Sarah Connor", sourceType: "Prospect", edge: "CREATED_UNDER", target: "Deal #4820", targetType: "Opportunity" },
  { id: "4", source: "Deal #4820", sourceType: "Opportunity", edge: "TRANSITIONED", target: "Stripe Enterprise", targetType: "Customer" },
  { id: "5", source: "SPF Security campaign", sourceType: "Campaign", edge: "LAUNCHED_WITH", target: "Message-ID: #992X", targetType: "Email" },
  { id: "6", source: "Message-ID: #992X", sourceType: "Email", edge: "SENT_TO", target: "John Doe", targetType: "Prospect" },
  { id: "7", source: "John Doe", sourceType: "Prospect", edge: "REPRESENTS", target: "HubSpot", targetType: "Company" }
];

export default function RevenueKnowledgeGraphConsole() {
  const [nodes, setNodes] = useState<SchemaNode[]>(SCHEMA_NODES);
  const [selectedNode, setSelectedNode] = useState<SchemaNode>(SCHEMA_NODES[0]);
  const [triplets, setTriplets] = useState<GraphTriplet[]>(INITIAL_TRIPLETS);
  const [activeTab, setActiveTab] = useState<'visualize' | 'queries' | 'aiExtraction' | 'about'>('visualize');

  // Interactive UI Inputs
  const [unstructuredText, setUnstructuredText] = useState('John Doe from Google (google.com) completed the technical security webinar for 5 mailboxes, and booked a follow-up demonstration meeting scheduling on Monday for a $48k contract pipeline.');
  const [extractedTriplets, setExtractedTriplets] = useState<Array<{ s: string; st: string; e: string; t: string; tt: string }>>([]);
  const [isExtracting, setIsExtracting] = useState(false);

  // Manual Triplet Creation
  const [customSource, setCustomSource] = useState('Slack Corp');
  const [customSourceType, setCustomSourceType] = useState('Company');
  const [customEdge, setCustomEdge] = useState('REPRESENTS');
  const [customTarget, setCustomTarget] = useState('Stewart Butterfield');
  const [customTargetType, setCustomTargetType] = useState('Prospect');
  const [feedbackAlert, setFeedbackAlert] = useState<string | null>(null);

  // Simulate AI Triplet Extraction (Mock model response targeting Google input)
  const handleAIExtract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unstructuredText.trim()) return;
    setIsExtracting(true);

    setTimeout(() => {
      // Formulate simulated target entities
      const results = [
        { s: "Google", st: "Company", e: "REPRESENTS", t: "John Doe", tt: "Prospect" },
        { s: "John Doe", st: "Prospect", e: "ATTENDED", t: "Technical Security Webinar", tt: "Meeting" },
        { s: "John Doe", st: "Prospect", e: "CREATED_UNDER", t: "Enterprise Pipeline Deal", tt: "Opportunity" }
      ];
      setExtractedTriplets(results);
      setIsExtracting(false);

      // Append these to the master sandbox dashboard index
      const newTrips: GraphTriplet[] = results.map((x, index) => ({
        id: `ai_${Date.now()}_${index}`,
        source: x.s,
        sourceType: x.st,
        edge: x.e,
        target: x.t,
        targetType: x.tt
      }));

      setTriplets(prev => [...newTrips, ...prev]);

      setFeedbackAlert("Successfully parsed NLP triplet entities via Gemini system model parameters! Appended 3 nodes to active Revenue Graph database.");
      setTimeout(() => setFeedbackAlert(null), 5000);
    }, 1200);
  };

  // Add custom manual edge
  const handleAddCustomTriplet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSource.trim() || !customTarget.trim()) return;

    const newTrip: GraphTriplet = {
      id: `manual_${Date.now()}`,
      source: customSource,
      sourceType: customSourceType,
      edge: customEdge,
      target: customTarget,
      targetType: customTargetType
    };

    setTriplets(prev => [newTrip, ...prev]);
    setCustomSource('');
    setCustomTarget('');

    setFeedbackAlert(`Successfully committed edge: [${newTrip.source}] -[:${newTrip.edge}]-> [${newTrip.target}] into the graph topology.`);
    setTimeout(() => setFeedbackAlert(null), 5000);
  };

  const handleResetGraph = () => {
    setTriplets(INITIAL_TRIPLETS);
    setExtractedTriplets([]);
    setFeedbackAlert("Revenue graph reset to default compliance schema.");
  };

  // Live Calculated Graph Stats
  const totalNodesCount = new Set([
    ...triplets.map(t => `${t.source}_${t.sourceType}`),
    ...triplets.map(t => `${t.target}_${t.targetType}`)
  ]).size;

  const totalEdgesCount = triplets.length;
  const extractionQualityIndex = "96.4%";
  const queryAverageLatency = "4.2 ms";

  return (
    <div className="space-y-6">
      {/* Design Header */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-zinc-500/5 to-transparent border border-emerald-900/30 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                Enterprise Data Platform Architect Entry
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Revenue Knowledge Graph (RKG) Core</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300">
              Revenue Knowledge Graph Schema & Interface
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Model semantic pipeline relationships in EffectiveBuzz. Link Companies, Prospects, Campaigns, Emails, Meetings, Opportunities, and Customers into an active network, query conversions, and run simulated AI-driven triplet extractions.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-emerald-400">
            <Network className="w-4 h-4 text-emerald-400" />
            <span>Graph Databases Configured</span>
          </div>
        </div>
      </div>

      {/* Feedback banner alerts */}
      {feedbackAlert && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-400 flex items-center gap-2.5 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{feedbackAlert}</span>
        </div>
      )}

      {/* RKG Global Health Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">CONNECTED NODES</span>
          <strong className="text-lg font-bold text-white">{totalNodesCount} Entities</strong>
          <p className="text-[9px] text-zinc-500">Deduplicated resolved vertices</p>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">ACTIVE RELATION EDGES</span>
          <strong className="text-lg font-bold text-emerald-400">{totalEdgesCount} Directed Links</strong>
          <p className="text-[9px] text-zinc-500">Cross-table active connections</p>
        </div>

        <div className="p-4 bg-slate-950 border border-[#1f2937] rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">AI RELATION RESOLUTION</span>
          <strong className="text-lg font-bold text-white">{extractionQualityIndex}</strong>
          <p className="text-[9px] text-zinc-500">Precision of triplet entities</p>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1 font-mono">
          <span className="text-[10px] text-zinc-500 font-bold uppercase block">MEAN GRAPH QUERY SPEED</span>
          <strong className="text-lg font-bold text-blue-400">{queryAverageLatency}</strong>
          <p className="text-[9px] text-zinc-500">Cypher multi-hop query run</p>
        </div>
      </div>

      {/* Tab select controllers */}
      <div className="flex border-b border-zinc-800 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('visualize')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
            activeTab === 'visualize' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          1. Schema Modeler & Sandbox
        </button>
        <button
          onClick={() => setActiveTab('queries')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
            activeTab === 'queries' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          2. Multi-Hop Query Strategy
        </button>
        <button
          onClick={() => setActiveTab('aiExtraction')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'aiExtraction' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          3. NLP Triplet Extractor
          <span className="text-[8px] bg-indigo-500 text-white font-mono px-1 rounded">Beta</span>
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
            activeTab === 'about' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          4. Platform Reference Schema
        </button>
      </div>

      {/* View 1: Interactive Schema Modeler & Graph Sandbox */}
      {activeTab === 'visualize' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left panel: Schema selector index */}
          <div className="lg:col-span-4 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
            <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider font-mono">Select Active Node Class</span>
            
            <div className="space-y-2">
              {nodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition cursor-pointer font-mono ${
                      isSelected 
                        ? 'bg-slate-950 border-emerald-500/40 text-emerald-400' 
                        : 'bg-slate-950/30 border-slate-900 text-zinc-400 hover:border-zinc-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {node.icon}
                      <span className="text-xs font-semibold leading-none">{node.name} Node</span>
                    </div>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-zinc-900 border border-slate-800 text-zinc-500">
                      {node.category}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg text-[10px] text-zinc-500 font-mono leading-normal">
              <strong>Cardinality Note:</strong> Standard properties are strongly typed and indexed globally across the enterprise database clusters to guarantee multi-hop speeds &lt;5ms.
            </div>
          </div>

          {/* Center/Right: Node Sandbox Workspace */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Display specifications of chosen Node */}
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4 font-mono">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  {selectedNode.icon}
                  <h4 className="text-sm font-bold text-white">{selectedNode.name} Node Specifications</h4>
                </div>
                <span className="text-[9px] text-[#818cf8] uppercase tracking-wider font-bold">Schema Layer Active</span>
              </div>

              {/* Attributes array */}
              <div className="space-y-2">
                <span className="text-[9.5px] text-zinc-500 block uppercase font-bold">Registered Attributes:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {selectedNode.properties.map((prop) => (
                    <div key={prop.name} className="p-2 bg-slate-950 rounded-lg border border-slate-900 flex justify-between items-start">
                      <div>
                        <strong className="text-white text-[11px] block">{prop.name}</strong>
                        <span className="text-[10px] text-zinc-500 block">{prop.desc}</span>
                      </div>
                      <span className="px-1 py-0.5 rounded bg-slate-900 text-[8px] text-indigo-400 border border-slate-950 shrink-0 font-bold">
                        {prop.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard Relationships outgoing */}
              <div className="space-y-2 pt-2">
                <span className="text-[9.5px] text-zinc-500 block uppercase font-bold">Mapped Paths:</span>
                <div className="space-y-1.5 text-xs">
                  {selectedNode.relationships.map((rel) => (
                    <div key={rel.edge} className="p-2 bg-[#0f172a] rounded-lg border border-slate-950 flex items-center justify-between md:gap-4 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-white font-semibold">({selectedNode.name})</span>
                        <span className="text-emerald-400 font-bold text-[10px]">-[{rel.edge}]-&gt;</span>
                        <span className="text-zinc-400 font-semibold">({rel.target})</span>
                      </div>
                      <span className="text-[10.5px] text-zinc-500">{rel.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sandbox Database State Visualizer */}
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-[10.5px] text-zinc-500 font-mono font-bold uppercase block">Interactive Linked Data Sandbox</span>
                <button 
                  onClick={handleResetGraph}
                  className="text-[10px] text-zinc-400 hover:text-white font-mono flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Triplet grid representation */}
              <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1 font-mono">
                {triplets.map((trip) => (
                  <div key={trip.id} className="p-2.5 bg-slate-950 border border-slate-900 rounded-lg flex items-center justify-between text-xs hover:border-zinc-800 transition">
                    <div className="flex items-center gap-2 flex-wrap text-[11px]">
                      {/* Source */}
                      <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-slate-800 text-white font-semibold">
                        {trip.source} <span className="text-[8.5px] text-zinc-500">[{trip.sourceType}]</span>
                      </span>
                      {/* Edge */}
                      <span className="text-emerald-400 font-bold uppercase text-[9.5px]">
                        -[:{trip.edge}]-&gt;
                      </span>
                      {/* Target */}
                      <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-slate-800 text-zinc-300 font-medium">
                        {trip.target} <span className="text-[8.5px] text-zinc-500">[{trip.targetType}]</span>
                      </span>
                    </div>

                    <button 
                      onClick={() => setTriplets(prev => prev.filter(x => x.id !== trip.id))}
                      className="text-[9.5px] text-rose-400 hover:text-rose-300 font-mono transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {/* Create semantic connection manual inputs */}
              <form onSubmit={handleAddCustomTriplet} className="font-mono text-xs space-y-3 pt-3 border-t border-zinc-800">
                <span className="text-[10px] text-indigo-400 block uppercase font-bold">Inject Custom Relationship Node Link</span>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 items-end">
                  
                  {/* Source inputs */}
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 block">Source Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Corp"
                      value={customSource}
                      onChange={(e) => setCustomSource(e.target.value)}
                      className="w-full bg-slate-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  {/* Source Class */}
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 block">Source Type</label>
                    <select
                      value={customSourceType}
                      onChange={(e) => setCustomSourceType(e.target.value)}
                      className="w-full bg-slate-950 border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-400 outline-none"
                    >
                      <option value="Company">Company</option>
                      <option value="Prospect">Prospect</option>
                      <option value="Campaign">Campaign</option>
                      <option value="Email">Email</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Opportunity">Opportunity</option>
                      <option value="Customer">Customer</option>
                    </select>
                  </div>

                  {/* Relationship */}
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 block">Edge verb</label>
                    <select
                      value={customEdge}
                      onChange={(e) => setCustomEdge(e.target.value)}
                      className="w-full bg-slate-950 border border-zinc-800 rounded px-2 py-1.5 text-xs text-indigo-400 font-bold outline-none"
                    >
                      <option value="REPRESENTS">REPRESENTS</option>
                      <option value="LAUNCHED_WITH">LAUNCHED_WITH</option>
                      <option value="SENT_TO">SENT_TO</option>
                      <option value="ATTENDED">ATTENDED</option>
                      <option value="CREATED_UNDER">CREATED_UNDER</option>
                      <option value="TRANSITIONED">TRANSITIONED</option>
                      <option value="UNDER_CONTRACT">UNDER_CONTRACT</option>
                    </select>
                  </div>

                  {/* Target input */}
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 block">Target Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Steve Jobs"
                      value={customTarget}
                      onChange={(e) => setCustomTarget(e.target.value)}
                      className="w-full bg-slate-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  {/* Action button */}
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold transition flex items-center justify-center gap-1 text-[11px] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Insert link
                  </button>

                </div>
              </form>

            </div>

          </div>

        </div>
      )}

      {/* View 2: Multi-Hop Query Strategy View */}
      {activeTab === 'queries' && (
        <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-6 font-mono text-xs">
          
          <div className="border-b border-zinc-800 pb-3">
            <span className="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider block">Graph query language blocks</span>
            <h4 className="text-sm font-bold text-white pt-1">Active Cypher Traversals & Hybrid SQL Search Strategies</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Cypher Block 1 */}
            <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-indigo-400 font-bold">1. Closed Opportunity Campaign Attribution</span>
                <span className="text-[9px] text-zinc-600">Cypher v4</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Aggregates active contract revenues won dynamically across deep multi-hop outreach pathways to isolate Campaign value.
              </p>
              <pre className="p-3 bg-[#0a0f1d] rounded border border-slate-900 text-[11px] text-zinc-300 leading-relaxed overflow-x-auto select-all">
{`MATCH (c:Campaign)-[:LAUNCHED_WITH]->(e:Email)-[:SENT_TO]->(p:Prospect)
MATCH (p)-[:CREATED_UNDER]->(o:Opportunity)-[:TRANSITIONED]->(cust:Customer)
WHERE o.stage = "CLOSED_WON"
RETURN c.name AS CampaignName, SUM(cust.contractARR) AS TotalARRWon
ORDER BY TotalARRWon DESC;`}
              </pre>
            </div>

            {/* Cypher Block 2 */}
            <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#818cf8] font-bold">2. Untapped Warm Leads discovery</span>
                <span className="text-[9px] text-zinc-600">Cypher v4</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Discovers prospects with highly favorable sentiment markers who have not scheduled dynamic demo meetings yet.
              </p>
              <pre className="p-3 bg-[#0a0f1d] rounded border border-slate-900 text-[11px] text-zinc-300 leading-relaxed overflow-x-auto select-all">
{`MATCH (comp:Company)<-[:REPRESENTS]-(p:Prospect)
MATCH (e:Email)-[r:RECEIVED_FROM]->(p)
WHERE p.sentimentScore > 0.82
AND NOT (p)-[:ATTENDED]->(:Meeting)
RETURN comp.name AS TargetCompany, p.id AS ExpertContact, p.sentimentScore AS Sentiment
LIMIT 10;`}
              </pre>
            </div>

          </div>

          <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-3.5">
            <span className="text-emerald-400 font-bold block uppercase tracking-wide">Hybrid Vector Relational Search integration</span>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              EffectiveBuzz utilizes modern multi-model PostgreSQL database tables coupled with **pgvector** columns to combine vector semantic embeddings and graph path searches. By calculating cosine similarity parameters against `vectorEmbedding` array structures of dispatches and linking them to high-density vertex schemas, system serves GraphRAG queries without scaling independent databases.
            </p>
            <div className="p-3.5 bg-[#0f172a] rounded border border-slate-900">
              <span className="text-white text-[10.5px] font-bold block pb-1">Sample pgvector Hybrid Search Query:</span>
              <pre className="text-zinc-300 text-[10px] leading-normal overflow-x-auto">
{`SELECT p.id, p.first_name, e.subject, e.vector_embedding <=> '[0.15, -0.42, 0.88, ...]' AS semantic_distance
FROM prospects p
JOIN emails e ON e.prospect_id = p.id
WHERE p.sentiment_score > 0.80
ORDER BY semantic_distance ASC
LIMIT 5;`}
              </pre>
            </div>
          </div>

        </div>
      )}

      {/* View 3: NLP Triplet Extractor AI Sandbox */}
      {activeTab === 'aiExtraction' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
          
          {/* Left panel: Unstructured text input */}
          <div className="lg:col-span-6 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
            <div className="border-b border-zinc-800 pb-2">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">AI Entity Parser Engine</span>
              <h4 className="text-xs font-bold text-white pt-0.5">Mock LLM Triplets Extractor Specs</h4>
            </div>

            <p className="text-zinc-400 text-[11px] leading-relaxed">
              In production, the platform hooks unstructured emails and meeting transcripts into the context headers of the **Gemini-3.5-Flash** API. The model executes strict JSON-schema extractions mapping raw text sentences into formal DB nodes and edges.
            </p>

            <form onSubmit={handleAIExtract} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 block">Paste Unstructured Text to Parse:</label>
                <textarea
                  rows={4}
                  value={unstructuredText}
                  onChange={(e) => setUnstructuredText(e.target.value)}
                  placeholder="Paste transcripts or emails..."
                  className="w-full bg-slate-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-white leading-normal focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isExtracting}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/30 text-white rounded-lg font-bold transition flex items-center justify-center gap-1.5 text-xs cursor-pointer"
              >
                {isExtracting ? (
                  <>Extruding nodes...</>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Trigger AI Extraction Parser
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right panel: Live Output Triplet representation */}
          <div className="lg:col-span-6 bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="border-b border-zinc-800 pb-2 flex justify-between items-center">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Extracted Output Ledger</span>
                <span className="text-[9px] bg-slate-950 text-zinc-500 p-1 rounded font-bold">JSON payload</span>
              </div>

              {extractedTriplets.length === 0 ? (
                <div className="p-8 text-center bg-slate-950 border border-slate-900 rounded-xl text-zinc-600 font-mono text-[11px] leading-normal">
                  No triplets generated in current session. Enter unstructured text and press trigger above to run simulation.
                </div>
              ) : (
                <div className="p-3 bg-slate-950 rounded border border-slate-900 text-[10.5px] text-indigo-400 max-h-[220px] overflow-y-auto select-all leading-relaxed whitespace-pre-wrap">
{JSON.stringify(extractedTriplets, null, 2)}
                </div>
              )}
            </div>

            <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10 text-[10.5px] leading-relaxed text-zinc-400">
              <strong>Extraction Success:</strong> Real parsed data binds directly into parent nodes to update sales pipeline scorecards automatically.
            </div>

          </div>

        </div>
      )}

      {/* View 4: Reference Schema details */}
      {activeTab === 'about' && (
        <div className="bg-[#111827] border border-[#1f2937] p-6 rounded-xl space-y-6 font-mono text-xs">
          
          <div className="border-b border-zinc-800 pb-3 flex justify-between items-center">
            <div>
              <span className="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider block">Information topology system mapping</span>
              <h4 className="text-sm font-bold text-white pt-1">Strict Cardinality Guidelines & Graph Index Limits</h4>
            </div>
          </div>

          <div className="space-y-3.5 leading-relaxed text-zinc-300">
            <p>
              To ensure system durability as we scale from Series A post-revenue into subsequent strategic valuations, the RKG maps transactional boundaries cleanly to optimize database input and egress load.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[11px] text-zinc-400">
              <li><strong>Companies</strong> are designated as Root Cluster Keys. Standard firmographic score updates run on a daily batch pass.</li>
              <li><strong>Opportunities</strong> maintain isolated stages of progression which instantly trigger webhook payload transactions back to billing engines.</li>
              <li><strong>Emails and Meeting</strong> details execute as transaction-layer data and are cleared to archival tables past 180 days to limit partition storage bloating.</li>
            </ul>
          </div>

        </div>
      )}

    </div>
  );
}
