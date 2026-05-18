import * as React from 'react'
import { Button, Heading, Link, Text } from '@react-email/components'
import { EmailShell, styles } from './_brand'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <EmailShell preview={`Zaproszenie do ${siteName}`}>
    <Heading style={styles.h1}>Masz zaproszenie</Heading>
    <Text style={styles.text}>
      Zaproszono Cię do{' '}
      <Link href={siteUrl} style={styles.link}>
        <strong>{siteName}</strong>
      </Link>
      . Kliknij przycisk poniżej, aby przyjąć zaproszenie i utworzyć konto.
    </Text>
    <Button style={styles.button} href={confirmationUrl}>
      Przyjmij zaproszenie
    </Button>
    <Text style={{ ...styles.footer, marginTop: '28px' }}>
      Jeśli nie spodziewałeś/aś się tego zaproszenia, możesz je zignorować.
    </Text>
  </EmailShell>
)

export default InviteEmail
