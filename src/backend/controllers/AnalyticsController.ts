// src/backend/controllers/AnalyticsController.ts
import { Request, Response } from 'express';
import { AnalyticsService } from '../services/AnalyticsService';
import { AuthenticatedUserRequest } from '../middleware/authMiddleware';

export class AnalyticsController {
  /**
   * GET /api/v2/analytics/dashboard
   * Returns aggregated dashboard metrics.
   */
  public static async getDashboardMetrics(req: Request, res: Response) {
    const authedReq = req as AuthenticatedUserRequest;
    if (!authedReq.user) return res.status(401).json({ error: "Unauthorized" });

    try {
      const metrics = await AnalyticsService.getTenantMetrics(authedReq.user.tenantId);
      return res.json({ success: true, metrics });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
