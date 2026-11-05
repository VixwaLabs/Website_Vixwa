"use client";

import {
  PageHero,
  SectionShell,
  SectionLabel,
  EditorialBlock,
  FeatureCard,
} from "../primitives";
import { ArrowUpRight } from "lucide-react";
import type { ViewKey } from "../nav-config";

const KEY_PRINCIPLES = [
  {
    index: "01",
    title: "Permitted Use",
    description:
      "Materials may be accessed for personal and informational purposes, provided that applicable rights and notices are respected.",
    accent: "#4F46E5",
  },
  {
    index: "02",
    title: "No Implied Rights",
    description:
      "Access to our website or materials does not grant any license, ownership, or other rights unless expressly authorized in writing.",
    accent: "#4F46E5",
  },
  {
    index: "03",
    title: "Third-Party Materials",
    description:
      "Third-party names, trademarks, content, and materials remain the property of their respective owners.",
    accent: "#4F46E5",
  },
];

export default function IntellectualPropertyPage({
  onNavigate,
}: {
  onNavigate: (v: ViewKey) => void;
}) {
  return (
    <div className="bg-[#F8FAFC] dark:bg-[#070A12] text-[#1F2937] dark:text-[#CBD5E1] transition-colors duration-300">
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Intellectual Property"
        title="Protecting ideas."
        titleAccent="Respecting innovation."
        lede="Guidance on the responsible use of VIXWA LABS materials, information, and intellectual property."
        accent="#4F46E5"
      />

      {/* ============ RESPECTING OUR WORK ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="01"
          label="Intellectual Property"
          title="Respecting"
          titleAccent="our work."
          accent="#4F46E5"
          body="Unless otherwise stated, the content, designs, research materials, visual assets, and other materials made available by VIXWA LABS PVT. LTD. are protected by applicable intellectual property laws. They may not be copied, reproduced, adapted, distributed, published, or used for commercial purposes without prior written permission."
        />
      </SectionShell>

      {/* ============ KEY PRINCIPLES ============ */}
      <SectionShell className="hairline-t bg-graphite/30">
        <div data-reveal className="mb-5 sm:mb-6">
          <SectionLabel index="02" label="Key Principles" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {KEY_PRINCIPLES.map((c) => (
            <FeatureCard
              key={c.index}
              index={c.index}
              title={c.title}
              description={c.description}
              accent={c.accent}
            />
          ))}
        </div>
      </SectionShell>

      {/* ============ CONFIDENTIAL INFORMATION ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="03"
          label="Confidential Information"
          title="Information shared"
          titleAccent="in confidence."
          accent="#4F46E5"
          body={
            <>
              <p className="mb-3">
                Any non-public information shared by VIXWA LABS PVT. LTD., including
                research discussions, technical concepts, documents,
                demonstrations, or communications, should be treated as
                confidential unless VIXWA LABS PVT. LTD. confirms otherwise in writing.
              </p>
              <p className="mb-3">
                You must not disclose, use, reverse engineer, or make such
                information available to others except as expressly authorized
                in writing.
              </p>
              <p className="mb-3">
                This notice does not create a license, assignment,
                partnership, or other transfer of rights.
              </p>
              <p>
                Responsible access begins with respect for ideas, information,
                and the people behind them.
              </p>
              <p className="mt-4 font-serif-editorial italic text-porcelain">
                &copy; 2026 VIXWA LABS PVT. LTD.
              </p>
            </>
          }
        />
      </SectionShell>

      {/* ============ ENQUIRIES ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="04"
          label="Enquiries"
          title="Need"
          titleAccent="permission?"
          accent="#4F46E5"
          body={
            <>
              <p className="mb-2">
                Contact VIXWA LABS to discuss authorized use, intellectual
                property matters, or confidentiality concerns.
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:labs@vixwa.com"
                  className="text-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                >
                  labs@vixwa.com
                </a>
              </p>
            </>
          }
        >
          <div data-reveal className="mt-5 sm:mt-6">
            <button
              onClick={() => onNavigate("contact")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#4F46E5] text-white font-semibold text-sm sm:text-base pl-6 pr-2 py-2 hover:bg-[#4338CA] shadow-sm transition-all duration-200"
            >
              Email VIXWA LABS
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white/20 text-white group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </span>
            </button>
          </div>
        </EditorialBlock>
      </SectionShell>
    </div>
  );
}
