/**
 * Simple in-memory rate limiter for API routes
 * For production with multiple instances, use Redis-based rate limiting
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  limit: number
  /** Time window in seconds */
  windowSeconds: number
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier for the client (e.g., IP address, user ID)
 * @param config - Rate limit configuration
 * @returns Rate limit result with headers info
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now()
  const windowMs = config.windowSeconds * 1000
  const resetTime = now + windowMs

  const existing = rateLimitStore.get(identifier)

  // If no existing entry or window expired, create new entry
  if (!existing || now > existing.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    })
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      reset: resetTime,
    }
  }

  // Increment count
  existing.count++
  rateLimitStore.set(identifier, existing)

  // Check if over limit
  if (existing.count > config.limit) {
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      reset: existing.resetTime,
    }
  }

  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - existing.count,
    reset: existing.resetTime,
  }
}

// Preset configurations for different API types
export const rateLimitConfigs = {
  // Standard API routes - 100 requests per minute
  standard: { limit: 100, windowSeconds: 60 },
  // Auth routes - stricter to prevent brute force
  auth: { limit: 10, windowSeconds: 60 },
  // Search/listing routes - higher limit for browsing
  search: { limit: 200, windowSeconds: 60 },
  // Write operations - moderate limit
  write: { limit: 30, windowSeconds: 60 },
  // Upload routes - very limited
  upload: { limit: 10, windowSeconds: 60 },
  // Stripe/payment routes
  payment: { limit: 20, windowSeconds: 60 },
}

/**
 * Get client identifier from request
 * Uses X-Forwarded-For for proxied requests, falls back to a default
 */
export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim() || "unknown"
  return ip
}

/**
 * Create rate limit headers for response
 */
export function createRateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": Math.ceil(result.reset / 1000).toString(),
  }
}
