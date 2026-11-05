"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { scrollToId } from "@/lib/anim";

const FOOTER_NAV = [
  {
    title: "Explore",
    links: [
      { label: "About", id: "about" },
      { label: "Research", id: "research" },
      { label: "Innovation", id: "innovation" },
      { label: "Insights", id: "insights" },
    ],
  },
  {
    title: "Domains",
    links: [
      { label: "Intelligent Systems", id: "research" },
      { label: "Data & Discovery", id: "research" },
      { label: "Emerging Technologies", id: "research" },
      { label: "Applied Research", id: "research" },
    ],
  },
];

export default function Footer() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [email, setEmail] = useState("");

  const subscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: "" }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("done");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="relative bg-obsidian hairline-t overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[120px] opacity-[0.05] bg-violet" />

      {/* giant brand wordmark */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-20 sm:pt-28">
        <div
          data-reveal
          className="font-display font-medium text-porcelain leading-none tracking-tighter select-none"
          style={{ fontSize: "clamp(4rem, 18vw, 16rem)" }}
          aria-hidden
        >
          VIXWA
        </div>
      </div>

      {/* main grid */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* brand + newsletter */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="grid grid-cols-2 gap-[2px]">
                <span className="w-1.5 h-1.5 bg-violet rounded-full" />
                <span className="w-1.5 h-1.5 bg-ice rounded-full" />
                <span className="w-1.5 h-1.5 bg-orchid rounded-full" />
                <span className="w-1.5 h-1.5 bg-porcelain rounded-full" />
              </span>
              <span className="font-display font-semibold tracking-tight text-porcelain text-base">
                VIXWA<span className="text-silver font-normal"> LABS</span>
              </span>
            </div>

            <p className="text-silver max-w-sm leading-relaxed mb-8">
              A research and innovation lab exploring ideas, advancing knowledge
              and developing thoughtful solutions to complex challenges.
            </p>

            {/* newsletter */}
            <div className="max-w-sm">
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-silver mb-3">
                Notes from the edge &mdash; occasionally
              </div>
              {status === "done" ? (
                <div className="flex items-center gap-2 text-ice">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">
                    You&rsquo;re on the list. Welcome.
                  </span>
                </div>
              ) : (
                <form onSubmit={subscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    required
                    className="flex-1 min-w-0 bg-transparent hairline-b focus:border-violet/60 transition-colors py-2.5 text-porcelain placeholder:text-silver/40 focus:outline-none text-sm"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="grid place-items-center w-10 h-10 rounded-full bg-porcelain text-obsidian hover:bg-ice transition-colors shrink-0 disabled:opacity-60"
                    aria-label="Subscribe"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                    )}
                  </button>
                </form>
              )}
              {status === "error" && (
                <p className="text-xs text-red-400 mt-2">
                  Please try a valid email.
                </p>
              )}
            </div>
          </div>

          {/* nav columns */}
          {FOOTER_NAV.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-silver mb-5">
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => scrollToId(l.id)}
                      className="text-porcelain/80 hover:text-porcelain transition-colors text-sm"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* connect */}
          <div className="lg:col-span-3">
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-silver mb-5">
              Connect
            </div>
            <ul className="flex flex-col gap-3">
              {[
                { label: "hello@vixwalabs.com", href: "mailto:hello@vixwalabs.com" },
                { label: "LinkedIn", href: "#" },
                { label: "X / Twitter", href: "#" },
                { label: "Research Gate", href: "#" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-1.5 text-porcelain/80 hover:text-porcelain transition-colors text-sm"
                  >
                    {s.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 pt-8 hairline-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-silver/70">
            &copy; {new Date().getFullYear()} VIXWA LABS PVT. LTD. &middot; All rights reserved
          </div>
          <div className="flex items-center gap-6 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-silver/70">
            <a href="#" className="hover:text-porcelain transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-porcelain transition-colors">
              Terms
            </a>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ice pulse-dot" />
              All systems exploring
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
