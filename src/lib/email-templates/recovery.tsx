import * as React from 'react'
import { Button, Heading, Text } from '@react-email/components'
import { EmailShell, styles } from './_brand'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <EmailShell preview={`Zresetuj hasło dla ${siteName}`}>
    <Heading style={styles.h1}>Zresetuj swoje hasło</Heading>
    <Text style={styles.text}>
      Otrzymaliśmy prośbę o zresetowanie hasła dla {siteName}. Kliknij przycisk
      poniżej, aby ustawić nowe hasło.
    </Text>
    <Button style={styles.button} href={confirmationUrl}>
      Zresetuj hasło
    </Button>
    <Text style={{ ...styles.footer, marginTop: '28px' }}>
      Jeśli to nie Ty prosiłeś/aś o reset hasła, zignoruj tę wiadomość — hasło
      pozostanie bez zmian.
    </Text>
  </EmailShell>
)

export default RecoveryEmail
