"use client";

import Link from "next/link";
import { FileText, ShieldCheck, Scale, AlertCircle, ArrowUpRight, Lock, CheckCircle2 } from "lucide-react";
import LegalPageShell from "./legal-page-shell";

export default function TermsContent() {
  const sections = [
    {
      number: "01",
      title: "About These Terms & Entity Identity",
      content: (
        <div className="space-y-4">
          <p>
            These Terms and Conditions (“Terms”) govern access to and use of the public website accessible at{" "}
            <strong className="text-white">vixwa.com</strong> and all associated public sub-pages (collectively, the “Website”),
            operated by <strong className="text-white">Vixwa Labs Private Limited</strong> (“Vixwa”, “we”, “our”, or “us”), a company
            incorporated under the laws of India, having its registered office at Gutthalu, Mandya 571403, Karnataka, India.
          </p>
          <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.04] text-[13.5px]">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-indigo-400 font-semibold mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Entity &amp; Contact Identification
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div><strong className="text-white">Entity:</strong> Vixwa Labs Private Limited</div>
              <div><strong className="text-white">Contact Email:</strong> labs@vixwa.com</div>
              <div><strong className="text-white">Registered Address:</strong> Gutthalu, Mandya 571403, Karnataka, India</div>
              <div><strong className="text-white">Operational Scope:</strong> Informational Public Website</div>
            </div>
          </div>
          <p>
            By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms to
            the fullest extent permitted by applicable law. If you do not agree with any part of these Terms, you must immediately discontinue
            access to and use of the Website.
          </p>
          <p>
            These Terms apply strictly to the public informational website. They do not establish an employment, investor, partnership, agency,
            or commercial customer relationship. Any proprietary software, enterprise consulting, research partnership, customer subscription,
            or bespoke lab engagement is governed by distinct, individually executed agreements.
          </p>
        </div>
      ),
    },
    {
      number: "02",
      title: "Permitted Use & User Obligations",
      content: (
        <div className="space-y-4">
          <p>
            You are granted a non-exclusive, non-transferable, revocable, and limited right to access and view the Website strictly for
            personal, non-commercial, and informational evaluation. When interacting with the Website, you represent and warrant that you will:
          </p>
          <ul className="space-y-2">
            <li>Comply with all applicable local, national, and international laws, regulations, and industry standards;</li>
            <li>Refrain from reverse-engineering, decompiling, or attempting to discover the source code of any aspect of the Website;</li>
            <li>Refrain from deploying automated scrapers, crawlers, spiders, or data mining software at scale without prior written consent from Vixwa;</li>
            <li>Not interfere with, disrupt, or place an unreasonable load on the hosting infrastructure, API endpoints, or edge distribution networks;</li>
            <li>Not introduce or transmit viruses, worms, malware, ransomware, or any code designed to compromise website integrity;</li>
            <li>Not harvest, collect, or store personal information or contact details of other users or lab personnel.</li>
          </ul>
          <p>
            Vixwa reserves the right to restrict, suspend, or terminate access to any IP address or network that violates these behavioral standards,
            without prior notice.
          </p>
        </div>
      ),
    },
    {
      number: "03",
      title: "Intellectual Property Rights & Vixie CDS",
      content: (
        <div className="space-y-4">
          <p>
            All text, research papers, visual designs, source code, interactive interfaces, brand emblems, marks, graphics, diagrams, and typography
            displayed on this Website are the exclusive intellectual property of <strong className="text-white">Vixwa Labs Private Limited</strong> or
            its licensors, protected by Indian and international copyright, patent, trademark, and trade secret laws.
          </p>
          <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] text-[13.5px]">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-cyan-400 font-semibold mb-1.5">
              <Lock className="w-3.5 h-3.5" />
              Special Notice Concerning Vixie CDS &amp; Research Assets
            </div>
            <p className="text-slate-300">
              <strong className="text-white">Vixie CDS</strong> (Cognitive Discovery System) and related intelligence modules referenced on this Website
              are internal company technological architectures and intellectual property development projects. References to Vixie CDS, research frameworks,
              or algorithmic prototypes are for informational disclosure only and do not constitute an offer, license, public API access, or grant of rights
              to utilize the underlying systems.
            </p>
          </div>
          <p>
            No license, title, or ownership right is transferred to you through your visit. You may not reproduce, adapt, republish, distribute, sell,
            or create derivative works from Website assets without explicit prior written authorization from Vixwa Labs Private Limited.
          </p>
        </div>
      ),
    },
    {
      number: "04",
      title: "Nature of Information & Disclaimer",
      content: (
        <div className="space-y-4">
          <p>
            Website content is published solely for general informational and conceptual exploration. While we strive to maintain accurate, up-to-date
            technical and scientific descriptions, Vixwa makes no express or implied representations or warranties regarding the completeness, timeliness,
            or absolute accuracy of the published material.
          </p>
          <p>
            <strong className="text-white">No Professional or Investment Advice:</strong> Content on this Website must not be construed as legal, financial,
            tax, medical, investment, or technical advice. Nothing on this Website constitutes an offer to sell, a solicitation of an offer to purchase, or an
            invitation to subscribe to securities, equities, or financial instruments of Vixwa Labs Private Limited or any affiliate.
          </p>
          <p>
            Decisions made on the basis of material found on this Website are taken at your sole discretion and risk.
          </p>
        </div>
      ),
    },
    {
      number: "05",
      title: "Third-Party Links & External Services",
      content: (
        <div className="space-y-4">
          <p>
            The Website may contain links or redirects to third-party domains, academic repositories, or industry resources. These links are provided solely
            for research reference and convenience.
          </p>
          <p>
            Vixwa Labs Private Limited exercises no control over the content, availability, privacy standards, or security practices of external websites.
            Inclusion of an external link does not imply endorsement, affiliation, or sponsorship. We encourage users to inspect the terms and privacy
            declarations of any external site they visit.
          </p>
        </div>
      ),
    },
    {
      number: "06",
      title: "Availability, Warranties & Limitation of Liability",
      content: (
        <div className="space-y-4">
          <p>
            The Website is provided on an <strong className="text-white">“AS IS”</strong> and <strong className="text-white">“AS AVAILABLE”</strong> basis,
            without warranties of any kind, whether express, statutory, or implied, including but not limited to implied warranties of merchantability,
            fitness for a particular purpose, non-infringement, or uninterrupted operation.
          </p>
          <p>
            We may upgrade, suspend, alter, or discontinue any portion or feature of the Website at any time for scheduled maintenance, security hardening,
            or business reasons, without liability.
          </p>
          <p>
            To the maximum extent permitted by applicable law, in no event shall Vixwa Labs Private Limited, its directors, officers, employees, partners,
            or agents be liable for any indirect, incidental, consequential, special, punitive, or exemplary damages (including loss of data, revenue, profits,
            goodwill, or business interruption) arising out of or in connection with your access to or inability to access the informational Website.
          </p>
        </div>
      ),
    },
    {
      number: "07",
      title: "Privacy & Data Protection",
      content: (
        <div className="space-y-4">
          <p>
            Our collection, transmission, and processing of personal data (such as information submitted through research enquiry or newsletter forms) is
            strictly governed by our comprehensive <Link href="/privacy-policy" className="text-indigo-400 font-semibold hover:underline">Privacy Policy</Link>,
            which is incorporated into these Terms by reference.
          </p>
          <p>
            We encourage you to review the Privacy Policy to understand our commitment to the Digital Personal Data Protection Act, 2023 (DPDP Act) and your
            associated data principal rights.
          </p>
        </div>
      ),
    },
    {
      number: "08",
      title: "Governing Law & Dispute Resolution",
      content: (
        <div className="space-y-4">
          <p>
            These Terms, their interpretation, and any claim or dispute arising out of or relating to your use of the Website shall be governed by and
            construed exclusively in accordance with the substantive laws of the <strong className="text-white">Republic of India</strong>, without giving effect to any
            principles of conflict of laws.
          </p>
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] text-[13.5px]">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold mb-1.5">
              <Scale className="w-3.5 h-3.5" />
              Territorial Jurisdiction
            </div>
            <p className="text-slate-300">
              Subject to mandatory statutory provisions, the competent courts situated in <strong className="text-white">Karnataka, India</strong> shall
              have jurisdiction over any proceeding, suit, action, or litigation arising out of or concerning these Terms or the Website.
            </p>
          </div>
        </div>
      ),
    },
    {
      number: "09",
      title: "Revisions & Amendments",
      content: (
        <div className="space-y-4">
          <p>
            We reserve the right to revise or replace these Terms periodically to reflect evolving legal frameworks, technological enhancements, or organizational
            changes. The revised Terms will be posted on this page with an updated “Effective Date”.
          </p>
          <p>
            Material modifications will be noted prominently on the Website. Your continued use of the Website after the publication of revised Terms
            constitutes your affirmative acceptance of the revised terms.
          </p>
        </div>
      ),
    },
    {
      number: "10",
      title: "Contact & Legal Inquiries",
      content: (
        <div className="space-y-4">
          <p>
            For questions, legal notices, or formal clarifications regarding these Terms and Conditions, please contact our administrative office:
          </p>
          <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-[13.5px] space-y-1 text-slate-300">
            <div><strong className="text-white">Entity:</strong> Vixwa Labs Private Limited</div>
            <div><strong className="text-white">Contact Email:</strong> labs@vixwa.com</div>
            <div><strong className="text-white">Registered Address:</strong> Gutthalu, Mandya 571403, Karnataka, India</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <LegalPageShell
      pageTitle="Terms & Conditions"
      pageSubtitle="Terms governing access to and use of vixwa.com and associated digital research materials."
      heroIcon={<FileText className="w-7 h-7 text-white" />}
      effectiveDate="19 November 2026"
      accentColor="#FFFFFF"
      spokeTheme="black-white"
      otherPageTitle="View Privacy Policy"
      otherPageHref="/privacy-policy"
      draftNotice="This document establishes the binding terms governing public access to the Vixwa Labs informational website. Additional terms apply to proprietary platforms, pilot customer deployments, and research collaborations."
      sections={sections}
    />
  );
}
