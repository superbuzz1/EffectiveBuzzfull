// src/backend/services/UserService.ts
import { DatabaseClient } from './PrismaService';
import { UserRole } from '../types/auth';
import { UserProfile, UserPreferences, TENANT_ROLE_RANKS } from '../types/userManagement';

export class UserService {
  
  // --- USER PROFILE SERVICE ---
  public static async getUserProfile(userId: string): Promise<UserProfile> {
    const user = await DatabaseClient.findUserById(userId);
    if (!user) throw new Error("Authenticated identity profile does not exist.");
    
    const rawProfile = await DatabaseClient.findUserProfileByUserId(userId);
    return {
      userId: rawProfile.userId,
      bio: rawProfile.bio,
      title: rawProfile.title,
      department: rawProfile.department,
      phoneNumber: rawProfile.phoneNumber,
      timezone: rawProfile.timezone
    };
  }

  public static async updateUserProfile(
    userId: string, 
    tenantId: string,
    data: { name?: string; bio?: string; title?: string; department?: string; phoneNumber?: string; timezone?: string },
    ipAddress: string,
    userAgent: string
  ): Promise<UserProfile> {
    const user = await DatabaseClient.findUserById(userId);
    if (!user) throw new Error("Authenticated identity profile does not exist.");

    // If updating name
    if (data.name !== undefined && data.name.trim() !== '') {
      user.name = data.name.trim();
    }

    const updatedProfile = await DatabaseClient.updateUserProfile(userId, {
      bio: data.bio,
      title: data.title,
      department: data.department,
      phoneNumber: data.phoneNumber,
      timezone: data.timezone
    });

    // Record cryptography security event
    await DatabaseClient.recordAuditEntry({
      action: "PROFILE_UPDATE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `User profile fields and metadata successfully modified for user ${user.email}.`
    });

    return updatedProfile;
  }

  // --- USER PREFERENCES SERVICE ---
  public static async getUserPreferences(userId: string): Promise<UserPreferences> {
    const prefs = await DatabaseClient.findUserPreferencesByUserId(userId);
    return {
      userId: prefs.userId,
      theme: prefs.theme,
      emailMarketing: prefs.emailMarketing,
      emailSecurity: prefs.emailSecurity,
      emailProductUpdates: prefs.emailProductUpdates,
      defaultWorkspaceId: prefs.defaultWorkspaceId,
      language: prefs.language
    };
  }

  public static async updateUserPreferences(
    userId: string,
    tenantId: string,
    data: { theme?: 'light' | 'dark' | 'system'; emailMarketing?: boolean; emailSecurity?: boolean; emailProductUpdates?: boolean; defaultWorkspaceId?: string | null; language?: string },
    ipAddress: string,
    userAgent: string
  ): Promise<UserPreferences> {
    const updatedPrefs = await DatabaseClient.updateUserPreferences(userId, data);

    // Record cryptography security event
    await DatabaseClient.recordAuditEntry({
      action: "PREFERENCES_UPDATE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: "User notifications or visual interface preferences synchronized."
    });

    return updatedPrefs;
  }

  // --- USER ACTIVITY HISTORY ---
  public static async getUserActivity(
    userId: string,
    tenantId: string,
    targetUserId: string
  ): Promise<any[]> {
    // SECURITY CONTROLLER: Enforce direct row isolation bounds
    if (userId !== targetUserId) {
      // If reading someone else's, actor must be Admin or Owner under the same Tenant!
      const actor = await DatabaseClient.findUserById(userId);
      if (!actor || actor.tenantId !== tenantId) {
        throw new Error("Access Denied: Cross-tenant tracking intercept.");
      }
      if (actor.role !== 'Admin' && actor.role !== 'Owner') {
        throw new Error("Unauthorized Permission: Ordinary accounts lack privileges to query colleague activities.");
      }
    }

    const logs = await DatabaseClient.getRecentAuditEntries(tenantId);
    // Filter activities targeted to the user
    return logs.filter(log => log.userId === targetUserId);
  }

