// src/backend/middleware/rateLimiter.ts
import { Request, Response, NextFunction } from 'express';
import { RedisService } from '../services/RedisService';

interface RateLimitOptions {
  limit: number;      // Max allowable hits
  windowSec: number;  // Time frame window span in seconds
}

/**
 * Sliding Window IP Rate Limiting Middleware.
 * Leverages high-speed key-value cache layer to limit api endpoints abuses.
 */
export function rateLimiter(options: RateLimitOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Derive client IP safely, falling back to connection paths
    const clientIp = (req.headers['x-forwarded-for'] as string) || 
                     req.socket.remoteAddress || 
                     '127.0.0.1';

    try {
      const evaluation = await RedisService.checkRateLimit(
        clientIp, 
        options.limit, 
        options.windowSec
      );

      // Write standard RFC rate headers to help caller agents coordinate throttle responses
      res.setHeader('X-RateLimit-Limit', options.limit);
      res.setHeader('X-RateLimit-Remaining', evaluation.remaining);
      res.setHeader('X-RateLimit-Reset', evaluation.resetSec);

      if (!evaluation.allowed) {
        res.setHeader('Retry-After', evaluation.resetSec);
        return res.status(429).json({
          error: "API Rates Exceeded: Too many requests. Please throttle your transactions.",
          retryAfterSeconds: evaluation.resetSec
        });
      }

      next();
    } catch (err: any) {
      console.error("[RATE_LIMIT_FATAL] Rate limit middleware threw an exception:", err);
      // Fail open in cases of internal rate cache degradation to protect core availability
      next();
    }
  };
}
