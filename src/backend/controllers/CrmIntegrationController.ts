import { Request, Response } from 'express';
import { CrmIntegrationService } from '../services/CrmIntegrationService';

export class CrmIntegrationController {
  public static async getIntegrations(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const data = await CrmIntegrationService.getIntegrations(workspaceId);
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
      const data = await CrmIntegrationService.connect(workspaceId, provider, payload);
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async sync(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const { provider } = req.params;
      const data = await CrmIntegrationService.sync(workspaceId, provider);
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async disconnect(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const { provider } = req.params;
      await CrmIntegrationService.disconnect(workspaceId, provider);
      return res.json({ success: true, message: 'Disconnected' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
