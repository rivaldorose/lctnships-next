/**
 * Simple in-memory cache for API responses
 * For production with multiple instances, use Redis
 */

interface CacheEntry<T> {
  data: T
  expiresAt: number
}

const cache = new Map<string, CacheEntry<unknown>>()

// Clean up expired entries every minute
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of cache.entries()) {
    if (now > entry.expiresAt) {
      cache.delete(key)
    }
  }
}, 60 * 1000)

/**
 * Get a value from cache
 */
export function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null

  if (Date.now() > entry.expiresAt) {
    cache.delete(key)
    return null
  }

  return entry.data as T
}

/**
 * Set a value in cache
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttlSeconds - Time to live in seconds (default: 60)
 */
export function setInCache<T>(key: string, data: T, ttlSeconds = 60): void {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
  })
}

/**
 * Invalidate cache entries matching a pattern
 * @param pattern - String pattern to match (uses startsWith)
 */
export function invalidateCache(pattern: string): void {
  for (const key of cache.keys()) {
    if (key.startsWith(pattern)) {
      cache.delete(key)
    }
  }
}

/**
 * Clear all cache entries
 */
export function clearCache(): void {
  cache.clear()
}

/**
 * Generate a cache key from request parameters
 */
export function createCacheKey(prefix: string, params: Record<string, string | undefined>): string {
  const sortedParams = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&")

  return `${prefix}:${sortedParams || "default"}`
}

// Cache TTL presets (in seconds)
export const cacheTTL = {
  // Very short - for frequently changing data
  short: 30,
  // Standard - for semi-static data
  standard: 60,
  // Medium - for slower changing data
  medium: 300,
  // Long - for mostly static data
  long: 900,
  // Very long - for static data
  static: 3600,
}
