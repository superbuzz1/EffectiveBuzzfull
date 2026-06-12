import React, { useState } from 'react';
import { 
  Network, Database, Server, Cpu, Cloud, Compass, Play, Code, ArrowRight, Layers, FileCode, Check, Copy,
  Folder, FolderOpen, File, Layout, Sliders, Settings, Users, LineChart, Globe, HelpCircle, Shield, Key, Brain
} from 'lucide-react';
import RAGArchitectureView from './RAGArchitectureView';

interface FsNode {
  path: string;
  name: string;
  type: 'folder' | 'file';
  desc: string;
  detail: string;
  parentId?: string;
}

const projectFs: FsNode[] = [
  { path: 'src', name: 'src', type: 'folder', desc: 'Main React client source folder', detail: 'Contains the complete client code, structured by domain-specific modules, global providers, shared layout wraps, and typed API brokers.' },
  { path: 'src/api', name: 'api', type: 'folder', desc: 'Typed backend endpoints client controllers', detail: 'Contains core client engines built with custom Axios instances. Handles tenant/auth access key inclusions dynamically.', parentId: 'src' },
  { path: 'src/api/apiClient.ts', name: 'apiClient.ts', type: 'file', desc: 'Custom Axios instance with secure Interceptors', detail: 'Implements request chains, adding custom headers "X-Tenant-ID" and "Authorization Bearer JWT". Intercepts 401s for automated session validation.', parentId: 'src/api' },
  { path: 'src/api/campaigns.ts', name: 'campaigns.ts', type: 'file', desc: 'Campaign campaign endpoints interface handlers', detail: 'Strongly typed client endpoints matching /api/v1/workspaces/:tenantId/campaigns request profiles and response schemas.', parentId: 'src/api' },
  { path: 'src/api/prospects.ts', name: 'prospects.ts', type: 'file', desc: 'CRM Contacts and Leads api client handlers', detail: 'Maps client CRUD updates to /api/v1/workspaces/:tenantId/prospects endpoints. Fully typed parameters.', parentId: 'src/api' },
  { path: 'src/contexts', name: 'contexts', type: 'folder', desc: 'Global context states and custom providers', detail: 'Enforces Multi-Tenant workspace logical boundaries on the UI and handles cross-service data injections.', parentId: 'src' },
  { path: 'src/contexts/AuthContext.tsx', name: 'AuthContext.tsx', type: 'file', desc: 'User Authentication token & state container', detail: 'Saves active token scopes, metadata records, session lifetimes. Drives the user login and MFA challenges pages.', parentId: 'src/contexts' },
  { path: 'src/contexts/WorkspaceContext.tsx', name: 'WorkspaceContext.tsx', type: 'file', desc: 'Active Workspace boundary state provider', detail: 'Resolves current workspace tenantId from active URL path boundaries. Injects workspace configurations, subscription quotas, and active billing statuses to the app framework.', parentId: 'src/contexts' },
  { path: 'src/components', name: 'components', type: 'folder', desc: 'Reusable visual components and feature pages', detail: 'Contains isolated buttons, tables, loaders, alongside dedicated domain view sections like Dashboard metrics, prospects CRM grid, and outbound sequence editors.', parentId: 'src' },
  { path: 'src/components/common', name: 'common', type: 'folder', desc: 'Dumb/Presentational Atomic design system blocks', detail: 'Houses generic reusable components styled with Tailwind (Inputs, Custom Buttons, Custom Modals, Badges, Loaders).', parentId: 'src/components' },
  { path: 'src/hooks', name: 'hooks', type: 'folder', desc: 'Custom React Hooks for state queries & triggers', detail: 'Integrates custom fetch/mutate routines with React context states to decouple network actions from layout view pages.', parentId: 'src' },
  { path: 'src/hooks/useWorkspace.ts', name: 'useWorkspace.ts', type: 'file', desc: 'Custom workspace utility hook', detail: 'Retrieves current WorkspaceContext attributes easily in child elements, guaranteeing access only when inside workspace layouts.', parentId: 'src/hooks' },
  { path: 'src/hooks/useCampaigns.ts', name: 'useCampaigns.ts', type: 'file', desc: 'Asynchronous campaigns queries wrapper', detail: 'Handles campaign loading states, error structures, automatic mutation updates on sequence builders.', parentId: 'src/hooks' },
  { path: 'src/layouts', name: 'layouts', type: 'folder', desc: 'Global Layout Containers wrapping route hubs', detail: 'Reusable shell layouts driving visual hierarchy, transitions, sidebar menus, topbar scopes, and mobile responsiveness.', parentId: 'src' },
  { path: 'src/layouts/DashboardLayout.tsx', name: 'DashboardLayout.tsx', type: 'file', desc: 'Platform core app shell template wrapper', detail: 'Configured with left rail navigation lists, active tenant selector menus, global top stats indicators, and error boundary wrappers.', parentId: 'src/layouts' },
  { path: 'src/layouts/AuthLayout.tsx', name: 'AuthLayout.tsx', type: 'file', desc: 'Centered minimalist layout for access pages', detail: 'Standardized login and security factors layout styled with generous empty backgrounds to focus interest.', parentId: 'src/layouts' },
  { path: 'src/types', name: 'types', type: 'folder', desc: 'Static TypeScript compiler models definitions', detail: 'Declares shared typescript models, schemas, and API response templates across client nodes.', parentId: 'src' },
  { path: 'src/types/index.ts', name: 'index.ts', type: 'file', desc: 'Merged export type indices database', detail: 'Consolidates all campaign structures, database schemas representation, and user role enum claims.', parentId: 'src/types' },
  { path: 'src/App.tsx', name: 'App.tsx', type: 'file', desc: 'Vite React App Router routing gateway root', detail: 'Defines root Client routing structure using layout routing wrappers ($tenantId checks, lazy boundary wrappers).', parentId: 'src' },
  { path: 'src/main.tsx', name: 'main.tsx', type: 'file', desc: 'Standard Vite development build script entry point', detail: 'Renders the App node wrapped inside React.StrictMode. Injects global stylesheets.', parentId: 'src' },
  { path: 'src/index.css', name: 'index.css', type: 'file', desc: 'Main stylesheet referencing Tailwind layers', detail: 'Prepares fonts styling, custom shadows, theme parameters, scrollbar overrides.', parentId: 'src' },
  { path: 'vite.config.ts', name: 'vite.config.ts', type: 'file', desc: 'Vite project compilation preferences configuration', detail: 'Declares target port mappings, custom aliases definitions, plugins (e.g. compression filters, build optimizes).', parentId: '' },
  { path: 'package.json', name: 'package.json', type: 'file', desc: 'Project dependencies and commands registry', detail: 'Controls development server controls, production bundle steps. Declares npm packages (react, lucide-react, motion, tailwindcss).', parentId: '' },
];

