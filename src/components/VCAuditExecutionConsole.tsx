import React, { useState } from 'react';
import { 
  ShieldAlert, AlertTriangle, Cpu, TrendingUp, Users, Target, 
  BarChart2, CheckCircle2, Ban, Clock, Hourglass, EyeOff, 
  Gauge, Activity, Zap, Layers, RefreshCw, Send, Sparkles, BookOpen
} from 'lucide-react';

// Interfaces for our systematic data
interface FailurePoint {
  id: number;
  title: string;
  category: 'Tech Stack' | 'Outbox deliverability' | 'Unit Economics' | 'Ops Friction';
  criticality: 'CATASTROPHIQUE' | 'ÉLEVÉ' | 'MODÉRÉ';
  mechanics: string;
  brutalRemedial: string;
}

interface CoreAssumption {
  id: number;
  area: 'Tech' | 'GTM' | 'Finance' | 'Ops';
  statement: string;
  fragilityIndex: number; // 1-10 (high is fragile)
  implication: string;
}

interface CoreRisk {
  id: number;
  riskName: string;
  impactType: 'Infrastructure' | 'Regulatory' | 'Revenue' | 'Attrition';
  likelihood: 'Presumed' | 'Probable' | 'Possible';
  severity: 'Fatal' | 'Major' | 'Manageable';
  technicalExposure: string;
  actionableHedging: string;
}

interface LeverageOpportunity {
  id: number;
  tag: 'Product hack' | 'Partnerships' | 'Tech arbitrage' | 'Cost-cut';
  title: string;
  leverageFactor: string; // e.g. "5.5x"
  strategyDescription: string;
  expectedTraction: string;
}

interface RoadmapItem {
  id: number;
  name: string;
  action: 'BUILD' | 'DELAY' | 'IGNORE';
  rationale: string;
  timelineEstimate?: string;
  savedRunwayCost?: string;
}

// -------------------------------------------------------------
// EXACTLY 20 FAILURE POINTS (BRUTALLY HONEST CTO PERSPECTIVE)
// -------------------------------------------------------------
const FAILURE_POINTS: FailurePoint[] = [
  {
    id: 1,
    title: "Cold domain pool configuration errors",
    category: "Outbox deliverability",
    criticality: "CATASTROPHIQUE",
    mechanics: "Configuring SPF, DKIM, DMARC alignment scripts manually by the customer results in a 65% failure rate, causing instantaneous auto-flagging by Google Workspace spam filters.",
    brutalRemedial: "Construct real-time background DNS validator tests that block raw outreach tasks until proper SPF/DKIM flags are returned from authoritative nameservers."
  },
  {
    id: 2,
    title: "Gmail/Outlook API rate quota exhaustion",
    category: "Tech Stack",
    criticality: "CATASTROPHIQUE",
    mechanics: "Relying on direct OAuth2 access tokens to execute bulk sends on early personal accounts leads to total suspension in under 48 hours for breaching daily sending quotas.",
    brutalRemedial: "Abandon raw APIs. Setup standard transactional SMTP routing gateways supplemented with automated SMTP round-robin configurations."
  },
  {
    id: 3,
    title: "Dynamic variable injection memory leaks",
    category: "Tech Stack",
    criticality: "ÉLEVÉ",
    mechanics: "Parsing thousands of dynamic template nodes concurrently inside stateful client-side UI threads freezes customer dashboards during high-volume preview loads.",
    brutalRemedial: "Offload string pattern-matching and LLM token pre-computations entirely to server-side workers; deliver paginated JSON previews only."
  },
  {
    id: 4,
    title: "IP Blocklist aggregation via shared subnets",
    category: "Outbox deliverability",
    criticality: "CATASTROPHIQUE",
    mechanics: "Early tier tenants sharing outbound Node IPs will pollute the deliverability scores of premium tier accounts when one tenant blasts raw scrapings.",
    brutalRemedial: "Enforce strict tenant-by-tenant SMTP workspace segmentation. Provision isolated, dedicate Elastic IPs for enterprise portfolios."
  },
  {
    id: 5,
    title: "Double-billing state synchronization lag",
    category: "Unit Economics",
    criticality: "ÉLEVÉ",
    mechanics: "When raw webhooks fail to return payment events instantly from Stripe, concurrent user pipelines continue dispatching outreach without active credits.",
    brutalRemedial: "Implement a centralized atomic lock middleware verifying active credit status on the backend Redis layer before executing cron-based outreach runs."
  },
  {
    id: 6,
    title: "B2B contact scraper endpoint deprecation",
    category: "Tech Stack",
    criticality: "ÉLEVÉ",
    mechanics: "Relying on visual DOM-scraping for LinkedIn or CRMs without official SDK coverage breaks background pipelines the minute target layouts shift.",
    brutalRemedial: "Pivot immediately to double-redundant structured proxy APIs (e.g. Proxycurl/Cognism) with fallback queuing mechanisms."
  },
  {
    id: 7,
    title: "Un-scrubbed PII leading to prompt injection",
    category: "Tech Stack",
    criticality: "MODÉRÉ",
    mechanics: "Passing raw scraped raw HTML bio snippets to Gemini without cleaning exposes the generation backend to payload injection risks.",
    brutalRemedial: "Run all scraped input through strict regex sanitization modules, stripping out HTML brackets, script characters, and suspicious commands."
  },
  {
    id: 8,
    title: "Unrealistic cold email response rates",
    category: "Unit Economics",
    criticality: "ÉLEVÉ",
    mechanics: "Model assumes conversion from cold email remains static at 2.5%, ignoring fatigue, leading to rapidly shrinking unit margins as list quality decays.",
    brutalRemedial: "Integrate automatic list replenishment cues and dynamic copy-variant rotation indexes directly into tenant dashboards."
  },
  {
    id: 9,
    title: "Asynchronous webhook retry fatigue",
    category: "Tech Stack",
    criticality: "MODÉRÉ",
    mechanics: "Repeatedly calling failed customer webhooks without exponential backoffs exhausts the Node.js event pool, causing global platform-wide lag on critical requests.",
    brutalRemedial: "Migrate webhook delivery pipelines to BullMQ or basic RabbitMQ queues with exponential backoff capping at 4 retry attempts."
  },
  {
    id: 10,
    title: "SDR proxy domain registration limits",
    category: "Outbox deliverability",
    criticality: "ÉLEVÉ",
    mechanics: "Registering 50+ lookalike domains under a single registrar account within 1 hour signals high-velocity fraudulent behavior, causing immediate domain holds.",
    brutalRemedial: "Build API integrations with multi-registrar endpoints to scatter registrations through GoDaddy, Namecheap, and Porkbun dynamically."
  },
  {
    id: 11,
    title: "Over-reliance on non-cached database lookups",
    category: "Tech Stack",
    criticality: "MODÉRÉ",
    mechanics: "Querying contact histories continuously inside high-frequency cron campaigns results in DB connection pool starvation.",
    brutalRemedial: "Implement a 24-hour Redis caching layer for active CRM contacts; flush state asynchronously to the DB in micro-batches."
  },
  {
    id: 12,
    title: "Manual onboarding bottleneck",
    category: "Ops Friction",
    criticality: "ÉLEVÉ",
    mechanics: "Guiding users manually through SPF configuration blocks limits the operations team to under 5 active setup onboardings per engineer per day.",
    brutalRemedial: "Construct automated TXT record checking APIs displaying live configuration errors visual indicator guides on screen."
  },
  {
    id: 13,
    title: "Unregulated bulk scraping throttling by LinkedIn",
    category: "Tech Stack",
    criticality: "ÉLEVÉ",
    mechanics: "Scraping profiles without rate limits triggers browser cookie flags, burning valuable tenant proxy credentials instantly.",
    brutalRemedial: "Enforce dynamic random delay loops (between 45-120 seconds) on background scraping scripts to mimic real human patterns."
  },
  {
    id: 14,
    title: "Inflexible flat-tier pricing models",
    category: "Unit Economics",
    criticality: "MODÉRÉ",
    mechanics: "Early users consume high computational GPU tokens without paying margins, causing negative contribution margins on cheap tiers.",
    brutalRemedial: "Transition to usage-based pricing models where users buy separate dynamic 'credit packages' specifically for LLM-based first-line generation."
  },
  {
    id: 15,
    title: "Spam feedback loops causing main domain blocklists",
    category: "Outbox deliverability",
    criticality: "CATASTROPHIQUE",
    mechanics: "A single tenant sending reckless, high-volume spam without recipient-initiated unsubscribe links blacklists our central domain's MX records.",
    brutalRemedial: "Enforce a mandatory system-wide footer opt-out link on all outbound emails, with instant, non-negotiable auto-unsubscribe queues."
  },
  {
    id: 16,
    title: "Customer Support ticket volume overload",
    category: "Ops Friction",
    criticality: "MODÉRÉ",
    mechanics: "Highly complex DNS setup questions result in endless support requests, clogging engineers with basic domain routing diagnostics.",
    brutalRemedial: "Embed a dynamic deliverability troubleshooter widget on-screen that self-checks and flags exact required changes."
  },
  {
    id: 17,
    title: "Stateful task runner failure on reboot",
    category: "Tech Stack",
    criticality: "ÉLEVÉ",
    mechanics: "Sustaining ongoing campaigns inside memory variables means server deployment cycles will crash currently active outbound sequences, breaking target state logs.",
    brutalRemedial: "Store outreach jobs as persistent database transactions, enabling dynamic server startups to pick up immediately where they left off."
  },
  {
    id: 18,
    title: "Inaccurate email enrichment databases",
    category: "Unit Economics",
    criticality: "ÉLEVÉ",
    mechanics: "Relying on cheap, outdated CSV contact databases raises email bounce rates above 15%, causing Gmail to flag entire proxy sending networks.",
    brutalRemedial: "Synthesize real-time SMTP handshake validators (e.g. Hunter/NeverBounce API proxies) to purge bad records before outbound attempts."
  },
  {
    id: 19,
    title: "Weak session tokens on tenant isolation",
    category: "Tech Stack",
    criticality: "CATASTROPHIQUE",
    mechanics: "Poor API endpoint scoping allows tenant A to fetch lead contact lists of tenant B by tweaking query ID parameters via request consoles.",
    brutalRemedial: "Enforce absolute PostgreSQL Row Level Security (RLS) bound strictly with secure JWT tenant scopes parsed on every single query."
  },
  {
    id: 20,
    title: "Customer churn due to slow content freshness",
    category: "Ops Friction",
    criticality: "MODÉRÉ",
    mechanics: "Failing to refresh outbound copy strategies causes users to copy outdated templates, leading to declining response curves over 90 days.",
    brutalRemedial: "Release 5 new structured target-segmented outreach sequences every month curated automatically by top-performing GTM experts."
  }
];

