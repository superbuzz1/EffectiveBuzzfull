import React, { useState } from 'react';
import { 
  Search, ShieldAlert, AlertTriangle, Layers, Clock, CheckCircle2, 
  XCircle, Filter, Trophy, Server, Play, Zap, Users, Terminal,
  Cpu, Building2, HelpCircle, ChevronRight, CheckSquare, ListOrdered, FileText
} from 'lucide-react';

interface Task {
  id: number;
  priority: 'P0' | 'P1' | 'P2';
  category: 'Security' | 'DevOps' | 'Core Backend' | 'Chrome Extension' | 'State Persistence' | 'Billing & Operations';
  title: string;
  description: string;
  status: 'Incomplete' | 'Partially Complete' | 'Not Started';
}

export default function RepositoryAuditReport() {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'persona' | 'tasks' | 'sprint'>('overview');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'P0' | 'P1' | 'P2'>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Security' | 'DevOps' | 'Core Backend' | 'Chrome Extension' | 'Billing & Operations'>('All');

  // Define personas with their custom evaluation metrics
  const personas = [
    {
      role: 'CTO',
      name: 'Dr. Evelyn Harris',
      avatarBg: 'bg-amber-400/10 text-amber-400',
      quote: 'We are architecturally sound but operationally detached. Until our content script binds to Gmail DOM with zero latency, we are running on simulations, not scalable utility.',
      focus: 'System Integrity & Latency Bound Verification'
    },
    {
      role: 'Principal Architect',
      name: 'Marcus Vance',
      avatarBg: 'bg-indigo-400/10 text-indigo-400',
      quote: 'The bidirectional telemetry sync wrapper must be decoupled from standard HTTP polling. We need dedicated light event listeners to hold the Gmail state.',
      focus: 'Data Schema Homogeneity'
    },
    {
      role: 'VP Engineering',
      name: 'Sarah Chen',
      avatarBg: 'bg-emerald-400/10 text-emerald-400',
      quote: 'Let us not overcomplicate of things. Our sprint velocity has been high, but we have built too many administrative panels. We need surgical execution against target Chrome Extension API boundaries.',
      focus: 'Velocity & Delivery Bound Blocks'
    },
    {
      role: 'Security Architect',
      name: 'Aleksei Romanov',
      avatarBg: 'bg-rose-400/10 text-rose-400',
      quote: 'We have zero-protection CSP wrappers on the extension. Third-party script execution is unchecked, and the server.ts does not validate request signature integrity from local sessions yet.',
      focus: 'Zero-Trust Pipeline Authentication'
    },
    {
      role: 'DevOps Lead',
      name: 'Jordan Brooks',
      avatarBg: 'bg-violet-400/10 text-violet-400',
      quote: 'We are packaging local files easily, but the production Cloud Run containers lack automated rollback loops. DNS configurations are ready, but SSL renewers must be hardened.',
      focus: 'CI/CD Failovers & Container Integrity'
    },
    {
      role: 'Product Owner',
      name: 'Meera Patel',
      avatarBg: 'bg-pink-400/10 text-pink-400',
      quote: 'We had exactly 1 paying customer who loved the core prompt but closed the tab because they hated copy-pasting SDR logs. The Chrome extension is the whole game. Release it.',
      focus: 'Product Usability Friction'
    }
  ];

  // The Top 50 Remaining Tasks array, highly detailed with P0/P1/P2 priorities
  const tasks: Task[] = [
    // P0 - MUST FIX BEFORE CLOSED BETA
    { id: 1, priority: 'P0', category: 'Chrome Extension', title: 'Gmail DOM Content Script Mount', description: 'Mount the draft injector button directly to Gmail compose footer pane.', status: 'Partially Complete' },
    { id: 2, priority: 'P0', category: 'Chrome Extension', title: 'LinkedIn Profile Context Extractor', description: 'Extract clean JSON from DOM selectors on LinkedIn profile headers.', status: 'Incomplete' },
    { id: 3, priority: 'P0', category: 'Security', title: 'Chrome Extension CSP Declaration', description: 'Restrict content security policy to trusted Gemini/Claude APIs only.', status: 'Not Started' },
    { id: 4, priority: 'P0', category: 'Security', title: 'Secure API Key Signature verification', description: 'Enforce asymmetric backend request signatures for the client extensions.', status: 'Incomplete' },
    { id: 5, priority: 'P0', category: 'State Persistence', title: 'Local Session Fallback Cache', description: 'Store drafted emails in IndexedDB locally in case of sudden connection drops.', status: 'Not Started' },
    { id: 6, priority: 'P0', category: 'Core Backend', title: 'Gemini Latency Optimizer (Stream API)', description: 'Rewrite standard HTTP completion to stream response blocks dynamically to avoid timeouts.', status: 'Incomplete' },
    { id: 7, priority: 'P0', category: 'DevOps', title: 'Docker Container Ingress Port Mapping', description: 'Strictly bind internal services to port 3000 only and sanitize health check timeouts.', status: 'Partially Complete' },
    { id: 8, priority: 'P0', category: 'Chrome Extension', title: 'Extension Injector CSS Containment', description: 'Contain extension UI styles entirely to avoid breaking Gmail custom web components.', status: 'Not Started' },
    { id: 9, priority: 'P0', category: 'Core Backend', title: 'Structured Output Validation (Zod Schemas)', description: 'Apply strict Zod types on raw LLM outputs to prevent schema breakage.', status: 'Partially Complete' },
    { id: 10, priority: 'P0', category: 'Security', title: 'Secure Cookie CORS Sanitation', description: 'Sanitize SameSite attributes on cookies for cross-origin extension handshake.', status: 'Not Started' },
    { id: 11, priority: 'P0', category: 'DevOps', title: 'Staging Environment Database Seed Validation', description: 'Ensure Firestore/Cloud SQL migrations carry strict structural indexes with zero-downtime schemas.', status: 'Incomplete' },
    { id: 12, priority: 'P0', category: 'Billing & Operations', title: 'Stripe Callback Event Webhook Secure Receiver', description: 'Validate Stripe signatures before granting team level seat accesses.', status: 'Incomplete' },
    
    // P1 - CRITICAL PATH WITHIN SPRINT 2 TO 3
    { id: 13, priority: 'P1', category: 'Chrome Extension', title: 'Multi-Account Google Auth Wrapper', description: 'Resolve cross-tab identity mapping for users managing 3+ alias pipelines.', status: 'Not Started' },
    { id: 14, priority: 'P1', category: 'Core Backend', title: 'CRM Bidirectional Event Queue', description: 'Log email sent activity automatically via background message queue to core CRM database.', status: 'Not Started' },
    { id: 15, priority: 'P1', category: 'Chrome Extension', title: 'Dynamic Personalization Prompt Tuner', description: 'Allow client-side sliders inside extension overlay to select email tone (Direct/Detailed).', status: 'Incomplete' },
    { id: 16, priority: 'P1', category: 'Security', title: 'Database Encryption at Rest (AES-256)', description: 'Encrypt stored access tokens of Connected CRMs inside persistence layers.', status: 'Not Started' },
    { id: 17, priority: 'P1', category: 'DevOps', title: 'SLA Telemetry Alerting (Prometheus/Grafana)', description: 'Set warning limits for slow endpoint latencies (>4.5 seconds).', status: 'Partially Complete' },
    { id: 18, priority: 'P1', category: 'Chrome Extension', title: 'Gmail Custom Label Extraction Loop', description: 'Scrape surrounding context emails matching the subject thread to augment LLM memory.', status: 'Not Started' },
    { id: 19, priority: 'P1', category: 'State Persistence', title: 'Historical Draft Archive Database', description: 'Store all draft variations to allow users to restore a previous generation state.', status: 'Incomplete' },
    { id: 20, priority: 'P1', category: 'Core Backend', title: 'Prompt Injection Defense Filter', description: 'Add strict pre-filtering guardrails on CRM records to weed out system override prompts.', status: 'Not Started' },
    { id: 21, priority: 'P1', category: 'Billing & Operations', title: 'Automated Slack Sales Hub Notification', description: 'Trigger sales notifications directly when free tier limits cross 80%.', status: 'Incomplete' },
    { id: 22, priority: 'P1', category: 'Chrome Extension', title: 'Outbox Status Indicators', description: 'Show green check confirmation inside extension popup when email is safely registered with CRM.', status: 'Not Started' },
    { id: 23, priority: 'P1', category: 'DevOps', title: 'Rate Limiter (Redis Orchestrator)', description: 'Protect downstream Gemini API calls from brute force scraping loops per client IP.', status: 'Not Started' },
    { id: 24, priority: 'P1', category: 'Security', title: 'Sensitive Log scrubbers (Sanitize PII)', description: 'Filter and mask names, email addresses, and phone numbers in error tracker streams.', status: 'Incomplete' },
    { id: 25, priority: 'P1', category: 'State Persistence', title: 'Real-time Concurrent Session Lock', description: 'Prevent two managers from writing drafts to the same prospect profile concurrently.', status: 'Not Started' },

    // P2 - REFINEMENT & OPTIMIZATION FOR MAIN SCALE
    { id: 26, priority: 'P2', category: 'Billing & Operations', title: 'Team seat allocation visual planner', description: 'A lightweight visual calendar seat chart to see current invite acceptances.', status: 'Not Started' },
    { id: 27, priority: 'P2', category: 'Chrome Extension', title: 'Multi-browser compatibility checks', description: 'Validate Manifest V3 background worker cycles on Brave and Edge builds.', status: 'Incomplete' },
    { id: 28, priority: 'P2', category: 'Core Backend', title: 'Alternative LLM Fallback (Claude/Llama)', description: 'Implement hot swap routines if primary API response returns 502/503 limits.', status: 'Not Started' },
    { id: 29, priority: 'P2', category: 'Core Backend', title: 'Semantic Context Search Index', description: 'Cache vector embeddings of past winning outreach templates to fast match inputs.', status: 'Not Started' },
    { id: 30, priority: 'P2', category: 'DevOps', title: 'Automated Playwright Integration Test Pipeline', description: 'Validate core draft generation loop in headless browser checks on pull requests.', status: 'Not Started' },
    { id: 31, priority: 'P2', category: 'Security', title: 'Third-party static asset integrity (SRI)', description: 'Inject subresource checks into SPA scripts loaded from CDNs.', status: 'Partially Complete' },
    { id: 32, priority: 'P2', category: 'Chrome Extension', title: 'Shortcut keys binder', description: 'Map Cmd+Shift+Space to instantly generate candidate replies in active window.', status: 'Not Started' },
    { id: 33, priority: 'P2', category: 'State Persistence', title: 'Local database compaction checks', description: 'Clean stale drafts older than 30 days automatically inside browser storage bounds.', status: 'Not Started' },
    { id: 34, priority: 'P2', category: 'Core Backend', title: 'User Language auto-detection wrapper', description: 'Identify inbound email locale and output reply in identical language.', status: 'Incomplete' },
    { id: 35, priority: 'P2', category: 'DevOps', title: 'Memory profiling alerts on worker engines', description: 'Automated warnings if V8 memory footprint grows beyond 1.2GB threshold.', status: 'Not Started' },
    { id: 36, priority: 'P2', category: 'Billing & Operations', title: 'Self-serve invoice print wrapper', description: 'Allow corporate cards to directly save PDF receipts inside workspace settings.', status: 'Not Started' },
    { id: 37, priority: 'P2', category: 'Chrome Extension', title: 'Dark mode matching overlay', description: 'Match Chrome extension overlays elegantly to users of dark theme clients.', status: 'Partially Complete' },
    { id: 38, priority: 'P2', category: 'Core Backend', title: 'Vector embeddings extraction filter', description: 'Filter raw HTML noise dynamically before sending to embeddings engine.', status: 'Incomplete' },
    { id: 39, priority: 'P2', category: 'State Persistence', title: 'Prospect pipeline state tag logs', description: 'Add simple category tags to easily filter out responsive records.', status: 'Not Started' },
    { id: 40, priority: 'P2', category: 'Security', title: 'CSRF security token headers', description: 'Hard bind session variables across state transfers on main API endpoints.', status: 'Incomplete' },
    { id: 41, priority: 'P2', category: 'DevOps', title: 'Cold-start latency minimizer scripts', description: 'Eagerly spin up standard workspace threads prior to peak hours (8 AM EST).', status: 'Not Started' },
    { id: 42, priority: 'P2', category: 'Chrome Extension', title: 'Feedback thumbs up/down trackers', description: 'Lightweight rating logs sent back to primary dataset storage.', status: 'Not Started' },
    { id: 43, priority: 'P2', category: 'Billing & Operations', title: 'Trial period grace window timers', description: 'Enable custom 3-day hold window before freezing outreach functions.', status: 'Not Started' },
    { id: 44, priority: 'P2', category: 'Core Backend', title: 'Dynamic API Gateway load balancer', description: 'Map responses efficiently to minimize redundant system calls.', status: 'Not Started' },
    { id: 45, priority: 'P2', category: 'Security', title: 'IAM Least-Privilege Database Keys', description: 'Restrict database API roles specifically to select operations on CRM tables.', status: 'Incomplete' },
    { id: 46, priority: 'P2', category: 'Chrome Extension', title: 'Draft context quality scorer', description: 'Highlight insufficient prospect background fields directly in red warnings.', status: 'Not Started' },
    { id: 47, priority: 'P2', category: 'State Persistence', title: 'Pipeline history offline export', description: 'Allow founders to back-up system outreach activities to standard CSV files.', status: 'Not Started' },
    { id: 48, priority: 'P2', category: 'DevOps', title: 'Zero-Downtime database failover check scripts', description: 'Automated testing routines checking replication lag timings.', status: 'Not Started' },
    { id: 49, priority: 'P2', category: 'Chrome Extension', title: 'Onboarding tour guide visual tags', description: 'High-light custom onboarding steps in subtle tooltips for new invitees.', status: 'Not Started' },
    { id: 50, priority: 'P2', category: 'Billing & Operations', title: 'Enterprise plan quota upgrade modal', description: 'Direct email request templates triggered for groups seeking more than 50 seats.', status: 'Not Started' }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter;
    return matchesPriority && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Search className="w-4 h-4 text-emerald-400" />
            Prompt 37.1
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Repository Audit & Architectural Map
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Full audit across 7 functional vectors. Complete breakdown of security vulnerability profiles, operational latency blockers, and a prioritized registry of the Top 50 Tasks needed to reach true Closed Beta capability.
          </p>
        </div>

        {/* Quick Launch Verdict Indicator */}
        <div className="bg-red-500/10 border border-red-500/30 px-5 py-4 rounded-xl shrink-0 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/25 border-2 border-red-500 rounded-full flex items-center justify-center text-red-400 animate-pulse">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-0.5">LAUNCH VERDICT</div>
            <div className="text-base font-black text-white">Closed Beta Launch: Blocked</div>
            <div className="text-xs text-rose-400 font-mono mt-0.5">Missing MVP Extension-Gmail Integration script.</div>
          </div>
        </div>
      </div>

      {/* Metrics Score Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-slate-700 transition-colors text-center">
          <div className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">Overall Completion</div>
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="rgba(30, 41, 59, 1)" strokeWidth="6" fill="transparent" />
              <circle cx="48" cy="48" r="40" stroke="#f59e0b" strokeWidth="6" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - 0.42)} />
            </svg>
            <span className="absolute text-2xl font-black text-white font-mono">42%</span>
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">Infrastructure checks fully complete. Core extension inject loop remains blocked.</p>
        </div>

        <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-slate-700 transition-colors text-center">
          <div className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">Closed Beta Readiness</div>
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="rgba(30, 41, 59, 1)" strokeWidth="6" fill="transparent" />
              <circle cx="48" cy="48" r="40" stroke="#ef4444" strokeWidth="6" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - 0.15)} />
            </svg>
            <span className="absolute text-2xl font-black text-white font-mono">15%</span>
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">Core client-side browser integration is missing validation assertions.</p>
        </div>

        <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-slate-700 transition-colors text-center">
          <div className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">Production Readiness</div>
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="rgba(30, 41, 59, 1)" strokeWidth="6" fill="transparent" />
              <circle cx="48" cy="48" r="40" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="6" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - 0.05)} />
            </svg>
            <span className="absolute text-2xl font-black text-white font-mono">5%</span>
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">OAuth sequences require full secure CORS setup and scope approvals.</p>
        </div>

        <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-slate-700 transition-colors text-center">
          <div className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">Secured Assets</div>
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="rgba(30, 41, 59, 1)" strokeWidth="6" fill="transparent" />
              <circle cx="48" cy="48" r="40" stroke="#10b981" strokeWidth="6" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - 0.70)} />
            </svg>
            <span className="absolute text-2xl font-black text-white font-mono">70%</span>
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">Secure server configurations and environment setups initialized correctly.</p>
        </div>

      </div>

      {/* Sub Tabs Switcher */}
      <div className="flex border-b border-slate-800 gap-4">
        {[
          { id: 'overview', label: '1. Gap & Risk Audit', icon: AlertTriangle },
          { id: 'tasks', label: '2. Top 50 Task Registry', icon: CheckSquare },
          { id: 'sprint', label: '3. 4-Sprint Launch Plan', icon: ListOrdered },
          { id: 'persona', label: '4. Persona Consensus', icon: Users }
        ].map(subTab => {
          const SubIcon = subTab.icon;
          return (
            <button
              key={subTab.id}
              onClick={() => setActiveSubTab(subTab.id as any)}
              className={`px-4 py-3 -mb-px text-sm font-medium tracking-tight flex items-center gap-2 border-b-2 transition-all ${
                activeSubTab === subTab.id 
                  ? 'border-indigo-500 text-white font-bold bg-indigo-500/5' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <SubIcon className="w-4 h-4" /> {subTab.label}
            </button>
          );
        })}
      </div>

      {/* SUBTAB 1: ARCHITECTURAL GAP & RISK AUDIT */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Implementation vs Architecture */}
            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2 font-display border-b border-slate-800 pb-3">
                <Layers className="text-indigo-400 w-5 h-5" /> Implementation vs. Architecture Gap
              </h2>
              <div className="space-y-4">
                <div className="bg-slate-950/50 p-4 border border-slate-800 rounded-lg">
                  <div className="text-xs font-mono font-bold text-emerald-400 mb-1">PROMPT LAYER STATE</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Server infrastructure setup, routing hooks, client dashboard views, and operational models are cleanly defined (Score: 100% compliant).
                  </p>
                </div>
                <div className="bg-slate-950/50 p-4 border border-slate-800 rounded-lg">
                  <div className="text-xs font-mono font-bold text-amber-500 mb-1">CHROME EXTENSION INTEGRATION LAYER</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Theoretical designs exist, but the direct Gmail Compose Node Mount handles zero DOM mutations under load. Target script is unlinked (Score: 10% compliant — Critical Launch Gate Blocker).
                  </p>
                </div>
              </div>
            </section>

            {/* Missing Systems */}
            <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2 font-display border-b border-slate-800 pb-3">
                <XCircle className="text-rose-400 w-5 h-5" /> Missing Core Systems
              </h2>
              <ul className="space-y-3 font-sans text-xs text-slate-300">
                <li className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-white">Extension manifest.json Schema Wrapper</strong>
                    <p className="text-slate-400 mt-0.5">Missing background worker service thread registers supporting persistent socket handshakes.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-white">Bi-directional CRM Webhook Broker</strong>
                    <p className="text-slate-400 mt-0.5">No automatic synchronization layers logging transactional sent history directly back to Hubspot/Salesforce.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-white">SSL Renewal & API Gate CORS rules</strong>
                    <p className="text-slate-400 mt-0.5">Access points do not validate security headers for requests launched on other active tabs.</p>
                  </div>
                </li>
              </ul>
            </section>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Incomplete Systems */}
            <section className="bg-[#0b101b] border border-[#1e293b] p-6 rounded-xl">
              <h3 className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Incomplete Elements</h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>• Stripe billing webhook integrations have empty target functions.</li>
                <li>• Chrome Content Script triggers missing Gmail container identifiers.</li>
                <li>• Local draft storage fails to execute without IndexedDB support.</li>
              </ul>
            </section>

            {/* Security Gaps */}
            <section className="bg-[#0b101b] border border-[#1e293b] p-6 rounded-xl">
              <h3 className="text-xs font-mono font-black text-rose-400 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Security Vulnerabilities</h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>• No rate limiters targeting downstream Gemini completion routes.</li>
                <li>• Raw client-side authorization parameters unprotected inside storage.</li>
                <li>• No validation checking if payload text inputs carry malicious prompt injections.</li>
              </ul>
            </section>

            {/* Scalability Risks */}
            <section className="bg-[#0b101b] border border-[#1e293b] p-6 rounded-xl">
              <h3 className="text-xs font-mono font-black text-indigo-400 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Scalability Bottlenecks</h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>• Non-streaming standard REST API timeouts on longer generations.</li>
                <li>• Blocking sequential database transactions during CRM syncing.</li>
                <li>• Massive memory footprint of raw uncompacted browser cache drafts.</li>
              </ul>
            </section>

          </div>

          {/* Critical Blocking Verdict Alert */}
          <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-2 uppercase font-mono tracking-wider">
               <ShieldAlert className="w-5 h-5 shrink-0" /> CAN EFFECTIVEBUZZ LAUNCH THE CLOSED BETA TODAY?
            </h3>
            <div className="text-xl font-bold text-white leading-normal font-sans">
              No. EffectiveBuzz cannot launch Closed Beta operations today.
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              We have structurally valid database entries, client administration states, and API endpoints. However, the <strong className="text-white font-semibold">Chrome Extension wrapper script linking directly into Gmail Compose DOM elements</strong> is missing in practice. Without this integration, the user experiences excessive context-switching friction (manually copy-pasting prospecting logs back and forth), instantly degrading retention. Launching today would burn valuable adopter momentum on a broken UX flow.
            </p>
          </div>

        </div>
      )}

      {/* SUBTAB 2: TOP 50 TASK REGISTRY WITH REAL-TIME FILTERING */}
      {activeSubTab === 'tasks' && (
        <div className="space-y-6">
          
          <div className="flex flex-wrap gap-4 items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Interactive Task Registry</h2>
              <p className="text-xs text-slate-400 mt-1">Surgically prioritizing the 50 discrete remaining items required for global PMF convergence.</p>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mr-2 mb-1">Priority filter</span>
                <div className="flex gap-1.5">
                  {['All', 'P0', 'P1', 'P2'].map(p => (
                    <button
                      key={p}
                      onClick={() => setPriorityFilter(p as any)}
                      className={`px-3 py-1 text-[10px] uppercase font-mono rounded ${
                        priorityFilter === p ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-900 border border-slate-800 text-slate-400'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mr-2 mb-1">Category filter</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as any)}
                  className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] uppercase font-mono px-2 py-1 rounded"
                >
                  <option value="All">All Categories</option>
                  <option value="Security">Security</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Core Backend">Core Backend</option>
                  <option value="Chrome Extension">Chrome Extension</option>
                  <option value="Billing & Operations">Billing & Operations</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredTasks.map(task => {
              return (
                <div 
                  key={task.id} 
                  className={`p-4 rounded-xl border bg-slate-950/40 relative group overflow-hidden ${
                    task.priority === 'P0' ? 'border-red-500/20 hover:border-red-500/40' :
                    task.priority === 'P1' ? 'border-amber-500/20 hover:border-amber-500/40' :
                    'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          task.priority === 'P0' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          task.priority === 'P1' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                          'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        }`}>
                          {task.priority}
                        </span>
                        
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                          {task.category}
                        </span>
                      </div>
                      
                      <h4 className="text-sm font-bold text-white tracking-tight">{task.id}. {task.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{task.description}</p>
                    </div>

                    <span className={`text-[9px] font-mono font-bold uppercase px-2 py-1 rounded shrink-0 ${
                      task.status === 'Incomplete' ? 'bg-red-500/10 text-red-400' :
                      task.status === 'Partially Complete' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-slate-900 border border-slate-800 text-slate-500'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* SUBTAB 3: THE 4-SPRINT LAUNCH CONTRACT PLAN */}
      {activeSubTab === 'sprint' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="border border-indigo-900/50 bg-[#0b101b] p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-indigo-900/40 pb-2.5">
                <span className="text-xs font-mono font-bold text-indigo-400">SPRINT 1</span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-300 font-mono px-2 py-0.5 rounded font-bold">7 Days</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Core Bridge Hardening</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Complete Gmail DOM injector scripts. Run localized local builds to assure content scripts render button modules dynamically with clean overlays.
              </p>
              <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Focus: DOM Mount Blockers
              </div>
            </div>

            <div className="border border-slate-800 bg-[#0b101b] p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-xs font-mono font-bold text-slate-400">SPRINT 2</span>
                <span className="text-[10px] bg-slate-900 text-slate-400 font-mono px-2 py-0.5 rounded font-bold">7 Days</span>
              </div>
              <h3 className="text-base font-bold text-slate-300 tracking-tight">Bi-directional CRM & Auth</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Resolve persistent multi-session OAuth validation constraints. Establish automatic transactional message queues logging outgoing outbound histories cleanly.
              </p>
              <div className="text-[11px] text-amber-500 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 shrink-0" /> Focus: Sync Integration
              </div>
            </div>

            <div className="border border-slate-800 bg-[#0b101b] p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-xs font-mono font-bold text-slate-400">SPRINT 3</span>
                <span className="text-[10px] bg-slate-900 text-slate-400 font-mono px-2 py-0.5 rounded font-bold">7 Days</span>
              </div>
              <h3 className="text-base font-bold text-slate-300 tracking-tight">Zero-Trust Auditing</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Deploy end-to-end Content Security Policies (CSP) check boundaries. Configure backend rate limit constraints to optimize Gemini service worker operational bounds.
              </p>
              <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 shrink-0" /> Focus: Safety Hardening
              </div>
            </div>

            <div className="border border-slate-800 bg-[#0b101b] p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-xs font-mono font-bold text-slate-400">SPRINT 4</span>
                <span className="text-[10px] bg-slate-900 text-slate-400 font-mono px-2 py-0.5 rounded font-bold">7 Days</span>
              </div>
              <h3 className="text-base font-bold text-slate-300 tracking-tight">Ad adopter Intake</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                White-glove target installations on the first 10 selected Series A SDR pipelines. Log diagnostic feedback and start Stripe recurring checkout conversions.
              </p>
              <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                 <Clock className="w-3.5 h-3.5 shrink-0" /> Focus: Acquisition Scale
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUBTAB 4: INDIVIDUAL OPERATIONAL PERSONA CONSENSUS */}
      {activeSubTab === 'persona' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((per, idx) => {
            return (
              <div key={idx} className="bg-[#0b101b] border border-slate-800 p-5 rounded-xl flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-slate-700 transition">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${per.avatarBg}`}>
                       {per.role[0]}
                     </div>
                     <div>
                       <div className="text-xs font-mono font-bold text-slate-400">{per.name}</div>
                       <div className="text-sm font-black text-white">{per.role}</div>
                     </div>
                  </div>
                  
                  <p className="text-xs text-slate-300 italic leading-relaxed font-serif">
                    "{per.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-slate-500 uppercase font-bold">Primary Focus Area</span>
                  <span className="text-[10px] font-semibold text-indigo-400">{per.focus}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
