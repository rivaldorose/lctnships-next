import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { SuccessClient } from "./success-client"

interface SuccessPageProps {
  params: Promise<{ studioId: string }>
  searchParams: Promise<{ booking?: string }>
}

export default async function SuccessPage({ params, searchParams }: SuccessPageProps) {
  const { studioId } = await params
  const { booking: bookingId } = await searchParams
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  // Get studio
  const { data: studio } = await supabase
    .from("studios")
    .select(`
      *,
      studio_images (image_url, is_cover)
    `)
    .eq("id", studioId)
    .single()

  if (!studio) {
    redirect("/studios")
  }

  // Get booking details
  let booking = null
  if (bookingId) {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single()
    booking = data
  }

  // If no booking found, create mock data
  if (!booking) {
    booking = {
      id: "mock-booking",
      booking_number: `BK${Date.now().toString().slice(-8)}`,
      start_datetime: new Date().toISOString(),
      end_datetime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      total_hours: 2,
      total_amount: studio.price_per_hour * 2 + Math.round(studio.price_per_hour * 2 * 0.1),
      status: "confirmed",
    }
  }

  return (
    <SuccessClient
      studio={studio}
      booking={booking}
    />
  )
}
