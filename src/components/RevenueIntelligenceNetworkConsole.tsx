import React, { useState, useEffect } from 'react';
import { 
  Database, Shield, Users, Layers, Activity, Sliders, Lock, 
  CheckCircle, AlertTriangle, RefreshCw, BarChart3, HelpCircle, Eye, EyeOff,
  Upload, Sparkles, BookOpen, Key, Info, Globe, Cpu, Network, ArrowRight
} from 'lucide-react';

interface ParticipantType {
  id: string;
  name: string;
  role: string;
  icon: any;
  sharingScope: string;
  privacySetting: string;
  anonymizationRules: string;
  trustScore: number;
}

const PARTICIPANTS_SPEC: ParticipantType[] = [
  {
    id: 'customers',
    name: 'Platform Customers (Tenants)',
    role: 'Primary Data Owners & Consumers',
    icon: Users,
    sharingScope: 'Contributes raw pipeline metadata (CRM stages, email engagement velocity, reply logs) to train regional benchmarking LLMs.',
    privacySetting: 'Double-blind tenant isolation. Private business data is excluded from global lookups. Customer holds sovereign decryption keys.',
    anonymizationRules: 'Strips CRM account IDs. Applies k-anonymity (k=5) and differential privacy noise onto outbound volume metrics to prevent peer reverse-engineering.',
    trustScore: 99.8
  },
  {
    id: 'partners',
    name: 'Certified Channel Partners',
    role: 'Strategists, Copywriters & GTM Agencies',
    icon: Network,
    sharingScope: 'Injects highly integrated templates, copy effectiveness statistics, and outbound success plays into shared team pools.',
    privacySetting: 'Explicit OAuth delegation bounds. Partner access is ephemeral with auto-revocation triggers based on inactive duration (>14 days).',
    anonymizationRules: 'Masks specific prospect target details. Redacts client-specific corporate IP inside public feedback journals.',
    trustScore: 94.5
  },
  {
    id: 'integrations',
    name: 'Third-Party Integrations',
    role: 'APIs, CRMs, Email Providers & LLM Clusters',
    icon: Cpu,
    sharingScope: 'Bidirectional streaming of lead statuses, outbox parameters, and automated transcription metadata.',
    privacySetting: 'Workspace API-key restriction level. Webhooks are cryptographically signed with HMAC-SHA256 to block man-in-the-middle attacks.',
    anonymizationRules: 'Strips raw cookies, authorization headers, and personal identifiable logs (PII) before syncing metrics to external nodes.',
    trustScore: 97.4
  }
];

