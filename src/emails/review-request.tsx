import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface ReviewRequestEmailProps {
  studioName?: string
  studioImage?: string
  sessionDate?: string
  baseUrl?: string
}

export default function ReviewRequestEmail({
  studioName = "Loft 42",
  studioImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuB1nc2TNQMxDrm2sa-jmxBeLQOqJYHYDQgmDKwxqHKiPiX7Bck70VJSjtwPNJNR-8hEqcW4esAYzX0A9VdoqzoxmzZKUZaRIHqVJRiZgyvqLP23lLzIQ3PL8FYoOlQe9_txe8TCJGdGV5Xcr5ATaOChUtVivhRNEYUOj4H4kPuqJQJ0PPcA4zG_Vbhh7DROKS16E_05LQrcgSMdXkWpRFzfJuntniE6Q_IDhgmG7jVllhkuBn-B2oX920c3ZXuGqZvUsoZ8ei35ua8",
  sessionDate = "Yesterday, 10:00 AM — 4:00 PM",
  baseUrl = "https://lcntships.com",
}: ReviewRequestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>How was your shoot at {studioName}?</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Link href={baseUrl} style={logoLink}>
              <span style={logoText}>lcntships</span>
            </Link>
          </Section>

          {/* Hero Image with overlay text */}
          <Section style={{ padding: "0" }}>
            <Img
              src={studioImage}
              width="600"
              height="320"
              alt={studioName}
              style={heroImage}
            />
            <Section style={heroOverlay}>
              <Heading style={heroTitle}>
                How was your shoot at {studioName}?
              </Heading>
              <Text style={heroSubtitle}>{sessionDate}</Text>
            </Section>
          </Section>

          {/* Body Text */}
          <Section style={{ padding: "16px 32px 32px" }}>
            <Text style={bodyText}>
              We hope your session was productive. Your feedback helps our
              creative community grow and ensures our studios maintain the
              highest standards for every artist.
            </Text>
          </Section>

          {/* Rating Section */}
          <Section style={ratingSection}>
            <Text style={ratingLabel}>RATE YOUR EXPERIENCE</Text>
            <Text style={ratingStars}>★ ★ ★ ★ ★</Text>
            <Text style={ratingHint}>Tap a star to submit instantly</Text>
          </Section>

          {/* Share CTA */}
          <Section style={{ textAlign: "center" as const, padding: "0 32px 48px" }}>
            <Section style={divider} />
            <Heading as="h3" style={shareHeading}>
              Show us what you created
            </Heading>
            <Text style={shareText}>
              Your work inspires others. Upload your favorites from the session
              to the Inspiration Board to be featured in our monthly digest.
            </Text>
            <Button style={primaryButton} href={`${baseUrl}/inspiration`}>
              Share your work
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You're receiving this because you booked a session through
              lcntships.
            </Text>
            <Text style={footerLinks}>
              <Link href={`${baseUrl}/unsubscribe`} style={footerLink}>Unsubscribe</Link>
              {" • "}
              <Link href={`${baseUrl}/privacy`} style={footerLink}>Privacy Policy</Link>
              {" • "}
              <Link href={`${baseUrl}/support`} style={footerLink}>Support Center</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#111d21",
  fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const container = {
  maxWidth: "720px",
  margin: "0 auto",
  backgroundColor: "#1b2b30",
  borderRadius: "12px",
  overflow: "hidden" as const,
}

const header = { padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.1)" }
const logoLink = { textDecoration: "none", color: "#30bae8" }
const logoText = { fontSize: "20px", fontWeight: "700", color: "#ffffff" }

const heroImage = { width: "100%", objectFit: "cover" as const, display: "block" }

const heroOverlay = { padding: "32px", marginTop: "-120px", position: "relative" as const }
const heroTitle = { fontSize: "32px", fontWeight: "800", color: "#ffffff", margin: "0 0 8px", lineHeight: "1.2" }
const heroSubtitle = { fontSize: "18px", color: "rgba(255,255,255,0.6)", margin: "0" }

const bodyText = {
  fontSize: "18px",
  color: "rgba(255,255,255,0.8)",
  lineHeight: "1.6",
  textAlign: "center" as const,
  fontWeight: "300",
  margin: "0",
}

const ratingSection = {
  textAlign: "center" as const,
  padding: "32px",
  margin: "0 32px 32px",
  backgroundColor: "rgba(255,255,255,0.05)",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.1)",
}

const ratingLabel = {
  fontSize: "12px",
  fontWeight: "700",
  color: "#30bae8",
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
  margin: "0 0 24px",
}

const ratingStars = { fontSize: "48px", color: "rgba(255,255,255,0.2)", margin: "0 0 16px", letterSpacing: "16px" }
const ratingHint = { fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: "0" }

const divider = { width: "48px", height: "1px", backgroundColor: "rgba(255,255,255,0.1)", margin: "0 auto 32px" }

const shareHeading = { fontSize: "20px", fontWeight: "600", color: "#ffffff", margin: "0 0 16px" }
const shareText = { fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: "1.6", margin: "0 0 32px" }

const primaryButton = {
  backgroundColor: "#30bae8",
  color: "#111d21",
  fontSize: "16px",
  fontWeight: "700",
  padding: "16px 40px",
  borderRadius: "999px",
  textDecoration: "none",
  display: "inline-block",
}

const footer = { padding: "48px 32px", textAlign: "center" as const }
const footerText = { fontSize: "14px", color: "rgba(255,255,255,0.3)", margin: "0 0 8px" }
const footerLinks = { fontSize: "14px", margin: "0" }
const footerLink = { color: "rgba(255,255,255,0.3)", textDecoration: "underline" }
