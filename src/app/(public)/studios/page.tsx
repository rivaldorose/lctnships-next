import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { StudioGrid } from "@/components/studios/studio-grid"
import { StudioFilters } from "@/components/studios/studio-filters"
import { StudioCategoryPills } from "@/components/studios/studio-category-pills"
import { EmptyState } from "@/components/shared/empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"

export const metadata = {
  title: "Ontdek Studios",
  description: "Vind en boek de perfecte creatieve studio voor jouw project",
}

interface StudiosPageProps {
  searchParams: Promise<{
    q?: string
    type?: string
    city?: string
    amenities?: string
    page?: string
  }>
}

async function StudiosContent({ searchParams }: StudiosPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("studios")
    .select(`
      *,
      studio_images (*),
      studio_amenities (*)
    `)
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  // Apply filters
  if (params.q) {
    query = query.or(`title.ilike.%${params.q}%,city.ilike.%${params.q}%,description.ilike.%${params.q}%`)
  }

  if (params.type) {
    query = query.eq("studio_type", params.type)
  }

  if (params.city) {
    query = query.ilike("city", `%${params.city}%`)
  }

  const { data: studios, error } = await query

  // Filter by amenities in-memory (since it's a related table)
  let filteredStudios = studios || []
  if (params.amenities) {
    const requiredAmenities = params.amenities.split(",")
    filteredStudios = filteredStudios.filter((studio) => {
      const studioAmenities = studio.studio_amenities?.map((a: { amenity: string }) => a.amenity) || []
      return requiredAmenities.every((amenity) => studioAmenities.includes(amenity))
    })
  }

  if (error) {
    return (
      <EmptyState
        icon={Search}
        title="Er ging iets mis"
        description="Kon de studio's niet laden. Probeer het later opnieuw."
      />
    )
  }

  if (filteredStudios.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="Geen studio's gevonden"
        description="Probeer je zoekopdracht aan te passen of verwijder filters"
      />
    )
  }

  return <StudioGrid studios={filteredStudios} />
}

function StudiosSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[4/3] rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}

export default async function StudiosPage(props: StudiosPageProps) {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ontdek studio&apos;s</h1>
        <p className="text-muted-foreground">
          Vind de perfecte creatieve ruimte voor jouw project
        </p>
      </div>

      <div className="mb-6">
        <Suspense>
          <StudioCategoryPills />
        </Suspense>
      </div>

      <div className="mb-8">
        <Suspense>
          <StudioFilters />
        </Suspense>
      </div>

      <Suspense fallback={<StudiosSkeleton />}>
        <StudiosContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  )
}
