// src/backend/types/auth.ts

export type UserRole = 'Owner' | 'Admin' | 'Member' | 'Agent';

export interface JWTPayload {
  sub: string;         // User ID
  email: string;       // Email Address
  role: UserRole;      // RBAC Role
  tenantId: string;    // Data Isolation Tenant ID
  jti: string;         // Unique claim ID for revocation checks
  iat: number;         // Issued At
  exp: number;         // Expires At
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
  iat: number;
  exp: number;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId: string;
  isVerified: boolean;
  avatar?: string | null;
}

export interface AuthSuccessResponse {
  user: UserSession;
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // in seconds
}

export interface SecurityAuditEntry {
  timestamp: Date;
  action: string;
  userId?: string | null;
  tenantId?: string | null;
  ipAddress: string;
  userAgent: string;
  status: 'SUCCESS' | 'FAILURE';
  reason?: string | null;
}
