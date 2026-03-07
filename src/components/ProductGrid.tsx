"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
	ArrowRight,
	BrainCircuit,
	Layers3,
	Sparkles,
	Zap,
} from "lucide-react";
import {
	categoryLabels,
	products,
	type Product,
	type ProductCategory,
} from "@/lib/products";
import ProductCard from "./ProductCard";

const filterOrder: ProductCategory[] = [
	"all",
	"ai-tools",
	"student",
	"engineering",
	"career",
	"productivity",
];

const filterIcons: Record<ProductCategory, typeof Layers3> = {
	all: Layers3,
	"ai-tools": BrainCircuit,
	student: Sparkles,
	engineering: Zap,
	career: ArrowRight,
	productivity: Layers3,
};

function getCategoryCount(category: ProductCategory): number {
	if (category === "all") {
		return products.length;
	}

	return products.filter((product) => product.categories.includes(category)).length;
}

function filterProducts(category: ProductCategory): Product[] {
	if (category === "all") {
		return products;
	}

	return products.filter((product) => product.categories.includes(category));
}

export default function ProductGrid() {
	const shouldReduceMotion = useReducedMotion();
	const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");

	const filteredProducts = useMemo(
		() => filterProducts(activeCategory),
		[activeCategory],
	);

	const liveCount = useMemo(
		() => products.filter((product) => product.status === "live").length,
		[],
	);
	const betaCount = useMemo(
		() => products.filter((product) => product.status === "beta").length,
		[],
	);
	const futureCount = useMemo(
		() =>
			products.filter(
				(product) =>
					product.status === "development" ||
					product.status === "coming-soon" ||
					product.status === "vision",
			).length,
		[],
	);
	const domainCount = useMemo(
		() =>
			filterOrder.filter((category) => category !== "all" && getCategoryCount(category) > 0)
				.length,
		[],
	);

	return (
		<section
			id="products"
			className="relative isolate overflow-hidden py-28 md:py-36 lg:py-44 2xl:py-48"
			aria-labelledby="products-heading"
		>
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-linear-to-b from-surface-base via-[#060916] to-surface-base" />
				<div className="absolute inset-x-0 top-0 h-152 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.17),transparent_58%)]" />
				<div className="absolute -left-32 top-36 h-72 w-72 rounded-full bg-brand-blue/14 blur-3xl" />
				<div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-brand-orange/10 blur-3xl" />
			</div>

			<div className="mx-auto w-full max-w-330 px-6 sm:px-8 lg:px-14 xl:px-16">
				<div className="grid gap-10 lg:grid-cols-12 lg:gap-12 2xl:gap-14">
					<motion.div
						initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
						whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-70px" }}
						transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
						className="lg:col-span-7"
					>
						<p className="mb-4 text-sm font-semibold tracking-[0.15em] text-brand-blue-light uppercase">
							Product Ecosystem
						</p>

						<h2 id="products-heading" className="text-title max-w-3xl tracking-tight xl:max-w-4xl xl:text-[3.6rem] xl:leading-[1.08]">
							<span className="bg-linear-to-r from-white via-white to-cyan-100 bg-clip-text text-transparent">
								One Intelligence Backbone.
							</span>{" "}
							<span className="bg-linear-to-r from-brand-blue-light to-brand-orange-light bg-clip-text text-transparent">
								Multiple Precision Products.
							</span>
						</h2>

						<p className="mt-5 max-w-2xl text-body-lg text-text-secondary xl:max-w-3xl xl:text-[1.24rem] xl:leading-[1.75]">
							DoCHEng unifies AI tooling, engineering workflows, and student systems into a connected product suite.
							Every experience is purpose-built, interoperable, and designed to convert complex decisions into confident action.
						</p>
					</motion.div>

					<motion.aside
						initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
						whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-70px" }}
						transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 0.61, 0.36, 1] }}
						className="glass relative overflow-hidden rounded-2xl p-6 sm:p-7 lg:col-span-5 xl:p-8"
						aria-label="Ecosystem summary"
					>
						<div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-blue/20 blur-2xl" />

						<h3 className="text-base font-semibold text-text-primary sm:text-lg">
							Ecosystem Maturity Snapshot
						</h3>

						<div className="mt-5 grid grid-cols-2 gap-3 xl:gap-3.5">
							<div className="rounded-xl border border-border-medium/70 bg-surface-overlay/75 p-3.5">
								<p className="text-[0.7rem] font-semibold tracking-[0.08em] text-text-label uppercase">Total Products</p>
								<p className="mt-1 text-2xl font-semibold text-text-primary">{products.length}</p>
							</div>

							<div className="rounded-xl border border-border-medium/70 bg-surface-overlay/75 p-3.5">
								<p className="text-[0.7rem] font-semibold tracking-[0.08em] text-text-label uppercase">Live Today</p>
								<p className="mt-1 text-2xl font-semibold text-emerald-300">{liveCount}</p>
							</div>

							<div className="rounded-xl border border-border-medium/70 bg-surface-overlay/75 p-3.5">
								<p className="text-[0.7rem] font-semibold tracking-[0.08em] text-text-label uppercase">Beta Access</p>
								<p className="mt-1 text-2xl font-semibold text-amber-300">{betaCount}</p>
							</div>

							<div className="rounded-xl border border-border-medium/70 bg-surface-overlay/75 p-3.5">
								<p className="text-[0.7rem] font-semibold tracking-[0.08em] text-text-label uppercase">Future Pipeline</p>
								<p className="mt-1 text-2xl font-semibold text-sky-300">{futureCount}</p>
							</div>
						</div>

						<p className="mt-5 text-sm leading-relaxed text-text-secondary">
							{domainCount} active domains connected by one intelligence layer.
							{" "}
							<span className="text-text-primary">Consistent UX, shared data context, and scalable product architecture.</span>
						</p>
					</motion.aside>
				</div>

				<motion.div
					initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
					whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-70px" }}
					transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
					className="mt-14 md:mt-nav-height xl:mt-20"
				>
					<p className="mb-4 text-sm font-medium text-text-secondary">Browse by domain</p>

					<div className="overflow-x-auto pb-2 scrollbar-hide">
						<div className="flex min-w-max gap-3.5 xl:gap-4">
							{filterOrder.map((category) => {
								const Icon = filterIcons[category];
								const isActive = activeCategory === category;

								return (
									<button
										key={category}
										type="button"
										onClick={() => setActiveCategory(category)}
										className={`inline-flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/80 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base sm:px-5 sm:py-3.5 xl:px-5.5 xl:py-4 xl:text-[0.96rem] ${
											isActive
												? "border-brand-blue/65 bg-brand-blue/15 text-white shadow-[0_12px_28px_rgba(59,130,246,0.22)]"
												: "border-border-medium/80 bg-surface-card/80 text-text-secondary hover:border-brand-blue/40 hover:text-text-primary"
										}`}
										aria-pressed={isActive}
									>
										<Icon size={16} aria-hidden="true" />
										<span>{categoryLabels[category]}</span>
										<span
											className={`rounded-full px-2 py-0.5 text-xs ${
												isActive
													? "bg-brand-blue/25 text-cyan-100"
													: "bg-surface-overlay/90 text-text-muted"
											}`}
										>
											{getCategoryCount(category)}
										</span>
									</button>
								);
							})}
						</div>
					</div>
				</motion.div>

				<motion.div
					layout
					className="mt-12 grid grid-cols-1 gap-7 sm:gap-8 lg:mt-14 lg:grid-cols-2 xl:grid-cols-3 2xl:gap-10"
				>
					<AnimatePresence mode="popLayout">
						{filteredProducts.map((product) => (
							<motion.div
								key={product.id}
								layout
								initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
								animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
								exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
								transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
								className="h-full"
							>
								<ProductCard product={product} />
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>

				<motion.div
					initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
					whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 0.61, 0.36, 1] }}
					className="mt-20 rounded-2xl border border-border-medium/70 bg-linear-to-r from-surface-card/95 via-surface-card/85 to-surface-overlay/95 p-6 sm:p-7 lg:mt-24 lg:p-8 xl:p-9"
				>
					<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
						<div>
							  <p className="text-sm font-semibold tracking-widest text-brand-orange-light uppercase">
								Ecosystem Momentum
							</p>
							<h3 className="mt-2 text-heading text-text-primary sm:text-[1.5rem]">
								Building the operating system for engineering intelligence
							</h3>
							<p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
								From live products to upcoming systems, each release expands a cohesive intelligence platform.
								Join early access and help shape the next generation of DoCHEng tools.
							</p>
						</div>

						<div className="flex flex-wrap gap-3">
							<Link href="#cta" className="btn-primary">
								Join Priority Access
							</Link>
							<Link
								href="#roadmap"
								className="inline-flex items-center gap-2 rounded-xl border border-border-medium bg-surface-overlay/80 px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-brand-blue/45 hover:bg-surface-card/90"
							>
								See Roadmap
								<ArrowRight size={16} aria-hidden="true" />
							</Link>
						</div>
					</div>
				</motion.div>

				<div className="sr-only" aria-live="polite">
					Showing {filteredProducts.length} products in {categoryLabels[activeCategory]}.
				</div>
			</div>
		</section>
	);
}
