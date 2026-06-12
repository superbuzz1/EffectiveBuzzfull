import { InboxService } from '../services/InboxService';
import { ThreadStatus, MessageDirection } from '../types/inbox';

export async function runInboxTests(log: (msg: string) => void): Promise<{ success: boolean; executed: number }> {
  log("\n--------------------------------------------------------------------------");
  log("        [UNIT STACK] INITIATING INBOX SERVICE VERIFICATION              ");
  log("--------------------------------------------------------------------------");

  let executed = 0;
  const tenantId = 'tenant-1';
  const userId = 'usr-1';
  const ipAddress = '127.0.0.1';
  const userAgent = 'test-agent';

  try {
    // 1. Create a Thread
    const thread = await InboxService.createThread(
      tenantId,
      userId,
      'prospect-123',
      'Follow up on our meeting',
      ThreadStatus.OPEN,
      null,
      [{
        from: 'sales@acme.com',
        to: 'client@example.com',
        body: 'Great chatting yesterday!',
        direction: MessageDirection.OUTBOUND
      }],
      ipAddress,
      userAgent
    );
    if (!thread.id) throw new Error("Thread did not generate an ID");
    if (thread.subject !== 'Follow up on our meeting') throw new Error("Thread subject mismatch");
    if (thread.messages.length !== 1) throw new Error("Thread messages length mismatch");
    log("[PASS] Thread created correctly with associated first message.");
    executed++;

    // 2. Add Message to Thread (Reply Tracking)
    const replyThread = await InboxService.addMessage(
      tenantId,
      thread.id,
      {
        from: 'client@example.com',
        to: 'sales@acme.com',
        body: 'Likewise. Send me the proposal.',
        direction: MessageDirection.INBOUND
      },
      userId,
      ipAddress,
      userAgent
    );
    if (replyThread.messages.length !== 2) throw new Error("Reply message not added");
    log("[PASS] Inbound message tracked successfully to existing thread.");
    executed++;

    // 3. Assignment and Status update
    const updatedThread = await InboxService.updateThread(
      tenantId,
      thread.id,
      ThreadStatus.SNOOZED,
      'usr-2',
      userId,
      ipAddress,
      userAgent
    );
    if (updatedThread.status !== ThreadStatus.SNOOZED) throw new Error("Status update failed");
    if (updatedThread.assignedTo !== 'usr-2') throw new Error("Assignment failed");
    log("[PASS] Thread assigned and status updated properly.");
    executed++;

    // 4. Thread Internal Notes
    const notesThread = await InboxService.addNote(
      tenantId,
      thread.id,
      userId,
      'Will ping Sarah for the proposal draft',
      ipAddress,
      userAgent
    );
    if (notesThread.notes.length !== 1) throw new Error("Thread internal note failed");
    log("[PASS] Internal note securely appended to conversation thread.");
    executed++;

    // 5. Validation Catchers
    let caughtEmptySubject = false;
    try {
      await InboxService.createThread(tenantId, userId, undefined, '', ThreadStatus.OPEN, undefined, [], ipAddress, userAgent);
    } catch (e: any) {
      if (e.message.includes('Subject is required')) caughtEmptySubject = true;
    }
    if (!caughtEmptySubject) throw new Error("Empty subject validation failed");
    log("[PASS] Security validation: Blocked thread creation with empty subjects.");
    executed++;

    log(`[INFO] Completed inbox service check: Checked ${executed} assertions. Failed: 0.`);
    return { success: true, executed };
  } catch (error: any) {
    log(`[FAIL] Inbox service check failed: ${error.message}`);
    return { success: false, executed };
  }
}
