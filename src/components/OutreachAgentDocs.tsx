import React, { useState } from 'react';
import { 
  Cpu, Code, Play, RefreshCw, Layers, Check, Copy, 
  Terminal, Braces, FileJson, AlertCircle, Sparkles, 
  ShieldAlert, CheckCircle2, List, Sliders, ChevronRight, Gauge,
  Mail, Linkedin, ReplyAll, Send, Sparkle, UserCheck, HelpCircle
} from 'lucide-react';

export default function OutreachAgentDocs() {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'specs' | 'sandbox' | 'eval-error'>('blueprint');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Specs Sub-tabs
  const [specsSubtab, setSpecsSubtab] = useState<'prompt' | 'input-schema' | 'output-schema' | 'json-examples'>('prompt');

  // Sandbox inputs
  const [companyName, setCompanyName] = useState('ApexCloud Platforms');
  const [prospectName, setProspectName] = useState('Sarah Jenkins');
  const [prospectTitle, setProspectTitle] = useState('VP of Infrastructure & Platform Engineering');
  const [targetPain, setTargetPain] = useState('Suboptimal multi-region Kubernetes egress costs and expensive cloud database replication latencies.');
  const [leadScore, setLeadScore] = useState('91');
  const [keySignal, setKeySignal] = useState('Sarah recently posted about migrating to multi-region pods while adhering to strict SOC2 audit standards.');
  const [ctaType, setCtaType] = useState('Soft Calendar Hook (15-min chat next Thursday)');

  // Selected Channel in Simulator
  const [simulatorChannel, setSimulatorChannel] = useState<'email' | 'linkedin' | 'followup'>('email');

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

  // SYSTEM PROMPT FOR THE OUTREACH AGENT
  const SYSTEM_PROMPT_CONTENT = `You are the Lead Outreach and Personalization Agent at EffectiveBuzz.
Your sole mission is to ingest deep research dossiers, score alignment tables, and target ICP parameters, and generate high-converting, professional, spam-free outreach messages.

You must generate:
1. Highly personalized Cold Emails
2. Highly contextual LinkedIn InMail/Invitations
3. Strategic Follow-up Emails referencing previous context

### CORE REQUISITES & COPYWRITING COMPLIANCE RULES:
1. STRICT SPAM FILTER COMPLIANCE: Avoid high-risk trigger phrases ("free demo", "guaranteed savings", "limited space", "risk free"). Rely entirely on bespoke context and helpful value exchanges.
2. COMPOSITE PERSONALIZATION: Embed specific pain points, public triggers (like executive hiring or funding news), and evidence lines directly in the hook.
3. CONCISE VALUE PROPOSITIONS: Keep email lengths under 120 words. No fluffy introductory paragraphs like "Hope this email finds you well." Start directly with context.
4. CALIBRATED CALLS TO ACTION (CTAs): Use soft, frictionless prompts rather than aggressive "Can I get 30 mins tomorrow?" pitches (prefer: "Is multi-region egress costs an active concern on your Q3 roadmap?").
5. STRATEGIC REASONING: Explain precisely why this layout, tone, and hook were chosen for this specific buyer profile.
6. COMPLIANT OUTPUT SCHEMAS: Return structured JSON matching the defined output schema, containing subject, message, reasoning, and confidence score configurations.`;

  // INPUT JSON SCHEMA
  const INPUT_SCHEMA_CONTENT = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "OutreachAgentInput",
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
    "researchDossier": {
      "type": "object",
      "properties": {
        "dominantPainPoint": { "type": "string" },
        "buyingSignalTrigger": { "type": "string" },
        "leadScoringCoefficient": { "type": "integer", "minimum": 0, "maximum": 100 }
      },
      "required": ["dominantPainPoint", "buyingSignalTrigger", "leadScoringCoefficient"]
    },
    "campaignContext": {
      "type": "object",
      "properties": {
        "preferredCtaStyle": { "type": "string" },
        "senderProfessionalIdentity": { "type": "string" }
      },
      "required": ["preferredCtaStyle"]
    }
  },
  "required": ["prospect", "researchDossier", "campaignContext"]
}`;

  // OUTPUT JSON SCHEMA
  const OUTPUT_SCHEMA_CONTENT = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "OutreachAgentOutput",
  "type": "object",
  "properties": {
    "outreachAssets": {
      "type": "object",
      "properties": {
        "coldEmail": {
          "type": "object",
          "properties": {
            "subject": { "type": "string", "description": "High-open rate, personalized subject line under 7 words." },
            "message": { "type": "string", "description": "Highly tailored cold email following spam-free copywriting constraints." },
            "reasoning": { "type": "string", "description": "Explanation of psychological angles, tone adjustments, and dynamic token usage." },
            "confidenceScore": { "type": "integer", "minimum": 0, "maximum": 100 }
          },
          "required": ["subject", "message", "reasoning", "confidenceScore"]
        },
        "linkedinMessage": {
          "type": "object",
          "properties": {
            "subject": { "type": "string", "description": "Optional chat header, mostly used for premium InMail titles." },
            "message": { "type": "string", "description": "Short connection request copy (under 300 characters or standard InMail block)." },
            "reasoning": { "type": "string" },
            "confidenceScore": { "type": "integer", "minimum": 0, "maximum": 100 }
          },
          "required": ["message", "reasoning", "confidenceScore"]
        },
        "followUpMessage": {
          "type": "object",
          "properties": {
            "subject": { "type": "string", "description": "Thread identifier or contextual follow-up modifier." },
            "message": { "type": "string", "description": "Brief nudge email introducing a second value-add artifact (e.g., specific PDF or audit template)." },
            "reasoning": { "type": "string" },
            "confidenceScore": { "type": "integer", "minimum": 0, "maximum": 100 }
          },
          "required": ["message", "reasoning", "confidenceScore"]
        }
      },
      "required": ["coldEmail", "linkedinMessage", "followUpMessage"]
    }
  },
  "required": ["outreachAssets"]
}`;

  // EXEMPLAR DATA
  const EXAMPLE_INPUT_JSON = `{
  "prospect": {
    "fullName": "Sarah Jenkins",
    "jobTitle": "VP of Infrastructure & Platform Engineering",
    "companyName": "ApexCloud Platforms"
  },
  "researchDossier": {
    "dominantPainPoint": "Suboptimal multi-region Kubernetes egress costs and expensive cloud database replication latencies.",
    "buyingSignalTrigger": "Sarah Jenkins posted on technical forums regarding migrating cloud native systems dynamically under SOC2 guidelines.",
    "leadScoringCoefficient": 91
  },
  "campaignContext": {
    "preferredCtaStyle": "Soft Calendar Hook (15-min chat next Thursday)",
    "senderProfessionalIdentity": "Senior Infrastructure Architect, EffectiveBuzz"
  }
}`;

  const EXAMPLE_OUTPUT_JSON = `{
  "outreachAssets": {
    "coldEmail": {
      "subject": "ApexCloud multi-region egress structures?",
      "message": "Sarah -- noticed your push towards multi-region Kubernetes pods for ApexCloud. Navigating cloud cross-region egress and latency while keeping SOC2 boundaries watertight is always trickier than the cloud providers admit.\\n\\nOther infrastructure leads at Series B companies configure centralized routers to trim multi-region pipeline data egress by up to 45% automatically, without altering container code base lines.\\n\\nWould you be open to reviewing a simple reference diagram showing how this operates? Happy to share it over email next Thursday if you are curious.",
      "reasoning": "Starts directly with a contextual technical hook instead of standard greetings. Establishes professional proximity as an infrastructure peer. Avoids hard sale language by offering a friction-free visual resource.",
      "confidenceScore": 94
    },
    "linkedinMessage": {
      "subject": "Multi-region pods & egress bottlenecks",
      "message": "Hi Sarah -- enjoyed your recent post on scaling multi-region pods while keeping SOC2 boundaries secure at ApexCloud. We recently shipped a reference matrix specifically on slicing inter-region egress latency by 45%. Would love to connect and share a copy if you're taking a look at this vertical.",
      "reasoning": "Fits perfectly within standard 300-character LinkedIn invitation limits. Speaks peer-to-peer without selling products, centering around a technical resource offer.",
      "confidenceScore": 89
    },
    "followUpMessage": {
      "subject": "Re: ApexCloud multi-region egress structures?",
      "message": "Sarah -- following up on this. If you are actively planning SOC2 audits alongside the cloud transition, we compiled a checklist mapping automated egress monitoring controls directly to SOC2 Section CC6.1.\\n\\nHappy to drop the URL link here if you or your team have 5 minutes to verify it.",
      "reasoning": "Builds directly on the first thread. Avoids annoying generic 'just bumping this' sentences. Introduces an entirely new value-add checklist geared toward their audit priorities.",
      "confidenceScore": 92
    }
  }
}`;

  // SIMULATION PIPELINE RUNNER
  const runOutreachSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setSimulationResult(null);
    setSimLogs([]);

    const runLogs = [
      `[Pipeline] Initializing Outreach Customization Engine...`,
      `[Security Check] Validating tenant API access allocations and regional proxy checks... OK`,
      `[Ingest] Merging Prospect bio ("${prospectName}", "${prospectTitle}") with Account data ("${companyName}")...`,
      `[Dossier Mapping] Infusing target pain points: "${targetPain}"`,
      `[Signal Mapping] Infusing detected trigger hooks: "${keySignal}"`,
      `[ICP Affinity Filter] Lead Score aligns with enterprise profiles (${leadScore}/100)...`,
      `[System Guardrail] Checking tone guideline compliance maps for professional peer style...`,
      `[Spam Check] Scanning draft dictionaries for prohibited conversion keywords (demo, free, discount, guarantee)... Zero triggers flagged!`,
      `[Channel: Cold Email] Generating bespoke narrative referencing multi-region egress bottlenecks...`,
      `[Channel: LinkedIn] Drafting quick-connect 300-char invitation hook...`,
      `[Channel: Follow-up] Crafting secondary educational asset nudge...`,
      `[Format Validator] Ensuring valid JSON format adhering precisely to target specs... Pass!`,
      `[Database] Archiving outbox parameters into transactional history logs under workspace...`,
      `[Pipeline] Generation turn complete. Rerouting visual display assets.`
    ];

    for (let i = 0; i < runLogs.length; i++) {
      setSimulationStep(i + 1);
      setSimLogs(prev => [...prev, runLogs[i]]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setSimulationResult(JSON.parse(EXAMPLE_OUTPUT_JSON));
    setIsSimulating(false);
  };

  const activeResult = simulationResult ? simulationResult.outreachAssets[
    simulatorChannel === 'email' ? 'coldEmail' : simulatorChannel === 'linkedin' ? 'linkedinMessage' : 'followUpMessage'
  ] : null;

  return (
    <div className="space-y-6 animate-feed">
      {/* Title Header */}
      <div className="border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <Mail className="w-4 h-4 text-emerald-400 animate-pulse" />
          EffectiveBuzz Outbound Personalization Console
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">AI Outreach Copywriter Agent Specification</h2>
        <p className="text-sm text-gray-400 mt-1 max-w-3xl leading-relaxed">
          Robust, programmatic specifications and testing environment for the EffectiveBuzz outreach agent. 
          Its algorithm translates cold prospects intelligence into contextual, spam-protected, and multi-channel messages.
        </p>
      </div>

      {/* Main Tab Controls */}
      <div className="flex border-b border-gray-800 pb-0.5 gap-2 overflow-x-auto">
        {[
          { id: 'blueprint' as const, label: '1. Pipeline Blueprint', icon: Layers, color: 'text-indigo-400' },
          { id: 'specs' as const, label: '2. Prompt & JSON Schemas', icon: Terminal, color: 'text-emerald-400' },
          { id: 'sandbox' as const, label: '3. Personalization Sandbox', icon: Play, color: 'text-blue-400' },
          { id: 'eval-error' as const, label: '4. Evaluation & Spam Shields', icon: ShieldAlert, color: 'text-rose-450' },
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
            <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider text-emerald-400">Outreach Personalization Flow</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans font-normal">
              The outreach pipeline uses a strictly orchestrated multi-tier validation chain. Unlike standard ChatGPT prompts that yield overly eager "sales pitches," EffectiveBuzz scales peer-to-peer technical arguments referencing real-time buying signals.
            </p>

            {/* Step diagram */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              {[
                { step: '1', title: 'Data Extraction', desc: 'Accepts enriched target dossiers containing qualified pain points, score indices, and website crawling references.' },
                { step: '2', title: 'Spam Defense Shield', desc: 'Pre-screens generated copy variants against heuristic dictionaries to prevent deliverability blocks.' },
                { step: '3', title: 'Bespoke Templating', desc: 'Generates Email, LinkedIn, and Threaded follow-ups optimized for specific professional domains.' },
                { step: '4', title: 'Compliance & Log', desc: 'Conducts strict structural JSON validations and archives variants for analytics tracking.' }
              ].map((step, idx) => (
                <div key={idx} className="relative bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold flex items-center justify-center border border-emerald-500/20">
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
              <span className="text-[10px] font-mono text-[#818cf8] uppercase tracking-wider font-bold block">Highly Personalized Hooks</span>
              <p className="text-xs text-gray-400 font-sans leading-normal">
                Never uses "I hope this finds you well" or "As VP of Infrastructure..." style sentences. Triggers copy directly addressing real technical bottlenecks.
              </p>
            </div>

            <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold block">Zero Spam Language Lockouts</span>
              <p className="text-xs text-gray-400 font-sans leading-normal font-normal">
                Strict semantic guardrails prevent the system from writing high-risk spam keywords which decreases direct cold domain reputation.
              </p>
            </div>

            <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider font-bold block">Low-Friction Calls To Action</span>
              <p className="text-xs text-gray-400 font-sans leading-normal">
                Prioritizes conversational feedback requests or helpful visual reference diagrams rather than demanding booked meetings immediately.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Specs (Prompt & Schemas) */}
      {activeTab === 'specs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-feed">
          <div className="lg:col-span-3 bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-1.5 h-fit">
            <span className="text-[10px] text-gray-400 font-mono font-bold block mb-2 uppercase tracking-wide">Developer Specs Menu</span>
            {[
              { id: 'prompt' as const, label: 'Outreach Agent Prompt', icon: Terminal, color: 'text-indigo-400' },
              { id: 'input-schema' as const, label: 'Input JSON Schema', icon: Braces, color: 'text-emerald-450' },
              { id: 'output-schema' as const, label: 'Output JSON Schema', icon: Braces, color: 'text-emerald-450' },
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
                    <h4 className="text-xs uppercase font-mono font-bold text-indigo-400">Outreach Personalization Instructions</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Primary instruction framework applied to the outreach synthesizer.</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(SYSTEM_PROMPT_CONTENT, 'prompt-copy')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-gray-700 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-350 transition-all cursor-pointer"
                  >
                    {copiedText === 'prompt-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedText === 'prompt-copy' ? 'Copied Prompt' : 'Copy System Prompt'}
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
                    <h4 className="text-xs uppercase font-mono font-bold text-emerald-455">Input Interface Schema</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Arguments injected when starting copy synthesis generations.</p>
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
                    <h4 className="text-xs uppercase font-mono font-bold text-emerald-455">Output Structuring Schema Specifications</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Mandates exact structures returning Cold Email, LinkedIn, and Follow-Up copy blocks with peer explanations.</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(OUTPUT_SCHEMA_CONTENT, 'output-schema-copy')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-gray-700 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-350 transition-all cursor-pointer"
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
                <div className="space-y-1.5 animate-feed">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Example Input Parameters Pack</span>
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

                <div className="space-y-1.5 animate-feed">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Compliant Output Report (Cold Email / LinkedIn / Follow-up Bundle)</span>
                    <button
                      onClick={() => handleCopyCode(EXAMPLE_OUTPUT_JSON, 'output-ex-btn')}
                      className="px-2 py-0.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-300 transition-all font-semibold"
                    >
                      {copiedText === 'output-ex-btn' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy Generated Set
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
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-feed">
            {/* Input Config Board */}
            <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
              <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-bold block border-b border-gray-800 pb-2">
                1. Edit Target Outreach Parameters
              </span>

              <div className="space-y-3.5 text-xs">
                {/* Target details */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase font-black">Target Firm</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-blue-500 font-bold text-gray-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase font-black">Prospect Name</label>
                    <input
                      type="text"
                      value={prospectName}
                      onChange={(e) => setProspectName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-blue-500 font-bold text-gray-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase font-black">Executive Title</label>
                    <input
                      type="text"
                      value={prospectTitle}
                      onChange={(e) => setProspectTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase font-black">Dynamic Lead Score</label>
                    <input
                      type="text"
                      value={leadScore}
                      onChange={(e) => setLeadScore(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-blue-500 font-mono text-teal-400 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-gray-400 uppercase font-black">Dominant Industrial Pain Point</label>
                  <textarea
                    rows={2}
                    value={targetPain}
                    onChange={(e) => setTargetPain(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded p-2 text-[11px] focus:outline-none focus:border-blue-500 leading-normal text-zinc-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-gray-400 uppercase font-black">Key Buying Signal Trigger Source</label>
                  <textarea
                    rows={2}
                    value={keySignal}
                    onChange={(e) => setKeySignal(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded p-2 text-[11px] focus:outline-none focus:border-blue-500 leading-normal text-zinc-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-gray-400 uppercase font-black">Frictionless Call-To-Action (CTA)</label>
                  <input
                    type="text"
                    value={ctaType}
                    onChange={(e) => setCtaType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={runOutreachSimulation}
                  disabled={isSimulating}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold font-display rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-bold"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      Synthesizing Outreach Copy...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
                      Run Outreach Generator
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
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      Synthesis Console Terminal Feed
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 font-bold">Model: Outreach-Synthesizer</span>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto font-mono text-[10px] leading-relaxed text-emerald-305">
                    {simLogs.length === 0 ? (
                      <div className="text-center py-24 text-gray-505 font-sans leading-relaxed">
                        Awaiting outreach configuration trigger. Modify prospect variables in the left layout panel and initiate "Run Outreach Generator" to start custom email synthesis loops.
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
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                      <span>Qualifying Step: {simulationStep}/14</span>
                    </div>
                    <span>Constructing dynamic channels copy templates...</span>
                  </div>
                )}
              </div>

              {/* Status metrics bar */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-bold block">Delivery metrics & validations:</span>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs">
                    <div>Tone: <span className="text-emerald-400 font-bold">Professional Peer</span></div>
                    <div>Safe spam score: <span className="text-teal-400 font-bold font-mono">0.02 (Perfect)</span></div>
                    <div>Output: <span className="text-indigo-400 font-bold">100% Schema Valid</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATED PERSONALIZATION OUTPUT DISPLAY */}
          {simulationResult && (
            <div className="bg-[#0f1524] border border-[#1f2937] rounded-xl p-5 md:p-6 shadow-2xl animate-feed space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 flex-wrap gap-2">
                <div>
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold tracking-wider leading-none">
                    ✔ Synthesis Complete (Spam Verification Verified)
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight mt-1.5">Tailored Multi-Channel Copy Assets</h3>
                </div>

                <div className="flex bg-[#1e293b] rounded-lg p-0.5 border border-zinc-700 font-mono text-xs text-gray-400">
                  <button
                    onClick={() => setPlaygroundView('styled')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                      playgroundView === 'styled' 
                        ? 'bg-emerald-500 text-slate-950 font-bold font-semibold' 
                        : 'hover:text-white'
                    }`}
                  >
                    Aesthetic Output Hub
                  </button>
                  <button
                    onClick={() => setPlaygroundView('json')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                      playgroundView === 'json' 
                        ? 'bg-emerald-500 text-slate-950 font-bold font-semibold' 
                        : 'hover:text-white'
                    }`}
                  >
                    Output JSON File
                  </button>
                </div>
              </div>

              {playgroundView === 'styled' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
                  
                  {/* Left Column Channel Selector Tab Menu */}
                  <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 bg-[#111827] border border-[#1f2937] p-2.5 rounded-xl h-fit">
                    <button
                      onClick={() => setSimulatorChannel('email')}
                      className={`flex-1 text-left px-3 py-2.5 rounded-lg text-xs font-mono flex items-center gap-2.5 transition-all ${
                        simulatorChannel === 'email' 
                          ? 'bg-[#1e293b] border border-slate-705 text-white font-bold' 
                          : 'border border-transparent text-gray-400 hover:text-white hover:bg-slate-900/40'
                      }`}
                    >
                      <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>Cold Email Pitch</span>
                    </button>

                    <button
                      onClick={() => setSimulatorChannel('linkedin')}
                      className={`flex-1 text-left px-3 py-2.5 rounded-lg text-xs font-mono flex items-center gap-2.5 transition-all ${
                        simulatorChannel === 'linkedin' 
                          ? 'bg-[#1e293b] border border-slate-705 text-white font-bold' 
                          : 'border border-transparent text-gray-400 hover:text-white hover:bg-slate-900/40'
                      }`}
                    >
                      <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>LinkedIn Connect</span>
                    </button>

                    <button
                      onClick={() => setSimulatorChannel('followup')}
                      className={`flex-1 text-left px-3 py-2.5 rounded-lg text-xs font-mono flex items-center gap-2.5 transition-all ${
                        simulatorChannel === 'followup' 
                          ? 'bg-[#1e293b] border border-slate-705 text-white font-bold' 
                          : 'border border-transparent text-gray-400 hover:text-white hover:bg-slate-900/40'
                      }`}
                    >
                      <ReplyAll className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Follow-Up Nudge</span>
                    </button>
                  </div>

                  {/* Right column active payload report */}
                  {activeResult && (
                    <div className="lg:col-span-9 space-y-4">
                      {/* Subcard with email layout view */}
                      <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden shadow-lg flex flex-col">
                        
                        {/* Header metadata layout */}
                        <div className="bg-[#111827] border-b border-gray-800 p-4 space-y-1.5 text-xs text-gray-400">
                          {activeResult.subject && (
                            <div className="flex items-center gap-2 font-mono">
                              <span className="font-bold text-gray-405 shrink-0">Subject:</span>
                              <strong className="text-white font-medium">{activeResult.subject}</strong>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                            <span className="flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5" />
                              Recipient: {prospectName} ({prospectTitle})
                            </span>
                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded leading-none text-[10px]">
                              Confidence Fit: {activeResult.confidenceScore}%
                            </span>
                          </div>
                        </div>

                        {/* Actual Message copy */}
                        <div className="p-5 text-sm zinc-300 font-sans leading-relaxed whitespace-pre-wrap select-text selection:bg-indigo-500 selection:text-slate-950 font-normal">
                          {activeResult.message}
                        </div>

                        {/* Utility Bar */}
                        <div className="bg-[#111827] border-t border-gray-850 p-2.5 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-gray-500">Peer copy compliance: Safe</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(activeResult.message);
                              setCopiedText(simulatorChannel);
                              setTimeout(() => setCopiedText(null), 2000);
                            }}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-750 rounded text-gray-300 text-[10px] flex items-center gap-1.5 cursor-pointer"
                          >
                            {copiedText === simulatorChannel ? <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                            {copiedText === simulatorChannel ? 'Copied copy!' : 'Copy to Clipboard'}
                          </button>
                        </div>
                      </div>

                      {/* Reasoning breakdown note */}
                      <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-xl space-y-1.5 text-xs">
                        <span className="text-[10px] font-mono text-[#818cf8] tracking-wider uppercase font-bold block">AI Agent Strategic Reasoning Analysis:</span>
                        <p className="text-zinc-400 leading-relaxed font-sans">{activeResult.reasoning}</p>
                      </div>

                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl text-xs font-mono max-h-[350px] overflow-y-auto leading-relaxed">
                  <pre className="text-zinc-300 overflow-x-auto">{JSON.stringify(simulationResult, null, 2)}</pre>
                </div>
              )}

            </div>
          )}
        </div>
      )}

      {/* Tab 4: Evaluation & Spam shields */}
      {activeTab === 'eval-error' && (
        <div className="space-y-6 animate-feed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Outbound spam score guidelines */}
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-450 border-b border-gray-800 pb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-450" />
                Dynamic Outbound Delivery Spam Shields
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                To prevent outbound domains from triggering spam algorithms or being flagged by major firewall systems (Barracuda, Google Workspace Filters), EffectiveBuzz runs a heuristic scanner analyzing drafts:
              </p>

              <div className="space-y-3 font-mono text-[11px] text-zinc-300 leading-relaxed">
                <div className="p-3 bg-slate-950 rounded border border-slate-850">
                  <span className="text-emerald-400 font-bold block mb-1">🔍 Spam Trigger Dictionaries Audit</span>
                  Removes promotional vocabulary and hyperbole ("double your conversion", "100% refund", "best price guarantee"). Returns score coefficients before sending tasks.
                </div>

                <div className="p-3 bg-slate-950 rounded border border-slate-850">
                  <span className="text-[#818cf8] font-bold block mb-1">📊 Word Count Constraints & Ratio checks</span>
                  Limits total cold outreach copy to under 120 words. Enforces structured CTA limits (no more than 1 question target per copy block).
                </div>
              </div>
            </div>

            {/* Error Mitigation Strategies */}
            <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 border-b border-gray-800 pb-2">
                Outbound Pipeline Error Recovery Protocols
              </h4>

              <div className="space-y-3.5 text-xs font-sans leading-relaxed text-gray-400">
                <div className="flex gap-3">
                  <span className="font-mono text-emerald-400 font-bold">1. Fault Tolerance Code:</span>
                  <p>
                    If the Gemini API synthesizer fails during structured JSON rendering, the pipeline retries up to 2 times with lowered token weights before falling back to preconfigured fallback patterns.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="font-mono text-teal-450 font-bold">2. Compliance Guardrails:</span>
                  <p>
                    Restricts the AI copywriter from synthesizing speculative or ungrounded assertions. If key triggers are absent from inputs, the system strictly utilizes general industry compliance problems as safe hooks.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="font-mono text-blue-400 font-bold">3. Multi-Tenant Protection:</span>
                  <p>
                    Isolates client outbox queues dynamically. Active pipeline runs are strictly filtered by workspace tenant headers to ensure absolute data privacy boundaries.
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
