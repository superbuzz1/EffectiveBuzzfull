// src/backend/tests/user.test.ts
import { UserService } from '../services/UserService';
import { DatabaseClient } from '../services/PrismaService';

export async function runUserTests(logCallback: (msg: string) => void): Promise<{
  success: boolean;
  total: number;
  failed: number;
}> {
  logCallback("\n--------------------------------------------------------------------------");
  logCallback("        [UNIT STACK] INITIATING USER MANAGEMENT SECURITY VERIFICATION        ");
  logCallback("--------------------------------------------------------------------------");

  let totalNum = 0;
  let failedNum = 0;

  function assert(condition: boolean, message: string) {
    totalNum++;
    if (condition) {
      logCallback(`[PASS] ${message}`);
    } else {
      failedNum++;
      logCallback(`[FAIL] ${message}`);
    }
  }

  try {
    logCallback("\n--- TEST PHASE 1: User Profiles & Defaults Sync ---");
    // Get profile of usr-1
    const p1 = await UserService.getUserProfile("usr-1");
    assert(p1.title === "Executive Director", "UserProfile retrieve returned correct seeded fields.");
    assert(p1.timezone === "America/New_York", "UserProfile timezone defaulted or resolved perfectly.");

    // Update profile of usr-1
    await UserService.updateUserProfile("usr-1", "tenant-1", {
      bio: "Updated Chief Security Officer and Founder.",
      phoneNumber: "+1 (555) 9999"
    }, "127.0.0.1", "test-agent");

    const p1Updated = await UserService.getUserProfile("usr-1");
    assert(p1Updated.bio === "Updated Chief Security Officer and Founder.", "Profile fields updated and persisted on Memory Store.");
    assert(p1Updated.phoneNumber === "+1 (555) 9999", "Alternate profile fields mutated correctly.");

    logCallback("\n--- TEST PHASE 2: User Preferences & Custom Sync ---");
    // Query preferences of usr-2
    const pr2 = await UserService.getUserPreferences("usr-2");
    assert(pr2.theme === "dark", "UserPreferences themes retrieved correctly.");
    assert(pr2.emailSecurity === true, "UserPreferences security flags verified correctly.");

    // Update preferences of usr-2
    await UserService.updateUserPreferences("usr-2", "tenant-1", {
      theme: "light",
      emailMarketing: false
    }, "127.0.0.1", "test-agent");

    const pr2Updated = await UserService.getUserPreferences("usr-2");
    assert(pr2Updated.theme === "light", "Preferences theme toggled successfully.");
    assert(pr2Updated.emailMarketing === false, "Preferences notification toggles saved.");

    logCallback("\n--- TEST PHASE 3: User Activity & Row Isolation Checks ---");
    // Create Agent under tenant-1
    const sdrUser = await DatabaseClient.createUser({
      email: "agent007@acme.com",
      passwordHash: "some_hash",
      name: "Bond Agent",
      role: "Agent",
      isVerified: true,
      avatar: null,
      tenantId: "tenant-1"
    });

    // Check that Bond Agent can see their own activities
    const bondActs = await UserService.getUserActivity(sdrUser.id, "tenant-1", sdrUser.id);
    assert(Array.isArray(bondActs), "User can lookup individual transaction histories.");

    // Check that Bond Agent CANNOT look up Alex Rivera's (usr-1, Owner) activities
    let bondBlocked = false;
    try {
      await UserService.getUserActivity(sdrUser.id, "tenant-1", "usr-1");
    } catch (err: any) {
      bondBlocked = err.message.includes("Unauthorized") || err.message.includes("Access Denied");
    }
    assert(bondBlocked, "Security Isolation: Ordinary agent blocked from snooping senior profile activities.");

    logCallback("\n--- TEST PHASE 4: Team Roles Hierarchy Constraints ---");
    // Sarah (usr-2, Admin - Rank 3) tries to change Alex's (usr-1, Owner - Rank 4) role -> Should FAIL
    let adminChangeOwnerBlocked = false;
    try {
      await UserService.updateTeammateRole("tenant-1", "usr-2", "usr-1", "Member", "127.0.0.1", "test-agent");
    } catch (err: any) {
      adminChangeOwnerBlocked = err.message.includes("Ranking") || err.message.includes("Authorization Rejected");
    }
    assert(adminChangeOwnerBlocked, "Hierarchy Gate: Admin role restricted from modifying/degrading Tenant Owner properties.");

    // Admin tries to make someone an Owner -> Should FAIL
    let adminPromoteToOwnerBlocked = false;
    try {
      await UserService.updateTeammateRole("tenant-1", "usr-2", sdrUser.id, "Owner", "127.0.0.1", "test-agent");
    } catch (err: any) {
      adminPromoteToOwnerBlocked = err.message.includes("escalate") || err.message.includes("Authorization Rejected");
    }
    assert(adminPromoteToOwnerBlocked, "Hierarchy Gate: Admins barred from promoting colleagues to peer or superior Owner ranks.");

    // Owner demotes Agent User to Member -> Should PASS
    await UserService.updateTeammateRole("tenant-1", "usr-1", sdrUser.id, "Member", "127.0.0.1", "test-agent");
    const mutatedAgent = await DatabaseClient.findUserById(sdrUser.id);
    assert(mutatedAgent?.role === "Member", "Owner role safely modified Agent role to Member.");

    // Admin tries to evict Owner -> Should FAIL
    let adminEvictOwnerBlocked = false;
    try {
      await UserService.evictTeammate("tenant-1", "usr-2", "usr-1", "127.0.0.1", "test-agent");
    } catch (err: any) {
      adminEvictOwnerBlocked = err.message.includes("clearance") || err.message.includes("Authorization Rejected");
    }
    assert(adminEvictOwnerBlocked, "Eviction Protect: Admin prohibited from evicting primary Tenant Owner.");

    // Owner evicts Member -> Should PASS
    await UserService.evictTeammate("tenant-1", "usr-1", sdrUser.id, "127.0.0.1", "test-agent");
    const evictedCheck = await DatabaseClient.findUserById(sdrUser.id);
    assert(evictedCheck === null, "Owner successfully evicted Member user from subscriber tenant directories.");

  } catch (err: any) {
    failedNum++;
    logCallback(`[FAIL] User test suite completed with uncaught error: ${err.message}`);
  }

  const success = failedNum === 0;
  return {
    success,
    total: totalNum,
    failed: failedNum
  };
}
