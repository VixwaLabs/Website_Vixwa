import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "415 — Unsupported Media Type | VIXWA LABS",
  description: "Media format unsupported.",
};

export default function Error415Page() {
  return <UnifiedErrorPage code="415" />;
}

