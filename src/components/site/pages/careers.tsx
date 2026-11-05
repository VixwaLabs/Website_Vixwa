"use client";

import {
  PageHero,
  SectionShell,
  SectionLabel,
  EditorialBlock,
  FeatureCard,
} from "../primitives";
import { ArrowUpRight } from "lucide-react";
import ArtImage from "../art-image";
import type { ViewKey } from "../nav-config";

const QUALITIES = [
  {
    index: "01",
    title: "Curiosity",
    description:
      "Ask thoughtful questions and remain open to what evidence reveals.",
    accent: "#4F46E5",
  },
  {
    index: "02",
    title: "Rigor",
    description:
      "Bring discipline, clarity, and care to complex work.",
    accent: "#4F46E5",
  },
  {
    index: "03",
    title: "Collaboration",
    description:
      "Connect perspectives across research, engineering, and design.",
    accent: "#4F46E5",
  },
  {
    index: "04",
    title: "Responsibility",
    description:
      "Consider both possibility and responsibility in every contribution.",
    accent: "#4F46E5",
  },
];

const fieldLabelClass = "font-mono-tech text-[10px] uppercase tracking-[0.25em] text-[#64748B] flex items-center gap-2 font-semibold";
const inputClass = "w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors py-3 px-3.5 text-[#101828] placeholder:text-[#94A3B8] focus:outline-none";

export default function CareersPage({
  onNavigate,
}: {
  onNavigate: (v: ViewKey) => void;
}) {
  return (
    <div>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Careers"
        title="Future work,"
        titleAccent="thoughtfully pursued."
        lede="For researchers, engineers, designers, and multidisciplinary thinkers drawn to rigorous, responsible inquiry."
        accent="#4F46E5"
      />

      {/* ============ HERO IMAGE BAND ============ */}
      <div className="relative w-full px-5 sm:px-8 lg:px-16 pb-8 sm:pb-10">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden hairline">
            <ArtImage src="/images/careers-hero.png" alt="Future work at VIXWA LABS" fill tone="orchid" sizes="(max-width: 1024px) 100vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] mb-2 block">Opportunity</span>
              <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#FFFFFF] max-w-md">Inquiry across disciplines.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ INVITATION ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="01"
          label="An Invitation"
          title="Inquiry across"
          titleAccent="disciplines."
          accent="#4F46E5"
          body={
            <>
              <p className="mb-2">
                VIXWA LABS welcomes thoughtful practitioners who bring rigor,
                imagination, and care to complex questions.
              </p>
              <p>
                We value clear thinking, responsible research, and the exchange
                of perspectives across disciplines.
              </p>
            </>
          }
        />
      </SectionShell>

      {/* ============ WHO WE WELCOME ============ */}
      <SectionShell className="hairline-t bg-graphite/30">
        <div className="mb-5 sm:mb-6">
          <div data-reveal>
            <SectionLabel index="02" label="Who We Welcome" />
          </div>
          <h2
            data-reveal
            className="mt-2.5 sm:mt-3 font-display font-medium text-fluid-section text-porcelain max-w-3xl"
          >
            <span className="reveal-line block">
              <span className="block">Qualities</span>
            </span>
            <span className="reveal-line block">
              <span
                className="block font-serif-editorial italic"
                style={{ color: "#4F46E5" }}
              >
                that matter.
              </span>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUALITIES.map((c) => (
            <FeatureCard
              key={c.index}
              index={c.index}
              title={c.title}
              description={c.description}
              accent={c.accent}
            />
          ))}
        </div>

        {/* Environmental Photo Showcase */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            data-reveal
            className="group relative rounded-2xl overflow-hidden hairline aspect-[16/10] bg-graphite/40"
          >
            <ArtImage
              src="/images/careers-lab.jpg"
              alt="VIXWA LABS Advanced Engineering Environment"
              fill
              tone="ice"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#4F46E5] mb-1.5 block">
                Research Environment
              </span>
              <p className="font-display font-semibold text-lg sm:text-xl text-[#FFFFFF]">
                Frontier computational testbeds & holographic telemetry
              </p>
            </div>
          </div>

          <div
            data-reveal
            className="group relative rounded-2xl overflow-hidden hairline aspect-[16/10] bg-graphite/40"
          >
            <ArtImage
              src="/images/careers-culture.jpg"
              alt="Multidisciplinary Collaboration at VIXWA LABS"
              fill
              tone="violet"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#4F46E5] mb-1.5 block">
                Multidisciplinary Culture
              </span>
              <p className="font-display font-semibold text-lg sm:text-xl text-[#FFFFFF]">
                Bridging theoretical inquiry with physical engineering
              </p>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ============ OPPORTUNITIES ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="03"
          label="Opportunities"
          title="Future"
          titleAccent="opportunities."
          accent="#4F46E5"
          body={
            <>
              <p className="mb-2">
                We do not list unconfirmed roles. If your experience and
                interests align with responsible research, intelligent systems,
                or future-oriented technology, we welcome a professional
                enquiry for future consideration.
              </p>
              <p>
                Please share a concise introduction, your area of interest, and
                relevant experience. We will review enquiries as appropriate.
              </p>
            </>
          }
        />
      </SectionShell>

      {/* ============ ENQUIRY FORM ============ */}
      <SectionShell className="hairline-t">
        <div className="mb-5 sm:mb-6">
          <div data-reveal>
            <SectionLabel index="04" label="Enquiry Form" />
          </div>
          <h2
            data-reveal
            className="mt-2.5 sm:mt-3 font-display font-medium text-fluid-section text-porcelain max-w-3xl"
          >
            <span className="reveal-line block">
              <span className="block">Send an</span>
            </span>
            <span className="reveal-line block">
              <span
                className="block font-serif-editorial italic"
                style={{ color: "#4F46E5" }}
              >
                enquiry.
              </span>
            </span>
          </h2>
        </div>
        <div
          data-reveal
          className="glass-panel-strong rounded-3xl p-6 sm:p-10 max-w-2xl"
        >
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              onNavigate("contact");
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className={fieldLabelClass}>
                  Full Name <span className="text-[#4F46E5]">*</span>
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={fieldLabelClass}>
                  Email Address <span className="text-[#4F46E5]">*</span>
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={fieldLabelClass}>
                Area of Interest <span className="text-[#4F46E5]">*</span>
              </label>
              <select required name="area" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select an area
                </option>
                <option value="Research">Research</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Multidisciplinary">Multidisciplinary</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className={fieldLabelClass}>
                Relevant Experience <span className="text-[#4F46E5]">*</span>
              </label>
              <textarea
                required
                name="experience"
                rows={4}
                placeholder="Briefly describe your relevant experience"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={fieldLabelClass}>
                Portfolio or LinkedIn URL{" "}
                <span className="text-silver/60">(Optional)</span>
              </label>
              <input
                name="portfolio"
                type="url"
                placeholder="https://"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={fieldLabelClass}>
                Message <span className="text-[#4F46E5]">*</span>
              </label>
              <textarea
                required
                name="message"
                rows={5}
                placeholder="Share a concise introduction"
                className={inputClass}
              />
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#4F46E5] text-white font-semibold text-sm pl-6 pr-2 py-2 hover:bg-[#4338CA] shadow-sm transition-all duration-200"
              >
                Send Enquiry
                <span className="grid place-items-center w-9 h-9 rounded-full bg-white/20 text-white group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </form>
        </div>
      </SectionShell>
    </div>
  );
}