export default function RevenueIntelligenceNetworkConsole() {
  const [activeSubTab, setActiveSubTab] = useState<'datacontract' | 'privacy' | 'anonymizer' | 'benchmark' | 'matrix'>('datacontract');
  const [selectedProfileId, setSelectedProfileId] = useState<string>('customers');
  
  // Interactive Anonymizer Section States
  const [rawPayloadInput, setRawPayloadInput] = useState<string>(
    JSON.stringify({
      lead_name: "Sarah Jenkins",
      lead_email: "sjenkins@enterpriseclient.com",
      company_name: "Nexus Global Corp",
      annual_revenue: "$45,000,000",
      deal_cycle_days: 42,
      replied_intent: "Interested, book a demo for next Thursday at 2 PM PST",
      ip_address: "192.168.1.104"
    }, null, 2)
  );
  
  const [processedPayload, setProcessedPayload] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [piiStripperActive, setPiiStripperActive] = useState<boolean>(true);
  const [maskLeads, setMaskLeads] = useState<boolean>(true);
  const [maskFinancials, setMaskFinancials] = useState<boolean>(true);
  const [applyDifferentialNoise, setApplyDifferentialNoise] = useState<boolean>(true);
  const [noiseLevel, setNoiseLevel] = useState<number>(12); // % noise to add to numeric data
  
  // Benchmarking Simulator States
  const [userIndustry, setUserIndustry] = useState<string>('saas');
  const [userCampaignVolume, setUserCampaignVolume] = useState<number>(12500);
  const [userReplyRate, setUserReplyRate] = useState<number>(4.2); // %
  const [diffPrivacyEpsilon, setDiffPrivacyEpsilon] = useState<number>(0.5); // Epsilon parameter (0.1 to 2.0)
  
  // Live simulated system counters
  const [totalAnonymizedRoutines, setTotalAnonymizedRoutines] = useState<number>(428904);
  const [activeDecryptedSessions, setActiveDecryptedSessions] = useState<number>(311);
  const [lastComplianceCheckLog, setLastComplianceCheckLog] = useState<string>('Zero micro-leak signals detected across active node groups.');

  useEffect(() => {
    // Dynamic ticker increments
    const timer = setInterval(() => {
      setTotalAnonymizedRoutines(prev => prev + Math.floor(Math.random() * 4) + 1);
      setActiveDecryptedSessions(prev => prev + (Math.random() > 0.5 ? 2 : -1));
      
      const debugPhrases = [
        "Diff-Privacy: Applied Gaussian perturbation to industry benchmark index.",
        "PII Firewall: Stripped email header metadata from ingress payload #TR-998.",
        "HMAC Signature: Verified webhook payload integrity from Salesforce connector.",
        "Global Index: Recalculated percentile ranks for SaaS revenue cohort (N=1420)."
      ];
      setLastComplianceCheckLog(debugPhrases[Math.floor(Math.random() * debugPhrases.length)]);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Recalculate processed payload based on configuration
  const handleAnonymizeAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const parsed = JSON.parse(rawPayloadInput);
        let output = { ...parsed };

        if (maskLeads) {
          if (output.lead_name) output.lead_name = "ANONYMOUS_PROSPECT";
          if (output.lead_email) output.lead_email = "******@redacted-tenant.net";
          if (output.ip_address) output.ip_address = "127.0.0.1 (Masked)";
        }

        if (maskFinancials) {
          if (output.company_name) output.company_name = "COHORT_COMPANY_GENERIC_X";
          
          if (output.annual_revenue) {
            // If differential noise is checked, add slight fuzzy deviation
            if (applyDifferentialNoise) {
              const numericRev = parseFloat(output.annual_revenue.replace(/[^0-9.]/g, ''));
              if (!isNaN(numericRev)) {
                const noiseOffset = (1 + (Math.random() * noiseLevel * 2 - noiseLevel) / 100);
                const randomizedVal = Math.round(numericRev * noiseOffset);
                output.annual_revenue = `$${randomizedVal.toLocaleString()} (with Dynamic differential noise ±${noiseLevel}%)`;
              }
            } else {
              output.annual_revenue = "FINANCIAL_DATA_PROTECTED";
            }
          }
        }

        if (applyDifferentialNoise && output.deal_cycle_days) {
          const baseCycle = Number(output.deal_cycle_days);
          const noiseFactor = (1 + (Math.random() * (noiseLevel / 2) * 2 - (noiseLevel / 2)) / 100);
          output.deal_cycle_days = Math.round(baseCycle * noiseFactor) + ` days (perturbed)`;
        }

        setProcessedPayload(JSON.stringify(output, null, 2));
      } catch (err) {
        setProcessedPayload("Error parsing raw Payload JSON. Please check input syntax format.");
      }
      setIsProcessing(false);
    }, 850);
  };

  useEffect(() => {
    handleAnonymizeAction();
  }, [maskLeads, maskFinancials, applyDifferentialNoise, noiseLevel]);

  // Calculations for Benchmarking Engine
  // Industry specific baseline reply rate averages
  const getIndustryBaseline = (ind: string) => {
    switch (ind) {
      case 'saas': return 3.4;
      case 'fintech': return 2.8;
      case 'healthcare': return 1.9;
      case 'consulting': return 4.9;
      default: return 3.0;
    }
  };

  const baselineReplyRate = getIndustryBaseline(userIndustry);
  // Add noise parameter representing privacy protection degradation vs resolution accuracy
  const resolutionAccuracy = Math.round(100 - (10 / diffPrivacyEpsilon));
  // Simulated Percentile calculation with differential noise
  const calculatedPercentile = Math.min(99, Math.max(1, Math.round(
    (userReplyRate / (baselineReplyRate * 2)) * 100 + (Math.random() * 4 - 2)
  )));

  const selectedProfile = PARTICIPANTS_SPEC.find(p => p.id === selectedProfileId) || PARTICIPANTS_SPEC[0];
  const ProfileIcon = selectedProfile.icon;

  return (
    <div id="revenue-intelligence-network-console" className="space-y-8 animate-fadeIn text-slate-100">
      
      {/* Platform Strategy Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Lock className="w-4 h-4 shrink-0 font-bold" />
            Secure Revenue Cryptography Network
          </div>
          <h1 className="text-2xl font-bold font-display text-white mt-1">
            Revenue Intelligence Architecture
          </h1>
          <p className="text-xs text-gray-400 max-w-xl mt-1 leading-relaxed">
            Double-blind multi-tenant data sharing framework built for high-performance GTM benchmarking. Enables secure signal aggregation, local privacy containment, and differential anonymization filters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-slate-900/60 p-2 border border-slate-800 rounded-xl text-xs h-fit self-center">
          <div className="px-3 py-1 bg-slate-950/80 rounded-lg border border-slate-800">
            <span className="text-[10px] text-gray-500 block leading-tight font-mono">Payloads Anonymized</span>
            <span className="font-bold text-emerald-400 font-mono">{totalAnonymizedRoutines.toLocaleString()}</span>
          </div>
          <div className="px-3 py-1 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-300">
            <span className="text-[10px] text-indigo-400/70 block leading-tight font-mono">Active Decrypted Ingress</span>
            <span className="font-bold font-mono">{activeDecryptedSessions} nodes</span>
          </div>
        </div>
      </div>

      {/* Strategic Hub Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-1 hover:border-slate-700 transition duration-200">
          <span className="text-[10px] text-gray-400 font-mono block uppercase">Global Crypt-Scale</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-white font-mono">256-Bit AES</span>
            <span className="text-xs text-emerald-400 font-semibold font-mono">Sovereign Keys</span>
          </div>
          <p className="text-[10px] text-gray-500">Zero-knowledge platform architecture</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-1 hover:border-slate-700 transition duration-200">
          <span className="text-[10px] text-gray-400 font-mono block uppercase">Anonymization Latency</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-indigo-400 font-mono">&lt; 14ms</span>
            <span className="text-xs text-gray-500 font-sans">Ingress Pipeline</span>
          </div>
          <p className="text-[10px] text-gray-500">Sub-millisecond sanitization overhead</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-1 hover:border-slate-700 transition duration-200">
          <span className="text-[10px] text-gray-400 font-mono block uppercase">Privacy Resolution Limit</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-white font-mono">{resolutionAccuracy}% Accuracy</span>
            <span className="text-xs text-amber-400 font-mono">ε={diffPrivacyEpsilon}</span>
          </div>
          <div className="text-[10px] text-gray-500">Guaranteed differential protection</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-1 hover:border-slate-700 transition duration-200">
          <span className="text-[10px] text-gray-400 font-mono block uppercase">Integrity State</span>
          <div className="flex items-center gap-1.5 pt-0.5">
            <CheckCircle className="w-5 h-5 text-emerald-400 shadow-sm" />
            <span className="text-xs text-gray-200 font-semibold font-mono">SOC2 Type II Enforced</span>
          </div>
          <p className="text-[10px] text-gray-500">Automated ledger audits verified</p>
        </div>
      </div>

      {/* Main Tab Controller */}
      <div className="border-b border-slate-800 bg-slate-950/60 p-1 rounded-xl flex flex-wrap gap-1">
        {[
          { id: 'datacontract', label: '1. Data Sharing Framework', icon: Database, desc: 'Scope agreements & OAuth contracts' },
          { id: 'privacy', label: '2. Privacy Controls', icon: Shield, desc: 'Decryption keys & HMAC signatures' },
          { id: 'anonymizer', label: '3. Anonymization Strategy', icon: Sliders, desc: 'Differential noise playground' },
          { id: 'benchmark', label: '4. Benchmarking Engine', icon: BarChart3, desc: 'Dynamic cohort intelligence pool' },
          { id: 'matrix', label: '5. Governance Matrix', icon: Layers, desc: 'Immutable audit ledger telemetry' }
        ].map(tab => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex-1 min-w-[150px] p-3 rounded-lg text-left border transition-all duration-200 ${
                activeSubTab === tab.id
                  ? 'bg-slate-900 border-indigo-700 text-white shadow-lg'
                  : 'bg-transparent border-transparent text-gray-400 hover:bg-slate-900/40 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <TabIcon className={`w-4 h-4 shrink-0 ${activeSubTab === tab.id ? 'text-indigo-400' : 'text-gray-500'}`} />
                <span className="text-xs font-bold leading-none">{tab.label}</span>
              </div>
              <p className="text-[9px] text-gray-400 mt-1 block font-sans truncate">{tab.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Main Dashboard Space */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur min-h-[440px]">
        
        {/* TAB 1: DATA SHARING FRAMEWORK */}
        {activeSubTab === 'datacontract' && (
          <div className="space-y-6">
            <div className="flex justify-between items-start flex-wrap gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white font-display">Contract Participants & Sharing Schemas</h3>
                <p className="text-xs text-gray-400">
                  Select network stakeholders below to view their data ownership boundaries and sharing agreements.
                </p>
              </div>
              <div className="text-xs bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-indigo-300 font-mono">
                Participant Trust Ledger Active
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Stakeholder Selector Deck */}
              <div className="md:col-span-5 space-y-2">
                {PARTICIPANTS_SPEC.map(p => {
                  const Icon = p.icon;
                  const isCur = p.id === selectedProfileId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProfileId(p.id)}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-4 transition-all ${
                        isCur 
                          ? 'bg-indigo-950/40 border-indigo-500/50 text-white shadow-md' 
                          : 'bg-slate-950/40 border-slate-800/80 text-gray-400 hover:bg-slate-900/60 hover:text-white'
                      }`}
                    >
                      <div className={`p-2 rounded-lg border ${
                        isCur ? 'bg-indigo-500/20 text-indigo-300 border-indigo-700' : 'bg-slate-900 border-slate-800 text-gray-500'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold block leading-none font-display">{p.name}</span>
                        <span className="text-[10px] text-gray-400 block mt-1 tracking-wide font-mono truncate">{p.role}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 shrink-0" />
                    </button>
                  );
                })}
              </div>

              {/* Stakeholder Strategic Sheet */}
              <div className="md:col-span-7 bg-slate-950/40 border border-slate-800/80 p-6 rounded-2xl space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-indigo-400 font-bold">
                    <ProfileIcon className="w-3.5 h-3.5 shrink-0" />
                    Authorized Sharing Policy Card
                  </div>
                  <h4 className="text-lg font-bold text-white font-display mt-1">{selectedProfile.name}</h4>
                  <span className="text-xs text-gray-500 font-mono italic block mt-0.5">{selectedProfile.role}</span>
                </div>

                <div className="space-y-4 text-xs leading-relaxed">
                  <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <span className="font-mono text-[9px] text-gray-400 block mb-1 uppercase font-bold">1. Data Contribution Scope</span>
                    <p className="text-gray-300 font-sans">{selectedProfile.sharingScope}</p>
                  </div>

                  <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <span className="font-mono text-[9px] text-gray-400 block mb-1 uppercase font-bold">2. Security Isolation Constraints</span>
                    <p className="text-gray-300 font-sans">{selectedProfile.privacySetting}</p>
                  </div>

                  <div className="p-3.5 bg-indigo-950/20 rounded-xl border border-indigo-950/40">
                    <span className="font-mono text-[9px] text-indigo-300 block mb-1 uppercase font-bold text-indigo-400">3. Active Anonymization Schema</span>
                    <p className="text-gray-200 font-sans">{selectedProfile.anonymizationRules}</p>
                  </div>
                </div>

                <div className="bg-slate-900/40 p-3 rounded-lg text-[11px] text-gray-400 border border-slate-800 space-y-1.5 leading-relaxed font-sans">
                  <span className="font-mono text-[9px] uppercase font-bold block text-gray-400">Zero-Trust Direct Integration Principle:</span>
                  <p>
                    All API integration requests compile securely within ephemeral Docker sandboxes. The core database enforces cell-level decryption keys preventing cross-tenant access during microservice lookups.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRIVACY CONTROLS */}
        {activeSubTab === 'privacy' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white font-display">Technical Privacy Architecture</h3>
              <p className="text-xs text-gray-400">
                Securing data ingestion layers through client-key authorization structures, TLS-wrapped payloads, and HMAC signatures.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Architecture Model Block */}
              <div className="lg:col-span-7 bg-slate-950/50 border border-slate-800 p-6 rounded-2xl space-y-4">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block font-bold">
                  Immutable Cryptography Ingress Map
                </span>
                
                <div className="relative border border-slate-800 bg-slate-900/40 rounded-xl p-4 min-h-[280px] flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

                  {/* Flow Steps */}
                  <div className="flex justify-between relative z-10">
                    <div className="bg-slate-900 border border-indigo-500/30 p-2.5 rounded-lg text-center font-mono w-[30%]">
                      <span className="text-[8px] text-indigo-400 block font-bold uppercase">1. Ingress Source</span>
                      <span className="text-[10px] font-semibold text-white">Raw Lead Hook</span>
                    </div>
                    <div className="flex items-center justify-center font-mono text-[9px] text-gray-500 flex-1">
                      <span className="border-t border-dashed border-slate-750 w-full text-center relative py-1">
                        TLS Ingress ➔
                      </span>
                    </div>
                    <div className="bg-slate-900 border border-emerald-500/30 p-2.5 rounded-lg text-center font-mono w-[30%]">
                      <span className="text-[8px] text-emerald-400 block font-bold uppercase">2. Crypt Pipeline</span>
                      <span className="text-[10px] font-semibold text-white">AES Envelope</span>
                    </div>
                  </div>

                  {/* Vert connectors */}
                  <div className="flex justify-around items-center h-12 relative z-10 text-gray-600">
                    <div>↓</div>
                    <div>↓</div>
                  </div>

                  {/* Shield Block */}
                  <div className="flex justify-center items-center relative z-10">
                    <div className="p-4 bg-slate-950/90 border border-indigo-500/35 rounded-xl max-w-[70%] text-center space-y-1.5 shadow-lg">
                      <div className="flex items-center justify-center gap-1.5 text-xs text-indigo-300 font-mono font-bold uppercase">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        Decryption Access Layer (Keyless)
                      </div>
                      <p className="text-[10px] text-gray-400 leading-normal font-sans">
                        Sovereign tenant encryption keys. Neither EffectiveBuzz operators nor hardware cloud nodes holds persistent private parameters.
                      </p>
                    </div>
                  </div>

                  {/* Vert connectors */}
                  <div className="flex justify-around items-center h-12 relative z-10 text-gray-600">
                    <div>↓</div>
                    <div>↓</div>
                  </div>

                  {/* Vault Storage Row */}
                  <div className="flex justify-between relative z-10">
                    <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-center font-mono w-[30%]">
                      <span className="text-[8px] text-gray-400 block uppercase font-bold">Database Store</span>
                      <span className="text-[10px] font-semibold text-white">Anonymized DB</span>
                    </div>
                    <div className="flex items-center justify-center font-mono text-[9px] text-gray-500 flex-1">
                      <span className="border-t border-dashed border-slate-750 w-full text-center relative py-1">
                        Diff Policy ➔
                      </span>
                    </div>
                    <div className="bg-slate-900 border border-indigo-500/30 p-2 rounded-lg text-center font-mono w-[30%]">
                      <span className="text-[8px] text-[#818cf8] block font-bold uppercase">Benchmark Hub</span>
                      <span className="text-[10px] font-semibold text-white">Public Cohorts</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Specifications Strategy */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider text-indigo-300">Technical Privacy Boundaries</h4>
                  <p className="text-xs text-gray-400 mt-1">Our platform implements three hard cryptographic boundaries:</p>
                </div>

                <div className="space-y-4 text-xs font-sans text-gray-300 leading-relaxed">
                  <div className="border-l-2 border-indigo-500/50 pl-3.5 space-y-1">
                    <span className="font-semibold text-white block">A. Envelope Encryption (KMS Protected)</span>
                    <p className="text-gray-400 font-normal leading-normal">
                      Data payloads are encrypted using dynamic data encryption keys (DEKs), nested within a central key encryption key (KEK) owned strictly by each customer tenant boundary.
                    </p>
                  </div>

                  <div className="border-l-2 border-indigo-500/50 pl-3.5 space-y-1">
                    <span className="font-semibold text-white block">B. HMAC-SHA256 Hook Authentication</span>
                    <p className="text-gray-400 font-normal leading-normal">
                      All integration platforms (Salesforce, HubSpot, Zapier) authenticate packets using timestamped signatures, neutralizing capture replay network exploits.
                    </p>
                  </div>

                  <div className="border-l-2 border-indigo-500/50 pl-3.5 space-y-1">
                    <span className="font-semibold text-white block">C. Transient VPC Peering Scopes</span>
                    <p className="text-gray-400 font-normal leading-normal">
                      Computation executes strictly in transient networks with isolated peering parameters. Execution containers shut down immediately when calculations conclude.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ANONYMIZATION STRATEGY */}
        {activeSubTab === 'anonymizer' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white font-display">Ingress Anonymization & Differential Noise Simulator</h3>
              <p className="text-xs text-gray-400">
                Securely purge personally identifiable details (PII) like names, emails, and exact corporate revenue, injecting differential Gaussian noise onto parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Sandbox Playground Columns */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-indigo-400 uppercase font-bold block">
                    Interactive Ingress Payload Playground
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400">PII Stripper Firewall</span>
                    <button 
                      onClick={() => setPiiStripperActive(!isProcessing)}
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        piiStripperActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {piiStripperActive ? "ACTIVE" : "DISABLED"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Column: Input Payload */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-slate-950 px-3.5 py-1.5 border-t border-x border-slate-800 rounded-t-xl text-[10px] text-gray-400 font-mono">
                      <span>API INGRESS HOOK (RAW PAYLOAD)</span>
                    </div>
                    <textarea
                      value={rawPayloadInput}
                      onChange={(e) => setRawPayloadInput(e.target.value)}
                      className="w-full h-64 bg-slate-950 font-mono text-[11px] text-gray-300 p-3 rounded-b-xl border-b border-x border-slate-850 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition"
                      placeholder="Insert standard lead payload JSON structure..."
                    />
                  </div>

                  {/* Right Column: Processed Outbound Target */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-slate-950 px-3.5 py-1.5 border-t border-x border-slate-800 rounded-t-xl text-[10px] text-gray-400 font-mono">
                      <span>ANONYMIZED PIPELINE DISPATCHED (TARGET)</span>
                      {isProcessing && <RefreshCw className="w-3 h-3 text-indigo-400 animate-spin" />}
                    </div>
                    <pre className="w-full h-64 bg-slate-950 font-mono text-[11.2px] text-emerald-400 p-3 rounded-b-xl border-b border-x border-slate-850 overflow-auto whitespace-pre-wrap select-all leading-snug">
                      {processedPayload}
                    </pre>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 bg-slate-950/40 p-4 border border-slate-850 rounded-xl">
                  {/* Config Sliders & Switches */}
                  <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer user-select-none">
                    <input 
                      type="checkbox" 
                      checked={maskLeads} 
                      onChange={(e) => setMaskLeads(e.target.checked)}
                      className="accent-indigo-500 rounded border-slate-800 bg-slate-900"
                    />
                    <span>Mask Lead Identities</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer user-select-none">
                    <input 
                      type="checkbox" 
                      checked={maskFinancials} 
                      onChange={(e) => setMaskFinancials(e.target.checked)}
                      className="accent-indigo-500 rounded border-slate-800 bg-slate-900"
                    />
                    <span>Silo Corporate Financials</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer user-select-none">
                    <input 
                      type="checkbox" 
                      checked={applyDifferentialNoise} 
                      onChange={(e) => setApplyDifferentialNoise(e.target.checked)}
                      className="accent-indigo-500 rounded border-slate-800 bg-slate-900"
                    />
                    <span>Apply Differential Noise</span>
                  </label>
                </div>
              </div>

              {/* Slider Settings Side-Panel */}
              <div className="lg:col-span-5 bg-slate-950/60 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">
                    Noise Matrix parameters
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">Perturbation Calibration</h4>
                </div>

                <div className="space-y-4 my-6">
                  {/* Slider Noise Level */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">Differential Noise Scale (Sigma)</span>
                      <span className="text-indigo-400 font-bold">± {noiseLevel}%</span>
                    </div>
                    <input 
                      type="range"
                      min="5"
                      max="35"
                      value={noiseLevel}
                      onChange={(e) => setNoiseLevel(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 cursor-pointer"
                    />
                    <p className="text-[10px] text-gray-500 leading-normal">
                      Controls the degree of random offset added to deal cycle metrics and revenues to block reverse-attribute queries.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-gray-300 space-y-1 font-sans">
                    <strong>Anonymization Objective:</strong>
                    <p className="text-gray-400 leading-normal text-[11px] mt-0.5">
                      Ensures that even if an adversary obtains global cohort benchmarking aggregates, they cannot cross-reference or decode specific firm indicators back to any individual company pipeline.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-850 pt-4 text-[10px] font-mono text-gray-400 space-y-1">
                  <span>SYSTEM TELEMETRY WATCH LOG:</span>
                  <p className="text-indigo-300 italic">" {lastComplianceCheckLog} "</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BENCHMARKING ENGINE */}
        {activeSubTab === 'benchmark' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white font-display">Privacy-Safe Cohort Benchmarking Engine</h3>
              <p className="text-xs text-gray-400">
                Execute automated competitor cohort queries across regional pools. Uses differential privacy models to resolve high-resolution benchmarks without revealing individual company logs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Dynamic input configurator */}
              <div className="lg:col-span-6 bg-slate-950/40 border border-slate-800 p-6 rounded-2xl space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block pb-0.5">Benchmarking Simulator Panel</span>
                  <h4 className="text-sm text-gray-300">Set organization outbound variables:</h4>
                </div>

                <div className="space-y-4">
                  {/* Select Industry */}
                  <div className="space-y-1.5">
                    <span className="text-xs text-gray-400 font-mono uppercase block">Compare Industry Segment Cohort</span>
                    <select 
                      value={userIndustry} 
                      onChange={(e) => setUserIndustry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-gray-200 focus:outline-none focus:border-indigo-600 font-sans"
                    >
                      <option value="saas">SaaS & Enterprise Automation Platforms</option>
                      <option value="fintech">FinTech / Crypto Financial Services</option>
                      <option value="healthcare">Digital Health & Biotech Engineering</option>
                      <option value="consulting">Professional GTM Advisory / Agencies</option>
                    </select>
                  </div>

                  {/* Range Campaign Volume */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">Sent Outbox Volume (Quarterly)</span>
                      <span className="text-white font-bold">{userCampaignVolume.toLocaleString()} outbox calls</span>
                    </div>
                    <input 
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      value={userCampaignVolume}
                      onChange={(e) => setUserCampaignVolume(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800"
                    />
                  </div>

                  {/* Range Reply Rate */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">Positive Reply Interest Rate</span>
                      <span className="text-white font-bold">{userReplyRate}%</span>
                    </div>
                    <input 
                      type="range"
                      min="0.5"
                      max="12.0"
                      step="0.1"
                      value={userReplyRate}
                      onChange={(e) => setUserReplyRate(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800"
                    />
                  </div>

                  {/* Epsilon parameter representing local privacy */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">Differential Privacy Loss (Epsilon - ε)</span>
                      <span className="text-indigo-400 font-bold">ε = {diffPrivacyEpsilon}</span>
                    </div>
                    <input 
                      type="range"
                      min="0.1"
                      max="2.0"
                      step="0.1"
                      value={diffPrivacyEpsilon}
                      onChange={(e) => setDiffPrivacyEpsilon(Number(e.target.value))}
                      className="w-full accent-[#818cf8] bg-slate-800"
                    />
                    <div className="flex justify-between text-[9px] text-gray-500 font-mono mt-1">
                      <span>ε=0.1 (Strict Isolation - Higher Noise)</span>
                      <span>ε=2.0 (High Resolution - Lower Noise)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistical output card */}
              <div className="lg:col-span-6 bg-slate-950/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 font-bold uppercase pb-0.5">
                    <BarChart3 className="w-4 h-4 shrink-0" />
                    AUTONOMOUS COHORT ANALYSES ENGINE
                  </div>
                  <h4 className="text-lg font-bold text-white font-display">Calculated Performance Bracket</h4>
                </div>

                <div className="my-6 text-center space-y-4">
                  <div className="inline-block relative">
                    <div className="w-24 h-24 rounded-full border-4 border-slate-800 bg-slate-900 flex flex-col items-center justify-center shadow-inner mx-auto">
                      <span className="text-2xl font-bold font-mono text-white leading-none">Top {100 - calculatedPercentile}%</span>
                      <span className="text-[9px] text-gray-500 font-mono mt-1">RANK BRACKET</span>
                    </div>
                    
                    <div className={`absolute top-0 left-0 w-24 h-24 rounded-full border-4 ${
                      calculatedPercentile >= 75 ? 'border-emerald-500/60 scale-105' : 'border-indigo-500/50 scale-105'
                    } transition-all pointer-events-none`}></div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-gray-400 block font-mono">Performance Verdict vs Cohort Pool:</span>
                    <p className="text-gray-200">
                      Your response index rates <strong className="text-emerald-400 font-mono">+{((userReplyRate - baselineReplyRate) / baselineReplyRate * 100).toFixed(1)}% higher</strong> than the SaaS industry average filter (<span className="font-mono text-gray-400">{baselineReplyRate}%</span>).
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-gray-300">
                  <span className="font-mono text-[9px] uppercase font-bold text-indigo-400 block mb-1">Benchmarking Safety Clause:</span>
                  <p className="text-gray-400 leading-normal text-[11px]">
                    To maintain absolute blind-matching security, industry baseline aggregates are recalculating dynamically over sliding epochs. Data segments with fewer than 10 separate company nodes are automatically withheld to prevent de-anonymization attacks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GOVERNANCE MATRIX */}
        {activeSubTab === 'matrix' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white font-display">Data Platform Governance Ledger & Policy Hardening</h3>
              <p className="text-xs text-gray-400">
                Continuous compliance parameters ensuring immutable security safeguards across distributed network nodes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Compliance matrices lists */}
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-wider block font-bold">
                  Immutable Security Controls Spec
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'SOC2 Compliant Event Logging',
                      desc: 'Chronicles each data access request, configuration modification, and payload sanitization step in an append-only, tamper-proof tracking ledger.'
                    },
                    {
                      title: 'Decentralized Ephemeral Workers',
                      desc: 'Forces calculation models to run in temporary containers with zero filesystem write access to avoid side-channel storage leakage.'
                    },
                    {
                      title: 'Cell-Level Crypt Enforcing',
                      desc: 'Encrypts private client records using dynamic keys stored in hardware security modules (HSM) with 120-second cache invalidation timers.'
                    },
                    {
                      title: 'Differential Noise Multipliers',
                      desc: 'Guarantees cohort results maintain mathematical differential privacy (e.g., ε-differential criteria), blocking reverse database profiling.'
                    }
                  ].map((ctrl, i) => (
                    <div key={i} className="p-4 bg-slate-950/65 border border-slate-850 rounded-xl space-y-1.5 hover:border-slate-800 transition duration-150">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        {ctrl.title}
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{ctrl.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanatory sidebar details */}
              <div className="lg:col-span-5 bg-slate-950/40 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">
                      Governance Verification Node
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">Sovereignty Assurance Statement</h4>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    By combining Envelope Encryption, differential perturbation controls, and SOC2-compliant event trails, our Secure Revenue Cryptography Network guarantees that customers maintain complete sovereignty over their outbound parameters.
                  </p>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-850 text-[11px] text-gray-400 space-y-1 font-sans">
                    <strong>Zero Leakage Policy:</strong>
                    <p className="text-gray-400 leading-normal text-[11px] mt-0.5">
                      The network guarantees 100% database-scoped isolation boundaries. No customer datasets can traverse tenant namespaces without explicit OAuth handshakes.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono rounded-lg">
                  🛡️ SOC-2 Compliance Core Online & Certified
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
