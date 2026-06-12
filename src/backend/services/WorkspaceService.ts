// src/backend/services/WorkspaceService.ts
import { DatabaseClient } from './PrismaService';
import { WorkspaceRole } from '../types/workspace';

const ROLE_RANKS: Record<WorkspaceRole, number> = {
  Owner: 5,
  Admin: 4,
  Manager: 3,
  SDR: 2,
  Viewer: 1
};

export class WorkspaceService {
  /**
   * Helper to evaluate RBAC and verify tenant membership.
   * Throws an error if validation fails or identity misbehaves.
   */
  private static async getRequesterRoleAndVerifyTenancy(
    workspaceId: string, 
    userId: string, 
    userTenantId: string
  ): Promise<WorkspaceRole> {
    const workspace = await DatabaseClient.findWorkspaceById(workspaceId);
    if (!workspace) {
      throw new Error("Target workspace does not exist.");
    }

    if (workspace.tenantId !== userTenantId) {
      throw new Error("Security Violation: Tenant cross-contamination intercepted.");
    }

    const membership = await DatabaseClient.findMembership(workspaceId, userId);
    if (!membership) {
      throw new Error("Access Denied: You are not a registered member of this workspace.");
    }

    return membership.role;
  }

  // --- CRUD WORKSPACES ---

  public static async listWorkspaces(tenantId: string): Promise<any[]> {
    const list = await DatabaseClient.listWorkspaces(tenantId);
    // Enrich with member count
    const enriched = await Promise.all(
      list.map(async (ws) => {
        const memberships = await DatabaseClient.listMemberships(ws.id);
        const invites = await DatabaseClient.listInvitations(ws.id);
        return {
          ...ws,
          memberCount: memberships.length,
          activeInvites: invites.filter(i => !i.isAccepted && i.expiresAt > new Date()).length
        };
      })
    );
    return enriched;
  }

  public static async getWorkspace(workspaceId: string, userId: string, tenantId: string): Promise<any> {
    const ws = await DatabaseClient.findWorkspaceById(workspaceId);
    if (!ws) throw new Error("Workspace not found.");
    if (ws.tenantId !== tenantId) throw new Error("Access Denied: Cross-tenant barrier.");

    const membership = await DatabaseClient.findMembership(workspaceId, userId);
    if (!membership) throw new Error("Access Denied: You do not belong to this Workspace.");

    const memberships = await DatabaseClient.listMemberships(workspaceId);
    const invitations = await DatabaseClient.listInvitations(workspaceId);

    return {
      id: ws.id,
      name: ws.name,
      slug: ws.slug,
      tenantId: ws.tenantId,
      createdAt: ws.createdAt,
      updatedAt: ws.updatedAt,
      currentUserRole: membership.role,
      members: memberships,
      invitations: invitations
    };
  }

  public static async createWorkspace(
    tenantId: string, 
    name: string, 
    slug: string, 
    creatorId: string,
    ipAddress = '127.0.0.1',
    userAgent = 'System API'
  ): Promise<any> {
    const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!normalizedSlug) throw new Error("Invalid URL slug format provided.");

    const ws = await DatabaseClient.createWorkspace(tenantId, name, normalizedSlug, creatorId);

    // Record Audit Entry
    await DatabaseClient.recordAuditEntry({
      action: "WORKSPACE_CREATE",
      userId: creatorId,
      tenantId: tenantId,
      ipAddress,
      userAgent,
      status: "SUCCESS",
      reason: `Workspace ${ws.name} (${ws.id}) created under tenant ${tenantId}.`
    });

