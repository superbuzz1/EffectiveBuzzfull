// src/backend/controllers/WorkspaceController.ts
import { Response } from 'express';
import { AuthenticatedUserRequest } from '../middleware/authMiddleware';
import { WorkspaceService } from '../services/WorkspaceService';
import { 
  CreateWorkspaceSchema, 
  UpdateWorkspaceSchema, 
  InviteMemberSchema, 
  UpdateRoleSchema 
} from '../validation/workspaceValidation';
import { ZodError } from 'zod';

export class WorkspaceController {
  
  public static async listWorkspaces(req: AuthenticatedUserRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "Unauthorized session registry lookup." });

      const list = await WorkspaceService.listWorkspaces(user.tenantId);
      return res.status(200).json({ workspaces: list });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || "Internal workspace collection failure." });
    }
  }

  public static async getWorkspace(req: AuthenticatedUserRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "Unauthorized session registry lookup." });

      const { workspaceId } = req.params;
      const workspace = await WorkspaceService.getWorkspace(workspaceId, user.id, user.tenantId);
      return res.status(200).json({ workspace });
    } catch (err: any) {
      const status = err.message.includes('Access Denied') ? 403 : 404;
      return res.status(status).json({ error: err.message || "Failed to retrieve workspace metrics." });
    }
  }

  public static async createWorkspace(req: AuthenticatedUserRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "Unauthorized session registry lookup." });

      // Validate schema input
      const payload = CreateWorkspaceSchema.parse(req.body);

      const ip = (req.ip || req.socket.remoteAddress || '127.0.0.1').toString();
      const ua = req.headers['user-agent'] || 'Swagger Engine';

      const ws = await WorkspaceService.createWorkspace(
        user.tenantId, 
        payload.name, 
        payload.slug, 
        user.id,
        ip,
        ua
      );

      return res.status(201).json({ 
        message: "SaaS Workspace successfully structured.", 
        workspace: ws 
      });
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.issues[0]?.message || "Validation constraint error." });
      }
      return res.status(400).json({ error: err.message || "Workspace creation exception caught." });
    }
  }

  public static async updateWorkspace(req: AuthenticatedUserRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "Unauthorized session registry lookup." });

      const { workspaceId } = req.params;
      const payload = UpdateWorkspaceSchema.parse(req.body);

      const ip = (req.ip || req.socket.remoteAddress || '127.0.0.1').toString();
      const ua = req.headers['user-agent'] || 'Swagger Engine';

      const updated = await WorkspaceService.updateWorkspace(
        workspaceId,
        user.id,
        user.tenantId,
        payload,
        ip,
        ua
      );

      return res.status(200).json({ 
        message: "SaaS Workspace successfully updated.", 
        workspace: updated 
      });
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.issues[0]?.message || "Validation constraint error." });
      }
      const status = err.message.includes('Unauthorized') ? 403 : 400;
      return res.status(status).json({ error: err.message || "Workspace update process crashed." });
    }
  }

  public static async deleteWorkspace(req: AuthenticatedUserRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "Unauthorized session registry lookup." });

      const { workspaceId } = req.params;

      const ip = (req.ip || req.socket.remoteAddress || '127.0.0.1').toString();
      const ua = req.headers['user-agent'] || 'Swagger Engine';

      await WorkspaceService.deleteWorkspace(workspaceId, user.id, user.tenantId, ip, ua);

      return res.status(200).json({ 
        message: "SaaS Workspace permanently severed from database registries." 
      });
    } catch (err: any) {
      const status = err.message.includes('Unauthorized') ? 403 : 400;
      return res.status(status).json({ error: err.message || "Workspace dissolution failure." });
    }
  }

  public static async inviteTeamMember(req: AuthenticatedUserRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "Unauthorized session registry lookup." });

      const { workspaceId } = req.params;
      const payload = InviteMemberSchema.parse(req.body);

      const ip = (req.ip || req.socket.remoteAddress || '127.0.0.1').toString();
      const ua = req.headers['user-agent'] || 'Swagger Engine';

      const invitation = await WorkspaceService.inviteTeamMember(
        workspaceId,
        user.id,
        user.tenantId,
        payload.email,
        payload.role,
        ip,
        ua
      );

      return res.status(201).json({ 
        message: "Team membership invitation generated successfully.", 
        invitation 
      });
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.issues[0]?.message || "Validation constraint error." });
      }
      const status = err.message.includes('Unauthorized') ? 403 : 400;
      return res.status(status).json({ error: err.message || "Invitation generation crashed." });
    }
  }

  public static async removeTeamMember(req: AuthenticatedUserRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "Unauthorized session registry lookup." });

      const { workspaceId, targetUserId } = req.params;

      const ip = (req.ip || req.socket.remoteAddress || '127.0.0.1').toString();
      const ua = req.headers['user-agent'] || 'Swagger Engine';

      await WorkspaceService.removeTeamMember(workspaceId, user.id, user.tenantId, targetUserId, ip, ua);

      return res.status(200).json({ 
        message: "Workspace membership successfully revoked." 
      });
    } catch (err: any) {
      const status = err.message.includes('Unauthorized') ? 403 : 400;
      return res.status(status).json({ error: err.message || "Membership eviction failed." });
    }
  }

  public static async assignMemberRole(req: AuthenticatedUserRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "Unauthorized session registry lookup." });

      const { workspaceId, targetUserId } = req.params;
      const payload = UpdateRoleSchema.parse(req.body);

      const ip = (req.ip || req.socket.remoteAddress || '127.0.0.1').toString();
      const ua = req.headers['user-agent'] || 'Swagger Engine';

      const updated = await WorkspaceService.assignMemberRole(
        workspaceId,
        user.id,
        user.tenantId,
        targetUserId,
        payload.role,
        ip,
        ua
      );

      return res.status(200).json({ 
        message: "Workspace member role assigned successfully.", 
        membership: updated 
      });
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.issues[0]?.message || "Validation constraint error." });
      }
      const status = err.message.includes('Unauthorized') ? 403 : 400;
      return res.status(status).json({ error: err.message || "Failed to alter member authorization." });
    }
  }

  public static async acceptWorkspaceInvite(req: AuthenticatedUserRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "Unauthorized session registry lookup." });

      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ error: "Invitation lookup token is required." });
      }

      const ip = (req.ip || req.socket.remoteAddress || '127.0.0.1').toString();
      const ua = req.headers['user-agent'] || 'Swagger Engine';

      const membership = await WorkspaceService.acceptWorkspaceInvite(token, user.id, ip, ua);

      return res.status(200).json({ 
        message: "Successfully entered the target workspace network.", 
        membership 
      });
    } catch (err: any) {
      const status = err.message.includes('security barrier') ? 403 : 400;
      return res.status(status).json({ error: err.message || "Invitation acceptance process crashed." });
    }
  }

  public static async deleteInvitation(req: AuthenticatedUserRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "Unauthorized session registry lookup." });

      const { workspaceId, invitationId } = req.params;

      const ip = (req.ip || req.socket.remoteAddress || '127.0.0.1').toString();
      const ua = req.headers['user-agent'] || 'Swagger Engine';

      await WorkspaceService.deleteInvitation(workspaceId, user.id, user.tenantId, invitationId, ip, ua);

      return res.status(200).json({ 
        message: "Workspace invite cancelled successfully." 
      });
    } catch (err: any) {
      const status = err.message.includes('Unauthorized') ? 403 : 400;
      return res.status(status).json({ error: err.message || "Failed to cancel workspace invitation." });
    }
  }
}
