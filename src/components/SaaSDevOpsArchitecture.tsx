import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, Database, Cloud, Network, ShieldAlert, Cpu, Heart, Play, 
  RefreshCw, CheckCircle, Terminal, FileCode, Sliders, ChevronRight, 
  Trash2, Layers, HardDrive, RefreshCw as RotateIcon, Send, Wifi, AlertTriangle
} from 'lucide-react';

interface ContainerSpec {
  name: string;
  image: string;
  role: string;
  ports: string;
  volumes: string;
  health: string;
  cpuLimit: string;
  ramLimit: string;
  restart: string;
}

export default function SaaSDevOpsArchitecture() {
  const [activeTab, setActiveTab] = useState<'topology' | 'configs' | 'backups' | 'monitoring' | 'cicd' | 'dr'>('monitoring');
  const [selectedNode, setSelectedNode] = useState<string>('app');
  const [codeTab, setCodeTab] = useState<'dockerfile' | 'compose' | 'cloudflare'>('compose');
  
  // Backup simulation states
  const [backupLogs, setBackupLogs] = useState<string[]>([]);
  const [backupRunning, setBackupRunning] = useState<boolean>(false);
  const [lastBackupTime, setLastBackupTime] = useState<string>('Never');
  const [backupChain, setBackupChain] = useState<{ id: string; time: string; size: string; status: string }[]>([
    { id: 'BU-3241-MAIN', time: '2026-06-06 12:00:03 UTC', size: '408.2 MB', status: 'Healthy' },
    { id: 'BU-3240-WAL', time: '2026-06-06 13:00:05 UTC', size: '12.4 MB', status: 'Healthy' }
  ]);

  // Deployment simulator states
  const [deployStep, setDeployStep] = useState<number>(0);
  const [deployRunning, setDeployRunning] = useState<boolean>(false);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);

  // Monitoring telemetry states
  const [telemetry, setTelemetry] = useState({
    avgPing: 24,
    traefikReq: 132,
    traefikLat: 2.1,
    appCpu: 26,
    appMem: 1840,
    dbCpu: 8,
    dbCacheHit: 99.85,
    dbConns: 42,
    redisCpu: 4,
    redisMem: 248,
    redisHitRate: 98.42
  });

  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [isLogsPaused, setIsLogsPaused] = useState<boolean>(false);

  // Disaster recovery sandbox states
  const [drStatus, setDrStatus] = useState<'healthy' | 'db_fail' | 'redis_oom' | 'cloudflare_fail'>('healthy');
  const [drLogs, setDrLogs] = useState<string[]>([]);
  const [failoverRunning, setFailoverRunning] = useState<boolean>(false);

  // Specifications metadata lookup
  const containerSpecs: Record<string, ContainerSpec> = {
    app: {
      name: 'effectivebuzz-backend',
      image: 'node:18-alpine (custom multi-stage)',
      role: 'Express API Server & Workflow Scheduler Engine',
      ports: '3000 -> 3000 (Internal only, mapped via Traefik)',
      volumes: 'none (Stateless architecture)',
      health: 'CMD curl -f http://localhost:3000/api/health || exit 1',
      cpuLimit: '2.0 vCPU',
      ramLimit: '4.0 GB Burstable',
      restart: 'unless-stopped'
    },
    postgres_primary: {
      name: 'effectivebuzz-postgres-primary',
      image: 'postgres:15-alpine (production tuned)',
      role: 'Relational SaaS Database & Multi-tenant Storage',
      ports: '5432 -> 5432 (Internal Docker Network, isolated)',
      volumes: '/opt/coolify/postgres/data:/var/lib/postgresql/data',
      health: 'pg_isready -U postgres_prod_user',
      cpuLimit: '4.0 vCPU (Pinned to NVMe CPU scheduler)',
      ramLimit: '8.0 GB (Buffered caches tuned dynamically)',
      restart: 'always'
    },
    postgres_replica: {
      name: 'effectivebuzz-postgres-replica',
      image: 'postgres:15-alpine (read-only replica)',
      role: 'Hot Read-Replica for Failover and Admin BI Reports',
      ports: '5433 -> 5432 (Internal network only)',
      volumes: '/opt/coolify/postgres-replica/data:/var/lib/postgresql/data',
      health: 'pg_isready -U postgres_replica_user',
      cpuLimit: '2.0 vCPU',
      ramLimit: '4.0 GB',
      restart: 'always'
    },
    redis: {
      name: 'effectivebuzz-redis-cache',
      image: 'redis:7.0-alpine (AOF persistence enabled)',
      role: 'High-speed Redis rate-limiting & JWT revoker',
      ports: '6379 -> 6379 (Isolated bridge layer)',
      volumes: '/opt/coolify/redis/data:/data',
      health: 'redis-cli ping',
      cpuLimit: '1.0 vCPU',
      ramLimit: '2.0 GB',
      restart: 'unless-stopped'
    },
    traefik: {
      name: 'coolify-proxy (Traefik Ingress Controller)',
      image: 'traefik:v2.10',
      role: 'SSL Offloading, Ingress router, HTTP/2 multiplexing',
      ports: '80 -> 80, 443 -> 443 (Mapped externally to host)',
      volumes: '/var/run/docker.sock:/var/run/docker.sock',
      health: 'traefik healthcheck endpoint protocol',
      cpuLimit: '1.0 vCPU',
      ramLimit: '1.0 GB',
      restart: 'always'
    }
  };

  // Generate simulated log stream
  useEffect(() => {
    if (isLogsPaused) return;

    const interval = setInterval(() => {
      const entities = ['[EXPRESS] ', '[POSTGRES] ', '[REDIS] ', '[TRAEFIK] ', '[WORKFLOW] '];
      const selectedEntity = entities[Math.floor(Math.random() * entities.length)];
      let logMsg = '';

      switch (selectedEntity) {
        case '[EXPRESS] ':
          logMsg = `GET /api/v1/sequences/active-status tenant_id=${Math.random() > 0.5 ? 'acme-1' : 'growth-x'} - 200 OK (${(Math.random() * 15 + 8).toFixed(1)}ms)`;
          break;
        case '[POSTGRES] ':
          logMsg = `duration: ${(Math.random() * 4 + 1).toFixed(1)} ms  statement: SELECT * FROM campaigns WHERE tenant_id = 'acme-1' ORDER BY updated_at DESC`;
          break;
        case '[REDIS] ':
          logMsg = `jti_check: valid token check for user_id=${Math.floor(Math.random()*2000+100)} - HIT cached schema`;
          break;
        case '[TRAEFIK] ':
          logMsg = `HTTP/2 INGRESS routing client IP=${Math.floor(Math.random()*150+55)}.${Math.floor(Math.random()*200)}.${Math.floor(Math.random()*200)} -> Backend Cluster:3000`;
          break;
        case '[WORKFLOW] ':
          logMsg = `Triggering rule node #DAG-4122. Enqueueing scraping prospect: email=${Math.random() > 0.5 ? 'founder@target.co' : 'sales@market.io'}`;
          break;
      }

      const timestamp = new Date().toISOString().substring(11, 19);
      setActiveLogs(prev => {
        const next = [`[${timestamp}] ${selectedEntity}${logMsg}`, ...prev];
        return next.slice(0, 45); // Limit logs stored
      });

      // Fluctuate telemetry values realisticly
      setTelemetry(prev => ({
        avgPing: Math.max(18, Math.min(35, prev.avgPing + (Math.random() > 0.5 ? 1 : -1))),
        traefikReq: Math.max(90, Math.min(210, prev.traefikReq + Math.floor(Math.random() * 11 - 5))),
        traefikLat: parseFloat(Math.max(1.2, Math.min(4.5, prev.traefikLat + (Math.random() * 0.4 - 0.2))).toFixed(2)),
        appCpu: Math.max(15, Math.min(65, prev.appCpu + Math.floor(Math.random() * 7 - 3))),
        appMem: Math.max(1810, Math.min(1890, prev.appMem + Math.floor(Math.random() * 5 - 2))),
        dbCpu: Math.max(4, Math.min(22, prev.dbCpu + Math.floor(Math.random() * 3 - 1))),
        dbCacheHit: parseFloat(Math.max(99.6, Math.min(99.99, prev.dbCacheHit + (Math.random() * 0.02 - 0.01))).toFixed(4)),
        dbConns: Math.max(30, Math.min(60, prev.dbConns + Math.floor(Math.random() * 3 - 1))),
        redisCpu: Math.max(2, Math.min(8, prev.redisCpu + Math.floor(Math.random() * 2 - 1))),
        redisMem: Math.max(242, Math.min(252, prev.redisMem + Math.floor(Math.random() * 2 - 1))),
        redisHitRate: parseFloat(Math.max(97.8, Math.min(99.1, prev.redisHitRate + (Math.random() * 0.04 - 0.02))).toFixed(2))
      }));

    }, 2200);

    return () => clearInterval(interval);
  }, [isLogsPaused]);

  // Initial logs population
  useEffect(() => {
    const defaultLines = [
      `[${new Date().toISOString().substring(11, 19)}] [TRAEFIK] Router matched path "/api/health" to service effectivebuzz-backend_3000`,
      `[${new Date().toISOString().substring(11, 19)}] [POSTGRES] autovacuum: vacuumed relation "campaigns" - modifications: 21, pages: 12`,
      `[${new Date().toISOString().substring(11, 19)}] [REDIS] DB 0: key rate_limit:tenant-1 was written with TTL 59s`,
      `[${new Date().toISOString().substring(11, 19)}] [EXPRESS] Worker cluster node 0 listening on host 0.0.0.0:3000`,
      `[${new Date().toISOString().substring(11, 19)}] [TRAEFIK] HTTPS TLSv1.3 verified successfully matching CN *.effectivebuzz.com`,
      `[${new Date().toISOString().substring(11, 19)}] [WORKFLOW] Loop execution successful of batch DAG scheduler.`
    ];
    setActiveLogs(defaultLines);
  }, []);

  // Trigger Backup Simulation
  const triggerBackup = () => {
    if (backupRunning) return;
    setBackupRunning(true);
    setBackupLogs([]);
    
    const logs = [
      '🚀 Spawning pg_dump transactional container within internal Docker network (coolify-net)...',
      '🔍 Authenticating database admin parameters: user=postgres_prod_user db=effectivebuzz_production...',
      '📦 Streaming PostgreSQL schema binary. Compress buffer chunk using high-ratio zstd compression level 9...',
      '🔒 Schema serialization accomplished. Block verified: md5 digest matches exactly.',
      '☁️  Establisihing direct SSL multipart stream pipeline to Cloudflare R2 bucket: effectivebuzz-vault-backups ...',
      '📤 Transferring binary chunk (Size: 412.5 MB) with 5 parallel workers...',
      '✅ R2 storage verified (HTTP 200). Block encrypted with AES-256 at rest.',
      '🔄 Walking storage retention tree. Found 1 backup expiring SLA requirement. Deleting snapshot #BU-3112.',
      '🔔 Webhook alert successfully dispersed to slack-hooks: Slack #ops-monitor channel notified.'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setBackupLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setBackupRunning(false);
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
        setLastBackupTime(timestamp);
        // Add to historic chain
        setBackupChain(prev => [
          {
            id: 'BU-' + Math.floor(Math.random() * 1000 + 3500) + '-MAIN',
            time: timestamp,
            size: '412.5 MB',
            status: 'Healthy'
          },
          ...prev
        ]);
      }
    }, 450);
  };

  // Trigger Rolling Update Deployment Simulation
  const runDeployment = () => {
    if (deployRunning) return;
    setDeployRunning(true);
    setDeployStep(1);
    setDeployLogs([]);

    const steps = [
      { step: 1, text: 'Executing GitHub pipeline pipeline. Verified metadata structure, linted typescript components.' },
      { step: 2, text: 'Multi-stage Docker build. Reusing layer hashes for npm install caches... Compiled TS modules in 14.8 seconds.' },
      { step: 3, text: 'Executing production regression test suites. Dynamic health check targets matched. Verified Stripe connection proxy definitions.' },
      { step: 4, text: 'Building runtime production image size: 184MB (Alpine layer core). Pushed to GitHub Container Registry (ghcr.io/effectivebuzz/infra:latest).' },
      { step: 5, text: 'Calling Coolify deployment webhook (Token: cf_sec_99a8b...). Host instance starts pulling updated master digest...' },
      { step: 6, text: 'Coolify agent launching new container: effectivebuzz-backend_v2. Provisioning network link...' },
      { step: 7, text: 'Healthy telemetry validation matching probe: CMD curl -f http://devops:3000/api/health.' },
      { step: 8, text: 'Traefik ingress matches live health check of backend_v2. Gracefully draining connection pools on backend_v1...' },
      { step: 9, text: 'Backend_v1 terminated safely without dropping active transactions. Dynamic Zero-Downtime Deployment complete!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setDeployStep(steps[currentStep].step);
        setDeployLogs(prev => [...prev, steps[currentStep].text]);
        currentStep++;
      } else {
        clearInterval(interval);
        setDeployRunning(false);
        setDeployStep(0);
      }
    }, 1200);
  };

  // Run Disaster Recovery Sandbox Trigger
  const triggerDRIncident = (type: 'db_fail' | 'redis_oom' | 'cloudflare_fail') => {
    if (failoverRunning) return;
    setDrStatus(type);
    setFailoverRunning(true);
    setDrLogs([]);

    let logs: string[] = [];

    if (type === 'db_fail') {
      logs = [
        '🚨 CRITICAL - POSTGRESQL PRIMARY HEARTBEAT ABSENT! Connection timed out.',
        '📡 Automated monitoring agent (Coolify Daemon / Slack-Alertor) flags unhealthy response metric.',
        '🔍 Running health probes on docker-socket... Host VM reports PostgreSQL socket is entirely non-responsive.',
        '🛠️  EXECUTING FAILOVER PROCEDURES IN ACCORDANCE TO COLD DR BOOK #41...',
        '🔒 Placing Primary storage node in read-only lock to guard against structural payload corruption.',
        '🔄 Promoting Read-Replica "effectivebuzz-postgres-replica" (Port 5433) to Primary writer configuration...',
        '📊 Running replication sync verification... Confirmed Read-replica has matched WAL logs (Transaction gap offset: 0).',
        '⚙️  Overriding Express dynamic cluster connection DNS from "pg-primary" to "effectivebuzz-postgres-replica" within Coolify metadata context.',
        '🔄 Gracefully reloading dynamic container process tree on EffectiveBuzz backend with SIGHUP...',
        '✅ Backend re-bound and re-seeded pools successfully to promoted DB master!',
        '🔔 SYSTEM RESILIENCE VERIFIED. Restored write capability in 4,120 ms. Recovery Point Objective (RPO) met. SLA: Green.'
      ];
    } else if (type === 'redis_oom') {
      logs = [
        '🚨 EXCEPTION - REDIS OOM CRASH! Cache engine reports Out-Of-Memory, crashing loop operations.',
        '📈 Redis agent memory pressure spiked to 2.1 GB limit, triggering linux OOM-killer mechanism.',
        '🛠️  EXECUTING CACHE MITIGATION BLUEPRINT...',
        '⚙️  Coolify runtime parameters automatically modified: Doubling maximum permitted memory limit allocation to 4.0 GB.',
        '🧼 Rewriting "redis.conf" engine flags to leverage dynamic "volatile-lru" volatile keys auto-eviction policy (prevents total lockups).',
        '🌀 Provisioning brand new Redis docker container cluster index in isolated bridging network...',
        '🏃 Backend automatically catches Redis network reset, spawning warm-up script tracking active session caches.',
        '✅ Cache cluster successfully mounted. Health-check verified.',
        '🔔 SYSTEM RESILIENCE VERIFIED. Web limits and token revoker metrics marked healthy in 2,550 ms.'
      ];
    } else if (type === 'cloudflare_fail') {
      logs = [
        '🚨 NETWORK NOTICE - CLOUDFLARE INGRESS ROUTING LATENCY SPIKED OUT... DNS connection timeouts detected.',
        '📡 Synthetic ping tests report Cloudflare edge origin servers are dropping 42% of handshakes within Primary region.',
        '🛠️  EXECUTING ACTIVE-ACTIVE GLOBAL INGRESS SWAP...',
        '🌐 Modifying edge profile configurations - Swapping principal ingress points targeting fallback standby edge gateway.',
        '♻️  Forcing GeoDNS propagation through priority Cloudflare secondary name servers.',
        '⚖️  Traefik controller matching traffic distribution on European/US Standby Mirror Nodes.',
        '✅ Connections stable. Edge CDN bypass successfully circumvented compromised edge points.',
        '🔔 SYSTEM RESILIENCE VERIFIED. Routing latency dropped from 44,520ms back to steady 24ms. Recovery time: 3,450ms.'
      ];
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setDrLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setFailoverRunning(false);
      }
    }, 750);
  };

  const resetDRSandbox = () => {
    setDrStatus('healthy');
    setDrLogs([]);
    setFailoverRunning(false);
  };

  return (
    <div className="space-y-6" id="devops-architect-workbench">
      {/* Structural Header Card */}
      <div className="border border-slate-800 bg-[#070b13] p-6 rounded-xl relative overflow-hidden" id="devops-header">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Terminal className="w-48 h-48 text-[#818cf8]" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-widest font-bold">
                Devops Infrastructure Architecture
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold font-display text-white tracking-tight">
              SaaS High-Availability Deployment
            </h1>
            <p className="text-xs text-gray-400 max-w-3xl leading-relaxed">
              Designed as a hardened, fully continuous structure using **Coolify**, **Docker container virtualization**, isolated PostgreSQL clusters with continuous WAL archiving, Redis cache rate limiters, and **Cloudflare Proxy Shield** edge proxying.
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-3 rounded-lg text-xs leading-none">
            <Server className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-gray-500 block text-[9px] uppercase font-mono tracking-wider font-bold">SLA TARGET STATUS</span>
              <span className="text-white font-mono font-semibold block mt-1">99.99% (Active Core)</span>
            </div>
          </div>
        </div>

        {/* Tab switch navigation */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-6 border-t border-slate-850 pt-4" id="devops-tabs-nav">
          {[
            { id: 'monitoring', label: '1. Live Telemetry', icon: Cpu, color: 'text-emerald-400 border-emerald-500/20' },
            { id: 'topology', label: '2. Container Map', icon: Network, color: 'text-indigo-400 border-indigo-500/20' },
            { id: 'configs', label: '3. Docker Configs', icon: FileCode, color: 'text-amber-400 border-amber-500/20' },
            { id: 'backups', label: '4. Backup Engines', icon: HardDrive, color: 'text-sky-450 border-sky-500/20' },
            { id: 'cicd', label: '5. CI/CD Rolling', icon: Play, color: 'text-purple-400 border-purple-500/20' },
            { id: 'dr', label: '6. Disaster Sandbox', icon: ShieldAlert, color: 'text-rose-450 border-rose-500/20' }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-2 border transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-900 border-slate-700 text-white shadow-md'
                    : 'bg-transparent border-transparent text-gray-400 hover:bg-slate-900/40 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}

      {/* 1. MONITORING TELEMETRY TAB */}
      {activeTab === 'monitoring' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="monitoring-portal">
          {/* Main metrics display */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border border-slate-800 bg-[#0d131f] p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="text-emerald-400 w-4 h-4" />
                  <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">Live Virtual VM Hardware Performance</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Polling interval: 2.2s
                </div>
              </div>

              {/* Three Service Modules side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Express App Node */}
                <div className="bg-[#070b13] p-4 rounded-lg border border-slate-900 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase font-mono">App Container</span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded">
                      2 replica units
                    </span>
                  </div>
                  
                  <div className="space-y-2 font-mono">
                    <div className="text-[11px] text-gray-400 flex justify-between">
                      <span>CPU Load:</span>
                      <span className="text-white font-bold">{telemetry.appCpu}%</span>
                    </div>
                    {/* Tiny gauge */}
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, telemetry.appCpu * 1.5)}%` }} />
                    </div>

                    <div className="text-[11px] text-gray-400 flex justify-between pt-1">
                      <span>RAM Allocation:</span>
                      <span className="text-white font-bold">{telemetry.appMem} MB</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-400 h-full rounded-full transition-all duration-1000" style={{ width: `${(telemetry.appMem / 4096) * 100}%` }} />
                    </div>

                    <div className="border-t border-slate-900 pt-2 text-[10px] text-gray-500">
                      <div>Active Threads: <span className="text-gray-300">4 loop blocks</span></div>
                      <div>Engine IP: <span className="text-gray-300">172.18.0.5</span></div>
                    </div>
                  </div>
                </div>

                {/* Database Node */}
                <div className="bg-[#070b13] p-4 rounded-lg border border-slate-900 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase font-mono">Postgres Master</span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
                      PRIMARY
                    </span>
                  </div>
                  
                  <div className="space-y-2 font-mono">
                    <div className="text-[11px] text-gray-400 flex justify-between">
                      <span>CPU Load:</span>
                      <span className="text-white font-bold">{telemetry.dbCpu}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, telemetry.dbCpu * 3.5)}%` }} />
                    </div>

                    <div className="text-[11px] text-gray-400 flex justify-between pt-1">
                      <span>Cache Hit Ratio:</span>
                      <span className="text-emerald-400 font-bold">{telemetry.dbCacheHit}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: '99%' }} />
                    </div>

                    <div className="border-t border-slate-900 pt-2 text-[10px] text-gray-500">
                      <div>Pool Connections: <span className="text-gray-300">{telemetry.dbConns} limits</span></div>
                      <div>Volume Host: <span className="text-gray-300">/opt/coolify/pg</span></div>
                    </div>
                  </div>
                </div>

                {/* Redis Node */}
                <div className="bg-[#070b13] p-4 rounded-lg border border-slate-900 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-sky-500" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase font-mono">Redis Cache</span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded">
                      SESSION/TTL
                    </span>
                  </div>
                  
                  <div className="space-y-2 font-mono">
                    <div className="text-[11px] text-gray-400 flex justify-between">
                      <span>CPU Load:</span>
                      <span className="text-white font-bold">{telemetry.redisCpu}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, telemetry.redisCpu * 10)}%` }} />
                    </div>

                    <div className="text-[11px] text-gray-400 flex justify-between pt-1">
                      <span>Memory footprint:</span>
                      <span className="text-white font-bold">{telemetry.redisMem} MB</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-450 h-full rounded-full transition-all duration-1000" style={{ width: `${(telemetry.redisMem / 2048) * 100}%` }} />
                    </div>

                    <div className="border-t border-slate-900 pt-2 text-[10px] text-gray-500">
                      <div>Cache Hit Rate: <span className="text-gray-300">{telemetry.redisHitRate}%</span></div>
                      <div>Max Limit: <span className="text-gray-300">2.0 GB config</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingress traffic statistics via proxy controller */}
            <div className="border border-slate-800 bg-[#0d131f] p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cloud className="text-blue-400 w-4 h-4" />
                  <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">Cloudflare Edge & Traefik Proxy Routing Logs</span>
                </div>
                <div className="text-xs text-indigo-400 font-semibold font-mono bg-indigo-950/40 p-1.5 rounded">
                  SSL: TLSv1.3 Strict Mode
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
                <div className="bg-[#070b13] p-3 rounded-lg border border-slate-900">
                  <span className="text-[9px] text-gray-500 block uppercase font-bold">Edge Edge Routing Latency</span>
                  <span className="text-white text-lg font-bold block mt-1">{telemetry.avgPing}ms</span>
                  <span className="text-[8px] text-emerald-450 block mt-0.5">Globally Optimized Cache</span>
                </div>
                
                <div className="bg-[#070b13] p-3 rounded-lg border border-slate-900">
                  <span className="text-[9px] text-gray-500 block uppercase font-bold">Proxy Router Rate</span>
                  <span className="text-white text-lg font-bold block mt-1">{telemetry.traefikReq} req/sec</span>
                  <span className="text-[8px] text-emerald-450 block mt-0.5">Dynamically Load-balanced</span>
                </div>

                <div className="bg-[#070b13] p-3 rounded-lg border border-slate-900">
                  <span className="text-[9px] text-gray-500 block uppercase font-bold">Internal gateway overhead</span>
                  <span className="text-white text-lg font-bold block mt-1">{telemetry.traefikLat}ms</span>
                  <span className="text-[8px] text-sky-400 block mt-0.5">Traefik route resolution</span>
                </div>

                <div className="bg-[#070b13] p-3 rounded-lg border border-slate-900">
                  <span className="text-[9px] text-gray-500 block uppercase font-bold">SSL Certificate Health</span>
                  <span className="text-emerald-400 text-sm font-bold block mt-2.5">SECURE (307 days left)</span>
                  <span className="text-[8px] text-gray-500 block mt-0.5">Managed by Let's Encrypt</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar: Real live simulated Docker log stream */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-slate-800 bg-[#0d131f] p-4 rounded-xl flex flex-col h-[400px]">
              <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <Terminal className="text-indigo-400 w-3.5 h-3.5" />
                  <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">Live Docker Daemon Logs</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setIsLogsPaused(!isLogsPaused)}
                    className="p-1 px-1.5 text-[9px] bg-slate-900 border border-slate-800 rounded font-mono text-gray-300 hover:text-white"
                  >
                    {isLogsPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button 
                    onClick={() => setActiveLogs([])}
                    className="p-1 text-[9px] bg-slate-900 border border-slate-800 rounded font-mono text-gray-300 hover:text-white"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Log Stream Area */}
              <div className="flex-1 bg-black p-3 rounded-lg font-mono text-[10px] text-indigo-300 overflow-y-auto leading-relaxed border border-slate-950 flex flex-col-reverse h-[300px]">
                {activeLogs.length === 0 ? (
                  <span className="text-gray-600 block text-center mt-12 py-8">No log streams present. Resume tracker or invoke api handshakes.</span>
                ) : (
                  activeLogs.map((log, index) => {
                    const isErr = log.includes('ERR') || log.includes('🚨') || log.includes('OOM');
                    const isSucc = log.includes('SUCCESS') || log.includes('OK') || log.includes('200');
                    let color = 'text-indigo-300/90';
                    if (isErr) color = 'text-rose-450 font-semibold';
                    else if (isSucc) color = 'text-emerald-450';
                    
                    return (
                      <div key={index} className={`border-b border-slate-950 pb-0.5 leading-snug break-all ${color}`}>
                        {log}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TOPOLOGY MAP TAB */}
      {activeTab === 'topology' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="topology-portal">
          <div className="lg:col-span-8 border border-slate-800 bg-[#0d131f] p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-mono text-white font-bold uppercase tracking-wider border-b border-slate-850 pb-3">
              Interactive Ingress & Subnetwork Network Map
            </h3>
            
            <p className="text-xs text-gray-400">
              Hover or select a Docker container / routing instance node to reveal real-time configurations, port mapping setups, volume bindings, and active firewalls.
            </p>

            {/* SVG Visual topology diagram */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-900 flex items-center justify-center">
              <svg viewBox="0 0 800 360" className="w-full max-w-2xl h-auto" id="networking-svg">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#4f46e5" />
                  </marker>
                  <marker id="arrow-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                  </marker>
                </defs>

                {/* Cloudflare WAN */}
                <g 
                  onClick={() => setSelectedNode('traefik')} 
                  className="cursor-pointer group"
                >
                  <rect x="20" y="150" width="130" height="60" rx="6" fill="#1e293b" stroke={selectedNode === 'traefik' ? '#38bdf8' : '#334155'} strokeWidth="1.5" />
                  <text x="85" y="180" textAnchor="middle" fill="#38bdf8" className="font-mono text-[10px] font-bold">Cloudflare WAF</text>
                  <text x="85" y="195" textAnchor="middle" fill="#64748b" className="font-sans text-[8px]">DNS / DDoS Filter</text>
                </g>

                {/* Edge line to host proxy */}
                <line x1="150" y1="180" x2="230" y2="180" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />

                {/* Traefik/Coolify Host Proxy */}
                <g 
                  onClick={() => setSelectedNode('traefik')} 
                  className="cursor-pointer group"
                >
                  <rect x="230" y="130" width="120" height="100" rx="6" fill="#0f172a" stroke={selectedNode === 'traefik' ? '#818cf8' : '#1e293b'} strokeWidth="2" />
                  <text x="290" y="165" textAnchor="middle" fill="#818cf8" className="font-mono text-[11px] font-bold">Traefik SSL Proxy</text>
                  <text x="290" y="185" textAnchor="middle" fill="#94a3b8" className="font-sans text-[9px] font-semibold">Port 80/443 mapping</text>
                  <text x="290" y="205" textAnchor="middle" fill="#475569" className="font-mono text-[8px]">Host Machine Ingress</text>
                </g>

                {/* Bridge Network grouping */}
                <rect x="390" y="20" width="380" height="320" rx="8" fill="#070b13" stroke="#1f2937" strokeWidth="1.5" strokeDasharray="5 5" />
                <text x="580" y="40" textAnchor="middle" fill="#64748b" className="font-mono text-[9px] font-semibold tracking-wider">INTERNAL DOCKER SUBNET (coolify-net - 172.18.0.0/16)</text>

                {/* Lines inside bridge proxy to apps */}
                <path d="M 350 180 L 450 85" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />
                <path d="M 350 180 L 490 180" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
                <path d="M 350 180 L 450 275" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />

                {/* Node: Express App */}
                <g 
                  onClick={() => setSelectedNode('app')} 
                  className="cursor-pointer group"
                >
                  <rect x="450" y="55" width="160" height="55" rx="6" fill="#090d16" stroke={selectedNode === 'app' ? '#818cf8' : '#1e293b'} strokeWidth="1.5" />
                  <text x="530" y="78" textAnchor="middle" fill="#a5b4fc" className="font-mono text-[10px] font-bold">effectivebuzz-backend</text>
                  <text x="530" y="94" textAnchor="middle" fill="#475569" className="font-sans text-[8px]">Port 3000 • 172.18.0.5</text>
                </g>

                {/* Node: Redis Node */}
                <g 
                  onClick={() => setSelectedNode('redis')} 
                  className="cursor-pointer group"
                >
                  <rect x="450" y="245" width="160" height="55" rx="6" fill="#090d16" stroke={selectedNode === 'redis' ? '#38bdf8' : '#1e293b'} strokeWidth="1.5" />
                  <text x="530" y="268" textAnchor="middle" fill="#38bdf8" className="font-mono text-[10px] font-bold">effectivebuzz-redis</text>
                  <text x="530" y="284" textAnchor="middle" fill="#475569" className="font-sans text-[8px]">Port 6379 • 172.18.0.12</text>
                </g>

                {/* Node: Postgres Primary */}
                <g 
                  onClick={() => setSelectedNode('postgres_primary')} 
                  className="cursor-pointer group"
                >
                  <rect x="630" y="115" width="130" height="55" rx="6" fill="#090d16" stroke={selectedNode === 'postgres_primary' ? '#f59e0b' : '#1e293b'} strokeWidth="1.5" />
                  <text x="695" y="138" textAnchor="middle" fill="#f59e0b" className="font-mono text-[9px] font-bold">postgres-primary</text>
                  <text x="695" y="152" textAnchor="middle" fill="#475569" className="font-sans text-[8px]">Port 5432 • 172.18.0.10</text>
                </g>

                {/* Node: Postgres Replica */}
                <g 
                  onClick={() => setSelectedNode('postgres_replica')} 
                  className="cursor-pointer group"
                >
                  <rect x="630" y="200" width="130" height="55" rx="6" fill="#090d16" stroke={selectedNode === 'postgres_replica' ? '#fbbf24' : '#1e293b'} strokeWidth="1.5" />
                  <text x="695" y="223" textAnchor="middle" fill="#fbb624" className="font-mono text-[9px] font-bold">postgres-replica</text>
                  <text x="695" y="237" textAnchor="middle" fill="#475569" className="font-sans text-[8px]">Port 5433 • 172.18.0.11</text>
                </g>

                {/* Internal App-to-Data dependencies */}
                <path d="M 610 82 L 675 115" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                <path d="M 610 272 L 675 255" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                
                {/* Replication arrow between prime/rep */}
                <path d="M 695 170 L 695 200" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <text x="735" y="188" textAnchor="middle" fill="#f59e0b" className="font-mono text-[7px] font-bold">Continuous WAL replica</text>
              </svg>
            </div>
            
            <div className="text-[11px] font-mono text-gray-500 bg-slate-900/60 p-2 text-center rounded border border-slate-850">
              *All internal services are decoupled and isolated inside the virtual daemon bridge. Direct public port mapping is completely disabled to avoid external database snooping.
            </div>
          </div>

          {/* Right column: Node configuration metadata card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-slate-800 bg-[#0d131f] p-5 rounded-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-850 pb-3">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                  Target Config Details
                </h3>
              </div>

              {selectedNode ? (
                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-bold">Container Identifier</span>
                    <span className="text-white text-sm font-semibold tracking-tight">{containerSpecs[selectedNode].name}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-bold">Core Base Image</span>
                    <span className="text-gray-300 font-semibold">{containerSpecs[selectedNode].image}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-bold">SaaS Cluster Role</span>
                    <span className="text-gray-300 leading-relaxed font-sans block mt-0.5">{containerSpecs[selectedNode].role}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-slate-850 pt-3">
                    <div>
                      <span className="text-[9px] text-gray-500 block uppercase font-bold">Port Mapping</span>
                      <span className="text-[#818cf8] font-bold">{containerSpecs[selectedNode].ports}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 block uppercase font-bold">Restart Policy</span>
                      <span className="text-gray-300">{containerSpecs[selectedNode].restart}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-850 pt-3 space-y-2">
                    <div>
                      <span className="text-[10px] text-gray-500 block uppercase font-bold">Local File Storage Bounds</span>
                      <span className="text-amber-550 block text-[10px] bg-slate-950 px-2 py-1 rounded border border-slate-900 mt-1">{containerSpecs[selectedNode].volumes}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block uppercase font-bold">Docker Healthcheck command</span>
                      <span className="text-emerald-450 block text-[10px] bg-slate-950 px-2 py-1 rounded border border-slate-900 mt-1">{containerSpecs[selectedNode].health}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-slate-850 pt-3">
                    <div>
                      <span className="text-[9px] text-gray-500 block uppercase font-bold">MAX CPU limit</span>
                      <span className="text-white font-mono">{containerSpecs[selectedNode].cpuLimit}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 block uppercase font-bold">MAX memory burst limit</span>
                      <span className="text-white font-mono">{containerSpecs[selectedNode].ramLimit}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-12">Select a node from the network architecture map on the left to reveal target parameters.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. CONFIGURATION CODE SCRIPTS VIEW TAB */}
      {activeTab === 'configs' && (
        <div className="border border-slate-800 bg-[#0d131f] p-5 rounded-xl space-y-4" id="configs-portal">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-850 pb-3 gap-3">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block">Production Configuration Blueprints</span>
              <p className="text-[11px] text-gray-400">Strictly optimized scripts ensuring secure container isolations, resource limits, and edge shielding.</p>
            </div>
            
            {/* Script selector tabs */}
            <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-900 font-mono text-[10px]">
              <button 
                onClick={() => setCodeTab('compose')}
                className={`px-3 py-1.5 rounded font-semibold ${codeTab === 'compose' ? 'bg-slate-900 text-white border border-slate-800 shadow' : 'text-gray-400 hover:text-white'}`}
              >
                docker-compose.yml
              </button>
              <button 
                onClick={() => setCodeTab('dockerfile')}
                className={`px-3 py-1.5 rounded font-semibold ${codeTab === 'dockerfile' ? 'bg-slate-900 text-white border border-slate-800 shadow' : 'text-gray-400 hover:text-white'}`}
              >
                Dockerfile (Backend)
              </button>
              <button 
                onClick={() => setCodeTab('cloudflare')}
                className={`px-3 py-1.5 rounded font-semibold ${codeTab === 'cloudflare' ? 'bg-slate-900 text-white border border-slate-800 shadow' : 'text-gray-400 hover:text-white'}`}
              >
                cloudflare-rules.tf
              </button>
            </div>
          </div>

          {/* CODE WINDOW */}
          <div className="bg-black rounded-lg border border-slate-950 p-4 font-mono text-[11px] text-indigo-300 leading-relaxed overflow-x-auto h-[480px]">
            {codeTab === 'compose' && (
              <pre className="text-[#a5b4fc]">
{`# Coolify / Docker Compose Production Deployment Configuration File
version: "3.8"

