import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "409 — Conflict | VIXWA LABS",
  description: "The request conflicts with the current state of the target resource.",
};

export default function Error409Page() {
  return <UnifiedErrorPage code="409" />;
}
