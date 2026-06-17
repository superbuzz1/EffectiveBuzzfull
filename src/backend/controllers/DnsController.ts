// src/backend/controllers/DnsController.ts
import { Request, Response } from 'express';
import { DnsService } from '../services/DnsService';
import { DatabaseClient } from '../services/PrismaService';
import { AuthenticatedUserRequest } from '../middleware/authMiddleware';

export class DnsController {
  /**
   * GET /api/v2/dns/required-records?domain=...
   * Returns the DNS records the user needs to add to their domain.
   */
  public static async getRequiredRecords(req: Request, res: Response) {
    const { domain } = req.query;
    if (!domain || typeof domain !== 'string') {
      return res.status(400).json({ error: "Missing required query parameter: domain" });
    }

    const records = DnsService.getRequiredRecords(domain);
    return res.json({ domain, records });
  }

  /**
   * POST /api/v2/dns/verify
   * Triggers a live DNS check and updates the database status.
   */
  public static async verifyDomain(req: Request, res: Response) {
    const authedReq = req as AuthenticatedUserRequest;
    if (!authedReq.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { domain } = req.body;
    if (!domain || typeof domain !== 'string') {
      return res.status(400).json({ error: "Missing required body parameter: domain" });
    }

    const tenantId = authedReq.user.tenantId;

    try {
      // 1. Perform live DNS check
      const verification = await DnsService.verifyDomain(domain);
      
      const isFullyVerified = verification.isSpfValid && verification.isDkimValid && verification.isDmarcValid;
      const status = isFullyVerified ? 'verified' : (verification.isSpfValid || verification.isDkimValid || verification.isDmarcValid ? 'partial' : 'failed');

      // 2. Persist/Update in database
      // Since we updated PrismaService to handle real Prisma, we should use DatabaseClient methods.
      // I'll add the necessary methods to DatabaseClient if they don't exist.
      
      const dbRecord = await (DatabaseClient as any).upsertVerifiedDomain(tenantId, {
        domain,
        isSpfValid: verification.isSpfValid,
        isDkimValid: verification.isDkimValid,
        isDmarcValid: verification.isDmarcValid,
        status,
        lastCheckedAt: new Date()
      });

      return res.json({
        success: true,
        verification,
        status,
        dbRecord
      });
    } catch (err: any) {
      console.error(`[DNS_CONTROLLER_ERROR] Failed to verify domain ${domain}:`, err);
      return res.status(500).json({ error: `Verification engine failure: ${err.message}` });
    }
  }

  /**
   * GET /api/v2/dns/list
   * Lists all domains for the current tenant.
   */
  public static async listDomains(req: Request, res: Response) {
    const authedReq = req as AuthenticatedUserRequest;
    if (!authedReq.user) return res.status(401).json({ error: "Unauthorized" });

    try {
      const domains = await (DatabaseClient as any).listVerifiedDomains(authedReq.user.tenantId);
      return res.json({ success: true, domains });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
