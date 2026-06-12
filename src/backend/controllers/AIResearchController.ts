import { Request, Response } from 'express';
import { AIResearchService } from '../services/AIResearchService';

export class AIResearchController {
  
  public static async researchCompany(req: Request, res: Response) {
    try {
      const { companyName } = req.body;
      if (!companyName) return res.status(400).json({ error: "companyName is required" });

      const data = await AIResearchService.researchCompany(companyName);
      return res.json({ success: true, data });
    } catch (err: any) {
      if (err.message.includes("GEMINI_API_KEY is not set")) {
        return res.status(503).json({ error: "AI capabilities are not configured (Missing Gemini API Key)." });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  public static async researchProspect(req: Request, res: Response) {
    try {
      const { prospectName, companyName } = req.body;
      if (!prospectName) return res.status(400).json({ error: "prospectName is required" });

      const data = await AIResearchService.researchProspect(prospectName, companyName);
      return res.json({ success: true, data });
    } catch (err: any) {
      if (err.message.includes("GEMINI_API_KEY is not set")) {
        return res.status(503).json({ error: "AI capabilities are not configured (Missing Gemini API Key)." });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  public static async researchIndustry(req: Request, res: Response) {
    try {
      const { industryName } = req.body;
      if (!industryName) return res.status(400).json({ error: "industryName is required" });

      const data = await AIResearchService.researchIndustry(industryName);
      return res.json({ success: true, data });
    } catch (err: any) {
      if (err.message.includes("GEMINI_API_KEY is not set")) {
        return res.status(503).json({ error: "AI capabilities are not configured (Missing Gemini API Key)." });
      }
      return res.status(500).json({ error: err.message });
    }
  }
}
