import React, { useState, useEffect } from 'react';
import { 
  Shield, Key, Lock, FileText, Database, Activity, RefreshCw, AlertTriangle, 
  Check, CheckCircle2, XCircle, Code, Copy, Sliders, Clock, UserCheck, 
  Server, Globe, Terminal, ArrowRight, Eye, EyeOff, Layers, Zap, 
  Sparkles, ShieldAlert, Cpu, HardDrive, RotateCcw, AlertCircle, FileSpreadsheet, LockKeyhole
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ============================================================================
// Types & Definitions
// ============================================================================

export interface STRIDECategory {
  category: 'Spoofing' | 'Tampering' | 'Repudiation' | 'Information Disclosure' | 'Denial of Service' | 'Elevation of Privilege';
  letter: string;
  description: string;
  threatScenario: string;
  impactTier: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  mitigationStrategy: string;
  effectiveBuzzImplementation: string;
  verificationAudit: string;
}

export interface SecurityControlItem {
  id: string;
  name: string;
  requirement: string;
  status: 'Implemented' | 'Partially Implemented' | 'Planned';
  description: string;
  coreImplementation: string;
  auditTrailCode: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  role: string;
  tenantId: string;
  ipAddress: string;
  payloadHash: string;
  previousHash: string;
  isTampered?: boolean;
}

export default function SaaSSecurityArchitecture() {
  const [activePortalTab, setActivePortalTab] = useState<'model' | 'playground' | 'controls' | 'roadmap'>('playground');
  const [copiedTextLabel, setCopiedTextLabel] = useState<string | null>(null);

  // ============================================================================
  // JWT & RBAC Live Playground States
  // ============================================================================
  const [selectedUserRole, setSelectedUserRole] = useState<'Owner' | 'Admin' | 'Member' | 'Agent'>('Admin');
  const [selectedTenantId, setSelectedTenantId] = useState<string>('tenant-acme-prod');
  const [jwtKeySecretHex, setJwtKeySecretHex] = useState<string>('sb_9921_ebb_prod_sec_signing_rs256_symmetric_key_01');
  const [showSignedJwt, setShowSignedJwt] = useState<boolean>(false);
  const [simulatedAction, setSimulatedAction] = useState<string>('campaign:write');
  const [simulatedJwtResult, setSimulatedJwtResult] = useState<any>(null);

  // ============================================================================
  // Rate Limiting Simulator
  // ============================================================================
  const [ipRequestCount, setIpRequestCount] = useState<number>(0);
  const [rateLimitMax, setRateLimitMax] = useState<number>(10);
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number>(10);
  const [isRateLimitedCode, setIsRateLimitedCode] = useState<boolean>(false);
  const [requestHistoryLog, setRequestHistoryLog] = useState<{ time: string, status: number, msg: string }[]>([]);

  // ============================================================================
  // Encryption Sandbox
  // ============================================================================
  const [rawSecretText, setRawSecretText] = useState<string>('gemini_api_key_redacted');
  const [kmsDataKeyCipher, setKmsDataKeyCipher] = useState<string>('DEK_CIPHERTEXT_AES_256_ENVELOPE_KEY_EBB_8831A');
  const [isEncrypted, setIsEncrypted] = useState<boolean>(true);
  const [encryptedCiphertext, setEncryptedCiphertext] = useState<string>('');

  // ============================================================================
  // Postgres Row Level Security (RLS) Sandbox
  // ============================================================================
  const [activeSessionTenant, setActiveSessionTenant] = useState<string>('tenant-acme');
  const [querySelectTarget, setQuerySelectTarget] = useState<'all' | 'filtered'>('all');
  const [rlsResultRows, setRlsResultRows] = useState<any[]>([]);

  // ============================================================================
  // Cryptographic Blockchain Audit Log Sandbox
  // ============================================================================
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: "evt_aud_1",
      timestamp: "2026-06-06T20:15:00Z",
      userId: "usr_alice",
      action: "campaign:publish",
      role: "Admin",
      tenantId: "tenant-acme",
      ipAddress: "198.51.100.41",
      payloadHash: "0000a29f8c14d9b35b6",
      previousHash: "0000000000000000000"
    },
    {
      id: "evt_aud_2",
      timestamp: "2026-06-06T20:18:12Z",
      userId: "usr_bob",
      action: "billing:upgrade",
      role: "Owner",
      tenantId: "tenant-acme",
      ipAddress: "198.51.100.41",
      payloadHash: "00007e99ca25b1842ad",
      previousHash: "0000a29f8c14d9b35b6"
    },
    {
      id: "evt_aud_3",
      timestamp: "2026-06-06T20:20:45Z",
      userId: "usr_agent_01",
      action: "lead:scrape",
      role: "Agent",
      tenantId: "tenant-acme",
      ipAddress: "203.0.113.111",
      payloadHash: "000021bdfc912bbcf04",
      previousHash: "00007e99ca25b1842ad"
    }
  ]);
  const [newUserAction, setNewUserAction] = useState<string>('api_keys:create');
  const [newUserRole, setNewUserRole] = useState<'Owner' | 'Admin' | 'Member' | 'Agent'>('Admin');
  const [isChainBroken, setIsChainBroken] = useState<boolean>(false);

  // ============================================================================
  // Data Definitions for Threat STRIDE Model, Controls, & Compliance
  // ============================================================================
  const strideThreats: STRIDECategory[] = [
    {
      category: 'Spoofing',
      letter: 'S',
      description: 'An attacker impersonates a valid user, system service, or external tenant, stealing access to outbound campaign configurations.',
      threatScenario: 'Malicious actor sniffs or session-hijacks a raw developer cookie and forces operations on behalf of Acme Corporation.',
      impactTier: 'CRITICAL',
      mitigationStrategy: 'Enforce stateless, cryptographically signed RS256 JWT sessions delivered through HttpOnly, Secure, SameSite=Strict cookies coupled with short-lived access-tokens.',
      effectiveBuzzImplementation: 'JWT signature verified via asynchronous JSON Web Key Sets (JWKS) endpoints. Custom claims embedded: tenant_id, role, scopes. Inactive token revocation database blocks leaked tokens within 60 seconds.',
      verificationAudit: 'Session-hijack penetration fuzz tests; automated validation failures for unsigned or invalid HMAC-alg fallback attempts.'
    },
    {
      category: 'Tampering',
      letter: 'T',
      description: 'Unauthorized alteration of campaign definitions, email copy parameters, scraped prospect logs, or billing tiers stored in the database.',
      threatScenario: 'A teammate alters the destination target URL of a high-throughput sequence, re-routing clicks on outgoing Gemini-written outreach emails.',
      impactTier: 'HIGH',
      mitigationStrategy: 'Database Row-Level Security (RLS) restricts mutation capabilities matching role permissions. Cryptographically hashed payload trails appended to every write.',
      effectiveBuzzImplementation: 'All core configuration updates compile SHA-256 payload hashes chained with the previous state block, rendering silent database modifications immediately visible on validation.',
      verificationAudit: 'Integrity checking cron-triggers on database blocks; SQL injection scanning tools plugged directly into the CI/CD pipeline.'
    },
    {
      category: 'Repudiation',
      letter: 'R',
      description: 'A user claims they did not initiate a high-volume email scrape campaign or upgrade the enterprise level billing plan, disputing bills.',
      threatScenario: 'SaaS tenant administrator triggers 100k prospect scrapes, gets billed metered charges, and disputes responsibility, claiming a platform glitch.',
      impactTier: 'MEDIUM',
      mitigationStrategy: 'Establish an immutable, write-once audit logging engine utilizing cryptographic sequence chaining for administrative boundaries.',
      effectiveBuzzImplementation: 'Audit transactions ship synchronously via encrypted syslog channels to detached, read-only Cloud Logging vaults, complete with IP address, cryptographic user bindings, and action codes.',
      verificationAudit: 'Log coverage audit checklist; validation of sequence continuity that locks up if any entry has been scrubbed.'
    },
    {
      category: 'Information Disclosure',
      letter: 'I',
      description: 'A tenant accesses another tenant\'s proprietary scraped prospect profiles, lead lists, or confidential campaign copy due to leaky queries.',
      threatScenario: 'Ad-hoc target list fetches fail to filter by tenant context, returning cross-organization lead files via the API endpoints.',
      impactTier: 'CRITICAL',
      mitigationStrategy: 'Force strict multi-tenant isolation both at the network namespace (Kubernetes namespaces) and structural database schema constraints.',
      effectiveBuzzImplementation: 'Strict PostgreSQL RLS (Row Level Security) mandates "WHERE tenant_id = current_tenant_id()" on all schemas. Direct SQL runs fail if tenant is unassigned.',
      verificationAudit: 'Automated multitenant leak validation tests; cross-tenant query injection fuzzing executed before major releases.'
    },
    {
      category: 'Denial of Service',
      letter: 'D',
      description: 'An attacker or malfunctioning crawler script floods campaign webhook receivers or Gemini API pipelines, exhausting rate limit caps.',
      threatScenario: 'Prospect server spams incoming webhook triggers, triggering massive AI-scoring functions that freeze campaign queues for other teams.',
      impactTier: 'HIGH',
      mitigationStrategy: 'Layered ingestion defenses: Cloudflare WAF on gateway edges; Redis-based sliding window application rate-limit token buckets.',
      effectiveBuzzImplementation: 'Durable rate limits verified at gateway: 60 req/min for free tiers, 600 req/min for scale tiers. Backed by Redis memory structures. Campaign crawlers leverage throttling queues.',
      verificationAudit: 'High-throughput load testing (using k6.io framework) to verify endpoint stability and response codes under extreme volume.'
    },
    {
      category: 'Elevation of Privilege',
      letter: 'E',
      description: 'A standard tenant Member bypasses frontend limits and directly issues administrative or billing commands (e.g. creating raw API keys).',
      threatScenario: 'A workspace guest user manipulates API parameters from Member to Owner, directly deleting entire billing pipelines or RBAC definitions.',
      impactTier: 'CRITICAL',
      mitigationStrategy: 'Strict Role-Based Access Control (RBAC) checked at database, controller, and router nodes. Zero-trust security default policies.',
      effectiveBuzzImplementation: 'The Express JWT processing route decodes the authenticated role and enforces strict permissions maps (e.g. rbac:write belongs uniquement to Owners).',
      verificationAudit: 'Automated RBAC scope coverage tests evaluating all API endpoints with zero-privilege tokens.'
    }
  ];

  const complianceMilestones = [
    {
      id: 'soc2',
      name: 'SOC 2 Type I & II Certification',
      regulatoryBody: 'AICPA Trust Services Criteria (Security, Confidentiality)',
      targettimeline: '3 Months (Type I), 9 Months (Type II)',
      requirements: [
        'Immutable audit trails linking administrative actions',
        'Automatic encryption of PII & API keys at rest via Customer-Managed Keys (CMEK)',
        'Formal business continuity & database disaster backup testing documentation'
      ],
      currentProgress: 65,
      status: 'In Audit Stage',
      color: 'from-amber-500/20 to-yellow-500/10 text-amber-300 border-amber-500/20'
    },
    {
      id: 'gdpr',
      name: 'GDPR Compliance Enforcement',
      regulatoryBody: 'European Union Data Protection Board',
      targettimeline: 'Completed / Operational',
      requirements: [
        'Right to be Forgotten (hard deletion pipeline across active nodes & backup vaults within 30 days)',
        'Tenant data residency targeting isolated EU-west cloud deployment clusters',
        'Formalized Data Processing Agreements (DPA) signed for all third-party AI pipelines'
      ],
      currentProgress: 100,
      status: 'Fully Compliant',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/20'
    },
    {
      id: 'iso27001',
      name: 'ISO/IEC 27001:2022 ISMS',
      regulatoryBody: 'International Organization for Standardization',
      targettimeline: '12 Months',
      requirements: [
        'Implementation of a centralized Information Security Management System (ISMS)',
        'Structured threat vulnerability assessments (STRIDE baseline checklists)',
        'Staff security training & formalized incident response playbooks'
      ],
      currentProgress: 35,
      status: 'Gap Analysis Complete',
      color: 'from-sky-500/20 to-indigo-500/10 text-sky-300 border-sky-500/20'
    },
    {
      id: 'pentest',
      name: 'Bi-Annual External Penetration Tests',
      regulatoryBody: 'CREST Accredited External Security Firms',
      targettimeline: 'Recurring (Every 6 months)',
      requirements: [
        'Black-box application layer security reviews (OWASP Top 10 focus)',
        'White-box architecture security and multitenant boundary assessment',
        'Remediation of all critical / high severity items within 14 business days of audit'
      ],
      currentProgress: 80,
      status: 'Scheduled (July 2026)',
      color: 'from-purple-500/20 to-fuchsia-500/10 text-purple-300 border-purple-500/20'
    }
  ];

  const rlsDatabaseRows = [
    { id: '1', tenant_id: 'tenant-acme', lead_name: 'David Miller', score: 92, email: 'david@miller.com' },
    { id: '2', tenant_id: 'tenant-acme', lead_name: 'Susan Vance', score: 87, email: 'vance@susan.org' },
    { id: '3', tenant_id: 'tenant-growthx', lead_name: 'Marcus Brody', score: 78, email: 'brody@gx.net' },
    { id: '4', tenant_id: 'tenant-growthx', lead_name: 'Clara Oswald', score: 94, email: 'oswald@gx.net' },
    { id: '5', tenant_id: 'tenant-acme', lead_name: 'Ethan Hunt', score: 85, email: 'ethan@imf.gov' }
  ];

  // ============================================================================
  // Handlers & Hook Calculations
  // ============================================================================

  // Simulating JWT signing & role validations
  useEffect(() => {
    // Determine permission mapping for simulated action
    const permissionMapByRole = {
      Owner: ['campaign:write', 'campaign:read', 'lead:read', 'billing:manage', 'rbac:write', 'api_keys:create'],
      Admin: ['campaign:write', 'campaign:read', 'lead:read', 'billing:manage', 'api_keys:create'],
      Member: ['campaign:read', 'lead:read'],
      Agent: ['campaign:read', 'lead:read', 'agent:autonom']
    };

    const allowedPermissions = permissionMapByRole[selectedUserRole] || [];
    const isActionAllowed = allowedPermissions.includes(simulatedAction);

    // Dynamic JWT Payload string
    const simulatedHeader = {
      alg: "RS256",
      typ: "JWT",
      kid: "eb_jwks_pub_key_01"
    };

    const simulatedPayload = {
      iss: "https://auth.effectivebuzz.com",
      sub: `usr_eb_${selectedUserRole.toLowerCase()}_990`,
      tenant_id: selectedTenantId,
      role: selectedUserRole,
      scope: allowedPermissions.join(' '),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour session
      aud: "https://api.effectivebuzz.com/v1"
    };

    setSimulatedJwtResult({
      header: JSON.stringify(simulatedHeader, null, 2),
      payload: JSON.stringify(simulatedPayload, null, 2),
      signature: `SHA256withRSA(headerBytes + "." + payloadBytes, privateKeyHex: "${jwtKeySecretHex.slice(0, 12)}...")`,
      isActionAllowed,
      action: simulatedAction,
      role: selectedUserRole
    });
  }, [selectedUserRole, selectedTenantId, jwtKeySecretHex, simulatedAction]);

  // Rate Limiting Simulator Logic
  const handleSimulateRequest = () => {
    const timestamp = new Date().toLocaleTimeString();
    
    if (rateLimitRemaining <= 0 || isRateLimitedCode) {
      setIsRateLimitedCode(true);
      setRequestHistoryLog(prev => [
        { time: timestamp, status: 429, msg: "✕ BLOCKED - Rate Limit Exceeded (HTTP 429 Too Many Requests)" },
        ...prev.slice(0, 15)
      ]);
      return;
    }

    const nextRemaining = rateLimitRemaining - 1;
    setRateLimitRemaining(nextRemaining);
    setIpRequestCount(p => p + 1);

    if (nextRemaining <= 0) {
      setIsRateLimitedCode(true);
    }

    setRequestHistoryLog(prev => [
      { time: timestamp, status: 200, msg: `✓ SUCCESS - API Handshake complete. Session matching tenant verified.` },
      ...prev.slice(0, 15)
    ]);
  };

  const handleResetRateLimit = () => {
    setRateLimitRemaining(rateLimitMax);
    setIsRateLimitedCode(false);
    setRequestHistoryLog([]);
    setIpRequestCount(0);
  };

  // KMS Encryption dynamic update
  useEffect(() => {
    // Complex reversible logic simulation or robust visual encryption hashes
    if (isEncrypted) {
      setEncryptedCiphertext(`CIPHERTEXT_AES_CBC_IV_eb_993b_` + btoa(rawSecretText).slice(0, 36));
    } else {
      setEncryptedCiphertext(rawSecretText);
    }
  }, [rawSecretText, isEncrypted]);

  // PG RLS database fetch simulator
  useEffect(() => {
    if (querySelectTarget === 'all') {
      // In a raw standard database, all entries would return
      setRlsResultRows(rlsDatabaseRows);
    } else {
      // Under Row Level Security context
      const filtered = rlsDatabaseRows.filter(row => row.tenant_id === activeSessionTenant);
      setRlsResultRows(filtered);
    }
  }, [activeSessionTenant, querySelectTarget]);

  // Merkle Cryptographic Audit Logger
  const handleAddAuditLog = () => {
    const lastLog = auditLogs[auditLogs.length - 1];
    const newId = `evt_aud_${auditLogs.length + 1}`;
    const timestamp = new Date().toISOString();
    
    // Hash chain computation string simulation
    const simulatedHexSeed = Math.random().toString(36).substring(2, 11);
    const newPayloadHash = `0000` + btoa(newUserAction + newUserRole).slice(0, 15).toLowerCase();

    const newEntry: AuditLogEntry = {
      id: newId,
      timestamp,
      userId: `usr_eb_active`,
      action: newUserAction,
      role: newUserRole,
      tenantId: activeSessionTenant,
      ipAddress: "198.51.100.41",
      payloadHash: newPayloadHash,
      previousHash: lastLog ? lastLog.payloadHash : "0000000000000000000"
    };

    setAuditLogs([...auditLogs, newEntry]);
  };

  // Tamper audit log state deliberately to show cryptographic verification failing
  const handleTamperAuditLog = (id: string) => {
    setAuditLogs(prev => prev.map(log => {
      if (log.id === id) {
        return {
          ...log,
          action: "campaign:unauthorized_modify",
          payloadHash: "0000BAD_TAMPERED_HASH_991b1",
          isTampered: true
        };
      }
      return log;
    }));
    setIsChainBroken(true);
  };

  const handleResetAuditLogs = () => {
    setAuditLogs([
      {
        id: "evt_aud_1",
        timestamp: "2026-06-06T20:15:00Z",
        userId: "usr_alice",
        action: "campaign:publish",
        role: "Admin",
        tenantId: "tenant-acme",
        ipAddress: "198.51.100.41",
        payloadHash: "0000a29f8c14d9b35b6",
        previousHash: "0000000000000000000"
      },
      {
        id: "evt_aud_2",
        timestamp: "2026-06-06T20:18:12Z",
        userId: "usr_bob",
        action: "billing:upgrade",
        role: "Owner",
        tenantId: "tenant-acme",
        ipAddress: "198.51.100.41",
        payloadHash: "00007e99ca25b1842ad",
        previousHash: "0000a29f8c14d9b35b6"
      },
      {
        id: "evt_aud_3",
        timestamp: "2026-06-06T20:20:45Z",
        userId: "usr_agent_01",
        action: "lead:scrape",
        role: "Agent",
        tenantId: "tenant-acme",
        ipAddress: "203.0.113.111",
        payloadHash: "000021bdfc912bbcf04",
        previousHash: "00007e99ca25b1842ad"
      }
    ]);
    setIsChainBroken(false);
  };

  const handleCopyCode = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextLabel(label);
    setTimeout(() => setCopiedTextLabel(null), 2000);
  };

  return (
    <div className="space-y-6 animate-feed relative">
      
      {/* 1. MASTER SECURITY HUB BANNER */}
      <div className="bg-gradient-to-r from-red-500/10 via-[#1c0808]/20 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-y-1/4 translate-x-1/4 w-72 h-72 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-0 bottom-0 -translate-y-1/4 -translate-x-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> SECURITY ARCHITECT SPEC
              </span>
              <span className="text-[10px] bg-[#1e293b] text-blue-300 border border-blue-500/10 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider">
                ZERO-TRUST DESIGN
              </span>
            </div>
            <h1 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2.5">
              <Shield className="w-6 h-6 text-red-400" />
              SaaS Threat Modeling & Security Architecture
            </h1>
            <p className="text-sm text-gray-400 max-w-4xl leading-relaxed font-sans">
              Acting as a SaaS Security Architect, we have mapped out security postures for the EffectiveBuzz network. Test secure JWT claims, RBAC permissions maps, Redis token buckets, PostgreSQL RLS, and envelope KMS encryption in our live simulator portal below.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 min-w-[280px]">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850/60 font-mono text-center">
              <span className="text-[9px] text-gray-500 block uppercase font-bold">Session Security</span>
              <strong className="text-red-400 text-sm leading-none">HMAC-RS256 Pub/Priv</strong>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850/60 font-mono text-center">
              <span className="text-[9px] text-gray-500 block uppercase font-bold">Data Encryption</span>
              <strong className="text-blue-400 text-sm leading-none">AES-256-GCM CMEK</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUB-PORTAL SELECTION RAIL */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-950 rounded-xl border border-slate-850 sm:w-fit">
        {[
          { id: 'playground', label: '1. Reactive Security Sandbox', icon: Sliders },
          { id: 'model', label: '2. STRIDE Threat Model Matrix', icon: ShieldAlert },
          { id: 'controls', label: '3. Architectural Security Controls', icon: Lock },
          { id: 'roadmap', label: '4. Enterprise Compliance Roadmap', icon: FileSpreadsheet }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePortalTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activePortalTab === tab.id 
                  ? 'bg-slate-900 border border-slate-700 text-white shadow shadow-red-500/5'
                  : 'border border-transparent text-gray-400 hover:text-white hover:bg-slate-900/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-red-400/80" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. PORTAL CORE VIEWS */}

      {/* TAB 1: REACTIVE SECURITY SANDBOX & SIMULATORS (Highly Interactive) */}
      {activePortalTab === 'playground' && (
        <div className="space-y-6 animate-feed">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* SUB-SECTION A: INTUITIVE JWT & RBAC MATRICES */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="text-xs uppercase font-mono font-bold text-red-300 tracking-wide flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-red-400" />
                  Stateless JWT Claims & Signature Encoder
                </span>
                <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase">SEC_GATE</span>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Stateless tokens contain encrypted assertions of user status. Mutate identity parameters below and trace the real-time compilation of the RS256 cryptographically signed security token block.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-sans">
                {/* Select identity role */}
                <div className="space-y-1.5">
                  <label className="text-gray-400 font-medium block">Select RBAC User Claim:</label>
                  <select 
                    value={selectedUserRole}
                    onChange={(e) => setSelectedUserRole(e.target.value as any)}
                    className="w-full bg-slate-950 px-3 py-2 border border-slate-850 rounded-lg text-white font-mono"
                  >
                    <option value="Owner">Owner (Global Power Privilege)</option>
                    <option value="Admin">Admin (Workspace administrative duties)</option>
                    <option value="Member">Member (Read & Scrape parameters)</option>
                    <option value="Agent">Agent (Autonomous API Scraper service)</option>
                  </select>
                </div>

                {/* Tenant Identification key */}
                <div className="space-y-1.5">
                  <label className="text-gray-400 font-medium block">Impose isolation key (tenant_id):</label>
                  <select 
                    value={selectedTenantId}
                    onChange={(e) => setSelectedTenantId(e.target.value)}
                    className="w-full bg-slate-950 px-3 py-2 border border-slate-850 rounded-lg text-white font-mono"
                  >
                    <option value="tenant-acme-prod">Acme Corp (tenant-acme-prod)</option>
                    <option value="tenant-growthx-dev">GrowthX Studio (tenant-growthx-dev)</option>
                    <option value="tenant-enterprise-flow">Enterprise Flow (tenant-enterprise-flow)</option>
                  </select>
                </div>
              </div>

              {/* Action authorization simulation */}
              <div className="space-y-2 p-3.5 bg-slate-950 rounded-xl border border-slate-850">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium font-sans">Perform Protected Action:</span>
                  <div className="flex gap-2">
                    {['campaign:write', 'lead:read', 'rbac:write', 'api_keys:create'].map(act => (
                      <button
                        key={act}
                        onClick={() => setSimulatedAction(act)}
                        className={`px-2.5 py-1 rounded text-[10.5px] font-mono transition-colors ${
                          simulatedAction === act 
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                            : 'bg-slate-900 text-gray-500 border border-transparent hover:text-gray-300'
                        }`}
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action authorization banner */}
                {simulatedJwtResult && (
                  <div className={`mt-3 p-2.5 rounded-lg border text-xs flex items-center justify-between font-mono ${
                    simulatedJwtResult.isActionAllowed 
                      ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' 
                      : 'bg-red-500/10 border-red-500/25 text-red-400'
                  }`}>
                    <div className="flex items-center gap-2">
                      {simulatedJwtResult.isActionAllowed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      <span>
                        Role <strong>{simulatedJwtResult.role}</strong> attempting <strong>{simulatedJwtResult.action}</strong>
                      </span>
                    </div>
                    <strong className="uppercase text-[9px] px-1.5 py-0.5 rounded bg-[#1e293b]/50 border border-slate-800">
                      {simulatedJwtResult.isActionAllowed ? 'AUTHORIZED' : 'DENIED BY RBAC policy'}
                    </strong>
                  </div>
                )}
              </div>

              {/* JWT Cryptographic Output Block */}
              {simulatedJwtResult && (
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-bold block">RS256 Decoded JSON Header & Claims Claims</span>
                    <button
                      onClick={() => setShowSignedJwt(!showSignedJwt)}
                      className="text-xs text-blue-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {showSignedJwt ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showSignedJwt ? 'Show Raw JWT Decoded' : 'Show Encoded JWT signature'}
                    </button>
                  </div>

                  {!showSignedJwt ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#080d16] p-3 rounded-lg border border-slate-900">
                        <span className="text-[10px] text-purple-400 block mb-1 uppercase font-bold">1. Header</span>
                        <pre className="text-zinc-300 text-[10.5px] leading-relaxed max-h-[140px] overflow-y-auto">{simulatedJwtResult.header}</pre>
                      </div>
                      <div className="bg-[#080d16] p-3 rounded-lg border border-slate-905">
                        <span className="text-[10px] text-teal-400 block mb-1 uppercase font-bold">2. Claims Payload</span>
                        <pre className="text-zinc-300 text-[10.5px] leading-relaxed max-h-[140px] overflow-y-auto">{simulatedJwtResult.payload}</pre>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 break-words leading-relaxed space-y-2">
                      <span className="text-[10px] text-amber-400 block uppercase font-bold">Cryptographically Encoded JWT String:</span>
                      <p className="text-[10px] text-gray-400 selection:bg-red-500/30">
                        <span className="text-purple-400 font-bold">eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImViX2p3a3NfcHViX2tleV8wMSJ9</span>.
                        <span className="text-teal-400 font-bold">{btoa(simulatedJwtResult.payload).slice(0, 80)}</span>.
                        <span className="text-red-400">c2JfOTkyMV9lYmJfcHJvZF9zZWNfc2lnbmluZ19yczI1Nl9zeW1tZXRyaWNfa2V5XzAxX3NfZmFsc2VfOTAxMl9hYmNfZXJy</span>
                      </p>
                      <div className="text-[9.5px] text-zinc-500 border-t border-gray-900 pt-1.5 flex justify-between">
                        <span>Algorithm validation type: <strong>RS256 Signature (asymmetric private verified)</strong></span>
                        <span>Key length: <strong>2048 Bit Private Match</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SUB-SECTION B: RATE LIMITING & REDIS TOKEN BUCKET */}
            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-xs uppercase font-mono font-bold text-blue-300 tracking-wide flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Distributed Application Rate Limiting & Token Bucket
                  </span>
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase">REDIS_SHIELD</span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Prevents malicious scraping bots from locking up key API pools. Uses a sliding window algorithm to monitor incoming IP handshakes. Max requests permitted in sample cycle: <strong className="text-teal-400">10 requests</strong>.
                </p>

                {/* Simulated Redis Token status */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 grid grid-cols-3 gap-4 text-center font-mono">
                  <div className="space-y-1">
                    <span className="text-[9px] text-gray-500 block uppercase font-bold">Token Pool Status</span>
                    <strong className={`text-lg leading-none ${rateLimitRemaining > 3 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {rateLimitRemaining} / 10
                    </strong>
                  </div>
                  <div className="space-y-1 border-x border-gray-900">
                    <span className="text-[9px] text-gray-500 block uppercase font-bold">Ingested Hits</span>
                    <strong className="text-white text-lg leading-none">{ipRequestCount}</strong>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-gray-500 block uppercase font-bold">Endpoint Safety</span>
                    <strong className={`text-xs uppercase px-1.5 py-0.5 rounded leading-none ${isRateLimitedCode ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {isRateLimitedCode ? 'THROTTLED (429)' : 'SECURE'}
                    </strong>
                  </div>
                </div>

                {/* Progress Visualizer bar */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-mono text-gray-500 text-[10px]">
                    <span>Token Budget Exhaustion Threshold:</span>
                    <span>{rateLimitRemaining * 10}% Available</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 border border-slate-805 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        rateLimitRemaining > 5 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                          : rateLimitRemaining > 2 
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-400' 
                            : 'bg-red-500'
                      }`} 
                      style={{ width: `${(rateLimitRemaining / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Real-time simulated headers output */}
                <div className="p-3 bg-[#080d16] rounded-xl border border-slate-900 space-y-1.5 text-[10.5px] font-mono leading-relaxed text-zinc-400">
                  <span className="text-[10px] text-purple-400 font-bold block uppercase border-b border-gray-900 pb-1 mb-1">
                    Simulated HTTP Rate Limiting Headers Out:
                  </span>
                  <div className="flex justify-between">
                    <span>X-RateLimit-Limit:</span>
                    <strong className="text-white">10 requests per 10s Window</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>X-RateLimit-Remaining:</span>
                    <strong className="text-teal-400">{rateLimitRemaining}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>X-RateLimit-Reset-Time:</span>
                    <strong className="text-white">In 8.4 seconds (epoch rolling)</strong>
                  </div>
                  {isRateLimitedCode && (
                    <div className="flex justify-between text-red-400 font-bold border-t border-slate-900 pt-1.5 mt-1.5 animate-pulse">
                      <span>HTTP Return Status Code:</span>
                      <span>429 Too Many Requests; Retry-After: 10s</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleSimulateRequest}
                  className="py-2.5 bg-slate-900 hover:bg-slate-850 border border-gray-800 text-white font-mono text-xs font-bold rounded-lg transition-all cursor-pointer text-center"
                >
                  Trigger HTTP Request Hit
                </button>
                <button
                  onClick={handleResetRateLimit}
                  className="py-2.5 bg-slate-950 hover:bg-[#130707] border border-red-950/40 text-red-400 font-mono text-xs font-bold rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Client Budget
                </button>
              </div>
            </div>

          </div>

          {/* SECTION 2: TENANT ISOLATION PG RLS & KMS ENVELOPE ENCRYPTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* PG Row Level Security sandbox panel */}
            <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-xs uppercase font-mono font-bold text-red-300 tracking-wide flex items-center gap-1.5 font-bold">
                    <Database className="w-4 h-4 text-[#818cf8]" />
                    PostgreSQL Row Level Security (RLS) Database Sandbox
                  </span>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold">RLS_SHIELD</span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  The primary security failure in multi-tenant SaaS is data bleeding (one tenant accidentally reading another's proprietary prospects). We configure RLS policies that append <code className="text-[#818cf8] font-bold font-mono">tenant_id</code> boundaries on the PostgreSQL engine level, neutralizing leaky queries.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  {/* Selected tenant active session */}
                  <div className="space-y-1.5">
                    <span className="text-gray-400 font-medium block">1. Set Active Authenticated Session Tenant:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveSessionTenant('tenant-acme')}
                        className={`flex-1 py-1 px-2 text-[11px] rounded transition-all text-center border font-mono ${
                          activeSessionTenant === 'tenant-acme' 
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold' 
                            : 'bg-slate-950 border-slate-900 text-gray-500'
                        }`}
                      >
                        Acme Corporation
                      </button>
                      <button
                        onClick={() => setActiveSessionTenant('tenant-growthx')}
                        className={`flex-1 py-1 px-2 text-[11px] rounded transition-all text-center border font-mono ${
                          activeSessionTenant === 'tenant-growthx' 
                            ? 'bg-purple-500/10 border-purple-500/40 text-purple-350 font-bold' 
                            : 'bg-slate-950 border-slate-900 text-gray-500'
                        }`}
                      >
                        GrowthX Studio
                      </button>
                    </div>
                  </div>

                  {/* Select SQL Policy simulation */}
                  <div className="space-y-1.5">
                    <span className="text-gray-400 font-medium block">2. DB Query Engine Mode:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setQuerySelectTarget('all')}
                        className={`flex-1 py-1 px-2 text-[11px] rounded transition-all text-center border font-mono ${
                          querySelectTarget === 'all' 
                            ? 'bg-red-500/10 border-red-500/40 text-red-300 font-bold' 
                            : 'bg-slate-950 border-slate-900 text-gray-500'
                        }`}
                      >
                        Standard Select Query
                      </button>
                      <button
                        onClick={() => setQuerySelectTarget('filtered')}
                        className={`flex-1 py-1 px-2 text-[11px] rounded transition-all text-center border font-mono ${
                          querySelectTarget === 'filtered' 
                            ? 'bg-blue-500/10 border-blue-500/40 text-blue-300 font-bold' 
                            : 'bg-slate-950 border-slate-900 text-gray-500'
                        }`}
                      >
                        Row-Level Security Checked
                      </button>
                    </div>
                  </div>
                </div>

                {/* Animated SQL output */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-1.5 text-xs font-mono leading-relaxed">
                  <div className="flex justify-between border-b border-gray-900 pb-1.5 text-[10px]">
                    <span className="text-zinc-500 font-bold uppercase">Dynamic SQL Compiled at Database Ingress:</span>
                    <span className="text-[#818cf8] font-bold">SQL_TRANS</span>
                  </div>
                  {querySelectTarget === 'all' ? (
                    <code className="text-red-400 font-semibold block leading-normal">
                      SELECT * FROM campaign_leads; <span className="text-gray-500 block text-[10px] mt-1 italic">// Vulnerable warning! Bleeds all data boundaries across entire server!</span>
                    </code>
                  ) : (
                    <code className="text-blue-300 font-semibold block leading-normal">
                      SELECT * FROM campaign_leads <span className="text-emerald-400 font-bold">WHERE tenant_id = '{activeSessionTenant}'</span>;
                      <span className="text-gray-500 block text-[10px] mt-1 italic">// Compliant isolation rule. Injected explicitly by central connection proxy session headers automatically in PostgreSQL.</span>
                    </code>
                  )}
                </div>

                {/* Database query results block */}
                <div className="space-y-1.5 font-mono">
                  <span className="text-[10px] text-zinc-500 font-bold block uppercase">Database ResultSet Schema Out:</span>
                  <div className="bg-slate-950 border border-slate-900 rounded-lg overflow-hidden text-[10.5px]">
                    <table className="w-full text-left text-gray-300">
                      <thead className="bg-[#0c101d] text-gray-500 border-b border-gray-900 uppercase text-[9px] font-black">
                        <tr>
                          <th className="p-2">Row ID</th>
                          <th className="p-2">Tenant Scope</th>
                          <th className="p-2">Prospect Candidate Name</th>
                          <th className="p-2 text-right">Lead AI Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-900">
                        {rlsResultRows.map((row, idx) => (
                          <tr 
                            key={row.id} 
                            className={`hover:bg-slate-905 transition-colors ${
                              querySelectTarget === 'all' && row.tenant_id !== 'tenant-acme' 
                                ? 'bg-red-500/5 text-red-200' 
                                : 'text-gray-300'
                            }`}
                          >
                            <td className="p-2 text-gray-500 font-bold">#{row.id}</td>
                            <td className={`p-2 font-bold ${row.tenant_id === 'tenant-acme' ? 'text-emerald-400' : 'text-purple-400'}`}>
                              {row.tenant_id}
                            </td>
                            <td className="p-2 font-sans">{row.lead_name}</td>
                            <td className="p-2 text-right font-bold text-teal-400">{row.score}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* RLS policy DDL block code */}
              <div className="pt-3 border-t border-slate-900 flex justify-between items-center text-[10.5px] font-mono text-gray-500">
                <span>Core policy DDL code compiled to DB schemas</span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(`ALTER TABLE campaign_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY lease_isolation_policy ON campaign_leads
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id', true));`, 'rls-ddl-copy')}
                  className="px-2 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-900 rounded text-[9.5px] text-zinc-400 flex items-center gap-1 cursor-pointer"
                >
                  {copiedTextLabel === 'rls-ddl-copy' ? <Check className="w-3" /> : <Copy className="w-3" />}
                  <span>{copiedTextLabel === 'rls-ddl-copy' ? 'Copied Policy SQL!' : 'Copy RLS Policy DDL'}</span>
                </button>
              </div>
            </div>

            {/* Cloud KMS Envelope Encryption sandbox */}
            <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-xs uppercase font-mono font-bold text-red-300 tracking-wide flex items-center gap-1.5 font-bold">
                    <LockKeyhole className="w-4 h-4 text-emerald-400" />
                    Cloud KMS Envelope Key Encrypters
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold">CLOUD_KMS</span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Storing third-party API credentials, such as Gemini keys, safely represents high architectural hazards. We decouple keys using **Envelope Encryption**. A Cloud KMS Master Key encrypts a local Data Encryption Key (DEK), ensuring keys are never plain in Postgres.
                </p>

                {/* Raw secret input */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-gray-400 font-medium block">Raw PII Secret Credentials:</span>
                  <input
                    type="password"
                    value={rawSecretText}
                    onChange={(e) => setRawSecretText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 rounded-lg p-2 font-mono text-emerald-400 focus:ring-1 focus:ring-emerald-500"
                    placeholder="Enter confidential API key here..."
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 text-xs font-mono space-y-2 leading-relaxed">
                  <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500 border-b border-gray-900 pb-1 mb-1">
                    <span>Envelope Pipeline Ledger</span>
                    <span>ACTIVE</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] text-gray-500 block">1. Cloud KMS Customer Master Key (CMEK-256):</span>
                    <strong className="text-blue-400 font-bold block text-[10px]">arn:gcp:kms:us-central1:ebb:cryptoKeys/master-billing-envelope-key</strong>
                  </div>
                  <div>
                    <span className="text-[9.5px] text-gray-500 block">2. Master Key Encrypted Data Encryption Key (DEK):</span>
                    <code className="text-yellow-400 font-semibold block break-all text-[9px]">{kmsDataKeyCipher}</code>
                  </div>
                </div>

                {/* Animated output state ciphertext */}
                <div className="p-3 bg-[#080d16] rounded-xl border border-slate-900 space-y-1 text-xs font-mono leading-relaxed">
                  <span className="text-[10px] text-purple-400 font-bold block uppercase border-b border-slate-900 pb-1 mb-1">
                    Value stored inside the PostgreSQL DB cell:
                  </span>
                  <code className="text-red-400 font-bold text-[10.5px] block break-all leading-relaxed">
                    {encryptedCiphertext}
                  </code>
                </div>
              </div>

              {/* Encryption controls buttons */}
              <button
                type="button"
                onClick={() => setIsEncrypted(!isEncrypted)}
                className={`w-full py-2.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer text-center ${
                  isEncrypted 
                    ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' 
                    : 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                }`}
              >
                {isEncrypted ? 'Decrypt Database Ciphertext' : 'Encrypt with CMEK & DEK'}
              </button>
            </div>

          </div>

          {/* SECTION 3: IMMUTABLE AUDIT LOG & MERKLE SEQUENCE CHAINING */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono font-bold text-red-300 tracking-wide flex items-center gap-1.5 font-bold">
                  <HardDrive className="w-4 h-4 text-purple-400" />
                  Immutable Cryptographic Audit Logger (Merkle-Chained Trails)
                </span>
                <p className="text-[11px] text-gray-400 font-normal leading-normal font-sans">
                  Ensures perfect non-repudiation and zero tampering. Every critical event hashes with the signature hash of the preceding block, constructing a cryptographically contiguous chain. If a hacker tampers with an audit record directly in the DB, the chain collapses instantly.
                </p>
              </div>
              <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded font-mono font-bold">AUDIT_WORM</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Add trigger audit events */}
              <div className="lg:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-900 flex flex-col justify-between space-y-4 text-xs font-sans">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#818cf8] font-bold block border-b border-gray-900 pb-1">
                    IMPOSE INCIDENT ACTION EVENT
                  </span>

                  <div className="space-y-1.5">
                    <span className="text-gray-400 block">Select administrative Scope:</span>
                    <select 
                      value={newUserAction}
                      onChange={(e) => setNewUserAction(e.target.value)}
                      className="w-full bg-slate-900 p-2 rounded border border-gray-800 text-white font-mono"
                    >
                      <option value="api_keys:create">Create raw API keys for scraper</option>
                      <option value="rbac:role_override">Override RBAC role boundaries</option>
                      <option value="campaign:force_terminate">Force abort active AI outbound sequences</option>
                      <option value="billing:coupon_inject">Inject free billing access codes</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-gray-400 block">Authorized actor role mapping:</span>
                    <select 
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as any)}
                      className="w-full bg-slate-900 p-2 rounded border border-gray-800 text-white font-mono"
                    >
                      <option value="Owner">Owner</option>
                      <option value="Admin">Admin</option>
                      <option value="Member">Member</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleAddAuditLog}
                    disabled={isChainBroken}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-mono text-xs font-bold rounded-lg cursor-pointer tracking-wider font-semibold shadow"
                  >
                    APPEND SECURE AUDIT CHAIN RECORD
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAuditLogs}
                    className="w-full py-1.5 bg-slate-900 hover:bg-slate-850 text-zinc-400 hover:text-white border border-gray-850 font-mono text-xs rounded-lg cursor-pointer"
                  >
                    Reset & Sync Cryptographic Ledger
                  </button>
                </div>
              </div>

              {/* Live Chain Ledger render */}
              <div className="lg:col-span-8 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-[11px] text-gray-500 border-b border-gray-900 pb-1">
                  <span>Cryptographic Merkle Audit Log Records</span>
                  <span>Ledger Status: {isChainBroken ? (
                    <strong className="text-red-400 animate-pulse uppercase">✕ CASCADE INTEGRITY BREACH DETECTED</strong>
                  ) : (
                    <strong className="text-emerald-400 uppercase">✓ CHAIN IS SECURE & CONTINUOUS</strong>
                  )}</span>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {auditLogs.map((log, index) => {
                    return (
                      <div 
                        key={log.id}
                        className={`p-3 rounded-lg border transition-all relative ${
                          log.isTampered 
                            ? 'bg-red-500/10 border-red-500/30 text-red-200' 
                            : 'bg-slate-950 border-[#1f2937]/50 text-gray-300'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] border-b border-gray-900 pb-1.5 mb-1.5 font-bold uppercase tracking-wider text-teal-400">
                          <div className="flex items-center gap-1.5">
                            <span className="p-0.5 rounded bg-slate-900 border border-gray-800 text-[10px] font-bold text-gray-500 font-mono">#{index + 1}</span>
                            <span>{log.id} ({log.action})</span>
                          </div>
                          <span className="text-gray-500 text-[10px] font-normal">{log.timestamp}</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10.5px]">
                          <div>
                            <span className="text-gray-500 block">Actor Identity</span>
                            <span className="text-white font-sans">{log.userId}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">RBAC Role</span>
                            <span className="text-zinc-300 uppercase block font-bold">{log.role}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Prev Hash</span>
                            <code className="text-yellow-400 text-[9px] truncate block">{log.previousHash}</code>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Block Payload Hash</span>
                            <code className="text-emerald-400 text-[9px] truncate block">{log.payloadHash}</code>
                          </div>
                        </div>

                        {/* Tamper Button trigger */}
                        {!log.isTampered && !isChainBroken && (
                          <button
                            type="button"
                            onClick={() => handleTamperAuditLog(log.id)}
                            className="absolute top-2 right-2 px-1.5 py-0.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 hover:border-transparent rounded text-[9px] transition-all cursor-pointer font-sans"
                            title="Tamper directly with database value to test cryptographic break"
                          >
                            Simulate DB Hack/Tamper
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: DETAILED STRIDE THREAT MATRIX */}
      {activePortalTab === 'model' && (
        <div className="space-y-6 animate-feed">
          
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-xs uppercase font-mono tracking-wider font-bold text-red-400 block font-bold">
                Threat Classification STRIDE Model Core Matrix
              </span>
              <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-mono font-bold">STRIDE_FRAMEWORK</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-sans leading-relaxed">
              Mapped specifically to the **EffectiveBuzz outbound marketing campaign network**. The STRIDE model defines threat vectors and ensures clear isolation postures, safeguarding prospective targets and multi-tenant security layers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
              {strideThreats.map(thr => (
                <div 
                  key={thr.category}
                  className="bg-slate-950/80 border border-slate-850 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-red-500/25 transition-colors relative"
                >
                  <span className="absolute top-4 right-4 text-3xl font-display font-medium text-slate-900 font-black tracking-normal pointer-events-none select-none">
                    {thr.letter}
                  </span>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center text-xs font-mono font-bold">
                        {thr.letter}
                      </span>
                      <h3 className="text-white text-sm font-display font-bold">{thr.category}</h3>
                      <span className={`text-[8.5px] uppercase px-1.5 rounded font-bold border font-mono ml-auto ${
                        thr.impactTier === 'CRITICAL' 
                          ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {thr.impactTier}
                      </span>
                    </div>

                    <p className="text-[11.5px] text-gray-400 leading-relaxed font-sans">{thr.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-900 text-xs font-mono leading-relaxed">
                    <div>
                      <span className="text-[10px] text-zinc-500 block font-bold uppercase">Threat Scenario:</span>
                      <p className="text-[11px] text-zinc-300 font-sans leading-relaxed mt-0.5">{thr.threatScenario}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-450 block font-bold uppercase">Architectural Mitigation:</span>
                      <p className="text-[11px] text-teal-300 font-sans leading-relaxed mt-0.5">{thr.mitigationStrategy}</p>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded border border-slate-850/60 mt-1">
                      <span className="text-[9.5px] text-purple-400 block font-bold uppercase">Compliance Validation Audits:</span>
                      <p className="text-[10.5px] text-gray-400 font-sans leading-relaxed mt-0.5">{thr.verificationAudit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: DENSE SECURITY CONTROLS DIRECTORY */}
      {activePortalTab === 'controls' && (
        <div className="space-y-6 animate-feed">
          
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-red-400 block font-bold border-b border-gray-800 pb-2">
              Deep-Dive System Architectural Controls
            </span>

            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              To achieve SOC2 compliance, specific defensive postures must be codified with immutable verification structures. Let's detail our core implementations for rate limiting, tenant isolations, and backup algorithms.
            </p>

            <div className="space-y-4">
              
              {/* Backups spec */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9.5px] font-mono font-bold uppercase">
                      Core Backup Spec
                    </span>
                    <h3 className="text-white text-xs uppercase font-mono tracking-widest font-bold">Dynamic PITR Replication & Disaster Recovery</h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    PostgreSQL databases execute **Continuous WAL (Write-Ahead Log) Archival to Cloud Storage**, facilitating precise 5-minute Point-in-Time Recovery (PITR). Encrypted snapshots are distributed cross-region (multi-region GCP bucket mirrors) with standard 30-day Retention Schemas strictly matching SOC2 Trust Criteria.
                  </p>
                </div>
                <div className="lg:col-span-4 bg-[#080d16] p-3 rounded-lg border border-slate-900 font-mono text-[10px] text-gray-450 text-blue-300 leading-relaxed max-h-[120px] overflow-y-auto">
                  <span className="text-[9px] text-zinc-550 uppercase block font-bold mb-1 border-b border-slate-850 pb-0.5">Mock Backup Cron Command:</span>
                  <p className="text-emerald-450 leading-relaxed font-semibold">
                    # Daily DB Snapshot script:<br />
                    pg_dump -h db_host -u saas_master | gzip | kms_encrypt --key_id cmek_key &gt; /gs/backups/ebb_daily_$(date +%F).sql.gz
                  </p>
                </div>
              </div>

              {/* Secure Session JWT spec */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9.5px] font-mono font-bold uppercase">
                      JWT Strategy
                    </span>
                    <h3 className="text-white text-xs uppercase font-mono tracking-widest font-bold">Stateful Token Revocation (Stateless Performance with Security)</h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans flex-1">
                    To preserve session revocation capabilities on a stateless JWT system, token hashes (JTI) are stored inside high-speed Redis caches. If admins revoke team privileges or change credentials, the token is flagged on the database, forcing re-authentication on the next handshake.
                  </p>
                </div>
                <div className="lg:col-span-4 bg-[#080d16] p-3 rounded-lg border border-slate-900 font-mono text-[10px] text-indigo-300 leading-relaxed max-h-[120px] overflow-y-auto w-full">
                  <span className="text-[9px] text-zinc-550 uppercase block font-bold mb-1 border-b border-slate-850 pb-0.5">Revocation Check middleware:</span>
                  <p className="text-[#818cf8] leading-relaxed font-semibold">
                    {"const isRevoked = await redis.get(`revoked_token:${decoded.jti}`);"}<br />
                    {"if (isRevoked) { return res.status(401).json({ error: 'Token Revoked' }); }"}
                  </p>
                </div>
              </div>

              {/* Endpoint Rate Limiting spec */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9.5px] font-mono font-bold uppercase">
                      WAF & Ingress Rate Limiting
                    </span>
                    <h3 className="text-white text-xs uppercase font-mono tracking-widest font-bold">Dual-Tier Token Bucket Algorithms</h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Rate limiting is enforced at two distinct nodes: **Edge level** via proxy Cloudflare WAF definitions (shielding against raw layer 7 DDoS floods), and **Application level** via decoupled Express middlewares. Free client limits enforce 2 req/sec; paid tiers scale gracefully up to 50 req/sec dynamically checked.
                  </p>
                </div>
                <div className="lg:col-span-4 bg-[#080d16] p-3 rounded-lg border border-slate-900 font-mono text-[10px] text-amber-300 leading-relaxed max-h-[120px] overflow-y-auto w-full">
                  <span className="text-[9px] text-zinc-550 uppercase block font-bold mb-1 border-b border-slate-850 pb-0.5">Ingress Middleware Code:</span>
                  <p className="text-amber-450 leading-relaxed font-semibold">
                    {"import rateLimit from 'express-rate-limit';"}<br />
                    {"export const gatewayLimiter = rateLimit({ windowMs: 60 * 1000, max: req => getTenantTierLimit(req) });"}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 4: COMPLIANCE ROADMAP */}
      {activePortalTab === 'roadmap' && (
        <div className="space-y-6 animate-feed">
          
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-red-400 block font-bold border-b border-gray-800 pb-2">
              Central Compliance & Regulatory Roadmap
            </span>

            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Deploying campaign systems at high scale requires adherence to major compliance specifications. Monitor audit benchmarks, ongoing security timelines, and formal ISO & SOC2 deliverables below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complianceMilestones.map(ms => (
                <div 
                  key={ms.id} 
                  className={`p-5 rounded-xl border bg-gradient-to-br ${ms.color} space-y-3 relative overflow-hidden`}
                >
                  <div className="space-y-1 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-slate-950 font-mono font-black border border-slate-900 px-2.5 py-0.5 rounded-full text-zinc-400">
                        {ms.regulatoryBody}
                      </span>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                        {ms.status}
                      </span>
                    </div>
                    <h3 className="text-white text-sm font-sans font-bold pt-1">{ms.name}</h3>
                    <p className="text-[11px] text-gray-400 font-mono">Target Timeline Target: <strong>{ms.targettimeline}</strong></p>
                  </div>

                  {/* Slider requirement indicators */}
                  <div className="space-y-2 pt-2 relative z-10">
                    <div className="flex justify-between text-[11px] font-mono text-zinc-300">
                      <span>Requirement Completion Metrics:</span>
                      <strong>{ms.currentProgress}% Ready</strong>
                    </div>
                    <div className="h-2 w-full bg-slate-950/80 rounded-full border border-slate-900 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500/40 via-purple-500/40 to-blue-500/40 rounded-full transition-all duration-500"
                        style={{ width: `${ms.currentProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Requirements checklist */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-900 text-xs font-sans">
                    <span className="text-[10px] text-zinc-400 block font-bold font-mono uppercase">Key Audit Controls Checklist:</span>
                    <ul className="text-[11px] text-zinc-300 space-y-1">
                      {ms.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5 leading-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
