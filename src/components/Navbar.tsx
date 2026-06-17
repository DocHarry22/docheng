"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { SessionUser } from "@/lib/auth";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Features", href: "#features" },
  { label: "Vision", href: "#roadmap" },
];

export default function Navbar({ user }: { user?: SessionUser | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const scrollRafRef = useRef<number>(0);
  const hashScrollRafRef = useRef<number>(0);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
   const updateScrolled = () => {
     setScrolled(window.scrollY > 50);
     scrollRafRef.current = 0;
   };

   const handleScroll = () => {
     if (scrollRafRef.current) return;
     scrollRafRef.current = window.requestAnimationFrame(updateScrolled);
   };

   updateScrolled();
   window.addEventListener("scroll", handleScroll, { passive: true });
   return () => {
     window.removeEventListener("scroll", handleScroll);
     if (scrollRafRef.current) window.cancelAnimationFrame(scrollRafRef.current);
   };
  }, []);

  useEffect(() => {
   const scrollToHashTarget = () => {
     const hash = window.location.hash;
     if (!hash) return;

     let attempts = 0;
     const tryScroll = () => {
       const el = document.querySelector(hash);
       if (el) {
         (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
         return;
       }

       attempts += 1;
       if (attempts < 20) {
         hashScrollRafRef.current = window.requestAnimationFrame(tryScroll);
       }
     };

     hashScrollRafRef.current = window.requestAnimationFrame(tryScroll);
     return () => {
       if (hashScrollRafRef.current) {
         window.cancelAnimationFrame(hashScrollRafRef.current);
         hashScrollRafRef.current = 0;
       }
     };
   };

   let cleanupScroll = scrollToHashTarget();

   const handleHashChange = () => {
     cleanupScroll?.();
     cleanupScroll = scrollToHashTarget();
   };

   window.addEventListener("hashchange", handleHashChange);

   return () => {
     cleanupScroll?.();
     window.removeEventListener("hashchange", handleHashChange);
   };
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
   const sectionIds = navLinks.map((l) => l.href.slice(1));
   const sections = sectionIds
     .map((id) => document.getElementById(id))
     .filter((section): section is HTMLElement => Boolean(section));

   if (sections.length === 0) return;

   const observer = new IntersectionObserver((entries) => {
     const visibleEntries = entries.filter((entry) => entry.isIntersecting);
     if (visibleEntries.length === 0) return;

     visibleEntries.sort((left, right) => right.intersectionRatio - left.intersectionRatio);
     setActiveSection(`#${visibleEntries[0].target.id}`);
   }, { rootMargin: "-30% 0px -60% 0px", threshold: [0.2, 0.4, 0.6] });

   sections.forEach((section) => observer.observe(section));

   return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const el = document.querySelector(href);

      // If section is mounted, do smooth in-page scroll.
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // If section is not mounted yet (lazy-loaded), allow default hash navigation.
      setMobileOpen(false);
    },
    []
  );

  useEffect(() => {
    if (!mobileOpen) return;

    const overlay = mobileOverlayRef.current;
    if (!overlay) return;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = overlay!.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    // Focus the first focusable element when menu opens
    const timeout = setTimeout(() => {
      const first = overlay.querySelector<HTMLElement>(focusableSelector);
      first?.focus();
    }, 150);

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-surface-raised/88 backdrop-blur-xl border-b border-border-highlight/35 shadow-[0_10px_40px_rgba(2,4,16,0.55)]" 
            : "bg-surface-raised/72 backdrop-blur-lg border-b border-border-subtle/40"
        }`}
        role="banner"
      >
        <div className="mx-auto w-full max-w-310 h-nav-height px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Brand Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group rounded-xl pr-4 pl-2 py-2 min-h-13.5 border border-border-subtle/70 bg-surface-overlay/55 shadow-[0_0_0_1px_rgba(148,163,184,0.08),0_10px_26px_rgba(0,0,0,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            aria-label="DoCHEng - Home"
          >
            {/* Symbol - always visible */}
            <div className="relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/nav-logo-symbol.png"
                alt=""
                fill
                sizes="48px"
                className="object-contain drop-shadow-[0_0_14px_rgba(59,130,246,0.5)]"
                priority
              />
            </div>
            
            {/* Wordmark - desktop only */}
            <div className="hidden sm:flex flex-col justify-center min-h-11">
              <span className="text-xl font-extrabold tracking-tight leading-[1.06] drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                <span className="bg-linear-to-r from-cyan-300 to-brand-blue-light bg-clip-text text-transparent">
                  DoC
                </span>
                <span className="bg-linear-to-r from-amber-300 via-brand-orange-light to-amber-400 bg-clip-text text-transparent">
                  HE
                </span>
                <span className="bg-linear-to-r from-cyan-300 to-brand-blue-light bg-clip-text text-transparent">
                  ng
                </span>
              </span>
              <span className="mt-1 text-[10px] sm:text-[11px] text-text-secondary tracking-[0.16em] uppercase leading-[1.2] font-medium">
                Driven by Curiosity
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-semibold tracking-[0.01em] transition-all duration-200 relative group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue rounded py-1.5 ${
                  activeSection === link.href
                    ? "text-slate-100"
                    : "text-slate-300 hover:text-slate-100"
                }`}
                aria-current={activeSection === link.href ? "true" : undefined}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300 ${
                    activeSection === link.href
                      ? "w-full bg-linear-to-r from-brand-blue-light via-brand-blue to-brand-orange shadow-[0_0_8px_rgba(59,130,246,0.45)]"
                      : "w-0 bg-brand-blue/80 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-5 pl-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue rounded"
                >
                  Dashboard
                </Link>
                <form action="/auth/logout" method="post">
                  <button
                    type="submit"
                    className="relative inline-flex items-center justify-center p-px rounded-full overflow-hidden group transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-[0_0_0_1px_rgba(255,255,255,0.03)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_0_16px_rgba(59,130,246,0.28),0_0_20px_rgba(245,158,11,0.2)]"
                  >
                    <span className="absolute inset-0 bg-linear-to-r from-brand-blue/75 via-brand-silver/55 to-brand-orange/75" />
                    <span className="relative inline-flex items-center justify-center px-7 py-2.5 text-sm font-semibold text-slate-100 rounded-full bg-linear-to-b from-[#0c1327] to-[#070d1c]">
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-transparent via-white/12 to-transparent -translate-x-full group-hover:translate-x-full" style={{ transition: "transform 0.65s ease, opacity 0.3s ease" }} />
                      <span className="relative">Sign Out</span>
                    </span>
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue rounded"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="relative inline-flex items-center justify-center p-px rounded-full overflow-hidden group transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-[0_0_0_1px_rgba(255,255,255,0.03)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_0_16px_rgba(59,130,246,0.28),0_0_20px_rgba(245,158,11,0.2)]"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-brand-blue/75 via-brand-silver/55 to-brand-orange/75" />
                  <span className="relative inline-flex items-center justify-center px-7 py-2.5 text-sm font-semibold text-slate-100 rounded-full bg-linear-to-b from-[#0c1327] to-[#070d1c]">
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-transparent via-white/12 to-transparent -translate-x-full group-hover:translate-x-full" style={{ transition: "transform 0.65s ease, opacity 0.3s ease" }} />
                    <span className="relative">Create Account</span>
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-secondary hover:text-white transition-colors p-2.5 -mr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileOverlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-surface-base/98 backdrop-blur-2xl md:hidden"
          >
            <motion.nav
              id="mobile-nav"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col items-center justify-center h-full gap-7 px-8"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className={`text-2xl font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue rounded ${
                    activeSection === link.href
                      ? "text-brand-blue"
                      : "text-white hover:text-brand-blue"
                  }`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </motion.a>
              ))}
              {user ? (
                <>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link
                      href="/dashboard"
                      className="mt-6 inline-flex items-center justify-center p-px rounded-full bg-linear-to-r from-brand-blue/75 via-brand-silver/55 to-brand-orange/75 text-white shadow-[0_0_16px_rgba(59,130,246,0.22),0_0_20px_rgba(245,158,11,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <span className="px-10 py-3.5 rounded-full bg-linear-to-b from-[#0c1327] to-[#070d1c] font-semibold text-lg text-slate-100">
                        Open Dashboard
                      </span>
                    </Link>
                  </motion.div>
                  <motion.form
                    action="/auth/logout"
                    method="post"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45 }}
                  >
                    <button
                      type="submit"
                      className="text-lg font-semibold text-white/80 transition-colors hover:text-white"
                    >
                      Sign Out
                    </button>
                  </motion.form>
                </>
              ) : (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="/auth/register"
                    className="mt-6 inline-flex items-center justify-center p-px rounded-full bg-linear-to-r from-brand-blue/75 via-brand-silver/55 to-brand-orange/75 text-white shadow-[0_0_16px_rgba(59,130,246,0.22),0_0_20px_rgba(245,158,11,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span className="px-10 py-3.5 rounded-full bg-linear-to-b from-[#0c1327] to-[#070d1c] font-semibold text-lg text-slate-100">
                      Create Account
                    </span>
                  </Link>
                </motion.div>
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
