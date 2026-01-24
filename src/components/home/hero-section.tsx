import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-background py-20 lg:py-32">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Vind de perfecte{" "}
            <span className="text-primary">creatieve ruimte</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Boek fotostudio&apos;s, videostudio&apos;s, podcastruimtes en meer.
            Alles wat je nodig hebt om je creatieve visie tot leven te brengen.
          </p>

          {/* Search bar */}
          <form
            action="/studios"
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                name="q"
                placeholder="Waar zoek je naar?"
                className="pl-12 h-12 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="h-12">
              Zoeken
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {/* Quick links */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Link href="/studios?type=photo">
              <Button variant="secondary" size="sm" className="rounded-full">
                Fotostudio&apos;s
              </Button>
            </Link>
            <Link href="/studios?type=video">
              <Button variant="secondary" size="sm" className="rounded-full">
                Videostudio&apos;s
              </Button>
            </Link>
            <Link href="/studios?type=podcast">
              <Button variant="secondary" size="sm" className="rounded-full">
                Podcaststudio&apos;s
              </Button>
            </Link>
            <Link href="/studios?city=amsterdam">
              <Button variant="secondary" size="sm" className="rounded-full">
                Amsterdam
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
