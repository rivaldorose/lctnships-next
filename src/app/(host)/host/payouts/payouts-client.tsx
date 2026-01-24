"use client"

import { useState } from "react"
import Link from "next/link"

interface BankDetails {
  accountHolderName: string
  iban: string
  bic: string
}

interface PayoutRecord {
  id: string
  date: string
  reference: string
  amount: number
  status: "success" | "pending"
}

interface PayoutsClientProps {
  stripeConnected: boolean
  bankDetails: BankDetails
  payoutHistory: PayoutRecord[]
}

export function PayoutsClient({
  stripeConnected: initialStripeConnected,
  bankDetails: initialBankDetails,
  payoutHistory,
}: PayoutsClientProps) {
  const [stripeConnected, setStripeConnected] = useState(initialStripeConnected)
  const [bankDetails, setBankDetails] = useState(initialBankDetails)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const handleConnectStripe = () => {
    // TODO: Redirect to Stripe Connect OAuth flow
    console.log("Connecting to Stripe...")
  }

  const handleSave = () => {
    // TODO: Save bank details to database
    console.log({ bankDetails })
  }

  return (
    <div className="max-w-[1000px] mx-auto">
      {/* Header & Breadcrumbs */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/host/dashboard" className="text-gray-500 text-sm font-medium">
            Dashboard
          </Link>
          <span className="text-gray-500 text-sm font-medium">/</span>
          <span className="text-sm font-medium">Payout Settings</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight">Payout Settings</h1>
        <p className="text-gray-500 text-base mt-2">
          Configure how and when you receive payments for your studio bookings.
        </p>
      </div>

      <div className="space-y-6">
        {/* Stripe Integration Card */}
        <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex gap-6">
              <div className="size-16 rounded-2xl bg-[#635bff] flex items-center justify-center text-white shadow-lg shadow-[#635bff]/20">
                <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold">Payout Method</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      stripeConnected
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {stripeConnected ? "Connected" : "Not Connected"}
                  </span>
                </div>
                <p className="text-gray-500 text-sm max-w-md leading-relaxed">
                  We partner with Stripe for secure, fast payouts. Connect your account to receive
                  funds automatically in 40+ countries.
                </p>
              </div>
            </div>
            <button
              onClick={handleConnectStripe}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-md active:scale-[0.98] flex items-center gap-2"
            >
              <span>{stripeConnected ? "Manage Stripe" : "Connect with Stripe"}</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
        </section>

        {/* Bank Account Details Card */}
        <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">account_balance</span>
            <h3 className="text-xl font-bold">Bank Account Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold ml-1">Account Holder Name</label>
              <input
                type="text"
                value={bankDetails.accountHolderName}
                onChange={(e) =>
                  setBankDetails((prev) => ({ ...prev, accountHolderName: e.target.value }))
                }
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
                placeholder="e.g. Creative Spaces BV"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold ml-1">BIC / SWIFT Code</label>
              <input
                type="text"
                value={bankDetails.bic}
                onChange={(e) => setBankDetails((prev) => ({ ...prev, bic: e.target.value }))}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
                placeholder="ABNANL2AXXX"
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm font-bold ml-1">IBAN</label>
              <input
                type="text"
                value={bankDetails.iban}
                onChange={(e) => setBankDetails((prev) => ({ ...prev, iban: e.target.value }))}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
                placeholder="NL00 ABNA 0000 0000 00"
              />
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 p-4 bg-primary/5 rounded-xl">
            <span className="material-symbols-outlined text-primary text-xl">info</span>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your banking information is encrypted and stored securely. We only use these details
              to process manual payouts if Stripe integration is unavailable for your region.
            </p>
          </div>
        </section>

        {/* Payout History Card */}
        <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history</span>
              <h3 className="text-xl font-bold">Recent Payouts</h3>
            </div>
            <Link href="/host/earnings" className="text-primary text-sm font-bold hover:underline">
              View all history
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payoutHistory.map((payout) => (
                  <tr key={payout.id}>
                    <td className="py-4 text-sm text-gray-600">{payout.date}</td>
                    <td className="py-4 text-sm text-gray-500">{payout.reference}</td>
                    <td className="py-4 text-sm font-bold">{formatCurrency(payout.amount)}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payout.status === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            payout.status === "success" ? "bg-green-600" : "bg-blue-600"
                          }`}
                        />
                        {payout.status === "success" ? "Success" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Save Action */}
        <div className="flex items-center justify-between p-8 bg-gray-900 rounded-[2rem] shadow-xl text-white">
          <div className="flex flex-col">
            <p className="text-sm font-medium opacity-80">Ready to finalize?</p>
            <p className="text-xs opacity-60">Review your bank details before saving.</p>
          </div>
          <button
            onClick={handleSave}
            className="bg-white text-gray-900 hover:bg-gray-100 font-black py-4 px-10 rounded-2xl transition-all shadow-lg active:scale-95"
          >
            Save Payout Settings
          </button>
        </div>

        {/* Security Badges */}
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="material-symbols-outlined">verified_user</span>
              <span className="text-xs font-bold uppercase tracking-wider">Stripe Secure</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="material-symbols-outlined">lock</span>
              <span className="text-xs font-bold uppercase tracking-wider">SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="material-symbols-outlined">security</span>
              <span className="text-xs font-bold uppercase tracking-wider">PCI Compliant</span>
            </div>
          </div>
          <p className="text-gray-400 text-xs">
            © 2024 LCTNSHIPS Inc. All financial processing is secured by Stripe API.
          </p>
        </div>
      </div>
    </div>
  )
}
