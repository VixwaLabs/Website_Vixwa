import type { Metadata } from "next";
import ErrorTemplate from "@/components/errors/error-template";

export const metadata: Metadata = {
  title: "429 — Too Many Requests | VIXWA LABS",
  description: "Request velocity limit exceeded. Neural rate limiter engaged.",
};

export default function Error429Page() {
  return (
    <ErrorTemplate
      code="429"
      eyebrow="Rate Limiter Engaged · 429"
      eyebrowIcon="🚦"
      headlinePrefix="Request velocity"
      headlineAccent="limit exceeded."
      description="You have transmitted queries faster than our rate-limiting governor permits. Request bursts have exceeded safe queue thresholds. Please pause transmissions while token buckets replenish."
      statusMessages={[
        "BURST LIMIT: 120 req/min · VELOCITY SATURATED",
        "LEAKY BUCKET CAPACITY EXHAUSTED",
        "COOLDOWN ENGAGED: RETRY-AFTER 30s",
        "SYSTEM PROTECTION GOVERNOR ACTIVE",
      ]}
      themePreset="throttle"
      primaryButtonText="Return to Home"
      secondaryButtonText="Cooldown & Retry"
    />
  );
}
