import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "403 — Access Forbidden | VIXWA LABS",
  description: "You don't have permission to access this destination.",
};

export default function Error403Page() {
  return <UnifiedErrorPage code="403" />;
}
