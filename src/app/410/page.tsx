import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "410 — Resource Gone | VIXWA LABS",
  description: "The requested resource has been permanently removed and is no longer available.",
};

export default function Error410Page() {
  return <UnifiedErrorPage code="410" />;
}
