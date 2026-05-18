import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

// KSIGN brand tokens (approximated from oklch in src/styles.css to hex for email clients)
export const brand = {
  lime: '#C7F23F',
  violet: '#B57BD9',
  ink: '#1A1A2E',
  cream: '#F7F4ED',
  muted: '#6B6B7B',
  border: '#E8E5DC',
  white: '#FFFFFF',
  fontFamily:
    '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
}

export const styles = {
  main: {
    backgroundColor: brand.white,
    fontFamily: brand.fontFamily,
    margin: 0,
    padding: 0,
  } as React.CSSProperties,
  container: {
    maxWidth: '560px',
    margin: '0 auto',
    padding: '32px 24px 40px',
  } as React.CSSProperties,
  logoBar: {
    padding: '0 0 24px',
  } as React.CSSProperties,
  logo: {
    fontFamily: brand.fontFamily,
    fontSize: '22px',
    fontWeight: 800,
    letterSpacing: '0.02em',
    color: brand.ink,
    margin: 0,
  } as React.CSSProperties,
  logoDot: {
    color: brand.violet,
  } as React.CSSProperties,
  card: {
    backgroundColor: brand.cream,
    border: `1px solid ${brand.border}`,
    borderRadius: '20px',
    padding: '36px 32px',
  } as React.CSSProperties,
  accentBar: {
    display: 'inline-block',
    width: '44px',
    height: '4px',
    borderRadius: '999px',
    background: `linear-gradient(90deg, ${brand.lime} 0%, ${brand.violet} 100%)`,
    marginBottom: '20px',
  } as React.CSSProperties,
  h1: {
    fontFamily: brand.fontFamily,
    fontSize: '26px',
    lineHeight: '1.2',
    fontWeight: 700,
    color: brand.ink,
    letterSpacing: '-0.02em',
    margin: '0 0 16px',
  } as React.CSSProperties,
  text: {
    fontFamily: brand.fontFamily,
    fontSize: '15px',
    lineHeight: '1.65',
    color: brand.ink,
    margin: '0 0 18px',
  } as React.CSSProperties,
  link: {
    color: brand.ink,
    textDecoration: 'underline',
    textDecorationColor: brand.lime,
    textDecorationThickness: '2px',
    textUnderlineOffset: '3px',
  } as React.CSSProperties,
  button: {
    display: 'inline-block',
    backgroundColor: brand.ink,
    color: brand.lime,
    fontFamily: brand.fontFamily,
    fontSize: '15px',
    fontWeight: 600,
    letterSpacing: '0.01em',
    borderRadius: '999px',
    padding: '14px 28px',
    textDecoration: 'none',
    border: `2px solid ${brand.ink}`,
  } as React.CSSProperties,
  code: {
    fontFamily:
      '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace',
    fontSize: '28px',
    fontWeight: 700,
    letterSpacing: '0.4em',
    color: brand.ink,
    backgroundColor: brand.white,
    border: `2px dashed ${brand.violet}`,
    borderRadius: '12px',
    padding: '18px 24px',
    textAlign: 'center' as const,
    margin: '0 0 24px',
    display: 'block',
  } as React.CSSProperties,
  hr: {
    borderColor: brand.border,
    borderStyle: 'solid',
    borderWidth: '1px 0 0 0',
    margin: '28px 0 20px',
  } as React.CSSProperties,
  footer: {
    fontFamily: brand.fontFamily,
    fontSize: '12px',
    lineHeight: '1.6',
    color: brand.muted,
    margin: '0 0 6px',
  } as React.CSSProperties,
  footerBrand: {
    fontFamily: brand.fontFamily,
    fontSize: '12px',
    color: brand.muted,
    margin: '20px 0 0',
    textAlign: 'center' as const,
  } as React.CSSProperties,
}

interface ShellProps {
  preview: string
  children: React.ReactNode
}

export const EmailShell = ({ preview, children }: ShellProps) => (
  <Html lang="pl" dir="ltr">
    <Head />
    <Preview>{preview}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.logoBar}>
          <Text style={styles.logo}>
            KSIGN<span style={styles.logoDot}>.</span>
          </Text>
        </Section>
        <Section style={styles.card}>
          <span style={styles.accentBar} />
          {children}
        </Section>
        <Hr style={styles.hr} />
        <Text style={styles.footerBrand}>
          KSIGN — projektujemy strony, które sprzedają
        </Text>
      </Container>
    </Body>
  </Html>
)