  // --- TENANT LEVEL TEAM MANAGEMENT ---
  public static async listTenantTeam(tenantId: string, actorId: string): Promise<any[]> {
    const actor = await DatabaseClient.findUserById(actorId);
    if (!actor || actor.tenantId !== tenantId) {
      throw new Error("Access Denied: Cross-tenant tenant boundaries lock.");
    }

    // Capture users inside tenant
    const users = await DatabaseClient.listTenantUsers(tenantId);
    
    // Supplement each user with profile details for rich UI cards
    const teamDetails = await Promise.all(users.map(async (u) => {
      const profile = await DatabaseClient.findUserProfileByUserId(u.id);
      return {
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        isVerified: u.isVerified,
        avatar: u.avatar,
        createdAt: u.createdAt,
        profile: {
          bio: profile.bio,
          title: profile.title,
          department: profile.department,
          phoneNumber: profile.phoneNumber,
          timezone: profile.timezone
        }
      };
    }));

    return teamDetails;
  }

  public static async updateTeammateRole(
    tenantId: string,
    actorId: string,
    targetUserId: string,
    nextRole: UserRole,
    ipAddress: string,
    userAgent: string
  ): Promise<any> {
    const actor = await DatabaseClient.findUserById(actorId);
    if (!actor || actor.tenantId !== tenantId) {
      throw new Error("Access Denied: Cross-tenant authorization lock.");
    }

    // Role rank boundary gate checks
    if (actor.role !== 'Owner' && actor.role !== 'Admin') {
      throw new Error("Forbidden Access: Restructured roles requires Tenant Owner or Admin clearance.");
    }

    const targetUser = await DatabaseClient.findUserById(targetUserId);
    if (!targetUser || targetUser.tenantId !== tenantId) {
      throw new Error("Not Found: Target user is not registered under your tenant directory.");
    }

    if (actorId === targetUserId) {
      throw new Error("Invalid Action: Self role escalation or demotion is prohibited.");
    }

    const actorRank = TENANT_ROLE_RANKS[actor.role];
    const targetRank = TENANT_ROLE_RANKS[targetUser.role];
    const destinationRank = TENANT_ROLE_RANKS[nextRole];

    // Enforce hierarchical restriction: actor rank must exceed current target user rank
    if (actorRank <= targetRank) {
      throw new Error("Authorization Rejected: You cannot modify roles of equal or higher ranking officers.");
    }

    // Target rank assignment check: actor can only assign ranks equal or lower to actor rank
    if (destinationRank > actorRank) {
      throw new Error("Authorization Rejected: You cannot escalate other employees beyond your own ranking level.");
    }

    const updatedUser = await DatabaseClient.updateUserTenantRole(targetUserId, tenantId, nextRole);

    await DatabaseClient.recordAuditEntry({
      action: "TEAM_ROLE_MUTATED",
      userId: actorId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Tenant level security authorization changed for ${targetUser.email}. Transitioned: ${targetUser.role} -> ${nextRole}.`
    });

    return updatedUser;
  }

  public static async evictTeammate(
    tenantId: string,
    actorId: string,
    targetUserId: string,
    ipAddress: string,
    userAgent: string
  ): Promise<void> {
    const actor = await DatabaseClient.findUserById(actorId);
    if (!actor || actor.tenantId !== tenantId) {
      throw new Error("Access Denied: Cross-tenant authorization lock.");
    }

    if (actor.role !== 'Owner' && actor.role !== 'Admin') {
      throw new Error("Forbidden Access: Member eviction requires Tenant Owner or Admin clearance.");
    }

    const targetUser = await DatabaseClient.findUserById(targetUserId);
    if (!targetUser || targetUser.tenantId !== tenantId) {
      throw new Error("Not Found: Member does not exist inside your tenant network.");
    }

    if (actorId === targetUserId) {
      throw new Error("Invalid Action: You cannot evict or delete yourself from the Tenant registry.");
    }

    const actorRank = TENANT_ROLE_RANKS[actor.role];
    const targetRank = TENANT_ROLE_RANKS[targetUser.role];

    if (actorRank <= targetRank) {
      throw new Error("Authorization Rejected: You lack rank clearance to evict this colleague.");
    }

    await DatabaseClient.removeUserFromTenant(targetUserId, tenantId);

    await DatabaseClient.recordAuditEntry({
      action: "TEAM_MEMBER_EVICTED",
      userId: actorId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Employee ${targetUser.name} (${targetUser.email}) removed definitively from Subscriber Tenant Organization.`
    });
  }
}
