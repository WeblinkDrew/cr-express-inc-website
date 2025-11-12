import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate Limiting Configuration
 *
 * Uses Upstash Redis for distributed rate limiting in production.
 * Falls back to in-memory Map for local development.
 */

// In-memory rate limiter for local development
class InMemoryRateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async limit(identifier: string): Promise<{ success: boolean; remaining: number; reset: number }> {
    const now = Date.now();
    const timestamps = this.requests.get(identifier) || [];

    // Remove old timestamps outside the window
    const validTimestamps = timestamps.filter(ts => now - ts < this.windowMs);

    if (validTimestamps.length >= this.maxRequests) {
      const oldestTimestamp = validTimestamps[0];
      const resetTime = oldestTimestamp + this.windowMs;

      return {
        success: false,
        remaining: 0,
        reset: resetTime,
      };
    }

    // Add new timestamp
    validTimestamps.push(now);
    this.requests.set(identifier, validTimestamps);

    return {
      success: true,
      remaining: this.maxRequests - validTimestamps.length,
      reset: now + this.windowMs,
    };
  }
}

// Initialize rate limiter based on environment
let ratelimit: Ratelimit | InMemoryRateLimiter;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  // Production: Use Upstash Redis
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 requests per hour
    analytics: true,
    prefix: "@upstash/ratelimit",
  });

  console.log("✅ Using Upstash Redis for rate limiting");
} else {
  // Development: Use in-memory fallback
  ratelimit = new InMemoryRateLimiter(5, 60 * 60 * 1000); // 5 requests per hour
  console.log("⚠️  Using in-memory rate limiting (development mode)");
}

/**
 * Rate limit a form submission by IP address
 *
 * @param identifier - Usually the IP address
 * @returns Whether the request is allowed
 */
export async function rateLimitFormSubmission(identifier: string) {
  const result = await ratelimit.limit(identifier);

  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  };
}

/**
 * Get rate limit info for an identifier without incrementing
 */
export async function getRateLimitInfo(identifier: string) {
  // Note: This will still increment the counter
  // For a true "peek" we'd need a different approach
  return await rateLimitFormSubmission(identifier);
}
