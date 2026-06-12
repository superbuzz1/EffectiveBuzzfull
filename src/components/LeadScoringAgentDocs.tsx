import React, { useState } from 'react';
import { 
  Cpu, Code, Play, RefreshCw, Layers, ShieldCheck, Check, Copy, 
  HelpCircle, Settings, Braces, Terminal, FileJson, AlertCircle, Sparkles, 
  ShieldAlert, CheckCircle2, List, Sliders, ChevronRight, Gauge,
  Building2, UserCheck, TrendingUp, HelpCircle as HelpIcon, ClipboardCheck, ArrowRight
} from 'lucide-react';

export default function LeadScoringAgentDocs() {
  const [activeTab, setActiveTab ] = useState<'blueprint' | 'specs' | 'sandbox' | 'eval-error'>('blueprint');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Specs Sub-tabs
  const [specsSubtab, setSpecsSubtab] = useState<'prompt' | 'input-schema' | 'output-schema' | 'json-examples'>('prompt');

  // Sandbox inputs
  const [companyName, setCompanyName] = useState('ApexCloud Platforms');
  const [companySize, setCompanySize] = useState('250-500 staff');
  const [companyFunding, setCompanyFunding] = useState('Series B ($22M)');
  const [companyLocation, setCompanyLocation] = useState('Austin, TX (Remote-First)');
  
  const [prospectName, setProspectName] = useState('Sarah Jenkins');
  const [prospectTitle, setProspectTitle] = useState('VP of Infrastructure & Platform Engineering');
  const [prospectAuthority, setProspectAuthority] = useState('High (Primary decision maker with direct budget oversight)');
  const [prospectBio, setProspectBio] = useState('12+ years building cloud-native products. Managing a team of 45 DevOps and Site Reliability guys.');

  const [industryName, setIndustryName] = useState('Enterprise Multi-Cloud SaaS');
  const [industryGrowth, setIndustryGrowth] = useState('High (Accelerated by global app-dev migrations)');
  const [regulatoryTriggers, setRegulatoryTriggers] = useState('Adhering to strict SOC2 Type II, ISO 27001, and rising European AI Act demands');

  // Simulator state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<any | null>(null);
  const [playgroundView, setPlaygroundView] = useState<'styled' | 'json'>('styled');

  const handleCopyCode = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // SYSTEM PROMPT
  const SYSTEM_PROMPT_CONTENT = `You are the Principal Lead Qualifying and Predictive Scoring Agent for EffectiveBuzz.
Your sole mission is to analyze qualified inbound/outbound target profiles and compute an objective compatibility rating (0 to 100) based strictly on Firmographic configuration, Persona Authority, and Market Trend Alignment inputs.

You must return a highly structured, valid JSON object containing the computed scoring index, structured reasoning parameters, and actionable qualification notes.

### DETAILED SCORING METHODOLOGY AND WEIGHT CALCULATIONS (Total 100 points):

1. FIRMOGRAPHIC COMPATIBILITY FIT (Max 30 Points):
   - Company Scale (10 points): Ideal fit is Mid-Market to Enterprise (200-1000 staff) representing stable budget parameters. Small scale (<50 staff) receives lower metrics unless highly funded.
   - Financial Runways (10 points): Dedicated Series-A or higher funding profiles receive full markers. Self-sustained profitable firms are scored favorably.
   - ICP Alignment (10 points): Perfect alignment with software, platform solutions, developers, and AI-enabled infrastructure spaces.

2. PERSONA AUTHORITY FIT (Max 30 Points):
   - Executive Seniority (15 points): C-Level, VP, and Director tiers hold primary budget decision ownership and receive maximum weighting. Individual contributors or junior roles score near-zero.
   - Decision-Making Command (15 points): Active signs of budget oversight, managing engineering orgs, or leading compliance migration task-forces.

3. INDUSTRY TREND ALIGNMENT & URGENCY (Max 40 Points):
   - Market Growth Momentum (15 points): Rapidly expanding verticals (AI engineering, Cloud Infra, cybersecurity) score higher. Realize high-priority points for active tech transitions.
   - Regulatory Demands (15 points): Imminent compliance deadlines (SOC2 Type II audits, GDPR, HIPAA, and ISO standards) represent significant friction signals and high willingness to invest.
   - Special Context & Constraints (10 points): Mentions of specific bottleneck issues, scaling failures, cloud cost spikes, or team expansion objectives.

### RESPONSE CONSTRAINTS & FORMATTING:
- STRICT CONFORMANCE: Output **MUST** be perfectly valid JSON matching the exact output schema. Do NOT prepend markdown fences like "\`\`\`json", do NOT append conversational explanations, footnotes, or summaries.
- NO HALLUCINATIONS: Maintain objective truth. If a specific rating section cannot be evaluated due to sparse inputs, fallback to neutral default weights (e.g. 5/10) and explicitly note "INSUFFICIENT_DATA" in the qualifying log blocks.
`;

  // INPUT JSON SCHEMA
  const INPUT_SCHEMA_CONTENT = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "LeadScoringAgentInput",
  "type": "object",
  "properties": {
    "companyData": {
      "type": "object",
      "properties": {
        "companyName": { "type": "string" },
        "employeeCountTier": { "type": "string" },
        "fundingStage": { "type": "string" },
        "location": { "type": "string" }
      },
      "required": ["companyName", "employeeCountTier", "fundingStage"]
    },
    "prospectData": {
      "type": "object",
      "properties": {
        "fullName": { "type": "string" },
        "jobTitle": { "type": "string" },
        "decisionAuthorityRating": { "type": "string", "enum": ["HIGH", "MEDIUM", "LOW"] },
        "operationalFocus": { "type": "string" }
      },
      "required": ["fullName", "jobTitle", "decisionAuthorityRating"]
    },
    "industryData": {
      "type": "object",
      "properties": {
        "industrySector": { "type": "string" },
        "growthTrendIndicator": { "type": "string" },
        "applicableComplianceFrameworks": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["industrySector", "applicableComplianceFrameworks"]
    }
  },
  "required": ["companyData", "prospectData", "industryData"]
}`;

  // OUTPUT JSON SCHEMA
  const OUTPUT_SCHEMA_CONTENT = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "LeadScoringAgentOutput",
  "type": "object",
  "properties": {
    "compositeScore": {
      "type": "integer",
      "minimum": 0,
      "maximum": 100,
      "description": "The computed global qualifying rank combining firmographic scale, persona authority, and regulatory urgency weights."
    },
    "scoreReasoning": {
      "type": "object",
      "properties": {
        "positiveScoringDrivers": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Primary positive attributes triggering higher points allocation."
        },
        "negativeScoringRiskFactors": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Observed bottlenecks or misalignments triggering point deductions."
        },
        "segmentFitTier": {
          "type": "string",
          "enum": ["ENTERPRISE_ICP", "MID_MARKET_ICP", "OPPORTUNISTIC", "NON_ICP"],
          "description": "Category matching corporate ICP paradigms."
        }
      },
      "required": ["positiveScoringDrivers", "negativeScoringRiskFactors", "segmentFitTier"]
    },
    "qualificationNotes": {
      "type": "object",
      "properties": {
        "strategicHookSummary": {
          "type": "string",
          "description": "High-impact narrative tailored for outbound SDR sales emails or dynamic pitch decks based on regulatory/pain indicators."
        },
        "technicalSalesLevers": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Key tech features (egress optimizing, SOC2 automation, low latency proxies) to emphasize during the first phone consultation."
        },
        "recommendedNextStep": {
          "type": "string",
          "description": "Actionable routing advise (e.g., Immediate Account Executive handoff, place in nurtue cadence, trigger MFA sequence check etc.)"
        }
      },
      "required": ["strategicHookSummary", "technicalSalesLevers", "recommendedNextStep"]
    }
  },
  "required": ["compositeScore", "scoreReasoning", "qualificationNotes"]
}`;

  const EXAMPLE_INPUT_JSON = `{
  "companyData": {
    "companyName": "ApexCloud Platforms",
    "employeeCountTier": "250-500",
    "fundingStage": "Series B ($22.0M Raised)",
    "location": "Austin, TX (Remote-First)"
  },
  "prospectData": {
    "fullName": "Sarah Jenkins",
    "jobTitle": "VP of Infrastructure & Platform Engineering",
    "decisionAuthorityRating": "HIGH",
    "operationalFocus": "Direct oversight of 45 DevOps and Site Reliability Engineers building cloud scaling pipelines"
  },
  "industryData": {
    "industrySector": "Enterprise Multi-Cloud SaaS",
    "growthTrendIndicator": "Accelerated developer migrations to multi-region k8s pods",
    "applicableComplianceFrameworks": ["SOC2 Type II", "ISO 27001", "European AI Act Draft Requirements"]
  }
}`;

  const EXAMPLE_OUTPUT_JSON = `{
  "compositeScore": 91,
  "scoreReasoning": {
    "positiveScoringDrivers": [
      "Target falls in ideal Mid-Market ICP scale (250-500 employees), with secure funding padding ($22M Series B) minimizing pricing transaction friction.",
      "VP of Infrastructure holds direct budgetary command and decision authority over tooling pipelines, high scores on Persona metrics.",
      "Strong trends in multi-cloud deployment align with EffectiveBuzz core egress optimizations.",
      "Regulatory triggers (SOC2, ISO 27053) are critical strategic hooks representing immediate risk mitigation desires."
    ],
    "negativeScoringRiskFactors": [
      "Company location listed as decentralized remote-first which can occasionally delay standard legal reviews relative to traditional offices.",
      "Slight platform dependency overlaps on legacy observability monitors may require specialized competitor displacement strategy."
    ],
    "segmentFitTier": "ENTERPRISE_ICP"
  },
  "qualificationNotes": {
    "strategicHookSummary": "Congratulate Sarah on their Series B scale-up, then trigger outbound sequences highlighting how ApexCloud can secure SOC2 and ISO compliance checks dynamically for multi-region pods, reducing compliance cycle times by 65%.",
    "technicalSalesLevers": [
      "Self-assembling compliance proxy wrappers",
      "Dynamic data-protection logging sanitization",
      "Active sub-10ms geographical API caches"
    ],
    "recommendedNextStep": "HIGH_PRIORITY - Route lead directly to Lead Account Executive (Fintech Focus) for live calendar hook within 2 business hours."
  }
}`;

  // DYNAMIC SIMULATOR LOGIC
  const startScoringSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setSimulationResult(null);
    setSimLogs([]);

    const runLogs = [
      `[Trigger] Initializing Lead Scoring Agent...`,
      `[Parser] Validating incoming company data structures for "${companyName}"... OK`,
      `[Parser] Validating prospect records: "${prospectName}" (${prospectTitle})... OK`,
      `[Parser] Validating industry trend attributes and regulatory targets... OK`,
      `[Weight Compute] Calculating Firmographic Fit Factor (Max 30pts)... Scale matches target mid-market sweet spot. Awarded: 27/30.`,
      `[Weight Compute] Evaluating Persona seniority and authority rules (Max 30pts)... VP Tier qualifies as high decision maker. Awarded: 29/30.`,
      `[Weight Compute] Extracting compliance deadlines and technological drift (Max 40pts)... SOC2 and ISO factors detected. Awarded: 35/40.`,
      `[Totalize] Aggregating composite rating... Score validated: 91/100`,
      `[Qualify] Generating personalized outreach hook and technical SaaS product levers`,
      `[Guardrail] Running dynamic conformance review against LeadScoringAgentOutput JSON Schema... Pass!`,
      `[Database] Persisting structured lead scorecard into workspace tenant metadata grids...`,
      `[Pipeline] Finished. Emitting validated output dataset.`
    ];

    for (let i = 0; i < runLogs.length; i++) {
      setSimulationStep(i + 1);
      setSimLogs(prev => [...prev, runLogs[i]]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setSimulationResult(JSON.parse(EXAMPLE_OUTPUT_JSON));
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6 animate-feed">
      {/* Title Header */}
      <div className="border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          Predictive Sales Qualification Hub
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Predictive Lead Scoring Agent Specification</h2>
        <p className="text-sm text-gray-400 mt-1 max-w-3xl leading-relaxed">
          Deep structural blueprint of the automated Qualifying Agent. This module processes multi-dimensional accounts datasets and outputs unified ICP coefficients, strategic reasons, and next-step actions.
        </p>
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-gray-800 pb-0.5 gap-2 overflow-x-auto">
        {[
          { id: 'blueprint' as const, label: '1. Scoring Model Blueprint', icon: Layers, color: 'text-indigo-400' },
          { id: 'specs' as const, label: '2. Scoring Prompt & Schemas', icon: Terminal, color: 'text-emerald-400' },
          { id: 'sandbox' as const, label: '3. Lead Score Sandbox Simulator', icon: Play, color: 'text-blue-400' },
          { id: 'eval-error' as const, label: '4. Evaluation Standards & Errors', icon: ShieldAlert, color: 'text-rose-450' },
        ].map(tb => {
          const Icon = tb.icon;
          return (
            <button
              key={tb.id}
              onClick={() => setActiveTab(tb.id)}
              className={`pb-3 text-xs sm:text-sm font-medium border-b-2 font-display transition-all flex items-center gap-2 whitespace-nowrap px-1 ${
                activeTab === tb.id
                  ? 'border-emerald-500 text-emerald-400 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${tb.color}`} />
              {tb.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Blueprint */}
      {activeTab === 'blueprint' && (
        <div className="space-y-6">
          <div className="bg-[#0f172a] rounded-xl border border-gray-800 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider text-indigo-405">Scoring Engine Weight Matrix</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Unlike classical manual BANT (Budget, Authority, Need, Time) formulas, the EffectiveBuzz AI Scoring Agent applies modern algorithmic weighting on unstructured parameters, generating highly accurate enterprise prioritization ratios.
            </p>

            {/* Weights Cards layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
                  <span className="text-xs font-mono font-bold text-teal-400 flex items-center gap-1.5 uppercase">
                    <Building2 className="w-3.5 h-3.5" />
                    Firmographics Fit
                  </span>
                  <span className="text-xs font-mono font-black text-gray-400">30% Weight</span>
                </div>
                <ul className="text-[11px] text-gray-400 space-y-2 font-sans">
                  <li><strong>Employee Scale (10%):</strong> Mid-market (50-500) and Enterprise scale represent the highest potential contract parameters.</li>
                  <li><strong>Financial Runway (10%):</strong> Funding signals ensure technical project security.</li>
                  <li><strong>Vertical Fit (10%):</strong> Strong software/AI infrastructure focus mapping to Ideal Customer Profile.</li>
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
                  <span className="text-xs font-mono font-bold text-indigo-400 flex items-center gap-1.5 uppercase">
                    <UserCheck className="w-3.5 h-3.5" />
                    Persona Authority
                  </span>
                  <span className="text-xs font-mono font-black text-gray-400">30% Weight</span>
                </div>
                <ul className="text-[11px] text-gray-400 space-y-2 font-sans">
                  <li><strong>Executive Tiers (15%):</strong> VP of Sales, CTO, VP of Product represent ultimate platform purchase stakeholders.</li>
                  <li><strong>Decision Authority (15%):</strong> Evaluating LinkedIn traces and biography briefings indicating departmental oversight and budget management claims.</li>
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
                  <span className="text-xs font-mono font-bold text-[#f43f5e] flex items-center gap-1.5 uppercase">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Trend & Compliance
                  </span>
                  <span className="text-xs font-mono font-black text-gray-400">40% Weight</span>
                </div>
                <ul className="text-[11px] text-gray-400 space-y-2 font-sans">
                  <li><strong>Growth Velocity (15%):</strong> Accelerated target migration patterns in multi-region deployments create pain.</li>
                  <li><strong>Compliance Urgency (15%):</strong> Pending SOC2, ISO, or HIPAA milestones trigger rapid corporate spend prioritization.</li>
                  <li><strong>Special Pain Points (10%):</strong> References to specific tooling bottlenecks, egress fees or API cost surges.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-gray-850 rounded-xl space-y-2 text-xs">
            <span className="font-mono text-emerald-400 font-bold uppercase block tracking-wider text-[10px]">✔ Real-Time CRM Integration Pipeline</span>
            <p className="text-gray-350 leading-relaxed font-sans">
              Once scored, leads are automatically routed via API. High-scoring leads (85+) trigger live Slack/Teams notifications to assigned Account Executives with copywriters instantly drafting custom hooks addressing target regulatory gaps.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Prompt & Schemas */}
      {activeTab === 'specs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Subtab Left menu */}
          <div className="lg:col-span-3 bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-1.5 h-fit">
            <span className="text-[10px] text-gray-400 font-mono font-bold block mb-2 uppercase tracking-wide">Developer Specs Menu</span>
            {[
              { id: 'prompt' as const, label: 'Lead Scoring Prompt', icon: Terminal, color: 'text-indigo-400' },
              { id: 'input-schema' as const, label: 'Input JSON Schema', icon: Braces, color: 'text-emerald-450' },
              { id: 'output-schema' as const, label: 'Output JSON Schema', icon: Braces, color: 'text-emerald-450' },
              { id: 'json-examples' as const, label: 'Realistic JSON Exemplars', icon: FileJson, color: 'text-blue-400' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setSpecsSubtab(item.id)}
                  className={`w-full text-left p-2 rounded-lg text-xs font-mono flex items-center gap-2.5 transition-all ${
                    specsSubtab === item.id 
                      ? 'bg-slate-900 border border-slate-700 text-white font-bold' 
                      : 'border border-transparent text-gray-400 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.color} shrink-0`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Code panel right column */}
          <div className="lg:col-span-9 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            {specsSubtab === 'prompt' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-indigo-400">Scoring Agent System Instruction Prompt</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Primary instruction framework applied to the server proxy endpoint.</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(SYSTEM_PROMPT_CONTENT, 'scoring-prompt')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-gray-700 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-300 transition-all cursor-pointer"
                  >
                    {copiedText === 'scoring-prompt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedText === 'scoring-prompt' ? 'Copied Prompt' : 'Copy System Prompt'}
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 overflow-y-auto max-h-[420px]">
                  <pre className="text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">{SYSTEM_PROMPT_CONTENT}</pre>
                </div>
              </div>
            )}

            {specsSubtab === 'input-schema' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-emerald-450">Scoring Agent Input JSON Schema</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Parameters expected during CRM bulk scans or form submit triggers.</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(INPUT_SCHEMA_CONTENT, 'input-schema')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-gray-700 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-300 transition-all cursor-pointer"
                  >
                    {copiedText === 'input-schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedText === 'input-schema' ? 'Copied Schema' : 'Copy Input Schema'}
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 overflow-y-auto max-h-[420px]">
                  <pre className="text-xs text-teal-400 font-mono leading-normal">{INPUT_SCHEMA_CONTENT}</pre>
                </div>
              </div>
            )}

            {specsSubtab === 'output-schema' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-emerald-455">Scoring Agent Output JSON Schema</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Specifies compositeScore, positiveScoringDrivers, negativeScoringRiskFactors, and qualificationNotes.</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(OUTPUT_SCHEMA_CONTENT, 'output-schema')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-gray-700 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-300 transition-all cursor-pointer"
                  >
                    {copiedText === 'output-schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedText === 'output-schema' ? 'Copied Schema' : 'Copy Output Schema'}
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 overflow-y-auto max-h-[420px]">
                  <pre className="text-xs text-indigo-305 font-mono leading-normal">{OUTPUT_SCHEMA_CONTENT}</pre>
                </div>
              </div>
            )}

            {specsSubtab === 'json-examples' && (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Example Input Payload</span>
                    <button
                      onClick={() => handleCopyCode(EXAMPLE_INPUT_JSON, 'input-ex')}
                      className="px-2 py-0.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-300 transition-all"
                    >
                      {copiedText === 'input-ex' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy Payload
                    </button>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 overflow-x-auto max-h-[140px] text-[11px]">
                    <pre className="text-teal-400 font-mono">{EXAMPLE_INPUT_JSON}</pre>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Example Output Conformance JSON (Strict Standard Compliance)</span>
                    <button
                      onClick={() => handleCopyCode(EXAMPLE_OUTPUT_JSON, 'output-ex')}
                      className="px-2 py-0.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-300 transition-all"
                    >
                      {copiedText === 'output-ex' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy Scorecard Report
                    </button>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 overflow-x-auto max-h-[220px] text-[11px]">
                    <pre className="text-zinc-300 font-mono leading-relaxed">{EXAMPLE_OUTPUT_JSON}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Sandbox Simulator */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Inputs Columns */}
            <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
              <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-bold block border-b border-gray-800 pb-2">
                1. Configure Target Payload Dataset
              </span>

              {/* Accordeon for sections to keep view tight */}
              <div className="space-y-4 text-xs">
                {/* Section A: Company Info */}
                <div className="p-3.5 bg-slate-950/65 rounded-lg border border-slate-850 space-y-2.5">
                  <span className="text-[11px] font-mono font-bold text-teal-400 flex items-center gap-1.5 uppercase">
                    <Building2 className="w-3.5 h-3.5" />
                    Company Firmographics Parameters
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase">Legal Name</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500 font-mono text-zinc-250 text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase">Employee Tier</label>
                      <input
                        type="text"
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500 font-mono text-zinc-250 text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase">Funding Stage</label>
                      <input
                        type="text"
                        value={companyFunding}
                        onChange={(e) => setCompanyFunding(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500 font-mono text-zinc-250 text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase">Geographical Location</label>
                      <input
                        type="text"
                        value={companyLocation}
                        onChange={(e) => setCompanyLocation(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500 font-mono text-zinc-250 text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Prospect Info */}
                <div className="p-3.5 bg-slate-950/65 rounded-lg border border-slate-850 space-y-2.5">
                  <span className="text-[11px] font-mono font-bold text-indigo-400 flex items-center gap-1.5 uppercase">
                    <UserCheck className="w-3.5 h-3.5" />
                    Target Prospect Parameters
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase">Full Contact Name</label>
                      <input
                        type="text"
                        value={prospectName}
                        onChange={(e) => setProspectName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500 text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase">Authority Power</label>
                      <input
                        type="text"
                        value={prospectAuthority}
                        onChange={(e) => setProspectAuthority(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500 text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase">Exceutive Job Title</label>
                    <input
                      type="text"
                      value={prospectTitle}
                      onChange={(e) => setProspectTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500 text-[11px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase">Team Bio/Responsibility Profile</label>
                    <textarea
                      rows={2}
                      value={prospectBio}
                      onChange={(e) => setProspectBio(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2 focus:outline-none focus:border-blue-500 text-[11px] leading-relaxed text-zinc-300"
                    />
                  </div>
                </div>

                {/* Section C: Industry Info */}
                <div className="p-3.5 bg-slate-950/65 rounded-lg border border-slate-850 space-y-2.5">
                  <span className="text-[11px] font-mono font-bold text-rose-400 flex items-center gap-1.5 uppercase">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Industry & Trend Dynamics
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase">Sector Category</label>
                      <input
                        type="text"
                        value={industryName}
                        onChange={(e) => setIndustryName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500 text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase">Growth Momentum</label>
                      <input
                        type="text"
                        value={industryGrowth}
                        onChange={(e) => setIndustryGrowth(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500 text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase">Regulatory Forcing Triggers</label>
                    <input
                      type="text"
                      value={regulatoryTriggers}
                      onChange={(e) => setRegulatoryTriggers(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500 text-[11px]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startScoringSimulation}
                  disabled={isSimulating}
                  className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-slate-950 font-bold font-display rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      Computing Weights Scores...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
                      Recalculate AI Lead Score
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Simulated Live Console logs output */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <div className="bg-slate-950 border border-gray-800 rounded-xl p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-indigo-405" />
                      Prediction Agent Console Terminal Feed
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">Host: Node-Qual-Svc</span>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto font-mono text-[10px] leading-relaxed text-indigo-305">
                    {simLogs.length === 0 ? (
                      <div className="text-center py-20 text-gray-505 font-sans leading-relaxed">
                        Awaiting scoring configuration trigger. Modify targets details on the left dashboard and initiate "Recalculate AI Lead Score" to trigger real-time firmographics and persona matching audits.
                      </div>
                    ) : (
                      simLogs.map((lg, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 animate-feed">
                          <span className="text-gray-500 shrink-0">[{idx + 1}]</span>
                          <span className={`${idx === simLogs.length - 1 && isSimulating ? 'text-white font-bold animate-pulse' : 'text-zinc-300'}`}>
                            {lg}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {isSimulating && (
                  <div className="border-t border-gray-800 pt-3 flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-505 animate-ping"></div>
                      <span>Qualifying Step: {simulationStep}/12</span>
                    </div>
                    <span>Computing metrics coefficients...</span>
                  </div>
                )}
              </div>

              {/* API and pipeline metrics badge */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-bold block">Qualifying execution KPI profiles:</span>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs">
                    <div>Throughput: <span className="text-teal-400 font-bold">In-Memory 45ms</span></div>
                    <div>Model fallback: <span className="text-[#818cf8] font-bold font-mono">Structured JSON Strict</span></div>
                    <div>Validation code: <span className="text-emerald-450 font-bold font-mono">100% Schema Compliant</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATED SCORE DECK */}
          {simulationResult && (
            <div className="bg-[#0f1524] border border-[#1f2937] rounded-xl p-5 md:p-6 shadow-2xl animate-feed space-y-5">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 flex-wrap gap-2">
                <div>
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold tracking-wider leading-none">
                    ✔ Recalculation Complete (100% Conformance JSON Model)
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight mt-15">Target Lead Scorecard Report</h3>
                </div>

                {/* View Toggles */}
                <div className="flex bg-[#1e293b] rounded-lg p-0.5 border border-zinc-700 font-mono text-xs text-gray-400">
                  <button
                    onClick={() => setPlaygroundView('styled')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                      playgroundView === 'styled' 
                        ? 'bg-indigo-550 text-slate-950 font-bold bg-indigo-400' 
                        : 'hover:text-white'
                    }`}
                  >
                    Aesthetic Scorecard
                  </button>
                  <button
                    onClick={() => setPlaygroundView('json')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                      playgroundView === 'json' 
                        ? 'bg-indigo-550 text-slate-950 font-bold bg-indigo-400' 
                        : 'hover:text-white'
                    }`}
                  >
                    Structured JSON Dataset
                  </button>
                </div>
              </div>

              {playgroundView === 'styled' ? (
                <div className="space-y-6">
                  {/* Row 1: Global Gauge Score */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Score coefficient gauge */}
                    <div className="md:col-span-4 bg-slate-950 p-6 rounded-xl border border-slate-850 flex flex-col justify-between items-center text-center space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider font-bold">COMPOSITE COMPATIBILITY SCORE</span>
                        <div className="text-5xl sm:text-6xl font-mono text-teal-400 font-black tracking-tight mt-3">
                          {simulationResult.compositeScore}
                          <span className="text-sm font-sans font-semibold text-gray-500">/100</span>
                        </div>
                        <div className="mt-2.5 inline-block px-3 py-0.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold rounded-full font-mono uppercase tracking-wide">
                          {simulationResult.scoreReasoning.segmentFitTier}
                        </div>
                      </div>

                      <div className="w-full bg-[#111827] border border-slate-800 p-3 rounded-lg text-left text-[11px] leading-relaxed text-zinc-350">
                        <strong>AE Routing advice:</strong> {simulationResult.qualificationNotes.recommendedNextStep}
                      </div>
                    </div>

                    {/* Left: Score triggers reasonings */}
                    <div className="md:col-span-8 bg-slate-950 p-5 rounded-xl border border-slate-850 space-y-4 text-xs">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase text-teal-400 font-bold tracking-wide block border-b border-gray-800 pb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                          Positive Scoring Weight Drivers (+ Fit)
                        </span>
                        <ul className="space-y-1.5 list-disc pl-3.5 text-zinc-300 leading-relaxed font-sans text-[11px]">
                          {simulationResult.scoreReasoning.positiveScoringDrivers.map((driver: string, i: number) => (
                            <li key={i}>{driver}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase text-rose-400 font-bold tracking-wide block border-b border-gray-800 pb-1 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-450" />
                          Deduction Risk Factors (- Alignment)
                        </span>
                        <ul className="space-y-1.5 list-disc pl-3.5 text-zinc-400 leading-relaxed font-sans text-[11px]">
                          {simulationResult.scoreReasoning.negativeScoringRiskFactors.map((risk: string, i: number) => (
                            <li key={i}>{risk}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Qualification notes */}
                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-300 leading-relaxed">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-white tracking-widest uppercase font-bold block border-b border-gray-800 pb-1.5 flex items-center gap-1.5">
                        <ClipboardCheck className="w-3.5 h-3.5 text-indigo-400" />
                        Strategic Email Copywriting Hook
                      </span>
                      <p className="font-sans leading-normal text-zinc-300 text-[11px]">{simulationResult.qualificationNotes.strategicHookSummary}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-white tracking-widest uppercase font-bold block border-b border-gray-800 pb-1.5 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-teal-400" />
                        Technical Product Conversion Levers
                      </span>
                      <ul className="list-decimal pl-3.5 space-y-1 text-zinc-300 text-[11px]">
                        {simulationResult.qualificationNotes.technicalSalesLevers.map((lever: string, i: number) => (
                          <li key={i}>{lever}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
                  <pre className="text-zinc-305 font-mono leading-relaxed overflow-x-auto max-h-[350px]">{JSON.stringify(simulationResult, null, 2)}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Evaluation Metrics & Errors */}
      {activeTab === 'eval-error' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Evaluation standards */}
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 border-b border-gray-800 pb-2">
                Qualifying Evaluation SLA Metrics
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                To guarantee high outreach conversions and minimize human time, the EffectiveBuzz Lead Scoring Agent runs programmatic double-check validation loops comparing outputs against strict parameters:
              </p>

              <div className="space-y-3.5 text-xs font-mono text-zinc-300">
                <div className="p-3 bg-slate-950 rounded border border-slate-850">
                  <span className="text-[10px] text-teal-400 font-bold block mb-1">Scale Validity Check:</span>
                  Verifies company size doesn't contradict reported funding tier signals (e.g. flagging seed startups reporting 1000 employees).
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-850">
                  <span className="text-[10px] text-teal-400 font-bold block mb-1">Decision Holder Score matching:</span>
                  Ensures low-seniority titles receive automatic structural point deductions, capping their score below 40.
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-850">
                  <span className="text-[10px] text-teal-400 font-bold block mb-1">Compliance Deadline detection:</span>
                  Inspects text data to confirm whether regulatory frameworks match identified industries, keeping scoring parameters rational.
                </div>
              </div>
            </div>

            {/* Error handling strategy */}
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 border-b border-gray-800 pb-2">
                Error Handling & Schema Fallbacks
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Server-side pipelines validate results against output JSON models. If validation fails or sparse data triggers exceptions, the agent deploys precise mitigation procedures:
              </p>

              <div className="space-y-3 text-[11px] font-mono text-zinc-300">
                <div className="p-3 bg-slate-950 rounded border border-slate-850 border-l-4 border-l-rose-500">
                  <strong className="text-rose-450 block mb-0.5">ERR_JSON_MALFORMED_RETRY:</strong>
                  If the AI outputs corrupted braces or trailing markdown, an inline regular expression parser strips non-JSON strings then retries with a strict temperature-0 parameter.
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-850 border-l-4 border-l-amber-500">
                  <strong className="text-amber-450 block mb-0.5">ERR_FIRMOGRAPH_OMISSION:</strong>
                  When company scale or funding targets are absent, the scoring engine falls back to a neutral coefficient score (50/100), logging an explicit "INCOMPLETE_DATA" label in the scorecard metadata.
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-850 border-l-4 border-l-indigo-500">
                  <strong className="text-indigo-405 block mb-0.5">ERR_SOCIALLY_QUALIFIED:</strong>
                  If prospects authority can't be computed securely, the lead is isolated in a special "Review Required" CRM status with secondary search brokers triggered to parse additional corporate rosters.
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
