import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "508 — Loop Detected | VIXWA LABS",
  description: "Infinite processing loop detected.",
};

export default function Error508Page() {
  return <UnifiedErrorPage code="508" />;
}
