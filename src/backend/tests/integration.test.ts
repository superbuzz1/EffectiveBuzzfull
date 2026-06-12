// src/backend/tests/integration.test.ts
import { DatabaseClient } from '../services/PrismaService';
import { RedisService } from '../services/RedisService';

// Mock request-response flow to test endpoints in standard Express routes
import express, { Request, Response } from 'express';
import authRouter from '../routes/authRoutes';

export async function runIntegrationTests(log: (msg: string) => void): Promise<{ success: boolean; total: number; failed: number }> {
  log("\n--- STARTING API ROUTE INTEGRATION TESTS ---");
  let passed = 0;
  let failed = 0;

  const assert = (condition: boolean, testName: string) => {
    if (condition) {
      log(`  [PASS] ${testName}`);
      passed++;
    } else {
      log(`  [FAIL] ${testName}`);
      failed++;
    }
  };

  try {
    const app = express();
    app.use(express.json());
    app.use('/api/v2/auth', authRouter);

    // Dynamic Helper to simulate API requests directly on our routes
    const mockRequest = async (method: string, path: string, body: any, headers: any = {}): Promise<{ status: number; body: any }> => {
      return new Promise((resolve) => {
        let statusValue = 200;
        let responseJson: any = null;

        const req = {
          method,
          url: path,
          body,
          headers: { ...headers },
          ip: '192.168.1.18',
          socket: { remoteAddress: '192.168.1.18' }
        } as unknown as Request;

        const res = {
          setHeader: () => {},
          status: (code: number) => {
            statusValue = code;
            return res;
          },
          json: (data: any) => {
            responseJson = data;
            resolve({ status: statusValue, body: responseJson });
          }
        } as unknown as Response;

        // Route dispatcher matching auth routing pathways
        app(req, res, () => {});
      });
    };

    // Test Case 1: Validate Registration schema failure (Zod triggers error)
    const badReg = await mockRequest('POST', '/api/v2/auth/register', {
      name: "X",
      email: "bademail",
      password: "123",
      role: "SuperAdmin", // Unregistered role
      tenantName: "A",
      tenantDomain: ""
    });
    
    assert(badReg.status === 400, "API Register: Zod invalid validation properties must flag error status 400.");
    assert(badReg.body.error === "Validation Failed", "API Register: Error messages must cite validation errors.");

    // Test Case 2: Validate Successful Registration
    const clientReg = await mockRequest('POST', '/api/v2/auth/register', {
      name: "Devin Master",
      email: "devin@effectivebuzz.com",
      password: "StrongP@ssword12!",
      role: "Admin",
      tenantName: "Buzz Enterprise",
      tenantDomain: "effectivebuzz.com"
    });

    assert(clientReg.status === 201, "API Register: Valid parameters enqueues record with status 201.");
    assert(clientReg.body.success === true, "API Register: Successful response formats true success confirmation flag.");
    
    const verificationToken = clientReg.body.verificationTokenSandbox;
    assert(!!verificationToken, "API Register: Registration dispatches sandboxed validation verification token.");

    // Test Case 3: Verify Registered Email Verification Token Workflow
    const verifyMailResult = await mockRequest('POST', '/api/v2/auth/verify-email', {
      token: verificationToken
    });
    assert(verifyMailResult.status === 200, "API VerifyEmail: Enrolling correct token yields success status 200.");
    assert(verifyMailResult.body.success === true, "API VerifyEmail: Confirmations activate profiles.");

    // Test Case 4: Verify Login Flow
    const loginResult = await mockRequest('POST', '/api/v2/auth/login', {
      email: "devin@effectivebuzz.com",
      password: "StrongP@ssword12!"
    });

    assert(loginResult.status === 200, "API Login: Handshake succeeds on active verified credentials with status 200.");
    assert(!!loginResult.body.accessToken, "API Login: Session handshake supplies Access Token.");
    assert(!!loginResult.body.refreshToken, "API Login: Session handshake supplies Refresh Token.");

    const activeAccessToken = loginResult.body.accessToken;
    const activeRefreshToken = loginResult.body.refreshToken;

    // Test Case 5: Verify Refresh Token Handshake
    const refreshResult = await mockRequest('POST', '/api/v2/auth/refresh', {
      refreshToken: activeRefreshToken
    });
    assert(refreshResult.status === 200, "API RefreshToken: Dispatching unspent token yields new credentials.");
    assert(!!refreshResult.body.accessToken, "API RefreshToken: Correctly maps subsequent access token parameters.");

    // Test Case 6: Simulate Security Rate-Limitation blockage
    RedisService.clearAllCaches();
    // Flood the limiter to exceed 10 trials in 60s window
    let rateFiredResult: any = null;
    for (let i = 0; i < 11; i++) {
      rateFiredResult = await mockRequest('POST', '/api/v2/auth/login', {
        email: "devin@effectivebuzz.com",
        password: "StrongP@ssword12!"
      });
    }
    assert(rateFiredResult.status === 429, "API RateLimiter: Sliding rate limits block repetitive request floods with status 429.");

    // Clean caches to unblock downstream checks
    RedisService.clearAllCaches();

    // Test Case 7: API Magic Link Request
    const magicRequestResult = await mockRequest('POST', '/api/v2/auth/magic-link-request', {
      email: "serena@tennis.com",
      name: "Serena Williams",
      tenantName: "Serena Corporate",
      workspaceName: "Premium Court"
    });
    assert(magicRequestResult.status === 200, "API MagicLinkRequest: Valid parameters succeed with status 200.");
    const magicToken = magicRequestResult.body.magicTokenSandbox;
    assert(!!magicToken, "API MagicLinkRequest: Successfully retrieved token from sandbox payload.");

    // Test Case 8: API Magic Link Verification & Consolidated Onboarding
    const magicVerifyResult = await mockRequest('POST', '/api/v2/auth/magic-link-verify', {
      token: magicToken
    });
    assert(magicVerifyResult.status === 200, "API MagicLinkVerify: Valid token verifies successfully.");
    assert(magicVerifyResult.body.success === true, "API MagicLinkVerify: Valid token successfully validates onboarding.");
    assert(magicVerifyResult.body.tenantCreated === true, "API MagicLinkVerify: New domain auto-provisions a new Tenant.");
    assert(magicVerifyResult.body.workspaceCreated === true, "API MagicLinkVerify: New profile auto-creates Workspace.");
    assert(magicVerifyResult.body.workspace.name === "Premium Court", "API MagicLinkVerify: Custom Workspace name is enforced.");
    assert(magicVerifyResult.body.user.role === "Owner", "API MagicLinkVerify: User role defaults to Owner of new tenant space.");

  } catch (err: any) {
    log(`  [EXCEPTION] Integration testing suite was aborted early: ${err.message}`);
    failed++;
  }

  return { success: failed === 0, total: passed + failed, failed };
}
