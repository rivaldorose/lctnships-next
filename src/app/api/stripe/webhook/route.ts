import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import Stripe from "stripe"

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set")
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session

      // Extract booking details from metadata
      const { studioId, hours, date, startTime } = session.metadata || {}

      console.log("Payment successful:", {
        sessionId: session.id,
        studioId,
        hours,
        date,
        startTime,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total,
      })

      // TODO: Create booking in database
      // TODO: Send confirmation email

      break
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session
      console.log("Checkout session expired:", session.id)
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
