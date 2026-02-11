import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Sanitize string input to prevent XSS and SQL injection
function sanitizeString(input: unknown): string | null {
  if (typeof input !== "string") return null
  // Remove HTML tags, trim, and limit length
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>"'&]/g, "")
    .trim()
    .slice(0, 255) || null
}

// Validate URL is a safe avatar URL
function sanitizeAvatarUrl(input: unknown): string | null {
  if (typeof input !== "string") return null
  try {
    const url = new URL(input)
    // Only allow HTTPS URLs from known providers
    const allowedHosts = [
      "lh3.googleusercontent.com",
      "googleusercontent.com",
      "platform-lookaside.fbsbx.com",
      "graph.facebook.com",
      "avatars.githubusercontent.com",
      "pbs.twimg.com",
    ]
    if (url.protocol === "https:" && allowedHosts.some(host => url.hostname.endsWith(host))) {
      return url.toString()
    }
  } catch {
    // Invalid URL
  }
  return null
}

// Validate redirect path to prevent open redirects
function validateRedirectPath(input: string): string {
  // Only allow internal paths starting with /
  if (!input.startsWith("/")) return "/dashboard"
  // Block protocol-relative URLs and external redirects
  if (input.startsWith("//") || input.includes("://")) return "/dashboard"
  // Block javascript: and data: schemes
  if (input.toLowerCase().includes("javascript:") || input.toLowerCase().includes("data:")) {
    return "/dashboard"
  }
  return input
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const redirectParam = searchParams.get("redirect") || "/dashboard"
  const redirect = validateRedirectPath(redirectParam)

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if user profile exists, create if not
      const { data: existingProfile } = await supabase
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .single()

      if (!existingProfile) {
        // Sanitize user metadata before inserting
        const fullName = sanitizeString(
          data.user.user_metadata.full_name || data.user.user_metadata.name
        )
        const avatarUrl = sanitizeAvatarUrl(data.user.user_metadata.avatar_url)

        await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: fullName,
          avatar_url: avatarUrl,
          user_type: "renter",
        })
      }

      return NextResponse.redirect(`${origin}${redirect}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth`)
}
