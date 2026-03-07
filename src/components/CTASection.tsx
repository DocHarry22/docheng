"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import WaitlistForm from "./WaitlistForm";

export default function CTASection() {
  return (
    <section id="cta" className="relative pb-nav-height pt-28 md:pb-20 md:pt-36 lg:pb-24 lg:pt-44">
      {/* Subtle ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 h-100 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/3 blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-310 px-6 sm:px-8 lg:px-16 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-xl text-center"
        >
          {/* Clear, direct headline */}
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5"
          >
            Get Early Access
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-text-secondary text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10"
          >
            Join the waitlist for priority access to DoCHEng products and exclusive development updates.
          </motion.p>

          {/* Waitlist Form */}
          <motion.div variants={fadeInUp}>
            <WaitlistForm showInterests />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
