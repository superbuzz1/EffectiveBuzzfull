// src/backend/controllers/UserController.ts
import { Response, Request } from 'express';
import { ZodError } from 'zod';
import { UserService } from '../services/UserService';
import { AuthenticatedUserRequest } from '../middleware/authMiddleware';
import { UpdateProfileSchema, UpdatePreferencesSchema, UpdateTeammateRoleSchema } from '../validation/userValidation';

export class UserController {
  
  public static async getProfile(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const userId = authReq.user!.id;

      const profile = await UserService.getUserProfile(userId);
      return res.json({ profile });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Failed to fetch user profile." });
    }
  }

  public static async updateProfile(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;

      const body = UpdateProfileSchema.parse(req.body);
      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const profile = await UserService.updateUserProfile(userId, tenantId, body, ipAddress, userAgent);
      return res.json({ 
        message: "Your profile has been synchronized successfully.",
        profile 
      });
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.issues[0]?.message || "Validation constraint error." });
      }
      return res.status(400).json({ error: err.message || "Profile update failed." });
    }
  }

  public static async getPreferences(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const userId = authReq.user!.id;

      const preferences = await UserService.getUserPreferences(userId);
      return res.json({ preferences });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Failed to fetch preferences." });
    }
  }

  public static async updatePreferences(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;

      const body = UpdatePreferencesSchema.parse(req.body);
      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const preferences = await UserService.updateUserPreferences(userId, tenantId, body, ipAddress, userAgent);
      return res.json({ 
        message: "Your options and preferences have been persisted.",
        preferences 
      });
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.issues[0]?.message || "Validation constraint error." });
      }
      return res.status(400).json({ error: err.message || "Preferences update failed." });
    }
  }

  public static async getActivity(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const userId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;
      const targetUserId = req.params.userId || userId; // Default to self

      const activities = await UserService.getUserActivity(userId, tenantId, targetUserId);
      return res.json({ activities });
    } catch (err: any) {
      return res.status(403).json({ error: err.message || "Access denied or activity readout failed." });
    }
  }

  public static async listTeam(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const actorId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;

      const team = await UserService.listTenantTeam(tenantId, actorId);
      return res.json({ team });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Failed to list tenant users." });
    }
  }

  public static async updateTeammateRole(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const actorId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;
      const targetUserId = req.params.userId;

      const body = UpdateTeammateRoleSchema.parse(req.body);
      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      const updatedUser = await UserService.updateTeammateRole(tenantId, actorId, targetUserId, body.role, ipAddress, userAgent);
      return res.json({ 
        message: "Teammate permission level successfully modified.",
        user: { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role }
      });
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.issues[0]?.message || "Validation constraint error." });
      }
      return res.status(400).json({ error: err.message || "Teammate role update failed." });
    }
  }

  public static async evictTeammate(req: Request, res: Response) {
    try {
      const authReq = req as AuthenticatedUserRequest;
      const actorId = authReq.user!.id;
      const tenantId = authReq.user!.tenantId;
      const targetUserId = req.params.userId;

      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || "127.0.0.1";
      const userAgent = req.headers['user-agent'] || "unidentified-client";

      await UserService.evictTeammate(tenantId, actorId, targetUserId, ipAddress, userAgent);
      return res.json({ message: "Teammate successfully removed from the corporate subscriber directories." });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Teammate eviction failed." });
    }
  }
}