// -------------------------------------------------------------
// EXACTLY 20 CORE ASSUMPTIONS (CEO PERSPECTIVE)
// -------------------------------------------------------------
const CORE_ASSUMPTIONS: CoreAssumption[] = [
  { id: 1, area: "Tech", statement: "Dynamic first-line prompt generation returns useful content without manual proofreading.", fragilityIndex: 8, implication: "If output contains AI hallucinations, customer campaigns suffer high spam feedback signals." },
  { id: 2, area: "GTM", statement: "B2B SaaS founders will comfortably pay $350/mo for email outreach automation.", fragilityIndex: 6, implication: "Will struggle to cross early MVP barrier if early builders lack proper advertising budgets." },
  { id: 3, area: "Finance", statement: "Average Customer Lifetime Value (LTV) exceeds $3,600 over a 12-month window.", fragilityIndex: 7, implication: "If churn triggers at month 3, high CAC of outbound channels will rapidly deplete company reserves." },
  { id: 4, area: "Tech", statement: "Standard proxy domain registrars will not ban bulk domain lookalike setups.", fragilityIndex: 9, implication: "Bulk registrar freezes would instantly break customer scaling architectures." },
  { id: 5, area: "GTM", statement: "Marketing agencies prefer using our master white-label panel over existing giants.", fragilityIndex: 5, implication: "Fierce legacy loyalty requires deeper, high-touch sales strategies to drive migration." },
  { id: 6, area: "Ops", statement: "A support team of 1 junior team member is capable of managing 1,000 active clients.", fragilityIndex: 8, implication: "Unchecked SPF/DMARC routing tickets could cause severe engineering fatigue." },
  { id: 7, area: "Tech", statement: "SMTP proxy APIs can dynamically scale to process 500,000 outgoing emails daily.", fragilityIndex: 7, implication: "May face latency choke points without scalable horizontal container clustering." },
  { id: 8, area: "GTM", statement: "Organic footer watermarks alone deliver a 1.25x viral growth coefficient monthly.", fragilityIndex: 6, implication: "Growth decelerates severely if buyers opt to pay small upgrade fees to wipe watermarks." },
  { id: 9, area: "Finance", statement: "Customer Acquisition Cost (CAC) through cold SDR automation scales below $120.", fragilityIndex: 5, implication: "Paid ads or high commissions will eat into SaaS contribution margins." },
  { id: 10, area: "Tech", statement: "LinkedIn scraping security algorithms will not implement full face-captcha verification.", fragilityIndex: 8, implication: "Automatic enrichment loops fail if profile scraping becomes completely locked." },
  { id: 11, area: "Ops", statement: "Founder-led sales cycles scale effectively without full-time dedicated SDR reps.", fragilityIndex: 6, implication: "Founder becomes GTM bottleneck, halting progress past $15k MRR." },
  { id: 12, area: "Tech", statement: "Third-party proxy routing channels do not log or store sensitive tenant emails.", fragilityIndex: 6, implication: "Security breaches inside proxy pipes damage company integrity." },
  { id: 13, area: "GTM", statement: "B2B sales teams actually read deliverability health reports on their consoles.", fragilityIndex: 4, implication: "If ignored, users complain about low responses blindly without rectifying setup errors." },
  { id: 14, area: "Finance", statement: "Server infrastructure costs scale linearly without exponential database sprawl.", fragilityIndex: 5, implication: "Expensive Redis/PostgreSQL instances require structured caching strategies early." },
  { id: 15, area: "Tech", statement: "LLM APIs (such as Gemini 1.5/2.5) always maintain 99.9% operational lifespans.", fragilityIndex: 4, implication: "External outages halt automatic personalization runs; requires robust local retry states." },
  { id: 16, area: "Ops", statement: "Sovereign marketing consultants will willingly co-promote our tools.", fragilityIndex: 5, implication: "High partner payouts required to incentivize consistent consultant recommendation." },
  { id: 17, area: "GTM", statement: "The outbound copywriting templates remain relevant across multiple verticals.", fragilityIndex: 7, implication: "Varying success rates force customization; needs localized vertical options." },
  { id: 18, area: "Tech", statement: "Double-blind PII scrubbers accurately strip delicate phone numbers.", fragilityIndex: 8, implication: "GDPR compliance checks fail if private cell phone details leak into open templates." },
  { id: 19, area: "Finance", statement: "Premium account tier conversions from the free-tier audits hit 10% within 30 days.", fragilityIndex: 6, implication: "Low conversion rates result in high database load with zero premium user return." },
  { id: 20, area: "Tech", statement: "Standard PostgreSQL databases support high-frequency JSON metadata reads.", fragilityIndex: 5, implication: "Extensive custom analytics fields require migrations to NoSQL or Columnar storage." }
];

