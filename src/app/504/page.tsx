import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "504 — Gateway Timeout | VIXWA LABS",
  description: "The upstream server took too long to respond.",
};

export default function Error504Page() {
  return <UnifiedErrorPage code="504" />;
}
