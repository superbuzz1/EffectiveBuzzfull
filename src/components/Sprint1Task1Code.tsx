import React, { useState } from 'react';
import { 
  FileCode2, Terminal, Database, Server, CheckCircle, 
  Copy, Check, Code, Shield, HardDrive
} from 'lucide-react';

const codeFiles = [
  {
    path: 'prisma/schema.prisma',
    icon: Database,
    language: 'prisma',
    color: 'text-amber-400',
    content: `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Tenant {
  id               String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name             String   @db.VarChar(255)
  stripeCustomerId String?  @unique @db.VarChar(255)
  createdAt        DateTime @default(now()) @db.Timestamp(6)
  
  users            User[]

  @@map("tenant")
}

enum Role {
  owner
  admin
  member
}

model User {
  id           String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email        String   @unique @db.VarChar(255)
  passwordHash String   @db.VarChar(255)
  role         Role     @default(member)
  createdAt    DateTime @default(now()) @db.Timestamp(6)
  
  tenantId     String   @db.Uuid
  tenant       Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  @@index([email])
  @@map("user")
}
`
  },
  {
    path: 'src/lib/db.ts',
    icon: HardDrive,
    language: 'typescript',
    color: 'text-blue-400',
    content: `import { PrismaClient } from '@prisma/client';

/**
 * Production Database Client Configuration
 * Implements a singleton pattern to prevent connection exhaustion
 * during hot-reloads in development, while maintaining a lean
 * connection pool in production.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Configure Prisma Client with structured logging for queries and errors
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
  ],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Attach telemetry/logging in development
if (process.env.NODE_ENV !== 'production') {
  prisma.$on('query' as never, (e: any) => {
    console.log(\`Query: \${e.query}\`);
    console.log(\`Params: \${e.params}\`);
    console.log(\`Duration: \${e.duration}ms\`);
  });
}

/**
 * Health check utility to verify database connectivity.
 * @returns boolean indicating if the database is reachable.
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await prisma.$queryRaw\`SELECT 1\`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}
`
  },
  {
    path: 'src/server/routes/health.ts',
    icon: Server,
    language: 'typescript',
    color: 'text-emerald-400',
    content: `import { Router, Request, Response } from 'express';
import { checkDatabaseHealth } from '../../lib/db';

export const healthRouter = Router();

/**
 * @route GET /api/health
 * @description Validates application and database operational status
 * @access Public
 */
healthRouter.get('/', async (req: Request, res: Response) => {
  const isDbHealthy = await checkDatabaseHealth();
  
  const status = isDbHealthy ? 200 : 503;
  const payload = {
    status: isDbHealthy ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    services: {
      database: isDbHealthy ? 'connected' : 'disconnected',
      server: 'running'
    }
  };

  if (!isDbHealthy) {
    console.error('[Health Check] Database connection failed');
  }

  res.status(status).json(payload);
});
`
  },
  {
    path: 'tests/integration/db.test.ts',
    icon: Shield,
    language: 'typescript',
    color: 'text-rose-400',
    content: `import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma, checkDatabaseHealth } from '../../src/lib/db';

describe('Database Integration', () => {
  
  beforeAll(async () => {
    // Ensure we are connected
    await prisma.$connect();
  });

  afterAll(async () => {
    // Cleanup mock data and disconnect
    await prisma.user.deleteMany({ where: { email: { contains: '@test.local' } } });
    await prisma.tenant.deleteMany({ where: { name: 'Test Tenant' } });
    await prisma.$disconnect();
  });

  it('should pass the health check utility', async () => {
    const isHealthy = await checkDatabaseHealth();
    expect(isHealthy).toBe(true);
  });

  it('should successfully create a Tenant and associated User with correct FK constraints', async () => {
    // 1. Create Tenant
    const tenant = await prisma.tenant.create({
      data: {
        name: 'Test Tenant',
        stripeCustomerId: 'cus_test123'
      }
    });

    expect(tenant).toBeDefined();
    expect(tenant.id).toBeTypeOf('string');

    // 2. Create User linked to Tenant
    const user = await prisma.user.create({
      data: {
        email: 'founder@test.local',
        passwordHash: '$2b$10$hashedpasswordstring',
        role: 'owner',
        tenantId: tenant.id
      }
    });

    expect(user).toBeDefined();
    expect(user.id).toBeTypeOf('string');
    expect(user.tenantId).toBe(tenant.id);
  });

  it('should cascade delete Users when a Tenant is destroyed', async () => {
    const tenant = await prisma.tenant.findFirst({ where: { name: 'Test Tenant' } });
    expect(tenant).toBeDefined();

    await prisma.tenant.delete({ where: { id: tenant!.id } });

    const userCount = await prisma.user.count({ where: { tenantId: tenant!.id } });
    expect(userCount).toBe(0);
  });
});
`
  }
];

export default function Sprint1Task1Code() {
  const [activeFile, setActiveFile] = useState(codeFiles[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <Code className="w-4 h-4" />
          Production Code Artifacts
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight">
          Task #1: Database Provisioning Implementation
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
          Production-ready TypeScript implementation for the PostgreSQL database architecture, including Prisma schema definitions, connection pooling, health checks, and integration tests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* File Browser sidebar */}
        <div className="lg:col-span-1 border border-slate-800 bg-[#0b101b] rounded-xl overflow-hidden flex flex-col h-[600px]">
          <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            <Terminal className="w-4 h-4" />
            Explorer
          </div>
          <div className="p-2 space-y-1 overflow-y-auto flex-1">
            {codeFiles.map((file) => (
              <button
                key={file.path}
                onClick={() => setActiveFile(file)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all focus:outline-none ${
                  activeFile.path === file.path 
                    ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300 border border-transparent'
                }`}
              >
                <file.icon className={`w-4 h-4 shrink-0 ${file.color}`} />
                <span className="truncate font-mono text-[11px] font-medium text-left">{file.path}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Code Editor View */}
        <div className="lg:col-span-3 border border-slate-800 bg-[#0b101b] rounded-xl flex flex-col h-[600px] overflow-hidden">
          {/* File Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3">
              <activeFile.icon className={`w-5 h-5 ${activeFile.color}`} />
              <div>
                <div className="text-sm font-mono text-slate-200 font-medium">
                  {activeFile.path}
                </div>
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  {activeFile.language}
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700 hover:border-slate-600"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-auto bg-[#0d131f] p-4">
            <pre className="font-mono text-xs text-slate-300 leading-relaxed">
              <code>{activeFile.content}</code>
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}
