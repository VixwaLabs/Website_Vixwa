import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "500 — Something Went Wrong | VIXWA LABS",
  description: "An unexpected internal error disrupted this request.",
};

export default function Error500Page() {
  return <UnifiedErrorPage code="500" />;
}
