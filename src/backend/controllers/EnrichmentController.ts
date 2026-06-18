// src/backend/controllers/EnrichmentController.ts
import { Request, Response } from 'express';
import { ScraperService } from '../services/ScraperService';
import { DatabaseClient } from '../services/PrismaService';
import { AuthenticatedUserRequest } from '../middleware/authMiddleware';

export class EnrichmentController {
  /**
   * POST /api/v2/enrichment/company
   * Scrapes and enriches a company profile.
   */
  public static async enrichCompany(req: Request, res: Response) {
    const authedReq = req as AuthenticatedUserRequest;
    if (!authedReq.user) return res.status(401).json({ error: "Unauthorized" });

    const { companyId } = req.body;
    if (!companyId) return res.status(400).json({ error: "Missing companyId" });

    try {
      // 1. Fetch company
      const company = await (DatabaseClient as any).findCompanyContext(companyId);
      if (!company) return res.status(404).json({ error: "Company not found" });
      if (!company.domain) return res.status(400).json({ error: "Company missing domain for scraping" });

      // 2. Run Scraper
      const enrichedData = await ScraperService.scrapeDomain(company.domain);

      // 3. Persist
      const updated = await (DatabaseClient as any).updateCompanyEnrichment(companyId, enrichedData);

      return res.json({ success: true, company: updated });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
