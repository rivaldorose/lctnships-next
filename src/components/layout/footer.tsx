import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">LCNTSHIPS</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  Over ons
                </Link>
              </li>
              <li>
                <Link href="/become-a-host" className="hover:text-foreground transition-colors">
                  Word Host
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h3 className="font-semibold mb-4">Ontdek</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/studios?type=photo" className="hover:text-foreground transition-colors">
                  Fotostudio&apos;s
                </Link>
              </li>
              <li>
                <Link href="/studios?type=video" className="hover:text-foreground transition-colors">
                  Videostudio&apos;s
                </Link>
              </li>
              <li>
                <Link href="/studios?type=podcast" className="hover:text-foreground transition-colors">
                  Podcaststudio&apos;s
                </Link>
              </li>
              <li>
                <Link href="/studios?type=music" className="hover:text-foreground transition-colors">
                  Muziekstudio&apos;s
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold mb-4">Steden</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/studios?city=amsterdam" className="hover:text-foreground transition-colors">
                  Amsterdam
                </Link>
              </li>
              <li>
                <Link href="/studios?city=rotterdam" className="hover:text-foreground transition-colors">
                  Rotterdam
                </Link>
              </li>
              <li>
                <Link href="/studios?city=utrecht" className="hover:text-foreground transition-colors">
                  Utrecht
                </Link>
              </li>
              <li>
                <Link href="/studios?city=den-haag" className="hover:text-foreground transition-colors">
                  Den Haag
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Algemene Voorwaarden
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacybeleid
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LCNTSHIPS. Alle rechten voorbehouden.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span>🇳🇱 Nederland</span>
            <span>€ EUR</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
