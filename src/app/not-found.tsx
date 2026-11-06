import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "404 — Page Not Found | VIXWA LABS",
  description: "This page wandered beyond what exists. Let's return to the latest research and intelligence.",
};

export default function NotFound() {
  return <UnifiedErrorPage code="404" />;
}
