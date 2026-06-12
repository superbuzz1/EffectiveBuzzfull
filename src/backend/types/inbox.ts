export enum ThreadStatus {
  OPEN = 'OPEN',
  SNOOZED = 'SNOOZED',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED'
}

export enum MessageDirection {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND'
}

export interface InboxNote {
  id: string;
  threadId: string;
  userId: string;
  body: string;
  createdAt: Date;
}

export interface InboxMessage {
  id: string;
  threadId: string;
  from: string;
  to: string;
  body: string;
  direction: MessageDirection;
  createdAt: Date;
}

export interface InboxThread {
  id: string;
  tenantId: string;
  prospectId?: string;
  subject: string;
  status: ThreadStatus;
  assignedTo?: string | null;
  messages: InboxMessage[];
  notes: InboxNote[];
  createdAt: Date;
  updatedAt: Date;
}
