"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type SectionHeaderVariant = "default" | "compact" | "hero-adjacent";

interface SectionHeaderProps {
  label: string;
  labelColor?: string;
  title: string;
  description: string;
  id?: string;
  variant?: SectionHeaderVariant;
}

const variantStyles: Record<SectionHeaderVariant, {
  container: string;
  label: string;
  title: string;
  description: string;
}> = {
  default: {
    container: "text-center mb-14 md:mb-18 lg:mb-20",
    label: "text-sm font-semibold tracking-[0.15em] uppercase mb-4",
    title: "text-subtitle tracking-tight mb-5",
    description: "text-body-lg text-text-secondary leading-relaxed max-w-2xl mx-auto",
  },
  compact: {
    container: "text-center mb-10 md:mb-12",
    label: "text-meta font-semibold tracking-[0.15em] uppercase mb-3",
    title: "text-heading tracking-tight mb-4",
    description: "text-body text-text-secondary leading-relaxed max-w-xl mx-auto",
  },
  "hero-adjacent": {
    container: "text-center mb-12 md:mb-14",
    label: "text-sm font-semibold tracking-[0.15em] uppercase mb-4",
    title: "text-title tracking-tight mb-5",
    description: "text-body-lg text-text-secondary leading-relaxed max-w-2xl mx-auto",
  },
};

export default function SectionHeader({
  label,
  labelColor = "text-brand-blue",
  title,
  description,
  id,
  variant = "default",
}: SectionHeaderProps) {
  const styles = variantStyles[variant];

  return (
    <motion.div
      id={id}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={styles.container}
    >
      <motion.p
        variants={fadeInUp}
        className={`${styles.label} ${labelColor}`}
      >
        {label}
      </motion.p>
      <motion.h2
        variants={fadeInUp}
        className={styles.title}
      >
        <span className="bg-linear-to-r from-white via-white/95 to-text-secondary/80 bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        className={styles.description}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
