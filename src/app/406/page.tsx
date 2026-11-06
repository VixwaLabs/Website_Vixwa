import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "406 — Not Acceptable | VIXWA LABS",
  description: "Requested format not acceptable.",
};

export default function Error406Page() {
  return <UnifiedErrorPage code="406" />;
}

