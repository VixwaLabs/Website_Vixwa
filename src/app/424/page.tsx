import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "424 — Failed Dependency | VIXWA LABS",
  description: "Dependent request failed.",
};

export default function Error424Page() {
  return <UnifiedErrorPage code="424" />;
}
