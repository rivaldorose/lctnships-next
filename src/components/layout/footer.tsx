import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4L44 24L24 44L4 24L24 4Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-extrabold tracking-tight">lcntships</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The premium platform for creators to find and book unique studio spaces worldwide.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link href="/studios" className="hover:text-black transition-colors">
                  Find a Studio
                </Link>
              </li>
              <li>
                <Link href="/cities" className="hover:text-black transition-colors">
                  Cities
                </Link>
              </li>
              <li>
                <Link href="/studio-types" className="hover:text-black transition-colors">
                  Studio Types
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link href="/help" className="hover:text-black transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-black transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-black transition-colors">
                  Cancellation
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-bold mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="size-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
              >
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
              <a
                href="#"
                className="size-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
              >
                <span className="material-symbols-outlined text-lg">photo_camera</span>
              </a>
              <a
                href="#"
                className="size-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
              >
                <span className="material-symbols-outlined text-lg">videocam</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-50 text-xs font-bold text-gray-400">
          <p>&copy; {new Date().getFullYear()} lcntships Creative Studio Rental. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-black transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-black transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
