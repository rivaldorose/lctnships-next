import { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getPackages, getUserCreditsRecord, getCreditTransactions } from "@/lib/credits"
import { CreditPackages } from "@/components/credits/CreditPackages"
import { UserCredits } from "@/components/credits/UserCredits"
import { CreditTransactions } from "@/components/credits/CreditTransactions"

export const metadata: Metadata = {
  title: "Strippenkaart | lcntships",
  description: "Koop credits en bespaar op je studio boekingen",
}

export default async function CreditsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?next=/credits")
  }

  // Fetch data in parallel
  const [packages, userCredits, transactions] = await Promise.all([
    getPackages(),
    getUserCreditsRecord(user.id),
    getCreditTransactions(user.id, 20),
  ])

  return (
    <div className="container py-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Strippenkaart</h1>
        <p className="text-muted-foreground">
          Koop credits vooraf en bespaar tot 40% op je studio boekingen.
          Credits verlopen nooit.
        </p>
      </div>

      {/* User's current credits */}
      <div className="mb-10">
        <UserCredits
          credits={userCredits?.credits_remaining || 0}
          totalPurchased={userCredits?.credits_total || 0}
        />
      </div>

      {/* Available packages */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Kies je pakket</h2>
        <CreditPackages packages={packages} />
      </div>

      {/* How it works */}
      <div className="bg-muted/50 rounded-2xl p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-6">Hoe werkt het?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-semibold">Kies een pakket</h3>
            <p className="text-muted-foreground text-sm">
              Selecteer het pakket dat bij jou past. Hoe meer credits, hoe meer
              korting.
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-semibold">Betaal eenmalig</h3>
            <p className="text-muted-foreground text-sm">
              Betaal veilig via iDEAL, creditcard of SEPA. Je credits worden
              direct bijgeschreven.
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-semibold">Boek studios</h3>
            <p className="text-muted-foreground text-sm">
              Gebruik je credits voor elke studio boeking. 1 credit = 1 dag
              studio.
            </p>
          </div>
        </div>
      </div>

      {/* Transaction history */}
      {transactions.length > 0 && (
        <div className="mb-10">
          <CreditTransactions transactions={transactions} />
        </div>
      )}

      {/* FAQ */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Veelgestelde vragen</h2>
        <div className="grid gap-4">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Verlopen mijn credits?</h3>
            <p className="text-muted-foreground">
              Nee, je credits verlopen nooit. Je kunt ze gebruiken wanneer je
              wilt.
            </p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-2">
              Kan ik credits gebruiken voor elke studio?
            </h3>
            <p className="text-muted-foreground">
              Ja, je kunt je credits gebruiken voor alle studios op het
              platform, ongeacht het type of de locatie.
            </p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-2">
              Hoeveel is 1 credit waard?
            </h3>
            <p className="text-muted-foreground">
              1 credit = 1 dag studio boeking. De waarde hangt af van welk
              pakket je koopt - tot €60 per dag bij het Studio pakket.
            </p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-2">
              Kan ik mijn credits terugkrijgen?
            </h3>
            <p className="text-muted-foreground">
              Ongebruikte credits kunnen niet worden terugbetaald, maar ze
              verlopen ook nooit. Je kunt ze altijd later gebruiken.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
