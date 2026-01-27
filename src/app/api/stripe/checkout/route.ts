import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studioId, studioName, pricePerHour, hours, date, startTime } = body

    if (!studioId || !studioName || !pricePerHour || !hours) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const stripe = getStripe()
    const totalAmount = Math.round(pricePerHour * hours * 100) // Convert to cents

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "ideal"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: studioName,
              description: `${hours} hour${hours > 1 ? "s" : ""} booking${date ? ` on ${date}` : ""}${startTime ? ` at ${startTime}` : ""}`,
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.nextUrl.origin}/book/${studioId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/book/${studioId}/checkout`,
      metadata: {
        studioId,
        hours: hours.toString(),
        date: date || "",
        startTime: startTime || "",
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
