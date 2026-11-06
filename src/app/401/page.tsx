import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "401 — Authentication Required | VIXWA LABS",
  description: "Sign in to verify your identity and continue.",
};

export default function Error401Page() {
  return <UnifiedErrorPage code="401" />;
}
