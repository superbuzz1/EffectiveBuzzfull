import { DatabaseClient } from './PrismaService';
import { InboxThread, InboxMessage, InboxNote, ThreadStatus, MessageDirection } from '../types/inbox';

export class InboxService {
  public static async createThread(
    tenantId: string, 
    userId: string,
    prospectId: string | undefined, 
    subject: string, 
    status: ThreadStatus | undefined, 
    assignedTo: string | undefined, 
    messages: Omit<InboxMessage, 'id' | 'threadId' | 'createdAt'>[],
    ipAddress: string,
    userAgent: string
  ): Promise<InboxThread> {
    if (!subject) throw new Error("Subject is required to create a thread");

    const thread = await DatabaseClient.createInboxThread(tenantId, {
      prospectId,
      subject,
      status: status as any,
      assignedTo,
      messages: messages as any
    });

    await DatabaseClient.recordAuditEntry({
      action: "INBOX_THREAD_CREATE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Created thread: ${thread.id}`
    });

    return thread as unknown as InboxThread;
  }

  public static async getThreads(tenantId: string): Promise<InboxThread[]> {
    return await DatabaseClient.getInboxThreads(tenantId) as unknown as InboxThread[];
  }

  public static async getThread(tenantId: string, id: string): Promise<InboxThread | null> {
    return await DatabaseClient.getInboxThread(tenantId, id) as unknown as InboxThread | null;
  }

  public static async updateThread(
    tenantId: string, 
    id: string, 
    status: ThreadStatus | undefined, 
    assignedTo: string | null | undefined, 
    userId: string,
    ipAddress: string,
    userAgent: string
  ): Promise<InboxThread> {
    const thread = await DatabaseClient.updateInboxThread(tenantId, id, { status: status as any, assignedTo });

    await DatabaseClient.recordAuditEntry({
      action: "INBOX_THREAD_UPDATE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Updated thread: ${id}`
    });

    return thread as unknown as InboxThread;
  }

  public static async addMessage(
    tenantId: string, 
    threadId: string, 
    message: Omit<InboxMessage, 'id' | 'threadId' | 'createdAt'>,
    userId: string,
    ipAddress: string,
    userAgent: string
  ): Promise<InboxThread> {
    const thread = await DatabaseClient.addInboxMessage(tenantId, threadId, message as any);

    await DatabaseClient.recordAuditEntry({
      action: "INBOX_MESSAGE_ADD",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Added message to thread: ${threadId}`
    });

    return thread as unknown as InboxThread;
  }

  public static async addNote(
    tenantId: string, 
    threadId: string, 
    userId: string, 
    body: string,
    ipAddress: string,
    userAgent: string
  ): Promise<InboxThread> {
    if (!body || body.trim() === '') throw new Error("Note body cannot be empty");

    const thread = await DatabaseClient.addInboxNote(tenantId, threadId, userId, body);

    await DatabaseClient.recordAuditEntry({
      action: "INBOX_NOTE_ADD",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Added note to thread: ${threadId}`
    });

    return thread as unknown as InboxThread;
  }
}
