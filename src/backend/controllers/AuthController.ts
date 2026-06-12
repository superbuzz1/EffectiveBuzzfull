// src/backend/controllers/AuthController.ts
import { Request, Response } from 'express';
import { 
  RegisterRequestSchema, 
  LoginRequestSchema, 
  PasswordResetRequestSchema, 
  PasswordResetConfirmSchema, 
  EmailVerificationSchema,
  MagicLinkRequestSchema,
  MagicLinkVerifySchema
} from '../validation/authValidation';
import { DatabaseClient } from '../services/PrismaService';
import { PasswordSecurity, TokenSecurityEngine } from '../services/AuthServiceV2';
import { RedisService } from '../services/RedisService';
import { AuthenticatedUserRequest } from '../middleware/authMiddleware';

export class AuthController {
  
  /**
   * Action: Register a new Tenant space and User identity
   */
  public static async register(req: Request, res: Response) {
    const parsed = RegisterRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: "Validation Failed", 
        details: parsed.error.issues.map(i => i.message) 
      });
    }

    const { name, email, password, role, tenantName, tenantDomain } = parsed.data;
    const ipAddress = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    try {
      // 1. Prevent email collisions
      const emailLower = email.toLowerCase();
      const existingUser = await DatabaseClient.findUserByEmail(emailLower);
      if (existingUser) {
        await DatabaseClient.recordAuditEntry({
          action: `Register Collision: Rejected signup for [${emailLower}]`,
          userId: null,
          tenantId: null,
          ipAddress,
          userAgent,
          status: 'FAILURE',
          reason: "An account with this email address already exists in database schema."
        });
        return res.status(409).json({ error: "An account with this email address already exists." });
      }

      // 2. Resolve or provision tenant boundaries
      let tenant = await DatabaseClient.findTenantByDomain(tenantDomain);
      if (!tenant) {
        tenant = await DatabaseClient.createTenant(tenantName, tenantDomain);
      }

      // 3. Cryptographically hash password security
      const passwordHash = await PasswordSecurity.hashPassword(password);

      // 4. Create database user
      const user = await DatabaseClient.createUser({
        email: emailLower,
        passwordHash,
        name,
        role,
        isVerified: false, // Must verify via verification email workflow
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`,
        tenantId: tenant.id
      });

      // 5. Generate validation verify verification link model
      const verTokenHash = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
      const expiry = new Date(Date.now() + 24 * 3600 * 1000); // 24 Hours validity limits
      await DatabaseClient.createEmailVerificationToken(user.id, verTokenHash, expiry);

      // 6. Record successful audit trail logs
      await DatabaseClient.recordAuditEntry({
        action: `User Provisioned: Account [${emailLower}] with role [${role}] on Tenant [${tenant.name}]`,
        userId: user.id,
        tenantId: tenant.id,
        ipAddress,
        userAgent,
        status: 'SUCCESS',
        reason: null
      });

      return res.status(201).json({
        success: true,
        message: "Registration completed successfully. Please check your inbox to verify your email.",
        verificationTokenSandbox: verTokenHash, // Provided directly in sandbox environments for visibility!
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          tenantId: user.tenantId,
          isVerified: user.isVerified
        }
      });

    } catch (err: any) {
      console.error("[AUTH_REG_ERROR] Error enqueued registration mapping:", err);
      return res.status(500).json({ error: `Internal Server Error during registration: ${err.message}` });
    }
  }

  /**
   * Action: Authenticate and log in user
   */
  public static async login(req: Request, res: Response) {
    const parsed = LoginRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: "Validation Failed", 
        details: parsed.error.issues.map(i => i.message) 
      });
    }

    const { email, password } = parsed.data;
    const ipAddress = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    try {
      const emailLower = email.toLowerCase();
      const user = await DatabaseClient.findUserByEmail(emailLower);
      if (!user) {
        await DatabaseClient.recordAuditEntry({
          action: `Failed login attempt: Credential lookup failure for [${emailLower}]`,
          userId: null,
          tenantId: null,
          ipAddress,
          userAgent,
          status: 'FAILURE',
          reason: "No user matching this email address is registered."
        });
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Check password matching securely
      const isValid = await PasswordSecurity.verifyPassword(password, user.passwordHash);
      if (!isValid) {
        await DatabaseClient.recordAuditEntry({
          action: `Failed login attempt: Cryptohash password verification failure for [${user.email}]`,
          userId: user.id,
          tenantId: user.tenantId,
          ipAddress,
          userAgent,
          status: 'FAILURE',
          reason: "Password signature check fail."
        });
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Generate secure identifiers
      const accessJti = `acc-${Math.floor(Math.random() * 100000000)}`;
      const refreshJti = `ref-${Math.floor(Math.random() * 100000000)}`;

      // Issue tokens
      const accessToken = TokenSecurityEngine.signAccessToken({
        sub: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        jti: accessJti
      });

      const refreshToken = TokenSecurityEngine.generateRefreshToken(user.id, refreshJti);

      // Save valid record in database
      const refreshExpiry = new Date(Date.now() + 30 * 24 * 3600 * 1000); // 30 Days
      await DatabaseClient.saveRefreshToken({
        token: refreshToken,
        userId: user.id,
        jti: refreshJti,
        expiresAt: refreshExpiry
      });

      // Record successful login audit
      await DatabaseClient.recordAuditEntry({
        action: `User Sign-In: Authenticated session JTI [${accessJti}] matching role [${user.role}]`,
        userId: user.id,
        tenantId: user.tenantId,
        ipAddress,
        userAgent,
        status: 'SUCCESS',
        reason: null
      });

      return res.json({
        success: true,
        accessToken,
        refreshToken,
        expiresIn: 3600,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          tenantId: user.tenantId,
          isVerified: user.isVerified
        }
      });

    } catch (err: any) {
      console.error("[AUTH_LOGIN_ERROR] Error resolving authentication login handshake:", err);
      return res.status(500).json({ error: `Internal Handshake Failure: ${err.message}` });
    }
  }

  /**
   * Action: Log out user, revoking and evicting tracking sessions
   */
  public static async logout(req: Request, res: Response) {
    const authedReq = req as AuthenticatedUserRequest;
    if (!authedReq.user) {
      return res.status(401).json({ error: "Unauthorized session request." });
    }

    const { id, email, tenantId, jti } = authedReq.user;
    const ipAddress = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    try {
      // 1. Evict any database refresh tokens matching active user sessions
      await DatabaseClient.revokeAllRefreshTokensForUser(id);

      // 2. Set Access Token JTI on Redis Blacklist until expiration boundary
      const expEpoch = Math.floor(Date.now() / 1000) + 3600; // Force-blacklist for remaining TTL hour safety margin
      await RedisService.blacklistToken(jti, expEpoch);

      // 3. Log security state change
      await DatabaseClient.recordAuditEntry({
        action: `User Sign-Out: Session JTI [${jti}] permanently enqueued to eviction blacklist registry.`,
        userId: id,
        tenantId,
        ipAddress,
        userAgent,
        status: 'SUCCESS',
        reason: null
      });

      return res.json({ 
        success: true, 
        message: "Logged out successfully and cached session invalidated." 
      });

    } catch (err: any) {
      console.error("[AUTH_LOGOUT_ERROR] Error writing logout clearance:", err);
      return res.status(500).json({ error: `Internal Server Error during session eviction: ${err.message}` });
    }
  }

  /**
   * Action: Issue new Access Token using valid Refresh Token
   */
  public static async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Missing required validation payload parameter: refreshToken." });
    }

    const ipAddress = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    try {
      // 1. Verify token signature and temporal expiry fields
      const payload = TokenSecurityEngine.verifyRefreshToken(refreshToken);

      // 2. Fetch token from database registry to verify active validity status
      const storedToken = await DatabaseClient.findRefreshToken(refreshToken);
      if (!storedToken || storedToken.isRevoked || storedToken.expiresAt < new Date()) {
        await DatabaseClient.recordAuditEntry({
          action: `Security Alert: Unauthorized Refresh Token attempt with revoked token JTI [${payload.jti}]`,
          userId: payload.sub,
          tenantId: null,
          ipAddress,
          userAgent,
          status: 'FAILURE',
          reason: "This Refresh Token is not active or has been revoked."
        });
        return res.status(401).json({ error: "Refresh token has been revoked or is inactive." });
      }

      // 3. Resolve user and tenancy details
      const user = await DatabaseClient.findUserById(payload.sub);
      if (!user) {
        return res.status(401).json({ error: "User context not found." });
      }

      // 4. Issue new Access Token with unique token JTI mapping
      const newAccessJti = `acc-${Math.floor(Math.random() * 100000000)}`;
      const accessToken = TokenSecurityEngine.signAccessToken({
        sub: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        jti: newAccessJti
      });

      return res.json({
        success: true,
        accessToken,
        expiresIn: 3600
      });

    } catch (err: any) {
      return res.status(401).json({ error: `Session verification failed: ${err.message}` });
    }
  }

  /**
   * Action: Request a Password Reset Email (logs trace payload)
   */
  public static async requestPasswordReset(req: Request, res: Response) {
    const parsed = PasswordResetRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: "Validation Failed", 
        details: parsed.error.issues.map(i => i.message) 
      });
    }

    const { email } = parsed.data;
    const ipAddress = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    try {
      const emailLower = email.toLowerCase();
      const user = await DatabaseClient.findUserByEmail(emailLower);
      
      // Always return 200 OK to prevent username enumeration attacks! (OWASP security compliance)
      if (!user) {
        await DatabaseClient.recordAuditEntry({
          action: `Password Reset Request: Blocked check for unregistered address [${emailLower}]`,
          userId: null,
          tenantId: null,
          ipAddress,
          userAgent,
          status: 'FAILURE',
          reason: "Unregistered client request."
        });
        return res.json({
          success: true,
          message: "If an account with that email exists, we have dispatched a secure password reset link."
        });
      }

      const resetHash = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
      const exps = new Date(Date.now() + 1 * 3600 * 1000); // 1 Hour lifespan window
      await DatabaseClient.createPasswordResetToken(user.id, resetHash, exps);

      await DatabaseClient.recordAuditEntry({
        action: `Password Reset Issued: Code sent to [${user.email}]`,
        userId: user.id,
        tenantId: user.tenantId,
        ipAddress,
        userAgent,
        status: 'SUCCESS',
        reason: null
      });

      return res.json({
        success: true,
        message: "If an account with that email exists, we have dispatched a secure password reset link.",
        resetTokenSandbox: resetHash // Transmitted directly for visual simulation and playground use!
      });

    } catch (err: any) {
      return res.status(500).json({ error: `Error during reset lookup: ${err.message}` });
    }
  }

  /**
   * Action: Submit and confirm a password change
   */
  public static async confirmPasswordReset(req: Request, res: Response) {
    const parsed = PasswordResetConfirmSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: "Validation Failed", 
        details: parsed.error.issues.map(i => i.message) 
      });
    }

    const { token, newPassword } = parsed.data;
    const ipAddress = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    try {
      // 1. Consume and invalidate token
      const resetRecord = await DatabaseClient.verifyAndUsePasswordResetToken(token);
      
      // 2. Fetch and reload target user identifier
      const user = await DatabaseClient.findUserById(resetRecord.userId);
      if (!user) {
        return res.status(404).json({ error: "Identity not matching token registers." });
      }

      // 3. Cryptographically hash new password
      const newHash = await PasswordSecurity.hashPassword(newPassword);
      await DatabaseClient.updateUserPassword(user.id, newHash);

      // 4. Force global sessions termination to prevent stale session persistence (OWASP compliance)
      await DatabaseClient.revokeAllRefreshTokensForUser(user.id);

      await DatabaseClient.recordAuditEntry({
        action: `Password Reset Completed: Credential overwrite success for [${user.email}]`,
        userId: user.id,
        tenantId: user.tenantId,
        ipAddress,
        userAgent,
        status: 'SUCCESS',
        reason: null
      });

      return res.json({
        success: true,
        message: "Password reset successfully. Please log in with your new credentials."
      });

    } catch (err: any) {
      return res.status(400).json({ error: `Could not complete password reset: ${err.message}` });
    }
  }

  /**
   * Action: Verify user's email address
   */
  public static async verifyEmail(req: Request, res: Response) {
    const parsed = EmailVerificationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: "Validation Failed", 
        details: parsed.error.issues.map(i => i.message) 
      });
    }

    const { token } = parsed.data;
    const ipAddress = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    try {
      // 1. Verify and consume token parameters
      const verificationRecord = await DatabaseClient.verifyAndUseEmailVerificationToken(token);
      
      // 2. Resolve target user database model
      const user = await DatabaseClient.findUserById(verificationRecord.userId);
      if (!user) {
        return res.status(404).json({ error: "User identity correlation not found." });
      }

      // 3. Mark user verified in system records
      await DatabaseClient.updateUserVerificationStatus(user.id, true);

      await DatabaseClient.recordAuditEntry({
        action: `Email Verified: Account [${user.email}] successfully activated.`,
        userId: user.id,
        tenantId: user.tenantId,
        ipAddress,
        userAgent,
        status: 'SUCCESS',
        reason: null
      });

      return res.json({
        success: true,
        message: "Email verified successfully! Your account sandbox is now fully activated."
      });

    } catch (err: any) {
      return res.status(400).json({ error: `Could not verify email: ${err.message}` });
    }
  }

  /**
   * Action: Request a secure passwordless Magic Link
   */
  public static async requestMagicLink(req: Request, res: Response) {
    const parsed = MagicLinkRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: "Validation Failed", 
        details: parsed.error.issues.map(i => i.message) 
      });
    }

    const { email, name, tenantName, workspaceName } = parsed.data;
    const ipAddress = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    try {
      const emailLower = email.toLowerCase();
      
      // Look up existing user to determine if they need a complete onboarding profile
      const user = await DatabaseClient.findUserByEmail(emailLower);

      // Generate verification token hash
      const uniqueToken = `magic-${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)}`;
      const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 Mins validity limits

      await DatabaseClient.createMagicLinkToken(emailLower, uniqueToken, expiry, {
        name,
        tenantName,
        workspaceName
      });

      // Audit request dispatch
      await DatabaseClient.recordAuditEntry({
        action: `Magic Link Request: Generated token for [${emailLower}]`,
        userId: user ? user.id : null,
        tenantId: user ? user.tenantId : null,
        ipAddress,
        userAgent,
        status: 'SUCCESS',
        reason: null
      });

      return res.status(200).json({
        success: true,
        message: "Magic Link successfully generated. Token sent to workspace sandbox.",
        magicTokenSandbox: uniqueToken // Provided directly in sandbox for playground ease and testing!
      });

    } catch (err: any) {
      console.error("[AUTH_MAGIC_LINK_ERR] Magic Link requesting failure:", err);
      return res.status(500).json({ error: `Internal Server Error during magic link: ${err.message}` });
    }
  }

  /**
   * Action: Verify Magic Link Token and complete registration/login onboarding instantly
   */
  public static async verifyMagicLink(req: Request, res: Response) {
    const parsed = MagicLinkVerifySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: "Validation Failed", 
        details: parsed.error.issues.map(i => i.message) 
      });
    }

    const { token } = parsed.data;
    const ipAddress = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    try {
      // 1. Consume and invalidate the Magic Link Token
      const linkRecord = await DatabaseClient.verifyAndUseMagicLinkToken(token);
      const emailLower = linkRecord.email.toLowerCase();

      // 2. Resolve User identity
      let user = await DatabaseClient.findUserByEmail(emailLower);
      let tenantCreated = false;
      let workspaceCreated = false;
      let resolvedWorkspace: any = null;

      if (!user) {
        // User does not exist, so let's do Passwordless Registration!
        // We resolve tenant domain from corporate email or from payload
        const emailParts = emailLower.split('@');
        const defaultDomain = emailParts[1] || 'domain.io';
        const resolvedTenantName = linkRecord.tenantName || `${emailParts[0]}'s Corporate Space`;
        const resolvedTenantDomain = defaultDomain;

        let tenant = await DatabaseClient.findTenantByDomain(resolvedTenantDomain);
        if (!tenant) {
          tenant = await DatabaseClient.createTenant(resolvedTenantName, resolvedTenantDomain);
          tenantCreated = true;
        }

        // Construct a safe secure random password (they login passwordless anyway!)
        const randomPass = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
        const hashedPass = await PasswordSecurity.hashPassword(randomPass);

        user = await DatabaseClient.createUser({
          email: emailLower,
          passwordHash: hashedPass,
          name: linkRecord.name || emailParts[0],
          role: 'Owner', // They created the tenant, so they are Owner!
          isVerified: true, // Verification implicit through magic link consumption!
          avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`,
          tenantId: tenant.id
        });

        // 3. Immediately set up default workspace if requested or default
        const workspaceTitle = linkRecord.workspaceName || "Primary Hub";
        const workspaceSlug = workspaceTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || "primary-hub";
        
        resolvedWorkspace = await DatabaseClient.createWorkspace(tenant.id, workspaceTitle, workspaceSlug, user.id);
        workspaceCreated = true;

        await DatabaseClient.recordAuditEntry({
          action: `Passwordless Signup Onboard: Account [${emailLower}] registered and Workspace [${workspaceTitle}] provisioned.`,
          userId: user.id,
          tenantId: tenant.id,
          ipAddress,
          userAgent,
          status: 'SUCCESS',
          reason: null
        });
      }

      // 4. User is verified, issue session JWTs
      const accessJti = `acc-${Math.floor(Math.random() * 100000000)}`;
      const refreshJti = `ref-${Math.floor(Math.random() * 100000000)}`;

      const accessToken = TokenSecurityEngine.signAccessToken({
        sub: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        jti: accessJti
      });

      const refreshToken = TokenSecurityEngine.generateRefreshToken(user.id, refreshJti);
      const refreshExpiry = new Date(Date.now() + 30 * 24 * 3600 * 1000); // 30 Days

      await DatabaseClient.saveRefreshToken({
        token: refreshToken,
        userId: user.id,
        jti: refreshJti,
        expiresAt: refreshExpiry
      });

      // Fetch or look up workspaces for this tenant if not newly created
      if (!resolvedWorkspace) {
        const tenantWorkspaces = await DatabaseClient.listWorkspaces(user.tenantId);
        if (tenantWorkspaces.length > 0) {
          resolvedWorkspace = tenantWorkspaces[0];
        }
      }

      // Check workspace membership or join default if not in list
      if (resolvedWorkspace) {
        const hasMembership = await DatabaseClient.findMembership(resolvedWorkspace.id, user.id);
        if (!hasMembership) {
          await DatabaseClient.addMembership(resolvedWorkspace.id, user.id, 'Owner');
        }
      }

      await DatabaseClient.recordAuditEntry({
        action: `Magic Link Session Verification: Successfully authenticated [${emailLower}] via JTI [${accessJti}]`,
        userId: user.id,
        tenantId: user.tenantId,
        ipAddress,
        userAgent,
        status: 'SUCCESS',
        reason: null
      });

      return res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
        expiresIn: 3600,
        tenantCreated,
        workspaceCreated,
        workspace: resolvedWorkspace,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          tenantId: user.tenantId,
          isVerified: user.isVerified
        }
      });

    } catch (err: any) {
      console.error("[AUTH_MAGIC_LINK_VER_ERR] Magic Link validation failure:", err);
      // Audit failure
      await DatabaseClient.recordAuditEntry({
        action: `Magic Link Verify Failed: Token authorization rejected`,
        userId: null,
        tenantId: null,
        ipAddress,
        userAgent,
        status: 'FAILURE',
        reason: err.message
      });
      return res.status(401).json({ error: `Verification failed: ${err.message}` });
    }
  }
}
