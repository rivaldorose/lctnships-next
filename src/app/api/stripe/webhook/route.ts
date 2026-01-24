import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/config"
import { createAdminClient } from "@/lib/supabase/admin"
import Stripe from "stripe"

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
  }

  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const bookingId = session.metadata?.booking_id

      if (bookingId) {
        // Update booking status
        await supabase
          .from("bookings")
          .update({
            payment_status: "paid",
            status: "confirmed",
            stripe_payment_id: session.payment_intent as string,
          })
          .eq("id", bookingId)

        // Create notification for host
        const { data: booking } = await supabase
          .from("bookings")
          .select("host_id, renter_id, booking_number")
          .eq("id", bookingId)
          .single()

        if (booking) {
          await supabase.from("notifications").insert({
            user_id: booking.host_id,
            type: "booking_confirmed",
            title: "Nieuwe boeking!",
            message: `Boeking #${booking.booking_number} is bevestigd`,
            link: `/host/bookings`,
          })
        }
      }
      break
    }

    case "account.updated": {
      const account = event.data.object as Stripe.Account

      // Update user's Stripe account status
      if (account.charges_enabled) {
        await supabase
          .from("users")
          .update({ stripe_account_id: account.id })
          .eq("stripe_account_id", account.id)
      }
      break
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log("Payment succeeded:", paymentIntent.id)
      break
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log("Payment failed:", paymentIntent.id)
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
