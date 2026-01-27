import { NextRequest, NextResponse } from "next/server"
import { getStripe, createBookingPayment, PLATFORM_FEE_PERCENT } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      bookingId,
      studioId,
      studioName,
      pricePerHour,
      hours,
      date,
      startTime,
      totalAmount,
      customerEmail,
    } = body

    // Validate required fields
    if (!studioId || !studioName || !hours) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get studio details including owner's Stripe account
    const { data: studio, error: studioError } = await supabase
      .from("studios")
      .select(`
        id,
        title,
        host_id,
        host:users!studios_host_id_fkey (
          stripe_account_id,
          email
        )
      `)
      .eq("id", studioId)
      .single()

    if (studioError || !studio) {
      return NextResponse.json({ error: "Studio not found" }, { status: 404 })
    }

    // Get current user for email
    const { data: { user } } = await supabase.auth.getUser()
    const email = customerEmail || user?.email

    if (!email) {
      return NextResponse.json(
        { error: "Customer email required" },
        { status: 400 }
      )
    }

    const amount = totalAmount || Math.round(pricePerHour * hours * 100) / 100
    const studioOwnerStripeId = (studio.host as any)?.stripe_account_id

    // If studio owner has Stripe Connect, use commission flow
    if (studioOwnerStripeId) {
      const session = await createBookingPayment({
        amount,
        studioOwnerId: studioOwnerStripeId,
        bookingId: bookingId || `temp_${Date.now()}`,
        customerEmail: email,
        studioName: studioName || studio.title,
        bookingDate: date || new Date().toISOString().split("T")[0],
        hours,
      })

      // Update booking with session ID if booking exists
      if (bookingId) {
        await supabase
          .from("bookings")
          .update({
            stripe_session_id: session.id,
            payment_status: "pending",
          })
          .eq("id", bookingId)
      }

      return NextResponse.json({
        sessionId: session.id,
        url: session.url,
        platformFee: PLATFORM_FEE_PERCENT,
      })
    }

    // Fallback: no Connect account, simple checkout (platform receives all)
    const stripe = getStripe()
    const amountInCents = Math.round(amount * 100)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "ideal", "sepa_debit", "bancontact"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: studioName || studio.title,
              description: `${hours} uur${date ? ` op ${date}` : ""}${startTime ? ` om ${startTime}` : ""}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: `${request.nextUrl.origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/book/${studioId}/checkout`,
      metadata: {
        type: "booking_payment",
        bookingId: bookingId || "",
        studioId,
        hours: hours.toString(),
        date: date || "",
        startTime: startTime || "",
      },
    })

    // Update booking with session ID if booking exists
    if (bookingId) {
      await supabase
        .from("bookings")
        .update({
          stripe_session_id: session.id,
          payment_status: "pending",
        })
        .eq("id", bookingId)
    }

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
