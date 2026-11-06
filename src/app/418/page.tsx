import type { Metadata } from "next";
import UnifiedErrorPage from "@/components/errors/unified-error-page";

export const metadata: Metadata = {
  title: "418 — I'm a Teapot | VIXWA LABS",
  description: "The server refuses the attempt to brew coffee with a teapot.",
};

export default function Error418Page() {
  return <UnifiedErrorPage code="418" />;
}
