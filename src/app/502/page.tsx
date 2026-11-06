import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "502 — Bad Gateway | VIXWA LABS",
  description: "The gateway received an invalid response from an upstream server.",
};

export default function Error502Page() {
  return <UnifiedErrorPage code="502" />;
}
