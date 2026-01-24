import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/shared/user-avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Star, Edit } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils/format-date"

export const metadata = {
  title: "Profiel",
}

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single()

  // Get review stats
  const { data: reviewsReceived } = await supabase
    .from("reviews")
    .select("rating")
    .eq("reviewee_id", user.id)

  const avgRating = reviewsReceived?.length
    ? reviewsReceived.reduce((sum, r) => sum + r.rating, 0) / reviewsReceived.length
    : 0

  // Get booking count
  const { count: bookingCount } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("renter_id", user.id)
    .eq("status", "completed")

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mijn Profiel</h1>
        <Link href="/profile/edit">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Bewerken
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <UserAvatar
                src={profile?.avatar_url}
                name={profile?.full_name}
                size="xl"
                className="h-24 w-24"
              />
              <Badge className="mt-4" variant="secondary">
                {profile?.user_type === "host"
                  ? "Host"
                  : profile?.user_type === "both"
                  ? "Host & Huurder"
                  : "Huurder"}
              </Badge>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profile?.full_name}</h2>
              {profile?.location && (
                <div className="flex items-center text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {profile.location}
                </div>
              )}
              <div className="flex items-center text-muted-foreground mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                Lid sinds {formatDate(profile?.created_at || "", "MMMM yyyy")}
              </div>

              {profile?.bio && (
                <p className="mt-4 text-muted-foreground">{profile.bio}</p>
              )}

              {/* Stats */}
              <div className="flex gap-8 mt-6">
                <div>
                  <p className="text-2xl font-bold">{bookingCount || 0}</p>
                  <p className="text-sm text-muted-foreground">Boekingen</p>
                </div>
                {reviewsReceived && reviewsReceived.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {reviewsReceived.length} reviews
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact info */}
      <Card>
        <CardHeader>
          <CardTitle>Contactgegevens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">E-mail</span>
            <span>{profile?.email}</span>
          </div>
          {profile?.phone && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Telefoon</span>
              <span>{profile.phone}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Verificatie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>E-mail geverifieerd</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Geverifieerd
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span>Telefoon geverifieerd</span>
              <Badge variant="secondary">Niet geverifieerd</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span>ID geverifieerd</span>
              <Badge variant="secondary">Niet geverifieerd</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
