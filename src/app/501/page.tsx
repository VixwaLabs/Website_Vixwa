import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "501 — Not Implemented | VIXWA LABS",
  description: "The requested capability is not yet supported by this server.",
};

export default function Error501Page() {
  return <UnifiedErrorPage code="501" />;
}

