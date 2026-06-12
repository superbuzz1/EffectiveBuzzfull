// src/backend/types/userManagement.ts
import { UserRole } from './auth';

export interface UserProfile {
  userId: string;
  bio: string | null;
  title: string | null;
  department: string | null;
  phoneNumber: string | null;
  timezone: string;
}

export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  emailMarketing: boolean;
  emailSecurity: boolean;
  emailProductUpdates: boolean;
  defaultWorkspaceId: string | null;
  language: string;
}

export interface UserPreferencesUpdateInput {
  theme?: 'light' | 'dark' | 'system';
  emailMarketing?: boolean;
  emailSecurity?: boolean;
  emailProductUpdates?: boolean;
  defaultWorkspaceId?: string | null;
  language?: string;
}

export const TENANT_ROLE_RANKS: Record<UserRole, number> = {
  Owner: 4,
  Admin: 3,
  Member: 2,
  Agent: 1
};
