import Link from "next/link"

export const metadata = {
  title: "Cancellation & Refund Policy | lctnships",
  description: "Clear, transparent cancellation and refund policies designed to build trust and support your creative journey.",
}

const policyTiers = [
  {
    name: "Flexible",
    refund: "100%",
    label: "Full Refund",
    color: "green",
    timelineWidth: "w-3/4",
    timeLabel: "-24h",
    description: "Full refund if cancelled at least 24 hours before the session starts.",
  },
  {
    name: "Standard",
    refund: "50%",
    label: "Partial Refund",
    color: "blue",
    timelineWidth: "w-1/2",
    timeLabel: "-48h",
    description: "50% refund if cancelled at least 48 hours before the session starts.",
  },
  {
    name: "Strict",
    refund: "0%",
    label: "Non-refundable",
    color: "gray",
    timelineWidth: "w-1/4",
    timeLabel: "-7 Days",
    description: "No refund if cancelled within 7 days of the scheduled session.",
  },
]

const steps = [
  {
    number: 1,
    title: "Go to Dashboard",
    description: "Log in and navigate to your 'Upcoming Sessions' tab.",
  },
  {
    number: 2,
    title: "Select Booking",
    description: "Find the session you want to cancel and click 'Manage'.",
  },
  {
    number: 3,
    title: "Confirm",
    description: "Select 'Cancel Session' and confirm the refund terms.",
  },
]

const processSteps = [
  { icon: "cancel", label: "Cancellation Request" },
  { icon: "verified", label: "Policy Verification" },
  { icon: "wallet", label: "Payment Processing" },
  { icon: "check", label: "Funds Received" },
]

export default function CancellationPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Hero Section */}
        <section className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-gray-900 dark:text-white text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight mb-4">
            Flexible planning for your creative journey
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Clear, transparent policies designed to build trust and support your growth.
            We balance flexibility for renters with commitment for hosts.
          </p>
        </section>

        {/* Policy Tiers Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {policyTiers.map((tier) => (
            <div
              key={tier.name}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-[32px] shadow-xl shadow-gray-200/50 dark:shadow-none flex flex-col items-center text-center hover:-translate-y-1 transition-transform"
            >
              <div
                className={`mb-6 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest ${
                  tier.color === "green"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                    : tier.color === "blue"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-primary"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                {tier.name}
              </div>
              <div className="text-6xl font-extrabold text-gray-900 dark:text-white mb-2">
                {tier.refund}
              </div>
              <p className="text-gray-500 font-medium mb-8">{tier.label}</p>

              {/* Timeline Visualization */}
              <div className="w-full space-y-4 mb-8">
                <div className="relative h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full ${tier.timelineWidth} ${
                      tier.color === "gray" ? "bg-gray-400" : "bg-primary"
                    } rounded-full`}
                  />
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                  <span>Booking</span>
                  <span className={tier.color === "gray" ? "text-gray-400" : "text-primary"}>
                    {tier.timeLabel}
                  </span>
                  <span>Session</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {tier.description}
              </p>
            </div>
          ))}
        </section>

        {/* How to Cancel Section */}
        <section className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
              How to cancel
            </h2>
            <p className="text-gray-500">Simple steps to manage your bookings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-extrabold shadow-lg shadow-primary/30 mb-6">
                  {step.number}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Refund Process Flowchart */}
        <section className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-[32px] p-12 border border-gray-100 dark:border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold mb-2 text-gray-900 dark:text-white">
              Refund Process Flow
            </h2>
            <p className="text-gray-500">What happens after you cancel</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            {processSteps.map((step, index) => (
              <div key={step.label} className="flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center gap-3 w-48">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      index === processSteps.length - 1
                        ? "bg-primary text-white"
                        : "bg-gray-50 dark:bg-gray-800 text-primary"
                    }`}
                  >
                    {step.icon === "cancel" && (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    {step.icon === "verified" && (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )}
                    {step.icon === "wallet" && (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    )}
                    {step.icon === "check" && (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-tighter text-center text-gray-600 dark:text-gray-400">
                    {step.label.split(" ").map((word, i) => (
                      <span key={i}>
                        {word}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </span>
                </div>
                {index < processSteps.length - 1 && (
                  <>
                    <div className="hidden md:block h-[2px] w-16 bg-gray-100 dark:bg-gray-800 mx-4" />
                    <div className="md:hidden h-8 w-[2px] bg-gray-100 dark:bg-gray-800 my-2" />
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 bg-primary/5 rounded-2xl text-center border border-primary/10">
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-normal flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Refunds are typically processed to your original payment method within{" "}
              <span className="font-bold text-primary">5-10 business days</span>.
            </p>
          </div>
        </section>

        {/* Footer Help CTA */}
        <section className="mt-24 text-center pb-12">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Still have questions?
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Our support team is available 24/7 to help you with your booking or any concerns about the policy.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/help"
              className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:brightness-105 transition-all"
            >
              Contact Support
            </Link>
            <Link
              href="/help"
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              Read FAQ
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