export default function ArchitectureHub() {
  const [activeBlueprint, setActiveBlueprint] = useState<'highlevel' | 'frontend' | 'services' | 'database' | 'api' | 'deployment' | 'rag'>('highlevel');
  
  // Interactive Front-End States
  const [frontendSubtab, setFrontendSubtab] = useState<'fs' | 'router' | 'state' | 'apiclient' | 'design'>('fs');
  const [selectedFsNode, setSelectedFsNode] = useState<string>('src/contexts/WorkspaceContext.tsx');
  const [copiedCodeText, setCopiedCodeText] = useState<boolean>(false);
  const [fsOpenNodes, setFsOpenNodes] = useState<Record<string, boolean>>({
    'src': true,
    'src/api': true,
    'src/contexts': true,
    'src/components': true,
    'src/hooks': true,
    'src/layouts': true,
    'src/types': true
  });

  const toggleFsNode = (nodePath: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFsOpenNodes(prev => ({
      ...prev,
      [nodePath]: !prev[nodePath]
    }));
  };

  const currentFsNode = projectFs.find(n => n.path === selectedFsNode) || projectFs[0];

  return (
    <div className="space-y-6">
      {/* Blueprint Selector Header */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-medium text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400" />
              Technical Blueprints Drawer
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Select an architectural view to inspect the target production specifications of the system.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'highlevel', label: '1. High-Level Architecture', icon: Network },
              { id: 'frontend', label: '2. Frontend Architecture (React)', icon: FileCode },
              { id: 'services', label: '3. Service Breakdown', icon: Layers },
              { id: 'database', label: '4. Database & ERD', icon: Database },
              { id: 'api', label: '5. API Gateway flow', icon: Server },
              { id: 'deployment', label: '6. GCP Deployment Topology', icon: Cloud },
              { id: 'rag', label: '7. Knowledge RAG Architecture', icon: Brain },
            ].map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.id}
                  onClick={() => setActiveBlueprint(btn.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                    activeBlueprint === btn.id
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-md'
                      : 'bg-[#182235]/40 border-[#1f2937] text-gray-400 hover:text-white hover:border-gray-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Blueprint Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side Visual Flow Canvas */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] rounded-xl p-6 min-h-[500px] flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400">
                Visual Topology
              </span>
              <span className="text-xs font-mono text-gray-500">
                {activeBlueprint === 'highlevel' && 'SYSTEM_OVERVIEW_MESH'}
                {activeBlueprint === 'services' && 'MICROSERVICES_REGISTRY'}
                {activeBlueprint === 'database' && 'POSTGRESQL_RELATIONAL_ERD'}
                {activeBlueprint === 'api' && 'REVERSE_PROXY_INGRESS'}
                {activeBlueprint === 'deployment' && 'GOOGLE_CLOUD_INFRASTRUCTURE'}
                {activeBlueprint === 'rag' && 'MULTI_SOURCE_RAG_VECTOR_PIPELINE'}
              </span>
            </div>

            {/* HIGH LEVEL BLUEPRINT */}
            {activeBlueprint === 'highlevel' && (
              <div className="space-y-6">
                <div className="relative aspect-[16/9] w-full bg-[#0d131f] rounded-lg border border-gray-800/80 p-4 overflow-hidden flex flex-col justify-center items-center">
                  {/* Visual SVG Topology Map */}
                  <svg className="w-full h-full max-h-[340px]" viewBox="0 0 800 400">
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
                      </marker>
                      <marker id="arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4B5563" />
                      </marker>
                    </defs>

                    {/* Nodes Grid */}
                    {/* User / Client Applications */}
                    <g transform="translate(40, 150)">
                      <rect x="0" y="0" width="100" height="80" rx="6" fill="#1f2937" stroke="#374151" strokeWidth="2" />
                      <text x="50" y="30" fill="#fff" textAnchor="middle" fontSize="11" fontWeight="bold">Client Apps</text>
                      <text x="50" y="48" fill="#9ca3af" textAnchor="middle" fontSize="10">React SPA / Web</text>
                      <text x="50" y="65" fill="#f59e0b" textAnchor="middle" fontSize="9" fontWeight="bold">Stripe Direct</text>
                    </g>

                    <path d="M 140 190 L 210 190" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />

                    {/* API Gateway / Load Balancer */}
                    <g transform="translate(220, 130)">
                      <rect x="0" y="0" width="130" height="120" rx="8" fill="#1e1b4b" stroke="#312e81" strokeWidth="2" />
                      <text x="65" y="28" fill="#818cf8" textAnchor="middle" fontSize="11" fontWeight="bold">API Ingress Proxy</text>
                      <text x="65" y="50" fill="#fff" textAnchor="middle" fontSize="10">Express Gateway</text>
                      <text x="65" y="75" fill="#a78bfa" textAnchor="middle" fontSize="9" fontWeight="bold">JWT Auth & RBAC</text>
                      <rect x="15" y="90" width="100" height="20" rx="4" fill="#312e81" />
                      <text x="65" y="103" fill="#60a5fa" textAnchor="middle" fontSize="8" fontFamily="monospace">nginx / SSL</text>
                    </g>

                    {/* Express Backend API & Services Container */}
                    <path d="M 350 190 L 410 140" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
                    <path d="M 350 190 L 410 240" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />

                    {/* Node 3: Core API server */}
                    <g transform="translate(420, 60)">
                      <rect x="0" y="0" width="140" height="110" rx="8" fill="#064e3b" stroke="#047857" strokeWidth="2" />
                      <text x="70" y="25" fill="#34d399" textAnchor="middle" fontSize="11" fontWeight="bold">Express Service</text>
                      <text x="70" y="48" fill="#fff" textAnchor="middle" fontSize="10">Node.js API</text>
                      <text x="70" y="70" fill="#9ca3af" textAnchor="middle" fontSize="9">Prisma Transactions</text>
                      <rect x="15" y="82" width="110" height="18" rx="4" fill="#022c22" />
                      <text x="70" y="94" fill="#a7f3d0" textAnchor="middle" fontSize="8" fontFamily="monospace">PORT 3000</text>
                    </g>

                    {/* Node 4: BullMQ Background Workers */}
                    <g transform="translate(420, 200)">
                      <rect x="0" y="0" width="140" height="110" rx="8" fill="#78350f" stroke="#b45309" strokeWidth="2" />
                      <text x="70" y="25" fill="#fbbf24" textAnchor="middle" fontSize="11" fontWeight="bold">Outbound Workers</text>
                      <text x="70" y="48" fill="#fff" textAnchor="middle" fontSize="10">Queue Processors</text>
                      <text x="70" y="70" fill="#9ca3af" textAnchor="middle" fontSize="9">Scrapers / Mail Bridges</text>
                      <rect x="15" y="82" width="110" height="18" rx="4" fill="#451a03" />
                      <text x="70" y="94" fill="#fde68a" textAnchor="middle" fontSize="8" fontFamily="monospace">Redis BullMQ</text>
                    </g>

                    {/* Redis & DB on Right */}
                    <path d="M 560 115 L 610 115" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
                    <path d="M 560 255 L 610 255" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />

                    {/* Database Hub (Postgres) */}
                    <g transform="translate(620, 50)">
                      <rect x="0" y="0" width="130" height="110" rx="8" fill="#111827" stroke="#4b5563" strokeWidth="2" />
                      <text x="65" y="24" fill="#fff" textAnchor="middle" fontSize="11" fontWeight="bold">Cloud SQL PG</text>
                      <text x="65" y="46" fill="#3b82f6" textAnchor="middle" fontSize="10" fontWeight="bold">PostgreSQL HA</text>
                      <text x="65" y="65" fill="#9ca3af" textAnchor="middle" fontSize="9">Tenant DB Schemas</text>
                      <path d="M 40 85 C 40 80, 90 80, 90 85 C 90 90, 40 90, 40 85 Z M 40 95 C 40 90, 90 90, 90 95 L 90 102 C 90 107, 40 107, 40 102 Z" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
                    </g>

                    {/* Redis Key-Value Store */}
                    <g transform="translate(620, 200)">
                      <rect x="0" y="0" width="130" height="110" rx="8" fill="#111827" stroke="#ef4444" strokeWidth="1.5" />
                      <text x="65" y="25" fill="#fca5a5" textAnchor="middle" fontSize="11" fontWeight="bold">Caches & Queues</text>
                      <text x="65" y="48" fill="#ef4444" textAnchor="middle" fontSize="10" fontWeight="bold">Redis Memorystore</text>
                      <text x="65" y="70" fill="#9ca3af" textAnchor="middle" fontSize="9">JWTs / Job States</text>
                      <rect x="20" y="82" width="90" height="18" rx="4" fill="#7f1d1d" />
                      <text x="65" y="94" fill="#fee2e2" textAnchor="middle" fontSize="8" fontFamily="monospace">Port 6379</text>
                    </g>

                    {/* Gemini AI API broker outside bottom */}
                    <path d="M 490 170 L 490 200" fill="none" stroke="#4b5563" strokeDasharray="4 4" strokeWidth="1.5" />
                    <path d="M 490 310 L 490 350 L 285 350 L 285 250" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 3" />
                    <g transform="translate(230, 310)">
                      <rect x="0" y="0" width="110" height="50" rx="6" fill="#4c1d95" stroke="#7c3aed" strokeWidth="1.5" />
                      <text x="55" y="22" fill="#d8b4fe" textAnchor="middle" fontSize="10" fontWeight="bold">Google Gemini API</text>
                      <text x="55" y="38" fill="#fff" textAnchor="middle" fontSize="9">gemini-2.5-flash</text>
                    </g>
                  </svg>
                  
                  {/* Floating legend badge */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/95 px-3 py-1.5 rounded-md border border-gray-800 text-[10px] space-y-1">
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="w-2.5 h-0.5 bg-emerald-500 inline-block"></span>
                      <span className="text-gray-300">Synchronous API Request</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="w-2.5 h-0.5 border-t-2 border-dashed border-purple-500 inline-block"></span>
                      <span className="text-gray-300">Generative AI Loop</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#182235]/40 p-4 rounded-lg border border-gray-800/80 text-xs">
                  <h4 className="font-semibold text-white mb-1.5">Architectural Flow Description:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-gray-300 leading-relaxed">
                    <li><strong>Clients/CDN Router:</strong> Secure TLS 1.3 entries route react bundles globally via Cloud CDN, caching files and offloading Edge latency.</li>
                    <li><strong>API Ingress Proxy:</strong> Centralized Express gateway running inside a redundant Cloud Run cluster. Executes JWT token checks, sets tenant context variables dynamically, and enforces RBAC limits directly out of high-velocity Redis caches.</li>
                    <li><strong>Database Scaling isolation:</strong> Cloud SQL running Postgres operates with logically distinct schemas isolated per tenant. High workload queries target local Redis storage.</li>
                    <li><strong>Outreach Agents Engine:</strong> Heavy, non-blocking asynchronous scrape jobs, lead fit-scores calculations, and Gemini-based email customization queries are automatically queued and offloaded to workers via <strong>BullMQ</strong>.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* FRONTEND BLUEPRINT */}
            {activeBlueprint === 'frontend' && (
              <div className="space-y-4">
                {/* Secondary navigation for frontend subtabs */}
                <div className="flex border-b border-gray-800 pb-px overflow-x-auto gap-2">
                  {[
                    { id: 'fs' as const, label: 'Folder Hierarchy', icon: Folder },
                    { id: 'router' as const, label: 'Routing & Layout Flow', icon: Layout },
                    { id: 'state' as const, label: 'State & Multi-Tenancy', icon: Sliders },
                    { id: 'apiclient' as const, label: 'API Interceptor', icon: Code },
                    { id: 'design' as const, label: 'Design System & Tokens', icon: Settings },
                  ].map((sub) => {
                    const Icon = sub.icon;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setFrontendSubtab(sub.id)}
                        className={`flex items-center gap-2 pb-2.5 pt-1 text-xs font-mono font-medium border-b-2 transition-all shrink-0 ${
                          frontendSubtab === sub.id 
                            ? 'border-emerald-500 text-emerald-400 font-bold' 
                            : 'border-transparent text-gray-500 hover:text-gray-350'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {sub.label}
                      </button>
                    );
                  })}
                </div>

                {/* Subtab Contents */}
                {frontendSubtab === 'fs' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 border border-[#1f2937] rounded-xl space-y-3">
                      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                        <span className="text-xs font-mono text-gray-400">Interactive Project Workspace</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded leading-none font-bold">Vite + React 19</span>
                      </div>
                      <div className="max-h-[380px] overflow-y-auto font-mono text-xs text-gray-300 space-y-1.5 pr-2 animate-feed">
                        {projectFs
                          .filter(node => !node.parentId || fsOpenNodes[node.parentId])
                          .map(item => {
                            const depth = item.path.split('/').length - 1;
                            const isSelected = selectedFsNode === item.path;
                            const isOpen = !!fsOpenNodes[item.path];

                            return (
                              <div
                                key={item.path}
                                onClick={() => setSelectedFsNode(item.path)}
                                style={{ paddingLeft: `${depth * 1.25}rem` }}
                                className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer transition-all select-none ${
                                  isSelected 
                                    ? 'bg-emerald-500/15 text-emerald-300 border-l-2 border-emerald-500 font-semibold' 
                                    : 'hover:bg-[#182235]/40 text-gray-400 hover:text-white'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {item.type === 'folder' ? (
                                    <button
                                      onClick={(e) => toggleFsNode(item.path, e)}
                                      className="p-0.5 hover:bg-slate-800 rounded text-gray-500 hover:text-white transition-colors"
                                    >
                                      {isOpen ? <FolderOpen className="w-3.5 h-3.5 text-yellow-500" /> : <Folder className="w-3.5 h-3.5 text-yellow-600" />}
                                    </button>
                                  ) : (
                                    <File className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                  )}
                                  <span className="truncate">{item.name}</span>
                                </div>
                                <span className="text-[10px] text-gray-500 font-sans truncate hidden sm:inline">{item.desc}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Click folder icons to toggle collapse bounds. Click items to inspect detailed design roles in the right side metrics drawer!</span>
                    </div>
                  </div>
                )}

                {frontendSubtab === 'router' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 border border-gray-800 rounded-xl space-y-3">
                      <h4 className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold border-b border-gray-800 pb-2">Client Router Navigation & Security Maps</h4>
                      
                      <div className="space-y-3.5 text-xs">
                        {/* Public Route Blocks */}
                        <div className="p-3 bg-slate-900 border border-gray-850 rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#818cf8] font-mono font-bold">🔐 Security Factor Isolation (Login & Challenges)</span>
                            <span className="text-[10px] bg-slate-850 text-gray-400 font-mono px-2 py-0.5 rounded">AuthLayout Shell</span>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300 font-mono text-[10px]">
                            <li className="p-2.5 bg-slate-950 rounded border border-gray-850">
                              <span className="text-emerald-400 font-bold block mb-0.5">/auth/login</span>
                              Validates credentials. Navigates to MFA or Dashboard based on backend tenant rules.
                            </li>
                            <li className="p-2.5 bg-slate-950 rounded border border-gray-850">
                              <span className="text-emerald-400 font-bold block mb-0.5">/auth/mfa/verify</span>
                              TOTP authenticator input screen securing staff entries dynamically.
                            </li>
                          </ul>
                        </div>

                        {/* Multi Tenant Routes */}
                        <div className="p-3 bg-slate-900 border border-gray-850 rounded-lg space-y-2">
                          <div className="flex items-center justify-between border-b border-gray-800/65 pb-1.5">
                            <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5 text-emerald-400" />
                              🏢 Workspace Context Boundaries
                            </span>
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded font-bold">DashboardLayout Shell</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-300 font-mono text-[10px]">
                            <div className="p-2 bg-slate-950 rounded border border-gray-850 space-y-1">
                              <span className="text-indigo-300 font-bold block">/workspaces/:tenantId</span>
                              Analytics graphs, campaign delivery percentages, and conversions totals.
                            </div>
                            <div className="p-2 bg-slate-950 rounded border border-gray-850 space-y-1">
                              <span className="text-indigo-300 font-bold block">/workspaces/:tenantId/prospects</span>
                              Grid layout showing lead profiles, fit qualifying attributes, custom JSON metadata list.
                            </div>
                            <div className="p-2 bg-slate-950 rounded border border-gray-850 space-y-1">
                              <span className="text-indigo-300 font-bold block">/workspaces/:tenantId/campaigns</span>
                              Multi-step outreach sequence editor drafting campaign logic.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {frontendSubtab === 'state' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-950 border border-gray-800 rounded-xl space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h5 className="text-xs uppercase font-mono text-emerald-400 font-bold flex items-center gap-1.5 pb-1.5 border-b border-gray-800">
                            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                            WorkspaceContext.tsx Core
                          </h5>
                          <p className="text-xs text-gray-300 leading-relaxed font-sans">
                            Parses raw path parameters to determine the current tenant subdomain context. Dynamically fetches quota parameters, active keys, billing status from stripe, and injects tenant ID as default programmatic request header.
                          </p>
                        </div>
                        <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-[10px] font-mono text-indigo-300">
                          Accessible variables: activeTenantId, globalQuotas, limitsOverTriggered, reloadStatus()
                        </div>
                      </div>

                      <div className="p-4 bg-slate-950 border border-gray-800 rounded-xl space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h5 className="text-xs uppercase font-mono text-[#818cf8] font-bold flex items-center gap-1.5 pb-1.5 border-b border-gray-800">
                            <Users className="w-3.5 h-3.5 text-[#818cf8]" />
                            AuthContext.tsx Core
                          </h5>
                          <p className="text-xs text-gray-300 leading-relaxed font-sans">
                            Saves secure JSON web tokens inside memory, decodes user claims (name, avatar, permissions roles). Triggers auto logout protocols if tokens expire or backend auth rules are altered.
                          </p>
                        </div>
                        <div className="bg-slate-900 border border-[#1f2937] p-2.5 rounded-lg text-[10px] font-mono text-purple-300">
                          Accessible variables: decodedUser, bearerToken, statusVerified, triggerSignout()
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {frontendSubtab === 'apiclient' && (
                  <div className="space-y-3">
                    <div className="bg-slate-950 border border-gray-800 rounded-xl overflow-hidden shadow-lg p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800 pb-2">
                        <span className="font-mono text-emerald-400 flex items-center gap-1.5">
                          <Code className="w-4 h-4 text-emerald-400" />
                          src/api/apiClient.ts Multi-Tenant Interceptor client
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  
  // Extract and inject active tenant ID dynamically:
  const pathParts = window.location.pathname.split('/');
  const workspacesIdx = pathParts.indexOf('workspaces');
  if (workspacesIdx !== -1 && pathParts[workspacesIdx + 1]) {
    config.headers['X-Tenant-ID'] = pathParts[workspacesIdx + 1];
  }
  
  return config;
});`);
                            setCopiedCodeText(true);
                            setTimeout(() => setCopiedCodeText(false), 2000);
                          }}
                          className="px-2.5 py-1 bg-[#1a233b] hover:bg-[#253258] border border-gray-700 text-gray-300 rounded text-[10px] flex items-center gap-1 font-mono transition-all"
                        >
                          {copiedCodeText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                          {copiedCodeText ? 'Copied Snippet!' : 'Copy Axios Setup'}
                        </button>
                      </div>

                      <pre className="text-[10px] sm:text-xs font-mono text-emerald-400 bg-slate-900 border border-slate-850 p-3 rounded-lg overflow-x-auto max-h-[220px]">
{`import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  
  // Logical workspace tenant injection:
  const pathParts = window.location.pathname.split('/');
  const workspacesIdx = pathParts.indexOf('workspaces');
  if (workspacesIdx !== -1 && pathParts[workspacesIdx + 1]) {
    config.headers['X-Tenant-ID'] = pathParts[workspacesIdx + 1];
  }
  
  return config;
});`}
                      </pre>
                    </div>
                  </div>
                )}

                {frontendSubtab === 'design' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Theme colors palette */}
                      <div className="p-4 bg-slate-950 border border-gray-800 rounded-xl space-y-3">
                        <h5 className="text-xs uppercase font-mono text-emerald-400 font-bold border-b border-gray-800 pb-2">Theme Token Color Palette</h5>
                        <div className="grid grid-cols-4 gap-2 text-center text-[9px] font-mono text-gray-450">
                          <div className="space-y-1">
                            <div className="w-full h-8 bg-[#0f172a] rounded border border-gray-800" title="#0f172a"></div>
                            <span>Slate-900</span>
                          </div>
                          <div className="space-y-1">
                            <div className="w-full h-8 bg-emerald-500 rounded" title="#10B981"></div>
                            <span className="text-emerald-400 font-bold">Emerald-500</span>
                          </div>
                          <div className="space-y-1">
                            <div className="w-full h-8 bg-indigo-500 rounded" title="#6366F1"></div>
                            <span className="text-indigo-400 font-bold">Indigo-500</span>
                          </div>
                          <div className="space-y-1">
                            <div className="w-full h-8 bg-[#1e293b] rounded border border-gray-700" title="#1e293b"></div>
                            <span>Slate-850</span>
                          </div>
                        </div>
                      </div>

                      {/* Typography pairings */}
                      <div className="p-4 bg-slate-950 border border-gray-800 rounded-xl space-y-3 text-xs">
                        <h5 className="text-xs uppercase font-mono text-[#818cf8] font-bold border-b border-gray-800 pb-2">Typography Pairings</h5>
                        <ul className="text-[10px] font-mono space-y-2.5 text-slate-300">
                          <li>
                            <span className="text-white font-bold block mb-0.5">Title/Logos Headers: Space Grotesk </span>
                            Clean Swiss-neutral tech display typefaces paired with elegant tracked leading settings.
                          </li>
                          <li>
                            <span className="text-white font-bold block mb-0.5">Body Texts: Inter (Sans-serif) </span>
                            High-legibility sans fonts optimized for massive, rapid dashboards, inputs fields checklists, and grids.
                          </li>
                          <li>
                            <span className="text-white font-bold block mb-0.5">Consoles & Metrics: JetBrains Mono </span>
                            Readable monospace fonts styled on campaign graphs totals numbers, api keys, and databases schema lists.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SERVICES BLUEPRINT */}
            {activeBlueprint === 'services' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "API Gateway (Auth & Routing)",
                      tech: "Node.js + Express + Redis + JWT",
                      desc: "Ingresses all external traffic. Decodes tenant ID out of authorization headers. Inspects request limits from Redis. Forwards validated queries to core worker nodes.",
                      responsibilities: ["Authentication", "Rate Limiting", "Tenant Demultiplexing", "Secure CORS Handling"]
                    },
                    {
                      name: "Outreach Personalizer Broker",
                      tech: "Node.js + Google GenAI SDK (@google/genai)",
                      desc: "Interacts directly with gemini-2.5-flash. Automatically feeds prompt guidelines, context-matching constraints, and historic CRM logs to draft tailored campaigns.",
                      responsibilities: ["Conversational Context Building", "Draft Generation", "Tone Guidelines Compliance", "Token Cost Optimization"]
                    },
                    {
                      name: "Target Lead Scraper Worker",
                      tech: "BullMQ + Playwright + Cheerio",
                      desc: "Runs decoupled background scrapers. Gathers business domains, profile context, and public blog registries to feed into the fit-scoring network before running email builders.",
                      responsibilities: ["Leads Scraping Enqueuing", "Metadata Parsing", "Proxy Rotation Control", "Raw Profile Extractors"]
                    },
                    {
                      name: "Analytics Aggregation Module",
                      tech: "PostgreSQL Materialized Views + Prisma DB Client",
                      desc: "Calculates metric telemetry per campaign to build interactive visualizations. Tracks email open logs, bounces, unsubscribes, and reply metrics.",
                      responsibilities: ["Real-time Campaign Counters", "Tenant Daily Usage Summarizer", "Mail Deliverability Records", "Materialized Views Refreshes"]
                    }
                  ].map((srv, i) => (
                    <div key={i} className="bg-[#182235]/40 border border-[#1f2937] p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800">
                          <h4 className="font-display font-medium text-white text-sm">{srv.name}</h4>
                          <span className="text-[10px] bg-slate-800 text-emerald-400 font-mono px-2 py-0.5 rounded-full">{srv.tech}</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed mb-3">{srv.desc}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">Major Responsibilities:</span>
                        <div className="flex flex-wrap gap-1">
                          {srv.responsibilities.map((resp, rIdx) => (
                            <span key={rIdx} className="text-[10px] bg-[#111827] text-gray-300 px-2 py-0.5 rounded border border-gray-800">{resp}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DATABASE BLUEPRINT */}
            {activeBlueprint === 'database' && (
              <div className="space-y-6">
                <div className="bg-[#0d131f] rounded-lg border border-gray-800 p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-800 pb-3 gap-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-bold">
                      <Database className="w-4 h-4 text-emerald-400" />
                      Production PostgreSQL Schema Schema Grid (v15+)
                    </h4>
                    <span className="text-[10px] uppercase font-mono text-gray-400 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">
                      WORKSPACE_ISOLATED_CLUSTER
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Designed as a robust, resilient multi-tenant SaaS. Isolation is achieved logically through composite indexes and mandatory <code className="text-emerald-400 font-mono bg-slate-950 px-1 py-0.5 rounded">tenant_id</code> keys. Read on to inspect the complete column sets, relationships, and index configurations.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Tenants Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-emerald-500/10 text-emerald-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-emerald-500/20 flex justify-between">
                        <span>Table: tenants</span>
                        <span className="text-gray-400 font-normal">Tenant Core</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID) <span className="text-[8px] text-gray-500">DEFAULT gen_uuid</span></div>
                        <div className="text-gray-300 py-1">name (VARCHAR(255))</div>
                        <div className="text-[#a78bfa] py-1">slug (VARCHAR(100) UNIQUE)</div>
                        <div className="text-gray-400 py-1">status (VARCHAR(50) DEFAULT 'active')</div>
                        <div className="text-gray-400 py-1">settings (JSONB NOT NULL DEFAULT '{}')</div>
                        <div className="text-gray-500 py-1">created_at / updated_at (TIMESTAMPTZ)</div>
                      </div>
                    </div>

                    {/* Users Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-blue-500/10 text-blue-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-blue-500/20 flex justify-between">
                        <span>Table: users</span>
                        <span className="text-gray-400 font-normal">Identities</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-gray-300 py-1">name (VARCHAR(255))</div>
                        <div className="text-[#a78bfa] py-1">email (VARCHAR(255) UNIQUE)</div>
                        <div className="text-gray-400 py-1">avatar_url (VARCHAR(512))</div>
                        <div className="text-gray-400 py-1">mfa_enabled (BOOLEAN DEFAULT false)</div>
                        <div className="text-gray-500 py-1">created_at / updated_at (TIMESTAMPTZ)</div>
                      </div>
                    </div>

                    {/* Memberships Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-cyan-500/10 text-cyan-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-cyan-500/20 flex justify-between">
                        <span>Table: tenant_memberships</span>
                        <span className="text-gray-400 font-normal">RBAC</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id ──&gt; tenants.id</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  user_id ──&gt; users.id</div>
                        <div className="text-gray-300 py-1">role (VARCHAR(50)) <span className="text-[9px] text-emerald-400 font-bold">(owner|admin|agent)</span></div>
                        <div className="text-gray-400 py-1">status (VARCHAR(50) DEFAULT 'active')</div>
                        <div className="text-gray-500 py-1">invited_at / joined_at (TIMESTAMPTZ)</div>
                      </div>
                    </div>

                    {/* API keys Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-indigo-500/10 text-indigo-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-indigo-500/20 flex justify-between">
                        <span>Table: api_keys</span>
                        <span className="text-gray-400 font-normal">Integrations</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id ──&gt; tenants.id</div>
                        <div className="text-gray-300 py-1">name (VARCHAR(100))</div>
                        <div className="text-amber-400 py-1">key_hash (CHAR(64) UNIQUE)</div>
                        <div className="text-gray-400 py-1">key_prefix (VARCHAR(10))</div>
                        <div className="text-gray-400 py-1">scopes (VARCHAR(50)[] DEFAULT '{"read"}')</div>
                        <div className="text-gray-500 py-1">expires_at / last_used_at (TIMESTAMPTZ)</div>
                      </div>
                    </div>

                    {/* Campaigns Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-purple-500/10 text-purple-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-purple-500/20 flex justify-between">
                        <span>Table: campaigns</span>
                        <span className="text-gray-400 font-normal">Campaign Engine</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id ──&gt; tenants.id</div>
                        <div className="text-gray-300 py-1">name (VARCHAR(255))</div>
                        <div className="text-emerald-400 py-1">status (VARCHAR(50) DEFAULT 'draft')</div>
                        <div className="text-gray-300 py-1">target_audience_segment (TEXT)</div>
                        <div className="text-orange-400 py-1">ai_prompt_guidelines (TEXTNULL)</div>
                        <div className="text-gray-400 py-1">daily_send_limit (INT DEFAULT 100)</div>
                      </div>
                    </div>

                    {/* Sequences Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-rose-500/10 text-rose-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-rose-500/20 flex justify-between">
                        <span>Table: sequences</span>
                        <span className="text-gray-400 font-normal">Automations</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  campaign_id ──&gt; campaigns.id</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id ──&gt; tenants.id</div>
                        <div className="text-gray-300 py-1">name (VARCHAR(255))</div>
                        <div className="text-gray-400 py-1">is_active (BOOLEAN DEFAULT true)</div>
                        <div className="text-gray-500 py-1">created_at / updated_at (TIMESTAMPTZ)</div>
                      </div>
                    </div>

                    {/* Sequence steps Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-fuchsia-500/10 text-fuchsia-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-fuchsia-500/20 flex justify-between">
                        <span>Table: sequence_steps</span>
                        <span className="text-gray-400 font-normal">Triggers</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  sequence_id ──&gt; sequences.id</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id ──&gt; tenants.id</div>
                        <div className="text-amber-400 py-1">step_number (INTEGER NOT NULL)</div>
                        <div className="text-gray-300 py-1">delay_days (INTEGER DEFAULT 3)</div>
                        <div className="text-gray-300 py-1">step_type (VARCHAR(50)) <span className="text-[9px] text-fuchsia-400">(email_outreach|linkedin)</span></div>
                        <div className="text-gray-400 py-1">template_subject / body (TEXT)</div>
                      </div>
                    </div>

                    {/* Prospects Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-amber-500/10 text-amber-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-amber-500/20 flex justify-between">
                        <span>Table: prospects</span>
                        <span className="text-gray-400 font-normal">Prospect CRM</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id ──&gt; tenants.id</div>
                        <div className="text-gray-300 py-1">email (VARCHAR(255))</div>
                        <div className="text-gray-300 py-1">first_name / last_name (VARCHAR)</div>
                        <div className="text-[#818cf8] py-1">fit_score (INTEGER DEFAULT 0)</div>
                        <div className="text-gray-400 py-1">lifecycle_stage (VARCHAR(50))</div>
                        <div className="text-emerald-400 py-1">custom_attributes (JSONB DEFAULT '{}')</div>
                      </div>
                    </div>

                    {/* Dispatches Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-orange-500/10 text-orange-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-orange-500/20 flex justify-between">
                        <span>Table: campaign_dispatches</span>
                        <span className="text-gray-400 font-normal">Delivery Tracker</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  campaign_id ──&gt; campaigns.id</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  prospect_id ──&gt; prospects.id</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id ──&gt; tenants.id</div>
                        <div className="text-gray-300 py-1">status (VARCHAR(50) DEFAULT 'enqueued')</div>
                        <div className="text-amber-500 py-1">current_sequence_step_id (UUID)</div>
                      </div>
                    </div>

                    {/* OutboxMessages Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-[#e11d48]/10 text-rose-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-rose-500/20 flex justify-between">
                        <span>Table: outbox_messages</span>
                        <span className="text-gray-400 font-normal">Outbox queue</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  dispatch_id ──&gt; dispatches.id</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id ──&gt; tenants.id</div>
                        <div className="text-gray-300 py-1">subject (VARCHAR) / body (TEXT)</div>
                        <div className="text-[#3b82f6] py-1">status (VARCHAR DEFAULT 'draft')</div>
                        <div className="text-gray-400 py-1">provider_message_id (VARCHAR)</div>
                        <div className="text-gray-500 py-1">scheduled_send_at / actual_sent_at</div>
                      </div>
                    </div>

                    {/* EmailEventLogs Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-violet-500/10 text-violet-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-violet-500/20 flex justify-between">
                        <span>Table: email_event_logs</span>
                        <span className="text-gray-400 font-normal">Webhooks Tracker</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  message_id ──&gt; outbox_messages.id</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id ──&gt; tenants.id</div>
                        <div className="text-emerald-400 py-1">event_type (VARCHAR(50)) <span className="text-[8px] text-gray-500">(open|reply|bounce)</span></div>
                        <div className="text-gray-300 py-1">ip_address / user_agent</div>
                        <div className="text-gray-400 py-1">payload (JSONB)</div>
                      </div>
                    </div>

                    {/* Subscriptions Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-sky-500/10 text-sky-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-sky-500/20 flex justify-between">
                        <span>Table: subscriptions</span>
                        <span className="text-gray-400 font-normal">Stripe Billing</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id (UUID UNIQUE) ──&gt; tenants.id</div>
                        <div className="text-sky-400 py-1">stripe_customer_id (VARCHAR UNIQUE)</div>
                        <div className="text-sky-400 py-1">stripe_subscription_id (VARCHAR UNIQUE)</div>
                        <div className="text-gray-300 py-1">plan_tier (VARCHAR DEFAULT 'growth')</div>
                        <div className="text-gray-400 py-1">status (VARCHAR) <span className="text-[8px] text-gray-400">(active|past_due)</span></div>
                        <div className="text-gray-500 py-1">current_period_start / end</div>
                      </div>
                    </div>

                    {/* AI Generation Logs Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-[#a21caf]/10 text-fuchsia-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-fuchsia-500/20 flex justify-between">
                        <span>Table: ai_generation_logs</span>
                        <span className="text-gray-400 font-normal">AI Token Audit</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id ──&gt; tenants.id</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  actor_id ──&gt; users.id</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  dispatch_id ──&gt; dispatches.id</div>
                        <div className="text-gray-300 py-1">model_name (VARCHAR) <span className="text-[8px] text-gray-500">(gemini-2.5-flash)</span></div>
                        <div className="text-[#a855f7] py-1">prompt_token_count / completion_token_count</div>
                        <div className="text-indigo-300 py-1">estimated_cost_microcents (INTEGER)</div>
                      </div>
                    </div>

                    {/* Tenant Quotas Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-lime-500/10 text-lime-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-lime-500/20 flex justify-between">
                        <span>Table: tenant_usage_quotas</span>
                        <span className="text-gray-400 font-normal">Quotas Guardroom</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id ──&gt; tenants.id</div>
                        <div className="text-gray-300 py-1">emails_sent_count / limit (INTEGER)</div>
                        <div className="text-gray-300 py-1">ai_tokens_consumed / limit (INTEGER)</div>
                        <div className="text-gray-300 py-1">api_requests_count / limit (INTEGER)</div>
                        <div className="text-gray-500 py-1">billing_cycle_start / end (TIMESTAMPTZ)</div>
                      </div>
                    </div>

                    {/* Audit Logs Table */}
                    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shadow-md hover:border-gray-700 transition-all">
                      <div className="bg-slate-500/10 text-slate-300 text-[11px] font-mono px-2.5 py-1.5 rounded-lg font-bold border border-slate-500/20 flex justify-between">
                        <span>Table: audit_logs</span>
                        <span className="text-gray-400 font-normal">Governance Audit</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5 divide-y divide-gray-800/80">
                        <div className="text-teal-400 font-bold py-1">🔑 PK  id (UUID)</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  tenant_id ──&gt; tenants.id</div>
                        <div className="text-purple-450 font-semibold py-1">🔗 FK  actor_id ──&gt; users.id</div>
                        <div className="text-amber-500 font-bold py-1">event_action (VARCHAR(100))</div>
                        <div className="text-gray-300 py-1">ip_address / user_agent</div>
                        <div className="text-[#a78bfa] py-1">state_delta (JSONB) <span className="text-[8px] text-gray-500">(prev vs new)</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1c2c4c]/45 border border-[#243c68]/40 p-4 rounded-xl flex items-start gap-3">
                  <Database className="w-5 h-5 text-[#818cf8] shrink-0 mt-0.5 animate-pulse" />
                  <div className="text-xs text-gray-300 leading-relaxed">
                    <span className="font-semibold text-white block mb-1">Index Engineering and Query Performance Optimization:</span>
                    We provisioned specific indices to guarantee instant operations across massive multi-tenant tables. By adding indexes on <code className="text-emerald-400 font-mono">tenant_id</code> + <code className="text-emerald-400 font-mono">email</code> on the <code className="text-amber-400 font-mono">prospects</code> table, and composites on outbound mail <code className="text-red-400 font-mono">(status, scheduled_send_at)</code>, database searches run in sub-millisecond times, avoiding heavy tablescans.
                  </div>
                </div>
              </div>
            )}

            {/* API ARCHITECTURE */}
            {activeBlueprint === 'api' && (
              <div className="space-y-4">
                <div className="bg-[#0d131f] border border-gray-800 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-3">
                  <div className="text-emerald-400 flex items-center justify-between pb-2 border-b border-gray-800">
                    <span>API GATEWAY REVERSE PROXY FLOW</span>
                    <span>STANDARDIZED CORE METRICS</span>
                  </div>
                  <div className="space-y-2 leading-relaxed">
                    <div>1. Client sends request to <span className="text-blue-400">https://api.effectivebuzz.com/api/v1/campaigns</span></div>
                    <div className="pl-4 text-gray-500">{"│"}</div>
                    <div>2. CDN intercepts (Cloud Armor Checks DDoS context / Rate limits IPs)</div>
                    <div className="pl-4 text-gray-500">{"│"}</div>
                    <div>3. Nginx Reverse Proxy translates request + Decodes TLS context</div>
                    <div className="pl-4 text-gray-500">{"│"}</div>
                    <div>4. Gateway checks JWT Authorization header: <span className="text-amber-400">"Bearer eyJhbGciOi..."</span>
                      <div className="pl-4 text-gray-400 mt-1">
                        - Decodes User context: <span className="text-emerald-400">Marcus (Admin)</span><br />
                        - Decodes Tenant context: <span className="text-emerald-400">tenant-1 (Professional)</span><br />
                        - Verifies limits: tenant-1 current month email tokens &lt; Pro limits (10,000/mo)
                      </div>
                    </div>
                    <div className="pl-4 text-gray-500">{"│"}</div>
                    <div>5. Proxy forwards to Core Express Microservices behind Private VPC</div>
                    <div className="pl-4 text-gray-500">{"│"}</div>
                    <div>6. Core DB transacts & Returns Response Payload (JSON, HTTP 201)</div>
                  </div>
                </div>

                <div className="bg-[#182235]/40 p-4 rounded-xl border border-gray-850 text-xs">
                  <h4 className="font-semibold text-white mb-2">Cross-Cutting Concerns Addressed:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
                    <div className="p-2.5 bg-[#111827] rounded border border-gray-800">
                      <span className="font-bold text-emerald-400 font-mono text-[10px] block mb-1">RATE LIMITING ENGINE</span>
                      Uses sliding-window token algorithms inside Redis memory cache. Free tiers get 60, Pro gets 600, Enterprise gets 3,000 requests per minute.
                    </div>
                    <div className="p-2.5 bg-[#111827] rounded border border-gray-800">
                      <span className="font-bold text-emerald-400 font-mono text-[10px] block mb-1">MULTI-TENANT RBAC AUDIT</span>
                      No cross-tenant data leaks are possible. Express Middlewares dynamically map incoming requests to ensure `req.tenantId` is explicitly injected into Prisma queries.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DEPLOYMENT BLUEPRINT */}
            {activeBlueprint === 'deployment' && (
              <div className="space-y-4">
                <div className="bg-[#0d131f] border border-gray-800 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-3">
                  <div className="text-emerald-400 flex items-center justify-between pb-2 border-b border-gray-800">
                    <span>GOOGLE CLOUD RUN PLATFORM SCHEMA</span>
                    <span>HIGH AVAILABILITY TOPOLOGY</span>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2"><span className="text-purple-400">● Google Cloud DNS</span> ──&gt; Cloud CDN Edge ──&gt; Cloud Armor (WAF Shield)</div>
                    <div className="pl-6 text-gray-600">│</div>
                    <div className="flex items-center gap-2"><span className="text-emerald-400">● Cloud Load Balancer (HTTPS)</span> ──&gt; VPC Serverless Connector</div>
                    <div className="pl-6 text-gray-600">│</div>
                    <div className="bg-[#111827] p-2.5 rounded border border-gray-800 space-y-2">
                      <div className="font-bold text-white text-[11px]">Private VPC (Virtual Private Cloud - 10.0.0.0/16)</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="bg-[#0d131f] p-2 rounded border border-purple-900 text-[10px]">
                          <span className="text-purple-400 font-bold block">Subnet A: API Frontend</span>
                          - Cloud Run Service<br />
                          - Scale: 1 to 20 Instances<br />
                          - CPU: 2 vCPU, 2GB Ram
                        </div>
                        <div className="bg-[#0d131f] p-2 rounded border border-amber-900 text-[10px]">
                          <span className="text-amber-400 font-bold block">Subnet B: Background Queue</span>
                          - Cloud Run Workers<br />
                          - Scale: 0 to 50 Instances<br />
                          - Trigger: Redis BullMQ
                        </div>
                        <div className="bg-[#0d131f] p-2 rounded border border-blue-900 text-[10px]">
                          <span className="text-blue-400 font-bold block">Subnet C: Storage Vault</span>
                          - Private Cloud SQL (Postgres)<br />
                          - Memorystore (Redis Caches)<br />
                          - Private Service Connections
                        </div>
                      </div>
                    </div>
                    <div className="pl-6 text-gray-600">│</div>
                    <div className="flex items-center gap-2"><span className="text-purple-400">● CI/CD Stream</span> ──&gt; GitHub Actions ──&gt; Google Artifact Registry ──&gt; Cloud Run Deployment</div>
                  </div>
                </div>

                <div className="bg-[#182235]/40 p-4 rounded-xl border border-gray-800 text-xs">
                  <h4 className="font-semibold text-white mb-2">Key Deployment Metrics Met & Safe-Guarded:</h4>
                  <p className="text-gray-300 leading-relaxed">
                    By choosing <strong>Serverless Cloud Run containers</strong> with scale-to-zero capabilities, staging/development systems stay costless during down periods, and easily scale to 2,000 requests per second within 2.8 seconds during heavy campaign blasts. Cloud Armor shields protect target tables against SQL injections and malicious DDoS vectors automatically.
                  </p>
                </div>
              </div>
            )}

            {activeBlueprint === 'rag' && (
              <RAGArchitectureView />
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
            <span>Authored by: <strong>EffectiveBuzz Architect Lead</strong></span>
            <span>Version: <strong>v1.4.1 (Stable Release)</strong></span>
          </div>
        </div>

        {/* Right Side Metadata Details panel */}
        <div className="lg:col-span-4 bg-[#111827] border border-[#1f2937] rounded-xl p-5 space-y-5 shadow-xl">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Selected Blueprint Details
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Deep architectural context and design choices concerning system integrity.
            </p>
          </div>

          {activeBlueprint === 'frontend' && (
            <div className="space-y-4 animate-feed">
              <div className="p-3.5 bg-slate-900 border border-emerald-500/20 rounded-lg space-y-2">
                <span className="text-[10px] text-emerald-300 font-mono uppercase font-bold flex items-center gap-1.5 font-bold">
                  {currentFsNode.type === 'folder' ? <FolderOpen className="w-3.5 h-3.5 text-yellow-500" /> : <File className="w-3.5 h-3.5 text-blue-400" />}
                  Inspector: {currentFsNode.name}
                </span>
                <p className="text-xs text-white font-medium leading-normal">{currentFsNode.desc}</p>
                <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{currentFsNode.detail}</p>
              </div>

              <div className="bg-[#182235]/40 border border-[#1f2937] p-3 rounded-lg space-y-2">
                <span className="text-[10px] text-gray-400 tracking-wider uppercase font-mono block font-bold border-b border-gray-800 pb-1">Front-End Best Practices:</span>
                <ul className="text-[10px] list-disc pl-3.5 text-zinc-300 space-y-1.5 font-mono">
                  <li><strong className="text-white">Strict TS Match:</strong> Enforce complete compile-time type validation across all model fields.</li>
                  <li><strong className="text-white">Custom Query Wraps:</strong> Package active fetches inside custom Hooks referencing query keys.</li>
                  <li><strong className="text-white">Route Boundary lazy:</strong> Use lazy layouts load maps to minimize main file bundles weight.</li>
                  <li><strong className="text-white">Unified Atoms:</strong> Centralized common styling variables inside clear atom configs.</li>
                </ul>
              </div>
            </div>
          )}

          {activeBlueprint === 'highlevel' && (
            <div className="space-y-4">
              <div className="space-y-1.5 p-3.5 bg-[#182235]/40 rounded-lg border border-gray-800">
                <span className="text-[10px] text-emerald-300 font-mono uppercase font-bold">Multi-Tenant Routing</span>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Tenant authentication is executed early at ingress routing. Requests carry `X-Tenant-ID` or parsed from authorization JWTs, preventing data cross-leakage.
                </p>
              </div>
              <div className="space-y-1.5 p-3.5 bg-[#182235]/40 rounded-lg border border-gray-800">
                <span className="text-[10px] text-indigo-300 font-mono uppercase font-bold">Asynchronous Decoupling</span>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Bulk outbound email campaigns are never sent during a synchronous REST call. They are enqueued as discrete jobs into Redis queues, processed by serverless worker threads.
                </p>
              </div>
            </div>
          )}

          {activeBlueprint === 'services' && (
            <div className="space-y-4">
              <div className="space-y-1.5 p-3.5 bg-[#1a142e]/50 rounded-lg border border-[#7c3aed]/20">
                <span className="text-[10px] text-purple-300 font-mono uppercase font-bold">GenAI Outreach Broker</span>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Interfaces with Google Gemini through server-side wrappers. Implements user prompt guidelines dynamically and controls structured JSON data output format securely.
                </p>
              </div>
              <div className="space-y-1.5 p-3.5 bg-[#182235]/40 rounded-lg border border-gray-800">
                <span className="text-[10px] text-emerald-300 font-mono uppercase font-bold">Task Scheduling Engine</span>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Coordinates cron schedules via Cloud Scheduler. Fires lead scraping routines and updates metric logs on sliding 24-hour cycles.
                </p>
              </div>
            </div>
          )}

          {activeBlueprint === 'database' && (
            <div className="space-y-4">
              <div className="space-y-1.5 p-3.5 bg-[#182235]/40 rounded-lg border border-gray-800">
                <span className="text-[10px] text-blue-300 font-mono uppercase font-bold">Data Isolation Level</span>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Database queries use row-level context filters. All database models carry database indexes on `tenantId` to speed up join executions.
                </p>
              </div>
              <div className="space-y-1.5 p-3.5 bg-[#182235]/40 rounded-lg border border-gray-800">
                <span className="text-[10px] text-emerald-300 font-mono uppercase font-bold">Cache-Aside Caching Strategy</span>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Sub-millisecond query results are cached directly inside Google Cloud Memorystore (Redis). Invalidates key states automatically on CRUD operations.
                </p>
              </div>
            </div>
          )}

          {activeBlueprint === 'api' && (
            <div className="space-y-4">
              <div className="space-y-1.5 p-3.5 bg-[#182235]/40 rounded-lg border border-gray-800">
                <span className="text-[10px] text-emerald-300 font-mono uppercase font-bold">Rate Limits Engine</span>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Protects target databases against high-frequency crawlers. sliding window limit logs are maintained per API key.
                </p>
              </div>
              <div className="space-y-1.5 p-3.5 bg-[#182235]/40 rounded-lg border border-gray-800">
                <span className="text-[10px] text-amber-300 font-mono uppercase font-bold">CORS & Security Headers</span>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Restricts client interactions to specified domains. Implements Strict-Transport-Security, X-Content-Type-Options, and Content-Security-Policy headers explicitly.
                </p>
              </div>
            </div>
          )}

          {activeBlueprint === 'deployment' && (
            <div className="space-y-4">
              <div className="space-y-1.5 p-3.5 bg-[#182235]/40 rounded-lg border border-gray-800">
                <span className="text-[10px] text-purple-300 font-mono uppercase font-bold">Zero-Downtime Releases</span>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Cloud Run scales containers based on concurrency metrics. Rolls out updates using green/blue deployment maps, carrying safe automated failure rollback mechanisms.
                </p>
              </div>
              <div className="space-y-1.5 p-3.5 bg-[#182235]/40 rounded-lg border border-gray-800">
                <span className="text-[10px] text-emerald-300 font-mono uppercase font-bold">VPC Private Service Link</span>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Databases and Caches run on isolated private channels. No public IP address ports are exposed directly to the outside web, enforcing private subnets rules.
                </p>
              </div>
            </div>
          )}

          {activeBlueprint === 'rag' && (
            <div className="space-y-4">
              <div className="space-y-1.5 p-3.5 bg-[#0d1527] rounded-lg border border-teal-500/20">
                <span className="text-[10px] text-teal-400 font-mono uppercase font-bold">Semantic Search Index</span>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Vector indices are completely private and decoupled using PostgreSQL schemas. High scalability indexing models ensure sub-10ms query execution across massive rows datasets.
                </p>
              </div>
              <div className="space-y-1.5 p-3.5 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-[10px] text-blue-300 font-mono uppercase font-bold">Hybrid Search Integration</span>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Full text searches (BM25) and conceptual cosine scores (pgvector) are calculated in parallel, then fused with RRF (Reciprocal Rank Fusion) for perfect precision.
                </p>
              </div>
              <div className="space-y-1.5 p-3.5 bg-[#1a142e]/50 rounded-lg border border-[#7c3aed]/20">
                <span className="text-[10px] text-purple-300 font-mono uppercase font-bold">Dual-Tier Caching SLA</span>
                <p className="text-[11px] text-gray-200 leading-relaxed">
                  Key-Value matching captures exact queries instantly, while Semantic checking ensures query embeddings with cosine distance &lt; 0.12 return cached LLM outputs safely.
                </p>
              </div>
            </div>
          )}

          {/* Quick specs list */}
          <div className="bg-[#182235]/20 p-4 rounded-xl border border-gray-800 space-y-2.5">
            <h4 className="text-xs uppercase font-mono text-gray-300 tracking-wider font-semibold">Core SaaS Architecture Checklist:</h4>
            <div className="space-y-2">
              {[
                { label: "SaaS Multi-Tenancy", desc: "Logical schemas separation & row levels checks" },
                { label: "Role-Based RBAC Check", desc: "Express dynamic verification middlewares" },
                { label: "Stripe Subscriptions", desc: "Real billing webhooks syncing to db schemas" },
                { label: "Decoupled Pipelines", desc: "BullMQ asynchronous background email queueing" },
                { label: "GenAI Personalizer", desc: "Google Gemini 3.5 secure backend brokers" }
              ].map((chk, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
                  <div>
                    <span className="text-xs text-white font-medium block leading-none">{chk.label}</span>
                    <span className="text-[10px] text-gray-400">{chk.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
