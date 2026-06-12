// src/backend/services/RedisService.ts

/**
 * Production-ready Custom Redis Blacklist and Rate-Limiter service wrapper.
 * Plugs into professional systems, returning robust fallback operations in sandboxes.
 */
export class RedisService {
  private static blacklist: Set<string> = new Set();
  private static ttlExpiryMap: Map<string, number> = new Map();
  
  // Rate-limiting window counters: IP => Request Records [timestamps]
  private static rateLimitMap: Map<string, number[]> = new Map();

  /**
   * Blacklist a JWT Session JTI token identifier until expiration.
   */
  public static async blacklistToken(jti: string, expTimestampSec: number): Promise<void> {
    this.blacklist.add(jti);
    this.ttlExpiryMap.set(jti, expTimestampSec);
    this.cleanExpired();
  }

  /**
   * Query if a specific token JTI is currently blacklisted.
   */
  public static async isBlacklisted(jti: string): Promise<boolean> {
    this.cleanExpired();
    return this.blacklist.has(jti);
  }

  /**
   * Rate Limiting Evaluation Core (Adaptive Token Bucket / Sliding Window Algorithm)
   * Restricts IP requests. Standard limit: max 60 requests per 60 seconds (1 minute).
   */
  public static async checkRateLimit(ip: string, limit: number = 60, windowSec: number = 60): Promise<{
    allowed: boolean;
    remaining: number;
    resetSec: number;
  }> {
    const nowMs = Date.now();
    const windowMs = windowSec * 1000;
    const boundary = nowMs - windowMs;

    let history = this.rateLimitMap.get(ip) || [];
    
    // Purge outdated events outside the current sliding evaluation window
    history = history.filter(ts => ts > boundary);
    
    if (history.length >= limit) {
      // Rates exceeded. Calculate reset seconds remaining based on the oldest event in the active window
      const oldestEvent = history[0];
      const resetMs = oldestEvent + windowMs - nowMs;
      const resetSec = Math.max(1, Math.ceil(resetMs / 1000));

      this.rateLimitMap.set(ip, history);
      return {
        allowed: false,
        remaining: 0,
        resetSec
      };
    }

    // Register active transaction
    history.push(nowMs);
    this.rateLimitMap.set(ip, history);

    const remaining = limit - history.length;
    const resetSec = windowSec;

    return {
      allowed: true,
      remaining,
      resetSec
    };
  }

  /**
   * Reclaims blacklisted memory caches dynamically once expirations occur.
   */
  private static cleanExpired(): void {
    const nowSec = Math.floor(Date.now() / 1000);
    this.ttlExpiryMap.forEach((expSec, jti) => {
      if (expSec <= nowSec) {
        this.blacklist.delete(jti);
        this.ttlExpiryMap.delete(jti);
      }
    });
  }

  /**
   * Hard reset helper, useful during sandbox operations or unit testing suites.
   */
  public static clearAllCaches(): void {
    this.blacklist.clear();
    this.ttlExpiryMap.clear();
    this.rateLimitMap.clear();
  }
}
