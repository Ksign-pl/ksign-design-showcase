import * as React from 'react'
import { Button, Heading, Text } from '@react-email/components'
import { EmailShell, styles } from './_brand'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({
  siteName,
  confirmationUrl,
}: MagicLinkEmailProps) => (
  <EmailShell preview="Link logowania — KSIGN">
    <Heading style={styles.h1}>Twój link logowania</Heading>
    <Text style={styles.text}>
      Kliknij przycisk poniżej, aby zalogować się do {siteName}. Link wygaśnie
      za chwilę.
    </Text>
    <Button style={styles.button} href={confirmationUrl}>
      Zaloguj się
    </Button>
    <Text style={{ ...styles.footer, marginTop: '28px' }}>
      Jeśli to nie Ty prosiłeś/aś o link, zignoruj tę wiadomość.
    </Text>
  </EmailShell>
)

export default MagicLinkEmail
