import { Request, Response } from 'express';
import { AIQualificationService } from '../services/AIQualificationService';

export class AIQualificationController {
  
  public static async qualifyBANT(req: Request, res: Response) {
    try {
      const { dealContext } = req.body;
      if (!dealContext) return res.status(400).json({ error: "dealContext is required" });

      const data = await AIQualificationService.qualifyBANT(dealContext);
      return res.json({ success: true, data });
    } catch (err: any) {
      if (err.message.includes("GEMINI_API_KEY is not set")) {
        return res.status(503).json({ error: "AI capabilities are not configured (Missing Gemini API Key)." });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  public static async qualifyMEDDIC(req: Request, res: Response) {
    try {
      const { dealContext } = req.body;
      if (!dealContext) return res.status(400).json({ error: "dealContext is required" });

      const data = await AIQualificationService.qualifyMEDDIC(dealContext);
      return res.json({ success: true, data });
    } catch (err: any) {
      if (err.message.includes("GEMINI_API_KEY is not set")) {
        return res.status(503).json({ error: "AI capabilities are not configured (Missing Gemini API Key)." });
      }
      return res.status(500).json({ error: err.message });
    }
  }
}
