import { createBrowserClient } from '@supabase/ssr'

// Note: Remove the Database generic to avoid type issues
// You can regenerate types with: npx supabase gen types typescript --project-id <your-project-id>
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Return a dummy client during build if env vars are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    // During build time, return a placeholder URL and key
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
