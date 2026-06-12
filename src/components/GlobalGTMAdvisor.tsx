import React, { useState } from 'react';
import { Globe, ShieldAlert, Award, Calendar, DollarSign, ArrowRight, Sparkles, Server, MapPin, Scale, Send, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface GTMRegion {
  id: string;
  name: string;
  code: string;
  anchor: string;
  slogan: string;
  icp: {
    industries: string[];
    companySize: string;
    buyerPersonas: string[];
    painPoints: string[];
  };
  valueWedge: string;
  narrative: string;
  pricing: {
    currency: string;
    growth: string;
    professional: string;
    enterprise: string;
    mechanism: string;
  };
  localization: {
    tone: string;
    holidays: string[];
    senderSuffix: string;
    rules: string[];
  };
  compliance: {
    framework: string;
    audits: string;
    podLocation: string;
    safetyRules: string[];
  };
  readinessPercentage: number;
}

export default function GlobalGTMAdvisor() {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('na');
  const [interactiveCostModeler, setInteractiveCostModeler] = useState({
    avgRepSalary: 85000,
    outboundSDRCount: 4,
  });

  const regions: GTMRegion[] = [
    {
      id: 'na',
      name: 'North America',
      code: 'NA / US-CAN',
      anchor: 'US Central / US East',
      slogan: 'The High-Velocity Outreach Engine',
      icp: {
        industries: ['B2B SaaS', 'FinTech startups', 'Cloud Infrastructure', 'Digital Agencies'],
        companySize: '50 - 500 Employees',
        buyerPersonas: ['VP of Sales', 'VP of Demand Gen', 'Head of RevOps'],
        painPoints: [
          'High local SDR labor rates ($80k+ base salary)',
          'High response fatigue in tech-saturated hubs',
          'Poor data sync in client-only extensions'
        ]
      },
      valueWedge: 'The Ultimate Human SDR Force Multiplier',
      narrative: 'Transform expensive outbound operations into a software-fueled campaign machine. Enable single SDRs to leverage advanced prompt chains and automated domain guardians to book 3x more discovery calls.',
      pricing: {
        currency: 'USD ($)',
        growth: '$95 / mo',
        professional: '$299 / mo',
        enterprise: 'Custom from $3,500/mo',
        mechanism: 'Self-serve Stripe credit top-up packages ($50 to $500 packs)'
      },
      localization: {
        tone: 'Action-oriented, value-first, semiformal corporate registers',
        holidays: ['Labor Day', 'Thanksgiving', 'Independence Day', 'Memorial Day'],
        senderSuffix: '.com / .io domains',
        rules: [
          'High-velocity delivery targeting key decision makers',
          'Clean scannable lists focusing on direct software ROI formulas',
          'Highly transparent business calendar matching US/Canada workdays'
        ]
      },
      compliance: {
        framework: 'CCPA / CPRA / CASL',
        audits: 'SOC 2 Type II Certified',
        podLocation: 'AWS us-east-1 (N. Virginia) / GCP us-central1',
        safetyRules: [
          'Universal single-click unsubscribe suppresses future emails globally',
          'Automatic masking of protected or sensitive PII fields in client logs',
          'Pre-flight automated scans verify DNS DMARC security integrity'
        ]
      },
      readinessPercentage: 95
    },
    {
      id: 'eu',
      name: 'Europe (DACH & France)',
      code: 'EU / EEA',
      anchor: 'AWS eu-central-1 (Frankfurt)',
      slogan: 'The Sovereign Privacy-First Outbound Gate',
      icp: {
        industries: ['Manufacturing', 'Industrial Mittelstand', 'Regional FinTech', 'Local Business Tech'],
        companySize: '100 - 1,000 Employees',
        buyerPersonas: ['Chief Information Officer (CIO)', 'Legal Counsel', 'Sales Operations lead'],
        painPoints: [
          'Fear of regulatory enforcement (GDPR fines)',
          'Skepticism toward US-hosted SaaS architectures',
          'Requirement for local dialect cold-email precision'
        ]
      },
      valueWedge: 'Sovereign Cognitive Outbound Campaigns',
      narrative: 'Outbound campaigns designed to comply with local privacy regulations and cultural norms. Physical data residence in Frankfurt, automated audit trails, and polite-register draft generation engines protect your domain reputation.',
      pricing: {
        currency: 'EUR (€)',
        growth: '€95 / mo',
        professional: '€299 / mo',
        enterprise: 'Custom from €3,500/mo',
        mechanism: 'Stripe regional VAT collection linked to validated corporate EU VAT registrations'
      },
      localization: {
        tone: 'Highly formal, professional. Strictly uses respectful honorifics ("Sie"/"Vous")',
        holidays: ['Ascension Day', 'Bastille Day', 'German Unity Day', 'All Saints Day'],
        senderSuffix: '.de / .fr / .co.uk sovereign country domains',
        rules: [
          'Background-first reasoning citing solid European enterprise references',
          'No casual greetings; communication is structured and business-centric',
          'Double-register checking prevents grammatical mistakes in German/French output'
        ]
      },
      compliance: {
        framework: 'GDPR / EU AI Act Compliant',
        audits: 'Sovereignty ISO 27001 Certified',
        podLocation: 'AWS eu-central-1 Frankfurt (Physical isolation)',
        safetyRules: [
          'SaaS operations process and store data entirely inside EU central bounds',
          'Instant user triggers execute full "Right to Be Forgotten" erasure scripts',
          'Auto-classification records prevent high-risk algorithmic scoring exposures'
        ]
      },
      readinessPercentage: 88
    },
    {
      id: 'me',
      name: 'Middle East (GCC)',
      code: 'GCC Hub (UAE - KSA)',
      anchor: 'Moro Hub Dubai / Local Private Cloud',
      slogan: 'The Sovereign Enterprise Advisor',
      icp: {
        industries: ['Sovereign Wealth Holdings', 'Real Estate Devs', 'Logistics Conglomerates', 'Gov Agencies'],
        companySize: '500 - 5,000 Employees',
        buyerPersonas: ['Chief Digital Officer (CDO)', 'Executive Board Members', 'Regional GM'],
        painPoints: [
          'Sovereignty requirements restricting standard cloud SaaS services',
          'Need to accelerate national-level digital transitions (Vision 2030)',
          'Extreme preference for relationship-centric corporate advisory'
        ]
      },
      valueWedge: 'Sovereign Outbound Enablement for National Vision Pillars',
      narrative: 'A private sovereign cloud platform designed to build regional relationships. Connect secure workflows, maintain metadata on sovereign local nodes, and create personalized opportunities.',
      pricing: {
        currency: 'AED / SAR / USD',
        growth: '$120 / mo equivalent',
        professional: '$350 / mo equivalent',
        enterprise: 'Custom from $5,000/mo',
        mechanism: 'High-touch executive onboarding packages bundled directly inside regional contracts'
      },
      localization: {
        tone: 'High-respect, structured corporate register. Supports dynamic RTL Arabic scripts',
        holidays: ['Eid Al-Fitr', 'Eid Al-Adha', 'UAE National Day', 'Saudi Founding Day'],
        senderSuffix: '.ae / .sa specialized senders',
        rules: [
          'Relationship-centric drafting placing commercial asks subordinate to trust-building',
          'Respectful addressing of organizational tier positions and honors',
          'Automatic suppression on Fridays and weekly holiday breaks'
        ]
      },
      compliance: {
        framework: 'UAE PDPL / Saudi NDMO Regulations',
        audits: 'SACS (KSA Security) Qualified',
        podLocation: 'Local Dubai Moro Hub / Sovereign Private Cloud nodes',
        safetyRules: [
          'Encrypted databases housed regionally in certified hosting datacenters',
          'Zero international transit of critical corporate contact lists',
          'Strict audit log tracking of all agent query tasks'
        ]
      },
      readinessPercentage: 75
    },
    {
      id: 'apac',
      name: 'Asia-Pacific (APAC)',
      code: 'APAC Channel Matrix',
      anchor: 'AWS ap-southeast-1 (Singapore)',
      slogan: 'The Mass-Scale Localized Channel Matrix',
      icp: {
        industries: ['Global Manufacturing hubs', 'E-commerce scale-ups', 'IT Providers', 'Tech agencies'],
        companySize: '100 - 1,000 Employees',
        buyerPersonas: ['Head of Multi-Channel GTM', 'Founder', 'VP of Growth'],
        painPoints: [
          'Fragmented buyer habits and messaging preferences across regions',
          'High translation friction when launching international efforts',
          'Inefficient, high-volume template responses'
        ]
      },
      valueWedge: 'Channel-Enabled Global Outreach Platform',
      narrative: 'Expand into international markets by automating culturally optimized pipeline generation. Leverage regional reseller partners and localization engines to scale outbound operations with high efficiency.',
      pricing: {
        currency: 'SGD / AUD / JPY',
        growth: 'SGD 120 / mo',
        professional: 'SGD 380 / mo',
        enterprise: 'Pricing Parity Adjusted per region',
        mechanism: 'Regional VAR commission splits managed through automated Stripe checkout routes'
      },
      localization: {
        tone: 'Highly respectful Japanese Keigo, semiformal English in Singapore and Australia',
        holidays: ['Golden Week (Japan)', 'Diwali (India)', 'Singapore National Day'],
        senderSuffix: '.jp / .sg / .com.au country domains',
        rules: [
          'Japanese Keigo register emphasizes consensus-focused corporate reviews',
          'Clean, value-centric summaries for Singapore-based trading hubs',
          'Action-oriented, value-optimized structures for Australia/New Zealand'
        ]
      },
      compliance: {
        framework: 'Singapore PDPA / Australia Privacy Act',
        audits: 'IMDA Data Protection Trustmark Cert',
        podLocation: 'AWS ap-southeast-1 Singapore data nodes',
        safetyRules: [
          'Consent logs mapped to regional customer databases',
          'Dynamic access level restriction limits administrative transfers',
          'Strict cryptographic safety audits protect personal records'
        ]
      },
      readinessPercentage: 80
    }
  ];

  const selectedRegion = regions.find(r => r.id === selectedRegionId) || regions[0];

  // Modeler Calculations
  const averageHumanSDRCost = (interactiveCostModeler.avgRepSalary / 12) * interactiveCostModeler.outboundSDRCount;
  const platformLicenseCost = 299 * interactiveCostModeler.outboundSDRCount;
  const savingsAmount = averageHumanSDRCost - platformLicenseCost;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-emerald-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
                Partner Strategy Desk
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Status: Series A GTM Readiness Verified</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              Global GTM Expansion Advisor
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Confidential analytical portal modeling region-by-region ideal customer profiles, pricing parities, localized copywriting criteria, and strict regulatory pod parameters.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-indigo-400">
            <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>HQ Coordinate: Global Routing</span>
          </div>
        </div>
      </div>

      {/* Human Labor vs SaaS Automation Cost Modeler Widget */}
      <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-2.5">
          <Scale className="w-5 h-5 text-indigo-400" />
          <div>
            <h4 className="text-sm font-semibold text-white font-display">Regional SDR ROI Calculator</h4>
            <p className="text-[10px] text-gray-400">Compare regional sales development representative labor overhead to EffectiveBuzz licenses.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-gray-400 uppercase">Average Regional SDR Salary (fully loaded):</span>
                <span className="text-white font-bold">${interactiveCostModeler.avgRepSalary.toLocaleString()} / year</span>
              </div>
              <input
                type="range"
                min="45000"
                max="130000"
                step="5000"
                value={interactiveCostModeler.avgRepSalary}
                onChange={(e) => setInteractiveCostModeler(prev => ({ ...prev, avgRepSalary: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-indigo-400"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-gray-400 uppercase">Outbound SDR Team Headcount:</span>
                <span className="text-white font-bold">{interactiveCostModeler.outboundSDRCount} SDRs</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={interactiveCostModeler.outboundSDRCount}
                onChange={(e) => setInteractiveCostModeler(prev => ({ ...prev, outboundSDRCount: parseInt(e.target.value) }))}
                className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-indigo-400"
              />
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-950 border border-gray-900 rounded-lg p-3.5 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-500 uppercase block">Monthly Operating Savings</span>
              <h5 className="text-lg font-bold text-emerald-400 font-display">${Math.round(savingsAmount).toLocaleString()}</h5>
              <span className="text-[8px] text-gray-400 block font-mono">Factors in {interactiveCostModeler.outboundSDRCount} licenses at $299/mo</span>
            </div>
            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono">
              +{(savingsAmount / averageHumanSDRCost * 100).toFixed(0)}% ROI
            </div>
          </div>
        </div>
      </div>

      {/* Main Geography Content Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Region Selectors Column */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-3 bg-slate-950 rounded-lg border border-gray-900 text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
            Target Growth Regions
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegionId(reg.id)}
                className={`text-left p-3.5 rounded-xl border transition-all relative overflow-hidden group cursor-pointer ${
                  selectedRegionId === reg.id
                    ? 'bg-[#111827] border-indigo-500/50 text-white shadow-lg'
                    : 'bg-transparent border-slate-900 text-gray-400 hover:bg-[#111827]/40 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold font-display">{reg.name}</span>
                  <MapPin className={`w-3.5 h-3.5 ${selectedRegionId === reg.id ? 'text-emerald-400 animate-bounce' : 'text-gray-600'}`} />
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-400">
                  <span className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-indigo-300">
                    {reg.code}
                  </span>
                  <span>Anchor: {reg.id.toUpperCase()}</span>
                </div>

                {/* Progress bar info */}
                <div className="mt-3.5 space-y-1">
                  <div className="flex justify-between items-center text-[8px] font-mono">
                    <span className="text-gray-500 uppercase">Advisory Readiness:</span>
                    <span className="text-indigo-400 font-bold">{reg.readinessPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1 rounded overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${selectedRegionId === reg.id ? 'bg-indigo-400' : 'bg-gray-700'}`}
                      style={{ width: `${reg.readinessPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Region GTM Details View */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl shadow-xl space-y-6">
          <div className="border-b border-gray-800 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-white font-display">{selectedRegion.name} Plan</h4>
                <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded uppercase">
                  {selectedRegion.code}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">{selectedRegion.slogan}</p>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-gray-500 uppercase block">Compliance Target</span>
              <strong className="text-xs font-mono text-emerald-400 block mt-0.5">{selectedRegion.compliance.framework}</strong>
            </div>
          </div>

          {/* ICP and value wedge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3.5">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-gray-800/50 pb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Ideal Customer Profile (ICP)
              </h5>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Target Industries:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedRegion.icp.industries.map((ind, i) => (
                      <span key={i} className="bg-slate-950 border border-gray-900 px-2 py-1 rounded-[4px] font-mono text-[9px] text-zinc-300">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Target Scale:</span>
                    <strong className="text-white text-xs mt-0.5 block">{selectedRegion.icp.companySize}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Buyer Personas:</span>
                    <strong className="text-zinc-300 text-xs mt-0.5 block truncate" title={selectedRegion.icp.buyerPersonas.join(', ')}>
                      {selectedRegion.icp.buyerPersonas[0]} & others
                    </strong>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Target Pain points:</span>
                  <ul className="space-y-1.5 mt-1.5">
                    {selectedRegion.icp.painPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-gray-400 text-[11px] leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-red-400 mt-2 shrink-0"></span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3.5">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-gray-800/50 pb-1.5">
                <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
                Regional Pricing Adjustments
              </h5>
              <div className="space-y-3.5 text-xs">
                <div className="p-3 bg-slate-950 border border-gray-900 rounded-lg grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Growth Tier</span>
                    <strong className="text-sm font-bold text-white font-display block mt-0.5">{selectedRegion.pricing.growth}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Professional Tier</span>
                    <strong className="text-sm font-bold text-indigo-300 font-display block mt-0.5">{selectedRegion.pricing.professional}</strong>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Enterprise Licensing:</span>
                  <strong className="text-white text-xs mt-0.5 block font-mono">{selectedRegion.pricing.enterprise}</strong>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">GTM Pricing Mechanism:</span>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed font-mono">
                    {selectedRegion.pricing.mechanism}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800/80 pt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Value positioning and narrative */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-indigo-400" />
                Value Positioning
              </h5>
              <div className="p-3 bg-[#182235]/30 border border-indigo-500/15 rounded-lg space-y-1.5">
                <span className="text-[9px] font-mono text-indigo-400 uppercase font-bold tracking-wider">The Value Wedge:</span>
                <p className="text-xs font-bold text-white">{selectedRegion.valueWedge}</p>
                <p className="text-[11px] text-gray-400 leading-relaxed font-mono pt-1">
                  {selectedRegion.narrative}
                </p>
              </div>
            </div>

            {/* Cultural localization constraints */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                Localization Criteria (NLG)
              </h5>
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Natural Language Register:</span>
                  <p className="text-[11px] text-zinc-300 leading-relaxed mt-0.5 font-mono">{selectedRegion.localization.tone}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pb-1">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Target Holiday Guardrails:</span>
                    <span className="text-zinc-400 text-[10px] mt-0.5 block truncate" title={selectedRegion.localization.holidays.join(', ')}>
                      {selectedRegion.localization.holidays[0]}, {selectedRegion.localization.holidays[1]}...
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Local Senders suffix:</span>
                    <span className="text-emerald-400 text-[10px] font-mono mt-0.5 block">{selectedRegion.localization.senderSuffix}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">NLG Logic Rules:</span>
                  <ul className="space-y-1.5 mt-1">
                    {selectedRegion.localization.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-gray-400 text-[11px] leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance and Data residency section */}
          <div className="border-t border-gray-800/80 pt-5 space-y-4">
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-1.5 pb-1 border-b border-gray-800/40">
              <Scale className="w-3.5 h-3.5 text-indigo-400" />
              Sovereignty & Security Alignment
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-950 border border-gray-900 rounded-lg">
                <span className="text-[9px] font-mono text-gray-500 uppercase block">Compliance Directives</span>
                <strong className="text-xs font-mono text-white mt-0.5 block">{selectedRegion.compliance.framework}</strong>
                <span className="text-[9px] text-emerald-400 font-mono mt-1 block font-bold">{selectedRegion.compliance.audits}</span>
              </div>
              <div className="p-3 bg-slate-950 border border-gray-900 rounded-lg">
                <span className="text-[9px] font-mono text-gray-500 uppercase block">Regional Infrastructure Datacenter</span>
                <strong className="text-xs font-mono text-zinc-300 mt-0.5 block leading-normal">{selectedRegion.compliance.podLocation}</strong>
                <span className="text-[9px] text-gray-500 font-mono mt-1 block">Full metadata residency guarantees</span>
              </div>
              <span className="md:col-span-1 block text-left">
                <span className="text-[9px] font-mono text-gray-500 uppercase block mb-1">Safety Constraints</span>
                <ul className="space-y-1">
                  {selectedRegion.compliance.safetyRules.slice(0, 2).map((rule, i) => (
                    <li key={i} className="text-[10px] text-gray-400 font-mono leading-relaxed truncate" title={rule}>
                      • {rule}
                    </li>
                  ))}
                </ul>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 12-Month Expansion Timeline Diagram */}
      <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-lg space-y-5">
        <div className="border-b border-gray-800 pb-2.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <div>
              <h4 className="text-sm font-semibold text-white font-display">12-Month Global Expansion Timeline</h4>
              <p className="text-[10px] text-gray-400">Chronological rollout execution phases targeting strategic territory scale.</p>
            </div>
          </div>
          <span className="text-[9px] font-mono font-bold uppercase bg-[#818cf8]/10 text-[#818cf8] border border-[#818cf8]/20 px-2.5 py-0.5 rounded">
            Roadmap View
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Phase 1 */}
          <div className="bg-slate-950/50 border border-gray-900 p-4 rounded-lg space-y-2.5 relative group hover:border-[#818cf8]/30 transition-all">
            <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
              Months 1 - 3
            </div>
            <span className="text-[9px] font-mono text-[#818cf8] uppercase tracking-wider font-bold">PHASE 1: Sovereignty Foundation</span>
            <h5 className="text-xs font-bold text-white font-display pt-0.5">NA / EU Pod Deployment</h5>
            <p className="text-[10.5px] text-gray-400 leading-relaxed font-mono">
              Achieve formal **SOC 2 Type II audit report** validation for US pipeline accounts. Provision Frankfurt AWS **eu-central-1 Isolated Pod** and prepare German/French NLG tone registers.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="bg-slate-950/50 border border-gray-900 p-4 rounded-lg space-y-2.5 relative group hover:border-[#818cf8]/30 transition-all">
            <div className="absolute top-3 right-3 text-[10px] font-mono text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded">
              Months 4 - 6
            </div>
            <span className="text-[9px] font-mono text-[#818cf8] uppercase tracking-wider font-bold">PHASE 2: Sovereign Advisory Setup</span>
            <h5 className="text-xs font-bold text-white font-display pt-0.5">GCC Node & JPY Keigo</h5>
            <p className="text-[10.5px] text-gray-400 leading-relaxed font-mono">
              Build UAE regional database systems in local certified private clouds (Moro Hub/G42). Launch Japanese Keigo-register language optimization, and integrate multi-currency Stripe checkouts.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="bg-slate-950/50 border border-gray-900 p-4 rounded-lg space-y-2.5 relative group hover:border-emerald-500/30 transition-all">
            <div className="absolute top-3 right-3 text-[10px] font-mono text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded font-mono">
              Months 7 - 12
            </div>
            <span className="text-[9px] font-mono text-[#818cf8] uppercase tracking-wider font-bold">PHASE 3: Channel Scaling & VAR</span>
            <h5 className="text-xs font-bold text-white font-display pt-0.5">Global Agency Reseller Scale</h5>
            <p className="text-[10.5px] text-gray-400 leading-relaxed font-mono">
              Onboard and certify 10 Value-Added Resellers (VARs) in DACH and Asia-Pacific. Connect certified CRM sync drivers for HubSpot/Salesforce, targeting **45% global ARR contribution** by Year 2.
            </p>
          </div>

        </div>

        <div className="p-3 bg-slate-950 border border-gray-900 rounded-lg text-center text-[10px] text-gray-500 font-mono">
          All timeline milestones align strictly with the official **Global Expansion Roadmap** compiled in our corporate documentation directory.
        </div>
      </div>
    </div>
  );
}
