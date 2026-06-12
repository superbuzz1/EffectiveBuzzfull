export interface Tenant {
  id: string;
  name: string;
  domain: string;
  plan: 'Growth' | 'Professional' | 'Enterprise';
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Agent';
  tenantId: string;
  avatar: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'Draft' | 'Active' | 'Paused' | 'Completed';
  targetAudience: string;
  leadsCount: number;
  emailsSent: number;
  repliesCount: number;
  conversionRate: number;
  createdAt: string;
}

export interface Lead {
  id: string;
  campaignId: string;
  firstName: string;
  lastName: string;
  company: string;
  title: string;
  email: string;
  status: 'New' | 'Prospected' | 'Emailed' | 'Replied' | 'Unsubscribed' | 'Bounced';
  score: number; // 0-100 fit score
  personalizedEmail?: string;
  repliedMessage?: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  service: string;
  message: string;
  durationMs?: number;
}

export interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime24h: number; // e.g. 99.98
  latencyMs: number;
}

export interface Incident {
  id: string;
  title: string;
  status: 'resolved' | 'investigating' | 'identified';
  severity: 'minor' | 'major' | 'critical';
  createdAt: string;
  updatedAt: string;
  updates: { timestamp: string; message: string }[];
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters: { name: string; type: string; required: boolean; desc: string }[];
  requestBody?: string;
  responseSchemaName: string;
}

export interface DatabaseTable {
  name: string;
  description: string;
  columns: { name: string; type: string; constraints: string; desc: string }[];
  relations: { column: string; toTable: string; toColumn: string; type: string }[];
}
