// src/backend/controllers/ProspectController.ts
import { Response, Request } from 'express';
import { AuthenticatedUserRequest } from '../middleware/authMiddleware';
import { ProspectService } from '../services/ProspectService';

export class ProspectController {

  public static async listProspects(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const tenantId = authReq.user!.tenantId;

      const { search, status, tag, includeDeleted } = req.query;

      const prospects = await ProspectService.listProspects(tenantId, {
        search: search as string,
        status: status as string,
        tag: tag as string,
        includeDeleted: includeDeleted === 'true'
      });

      return res.json({ prospects });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Failed to query prospects ledger." });
    }
  }

  public static async createProspect(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const prospect = await ProspectService.createProspect(tenantId, userId, req.body, ipAddress, userAgent);

      return res.status(201).json({
        message: "Prospect record generated successfully.",
        prospect
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Could not generate prospect entry." });
    }
  }

  public static async updateProspect(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const id = req.params.id;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const prospect = await ProspectService.updateProspect(tenantId, id, userId, req.body, ipAddress, userAgent);

      return res.json({
        message: "Prospect record successfully updated.",
        prospect
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Could not update prospect ledger." });
    }
  }

  public static async addProspectNote(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const prospectId = req.params.id;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;
      const { content } = req.body;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const note = await ProspectService.addProspectNote(tenantId, prospectId, userId, content, ipAddress, userAgent);

      return res.json({
        message: "Note successfully appended.",
        note
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Could not append client note." });
    }
  }

  public static async deleteProspect(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const id = req.params.id;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      await ProspectService.deleteProspect(tenantId, id, userId, ipAddress, userAgent);

      return res.json({
        message: "Prospect has been soft-deleted and archived successfully."
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Could not soft-delete prospect." });
    }
  }

  public static async restoreProspect(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const id = req.params.id;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const prospect = await ProspectService.restoreProspect(tenantId, id, userId, ipAddress, userAgent);

      return res.json({
        message: "Prospect successfully revived to the roster.",
        prospect
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Could not restore prospect catalog." });
    }
  }

  public static async importProspectsCSV(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;
      const { csvContent } = req.body;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const result = await ProspectService.importProspectsCSV(tenantId, userId, csvContent, ipAddress, userAgent);

      return res.status(201).json({
        message: `Successfully processed CSV. Added ${result.count} prospect accounts.`,
        count: result.count,
        prospects: result.prospects
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "CSV processing failed." });
    }
  }

  public static async importProspectsBulk(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;
      const { prospects } = req.body;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const result = await ProspectService.bulkCreate(tenantId, userId, prospects, ipAddress, userAgent);

      return res.status(201).json({
        message: `Successful bulk import operation: Created ${result.count} entries.`,
        count: result.count,
        prospects: result.prospects
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Bulk import failed." });
    }
  }
}
