import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "426 — Upgrade Required | VIXWA LABS",
  description: "Protocol upgrade required.",
};

export default function Error426Page() {
  return <UnifiedErrorPage code="426" />;
}
