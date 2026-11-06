import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "507 — Insufficient Storage | VIXWA LABS",
  description: "Server storage insufficient.",
};

export default function Error507Page() {
  return <UnifiedErrorPage code="507" />;
}
