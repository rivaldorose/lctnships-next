import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, DollarSign, Calendar, Users } from "lucide-react"

export function BecomeHostSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Heb je een studio? Begin met verdienen
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg">
              Word host op LCNTSHIPS en verdien geld met je creatieve ruimte.
              Wij zorgen voor het boekingsplatform, jij zorgt voor de ervaring.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary-foreground/20 p-2">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Gratis aanmelden</h3>
                  <p className="text-sm text-primary-foreground/70">
                    Geen maandelijkse kosten. Je betaalt alleen 15% commissie per boeking.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary-foreground/20 p-2">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Flexibele beschikbaarheid</h3>
                  <p className="text-sm text-primary-foreground/70">
                    Jij bepaalt wanneer je studio beschikbaar is en tegen welke prijs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary-foreground/20 p-2">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Bereik nieuwe klanten</h3>
                  <p className="text-sm text-primary-foreground/70">
                    Krijg toegang tot duizenden creatieve professionals die op zoek zijn naar studio&apos;s.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/become-a-host" className="inline-block mt-8">
              <Button size="lg" variant="secondary">
                Word host
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-square bg-primary-foreground/10 rounded-2xl flex items-center justify-center">
              <span className="text-6xl">🎬</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
