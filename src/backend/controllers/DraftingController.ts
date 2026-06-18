// src/backend/controllers/DraftingController.ts
import { Request, Response } from 'express';
import { DraftingService } from '../services/DraftingService';
import { QualityGuardrailService } from '../services/QualityGuardrailService';
import { DatabaseClient } from '../services/PrismaService';
import { AuthenticatedUserRequest } from '../middleware/authMiddleware';

export class DraftingController {
  /**
   * POST /api/v2/drafting/generate
   * Generates a single draft for a specific campaign target.
   */
  public static async generateSingleDraft(req: Request, res: Response) {
    const authedReq = req as AuthenticatedUserRequest;
    if (!authedReq.user) return res.status(401).json({ error: "Unauthorized" });

    const { targetId, userContext } = req.body;
    if (!targetId) return res.status(400).json({ error: "Missing targetId" });

    try {
      // 1. Fetch full target context
      const target = await (DatabaseClient as any).findCampaignTargetById(targetId);
      if (!target) return res.status(404).json({ error: "Target not found" });

      // 2. Generate Draft
      const draft = await DraftingService.generateDraft({
        contact: target.contact,
        company: target.contact.company,
        campaign: target.campaign,
        step: target.campaign.sequence.steps[target.currentStep] || {},
        userContext
      });

      // 3. Run Quality Checks
      const quality = QualityGuardrailService.analyzeDraft(draft.subject, draft.body);

      // 4. Upsert into database
      const dbDraft = await (DatabaseClient as any).upsertPersonalizedDraft(targetId, {
        subject: draft.subject,
        body: draft.body,
        spamScore: quality.spamScore,
        clicheMatches: quality.clicheMatches,
        status: 'pending_review'
      });

      return res.json({ success: true, draft: dbDraft });
    } catch (err: any) {
      console.error("[DRAFTING_CONTROLLER_ERROR]", err);
      return res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /api/v2/drafting/bulk-generate
   * Generates up to 50 drafts for a campaign.
   */
  public static async generateBulkDrafts(req: Request, res: Response) {
    const authedReq = req as AuthenticatedUserRequest;
    if (!authedReq.user) return res.status(401).json({ error: "Unauthorized" });

    const { campaignId, limit = 50 } = req.body;
    if (!campaignId) return res.status(400).json({ error: "Missing campaignId" });

    try {
      // 1. Fetch targets that don't have drafts yet
      const targets = await (DatabaseClient as any).listCampaignTargetsPendingDrafts(campaignId, limit);
      if (targets.length === 0) return res.json({ success: true, message: "No targets pending drafts.", drafts: [] });

      // 2. Fetch Campaign & Step context
      const campaign = targets[0].campaign;
      const step = campaign.sequence.steps[0] || {}; 

      // 3. Generate in parallel
      const results = await DraftingService.generateBulkDrafts(targets, campaign, step);

      // 4. Save with quality reports
      const savedDrafts = [];
      for (const res of results) {
        if (!res.error) {
          const quality = QualityGuardrailService.analyzeDraft(res.subject, res.body);
          const dbDraft = await (DatabaseClient as any).upsertPersonalizedDraft(res.targetId, {
            subject: res.subject,
            body: res.body,
            spamScore: quality.spamScore,
            clicheMatches: quality.clicheMatches,
            status: 'pending_review'
          });
          savedDrafts.push(dbDraft);
        }
      }

      return res.json({ 
        success: true, 
        count: savedDrafts.length, 
        drafts: savedDrafts,
        errors: results.filter(r => r.error).length
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /api/v2/drafting/list
   * Lists drafts for review.
   */
  public static async listDrafts(req: Request, res: Response) {
    const authedReq = req as AuthenticatedUserRequest;
    if (!authedReq.user) return res.status(401).json({ error: "Unauthorized" });

    const { status = 'pending_review' } = req.query;

    try {
      const drafts = await (DatabaseClient as any).listPersonalizedDrafts(authedReq.user.tenantId, status as string);
      return res.json({ success: true, drafts });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /api/v2/drafting/review
   * Updates the status of a draft (approved/rejected).
   */
  public static async reviewDraft(req: Request, res: Response) {
    const { draftId, status, feedback, subject, body } = req.body;
    if (!draftId || !status) return res.status(400).json({ error: "Missing draftId or status" });

    try {
      // 1. Fetch original draft to calculate edit delta if approved
      const originalDraft = await (DatabaseClient as any).findPersonalizedDraftById(draftId);
      if (!originalDraft) return res.status(404).json({ error: "Draft not found" });

      let editDelta = 0;
      if (status === 'approved' && body) {
        editDelta = QualityGuardrailService.calculateEditDelta(originalDraft.body, body);
      }

      const updated = await (DatabaseClient as any).updatePersonalizedDraftStatus(draftId, {
        status,
        feedback,
        subject,
        body,
        editDelta,
        humanVersion: body // Track what the human actually sent
      });

      return res.json({ success: true, draft: updated });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
