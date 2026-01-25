import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// Simple in-memory rate limit store (works per instance)
// For multi-instance production, use Redis
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limit configuration per route type
const rateLimits = {
  auth: { limit: 10, windowMs: 60000 },      // 10 requests per minute for auth
  api: { limit: 100, windowMs: 60000 },      // 100 requests per minute for general API
  upload: { limit: 10, windowMs: 60000 },    // 10 uploads per minute
  stripe: { limit: 20, windowMs: 60000 },    // 20 payment requests per minute
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip') ||
             'unknown'
  return ip
}

function getRateLimitConfig(pathname: string) {
  if (pathname.startsWith('/api/auth')) return rateLimits.auth
  if (pathname.startsWith('/api/upload')) return rateLimits.upload
  if (pathname.startsWith('/api/stripe')) return rateLimits.stripe
  return rateLimits.api
}

function checkRateLimit(key: string, config: { limit: number; windowMs: number }): {
  allowed: boolean
  remaining: number
  reset: number
} {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  // Clean entry if window expired
  if (entry && now > entry.resetTime) {
    rateLimitStore.delete(key)
  }

  const current = rateLimitStore.get(key)

  if (!current) {
    rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs })
    return { allowed: true, remaining: config.limit - 1, reset: now + config.windowMs }
  }

  current.count++

  if (current.count > config.limit) {
    return { allowed: false, remaining: 0, reset: current.resetTime }
  }

  return { allowed: true, remaining: config.limit - current.count, reset: current.resetTime }
}

// Cleanup old entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }, 5 * 60 * 1000)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Apply rate limiting to API routes only
  if (pathname.startsWith('/api')) {
    const clientIP = getClientIP(request)
    const config = getRateLimitConfig(pathname)
    const key = `${clientIP}:${pathname.split('/').slice(0, 3).join('/')}`

    const { allowed, remaining, reset } = checkRateLimit(key, config)

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': config.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil(reset / 1000).toString(),
            'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    // Continue with session update and add rate limit headers to response
    const response = await updateSession(request)

    response.headers.set('X-RateLimit-Limit', config.limit.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', Math.ceil(reset / 1000).toString())

    return response
  }

  // For non-API routes, just update session
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
