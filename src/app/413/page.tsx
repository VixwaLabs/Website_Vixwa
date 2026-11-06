import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "413 — Payload Too Large | VIXWA LABS",
  description: "The request data exceeds the maximum allowable capacity.",
};

export default function Error413Page() {
  return <UnifiedErrorPage code="413" />;
}
