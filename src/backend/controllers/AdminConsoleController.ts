import { Request, Response } from 'express';
import { AdminConsoleService } from '../services/AdminConsoleService';

export class AdminConsoleController {
  
  public static async getUsers(req: Request, res: Response) {
    try {
      const data = await AdminConsoleService.getUsers();
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getWorkspaces(req: Request, res: Response) {
    try {
      const data = await AdminConsoleService.getWorkspaces();
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getAuditLogs(req: Request, res: Response) {
    try {
      const data = await AdminConsoleService.getAuditLogs();
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getAIUsage(req: Request, res: Response) {
    try {
      const data = await AdminConsoleService.getAIUsage();
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getBillingStatus(req: Request, res: Response) {
    try {
      const data = await AdminConsoleService.getBillingStatus();
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
