import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET /api/equipment - Get equipment (by studio)
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const studioId = searchParams.get("studio_id")

    if (!studioId) {
      return NextResponse.json(
        { error: "Studio ID is required" },
        { status: 400 }
      )
    }

    const { data: equipment, error } = await supabase
      .from("equipment")
      .select("*")
      .eq("studio_id", studioId)
      .eq("is_available", true)
      .order("name")

    if (error) throw error

    return NextResponse.json({ equipment })
  } catch (error: any) {
    console.error("Error fetching equipment:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch equipment" },
      { status: 500 }
    )
  }
}

// POST /api/equipment - Add new equipment
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { studio_id, name, description, category, price_per_day, quantity, image_url } = body

    if (!studio_id || !name) {
      return NextResponse.json(
        { error: "Studio ID and name are required" },
        { status: 400 }
      )
    }

    // Verify user owns the studio
    const { data: studio } = await supabase
      .from("studios")
      .select("host_id")
      .eq("id", studio_id)
      .single()

    if (!studio || studio.host_id !== user.id) {
      return NextResponse.json(
        { error: "You don't have permission to add equipment to this studio" },
        { status: 403 }
      )
    }

    const { data: equipment, error } = await supabase
      .from("equipment")
      .insert({
        studio_id,
        name,
        description,
        category,
        price_per_day: price_per_day || 0,
        quantity: quantity || 1,
        image_url,
        is_available: true,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ equipment })
  } catch (error: any) {
    console.error("Error adding equipment:", error)
    return NextResponse.json(
      { error: error.message || "Failed to add equipment" },
      { status: 500 }
    )
  }
}
