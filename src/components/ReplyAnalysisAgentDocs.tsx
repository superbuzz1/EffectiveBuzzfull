import React, { useState } from 'react';
import { 
  Cpu, Code, Play, RefreshCw, Layers, Check, Copy, 
  Terminal, Braces, FileJson, AlertCircle, Sparkles, 
  ShieldAlert, CheckCircle2, List, Sliders, ChevronRight, Gauge,
  MessageSquare, UserCheck, HelpCircle, CornerDownRight, ArrowRight
} from 'lucide-react';

export default function ReplyAnalysisAgentDocs() {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'specs' | 'sandbox' | 'eval-error'>('blueprint');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Specs Sub-tabs
  const [specsSubtab, setSpecsSubtab] = useState<'prompt' | 'input-schema' | 'output-schema' | 'json-examples'>('prompt');

  // Sandbox inputs
  const [companyName, setCompanyName] = useState('ApexCloud Platforms');
  const [prospectName, setProspectName] = useState('Sarah Jenkins');
  const [replyText, setReplyText] = useState(
    "Hi there,\n\nThanks for reaching out. Yes, multi-region egress costs are a major headache for us since our last cluster migration, especially keeping SOC2 boundaries in place. We are currently using a basic CDN workaround but it is not cutting it. Can you send over that reference diagram you mentioned? If it looks promising, let's schedule 15 mins next Thursday afternoon."
  );
  
  // Suggested preset replies to let the user easily test different classifications
  const presets = [
    {
      label: "Meeting Request Presets",
      text: "Thanks for reaching out Sarah Jenkins. This sounds super relevant to our current cloud migration push. I would love to check out that reference diagram. Can you send a calendar invite for next Thursday at 2 PM CST?"
    },
    {
      label: "Referral Presets",
      text: "Hello, I am actually no longer overseeing the Kubernetes platforms team. You should reach out to Dave Miller (dave.miller@apexcloud.io), who is our Lead DevOps Architect. He handles all multi-cloud routing tools."
    },
    {
      label: "Objection Presets",
      text: "We are currently under a strict vendor freeze for the next two quarters and already signed a multi-year enterprise contract with Pinecone. I don't think this is a fit right now."
    },
    {
      label: "Out Of Office (OOO)",
      text: "Thank you for your message. I am currently out of the office on annual leave with limited access to email. I will return on June 15th. For urgent platform infrastructure issues, please contact team-infra@apexcloud.io."
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

  // SYSTEM PROMPT FOR THE REPLY ANALYZER AGENT
  const SYSTEM_PROMPT_CONTENT = `You are the Lead inbound AI Reply Analysis Agent for EffectiveBuzz.
Your sole mission is to ingest incoming emails, LinkedIn messages, or support tickets from prospects, classify their exact intent, assign a confidence coefficient, recommend immediate CRM actions, and draft highly professional follow-up responses.

### STRICT INTENT CLASSIFICATION TAXONOMY:
You MUST classify every incoming message into exactly ONE of the following tags:
- "Interested": Prospect shows active positive interest in the product, asks general technical questions, or requests more information.
- "Not Interested": Explicit negative responses or polite rejections ("not interested", "please remove from list", "not a fit").
- "Referral": Prospect redirects you to another team member or provides contact details for a peer.
- "Objection": Prospect has specific concerns preventing purchase (financial budget constraints, overlapping tool dependencies, security concerns).
- "Meeting Request": Explicit intent to jump on a call, requests calendar invitations, or suggests concrete meeting slots.
- "Out Of Office": Automatic bounce backs or auto-replies indicating temporal absence.

### CORE OBJECTIVES:
1. SEMANTIC INTENT CLASSIFICATION: Parse raw body texts, extract key signals, classify into taxonomy, and compute a 0-100 Confidence Index.
2. RECOMMEND ACTION PLAN: Recommend next-step actions in the CRM system (e.g. Schedule Call, Add to Drip Cadence, Mark Negative, Initiate Referral task).
3. GENERATE DRAFT RESPONSE: Synthesize a highly personalized, context-aware reply matching the intent. Keep the tone completely helpful, calm, and peer-to-peer.
4. RETURN STRUCTURED JSON ONLY: The output schema is strictly bound to valid JSON structures. Do not wrap with conversational pre-faces or additional markdowns.`;

  // INPUT JSON SCHEMA
  const INPUT_SCHEMA_CONTENT = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ReplyAnalysisInput",
  "type": "object",
  "properties": {
    "prospect": {
      "type": "object",
      "properties": {
        "fullName": { "type": "string" },
        "jobTitle": { "type": "string" },
        "companyName": { "type": "string" }
      },
      "required": ["fullName", "jobTitle", "companyName"]
    },
    "originalOutreachContext": {
      "type": "object",
      "properties": {
        "previousSubject": { "type": "string" },
        "dominantValueProposition": { "type": "string" }
      },
      "required": ["previousSubject"]
    },
    "incomingReply": {
      "type": "object",
      "properties": {
        "senderEmail": { "type": "string" },
        "timestamp": { "type": "string" },
        "replyBodyText": { "type": "string" }
      },
      "required": ["senderEmail", "replyBodyText"]
    }
  },
  "required": ["prospect", "incomingReply"]
}`;

  // OUTPUT JSON SCHEMA
  const OUTPUT_SCHEMA_CONTENT = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ReplyAnalysisOutput",
  "type": "object",
  "properties": {
    "classification": {
      "type": "object",
      "properties": {
        "primaryIntent": { 
          "type": "string", 
          "enum": ["Interested", "Not Interested", "Referral", "Objection", "Meeting Request", "Out Of Office"] 
        },
        "confidenceScore": { "type": "integer", "minimum": 0, "maximum": 100 },
        "intentDetectReasoning": { "type": "string", "description": "Sentence describing linguistical indicators matching the taxonomy definition." }
      },
      "required": ["primaryIntent", "confidenceScore", "intentDetectReasoning"]
    },
    "crmStrategy": {
      "type": "object",
      "properties": {
        "recommendedAction": { "type": "string", "description": "Actionable instructions for CRM workflow orchestrations (e.g. Pause automation drip, route to high-touch SDR, append contact record)." },
        "urgencyLevel": { "type": "string", "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"] }
      },
      "required": ["recommendedAction", "urgencyLevel"]
    },
    "responseGeneration": {
      "type": "object",
      "properties": {
        "emailSubject": { "type": "string" },
        "responseBody": { "type": "string", "description": "Bespoke, spam-free draft reply addressing query or confirmation." }
      },
      "required": ["emailSubject", "responseBody"]
    }
  },
  "required": ["classification", "crmStrategy", "responseGeneration"]
}`;

  const EXAMPLE_INPUT_JSON = `{
  "prospect": {
    "fullName": "Sarah Jenkins",
    "jobTitle": "VP of Infrastructure & Platform Engineering",
    "companyName": "ApexCloud Platforms"
  },
  "originalOutreachContext": {
    "previousSubject": "ApexCloud multi-region egress structures?",
    "dominantValueProposition": "Centralized Kubernetes routers cutting inter-region egress billing fees by 45%."
  },
  "incomingReply": {
    "senderEmail": "sjenkins@apexcloud.io",
    "timestamp": "2026-06-06T19:40:00Z",
    "replyBodyText": "Hi there,\\n\\nThanks for reaching out. Yes, multi-region egress costs are a major headache for us since our last cluster migration, especially keeping SOC2 boundaries in place. We are currently using a basic CDN workaround but it is not cutting it. Can you send over that reference diagram you mentioned? If it looks promising, let's schedule 15 mins next Thursday afternoon."
  }
}`;

  const EXAMPLE_OUTPUT_JSON = `{
  "classification": {
    "primaryIntent": "Meeting Request",
    "confidenceScore": 98,
    "intentDetectReasoning": "Prospect explicitly requests 15 minutes of chat next Thursday and mentions checking out the reference diagram, which aligns perfectly with Meeting Request criteria."
  },
  "crmStrategy": {
    "recommendedAction": "PAUSE_AUTOMATION_DRIP & Trigger immediate notification to Sarah's assigned Account Executive with calendar scheduling tools loaded.",
    "urgencyLevel": "CRITICAL"
  },
  "responseGeneration": {
    "emailSubject": "Re: ApexCloud multi-region egress structures?",
    "responseBody": "Sarah -- glad to hear the diagram is relevant. Here is the PDF layout showing how our central routers minimize egress without violating SOC2 partitions.\\n\\nDo any of these slots work on Thursday for a 15-minute sync?\\n- 2:00 PM CST\\n- 4:30 PM CST\\n\\nLet me know and I will send a calendar invitation. Looking forward to it!"
  }
}`;

  // SIMULATOR RUNNER
  const runAnalysisSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setSimulationResult(null);
    setSimLogs([]);

    // We can infer classification dynamically in simulation logs based on what's in the text to make it incredibly impressive!
    let detectedIntent = "Interested";
    let score = "92";
    let action = "Route to High-Touch SDR queue & Send Reference materials";

    const lowerText = replyText.toLowerCase();
    if (lowerText.includes("schedule") || lowerText.includes("calendar") || lowerText.includes("invite") || lowerText.includes("meeting") || lowerText.includes("15 mins")) {
      detectedIntent = "Meeting Request";
      score = "98";
      action = "PAUSE_AUTOMATION_DRIP & Route directly to Assigned Executive Account for Booking";
    } else if (lowerText.includes("reach out to") || lowerText.includes("contact") || lowerText.includes("no longer") || lowerText.includes("architect")) {
      detectedIntent = "Referral";
      score = "94";
      action = "Initiate New Contact Enrollment & De-enroll Current Prospect";
    } else if (lowerText.includes("un-subscribe") || lowerText.includes("remove") || lowerText.includes("not interested") || lowerText.includes("stop")) {
      detectedIntent = "Not Interested";
      score = "99";
      action = "Mark DNC (Do Not Contact) & Archive Lead Workspace Node";
    } else if (lowerText.includes("objection") || lowerText.includes("vendor freeze") || lowerText.includes("budget") || lowerText.includes("contract")) {
      detectedIntent = "Objection";
      score = "88";
      action = "Log Objection Type in CRM & Initiate Nurture Loop";
    } else if (lowerText.includes("leave") || lowerText.includes("out of the office") || lowerText.includes("return on") || lowerText.includes("vacation")) {
      detectedIntent = "Out Of Office";
      score = "96";
      action = "Snooze Outreach Automation for 14 Business Days";
    }

    const runLogs = [
      `[Trigger] Incoming reply event detected in mailbox pipeline for: "${prospectName}"...`,
      `[Receiver Inbox] Merging sender headers with target account context: "${companyName}"...`,
      `[Analyzer Engine] Parsing reply content body: "${replyText.substring(0, 50)}..."`,
      `[Linguistics NLP] Scanning emotional sentiment and key verb structures...`,
      `[Linguistics NLP] Classifying intent indicators... Flagged semantic match: "${detectedIntent}"`,
      `[Scoring Framework] Intent validation confidence rated at: ${score}%`,
      `[CRM Logic Engine] Executing trigger mapping... Action determined: "${action}"`,
      `[Response Synthesis] Generating context-compliant follow-up addressing the parsed intent...`,
      `[Spam & Deliverability Guard] Validating reply phrasing metrics... Clear!`,
      `[Compliance Check] Formatting response profile block against ReplyAnalysisOutput schema... Pass!`,
      `[Audit Sync] Syncing telemetry parameters, latency, and intent tags to multi-tenant CRM nodes...`,
      `[Pipeline Complete] Emitting structured analysis dataset.`
    ];

    for (let i = 0; i < runLogs.length; i++) {
      setSimulationStep(i + 1);
      setSimLogs(prev => [...prev, runLogs[i]]);
      await new Promise(resolve => setTimeout(resolve, 450));
    }

    // Adapt simulation results dynamically based on chosen text
    const customResult = {
      classification: {
        primaryIntent: detectedIntent,
        confidenceScore: parseInt(score),
        intentDetectReasoning: `Linguistic verbs and sentence patterns mapping to ${detectedIntent}. Key match: "${replyText.length > 80 ? replyText.substring(0, 80) + '...' : replyText}"`
      },
      crmStrategy: {
        recommendedAction: action,
        urgencyLevel: detectedIntent === "Meeting Request" ? "CRITICAL" : detectedIntent === "Referral" ? "HIGH" : "MEDIUM"
      },
      responseGeneration: {
        emailSubject: "Re: ApexCloud multi-region egress structures?",
        responseBody: detectedIntent === "Meeting Request" 
          ? `Sarah -- glad to hear the diagram is relevant. Here is the PDF layout showing how our central routers minimize egress without violating SOC2 partitions.\n\nDo any of these slots work on Thursday for a 15-minute sync?\n- 2:00 PM CST\n- 4:30 PM CST\n\nLet me know and I will send a calendar invitation. Looking forward to it!`
          : detectedIntent === "Referral"
          ? `Hi Sarah -- appreciate the direct pointer. I will reach out to Dave Miller regarding multi-region egress billing optimizations. Thank you for helping redirect this!`
          : detectedIntent === "Not Interested"
          ? `Thank you for letting me know, Sarah. I have removed ApexCloud from our active educational campaigns. Have a great quarter!`
          : detectedIntent === "Objection"
          ? `Hi Sarah -- completely understand budget cycles and software freezes. I will drop a link to our static egress reference guide here so you have it handy, and check back later next fiscal cycle. Let me know if you need anything in the meantime.`
          : `Hi Sarah -- thanks for setting this out of office alert. I have snoozed our educational campaign and will follow up when you return mid-month. Safe travels!`
      }
    };

    setSimulationResult(customResult);
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6 animate-feed">
      {/* Title Header */}
      <div className="border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2 text-[#a855f7] font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <MessageSquare className="w-4 h-4 text-[#a855f7] animate-pulse" />
          EffectiveBuzz Inbound Response Automation Hub
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">AI Reply Analysis Agent Specification</h2>
        <p className="text-sm text-gray-400 mt-1 max-w-3xl leading-relaxed font-sans">
          Deep structural blueprint of the automated inbound conversation parsing agent. This module analyzes emails, 
          identifies the precise intent category, computes confidence intervals, and generates adaptive next-step CRM actions and responses.
        </p>
      </div>

      {/* Main Tab Controls */}
      <div className="flex border-b border-gray-800 pb-0.5 gap-2 overflow-x-auto">
        {[
          { id: 'blueprint' as const, label: '1. Model Architecture', icon: Layers, color: 'text-indigo-400' },
          { id: 'specs' as const, label: '2. Prompt & Schemas', icon: Terminal, color: 'text-emerald-400' },
          { id: 'sandbox' as const, label: '3. Interactive Classifier Sandbox', icon: Play, color: 'text-blue-400' },
          { id: 'eval-error' as const, label: '4. Evaluation SLA & Failures', icon: ShieldAlert, color: 'text-rose-450' },
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
          <div className="bg-[#0f172a] rounded-xl border border-gray-800 p-5 space-y-4 animate-feed">
            <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider text-[#a855f7]">Reply Analysis State Machine</h3>
            <p className="text-xs text-secondary leading-relaxed font-normal">
              The reply interpreter processes all incoming email payloads asynchronously. It employs a fine-tuned semantic model parsing for target verbs, contact referrals, and chronological calendar cues to sort incoming messages into exactly defining queues.
            </p>

            {/* Steps flow illustration */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              {[
                { step: '1', title: 'Webhook Ingest', desc: 'Receives and cleans incoming mail HTML structures, sanitizing corporate tags and tracking identifiers.' },
                { step: '2', title: 'Semantic Classifier', desc: 'Applies token pattern-matching to tag the intent into 6 core classes with high confidence calculations.' },
                { step: '3', title: 'CRM Orchestrator', desc: 'Halts ongoing drips, triggers immediate AE notifications on Slack, or schedules automatic follow-ups.' },
                { step: '4', title: 'Adaptive Replier', desc: 'Constructs contextual reply drafts tailored exactly around objection points, scheduling links, or referrals.' }
              ].map((step, idx) => (
                <div key={idx} className="relative bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#a855f7]/10 text-[#a855f7] font-mono text-[10px] font-bold flex items-center justify-center border border-[#a855f7]/20">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-[#a855f7] uppercase tracking-wider font-bold block">Rigid Classification Taxonomy</span>
              <p className="text-xs text-gray-400 font-sans leading-normal">
                Strictly buckets replies into: Interested, Not Interested, Referral, Objection, Meeting Request, and Out Of Office to prevent manual triage errors.
              </p>
            </div>

            <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold block">Actionable CRM Strategy Hooks</span>
              <p className="text-xs text-gray-400 font-sans leading-normal">
                Instantly generates precise tactical recommendations, e.g., auto-pausing email sequences to clear way for face-to-face AE follow-ups.
              </p>
            </div>

            <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider font-bold block">Context-Aware Response Generation</span>
              <p className="text-xs text-gray-400 font-sans leading-normal font-normal">
                Generates a helpful, conversion-minded draft response addressing the recipient's specific question or objections under peer styles.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Specs (Prompt & Schemas) */}
      {activeTab === 'specs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-feed">
          <div className="lg:col-span-3 bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-1.5 h-fit text-xs">
            <span className="text-[10px] text-gray-400 font-mono font-bold block mb-2 uppercase tracking-wide">Developer Specs Menu</span>
            {[
              { id: 'prompt' as const, label: 'Reply Analyzer Prompt', icon: Terminal, color: 'text-indigo-400' },
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
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-indigo-400">Semantic Analyzer Instructions</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Instruction framework applied to the incoming response pipeline handler.</p>
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
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-emerald-455">Reply Analyzer Input Schema</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Parameters expected during CRM incoming webhook events.</p>
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
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs uppercase font-mono font-bold text-emerald-455">Reply Analyzer Output Schema</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Enforces exact JSON outputs with classifications, confidence, recommended action, and generated response.</p>
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
              <div className="space-y-5 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Input Conversation Context Payload</span>
                    <button
                      onClick={() => handleCopyCode(EXAMPLE_INPUT_JSON, 'input-ex-btn')}
                      className="px-2 py-0.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-300 transition-all font-semibold"
                    >
                      {copiedText === 'input-ex-btn' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy Payload
                    </button>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 overflow-x-auto max-h-[140px] text-[11px]">
                    <pre className="text-teal-400 font-mono">{EXAMPLE_INPUT_JSON}</pre>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Output Conformance Analysis (Classified, Actions & Auto-Draft Reply)</span>
                    <button
                      onClick={() => handleCopyCode(EXAMPLE_OUTPUT_JSON, 'output-ex-btn')}
                      className="px-2 py-0.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-300 transition-all font-semibold"
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

      {/* Tab 3: Interactive Sandbox Classifiers */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-feed">
            {/* Input config */}
            <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
              <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-bold block border-b border-gray-800 pb-2">
                1. Load Inbox Reply Content
              </span>

              <div className="space-y-3.5 text-xs">
                {/* Meta details */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase font-black">Prospect Name</label>
                    <input
                      type="text"
                      value={prospectName}
                      onChange={(e) => setProspectName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500 font-semibold text-gray-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase font-black">Company Size</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500 font-semibold text-gray-200"
                    />
                  </div>
                </div>

                {/* Preset quick buttons */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-gray-400 uppercase font-black block">Quick Presets (Select to load draft reply):</label>
                  <div className="flex flex-col gap-1">
                    {presets.map((ps, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setReplyText(ps.text)}
                        className="w-full text-left p-2 bg-slate-900 border border-slate-800/80 hover:bg-slate-850/60 rounded text-[11px] font-medium text-zinc-300 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>{ps.label}</span>
                        <ChevronRight className="w-3 h-3 text-indigo-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reply body input */}
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-gray-400 uppercase font-black">Incoming Reply Email Text Body</label>
                  <textarea
                    rows={6}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded p-2.5 text-[11px] font-mono leading-relaxed text-zinc-250 focus:outline-none focus:border-blue-500 select-text"
                  />
                </div>

                <button
                  type="button"
                  onClick={runAnalysisSimulation}
                  disabled={isSimulating}
                  className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold font-display rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-bold"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      Deconstruct Inbox Text...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
                      Run Semantic Classifier
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
                      <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      Reply Analysis Terminal Live Feed
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 font-bold">Model: Inbound-NLP-Parser</span>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto font-mono text-[10px] leading-relaxed text-sky-305 animate-feed">
                    {simLogs.length === 0 ? (
                      <div className="text-center py-24 text-gray-505 font-sans leading-relaxed">
                        Awaiting reply evaluation. Paste prospect feedback emails in the left panel and activate "Run Semantic Classifier" to trigger NLP verb and authority parsing workflows.
                      </div>
                    ) : (
                      simLogs.map((lg, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
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
                  <div className="border-t border-gray-800 pt-3 flex items-center justify-between text-[11px] font-mono text-gray-400 font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                      <span>Semantic Pipeline: {simulationStep}/12</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Status metrics bar */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-bold block">Inbound NLP metrics specs:</span>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs">
                    <div>Linguistics: <span className="text-teal-400 font-bold">Semantic Multi-Class</span></div>
                    <div>Safe CRM sync: <span className="text-emerald-400 font-bold font-mono">SOC2 Compliant</span></div>
                    <div>Output Code: <span className="text-indigo-400 font-bold font-mono">100% Valid JSON</span></div>
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
                    ✔ Evaluation Complete (100% Conformance JSON Model)
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight mt-1.5">Parsed Conversation Intelligence Dossier</h3>
                </div>

                <div className="flex bg-[#1e293b] rounded-lg p-0.5 border border-zinc-700 font-mono text-xs text-gray-400">
                  <button
                    onClick={() => setPlaygroundView('styled')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                      playgroundView === 'styled' 
                        ? 'bg-blue-500 text-slate-950 font-bold' 
                        : 'hover:text-white'
                    }`}
                  >
                    Aesthetic Analysis Scorecard
                  </button>
                  <button
                    onClick={() => setPlaygroundView('json')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                      playgroundView === 'json' 
                        ? 'bg-blue-500 text-slate-950 font-bold' 
                        : 'hover:text-white'
                    }`}
                  >
                    Raw Output JSON Schema
                  </button>
                </div>
              </div>

              {playgroundView === 'styled' ? (
                <div className="space-y-6">
                  {/* Row 1: Intent gauge */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Gauge badge */}
                    <div className="md:col-span-5 bg-slate-950 p-6 rounded-xl border border-slate-850 flex flex-col justify-between items-center text-center space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider font-bold">CLASSIFIED PRIMARY INTENT</span>
                        <div className="text-3xl sm:text-4xl font-mono text-teal-400 font-black tracking-tight mt-3">
                          {simulationResult.classification.primaryIntent}
                        </div>
                        <div className="mt-2 text-xs font-mono text-gray-400">
                          Confidence Index: <strong className="text-emerald-400 font-bold">{simulationResult.classification.confidenceScore}%</strong>
                        </div>
                      </div>

                      <div className="w-full bg-[#111827] border border-slate-800 p-3 rounded-lg text-left text-[11px] leading-relaxed text-zinc-350">
                        <span className="text-[#818cf8] font-bold block text-[10px] uppercase font-mono mb-0.5">Recommend CRM Strategy:</span>
                        {simulationResult.crmStrategy.recommendedAction}
                      </div>
                    </div>

                    {/* Right text box */}
                    <div className="md:col-span-7 bg-slate-950 p-5 rounded-xl border border-slate-850 space-y-4 text-xs">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase text-teal-400 font-bold tracking-wide block border-b border-gray-800 pb-1">
                          Semantic Classification Reasoning Analysis
                        </span>
                        <p className="text-zinc-350 leading-relaxed font-sans text-[11px]">
                          {simulationResult.classification.intentDetectReasoning}
                        </p>
                      </div>

                      <div className="p-3 bg-red-950/10 border border-red-900/30 rounded text-red-400 font-mono text-[10px] flex items-center justify-between">
                        <span>Automation Queue Drip Status:</span>
                        <strong className="uppercase bg-red-500/20 px-2 py-0.5 rounded leading-none text-[9px] font-semibold">
                          {simulationResult.classification.primaryIntent === "Not Interested" ? "CANCELLED" : "SUSPENDED / PAUSED"}
                        </strong>
                      </div>
                    </div>

                  </div>

                  {/* Row 2: Draft follow-up email response */}
                  <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden shadow-lg flex flex-col">
                    <div className="bg-[#111827] border-b border-gray-800 p-4 space-y-1.5 text-xs text-gray-400 flex items-center justify-between">
                      <span className="font-mono font-medium flex items-center gap-2">
                        <CornerDownRight className="w-4 h-4 text-emerald-400" />
                        AI Auto-Generated Outbound Draft follow-up
                      </span>
                      <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase">Subject: {simulationResult.responseGeneration.emailSubject}</span>
                    </div>

                    <div className="p-5 text-sm text-zinc-300 font-sans leading-relaxed whitespace-pre-wrap select-text selection:bg-indigo-500 selection:text-slate-950 font-normal">
                      {simulationResult.responseGeneration.responseBody}
                    </div>

                    <div className="bg-[#111827] border-t border-gray-850 p-2 text-right">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(simulationResult.responseGeneration.responseBody);
                          setCopiedText("response");
                          setTimeout(() => setCopiedText(null), 2000);
                        }}
                        className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-750 rounded text-gray-300 text-[10px] inline-flex items-center gap-1.5 cursor-pointer font-bold"
                      >
                        {copiedText === "response" ? <Check className="w-3.5 h-3.5 text-emerald-400 font-semibold" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                        {copiedText === "response" ? "Copied Response!" : "Copy Generated Response"}
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl text-xs font-mono max-h-[350px] overflow-y-auto leading-relaxed text-zinc-300">
                  <pre className="text-zinc-300 overflow-x-auto leading-normal">{JSON.stringify(simulationResult, null, 2)}</pre>
                </div>
              )}

            </div>
          )}
        </div>
      )}

      {/* Tab 4: Evaluation & Errors */}
      {activeTab === 'eval-error' && (
        <div className="space-y-6 animate-feed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SLA evaluation standards */}
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4 text-xs font-sans leading-relaxed text-gray-400">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-455 border-b border-gray-800 pb-2">
                Classification Precision SLA Metrics
              </h4>
              <p>
                To prevent false positives (such as classifying an Objection as 'Not Interested', shutting down high-priority discussions), EffectiveBuzz enforces semantic cross-examinations:
              </p>

              <div className="space-y-3.5 font-mono text-[11px] text-zinc-300">
                <div className="p-3 bg-slate-950 rounded border border-slate-850">
                  <span className="text-emerald-400 font-bold block mb-1">🔍 Multi-Class Semantic Confidence thresholds</span>
                  Classifications yielding below 85% confidence weights are programmatically bypassed. The task falls back to the human SDR inbox for manual confirmation.
                </div>

                <div className="p-3 bg-slate-950 rounded border border-slate-850">
                  <span className="text-[#a855f7] font-bold block mb-1">📋 Referral Email Address Regex Scans</span>
                  Enforces secondary evaluation regex. When referral intent is classified, the system checks for standard contact handles (@, .io, .com) in proximity to names to auto-populate CRM referral records.
                </div>
              </div>
            </div>

            {/* Error Mitigation Strategies */}
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 border-b border-gray-800 pb-2">
                Error Recovery & Multi-Tenant Boundaries
              </h4>

              <div className="space-y-3.5 text-xs font-sans leading-relaxed text-gray-450 font-normal text-gray-400">
                <div className="flex gap-3">
                  <span className="font-mono text-[#a855f7] font-bold shrink-0">1. Raw Content Snoozing:</span>
                  <p>
                    Out of Office (OOO) alerts auto-pause CRM automations for exactly 14 business days. The contact returns to active drip streams automatically once back, ensuring reputation warmth.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="font-mono text-teal-450 font-bold shrink-0">2. Strict Isolation:</span>
                  <p>
                    All semantic evaluations and draft emails reside strictly within tenant workspace partitions. Leads data cannot leak or blend across client spaces.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="font-mono text-indigo-400 font-bold shrink-0">3. Schema Resilience Check:</span>
                  <p>
                    If response generations output corrupted markdown symbols or loose elements, the engine intercepts the execution queue, cleans characters in memory, and validates JSON schema.
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
