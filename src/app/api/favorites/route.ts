import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET /api/favorites - Get user's favorite studios
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: favorites, error } = await supabase
      .from("favorites")
      .select(`
        id,
        created_at,
        studio:studios (
          id,
          title,
          city,
          country,
          hourly_rate,
          avg_rating,
          total_reviews,
          studio_images (id, image_url, is_cover)
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ favorites })
  } catch (error: any) {
    console.error("Error fetching favorites:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch favorites" },
      { status: 500 }
    )
  }
}

// POST /api/favorites - Add studio to favorites
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { studio_id } = body

    if (!studio_id) {
      return NextResponse.json(
        { error: "Studio ID is required" },
        { status: 400 }
      )
    }

    // Check if already favorited
    const { data: existing } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("studio_id", studio_id)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: "Studio already in favorites" },
        { status: 400 }
      )
    }

    const { data: favorite, error } = await supabase
      .from("favorites")
      .insert({
        user_id: user.id,
        studio_id,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ favorite }, { status: 201 })
  } catch (error: any) {
    console.error("Error adding to favorites:", error)
    return NextResponse.json(
      { error: error.message || "Failed to add to favorites" },
      { status: 500 }
    )
  }
}

// DELETE /api/favorites - Remove studio from favorites
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const studioId = searchParams.get("studioId")

    if (!studioId) {
      return NextResponse.json(
        { error: "Studio ID is required" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("studio_id", studioId)

    if (error) throw error

    return NextResponse.json({ message: "Removed from favorites" })
  } catch (error: any) {
    console.error("Error removing from favorites:", error)
    return NextResponse.json(
      { error: error.message || "Failed to remove from favorites" },
      { status: 500 }
    )
  }
}
