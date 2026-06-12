import React, { useState, useEffect } from 'react';
import { 
  Building2, ShieldCheck, DollarSign, Briefcase, Users, FileText, 
  Layers, Settings, Search, Check, Play, RefreshCw, BarChart2, 
  HelpCircle, Sparkles, TrendingUp, Compass, Award, ArrowUpRight, AlertTriangle
} from 'lucide-react';

interface VerticalProduct {
  id: string;
  name: string;
  tagline: string;
  icon: any;
  difficulty: 'Low' | 'Medium' | 'High';
  readinessIndex: number;
  icp: {
    firmographics: string;
    buyingCenters: string[];
    criticalPainPoints: string[];
    leadValuePropositions: string[];
    contractValue: string;
  };
  requirements: {
    coreCapabilities: string[];
    integrations: string[];
    regulatoryCompliance: string[];
    slaExpectations: string;
  };
  pricing: {
    tierBasic: { name: string; cost: string; limit: string };
    tierGrowth: { name: string; cost: string; limit: string };
    tierEnterprise: { name: string; cost: string; limit: string };
    commissionModel: string;
  };
  gtm: {
    topChannels: string[];
    launchCampaign: string;
    partnershipLeverage: string;
    salesCycleDays: number;
  };
}

const VERTICAL_PRODUCTS: VerticalProduct[] = [
  {
    id: 'saas',
    name: 'SaaS & Enterprise Automation',
    tagline: 'High-velocity outbound pipelines for hyper-scaling technology companies.',
    icon: Settings,
    difficulty: 'Low',
    readinessIndex: 94,
    icp: {
      firmographics: 'B2B SaaS companies, Series A-D funding, 50-500 employees, active GTM teams, high outbound email dependency.',
      buyingCenters: ['VP of Sales', 'Chief Revenue Officer (CRO)', 'VP of Growth', 'Sales Operations Managers'],
      criticalPainPoints: [
        'High SDR turnover causing unstable pipelines',
        'Stale lead data from legacy contact data brokers',
        'High cost of acquisition (CAC) exceeding 12-month payback horizons'
      ],
      leadValuePropositions: [
        'Continuous signal-matching based on active headcount and open job titles',
        'Fully automated individualized first-line outreach copywriting',
        'Auto-healing contact keys that refresh whenever an ICP prospect shifts companies'
      ],
      contractValue: '$18,000 - $45,000 / Year'
    },
    requirements: {
      coreCapabilities: [
        'Continuous Web Scraping & Signal Extraction Engine',
        'RAG-Injected Contextual Lead Writer',
        'Dynamic Linear Inbound Routing Dashboard'
      ],
      integrations: ['Salesforce', 'HubSpot', 'Apollo GTM', 'Slack Notification Hooks'],
      regulatoryCompliance: ['GDPR Opt-In Checkers', 'SOC-2 Type II Attestation', 'CCPA Data Deletion Pipelines'],
      slaExpectations: '99.9% API uptime, continuous lead-key decryption checks under 120ms.'
    },
    pricing: {
      tierBasic: { name: 'Starter GTM', cost: '$1,250 / mo', limit: 'Up to 5,000 active leads, 2 SDR seats' },
      tierGrowth: { name: 'Growth Team', cost: '$2,800 / mo', limit: 'Up to 15,000 active leads, 8 SDR seats' },
      tierEnterprise: { name: 'Sovereign Network', cost: 'Custom Quote', limit: 'Infinite leads, dedicated secure VPC nodes' },
      commissionModel: 'Fixed platform license and micro-variable query credits.'
    },
    gtm: {
      topChannels: [
        'LinkedIn Sales Navigator Signal Automation',
        'Founder-Led Outbound Campaigns',
        'Strategic Tech Partner Co-marketing'
      ],
      launchCampaign: 'The "CAC-Payback Reducer" interactive outbound pipeline analysis tool.',
      partnershipLeverage: 'Direct listing on secure Salesforce AppExchange and HubSpot Partner Marketplace.',
      salesCycleDays: 30
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Digital Health Tech',
    tagline: 'HIPAA-compliant, highly audited clinical outreach & provider engagement pools.',
    icon: ShieldCheck,
    difficulty: 'High',
    readinessIndex: 68,
    icp: {
      firmographics: 'Hospitals networks, Digital health tele-health platforms, biotech firms, clinical laboratories with B2B GTM divisions.',
      buyingCenters: ['Director of Provider Relations', 'VP of Clinical Operations', 'General Counsel / HIPAA Liaison officer'],
      criticalPainPoints: [
        'Extremely harsh regulatory constraints restricting raw prospect lists',
        'Difficulty reaching medical practitioners through standard web networks',
        'Leakage of patient protected health information (PHI)'
      ],
      leadValuePropositions: [
        'Secure multi-tier sandboxed environment ensuring 0% raw patient index leakage',
        'Sovereign medical practitioner database mapping valid licensing IDs (NPI)',
        'Contextual templates filtered for evidence-based outreach guidelines'
      ],
      contractValue: '$55,000 - $120,000 / Year'
    },
    requirements: {
      coreCapabilities: [
        'NPI Verification Integration Lookup',
        'Automatic Protected PHI Scrubbing Pipeline',
        'Hardware Security Module (HSM) Encryption Keys'
      ],
      integrations: ['Veeva Systems', 'Epic Systems EHR Connector', 'Direct Clinical APIs'],
      regulatoryCompliance: ['HIPAA Omnibus Compliance', 'HITRUST Certification', 'Sovereign Keys / Double-Blind Databases'],
      slaExpectations: '99.99% Node availability, SOC-3 certified compliance logging trails.'
    },
    pricing: {
      tierBasic: { name: 'Provider Engagement', cost: '$3,500 / mo', limit: '3,000 verified physicians outreach' },
      tierGrowth: { name: 'Clinical Outreach Plus', cost: '$6,800 / mo', limit: '10,000 verified physicians outreach' },
      tierEnterprise: { name: 'Hospital Sovereign', cost: 'Custom Quote', limit: 'Unlimited scale, BAA contracts signed' },
      commissionModel: 'Licensing scale with HIPAA-compliant secure container fee.'
    },
    gtm: {
      topChannels: [
        'Clinical Practice Outreach Whitepapers',
        'Medical Operations Conferences & Direct Mailers',
        'Key Opinion Leader (KOL) webinars'
      ],
      launchCampaign: 'The "Evidence-Based GTM Playbook" targeting Provider Relations managers.',
      partnershipLeverage: 'Co-marketing with premium healthcare EHR systems and compliance consultancies.',
      salesCycleDays: 90
    }
  },
  {
    id: 'fintech',
    name: 'Financial Services & Banking',
    tagline: 'High-security, encrypted lead intelligence pipelines for modern financial networks.',
    icon: DollarSign,
    difficulty: 'High',
    readinessIndex: 72,
    icp: {
      firmographics: 'Commercial banks, FinTech series B+ platforms, asset administrators, credit networks, mortgage platforms.',
      buyingCenters: ['VP of Commercial Loans', 'Head of Business Development', 'Chief Information Security Officer (CISO)'],
      criticalPainPoints: [
        'Strict PCI-DSS compliance audits preventing raw transactional logs sharing',
        'Unverified lead scores causing wasted high-value commercial rep hours',
        'Exfiltration of corporate credit lines and financial parameters on AI dispatch'
      ],
      leadValuePropositions: [
        'Zero-knowledge platform architecture matching qualified businesses without reading confidential books',
        'Continuous credit risk signal indexing mapped with public registers',
        'Cryptographic audit ledger validating every data transition'
      ],
      contractValue: '$48,000 - $110,000 / Year'
    },
    requirements: {
      coreCapabilities: [
        'Credit Score Integration Layer',
        'Zero-Knowledge Proof (ZKP) Verification Engine',
        'Immutable Compliance Audit Database'
      ],
      integrations: ['Plaid', 'Salesforce Financial Services Cloud', 'AWS Nitro Enclaves'],
      regulatoryCompliance: ['PCI-DSS Level 1 Enforced', 'SEC Rule 17a-4 compliance', 'ISO 27001 standard controls'],
      slaExpectations: '99.99% database uptime, real-time exfiltration alerts active.'
    },
    pricing: {
      tierBasic: { name: 'Commercial GTM', cost: '$2,900 / mo', limit: '4,000 verified business targets' },
      tierGrowth: { name: 'Sovereign Bank GTM', cost: '$5,500 / mo', limit: '12,000 verified business targets' },
      tierEnterprise: { name: 'Institutional Citadel', cost: 'Custom Quote', limit: 'VPC deployed, continuous security monitoring' },
      commissionModel: 'High-security retainer baseline + query volume overrides.'
    },
    gtm: {
      topChannels: [
        'FinTech Operations Roundtable Dialogues',
        'CISO-vetted GTM Architectural Whitepapers',
        'Relational Accounts outbound calls'
      ],
      launchCampaign: 'The "Zero-Knowledge Revenue Acquisition Simulator" GTM strategy.',
      partnershipLeverage: 'Direct integration partnership with premium commercial credit networks.',
      salesCycleDays: 75
    }
  },
  {
    id: 'realestate',
    name: 'Commercial Real Estate Brokerage',
    tagline: 'Hyper-localized GIS mapping & spatial lead verification for commercial brokers.',
    icon: Building2,
    difficulty: 'Medium',
    readinessIndex: 82,
    icp: {
      firmographics: 'Commercial Brokerages, REITs, property management firms, institutional investors, land acquisition developers.',
      buyingCenters: ['Managing Partner', 'Director of Acquisition', 'Senior Investment Broker'],
      criticalPainPoints: [
        'Stale or inaccurate geographic zoning and property lease data',
        'Manual phone outreach loops to vacant lot owner LLCs',
        'Inability to track when corporate leaseholders are reaching key milestones'
      ],
      leadValuePropositions: [
        'Spatial GIS correlation linking tax registries to active real estate owners',
        'Automatic LLC owner lookup matching true decision-maker contact vectors',
        'Trigger signals based on local zoning permits and historical building filings'
      ],
      contractValue: '$12,000 - $35,000 / Year'
    },
    requirements: {
      coreCapabilities: [
        'GIS Zoning & Plat Map Aggregation Engine',
        'Reverse LLC Owner Mapping Pipeline',
        'Milestone Permit Trigger Scraper'
      ],
      integrations: ['Mapbox GIS API', 'CoStar Enterprise', 'Esri ArcGIS Engine'],
      regulatoryCompliance: ['Fair Housing compliant logic filters', 'Local zoning data access rules'],
      slaExpectations: 'Daily geographic registry sync pools, < 200ms Map render latencies.'
    },
    pricing: {
      tierBasic: { name: 'Localized Territory', cost: '$850 / mo', limit: 'Single Metro geographical region limits, 1.5M SF property records' },
      tierGrowth: { name: 'Regional Broker', cost: '$1,900 / mo', limit: '5 Metro geographical regions limits, 10M SF property records' },
      tierEnterprise: { name: 'National Sovereign REIT', cost: 'Custom Quote', limit: 'USA National access, dedicated spatial computing clusters' },
      commissionModel: 'Base monthly license with geographic territory expansion credits.'
    },
    gtm: {
      topChannels: [
        'Geographical Yield and Zoning ROI newsletters',
        'Direct property assessment physical packets',
        'Broker-to-Broker network co-promotion'
      ],
      launchCampaign: 'The "Zoning Yield Maximizer" maps and GIS spatial database free lookups.',
      partnershipLeverage: 'Partnership integrations with local land-title and deed-transfer agencies.',
      salesCycleDays: 45
    }
  },
  {
    id: 'agencies',
    name: 'Creative & Lead Generation Agencies',
    tagline: 'Multi-tenant client accounts dashboards for outsourced marketing engines.',
    icon: Users,
    difficulty: 'Low',
    readinessIndex: 92,
    icp: {
      firmographics: 'Outsourced SDR agencies, programmatic outbound agencies, growth advisory firms, lead-gen freelancers.',
      buyingCenters: ['Agency CEO', 'Head of Account Strategy', 'Operations Architect'],
      criticalPainPoints: [
        'Client churn due to pipeline performance transparency constraints',
        'High labor expense managing individual client Apollo accounts',
        'Data billing disputes with clients over lead delivery counts'
      ],
      leadValuePropositions: [
        'Separated multi-tenant client cockpit panels with clean whitelabel options',
        'Unified prompt control allowing templates updates across 50 clients at once',
        'Transparent deliverability metrics and verified lead tracking ledgers'
      ],
      contractValue: '$15,000 - $40,000 / Year'
    },
    requirements: {
      coreCapabilities: [
        'Whitelabel Client Panel Dashboard',
        'Dynamic Tenant Multi-Billing Ledger',
        'Global Campaign Prompt Syncer'
      ],
      integrations: ['Stripe Billing Connect', 'Zapier Outbound Connect', 'Slack Partner API'],
      regulatoryCompliance: ['Multi-tenant isolated DB constraints', 'Isolated outbox client registers'],
      slaExpectations: 'Agency portal uptime 99.9%, daily performance dashboard sync.'
    },
    pricing: {
      tierBasic: { name: 'Boutique Agency', cost: '$950 / mo', limit: 'Up to 5 managed client accounts, 10 SDR seats' },
      tierGrowth: { name: 'Elite Performance', cost: '$2,200 / mo', limit: 'Up to 25 managed client accounts, 50 SDR seats' },
      tierEnterprise: { name: 'Sovereign Network Agency', cost: 'Custom Quote', limit: 'Unlimited client portals, custom whitelabel domains' },
      commissionModel: 'Tier-based user licenses + dynamic sub-tenant commission revenue percent splits.'
    },
    gtm: {
      topChannels: [
        'Programmatic Outbound Scale case studies',
        'Agency SaaS scaling podcasts and online communities',
        'Client-referral commissions and reseller bonuses'
      ],
      launchCampaign: 'The "Whitelabel Client Capture Plan" interactive SDR template deck.',
      partnershipLeverage: 'Direct certification of agencies onto the EffectiveBuzz "Certified Outbound Strategist" network.',
      salesCycleDays: 20
    }
  }
];

export default function VerticalExpansionRoadmapConsole() {
  const [selectedVerticalId, setSelectedVerticalId] = useState<string>('saas');
  const [activeStrategySubTab, setActiveStrategySubTab] = useState<'icp' | 'prd' | 'pricing' | 'gtm'>('icp');
  
  // Interactive Timeline Simulation parameters
  const [devWeight, setDevWeight] = useState<number>(45); // % prioritization
  const [marketingBudget, setMarketingBudget] = useState<number>(150000); // $
  const [complianceScrutiny, setComplianceScrutiny] = useState<'Basic' | 'High-Grade' | 'Institutional Sovereign'>('High-Grade');
  
  // Simulation Outcome state variables
  const [outcomeLaunchDays, setOutcomeLaunchDays] = useState<number>(60);
  const [outcomeProjectedMRR, setOutcomeProjectedMRR] = useState<number>(85000);
  const [outcomeRiskPercentage, setOutcomeRiskPercentage] = useState<number>(34);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  
  // Prompt input playground states
  const [customVerticalPrompt, setCustomVerticalPrompt] = useState<string>('Design insurance and brokerage policy lead scoring vectors for local carriers.');
  const [customVerticalResult, setCustomVerticalResult] = useState<string>('');
  const [isAnalyzingPrompt, setIsAnalyzingPrompt] = useState<boolean>(false);

  // Stats Counters Ticker
  const [totalSimulatedRuns, setTotalSimulatedRuns] = useState<number>(148);
  const [activeRoadmapMilestones, setActiveRoadmapMilestones] = useState<number>(14);

  const selectedVertical = VERTICAL_PRODUCTS.find(v => v.id === selectedVerticalId) || VERTICAL_PRODUCTS[0];
  const VerticalIcon = selectedVertical.icon;

  // Recalculate outcomes whenever simulation inputs modify
  useEffect(() => {
    setIsSimulating(true);
    const delayTimer = setTimeout(() => {
      // Math formulas computing outcomes simulating complex trade-offs
      let baseDays = 90;
      let baseMRR = 50000;
      let baseRisk = 45;

      // Vertical difficulty multiplier
      if (selectedVertical.difficulty === 'High') {
        baseDays += 60;
        baseMRR += 40000;
        baseRisk += 15;
      } else if (selectedVertical.difficulty === 'Low') {
        baseDays -= 30;
        baseMRR -= 15000;
        baseRisk -= 15;
      }

      // Dev weight effect (reducing launch days but slightly increasing risk if too low, or increasing focus but costing time)
      if (devWeight > 60) {
        baseDays -= 20;
        baseRisk -= 10;
        baseMRR += 10000;
      } else if (devWeight < 35) {
        baseDays += 25;
        baseRisk += 18;
        baseMRR -= 8000;
      }

      // Marketing Budget effects
      const marketingScale = marketingBudget / 100000;
      baseMRR += Math.round(marketingScale * 12000);
      baseRisk -= Math.round(marketingScale * 2.5);

      // Compliance Scrutiny limits
      if (complianceScrutiny === 'Institutional Sovereign') {
        baseDays += 40;
        baseRisk -= 15;
        baseMRR += 25000; // premium pricing allowed
      } else if (complianceScrutiny === 'Basic') {
        baseDays -= 20;
        baseRisk += 25; // high compliance risks
        baseMRR -= 10000;
      }

      setOutcomeLaunchDays(Math.max(15, baseDays));
      setOutcomeProjectedMRR(Math.max(10000, baseMRR));
      setOutcomeRiskPercentage(Math.min(95, Math.max(5, baseRisk)));
      setIsSimulating(false);
    }, 700);

    return () => clearTimeout(delayTimer);
  }, [selectedVerticalId, devWeight, marketingBudget, complianceScrutiny]);

  // Handle Strategic Plan Generator trigger
  const handleQueryVerticalPrompt = () => {
    setIsAnalyzingPrompt(true);
    setTimeout(() => {
      setCustomVerticalResult(`[STRATEGIC INGESTION PROTOCOL COMPLETE]
Target Segment: Insurtech and Local Underwriting Teams
Confidence Alignment Rating: 89.2%

1. Ideal Customer Profile (ICP):
   - Scope: Local property insurance underwriters, fleet controllers, and brokerage networks.
   - Persona: General Managing Partners & Chief Compliance Officers trying to filter risky policy lines.
   - Pain point identified: Manual lookup of historical zoning claims patterns.

2. Initial Product Spec (PRD):
   - Key capability: Spatial claim-map overlays + continuous zoning variance signal trackers.
   - Core API: Interlock direct state assessor records paired with local county deed systems.

3. Pricing Strategy Suggestion:
   - Recommended Base Retainer: $1,450 / Month per territory.
   - Variable billing parameter: $0.12 billing charge per asset check.

4. GTM Pipeline:
   - Phase 1: Interactive Claim Leakage Assessment workbook.
   - Lead acquisition strategy: Co-marketing with verified land assessment software.`);
      setIsAnalyzingPrompt(false);
      setTotalSimulatedRuns(prev => prev + 1);
    }, 1500);
  };

  return (
    <div id="vertical-expansion-roadmap-console" className="space-y-8 animate-fadeIn text-slate-150">
      
      {/* Platform Strategy Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Briefcase className="w-4 h-4 shrink-0" />
            Founder Strategy Advisory
          </div>
          <h1 className="text-2xl font-bold font-display text-white mt-1">
            Vertical Products & Expansion Strategy Hub
          </h1>
          <p className="text-xs text-gray-400 max-w-xl mt-1 leading-relaxed">
            Multi-sector product expansion roadmap designed to scale the EffectiveBuzz outbound engine into niche enterprise verticals including SaaS, Healthcare, FinTech, Real Estate, and outsourced Agencies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-zinc-900/60 p-2 border border-zinc-800 rounded-xl text-xs self-center">
          <div className="px-3 py-1 bg-zinc-950/80 rounded-lg border border-zinc-805">
            <span className="text-[10px] text-gray-400 block leading-tight font-mono">Simulations Evaluated</span>
            <span className="font-bold text-emerald-400 font-mono">{totalSimulatedRuns} Strategy Pools</span>
          </div>
          <div className="px-3 py-1 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-300">
            <span className="text-[10px] text-indigo-400/70 block leading-tight font-mono">Q1-Q4 Milestone Markers</span>
            <span className="font-bold font-mono">{activeRoadmapMilestones} Active Goals</span>
          </div>
        </div>
      </div>

      {/* Select Vertical Dashboard Hub buttons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {VERTICAL_PRODUCTS.map(vert => {
          const IconComponent = vert.icon;
          const isSelected = vert.id === selectedVerticalId;
          return (
            <button
              key={vert.id}
              onClick={() => setSelectedVerticalId(vert.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                isSelected 
                  ? 'bg-indigo-950/40 border-indigo-500/50 text-white shadow-md' 
                  : 'bg-zinc-900/40 border-zinc-800 text-gray-400 hover:border-zinc-700 hover:bg-zinc-900/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg border ${
                  isSelected ? 'bg-indigo-500/20 text-indigo-300 border-indigo-600' : 'bg-zinc-950 text-zinc-500'
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold font-display">{vert.name.split(' ')[0]}</span>
              </div>
              <p className="text-[10px] text-zinc-400 font-sans mt-2 line-clamp-1 leading-relaxed">
                Ref: {vert.name}
              </p>
              
              {isSelected && (
                <div className="absolute top-0 right-0 w-1.5 h-full bg-indigo-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Strategic Framework Tabs switch representing the 4 required outputs */}
      <div className="border-b border-zinc-800 bg-zinc-950/60 p-1 rounded-xl flex flex-wrap gap-1">
        {[
          { id: 'icp', label: '1. Ideal Customer Profile (ICP)', desc: 'Demographics, buying centers & pain points' },
          { id: 'prd', label: '2. Product Requirements (PRD)', desc: 'Capabilities, integrations & compliance audits' },
          { id: 'pricing', label: '3. Pricing & Unit Economics', desc: 'Retainer tiers & allocation credit quotas' },
          { id: 'gtm', label: '4. Go-To-Market (GTM) Playbook', desc: 'Acquisition campaign & strategic partner leverage' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveStrategySubTab(tab.id as any)}
            className={`flex-1 min-w-[150px] p-3 rounded-lg text-left border transition-all duration-205 ${
              activeStrategySubTab === tab.id
                ? 'bg-zinc-900 border-zinc-700 text-white shadow-lg'
                : 'bg-transparent border-transparent text-gray-400 hover:bg-zinc-900/40 hover:text-white'
            }`}
          >
            <span className="text-xs font-bold block leading-none">{tab.label}</span>
            <p className="text-[9px] text-zinc-400 mt-1 block font-sans truncate">{tab.desc}</p>
          </button>
        ))}
      </div>

      {/* Dynamic Content Panel */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 lg:p-8 backdrop-blur min-h-[380px]">
        
        {/* SUBTAB 1: ICP */}
        {activeStrategySubTab === 'icp' && (
          <div className="space-y-6">
            <div className="flex justify-between items-start flex-wrap gap-4 border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-base font-semibold text-white font-display">Ideal Customer Profile & Target Persona Matricies</h3>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  Target sector demographics, decision-making centers, and core GTM friction points for the {selectedVertical.name} product line.
                </p>
              </div>
              <div className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1.5 rounded-lg text-indigo-300 font-mono font-bold uppercase">
                Difficulty Class: {selectedVertical.difficulty}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Strategic Columns */}
              <div className="md:col-span-7 space-y-4">
                <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-850 space-y-1.5">
                  <span className="font-mono text-[9px] uppercase font-bold text-indigo-400 block tracking-wide">Target Firmographics</span>
                  <p className="text-xs text-zinc-200 leading-relaxed font-sans">{selectedVertical.icp.firmographics}</p>
                </div>

                <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-850 space-y-1.5">
                  <span className="font-mono text-[9px] uppercase font-bold text-amber-500 block tracking-wide">Strategic Buying Centers</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedVertical.icp.buyingCenters.map((buyer, idx) => (
                      <span key={idx} className="bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-[10px] text-zinc-300 rounded font-mono font-semibold">
                        {buyer}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-850 space-y-1.5">
                  <span className="font-mono text-[9px] uppercase font-bold text-red-400 block tracking-wide">Critical Client Pain Points</span>
                  <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1.5 leading-relaxed pt-1">
                    {selectedVertical.icp.criticalPainPoints.map((pain, idx) => (
                      <li key={idx}>{pain}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Persona and Contract Value right block */}
              <div className="md:col-span-5 bg-zinc-950/40 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                    Strategic Pricing Target
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Expected Representative Contract Value</h4>
                </div>

                <div className="my-6">
                  <div className="text-3xl font-display font-bold text-white tracking-tight">{selectedVertical.icp.contractValue}</div>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-wider block uppercase mt-0.5">ACV Median Contract Matrix</span>
                </div>

                <div className="space-y-3.5 text-xs text-zinc-300 leading-relaxed">
                  <span className="font-bold text-white block uppercase text-[10px] font-mono text-[#818cf8]">ICP Outbox Messaging Angle:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-zinc-400 leading-normal">
                    {selectedVertical.icp.leadValuePropositions.map((prop, idx) => (
                      <li key={idx}>{prop}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: PRODUCT REQUIREMENTS */}
        {activeStrategySubTab === 'prd' && (
          <div className="space-y-6">
            <div className="flex justify-between items-start flex-wrap gap-4 border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-base font-semibold text-white font-display">Product Requirements Document (PRD) Core Strategy</h3>
                <p className="text-xs text-gray-400 mt-1 font-sans">
                  Mandatory platform architectures, third-party hooks integration, and compliance rulesets for {selectedVertical.name}.
                </p>
              </div>
              <div className="text-[10px] bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1.5 rounded-lg text-emerald-300 font-mono uppercase font-bold">
                Readiness: {selectedVertical.readinessIndex}% Active
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Requirements specifications bullet sheets */}
              <div className="bg-zinc-950/50 border border-zinc-800 p-6 rounded-2xl space-y-5">
                <div>
                  <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-widest block font-bold">
                    1. Functional Capabilities Specifications
                  </span>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Required core software components which must be engineered:</p>
                </div>

                <div className="space-y-3">
                  {selectedVertical.requirements.coreCapabilities.map((cap, idx) => (
                    <div key={idx} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800/85 flex items-start gap-3">
                      <div className="mt-0.5 p-1 bg-emerald-500/10 rounded border border-emerald-500/30 text-emerald-400">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">{cap}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory compliance matrix column */}
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-wider block">
                    2. Privacy Security & Interface Pipeline Rules
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">Sovereign Compliance Constraints</h4>
                </div>

                <div className="space-y-3.5 text-xs text-zinc-300">
                  <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-805 space-y-1">
                    <span className="font-bold text-white block font-mono text-[9px] uppercase text-[#818cf8]">Regulatory Limits</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedVertical.requirements.regulatoryCompliance.map((reg, idx) => (
                        <span key={idx} className="bg-zinc-900 border border-zinc-800 text-amber-300 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded">
                          {reg}
                        </span>
                      ))}
                    </div>
                    <p className="text-zinc-400 text-[11px] pt-1 leading-normal">
                      Mandated regional and industry isolation protocols that block third-party database transit without tenant decryption consent.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-805 space-y-1">
                    <span className="font-bold text-white block font-mono text-[9px] uppercase text-emerald-400">Prerequisite Enterprise Integrations</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedVertical.requirements.integrations.map((integ, idx) => (
                        <span key={idx} className="bg-indigo-950/30 border border-indigo-900 text-indigo-300 text-[10px] font-mono px-2 py-0.5 rounded">
                          {integ}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-zinc-900/40 border border-zinc-800 rounded-lg text-[10.5px] text-zinc-400 leading-relaxed">
                    <strong>Service Level Agreement (SLA):</strong> {selectedVertical.requirements.slaExpectations}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: PRICING */}
        {activeStrategySubTab === 'pricing' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-semibold text-white font-display font-bold">Tiered Pricing Matrices & Economics Model</h3>
              <p className="text-xs text-gray-400 mt-1 font-sans">
                Product licensing plans, user quota quotas, and dynamic usage override billing structures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Plan component */}
              <div className="bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 p-5 rounded-2xl flex flex-col justify-between relative transition duration-200">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block">1. Baseline Entry Plan</span>
                  <h4 className="text-base font-bold text-white">{selectedVertical.pricing.tierBasic.name}</h4>
                  <p className="text-2xl font-mono text-indigo-400 font-bold pt-2">{selectedVertical.pricing.tierBasic.cost}</p>
                </div>

                <div className="border-t border-zinc-800/80 my-4 pt-4 text-xs text-zinc-300 space-y-1 leading-relaxed">
                  <span className="font-bold block uppercase text-[8px] font-mono text-zinc-500">Service Inclusion Profile:</span>
                  <p>{selectedVertical.pricing.tierBasic.limit}</p>
                </div>

                <span className="text-[10px] text-zinc-500 font-mono">Auto-recurring month billing cycle.</span>
              </div>

              {/* Growth Plan component */}
              <div className="bg-zinc-950/80 border border-indigo-500/40 hover:border-indigo-400/60 p-5 rounded-2xl flex flex-col justify-between relative transition duration-205 shadow-lg">
                <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-indigo-500 text-slate-950 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">
                  MOST POPULAR COHORT
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-indigo-300 uppercase font-bold block">2. Scale Platform Plan</span>
                  <h4 className="text-base font-bold text-white">{selectedVertical.pricing.tierGrowth.name}</h4>
                  <p className="text-2xl font-mono text-emerald-400 font-bold pt-2">{selectedVertical.pricing.tierGrowth.cost}</p>
                </div>

                <div className="border-t border-indigo-950/70 my-4 pt-4 text-xs text-zinc-200 space-y-1 leading-relaxed">
                  <span className="font-bold block uppercase text-[8px] font-mono text-indigo-400">Expanded Core Service Profile:</span>
                  <p>{selectedVertical.pricing.tierGrowth.limit}</p>
                </div>

                <span className="text-[10px] text-indigo-300 font-mono">Dynamic multi-outbox pooling.</span>
              </div>

              {/* Enterprise Plan component */}
              <div className="bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 p-5 rounded-2xl flex flex-col justify-between relative transition duration-200">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block">3. Institutional Segment</span>
                  <h4 className="text-base font-bold text-white">{selectedVertical.pricing.tierEnterprise.name}</h4>
                  <p className="text-2xl font-mono text-white font-bold pt-2">{selectedVertical.pricing.tierEnterprise.cost}</p>
                </div>

                <div className="border-t border-zinc-800/80 my-4 pt-4 text-xs text-zinc-300 space-y-1 leading-relaxed">
                  <span className="font-bold block uppercase text-[8px] font-mono text-zinc-500">Isolation & Deployment limits:</span>
                  <p>{selectedVertical.pricing.tierEnterprise.limit}</p>
                </div>

                <span className="text-[10px] text-zinc-500 font-mono">BAA or SLA custom contract limits.</span>
              </div>
            </div>

            <div className="p-4 bg-zinc-900 border border-zinc-850/80 rounded-xl text-xs text-zinc-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <strong>Commission Model:</strong> <span className="text-indigo-300 font-sans">{selectedVertical.pricing.commissionModel}</span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">
                VAT & Local tax currency parities automatically checked at transaction boundary hooks
              </span>
            </div>
          </div>
        )}

        {/* SUBTAB 4: GTM PLAYBOOK */}
        {activeStrategySubTab === 'gtm' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-base font-bold text-white font-display">Go-To-Market (GTM) Playbook & Acquisition Channels</h3>
              <p className="text-xs text-gray-400">
                Marketing channels, launch assets, partnership multipliers, and sales cycles engineered to drive inbound adoption of {selectedVertical.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
              {/* Marketing strategy metrics */}
              <div className="bg-zinc-950/60 border border-zinc-805 p-6 rounded-2xl space-y-5">
                <div>
                  <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-wider block font-bold leading-none">
                    Outbound & Organic Growth GTM Channels
                  </span>
                  <p className="text-[11px] text-zinc-400 mt-1">Primary tactical channels prioritized by expected GTM velocity:</p>
                </div>

                <div className="space-y-3">
                  {selectedVertical.gtm.topChannels.map((channel, idx) => (
                    <div key={idx} className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 flex items-center justify-between font-mono text-xs">
                      <span className="text-zinc-300">Channel {idx+1}: {channel}</span>
                      <span className="text-emerald-400 font-bold uppercase text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded">HIGH PRIORITY</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Launch strategy narrative boxes */}
              <div className="space-y-5">
                <div>
                  <span className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-wider block">
                    Product-Led Acquisition Magnet & Partnerships
                  </span>
                  <h4 className="text-sm font-semibold text-white mt-1">Ecosystem Force Multiplier</h4>
                </div>

                <div className="space-y-4 text-xs leading-normal">
                  <div className="p-3.5 bg-zinc-900 rounded-xl border border-zinc-800">
                    <span className="font-mono text-[9px] uppercase font-bold text-[#818cf8] block mb-1">Interactive Launch Asset Program</span>
                    <p className="text-zinc-300 font-sans">{selectedVertical.gtm.launchCampaign}</p>
                  </div>

                  <div className="p-3.5 bg-zinc-900 rounded-xl border border-zinc-800">
                    <span className="font-mono text-[9px] uppercase font-bold text-emerald-400 block mb-1">Strategic Channel leverage Integration</span>
                    <p className="text-zinc-300 font-sans">{selectedVertical.gtm.partnershipLeverage}</p>
                  </div>

                  <div className="p-3 bg-zinc-900 border border-zinc-805 rounded flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">Projected Enterprise Sales Pipeline Cycle:</span>
                    <strong className="text-indigo-400 text-sm">{selectedVertical.gtm.salesCycleDays} Days Median</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Gantt Timeline & Prioritizations Resource Simulator */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 lg:p-8">
        <div className="border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-widest pb-0.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Strategic Planning Simulations Room
          </div>
          <h3 className="text-base font-semibold text-white font-display">
            Dynamic Launch Gantt Roadmap & Resource Simulator
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Adjust development weight priorities, quarterly budgets, and compliance standards to preview launch timeline variations, expected MRR yield, and security compliance risks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Controls column */}
          <div className="lg:col-span-5 bg-zinc-950/60 border border-zinc-800/80 p-6 rounded-2xl space-y-5">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block leading-none">
              Strategic Resource Allocation
            </span>

            <div className="space-y-4">
              {/* Dev Weight */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-zinc-300">
                  <span>Product Dev Prioritization (Weight)</span>
                  <span className="text-indigo-400 font-bold">{devWeight}% of R&D team</span>
                </div>
                <input 
                  type="range"
                  min="20"
                  max="85"
                  value={devWeight}
                  onChange={(e) => setDevWeight(Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-zinc-800 cursor-pointer"
                />
              </div>

              {/* Marketing Budget */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-zinc-300">
                  <span>Quarterly Segment Marketing Budget</span>
                  <span className="text-emerald-400 font-bold">${marketingBudget.toLocaleString()} USD</span>
                </div>
                <input 
                  type="range"
                  min="25000"
                  max="400000"
                  step="25000"
                  value={marketingBudget}
                  onChange={(e) => setMarketingBudget(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-800 cursor-pointer"
                />
              </div>

              {/* Regulatory Compliance level */}
              <div className="space-y-2">
                <span className="text-[10px] text-zinc-400 font-mono uppercase block">Sovereign Compliance Scrutiny</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Basic', label: 'Basic Filters' },
                    { id: 'High-Grade', label: 'SOC2/HIPAA' },
                    { id: 'Institutional Sovereign', label: 'VPC Citadel Keys' }
                  ].map(lvl => (
                    <button
                      key={lvl.id}
                      onClick={() => setComplianceScrutiny(lvl.id as any)}
                      className={`py-2 px-1 text-[10px] rounded font-mono font-bold border transition ${
                        complianceScrutiny === lvl.id
                          ? 'bg-indigo-900 border-indigo-500 text-white shadow'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gantt / Output Simulator visualization */}
          <div className="lg:col-span-7 bg-zinc-950/60 border border-zinc-850 p-6 rounded-2xl flex flex-col justify-between">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase block">
                  Simulated Outcomes (Q1 - Q4 Roadmap Metrics)
                </span>
                <h4 className="text-xs text-zinc-400">Simulating strategic outcome boundaries...</h4>
              </div>
              {isSimulating && <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />}
            </div>

            {/* Calculated outcome dashboard meters */}
            <div className="grid grid-cols-3 gap-4 my-6">
              <div className="bg-zinc-900 p-4 border border-zinc-800 rounded-xl text-center">
                <span className="text-[9px] text-zinc-500 font-mono uppercase block leading-none mb-1">Time To Launch</span>
                <span className="text-xl font-mono text-white font-bold">{outcomeLaunchDays} Days</span>
                <span className="text-[8px] text-emerald-400 block font-mono mt-1">Est. Target Q1/Q2</span>
              </div>

              <div className="bg-zinc-900 p-4 border border-zinc-800 rounded-xl text-center">
                <span className="text-[9px] text-zinc-500 font-mono uppercase block leading-none mb-1">Projected MRR Reach</span>
                <span className="text-xl font-mono text-emerald-400 font-bold">${outcomeProjectedMRR.toLocaleString()}</span>
                <span className="text-[8px] text-zinc-400 block font-mono mt-1">At 6-Month Mark</span>
              </div>

              <div className="bg-zinc-900 p-4 border border-zinc-800 rounded-xl text-center">
                <span className="text-[9px] text-zinc-500 font-mono uppercase block leading-none mb-1">GTM Strategic Risk</span>
                <span className="text-xl font-mono text-red-400 font-bold">{outcomeRiskPercentage}%</span>
                <span className="text-[8px] text-zinc-400 block font-mono mt-1">
                  {outcomeRiskPercentage > 50 ? '⚠️ High Risk Limit' : '✔ Normal Tolerance'}
                </span>
              </div>
            </div>

            {/* Gantt Quarter segments visual bar */}
            <div className="space-y-2.5">
              <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                Visual Gantt Milestones Timeline
              </span>

              <div className="space-y-2 font-mono text-[10px]">
                {/* Q1 Segment Bar */}
                <div className="flex items-center gap-2">
                  <span className="w-16 text-zinc-500 uppercase">Q1 Launch</span>
                  <div className="flex-1 bg-zinc-900 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(25, 120 - outcomeLaunchDays))}%` }}
                    />
                  </div>
                  <span className="text-zinc-400 w-16 text-right">Beta Pilot</span>
                </div>

                {/* Q2 Segment Bar */}
                <div className="flex items-center gap-2">
                  <span className="w-16 text-zinc-500 uppercase">Q2 Scaling</span>
                  <div className="flex-1 bg-zinc-900 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(10, (140 - outcomeLaunchDays) / 1.5))}%` }}
                    />
                  </div>
                  <span className="text-zinc-400 w-16 text-right">Integrations</span>
                </div>

                {/* Q3 Segment Bar */}
                <div className="flex items-center gap-2">
                  <span className="w-16 text-zinc-500 uppercase">Q3 Enterprise</span>
                  <div className="flex-1 bg-zinc-900 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(15, OutcomeQuarterPct(outcomeRiskPercentage)))}%` }}
                    />
                  </div>
                  <span className="text-zinc-400 w-16 text-right">Hardening</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Playbook Ingestion Simulator Section - Natural Language Playground */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 lg:p-8">
        <div className="border-b border-zinc-800 pb-4 flex justify-between items-start flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-widest pb-0.5">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              SaaS Strategic Ingestion Engine
            </div>
            <h3 className="text-base font-semibold text-white font-display">
              AI Vertical Strategy Prompt Playground
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Simulate dynamic validation of newly proposed enterprise verticals. Submit custom sector requirements inside the schema compiler boundaries.
            </p>
          </div>
          <span className="text-[10px] text-zinc-500 uppercase font-mono bg-zinc-950 p-2 border border-zinc-850 rounded">
            Ingress Validator: Online & Certified
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Prompt side compiler */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block select-none">
              Deploy Custom Strategy Requirements Payload:
            </span>
            <textarea
              value={customVerticalPrompt}
              onChange={(e) => setCustomVerticalPrompt(e.target.value)}
              className="w-full h-32 bg-zinc-950 font-mono text-xs text-zinc-300 p-3.5 rounded-xl border border-zinc-800 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition"
              placeholder="e.g. Design insurance and brokerage policy lead scoring vectors for local carriers..."
            />
            <button
              onClick={handleQueryVerticalPrompt}
              disabled={isAnalyzingPrompt || !customVerticalPrompt}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-xs rounded-lg transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5" />
              {isAnalyzingPrompt ? "Parsing Strategy..." : "Compile Outbound Strategy Specs"}
            </button>
          </div>

          {/* Compiled Output side */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-850 rounded-xl p-4.5 min-h-[180px] flex flex-col justify-between">
            <span className="font-mono text-[9px] text-emerald-400 tracking-wider uppercase block font-bold">
              COMPILED METRICS SPECTRA OUTBOUND
            </span>

            <div className="bg-zinc-950 text-[11px] font-mono text-zinc-300 leading-relaxed overflow-y-auto max-h-56 py-3 border-t border-zinc-850/80 mt-2 whitespace-pre-wrap">
              {isAnalyzingPrompt ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                  <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin" />
                  <span className="text-zinc-500">Injecting target variables & building secure schema models...</span>
                </div>
              ) : customVerticalResult ? (
                customVerticalResult
              ) : (
                <span className="text-zinc-650 italic block text-center py-12 select-none leading-relaxed">
                  Trigger the prompt compilation playbook to watch structured ICP, PRD, Pricing & GTM strategies evaluate...
                </span>
              )}
            </div>
            
            <div className="text-[9.5px] text-zinc-500 border-t border-zinc-850/80 pt-3 flex justify-between uppercase font-mono font-bold leading-none mt-2">
              <span>Risk Margin Vetted</span>
              <span>Variance Limits: ±3.4%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Internal Helper to simulate Q3 segment width based on Risk levels to avoid math issues
function OutcomeQuarterPct(risk: number): number {
  return Math.min(100, Math.max(10, 110 - (risk * 1.4)));
}