// -------------------------------------------------------------
// EXACTLY 20 CORE EXECUTION RISKS (VC PARTNER PERSPECTIVE)
// -------------------------------------------------------------
const CORE_RISKS: CoreRisk[] = [
  {
    id: 1,
    riskName: "Gmail Outbox strict policy update",
    impactType: "Regulatory",
    likelihood: "Presumed",
    severity: "Fatal",
    technicalExposure: "Google updating strict machine-learning filters to blacklist cold outreach domains displaying identical outbound telemetry across SMTP brokers.",
    actionableHedging: "Enforce strict, random content variation loops (spintax) combined with unique sender IP spacing."
  },
  {
    id: 2,
    riskName: "Unchecked database storage cost escalation",
    impactType: "Infrastructure",
    likelihood: "Probable",
    severity: "Major",
    technicalExposure: "Storing full JSON payload history logs for every outgoing message can fill standard DB volumes up to 80GB within 4 active scaling months.",
    actionableHedging: "Offload old delivery logs (30+ days) to cheaper cloud buckets (AWS S3 / Google Cloud Storage)."
  },
  {
    id: 3,
    riskName: "High CAC relative to short customer lifespan",
    impactType: "Revenue",
    likelihood: "Probable",
    severity: "Fatal",
    technicalExposure: "SDR automation setup costs exceed early ARPU if users churn under 45 days after launching initial pilots.",
    actionableHedging: "Transition to 3-month minimum commitment models or require upfront onboarding setup fees."
  },
  {
    id: 4,
    riskName: "GDPR compliance & regulatory penalty threats",
    impactType: "Regulatory",
    likelihood: "Possible",
    severity: "Fatal",
    technicalExposure: "Executing unsolicited bulk sales reachouts to EU-based enterprises without prior opt-ins or clear legitimate interest checks.",
    actionableHedging: "Built-in geography-IP detection that filters out EU leads unless manually marked compliant by legal teams."
  },
  {
    id: 5,
    riskName: "Platform-wide SMTP proxy provider outage",
    impactType: "Infrastructure",
    likelihood: "Possible",
    severity: "Major",
    technicalExposure: "Relying on a single SMTP gateway leaves campaigns stranded if that provider suffers physical downtime.",
    actionableHedging: "Implement dual-provider failovers that automatically route queues through alternate services (e.g. Resend and Mailgun)."
  },
  {
    id: 6,
    riskName: "API key exposure via client-side leakages",
    impactType: "Infrastructure",
    likelihood: "Probable",
    severity: "Fatal",
    technicalExposure: "Accidentally exposing secret SDK keys (Stripe, scraping proxies) due to developers placing keys in client-facing components.",
    actionableHedging: "Implement strict environment validation checks that crash the applet on startup if API keys are client-facing."
  },
  {
    id: 7,
    riskName: "Lead database data rot",
    impactType: "Revenue",
    likelihood: "Probable",
    severity: "Manageable",
    technicalExposure: "Storing old contact details that became outdated due to professional job attrition rates (estimated 3% monthly attrition).",
    actionableHedging: "Trigger active API checks to scrape target profiles instantly prior to dispatching outreach campaigns."
  },
  {
    id: 8,
    riskName: "Team burnout on high-density manual tasks",
    impactType: "Attrition",
    likelihood: "Probable",
    severity: "Major",
    technicalExposure: "Engineers spending over 4 hours daily solving basic customer domain registration and routing errors.",
    actionableHedging: "Build robust help guides and auto-routing checks to scale support requests without human intervention."
  },
  {
    id: 9,
    riskName: "Competitor copycat features breaking GTM moat",
    impactType: "Revenue",
    likelihood: "Possible",
    severity: "Major",
    technicalExposure: "Legacy tools adding simple bulk template personalizers, pricing us out on high-tier deals.",
    actionableHedging: "Double-down on advanced dynamic features like real-time deliverability testing and custom HubSpot synchronization."
  },
  {
    id: 10,
    riskName: "Stripe billing gateway disputes escalation",
    impactType: "Revenue",
    likelihood: "Possible",
    severity: "Fatal",
    technicalExposure: "Angry recipients reporting users to Stripe, leading to high chargeback rates and merchant account suspension.",
    actionableHedging: "Force rigorous 'Complaints Limits'—banning users whose campaigns generate more than 1% spam reports."
  },
  {
    id: 11,
    riskName: "Slow database indexing on multi-tenant views",
    impactType: "Infrastructure",
    likelihood: "Probable",
    severity: "Manageable",
    technicalExposure: "Standard queries take 4+ seconds to load when list sizes cross 1,000,000 combined contact records.",
    actionableHedging: "Audit and implement composite indices on unique tenant IDs and status variables."
  },
  {
    id: 12,
    riskName: "Inadequate multi-language generation scaling",
    impactType: "Revenue",
    likelihood: "Possible",
    severity: "Manageable",
    technicalExposure: "First lines generated in non-English languages contain awkward layout structures and incorrect formal grammar.",
    actionableHedging: "Feed local-compliant copywriting prompt guidelines directly to the background LLM layer based on target geolocation."
  },
  {
    id: 13,
    riskName: "Key-person risk inside early development",
    impactType: "Attrition",
    likelihood: "Possible",
    severity: "Major",
    technicalExposure: "A single engineer maintaining ownership of entire multi-tenant server configurations and script deployments.",
    actionableHedging: "Establish strict IaC configuration files (Dockerfile/Terraform) and maintain visual internal workspace reviews weekly."
  },
  {
    id: 14,
    riskName: "Unchecked user subscription fraud pipelines",
    impactType: "Revenue",
    likelihood: "Probable",
    severity: "Major",
    technicalExposure: "Fraudulent buyers using stolen credit cards to run massive outreach pipelines before Stripe fraud systems flag the cards.",
    actionableHedging: "Enforce strict phone validation and human checks on active user accounts registering for trials."
  },
  {
    id: 15,
    riskName: "High GPU/LLM infrastructure processing costs",
    impactType: "Infrastructure",
    likelihood: "Probable",
    severity: "Manageable",
    technicalExposure: "Executing complex multi-step prompt chains drives server token costs to eat 40% of standard ARPU.",
    actionableHedging: "Cache generation parameters and transition minor templates to smaller, optimized model layers."
  },
  {
    id: 16,
    riskName: "DNS server configuration pollution",
    impactType: "Infrastructure",
    likelihood: "Possible",
    severity: "Major",
    technicalExposure: "Customers pointing domains incorrectly, causing routing crashes or configuration loops.",
    actionableHedging: "Verify live configurations against local DNS caches before displaying instructions."
  },
  {
    id: 17,
    riskName: "Legal litigation by targeted enterprise firms",
    impactType: "Regulatory",
    likelihood: "Possible",
    severity: "Fatal",
    technicalExposure: "High-volume outreach targeting security-validated enterprises, triggering physical cease-and-desist filings.",
    actionableHedging: "Integrate automatic domain blacklists to filter out high-risk domains like financial institutions automatically."
  },
  {
    id: 18,
    riskName: "SDR team attrition due to lack of standard CRMs",
    impactType: "Attrition",
    likelihood: "Possible",
    severity: "Manageable",
    technicalExposure: "Users abandoning the tool because managing active conversations is clumsy compared to standard HubSpot layouts.",
    actionableHedging: "Provide reliable CRM sync webhooks to push active replies instantly to client hubs."
  },
  {
    id: 19,
    riskName: "Platform performance degradation during cron runs",
    impactType: "Infrastructure",
    likelihood: "Probable",
    severity: "Major",
    technicalExposure: "Simultaneous outreach cron campaigns at 9:00 AM daily overload the central task runner threads.",
    actionableHedging: "Distribute outreach timers dynamically over a 90-minute window rather than on strict hourly points."
  },
  {
    id: 20,
    riskName: "Saturated market fatigue across B2B outreach",
    impactType: "Revenue",
    likelihood: "Presumed",
    severity: "Major",
    technicalExposure: "Prospects blocking generic outboxes, reducing active reply metrics across the entire board.",
    actionableHedging: "Integrate highly unique formats like dynamic video thumbnails, image cards, and personalized whitepaper downloads."
  }
];

