// src/backend/controllers/CompanyController.ts
import { Response, Request } from 'express';
import { AuthenticatedUserRequest } from '../middleware/authMiddleware';
import { CompanyService } from '../services/CompanyService';

export class CompanyController {

  public static async listCompanies(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const tenantId = authReq.user!.tenantId;

      const { search, status, industry, includeDeleted } = req.query;

      const companies = await CompanyService.listCompanies(tenantId, {
        search: search as string,
        status: status as string,
        industry: industry as string,
        includeDeleted: includeDeleted === 'true'
      });

      return res.json({ companies });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Failed to query company records ledger." });
    }
  }

  public static async createCompany(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const company = await CompanyService.createCompany(tenantId, userId, req.body, ipAddress, userAgent);

      return res.status(201).json({
        message: "New company workspace profile generated successfully.",
        company
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Could not generate company workspace profile." });
    }
  }

  public static async updateCompany(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const id = req.params.id;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const company = await CompanyService.updateCompany(tenantId, id, userId, req.body, ipAddress, userAgent);

      return res.json({
        message: "Company profile has been successfully modified.",
        company
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Could not edit company profile details." });
    }
  }

  public static async addCompanyNote(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const id = req.params.id;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;
      const { content } = req.body;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const note = await CompanyService.addCompanyNote(tenantId, id, userId, content, ipAddress, userAgent);

      return res.json({
        message: "Engagement touchpoint details appended.",
        note
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Could not append discussion touchpoint details." });
    }
  }

  public static async deleteCompany(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const id = req.params.id;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      await CompanyService.deleteCompany(tenantId, id, userId, ipAddress, userAgent);

      return res.json({
        message: "Company record has been safely soft-deleted and archived."
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Could not process soft deletion." });
    }
  }

  public static async restoreCompany(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const id = req.params.id;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const company = await CompanyService.restoreCompany(tenantId, id, userId, ipAddress, userAgent);

      return res.json({
        message: "Company resurrected from archiving system.",
        company
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Could not restore company profile." });
    }
  }

  public static async importCompaniesCSV(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;
      const { csvContent } = req.body;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const result = await CompanyService.importCompaniesCSV(tenantId, userId, csvContent, ipAddress, userAgent);

      return res.status(201).json({
        message: `Successfully processed CSV file. Created ${result.count} company workspace records.`,
        count: result.count,
        companies: result.companies
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "CSV processing failed." });
    }
  }

  public static async listIndustries(req: Request, res: Response) {
    try {
      const industries = await CompanyService.listIndustries();
      return res.json({ industries });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Could not retrieve industry indices." });
    }
  }
}
