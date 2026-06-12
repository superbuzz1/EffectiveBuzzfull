import { Request, Response } from 'express';
import { AnalyticsService } from '../services/AnalyticsService';

export class AnalyticsController {
  public static async getMetrics(req: Request, res: Response) {
    try {
      const tenantId = (req as any).user.tenantId;
      const { startDate, endDate } = req.query;

      const data = await AnalyticsService.getMetrics(
        tenantId,
        startDate as string,
        endDate as string
      );

      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
