import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "422 — Unprocessable Entity | VIXWA LABS",
  description: "The request was well-formed but contains semantic errors.",
};

export default function Error422Page() {
  return <UnifiedErrorPage code="422" />;
}
