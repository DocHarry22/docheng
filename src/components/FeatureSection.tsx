"use client";

import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import {
  Zap,
  Brain,
  BarChart3,
  Route,
  Lightbulb,
  Shield,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

const features = [
  {
    icon: Zap,
    title: "Learn Faster",
    description:
      "AI-powered study tools that distill complex materials into actionable knowledge. Spend less time searching, more time understanding.",
    gradient: "from-blue-500 to-cyan-400",
    visual: "chatpdf",
  },
  {
    icon: Brain,
    title: "Think Deeper",
    description:
      "Knowledge graphs and connected workspaces that reveal hidden patterns across your research, notes, and documents.",
    gradient: "from-violet-500 to-purple-400",
    visual: "desk",
  },
  {
    icon: BarChart3,
    title: "Work Smarter",
    description:
      "Productivity systems designed by engineers, for engineers. Structured workflows that adapt to how you actually think and build.",
    gradient: "from-emerald-500 to-teal-400",
    visual: "analytics",
  },
  {
    icon: Route,
    title: "Navigate Your Path",
    description:
      "Whether choosing a programme, planning a career, or building a portfolio — intelligent guidance for every decision point.",
    gradient: "from-amber-500 to-orange-400",
    visual: "compass",
  },
  {
    icon: Lightbulb,
    title: "AI with Purpose",
    description:
      "Not AI for the sake of AI. Every DoCHEng tool applies artificial intelligence with practical engineering and education context.",
    gradient: "from-pink-500 to-rose-400",
    visual: "research",
  },
  {
    icon: Shield,
    title: "Built to Scale",
    description:
      "Enterprise-grade architecture from day one. Your data stays secure, your tools stay fast, and the ecosystem grows with you.",
    gradient: "from-indigo-500 to-violet-400",
    visual: "platform",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="relative py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-310 px-6 sm:px-8 lg:px-16">
        <SectionHeader
          label="Why DoCHEng"
          title="Engineered for How You Learn, Think, and Build"
          description="Every tool in the DoCHEng ecosystem is purpose-built to amplify human intelligence — not replace it."
        />

        {/* Feature rows - alternating with tighter spacing */}
        <div className="space-y-16 md:space-y-24">
          {features.map((feature, i) => {
            const isEven = i % 2 === 0;
            const Icon = feature.icon;

            return (
              <motion.div
                key={i}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-10 lg:gap-14 items-center`}
              >
                {/* Text side */}
                <motion.div
                  variants={isEven ? fadeInLeft : fadeInRight}
                  className="flex-1 max-w-lg"
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>

                {/* Visual side - cleaner */}
                <motion.div
                  variants={isEven ? fadeInRight : fadeInLeft}
                  className="flex-1 w-full max-w-md lg:max-w-none"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-surface-card border border-border-subtle/60 aspect-4/3">
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-[0.02]`}
                    />

                    {/* Mock UI elements - simplified */}
                    <div className="absolute inset-0 p-5 md:p-6 flex flex-col gap-3">
                      {/* Title bar */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/30" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                        <div className="w-2 h-2 rounded-full bg-green-500/30" />
                        <div className="flex-1 h-3.5 rounded bg-surface-overlay/50 ml-2" />
                      </div>
                      {/* Content bars */}
                      <div className="flex-1 flex gap-3">
                        {/* Sidebar */}
                        <div className="w-1/4 flex flex-col gap-2">
                          {[70, 60, 80, 65].map((w, j) => (
                            <div
                              key={j}
                              className={`h-2 rounded ${
                                j === 1 ? "bg-brand-blue/15" : "bg-border-subtle/40"
                              }`}
                              style={{ width: `${w}%` }}
                            />
                          ))}
                        </div>
                        {/* Main area */}
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="h-2.5 w-3/4 rounded bg-border-subtle/30" />
                          <div className="h-2 w-full rounded bg-border-subtle/15" />
                          <div className="h-2 w-5/6 rounded bg-border-subtle/15" />
                          <div className="flex-1 mt-1 rounded-lg bg-surface-overlay/30 border border-border-subtle/15" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
