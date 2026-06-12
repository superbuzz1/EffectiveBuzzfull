// src/backend/services/AuthServiceV2.ts
import crypto from 'crypto';
import { JWTPayload, RefreshTokenPayload } from '../types/auth';

/**
 * Standard Security Constants conforming to OWASP guidelines.
 */
export const JWT_ACCESS_TTL_SEC = 3600;        // 1 Hour
export const JWT_REFRESH_TTL_SEC = 2592000;    // 30 Days (86400 * 30)

export class PasswordSecurity {
  private static readonly KEY_LEN = 64;
  private static readonly ITERATIONS = 120000; // Computational effort protection against hardware brute force
  private static readonly DIGEST = 'sha512';

  /**
   * Hashes a password using crypto.pbkdf2 securely with automatic unique salt.
   */
  public static async hashPassword(password: string): Promise<string> {
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
   * Timing-safe verification to prevent information leaks in network timings.
   */
  public static async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const parts = storedHash.split(':');
      if (parts.length !== 2) {
        return reject(new Error('Invalid password hash schema detected. Expected salt:hash format.'));
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
          if (originalHashBuffer.length !== derivedKey.length) {
            return resolve(false);
          }
          // Constant-time comparison ensures attackers cannot guess valid parts via response timing deltas.
          const matches = crypto.timingSafeEqual(originalHashBuffer, derivedKey);
          resolve(matches);
        }
      );
    });
  }
}

export class TokenSecurityEngine {
  private static getSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.trim() === '' || secret === 'YOUR_JWT_SECRET_HERE') {
      return 'de8c12852233f2bd2cce9196b0559a49931ad6af14b7e80f089856cc4605e54c';
    }
    return secret;
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
   * Signs a secure HS256 JWT using native Node.js HMAC-SHA256.
   */
  public static signAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>, ttlSeconds: number = JWT_ACCESS_TTL_SEC): string {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + ttlSeconds;
    const fullPayload: JWTPayload = { ...payload, iat, exp };

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
   * Decodes, verifies signature integrity, and unpacks the JWTPayload.
   */
  public static verifyAccessToken(token: string): JWTPayload {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Malformed token envelope schema.');
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts;

    const computedSignature = crypto
      .createHmac('sha256', this.getSecret())
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest();

    const expectedSignature = computedSignature
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    // Protect against signature verification timing side-channels
    const sig1 = Buffer.from(encodedSignature);
    const sig2 = Buffer.from(expectedSignature);
    if (sig1.length !== sig2.length) {
      throw new Error('Cryptographic token signature validation mismatch.');
    }
    const sigMatches = crypto.timingSafeEqual(sig1, sig2);

    if (!sigMatches) {
      throw new Error('Cryptographic token signature validation mismatch.');
    }

    const parsedPayload = JSON.parse(this.base64UrlDecode(encodedPayload)) as JWTPayload;
    
    // Check temporal bounds (expiration)
    const currentEpoch = Math.floor(Date.now() / 1000);
    if (parsedPayload.exp <= currentEpoch) {
      throw new Error('Token expiration lifespan completed.');
    }

    return parsedPayload;
  }

  /**
   * Signs a dedicated custom Refresh Token with its own expiration profiles.
   */
  public static generateRefreshToken(userId: string, jti: string, ttlSeconds: number = JWT_REFRESH_TTL_SEC): string {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + ttlSeconds;
    const payload: RefreshTokenPayload = { sub: userId, jti, iat, exp };

    const header = { alg: 'HS256', typ: 'JWT_REFRESH' };
    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));

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

  public static verifyRefreshToken(token: string): RefreshTokenPayload {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Malformed refresh token envelope.');
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts;

    const computedSignature = crypto
      .createHmac('sha256', this.getSecret())
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest();

    const expectedSignature = computedSignature
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    const sig1 = Buffer.from(encodedSignature);
    const sig2 = Buffer.from(expectedSignature);
    if (sig1.length !== sig2.length) {
      throw new Error('Cryptographic refresh signature validation mismatch.');
    }
    const sigMatches = crypto.timingSafeEqual(sig1, sig2);

    if (!sigMatches) {
      throw new Error('Cryptographic refresh signature validation mismatch.');
    }

    const payload = JSON.parse(this.base64UrlDecode(encodedPayload)) as RefreshTokenPayload;
    if (payload.exp <= Math.floor(Date.now() / 1000)) {
      throw new Error('Refresh token session has expired.');
    }

    return payload;
  }
}
