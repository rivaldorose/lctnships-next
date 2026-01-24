import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "LCNTSHIPS - Book Creative Studios",
    template: "%s | LCNTSHIPS",
  },
  description: "Find and book creative studios for photography, video, podcast, music, and more.",
  keywords: ["studio rental", "creative space", "photography studio", "video studio", "podcast studio", "Netherlands"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
