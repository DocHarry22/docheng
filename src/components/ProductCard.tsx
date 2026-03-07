"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
	ArrowRight,
	Bell,
	Rocket,
	Sparkles,
	FlaskConical,
	Cpu,
	Layers3,
} from "lucide-react";
import {
	categoryLabels,
	getProductCTA,
	statusConfig,
	type Product,
	type ProductCategory,
	type ProductStatus,
} from "@/lib/products";

const statusFallback: ProductStatus = "coming-soon";

const ctaIcons = {
	"Open App": Rocket,
	"Join Beta": FlaskConical,
	"Notify Me": Bell,
	"Learn More": Sparkles,
	"Join Waitlist": Cpu,
} as const;

const statusAccent: Record<ProductStatus, string> = {
	live: "from-sky-500/25 to-cyan-400/10",
	beta: "from-amber-500/25 to-orange-400/10",
	development: "from-cyan-500/20 to-blue-500/10",
	"coming-soon": "from-slate-400/20 to-slate-500/10",
	vision: "from-violet-500/20 to-indigo-500/10",
};

const ctaStyles: Record<ProductStatus, string> = {
	live:
		"bg-linear-to-r from-brand-blue to-brand-blue-dark text-white border border-brand-blue/70 hover:brightness-110",
	beta:
		"bg-linear-to-r from-brand-orange to-amber-500 text-surface-base border border-brand-orange/70 hover:brightness-110",
	development:
		"bg-sky-500/12 text-sky-200 border border-sky-400/30 hover:bg-sky-500/18",
	"coming-soon":
		"bg-slate-500/10 text-slate-200 border border-slate-400/25 hover:bg-slate-500/16",
	vision:
		"bg-violet-500/10 text-violet-200 border border-violet-400/30 hover:bg-violet-500/16",
};

function getSafeStatus(product: Product): ProductStatus {
	if (product?.status && statusConfig[product.status]) {
		return product.status;
	}

	return statusFallback;
}

function getPrimaryCategory(categories: ProductCategory[]): ProductCategory {
	return categories.find((c) => c !== "all") ?? "all";
}

function getSecondaryCategory(categories: ProductCategory[]): ProductCategory | null {
	const filtered = categories.filter((c) => c !== "all");
	return filtered.length > 1 ? filtered[1] : null;
}

export default function ProductCard({ product }: { product: Product }) {
	const shouldReduceMotion = useReducedMotion();

	if (!product) {
		return null;
	}

	const safeStatus = getSafeStatus(product);
	const status = statusConfig[safeStatus];
	const Icon = product.icon;
	const cta = getProductCTA({ ...product, status: safeStatus });
	const CtaIcon = ctaIcons[cta.label as keyof typeof ctaIcons] || ArrowRight;

	const primaryCategory = getPrimaryCategory(product.categories);
	const secondaryCategory = getSecondaryCategory(product.categories);
	const accessLabel = safeStatus === "live" ? "Immediate Access" : "Priority Access";

	return (
		<motion.article
			layout
			initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
			animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
			exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
			transition={{ duration: shouldReduceMotion ? 0.2 : 0.35, ease: [0.22, 0.61, 0.36, 1] }}
			whileHover={shouldReduceMotion ? undefined : { y: -4 }}
			className="group relative h-full overflow-hidden rounded-2xl border border-border-medium/70 bg-linear-to-b from-surface-card/95 to-surface-overlay/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.28)] transition-colors duration-300 hover:border-brand-blue/45 sm:p-7 xl:p-8"
		>
			<div
				className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b ${statusAccent[safeStatus]} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
			/>

			<div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-brand-blue/12 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />

			<div className="relative flex h-full flex-col gap-6 xl:gap-7">
				<div className="flex items-center justify-between gap-3">
					<span
						className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase ${status.color} ${status.bg}`}
					>
						{status.label}
					</span>
					<span className="inline-flex items-center rounded-full border border-border-medium/80 bg-surface-overlay/70 px-3 py-1 text-xs font-medium text-text-secondary">
						{accessLabel}
					</span>
				</div>

				<div className="flex items-center justify-between gap-4">
					<div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${product.gradient} shadow-[0_10px_24px_rgba(0,0,0,0.3)]`}>
						<Icon size={24} className="text-white" aria-hidden="true" />
					</div>

					<div className="flex items-center gap-2 text-text-muted">
						<Layers3 size={14} aria-hidden="true" />
						<span className="text-xs font-medium tracking-[0.08em] uppercase">{product.shortName}</span>
					</div>
				</div>

				<div className="space-y-3.5">
					<h3 className="text-xl font-semibold tracking-tight text-text-primary sm:text-2xl xl:text-[1.9rem] xl:leading-[1.2]">{product.name}</h3>
					<p className="text-sm leading-relaxed text-text-secondary sm:text-[0.97rem] xl:text-base xl:leading-[1.72]">{product.description}</p>
				</div>

				<div className="grid grid-cols-2 gap-3 text-sm xl:gap-3.5">
					<div className="rounded-xl border border-border-subtle/90 bg-surface-overlay/75 px-3.5 py-3 xl:px-4 xl:py-3.5">
						<p className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-text-label">Primary Domain</p>
						<p className="mt-1 font-medium text-text-primary">{categoryLabels[primaryCategory]}</p>
					</div>

					<div className="rounded-xl border border-border-subtle/90 bg-surface-overlay/75 px-3.5 py-3 xl:px-4 xl:py-3.5">
						<p className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-text-label">Secondary</p>
						<p className="mt-1 font-medium text-text-primary">{secondaryCategory ? categoryLabels[secondaryCategory] : "Ecosystem Core"}</p>
					</div>
				</div>

				<div className="mt-auto flex items-center justify-between gap-3 pt-2">
					<Link
						href={cta.href}
						className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/80 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base xl:px-4.5 xl:py-3 xl:text-[0.95rem] ${ctaStyles[safeStatus]}`}
						aria-label={`${cta.label} for ${product.name}`}
					>
						<CtaIcon size={16} aria-hidden="true" />
						<span>{cta.label}</span>
					</Link>

					<span className="text-xs font-medium text-text-muted">{safeStatus === "live" ? "Production Ready" : "Roadmap Access"}</span>
				</div>
			</div>
		</motion.article>
	);
}
