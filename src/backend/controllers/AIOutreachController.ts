import { Request, Response } from 'express';
import { AIOutreachService } from '../services/AIOutreachService';

export class AIOutreachController {
  
  public static async generateColdEmail(req: Request, res: Response) {
    try {
      const { prospect, company, sender, valueProposition } = req.body;
      if (!valueProposition) return res.status(400).json({ error: "valueProposition is required" });

      const data = await AIOutreachService.generateColdEmail(prospect || {}, company || {}, sender || {}, valueProposition);
      return res.json({ success: true, data });
    } catch (err: any) {
      if (err.message.includes("GEMINI_API_KEY is not set")) {
        return res.status(503).json({ error: "AI capabilities are not configured (Missing Gemini API Key)." });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  public static async generateFollowUp(req: Request, res: Response) {
    try {
      const { previousEmail, daysSinceLastContact, additionalContext } = req.body;
      if (!previousEmail) return res.status(400).json({ error: "previousEmail is required" });

      const data = await AIOutreachService.generateFollowUp(previousEmail, daysSinceLastContact || 3, additionalContext);
      return res.json({ success: true, data });
    } catch (err: any) {
      if (err.message.includes("GEMINI_API_KEY is not set")) {
        return res.status(503).json({ error: "AI capabilities are not configured (Missing Gemini API Key)." });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  public static async generateLinkedInMessage(req: Request, res: Response) {
    try {
      const { prospect, sender, valueProposition } = req.body;
      if (!valueProposition) return res.status(400).json({ error: "valueProposition is required" });

      const data = await AIOutreachService.generateLinkedInMessage(prospect || {}, sender || {}, valueProposition);
      return res.json({ success: true, data });
    } catch (err: any) {
      if (err.message.includes("GEMINI_API_KEY is not set")) {
        return res.status(503).json({ error: "AI capabilities are not configured (Missing Gemini API Key)." });
      }
      return res.status(500).json({ error: err.message });
    }
  }
}
