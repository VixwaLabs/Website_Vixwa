import AppShell from "@/components/site/app-shell";

export const metadata = {
  title: "Vital Intelligence — VIXWA LABS",
  description: "Biomedical signal telemetry and physiological intelligence.",
};

export default function VitalPage() {
  return <AppShell initialView="vital" />;
}
