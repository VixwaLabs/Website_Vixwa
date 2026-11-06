import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "431 — Request Header Fields Too Large | VIXWA LABS",
  description: "Headers are too large.",
};

export default function Error431Page() {
  return <UnifiedErrorPage code="431" />;
}
