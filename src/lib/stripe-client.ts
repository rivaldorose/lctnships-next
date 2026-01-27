import { loadStripe } from "@stripe/stripe-js"

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

if (!publishableKey) {
  console.warn("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set")
}

export const stripePromise = publishableKey ? loadStripe(publishableKey) : null

export async function redirectToCheckout(sessionId: string) {
  const stripe = await stripePromise
  if (!stripe) {
    throw new Error("Stripe not initialized")
  }
  
  const { error } = await stripe.redirectToCheckout({ sessionId })
  if (error) {
    throw error
  }
}
