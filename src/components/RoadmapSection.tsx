"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { roadmapPillars, products } from "@/lib/products";
import { ArrowRight, Sparkles } from "lucide-react";

const productNameMap = new Map(
  products.map((product) => [product.id, product.shortName]),
);

function getRelatedProductText(productIds: string[]): string {
  return productIds
    .map((id) =>
      productNameMap.get(id) ||
      id.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
    )
    .join(" · ");
}

function getMilestoneState(index: number): string {
  if (index === 0) return "Current Focus";
  if (index === 1) return "Next Expansion";
  return "Future Milestone";
}

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-surface-base via-[#050814] to-surface-base" />
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-brand-blue/8 blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-brand-orange/6 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-330 px-6 sm:px-8 lg:px-14 xl:px-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-70px" }}
          className="grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <p className="mb-4 text-sm font-semibold tracking-[0.14em] text-brand-orange-light uppercase">
              Future Vision
            </p>
            <h2 className="max-w-4xl text-title tracking-tight xl:text-[3.3rem] xl:leading-[1.08]">
              <span className="bg-linear-to-r from-white via-white to-cyan-100 bg-clip-text text-transparent">
                Strategic Roadmap.
              </span>{" "}
              <span className="bg-linear-to-r from-brand-blue-light to-brand-orange-light bg-clip-text text-transparent">
                A Guided Evolution of the DoCHEng Ecosystem.
              </span>
            </h2>
            <p className="mt-5 max-w-3xl text-body-lg leading-relaxed text-text-secondary">
              This roadmap maps how DoCHEng evolves from today&apos;s production systems into a fully connected intelligence platform.
              Each milestone expands capability, compounds ecosystem value, and reinforces long-term product confidence.
            </p>
          </motion.div>

          <motion.aside
            variants={fadeInUp}
            className="glass relative overflow-hidden rounded-2xl p-6 sm:p-7 lg:col-span-5"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-blue/15 blur-2xl" />
            <p className="text-[11px] font-semibold tracking-[0.14em] text-text-label uppercase">
              Trajectory Snapshot
            </p>
            <h3 className="mt-3 text-xl font-semibold text-text-primary">
              From Core Intelligence to Full Platform Maturity
            </h3>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-border-medium/70 bg-surface-overlay/70 p-3">
                <p className="text-[10px] tracking-[0.12em] text-text-label uppercase">Milestones</p>
                <p className="mt-1 text-2xl font-semibold text-text-primary">{roadmapPillars.length}</p>
              </div>
              <div className="rounded-xl border border-border-medium/70 bg-surface-overlay/70 p-3">
                <p className="text-[10px] tracking-[0.12em] text-text-label uppercase">Domains</p>
                <p className="mt-1 text-2xl font-semibold text-sky-300">5</p>
              </div>
              <div className="rounded-xl border border-border-medium/70 bg-surface-overlay/70 p-3">
                <p className="text-[10px] tracking-[0.12em] text-text-label uppercase">Horizon</p>
                <p className="mt-1 text-2xl font-semibold text-amber-300">2029</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">
              A deliberate, compounding roadmap where each phase unlocks the next layer of intelligence.
            </p>
          </motion.aside>
        </motion.div>

        <div className="mt-14 md:mt-16 lg:hidden">
          <div className="relative pl-12">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-linear-to-b from-brand-blue/35 via-brand-blue/20 to-brand-orange/30" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-8"
            >
              {roadmapPillars.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <motion.article
                    key={pillar.id}
                    variants={fadeInUp}
                    className="relative rounded-2xl border border-border-medium/70 bg-linear-to-b from-surface-card/95 to-surface-overlay/95 p-5 shadow-[0_14px_36px_rgba(0,0,0,0.24)]"
                  >
                    <div className={`absolute left-[-2.65rem] top-6 flex h-8 w-8 items-center justify-center rounded-full border border-border-medium bg-linear-to-br ${pillar.color}`}>
                      <Icon size={15} className="text-white" aria-hidden="true" />
                    </div>

                    <p className="text-xs font-semibold tracking-[0.12em] text-brand-orange-light uppercase">
                      Phase {String(index + 1).padStart(2, "0")} · {getMilestoneState(index)}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-text-primary">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {pillar.description}
                    </p>

                    <div className="mt-4 border-t border-border-subtle/50 pt-3.5 text-sm text-text-secondary">
                      <p className="font-medium text-text-primary">{pillar.phase}</p>
                      <p className="mt-1.5">{getRelatedProductText(pillar.products)}</p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>

        <div className="mt-16 hidden lg:block xl:mt-nav-height">
          <div className="relative overflow-x-auto pb-4 scrollbar-hide">
            <div className="relative min-w-280">
              <div className="pointer-events-none absolute left-0 right-0 top-12 h-px bg-linear-to-r from-brand-blue/30 via-cyan-300/35 to-brand-orange/35" />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-5 gap-6"
              >
                {roadmapPillars.map((pillar, index) => {
                  const Icon = pillar.icon;
                  const offsetClass = index % 2 === 0 ? "mt-0" : "mt-8";

                  return (
                    <motion.article
                      key={pillar.id}
                      variants={fadeInUp}
                      className={`group relative ${offsetClass}`}
                    >
                      <div className="relative mb-6 flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full border border-border-medium bg-linear-to-br ${pillar.color} shadow-[0_0_20px_rgba(59,130,246,0.2)]`}>
                          <Icon size={16} className="text-white" aria-hidden="true" />
                        </div>
                        <p className="text-xs font-semibold tracking-[0.12em] text-text-label uppercase">
                          Phase {String(index + 1).padStart(2, "0")}
                        </p>
                      </div>

                      <div className="h-full rounded-2xl border border-border-medium/75 bg-linear-to-b from-surface-card/95 to-surface-overlay/95 p-5 transition-all duration-300 group-hover:border-brand-blue/40 group-hover:shadow-[0_14px_38px_rgba(0,0,0,0.3)]">
                        <p className="text-xs font-semibold tracking-[0.12em] text-brand-orange-light uppercase">
                          {getMilestoneState(index)}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold leading-snug text-text-primary">
                          {pillar.title}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                          {pillar.description}
                        </p>

                        <div className="mt-5 border-t border-border-subtle/50 pt-3.5">
                          <p className="text-sm font-medium text-text-primary">{pillar.phase}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                            {getRelatedProductText(pillar.products)}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-14 rounded-2xl border border-border-medium/70 bg-linear-to-r from-surface-card/90 via-surface-card/80 to-surface-overlay/95 p-6 sm:p-7"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-brand-blue-light uppercase">
                Innovation Signal
              </p>
              <p className="mt-2 text-base leading-relaxed text-text-secondary">
                The roadmap is structured as a progression system: each milestone strengthens the core and accelerates ecosystem intelligence.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              <Sparkles size={16} aria-hidden="true" />
              Strategic execution in motion
              <ArrowRight size={15} aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
