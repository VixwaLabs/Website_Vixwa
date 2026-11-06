import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "505 — HTTP Version Not Supported | VIXWA LABS",
  description: "HTTP version unsupported.",
};

export default function Error505Page() {
  return <UnifiedErrorPage code="505" />;
}

