import { Request, Response } from 'express';
import { InboxService } from '../services/InboxService';

export class InboxController {
  
  public static async createThread(req: Request, res: Response) {
    try {
      const { prospectId, subject, status, assignedTo, messages } = req.body;
      const tenantId = (req as any).user.tenantId;
      const userId = (req as any).user.id;
      const ipAddress = req.ip || 'unknown';
      const userAgent = (req.headers['user-agent']) || 'unknown';

      if (!subject) return res.status(400).json({ error: "Subject is required" });
      if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "Messages array is required" });

      const thread = await InboxService.createThread(tenantId, userId, prospectId, subject, status, assignedTo, messages, ipAddress, userAgent);
      return res.status(201).json({ success: true, data: thread });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  public static async getThreads(req: Request, res: Response) {
    try {
      const tenantId = (req as any).user.tenantId;
      const threads = await InboxService.getThreads(tenantId);
      return res.json({ success: true, data: threads });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getThread(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tenantId = (req as any).user.tenantId;
      const thread = await InboxService.getThread(tenantId, id);
      if (!thread) return res.status(404).json({ error: "Thread not found" });
      return res.json({ success: true, data: thread });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async updateThread(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, assignedTo } = req.body;
      const tenantId = (req as any).user.tenantId;
      const userId = (req as any).user.id;
      const ipAddress = req.ip || 'unknown';
      const userAgent = (req.headers['user-agent']) || 'unknown';

      const thread = await InboxService.updateThread(tenantId, id, status, assignedTo, userId, ipAddress, userAgent);
      return res.json({ success: true, data: thread });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  public static async addMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { from, to, body, direction } = req.body;
      const tenantId = (req as any).user.tenantId;
      const userId = (req as any).user.id;
      const ipAddress = req.ip || 'unknown';
      const userAgent = (req.headers['user-agent']) || 'unknown';

      if (!from || !to || !body || !direction) return res.status(400).json({ error: "Invalid message payload" });

      const thread = await InboxService.addMessage(tenantId, id, { from, to, body, direction }, userId, ipAddress, userAgent);
      return res.json({ success: true, data: thread });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  public static async addNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body } = req.body;
      const tenantId = (req as any).user.tenantId;
      const userId = (req as any).user.id;
      const ipAddress = req.ip || 'unknown';
      const userAgent = (req.headers['user-agent']) || 'unknown';

      const thread = await InboxService.addNote(tenantId, id, userId, body, ipAddress, userAgent);
      return res.json({ success: true, data: thread });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
