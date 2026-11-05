"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll, useScrollReveals } from "@/lib/anim";
import Cursor from "./cursor";
import Navbar from "./navbar-v2";
import Footer from "./footer-v2";
import type { ViewKey } from "./nav-config";
import HomePage from "./pages/home";
import InnovationPage from "./pages/innovation";
import IntellectualPropertyPage from "./pages/intellectual-property";
import IntelligencePage from "./pages/intelligence";
import RdPage from "./pages/rd";
import CapabilitiesPage from "./pages/capabilities";
import NewsPage from "./pages/news";
import CareersPage from "./pages/careers";
import ContactPage from "./pages/contact";
import VisionPage from "./pages/vision";
import VocalPage from "./pages/vocal";
import VitalPage from "./pages/vital";

const VIEWS: Record<ViewKey, React.ComponentType<{ onNavigate: (v: ViewKey) => void }>> = {
  home: HomePage,
  innovation: InnovationPage,
  "intellectual-property": IntellectualPropertyPage,
  intelligence: IntelligencePage,
  rd: RdPage,
  capabilities: CapabilitiesPage,
  news: NewsPage,
  careers: CareersPage,
  contact: ContactPage,
  vision: VisionPage,
  vocal: VocalPage,
  vital: VitalPage,
};

export default function AppShell() {
  // Read the initial view from the URL hash so refreshes preserve the page.
  const [view, setView] = useState<ViewKey>(() => {
    if (typeof window === "undefined") return "home";
    const hash = window.location.hash.replace("#/", "").replace("#", "");
    return (hash as ViewKey) in VIEWS ? (hash as ViewKey) : "home";
  });
  const [transitioning, setTransitioning] = useState(false);
  const main = useRef<HTMLElement>(null);

  useSmoothScroll();
  useScrollReveals();

  const navigate = (next: ViewKey) => {
    if (next === view) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Update the URL hash so refresh / back-forward preserves the view.
    if (typeof window !== "undefined") {
      const newHash = next === "home" ? "" : `#/${next}`;
      const newURL =
        window.location.pathname +
        window.location.search +
        (newHash ? `#${newHash.slice(1)}` : "");
      window.history.pushState(null, "", newURL);
    }
    setTransitioning(true);
    setTimeout(() => {
      setView(next);
      window.scrollTo({ top: 0, behavior: "auto" });
      setTransitioning(false);
    }, 350);
  };

  // Handle browser back / forward buttons.
  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash.replace("#/", "").replace("#", "");
      const next = (hash as ViewKey) in VIEWS ? (hash as ViewKey) : "home";
      if (next !== view) {
        setTransitioning(true);
        setTimeout(() => {
          setView(next);
          window.scrollTo({ top: 0, behavior: "auto" });
          setTransitioning(false);
        }, 200);
      }
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, [view]);

  // re-trigger scroll reveals on view change
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(t);
  }, [view]);

  const Current = VIEWS[view];

  return (
    <>
      <Cursor />
      <Navbar current={view} onNavigate={navigate} />
      <main
        ref={main}
        className={`transition-opacity duration-300 ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <Current onNavigate={navigate} />
      </main>
      <Footer onNavigate={navigate} />
    </>
  );
}