// -------------------------------------------------------------
// EXACTLY 20 HIGH-LEVERAGE OPPORTUNITIES
// -------------------------------------------------------------
const REVENUE_OPPORTUNITIES: LeverageOpportunity[] = [
  { id: 1, tag: "Tech arbitrage", title: "Scale with local edge models (Ollama/Llama-CPP)", leverageFactor: "12x", strategyDescription: "Offload 30% of basic summarization and parsing tasks from expensive external APIs to local edge-deployed LLM nodes.", expectedTraction: "Saves up to $8,000/mo in raw server token infrastructure costs." },
  { id: 2, tag: "Product hack", title: "SDR viral footnote templates config", leverageFactor: "4.5x", strategyDescription: "Automatically display clean badges under outreach footnotes displaying high-priority SPF/DKIM validation reports.", expectedTraction: "Incentivizes other founders to sign up and check their own domain deliverability parameters." },
  { id: 3, tag: "Partnerships", title: "White-label options for cold-outreach agencies", leverageFactor: "8.5x", strategyDescription: "Allow B2B lead generation agencies to fully rebrand our platform console to upsell custom portals to premium clients.", expectedTraction: "Instantly adds multi-tenant bundles averaging 10-30 seats each with zero marketing spend." },
  { id: 4, tag: "Cost-cut", title: "Automate DNS configurations via partner APIs", leverageFactor: "3.2x", strategyDescription: "Partner with cloud DNS hosts to allow customers to provision and align proxy domains in exactly 1 click.", expectedTraction: "Reduces domain setup support requests from 40% of users down to 5%." },
  { id: 5, tag: "Product hack", title: "Automate lead tracking via browser extensions", leverageFactor: "5.1x", strategyDescription: "Provide an elegant Chrome extension that scrapes and enriches LinkedIn contacts in exactly 1 click.", expectedTraction: "Bypasses slow background scrapers and drives daily active user engagement logs." },
  { id: 6, tag: "Partnerships", title: "Co-selling campaigns with proxy server providers", leverageFactor: "2.8x", strategyDescription: "Pre-bundle discounted proxied domains with direct billing inside our subscription packages.", expectedTraction: "Secures recurring revenue splits from partner registrars." },
  { id: 7, tag: "Tech arbitrage", title: "Run parallel async bulk deliveries on workers", leverageFactor: "6.0x", strategyDescription: "Migrate raw dispatch requests to Cloudflare Workers or serverless handlers running in parallel.", expectedTraction: "Supports scaling from 10k to 500k emails daily with zero backend slowdown." },
  { id: 8, tag: "Product hack", title: "Embed interactive deliverability grades in blogs", leverageFactor: "4.0x", strategyDescription: "Create a free public SEO auditing tool that diagnostic-checks and ranks recipient domain wellness parameters.", expectedTraction: "Generates high volume of B2B organic search-to-onboarding transitions." },
  { id: 9, tag: "Cost-cut", title: "Intelligent auto-pause parameters on low response", leverageFactor: "2.2x", strategyDescription: "Trigger automatic campaign pauses if response rates drop under 0.2%, warning users prior to domain damage.", expectedTraction: "Drastically limits customer proxy domain bans, saving setup costs." },
  { id: 10, tag: "Product hack", title: "Interactive AI outbound copywriter editor", leverageFactor: "3.5x", strategyDescription: "Provide live inline highlight diagnostics of words likely to trigger spam checkers (such as 'free', 'cash').", expectedTraction: "Helps users achieve better reply rates and boosts retention metrics." },
  { id: 11, tag: "Partnerships", title: "Affiliate marketplaces co-marketing programs", leverageFactor: "4.2x", strategyDescription: "Bundle software with top conversion classes hosted by high-profile sales and SDR influencers.", expectedTraction: "Unlocks high trusted user traffic volumes with zero upfront marketing overhead." },
  { id: 12, tag: "Cost-cut", title: "Consolidate active worker threads via Node-Clusters", leverageFactor: "1.8x", strategyDescription: "Maximize server performance limits by clustering background cron processing threads.", expectedTraction: "Cuts standard server hosting costs by 35% monthly in early stages." },
  { id: 13, tag: "Tech arbitrage", title: "Structure databases via partitioned schemas", leverageFactor: "5.0x", strategyDescription: "Partition raw customer database records strictly by tenant ID constraints.", expectedTraction: "Sustains 100ms request times even as global table sizes cross millions of indices." },
  { id: 14, tag: "Product hack", title: "AI-powered custom reply classification analytics", leverageFactor: "3.0x", strategyDescription: "Automatically label inbound replies as 'Interested', 'Out of Office', or 'Unsubscribe' via lightweight models.", expectedTraction: "Saves sales teams hours of manual ticket routing daily, driving tool stickiness." },
  { id: 15, tag: "Partnerships", title: "Direct HubSpot and Salesforce CRM partnerships", leverageFactor: "7.0x", strategyDescription: "Submit native applications to the enterprise CRM marketplace hubs.", expectedTraction: "Provides access to premium mid-market companies capable of paying $1,000+/mo." },
  { id: 16, tag: "Cost-cut", title: "Enforce pre-cached lead checking tools", leverageFactor: "2.5x", strategyDescription: "Validate lead parameters before triggering scrape requests to avoid scraping duplicates.", expectedTraction: "Cuts scrapers proxy spending by exactly 25% across global databases." },
  { id: 17, tag: "Product hack", title: "In-app gamified deliverability metrics board", leverageFactor: "3.8x", strategyDescription: "Encourage users to achieve 'A-grade' domain health by displaying streak badges on dashboards.", expectedTraction: "Promotes pride in list health and reduces overall tenant spam rates." },
  { id: 18, tag: "Tech arbitrage", title: "Automate server scaling via container thresholds", leverageFactor: "4.0x", strategyDescription: "Configure serverless setups to scale workers dynamically only when task queues match defined limits.", expectedTraction: "Avoids costly idle server runtime during quiet overnight cycles." },
  { id: 19, tag: "Partnerships", title: "University and incubator builder packages", leverageFactor: "2.0x", strategyDescription: "Offer free basic packages to early startup founders inside active business incubators.", expectedTraction: "Establishes brand loyalty early; routes early teams to premium tires as they scale." },
  { id: 20, tag: "Product hack", title: "One-click 'Swap Proxy Domain' options", leverageFactor: "5.5x", strategyDescription: "Incorporate quick domain swaps directly inside outboxes when email health metrics degrade.", expectedTraction: "Keeps outbound campaigns running smoothly with zero down duration cycles." }
];

