import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { StudioGrid } from "@/components/studios/studio-grid"
import { EmptyState } from "@/components/shared/empty-state"
import { Heart } from "lucide-react"

export const metadata = {
  title: "Favorieten",
}

export default async function FavoritesPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: favorites } = await supabase
    .from("favorites")
    .select(`
      studio_id,
      studio:studios (
        *,
        studio_images (*)
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const studios = favorites?.map((f) => f.studio).filter(Boolean) || []
  const favoriteIds = favorites?.map((f) => f.studio_id) || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Favorieten</h1>
        <p className="text-muted-foreground mt-1">
          Studio&apos;s die je hebt opgeslagen
        </p>
      </div>

      {studios.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Geen favorieten"
          description="Bewaar studio's die je interessant vindt om ze later terug te vinden"
          actionLabel="Ontdek studios"
          actionHref="/studios"
        />
      ) : (
        <StudioGrid studios={studios as any} favorites={favoriteIds} />
      )}
    </div>
  )
}
