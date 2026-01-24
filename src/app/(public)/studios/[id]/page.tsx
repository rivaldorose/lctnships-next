import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { StudioGallery } from "@/components/studios/studio-gallery"
import { StudioInfo } from "@/components/studios/studio-info"
import { StudioAmenities } from "@/components/studios/studio-amenities"
import { StudioHostCard } from "@/components/studios/studio-host-card"
import { StudioReviews } from "@/components/studios/studio-reviews"
import { BookingCard } from "@/components/booking/booking-card"
import { Separator } from "@/components/ui/separator"

interface StudioDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: StudioDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: studio } = await supabase
    .from("studios")
    .select("title, description, city")
    .eq("id", id)
    .single()

  if (!studio) {
    return { title: "Studio niet gevonden" }
  }

  return {
    title: studio.title,
    description: studio.description || `${studio.title} in ${studio.city}`,
  }
}

export default async function StudioDetailPage({ params }: StudioDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: studio } = await supabase
    .from("studios")
    .select(`
      *,
      studio_images (*),
      studio_amenities (*),
      host:users!studios_host_id_fkey (*)
    `)
    .eq("id", id)
    .eq("is_published", true)
    .single()

  if (!studio) {
    notFound()
  }

  const { data: reviews } = await supabase
    .from("reviews")
    .select(`
      *,
      reviewer:users!reviews_reviewer_id_fkey (*)
    `)
    .eq("studio_id", id)
    .eq("review_type", "renter_to_studio")
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="container py-8">
      {/* Gallery */}
      <StudioGallery
        images={studio.studio_images || []}
        title={studio.title}
      />

      {/* Main content */}
      <div className="mt-8 grid lg:grid-cols-3 gap-8">
        {/* Left column - Studio info */}
        <div className="lg:col-span-2 space-y-8">
          <StudioInfo studio={studio} />

          <Separator />

          <StudioAmenities amenities={studio.studio_amenities || []} />

          {studio.host && (
            <>
              <Separator />
              <div>
                <h2 className="text-lg font-semibold mb-4">Je host</h2>
                <StudioHostCard host={studio.host} />
              </div>
            </>
          )}

          <Separator />

          <StudioReviews
            reviews={reviews || []}
            avgRating={studio.avg_rating}
            totalReviews={studio.total_reviews}
          />
        </div>

        {/* Right column - Booking card */}
        <div className="lg:col-span-1">
          <BookingCard studio={studio} />
        </div>
      </div>
    </div>
  )
}
