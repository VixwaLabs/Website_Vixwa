import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "506 — Variant Also Negotiates | VIXWA LABS",
  description: "Content negotiation error.",
};

export default function Error506Page() {
  return <UnifiedErrorPage code="506" />;
}
