import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "429 — Too Many Requests | VIXWA LABS",
  description: "You've reached the request limit. Please wait before trying again.",
};

export default function Error429Page() {
  return <UnifiedErrorPage code="429" />;
}
