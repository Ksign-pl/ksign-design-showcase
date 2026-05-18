import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailShell, styles } from './_brand'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <EmailShell preview="Kod weryfikacyjny — KSIGN">
    <Heading style={styles.h1}>Potwierdź ponowną autoryzację</Heading>
    <Text style={styles.text}>Użyj poniższego kodu, aby potwierdzić swoją tożsamość:</Text>
    <Text style={styles.code}>{token}</Text>
    <Text style={{ ...styles.footer, marginTop: '8px' }}>
      Kod wygaśnie za chwilę. Jeśli to nie Ty go żądałeś/aś, zignoruj tę
      wiadomość.
    </Text>
  </EmailShell>
)

export default ReauthenticationEmail
