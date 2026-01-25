import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET /api/studios - List studios with filtering and search
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const supabase = await createClient()

    // Query parameters
    const search = searchParams.get("search")
    const city = searchParams.get("city")
    const type = searchParams.get("type")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const date = searchParams.get("date")
    const amenities = searchParams.get("amenities")?.split(",")
    const sortBy = searchParams.get("sortBy") || "created_at"
    const sortOrder = searchParams.get("sortOrder") || "desc"
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const hostId = searchParams.get("hostId")

    let query = supabase
      .from("studios")
      .select(`
        *,
        studio_images (id, image_url, is_cover, display_order),
        host:users!studios_host_id_fkey (id, full_name, avatar_url)
      `, { count: "exact" })
      .eq("is_published", true)

    // Filter by host
    if (hostId) {
      query = query.eq("host_id", hostId)
    }

    // Search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,city.ilike.%${search}%`)
    }

    // City filter
    if (city) {
      query = query.ilike("city", `%${city}%`)
    }

    // Type filter
    if (type) {
      query = query.eq("type", type)
    }

    // Price range filter
    if (minPrice) {
      query = query.gte("hourly_rate", parseFloat(minPrice))
    }
    if (maxPrice) {
      query = query.lte("hourly_rate", parseFloat(maxPrice))
    }

    // Amenities filter
    if (amenities && amenities.length > 0) {
      query = query.contains("amenities", amenities)
    }

    // Sorting
    const validSortFields = ["created_at", "hourly_rate", "avg_rating", "title"]
    const sortField = validSortFields.includes(sortBy) ? sortBy : "created_at"
    query = query.order(sortField, { ascending: sortOrder === "asc" })

    // Pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: studios, error, count } = await query

    if (error) throw error

    // If date is provided, filter out studios with conflicting bookings
    let availableStudios = studios
    if (date && studios) {
      const startOfDay = new Date(date)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)

      const studioIds = studios.map((s) => s.id)

      const { data: bookedStudios } = await supabase
        .from("bookings")
        .select("studio_id")
        .in("studio_id", studioIds)
        .neq("status", "cancelled")
        .gte("start_datetime", startOfDay.toISOString())
        .lte("start_datetime", endOfDay.toISOString())

      const bookedIds = new Set(bookedStudios?.map((b) => b.studio_id))
      availableStudios = studios.filter((s) => !bookedIds.has(s.id))
    }

    return NextResponse.json({
      studios: availableStudios,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error: any) {
    console.error("Error fetching studios:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch studios" },
      { status: 500 }
    )
  }
}

// POST /api/studios - Create a new studio
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      type,
      address,
      city,
      country,
      postal_code,
      latitude,
      longitude,
      hourly_rate,
      daily_rate,
      minimum_hours,
      maximum_hours,
      amenities,
      rules,
      cancellation_policy,
      entry_code,
      wifi_password,
      access_instructions,
    } = body

    // Validate required fields
    if (!title || !type || !city || !hourly_rate) {
      return NextResponse.json(
        { error: "Title, type, city, and hourly rate are required" },
        { status: 400 }
      )
    }

    const { data: studio, error } = await supabase
      .from("studios")
      .insert({
        host_id: user.id,
        title,
        description,
        type,
        address,
        city,
        country,
        postal_code,
        latitude,
        longitude,
        hourly_rate,
        daily_rate,
        minimum_hours: minimum_hours || 1,
        maximum_hours: maximum_hours || 24,
        amenities: amenities || [],
        rules: rules || [],
        cancellation_policy: cancellation_policy || "flexible",
        entry_code,
        wifi_password,
        access_instructions,
        is_published: false,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ studio }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating studio:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create studio" },
      { status: 500 }
    )
  }
}
