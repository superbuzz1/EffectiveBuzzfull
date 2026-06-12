import { SequenceService } from '../services/SequenceService';
import { SequenceStepType } from '../types/sequence';

export async function runSequenceTests(log: (msg: string) => void): Promise<{ success: boolean; executed: number }> {
  log("\n--------------------------------------------------------------------------");
  log("        [UNIT STACK] INITIATING SEQUENCE BUILDER VERIFICATION           ");
  log("--------------------------------------------------------------------------");

  let executed = 0;
  const tenantId = 'tenant-1';
  const userId = 'usr-1';
  const ipAddress = '127.0.0.1';
  const userAgent = 'test-agent';

  try {
    // 1. Templates
    const template = await SequenceService.createTemplate(tenantId, 'Cold Outreach', 'Hello {{firstName}}', 'My body is here', userId, ipAddress, userAgent);
    if (!template.id) throw new Error("Template did not generate an ID");
    log("[PASS] Sequence Template successfully registered with a unique ID.");
    executed++;

    // 2. Linear Sequence creation
    const seqLinear = await SequenceService.createSequence(tenantId, 'Linear Sequence', true, [
      {
        name: 'Initial Email',
        type: SequenceStepType.EMAIL,
        action: { templateId: template.id }
      },
      {
        name: 'Wait 3 Days',
        type: SequenceStepType.DELAY,
        action: { delayMinutes: 3 * 24 * 60 }
      }
    ], userId, ipAddress, userAgent);
    if (seqLinear.steps.length !== 2) throw new Error("Linear Sequence steps length mismatch.");
    log("[PASS] Linear Sequence correctly assigned and structured.");
    executed++;

    // 3. Conditional Branching Sequence
    const seqBranch = await SequenceService.createSequence(tenantId, 'Branching Sequence', false, [
      {
        name: 'Check Has Phone',
        type: SequenceStepType.CONDITION,
        action: {
          conditionField: 'phoneNumber',
          conditionOperator: 'IS_EMPTY',
          trueStepId: 'step-call',
          falseStepId: 'step-email'
        }
      }
    ], userId, ipAddress, userAgent);
    if (seqBranch.steps[0].type !== SequenceStepType.CONDITION) throw new Error("Condition step mismatch.");
    log("[PASS] Conditional Branching Sequence structure correctly parsed.");
    executed++;

    // 4. Input validation logic
    let caughtDelayError = false;
    try {
      await SequenceService.createSequence(tenantId, 'Bad Delay', true, [
        { name: 'Bad', type: SequenceStepType.DELAY, action: { delayMinutes: -5 } }
      ], userId, ipAddress, userAgent);
    } catch (err: any) {
      if (err.message.includes('positive delayMinutes')) caughtDelayError = true;
    }
    if (!caughtDelayError) throw new Error("Did not catch bad delay validation.");
    log("[PASS] Step validation: Negative delays blocked safely.");
    executed++;

    let caughtConditionError = false;
    try {
      await SequenceService.createSequence(tenantId, 'Bad Cond', true, [
        { name: 'Bad', type: SequenceStepType.CONDITION, action: { conditionField: 'phone' } }
      ], userId, ipAddress, userAgent); // Missing operator
    } catch (err: any) {
      if (err.message.includes('field and operator')) caughtConditionError = true;
    }
    if (!caughtConditionError) throw new Error("Did not catch bad condition validation.");
    log("[PASS] Step validation: Conditions missing operators blocked safely.");
    executed++;

    log(`[INFO] Completed sequence builder check: Checked ${executed} assertions. Failed: 0.`);
    return { success: true, executed };
  } catch (error: any) {
    log(`[FAIL] Sequence builder check failed: ${error.message}`);
    return { success: false, executed };
  }
}
