import { Request, Response } from 'express';
import { WorkflowService } from '../services/WorkflowService';

export class WorkflowController {
  public static async getWorkflows(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const data = await WorkflowService.getWorkflows(workspaceId);
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async createWorkflow(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const data = await WorkflowService.createWorkflow(workspaceId, req.body);
      return res.status(201).json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async updateWorkflow(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const { id } = req.params;
      const data = await WorkflowService.updateWorkflow(id, workspaceId, req.body);
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async toggleWorkflow(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const { id } = req.params;
      const { isActive } = req.body;
      const data = await WorkflowService.toggleWorkflow(id, workspaceId, isActive);
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async deleteWorkflow(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const { id } = req.params;
      await WorkflowService.deleteWorkflow(id, workspaceId);
      return res.json({ success: true, message: 'Deleted' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getWorkflowExecutions(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await WorkflowService.getWorkflowExecutions(id);
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
