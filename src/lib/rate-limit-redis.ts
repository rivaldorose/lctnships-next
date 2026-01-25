import { Ratelimit } from "@upstash/ratelimit"
import { getRedis, isRedisAvailable } from "./redis"

// Rate limiters for different API types
let rateLimiters: {
  standard: Ratelimit | null
  auth: Ratelimit | null
  upload: Ratelimit | null
  payment: Ratelimit | null
  search: Ratelimit | null
} | null = null

/**
 * Initialize rate limiters with Redis
 */
function initRateLimiters() {
  if (rateLimiters) return rateLimiters

  const redis = getRedis()
  if (!redis) {
    rateLimiters = {
      standard: null,
      auth: null,
      upload: null,
      payment: null,
      search: null,
    }
    return rateLimiters
  }

  rateLimiters = {
    // Standard API routes - 100 requests per minute
    standard: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "1 m"),
      analytics: true,
      prefix: "ratelimit:standard",
    }),

    // Auth routes - stricter to prevent brute force (10 per minute)
    auth: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      analytics: true,
      prefix: "ratelimit:auth",
    }),

    // Upload routes - limited (10 per minute)
    upload: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      analytics: true,
      prefix: "ratelimit:upload",
    }),

    // Payment/Stripe routes (20 per minute)
    payment: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 m"),
      analytics: true,
      prefix: "ratelimit:payment",
    }),

    // Search routes - higher limit for browsing (200 per minute)
    search: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(200, "1 m"),
      analytics: true,
      prefix: "ratelimit:search",
    }),
  }

  return rateLimiters
}

export type RateLimitType = "standard" | "auth" | "upload" | "payment" | "search"

/**
 * Check rate limit for a given identifier
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param type - Type of rate limit to apply
 * @returns Rate limit result
 */
export async function checkRateLimit(
  identifier: string,
  type: RateLimitType = "standard"
): Promise<{
  success: boolean
  limit: number
  remaining: number
  reset: number
}> {
  // If Redis is not available, allow the request (fall back to in-memory in middleware)
  if (!isRedisAvailable()) {
    return {
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    }
  }

  const limiters = initRateLimiters()
  const limiter = limiters[type]

  if (!limiter) {
    return {
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    }
  }

  try {
    const result = await limiter.limit(identifier)
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    }
  } catch (error) {
    console.error("Rate limit check error:", error)
    // Allow request on error
    return {
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60000,
    }
  }
}

/**
 * Get rate limit type based on pathname
 */
export function getRateLimitType(pathname: string): RateLimitType {
  if (pathname.startsWith("/api/auth")) return "auth"
  if (pathname.startsWith("/api/upload")) return "upload"
  if (pathname.startsWith("/api/stripe")) return "payment"
  if (pathname.startsWith("/api/studios") && pathname.includes("search")) return "search"
  if (pathname === "/api/studios") return "search"
  return "standard"
}
