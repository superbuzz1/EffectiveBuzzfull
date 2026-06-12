// src/backend/tests/auth.test.ts
import { PasswordSecurity, TokenSecurityEngine } from '../services/AuthServiceV2';
import { RedisService } from '../services/RedisService';

export async function runUnitTests(log: (msg: string) => void): Promise<{ success: boolean; total: number; failed: number }> {
  log("\n--- STARTING CRYPTOGRAPHIC CORE UNIT TESTS ---");
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
    // Test Case 1: Password Encryption Parity
    const pass = "S3cur3P@ssword!!";
    const hashed = await PasswordSecurity.hashPassword(pass);
    assert(hashed !== pass, "PasswordSecurity.hashPassword: Hashed string must differ from raw inputs.");
    assert(hashed.includes(":"), "PasswordSecurity.hashPassword: Generated payload must adhere to salt:hash format.");

    // Test Case 2: Positive verify comparison
    const match = await PasswordSecurity.verifyPassword(pass, hashed);
    assert(match === true, "PasswordSecurity.verifyPassword: Valid credential checking must succeed.");

    // Test Case 3: Negative verify checks
    const mismatch = await PasswordSecurity.verifyPassword("IncorrectPassword123!", hashed);
    assert(mismatch === false, "PasswordSecurity.verifyPassword: Invalid credential checks must fail safely.");

    // Test Case 4: Salt Entropy Randomness
    const hashed2 = await PasswordSecurity.hashPassword(pass);
    assert(hashed !== hashed2, "PasswordSecurity.hashPassword: Hash signatures must differ across iterations to block rainbow tables.");

    // Test Case 5: JWT HS256 Token sign structure
    const payload = {
      sub: "usr-49231",
      email: "engineer@effectivebuzz.com",
      role: "Admin" as const,
      tenantId: "tenant-3",
      jti: "jti-9310"
    };

    const token = TokenSecurityEngine.signAccessToken(payload, 30);
    const parts = token.split('.');
    assert(parts.length === 3, "TokenSecurityEngine: Created tokens must hold exact 3 period-delimited segments.");

    // Test Case 6: Claims retrieval accuracy
    const deserialized = TokenSecurityEngine.verifyAccessToken(token);
    assert(deserialized.sub === payload.sub, "TokenSecurityEngine: Reclaimed subject claim fits payload.");
    assert(deserialized.role === payload.role, "TokenSecurityEngine: RBAC authorization role matches payload.");
    assert(deserialized.tenantId === payload.tenantId, "TokenSecurityEngine: Multi-tenant boundary resolved accurately.");

    // Test Case 7: Token Modification/Tampering Interception
    const tamperedPayloadStr = Buffer.from(JSON.stringify({ ...deserialized, role: "Owner" })).toString('base64').replace(/=/g, '');
    const tamperedToken = `${parts[0]}.${tamperedPayloadStr}.${parts[2]}`;
    
    let errorIntercepted = false;
    try {
      TokenSecurityEngine.verifyAccessToken(tamperedToken);
    } catch {
      errorIntercepted = true;
    }
    assert(errorIntercepted === true, "TokenSecurityEngine: Mutilated claims segment must flag verify signature mismatches.");

    // Test Case 8: Session Revocation checks
    await RedisService.blacklistToken("jti-9310", Math.floor(Date.now() / 1000) + 120);
    const revoked = await RedisService.isBlacklisted("jti-9310");
    assert(revoked === true, "RedisService: Eviction registries enqueued JTIs trigger revocation alerts.");

  } catch (err: any) {
    log(`  [EXCEPTION] Unit testing suite was aborted early due to an error: ${err.message}`);
    failed++;
  }

  return { success: failed === 0, total: passed + failed, failed };
}
