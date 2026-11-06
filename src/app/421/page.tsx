import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "421 — Misdirected Request | VIXWA LABS",
  description: "Request sent to the wrong server.",
};

export default function Error421Page() {
  return <UnifiedErrorPage code="421" />;
}
