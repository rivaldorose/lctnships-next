import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StudioGrid } from "@/components/studios/studio-grid"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export async function FeaturedStudios() {
  const supabase = await createClient()

  const { data: studios } = await supabase
    .from("studios")
    .select(`
      *,
      studio_images (*)
    `)
    .eq("is_published", true)
    .order("avg_rating", { ascending: false })
    .limit(8)

  if (!studios || studios.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Populaire studio&apos;s</h2>
            <p className="mt-2 text-muted-foreground">
              De best beoordeelde ruimtes op het platform
            </p>
          </div>
          <Link href="/studios">
            <Button variant="ghost">
              Bekijk alles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <StudioGrid studios={studios} />
      </div>
    </section>
  )
}