// -------------------------------------------------------------
// ROADMAP PRIORITIZATIONS (BUILD, DELAY, IGNORE)
// -------------------------------------------------------------
const ROADMAP_ITEMS: RoadmapItem[] = [
  // Build Next (8 items)
  { id: 1, name: "Automated SPF/DKIM authorization verifier APIs", action: "BUILD", rationale: "Eliminates high manual support loads; blocks campaigns until DNS setup is authorized.", timelineEstimate: "7 Days", savedRunwayCost: "Saves 20% dev time" },
  { id: 2, name: "Dynamic multi-tenant SMTP SMTP routing engine", action: "BUILD", rationale: "Bypasses key-token API limits by distributing outreach across separate sender pools.", timelineEstimate: "10 Days", savedRunwayCost: "Mitigates early suspension" },
  { id: 3, name: "Spam checker inline editor widget", action: "BUILD", rationale: "Flags suspicious copy patterns (such as 'free', 'risk-free') before users send.", timelineEstimate: "5 Days", savedRunwayCost: "Lowers spam report rates" },
  { id: 4, name: "Bulk lead verification verification check", action: "BUILD", rationale: "Automatically purges invalid and dead domains before campaigns start.", timelineEstimate: "6 Days", savedRunwayCost: "Cuts bounce logs under 3%" },
  { id: 5, name: "Hubspot/Salesforce bi-directional webhook updates", action: "BUILD", rationale: "Unlocks high-value mid-market sales teams who require seamless sync.", timelineEstimate: "12 Days", savedRunwayCost: "Increases ARPU target limits" },
  { id: 6, name: "One-click 'Swap Proxy' auto-routing automation", action: "BUILD", rationale: "Automatically swaps out blocked domains from outboxes to keep campaigns live.", timelineEstimate: "8 Days", savedRunwayCost: "Minimizes lead dropouts" },
  { id: 7, name: "Multi-registrar APIs configuration script", action: "BUILD", rationale: "Distributes lookalike domain creations to keep registrars from banning profiles.", timelineEstimate: "9 Days", savedRunwayCost: "Secures domain pipelines" },
  { id: 8, name: "Client billing credit cap limits validation", action: "BUILD", rationale: "Blocks campaigns instantly once users exceed active credit quotas.", timelineEstimate: "4 Days", savedRunwayCost: "Stops unpaid usage leaks" },

  // Delay (6 items)
  { id: 9, name: "Custom localized LLM edge model scaling", action: "DELAY", rationale: "Engineering local Llama instances is distractingly complex for early stages.", timelineEstimate: "Postponed 4 Mo", savedRunwayCost: "Saves $15k dev budget" },
  { id: 10, name: "Affiliate system with Stripe Connect", action: "DELAY", rationale: "Manual referral code systems suffice for the first 100 paying customers.", timelineEstimate: "Postponed 3 Mo", savedRunwayCost: "Avoids stripe audit delays" },
  { id: 11, name: "Dynamic target video thumbnail generation", action: "DELAY", rationale: "Standard, clean text templates convert highly until saturation metrics change.", timelineEstimate: "Postponed 5 Mo", savedRunwayCost: "Reduces resource sprawl" },
  { id: 12, name: "Chrome LinkedIn profile scraper extension", action: "DELAY", rationale: "Direct CSV imports of enriched lists are robust enough for the MVP phase.", timelineEstimate: "Postponed 2 Mo", savedRunwayCost: "Saves immediate extension audit" },
  { id: 13, name: "Advanced multi-currency native localized billing", action: "DELAY", rationale: "Standard Stripe US Dollars configuration handles B2B buyers comfortably globally.", timelineEstimate: "Postponed 6 Mo", savedRunwayCost: "Avoids accounting overhead" },
  { id: 14, name: "Custom real-time desktop agent notification dashboard", action: "DELAY", rationale: "Basic, robust Discord/Slack notification webhooks satisfy users early.", timelineEstimate: "Postponed 3 Mo", savedRunwayCost: "Avoids maintaining desktop apps" },

  // Ignore (6 items)
  { id: 15, name: "Multiplayer shared workspace chat boards", action: "IGNORE", rationale: "Users do not need in-app messaging profiles to manage cold outbox metrics.", timelineEstimate: "PERMANENT DROPPED", savedRunwayCost: "Saves $12k dev waste" },
  { id: 16, name: "Interactive cosmic background audio synthesizers", action: "IGNORE", rationale: "Complete gimmick. B2B sales professionals want conversion, not background music.", timelineEstimate: "PERMANENT DROPPED", savedRunwayCost: "Saves $4k waste" },
  { id: 17, name: "Unrestricted free trial tiers with free domains", action: "IGNORE", rationale: "Attracts massive spammers and fraud, polluting our core proxy domain networks.", timelineEstimate: "PERMANENT DROPPED", savedRunwayCost: "Protects reputation score" },
  { id: 18, name: "In-app peer gamification ranks leaderboards", action: "IGNORE", rationale: "Enterprise outreach managers value data isolation, not sharing results with competitors.", timelineEstimate: "PERMANENT DROPPED", savedRunwayCost: "Avoids security concerns" },
  { id: 19, name: "Dynamic translation to 45 local global dialects", action: "IGNORE", rationale: "Clean English/Spanish variants cover 90% of our active premium GTM market metrics.", timelineEstimate: "PERMANENT DROPPED", savedRunwayCost: "Prevents token translation drain" },
  { id: 20, name: "Decentralized blockchain lead ownership logs", action: "IGNORE", rationale: "Over-engineered hype. Normal PostgreSQL with RLS is extremely secure and fast.", timelineEstimate: "PERMANENT DROPPED", savedRunwayCost: "Saves $25k consultant waste" }
];

