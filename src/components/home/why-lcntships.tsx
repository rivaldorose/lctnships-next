import { Shield, Clock, CreditCard, MessageSquare } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Geverifieerde studio's",
    description:
      "Elke ruimte wordt gecontroleerd op kwaliteit en veiligheid voordat deze op het platform komt.",
  },
  {
    icon: Clock,
    title: "Instant boeken",
    description:
      "Boek direct beschikbare studio's zonder te wachten op bevestiging van de host.",
  },
  {
    icon: CreditCard,
    title: "Veilig betalen",
    description:
      "Betaal veilig via ons platform. Je geld is beschermd tot na je boeking.",
  },
  {
    icon: MessageSquare,
    title: "Direct contact",
    description:
      "Chat direct met hosts om vragen te stellen of speciale wensen te bespreken.",
  },
]

export function WhyLcntships() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Waarom LCNTSHIPS?</h2>
          <p className="mt-2 text-muted-foreground">
            Het makkelijkste platform voor het boeken van creatieve ruimtes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
