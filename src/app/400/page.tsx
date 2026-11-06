import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "400 — Bad Request | VIXWA LABS",
  description: "The server could not understand the request due to invalid syntax or parameters.",
};

export default function Error400Page() {
  return <UnifiedErrorPage code="400" />;
}
