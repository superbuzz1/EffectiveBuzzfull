import React, { useState } from 'react';
import { 
  Server, Database, Code, Play, RefreshCw, Layers, ShieldAlert, ArrowRight, Check, Copy, 
  Search, Shield, Key, Users, Send, BarChart2, CreditCard, Sparkles, Terminal, FileJson, 
  BookOpen, ChevronDown, ChevronUp, Lock, CheckCircle2, AlertTriangle, Eye, HelpCircle 
} from 'lucide-react';

interface EndpointDoc {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  route: string;
  module: 'Auth' | 'Workspaces' | 'Prospects' | 'Campaigns' | 'Inbox' | 'Analytics' | 'Billing' | 'AI';
  label: string;
  description: string;
  requestBody?: string;
  responseBody: string;
  validationRules: string[];
  authorizationRules: string[];
}

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<'openapi' | 'api' | 'schemas'>('openapi');
  const [selectedEndpoint, setSelectedEndpoint] = useState<'campaigns_get' | 'campaigns_post' | 'health_get' | 'logs_get'>('campaigns_get');

  // OpenAPI Specification states
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('All');
  const [apiSearchQuery, setApiSearchQuery] = useState<string>('');
  const [expandedEndpoints, setExpandedEndpoints] = useState<Record<string, boolean>>({
    'auth_login': true,
    'prospects_get': true
  });
  const [specViewMode, setSpecViewMode] = useState<'visual' | 'raw'>('visual');

  // API Playground dynamic States
  const [requestHeaders, setRequestHeaders] = useState('{\n  "X-Tenant-ID": "tenant-1",\n  "Content-Type": "application/json"\n}');
  const [requestBody, setRequestBody] = useState('{\n  "name": "Q4 Enterprise Growth Target",\n  "targetAudience": "CMOs of Retail brands"\n}');
  const [responseOutput, setResponseOutput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const toggleEndpointExpand = (id: string) => {
    setExpandedEndpoints(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopySpec = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const endpointMetadata = {
    campaigns_get: { method: 'GET' as const, path: '/api/campaigns', desc: 'Retrieve list of all campaign items constructed on client databases.' },
    campaigns_post: { method: 'POST' as const, path: '/api/campaigns', desc: 'Provision a brand new outreach segment campaign log.' },
    health_get: { method: 'GET' as const, path: '/api/health', desc: 'Query internal multi-instance health logs, network indicators, and latency indexes.' },
    logs_get: { method: 'GET' as const, path: '/api/logs', desc: 'Retrieve recent operational event trails aggregated from Express servers.' }
  };

  const handleExecuteRequest = async () => {
    setIsPlaying(true);
    setResponseOutput('');
    const meta = endpointMetadata[selectedEndpoint];

    try {
      let options: RequestInit = {
        method: meta.method,
        headers: { 'Content-Type': 'application/json' }
      };

      if (meta.method === 'POST') {
        options.body = requestBody;
      }

      const res = await fetch(meta.path, options);
      const data = await res.json();
      setResponseOutput(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseOutput(JSON.stringify({ error: "Failed to transact raw REST payload", message: err.message }, null, 2));
    } finally {
      setIsPlaying(false);
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Senior Backend Architecture Endpoint catalog
  const endpointDocs: EndpointDoc[] = [
    {
      id: 'auth_login',
      method: 'POST',
      module: 'Auth',
      route: '/api/v1/auth/login',
      label: 'Authenticate Identity',
      description: 'Authenticates workspace admin or sales agent identities. Decrypts client payload, validates email/password, and generates secondary MFA exchange tokens if Multi-Factor is configured.',
      requestBody: '{\n  "email": "sarah@acme.com",\n  "password": "SecurePassword123!"\n}',
      responseBody: '{\n  "status": "mfa_challenge_required",\n  "mfaToken": "mfa_exch_982bfb23947ca79b8a01",\n  "expiresInSeconds": 300,\n  "factor": "totp"\n}',
      validationRules: [
        'email: Required. Must format valid RFC 5322 pattern, max 255 chars.',
        'password: Required. String format, minimum 8 characters containing uppercase, numbers, and symbols.'
      ],
      authorizationRules: [
        'Public scope bypass allowed.',
        'Ingress rate limit trigger at 5 invalid submissions per client IP in a 10-minute sliding pool.'
      ]
    },
    {
      id: 'auth_mfa',
      method: 'POST',
      module: 'Auth',
      route: '/api/v1/auth/mfa/verify',
      label: 'Verify TOTP Factor',
      description: 'Completes identity authentication check via time-based key values. Produces cryptographically signed JWTs holding RBAC claims.',
      requestBody: '{\n  "mfaToken": "mfa_exch_982bfb23947ca79b8a01",\n  "code": "481029"\n}',
      responseBody: '{\n  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3ItMSIsInRlbmFudElkIjoidGVuYW50LTEiLCJyb2xlIjoiT3duZXIifQ...",\n  "refreshToken": "rf_920ba012bcf81e018a",\n  "user": {\n    "id": "usr-1",\n    "name": "Sarah Chen",\n    "email": "sarah@acme.com"\n  },\n  "workspaces": [\n    { "tenantId": "tenant-1", "role": "owner", "status": "active" }\n  ]\n}',
      validationRules: [
        'mfaToken: Required. Valid active 32-character hex key string pointer.',
        'code: Required. 6-digit numeric string matching format pattern /^[0-9]{6}$/.'
      ],
      authorizationRules: [
        'Requires temporary exchange bearer token validation status.',
        'Active anti-bypassing limits: 3 unsuccessful factor inputs invalidates session pointer.'
      ]
    },
    {
      id: 'workspaces_get',
      method: 'GET',
      module: 'Workspaces',
      route: '/api/v1/workspaces',
      label: 'List Authorized Workspaces',
      description: 'Retrieves complete log list of tenant workspaces associated with requested identity boundaries.',
      responseBody: '[\n  {\n    "id": "tenant-1",\n    "name": "Acme Ventures EMEA",\n    "slug": "acme-emea",\n    "status": "active",\n    "plan": "Professional",\n    "createdAt": "2026-01-10T08:30:00Z"\n  }\n]',
      validationRules: [
        'Query filter parameters status: Optional. Enum criteria [active, suspended, archival].'
      ],
      authorizationRules: [
        'Valid HTTP Bearer JWT required in Authorization request header.',
        'Verifies active tenant association before resolving database scopes.'
      ]
    },
    {
      id: 'workspaces_post',
      method: 'POST',
      module: 'Workspaces',
      route: '/api/v1/workspaces',
      label: 'Provision Workspace Node',
      description: 'Allocates completely isolated software database configurations, mapping unique subdomains/slugs to specific SaaS isolation targets.',
      requestBody: '{\n  "name": "EffectiveBuzz Asia LLC",\n  "slug": "eb-asia"\n}',
      responseBody: '{\n  "id": "tenant-4",\n  "name": "EffectiveBuzz Asia LLC",\n  "slug": "eb-asia",\n  "status": "active",\n  "settings": {},\n  "createdAt": "2026-06-06T19:52:00Z"\n}',
      validationRules: [
        'name: Required. Alphanumeric string under 100 character bounds.',
        'slug: Required. Uniquely filtered, URL-safe pattern match string /^[a-z0-9-]+$/.'
      ],
      authorizationRules: [
        'Restricted to global site owners or workspace subscription administrators.',
        'Quota limits checked dynamically on account limits database tables.'
      ]
    },
    {
      id: 'workspaces_keys',
      method: 'POST',
      module: 'Workspaces',
      route: '/api/v1/workspaces/:tenantId/keys',
      label: 'Issue API Scoped Key',
      description: 'Synthesizes strong SHA-256 API secret security tokens. Allows programmatic agent workloads without token expirations.',
      requestBody: '{\n  "name": "Production Flow Deployment Key",\n  "scopes": ["prospects:read", "campaigns:write"],\n  "expiresInDays": 90\n}',
      responseBody: '{\n  "id": "key-9bc728",\n  "name": "Production Flow Deployment Key",\n  "keyPrefix": "eb_live_9b",\n  "token": "eb_live_9b_4fc728791bf44f8ebeefc6a617f1a08dbb091f0a2e1",\n  "scopes": ["prospects:read", "campaigns:write"],\n  "expiresAt": "2026-09-04T19:52:00Z"\n}',
      validationRules: [
        'name: Required. Human-readable name string, max 100 characters.',
        'scopes: Required. Valid enum subsets [prospects:read, prospects:write, campaigns:read, campaigns:write, analytics:read].',
        'expiresInDays: Range bounded integer [1, 365]. Default standard 90.'
      ],
      authorizationRules: [
        'Workspace Owner or Administrator role status checked.',
        'Full audit trail generated recorded under active Tenant action audits.'
      ]
    },
    {
      id: 'prospects_get',
      method: 'GET',
      module: 'Prospects',
      route: '/api/v1/workspaces/:tenantId/prospects',
      label: 'Query Filtering CRM Prospects',
      description: 'Returns CRM lead grids, matching advanced JSONB elements and cursor page queries.',
      responseBody: '{\n  "prospects": [\n    {\n      "id": "prospect-1",\n      "email": "jessica@zeta.ai",\n      "firstName": "Jessica",\n      "lastName": "Miller",\n      "fitScore": 94,\n      "lifecycleStage": "lead",\n      "customAttributes": {\n        "funding": "Series A",\n        "linkedinUrl": "https://linkedin.com/in/jessicamiller"\n      }\n    }\n  ],\n  "cursor": "cursor_prospect_next_1298"\n}',
      validationRules: [
        'fitScoreMin: Optional. Range bounded [0, 100].',
        'lifecycleStage: Optional. Enum subsets [lead, contact, opportunity, customer, interactive].',
        'limit: Optional. Integer page clamp size, min 1, max 100. Default 20.'
      ],
      authorizationRules: [
        'Bearer token verified and validated against workspace scope.',
        'Enforces multi-tenant data boundaries through active logical tenant isolation filters.'
      ]
    },
    {
      id: 'prospects_post',
      method: 'POST',
      module: 'Prospects',
      route: '/api/v1/workspaces/:tenantId/prospects',
      label: 'Upsert CRM Lead Node',
      description: 'Injects or updates CRM prospect nodes. Automatically triggers active asynchronous Gemini lead qualification hooks.',
      requestBody: '{\n  "email": "elena@neuracore.io",\n  "firstName": "Elena",\n  "lastName": "Rostova",\n  "customAttributes": {\n    "company": "NeuraCore",\n    "employeeCount": 45\n  }\n}',
      responseBody: '{\n  "id": "prospect-elena",\n  "email": "elena@neuracore.io",\n  "firstName": "Elena",\n  "lastName": "Rostova",\n  "fitScore": 92,\n  "lifecycleStage": "lead",\n  "customAttributes": {\n    "company": "NeuraCore",\n    "employeeCount": 45\n  },\n  "createdAt": "2026-06-06T19:52:00Z"\n}',
      validationRules: [
        'email: Required. Valid email pattern format.',
        'customAttributes: Optional. Key-value object validation up to 10KB total payload footprint.'
      ],
      authorizationRules: [
        'Workspace role of Agent or above required.',
        'Dynamic validation of subscription lead quota limit bounds.'
      ]
    },
    {
      id: 'campaigns_get_spec',
      method: 'GET',
      module: 'Campaigns',
      route: '/api/v1/workspaces/:tenantId/campaigns',
      label: 'List Segment Sequences',
      description: 'Queries ongoing multi-phase outbound marketing campaigns including status tracking metrics.',
      responseBody: '[\n  {\n    "id": "campaign-1",\n    "name": "Q3 Tech Founders Outreach",\n    "status": "Active",\n    "targetAudienceSegment": "Tech SaaS Founders",\n    "dailySendLimit": 100,\n    "sequences": [\n      {\n        "id": "seq-1",\n        "steps": [\n          { "id": "step-1", "stepNumber": 1, "delayDays": 0, "stepType": "email_outreach", "templateSubject": "Personalized Intro on ZetaAI" }\n        ]\n      }\n    ]\n  }\n]',
      validationRules: [],
      authorizationRules: [
        'Workspace-scoped key validity verification.'
      ]
    },
    {
      id: 'campaigns_post_spec',
      method: 'POST',
      module: 'Campaigns',
      route: '/api/v1/workspaces/:tenantId/campaigns',
      label: 'Orchestrate Sequence Segment',
      description: 'Commences outbound campaigns mapping detailed temporal outreach steps, delay counts, and template structures.',
      requestBody: '{\n  "name": "SaaS Leaders Outbound Beta",\n  "targetAudienceSegment": "VP of Sales in California",\n  "aiPromptGuidelines": "Keep it direct, focus on integrations with CRM", \n  "dailySendLimit": 150,\n  "sequences": [\n    {\n      "name": "Trigger Sequence Flow A",\n      "steps": [\n        {\n          "stepNumber": 1,\n          "delayDays": 0,\n          "stepType": "email_outreach",\n          "templateSubject": "Quick feedback on {{company}}",\n          "templateBody": "Hi {{firstName}}, I noticed {{company}} has a fantastic setup..."\n        }\n      ]\n    }\n  ]\n}',
      responseBody: '{\n  "id": "cmp-4",\n  "name": "SaaS Leaders Outbound Beta",\n  "status": "draft",\n  "createdAt": "2026-06-06T19:52:00Z"\n}',
      validationRules: [
        'name: Required. Maximum 255 words.',
        'sequences: Required. Array containing step order counts with valid variable template loops.'
      ],
      authorizationRules: [
        'Administrator permissions required on specified Tenant node.'
      ]
    },
    {
      id: 'inbox_get',
      method: 'GET',
      module: 'Inbox',
      route: '/api/v1/workspaces/:tenantId/inbox',
      label: 'Read Outbox Delivery Logs',
      description: 'Queries delivery structures containing incoming client bounce categories, opened statuses, and content reply threads.',
      responseBody: '{\n  "outbox": [\n    {\n      "id": "msg-128",\n      "recipientEmail": "jessica@zeta.ai",\n      "status": "delivered",\n      "subject": "Personalized intro on ZetaAI",\n      "sentAt": "2026-06-06T12:30:00Z",\n      "replies": [\n        { "id": "rep-9", "body": "Hey, this is actually clean outreach. Call next week.", "receivedAt": "2026-06-06T14:45:00Z" }\n      ]\n    }\n  ]\n}',
      validationRules: [],
      authorizationRules: [
        'Workspace Agent or custom analytics role tokens verified.'
      ]
    },
    {
      id: 'inbox_webhook',
      method: 'POST',
      module: 'Inbox',
      route: '/api/v1/workspaces/:tenantId/inbox/webhook',
      label: 'Mailing Hook Event Intake',
      description: 'SMTP ingestion webhook hook receiver recording live deliveries, bounce profiles, thread logs, and tracking flags.',
      requestBody: '{\n  "providerMessageId": "smtp_msg_892b1a0cb8b12f",\n  "eventType": "reply",\n  "replyRawText": "Hey, this is actually a really clean outreach email. Let\'s chat.",\n  "ipAddress": "203.0.113.51",\n  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64)..."\n}',
      responseBody: '{\n  "received": true,\n  "loggedEventId": "evt_980cbbe29d71"\n}',
      validationRules: [
        'providerMessageId: Required string matching SMTP structure specs.',
        'eventType: Required. Valid parameter [open, click, bounce, reply].'
      ],
      authorizationRules: [
        'Webhook callback security validation constraint: SHA-256 HMAC header verification required matching the workspace private ingress key.'
      ]
    },
    {
      id: 'analytics_spec',
      method: 'GET',
      module: 'Analytics',
      route: '/api/v1/workspaces/:tenantId/analytics/dashboard',
      label: 'Derive Analytics Matrices',
      description: 'Performs instant server-side aggregation computations analyzing sequences open percentages, response rates, spam triggers, and computational token costing summaries.',
      responseBody: '{\n  "sentCount": 182,\n  "openRate": 68.4,\n  "replyRate": 13.1,\n  "bounceRate": 1.2,\n  "aiCostMicrocents": 42000,\n  "conversionFunnel": {\n    "delivery": 182,\n    "open": 124,\n    "reply": 24,\n    "opportunity": 11\n  }\n}',
      validationRules: [
        'startDate: ISO-8601 string sequence. Defaults to 30 days prior.',
        'endDate: ISO-8601 string boundaries.'
      ],
      authorizationRules: [
        'Requires read authorization bounds mapping targeted tenant permissions.'
      ]
    },
    {
      id: 'billing_get',
      method: 'GET',
      module: 'Billing',
      route: '/api/v1/workspaces/:tenantId/billing/subscription',
      label: 'Read Subscription Metrics',
      description: 'Returns tenant-specific Stripe parameters mapping credit lines, usage thresholds, billing cycles, and current plan limits.',
      responseBody: '{\n  "planTier": "Growth",\n  "status": "active",\n  "currentPeriodEnd": "2026-07-06T19:52:00Z",\n  "usage": {\n    "emailsSent": 382,\n    "emailsLimit": 1000,\n    "aiTokensConsumed": 45000,\n    "aiTokensLimit": 500000\n  }\n}',
      validationRules: [],
      authorizationRules: [
        'Requires administrative clearance status (owner/admin).'
      ]
    },
    {
      id: 'billing_checkout',
      method: 'POST',
      module: 'Billing',
      route: '/api/v1/workspaces/:tenantId/billing/checkout',
      label: 'Initiate Checkout Engine',
      description: 'Generates active single-use Stripe Checkout URLs allowing tenants to easily scale operational quotas.',
      requestBody: '{\n  "priceId": "price_growth_monthly_prod_091b",\n  "successUrl": "https://effectivebuzz.ai/billing/success",\n  "cancelUrl": "https://effectivebuzz.ai/billing/cancel"\n}',
      responseBody: '{\n  "checkoutSessionId": "cs_test_a18bcf90bcfad90280eb",\n  "stripeCheckoutUrl": "https://checkout.stripe.com/pay/cs_test_a18bcf90bcfad90280eb"\n}',
      validationRules: [
        'priceId: Required stripe pricing catalog variable.',
        'successUrl / cancelUrl: Must possess active matching domains and valid endpoints.'
      ],
      authorizationRules: [
        'Strictly locked under Workspace Owner rbac parameters.'
      ]
    },
    {
      id: 'ai_generate',
      method: 'POST',
      module: 'AI',
      route: '/api/v1/workspaces/:tenantId/ai/generate',
      label: 'Orchestrate Gemini Copy',
      description: 'Leverages Gemini 3.5 Flash models to execute precise outbound copy personalizers, checking brand blueprints and guardrails.',
      requestBody: '{\n  "prospectId": "prospect-1",\n  "campaignId": "campaign-1",\n  "instructionOverride": "Highlight current Series A funding goals"\n}',
      responseBody: '{\n  "subject": "Quick scaling feedback on ZetaAI plans",\n  "personalizedBody": "Hi Jessica, congrats on ZetaAI Series A. I noticed how your scale is adapting...",\n  "tokensConsumed": 1420,\n  "estimatedMicrocents": 284\n}',
      validationRules: [
        'prospectId: Required UUID mapping exist database entity.',
        'campaignId: Required matching campaign segment.',
        'instructionOverride: Optional customized string guidelines, max 500 chars.'
      ],
      authorizationRules: [
        'Requires Editor / Agent scope privileges on the workspace.',
        'Deducts usage tokens automatically from active Usage Quotas ledger.'
      ]
    }
  ];

  const filteredEndpoints = endpointDocs.filter(doc => {
    const matchesModule = selectedModuleFilter === 'All' || doc.module === selectedModuleFilter;
    const matchesSearch = doc.route.toLowerCase().includes(apiSearchQuery.toLowerCase()) || 
                          doc.label.toLowerCase().includes(apiSearchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(apiSearchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Tab Switcher Header */}
      <div className="flex border-b border-gray-800 pb-0.5 gap-4">
        <button
          onClick={() => setActiveTab('openapi')}
          className={`pb-3 text-sm font-medium border-b-2 font-display transition-all flex items-center gap-1.5 ${
            activeTab === 'openapi'
              ? 'border-emerald-500 text-emerald-400 font-semibold'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          REST API Design & OpenAPI Spec
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`pb-3 text-sm font-medium border-b-2 font-display transition-all flex items-center gap-1.5 ${
            activeTab === 'api'
              ? 'border-emerald-500 text-emerald-400 font-semibold'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Terminal className="w-4 h-4 text-blue-400" />
          Interactive REST Sandbox
        </button>
        <button
          onClick={() => setActiveTab('schemas')}
          className={`pb-3 text-sm font-medium border-b-2 font-display transition-all flex items-center gap-1.5 ${
            activeTab === 'schemas'
              ? 'border-emerald-500 text-emerald-400 font-semibold'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Database className="w-4 h-4 text-indigo-400" />
          Database & Schema Registry
        </button>
      </div>

      {activeTab === 'openapi' && (
        <div className="space-y-6">
          {/* Module Banner */}
          <div className="bg-[#0f172a] rounded-xl border border-gray-800 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                  EffectiveBuzz SaaS Rest APIs
                </span>
                <span className="text-xs text-gray-400">v1.0.0</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Production OpenAPI Hub</h3>
              <p className="text-xs text-zinc-400">
                Architectural blueprint mapping request payloads, validation matrices, rate limits, and multi-tenant security scopes.
              </p>
            </div>
            
            <div className="flex bg-[#1e293b] rounded-lg p-1 border border-zinc-700">
              <button
                onClick={() => setSpecViewMode('visual')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono transition-all ${
                  specViewMode === 'visual' 
                    ? 'bg-emerald-500 text-slate-950 font-bold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Visual Catalog
              </button>
              <button
                onClick={() => setSpecViewMode('raw')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono transition-all ${
                  specViewMode === 'raw' 
                    ? 'bg-emerald-500 text-slate-950 font-bold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                OpenAPI 3.1 YAML
              </button>
            </div>
          </div>

          {specViewMode === 'visual' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Filter Pane on Left */}
              <div className="lg:col-span-3 bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-4 h-fit">
                <div>
                  <h4 className="text-xs font-mono uppercase text-indigo-400 font-bold">Module Filters</h4>
                  <p className="text-[10px] text-gray-400">Narrow documentation scopes.</p>
                </div>

                {/* Module Quick Filters chips */}
                <div className="flex flex-wrap lg:flex-col gap-1.5">
                  {['All', 'Auth', 'Workspaces', 'Prospects', 'Campaigns', 'Inbox', 'Analytics', 'Billing', 'AI'].map(mod => {
                    const iconMap: Record<string, any> = {
                      'All': BookOpen,
                      'Auth': Lock,
                      'Workspaces': Layers,
                      'Prospects': Users,
                      'Campaigns': Play,
                      'Inbox': Send,
                      'Analytics': BarChart2,
                      'Billing': CreditCard,
                      'AI': Sparkles
                    };
                    const Icon = iconMap[mod] || HelpCircle;
                    return (
                      <button
                        key={mod}
                        onClick={() => setSelectedModuleFilter(mod)}
                        className={`text-left px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 w-full lg:w-auto ${
                          selectedModuleFilter === mod 
                            ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold' 
                            : 'bg-slate-950/40 hover:bg-slate-900 border border-transparent text-gray-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span>{mod}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Search Bar Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search endpoints..."
                    value={apiSearchQuery}
                    onChange={(e) => setApiSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-300 font-mono focus:outline-none focus:border-emerald-500"
                  />
                  {apiSearchQuery && (
                    <button 
                      onClick={() => setApiSearchQuery('')} 
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-[10px] uppercase font-mono"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Endpoints Documentation Streams on Right */}
              <div className="lg:col-span-9 space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span>Showing <strong className="text-zinc-200">{filteredEndpoints.length}</strong> calculated REST endpoints</span>
                  <span>Isolation boundary: Logical composites on Tenant ID</span>
                </div>

                {filteredEndpoints.length === 0 ? (
                  <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-10 text-center space-y-2">
                    <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
                    <h5 className="text-sm font-semibold text-white">No Matching Specification Logs</h5>
                    <p className="text-xs text-gray-400 max-w-md mx-auto">
                      Adjust your semantic filter or typing parameters to find structural schemas.
                    </p>
                  </div>
                ) : (
                  filteredEndpoints.map(doc => {
                    const isExpanded = !!expandedEndpoints[doc.id];
                    const methodColors = {
                      GET: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
                      POST: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
                      PUT: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
                      DELETE: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
                      PATCH: 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                    };

                    return (
                      <div 
                        key={doc.id}
                        className="bg-[#111827] border border-[#1f2937] rounded-xl shadow-lg hover:border-gray-800 transition-all overflow-hidden"
                      >
                        {/* Compact Header click trigger */}
                        <div 
                          onClick={() => toggleEndpointExpand(doc.id)}
                          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-900/40 transition-all select-none"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border leading-none shrink-0 ${methodColors[doc.method]}`}>
                              {doc.method}
                            </span>
                            <span className="font-mono text-xs text-zinc-100 font-semibold truncate select-all">{doc.route}</span>
                            <span className="hidden sm:inline-block px-1.5 py-0.5 bg-slate-950 text-gray-400 text-[9px] font-mono rounded">
                              {doc.module}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="hidden md:inline-block text-xs font-medium text-gray-400">{doc.label}</span>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                          </div>
                        </div>

                        {/* Extended Panel Details */}
                        {isExpanded && (
                          <div className="border-t border-gray-800 bg-[#0d131f]/50 p-4 space-y-4">
                            {/* Doc description */}
                            <p className="text-xs text-zinc-300 leading-relaxed">
                              {doc.description}
                            </p>

                            {/* Verification matrices split */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Rules block */}
                              <div className="bg-[#111827] border border-gray-800/80 p-3 rounded-lg space-y-2">
                                <h5 className="text-[10px] uppercase font-mono font-bold text-amber-400 flex items-center gap-1">
                                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                                  Validation & Payload Bounds Rules
                                </h5>
                                <ul className="space-y-1 text-[10px] text-zinc-400 list-disc pl-3">
                                  {doc.validationRules.length > 0 ? (
                                    doc.validationRules.map((rule, idx) => <li key={idx}>{rule}</li>)
                                  ) : (
                                    <li className="list-none text-gray-500 italic pl-0">No custom validation constraints mapped to payload.</li>
                                  )}
                                </ul>
                              </div>

                              {/* Authorization block */}
                              <div className="bg-[#111827] border border-gray-800/80 p-3 rounded-lg space-y-2">
                                <h5 className="text-[10px] uppercase font-mono font-bold text-[#818cf8] flex items-center gap-1">
                                  <Lock className="w-3.5 h-3.5 text-[#818cf8]" />
                                  Security & RBAC Controls
                                </h5>
                                <ul className="space-y-1 text-[10px] text-zinc-400 list-disc pl-3">
                                  {doc.authorizationRules.map((rule, idx) => (
                                    <li key={idx} className="leading-snug">{rule}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Request / Response JSON Schema side logs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Request segment if applicable */}
                              {doc.requestBody && (
                                <div className="space-y-1.5">
                                  <span className="text-[10px] uppercase font-mono text-zinc-400 font-bold flex items-center justify-between">
                                    <span>Request Body Payload</span>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); handleCopySpec(doc.requestBody || ''); }}
                                      className="hover:text-emerald-400 p-0.5"
                                      title="Copy request schema pointer"
                                    >
                                      <Copy className="w-3 h-3" />
                                    </button>
                                  </span>
                                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 overflow-x-auto text-[10px] font-mono text-zinc-300 max-h-[180px]">
                                    <pre>{doc.requestBody}</pre>
                                  </div>
                                </div>
                              )}

                              {/* Response segment */}
                              <div className={`${doc.requestBody ? '' : 'col-span-2'} space-y-1.5`}>
                                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold flex items-center justify-between">
                                  <span>Response Schema (200 OK / 201 Created)</span>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleCopySpec(doc.responseBody); }}
                                    className="hover:text-emerald-400 p-0.5"
                                    title="Copy response body specs"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </span>
                                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 overflow-x-auto text-[10px] font-mono text-emerald-500 max-h-[180px]">
                                  <pre>{doc.responseBody}</pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            /* RAW OPENAPI 3.1 SPEC VIEW */
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs uppercase font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <FileJson className="w-4 h-4" />
                    openapi.json Spec File
                  </span>
                  <p className="text-[10px] text-gray-400">Compliant with Swagger specifications version 3.1.0.</p>
                </div>
                <button
                  onClick={() => handleCopyCode(openapiJsonObject)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-gray-700 text-gray-300 hover:text-white hover:bg-slate-700 transition-all text-xs flex items-center gap-1.5 font-mono"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied Spec!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy OpenAPI String
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-4 rounded-lg font-mono text-[10px] text-zinc-300 overflow-x-auto leading-relaxed max-h-[500px] overflow-y-auto">
                <pre>{openapiJsonObject}</pre>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'api' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Endpoint Selector Navigation Pane */}
          <div className="lg:col-span-4 bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-4 shadow-xl">
            <div>
              <h3 className="text-xs uppercase font-mono text-[#818cf8] font-bold">API Specifications</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">Explore standard endpoint routing structures.</p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'campaigns_get', method: 'GET', path: '/api/campaigns', label: 'Get Campaigns' },
                { id: 'campaigns_post', method: 'POST', path: '/api/campaigns', label: 'Create Campaign' },
                { id: 'health_get', method: 'GET', path: '/api/health', label: 'System Health Checks' },
                { id: 'logs_get', method: 'GET', path: '/api/logs', label: 'Operational Logging Feed' }
              ].map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => {
                    setSelectedEndpoint(ep.id as any);
                    setResponseOutput('');
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs flex items-center justify-between ${
                    selectedEndpoint === ep.id
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                      : 'bg-slate-900 border-slate-850 text-gray-400 hover:bg-slate-850 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded leading-none ${
                      ep.method === 'GET' ? 'bg-blue-500/10 text-blue-300' : 'bg-emerald-500/15 text-emerald-400'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="truncate max-w-[120px] font-medium">{ep.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 truncate max-w-[90px]">{ep.path}</span>
                </button>
              ))}
            </div>

            {/* Quick documentation box */}
            <div className="p-3 bg-[#182235]/40 border border-[#1f2937] rounded-lg space-y-1.5 text-[11px] leading-relaxed text-gray-300">
              <span className="text-[9px] font-mono text-indigo-400 font-bold block uppercase">Ingress Security:</span>
              <p>
                Every request transacted outside sandbox limits must append validation JWT keys inside headers. High workloads triggers sliding-window rate triggers.
              </p>
            </div>
          </div>

          {/* Interactive Playground Codebox Panel */}
          <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-gray-800">
                <div>
                  <h3 className="text-sm font-semibold text-white">Dynamic REST Sandbox</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Trigger physical REST calls in real-time. Results represent live SQL transformations on Express servers.
                  </p>
                </div>
                <button
                  onClick={handleExecuteRequest}
                  disabled={isPlaying}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-55"
                >
                  {isPlaying ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Executing Call...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      Send API Request
                    </>
                  )}
                </button>
              </div>

              {/* Endpoint Context description */}
              <div className="bg-[#182235]/40 border border-slate-850 p-3.5 rounded-lg text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    endpointMetadata[selectedEndpoint].method === 'GET' ? 'bg-blue-500/10 text-blue-300' : 'bg-emerald-500/15 text-emerald-400'
                  }`}>
                    {endpointMetadata[selectedEndpoint].method}
                  </span>
                  <strong className="text-white font-mono">{endpointMetadata[selectedEndpoint].path}</strong>
                </div>
                <p className="text-gray-400 text-[11px] mt-1 pr-1">
                  {endpointMetadata[selectedEndpoint].desc}
                </p>
              </div>

              {/* Editable Code input panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Headers Box */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">HTTP Headers</span>
                  <textarea
                    value={requestHeaders}
                    onChange={(e) => setRequestHeaders(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-[11px] text-zinc-300 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Body Box */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">
                    HTTP Request JSON Body {endpointMetadata[selectedEndpoint].method === 'GET' && '(Read-Only)'}
                  </span>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    disabled={endpointMetadata[selectedEndpoint].method === 'GET'}
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-[11px] text-zinc-300 font-mono focus:outline-none focus:border-indigo-500 disabled:opacity-40"
                  />
                </div>
              </div>

              {/* Real-time Response Code Box output */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">
                  Response Log Output Structure
                </span>
                <div className="relative bg-slate-950 border border-slate-850 rounded-lg p-3 min-h-[140px] max-h-[220px] overflow-y-auto leading-relaxed">
                  {responseOutput ? (
                    <pre className="text-[11px] text-emerald-400 font-mono whitespace-pre">{responseOutput}</pre>
                  ) : (
                    <div className="flex items-center justify-center text-center text-gray-500 font-mono text-[10px] py-10">
                      Press "Send API Request" above to receive physical results from core servers.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {activeTab === 'schemas' && (

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Prisma File Panel on Left */}
          <div className="lg:col-span-6 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-xs uppercase font-mono text-[#818cf8] font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                schema.prisma models
              </span>
              <button
                onClick={() => handleCopyCode(prismaCodeBlock)}
                className="p-1 rounded bg-slate-800 border border-gray-700 text-gray-300 hover:text-white hover:bg-slate-700 transition-all text-[11px] flex items-center gap-1 font-mono"
              >
                {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                Copy Source
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-850 p-4 rounded-lg font-mono text-[10px] text-gray-300 overflow-x-auto leading-relaxed max-h-[460px] overflow-y-auto">
              <pre>{prismaCodeBlock}</pre>
            </div>
          </div>

          {/* DDL SQL schemas on Right */}
          <div className="lg:col-span-6 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-xs uppercase font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                init.sql database definitions
              </span>
              <button
                onClick={() => handleCopyCode(sqlCodeBlock)}
                className="p-1 rounded bg-slate-800 border border-gray-700 text-gray-300 hover:text-white hover:bg-slate-700 transition-all text-[11px] flex items-center gap-1 font-mono"
              >
                {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                Copy SQL
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-850 p-4 rounded-lg font-mono text-[10px] text-gray-300 overflow-x-auto leading-relaxed max-h-[460px] overflow-y-auto">
              <pre>{sqlCodeBlock}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Full Schema Definitions formatted uniquely inside docs
const prismaCodeBlock = `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Tenant {
  id         String             @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name       String
  slug       String             @unique
  status     String             @default("active")
  settings   Json               @default("{}")
  createdAt  DateTime           @default(now()) @map("created_at")
  updatedAt  DateTime           @default(now()) @updatedAt @map("updated_at")

  memberships       TenantMembership[]
  apiKeys           ApiKey[]
  campaigns         Campaign[]
  sequences         Sequence[]
  sequenceSteps     SequenceStep[]
  prospects         Prospect[]
  campaignDispatches CampaignDispatch[]
  outboxMessages    OutboxMessage[]
  emailEventLogs    EmailEventLog[]
  subscription      Subscription?
  invoices          Invoice[]
  usageQuotas       TenantUsageQuota[]
  aiGenerationLogs  AiGenerationLog[]
  auditLogs         AuditLog[]

  @@map("tenants")
}

model User {
  id         String             @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name       String
  email      String             @unique
  avatarUrl  String?            @map("avatar_url")
  mfaEnabled Boolean            @default(false) @map("mfa_enabled")
  createdAt  DateTime           @default(now()) @map("created_at")
  updatedAt  DateTime           @default(now()) @updatedAt @map("updated_at")

  memberships       TenantMembership[]
  createdApiKeys    ApiKey[]
  createdCampaigns  Campaign[]
  writtenNotes      ProspectNote[]
  aiGenerationLogs  AiGenerationLog[]
  auditLogs         AuditLog[]

  @@map("users")
}

model TenantMembership {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenantId  String   @map("tenant_id") @db.Uuid
  userId    String   @map("user_id") @db.Uuid
  role      String   @default("member") // owner, admin, member, agent
  status    String   @default("active") // active, invited, suspended
  invitedAt DateTime? @map("invited_at")
  joinedAt  DateTime @default(now()) @map("joined_at")

  tenant    Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([tenantId, userId], name: "tenantUserUnique")
  @@index([tenantId])
  @@index([userId])
  @@map("tenant_memberships")
}

model ApiKey {
  id         String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenantId   String    @map("tenant_id") @db.Uuid
  name       String
  keyHash    String    @unique @map("key_hash")
  keyPrefix  String    @map("key_prefix")
  scopes     String[]  @default(["read"])
  expiresAt  DateTime? @map("expires_at")
  lastUsedAt DateTime? @map("last_used_at")
  createdAt  DateTime  @default(now()) @map("created_at")
  createdBy  String?   @map("created_by") @db.Uuid

  tenant     Tenant    @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  creator    User?     @relation(fields: [createdBy], references: [id], onDelete: SetNull)

  @@index([tenantId])
  @@index([keyHash])
  @@map("api_keys")
}

model Campaign {
  id                    String             @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenantId              String             @map("tenant_id") @db.Uuid
  name                  String
  status                String             @default("draft") // draft, active, paused, completed
  targetAudienceSegment String             @map("target_audience_segment")
  aiPromptGuidelines    String?            @map("ai_prompt_guidelines")
  dailySendLimit        Int                @default(100) @map("daily_send_limit")
  createdBy             String?            @map("created_by") @db.Uuid
  createdAt             DateTime           @default(now()) @map("created_at")
  updatedAt             DateTime           @default(now()) @updatedAt @map("updated_at")

  tenant     Tenant             @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  creator    User?              @relation(fields: [createdBy], references: [id], onDelete: SetNull)
  sequences  Sequence[]
  dispatches CampaignDispatch[]

  @@index([tenantId])
  @@index([tenantId, status])
  @@map("campaigns")
}

model Sequence {
  id         String         @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  campaignId String         @map("campaign_id") @db.Uuid
  tenantId   String         @map("tenant_id") @db.Uuid
  name       String
  isActive   Boolean        @default(true) @map("is_active")
  createdAt  DateTime       @default(now()) @map("created_at")
  updatedAt  DateTime       @default(now()) @updatedAt @map("updated_at")

  campaign   Campaign       @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  tenant     Tenant         @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  steps      SequenceStep[]

  @@index([campaignId])
  @@map("sequences")
}

model SequenceStep {
  id              String             @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  sequenceId      String             @map("sequence_id") @db.Uuid
  tenantId        String             @map("tenant_id") @db.Uuid
  stepNumber      Int                @map("step_number")
  delayDays       Int                @default(3) @map("delay_days")
  stepType        String             @map("step_type") // email_outreach, email_follow_up, linkedin_connect
  templateSubject String?            @map("template_subject")
  templateBody    String?            @map("template_body")
  createdAt       DateTime           @default(now()) @map("created_at")
  updatedAt       DateTime           @default(now()) @updatedAt @map("updated_at")

  sequence        Sequence           @relation(fields: [sequenceId], references: [id], onDelete: Cascade)
  tenant          Tenant             @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  dispatches      CampaignDispatch[]

  @@unique([sequenceId, stepNumber], name: "stepOrderUnique")
  @@index([sequenceId, stepNumber])
  @@map("sequence_steps")
}

model Prospect {
  id             String         @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenantId       String         @map("tenant_id") @db.Uuid
  email          String
  firstName      String         @map("first_name")
  lastName       String         @map("last_name")
  companyName    String         @map("company_name")
  jobTitle       String         @map("job_title")
  linkedinUrl    String?        @map("linkedin_url")
  fitScore       Int            @default(0) @map("fit_score")
  lifecycleStage String         @default("subscriber") @map("lifecycle_stage")
  contactStatus  String         @default("uncontacted") @map("contact_status")
  customAttributes Json         @default("{}") @map("custom_attributes")
  createdAt      DateTime       @default(now()) @map("created_at")
  updatedAt      DateTime       @default(now()) @updatedAt @map("updated_at")

  tenant         Tenant         @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  notes          ProspectNote[]
  dispatches     CampaignDispatch[]

  @@unique([tenantId, email], name: "tenantProspectEmailUnique")
  @@index([tenantId, email])
  @@index([tenantId, fitScore(sort: Desc)])
  @@map("prospects")
}

model ProspectNote {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  prospectId String   @map("prospect_id") @db.Uuid
  tenantId   String   @map("tenant_id") @db.Uuid
  authorId   String?  @map("author_id") @db.Uuid
  noteBody   String   @map("note_body")
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @default(now()) @updatedAt @map("updated_at")

  prospect   Prospect @relation(fields: [prospectId], references: [id], onDelete: Cascade)
  author     User?    @relation(fields: [authorId], references: [id], onDelete: SetNull)

  @@map("prospect_notes")
}

model CampaignDispatch {
  id                   String        @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  campaignId           String        @map("campaign_id") @db.Uuid
  prospectId           String        @map("prospect_id") @db.Uuid
  tenantId             String        @map("tenant_id") @db.Uuid
  currentSequenceStepId String?       @map("current_sequence_step_id") @db.Uuid
  status               String        @default("enqueued") // enqueued, drafted, approved, sent, opened...
  createdAt            DateTime      @default(now()) @map("created_at")
  updatedAt            DateTime      @default(now()) @updatedAt @map("updated_at")

  campaign             Campaign      @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  prospect             Prospect      @relation(fields: [prospectId], references: [id], onDelete: Cascade)
  tenant               Tenant        @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  currentStep          SequenceStep? @relation(fields: [currentSequenceStepId], references: [id], onDelete: SetNull)
  outboxMessages       OutboxMessage[]
  aiGenerationLogs     AiGenerationLog[]

  @@unique([campaignId, prospectId], name: "campaignProspectUnique")
  @@index([tenantId, status])
  @@map("campaign_dispatches")
}

model OutboxMessage {
  id                String          @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  dispatchId        String          @map("dispatch_id") @db.Uuid
  tenantId          String          @map("tenant_id") @db.Uuid
  senderIdentityId  String          @map("sender_identity_id") @db.Uuid
  subject           String
  body              String
  status            String          @default("draft") // draft, scheduled, sending, sent...
  providerMessageId String?         @map("provider_message_id")
  deliveryError     String?         @map("delivery_error")
  scheduledSendAt   DateTime        @map("scheduled_send_at")
  actualSentAt      DateTime?       @map("actual_sent_at")
  createdAt         DateTime        @default(now()) @map("created_at")
  updatedAt         DateTime        @default(now()) @updatedAt @map("updated_at")

  dispatch          CampaignDispatch @relation(fields: [dispatchId], references: [id], onDelete: Cascade)
  tenant            Tenant           @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  eventLogs         EmailEventLog[]

  @@index([status, scheduledSendAt])
  @@index([providerMessageId])
  @@map("outbox_messages")
}

model EmailEventLog {
  id           String        @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  messageId    String        @map("message_id") @db.Uuid
  tenantId     String        @map("tenant_id") @db.Uuid
  eventType    String        @map("event_type") // open, click, bounce, reply, unsubscribe
  ipAddress    String?       @map("ip_address")
  userAgent    String?       @map("user_agent")
  payload      Json          @default("{}")
  timestamp    DateTime      @default(now())

  message      OutboxMessage @relation(fields: [messageId], references: [id], onDelete: Cascade)
  tenant       Tenant        @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  @@index([messageId])
  @@map("email_event_logs")
}

model Subscription {
  id                   String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenantId             String   @unique @map("tenant_id") @db.Uuid
  stripeCustomerId     String   @unique @map("stripe_customer_id")
  stripeSubscriptionId String   @unique @map("stripe_subscription_id")
  planTier             String   @default("growth") @map("plan_tier") // free, growth, pro, enterprise
  status               String
  currentPeriodStart   DateTime @map("current_period_start")
  currentPeriodEnd     DateTime @map("current_period_end")
  cancelAtPeriodEnd    Boolean  @default(false) @map("cancel_at_period_end")
  createdAt            DateTime @default(now()) @map("created_at")
  updatedAt            DateTime @default(now()) @updatedAt @map("updated_at")

  tenant               Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  invoices             Invoice[]

  @@map("subscriptions")
}

model Invoice {
  id              String       @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  subscriptionId  String       @map("subscription_id") @db.Uuid
  tenantId        String       @map("tenant_id") @db.Uuid
  stripeInvoiceId String       @unique @map("stripe_invoice_id")
  amountDueCents  Int          @map("amount_due_cents")
  amountPaidCents Int          @map("amount_paid_cents")
  status          String       // paid, open, uncollectible, void
  invoicePdfUrl   String?      @map("invoice_pdf_url")
  createdAt       DateTime     @map("created_at")

  subscription    Subscription @relation(fields: [subscriptionId], references: [id], onDelete: Cascade)
  tenant          Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  @@map("invoices")
}

model TenantUsageQuota {
  id                 String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenantId           String   @map("tenant_id") @db.Uuid
  billingCycleStart  DateTime @map("billing_cycle_start")
  billingCycleEnd    DateTime @map("billing_cycle_end")
  emailsSentCount    Int      @default(0) @map("emails_sent_count")
  emailsSentLimit    Int      @default(1000) @map("emails_sent_limit")
  aiTokensConsumed   Int      @default(0) @map("ai_tokens_consumed")
  aiTokensLimit      Int      @default(500000) @map("ai_tokens_limit")
  apiRequestsCount   Int      @default(0) @map("api_requests_count")
  apiRequestsLimit   Int      @default(50000) @map("api_requests_limit")
  createdAt          DateTime @default(now()) @map("created_at")
  updatedAt          DateTime @default(now()) @updatedAt @map("updated_at")

  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  @@unique([tenantId, billingCycleStart], name: "tenantBillingCycleUnique")
  @@index([tenantId, billingCycleStart, billingCycleEnd])
  @@map("tenant_usage_quotas")
}

model AiGenerationLog {
  id                       String            @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenantId                 String            @map("tenant_id") @db.Uuid
  actorId                  String?           @map("actor_id") @db.Uuid
  dispatchId               String?           @map("dispatch_id") @db.Uuid
  modelName                String            @default("gemini-2.5-flash") @map("model_name")
  promptTokenCount         Int               @map("prompt_token_count")
  completionTokenCount     Int               @map("completion_token_count")
  estimatedCostMicrocents  Int               @map("estimated_cost_microcents")
  generationDurationMs     Int               @map("generation_duration_ms")
  inputContextSummary      String?           @map("input_context_summary")
  generationPurpose        String            @map("generation_purpose") // outreach_copy, lead_fit_scoring...
  createdAt                DateTime          @default(now()) @map("created_at")

  tenant                   Tenant            @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  actor                    User?             @relation(fields: [actorId], references: [id], onDelete: SetNull)
  dispatch                 CampaignDispatch? @relation(fields: [dispatchId], references: [id], onDelete: SetNull)

  @@index([tenantId, createdAt])
  @@map("ai_generation_logs")
}

model AuditLog {
  id             String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenantId       String    @map("tenant_id") @db.Uuid
  actorId        String?   @map("actor_id") @db.Uuid
  eventAction    String    @map("event_action") // campaign.delete, user.invite, apikey.create...
  ipAddress      String?   @map("ip_address")
  userAgent      String?   @map("user_agent")
  targetType     String    @map("target_type") // prospects, campaigns...
  targetRecordId String?   @map("target_record_id") @db.Uuid
  stateDelta     Json?     @map("state_delta")
  createdAt      DateTime  @default(now()) @map("created_at")

  tenant         Tenant    @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  actor          User?     @relation(fields: [actorId], references: [id], onDelete: SetNull)

  @@index([tenantId, eventAction, createdAt])
  @@map("audit_logs")
}
`

const sqlCodeBlock = `-- EffectiveBuzz Production-Grade PostgreSQL Relational DDL Migrations
-- Target Database Platform: PostgreSQL v15+ (Cloud SQL)
-- Enforces Multi-Tenancy, Workspace Isolation, RBAC controls, and secure telemetry auditing.

-- Enable required core Postgres extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Safe rollback cleanup
DROP TABLE IF EXISTS "audit_logs" CASCADE;
DROP TABLE IF EXISTS "ai_generation_logs" CASCADE;
DROP TABLE IF EXISTS "tenant_usage_quotas" CASCADE;
DROP TABLE IF EXISTS "invoices" CASCADE;
DROP TABLE IF EXISTS "subscriptions" CASCADE;
DROP TABLE IF EXISTS "email_event_logs" CASCADE;
DROP TABLE IF EXISTS "outbox_messages" CASCADE;
DROP TABLE IF EXISTS "campaign_dispatches" CASCADE;
DROP TABLE IF EXISTS "sequence_steps" CASCADE;
DROP TABLE IF EXISTS "sequences" CASCADE;
DROP TABLE IF EXISTS "prospect_notes" CASCADE;
DROP TABLE IF EXISTS "prospects" CASCADE;
DROP TABLE IF EXISTS "campaigns" CASCADE;
DROP TABLE IF EXISTS "api_keys" CASCADE;
DROP TABLE IF EXISTS "tenant_memberships" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "tenants" CASCADE;

-- 1. TENANCY & WORKSPACE LAYER (Multi-Tenancy Root)
CREATE TABLE "tenants" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(255) NOT NULL,
  "slug" VARCHAR(100) UNIQUE NOT NULL,
  "status" VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active', 'suspended', 'deletion_pending'
  "settings" JSONB NOT NULL DEFAULT '{}'::jsonb, -- Custom tenant configuration maps
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- USER PROFILE REGISTRY
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "avatar_url" VARCHAR(512),
  "mfa_enabled" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- MULTI-TENANT RBAC WORKSPACE MEMBERSHIPS
CREATE TABLE "tenant_memberships" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "role" VARCHAR(50) NOT NULL DEFAULT 'member', -- 'owner', 'admin', 'member', 'agent'
  "status" VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active', 'invited', 'suspended'
  "invited_at" TIMESTAMP WITH TIME ZONE,
  "joined_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT "uq_tenant_user" UNIQUE ("tenant_id", "user_id")
);

-- SECURE WORKSPACE REST API KEYS
CREATE TABLE "api_keys" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "name" VARCHAR(100) NOT NULL,
  "key_hash" CHAR(64) NOT NULL UNIQUE, -- SHA-256 hash of API secret key
  "key_prefix" VARCHAR(10) NOT NULL, -- e.g., 'eb_live_'
  "scopes" VARCHAR(50)[] NOT NULL DEFAULT '{"read"}', -- fine-grained RBAC scopes
  "expires_at" TIMESTAMP WITH TIME ZONE,
  "last_used_at" TIMESTAMP WITH TIME ZONE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "created_by" UUID REFERENCES "users"("id") ON DELETE SET NULL
);


-- 2. CAMPAIGN & SEQUENCE STRUCTURES
CREATE TABLE "campaigns" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "name" VARCHAR(255) NOT NULL,
  "status" VARCHAR(50) NOT NULL DEFAULT 'draft', -- 'draft', 'active', 'paused', 'completed'
  "target_audience_segment" TEXT NOT NULL,
  "ai_prompt_guidelines" TEXT, -- Custom tone rules injected into Gemini models
  "daily_send_limit" INTEGER NOT NULL DEFAULT 100,
  "created_by" UUID REFERENCES "users"("id") ON DELETE SET NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "sequences" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "campaign_id" UUID NOT NULL REFERENCES "campaigns"("id") ON DELETE CASCADE,
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "name" VARCHAR(255) NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "sequence_steps" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "sequence_id" UUID NOT NULL REFERENCES "sequences"("id") ON DELETE CASCADE,
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "step_number" INTEGER NOT NULL, -- Sorting index (sequence step 1, 2, 3...)
  "delay_days" INTEGER NOT NULL DEFAULT 3, -- Wait time before sending step
  "step_type" VARCHAR(50) NOT NULL, -- 'email_outreach', 'email_follow_up', 'linkedin_connect'
  "template_subject" VARCHAR(255),
  "template_body" TEXT, -- Multi-variable syntax tags (e.g. {{firstName}}, {{company}})
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT "uq_sequence_step_order" UNIQUE ("sequence_id", "step_number")
);


-- 3. PROSPECT CRM LAYER
CREATE TABLE "prospects" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "email" VARCHAR(255) NOT NULL,
  "first_name" VARCHAR(100) NOT NULL,
  "last_name" VARCHAR(100) NOT NULL,
  "company_name" VARCHAR(255) NOT NULL,
  "job_title" VARCHAR(255) NOT NULL,
  "linkedin_url" VARCHAR(512),
  "fit_score" INTEGER NOT NULL DEFAULT 0, -- Score calculated by scoring algorithm (0-100)
  "lifecycle_stage" VARCHAR(50) NOT NULL DEFAULT 'subscriber', -- 'subscriber', 'lead', 'marketing_qualified', 'sales_qualified', 'customer'
  "contact_status" VARCHAR(50) NOT NULL DEFAULT 'uncontacted', -- 'uncontacted', 'attempted', 'contacted', 'replied', 'do_not_contact'
  "custom_attributes" JSONB NOT NULL DEFAULT '{}'::jsonb, -- Custom values for personalization engines
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT "uq_tenant_prospect_email" UNIQUE ("tenant_id", "email")
);

CREATE TABLE "prospect_notes" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "prospect_id" UUID NOT NULL REFERENCES "prospects"("id") ON DELETE CASCADE,
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "author_id" UUID REFERENCES "users"("id") ON DELETE SET NULL,
  "note_body" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- 4. DISPATCHER & DELIVERY ENGINE
CREATE TABLE "campaign_dispatches" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "campaign_id" UUID NOT NULL REFERENCES "campaigns"("id") ON DELETE CASCADE,
  "prospect_id" UUID NOT NULL REFERENCES "prospects"("id") ON DELETE CASCADE,
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "current_sequence_step_id" UUID REFERENCES "sequence_steps"("id") ON DELETE SET NULL,
  "status" VARCHAR(50) NOT NULL DEFAULT 'enqueued', -- 'enqueued', 'drafted', 'approved', 'sent', 'opened', 'replied', 'bounced', 'unsubscribed'
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT "uq_campaign_prospect" UNIQUE ("campaign_id", "prospect_id")
);

CREATE TABLE "outbox_messages" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "dispatch_id" UUID NOT NULL REFERENCES "campaign_dispatches"("id") ON DELETE CASCADE,
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "sender_identity_id" UUID NOT NULL, -- Represents associated user email configurations
  "subject" VARCHAR(255) NOT NULL,
  "body" TEXT NOT NULL,
  "status" VARCHAR(50) NOT NULL DEFAULT 'draft', -- 'draft', 'scheduled', 'sending', 'sent', 'failed'
  "provider_message_id" VARCHAR(255), -- SMTP / SES / SendGrid message hook ID
  "delivery_error" TEXT,
  "scheduled_send_at" TIMESTAMP WITH TIME ZONE NOT NULL,
  "actual_sent_at" TIMESTAMP WITH TIME ZONE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "email_event_logs" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "message_id" UUID NOT NULL REFERENCES "outbox_messages"("id") ON DELETE CASCADE,
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "event_type" VARCHAR(50) NOT NULL, -- 'open', 'click', 'bounce', 'reply', 'unsubscribe'
  "ip_address" VARCHAR(50),
  "user_agent" VARCHAR(512),
  "payload" JSONB DEFAULT '{}'::jsonb, -- Store webhook delivery event metadata
  "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- 5. BILLING & SUBSCRIPTIONS
CREATE TABLE "subscriptions" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE UNIQUE,
  "stripe_customer_id" VARCHAR(255) UNIQUE NOT NULL,
  "stripe_subscription_id" VARCHAR(255) UNIQUE NOT NULL,
  "plan_tier" VARCHAR(50) NOT NULL DEFAULT 'growth', -- 'free', 'growth', 'professional', 'enterprise'
  "status" VARCHAR(50) NOT NULL, -- 'active', 'past_due', 'unpaid', 'canceled', 'incomplete'
  "current_period_start" TIMESTAMP WITH TIME ZONE NOT NULL,
  "current_period_end" TIMESTAMP WITH TIME ZONE NOT NULL,
  "cancel_at_period_end" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "invoices" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "subscription_id" UUID NOT NULL REFERENCES "subscriptions"("id") ON DELETE CASCADE,
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "stripe_invoice_id" VARCHAR(255) UNIQUE NOT NULL,
  "amount_due_cents" INTEGER NOT NULL,
  "amount_paid_cents" INTEGER NOT NULL,
  "status" VARCHAR(50) NOT NULL, -- 'paid', 'open', 'uncollectible', 'void'
  "invoice_pdf_url" VARCHAR(512),
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL
);


-- 6. AI USAGE TRACKING & QUOTAS
CREATE TABLE "tenant_usage_quotas" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "billing_cycle_start" TIMESTAMP WITH TIME ZONE NOT NULL,
  "billing_cycle_end" TIMESTAMP WITH TIME ZONE NOT NULL,
  "emails_sent_count" INTEGER NOT NULL DEFAULT 0,
  "emails_sent_limit" INTEGER NOT NULL DEFAULT 1000,
  "ai_tokens_consumed" INTEGER NOT NULL DEFAULT 0,
  "ai_tokens_limit" INTEGER NOT NULL DEFAULT 500000,
  "api_requests_count" INTEGER NOT NULL DEFAULT 0,
  "api_requests_limit" INTEGER NOT NULL DEFAULT 50000,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT "uq_tenant_billing_cycle" UNIQUE ("tenant_id", "billing_cycle_start")
);

CREATE TABLE "ai_generation_logs" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "actor_id" UUID REFERENCES "users"("id") ON DELETE SET NULL,
  "dispatch_id" UUID REFERENCES "campaign_dispatches"("id") ON DELETE SET NULL,
  "model_name" VARCHAR(100) NOT NULL DEFAULT 'gemini-2.5-flash',
  "prompt_token_count" INTEGER NOT NULL,
  "completion_token_count" INTEGER NOT NULL,
  "estimated_cost_microcents" INTEGER NOT NULL, -- Micro-cents calculated dynamically
  "generation_duration_ms" INTEGER NOT NULL,
  "input_context_summary" VARCHAR(512), -- Cleaned context string for safety audits
  "generation_purpose" VARCHAR(100) NOT NULL, -- 'outreach_copy', 'lead_fit_scoring', 'tone_polisher'
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- 7. AUDIT LOGS LAYER
CREATE TABLE "audit_logs" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "tenant_id" UUID NOT NULL REFERENCES "tenants"("id") ON DELETE CASCADE,
  "actor_id" UUID REFERENCES "users"("id") ON DELETE SET NULL,
  "event_action" VARCHAR(100) NOT NULL, -- e.g., 'campaign.delete', 'user.invite', 'apikey.create'
  "ip_address" VARCHAR(50),
  "user_agent" VARCHAR(512),
  "target_type" VARCHAR(100) NOT NULL, -- e.g., 'prospects', 'campaigns'
  "target_record_id" UUID,
  "state_delta" JSONB, -- Tracks previous vs. new values
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- 8. COMPREHENSIVE PERFORMANCE INDEXES
-- Index design rules: Speed up foreign join lookups, secure tenant filters, and sort log timelines.

CREATE INDEX "idx_memberships_tenant" ON "tenant_memberships" ("tenant_id");
CREATE INDEX "idx_memberships_user" ON "tenant_memberships" ("user_id");
CREATE INDEX "idx_api_keys_hash" ON "api_keys" ("key_hash");

CREATE INDEX "idx_campaigns_tenant_status" ON "campaigns" ("tenant_id", "status");
CREATE INDEX "idx_sequences_campaign" ON "sequences" ("campaign_id");
CREATE INDEX "idx_steps_sequence_order" ON "sequence_steps" ("sequence_id", "step_number");

CREATE INDEX "idx_prospects_tenant_email" ON "prospects" ("tenant_id", "email");
CREATE INDEX "idx_prospects_tenant_score" ON "prospects" ("tenant_id", "fit_score" DESC);
CREATE INDEX "idx_prospects_lifecycle" ON "prospects" ("lifecycle_stage");
CREATE INDEX "idx_prospects_custom_json" ON "prospects" USING gin ("custom_attributes");

CREATE INDEX "idx_dispatches_status" ON "campaign_dispatches" ("tenant_id", "status");
CREATE INDEX "idx_outbox_scheduled_send" ON "outbox_messages" ("status", "scheduled_send_at") WHERE "status" IN ('scheduled', 'draft');
CREATE INDEX "idx_outbox_provider_id" ON "outbox_messages" ("provider_message_id");
CREATE INDEX "idx_event_logs_message" ON "email_event_logs" ("message_id");

CREATE INDEX "idx_quotas_tenant_cycle" ON "tenant_usage_quotas" ("tenant_id", "billing_cycle_start", "billing_cycle_end");
CREATE INDEX "idx_ai_logs_tenant_date" ON "ai_generation_logs" ("tenant_id", "created_at" DESC);
CREATE INDEX "idx_audit_logs_action" ON "audit_logs" ("tenant_id", "event_action", "created_at" DESC);
`

export const openapiJsonObject = `{
  "openapi": "3.1.0",
  "info": {
    "title": "EffectiveBuzz Business Suite Core APIs",
    "description": "Production REST API definitions for multi-tenant campaign management, CRM sales prospects pipelines, real-time analytics aggregation, and Gemini-based copilot dispatch logs.",
    "version": "1.0.0",
    "contact": {
      "name": "EffectiveBuzz API Support",
      "url": "https://effectivebuzz.ai/dev-support",
      "email": "api-gateway@effectivebuzz.ai"
    }
  },
  "servers": [
    {
      "url": "https://api.effectivebuzz.ai/v1",
      "description": "Production Isolated Ingress Gateway Cluster"
    }
  ],
  "paths": {
    "/auth/login": {
      "post": {
        "summary": "Authenticate User Identity",
        "description": "Checks email and security password hashes on target identity tables. Issues temporary exchange challenge token if Multi-Factor TOTP is configured.",
        "operationId": "authenticateIdentity",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                    "format": "email",
                    "description": "RFC 5322 compliance email string."
                  },
                  "password": {
                    "type": "string",
                    "minLength": 8,
                    "description": "Strong password string."
                  }
                },
                "required": ["email", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Second-factor authenticator challenge details returned.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": { "type": "string" },
                    "mfaToken": { "type": "string" },
                    "expiresInSeconds": { "type": "integer" },
                    "factor": { "type": "string" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/auth/mfa/verify": {
      "post": {
        "summary": "Verify TOTP Factor Code",
        "description": "Verifies time-based verification codes corresponding to the user identity. Returns jwt tokens.",
        "operationId": "verifyTotpCode",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "mfaToken": { "type": "string" },
                  "code": { "type": "string", "pattern": "^[0-9]{6}$" }
                },
                "required": ["mfaToken", "code"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Identity verified. Enriched access tokens returned.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "accessToken": { "type": "string" },
                    "refreshToken": { "type": "string" },
                    "user": { "type": "object" },
                    "workspaces": { "type": "array" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/workspaces": {
      "get": {
        "summary": "List Authorized Workspaces",
        "description": "Obtains list of workspace schemas connected to JWT identity context keys.",
        "responses": {
          "200": {
            "description": "List of workspaces.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "type": "object" }
                }
              }
            }
          }
        },
        "security": [{ "BearerAuth": [] }]
      },
      "post": {
        "summary": "Provision Workspace Node",
        "description": "Establishes a logically isolated platform database metadata node mapping target subdomains.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": { "type": "string", "maxLength": 100 },
                  "slug": { "type": "string", "pattern": "^[a-z0-9-]+$" }
                },
                "required": ["name", "slug"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "SaaS tenant workspace created.",
            "content": {
              "application/json": {
                "schema": { "type": "object" }
              }
            }
          }
        },
        "security": [{ "BearerAuth": [] }]
      }
    },
    "/workspaces/{tenantId}/keys": {
      "post": {
        "summary": "Issue API Key",
        "description": "Allocates high-level programmatic integration access key. Stores SHA-256 digests on database logs.",
        "parameters": [
          { "name": "tenantId", "in": "path", "required": true, "schema": { "type": "string", "format": "uuid" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "scopes": { "type": "array", "items": { "type": "string" } },
                  "expiresInDays": { "type": "integer", "minimum": 1 }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "API Key issued."
          }
        },
        "security": [{ "BearerAuth": [] }]
      }
    },
    "/workspaces/{tenantId}/prospects": {
      "get": {
        "summary": "Query prospects crm",
        "description": "Returns client records matching filters.",
        "parameters": [
          { "name": "tenantId", "in": "path", "required": true, "schema": { "type": "string" } },
          { "name": "fitScoreMin", "in": "query", "schema": { "type": "integer" } },
          { "name": "lifecycleStage", "in": "query", "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Prospect lists retrieved." }
        },
        "security": [{ "BearerAuth": [] }, { "ApiKeyAuth": [] }]
      },
      "post": {
        "summary": "Upsert CRM Lead Node",
        "description": "Injects lead profiles. Queues fit scoring models.",
        "parameters": [
          { "name": "tenantId", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": { "type": "string", "format": "email" },
                  "firstName": { "type": "string" },
                  "lastName": { "type": "string" },
                  "customAttributes": { "type": "object" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Lead upserted." }
        },
        "security": [{ "BearerAuth": [] }, { "ApiKeyAuth": [] }]
      }
    },
    "/workspaces/{tenantId}/campaigns": {
      "get": {
        "summary": "List sequence campaigns",
        "parameters": [
          { "name": "tenantId", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Campaigns configurations list." }
        }
      },
      "post": {
        "summary": "Orchestrate Sequencer",
        "parameters": [
          { "name": "tenantId", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "targetAudienceSegment": { "type": "string" },
                  "sequences": { "type": "array", "items": { "type": "object" } }
                }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Outbound outreach sequence scheduled." }
        }
      }
    },
    "/workspaces/{tenantId}/inbox": {
      "get": {
        "summary": "Read outbox delivery queues",
        "parameters": [
          { "name": "tenantId", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Outbound deliveries payload." }
        }
      }
    },
    "/workspaces/{tenantId}/inbox/webhook": {
      "post": {
        "summary": "Mailing Provider Intake Hook",
        "description": "Provider webhook ingress interface. Tracking opens, bounces, and replies.",
        "parameters": [
          { "name": "tenantId", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "providerMessageId": { "type": "string" },
                  "eventType": { "type": "string", "enum": ["open", "click", "bounce", "reply"] }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Payload received logged." }
        }
      }
    },
    "/workspaces/{tenantId}/analytics/dashboard": {
      "get": {
        "summary": "Derive Analytics Funnel Metrics",
        "parameters": [
          { "name": "tenantId", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Metrics summary." }
        }
      }
    },
    "/workspaces/{tenantId}/billing/subscription": {
      "get": {
        "summary": "Query subscription, plan, and credits quotas",
        "parameters": [
          { "name": "tenantId", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Quotas limits." }
        }
      }
    },
    "/workspaces/{tenantId}/billing/checkout": {
      "post": {
        "summary": "Checkout session builder",
        "parameters": [
          { "name": "tenantId", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "priceId": { "type": "string" },
                  "successUrl": { "type": "string" },
                  "cancelUrl": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Checkout session session payload." }
        }
      }
    },
    "/workspaces/{tenantId}/ai/generate": {
      "post": {
        "summary": "Leverage Gemini Outbound Copy Engine",
        "parameters": [
          { "name": "tenantId", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "prospectId": { "type": "string" },
                  "campaignId": { "type": "string" },
                  "instructionOverride": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Personalized draft email generated." }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "BearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      },
      "ApiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "X-API-KEY"
      }
    }
  }
}
`;

