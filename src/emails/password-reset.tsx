import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface PasswordResetEmailProps {
  resetLink?: string
  baseUrl?: string
}

export default function PasswordResetEmail({
  resetLink = "https://lcntships.com/reset-password?token=xxx",
  baseUrl = "https://lcntships.com",
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your lcntships password</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Link href={baseUrl} style={logoLink}>
              <span style={logoText}>lcntships</span>
            </Link>
          </Section>

          {/* Content */}
          <Section style={content}>
            <div style={lockIcon}>
              <Text style={{ margin: "0", fontSize: "32px" }}>🔒</Text>
            </div>

            <Heading style={h1}>Reset your lcntships password</Heading>

            <Text style={bodyText}>
              Hello, we received a request to reset the password for your
              lcntships account. Click the button below to choose a new one.
            </Text>

            {/* CTA */}
            <Section style={{ textAlign: "center" as const }}>
              <Button style={primaryButton} href={resetLink}>
                Reset Password
              </Button>
            </Section>

            {/* Expiry Warning */}
            <Section style={warningCard}>
              <Text style={warningText}>
                ⏰ For your security, this link will expire in 2 hours.
              </Text>
            </Section>
          </Section>

          {/* Secondary Info */}
          <Section style={secondarySection}>
            <Text style={secondaryText}>
              If you didn't request this change, you can safely ignore this
              email. Your account is still secure.
            </Text>

            <Section style={{ textAlign: "center" as const, marginTop: "32px" }}>
              <Text style={teamName}>The lcntships Team</Text>
              <Text style={teamSubtext}>
                Creative Studio Rentals & Management
              </Text>
            </Section>

            <Text style={copyright}>
              © {new Date().getFullYear()} LCNTSHIPS STUDIO RENTALS. ALL RIGHTS
              RESERVED.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f7f8",
  fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
}

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden" as const,
  border: "1px solid #e7f0f3",
}

const header = {
  padding: "32px",
  borderBottom: "1px solid #e7f0f3",
  textAlign: "center" as const,
}

const logoLink = { textDecoration: "none", color: "#0e181b" }
const logoText = { fontSize: "24px", fontWeight: "700" }

const content = {
  padding: "40px 32px",
  textAlign: "center" as const,
}

const lockIcon = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  backgroundColor: "rgba(48,186,232,0.1)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "24px",
}

const h1 = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#0e181b",
  margin: "0 0 16px",
}

const bodyText = {
  fontSize: "16px",
  color: "#4e8597",
  lineHeight: "1.6",
  margin: "0 0 32px",
  maxWidth: "480px",
  marginLeft: "auto",
  marginRight: "auto",
}

const primaryButton = {
  backgroundColor: "#30bae8",
  color: "#0e181b",
  fontSize: "18px",
  fontWeight: "700",
  padding: "16px 20px",
  borderRadius: "8px",
  textDecoration: "none",
  display: "block",
  width: "320px",
  maxWidth: "100%",
  textAlign: "center" as const,
  margin: "0 auto",
}

const warningCard = {
  marginTop: "32px",
  padding: "16px 24px",
  backgroundColor: "#f6f7f8",
  borderRadius: "12px",
  border: "1px solid #e7f0f3",
  maxWidth: "480px",
  marginLeft: "auto",
  marginRight: "auto",
}

const warningText = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#4e8597",
  textAlign: "center" as const,
  margin: "0",
}

const secondarySection = {
  padding: "32px",
  borderTop: "1px dashed #e7f0f3",
  margin: "0 32px",
  textAlign: "center" as const,
}

const secondaryText = {
  fontSize: "14px",
  color: "#4e8597",
  lineHeight: "1.6",
  margin: "0 0 0",
}

const teamName = { fontSize: "14px", fontWeight: "700", color: "#0e181b", margin: "0 0 4px" }
const teamSubtext = { fontSize: "12px", color: "#4e8597", margin: "0" }

const copyright = {
  fontSize: "10px",
  color: "#4e8597",
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
  opacity: 0.5,
  marginTop: "32px",
}
