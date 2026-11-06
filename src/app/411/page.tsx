import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "411 — Length Required | VIXWA LABS",
  description: "Content length required.",
};

export default function Error411Page() {
  return <UnifiedErrorPage code="411" />;
}

