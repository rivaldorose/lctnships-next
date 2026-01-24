import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/shared/status-badge"
import { UserAvatar } from "@/components/shared/user-avatar"
import { formatDateRange, formatDate } from "@/lib/utils/format-date"
import { formatCurrency } from "@/lib/utils/format-currency"
import { Calendar, MapPin, Clock, MessageSquare, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BookingDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: BookingDetailPageProps) {
  const { id } = await params
  return {
    title: `Boeking ${id.slice(0, 8)}`,
  }
}

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data } = await supabase
    .from("bookings")
    .select(`
      *,
      studio:studios (
        *,
        studio_images (*)
      ),
      host:users!bookings_host_id_fkey (*)
    `)
    .eq("id", id)
    .eq("renter_id", user.id)
    .single()

  const booking = data as any

  if (!booking) {
    notFound()
  }

  const coverImage = booking.studio?.studio_images?.find((img: any) => img.is_cover) ||
    booking.studio?.studio_images?.[0]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <Link href="/bookings">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug naar boekingen
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Boeking #{booking.booking_number}</h1>
          <p className="text-muted-foreground mt-1">
            Geboekt op {formatDate(booking.created_at)}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          {/* Studio info */}
          <Card>
            <CardContent className="p-0">
              <div className="flex">
                <div className="relative w-48 h-36 flex-shrink-0">
                  {coverImage ? (
                    <Image
                      src={coverImage.image_url}
                      alt={booking.studio?.title || "Studio"}
                      fill
                      className="object-cover rounded-l-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted rounded-l-lg" />
                  )}
                </div>
                <div className="p-4 flex-1">
                  <Link href={`/studios/${booking.studio_id}`}>
                    <h2 className="font-semibold text-lg hover:underline">
                      {booking.studio?.title}
                    </h2>
                  </Link>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{booking.studio?.city}, {booking.studio?.country}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking details */}
          <Card>
            <CardHeader>
              <CardTitle>Boekingsdetails</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Datum & tijd</p>
                  <p className="text-muted-foreground">
                    {formatDateRange(booking.start_datetime, booking.end_datetime)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Duur</p>
                  <p className="text-muted-foreground">{booking.total_hours} uur</p>
                </div>
              </div>
              {booking.notes && (
                <div>
                  <p className="font-medium mb-2">Notities</p>
                  <p className="text-muted-foreground">{booking.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Host info */}
          {booking.host && (
            <Card>
              <CardHeader>
                <CardTitle>Je host</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <UserAvatar
                      src={booking.host.avatar_url}
                      name={booking.host.full_name}
                      size="lg"
                    />
                    <div>
                      <p className="font-semibold">{booking.host.full_name}</p>
                      {booking.host.location && (
                        <p className="text-sm text-muted-foreground">
                          {booking.host.location}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Bericht
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Payment summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Betalingsoverzicht</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {formatCurrency(booking.subtotal / booking.total_hours)} x {booking.total_hours} uur
                </span>
                <span>{formatCurrency(booking.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Servicekosten</span>
                <span>{formatCurrency(booking.service_fee)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Totaal</span>
                <span>{formatCurrency(booking.total_amount)}</span>
              </div>
              <StatusBadge status={booking.payment_status} variant="payment" />

              {booking.status === "confirmed" && new Date(booking.start_datetime) > new Date() && (
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  Annuleren
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