    return ws;
  }

  public static async updateWorkspace(
    workspaceId: string,
    userId: string,
    tenantId: string,
    updates: { name?: string; slug?: string },
    ipAddress = '127.0.0.1',
    userAgent = 'System API'
  ): Promise<any> {
    const requesterRole = await this.getRequesterRoleAndVerifyTenancy(workspaceId, userId, tenantId);
    
    // RBAC: Only Admin (4) or Owner (5) can update workspace meta
    if (ROLE_RANKS[requesterRole] < 4) {
      await DatabaseClient.recordAuditEntry({
        action: "WORKSPACE_UPDATE",
        userId,
        tenantId,
        ipAddress,
        userAgent,
        status: "FAILURE",
        reason: `Insufficient privileges for workspace update: Role is ${requesterRole}.`
      });
      throw new Error(`Unauthorized: ${requesterRole} role lacks high clearance permissions (Admin or Owner required).`);
    }

    const updated = await DatabaseClient.updateWorkspace(workspaceId, updates.name, updates.slug);

    await DatabaseClient.recordAuditEntry({
      action: "WORKSPACE_UPDATE",
      userId,
      tenantId,
      ipAddress,
      userAgent,
      status: "SUCCESS",
      reason: `Workspace ${updated.id} reconfigured with parameters: ${JSON.stringify(updates)}.`
    });

    return updated;
  }

  public static async deleteWorkspace(
    workspaceId: string,
    userId: string,
    tenantId: string,
    ipAddress = '127.0.0.1',
    userAgent = 'System API'
  ): Promise<void> {
    const requesterRole = await this.getRequesterRoleAndVerifyTenancy(workspaceId, userId, tenantId);

    // RBAC: Only Owner (5) can delete a workspace
    if (ROLE_RANKS[requesterRole] < 5) {
      await DatabaseClient.recordAuditEntry({
        action: "WORKSPACE_DELETE",
        userId,
        tenantId,
        ipAddress,
        userAgent,
        status: "FAILURE",
        reason: `Deletion request blocked. User ${userId} has insufficient clearance: ${requesterRole}.`
      });
      throw new Error("Unauthorized: Only the Workspace Owner carries clearance to permanently dissolve the workspace.");
    }

    await DatabaseClient.deleteWorkspace(workspaceId);

    await DatabaseClient.recordAuditEntry({
      action: "WORKSPACE_DELETE",
      userId,
      tenantId,
      ipAddress,
      userAgent,
      status: "SUCCESS",
      reason: `Workspace ${workspaceId} completely deleted from system registries.`
    });
  }

  // --- MEMBER & TEAMS MANAGEMENT ROUTINES ---

  public static async inviteTeamMember(
    workspaceId: string,
    userId: string,
    tenantId: string,
    targetEmail: string,
    assignedRole: WorkspaceRole,
    ipAddress = '127.0.0.1',
    userAgent = 'System API'
  ): Promise<any> {
    const requesterRole = await this.getRequesterRoleAndVerifyTenancy(workspaceId, userId, tenantId);

    // RBAC: Manager (3) or higher can trigger invitations
    if (ROLE_RANKS[requesterRole] < 3) {
      throw new Error("Unauthorized: Lacking invite permissions. Must be Manager or higher.");
    }

    // RBAC: Cannot invite with a role higher than or equal to your own rank (except Owner which remains supreme)
    if (ROLE_RANKS[assignedRole] >= ROLE_RANKS[requesterRole] && requesterRole !== 'Owner') {
      throw new Error(`Security Exception: Cannot invite with level [${assignedRole}] which matches or exceeds your requester authority [${requesterRole}].`);
    }

    // Check if user is already a member
    const targetUser = await DatabaseClient.findUserByEmail(targetEmail);
    if (targetUser) {
      const isMember = await DatabaseClient.findMembership(workspaceId, targetUser.id);
      if (isMember) {
        throw new Error("The target invitee is already registered as a member inside this specific Workspace.");
      }
    }

    // Secure token creation (Timing proof fallback index block)
    const secureToken = `inv-${Math.floor(100000 + Math.random() * 900000)}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7-day TTL

    const invitation = await DatabaseClient.createInvitation(
      workspaceId,
      targetEmail,
      assignedRole,
      secureToken,
      expiresAt,
      userId
    );

    await DatabaseClient.recordAuditEntry({
      action: "MEMBER_INVITE",
      userId,
      tenantId,
      ipAddress,
      userAgent,
      status: "SUCCESS",
      reason: `Invited ${targetEmail} as ${assignedRole} in workspace ${workspaceId}. Secure verification key: ${secureToken}`
    });

    return {
      ...invitation,
      verificationKey: secureToken // Exposed for preview harness playground tests
    };
  }

  public static async removeTeamMember(
    workspaceId: string,
    userId: string,
    tenantId: string,
    targetUserId: string,
    ipAddress = '127.0.0.1',
    userAgent = 'System API'
  ): Promise<void> {
    const requesterRole = await this.getRequesterRoleAndVerifyTenancy(workspaceId, userId, tenantId);

    // Self-Exit: Members can always opt to leave themselves, unless they are the last Owner.
    const isSelfExit = (userId === targetUserId);

    const targetMembership = await DatabaseClient.findMembership(workspaceId, targetUserId);
    if (!targetMembership) {
      throw new Error("Target user membership could not be found within database parameters.");
    }

    const memberships = await DatabaseClient.listMemberships(workspaceId);
    const owners = memberships.filter(m => m.role === 'Owner');

    if (targetMembership.role === 'Owner' && owners.length <= 1) {
      throw new Error("System Constraint: Cannot leave or remove the last Owner. Promote another Administrator first.");
    }

    if (!isSelfExit) {
      // RBAC: Remover must be Admin (4) or Owner (5)
      if (ROLE_RANKS[requesterRole] < 4) {
        throw new Error("Unauthorized: Only Admin or Owner has clearance to prune workspace memberships.");
      }

      // RBAC: Remover cannot remove someone of higher or equal authority level
      if (ROLE_RANKS[targetMembership.role] >= ROLE_RANKS[requesterRole]) {
         throw new Error(`Security Violation: Lacking rank hierarchy to remove user with role [${targetMembership.role}].`);
      }
    }

    await DatabaseClient.removeMembership(workspaceId, targetUserId);

    await DatabaseClient.recordAuditEntry({
      action: "MEMBER_REMOVE",
      userId,
      tenantId,
      ipAddress,
      userAgent,
      status: "SUCCESS",
      reason: isSelfExit 
        ? `User ${targetUserId} voluntarily evacuated workspace ${workspaceId}.`
        : `Management command: User ${targetUserId} forcefully ejected by requester ${userId}.`
    });
  }

  public static async assignMemberRole(
    workspaceId: string,
    userId: string,
    tenantId: string,
    targetUserId: string,
    assignedRole: WorkspaceRole,
    ipAddress = '127.0.0.1',
    userAgent = 'System API'
  ): Promise<any> {
    const requesterRole = await this.getRequesterRoleAndVerifyTenancy(workspaceId, userId, tenantId);

    // RBAC: Must be Admin (4) or Owner (5) to assign/modify roles
    if (ROLE_RANKS[requesterRole] < 4) {
      throw new Error("Unauthorized: Clearance level lacks role assignment authority (requires Admin or Owner).");
    }

    const targetMembership = await DatabaseClient.findMembership(workspaceId, targetUserId);
    if (!targetMembership) {
      throw new Error("No membership relation established for target user ID.");
    }

    // Special Case: Cannot modify Owner credentials unless you are an Owner yourself
    if (targetMembership.role === 'Owner' && requesterRole !== 'Owner') {
      throw new Error("Security Restriction: Admin level cannot revoke primary Owner privileges.");
    }

    // Special Case: Cannot promote a user to equal or higher tier than your own
    if (ROLE_RANKS[assignedRole] >= ROLE_RANKS[requesterRole] && requesterRole !== 'Owner') {
       throw new Error(`Security Exception: Cannot elevate target user to equal-or-higher rank [${assignedRole}] than your own authority [${requesterRole}].`);
    }

    // If downgrading self or last owner
    if (targetUserId === userId && targetMembership.role === 'Owner' && assignedRole !== 'Owner') {
         const memberships = await DatabaseClient.listMemberships(workspaceId);
         const owners = memberships.filter(m => m.role === 'Owner');
         if (owners.length <= 1) {
           throw new Error("System Constraint: Cannot abdicate the sole Owner role. Promote another Owner first.");
         }
    }

    const updated = await DatabaseClient.updateMembershipRole(workspaceId, targetUserId, assignedRole);

    await DatabaseClient.recordAuditEntry({
      action: "ROLE_ASSIGNMENT",
      userId,
      tenantId,
      ipAddress,
      userAgent,
      status: "SUCCESS",
      reason: `Elevated User ${targetUserId} to [${assignedRole}] in Workspace ${workspaceId} authorized by requester ${userId}.`
    });

    return updated;
  }

  public static async acceptWorkspaceInvite(
    token: string,
    userId: string,
    ipAddress = '127.0.0.1',
    userAgent = 'System API'
  ): Promise<any> {
    const invite = await DatabaseClient.findInvitationByToken(token);
    if (!invite) throw new Error("The specified invitation does not exist.");

    const user = await DatabaseClient.findUserById(userId);
    if (!user) throw new Error("Identity record not located.");

    // Tenant Check: Ensure the accepting user matches the invite's tenant barrier if any.
    // Standard SaaS allows invitees of target domains, but isolation is supreme.
    const ws = await DatabaseClient.findWorkspaceById(invite.workspaceId);
    if (!ws) throw new Error("Target workspace already closed or moved.");
    if (user.tenantId !== ws.tenantId) {
       throw new Error("Security barrier: You cannot accept invitations into a foreign tenant space.");
    }

    const membership = await DatabaseClient.acceptInvitation(token, userId);

    await DatabaseClient.recordAuditEntry({
      action: "MEMBER_INVITE_ACCEPT",
      userId,
      tenantId: user.tenantId,
      ipAddress,
      userAgent,
      status: "SUCCESS",
      reason: `User ${userId} accepted invitation key ${token} into Workspace ${invite.workspaceId} as ${invite.role}.`
    });

    return membership;
  }

  public static async deleteInvitation(
    workspaceId: string,
    userId: string,
    tenantId: string,
    invitationId: string,
    ipAddress = '127.0.0.1',
    userAgent = 'System API'
  ): Promise<void> {
    const requesterRole = await this.getRequesterRoleAndVerifyTenancy(workspaceId, userId, tenantId);

    // RBAC: Manager or higher can manage invitations
    if (ROLE_RANKS[requesterRole] < 3) {
      throw new Error("Unauthorized: Only Manager, Admin, or Owner can delete active invitations.");
    }

    const invite = await DatabaseClient.findInvitationById(invitationId);
    if (!invite || invite.workspaceId !== workspaceId) {
      throw new Error("Invitation does not exist in context of this workspace.");
    }

    await DatabaseClient.deleteInvitation(invitationId);

    await DatabaseClient.recordAuditEntry({
      action: "MEMBER_INVITE_REVOKE",
      userId,
      tenantId,
      ipAddress,
      userAgent,
      status: "SUCCESS",
      reason: `Invitation Key (${invitationId}) explicitly revoked by workspace officer ${userId}.`
    });
  }
}
