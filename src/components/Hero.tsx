"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, fadeOnly } from "@/lib/animations";
import { ChevronDown, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const OrbitScene = dynamic(() => import("./OrbitScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* CSS fallback - centered orbital */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 opacity-40">
        <div className="absolute inset-0 rounded-full border border-brand-blue/20 animate-orbit" />
        <div className="absolute inset-10 rounded-full border border-brand-blue/15 animate-orbit-reverse" />
        <div className="absolute inset-20 rounded-full border border-brand-orange/10 animate-orbit-slow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-brand-blue/60 shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
        </div>
      </div>
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden">
      {/* ========== LAYER 1: Base background ========== */}
      <div className="absolute inset-0 bg-surface-base" />
      
      {/* ========== LAYER 2: Ambient glow behind centerpiece ========== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-150 h-150 md:w-200 md:h-200 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,rgba(59,130,246,0.04)_40%,transparent_70%)]" />
      </div>
      
      {/* ========== LAYER 3: 3D Canvas / Centerpiece ========== */}
      <div className="absolute inset-0 opacity-65 md:opacity-70 pointer-events-none">
        <OrbitScene />
      </div>
      
      {/* ========== LAYER 4: Subtle grid overlay ========== */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none" />

      {/* ========== LAYER 5: Hero content ========== */}
      <div className="relative z-10 min-h-svh flex items-center justify-center">
        <div className="w-full px-6 sm:px-8 py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            {/* Status badge - more visible */}
            <motion.div variants={fadeOnly} className="mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/8 border border-white/12 text-[12px] font-medium text-white/80 tracking-wide backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                Building the future of practical intelligence
              </span>
            </motion.div>

            {/* Primary headline */}
            <motion.h1 variants={fadeInUp} className="mb-6 md:mb-8">
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-[-0.03em] leading-[0.9] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                DoCHEng
              </span>
            </motion.h1>

            {/* Value proposition - with text shadow for readability */}
            <motion.p
              variants={fadeInUp}
              className="mb-5 md:mb-6 max-w-lg text-xl sm:text-2xl md:text-[1.7rem] text-white/90 leading-relaxed font-light drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]"
            >
              The intelligence ecosystem for{" "}
              <span className="text-white font-medium">learning, work, and technical growth</span>.
            </motion.p>

            {/* Supporting description - better contrast */}
            <motion.p
              variants={fadeInUp}
              className="mb-12 md:mb-14 max-w-md text-[15px] md:text-base text-white/60 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            >
              AI-powered tools for documentation, learning, research, and technical growth - unified in one connected ecosystem.
            </motion.p>

            {/* CTA row - stronger buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
            >
              {/* Primary CTA - stronger presence */}
              <a
                href="#products"
                className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto min-w-55 px-9 py-4.5 bg-white text-[#0a0a12] rounded-xl font-semibold text-[15px] transition-all duration-300 hover:bg-white/95 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
              >
                <span>Explore Products</span>
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
              
              {/* Secondary CTA - more visible */}
              <a
                href="#cta"
                className="inline-flex items-center justify-center w-full sm:w-auto min-w-45 px-8 py-4.5 rounded-xl font-semibold text-[15px] text-white border-2 border-white/25 hover:border-white/50 hover:bg-white/8 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue backdrop-blur-sm"
              >
                Join Waitlist
              </a>
            </motion.div>

            {/* Trust signal - subtle but readable */}
            <motion.p
              variants={fadeOnly}
              className="mt-16 md:mt-20 text-[11px] text-white/40 tracking-[0.2em] uppercase font-medium"
            >
              Driven by Curiosity · Built for Real Work
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-text-muted/40" />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-surface-base to-transparent z-5 pointer-events-none" />
    </section>
  );
}
