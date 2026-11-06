import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "425 — Too Early | VIXWA LABS",
  description: "Request might be replayed.",
};

export default function Error425Page() {
  return <UnifiedErrorPage code="425" />;
}
