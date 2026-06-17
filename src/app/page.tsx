import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Footer from "@/components/Footer";
import { getSessionUser } from "@/lib/auth";

// Skeleton loaders for lazy-loaded sections
function SectionSkeleton({ height = "60vh" }: { height?: string }) {
  return (
    <div className="mx-auto w-full max-w-310 px-6 sm:px-8 lg:px-12" style={{ minHeight: height }}>
      <div className="section-padding flex flex-col items-center gap-6">
        <div className="h-3 w-24 rounded-full bg-surface-card animate-pulse" />
        <div className="h-8 w-80 max-w-full rounded-lg bg-surface-card animate-pulse" />
        <div className="h-4 w-96 max-w-full rounded-lg bg-surface-card/60 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 w-full mt-10">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-52 rounded-2xl bg-surface-card animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Lazy load below-fold heavy sections for performance
const ProductGrid = dynamic(() => import("@/components/ProductGrid"), {
  loading: () => <SectionSkeleton />,
});
const EcosystemMap = dynamic(() => import("@/components/EcosystemMap"), {
  loading: () => <SectionSkeleton />,
});
const FeatureSection = dynamic(() => import("@/components/FeatureSection"), {
  loading: () => <SectionSkeleton />,
});
const RoadmapSection = dynamic(() => import("@/components/RoadmapSection"), {
  loading: () => <SectionSkeleton height="40vh" />,
});
const ShowcaseSection = dynamic(() => import("@/components/ShowcaseSection"), {
  loading: () => <SectionSkeleton height="40vh" />,
});
const CTASection = dynamic(() => import("@/components/CTASection"), {
  loading: () => <SectionSkeleton height="40vh" />,
});

export default async function Home() {
  const user = await getSessionUser();

  return (
    <>
      <Navbar user={user} />
      <main id="main-content" className="relative overflow-x-clip bg-surface-base">
        <Hero />
        <TrustStrip />
        <div className="section-divider" />
        <div className="h-10 md:h-14 lg:h-nav-height" aria-hidden="true" />
        <ProductGrid />
        <div className="section-divider" />
        <EcosystemMap />
        <div className="section-divider" />
        <FeatureSection />
        <div className="section-divider" />
        <RoadmapSection />
        <div className="section-divider" />
        <ShowcaseSection />
        <div className="section-divider" />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
