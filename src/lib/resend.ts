import { Resend } from "resend"

// Lazy initialization to prevent build-time errors when env var is missing
let resendInstance: Resend | null = null

export function getResend(): Resend {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY environment variable")
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }
  return resendInstance
}
