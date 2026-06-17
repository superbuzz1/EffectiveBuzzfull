import { Request, Response } from 'express';
import { CampaignService } from '../services/CampaignService';

export class CampaignController {
  public static async createCampaign(req: Request, res: Response) {
    try {
      // Expecting workspaceId in body or header. Assuming body for now.
      const { name, targetAudience, sequenceId, workspaceId } = req.body;
      if (!name || !sequenceId || !workspaceId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const campaign = await CampaignService.createCampaign(workspaceId, name, targetAudience || '', sequenceId);
      return res.status(201).json({ success: true, data: campaign });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getCampaigns(req: Request, res: Response) {
    try {
      const workspaceId = req.query.workspaceId as string;
      if (!workspaceId) return res.status(400).json({ error: "workspaceId query param required" });
      
      const campaigns = await CampaignService.getCampaigns(workspaceId);
      return res.json({ success: true, data: campaigns });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async enrollContacts(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { contactIds } = req.body;
      
      if (!Array.isArray(contactIds)) return res.status(400).json({ error: "contactIds must be an array" });

      const result = await CampaignService.enrollContacts(id, contactIds);
      return res.status(201).json({ success: true, count: result.count });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getEnrollments(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const enrollments = await CampaignService.getEnrollments(id);
      return res.json({ success: true, data: enrollments });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
