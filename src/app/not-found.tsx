"use client";

import ErrorTemplate from "@/components/errors/error-template";

export default function NotFound() {
  return (
    <ErrorTemplate
      code="404"
      eyebrow="Error · 404"
      headlinePrefix="Lost in the"
      headlineAccent="data stream."
      description="The page you're looking for drifted off the grid. It may have been moved, renamed, or never existed. Let's get you back to familiar coordinates."
      statusMessages={[
        "Scanning known routes…",
        "Page not found in any cluster.",
        "Re-indexing the data stream…",
        "404 — signal lost.",
      ]}
      themePreset="default"
    />
  );
}
