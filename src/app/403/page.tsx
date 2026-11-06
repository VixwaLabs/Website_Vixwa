import type { Metadata } from "next";
import ErrorTemplate from "@/components/errors/error-template";

export const metadata: Metadata = {
  title: "403 — Access Forbidden | VIXWA LABS",
  description: "Access restricted by neural firewall. Security clearance required.",
};

export default function Error403Page() {
  return (
    <ErrorTemplate
      code="403"
      eyebrow="Security Protocol · 403"
      eyebrowIcon="🛡"
      headlinePrefix="Access restricted by"
      headlineAccent="neural firewall."
      description="Your current clearance credentials are insufficient to inspect this research node. Perimeter encryption has locked this cluster to authorized research personnel only."
      statusMessages={[
        "CLEARANCE LEVEL: 0 · INSUFFICIENT PERMISSIONS",
        "PERIMETER ENCRYPTION: AES-GCM-512",
        "INCIDENT LOGGED TO SECURITY TELEMETRY",
        "NODE STATUS: HARD-QUARANTINED",
      ]}
      themePreset="security"
      primaryButtonText="Return to Home"
      secondaryButtonText="Go back"
    />
  );
}
