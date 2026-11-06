import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "511 — Network Authentication Required | VIXWA LABS",
  description: "Network authentication required.",
};

export default function Error511Page() {
  return <UnifiedErrorPage code="511" />;
}

