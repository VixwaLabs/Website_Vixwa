import type { Metadata } from "next";
import ErrorTemplate from "@/components/errors/error-template";

export const metadata: Metadata = {
  title: "504 — Gateway Timeout | VIXWA LABS",
  description: "Response exceeded temporal threshold. Computational deadline expired.",
};

export default function Error504Page() {
  return (
    <ErrorTemplate
      code="504"
      eyebrow="Execution Latency Exceeded · 504"
      eyebrowIcon="⏱"
      headlinePrefix="Response exceeded"
      headlineAccent="temporal threshold."
      description="The upstream intelligence engine took longer than the allocated computational deadline to synthesize a reply. The operation timed out waiting for upstream node confirmation."
      statusMessages={[
        "DEADLINE: 30,000ms · ELAPSED: 30,001ms",
        "TEMPORAL HYPOTHESIS DEREFERENCED",
        "UPSTREAM NODE UNRESPONSIVE",
        "REQUEST ABORTED BY INGRESS PROXY",
      ]}
      themePreset="chrono"
      primaryButtonText="Return to Home"
      secondaryButtonText="Retry Query"
    />
  );
}
