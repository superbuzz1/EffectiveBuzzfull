import { Request, Response } from 'express';
import { AIReplyAnalysisService } from '../services/AIReplyAnalysisService';

export class AIReplyAnalysisController {
  
  public static async analyzeReply(req: Request, res: Response) {
    try {
      const { replyBody, previousContext } = req.body;
      if (!replyBody) return res.status(400).json({ error: "replyBody is required" });

      const data = await AIReplyAnalysisService.analyzeReply(replyBody, previousContext);
      return res.json({ success: true, data });
    } catch (err: any) {
      if (err.message.includes("GEMINI_API_KEY is not set")) {
        return res.status(503).json({ error: "AI capabilities are not configured (Missing Gemini API Key)." });
      }
      return res.status(500).json({ error: err.message });
    }
  }
}
