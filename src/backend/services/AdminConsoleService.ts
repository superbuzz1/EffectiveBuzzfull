import { DatabaseClient } from './PrismaService';

export class AdminConsoleService {
  
  public static async getUsers() {
    const store = DatabaseClient.getInMemoryStore();
    return store.users.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      isVerified: u.isVerified,
      tenantId: u.tenantId,
      createdAt: u.createdAt,
    }));
  }

  public static async getWorkspaces() {
    const store = DatabaseClient.getInMemoryStore();
    return store.tenants.map(t => ({
      id: t.id,
      name: t.name,
      domain: t.domain,
      plan: t.plan,
      status: t.status,
      createdAt: t.createdAt,
    }));
  }

  public static async getAuditLogs() {
    const store = DatabaseClient.getInMemoryStore();
    return store.auditLogs;
  }

  public static async getAIUsage() {
    // Determine mock/aggregate data for AI usage until a real metric tracker is added
    return {
      totalTokens: 1250000,
      callsThisMonth: 14500,
      activeModels: ['gemini-2.5-flash', 'gemini-2.5-pro'],
      costEstimated: 12.50
    };
  }

  public static async getBillingStatus() {
    // Represents overall billing/MRR standing of the SaaS globally
    const store = DatabaseClient.getInMemoryStore();
    const payingTenants = store.tenants.length;
    
    return {
      mrr: payingTenants * 99, // dummy $99/mo plan calc
      activeSubscriptions: payingTenants,
      churnRate: 2.1,
      outstandingInvoices: 0
    };
  }
}
