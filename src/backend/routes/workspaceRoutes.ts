// src/backend/routes/workspaceRoutes.ts
import { Router } from 'express';
import { WorkspaceController } from '../controllers/WorkspaceController';
import { authenticateAccessToken } from '../middleware/authMiddleware';

const router = Router();

// Apply auth session validation globally to all workspace routes
router.use(authenticateAccessToken);

// Workspace lifecycle routes
router.get('/', WorkspaceController.listWorkspaces);
router.post('/', WorkspaceController.createWorkspace);

router.get('/:workspaceId', WorkspaceController.getWorkspace);
router.put('/:workspaceId', WorkspaceController.updateWorkspace);
router.delete('/:workspaceId', WorkspaceController.deleteWorkspace);

// Team membership invitations mapping
router.post('/:workspaceId/invitations', WorkspaceController.inviteTeamMember);
router.delete('/:workspaceId/invitations/:invitationId', WorkspaceController.deleteInvitation);

// Team member management mapping
router.delete('/:workspaceId/members/:targetUserId', WorkspaceController.removeTeamMember);
router.put('/:workspaceId/members/:targetUserId/role', WorkspaceController.assignMemberRole);

// Invite completion flow
router.post('/invitations/accept', WorkspaceController.acceptWorkspaceInvite);

export default router;
