import type { Metadata } from "next";
import TermsContent from "@/components/legal/terms-content";

export const metadata: Metadata = {
  title: "Terms and Conditions — VIXWA LABS",
  description:
    "Website terms and conditions governing access to and use of vixwa.com, operated by Vixwa Labs Private Limited.",
  openGraph: {
    title: "Terms and Conditions — VIXWA LABS",
    description:
      "Website terms and conditions governing access to and use of vixwa.com, operated by Vixwa Labs Private Limited.",
    siteName: "VIXWA LABS",
    type: "website",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}

