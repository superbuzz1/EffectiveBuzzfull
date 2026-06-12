// src/backend/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { TokenSecurityEngine } from '../services/AuthServiceV2';
import { RedisService } from '../services/RedisService';
import { UserRole } from '../types/auth';

export interface AuthenticatedUserRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    tenantId: string;
    jti: string;
  };
}

/**
 * Access Token Authentication Middleware.
 * Validates request Bearer Authorization JWT tokens, checks blacklist registries,
 * and sets the resolved user claims object onto the request body context.
 */
export async function authenticateAccessToken(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ 
      error: "Authentication Denied: Missing Authorization Header wrapper credentials." 
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ 
      error: "Authentication Denied: Authorizations must match exact 'Bearer <Token>' standard form." 
    });
  }

  const token = parts[1];

  try {
    const claims = TokenSecurityEngine.verifyAccessToken(token);

    // Enforce instant global revocation validation (blacklist verification check)
    const isRevoked = await RedisService.isBlacklisted(claims.jti);
    if (isRevoked) {
      return res.status(401).json({ 
        error: "Session Revoked: Your session token identifier has been revoked or signed out." 
      });
    }

    // Attach verified user payload
    (req as AuthenticatedUserRequest).user = {
      id: claims.sub,
      email: claims.email,
      role: claims.role,
      tenantId: claims.tenantId,
      jti: claims.jti
    };

    next();
  } catch (err: any) {
    return res.status(401).json({ 
      error: `Invalid Access Token: Verification exception parsed: ${err.message}` 
    });
  }
}

/**
 * RBAC Role Authorizer Gateway generator.
 * Restricts active routes to an explicitly listed array of user group roles.
 */
export function enforceUserRoles(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authedRequest = req as AuthenticatedUserRequest;
    if (!authedRequest.user) {
      return res.status(401).json({ 
        error: "Authentication Denied: Unrecognized token verification context." 
      });
    }

    if (!allowedRoles.includes(authedRequest.user.role)) {
      return res.status(403).json({ 
        error: `Forbidden Permission: User role "${authedRequest.user.role}" does not have clearance scopes. Required permissions: [${allowedRoles.join(', ')}]` 
      });
    }

    next();
  };
}
