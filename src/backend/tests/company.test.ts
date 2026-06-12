// src/backend/tests/company.test.ts
import { CompanyService } from '../services/CompanyService';
import { DatabaseClient } from '../services/PrismaService';

export async function runCompanyTests(log: (msg: string) => void): Promise<{ total: number; failed: number }> {
  log("\n--- TEST PHASE: MULTI-TENANT COMPANY MANAGEMENT SYSTEM ---");
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
    const tenant1 = "tenant-test-comp-1";
    const tenant2 = "tenant-test-comp-2";
    const testUserId = "usr-test-comp-1";

    // 1. Core Model Creation & Dynamic Scoring Calculations
    const company1 = await CompanyService.createCompany(
      tenant1,
      testUserId,
      {
        name: "Cyberdyne Systems",
        domain: "cyberdyne.ai",
        industry: "SaaS",
        size: 1500, // headcount > 1000 sizeScore = 30
        revenue: 45000000, // revenue $10M - $100M revenueScore = 25
        city: "Sunnyvale",
        country: "United States",
        status: "Prospect", // statusScore = 10
        manualAdjustment: 5 // manual shift
      },
      "127.0.0.1",
      "test-agent"
    );

    assert(company1.id !== undefined, "Company workspace profile successfully registered with a unique ID.");
    assert(company1.tenantId === tenant1, "Company profile assigned correctly to target workspace tenant boundary.");
    
    // Expected score analysis:
    // Size: 1500 (>1000) => 30 points
    // Revenue: 45M (>10M) => 25 points
    // Status: Prospect => 10 points
    // Industry: SaaS (trim.toLowerCase matches saas) => 10 points
    // ManualAdjustment: +5 points
    // Sum: 30 + 25 + 10 + 10 + 5 = 80 points
    assert(company1.score === 80, `Algorithmic lead health evaluation scored Cyberdyne at ${company1.score}/100. Expected: 80.`);
    assert(company1.scoringBreakdown.sizeScore === 30, "Breakdown: Size score verified at exactly 30.");
    assert(company1.scoringBreakdown.revenueScore === 25, "Breakdown: Revenue score verified at exactly 25.");
    assert(company1.scoringBreakdown.industryBonus === 10, "Breakdown: High-growth SaaS bonus of 10 points granted.");

    // Retrieve lists to verify row-level tenancy isolation
    const listTenant1 = await CompanyService.listCompanies(tenant1);
    const listTenant2 = await CompanyService.listCompanies(tenant2);

    assert(listTenant1.some(c => c.id === company1.id), "Tenant 1 dashboard loads with newly created cyberdyne.ai record.");
    assert(!listTenant2.some(c => c.id === company1.id), "Tenant 2 dashboard has 0 exposure of Tenant 1 databases.");

    // 2. Note Appending
    const note = await CompanyService.addCompanyNote(
      tenant1,
      company1.id,
      testUserId,
      "Warning: Avoid connecting high power loads to CPU nodes without warning.",
      "127.0.0.1",
      "test-agent"
    );

    const refreshed = await DatabaseClient.findCompanyById(tenant1, company1.id);
    assert(refreshed?.notes.length === 1, "Discussion thread registers newly-appended engagement notes.");
    assert(refreshed?.notes[0].content.includes("high power loads"), "Discussion notes stored content accurately.");

    // 3. Soft Delete Compliance
    await CompanyService.deleteCompany(tenant1, company1.id, testUserId, "127.0.0.1", "test-agent");
    const activeList = await CompanyService.listCompanies(tenant1, { includeDeleted: false });
    const trashList = await CompanyService.listCompanies(tenant1, { includeDeleted: true });

    assert(!activeList.some(c => c.id === company1.id), "Soft deleted records are automatically pruned from active lookups.");
    assert(trashList.some(c => c.id === company1.id), "Soft deleted record is preserved in safety archive state.");

    // Restore Check
    await CompanyService.restoreCompany(tenant1, company1.id, testUserId, "127.0.0.1", "test-agent");
    const restoredList = await CompanyService.listCompanies(tenant1, { includeDeleted: false });
    assert(restoredList.some(c => c.id === company1.id), "Restore endpoint updates deletedAt back to null.");

    // 4. CSV Bulk Imports
    const rawCSV = `name,domain,industry,size,revenue,city,country,status,adjustment
Tesla Inc,tesla.com,Fintech,75000,90000000000,Austin,United States,Customer,2
Weyland Yutani,weyland.corp,SaaS,350,150000000,New Tokyo,Japan,Prospect,-10`;

    const csvResult = await CompanyService.importCompaniesCSV(tenant1, testUserId, rawCSV, "127.0.0.1", "test-agent");
    assert(csvResult.count === 2, "Bulk CSV parser translated structure and registered exactly two company records.");

    const weyland = csvResult.companies.find(c => c.name === "Weyland Yutani");
    assert(weyland !== undefined, "Parsed Weyland Yutani successfully from nested CSV stream.");
    
    // Weyland Score Math:
    // Size: 350 => 20 points
    // Revenue: 150M => 35 points
    // Status: Prospect => 10 points
    // Industry: SaaS => 10 points
    // Adjustment: -10 points
    // Expected: 20 + 35 + 10 + 10 - 10 = 65 points
    assert(weyland?.score === 65, `CSV import scoring computed score dynamically. Weyland: ${weyland?.score}. Expected: 65.`);

    // 5. Audit Trails Logging
    const databaseStore = DatabaseClient.getInMemoryStore();
    const companyAuditLogs = databaseStore.auditLogs.filter(a => a.tenantId === tenant1);
    assert(companyAuditLogs.length > 0, "CRM recorded and registered audit trails for company writes.");
    assert(companyAuditLogs.some(a => a.action === "COMPANY_CSV_BULK_IMPORT"), "Audit trails list includes CSV upload action code.");

    log(`[INFO] Completed company management lifecycle check: Checked ${total} assertions. Failed: ${failed}.`);
  } catch (err: any) {
    failed++;
    log(`[FATAL ERROR] Testing suite halted prematurely: ${err.message}`);
  }

  return { total, failed };
}