export default function VCAuditExecutionConsole() {
  const [activePersona, setActivePersona] = useState<'vc' | 'cto' | 'ceo'>('vc');
  const [metricTab, setMetricTab] = useState<'fails' | 'assumptions' | 'risks' | 'opportunities' | 'priorities'>('priorities');
  
  // Interactive Risk Stress Test state parameters
  const [domainsToRegister, setDomainsToRegister] = useState<number>(30);
  const [warmupDaysCount, setWarmupDaysCount] = useState<number>(14);
  const [optOutFooterConfigured, setOptOutFooterConfigured] = useState<boolean>(true);
  const [proxyRotationsEnabled, setProxyRotationsEnabled] = useState<boolean>(true);
  const [validateBouncesEnabled, setValidateBouncesEnabled] = useState<boolean>(true);

  // Dynamic calculated resilience metrics
  const getStressTestGrade = () => {
    let score = 100;
    
    // Penalize low warmup period
    if (warmupDaysCount < 7) score -= 35;
    else if (warmupDaysCount < 14) score -= 15;
    
    // Penalize large registration waves without dispersion
    if (domainsToRegister > 25) score -= 20;
    
    // Major penalty for skipping opt-out setups
    if (!optOutFooterConfigured) score -= 30;
    
    // Penalty for skipping address validations
    if (!validateBouncesEnabled) score -= 15;
    
    // Penalty for lack of proxy rotation configurations
    if (!proxyRotationsEnabled) score -= 15;

    score = Math.max(0, score);

    if (score >= 90) return { grade: 'A+ SECURE', label: 'Institutional Grade', color: 'text-emerald-400', banner: 'bg-emerald-500/10 border-emerald-500/3s', advice: 'Your technical deliverability is decoupled from common risk indicators. Outboxes can comfortably scale targeting.' };
    if (score >= 75) return { grade: 'B STABLE', label: 'Moderate Exposure', color: 'text-blue-400', banner: 'bg-blue-500/10 border-blue-500/20', advice: 'Acceptable compliance. We recommend extending your proxy domain warm-up duration to 14 days minimum.' };
    if (score >= 50) return { grade: 'C VULNERABLE', label: 'High Fragility', color: 'text-yellow-400', banner: 'bg-yellow-500/10 border-yellow-500/20', advice: 'Failure risks detected! Add mandatory unsubscribe footers and clean lead databases prior to sending.' };
    return { grade: 'D- FAIL-ZONE', label: 'Spam Blacklist Imminent', color: 'text-red-400', banner: 'bg-red-500/10 border-red-500/20', advice: 'DANGER! Sending bulk emails with short domain warmups and no opt-out link will trigger immediate provider blocks.' };
  };

  const currentGrade = getStressTestGrade();

  return (
    <div id="vc-brutally-honest-audit" className="space-y-8 animate-fadeIn text-slate-100 font-sans">
      
      {/* EXECUTIVE BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
            UNBIASED STRATEGIC & TECHNICAL AUDIT PANEL
          </div>
          <h1 className="text-2xl font-bold font-display text-white mt-1">
            EffectiveBuzz Execution Deep-Dive
          </h1>
          <p className="text-xs text-gray-400 max-w-2xl mt-1 leading-relaxed">
            Eliminating vision pitches, roadmaps, and marketing fluff. A realistic analysis of high-risk failure nodes, hidden assumptions, and technical execution choices.
          </p>
        </div>

        {/* Persona Selector Row */}
        <div className="flex items-center bg-zinc-950 p-1 border border-zinc-850 rounded-xl">
          {[
            { id: 'vc', label: 'VC Partner', icon: Users, desc: 'Capital & Margin' },
            { id: 'cto', label: 'CTO Audit', icon: Cpu, desc: 'Technical Scale' },
            { id: 'ceo', label: 'CEO Focus', icon: Target, desc: 'Execution Priority' }
          ].map((persona) => {
            const Icon = persona.icon;
            return (
              <button
                key={persona.id}
                onClick={() => setActivePersona(persona.id as any)}
                className={`py-1.5 px-3.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activePersona === persona.id
                    ? 'bg-red-500/10 border border-red-500/30 text-red-400 shadow'
                    : 'text-zinc-400 hover:text-white border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{persona.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* COGNITIVE PERSONA SUMMARY REPORT */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-805 p-6 rounded-2xl">
        <div className="flex items-center gap-3 border-b border-zinc-850 pb-4">
          <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-red-400">
            {activePersona === 'vc' && <Users className="w-5 h-5" />}
            {activePersona === 'cto' && <Cpu className="w-5 h-5" />}
            {activePersona === 'ceo' && <Target className="w-5 h-5" />}
          </div>
          <div>
            <span className="font-mono text-[9px] text-zinc-500 block uppercase tracking-wider font-bold">
              Active Auditor Perspective
            </span>
            <h3 className="text-base font-semibold text-white">
              {activePersona === 'vc' && 'Sovereign VC Lead: "Where Capital Meets Low-Hanging Fruit"'}
              {activePersona === 'cto' && 'No-Fluff Chief Technology Officer: "Reliability & Scalable Pipes"'}
              {activePersona === 'ceo' && 'Operation-Focused Chief Executive officer: "Extreme Focus, Zero Waste"'}
            </h3>
          </div>
        </div>

        <div className="mt-4 text-xs font-serif leading-relaxed text-zinc-300 space-y-3 p-4 bg-zinc-950/40 rounded-xl border border-zinc-850">
          {activePersona === 'vc' && (
            <>
              <p>
                <strong className="text-red-400">"The GTM plan looks solid, but SaaS is a game of retention. "</strong> If you burn through domain networks or trigger recipient disputes early, your CAC will soar and LTV will decay within 60 days. The transactional metrics look nice, but you must prevent early users from using your proxies to spam bulk lists.
              </p>
              <p className="font-mono text-[11px] text-zinc-400">
                🚀 <strong className="text-white">Bottom line requirement:</strong> Enforce strict Row-Level-Security, setup payment-integrated Stripe credit boundaries instantly, and ban spammers before they damage the shared sending IP pool.
              </p>
            </>
          )}

          {activePersona === 'cto' && (
            <>
              <p>
                <strong className="text-red-400">"Your background task timers are the largest points of failure. "</strong> Relying on synchronous Node.js processes to execute thousands of dynamic outreach previews will block key event loops. When webhooks lag or LinkedIn scraper APIs update their HTML structures, the pipelines will halt.
              </p>
              <p className="font-mono text-[11px] text-zinc-400">
                🔧 <strong className="text-white">Bottom line requirement:</strong> Offload parsing tasks to backend queues like BullMQ or serverless edge hosts. Embed automatic DNS check routines inside dashboards so users troubleshoot setup errors on their own.
              </p>
            </>
          )}

          {activePersona === 'ceo' && (
            <>
              <p>
                <strong className="text-red-400">"Focus is our premium currency; we must stop building toys. "</strong> Gamified scoreboards, cosmic custom soundscapes, and decentralized blockchain histories add exactly nothing to critical customer conversions. We need conversion rates, fast setup, and low setup friction.
              </p>
              <p className="font-mono text-[11px] text-zinc-400">
                🎯 <strong className="text-white">Bottom line requirement:</strong> Implement SPF alignment checkers and proxy registration wizards immediately. Postpone edge model compilations until we cross $25k in MRR.
              </p>
            </>
          )}
        </div>
      </div>

      {/* INTERACTIVE COMPLIANCE STRESS-TEST CALCULATOR */}
      <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl">
        <div className="border-b border-zinc-855 pb-4">
          <div className="flex items-center gap-1.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider pb-0.5">
            <Activity className="w-4 h-4 text-red-500 animate-pulse" />
            TECHNICAL OUTBOX COMPLIANCE STRESS-TESTER
          </div>
          <h3 className="text-sm font-semibold text-white font-display">
            Vulnerability Simulation & Spam Score Estimator
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Tweak our domain warmup periods, registration sizes, and opt-out statuses to see the simulated deliverability grade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          
          {/* Inputs */}
          <div className="md:col-span-6 space-y-4">
            <span className="text-[9.5px] font-mono text-zinc-500 uppercase font-bold tracking-widest block">
              Configure Pipeline Variables
            </span>

            {/* Warmup Duration */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-300">Domain Cooling & Warmup Period</span>
                <span className="font-bold text-white">{warmupDaysCount} Days</span>
              </div>
              <input 
                type="range"
                min="0"
                max="30"
                step="2"
                value={warmupDaysCount}
                onChange={(e) => setWarmupDaysCount(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-zinc-800 cursor-pointer h-1 rounded"
              />
            </div>

            {/* Domains setup size */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-300">Proxy Domains Registered in 1 Hour</span>
                <span className="font-bold text-white">{domainsToRegister} domains</span>
              </div>
              <input 
                type="range"
                min="5"
                max="100"
                step="5"
                value={domainsToRegister}
                onChange={(e) => setDomainsToRegister(Number(e.target.value))}
                className="w-full accent-red-500 bg-zinc-800 cursor-pointer h-1 rounded text-red-500"
              />
            </div>

            {/* Boolean Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button 
                onClick={() => setOptOutFooterConfigured(!optOutFooterConfigured)}
                className={`py-2 px-3 border rounded-lg text-xs font-mono font-bold flex flex-col justify-between h-14 text-left transition ${
                  optOutFooterConfigured ? 'bg-zinc-900 border-emerald-500/30 text-emerald-400' : 'bg-transparent border-zinc-800 text-zinc-500'
                }`}
              >
                <span className="text-[9px] uppercase">Opt-out Footer</span>
                <span>{optOutFooterConfigured ? 'On (Safe)' : 'Off (Risk)'}</span>
              </button>

              <button 
                onClick={() => setProxyRotationsEnabled(!proxyRotationsEnabled)}
                className={`py-2 px-3 border rounded-lg text-xs font-mono font-bold flex flex-col justify-between h-14 text-left transition ${
                  proxyRotationsEnabled ? 'bg-zinc-900 border-blue-500/30 text-blue-400' : 'bg-transparent border-zinc-800 text-zinc-500'
                }`}
              >
                <span className="text-[9px] uppercase">IP Rotations</span>
                <span>{proxyRotationsEnabled ? 'Active' : 'Disabled'}</span>
              </button>

              <button 
                onClick={() => setValidateBouncesEnabled(!validateBouncesEnabled)}
                className={`py-2 px-3 border rounded-lg text-xs font-mono font-bold flex flex-col justify-between h-14 text-left transition ${
                  validateBouncesEnabled ? 'bg-zinc-900 border-[#818cf8]/30 text-[#818cf8]' : 'bg-transparent border-zinc-800 text-zinc-500'
                }`}
              >
                <span className="text-[9px] uppercase">SMTP Checks</span>
                <span>{validateBouncesEnabled ? 'Enabled' : 'Bypassed'}</span>
              </button>
            </div>
          </div>

          {/* Results Badge & Advice */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div className={`p-5 rounded-xl border ${currentGrade.banner} flex flex-col justify-between h-full`}>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                    Simulated Deliverability Status
                  </span>
                  <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                </div>
                
                <h4 className={`text-2xl font-black font-mono tracking-tight ${currentGrade.color}`}>
                  {currentGrade.grade}
                </h4>
                <p className="text-zinc-300 font-mono text-xs">{currentGrade.label}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-900/60 text-xs">
                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest font-bold block mb-1">
                  Active Mitigation Step:
                </span>
                <p className="text-zinc-300 leading-normal font-sans text-[11.5px]">{currentGrade.advice}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* METRIC TAB NAVIGATION */}
      <div className="bg-zinc-950/60 border border-zinc-800 p-1.5 rounded-xl flex flex-wrap gap-1">
        {[
          { id: 'priorities', label: '1. What to Build / Ignore', icon: Layers },
          { id: 'fails', label: '2. Top 20 Failure points', icon: AlertTriangle },
          { id: 'assumptions', label: '3. Top 20 Assumptions', icon: BookOpen },
          { id: 'risks', label: '4. Top 20 Execution Risks', icon: ShieldAlert },
          { id: 'opportunities', label: '5. Top 20 Leverage Opportunities', icon: TrendingUp }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setMetricTab(tab.id as any)}
              className={`flex-1 min-w-[130px] py-2.5 px-3.5 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 transition ${
                metricTab === tab.id
                  ? 'bg-zinc-900 border-zinc-700 text-white shadow'
                  : 'bg-transparent border-transparent text-gray-400 hover:bg-zinc-900/40 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN TAB SWITCH CONTENT SCREEN */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 lg:p-8 backdrop-blur min-h-[300px]">
        
        {/* SUBTAB 1: WHAT TO BUILD / DELAY / IGNORE */}
        {metricTab === 'priorities' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-805 pb-4">
              <h3 className="text-base font-semibold text-white font-display">Execution Prioritizations Roadmap</h3>
              <p className="text-xs text-zinc-400">Strict segregation of technical tasks to protect our runway and secure fast engineering velocity.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Build Next Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold border-b border-emerald-500/10 pb-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <h4>Build Next (High Margin ROI)</h4>
                </div>
                
                <div className="space-y-3.5 max-h-[450px] overflow-y-auto pr-1">
                  {ROADMAP_ITEMS.filter(item => item.action === 'BUILD').map(item => (
                    <div key={item.id} className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-white text-xs block leading-tight">{item.name}</span>
                        <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] px-2 py-0.5 rounded shrink-0 ml-2">
                          {item.timelineEstimate}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-405 leading-snug">{item.rationale}</p>
                      <span className="text-[9px] text-[#818cf8] font-mono block uppercase">{item.savedRunwayCost}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delay Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase font-bold border-b border-blue-500/10 pb-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                  <h4>Delay (Save Developer Runway)</h4>
                </div>
                
                <div className="space-y-3.5 max-h-[450px] overflow-y-auto pr-1">
                  {ROADMAP_ITEMS.filter(item => item.action === 'DELAY').map(item => (
                    <div key={item.id} className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-white text-xs block leading-tight">{item.name}</span>
                        <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[9px] px-2 py-0.5 rounded shrink-0 ml-2">
                          {item.timelineEstimate}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-405 leading-snug">{item.rationale}</p>
                      <span className="text-[9px] text-yellow-500 font-mono block uppercase">{item.savedRunwayCost}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ignore Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase font-bold border-b border-red-500/10 pb-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                  <h4>Ignore (Drop / Zero Value Waste)</h4>
                </div>
                
                <div className="space-y-3.5 max-h-[450px] overflow-y-auto pr-1">
                  {ROADMAP_ITEMS.filter(item => item.action === 'IGNORE').map(item => (
                    <div key={item.id} className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-white text-xs block leading-tight">{item.name}</span>
                        <span className="bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[9px] px-2 py-0.5 rounded shrink-0 ml-2">
                          FAILED MOAT
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-405 leading-snug">{item.rationale}</p>
                      <span className="text-[9px] text-zinc-500 font-mono block uppercase">Saved {item.savedRunwayCost}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SUBTAB 2: TOP 20 FAILURE POINTS */}
        {metricTab === 'fails' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-805 pb-4">
              <h3 className="text-base font-semibold text-white font-display">Top 20 Critical Failure Paths</h3>
              <p className="text-xs text-zinc-400 font-sans">Brutally highlighting where architectural and deliverability limitations would ruin the pipeline.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FAILURE_POINTS.map(f => (
                <div key={f.id} className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-3 relative overflow-hidden">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500 font-mono text-xs font-bold">#{f.id}</span>
                      <h4 className="text-white text-xs font-bold leading-tight">{f.title}</h4>
                    </div>
                    <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ${
                      f.criticality === 'CATASTROPHIQUE' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      f.criticality === 'ÉLEVÉ' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                      'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {f.criticality}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                    <strong>Mechanics of Failure:</strong> {f.mechanics}
                  </p>

                  <div className="bg-zinc-900/40 p-2.5 border border-zinc-850 rounded text-xs select-none">
                    <span className="font-mono text-[9px] text-indigo-400 block font-bold uppercase mb-0.5">Tactical Remediations</span>
                    <p className="text-[11px] text-zinc-300 leading-snug">{f.brutalRemedial}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 3: TOP 20 ASSUMPTIONS */}
        {metricTab === 'assumptions' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-805 pb-4">
              <h3 className="text-base font-semibold text-white font-display">Top 20 Risky Operational Assumptions</h3>
              <p className="text-xs text-zinc-400">Exposing core statements being taken as objective truths across technology and market models.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {CORE_ASSUMPTIONS.map(as => (
                <div key={as.id} className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                      <span className="bg-zinc-900 px-2 py-0.5 rounded text-indigo-400 font-bold uppercase">
                        {as.area} Area
                      </span>
                      <span className="text-zinc-550 font-bold">Assumption #{as.id}</span>
                    </div>

                    <p className="text-xs text-white leading-relaxed font-sans font-medium mb-3">
                      "{as.statement}"
                    </p>
                  </div>

                  <div className="border-t border-zinc-900 pt-3 space-y-2 mt-auto">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-zinc-500">Fragility score</span>
                      <span className={`font-bold ${as.fragilityIndex >= 8 ? 'text-red-400' : as.fragilityIndex >= 6 ? 'text-yellow-400' : 'text-zinc-400'}`}>
                        {as.fragilityIndex} / 10
                      </span>
                    </div>

                    <div className="p-2 bg-zinc-900 rounded text-[10.5px] leading-snug text-zinc-405 font-sans">
                      <span className="text-[8px] font-mono text-zinc-550 block font-bold uppercase mb-0.5">Implication of Failure</span>
                      {as.implication}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 4: TOP 20 RISKS */}
        {metricTab === 'risks' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-805 pb-4">
              <h3 className="text-base font-semibold text-white font-display">Top 20 Critical Infrastructure & Revenue Risks</h3>
              <p className="text-xs text-zinc-400">Systematic mapping of high-stakes externalities alongside robust actionable hedging plans.</p>
            </div>

            <div className="space-y-3.5">
              {CORE_RISKS.map(rk => (
                <div key={rk.id} className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl flex flex-col lg:flex-row justify-between gap-4">
                  <div className="space-y-1.5 lg:w-1/3 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-red-400 font-bold bg-red-500/10 px-2.5 py-0.5 rounded border border-red-500/20 inline-block">
                        Risk #{rk.id}
                      </span>
                      <span className="text-[10px] text-zinc-550 font-mono tracking-wider uppercase">{rk.impactType}</span>
                    </div>
                    <h4 className="text-xs font-bold font-mono text-white mt-1">{rk.riskName}</h4>
                    
                    <div className="flex gap-2 text-[9.5px] font-mono pt-1">
                      <span className="text-zinc-400 font-semibold">Severity: <strong className="text-red-300">{rk.severity}</strong></span>
                      <span className="text-zinc-600">|</span>
                      <span className="text-zinc-400 font-semibold">Likelihood: <strong className="text-orange-300">{rk.likelihood}</strong></span>
                    </div>
                  </div>

                  <div className="flex-1 bg-zinc-900/30 border border-zinc-855 rounded p-3 text-xs leading-relaxed text-zinc-400">
                    <span className="font-mono text-[9px] text-zinc-500 font-bold block uppercase mb-1">Exposure Context</span>
                    {rk.technicalExposure}
                  </div>

                  <div className="flex-1 bg-emerald-500/5 border border-emerald-500/10 rounded p-3 text-xs leading-relaxed text-emerald-300">
                    <span className="font-mono text-[9px] text-emerald-500 font-bold block uppercase mb-1">Actionable Hedging</span>
                    {rk.actionableHedging}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 5: TOP 20 OPPORTUNITIES */}
        {metricTab === 'opportunities' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-805 pb-4">
              <h3 className="text-base font-semibold text-white font-display">Top 20 Leverage Opportunities</h3>
              <p className="text-xs text-zinc-400">Unveiling engineering and cost-reduction multipliers capable of compressing the growth roadmap.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REVENUE_OPPORTUNITIES.map(op => (
                <div key={op.id} className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl space-y-3 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-zinc-550 font-bold">Opportunity #{op.id}</span>
                      <span className="bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[9.5px] uppercase font-bold">
                        {op.tag}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white mt-2 leading-snug">{op.title}</h4>
                    <p className="text-xs text-zinc-405 mt-1 leading-relaxed">{op.strategyDescription}</p>
                  </div>

                  <div className="border-t border-zinc-900 pt-2.5 flex items-center justify-between text-xs mt-3 bg-zinc-900/30 p-2 rounded">
                    <div className="font-mono">
                      <span className="text-[8.5px] text-zinc-500 block uppercase">Leverage Factor</span>
                      <strong className="text-emerald-400">{op.leverageFactor}</strong>
                    </div>

                    <div className="font-sans text-right max-w-[70%]">
                      <span className="text-[8.5px] font-mono text-zinc-500 block uppercase">Expected traction</span>
                      <span className="text-emerald-300 text-[11px] leading-tight block">{op.expectedTraction}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FOOTER METRIC SPECIFICATION */}
      <div className="bg-zinc-950 p-6 border border-zinc-850 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <span className="text-red-400 font-bold block uppercase text-[10px]">VERIFIED VC AUDIT SYSTEM</span>
          <p className="text-zinc-400">EffectiveBuzz Executive Board Evaluation: EB-AUDIT-2026</p>
        </div>
        <div className="text-[10px] text-zinc-550 italic uppercase sm:text-right">
          Audited under strict GTM guidelines: v12.1.0
        </div>
      </div>

    </div>
  );
}
