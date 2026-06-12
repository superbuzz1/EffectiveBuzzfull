import { Request, Response } from 'express';
import { LeadScoringService } from '../services/LeadScoringService';

export class LeadScoringController {
  
  public static async scoreLead(req: Request, res: Response) {
    try {
      const { company, prospect, industry } = req.body;
      
      if (!company && !prospect && !industry) {
        return res.status(400).json({ error: "At least one of company, prospect, or industry is required" });
      }

      const data = await LeadScoringService.scoreLead(company || {}, prospect || {}, industry || {});
      return res.json({ success: true, data });
    } catch (err: any) {
      if (err.message.includes("GEMINI_API_KEY is not set")) {
        return res.status(503).json({ error: "AI capabilities are not configured (Missing Gemini API Key)." });
      }
      return res.status(500).json({ error: err.message });
    }
  }
}
