"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
  Brain,
  Cog,
  GraduationCap,
  FileSearch,
  Rocket,
  Cpu,
} from "lucide-react";

const items = [
  { icon: Brain, label: "AI-Powered Tools" },
  { icon: Cog, label: "Engineering-First Systems" },
  { icon: GraduationCap, label: "Built for Students & Professionals" },
  { icon: FileSearch, label: "Smart Document Intelligence" },
  { icon: Rocket, label: "Future-Ready Ecosystem" },
  { icon: Cpu, label: "Precision-Engineered Software" },
];

export default function TrustStrip() {
  return (
    <section className="relative flex min-h-svh items-center py-14 md:py-nav-height lg:py-22 2xl:py-24">
      {/* Subtle top/bottom borders with glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border-medium/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border-medium/50 to-transparent" />
      
      <div className="mx-auto w-full max-w-330 px-6 sm:px-8 lg:px-14 xl:px-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-9 sm:grid-cols-3 sm:gap-10 xl:grid-cols-6 xl:gap-9 2xl:gap-10"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group flex min-h-34 flex-col items-center gap-4 rounded-2xl px-2 text-center xl:min-h-36"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-subtle/90 bg-surface-card/90 shadow-[0_2px_12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-300 group-hover:border-brand-blue/30 group-hover:shadow-[0_4px_20px_rgba(59,130,246,0.12),inset_0_1px_0_rgba(255,255,255,0.04)] xl:h-15 xl:w-15">
                <item.icon
                  size={24}
                  strokeWidth={1.75}
                  className="text-text-secondary group-hover:text-brand-blue-light transition-colors duration-300"
                />
              </div>
              <span className="max-w-44 text-[13px] font-medium leading-snug text-text-secondary/90 transition-colors duration-300 group-hover:text-text-primary xl:text-sm">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
