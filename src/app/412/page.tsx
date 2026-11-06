import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "412 — Precondition Failed | VIXWA LABS",
  description: "Request condition failed.",
};

export default function Error412Page() {
  return <UnifiedErrorPage code="412" />;
}

