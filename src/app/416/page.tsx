import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "416 — Range Not Satisfiable | VIXWA LABS",
  description: "Requested range unavailable.",
};

export default function Error416Page() {
  return <UnifiedErrorPage code="416" />;
}
