import crypto from 'crypto';
import { User } from '../types';

/**
 * Authentication Typings and Payloads
 */

export interface TokenPayload {
  sub: string;         // User ID
  email: string;       // Email
  role: 'Owner' | 'Admin' | 'Member' | 'Agent';
  tenantId: string;    // Tenant ID
  jti: string;         // Unique Token ID (for revocation checks)
  iat: number;         // Issued At
  exp: number;         // Expires At
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface SecurityAuditTrail {
  timestamp: string;
  action: string;
  userId?: string;
  tenantId?: string;
  ipAddress: string;
  userAgent: string;
  status: 'SUCCESS' | 'FAILURE';
  reason?: string;
}

/**
 * Cryptographic Password Hashing Engine using Node.js pbkdf2
 * Formulates secure, production-grade salt + hash format.
 */
export class PasswordHasher {
  private static readonly KEY_LEN = 64;
  private static readonly ITERATIONS = 120000;
  private static readonly DIGEST = 'sha512';

  /**
   * Hashes a password securely with pbkdf2 and a unique salt.
   */
  public static async hash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(32).toString('hex');
      crypto.pbkdf2(
        password,
        salt,
        this.ITERATIONS,
        this.KEY_LEN,
        this.DIGEST,
        (err, derivedKey) => {
          if (err) return reject(err);
          resolve(`${salt}:${derivedKey.toString('hex')}`);
        }
      );
    });
  }

  /**
   * Validates a password against a secure stored salt:hash payload.
   */
  public static async verify(password: string, storedHash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const parts = storedHash.split(':');
      if (parts.length !== 2) {
        return reject(new Error('Invalid stored hash structure. Expected salt:hash'));
      }
      const [salt, hash] = parts;
      const originalHashBuffer = Buffer.from(hash, 'hex');

      crypto.pbkdf2(
        password,
        salt,
        this.ITERATIONS,
        this.KEY_LEN,
        this.DIGEST,
        (err, derivedKey) => {
          if (err) return reject(err);
          // Timing-safe verification prevents side-channel timing analysis attacks.
          const matches = crypto.timingSafeEqual(originalHashBuffer, derivedKey);
          resolve(matches);
        }
      );
    });
  }
}

/**
 * Production-ready Custom JWT Engine (HS256 compliant)
 * Custom implementation avoiding dependencies, designed with maximum type safety and compliance.
 */
export class TokenService {
  private static getSecret(): string {
    const s = process.env.JWT_SECRET;
    if (!s || s === 'YOUR_JWT_SECRET_HERE' || s.trim() === '') {
      // Secure local fallback for development purposes only
      return 'de8c12852233f2bd2cce9196b0559a49931ad6af14b7e80f089856cc4605e54c';
    }
    return s;
  }

  private static base64UrlEncode(str: string): string {
    return Buffer.from(str)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  private static base64UrlDecode(str: string): string {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return Buffer.from(base64, 'base64').toString('utf8');
  }

  /**
   * Generates a fully compliant cryptographically signed custom HS256 JWT representation.
   */
  public static sign(payload: Omit<TokenPayload, 'iat' | 'exp'>, expiresInSeconds: number): string {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + expiresInSeconds;
    const fullPayload: TokenPayload = { ...payload, iat, exp };

    const header = { alg: 'HS256', typ: 'JWT' };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(fullPayload));

    const signature = crypto
      .createHmac('sha256', this.getSecret())
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest();

    const encodedSignature = signature
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  }

  /**
   * Verifies and decodes a signed token. Returns the payload or throws descriptive errors.
   */
  public static verify(token: string): TokenPayload {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Malformed token structure. Expected 3 segments.');
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts;

    // Validate Signature integrity
    const computedSignature = crypto
      .createHmac('sha256', this.getSecret())
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest();

    const expectedSignature = computedSignature
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    // Use timingSafeEqual on strings to protect against timing analysis
    const sigMatches = crypto.timingSafeEqual(
      Buffer.from(encodedSignature),
      Buffer.from(expectedSignature)
    );

    if (!sigMatches) {
      throw new Error('Signature verification failed. Token integrity is compromised.');
    }

    // Decode and compile Payload structures
    const payloadJson = this.base64UrlDecode(encodedPayload);
    const decodedPayload = JSON.parse(payloadJson) as TokenPayload;

    // Verify expirations
    const now = Math.floor(Date.now() / 1000);
    if (decodedPayload.exp <= now) {
      throw new Error('Token has expired. Re-authentication is required.');
    }

    return decodedPayload;
  }
}

/**
 * Access Token Revocation Cache (Mock Redis layer inside runtime memory)
 * Ensures session management capabilities and immediate privilege termination.
 */
export class TokenRevocationRegistry {
  private static revokedTokens: Set<string> = new Set();
  private static blacklistExpirations: Map<string, number> = new Map();

  /**
   * Flag a given JTI as permanently structural revoked.
   */
  public static revoke(jti: string, expTimestamp: number): void {
    this.revokedTokens.add(jti);
    this.blacklistExpirations.set(jti, expTimestamp);
    this.reapExpired();
  }

  /**
   * Checks if a JTI has been flagged inside the revocation list.
   */
  public static isRevoked(jti: string): boolean {
    this.reapExpired();
    return this.revokedTokens.has(jti);
  }

  /**
   * Clear stale JTI logs to prevent persistent memory leaks.
   */
  private static reapExpired(): void {
    const now = Math.floor(Date.now() / 1000);
    this.blacklistExpirations.forEach((exp, jti) => {
      if (exp <= now) {
        this.revokedTokens.delete(jti);
        this.blacklistExpirations.delete(jti);
      }
    });
  }
}
