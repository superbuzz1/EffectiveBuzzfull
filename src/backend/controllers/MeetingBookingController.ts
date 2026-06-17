import { Request, Response } from 'express';
import { MeetingBookingService } from '../services/MeetingBookingService';

export class MeetingBookingController {
  public static async getCalendars(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const data = await MeetingBookingService.getCalendars(workspaceId);
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async connect(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const { provider } = req.params;
      const payload = req.body;
      const data = await MeetingBookingService.connect(workspaceId, provider, payload);
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async disconnect(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const { provider } = req.params;
      await MeetingBookingService.disconnect(workspaceId, provider);
      return res.json({ success: true, message: 'Disconnected' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
