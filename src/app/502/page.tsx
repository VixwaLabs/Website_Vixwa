import type { Metadata } from "next";
import ErrorTemplate from "@/components/errors/error-template";

export const metadata: Metadata = {
  title: "502 — Bad Gateway | VIXWA LABS",
  description: "Upstream synaptic bridge severed. Transmission dropped during packet synthesis.",
};

export default function Error502Page() {
  return (
    <ErrorTemplate
      code="502"
      eyebrow="Gateway Bridge Failure · 502"
      eyebrowIcon="⚡"
      headlinePrefix="Upstream synaptic bridge"
      headlineAccent="severed."
      description="The edge gateway received an invalid or unparseable response from the upstream computational backend. Transmission dropped during packet synthesis over the distributed interconnect."
      statusMessages={[
        "EDGE PROTOCOL: HTTP/3 · UPSTREAM PEER UNREACHABLE",
        "PACKET LOSS: 100% OVER INTERCONNECT",
        "GATEWAY DESYNCHRONIZATION DETECTED",
        "RE-ESTABLISHING INGRESS PIPE…",
      ]}
      themePreset="severed"
      primaryButtonText="Return to Home"
      secondaryButtonText="Re-establish Bridge"
    />
  );
}
