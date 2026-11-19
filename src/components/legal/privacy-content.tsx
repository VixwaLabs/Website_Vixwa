"use client";

import Link from "next/link";
import { Shield, Lock, Eye, Database, Server, UserCheck, AlertTriangle, FileCheck, Mail } from "lucide-react";
import LegalPageShell from "./legal-page-shell";

export default function PrivacyContent() {
  const sections = [
    {
      number: "01",
      title: "Data Fiduciary & Privacy Architecture",
      content: (
        <div className="space-y-4">
          <p>
            <strong className="text-white">Vixwa Labs Private Limited</strong> (“Vixwa”, “we”, “us”, or “our”) is committed to protecting the privacy,
            confidentiality, and sovereignty of your personal data. This Privacy Policy describes how we collect, process, store, and safeguard personal
            information gathered through our public website (<strong className="text-white">vixwa.com</strong>) in full accordance with the{" "}
            <strong className="text-white">Digital Personal Data Protection Act, 2023 (“DPDP Act”)</strong> and the{" "}
            <strong className="text-white">Digital Personal Data Protection Rules, 2025 (“DPDP Rules”)</strong> of India.
          </p>
          <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] text-[13.5px]">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-cyan-400 font-semibold mb-1.5">
              <Shield className="w-3.5 h-3.5" />
              Data Fiduciary Information
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div><strong className="text-white">Entity:</strong> Vixwa Labs Private Limited</div>
              <div><strong className="text-white">Contact Email:</strong> labs@vixwa.com</div>
              <div><strong className="text-white">Registered Address:</strong> Gutthalu, Mandya 571403, Karnataka, India</div>
              <div><strong className="text-white">Governing Framework:</strong> DPDP Act, 2023 (India)</div>
            </div>
          </div>
          <p>
            Vixwa acts as the <strong className="text-white">Data Fiduciary</strong> for all personal data voluntarily submitted through our website
            forms or recorded during your visit.
          </p>
        </div>
      ),
    },
    {
      number: "02",
      title: "Information Collected & Collection Purpose",
      content: (
        <div className="space-y-4">
          <p>
            We collect only the minimum personal data strictly necessary to fulfill the specified, lawful purposes disclosed at the point of collection:
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 text-white font-semibold text-[14.5px] mb-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                1. Professional Contact &amp; Research Dialogue Form
              </div>
              <ul className="text-slate-300 text-[13.5px] space-y-1">
                <li><strong className="text-white">Data Collected:</strong> Full Name, Email Address, Organisation / Institution, Enquiry Category, Subject, and Message Body.</li>
                <li><strong className="text-white">Specific Purpose:</strong> To evaluate, respond to, and manage research collaboration proposals, business inquiries, scientific correspondence, and academic dialogues.</li>
                <li><strong className="text-white">Legal Basis:</strong> Explicit voluntary consent provided by the Data Principal upon submission.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 text-white font-semibold text-[14.5px] mb-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                2. Research Dispatches &amp; Intelligence Newsletter Form
              </div>
              <ul className="text-slate-300 text-[13.5px] space-y-1">
                <li><strong className="text-white">Data Collected:</strong> Email Address.</li>
                <li><strong className="text-white">Specific Purpose:</strong> To distribute periodic laboratory findings, technical publications, research updates, and organizational announcements.</li>
                <li><strong className="text-white">Opt-Out:</strong> Subscribers can revoke consent and unsubscribe at any time via a single-click link in dispatches or by emailing labs@vixwa.com.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 text-white font-semibold text-[14.5px] mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                3. Technical &amp; Diagnostic Records
              </div>
              <ul className="text-slate-300 text-[13.5px] space-y-1">
                <li><strong className="text-white">Data Recorded:</strong> Truncated IP addresses, browser agent headers, requested URI paths, referring headers, and standard edge gateway server logs.</li>
                <li><strong className="text-white">Specific Purpose:</strong> Essential security monitoring, DDoS mitigation, bug diagnostics, rate-limiting, and ensuring high-availability server performance.</li>
              </ul>
            </div>
          </div>
          <p className="text-[13px] text-slate-400">
            <strong className="text-slate-300">No Sensitive Personal Data:</strong> We do not request, process, or store financial account credentials, biometric templates, or national identity card numbers on the public website.
          </p>
        </div>
      ),
    },
    {
      number: "03",
      title: "Cookies & Tracking Technologies",
      content: (
        <div className="space-y-4">
          <p>
            Vixwa respects user privacy and enforces a minimal tracking policy:
          </p>
          <ul className="space-y-2">
            <li><strong className="text-white">Strictly Essential Cookies:</strong> We utilize temporary session storage and local storage solely to store client interface preferences (such as Dark/Light theme selection) and security tokens.</li>
            <li><strong className="text-white">No Third-Party Ad Networks:</strong> We do not employ third-party advertising pixels, cross-site trackers, behavioural ad retargeting tags, or data broker cookies.</li>
            <li><strong className="text-white">Browser Controls:</strong> You can configure your browser to reject all cookies or alert you when cookies are transmitted. Essential navigation functions remain accessible without cookies.</li>
          </ul>
        </div>
      ),
    },
    {
      number: "04",
      title: "Service Providers & Sub-Processors",
      content: (
        <div className="space-y-4">
          <p>
            To deliver an enterprise-grade, resilient web infrastructure, Vixwa engages vetted, security-certified sub-processors operating under strict data protection covenants:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13.5px]">
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="font-semibold text-white mb-1">Hosting &amp; Edge Delivery</div>
              <p className="text-slate-300 text-xs">Vercel Inc. — Global edge CDN network providing encrypted web serving, SSL termination, and DDoS filtering.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="font-semibold text-white mb-1">Database &amp; Storage Adapter</div>
              <p className="text-slate-300 text-xs">Supabase Inc. — Hardened PostgreSQL infrastructure with TLS 1.3 transit encryption and AES-256 at-rest storage for form inquiries.</p>
            </div>
          </div>
          <p>
            Vixwa does <strong className="text-white">not sell, rent, monetize, or trade</strong> your personal information to third parties under any circumstances.
          </p>
        </div>
      ),
    },
    {
      number: "05",
      title: "Data Retention & Storage Schedule",
      content: (
        <div className="space-y-4">
          <p>
            We retain personal information only for the duration required to achieve the designated purpose of collection, in compliance with applicable statutory limitation periods:
          </p>
          <ul className="space-y-2">
            <li><strong className="text-white">Inquiry Correspondence:</strong> Contact inquiries and communications are retained for the active dialogue duration and up to twenty-four (24) months thereafter to maintain research dialogue history, unless an earlier erasure request is submitted.</li>
            <li><strong className="text-white">Newsletter Subscriptions:</strong> Maintained until the subscriber initiates an opt-out or cancellation request, after which the email address is promptly purged.</li>
            <li><strong className="text-white">Edge Server Logs:</strong> Automated technical routing and security logs are automatically overwritten or purged within thirty (30) days.</li>
          </ul>
        </div>
      ),
    },
    {
      number: "06",
      title: "Security Measures & Encryption",
      content: (
        <div className="space-y-4">
          <p>
            We deploy technical, physical, and administrative safeguards designed to protect personal data against unauthorized access, loss, alteration, or disclosure:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="font-mono text-cyan-400 font-bold text-[14px] mb-1">TLS 1.3 / HTTPS</div>
              <div className="text-xs text-slate-300">Complete in-transit cryptographic protection across all routes</div>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="font-mono text-indigo-400 font-bold text-[14px] mb-1">AES-256 Storage</div>
              <div className="text-xs text-slate-300">Encrypted at-rest database storage for all form records</div>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="font-mono text-emerald-400 font-bold text-[14px] mb-1">RBAC Controls</div>
              <div className="text-xs text-slate-300">Strict least-privilege administrative access to databases</div>
            </div>
          </div>
          <p className="text-[13px] text-slate-400">
            In the unlikely event of a security breach involving personal data, Vixwa will notify affected Data Principals and the Data Protection Board of India in accordance with the timelines and procedures mandated by the DPDP Act.
          </p>
        </div>
      ),
    },
    {
      number: "07",
      title: "Your Rights as a Data Principal (DPDP Act, 2023)",
      content: (
        <div className="space-y-4">
          <p>
            Under the provisions of the Digital Personal Data Protection Act, 2023, you, as a Data Principal, possess specific statutory rights regarding your personal data:
          </p>
          <div className="space-y-2.5 text-[13.5px]">
            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <strong className="text-white">1. Right to Access:</strong> You have the right to request a summary of the personal data held about you and information regarding any third parties with whom it has been shared.
            </div>
            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <strong className="text-white">2. Right to Correction &amp; Erasure:</strong> You may request the correction of inaccurate data, completion of incomplete records, or permanent erasure of personal data that is no longer necessary for the original purpose.
            </div>
            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <strong className="text-white">3. Right to Withdraw Consent:</strong> You have the right to withdraw previously granted consent at any time. Withdrawal does not affect the lawfulness of processing carried out prior to the revocation.
            </div>
            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <strong className="text-white">4. Right to Nominate:</strong> You have the right to nominate another individual who shall exercise your rights in the event of death or incapacity.
            </div>
            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <strong className="text-white">5. Right to Grievance Redressal:</strong> You have the right to readily accessible grievance redressal mechanisms provided by Vixwa before escalating to regulatory authorities.
            </div>
          </div>
          <p>
            To exercise any of these rights, please submit a written request to <strong className="text-indigo-400">labs@vixwa.com</strong>. We will respond within thirty (30) business days.
          </p>
        </div>
      ),
    },
    {
      number: "08",
      title: "Children's Privacy Protection",
      content: (
        <div className="space-y-4">
          <p>
            Our Website and scientific materials are directed toward researchers, commercial partners, engineering professionals, and university scholars.
            We do not knowingly collect, process, or track the personal information of individuals under eighteen (18) years of age.
          </p>
          <p>
            If a parent, guardian, or educator becomes aware that a minor has submitted personal data through our website without appropriate consent, please
            contact us immediately at <strong className="text-white">labs@vixwa.com</strong>. We will promptly delete such information from our records.
          </p>
        </div>
      ),
    },
    {
      number: "09",
      title: "Internal Projects & Vixie CDS Boundary",
      content: (
        <div className="space-y-4">
          <p>
            <strong className="text-white">Vixie CDS</strong> (Cognitive Discovery System) and related intelligence modules referenced on this Website
            are internal, proprietary research projects of Vixwa Labs Private Limited.
          </p>
          <p>
            The public website does not provide interactive public user accounts, commercial payment processing, consumer software downloads, or public
            cloud service ingestion for Vixie CDS. Separate data processing covenants, security addenda, and enterprise terms apply to private pilot partner programs.
          </p>
        </div>
      ),
    },
    {
      number: "10",
      title: "Grievance Officer & Regulatory Inquiries",
      content: (
        <div className="space-y-4">
          <p>
            In compliance with Section 10 of the DPDP Act, 2023 and the DPDP Rules, 2025, any questions, concerns, or grievances regarding the processing of
            personal data may be directed to our designated Data Protection &amp; Grievance Redressal Officer:
          </p>
          <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-[13.5px] space-y-1 text-slate-300">
            <div><strong className="text-white">Designated Officer:</strong> Grievance Redressal Officer</div>
            <div><strong className="text-white">Entity:</strong> Vixwa Labs Private Limited</div>
            <div><strong className="text-white">Contact Email:</strong> labs@vixwa.com</div>
            <div><strong className="text-white">Registered Address:</strong> Gutthalu, Mandya 571403, Karnataka, India</div>
          </div>
          <p className="text-xs text-slate-400">
            If your grievance is not resolved to your satisfaction through our internal redressal channel, you have the right to lodge a formal complaint with
            the Data Protection Board of India in accordance with applicable rules.
          </p>
        </div>
      ),
    },
  ];

  return (
    <LegalPageShell
      pageTitle="Privacy Policy"
      pageSubtitle="How Vixwa Labs Private Limited collects, safeguards, and respects your personal data under the DPDP Act, 2023."
      heroIcon={<Shield className="w-7 h-7 text-cyan-400" />}
      effectiveDate="19 November 2026"
      accentColor="#00D2FF"
      otherPageTitle="View Terms & Conditions"
      otherPageHref="/terms-and-conditions"
      draftNotice="This Privacy Policy governs data processing on the public vixwa.com website in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and DPDP Rules, 2025 of India."
      sections={sections}
    />
  );
}
