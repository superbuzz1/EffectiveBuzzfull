// src/backend/services/PrismaService.ts
import { PrismaClient, Role, WorkspaceRole, AuditStatus } from '@prisma/client';
import { UserRole } from '../types/auth';
// import { WorkspaceRole } from '../types/workspace'; // Already imported from @prisma/client

const prisma = new PrismaClient();

/**
 * Production-ready in-memory database adapter for sandbox reliability.
 * Used automatically if DATABASE_URL configuration is missing.
 */
interface InMemTenant {
  id: string;
  name: string;
  domain: string;
  plan: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface InMemWorkspace {
  id: string;
  name: string;
  slug: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface InMemWorkspaceMembership {
  id: string;
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  createdAt: Date;
  updatedAt: Date;
}

interface InMemWorkspaceInvitation {
  id: string;
  workspaceId: string;
  email: string;
  role: WorkspaceRole;
  token: string;
  expiresAt: Date;
  invitedById: string;
  createdAt: Date;
  isAccepted: boolean;
}


interface InMemVerifiedDomain {
  id: string;
  tenantId: string;
  domain: string;
  isSpfValid: boolean;
  isDkimValid: boolean;
  isDmarcValid: boolean;
  lastCheckedAt: Date;
  status: string;
}

interface InMemUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  isVerified: boolean;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
}

interface InMemRefreshToken {
  id: string;
  token: string;
  userId: string;
  jti: string;
  expiresAt: Date;
  createdAt: Date;
  isRevoked: boolean;
}

interface InMemPasswordReset {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
  isUsed: boolean;
}

export interface InMemMagicLinkToken {
  id: string;
  token: string;
  email: string;
  name?: string;
  tenantName?: string;
  workspaceName?: string;
  expiresAt: Date;
  createdAt: Date;
  isUsed: boolean;
}

interface InMemEmailVerification {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
  isUsed: boolean;
}

interface InMemUserProfile {
  userId: string;
  bio: string | null;
  title: string | null;
  department: string | null;
  phoneNumber: string | null;
  timezone: string;
}

interface InMemUserPreferences {
  userId: string;
  theme: 'dark' | 'light' | 'system';
  emailMarketing: boolean;
  emailSecurity: boolean;
  emailProductUpdates: boolean;
  defaultWorkspaceId: string | null;
  language: string;
}

interface InMemProspectNote {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
}

interface InMemProspect {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  company: string | null;
  title: string | null;
  phone: string | null;
  status: 'New' | 'Contacted' | 'Qualified' | 'Unqualified' | 'Nurturing';
  tags: string[];
  notes: InMemProspectNote[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface InMemCompanyNote {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
}

interface InMemCompanyScoringBreakdown {
  sizeScore: number;
  revenueScore: number;
  statusScore: number;
  industryBonus: number;
  manualAdjustment: number;
  calculatedAt: Date;
}

interface InMemCompany {
  id: string;
  tenantId: string;
  name: string;
  domain: string;
  industry: string;
  size: number;
  revenue: number;
  city: string | null;
  country: string | null;
  status: 'Lead' | 'Prospect' | 'Customer' | 'Churned' | 'Inactive';
  score: number;
  scoringBreakdown: InMemCompanyScoringBreakdown;
  notes: InMemCompanyNote[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface InMemIndustryData {
  name: string;
  growthRate: number;
  baseWeight: number;
  marketCapBillion: number;
  keyTrend: string;
  description: string;
}

interface InMemAuditLog {
  id: string;
  timestamp: Date;
  action: string;
  userId: string | null;
  tenantId: string | null;
  ipAddress: string;
  userAgent: string;
  status: 'SUCCESS' | 'FAILURE';
  reason: string | null;
}

interface InMemSequenceTemplate {
  id: string;
  tenantId: string;
  name: string;
  subject: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

interface InMemSequenceStepAction {
  templateId?: string;
  body?: string;
  subject?: string;
  delayMinutes?: number;
  conditionField?: string;
  conditionOperator?: string;
  conditionValue?: string;
  trueStepId?: string;
  falseStepId?: string;
}

interface InMemSequenceStep {
  id: string;
  sequenceId: string;
  name: string;
  type: string;
  action: InMemSequenceStepAction;
  nextStepId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface InMemSequence {
  id: string;
  tenantId: string;
  name: string;
  isActive: boolean;
  steps: InMemSequenceStep[];
  createdAt: Date;
  updatedAt: Date;
}

interface InMemInboxNote {
  id: string;
  threadId: string;
  userId: string;
  body: string;
  createdAt: Date;
}

interface InMemInboxMessage {
  id: string;
  threadId: string;
  from: string;
  to: string;
  body: string;
  direction: 'INBOUND' | 'OUTBOUND';
  createdAt: Date;
}

interface InMemInboxThread {
  id: string;
  tenantId: string;
  prospectId?: string;
  subject: string;
  status: 'OPEN' | 'SNOOZED' | 'CLOSED' | 'ARCHIVED';
  assignedTo?: string | null;
  messages: InMemInboxMessage[];
  notes: InMemInboxNote[];
  createdAt: Date;
  updatedAt: Date;
}

// Global In-Memory Store
class InMemoryStore {
  public static tenants: InMemTenant[] = [
    { id: "tenant-1", name: "Acme Corp", domain: "acme.com", plan: "Professional", status: "active", createdAt: new Date(), updatedAt: new Date() },
    { id: "tenant-2", name: "GrowthX", domain: "growthx.io", plan: "Growth", status: "active", createdAt: new Date(), updatedAt: new Date() }
  ];

  public static users: InMemUser[] = [
    { 
      id: "usr-1", 
      email: "alex@acme.com", 
      // Secure hash of "password123" inside system PBKDF2 format
      passwordHash: "8b7e28a5ce5db3cc44bc7a8716b9bb70:cb3e920d3674b6a836da8018dc33989ad6ff7836",
      name: "Alex Rivera", 
      role: "Owner", 
      isVerified: true, 
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", 
      createdAt: new Date(), 
      updatedAt: new Date(), 
      tenantId: "tenant-1" 
    },
    { 
      id: "usr-2", 
      email: "sarah@acme.com", 
      passwordHash: "8b7e28a5ce5db3cc44bc7a8716b9bb70:cb3e920d3674b6a836da8018dc33989ad6ff7836",
      name: "Sarah Chen", 
      role: "Admin", 
      isVerified: true, 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", 
      createdAt: new Date(), 
      updatedAt: new Date(), 
      tenantId: "tenant-1" 
    }
  ];

  public static userProfiles: InMemUserProfile[] = [
    {
      userId: "usr-1",
      bio: "Founder & Cloud Solutions Architect at Acme Corp.",
      title: "Executive Director",
      department: "Engineering",
      phoneNumber: "+1 (555) 0192",
      timezone: "America/New_York"
    },
    {
      userId: "usr-2",
      bio: "SecOps and systems access controller. Protecting the tenant gateways.",
      title: "Security Administrator",
      department: "SecOps",
      phoneNumber: "+1 (555) 0481",
      timezone: "America/Los_Angeles"
    }
  ];

  public static userPreferences: InMemUserPreferences[] = [
    {
      userId: "usr-1",
      theme: "dark",
      emailMarketing: false,
      emailSecurity: true,
      emailProductUpdates: true,
      defaultWorkspaceId: "ws-1",
      language: "en"
    },
    {
      userId: "usr-2",
      theme: "dark",
      emailMarketing: true,
      emailSecurity: true,
      emailProductUpdates: false,
      defaultWorkspaceId: "ws-1",
      language: "en"
    }
  ];

  public static refreshTokens: InMemRefreshToken[] = [];
  public static passwordResets: InMemPasswordReset[] = [];
  public static emailVerifications: InMemEmailVerification[] = [];
  public static magicLinkTokens: InMemMagicLinkToken[] = [];
  public static verifiedDomains: InMemVerifiedDomain[] = [];
  public static auditLogs: InMemAuditLog[] = [];

  public static prospects: InMemProspect[] = [
    {
      id: "prospect-1",
      tenantId: "tenant-1",
      name: "John Doe",
      email: "john.doe@stripe.com",
      company: "Stripe",
      title: "Account Executive",
      phone: "+1 (555) 0122",
      status: "Contacted",
      tags: ["AE", "Fintech", "Enterprise"],
      notes: [
        {
          id: "note-1",
          content: "Followed up after outbound outreach. Interested in learning more regarding warm domain availability.",
          createdAt: new Date("2026-06-01T14:30:00Z"),
          authorId: "usr-1",
          authorName: "Alex Rivera"
        }
      ],
      createdAt: new Date("2026-05-15T09:00:00Z"),
      updatedAt: new Date("2026-06-01T14:30:00Z"),
      deletedAt: null
    },
    {
      id: "prospect-2",
      tenantId: "tenant-1",
      name: "Jane Smith",
      email: "jane.smith@microsoft.com",
      company: "Microsoft",
      title: "Solutions Architect",
      phone: "+1 (555) 0188",
      status: "New",
      tags: ["Azure", "SaaS", "High Value"],
      notes: [],
      createdAt: new Date("2026-06-03T10:15:00Z"),
      updatedAt: new Date("2026-06-03T10:15:00Z"),
      deletedAt: null
    },
    {
      id: "prospect-3",
      tenantId: "tenant-1",
      name: "Robert Johnson",
      email: "r.johnson@netflix.com",
      company: "Netflix",
      title: "Director of Engineering",
      phone: "+1 (555) 0244",
      status: "Nurturing",
      tags: ["Scale", "Platform"],
      notes: [
        {
          id: "note-2",
          content: "Spoke briefly on LinkedIn. High interest in enterprise team routing controls.",
          createdAt: new Date("2026-06-05T16:00:00Z"),
          authorId: "usr-2",
          authorName: "Sarah Chen"
        }
      ],
      createdAt: new Date("2026-05-20T11:00:00Z"),
      updatedAt: new Date("2026-06-05T16:00:00Z"),
      deletedAt: null
    }
  ];

  // Workspace Service tables and collections
  public static workspaces: InMemWorkspace[] = [
    { id: "ws-1", name: "Effective Default", slug: "default", tenantId: "tenant-1", createdAt: new Date(), updatedAt: new Date() },
    { id: "ws-2", name: "Outbound Growth", slug: "growth", tenantId: "tenant-1", createdAt: new Date(), updatedAt: new Date() }
  ];

  public static workspaceMemberships: InMemWorkspaceMembership[] = [
    { id: "wm-1", workspaceId: "ws-1", userId: "usr-1", role: "Owner", createdAt: new Date(), updatedAt: new Date() },
    { id: "wm-2", workspaceId: "ws-1", userId: "usr-2", role: "Admin", createdAt: new Date(), updatedAt: new Date() },
    { id: "wm-3", workspaceId: "ws-2", userId: "usr-1", role: "Owner", createdAt: new Date(), updatedAt: new Date() }
  ];

  public static workspaceInvitations: InMemWorkspaceInvitation[] = [
    { id: "invite-1", workspaceId: "ws-1", email: "bob@acme.com", role: "SDR", token: "inv-68429", expiresAt: new Date(Date.now() + 7 * 86400 * 1000), invitedById: "usr-1", createdAt: new Date(), isAccepted: false }
  ];

  public static companies: InMemCompany[] = [
    {
      id: "company-1",
      tenantId: "tenant-1",
      name: "Stripe LLC",
      domain: "stripe.com",
      industry: "Fintech",
      size: 8500,
      revenue: 14000000000,
      city: "San Francisco",
      country: "United States",
      status: "Customer",
      score: 92,
      scoringBreakdown: {
        sizeScore: 30,
        revenueScore: 40,
        statusScore: 10,
        industryBonus: 10,
        manualAdjustment: 2,
        calculatedAt: new Date()
      },
      notes: [
        {
          id: "cnote-1",
          content: "Spoke with enterprise billing lead. Expansion underway.",
          createdAt: new Date("2026-06-02T10:00:00Z"),
          authorId: "usr-1",
          authorName: "Alex Rivera"
        }
      ],
      createdAt: new Date("2026-05-10T08:00:00Z"),
      updatedAt: new Date("2026-06-02T10:00:00Z"),
      deletedAt: null
    },
    {
      id: "company-2",
      tenantId: "tenant-1",
      name: "Netflix Inc",
      domain: "netflix.com",
      industry: "SaaS",
      size: 12000,
      revenue: 31000000000,
      city: "Los Gatos",
      country: "United States",
      status: "Prospect",
      score: 85,
      scoringBreakdown: {
        sizeScore: 35,
        revenueScore: 40,
        statusScore: 5,
        industryBonus: 10,
        manualAdjustment: -5,
        calculatedAt: new Date()
      },
      notes: [
        {
          id: "cnote-2",
          content: "Initial technical discovery call finished. Needs complex auth mapping setup.",
          createdAt: new Date("2026-06-04T11:00:00Z"),
          authorId: "usr-2",
          authorName: "Sarah Chen"
        }
      ],
      createdAt: new Date("2026-05-12T14:30:00Z"),
      updatedAt: new Date("2026-06-04T11:00:00Z"),
      deletedAt: null
    }
  ];

  public static industrySegments: InMemIndustryData[] = [
    { name: "SaaS", growthRate: 18.5, baseWeight: 10, marketCapBillion: 350, keyTrend: "Generative AI Agents Integrations", description: "Software as a service recurring-licensing models." },
    { name: "Fintech", growthRate: 15.2, baseWeight: 10, marketCapBillion: 480, keyTrend: "Decentralized automated ledgers", description: "Financial technologies including payments processing, neo-banks and asset brokers." },
    { name: "Healthcare", growthRate: 8.4, baseWeight: 6, marketCapBillion: 1200, keyTrend: "Remote predictive diagnostics", description: "Health services, clinical equipment, pharmaceutical distribution systems." },
    { name: "E-Commerce", growthRate: 12.1, baseWeight: 8, marketCapBillion: 2100, keyTrend: "Hyper-personalized matching loops", description: "Direct retail consumer internet storefront portals and logistics." },
    { name: "EdTech", growthRate: 6.5, baseWeight: 4, marketCapBillion: 85, keyTrend: "Adaptive self-paced syllabus setups", description: "Remote training and digital tutoring platform systems." }
  ];

  public static sequenceTemplates: InMemSequenceTemplate[] = [];
  public static sequences: InMemSequence[] = [];
  public static inboxThreads: InMemInboxThread[] = [];
}

/**
 * Universal Database Client wrapper.
 * Acts as the abstract interface for the relational mapping,
 * ensuring high fidelity queries while handling fallback gracefully.
 */
export class DatabaseClient {
  private static isUsingPrisma: boolean = false;

  public static async initialize(): Promise<void> {
    const dbUrl = process.env.DATABASE_URL;
    const isSandboxForce = process.env.IS_SANDBOX === "true" || process.env.NODE_ENV === "test";
    
    if (dbUrl && dbUrl !== "" && !dbUrl.includes("placeholder") && !isSandboxForce) {
      this.isUsingPrisma = true;
      try {
        await prisma.$connect();
        console.log("[DB_SERVICE] Production database connection enqueued via Prisma Client.");
      } catch (err) {
        console.error("[DB_SERVICE] Prisma connection failed, falling back to in-memory store:", err);
        this.isUsingPrisma = false;
      }
    } else {
      console.log("[DB_SERVICE] Running In-Memory Tenant & User secure database sandbox registry.");
    }
  }

  // --- TENANT QUERIES ---
  public static async findTenantById(id: string): Promise<any | null> {
    if (this.isUsingPrisma) {
      return prisma.tenant.findUnique({ where: { id } });
    }
    return InMemoryStore.tenants.find(t => t.id === id) || null;
  }

  public static async findTenantByDomain(domain: string): Promise<any | null> {
    if (this.isUsingPrisma) {
      return prisma.tenant.findUnique({ where: { domain } });
    }
    return InMemoryStore.tenants.find(t => t.domain.toLowerCase() === domain.toLowerCase()) || null;
  }

  public static async createTenant(name: string, domain: string): Promise<any> {
    if (this.isUsingPrisma) {
      return prisma.tenant.create({
        data: { name, domain, plan: "Growth", status: "active" }
      });
    }
    const exists = await this.findTenantByDomain(domain);
    if (exists) throw new Error("A tenant with this domain already exists.");

    const newTenant: InMemTenant = {
      id: `ten-${Math.floor(Math.random() * 1000000)}`,
      name,
      domain,
      plan: "Growth",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    InMemoryStore.tenants.push(newTenant);
    return newTenant;
  }

  // --- USER QUERIES ---
  public static async findUserByEmail(email: string): Promise<any | null> {
    if (this.isUsingPrisma) {
      return prisma.user.findUnique({ where: { email } });
    }
    return InMemoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  public static async findUserById(id: string): Promise<any | null> {
    if (this.isUsingPrisma) {
      return prisma.user.findUnique({ where: { id } });
    }
    return InMemoryStore.users.find(u => u.id === id) || null;
  }

  public static async createUser(data: any): Promise<any> {
    if (this.isUsingPrisma) {
      return prisma.user.create({ data });
    }
    const newUser: InMemUser = {
      id: `usr-${Math.floor(Math.random() * 1000000)}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    InMemoryStore.users.push(newUser);
    return newUser;
  }

  public static async updateUserVerificationStatus(id: string, isVerified: boolean): Promise<any> {
    if (this.isUsingPrisma) {
      return prisma.user.update({ where: { id }, data: { isVerified } });
    }
    const user = await this.findUserById(id);
    if (!user) throw new Error("User identifier not found.");
    user.isVerified = isVerified;
    user.updatedAt = new Date();
    return user;
  }

  public static async updateUserPassword(id: string, passwordHash: string): Promise<any> {
    if (this.isUsingPrisma) {
      return prisma.user.update({ where: { id }, data: { passwordHash } });
    }
    const user = await this.findUserById(id);
    if (!user) throw new Error("User identifier not found.");
    user.passwordHash = passwordHash;
    user.updatedAt = new Date();
    return user;
  }

  // --- REFRESH TOKEN ACTIONS ---
  public static async saveRefreshToken(data: any): Promise<any> {
    if (this.isUsingPrisma) {
      return prisma.refreshToken.create({ data });
    }
    const record: InMemRefreshToken = {
      id: `rt-${Math.floor(Math.random() * 1000000)}`,
      ...data,
      createdAt: new Date(),
      isRevoked: false
    };
    InMemoryStore.refreshTokens.push(record);
    return record;
  }

  public static async findRefreshToken(token: string): Promise<any | null> {
    if (this.isUsingPrisma) {
      return prisma.refreshToken.findUnique({ where: { token } });
    }
    return InMemoryStore.refreshTokens.find(t => t.token === token) || null;
  }

  public static async revokeRefreshTokenByJti(jti: string): Promise<void> {
    if (this.isUsingPrisma) {
      await prisma.refreshToken.update({ where: { jti }, data: { isRevoked: true } });
      return;
    }
    const token = InMemoryStore.refreshTokens.find(t => t.jti === jti);
    if (token) {
      token.isRevoked = true;
    }
  }

  public static async revokeAllRefreshTokensForUser(userId: string): Promise<void> {
    if (this.isUsingPrisma) {
      await prisma.refreshToken.updateMany({ where: { userId }, data: { isRevoked: true } });
      return;
    }
    InMemoryStore.refreshTokens
      .filter(t => t.userId === userId)
      .forEach(t => t.isRevoked = true);
  }

  // --- PASSWORD RESET TOKENS ---
  public static async createPasswordResetToken(userId: string, token: string, expiresAt: Date): Promise<any> {
    if (this.isUsingPrisma) {
      await prisma.passwordResetToken.updateMany({ where: { userId }, data: { isUsed: true } });
      return prisma.passwordResetToken.create({ data: { userId, token, expiresAt } });
    }
    // Invalidate existing tokens first
    InMemoryStore.passwordResets
      .filter(t => t.userId === userId)
      .forEach(t => t.isUsed = true);

    const record: InMemPasswordReset = {
      id: `pr-${Math.floor(Math.random() * 1000000)}`,
      token,
      userId,
      expiresAt,
      createdAt: new Date(),
      isUsed: false
    };
    InMemoryStore.passwordResets.push(record);
    return record;
  }

  public static async verifyAndUsePasswordResetToken(token: string): Promise<any> {
    if (this.isUsingPrisma) {
      const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
      if (!resetToken) throw new Error("Password reset token is invalid or inactive.");
      if (resetToken.isUsed) throw new Error("This token has already been spent.");
      if (resetToken.expiresAt < new Date()) throw new Error("This token has expired.");
      
      return prisma.passwordResetToken.update({ where: { token }, data: { isUsed: true } });
    }
    const resetToken = InMemoryStore.passwordResets.find(t => t.token === token);
    if (!resetToken) throw new Error("Password reset token is invalid or inactive.");
    if (resetToken.isUsed) throw new Error("This token has already been spent.");
    if (resetToken.expiresAt < new Date()) throw new Error("This token has expired.");
    
    resetToken.isUsed = true;
    return resetToken;
  }

  // --- EMAIL VERIFICATION TOKENS ---
  public static async createEmailVerificationToken(userId: string, token: string, expiresAt: Date): Promise<any> {
    if (this.isUsingPrisma) {
      return prisma.emailVerificationToken.create({ data: { userId, token, expiresAt } });
    }
    const record: InMemEmailVerification = {
      id: `ev-${Math.floor(Math.random() * 1000000)}`,
      token,
      userId,
      expiresAt,
      createdAt: new Date(),
      isUsed: false
    };
    InMemoryStore.emailVerifications.push(record);
    return record;
  }

  public static async verifyAndUseEmailVerificationToken(token: string): Promise<any> {
    if (this.isUsingPrisma) {
      const verToken = await prisma.emailVerificationToken.findUnique({ where: { token } });
      if (!verToken) throw new Error("Email verification token is invalid or unrecognized.");
      if (verToken.isUsed) throw new Error("This verification token has already been processed.");
      if (verToken.expiresAt < new Date()) throw new Error("This verification token has expired.");

      return prisma.emailVerificationToken.update({ where: { token }, data: { isUsed: true } });
    }
    const verToken = InMemoryStore.emailVerifications.find(t => t.token === token);
    if (!verToken) throw new Error("Email verification token is invalid or unrecognized.");
    if (verToken.isUsed) throw new Error("This verification token has already been processed.");
    if (verToken.expiresAt < new Date()) throw new Error("This verification token has expired.");

    verToken.isUsed = true;
    return verToken;
  }

  // --- MAGIC LINK TOKENS ---
  public static async createMagicLinkToken(
    email: string, 
    token: string, 
    expiresAt: Date,
    options?: { name?: string; tenantName?: string; workspaceName?: string }
  ): Promise<any> {
    if (this.isUsingPrisma) {
      // Invalidate existing magic links for same email
      await prisma.magicLinkToken.updateMany({ 
        where: { email: email.toLowerCase(), isUsed: false }, 
        data: { isUsed: true } 
      });
      return prisma.magicLinkToken.create({ 
        data: { 
          email: email.toLowerCase(), 
          token, 
          expiresAt,
          ...options
        } 
      });
    }
    // Invalidate existing magic links for same email
    InMemoryStore.magicLinkTokens
      .filter(t => t.email.toLowerCase() === email.toLowerCase())
      .forEach(t => t.isUsed = true);

    const record: InMemMagicLinkToken = {
      id: `ml-${Math.floor(Math.random() * 1000000)}`,
      token,
      email: email.toLowerCase(),
      name: options?.name,
      tenantName: options?.tenantName,
      workspaceName: options?.workspaceName,
      expiresAt,
      createdAt: new Date(),
      isUsed: false
    };
    InMemoryStore.magicLinkTokens.push(record);
    return record;
  }

  public static async verifyAndUseMagicLinkToken(token: string): Promise<any> {
    if (this.isUsingPrisma) {
      const linkToken = await prisma.magicLinkToken.findUnique({ where: { token } });
      if (!linkToken) throw new Error("Magic link token is invalid or unrecognized.");
      if (linkToken.isUsed) throw new Error("This magic link has already been used.");
      if (linkToken.expiresAt < new Date()) throw new Error("This magic link token has expired.");

      return prisma.magicLinkToken.update({ where: { token }, data: { isUsed: true } });
    }
    const linkToken = InMemoryStore.magicLinkTokens.find(t => t.token === token);
    if (!linkToken) throw new Error("Magic link token is invalid or unrecognized.");
    if (linkToken.isUsed) throw new Error("This magic link has already been used.");
    if (linkToken.expiresAt < new Date()) throw new Error("This magic link token has expired.");

    linkToken.isUsed = true;
    return linkToken;
  }

  // --- SECURITY AUDIT TRAIL LOGGING ---
  public static async recordAuditEntry(entry: Omit<InMemAuditLog, 'id' | 'timestamp'>): Promise<InMemAuditLog> {
    const log: InMemAuditLog = {
      id: `audit-${Math.floor(Math.random() * 1000000)}`,
      timestamp: new Date(),
      ...entry
    };
    InMemoryStore.auditLogs.unshift(log);
    
    // Auto-trim audit reports in sandbox to protect memory size (max 200 entries)
    if (InMemoryStore.auditLogs.length > 200) {
      InMemoryStore.auditLogs.pop();
    }
    return log;
  }

  public static async getRecentAuditEntries(tenantId?: string): Promise<InMemAuditLog[]> {
    if (tenantId) {
      return InMemoryStore.auditLogs.filter(log => log.tenantId === tenantId);
    }
    return InMemoryStore.auditLogs;
  }

  // --- WORKSPACE SERVICE OPERATIONS ---
  public static async listWorkspaces(tenantId: string): Promise<InMemWorkspace[]> {
    return InMemoryStore.workspaces.filter(ws => ws.tenantId === tenantId);
  }

  public static async findWorkspaceById(id: string): Promise<InMemWorkspace | null> {
    return InMemoryStore.workspaces.find(ws => ws.id === id) || null;
  }

  public static async findWorkspaceBySlug(tenantId: string, slug: string): Promise<InMemWorkspace | null> {
    return InMemoryStore.workspaces.find(ws => ws.tenantId === tenantId && ws.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  public static async createWorkspace(tenantId: string, name: string, slug: string, creatorId: string): Promise<InMemWorkspace> {
    const existing = await this.findWorkspaceBySlug(tenantId, slug);
    if (existing) throw new Error("A workspace with this URL slug already functions on your tenant.");

    const workspace: InMemWorkspace = {
      id: `ws-${Math.floor(Math.random() * 1000000)}`,
      name,
      slug: slug.toLowerCase(),
      tenantId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    InMemoryStore.workspaces.push(workspace);

    // Automatically bind the creating user as the OWNER of the Workspace
    await this.addMembership(workspace.id, creatorId, 'Owner');
    return workspace;
  }

  public static async updateWorkspace(id: string, name?: string, slug?: string): Promise<InMemWorkspace> {
    const ws = await this.findWorkspaceById(id);
    if (!ws) throw new Error("Target workspace could not be identified.");

    if (name) ws.name = name;
    if (slug) {
      const collision = await this.findWorkspaceBySlug(ws.tenantId, slug);
      if (collision && collision.id !== id) {
        throw new Error("Slug already occupied by another workspace inside this Tenant.");
      }
      ws.slug = slug.toLowerCase();
    }
    ws.updatedAt = new Date();
    return ws;
  }

  public static async deleteWorkspace(id: string): Promise<void> {
    const originalLength = InMemoryStore.workspaces.length;
    InMemoryStore.workspaces = InMemoryStore.workspaces.filter(ws => ws.id !== id);
    if (InMemoryStore.workspaces.length === originalLength) {
      throw new Error("Workspace deletion targeted a non-existent identifier.");
    }
    // Delete cascade memberships and invites
    InMemoryStore.workspaceMemberships = InMemoryStore.workspaceMemberships.filter(m => m.workspaceId !== id);
    InMemoryStore.workspaceInvitations = InMemoryStore.workspaceInvitations.filter(i => i.workspaceId !== id);
  }

  // --- WORKSPACE MEMBERSHIPS ---
  public static async listMemberships(workspaceId: string): Promise<(InMemWorkspaceMembership & { user?: InMemUser })[]> {
    const memberships = InMemoryStore.workspaceMemberships.filter(m => m.workspaceId === workspaceId);
    return memberships.map(m => {
      const user = InMemoryStore.users.find(u => u.id === m.userId);
      return {
        ...m,
        user
      };
    });
  }

  public static async findMembership(workspaceId: string, userId: string): Promise<InMemWorkspaceMembership | null> {
    return InMemoryStore.workspaceMemberships.find(m => m.workspaceId === workspaceId && m.userId === userId) || null;
  }

  public static async addMembership(workspaceId: string, userId: string, role: WorkspaceRole): Promise<InMemWorkspaceMembership> {
    const existing = await this.findMembership(workspaceId, userId);
    if (existing) {
      existing.role = role;
      existing.updatedAt = new Date();
      return existing;
    }

    const membership: InMemWorkspaceMembership = {
      id: `wm-${Math.floor(Math.random() * 1000000)}`,
      workspaceId,
      userId,
      role,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    InMemoryStore.workspaceMemberships.push(membership);
    return membership;
  }

  public static async updateMembershipRole(workspaceId: string, userId: string, role: WorkspaceRole): Promise<InMemWorkspaceMembership> {
    const membership = await this.findMembership(workspaceId, userId);
    if (!membership) throw new Error("Selected user is not currently registered in this Workspace.");
    
    membership.role = role;
    membership.updatedAt = new Date();
    return membership;
  }

  public static async removeMembership(workspaceId: string, userId: string): Promise<void> {
    const initSize = InMemoryStore.workspaceMemberships.length;
    InMemoryStore.workspaceMemberships = InMemoryStore.workspaceMemberships.filter(
      m => !(m.workspaceId === workspaceId && m.userId === userId)
    );
    if (InMemoryStore.workspaceMemberships.length === initSize) {
      throw new Error("Could not find the target user to remove from this Workspace.");
    }
  }

  // --- WORKSPACE INVITATIONS ---
  public static async listInvitations(workspaceId: string): Promise<(InMemWorkspaceInvitation & { invitedBy?: InMemUser })[]> {
    const invitations = InMemoryStore.workspaceInvitations.filter(i => i.workspaceId === workspaceId);
    return invitations.map(inv => {
      const invitedBy = InMemoryStore.users.find(u => u.id === inv.invitedById);
      return {
        ...inv,
        invitedBy
      };
    });
  }

  public static async createInvitation(
    workspaceId: string, 
    email: string, 
    role: WorkspaceRole, 
    token: string, 
    expiresAt: Date, 
    invitedById: string
  ): Promise<InMemWorkspaceInvitation> {
    // Invalidate earlier unsent invites to same email
    InMemoryStore.workspaceInvitations = InMemoryStore.workspaceInvitations.filter(
      i => !(i.workspaceId === workspaceId && i.email.toLowerCase() === email.toLowerCase() && !i.isAccepted)
    );

    const invite: InMemWorkspaceInvitation = {
      id: `inv-${Math.floor(Math.random() * 1000000)}`,
      workspaceId,
      email: email.toLowerCase(),
      role,
      token,
      expiresAt,
      invitedById,
      createdAt: new Date(),
      isAccepted: false
    };
    InMemoryStore.workspaceInvitations.push(invite);
    return invite;
  }

  public static async findInvitationByToken(token: string): Promise<InMemWorkspaceInvitation | null> {
    return InMemoryStore.workspaceInvitations.find(i => i.token === token) || null;
  }

  public static async findInvitationById(id: string): Promise<InMemWorkspaceInvitation | null> {
    return InMemoryStore.workspaceInvitations.find(i => i.id === id) || null;
  }

  public static async deleteInvitation(id: string): Promise<void> {
    InMemoryStore.workspaceInvitations = InMemoryStore.workspaceInvitations.filter(i => i.id !== id);
  }

  public static async acceptInvitation(token: string, userId: string): Promise<InMemWorkspaceMembership> {
    const invite = await this.findInvitationByToken(token);
    if (!invite) throw new Error("The target invitation code is invalid.");
    if (invite.isAccepted) throw new Error("This workspace invitation has already been accepted.");
    if (invite.expiresAt < new Date()) throw new Error("This workspace invitation code has expired.");

    invite.isAccepted = true;
    const user = await this.findUserById(userId);
    if (!user) throw new Error("Accepting user identity not found of database registers.");

    return await this.addMembership(invite.workspaceId, user.id, invite.role);
  }

  // --- USER PROFILE OPERATIONS ---
  public static async findUserProfileByUserId(userId: string): Promise<InMemUserProfile> {
    let profile = InMemoryStore.userProfiles.find(p => p.userId === userId);
    if (!profile) {
      profile = {
        userId,
        bio: null,
        title: null,
        department: null,
        phoneNumber: null,
        timezone: "UTC"
      };
      InMemoryStore.userProfiles.push(profile);
    }
    return profile;
  }

  public static async updateUserProfile(userId: string, data: Partial<Omit<InMemUserProfile, 'userId'>>): Promise<InMemUserProfile> {
    const profile = await this.findUserProfileByUserId(userId);
    if (data.bio !== undefined) profile.bio = data.bio;
    if (data.title !== undefined) profile.title = data.title;
    if (data.department !== undefined) profile.department = data.department;
    if (data.phoneNumber !== undefined) profile.phoneNumber = data.phoneNumber;
    if (data.timezone !== undefined) profile.timezone = data.timezone;
    return profile;
  }

  // --- USER PREFERENCES OPERATIONS ---
  public static async findUserPreferencesByUserId(userId: string): Promise<InMemUserPreferences> {
    let prefs = InMemoryStore.userPreferences.find(p => p.userId === userId);
    if (!prefs) {
      prefs = {
        userId,
        theme: "dark",
        emailMarketing: false,
        emailSecurity: true,
        emailProductUpdates: true,
        defaultWorkspaceId: null,
        language: "en"
      };
      InMemoryStore.userPreferences.push(prefs);
    }
    return prefs;
  }

  public static async updateUserPreferences(userId: string, data: Partial<Omit<InMemUserPreferences, 'userId'>>): Promise<InMemUserPreferences> {
    const prefs = await this.findUserPreferencesByUserId(userId);
    if (data.theme !== undefined) prefs.theme = data.theme;
    if (data.emailMarketing !== undefined) prefs.emailMarketing = data.emailMarketing;
    if (data.emailSecurity !== undefined) prefs.emailSecurity = data.emailSecurity;
    if (data.emailProductUpdates !== undefined) prefs.emailProductUpdates = data.emailProductUpdates;
    if (data.defaultWorkspaceId !== undefined) prefs.defaultWorkspaceId = data.defaultWorkspaceId;
    if (data.language !== undefined) prefs.language = data.language;
    return prefs;
  }

  // --- TEAM MANAGEMENT ---
  public static async listTenantUsers(tenantId: string): Promise<InMemUser[]> {
    return InMemoryStore.users.filter(u => u.tenantId === tenantId);
  }

  public static async updateUserTenantRole(userId: string, tenantId: string, role: UserRole): Promise<InMemUser> {
    const user = InMemoryStore.users.find(u => u.id === userId && u.tenantId === tenantId);
    if (!user) throw new Error("Teammate does not exist under your tenant workspace.");
    user.role = role;
    user.updatedAt = new Date();
    return user;
  }

  public static async removeUserFromTenant(userId: string, tenantId: string): Promise<void> {
    const initialCount = InMemoryStore.users.length;
    InMemoryStore.users = InMemoryStore.users.filter(u => !(u.id === userId && u.tenantId === tenantId));
    if (InMemoryStore.users.length === initialCount) {
      throw new Error("Target teammate not found under your active tenant network.");
    }
    // Also remove workspace memberships cascades for this user
    InMemoryStore.workspaceMemberships = InMemoryStore.workspaceMemberships.filter(m => m.userId !== userId);
  }

  // --- PROSPECT CRM OPERATIONS ---
  public static async createProspect(tenantId: string, data: Omit<InMemProspect, 'id' | 'tenantId' | 'notes' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<InMemProspect> {
    const prospect: InMemProspect = {
      id: `prospect-${Math.floor(Math.random() * 1000000)}`,
      tenantId,
      name: data.name,
      email: data.email,
      company: data.company || null,
      title: data.title || null,
      phone: data.phone || null,
      status: data.status || 'New',
      tags: data.tags || [],
      notes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };
    InMemoryStore.prospects.push(prospect);
    return prospect;
  }

  public static async bulkCreateProspects(tenantId: string, items: Omit<InMemProspect, 'id' | 'tenantId' | 'notes' | 'createdAt' | 'updatedAt' | 'deletedAt'>[]): Promise<InMemProspect[]> {
    const created: InMemProspect[] = [];
    for (const data of items) {
      const prospect: InMemProspect = {
        id: `prospect-${Math.floor(Math.random() * 1000000)}`,
        tenantId,
        name: data.name,
        email: data.email,
        company: data.company || null,
        title: data.title || null,
        phone: data.phone || null,
        status: data.status || 'New',
        tags: data.tags || [],
        notes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };
      InMemoryStore.prospects.push(prospect);
      created.push(prospect);
    }
    return created;
  }

  public static async updateProspect(tenantId: string, id: string, data: Partial<Omit<InMemProspect, 'id' | 'tenantId' | 'notes' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<InMemProspect> {
    const p = InMemoryStore.prospects.find(item => item.id === id && item.tenantId === tenantId);
    if (!p) throw new Error("Prospect not found or belongs to another tenant subscriber.");
    if (p.deletedAt) throw new Error("Cannot update a soft-deleted prospect.");

    if (data.name !== undefined) p.name = data.name;
    if (data.email !== undefined) p.email = data.email;
    if (data.company !== undefined) p.company = data.company;
    if (data.title !== undefined) p.title = data.title;
    if (data.phone !== undefined) p.phone = data.phone;
    if (data.status !== undefined) p.status = data.status;
    if (data.tags !== undefined) p.tags = data.tags;
    p.updatedAt = new Date();
    return p;
  }

  public static async addProspectNote(tenantId: string, id: string, noteData: Omit<InMemProspectNote, 'id' | 'createdAt'>): Promise<InMemProspectNote> {
    const p = InMemoryStore.prospects.find(item => item.id === id && item.tenantId === tenantId);
    if (!p) throw new Error("Prospect not found or belongs to another tenant subscriber.");
    if (p.deletedAt) throw new Error("Cannot attach notes to a soft-deleted prospect.");

    const note: InMemProspectNote = {
      id: `note-${Math.floor(Math.random() * 1000000)}`,
      content: noteData.content,
      createdAt: new Date(),
      authorId: noteData.authorId,
      authorName: noteData.authorName
    };
    p.notes.push(note);
    p.updatedAt = new Date();
    return note;
  }

  public static async deleteProspect(tenantId: string, id: string): Promise<void> {
    const p = InMemoryStore.prospects.find(item => item.id === id && item.tenantId === tenantId);
    if (!p) throw new Error("Prospect not found or belongs to another tenant subscriber.");
    if (p.deletedAt) throw new Error("Prospect option is already soft-deleted.");
    p.deletedAt = new Date();
    p.updatedAt = new Date();
  }

  public static async restoreProspect(tenantId: string, id: string): Promise<InMemProspect> {
    const p = InMemoryStore.prospects.find(item => item.id === id && item.tenantId === tenantId);
    if (!p) throw new Error("Prospect not found or belongs to another tenant subscriber.");
    p.deletedAt = null;
    p.updatedAt = new Date();
    return p;
  }

  public static async findProspectById(tenantId: string, id: string): Promise<InMemProspect | null> {
    const p = InMemoryStore.prospects.find(item => item.id === id && item.tenantId === tenantId);
    if (!p) return null;
    return p;
  }

  public static async listProspects(tenantId: string, options: { search?: string; status?: string; tag?: string; includeDeleted?: boolean } = {}): Promise<InMemProspect[]> {
    let list = InMemoryStore.prospects.filter(item => item.tenantId === tenantId);

    if (!options.includeDeleted) {
      list = list.filter(item => item.deletedAt === null);
    } else {
      // If includeDeleted, only return deleted ones for viewing trash, or return all
      // We will default to returning both
    }

    if (options.status) {
      list = list.filter(item => item.status === options.status);
    }

    if (options.tag) {
      list = list.filter(item => item.tags.includes(options.tag!));
    }

    if (options.search) {
      const q = options.search.toLowerCase();
      list = list.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        (item.company && item.company.toLowerCase().includes(q)) ||
        (item.title && item.title.toLowerCase().includes(q))
      );
    }

    return list;
  }

  // --- COMPANY DATABASE CLIENT WORKFLOWS ---
  public static async createCompany(tenantId: string, data: Omit<InMemCompany, 'id' | 'tenantId' | 'notes' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<InMemCompany> {
    const company: InMemCompany = {
      id: `company-${Math.floor(Math.random() * 1000000)}`,
      tenantId,
      name: data.name,
      domain: data.domain,
      industry: data.industry,
      size: data.size,
      revenue: data.revenue,
      city: data.city || null,
      country: data.country || null,
      status: data.status || 'Lead',
      score: data.score || 0,
      scoringBreakdown: {
        sizeScore: data.scoringBreakdown?.sizeScore || 0,
        revenueScore: data.scoringBreakdown?.revenueScore || 0,
        statusScore: data.scoringBreakdown?.statusScore || 0,
        industryBonus: data.scoringBreakdown?.industryBonus || 0,
        manualAdjustment: data.scoringBreakdown?.manualAdjustment || 0,
        calculatedAt: new Date()
      },
      notes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };
    InMemoryStore.companies.push(company);
    return company;
  }

  public static async bulkCreateCompanies(tenantId: string, items: Omit<InMemCompany, 'id' | 'tenantId' | 'notes' | 'createdAt' | 'updatedAt' | 'deletedAt'>[]): Promise<InMemCompany[]> {
    const created: InMemCompany[] = [];
    for (const data of items) {
      const company: InMemCompany = {
        id: `company-${Math.floor(Math.random() * 1000000)}`,
        tenantId,
        name: data.name,
        domain: data.domain,
        industry: data.industry,
        size: data.size,
        revenue: data.revenue,
        city: data.city || null,
        country: data.country || null,
        status: data.status || 'Lead',
        score: data.score || 0,
        scoringBreakdown: {
          sizeScore: data.scoringBreakdown?.sizeScore || 0,
          revenueScore: data.scoringBreakdown?.revenueScore || 0,
          statusScore: data.scoringBreakdown?.statusScore || 0,
          industryBonus: data.scoringBreakdown?.industryBonus || 0,
          manualAdjustment: data.scoringBreakdown?.manualAdjustment || 0,
          calculatedAt: new Date()
        },
        notes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };
      InMemoryStore.companies.push(company);
      created.push(company);
    }
    return created;
  }

  public static async updateCompany(
    tenantId: string, 
    id: string, 
    data: Partial<Omit<InMemCompany, 'id' | 'tenantId' | 'notes' | 'createdAt' | 'updatedAt' | 'deletedAt'>>
  ): Promise<InMemCompany> {
    const c = InMemoryStore.companies.find(item => item.id === id && item.tenantId === tenantId);
    if (!c) throw new Error("Company profile not found or belongs to another tenant workspace.");
    if (c.deletedAt) throw new Error("Cannot update a soft-deleted company profile.");

    if (data.name !== undefined) c.name = data.name;
    if (data.domain !== undefined) c.domain = data.domain;
    if (data.industry !== undefined) c.industry = data.industry;
    if (data.size !== undefined) c.size = data.size;
    if (data.revenue !== undefined) c.revenue = data.revenue;
    if (data.city !== undefined) c.city = data.city;
    if (data.country !== undefined) c.country = data.country;
    if (data.status !== undefined) c.status = data.status;
    if (data.score !== undefined) c.score = data.score;
    if (data.scoringBreakdown !== undefined) {
      c.scoringBreakdown = {
        ...c.scoringBreakdown,
        ...data.scoringBreakdown,
        calculatedAt: new Date()
      };
    }
    c.updatedAt = new Date();
    return c;
  }

  public static async addCompanyNote(tenantId: string, id: string, noteData: Omit<InMemCompanyNote, 'id' | 'createdAt'>): Promise<InMemCompanyNote> {
    const c = InMemoryStore.companies.find(item => item.id === id && item.tenantId === tenantId);
    if (!c) throw new Error("Company profile not found or belongs to another tenant workspace.");
    if (c.deletedAt) throw new Error("Cannot append notes to soft-deleted company profile.");

    const note: InMemCompanyNote = {
      id: `cnote-${Math.floor(Math.random() * 1000000)}`,
      content: noteData.content,
      createdAt: new Date(),
      authorId: noteData.authorId,
      authorName: noteData.authorName
    };
    c.notes.push(note);
    c.updatedAt = new Date();
    return note;
  }

  public static async deleteCompany(tenantId: string, id: string): Promise<void> {
    const c = InMemoryStore.companies.find(item => item.id === id && item.tenantId === tenantId);
    if (!c) throw new Error("Company profile not found or belongs to another tenant workspace.");
    if (c.deletedAt) throw new Error("Company option is already soft-deleted.");
    c.deletedAt = new Date();
    c.updatedAt = new Date();
  }

  public static async restoreCompany(tenantId: string, id: string): Promise<InMemCompany> {
    const c = InMemoryStore.companies.find(item => item.id === id && item.tenantId === tenantId);
    if (!c) throw new Error("Company profile not found or belongs to another tenant workspace.");
    c.deletedAt = null;
    c.updatedAt = new Date();
    return c;
  }

  public static async findCompanyById(tenantId: string, id: string): Promise<InMemCompany | null> {
    const c = InMemoryStore.companies.find(item => item.id === id && item.tenantId === tenantId);
    if (!c) return null;
    return c;
  }

  public static async listCompanies(
    tenantId: string, 
    options: { search?: string; status?: string; industry?: string; includeDeleted?: boolean } = {}
  ): Promise<InMemCompany[]> {
    let list = InMemoryStore.companies.filter(item => item.tenantId === tenantId);

    if (!options.includeDeleted) {
      list = list.filter(item => item.deletedAt === null);
    }

    if (options.status) {
      list = list.filter(item => item.status === options.status);
    }

    if (options.industry) {
      list = list.filter(item => item.industry === options.industry);
    }

    if (options.search) {
      const q = options.search.toLowerCase();
      list = list.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.domain.toLowerCase().includes(q) ||
        item.industry.toLowerCase().includes(q) ||
        (item.city && item.city.toLowerCase().includes(q)) ||
        (item.country && item.country.toLowerCase().includes(q))
      );
    }

    return list;
  }

  public static async listIndustries(): Promise<InMemIndustryData[]> {
    return InMemoryStore.industrySegments;
  }

  // --- SEQUENCE & TEMPLATE QUERIES ---
  public static async createSequenceTemplate(tenantId: string, data: Omit<InMemSequenceTemplate, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>): Promise<InMemSequenceTemplate> {
    const template: InMemSequenceTemplate = {
      id: `tmpl-${Math.floor(Math.random() * 1000000)}`,
      tenantId,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    InMemoryStore.sequenceTemplates.push(template);
    return template;
  }

  public static async listSequenceTemplates(tenantId: string): Promise<InMemSequenceTemplate[]> {
    return InMemoryStore.sequenceTemplates.filter(t => t.tenantId === tenantId);
  }

  public static async findSequenceTemplateById(tenantId: string, id: string): Promise<InMemSequenceTemplate | null> {
    return InMemoryStore.sequenceTemplates.find(t => t.tenantId === tenantId && t.id === id) || null;
  }

  public static async createSequence(tenantId: string, data: { name: string; isActive?: boolean; steps: Omit<InMemSequenceStep, 'id' | 'sequenceId' | 'createdAt' | 'updatedAt'>[] }): Promise<InMemSequence> {
    const sequenceId = `seq-${Math.floor(Math.random() * 1000000)}`;
    const steps: InMemSequenceStep[] = data.steps.map(s => ({
      id: `step-${Math.floor(Math.random() * 1000000)}`,
      sequenceId,
      ...s,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const sequence: InMemSequence = {
      id: sequenceId,
      tenantId,
      name: data.name,
      isActive: data.isActive ?? false,
      steps,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    InMemoryStore.sequences.push(sequence);
    return sequence;
  }

  public static async updateSequence(tenantId: string, id: string, data: { name?: string; isActive?: boolean, steps?: Omit<InMemSequenceStep, 'id' | 'sequenceId' | 'createdAt' | 'updatedAt'>[] }): Promise<InMemSequence> {
    const sequence = InMemoryStore.sequences.find(s => s.tenantId === tenantId && s.id === id);
    if (!sequence) throw new Error("Sequence not found or belongs to another tenant.");
    
    if (data.name !== undefined) sequence.name = data.name;
    if (data.isActive !== undefined) sequence.isActive = data.isActive;

    if (data.steps) {
      sequence.steps = data.steps.map(s => ({
        id: `step-${Math.floor(Math.random() * 1000000)}`,
        sequenceId: id,
        ...s,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
    }

    sequence.updatedAt = new Date();
    return sequence;
  }

  public static async getSequenceById(tenantId: string, id: string): Promise<InMemSequence | null> {
    return InMemoryStore.sequences.find(s => s.tenantId === tenantId && s.id === id) || null;
  }

  public static async listSequences(tenantId: string): Promise<InMemSequence[]> {
    return InMemoryStore.sequences.filter(s => s.tenantId === tenantId);
  }

  public static async deleteSequence(tenantId: string, id: string): Promise<void> {
    const index = InMemoryStore.sequences.findIndex(s => s.tenantId === tenantId && s.id === id);
    if (index === -1) throw new Error("Sequence not found.");
    InMemoryStore.sequences.splice(index, 1);
  }

  // --- INBOX QUERIES ---
  public static async createInboxThread(tenantId: string, data: { prospectId?: string, subject: string, status?: 'OPEN' | 'SNOOZED' | 'CLOSED' | 'ARCHIVED', assignedTo?: string, messages: Omit<InMemInboxMessage, 'id' | 'threadId' | 'createdAt'>[] }): Promise<InMemInboxThread> {
    const threadId = `thrd-${Math.floor(Math.random() * 1000000)}`;
    const thread: InMemInboxThread = {
      id: threadId,
      tenantId,
      prospectId: data.prospectId,
      subject: data.subject,
      status: data.status || 'OPEN',
      assignedTo: data.assignedTo || null,
      messages: data.messages.map(m => ({
        id: `msg-${Math.floor(Math.random() * 1000000)}`,
        threadId,
        ...m,
        createdAt: new Date()
      })),
      notes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    InMemoryStore.inboxThreads.push(thread);
    return thread;
  }

  public static async getInboxThreads(tenantId: string): Promise<InMemInboxThread[]> {
    return InMemoryStore.inboxThreads.filter(t => t.tenantId === tenantId);
  }

  public static async getInboxThread(tenantId: string, id: string): Promise<InMemInboxThread | null> {
    return InMemoryStore.inboxThreads.find(t => t.tenantId === tenantId && t.id === id) || null;
  }

  public static async updateInboxThread(tenantId: string, id: string, data: { status?: 'OPEN' | 'SNOOZED' | 'CLOSED' | 'ARCHIVED', assignedTo?: string | null }): Promise<InMemInboxThread> {
    const thread = InMemoryStore.inboxThreads.find(t => t.tenantId === tenantId && t.id === id);
    if (!thread) throw new Error("Thread not found.");
    
    if (data.status !== undefined) thread.status = data.status;
    if (data.assignedTo !== undefined) thread.assignedTo = data.assignedTo;
    thread.updatedAt = new Date();
    return thread;
  }

  public static async addInboxMessage(tenantId: string, threadId: string, message: Omit<InMemInboxMessage, 'id' | 'threadId' | 'createdAt'>): Promise<InMemInboxThread> {
    const thread = InMemoryStore.inboxThreads.find(t => t.tenantId === tenantId && t.id === threadId);
    if (!thread) throw new Error("Thread not found.");

    thread.messages.push({
      id: `msg-${Math.floor(Math.random() * 1000000)}`,
      threadId,
      ...message,
      createdAt: new Date()
    });
    thread.updatedAt = new Date();
    return thread;
  }

  public static async addInboxNote(tenantId: string, threadId: string, userId: string, body: string): Promise<InMemInboxThread> {
    const thread = InMemoryStore.inboxThreads.find(t => t.tenantId === tenantId && t.id === threadId);
    if (!thread) throw new Error("Thread not found.");

    thread.notes.push({
      id: `note-${Math.floor(Math.random() * 1000000)}`,
      threadId,
      userId,
      body,
      createdAt: new Date()
    });
    thread.updatedAt = new Date();
    return thread;
  }

  // --- DNS & DOMAIN VERIFICATION ---
  public static async listVerifiedDomains(tenantId: string): Promise<any[]> {
    if (this.isUsingPrisma) {
      return prisma.verifiedDomain.findMany({ where: { tenantId } });
    }
    return InMemoryStore.verifiedDomains.filter(d => d.tenantId === tenantId);
  }

  public static async upsertVerifiedDomain(tenantId: string, data: any): Promise<any> {
    if (this.isUsingPrisma) {
      return prisma.verifiedDomain.upsert({
        where: { domain: data.domain },
        update: { ...data },
        create: { ...data, tenantId }
      });
    }
    const existingIndex = InMemoryStore.verifiedDomains.findIndex(d => d.domain === data.domain);
    if (existingIndex > -1) {
      const updated = { ...InMemoryStore.verifiedDomains[existingIndex], ...data };
      InMemoryStore.verifiedDomains[existingIndex] = updated;
      return updated;
    }
    const newDomain = {
      id: `dom-${Math.floor(Math.random() * 1000000)}`,
      tenantId,
      ...data,
      lastCheckedAt: new Date()
    };
    InMemoryStore.verifiedDomains.push(newDomain);
    return newDomain;
  }

  public static getInMemoryStore() {
    return InMemoryStore;
  }
}

DatabaseClient.initialize();
