import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Note: Remove the Database generic to avoid type issues
// You can regenerate types with: npx supabase gen types typescript --project-id <your-project-id>
export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Use placeholder values during build if env vars are missing
  const url = supabaseUrl || 'https://placeholder.supabase.co'
  const key = supabaseAnonKey || 'placeholder-key'

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
    // Performance optimizations
    auth: {
      // Use cookie-based session persistence for faster auth
      persistSession: true,
      // Auto-refresh tokens before they expire
      autoRefreshToken: true,
      // Detect session from URL for OAuth
      detectSessionInUrl: true,
    },
    global: {
      // Add connection pooling headers for Supabase
      headers: {
        // Enable connection reuse
        'Connection': 'keep-alive',
      },
    },
    // Database query optimizations
    db: {
      // Use connection pooler for transaction mode
      schema: 'public',
    },
  })
}

/**
 * Create a service role client for admin operations
 * Only use this for server-side operations that need elevated permissions
 */
export async function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase service role credentials')
  }

  // Service client doesn't need cookies
  return createServerClient(supabaseUrl, supabaseServiceKey, {
    cookies: {
      getAll() {
        return []
      },
      setAll() {},
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        'Connection': 'keep-alive',
      },
    },
  })
}
