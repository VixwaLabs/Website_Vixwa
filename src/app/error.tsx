"use client";

import { useEffect } from "react";
import ErrorTemplate from "@/components/errors/error-template";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled runtime exception:", error);
  }, [error]);

  return (
    <ErrorTemplate
      code="500"
      eyebrow="Critical Experiment Failure · 500"
      eyebrowIcon="⚠"
      headlinePrefix="The experiment encountered a"
      headlineAccent="fatal anomaly."
      description="An unhandled exception propagated through the research runtime while processing your request. Diagnostics telemetry has been dispatched and the affected thread has been quarantined for post-mortem analysis."
      statusMessages={[
        `EXCEPTION DIGEST: ${error.digest || "VX-FATAL-001"}`,
        "RUNTIME HALTED · CORE DUMP GENERATED",
        "THREAD QUARANTINED · STANDBY FOR RESET",
      ]}
      themePreset="glitch"
      showTerminal={true}
      terminalLogs={[
        {
          time: "[CRASH]",
          level: "e",
          text: `Digest: ${error.digest || "unhandled_runtime_fault"} — ${error.message || "Segmentation fault"}`,
        },
      ]}
      primaryButtonText="Restart Session"
      secondaryButtonText="Reset Runtime"
      onSecondaryAction={() => reset()}
    />
  );
}
