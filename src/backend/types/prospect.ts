// src/backend/types/prospect.ts

export interface ProspectNote {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  authorName: string;
}

export type ProspectStatus = 'New' | 'Contacted' | 'Qualified' | 'Unqualified' | 'Nurturing';

export interface Prospect {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  company: string | null;
  title: string | null;
  phone: string | null;
  status: ProspectStatus;
  tags: string[];
  notes: ProspectNote[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null; // Null means NOT soft-deleted
}

export interface ProspectCreateInput {
  name: string;
  email: string;
  company?: string | null;
  title?: string | null;
  phone?: string | null;
  status?: ProspectStatus;
  tags?: string[];
}

export interface ProspectUpdateInput {
  name?: string;
  email?: string;
  company?: string | null;
  title?: string | null;
  phone?: string | null;
  status?: ProspectStatus;
  tags?: string[];
}
