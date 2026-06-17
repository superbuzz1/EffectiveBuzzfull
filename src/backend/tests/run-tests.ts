// src/backend/tests/run-tests.ts
import { runUnitTests } from './auth.test';
import { runIntegrationTests } from './integration.test';
import { runWorkspaceTests } from './workspace.test';
import { runUserTests } from './user.test';
import { runProspectTests } from './prospect.test';
import { runCompanyTests } from './company.test';
import { runSequenceTests } from './sequence.test';
import { runInboxTests } from './inbox.test';

export async function executeAllServiceTests(logCallback: (msg: string) => void): Promise<{
  success: boolean;
  unit: { total: number; failed: number };
  integration: { total: number; failed: number };
}> {
  logCallback("==========================================================================");
  logCallback("        EFFECTIVEBUZZ BACKEND PLATFORM SECURE VERIFICATION ENGINE         ");
  logCallback("==========================================================================");

  const unitResults = await runUnitTests(logCallback);
  const workspaceResults = await runWorkspaceTests(logCallback);
  const userResults = await runUserTests(logCallback);
  const prospectResults = await runProspectTests(logCallback);
  const companyResults = await runCompanyTests(logCallback);
  const sequenceResults = await runSequenceTests(logCallback);
  const inboxResults = await runInboxTests(logCallback);
  const integrationResults = await runIntegrationTests(logCallback);

  const totalUnit = unitResults.total + workspaceResults.total + userResults.total + prospectResults.total + companyResults.total + sequenceResults.executed + inboxResults.executed;
  const failedUnit = unitResults.failed + workspaceResults.failed + userResults.failed + prospectResults.failed + companyResults.failed + (!sequenceResults.success ? 1 : 0) + (!inboxResults.success ? 1 : 0);

  logCallback("\n==========================================================================");
  logCallback("                          FINAL TEST SUMMARY REPORT                       ");
  logCallback("==========================================================================");
  logCallback(`  UNIT & SECURITY TESTS:         ${failedUnit === 0 ? "PASSED (100% GREEN)" : "FAILED"}`);
  logCallback(`  ├─ Total Assertions Checked: ${totalUnit}`);
  logCallback(`  └─ Failed Actions Blocks:    ${failedUnit}`);
  logCallback(`  INTEGRATION ROUTE TESTING:     ${integrationResults.success ? "PASSED (100% GREEN)" : "FAILED"}`);
  logCallback(`  ├─ Total Flows Verified:     ${integrationResults.total}`);
  logCallback(`  └─ Failed Routing Locks:     ${integrationResults.failed}`);
  logCallback("==========================================================================\n");

  return {
    success: failedUnit === 0 && integrationResults.success,
    unit: { total: totalUnit, failed: failedUnit },
    integration: { total: integrationResults.total, failed: integrationResults.failed }
  };
}

// Support direct command-line execution
const isMain = (typeof require !== 'undefined' && require.main === module) || 
               (process.argv[1] && (process.argv[1].endsWith('run-tests.ts') || process.argv[1].endsWith('run-tests.js')));

if (isMain) {
  executeAllServiceTests((msg) => console.log(msg))
    .then((result) => {
      process.exit(result.success ? 0 : 1);
    })
    .catch((err) => {
      console.error("Test execution engine failure:", err);
      process.exit(1);
    });
}
