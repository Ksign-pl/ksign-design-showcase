import * as React from "react";
import { Button, Heading, Link, Text } from "@react-email/components";
import { EmailShell, styles } from "./_brand";

interface SignupEmailProps {
  siteName: string;
  siteUrl: string;
  recipient: string;
  confirmationUrl: string;
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <EmailShell preview="Potwierdź e-mail — KSIGN">
    <Heading style={styles.h1}>Potwierdź swój adres e-mail</Heading>
    <Text style={styles.text}>
      Dziękujemy za rejestrację w{" "}
      <Link href={siteUrl} style={styles.link}>
        <strong>{siteName}</strong>
      </Link>
      .
    </Text>
    <Text style={styles.text}>
      Potwierdź adres{" "}
      <Link href={`mailto:${recipient}`} style={styles.link}>
        {recipient}
      </Link>{" "}
      klikając w przycisk poniżej:
    </Text>
    <Button style={styles.button} href={confirmationUrl}>
      Potwierdź e-mail
    </Button>
    <Text style={{ ...styles.footer, marginTop: "28px" }}>
      Jeśli to nie Ty zakładałeś/aś konto, zignoruj tę wiadomość.
    </Text>
  </EmailShell>
);

export default SignupEmail;
