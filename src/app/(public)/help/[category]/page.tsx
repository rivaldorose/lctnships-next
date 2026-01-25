import Link from "next/link"
import { notFound } from "next/navigation"

// Help category data
const categoryData: Record<string, {
  title: string
  description: string
  icon: string
  sections: {
    title: string
    icon: string
    articles: { title: string; slug: string }[]
  }[]
}> = {
  "booking-payments": {
    title: "Booking & Payments",
    description: "Manage your invoices, refunds, and payment methods securely.",
    icon: "credit_card",
    sections: [
      {
        title: "Invoices & Receipts",
        icon: "receipt_long",
        articles: [
          { title: "How to manage and download your invoices", slug: "manage-invoices" },
          { title: "Understanding refund timelines", slug: "refund-timelines" },
          { title: "Changing your payment method", slug: "change-payment-method" },
          { title: "How to apply project discounts", slug: "apply-discounts" },
        ],
      },
      {
        title: "Payment Issues",
        icon: "error",
        articles: [
          { title: "Payment declined - what to do", slug: "payment-declined" },
          { title: "Duplicate charges explained", slug: "duplicate-charges" },
          { title: "Currency conversion fees", slug: "currency-fees" },
        ],
      },
    ],
  },
  "renters": {
    title: "For Renters",
    description: "Everything you need to know about finding and renting the perfect studio.",
    icon: "person",
    sections: [
      {
        title: "Finding Studios",
        icon: "search",
        articles: [
          { title: "How to search for the perfect studio", slug: "search-studios" },
          { title: "Using filters effectively", slug: "using-filters" },
          { title: "Understanding studio ratings", slug: "studio-ratings" },
        ],
      },
      {
        title: "Booking Process",
        icon: "calendar_today",
        articles: [
          { title: "Making your first booking", slug: "first-booking" },
          { title: "Booking multiple days", slug: "multi-day-booking" },
          { title: "What to expect on arrival", slug: "arrival-guide" },
        ],
      },
    ],
  },
  "hosts": {
    title: "For Hosts",
    description: "Tips and tools for studio owners to maximize visibility and bookings.",
    icon: "storefront",
    sections: [
      {
        title: "Setting up your listing",
        icon: "add_business",
        articles: [
          { title: "How to take the best photos of your space", slug: "best-photos" },
          { title: "Describing your equipment and amenities", slug: "describe-equipment" },
          { title: "Verification requirements for new hosts", slug: "verification" },
          { title: "Setting your hourly and daily rates", slug: "set-rates" },
        ],
      },
      {
        title: "Managing availability",
        icon: "calendar_month",
        articles: [
          { title: "Syncing your external calendars (iCal)", slug: "sync-calendar" },
          { title: "Setting minimum booking hours", slug: "minimum-hours" },
          { title: "How to handle last-minute requests", slug: "last-minute" },
          { title: "Blocking dates for maintenance", slug: "block-dates" },
        ],
      },
      {
        title: "Payouts & Earnings",
        icon: "payments",
        articles: [
          { title: "Understanding our host service fees", slug: "service-fees" },
          { title: "When and how you get paid", slug: "payout-schedule" },
          { title: "Updating your tax information", slug: "tax-info" },
          { title: "Downloading your monthly earnings report", slug: "earnings-report" },
        ],
      },
    ],
  },
  "account": {
    title: "Account & Settings",
    description: "Update your profile, change passwords, and manage preferences.",
    icon: "settings",
    sections: [
      {
        title: "Profile Management",
        icon: "person",
        articles: [
          { title: "How to change your profile photo", slug: "change-photo" },
          { title: "Updating your personal bio", slug: "update-bio" },
          { title: "Linking social media accounts", slug: "link-social" },
        ],
      },
      {
        title: "Security & Passwords",
        icon: "shield",
        articles: [
          { title: "Setting up Two-Factor Authentication", slug: "two-factor" },
          { title: "Resetting a forgotten password", slug: "reset-password" },
          { title: "Reviewing active login sessions", slug: "active-sessions" },
        ],
      },
    ],
  },
  "projects": {
    title: "Projects",
    description: "Organize your creative workflows and team collaborations.",
    icon: "folder_open",
    sections: [
      {
        title: "Managing Workflows",
        icon: "account_tree",
        articles: [
          { title: "How to create and structure a new project", slug: "create-project" },
          { title: "Using project statuses to track progress", slug: "project-statuses" },
          { title: "Archiving vs. Deleting projects", slug: "archive-delete" },
        ],
      },
      {
        title: "Collaborating with Team Members",
        icon: "group",
        articles: [
          { title: "Inviting team members to your studio workspace", slug: "invite-team" },
          { title: "Managing roles and permissions", slug: "roles-permissions" },
        ],
      },
    ],
  },
  "cancellations": {
    title: "Cancellations & Refunds",
    description: "Understand refund policies and how to cancel or reschedule bookings.",
    icon: "cancel",
    sections: [
      {
        title: "Renter Cancellation Policy",
        icon: "person_cancel",
        articles: [
          { title: "How to cancel a studio booking", slug: "cancel-booking" },
          { title: "Understanding the 24h refund window", slug: "refund-window" },
          { title: "Cancellation fees for long-term rentals", slug: "long-term-fees" },
        ],
      },
      {
        title: "Refund Process",
        icon: "payments",
        articles: [
          { title: "Tracking your refund status", slug: "track-refund" },
          { title: "Partial refunds for technical issues", slug: "partial-refunds" },
        ],
      },
    ],
  },
}

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params
  const data = categoryData[category]
  if (!data) return { title: "Help Center" }

  return {
    title: `${data.title} | lctnships Help`,
    description: data.description,
  }
}

export default async function HelpCategoryPage({ params }: PageProps) {
  const { category } = await params
  const data = categoryData[category]

  if (!data) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f6f6f8]">
      {/* Header */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-0 mt-12 mb-10">
        <nav className="flex items-center gap-2 text-[#4c669a] text-xs font-semibold mb-6 uppercase tracking-wider">
          <Link href="/help" className="hover:text-primary transition-colors">
            Help Center
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#0d121b]">{data.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#e7ebf3] pb-10">
          <div className="flex items-start gap-6">
            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-4xl">{data.icon}</span>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-[#0d121b] text-4xl md:text-5xl font-extrabold tracking-tight">
                {data.title}
              </h1>
              <p className="text-[#4c669a] text-lg max-w-xl">{data.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-0 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {data.sections.map((section) => (
            <section key={section.title} className="flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">{section.icon}</span>
                <h2 className="text-xl font-extrabold text-[#0d121b]">{section.title}</h2>
              </div>
              <div className="flex flex-col gap-4">
                {section.articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/help/${category}/${article.slug}`}
                    className="group flex items-center justify-between py-1 text-[#4c669a] hover:text-primary transition-all"
                  >
                    <span className="text-base font-medium">{article.title}</span>
                    <span className="material-symbols-outlined text-xl opacity-0 group-hover:opacity-100 transition-all">
                      arrow_forward
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Still need help */}
      <div className="w-full bg-white border-y border-[#e7ebf3] py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
          <p className="text-[#4c669a] mb-8">
            Our support team is available 24/7 to assist with your questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Contact Support
            </button>
            <Link
              href="/help"
              className="bg-white text-[#0d121b] border border-[#e7ebf3] font-bold px-8 py-3 rounded-xl hover:bg-[#f6f6f8] transition-all"
            >
              Back to Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
