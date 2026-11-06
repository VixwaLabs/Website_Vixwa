import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "423 — Locked | VIXWA LABS",
  description: "Resource is locked.",
};

export default function Error423Page() {
  return <UnifiedErrorPage code="423" />;
}

