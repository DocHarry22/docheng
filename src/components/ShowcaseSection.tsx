"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "./SectionHeader";

const panels = [
  {
    title: "DoCHEng Desk",
    subtitle: "Knowledge Workspace",
    color: "#3B82F6",
    items: [
      "Smart Notebooks",
      "AI Research Synthesis",
      "Knowledge Graph",
      "Focus Mode",
    ],
    mockup: "desk",
  },
  {
    title: "DoCHEng ChatPDF",
    subtitle: "Document Intelligence",
    color: "#8B5CF6",
    items: [
      "Natural Language Queries",
      "Citation Extraction",
      "Summary Generation",
      "Multi-Doc Analysis",
    ],
    mockup: "chatpdf",
  },
  {
    title: "Course Compass",
    subtitle: "Academic Navigator",
    color: "#10B981",
    items: [
      "Programme Finder",
      "APS Calculator",
      "Study Planner",
      "Prerequisite Map",
    ],
    mockup: "compass",
  },
];

function MockupDesk({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 p-6 flex flex-col gap-3 pointer-events-none" style={{ "--mockup-color": color } as React.CSSProperties}>
      {/* Sidebar + Main layout */}
      <div className="flex gap-3 flex-1">
        {/* Sidebar */}
        <div className="w-1/4 flex flex-col gap-2 pt-1">
          <div className="h-2.5 w-10/12 rounded bg-border-subtle/50" />
          <div className="h-2 w-8/12 rounded bg-brand-blue/20" />
          <div className="h-2 w-9/12 rounded bg-border-subtle/30" />
          <div className="h-2 w-7/12 rounded bg-border-subtle/30" />
          <div className="mt-3 h-2 w-10/12 rounded bg-border-subtle/50" />
          <div className="h-2 w-6/12 rounded bg-border-subtle/30" />
          <div className="h-2 w-8/12 rounded bg-border-subtle/30" />
        </div>
        {/* Main */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3 w-3/4 rounded bg-border-subtle/50" />
          <div className="h-2 w-full rounded bg-border-subtle/20" />
          <div className="h-2 w-11/12 rounded bg-border-subtle/20" />
          <div className="flex-1 mt-2 rounded-lg bg-surface-overlay/40 border border-border-subtle/20 p-3">
            {/* Knowledge graph hint */}
            <div className="flex gap-3 items-center">
              <div className="w-4 h-4 rounded-full bg-(--mockup-color)/20" />
              <div className="h-px flex-1 bg-border-subtle/30" />
              <div className="w-3 h-3 rounded-full bg-(--mockup-color)/15" />
              <div className="h-px flex-1 bg-border-subtle/30" />
              <div className="w-3.5 h-3.5 rounded-full bg-(--mockup-color)/18" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupChatPDF({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 p-6 flex flex-col gap-3 pointer-events-none" style={{ "--mockup-color": color } as React.CSSProperties}>
      <div className="flex gap-3 flex-1">
        {/* PDF panel */}
        <div className="w-1/2 rounded-lg bg-surface-overlay/30 border border-border-subtle/20 p-3 flex flex-col gap-2">
          <div className="h-2 w-full rounded bg-border-subtle/30" />
          <div className="h-2 w-11/12 rounded bg-border-subtle/20" />
          <div className="h-2 w-full rounded bg-border-subtle/25" />
          <div className="h-2 w-9/12 rounded bg-violet-500/15" />
          <div className="h-2 w-full rounded bg-border-subtle/20" />
          <div className="h-2 w-10/12 rounded bg-border-subtle/20" />
        </div>
        {/* Chat panel */}
        <div className="w-1/2 flex flex-col gap-2">
          <div className="rounded-lg bg-surface-overlay/30 border border-border-subtle/20 p-2.5">
            <div className="h-2 w-10/12 rounded bg-border-subtle/30" />
            <div className="h-2 w-8/12 rounded bg-border-subtle/20 mt-1" />
          </div>
          <div className="rounded-lg bg-(--mockup-color)/5 border border-(--mockup-color)/10 p-2.5">
            <div className="h-2 w-full rounded bg-(--mockup-color)/15" />
            <div className="h-2 w-9/12 rounded bg-(--mockup-color)/10 mt-1" />
          </div>
          <div className="rounded-lg bg-surface-overlay/30 border border-border-subtle/20 p-2.5">
            <div className="h-2 w-7/12 rounded bg-border-subtle/30" />
          </div>
          <div className="mt-auto flex gap-2">
            <div className="flex-1 h-6 rounded bg-surface-overlay/40 border border-border-subtle/20" />
            <div className="h-6 w-12 rounded bg-(--mockup-color)/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupCompass({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 p-6 flex flex-col gap-3 pointer-events-none" style={{ "--mockup-color": color } as React.CSSProperties}>
      {/* Search bar */}
      <div className="h-7 w-full rounded-lg bg-surface-overlay/40 border border-border-subtle/20 flex items-center px-3">
        <div className="w-3 h-3 rounded-full bg-(--mockup-color)/25" />
        <div className="h-2 w-32 rounded bg-border-subtle/30 ml-2" />
      </div>
      {/* Cards */}
      <div className="flex-1 grid grid-cols-2 gap-2.5">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="rounded-lg bg-surface-overlay/30 border border-border-subtle/20 p-2.5 flex flex-col gap-1.5"
          >
            <div className="h-2 w-3/4 rounded bg-border-subtle/40" />
            <div className="h-1.5 w-full rounded bg-border-subtle/20" />
            <div className="h-1.5 w-5/6 rounded bg-border-subtle/15" />
            <div className="mt-auto">
              <div
                className={`h-4 w-14 rounded border border-(--mockup-color)/15 ${
                  n === 1 ? "bg-(--mockup-color)/15" : "bg-transparent"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mockupComponents: Record<string, React.FC<{ color: string }>> = {
  desk: MockupDesk,
  chatpdf: MockupChatPDF,
  compass: MockupCompass,
};

function FloatingPanel({
  panel,
  index,
}: {
  panel: (typeof panels)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 1 : -1, index % 2 === 0 ? -0.5 : 0.5]
  );

  const Mockup = mockupComponents[panel.mockup];

  return (
    <motion.div ref={ref} style={{ y, rotateZ: rotate }} className="relative">
      <div
        className="bg-surface-card border border-border-subtle/60 rounded-2xl overflow-hidden"
        style={{
          boxShadow: `0 0 30px ${panel.color}06, 0 16px 48px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Window chrome - refined */}
        <div className="flex items-center gap-1.5 px-5 pt-4 pb-3 border-b border-border-subtle/30">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          <div className="ml-3 flex-1">
            <div className="h-4 w-36 max-w-full rounded bg-surface-overlay/60" />
          </div>
        </div>

        {/* Product-specific mockup - tighter aspect */}
        <div className="relative aspect-4/3">
          <div
            className={`absolute inset-0 opacity-[0.015]`}
            style={{
              backgroundImage: `linear-gradient(135deg, ${panel.color}20, transparent)`,
            }}
          />
          {Mockup && <Mockup color={panel.color} />}
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-surface-card to-transparent" />
        </div>

        {/* Info bar - cleaner */}
        <div className="px-5 py-4 border-t border-border-subtle/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div
                className="text-xs font-semibold mb-0.5"
                style={{ color: panel.color }}
              >
                {panel.title}
              </div>
              <div className="text-[10px] text-text-muted">{panel.subtitle}</div>
            </div>
            <div className="flex flex-wrap gap-1">
              {panel.items.slice(0, 2).map((item, i) => (
                <span
                  key={i}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-surface-overlay/60 text-text-muted border border-border-subtle/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ShowcaseSection() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background - more subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border-subtle/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border-subtle/50 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-310 px-6 sm:px-8 lg:px-16 relative z-10">
        <SectionHeader
          label="Product Preview"
          title="Experience What's Being Built"
          description="Glimpses of the products and interfaces taking shape inside the DoCHEng ecosystem."
        />

        {/* Floating panels grid - tighter gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 perspective-distant">
          {panels.map((panel, i) => (
            <FloatingPanel key={i} panel={panel} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
