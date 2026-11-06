import type { Metadata } from "next";
import ErrorTemplate from "@/components/errors/error-template";

export const metadata: Metadata = {
  title: "500 — Internal Server Error | VIXWA LABS",
  description: "The experiment encountered a fatal anomaly. Core dump generated.",
};

export default function Error500Page() {
  return (
    <ErrorTemplate
      code="500"
      eyebrow="Critical Experiment Failure · 500"
      eyebrowIcon="⚠"
      headlinePrefix="The experiment encountered a"
      headlineAccent="fatal anomaly."
      description="An unhandled exception propagated through the research runtime while processing your request. Diagnostics telemetry has been dispatched and the affected thread has been quarantined for post-mortem analysis."
      statusMessages={[
        "RUNTIME HALTED · CORE DUMP GENERATED",
        "THREAD: #VX-5000 · QUARANTINED",
        "TELEMETRY DISPATCHED TO INCIDENT OPS",
        "RECOVERY CONTROLLER STANDING BY",
      ]}
      themePreset="glitch"
      showTerminal={true}
      primaryButtonText="Restart Session"
      secondaryButtonText="Try Again"
    />
  );
}
