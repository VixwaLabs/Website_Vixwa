import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "402 — Payment Required | VIXWA LABS",
  description: "Access to this resource requires an active subscription or completed payment.",
};

export default function Error402Page() {
  return <UnifiedErrorPage code="402" />;
}
