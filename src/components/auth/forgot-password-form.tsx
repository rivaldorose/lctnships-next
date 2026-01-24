"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { toast } from "sonner"
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      toast.error("Error occurred", {
        description: error.message,
      })
      setIsLoading(false)
      return
    }

    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="w-full text-center">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="size-12 rounded-full bg-[#0f49bd] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight">lcntships</span>
        </Link>

        {/* Success state */}
        <div className="mx-auto mb-6 rounded-full bg-green-100 p-4 w-fit">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Check your email</h1>
        <p className="text-gray-500 mb-8">
          We&apos;ve sent a password reset link to {email}
        </p>

        <Link href="/login">
          <button className="inline-flex items-center gap-2 text-[#0f49bd] font-bold hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center gap-3 mb-8">
        <div className="size-12 rounded-full bg-[#0f49bd] flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
        </div>
        <span className="text-2xl font-extrabold tracking-tight">lcntships</span>
      </Link>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Forgot password?</h1>
        <p className="text-gray-500">Enter your email and we&apos;ll send you a reset link</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-14 px-6 rounded-full border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-[#0f49bd] focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-[#0f49bd] text-white rounded-full font-bold text-base hover:bg-[#0d3ea0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Send reset link
        </button>
      </form>

      {/* Back to login */}
      <div className="text-center mt-8">
        <Link href="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  )
}
