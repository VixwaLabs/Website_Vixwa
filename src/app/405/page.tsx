import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "405 — Method Not Allowed | VIXWA LABS",
  description: "The requested HTTP method is not supported for this resource.",
};

export default function Error405Page() {
  return <UnifiedErrorPage code="405" />;
}

