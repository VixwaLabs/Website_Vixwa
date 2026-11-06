import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "510 — Not Extended | VIXWA LABS",
  description: "Further extensions required.",
};

export default function Error510Page() {
  return <UnifiedErrorPage code="510" />;
}
