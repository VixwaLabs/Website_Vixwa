"use client";

import { useEffect, useRef, useState } from "react";
import { useSmoothScroll, useScrollReveals } from "@/lib/anim";
import Cursor from "./cursor";
import Loader from "./loader";
import Navbar from "./navbar";
import Hero from "./hero";
import Introduction from "./sections/introduction";
import Research from "./sections/research";
import Innovation from "./sections/innovation";
import Philosophy from "./sections/philosophy";
import Insights from "./sections/insights";
import Collaboration from "./sections/collaboration";
import Footer from "./footer";

const SECTIONS = [
  { id: "about", label: "Intro" },
  { id: "research", label: "Research" },
  { id: "innovation", label: "Innovation" },
  { id: "philosophy", label: "Philosophy" },
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
];

function ScrollProgress() {
  const [p, setP] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);

      const mid = h.scrollTop + h.clientHeight * 0.4;
      let idx = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= mid) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* top progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-violet via-ice to-orchid"
        style={{ transform: `scaleX(${p / 100})` }}
        aria-hidden
      />
      {/* side section rail (desktop) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4">
        {SECTIONS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-3 justify-end group">
            <span
              className={`font-mono-tech text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                i === active
                  ? "text-porcelain opacity-100"
                  : "text-silver opacity-0 group-hover:opacity-60"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block h-px transition-all duration-300 ${
                i === active
                  ? "w-8 bg-porcelain"
                  : "w-4 bg-silver/40 group-hover:bg-silver"
              }`}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default function PageShell() {
  const [loaded, setLoaded] = useState(false);
  const main = useRef<HTMLDivElement>(null);

  useSmoothScroll();
  useScrollReveals();

  // lock scroll during loader
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loaded]);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main ref={main} className={loaded ? "" : "pointer-events-none"}>
        <Hero />
        <Introduction />
        <Research />
        <Innovation />
        <Philosophy />
        <Insights />
        <Collaboration />
        <Footer />
      </main>
    </>
  );
}
