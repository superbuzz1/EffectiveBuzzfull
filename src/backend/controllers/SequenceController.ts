import { Request, Response } from 'express';
import { SequenceService } from '../services/SequenceService';

export class SequenceController {

  public static async createTemplate(req: Request, res: Response) {
    try {
      const { name, subject, body } = req.body;
      const tenantId = (req as any).user.tenantId;
      const userId = (req as any).user.id;
      const ipAddress = req.ip || 'unknown';
      const userAgent = (req.headers['user-agent']) || 'unknown';

      if (!name || !body) {
        return res.status(400).json({ error: "Template must include name and body" });
      }

      const template = await SequenceService.createTemplate(tenantId, name, subject || '', body, userId, ipAddress, userAgent);
      return res.status(201).json({ success: true, data: template });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  public static async getTemplates(req: Request, res: Response) {
    try {
      const tenantId = (req as any).user.tenantId;
      const templates = await SequenceService.getTemplates(tenantId);
      return res.json({ success: true, data: templates });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async createSequence(req: Request, res: Response) {
    try {
      const { name, isActive, steps } = req.body;
      const tenantId = (req as any).user.tenantId;
      const userId = (req as any).user.id;
      const ipAddress = req.ip || 'unknown';
      const userAgent = (req.headers['user-agent']) || 'unknown';

      if (!steps || !Array.isArray(steps)) {
        return res.status(400).json({ error: "Sequence must contain an array of steps" });
      }

      const sequence = await SequenceService.createSequence(tenantId, name, isActive, steps, userId, ipAddress, userAgent);
      return res.status(201).json({ success: true, data: sequence });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  public static async getSequences(req: Request, res: Response) {
    try {
      const tenantId = (req as any).user.tenantId;
      const sequences = await SequenceService.getSequences(tenantId);
      return res.json({ success: true, data: sequences });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getSequence(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tenantId = (req as any).user.tenantId;
      const sequence = await SequenceService.getSequence(tenantId, id);
      if (!sequence) return res.status(404).json({ error: "Sequence not found" });
      return res.json({ success: true, data: sequence });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async updateSequence(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, isActive, steps } = req.body;
      const tenantId = (req as any).user.tenantId;
      const userId = (req as any).user.id;
      const ipAddress = req.ip || 'unknown';
      const userAgent = (req.headers['user-agent']) || 'unknown';

      const sequence = await SequenceService.updateSequence(tenantId, id, name, isActive, steps, userId, ipAddress, userAgent);
      return res.json({ success: true, data: sequence });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  public static async deleteSequence(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tenantId = (req as any).user.tenantId;
      const userId = (req as any).user.id;
      const ipAddress = req.ip || 'unknown';
      const userAgent = (req.headers['user-agent']) || 'unknown';

      await SequenceService.deleteSequence(tenantId, id, userId, ipAddress, userAgent);
      return res.json({ success: true, message: "Sequence deleted" });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  public static async addVariantToStep(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { variant_label, distribution_percentage, template_subject, template_body } = req.body;
      const variant = await SequenceService.addVariantToStep(id, variant_label, distribution_percentage || 50, template_subject, template_body);
      return res.status(201).json({ success: true, data: variant });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  public static async updateStepCondition(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { condition_metric, condition_operator, condition_value, true_next_step_id, false_next_step_id } = req.body;
      const step = await SequenceService.updateStepCondition(id, condition_metric, condition_operator, condition_value, true_next_step_id, false_next_step_id);
      return res.json({ success: true, data: step });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
