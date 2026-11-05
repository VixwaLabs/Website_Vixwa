"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2, AlertCircle } from "lucide-react";
import { SectionLabel, SectionShell } from "../section-utils";
import Magnetic from "../magnetic";

type Status = "idle" | "loading" | "success" | "error";

export default function Collaboration() {
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      organization: String(fd.get("organization") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setMsg(data.message || "Thank you. We'll be in touch.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please try again.");
    }
  };

  return (
    <SectionShell id="contact" className="hairline-t relative overflow-hidden">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[140px] opacity-[0.08] bg-violet" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.06] bg-ice" />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left — invitation */}
        <div className="lg:col-span-5 flex flex-col">
          <div data-reveal>
            <SectionLabel index="06" label="Collaboration" />
          </div>
          <h2
            data-reveal
            className="mt-8 font-display font-medium text-fluid-display text-porcelain"
          >
            <span className="reveal-line block">
              <span className="block">Have a question</span>
            </span>
            <span className="reveal-line block">
              <span className="block font-serif-editorial italic text-gradient-vixwa">
                worth exploring?
              </span>
            </span>
          </h2>
          <p data-reveal className="mt-8 text-fluid-lead text-silver max-w-md">
            Let&rsquo;s connect, exchange ideas and explore what we can build
            together. Every meaningful collaboration begins with a conversation.
          </p>

          {/* contact details */}
          <div data-reveal className="mt-12 flex flex-col gap-5">
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-silver mb-1.5">
                Email
              </div>
              <a
                href="mailto:hello@vixwalabs.com"
                className="text-porcelain hover:text-ice transition-colors text-lg"
              >
                hello@vixwalabs.com
              </a>
            </div>
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-silver mb-1.5">
                Studio
              </div>
              <p className="text-porcelain text-lg">
                Remote / Distributed
              </p>
            </div>
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-silver mb-1.5">
                Response
              </div>
              <p className="text-porcelain text-lg">
                Typically within two business days
              </p>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-7">
          <div
            data-reveal
            className="relative glass-panel-strong rounded-3xl p-6 sm:p-10"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="grid place-items-center w-16 h-16 rounded-full bg-ice/15 text-ice mb-6 glow-ice">
                  <Check className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-porcelain mb-3">
                  Message received.
                </h3>
                <p className="text-silver max-w-sm">{msg}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-silver hover:text-porcelain transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                {/* honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] w-px h-px opacity-0"
                  aria-hidden
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="Name"
                    name="name"
                    placeholder="Your name"
                    error={fieldErrors.name}
                    required
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@domain.com"
                    error={fieldErrors.email}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="Organization"
                    name="organization"
                    placeholder="Optional"
                  />
                  <Field
                    label="Subject"
                    name="subject"
                    placeholder="What are you exploring?"
                    error={fieldErrors.subject}
                    required
                  />
                </div>
                <Field
                  label="Message"
                  name="message"
                  textarea
                  placeholder="Tell us what you're exploring, the question you're sitting with, or what you'd like to build together."
                  error={fieldErrors.message}
                  required
                />

                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    {msg}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                  <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-silver/60">
                    Protected against spam &middot; We never share your details.
                  </p>
                  <Magnetic as="div" strength={0.3}>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-porcelain text-obsidian font-semibold text-sm pl-6 pr-2 py-2 hover:bg-ice transition-colors duration-300 disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <>
                          Sending
                          <span className="grid place-items-center w-9 h-9 rounded-full bg-obsidian text-porcelain">
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </span>
                        </>
                      ) : (
                        <>
                          Start a conversation
                          <span className="grid place-items-center w-9 h-9 rounded-full bg-obsidian text-porcelain group-hover:rotate-45 transition-transform duration-300">
                            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                          </span>
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  textarea = false,
  required = false,
  error,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  error?: string;
}) {
  const base =
    "w-full bg-transparent border-b hairline-b focus:border-violet/60 transition-colors py-3 px-1 text-porcelain placeholder:text-silver/40 focus:outline-none focus:ring-0";
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-silver flex items-center gap-2">
        {label}
        {required && <span className="text-violet">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={base}
        />
      )}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
