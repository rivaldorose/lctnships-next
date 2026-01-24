import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/shared/empty-state"
import { StatusBadge } from "@/components/shared/status-badge"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { formatDateRange } from "@/lib/utils/format-date"
import { formatCurrency } from "@/lib/utils/format-currency"
import Image from "next/image"

export const metadata = {
  title: "Mijn Boekingen",
}

export default async function BookingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data } = await supabase
    .from("bookings")
    .select(`
      *,
      studio:studios (
        title,
        city,
        studio_images (image_url, is_cover)
      )
    `)
    .eq("renter_id", user.id)
    .order("start_datetime", { ascending: false })

  const bookings = data as any[] | null

  const now = new Date()
  const upcomingBookings = bookings?.filter(
    (b: any) => new Date(b.start_datetime) >= now && b.status !== "cancelled"
  ) || []
  const pastBookings = bookings?.filter(
    (b: any) => new Date(b.start_datetime) < now || b.status === "cancelled"
  ) || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mijn Boekingen</h1>
        <p className="text-muted-foreground mt-1">
          Beheer je studio boekingen
        </p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            Aankomend ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Geschiedenis ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingBookings.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="Geen aankomende boekingen"
              description="Je hebt nog geen studio's geboekt"
              actionLabel="Ontdek studios"
              actionHref="/studios"
            />
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {pastBookings.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="Geen eerdere boekingen"
              description="Je boekingsgeschiedenis verschijnt hier"
            />
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} isPast />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BookingCard({ booking, isPast }: { booking: any; isPast?: boolean }) {
  const coverImage = booking.studio?.studio_images?.find((img: any) => img.is_cover) ||
    booking.studio?.studio_images?.[0]

  return (
    <Link href={`/bookings/${booking.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="flex">
            {/* Image */}
            <div className="relative w-40 h-32 flex-shrink-0">
              {coverImage ? (
                <Image
                  src={coverImage.image_url}
                  alt={booking.studio?.title}
                  fill
                  className="object-cover rounded-l-lg"
                />
              ) : (
                <div className="w-full h-full bg-muted rounded-l-lg" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{booking.studio?.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {booking.studio?.city}
                    </div>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{formatDateRange(booking.start_datetime, booking.end_datetime)}</span>
                </div>
                <span className="font-semibold">
                  {formatCurrency(booking.total_amount)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
