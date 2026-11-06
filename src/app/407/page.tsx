import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "407 — Proxy Authentication Required | VIXWA LABS",
  description: "Proxy authentication required.",
};

export default function Error407Page() {
  return <UnifiedErrorPage code="407" />;
}
