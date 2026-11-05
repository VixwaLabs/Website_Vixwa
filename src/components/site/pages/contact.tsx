"use client";

import { useState } from "react";
import {
  PageHero,
  SectionShell,
  SectionLabel,
  EditorialBlock,
  CtaBand,
} from "../primitives";
import { Check, ArrowUpRight } from "lucide-react";
import type { ViewKey } from "../nav-config";

const ENQUIRY_CATEGORIES = [
  "Research dialogue",
  "Professional collaboration",
  "Business enquiry",
  "Media or general correspondence",
];

const fieldLabelClass =
  "font-mono-tech text-[10px] uppercase tracking-[0.25em] text-[#64748B] flex items-center gap-1.5 font-semibold";
const inputClass =
  "w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-colors py-2.5 px-3.5 text-[#101828] placeholder:text-[#94A3B8] focus:outline-none text-sm shadow-sm";

export default function ContactPage({
  onNavigate,
}: {
  onNavigate: (v: ViewKey) => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          organization: fd.get("organization"),
          subject: fd.get("subject") || fd.get("category"),
          message: fd.get("message"),
          company: "",
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const onNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email"), company: "" }),
      });
      const data = await res.json();
      if (res.ok && data.ok) setNewsletterStatus("success");
      else setNewsletterStatus("error");
    } catch {
      setNewsletterStatus("error");
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-[#1F2937]">
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Contact Us"
        title="Let's start"
        titleAccent="a conversation."
        lede="For professional enquiries, research dialogue, and responsible collaboration, connect with VIXWA LABS."
        accent="#4F46E5"
      />

      {/* ============ PROFESSIONAL ENQUIRIES ============ */}
      <SectionShell className="hairline-t">
        <EditorialBlock
          index="01"
          label="Professional Enquiries"
          title="Considered"
          titleAccent="professional enquiries."
          accent="#4F46E5"
          body={
            <div className="space-y-2.5 text-[#1F2937]">
              <p>
                VIXWA LABS welcomes considered professional enquiries that
                align with responsible research, intelligent systems, and
                future-oriented technology.
              </p>
              <p>
                For direct professional correspondence, email{" "}
                <a
                  href="mailto:labs@vixwa.com"
                  className="text-[#4F46E5] hover:text-[#4338CA] font-semibold transition-colors"
                >
                  labs@vixwa.com
                </a>
                .
              </p>
              <p>
                Please share only the information needed to assess your enquiry.
              </p>
            </div>
          }
        />
      </SectionShell>

      {/* ============ ENQUIRY CATEGORIES ============ */}
      <SectionShell className="hairline-t bg-white">
        <div className="mb-5 sm:mb-6">
          <div data-reveal>
            <SectionLabel index="02" label="Enquiry Categories" />
          </div>
          <h2
            data-reveal
            className="mt-2.5 font-display font-bold text-fluid-section text-[#101828] max-w-3xl tracking-tight"
          >
            <span className="reveal-line block">
              <span className="block">Categories</span>
            </span>
            <span className="reveal-line block">
              <span
                className="block font-serif-editorial italic text-[#4F46E5]"
              >
                of enquiry.
              </span>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {ENQUIRY_CATEGORIES.map((label) => (
            <div
              key={label}
              data-reveal
              className="p-4 sm:p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm text-center hover:border-[#4F46E5] transition-colors"
            >
              <p className="text-[#101828] font-medium text-xs sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ============ SEND AN ENQUIRY ============ */}
      <SectionShell className="hairline-t">
        <div className="mb-5 sm:mb-6">
          <div data-reveal>
            <SectionLabel index="03" label="Send an Enquiry" />
          </div>
          <h2
            data-reveal
            className="mt-2.5 font-display font-bold text-fluid-section text-[#101828] max-w-3xl tracking-tight"
          >
            <span className="reveal-line block">
              <span className="block">Send an</span>
            </span>
            <span className="reveal-line block">
              <span
                className="block font-serif-editorial italic text-[#4F46E5]"
              >
                enquiry.
              </span>
            </span>
          </h2>
        </div>

        {status === "success" ? (
          <div
            data-reveal
            className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 max-w-2xl text-center shadow-lg"
          >
            <div className="flex justify-center mb-4">
              <div className="grid place-items-center w-12 h-12 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20">
                <Check className="w-6 h-6 text-[#4F46E5]" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="font-display font-bold text-2xl text-[#101828]">
              Message received.
            </h3>
            <p className="mt-2 text-[#64748B] text-sm max-w-md mx-auto">
              Thank you for reaching out. We will review your enquiry and
              respond as appropriate.
            </p>
            <div className="mt-5">
              <button
                onClick={() => setStatus("idle")}
                className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-5 py-2 text-xs font-semibold text-[#4F46E5] hover:bg-[#4F46E5]/10 transition-colors"
              >
                Send another
              </button>
            </div>
          </div>
        ) : (
          <div
            data-reveal
            className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-8 max-w-2xl shadow-sm"
          >
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
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
                <div className="flex flex-col gap-1.5">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className={fieldLabelClass}>Organisation</label>
                  <input
                    name="organization"
                    type="text"
                    placeholder="Organisation (optional)"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={fieldLabelClass}>
                    Enquiry Category <span className="text-[#4F46E5]">*</span>
                  </label>
                  <select
                    required
                    name="category"
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="Research dialogue">Research dialogue</option>
                    <option value="Professional collaboration">
                      Professional collaboration
                    </option>
                    <option value="Business enquiry">Business enquiry</option>
                    <option value="Media or general correspondence">
                      Media or general correspondence
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={fieldLabelClass}>Subject</label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Subject of your enquiry"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={fieldLabelClass}>
                  Message <span className="text-[#4F46E5]">*</span>
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Share your enquiry"
                  className={inputClass}
                />
              </div>

              {status === "error" && (
                <p className="text-[#EF4444] text-xs font-medium">
                  Something went wrong. Please try again or email{" "}
                  <a
                    href="mailto:labs@vixwa.com"
                    className="text-[#4F46E5] hover:underline"
                  >
                    labs@vixwa.com
                  </a>
                  .
                </p>
              )}

              <div className="mt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#4F46E5] text-white font-semibold text-xs sm:text-sm pl-6 pr-2 py-2 hover:bg-[#4338CA] shadow-sm transition-all duration-200 disabled:opacity-60 cursor-pointer"
                >
                  {status === "loading" ? "Sending..." : "Send Enquiry"}
                  <span className="grid place-items-center w-7 h-7 rounded-full bg-white/20 text-white group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </SectionShell>

      {/* ============ STAY INFORMED (WHITE & NAVY UI) ============ */}
      <SectionShell className="hairline-t bg-[#F8FAFC]">
        <div
          data-reveal
          className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-6">
              <SectionLabel index="04" label="Stay Informed" />
              <h3 className="mt-2.5 font-display font-bold text-2xl sm:text-3xl text-[#101828] tracking-tight">
                Ideas{" "}
                <span className="font-serif-editorial italic text-[#4F46E5]">
                  worth following.
                </span>
              </h3>
              <p className="mt-1.5 text-sm sm:text-base text-[#64748B] leading-relaxed max-w-md">
                Receive occasional research perspectives and future-oriented
                updates from VIXWA LABS.
              </p>
            </div>

            <div className="lg:col-span-6">
              {newsletterStatus === "success" ? (
                <div className="flex items-center gap-3 p-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC]">
                  <div className="grid place-items-center w-8 h-8 rounded-full bg-[#4F46E5]/10 shrink-0">
                    <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[#101828] font-bold text-sm">
                      Subscribed
                    </p>
                    <p className="text-[#64748B] text-xs">
                      Thank you. We will be in touch occasionally.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-end"
                  onSubmit={onNewsletterSubmit}
                >
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className={fieldLabelClass}>Email Address</label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-colors py-2.5 px-3.5 text-[#101828] placeholder:text-[#94A3B8] focus:outline-none text-sm h-11 shadow-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#101828] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 hover:bg-[#1F2937] shadow-sm transition-all duration-200 whitespace-nowrap h-11 shrink-0 cursor-pointer"
                  >
                    {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </form>
              )}

              {newsletterStatus === "error" && (
                <p className="mt-2 text-[#EF4444] text-xs font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ============ CTA ============ */}
      <CtaBand
        title="Every meaningful collaboration"
        titleAccent="begins with a conversation."
        description="Connect with VIXWA LABS to begin a considered conversation."
        buttonLabel="Email Us"
        accent="#F59E0B"
        onClick={() => (window.location.href = "mailto:labs@vixwa.com")}
      />
    </div>
  );
}
