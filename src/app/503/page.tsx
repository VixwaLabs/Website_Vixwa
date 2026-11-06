import type { Metadata } from "next";
import ErrorTemplate from "@/components/errors/error-template";

export const metadata: Metadata = {
  title: "503 — Service Unavailable | VIXWA LABS",
  description: "Compute clusters undergoing maintenance. Capacity threshold active.",
};

export default function Error503Page() {
  return (
    <ErrorTemplate
      code="503"
      eyebrow="Capacity Threshold · 503"
      eyebrowIcon="⚡"
      headlinePrefix="Compute clusters undergoing"
      headlineAccent="maintenance."
      description="Our distributed neural inference clusters are operating at peak thermal capacity or receiving scheduled architectural upgrades. Automatic load-shedding is currently active to safeguard hardware integrity."
      statusMessages={[
        "CLUSTER LOAD: 99.4% · THERMAL SHIELD ENGAGED",
        "SCHEDULED ARCHITECTURAL UPGRADE IN PROGRESS",
        "AUTO-RECOVERY ROUTINE DISPATCHED",
        "NODE RE-INDEXING EXPECTED SHORTLY",
      ]}
      themePreset="overload"
      primaryButtonText="Return to Home"
      secondaryButtonText="Refresh Status"
    />
  );
}
