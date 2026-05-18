import * as React from 'react'
import { Button, Heading, Link, Text } from '@react-email/components'
import { EmailShell, styles } from './_brand'

interface EmailChangeEmailProps {
  siteName: string
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <EmailShell preview={`Potwierdź zmianę adresu e-mail dla ${siteName}`}>
    <Heading style={styles.h1}>Potwierdź zmianę adresu e-mail</Heading>
    <Text style={styles.text}>
      Poprosiłeś/aś o zmianę adresu e-mail dla {siteName} z{' '}
      <Link href={`mailto:${oldEmail}`} style={styles.link}>
        {oldEmail}
      </Link>{' '}
      na{' '}
      <Link href={`mailto:${newEmail}`} style={styles.link}>
        {newEmail}
      </Link>
      .
    </Text>
    <Text style={styles.text}>Kliknij przycisk poniżej, aby potwierdzić zmianę:</Text>
    <Button style={styles.button} href={confirmationUrl}>
      Potwierdź zmianę
    </Button>
    <Text style={{ ...styles.footer, marginTop: '28px' }}>
      Jeśli nie prosiłeś/aś o tę zmianę, natychmiast zabezpiecz swoje konto.
    </Text>
  </EmailShell>
)

export default EmailChangeEmail
