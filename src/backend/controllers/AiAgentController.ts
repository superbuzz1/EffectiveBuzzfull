import { Request, Response } from 'express';
import { AiAgentService } from '../services/AiAgentService';

export class AiAgentController {
  public static async createAgent(req: Request, res: Response) {
    try {
      // Use req.user.workspaceId or default to the first workspace if not set (for standalone logic)
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      if (!workspaceId) {
        return res.status(400).json({ error: 'Workspace ID required' });
      }

      const { name, persona, voice, model, settings } = req.body;
      const agent = await AiAgentService.createAgent(workspaceId, name, persona, voice, model, settings);
      return res.status(201).json({ success: true, data: agent });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  public static async getAgents(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      if (!workspaceId) {
        return res.status(400).json({ error: 'Workspace ID required' });
      }

      const agents = await AiAgentService.getAgents(workspaceId);
      return res.json({ success: true, data: agents });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getAgent(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const { id } = req.params;

      const agent = await AiAgentService.getAgent(workspaceId, id);
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }
      return res.json({ success: true, data: agent });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async updateAgent(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const { id } = req.params;
      const { name, persona, voice, model, settings } = req.body;

      // Verify it belongs to workspace
      const agentCheck = await AiAgentService.getAgent(workspaceId, id);
      if (!agentCheck) return res.status(404).json({ error: 'Agent not found' });

      const agent = await AiAgentService.updateAgent(workspaceId, id, { name, persona, voice, model, settings });
      return res.json({ success: true, data: agent });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  public static async deleteAgent(req: Request, res: Response) {
    try {
      const workspaceId = (req as any).user?.workspaceId || (req as any).user?.tenantId;
      const { id } = req.params;

      const agentCheck = await AiAgentService.getAgent(workspaceId, id);
      if (!agentCheck) return res.status(404).json({ error: 'Agent not found' });

      await AiAgentService.deleteAgent(workspaceId, id);
      return res.json({ success: true, message: 'Agent deleted' });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
