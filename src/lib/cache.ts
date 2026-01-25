/**
 * Hybrid cache layer - uses Redis when available, falls back to in-memory
 */

import { getCache, setCache, deleteCache, invalidateCachePattern, isRedisAvailable, CACHE_TTL } from "./redis"

// In-memory fallback cache
interface CacheEntry<T> {
  data: T
  expiresAt: number
}

const memoryCache = new Map<string, CacheEntry<unknown>>()

// Clean up expired entries every minute
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of memoryCache.entries()) {
      if (now > entry.expiresAt) {
        memoryCache.delete(key)
      }
    }
  }, 60 * 1000)
}

/**
 * Get a value from cache (Redis or memory)
 */
export async function getFromCache<T>(key: string): Promise<T | null> {
  // Try Redis first
  if (isRedisAvailable()) {
    const data = await getCache<T>(key)
    if (data !== null) return data
  }

  // Fall back to memory cache
  const entry = memoryCache.get(key)
  if (!entry) return null

  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key)
    return null
  }

  return entry.data as T
}

/**
 * Set a value in cache (Redis and memory)
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttlSeconds - Time to live in seconds (default: 60)
 */
export async function setInCache<T>(key: string, data: T, ttlSeconds = 60): Promise<void> {
  // Set in Redis if available
  if (isRedisAvailable()) {
    await setCache(key, data, ttlSeconds)
  }

  // Always set in memory cache as well (for faster reads)
  memoryCache.set(key, {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
  })
}

/**
 * Invalidate cache entries matching a pattern
 * @param pattern - String pattern to match (uses startsWith for memory, glob for Redis)
 */
export async function invalidateCache(pattern: string): Promise<void> {
  // Invalidate in Redis
  if (isRedisAvailable()) {
    await invalidateCachePattern(`${pattern}*`)
  }

  // Invalidate in memory
  for (const key of memoryCache.keys()) {
    if (key.startsWith(pattern)) {
      memoryCache.delete(key)
    }
  }
}

/**
 * Delete a specific cache entry
 */
export async function removeFromCache(key: string): Promise<void> {
  if (isRedisAvailable()) {
    await deleteCache(key)
  }
  memoryCache.delete(key)
}

/**
 * Clear all cache entries
 */
export function clearCache(): void {
  memoryCache.clear()
  // Note: Redis clear would require FLUSHDB which is dangerous
  // Only clear memory cache here
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

// Re-export TTL presets
export const cacheTTL = CACHE_TTL
