// src/backend/services/AnalyticsService.ts
import { DatabaseClient } from './PrismaService';

export class AnalyticsService {
  /**
   * Aggregates key performance metrics for a tenant.
   */
  public static async getTenantMetrics(tenantId: string) {
    const store = DatabaseClient as any;
    
    // 1. ARR (Sum of active subscriptions)
    const subscriptions = await store.listSubscriptions(tenantId);
    const arr = subscriptions
      .filter((s: any) => s.status === 'ACTIVE')
      .reduce((sum: number, s: any) => sum + (this.getMonthlyPrice(s.plan) * 12), 0);

    // 2. Outreach Volume (Total approved drafts)
    const drafts = await store.listPersonalizedDrafts(tenantId, 'approved');
    const outreachVolume = drafts.length;

    // 3. Average Edit-Delta (How much humans change AI output)
    const totalDelta = drafts.reduce((sum: number, d: any) => sum + (d.editDelta || 0), 0);
    const avgEditDelta = outreachVolume > 0 ? totalDelta / outreachVolume : 0;

    // 4. Daily Trends (Last 30 days)
    const trends = await store.getDailyMetrics(tenantId, 30);

    return {
      arr,
      outreachVolume,
      avgEditDelta,
      trends
    };
  }

  private static getMonthlyPrice(plan: string): number {
    switch (plan.toUpperCase()) {
      case 'STARTER': return 49;
      case 'GROWTH': return 149;
      case 'SCALE': return 499;
      case 'ENTERPRISE': return 1299;
      default: return 0;
    }
  }
}
