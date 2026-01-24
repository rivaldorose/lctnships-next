import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { StatusBadge } from "@/components/shared/status-badge"
import { FolderOpen, Plus, Calendar } from "lucide-react"
import Link from "next/link"
import { formatTimeAgo } from "@/lib/utils/format-date"
import Image from "next/image"

export const metadata = {
  title: "Mijn Projecten",
}

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: projects } = await supabase
    .from("projects")
    .select(`
      *,
      project_members (count),
      bookings:bookings (count)
    `)
    .eq("owner_id", user.id)
    .order("updated_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mijn Projecten</h1>
          <p className="text-muted-foreground mt-1">
            Organiseer je creatieve projecten
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nieuw project
        </Button>
      </div>

      {!projects || projects.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="Geen projecten"
          description="Maak je eerste project om boekingen, team en assets te organiseren"
          actionLabel="Nieuw project"
          actionHref="/projects/new"
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                {/* Cover image */}
                <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                  {project.cover_image_url ? (
                    <Image
                      src={project.cover_image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FolderOpen className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                    <StatusBadge status={project.status} variant="project" />
                  </div>
                  <CardDescription className="capitalize">
                    {project.project_type}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {project.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Bijgewerkt {formatTimeAgo(project.updated_at)}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{(project.bookings as any)?.[0]?.count || 0} boekingen</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
