import React, { useState } from 'react';
import { 
  Cpu, Code, Play, RefreshCw, Layers, Check, Copy, 
  Terminal, Braces, FileJson, AlertCircle, Sparkles, 
  ShieldAlert, CheckCircle2, List, Sliders, ChevronRight, Gauge,
  MessageSquare, UserCheck, HelpCircle, CornerDownRight, ArrowRight,
  ShieldCheck, HelpCircle as HelpIcon, TrendingUp, Calendar, AlertTriangle
} from 'lucide-react';

export default function QualificationAgentDocs() {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'specs' | 'sandbox' | 'eval-error'>('blueprint');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Specs Sub-tabs
  const [specsSubtab, setSpecsSubtab] = useState<'prompt' | 'input-schema' | 'output-schema' | 'json-examples'>('prompt');

  // Selected Framework in Sandbox
  const [activeFramework, setActiveFramework] = useState<'BANT' | 'MEDDIC'>('BANT');

  // Sandbox inputs
  const [prospectName, setProspectName] = useState('Sarah Jenkins');
  const [companyName, setCompanyName] = useState('ApexCloud Platforms');
  const [prospectTitle, setProspectTitle] = useState('VP of Infrastructure & Platform Engineering');

  // General Inputs
  const [budgetText, setBudgetText] = useState('$120K allocated for Q3 cloud networking optimization.');
  const [authorityText, setAuthorityText] = useState('Sarah has technical sign-off. Cross-functional approval needed from the CFO.');
  const [needText, setNeedText] = useState('High egress Kubernetes charges and urgent SOC2 compliance requirements.');
  const [timelineText, setTimelineText] = useState('Needs to be fully implemented and audited prior to October 15th (next SOC2 window).');

  // MEDDIC Specific Inputs
  const [metricsText, setMetricsText] = useState('Slashing direct internet egress traffic costs by 45% and reducing cross-region DB latency to <15ms.');
  const [economicBuyerText, setEconomicBuyerText] = useState('Marcus Vance (CFO) who signs off on any expenditures exceeding $50K.');
  const [decisionCriteriaText, setDecisionCriteriaText] = useState('Must fully support multi-tenant isolation, Zero-Trust network namespaces, and automated SOC2 auditable logs.');
  const [decisionProcessText, setDecisionProcessText] = useState('Technical evaluation (2 weeks) -> Security audit review (1 week) -> Contractual procurement sign-off by legal (1 week).');
  const [paperProcessText, setPaperProcessText] = useState('Requires standard NDA, mutual Master Service Agreement (MSA), and Data Processing Addendum (DPA) approved by corporate counsel.');
  const [painText, setPainText] = useState('Daily billing run leaks from unnecessary inter-datacenter state syncing, risking substantial margin degradation.');
  const [championText, setChampionText] = useState('Sarah Jenkins is our champion; she has pain and is actively advocating for a modern routed solution to her peer engineering directors.');

  // Suggested preset parameters to let the user easily switch profiles
  const presets = [
    {
      label: "Fully Qualified Enterprise (BANT & MEDDIC Match)",
      framework: "MEDDIC" as const,
      prospect: "Sarah Jenkins",
      title: "VP of Infrastructure",
      company: "ApexCloud Platforms",
      budget: "$150K dedicated project capital approved for this quarter.",
      authority: "Sarah leads infrastructure; needs visual confirmation for business case to CFO.",
      need: "Cutting Kubernetes cross-region egress charges and reducing db state replication lag.",
      timeline: "Target live date is September 1st, 2026.",
      metrics: "Targeting a 40% reduction in Cloud egress billing and latency under 15ms.",
      buyer: "Marcus Vance (CFO), who owns budget allocations.",
      criteria: "Requires SOC2 Type II, SOC3, 99.99% multi-region routing uptime, and automated Terraform setup.",
      process: "Architecture Review -> Security Audit Sandbox -> Executive Contract Signing.",
      paper: "Standard MSA, SLA terms, and security compliance DPA sign-off.",
      pain: "Paying $25K per month in excess inter-datacenter bandwidth fees.",
      champion: "Sarah, who is under pressure from executive directors to optimize their stack overhead."
    },
    {
      label: "Series-A Technical Lead (Strong Need, Budget Hurdles)",
      framework: "BANT" as const,
      prospect: "Dave Miller",
      title: "Lead DevOps Architect",
      company: "GrowthX Studio",
      budget: "No dedicated line-item yet. Would need to pull from general engineering buffer.",
      authority: "Dave represents engineering, but purchasing requires CTO and CFO approvals.",
      need: "Manual configuration of multi-tenant workspaces is slow, complex and error-prone.",
      timeline: "ASAP; currently spending 20+ builder hours weekly on manual routing hacks.",
      metrics: "Save 15 engineering hours weekly by standardizing routing namespaces.",
      buyer: "Elena Rostova (CTO / Founder).",
      criteria: "Ease of onboarding, simple local integration, open-source compatibility.",
      process: "Dave runs local mock demo -> presents findings to Elena -> final approval.",
      paper: "Simple self-serve credit card billing or monthly invoice standard.",
      pain: "High engineering attrition due to complex manual deployment pipelines.",
      champion: "Dave, who hates fixing billing alerts at 3 AM."
    },
    {
      label: "Budget-Constrained SMB (Unqualified/Low Fit)",
      framework: "BANT" as const,
      prospect: "Tom Henderson",
      title: "Solo Platform Developer",
      company: "SmallScale App Labs",
      budget: "<$250/month maximum budget threshold. No enterprise budget tier.",
      authority: "Tom executes everything but possesses zero discretionary corporate capital.",
      need: "Wants a basic dashboard widget to check status on free Kubernetes namespaces.",
      timeline: "Vague. Sometime towards the end of fiscal year.",
      metrics: "Simplistic dashboard visuals for hobby deployments.",
      buyer: "Tom Henderson (Sole Founder).",
      criteria: "Must be practically free or low-tier personal plans.",
      process: " Tom checks free tiers.",
      paper: "Standard click-through license agreement.",
      pain: "Minor friction but can work around it using standard shell operations.",
      champion: "Tom, but low authority and low commercial urgency."
    }
  ];

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

  const handleLoadPreset = (p: typeof presets[0]) => {
    setActiveFramework(p.framework);
    setProspectName(p.prospect);
    setProspectTitle(p.title);
    setCompanyName(p.company);
    setBudgetText(p.budget);
    setAuthorityText(p.authority);
    setNeedText(p.need);
    setTimelineText(p.timeline);
    setMetricsText(p.metrics);
    setEconomicBuyerText(p.buyer);
    setDecisionCriteriaText(p.criteria);
    setDecisionProcessText(p.process);
    setPaperProcessText(p.paper);
    setPainText(p.pain);
    setChampionText(p.champion);
  };

  // SYSTEM PROMPT FOR THE QUALIFICATION AGENT
  const SYSTEM_PROMPT_CONTENT = `You are the Lead AI Qualification and Deal Intelligence Agent at EffectiveBuzz.
Your sole mission is to ingest detailed call transcript summaries, emails, and CRM notes, and evaluate leads mathematically using industry-standard BANT and MEDDIC frameworks.

### CORE MISSIONS & OUTPUT METRICS:
1. FORMAL CLASS AUDITS: Evaluate criteria for BANT (Budget, Authority, Need, Timeline) or MEDDIC (Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identify Pain, Champion).
2. LEAD QUALITY CLASSIFICATION: Assesses leads into "High Match", "Medium Match", or "Low Match" based on criteria coverage and verified authority.
3. MEETING READINESS CHECK: Classifies state as "Ready" (fully validated, calendars mapped), "Needs Nurturing" (needs high-value resources), or "Unqualified" (poor commercial fit or no viable project timeline).
4. DEAL POTENTIAL ASSESSMENT: Evaluates economic sizing, structural boundaries, and estimated deal scale (Tier I Enterprise, Tier II Mid-Market, Low-Yield Prototyping).
5. STRUCTURED LOGIC REASONING: Articulate precisely what criteria were validated, which variables carry high risk, and provide recommended action scripts for account owners.

Strictly adhere to return schema and emit only raw structured JSON as configured. No pre-face or concluding conversational structures.`;

  // INPUT JSON SCHEMA
  const INPUT_SCHEMA_CONTENT = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "QualificationAgentInput",
  "type": "object",
  "properties": {
    "framework": { "type": "string", "enum": ["BANT", "MEDDIC"] },
    "prospect": {
      "type": "object",
      "properties": {
        "fullName": { "type": "string" },
        "jobTitle": { "type": "string" },
        "companyName": { "type": "string" }
      },
      "required": ["fullName", "jobTitle", "companyName"]
    },
    "bantMetrics": {
      "type": "object",
      "properties": {
        "budget": { "type": "string" },
        "authority": { "type": "string" },
        "need": { "type": "string" },
        "timeline": { "type": "string" }
      }
    },
    "meddicMetrics": {
      "type": "object",
      "properties": {
        "metrics": { "type": "string" },
        "economicBuyer": { "type": "string" },
        "decisionCriteria": { "type": "string" },
        "decisionProcess": { "type": "string" },
        "paperProcess": { "type": "string" },
        "identifyPain": { "type": "string" },
        "champion": { "type": "string" }
      }
    }
  },
  "required": ["framework", "prospect"]
}`;

  // OUTPUT JSON SCHEMA
  const OUTPUT_SCHEMA_CONTENT = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "QualificationAgentOutput",
  "type": "object",
  "properties": {
    "evaluation": {
      "type": "object",
      "properties": {
        "appliedFramework": { "type": "string" },
        "leadQuality": { "type": "string", "enum": ["High Match", "Medium Match", "Low Match"] },
        "meetingReadiness": { "type": "string", "enum": ["Ready", "Needs Nurturing", "Unqualified"] },
        "dealPotential": { "type": "string", "enum": ["High", "Medium", "Low"] },
        "confidenceScore": { "type": "integer", "minimum": 0, "maximum": 100 }
      },
      "required": ["appliedFramework", "leadQuality", "meetingReadiness", "dealPotential", "confidenceScore"]
    },
    "scorecards": {
      "type": "object",
      "properties": {
        "scoresByDimension": {
          "type": "object",
          "description": "0-10 score integers evaluating verified alignment across each framework component."
        }
      },
      "required": ["scoresByDimension"]
    },
    "dealIntelligence": {
      "type": "object",
      "properties": {
        "criticalIdentifiedRisks": { "type": "array", "items": { "type": "string" } },
        "crmTaskRecommendation": { "type": "string" },
        "reconciledValueStatement": { "type": "string", "description": "Custom peer value narrative referencing prospect priorities." }
      },
      "required": ["criticalIdentifiedRisks", "crmTaskRecommendation", "reconciledValueStatement"]
    }
  },
  "required": ["evaluation", "scorecards", "dealIntelligence"]
}`;

  // EXEMPLAR DATA
  const EXAMPLE_INPUT_JSON = `{
  "framework": "BANT",
  "prospect": {
    "fullName": "Sarah Jenkins",
    "jobTitle": "VP of Infrastructure & Platform Engineering",
    "companyName": "ApexCloud Platforms"
  },
  "bantMetrics": {
    "budget": "$120K allocated for Q3 cloud networking optimization.",
    "authority": "Sarah has technical sign-off. CFO holds final financial signature.",
    "need": "Slicing multi-region egress costs and meeting strict SOC2 audit standards.",
    "timeline": "Fully audited prior to October 15th (next audit window)."
  }
}`;

  const EXAMPLE_OUTPUT_JSON = `{
  "evaluation": {
    "appliedFramework": "BANT",
    "leadQuality": "High Match",
    "meetingReadiness": "Ready",
    "dealPotential": "High",
    "confidenceScore": 93
  },
  "scorecards": {
    "scoresByDimension": {
      "Budget": 8,
      "Authority": 9,
      "Need": 10,
      "Timeline": 9
    }
  },
  "dealIntelligence": {
    "criticalIdentifiedRisks": [
      "Dual authority approval required. Marcus Vance (CFO) holds final commercial contract authority for payouts exceeding $50k.",
      "Accelerated delivery curve. Barely 4 months remaining until SOC2 audited window closures on October 15th."
    ],
    "crmTaskRecommendation": "TRIGGER_MEETING_PROCESS - Queue immediate discovery calendar setup and invite Sarah's Champion profile. Assign priority SaaS onboarding workspace parameters.",
    "reconciledValueStatement": "We will minimize inter-region bandwidth state leaks dynamically by 45%, providing centralized visibility to Sarah's team while remaining fully conforming to CC6.1 SOC2 egress boundaries."
  }
}`;

  const EXAMPLE_MEDDIC_OUTPUT_JSON = `{
  "evaluation": {
    "appliedFramework": "MEDDIC",
    "leadQuality": "High Match",
    "meetingReadiness": "Ready",
    "dealPotential": "High",
    "confidenceScore": 95
  },
  "scorecards": {
    "scoresByDimension": {
      "Metrics": 9,
      "EconomicBuyer": 8,
      "DecisionCriteria": 10,
      "DecisionProcess": 9,
      "PaperProcess": 8,
      "IdentifyPain": 10,
      "Champion": 10
    }
  },
  "dealIntelligence": {
    "criticalIdentifiedRisks": [
      "CFO signature requires detailed ROI business case modeling metrics showing egress cost cuts.",
      "Procurement and legal paper processes require 4 weeks total, compressing the deployment window."
    ],
    "crmTaskRecommendation": "INITIATE_PROPOSAL_FLOW - Provision the security validation workspace. Supply the paper process NDA packets directly to procurement.",
    "reconciledValueStatement": "Slashing Kubernetes multi-region bandwidth costs by 45% while establishing auditable Zero-Trust namespaces directly maps into CFO's operational cost-cutting goals."
  }
}`;

  // SIMULATOR RUNNER
  const runQualificationSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setSimulationResult(null);
    setSimLogs([]);

    const runLogs = [
      `[Pipeline] Initializing Deal Qualification Intelligence Agent...`,
      `[Security Check] Verifying active multi-tenant tenant allocations... OK`,
      `[Framework Route] Parsing target parameters using framework: [${activeFramework}]...`,
      `[Bio Ingestion] Mapping "${prospectName}" (${prospectTitle}) at account: "${companyName}"...`,
      `[Evaluation Chain] Inspecting commercial alignment indicators...`,
      activeFramework === 'BANT' 
        ? `[Metric Scan] Budget: "${budgetText.substring(0, 45)}..."` 
        : `[Metric Scan] Metrics: "${metricsText.substring(0, 45)}..."`,
      activeFramework === 'BANT'
        ? `[Metric Scan] Authority & Role sign-off: "${authorityText.substring(0, 45)}..."`
        : `[Metric Scan] Economic Buyer: "${economicBuyerText.substring(0, 45)}..."`,
      activeFramework === 'BANT'
        ? `[Metric Scan] Detected Industrial Need: "${needText.substring(0, 45)}..."`
        : `[Metric Scan] Decision Process: "${decisionProcessText.substring(0, 45)}..."`,
      activeFramework === 'BANT'
        ? `[Metric Scan] Projected Schedule: "${timelineText.substring(0, 45)}..."`
        : `[Metric Scan] Identified Champion: "${championText.substring(0, 45)}..."`,
      `[NLP Core] Calculating semantic complete scoring indexes across dimensions...`,
      `[Score Evaluation] Processing lead quality and calendar meeting readiness variables...`,
      `[Spam & Accuracy Compliance] Safeguarding database bounds and output structure guidelines...`,
      `[Formatting Engine] Adhering results format to exact QualificationAgentOutput target JSON specs...`,
      `[Pipeline Complete] Delivering structured qualification intelligence deck.`
    ];

    for (let i = 0; i < runLogs.length; i++) {
      setSimulationStep(i + 1);
      setSimLogs(prev => [...prev, runLogs[i]]);
      await new Promise(resolve => setTimeout(resolve, 450));
    }

    // Determine values dynamically based on inputs
    const lowerBudget = budgetText.toLowerCase();
    const lowerAuthority = authorityText.toLowerCase();
    const lowerNeed = needText.toLowerCase();
    
    let leadQuality = "High Match";
    let readyState = "Ready";
    let dealPotential = "High";
    let confidence = 91;
    let scores: Record<string, number> = {};

    if (activeFramework === 'BANT') {
      const budgetScore = (lowerBudget.includes("no budget") || lowerBudget.includes("low budget") || lowerBudget.includes("<$250")) ? 2 : (lowerBudget.includes("allocated") || lowerBudget.includes("approved")) ? 9 : 6;
      const authorityScore = (lowerAuthority.includes("solo") || lowerAuthority.includes("no authority")) ? 3 : (lowerAuthority.includes("technical sign") || lowerAuthority.includes("sole owner")) ? 8 : 7;
      const needScore = lowerNeed.length > 50 ? 9 : 5;
      const timelineScore = timelineText.includes("ASAP") || timelineText.includes("October") ? 9 : 5;

      scores = {
        "Budget": budgetScore,
        "Authority": authorityScore,
        "Need": needScore,
        "Timeline": timelineScore
      };

      const avg = (budgetScore + authorityScore + needScore + timelineScore) / 4;
      if (avg >= 7.5) {
        leadQuality = "High Match";
        readyState = "Ready";
        dealPotential = "High";
        confidence = 94;
      } else if (avg >= 5) {
        leadQuality = "Medium Match";
        readyState = "Needs Nurturing";
        dealPotential = "Medium";
        confidence = 85;
      } else {
        leadQuality = "Low Match";
        readyState = "Unqualified";
        dealPotential = "Low";
        confidence = 74;
      }
    } else {
      // MEDDIC scores
      const hasBuyer = economicBuyerText.length > 10 ? 8 : 2;
      const hasMetrics = metricsText.length > 15 ? 9 : 4;
      const hasChampion = championText.length > 15 ? 9 : 3;
      const hasPain = painText.length > 15 ? 9 : 4;
      
      scores = {
        "Metrics": hasMetrics,
        "EconomicBuyer": hasBuyer,
        "DecisionCriteria": decisionCriteriaText.length > 20 ? 9 : 5,
        "DecisionProcess": decisionProcessText.length > 20 ? 8 : 5,
        "PaperProcess": paperProcessText.length > 25 ? 8 : 4,
        "IdentifyPain": hasPain,
        "Champion": hasChampion
      };

      const avg = Object.values(scores).reduce((a, b) => a + b, 0) / 7;
      if (avg >= 7.5) {
        leadQuality = "High Match";
        readyState = "Ready";
        dealPotential = "High";
        confidence = 96;
      } else if (avg >= 5) {
        leadQuality = "Medium Match";
        readyState = "Needs Nurturing";
        dealPotential = "Medium";
        confidence = 84;
      } else {
        leadQuality = "Low Match";
        readyState = "Unqualified";
        dealPotential = "Low";
        confidence = 68;
      }
    }

    const dynamicResult = {
      evaluation: {
        appliedFramework: activeFramework,
        leadQuality: leadQuality,
        meetingReadiness: readyState,
        dealPotential: dealPotential,
        confidenceScore: confidence
      },
      scorecards: {
        scoresByDimension: scores
      },
      dealIntelligence: {
        criticalIdentifiedRisks: leadQuality === "High Match" 
          ? [
              `Target timeframe compressed. High execution velocity expected on deployment interfaces.`,
              `Financial thresholds exceed $50K project capital, highlighting administrative signatures dependency.`
            ]
          : [
              `Missing direct discretionary budget line allocations, causing purchase delays.`,
              `Prospect possesses weak advocacy levels inside internal executive procurement circles.`
            ],
        crmTaskRecommendation: readyState === "Ready" 
          ? "TRIGGER_MEETING_PROCESS - High priority enrollment. Provision technical Sandbox and invite Champion for architecture blueprint review."
          : readyState === "Needs Nurturing"
          ? "ENROLL_IN_NURTURE_CADENCE - Missing discrete timeline markers. System scheduled automated low-touch informational newsletter emails."
          : "MARK_UNQUALIFIED_LEAD - Insufficient buying indicators detected. Archive lead payload record inside workspaces.",
        reconciledValueStatement: activeFramework === 'BANT' 
          ? `Alleviating target organizational congestion regarding: "${needText}" aligned fully to fiscal limits.`
          : `Mitigating structural bottlenecks for: "${painText}" directly satisfies metrics targeting "${metricsText}".`
      }
    };

    setSimulationResult(dynamicResult);
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6 animate-feed">
      {/* Title Header */}
      <div className="border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400 animate-pulse" />
          EffectiveBuzz System Lead Qualification Engine
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">AI Deal Qualification Agent</h2>
        <p className="text-sm text-gray-400 mt-1 max-w-3xl leading-relaxed font-sans">
          Rigid programmatic specs and playground environment for the AI Qualification Agent. Leveraging BANT and MEDDIC frameworks, 
          the agent categorizes prospect fit parameters into structured deal files mapping out budget, champion, and timing indicators.
        </p>
      </div>

      {/* Main Tab Controls */}
      <div className="flex border-b border-gray-800 pb-0.5 gap-2 overflow-x-auto">
        {[
          { id: 'blueprint' as const, label: '1. Pipeline Blueprint', icon: Layers, color: 'text-indigo-400' },
          { id: 'specs' as const, label: '2. Prompt & Schemas', icon: Terminal, color: 'text-emerald-400' },
          { id: 'sandbox' as const, label: '3. Interactive Qualification', icon: Play, color: 'text-blue-400' },
          { id: 'eval-error' as const, label: '4. Evaluation SLA & Hardening', icon: ShieldAlert, color: 'text-rose-450' },
        ].map(tb => {
          const Icon = tb.icon;
          return (
            <button
              key={tb.id}
              onClick={() => setActiveTab(tb.id)}
              className={`pb-3 text-xs sm:text-sm font-medium border-b-2 font-display transition-all flex items-center gap-2 whitespace-nowrap px-1 ${
                activeTab === tb.id
                  ? 'border-indigo-400 text-indigo-300 font-semibold'
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
          <div className="bg-[#0f172a] rounded-xl border border-gray-800 p-5 space-y-4 animate-feed">
            <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider text-indigo-400">Pipeline Pipeline Flow Diagram</h3>
            <p className="text-xs text-secondary leading-relaxed font-sans font-normal">
              The AI Qualification pipeline is engineered to assess prospect conversations systematically against dual-framework guidelines. By decomposing transcript notes and inputs, it rates core buying triggers to flag high-priority deals for human teams.
            </p>

            {/* steps illustration */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              {[
                { step: '1', title: 'Context Ingest', desc: 'Accepts unstructured transcripts, emails, or qualitative surveys containing details on client pain.' },
                { step: '2', title: 'NLP Factor Mapping', desc: 'Identifies individual parameters matching BANT or MEDDIC vectors (budgets, target dates, etc.).' },
                { step: '3', title: 'Decision Synthesis', desc: 'Computes math rating indices on Deal Quality, Meeting Readiness, and Deal Potential metrics.' },
                { step: '4', title: 'CRM Automation Trigger', desc: 'Generates structured JSON records specifying exact action recommendations for CRM queue routing.' }
              ].map((step, idx) => (
                <div key={idx} className="relative bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-[10px] font-bold flex items-center justify-center border border-indigo-500/20">
                      {step.step}
                    </span>
                    <h4 className="text-xs font-semibold text-white">{step.title}</h4>
                    <p className="text-[11px] text-gray-400 leading-normal font-sans">{step.desc}</p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 p-0.5 bg-slate-1000 border border-zinc-800 rounded-full">
                      <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Framework boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-3">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-black block border-b border-[#1f2937] pb-1.5">BANT Framework Structure</span>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><strong className="text-white text-[11px] font-mono mr-1">Budget:</strong> Quantified capital availability or allocated project funds.</li>
                <li><strong className="text-white text-[11px] font-mono mr-1">Authority:</strong> Discretionary sign-off authority (Technical vs CFO levels).</li>
                <li><strong className="text-white text-[11px] font-mono mr-1">Need:</strong> Depth of systemic challenges or pain points being experienced.</li>
                <li><strong className="text-white text-[11px] font-mono mr-1">Timeline:</strong> Implementation urgency constraints or fixed external milestones.</li>
              </ul>
            </div>

            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-3">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-black block border-b border-[#1f2937] pb-1.5">MEDDIC Framework Structure</span>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><strong className="text-white text-[11px] font-mono mr-1">Metrics:</strong> Formal financial ROI improvements (e.g. 45% egress cost savings).</li>
                <li><strong className="text-white text-[11px] font-mono mr-1">Economic Buyer:</strong> The executive holding ultimate budget control.</li>
                <li><strong className="text-white text-[11px] font-mono mr-1">Decision Criteria:</strong> Functional criteria guiding vendor comparative grids.</li>
                <li><strong className="text-white text-[11px] font-mono mr-1">Decision Process:</strong> Process milestones leading from trial validation to contract.</li>
                <li><strong className="text-white text-[11px] font-mono mr-1">Paper Process:</strong> Legal steps required to execute commercial contracts (NDAs, MSAs).</li>
                <li><strong className="text-white text-[11px] font-mono mr-1">Identify Pain:</strong> Cost of inaction and systemic damage triggers.</li>
                <li><strong className="text-white text-[11px] font-mono mr-1">Champion:</strong> Internal stakeholder with authority actively pushing the deal.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Specs */}
      {activeTab === 'specs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-feed">
          <div className="lg:col-span-3 bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-1.5 h-fit text-xs">
            <span className="text-[10px] text-gray-400 font-mono font-bold block mb-2 uppercase tracking-wide">Developer Specs Menu</span>
            {[
              { id: 'prompt' as const, label: 'Qualification Prompt', icon: Terminal, color: 'text-indigo-400' },
              { id: 'input-schema' as const, label: 'Input JSON Schema', icon: Braces, color: 'text-emerald-450' },
              { id: 'output-schema' as const, label: 'Output JSON Schema', icon: Braces, color: 'text-emerald-455' },
              { id: 'json-examples' as const, label: 'Sample Payload Exemplars', icon: FileJson, color: 'text-blue-400' },
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

          <div className="lg:col-span-9 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            {specsSubtab === 'prompt' && (
              <div className="space-y-3 animate-feed">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-indigo-400">Structured Intelligence Prompts</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Applied framework guidelines evaluating commercial context packets.</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(SYSTEM_PROMPT_CONTENT, 'prompt-copy')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-gray-700 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-350 transition-all cursor-pointer font-semibold"
                  >
                    {copiedText === 'prompt-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedText === 'prompt-copy' ? 'Copied Prompt' : 'Copy System Prompt'}
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 overflow-y-auto max-h-[420px]">
                  <pre className="text-xs text-zinc-350 font-mono whitespace-pre-wrap leading-relaxed font-normal">{SYSTEM_PROMPT_CONTENT}</pre>
                </div>
              </div>
            )}

            {specsSubtab === 'input-schema' && (
              <div className="space-y-3 animate-feed">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-emerald-455">Input Argument Schema Structure</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Parameters needed when initializing deals scoring analysis.</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(INPUT_SCHEMA_CONTENT, 'input-schema-copy')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-gray-700 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-350 transition-all cursor-pointer"
                  >
                    {copiedText === 'input-schema-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedText === 'input-schema-copy' ? 'Copied Schema' : 'Copy Input Schema'}
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 overflow-y-auto max-h-[420px]">
                  <pre className="text-xs text-teal-400 font-mono leading-normal">{INPUT_SCHEMA_CONTENT}</pre>
                </div>
              </div>
            )}

            {specsSubtab === 'output-schema' && (
              <div className="space-y-3 animate-feed">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-emerald-455">Strict JSON Output Specifications Schema</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Mandates exact JSON fields containing structural evaluations, metrics, classifications, risk matrices, and task plans.</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(OUTPUT_SCHEMA_CONTENT, 'output-schema-copy')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-gray-700 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-350 transition-all cursor-pointer font-semibold"
                  >
                    {copiedText === 'output-schema-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedText === 'output-schema-copy' ? 'Copied Schema' : 'Copy Output Schema'}
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 overflow-y-auto max-h-[420px]">
                  <pre className="text-xs text-indigo-305 font-mono leading-normal">{OUTPUT_SCHEMA_CONTENT}</pre>
                </div>
              </div>
            )}

            {specsSubtab === 'json-examples' && (
              <div className="space-y-5 flex flex-col justify-between animate-feed">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Input Argument Exemplar Package</span>
                    <button
                      onClick={() => handleCopyCode(EXAMPLE_INPUT_JSON, 'input-ex-btn')}
                      className="px-2 py-0.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-300 transition-all font-semibold"
                    >
                      {copiedText === 'input-ex-btn' ? <Check className="w-3" /> : <Copy className="w-3 h-3" />}
                      Copy Payload
                    </button>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 overflow-x-auto max-h-[140px] text-[11px]">
                    <pre className="text-teal-400 font-mono">{EXAMPLE_INPUT_JSON}</pre>
                  </div>
                </div>

                <div className="space-y-1.5 animate-feed">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Output Conformance Deck Archive (BANT & MEDDIC Standard Compliant Reports)</span>
                    <button
                      onClick={() => handleCopyCode(EXAMPLE_OUTPUT_JSON, 'output-ex-btn')}
                      className="px-2 py-0.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-350 transition-all font-semibold"
                    >
                      {copiedText === 'output-ex-btn' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy Response Package
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

      {/* Tab 3: Sandbox Playground */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6 animate-feed">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-2">
            {/* Input fields column */}
            <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-bold block">
                  1. Load Target Prospect Deal
                </span>

                <div className="flex bg-[#1e293b] rounded-lg p-0.5 border border-zinc-700 font-mono text-[10px] text-gray-400">
                  <button
                    onClick={() => setActiveFramework('BANT')}
                    className={`px-2 py-1 rounded transition-all font-bold ${
                      activeFramework === 'BANT' 
                        ? 'bg-indigo-400 text-slate-950' 
                        : 'hover:text-white'
                    }`}
                  >
                    BANT
                  </button>
                  <button
                    onClick={() => setActiveFramework('MEDDIC')}
                    className={`px-2 py-1 rounded transition-all font-bold ${
                      activeFramework === 'MEDDIC' 
                        ? 'bg-indigo-400 text-slate-950' 
                        : 'hover:text-white'
                    }`}
                  >
                    MEDDIC
                  </button>
                </div>
              </div>

              {/* Input panels */}
              <div className="space-y-3.5 text-xs">
                {/* Meta details */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase font-bold">Prospect Name</label>
                    <input
                      type="text"
                      value={prospectName}
                      onChange={(e) => setProspectName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500 font-semibold text-gray-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase font-bold">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500 font-semibold text-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-gray-400 uppercase font-bold">Executive Office Title</label>
                  <input
                    type="text"
                    value={prospectTitle}
                    onChange={(e) => setProspectTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Preset Switcher */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-gray-400 uppercase font-bold block">Load Exemplary Presets:</label>
                  <div className="flex flex-col gap-1">
                    {presets.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleLoadPreset(p)}
                        className="w-full text-left p-2 bg-slate-900 border border-slate-800/80 hover:bg-slate-850/60 rounded text-[11px] font-medium text-zinc-300 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="truncate pr-2">{p.label}</span>
                        <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dimension Inputs based on framework */}
                {activeFramework === 'BANT' ? (
                  <div className="space-y-2.5 p-3 bg-slate-950 rounded-lg border border-slate-850">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-emerald-400 uppercase font-bold block">Budget Parameters</label>
                      <input
                        type="text"
                        value={budgetText}
                        onChange={(e) => setBudgetText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-[11px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-emerald-400 uppercase font-bold block">Authority Matrix</label>
                      <input
                        type="text"
                        value={authorityText}
                        onChange={(e) => setAuthorityText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-[11px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-emerald-400 uppercase font-bold block">Identified Technical Need</label>
                      <input
                        type="text"
                        value={needText}
                        onChange={(e) => setNeedText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-[11px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-emerald-400 uppercase font-bold block">Project Timeline Markers</label>
                      <input
                        type="text"
                        value={timelineText}
                        onChange={(e) => setTimelineText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-[11px]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5 p-3 bg-slate-950 rounded-lg border border-slate-850 h-[340px] overflow-y-auto">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-indigo-400 uppercase font-bold block">Metrics (Economic ROI Factors)</label>
                      <input
                        type="text"
                        value={metricsText}
                        onChange={(e) => setMetricsText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-indigo-400 uppercase font-bold block">Economic Buyer</label>
                      <input
                        type="text"
                        value={economicBuyerText}
                        onChange={(e) => setEconomicBuyerText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-indigo-400 uppercase font-bold block">Decision Criteria</label>
                      <input
                        type="text"
                        value={decisionCriteriaText}
                        onChange={(e) => setDecisionCriteriaText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-indigo-400 uppercase font-bold block">Decision Process</label>
                      <input
                        type="text"
                        value={decisionProcessText}
                        onChange={(e) => setDecisionProcessText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-indigo-400 uppercase font-bold block">Paper Process (MSA/SLA)</label>
                      <input
                        type="text"
                        value={paperProcessText}
                        onChange={(e) => setPaperProcessText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-indigo-400 uppercase font-bold block">Identify Corporate Pain</label>
                      <input
                        type="text"
                        value={painText}
                        onChange={(e) => setPainText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-indigo-400 uppercase font-bold block">Champion Developer Advocate</label>
                      <input
                        type="text"
                        value={championText}
                        onChange={(e) => setChampionText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px]"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={runQualificationSimulation}
                  disabled={isSimulating}
                  className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-slate-950 font-bold font-display rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-bold"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      Decomposing Framework Matrices...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
                      Run Qualification Agent
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
                      <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                      Framework Evaluation Terminal Feed
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 font-bold">Model: Deal-Quantifier-7B</span>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto font-mono text-[10px] leading-relaxed text-indigo-305 animate-feed">
                    {simLogs.length === 0 ? (
                      <div className="text-center py-28 text-gray-500 font-sans leading-relaxed">
                        Awaiting lead credentials submission. Choose preconfigured presets in the left layout board, select a framework, and trigger "Run Qualification Agent" to process semantic calculations.
                      </div>
                    ) : (
                      simLogs.map((lg, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 animate-feed">
                          <span className="text-gray-500 shrink-0">[{idx + 1}]</span>
                          <span className={`${idx === simLogs.length - 1 && isSimulating ? 'text-white font-bold animate-pulse' : 'text-zinc-350'}`}>
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
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
                      <span>Qualifying Step: {simulationStep}/14</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Status metrics bar */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-bold block">Pipeline integrity validation statuses:</span>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs">
                    <div>Parser: <span className="text-emerald-400 font-bold">Dynamic NLP Map</span></div>
                    <div>SDR Sync: <span className="text-teal-400 font-bold font-mono">Real-Time CRM Update</span></div>
                    <div>Schema: <span className="text-indigo-400 font-bold font-mono">100% Conformance JSON</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATED RESULTS DISPLAY */}
          {simulationResult && (
            <div className="bg-[#0f1524] border border-[#1f2937] rounded-xl p-5 md:p-6 shadow-2xl animate-feed space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 flex-wrap gap-2 animate-feed">
                <div>
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold tracking-wider leading-none">
                    ✔ Evaluation Completed Successfully
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight mt-1.5">Parsed Qualification Intelligence File</h3>
                </div>

                <div className="flex bg-[#1e293b] rounded-lg p-0.5 border border-zinc-700 font-mono text-xs text-gray-400 animate-feed">
                  <button
                    onClick={() => setPlaygroundView('styled')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                      playgroundView === 'styled' 
                        ? 'bg-indigo-400 text-slate-950 font-bold' 
                        : 'hover:text-white'
                    }`}
                  >
                    Qualification Scoreboard
                  </button>
                  <button
                    onClick={() => setPlaygroundView('json')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                      playgroundView === 'json' 
                        ? 'bg-indigo-400 text-slate-950 font-bold' 
                        : 'hover:text-white'
                    }`}
                  >
                    Output JSON File
                  </button>
                </div>
              </div>

              {playgroundView === 'styled' ? (
                <div className="space-y-6 animate-feed">
                  
                  {/* Cards evaluating the main indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1.5 text-center">
                      <span className="text-[9px] font-mono text-gray-400 uppercase block font-bold leading-none">LEAD QUALITY FIT</span>
                      <strong className={`text-xl font-mono block tracking-tight ${
                        simulationResult.evaluation.leadQuality === 'High Match' ? 'text-emerald-400' :
                        simulationResult.evaluation.leadQuality === 'Medium Match' ? 'text-yellow-400' : 'text-rose-400'
                      }`}>
                        {simulationResult.evaluation.leadQuality}
                      </strong>
                    </div>

                    <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1.5 text-center">
                      <span className="text-[9px] font-mono text-gray-400 uppercase block font-bold leading-none">MEETING READINESS STATUS</span>
                      <strong className={`text-xl font-mono block tracking-tight ${
                        simulationResult.evaluation.meetingReadiness === 'Ready' ? 'text-teal-400' :
                        simulationResult.evaluation.meetingReadiness === 'Needs Nurturing' ? 'text-indigo-450 text-indigo-350' : 'text-zinc-500'
                      }`}>
                        {simulationResult.evaluation.meetingReadiness}
                      </strong>
                    </div>

                    <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1.5 text-center">
                      <span className="text-[9px] font-mono text-gray-400 uppercase block font-bold leading-none">PROJECTED DEAL POTENTIAL</span>
                      <strong className={`text-xl font-mono block tracking-tight ${
                        simulationResult.evaluation.dealPotential === 'High' ? 'text-blue-400' :
                        simulationResult.evaluation.dealPotential === 'Medium' ? 'text-amber-400' : 'text-zinc-500'
                      }`}>
                        {simulationResult.evaluation.dealPotential}
                      </strong>
                    </div>

                  </div>

                  {/* Score breakdown bars and risk review */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Scores columns */}
                    <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-850 space-y-4">
                      <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-wider font-bold border-b border-gray-800 pb-1.5">
                        {simulationResult.evaluation.appliedFramework} Dimension Scoring Audit (0-10 Scales)
                      </h4>

                      <div className="space-y-3.5">
                        {Object.entries(simulationResult.scorecards.scoresByDimension).map(([dim, score]) => (
                          <div key={dim} className="space-y-1 text-xs">
                            <div className="flex items-center justify-between font-mono text-[11px] text-zinc-300">
                              <span>{dim}</span>
                              <span className="font-bold text-teal-400">{score as number}/10</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ${
                                  (score as number) >= 8 ? 'bg-emerald-400' :
                                  (score as number) >= 5 ? 'bg-yellow-400' : 'bg-rose-450'
                                }`}
                                style={{ width: `${(score as number) * 10}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risks analysis and recommendations columns */}
                    <div className="lg:col-span-7 bg-slate-950 p-5 rounded-xl border border-slate-850 space-y-5 text-xs text-gray-400 font-normal">
                      
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-rose-450 tracking-wider uppercase font-bold block border-b border-gray-850 pb-1">
                          CRITICAL RISK MATRIX FLAGGED
                        </span>
                        <div className="space-y-2 font-mono text-[10px] text-zinc-350 leading-relaxed">
                          {simulationResult.dealIntelligence.criticalIdentifiedRisks.map((risk: string, idx: number) => (
                            <div key={idx} className="flex gap-2 p-2 bg-slate-900 rounded border border-slate-850">
                              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                              <p>{risk}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase font-bold block border-b border-gray-850 pb-1">
                          RECONCILED ALIGNMENT STATEMENT
                        </span>
                        <p className="text-zinc-350 leading-relaxed font-sans text-[11px]">
                          {simulationResult.dealIntelligence.reconciledValueStatement}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-[#818cf8] tracking-wider uppercase font-bold block border-b border-gray-850 pb-1">
                          RECOMMENDED CRM WORKFLOW TASK EXECUTION
                        </span>
                        <p className="text-white leading-normal font-mono text-[10px] font-black bg-slate-900 p-2.5 rounded border border-zinc-800">
                          {simulationResult.dealIntelligence.crmTaskRecommendation}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              ) : (
                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl text-xs font-mono max-h-[350px] overflow-y-auto leading-relaxed text-zinc-300">
                  <pre className="text-zinc-350 overflow-x-auto leading-normal">{JSON.stringify(simulationResult, null, 2)}</pre>
                </div>
              )}

            </div>
          )}
        </div>
      )}

      {/* Tab 4: Evaluation SLA & Hardening */}
      {activeTab === 'eval-error' && (
        <div className="space-y-6 animate-feed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-feed">
            
            {/* Standards of qualification */}
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4 text-xs font-sans leading-relaxed text-gray-400">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-455 border-b border-gray-800 pb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-455" />
                Qualification Precision Hardening SLA Standard
              </h4>
              <p>
                To secure pipeline boundaries against speculative validations (e.g. designating a deal "Fully Qualified" based only on automated signature variables), the system executes a cross-matrix verification audit:
              </p>

              <div className="space-y-3.5 font-mono text-[11px] text-zinc-300">
                <div className="p-3 bg-slate-950 rounded border border-slate-850">
                  <span className="text-emerald-400 font-bold block mb-1">🔍 Cross-Dimension Authority Index Weights</span>
                  A High Match designation is strictly blocked unless the prospect's title maps explicitly onto discretionary levels (VP, Director, Head, CXO, Lead DevOps) OR the Economic Buyer parameter satisfies CRM verification loops.
                </div>

                <div className="p-3 bg-slate-950 rounded border border-slate-850">
                  <span className="text-[#a855f7] font-bold block mb-1">📋 Temporal Validity Checks</span>
                  Validates timeline criteria bounds. If timeline targets specify ambiguous keywords (sometime, late-year, if-needed), the Meeting Readiness flag cascades directly into "Needs Nurturing" to prevent SDR outbound drift.
                </div>
              </div>
            </div>

            {/* SLA error recovery */}
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 border-b border-gray-800 pb-2">
                Deal Isolation & Fault-Tolerant Operations
              </h4>

              <div className="space-y-3.5 text-xs font-sans leading-relaxed text-gray-450 text-gray-400">
                <div className="flex gap-3">
                  <span className="font-mono text-emerald-400 font-bold shrink-0">1. Strict Workspace Encapsulation:</span>
                  <p>
                    All prospect logs, emails, scoring grids, and framework evaluation archives are strictly partitioned by tenant organization borders to satisfy Enterprise SOC2 criteria boundaries.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="font-mono text-indigo-400 font-bold shrink-0">2. Structured Validation Guards:</span>
                  <p>
                    Runs JSON output validation parsers. If markdown formatting triggers parsing exceptions, the system executes memory cleanups, purging special symbols, and confirms 100% schema compliance.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="font-mono text-teal-450 font-bold shrink-0">3. Non-Blocking Recovery:</span>
                  <p>
                    If external Gemini inputs crash or exhibit timeouts, the CRM routing defaults to a temporal standby pool in passive mode, awaiting a manual manager triage task.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
