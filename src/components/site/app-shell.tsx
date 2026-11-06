"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll, useScrollReveals } from "@/lib/anim";
import Cursor from "./cursor";
import Navbar from "./navbar-v2";
import Footer from "./footer-v2";
import { NAV_ITEMS, VIEW_PATHS, VIEW_ALIASES, type ViewKey } from "./nav-config";
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

interface AppShellProps {
  initialView?: ViewKey;
}

export default function AppShell({ initialView }: AppShellProps) {
  // Read the initial view: prioritize explicit route initialView, fallback to hash / path
  const [view, setView] = useState<ViewKey>(() => {
    if (initialView && initialView in VIEWS) return initialView;
    if (typeof window === "undefined") return "home";
    const rawHash = window.location.hash.replace("#/", "").replace("#", "").toLowerCase();
    if (rawHash && rawHash in VIEW_ALIASES) return VIEW_ALIASES[rawHash];
    const rawPath = window.location.pathname.replace(/^\//, "").toLowerCase();
    if (rawPath && rawPath in VIEW_ALIASES) return VIEW_ALIASES[rawPath];
    return "home";
  });
  const [transitioning, setTransitioning] = useState(false);
  const main = useRef<HTMLElement>(null);

  useSmoothScroll();
  useScrollReveals();

  // Sync view on client mount if URL contains a hash or clean path
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rawHash = window.location.hash.replace("#/", "").replace("#", "").toLowerCase();
    if (rawHash && rawHash in VIEW_ALIASES) {
      const resolved = VIEW_ALIASES[rawHash];
      if (resolved !== view) setView(resolved);
      return;
    }
    if (!initialView) {
      const rawPath = window.location.pathname.replace(/^\//, "").toLowerCase();
      if (rawPath && rawPath in VIEW_ALIASES) {
        const resolved = VIEW_ALIASES[rawPath];
        if (resolved !== view) setView(resolved);
      }
    }
  }, []);

  const navigate = (next: ViewKey) => {
    if (next === view) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Update the browser URL without full-page reload
    if (typeof window !== "undefined") {
      const targetPath = VIEW_PATHS[next] || "/";
      window.history.pushState({ view: next }, "", targetPath);
    }
    setTransitioning(true);
    setTimeout(() => {
      setView(next);
      window.scrollTo({ top: 0, behavior: "auto" });
      setTransitioning(false);
    }, 280);
  };

  // Handle browser back / forward buttons and hash changes
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      let targetView: ViewKey = "home";
      if (e.state && e.state.view && e.state.view in VIEWS) {
        targetView = e.state.view as ViewKey;
      } else {
        const path = window.location.pathname.replace(/^\//, "").toLowerCase();
        const hash = window.location.hash.replace("#/", "").replace("#", "").toLowerCase();
        if (path && path in VIEW_ALIASES) {
          targetView = VIEW_ALIASES[path];
        } else if (hash && hash in VIEW_ALIASES) {
          targetView = VIEW_ALIASES[hash];
        }
      }
      if (targetView !== view) {
        setTransitioning(true);
        setTimeout(() => {
          setView(targetView);
          window.scrollTo({ top: 0, behavior: "auto" });
          setTransitioning(false);
        }, 160);
      }
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, [view]);

  // Re-trigger and bind scroll reveals whenever view changes
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      const uninit = document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not([data-reveal-active])"
      );
      uninit.forEach((el) => {
        el.setAttribute("data-reveal-active", "true");
        gsap.fromTo(
          el,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, 120);
    return () => clearTimeout(t);
  }, [view]);

  const Current = VIEWS[view];

  return (
    <>
      <Cursor />
      <Navbar current={view} onNavigate={navigate} />
      <main
        ref={main}
        className={`transition-opacity duration-300 bg-background ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <Current onNavigate={navigate} />
      </main>
      <Footer onNavigate={navigate} />
    </>
  );
}
