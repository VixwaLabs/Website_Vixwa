import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "451 — Unavailable For Legal Reasons | VIXWA LABS",
  description: "Resource blocked for legal reasons.",
};

export default function Error451Page() {
  return <UnifiedErrorPage code="451" />;
}
