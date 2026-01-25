import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/bookings/[id] - Get single booking
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: booking, error } = await supabase
      .from("bookings")
      .select(`
        *,
        studio:studios (
          *,
          studio_images (image_url, is_cover)
        ),
        host:users!bookings_host_id_fkey (*),
        renter:users!bookings_renter_id_fkey (*),
        booking_equipment (
          *,
          equipment (*)
        )
      `)
      .eq("id", id)
      .or(`renter_id.eq.${user.id},host_id.eq.${user.id}`)
      .single()

    if (error) throw error

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ booking })
  } catch (error: any) {
    console.error("Error fetching booking:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch booking" },
      { status: 500 }
    )
  }
}

// PATCH /api/bookings/[id] - Update booking
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Get existing booking
    const { data: existingBooking } = await supabase
      .from("bookings")
      .select("*, studio:studios(title)")
      .eq("id", id)
      .or(`renter_id.eq.${user.id},host_id.eq.${user.id}`)
      .single()

    if (!existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Update booking
    const { data: booking, error } = await supabase
      .from("bookings")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ booking })
  } catch (error: any) {
    console.error("Error updating booking:", error)
    return NextResponse.json(
      { error: error.message || "Failed to update booking" },
      { status: 500 }
    )
  }
}
