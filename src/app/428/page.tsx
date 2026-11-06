import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "428 — Precondition Required | VIXWA LABS",
  description: "Request needs a condition.",
};

export default function Error428Page() {
  return <UnifiedErrorPage code="428" />;
}