services:
  effectivebuzz-backend:
    image: ghcr.io/effectivebuzz/infra:latest
    container_name: effectivebuzz-backend
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_URL=postgresql://postgres_prod_user:\${DB_PASSWORD}@postgres-primary:5432/effectivebuzz_production?sslmode=disable
      - REDIS_URL=redis://effectivebuzz-redis:6379/0
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
      - STRIPE_SECRET_KEY=\${STRIPE_SECRET_KEY}
    networks:
      - coolify-net
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.effectivebuzz-secure.rule=Host(\`app.effectivebuzz.com\`)"
      - "traefik.http.routers.effectivebuzz-secure.entrypoints=websecure"
      - "traefik.http.routers.effectivebuzz-secure.tls=true"
      - "traefik.http.routers.effectivebuzz-secure.tls.certresolver=letsencrypt"
      - "traefik.http.services.effectivebuzz-secure.loadbalancer.server.port=3000"
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 4096M
        reservations:
          memory: 1024M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 15s
      timeout: 5s
      retries: 3

  postgres-primary:
    image: postgres:15-alpine
    container_name: postgres-primary
    restart: always
    environment:
      - POSTGRES_USER=postgres_prod_user
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
      - POSTGRES_DB=effectivebuzz_production
    volumes:
      - /opt/coolify/postgres/data:/var/lib/postgresql/data
    networks:
      - coolify-net
    command: >
      postgres 
      -c ssl=off
      -c max_connections=120
      -c shared_buffers=2GB
      -c work_mem=16MB
      -c maintenance_work_mem=512MB
      -c effective_cache_size=6GB
    deploy:
      resources:
        limits:
          cpus: '4.0'
          memory: 8192M

  effectivebuzz-redis:
    image: redis:7.0-alpine
    container_name: effectivebuzz-redis
    restart: unless-stopped
    command: redis-server --appendonly yes --maxmemory 2048mb --maxmemory-policy volatile-lru
    volumes:
      - /opt/coolify/redis/data:/data
    networks:
      - coolify-net
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 2048M

networks:
  coolify-net:
    external: true`}
              </pre>
            )}

            {codeTab === 'dockerfile' && (
              <pre className="text-[#34d399]">
{`# Multi-Stage Build Optimizations for Node.js Application In Production
# PHASE 1: Dependencies Assembly
FROM node:18-alpine AS dependencies
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

# PHASE 2: Main Compiler Stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

# PHASE 3: Hardened Runtime Container
FROM node:18-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=3000

# Create application user/group (prevents host security escapes)
RUN addgroup -g 1001 -S nodejs
RUN adduser -u 1001 -S nodeapp -G nodejs

# Fetch minimal runtime layers
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json

USER nodeapp

EXPOSE 3000

CMD ["node", "dist/server.cjs"]`}
              </pre>
            )}

            {codeTab === 'cloudflare' && (
              <pre className="text-[#fbbf24]">
{`# Terraform Definitions - Cloudflare Proxy Shields & Web Rules
# Restricts and filters traffic targeting app.effectivebuzz.com

resource "cloudflare_zone_settings_override" "effectivebuzz_security" {
  zone_id = var.cloudflare_zone_id
  settings {
    ssl = "strict"
    hsts {
      enabled = true
      max_age = 31536000
      include_subdomains = true
      preload = true
    }
    security_level = "high"
    browser_check = "on"
    websockets = "on"
    http2 = "on"
    brotli = "on"
    min_tls_version = "1.2"
  }
}

resource "cloudflare_filter" "rate_limiter_filter" {
  zone_id = var.cloudflare_zone_id
  expression = "(http.request.uri.path contains \\"/api/v1/\\")"
  paused = false
}

resource "cloudflare_rate_limit" "api_endpoint_protection" {
  zone_id     = var.cloudflare_zone_id
  threshold   = 100
  period      = 60 # 1 minute evaluation matrix
  action {
    mode  = "simulate" # Safe evaluation mode
    value = "block"
    timeout = 3600
  }
  match {
    request {
      methods = ["GET", "POST", "PUT", "DELETE"]
      schemes = ["HTTP", "HTTPS"]
    }
    response {
      statuses = [200, 201, 302, 401, 403]
    }
  }
  description = "Throttles brute rate-limiting threats on the public Express API router"
}`}
              </pre>
            )}
          </div>
        </div>
      )}

      {/* 4. BACKUPS EXTRACTION ENGINE TAB */}
      {activeTab === 'backups' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="backups-portal">
          <div className="lg:col-span-8 border border-slate-800 bg-[#0d131f] p-5 rounded-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <div className="space-y-0.5">
                <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block">Production Multi-Storage Backup Manager</span>
                <p className="text-[11px] text-gray-400">Continuous Write-Ahead Log (WAL) archiving and daily database snapshots exported directly to Cloudflare R2 object store.</p>
              </div>
            </div>

            <div className="bg-[#070b13] p-4 rounded-lg border border-slate-900 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">LATEST DATABASE INTEGRITY RUN</span>
                  <span className="text-white font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Last Trigger: {lastBackupTime}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={triggerBackup}
                  disabled={backupRunning}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 rounded text-xs text-white font-mono font-bold flex items-center gap-2 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${backupRunning ? 'animate-spin' : ''}`} />
                  {backupRunning ? 'Running Backup Orchestrator...' : 'Trigger Emergency Snapshot (pg_dump)'}
                </button>
              </div>

              {/* Step Logs Console during Backup */}
              {backupLogs.length > 0 && (
                <div className="bg-black p-3.5 rounded border border-slate-950 font-mono text-[10px] text-sky-300 leading-relaxed max-h-[220px] overflow-y-auto">
                  <span className="text-gray-500 block mb-1">=== BACKUP PIPELINE SHELL CONSOLE ===</span>
                  {backupLogs.map((log, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="text-gray-600">[{index + 1}]</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  {backupRunning && <span className="text-indigo-400 animate-pulse block mt-1">⏳ Processing binary chunks...</span>}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block">Retention Rules & SLA Metric Target</span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/40 border border-slate-800 p-3 rounded-lg space-y-1 relative">
                  <span className="text-[9px] uppercase font-bold text-[#818cf8] font-mono">1. Retain Time</span>
                  <p className="text-xs text-white font-semibold font-mono">30 Days Snapshots</p>
                  <p className="text-[10px] text-gray-500 leading-tight block">Older snapshots automatically deleted every midnight via cron cleaner.</p>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 p-3 rounded-lg space-y-1">
                  <span className="text-[9px] uppercase font-bold text-amber-500 font-mono">2. Max gap RPO</span>
                  <p className="text-xs text-white font-semibold font-mono">Continuous WAL Log</p>
                  <p className="text-[10px] text-gray-500 leading-tight block">WAL chunks pushed to S3 object bucket every 15 minutes automatically.</p>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 p-3 rounded-lg space-y-1">
                  <span className="text-[9px] uppercase font-bold text-emerald-400 font-mono">3. Destination</span>
                  <p className="text-xs text-white font-semibold font-mono">Cloudflare R2 (Encrypted)</p>
                  <p className="text-[10px] text-gray-500 leading-tight block">Redundant object bucket matching AES-256 standard storage encryption.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Backup Chain Historic Log */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-slate-800 bg-[#0d131f] p-5 rounded-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-850 pb-3">
                <HardDrive className="w-4 h-4 text-[#818cf8]" />
                <h3 className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                  Active Backup Chain Registry
                </h3>
              </div>

              <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
                {backupChain.map((item, index) => (
                  <div key={item.id} className="bg-slate-950 p-2.5 rounded border border-slate-900 space-y-1 text-xs font-mono relative">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold text-[10px]">{item.id}</span>
                      <span className="text-[8px] px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-bold">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400">Timestamp: <span className="text-gray-300">{item.time}</span></div>
                    <div className="text-[10px] text-gray-400">Binary Size: <span className="text-indigo-400 font-bold">{item.size}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CI/CD ROLLING DEPLOYMENT TAB */}
      {activeTab === 'cicd' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="cicd-portal">
          <div className="lg:col-span-7 border border-slate-800 bg-[#0d131f] p-5 rounded-xl space-y-4">
            <div className="border-b border-slate-850 pb-3">
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block">GitHub Actions Continuous Deployment Simulator</span>
              <p className="text-[11px] text-gray-400">Interactive workspace to evaluate zero-downtime container overrides managed by Coolify ingress routers.</p>
            </div>

            <div className="bg-[#070b13] p-4.5 rounded-lg border border-slate-900 space-y-4 text-xs font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-850 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">WORKSPACE STATUS</span>
                  <p className="text-white font-bold flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-indigo-400" />
                    repo: github.com/effectivebuzz/saas-core [main]
                  </p>
                </div>

                <button
                  type="button"
                  onClick={runDeployment}
                  disabled={deployRunning}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-40 rounded text-xs font-mono font-bold flex items-center gap-2 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  {deployRunning ? 'Simulating Deployment pipeline...' : 'Execute Commit & Build (git push origin main)'}
                </button>
              </div>

              {/* Visual Steps representation of GA pipeline */}
              <div className="grid grid-cols-3 gap-2 py-2 text-center text-[10px]">
                <div className={`p-2 rounded border ${deployStep >= 1 ? 'bg-indigo-950/40 border-indigo-500/30 text-white font-bold' : 'bg-slate-950 border-slate-900 text-gray-500'}`}>
                  1. Lint & Test
                </div>
                <div className={`p-2 rounded border ${deployStep >= 4 ? 'bg-indigo-950/40 border-indigo-500/30 text-white font-bold' : 'bg-slate-950 border-slate-900 text-gray-500'}`}>
                  2. Compile & Push (GHCR)
                </div>
                <div className={`p-2 rounded border ${deployStep >= 6 ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 font-bold animate-pulse' : 'bg-slate-950 border-slate-900 text-gray-500'}`}>
                  3. Coolify webhook Pull
                </div>
              </div>

              {/* Deploy Output logs */}
              {deployLogs.length > 0 && (
                <div className="bg-black p-3 rounded font-mono text-[10px] text-emerald-450 leading-relaxed max-h-[200px] overflow-y-auto border border-slate-950">
                  <span className="text-gray-500 block border-b border-slate-900 pb-1 mb-1">CONSOLE GITHUB WORKFLOW LOGS</span>
                  {deployLogs.map((log, index) => (
                    <div key={index} className="flex gap-2 leading-snug">
                      <span className="text-gray-600">[{index + 1}]</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Zero Downtime Explain card */}
            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg text-xs leading-relaxed text-gray-300">
              <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase tracking-wider mb-1">💡 Docker Rolling Blue-Green Deployment:</span>
              <p className="text-gray-400 text-[11px]">
                Coolify coordinates a non-disruptive, **blue-green container rollout**. The newly created container is spawned next to the old one in an isolated state. Once Docker health-checks verify compliance, Traefik hot-swaps routing mappings in memory and terminates the old instance. Zero packets are dropped during the swap!
              </p>
            </div>
          </div>

          {/* Right column: Action yaml script */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-slate-800 bg-[#0d131f] p-5 rounded-xl space-y-3">
              <h3 className="text-xs font-mono text-white font-bold uppercase tracking-wider border-b border-slate-850 pb-2">
                GitHub Pipeline Workflow File
              </h3>
              <p className="text-[11px] text-gray-400">Tuned configuration file located at `.github/workflows/deploy.yml` on main repo.</p>
              
              <div className="bg-black p-3.5 rounded border border-slate-950 font-mono text-[10px] text-purple-300 max-h-[340px] overflow-y-auto leading-normal">
<pre>{`name: Continuous Deployment

on:
  push:
    branches: [ main ]

jobs:
  lint-and-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint

  docker-compile:
    needs: lint-and-audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and Push Docker
        run: |
          echo "\${{ secrets.GHCR_SEC }}" | docker login ghcr.io -u \${{ github.actor }} --password-stdin
          docker build -t ghcr.io/effectivebuzz/infra:latest .
          docker push ghcr.io/effectivebuzz/infra:latest

  trigger-coolify:
    needs: docker-compile
    runs-on: ubuntu-latest
    steps:
      - name: Ingress Deploy Ping
        run: |
          curl -X GET "\${{ secrets.COOLIFY_DEPLOY_WEBHOOK_URL }}"`}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. DISASTER RECOVERY SANDBOX TAB */}
      {activeTab === 'dr' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="dr-portal">
          <div className="lg:col-span-8 border border-slate-800 bg-[#0d131f] p-5 rounded-xl space-y-4">
            <div className="border-b border-slate-850 pb-3">
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block">Hardened Disaster Recovery & Failover Simulator</span>
              <p className="text-[11px] text-gray-400">Trigger extreme stress states in a simulated production environment and evaluate failover remediation playbooks.</p>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-4 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white font-bold uppercase">SaaS Incident Target Status:</span>
                <span className={`px-2 py-0.5 text-[9px] font-mono rounded font-bold uppercase border ${
                  drStatus === 'healthy' 
                    ? 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20' 
                    : 'bg-rose-500/10 text-rose-450 border-rose-500/20'
                }`}>
                  {drStatus === 'healthy' ? '● Healthy' : `⚠️ DEGRADED (${drStatus})`}
                </span>
              </div>

              {/* Trigger Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => triggerDRIncident('db_fail')}
                  disabled={failoverRunning || drStatus !== 'healthy'}
                  className="p-3 bg-red-950/20 text-rose-450 hover:bg-red-950/40 border border-rose-900/40 rounded-lg text-xs font-mono font-bold flex flex-col items-center justify-center gap-2 transition text-center disabled:opacity-45"
                >
                  <Database className="w-5 h-5 text-rose-400" />
                  💥 Fail Primary DB
                </button>

                <button
                  type="button"
                  onClick={() => triggerDRIncident('redis_oom')}
                  disabled={failoverRunning || drStatus !== 'healthy'}
                  className="p-3 bg-amber-950/20 text-amber-500 hover:bg-amber-950/40 border border-amber-900/40 rounded-lg text-xs font-mono font-bold flex flex-col items-center justify-center gap-2 transition text-center disabled:opacity-45"
                >
                  <Cpu className="w-5 h-5 text-amber-400" />
                  ⚡ Redis Cache OOM crash
                </button>

                <button
                  type="button"
                  onClick={() => triggerDRIncident('cloudflare_fail')}
                  disabled={failoverRunning || drStatus !== 'healthy'}
                  className="p-3 bg-red-950/20 text-rose-400 hover:bg-red-950/40 border border-rose-900/40 rounded-lg text-xs font-mono font-semibold flex flex-col items-center justify-center gap-2 transition text-center disabled:opacity-45"
                >
                  <Cloud className="w-5 h-5 text-rose-300" />
                  🌐 CDN Ingress Timeout
                </button>
              </div>

              {/* Failover Process Simulation Console */}
              {drLogs.length > 0 && (
                <div className="bg-black p-4 rounded border border-slate-950 font-mono text-[10px] text-amber-450 leading-relaxed max-h-[250px] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-1 mb-2">
                    <span className="text-gray-500">AUTOMATED FAILOVER LOG PROCESS</span>
                    {drStatus !== 'healthy' && !failoverRunning && (
                      <button 
                        onClick={resetDRSandbox}
                        className="px-2 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-900/40 hover:bg-indigo-900 rounded font-bold uppercase tracking-wider text-[9px]"
                      >
                        Re-Sead Cluster (Reset)
                      </button>
                    )}
                  </div>
                  {drLogs.map((log, idx) => {
                    const isErr = log.startsWith('🚨');
                    return (
                      <div key={idx} className={`leading-snug ${isErr ? 'text-rose-450 font-bold border-b border-rose-955 pb-1 mb-1' : 'text-amber-450'}`}>
                        {log}
                      </div>
                    );
                  })}
                  {failoverRunning && <div className="text-white animate-pulse block mt-1">⚙️  Running playbook commands...</div>}
                </div>
              )}
            </div>

            {/* Playbook Architecture details */}
            <div className="space-y-2 text-xs">
              <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block">Operational SLA Targets Metrics:</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/30 p-3 rounded-lg border border-slate-850">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">RECOVERY POINT OBJECTIVE (RPO)</span>
                  <span className="text-white font-mono font-bold text-sm block mt-1">5 Minutes Matrix</span>
                  <p className="text-[10px] text-gray-400 leading-normal mt-1">The maximum allowable data disruption. Captured via direct database continuous journaling logs pushed to Cloudflare R2 vaults.</p>
                </div>
                
                <div className="bg-slate-900/30 p-3 rounded-lg border border-slate-850">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">RECOVERY TIME OBJECTIVE (RTO)</span>
                  <span className="text-white font-mono font-bold text-sm block mt-1">15 Minutes Target Limit</span>
                  <p className="text-[10px] text-gray-400 leading-normal mt-1">Target duration allowed to re-provision corrupted databases or restore cached instances before committing regional failover DNS.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Action checklists */}
          <div className="lg:col-span-4 space-y-6 animate-fadeIn">
            <div className="border border-slate-800 bg-[#0d131f] p-5 rounded-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-850 pb-3">
                <ShieldAlert className="w-4 h-4 text-rose-450" />
                <h3 className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                  Incident Action Checklist
                </h3>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 bg-slate-950 rounded border border-slate-900 space-y-2">
                  <span className="text-[10px] font-mono text-indigo-400 font-bold block uppercase tracking-wider">🔒 SOC2 Audit compliance</span>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    All emergency overrides are fully logged inside secure syslog vaults context. Changes trigger manual review sequences automatically.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-850 font-mono text-[10px]">
                  <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">Manual Recovery Protocols</span>
                  
                  <button 
                    onClick={() => {
                      alert('Executing: Force Autovacuum database cleanup across locks.');
                    }}
                    className="w-full py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-gray-300 rounded hover:text-white transition"
                  >
                    🛠️ Run PG VACUUM manually
                  </button>

                  <button 
                    onClick={() => {
                      alert('Executing: Evicting all rate-limiter caches to free cache registers.');
                    }}
                    className="w-full py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-gray-300 rounded hover:text-white transition"
                  >
                    🧹 Flush Redis Rate Limiter cache
                  </button>

                  <button 
                    onClick={() => {
                      alert('Executing: Restoring Cloudflare TLS settings to Standard.');
                    }}
                    className="w-full py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-gray-300 rounded hover:text-white transition"
                  >
                    ♻️ Reset Cloudflare SSL strict rules
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
