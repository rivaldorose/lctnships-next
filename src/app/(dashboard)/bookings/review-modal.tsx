"use client"

import { useState } from "react"
import Image from "next/image"

interface Booking {
  id: string
  booking_number: string
  start_datetime: string
  studio: {
    id: string
    title: string
    city?: string
    studio_images?: { image_url: string; is_cover: boolean }[]
  }
}

interface ReviewModalProps {
  booking: Booking
  onClose: () => void
}

export function ReviewModal({ booking, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const coverImage = booking.studio.studio_images?.find((img) => img.is_cover) || booking.studio.studio_images?.[0]

  const handleSubmit = async () => {
    if (rating === 0) return
    setIsSubmitting(true)

    // TODO: Implement actual review submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Submitting review:", { rating, reviewText })
    setIsSubmitting(false)
    onClose()
  }

  const displayRating = hoveredRating || rating

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg shadow-2xl rounded-[2rem] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-[#0d121b]">Leave a Review</h2>
              <p className="text-gray-500 text-sm mt-1">Share your experience at {booking.studio.title}</p>
            </div>
            <button
              onClick={onClose}
              className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-[#0d121b] hover:bg-gray-200 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Studio Preview */}
          <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-20 h-20 rounded-lg overflow-hidden relative flex-shrink-0">
              {coverImage ? (
                <Image
                  src={coverImage.image_url}
                  alt={booking.studio.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="material-symbols-outlined text-gray-400">image</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-[#0d121b]">{booking.studio.title}</h3>
              <p className="text-sm text-gray-500">{booking.studio.city}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(booking.start_datetime).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="text-center">
            <p className="text-sm font-bold text-gray-700 mb-3">How was your experience?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <span
                    className={`material-symbols-outlined text-4xl transition-colors ${
                      star <= displayRating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    style={{ fontVariationSettings: star <= displayRating ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>
            {displayRating > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {displayRating === 1 && "Poor"}
                {displayRating === 2 && "Fair"}
                {displayRating === 3 && "Good"}
                {displayRating === 4 && "Very Good"}
                {displayRating === 5 && "Excellent!"}
              </p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">
              Tell others about your experience (optional)
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="What did you like about this studio? Would you recommend it to others?"
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20 focus:border-[#2b6cee] resize-none text-sm"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">
              {reviewText.length}/500
            </p>
          </div>

          {/* Quick Tags */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-3">What stood out? (optional)</p>
            <div className="flex flex-wrap gap-2">
              {["Great Location", "Clean Space", "Friendly Host", "Good Equipment", "Value for Money", "Easy Check-in"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    if (reviewText.includes(tag)) {
                      setReviewText(reviewText.replace(tag, "").trim())
                    } else {
                      setReviewText(reviewText ? `${reviewText} ${tag}` : tag)
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    reviewText.includes(tag)
                      ? "bg-[#2b6cee] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-gray-100 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-full border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className={`flex-1 px-6 py-3 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              rating > 0 && !isSubmitting
                ? "bg-[#2b6cee] text-white hover:bg-[#2b6cee]/90 shadow-lg shadow-[#2b6cee]/20"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                Submitting...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">send</span>
                Submit Review
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
