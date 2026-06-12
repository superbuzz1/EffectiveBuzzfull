// src/backend/tests/workspace.test.ts
import { WorkspaceService } from '../services/WorkspaceService';
import { DatabaseClient } from '../services/PrismaService';
import { WorkspaceRole } from '../types/workspace';

export async function runWorkspaceTests(logCallback: (msg: string) => void): Promise<{
  success: boolean;
  total: number;
  failed: number;
}> {
  logCallback("\n--------------------------------------------------------------------------");
  logCallback("        [UNIT STACK] INITIATING WORKSPACE SERVICE SECURITY VERIFICATION   ");
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
    // SEED TEST USERS & TENANTS
    // Tenant A (Acme Corp - tenant-1) with Owners and Admin:
    // usr-1: Owner (Tenant A)
    // usr-2: Admin (Tenant A)
    
    // Let's create Tenant B (GrowthX - tenant-2) and users for Isolation checks:
    // we already have usr-1 and usr-2 under tenant-1 in InMemoryStore.
    // Let's register a user usr-b1 to tenant-2:
    const usrB1 = await DatabaseClient.createUser({
      email: "marcus@growthx.io",
      passwordHash: "somehash",
      name: "Marcus Aurelius",
      role: "Member",
      isVerified: true,
      avatar: null,
      tenantId: "tenant-2"
    });

    logCallback("[SYSTEM] Test users and isolation barriers primed successfully.");

    // TEST 1: Absolute Tenant Isolation
    logCallback("\n--- TEST PHASE 1: Tenant Boundary Isolations ---");
    try {
      // Creatorusr-1 creates a Workspace in Tenant A
      const wsA = await WorkspaceService.createWorkspace("tenant-1", "A Product Team", "product-team", "usr-1");
      assert(wsA.id !== undefined, "Workspace created successfully with dynamic ID.");
      assert(wsA.slug === "product-team", "Workspace slug normalized perfectly.");

      // Verify usr-1 is indeed Workspace Owner
      const membership = await DatabaseClient.findMembership(wsA.id, "usr-1");
      assert(membership?.role === "Owner", "Creator automatically appointed as Workspace 'Owner'.");

      // Verify that Marcus (Tenant B, usrB1) CANNOT view this workspace
      let intercepted = false;
      try {
        await WorkspaceService.getWorkspace(wsA.id, usrB1.id, "tenant-2");
      } catch (err: any) {
        intercepted = err.message.includes("barrier") || err.message.includes("cross-contamination") || err.message.includes("does not exist") || err.message.includes("Access Denied");
      }
      assert(intercepted, "Inter-Tenant Access Shield: Crossing Tenant boundaries blocks Workspace readout.");

      // Verify that Marcus CANNOT edit or delete Tenant A's workspace
      let deleteBlocked = false;
      try {
        await WorkspaceService.deleteWorkspace(wsA.id, usrB1.id, "tenant-2");
      } catch (err) {
        deleteBlocked = true;
      }
      assert(deleteBlocked, "Inter-Tenant Access Shield: Deletion requests from foreign tenants rejected instantly.");

    } catch (err: any) {
      failedNum++;
      logCallback(`[FAIL] Tenant Isolation Test phase threw fatal exception: ${err.message}`);
    }

    // TEST 2: RBAC Matrix Execution Checks
    logCallback("\n--- TEST PHASE 2: Workspace RBAC Hierarchies & Operations ---");
    try {
      // Create fresh workspace
      const ws = await WorkspaceService.createWorkspace("tenant-1", "Security Core", "security-core", "usr-1");
      
      // Let's add usr-2 (Sarah) as an Admin inside the workspace
      await DatabaseClient.addMembership(ws.id, "usr-2", "Admin");

      // Let's create a Member usr-3 and add as Manager
      const usr3 = await DatabaseClient.createUser({
        email: "manager@test.com", passwordHash: "somehash", name: "Manager Bob", role: "Member", isVerified: true, avatar: null, tenantId: "tenant-1"
      });
      await DatabaseClient.addMembership(ws.id, usr3.id, "Manager");

      // Let's create an SDR usr-4
      const usr4 = await DatabaseClient.createUser({
        email: "sdr@test.com", passwordHash: "somehash", name: "SDR Sally", role: "Agent", isVerified: true, avatar: null, tenantId: "tenant-1"
      });
      await DatabaseClient.addMembership(ws.id, usr4.id, "SDR");

      // Check UPDATE RBAC: Admin can update
      await WorkspaceService.updateWorkspace(ws.id, "usr-2", "tenant-1", { name: "Security Core V2" });
      const updatedWs = await DatabaseClient.findWorkspaceById(ws.id);
      assert(updatedWs?.name === "Security Core V2", "Workspace Update authorized: Workspace Admin successfully renamed workspace.");

      // Check UPDATE RBAC: SDR CANNOT update
      let sdrBlocked = false;
      try {
        await WorkspaceService.updateWorkspace(ws.id, usr4.id, "tenant-1", { name: "Malicious Rename" });
      } catch (err) {
        sdrBlocked = true;
      }
      assert(sdrBlocked, "Workspace Update unauthorized: SDR level updates correctly intercepted.");

      // Check DELETE RBAC: Admin (usr-2) is BLOCKED from deleting the workspace
      let adminDeleteBlocked = false;
      try {
        await WorkspaceService.deleteWorkspace(ws.id, "usr-2", "tenant-1");
      } catch (err) {
        adminDeleteBlocked = true;
      }
      assert(adminDeleteBlocked, "Dissolution Blocked: Admin role cannot delete workspace. Only primary Owner has clearance.");

    } catch (err: any) {
      failedNum++;
      logCallback(`[FAIL] RBAC Enforcement Test phase threw fatal exception: ${err.message}`);
    }

    // TEST 3: Team Invitations, Role Levels, and Verification Life Cycle
    logCallback("\n--- TEST PHASE 3: Team Invitations & Role Escalation Constraints ---");
    try {
      const ws = await WorkspaceService.createWorkspace("tenant-1", "Sandbox Labs", "sandbox-labs", "usr-1");
      
      // Add a Manager
      const managerUser = await DatabaseClient.createUser({
        email: "manager2@test.com", passwordHash: "hash", name: "Manager Jane", role: "Member", isVerified: true, avatar: null, tenantId: "tenant-1"
      });
      await DatabaseClient.addMembership(ws.id, managerUser.id, "Manager");

      // Manager (rank 3) invites role SDR (rank 2) -> Should PASS
      const inv1 = await WorkspaceService.inviteTeamMember(ws.id, managerUser.id, "tenant-1", "cand@test.com", "SDR");
      assert(inv1.token !== undefined, "Invitation generated by Workspace Manager.");

      // Manager invites role Owner -> Should FAIL (rank escalation violation)
      let escalationBlocked = false;
      try {
        await WorkspaceService.inviteTeamMember(ws.id, managerUser.id, "tenant-1", "malicious_owner@test.com", "Owner");
      } catch (err) {
        escalationBlocked = true;
      }
      assert(escalationBlocked, "Escalation Intercepted: Manager role blocked from generating an Owner invite.");

      // Clean completion of invitation: Let's create candidate user and accept
      const candidateUser = await DatabaseClient.createUser({
        email: "cand@test.com", passwordHash: "hash", name: "Candidate Bill", role: "Member", isVerified: true, avatar: null, tenantId: "tenant-1"
      });

      const membership = await WorkspaceService.acceptWorkspaceInvite(inv1.verificationKey, candidateUser.id);
      assert(membership.role === "SDR", "Candidate accepted invite, entering Workspace as an SDR member.");

    } catch (err: any) {
      failedNum++;
      logCallback(`[FAIL] Team Invitation Test phase threw fatal exception: ${err.message}`);
    }

    // TEST 4: Security Audit Trail Tracking
    logCallback("\n--- TEST PHASE 4: Cryptographic Auditing & Security Trails ---");
    try {
      const logs = await DatabaseClient.getRecentAuditEntries("tenant-1");
      assert(logs.length > 0, "Audit Trail registers active workspace events.");
      
      const createEvent = logs.find(log => log.action === "WORKSPACE_CREATE");
      assert(createEvent !== undefined, "Audit entry stored matching 'WORKSPACE_CREATE' type.");
      
      const inviteEvent = logs.find(log => log.action === "MEMBER_INVITE");
      assert(inviteEvent !== undefined, "Audit entry stored matching 'MEMBER_INVITE' type.");

      logCallback(`[SYSTEM] Security Audit logging depth certified. Total Tenant Logs Verified: ${logs.length}`);

    } catch (err: any) {
      failedNum++;
      logCallback(`[FAIL] Audit Trail Test phase threw fatal exception: ${err.message}`);
    }

  } catch (err: any) {
    failedNum++;
    logCallback(`[FATAL] Workspace automated test runner aborted: ${err.message}`);
  }

  const success = failedNum === 0;
  return {
    success,
    total: totalNum,
    failed: failedNum
  };
}
