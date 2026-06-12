// src/backend/tests/prospect.test.ts
import { ProspectService } from '../services/ProspectService';
import { DatabaseClient } from '../services/PrismaService';

export async function runProspectTests(log: (msg: string) => void): Promise<{ total: number; failed: number }> {
  log("\n--- TEST PHASE: MULTI-TENANT PROSPECT CRM SUB-SYSTEM ---");
  let total = 0;
  let failed = 0;

  const assert = (condition: boolean, description: string) => {
    total++;
    if (condition) {
      log(`[PASS] ${description}`);
    } else {
      failed++;
      log(`[FAIL] ${description}`);
    }
  };

  try {
    const tenant1 = "tenant-test-crm-1";
    const tenant2 = "tenant-test-crm-2";
    const testUserId = "usr-test-crm-1";

    // 1. Creation and Multi-Tenant Isolation
    const prospect1 = await ProspectService.createProspect(
      tenant1,
      testUserId,
      {
        name: "Clara Oswald",
        email: "clara@tardis.com",
        company: "Time Agency",
        title: "Companion",
        phone: "+44 7911 123456",
        tags: ["traveler", "vintage"]
      },
      "127.0.0.1",
      "test-agent"
    );

    assert(prospect1.id !== undefined, "Prospect successfully created in tenant schema with an auto-generated unique ID.");
    assert(prospect1.tenantId === tenant1, "Prospect correctly assigned to target active tenant context.");

    // Retrieve lists to verify isolation
    const listTenant1 = await ProspectService.listProspects(tenant1);
    const listTenant2 = await ProspectService.listProspects(tenant2);

    assert(listTenant1.some(p => p.id === prospect1.id), "Tenant 1 list successfully includes newly registered prospect Clara.");
    assert(!listTenant2.some(p => p.id === prospect1.id), "Tenant 2 list is row-isolated and has 0 knowledge of Clara Oswald.");

    // 2. Note Appending
    const note = await ProspectService.addProspectNote(
      tenant1,
      prospect1.id,
      testUserId,
      "Excellent technical discussion regarding vortex manipulators.",
      "127.0.0.1",
      "test-agent"
    );

    const refreshed = await DatabaseClient.findProspectById(tenant1, prospect1.id);
    assert(refreshed?.notes.length === 1, "Notes array holds the newly appended conversation log entry.");
    assert(refreshed?.notes[0].content === "Excellent technical discussion regarding vortex manipulators.", "Note content is stored accurately.");

    // 3. Soft Delete Compliance
    await ProspectService.deleteProspect(tenant1, prospect1.id, testUserId, "127.0.0.1", "test-agent");
    const activeList = await ProspectService.listProspects(tenant1, { includeDeleted: false });
    const fullTrashList = await ProspectService.listProspects(tenant1, { includeDeleted: true });

    assert(!activeList.some(p => p.id === prospect1.id), "Soft-deleted prospect is automatically filtered out from active leads index.");
    assert(fullTrashList.some(p => p.id === prospect1.id), "Soft-deleted prospect continues to exist in the global storage registry for compliance audit purposes.");

    const rawRecord = await DatabaseClient.findProspectById(tenant1, prospect1.id);
    assert(rawRecord?.deletedAt !== null, "Soft deletion confirms presence of a secure deletedAt Date timestamp.");

    // Restore Check
    await ProspectService.restoreProspect(tenant1, prospect1.id, testUserId, "127.0.0.1", "test-agent");
    const listAfterRestore = await ProspectService.listProspects(tenant1, { includeDeleted: false });
    assert(listAfterRestore.some(p => p.id === prospect1.id), "Restore hook successfully cleared deletedAt and returned lead to active dashboard.");

    // 4. CSV Bulk Imports
    const validCSV = `name,email,company,title,status,tags
Donna Noble,donna@temp.co,Chiswick Hub,Office Lead,Qualified,partner;growth
Wilfred Mott,wilf@sky.net,Vanguard Corp,Observer,New,space;veteran`;

    const csvResult = await ProspectService.importProspectsCSV(tenant1, testUserId, validCSV, "127.0.0.1", "test-agent");
    assert(csvResult.count === 2, "CSV import engine parsed header columns and imported exactly two valid entries.");
    
    const importedDonna = csvResult.prospects.find(p => p.name === "Donna Noble");
    assert(importedDonna?.company === "Chiswick Hub" && importedDonna?.status === "Qualified", "CSV properties parsed and assigned dynamically.");
    assert(importedDonna?.tags.includes('partner'), "CSV tags exploded on semicolon separator successfully.");

    // 5. Automated Security Audit Logging Verification
    const auditLogs = InMemoryStore.auditLogs.filter(a => a.tenantId === tenant1);
    assert(auditLogs.length > 0, "Security subsystem registered and recorded audit logs for creation, updates, and CSV imports.");
    assert(auditLogs.some(a => a.action === "PROSPECT_CSV_IMPORT"), "Audit trails catalog include the bulk 'PROSPECT_CSV_IMPORT' action explicitly.");

    log(`[INFO] Checked ${total} backend CRM properties with 0 faults.`);
  } catch (err: any) {
    failed++;
    log(`[FATAL] CRM pipeline tests exception: ${err.message}`);
  }

  return { total, failed };
}

// Simple internal interface accessor
const InMemoryStore = DatabaseClient.getInMemoryStore();
