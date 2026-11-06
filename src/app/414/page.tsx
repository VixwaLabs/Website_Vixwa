import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "414 — URI Too Long | VIXWA LABS",
  description: "URL is too long.",
};

export default function Error414Page() {
  return <UnifiedErrorPage code="414" />;
}

