import type { Metadata } from "next";
import ErrorTemplate from "@/components/errors/error-template";

export const metadata: Metadata = {
  title: "401 — Unauthorized | VIXWA LABS",
  description: "Cryptographic identity unverified. Valid authentication credentials required.",
};

export default function Error401Page() {
  return (
    <ErrorTemplate
      code="401"
      eyebrow="Authentication Required · 401"
      eyebrowIcon="🔒"
      headlinePrefix="Cryptographic identity"
      headlineAccent="unverified."
      description="This endpoint requires a cryptographic researcher token or verified public key signature. Handshake negotiations completed without presenting valid authorization headers."
      statusMessages={[
        "CIPHER: ECDSA-P384 · TOKEN MISSING",
        'CHALLENGE: Bearer Realm="vixwa-auth"',
        "SIGNATURE: UNVERIFIED",
        "HANDSHAKE TERMINATED BY GATEWAY",
      ]}
      themePreset="auth"
      primaryButtonText="Return to Home"
      secondaryButtonText="Go back"
    />
  );
}
