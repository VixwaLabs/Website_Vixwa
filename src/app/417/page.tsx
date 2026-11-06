import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "417 — Expectation Failed | VIXWA LABS",
  description: "Server cannot meet expectation.",
};

export default function Error417Page() {
  return <UnifiedErrorPage code="417" />;
}

