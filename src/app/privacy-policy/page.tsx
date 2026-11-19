import type { Metadata } from "next";
import PrivacyContent from "@/components/legal/privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy — VIXWA LABS",
  description:
    "Privacy policy describing how Vixwa Labs Private Limited handles personal data collected through vixwa.com.",
  openGraph: {
    title: "Privacy Policy — VIXWA LABS",
    description:
      "Privacy policy describing how Vixwa Labs Private Limited handles personal data collected through vixwa.com.",
    siteName: "VIXWA LABS",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}

