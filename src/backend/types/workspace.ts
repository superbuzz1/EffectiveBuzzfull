// src/backend/types/workspace.ts

export type WorkspaceRole = 'Owner' | 'Admin' | 'Manager' | 'SDR' | 'Viewer';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceMembership {
  id: string;
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
}

export interface WorkspaceInvitation {
  id: string;
  workspaceId: string;
  email: string;
  role: WorkspaceRole;
  token: string;
  expiresAt: Date;
  invitedById: string;
  createdAt: Date;
  isAccepted: boolean;
  invitedBy?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface WorkspaceWithMembers extends Workspace {
  memberships: WorkspaceMembership[];
}
