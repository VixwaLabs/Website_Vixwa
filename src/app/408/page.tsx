import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "408 — Request Timeout | VIXWA LABS",
  description: "The connection timed out while waiting for the request to complete.",
};

export default function Error408Page() {
  return <UnifiedErrorPage code="408" />;
}

