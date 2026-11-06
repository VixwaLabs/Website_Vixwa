import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "503 — Service Temporarily Unavailable | VIXWA LABS",
  description: "Our systems are temporarily unavailable. Please try again shortly.",
};

export default function Error503Page() {
  return <UnifiedErrorPage code="503" />;
}
