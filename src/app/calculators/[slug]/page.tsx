import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import CalculatorWorkbench from "@/components/CalculatorWorkbench";
import { getSessionUser } from "@/lib/auth";
import { getCalculatorBySlug } from "@/lib/calculators";
import { canAccessCalculator, getRoleLabel } from "@/lib/permissions";

export default async function CalculatorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  const user = await getSessionUser();
  if (!user) {
    redirect(`/auth/login?next=/calculators/${slug}`);
  }

  if (!canAccessCalculator(user.role, slug)) {
    redirect("/dashboard#permissions");
  }

  return (
    <main className="min-h-svh bg-surface-base px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="rounded-3xl border border-border-medium/70 bg-linear-to-br from-surface-card/95 to-surface-overlay/95 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] uppercase text-brand-blue-light">
                Protected calculator
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-text-primary">
                {calculator.name}
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-secondary">
                {calculator.description}
              </p>
            </div>
            <div className="rounded-2xl border border-border-medium bg-surface-overlay/80 px-4 py-3 text-sm text-text-secondary">
              Access level:{" "}
              <span className="font-semibold text-text-primary">
                {getRoleLabel(calculator.requiredRole)}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center rounded-2xl border border-border-medium bg-surface-overlay px-5 py-3 font-semibold text-text-primary transition hover:border-brand-blue/45"
            >
              All calculators
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl border border-border-medium bg-surface-overlay px-5 py-3 font-semibold text-text-primary transition hover:border-brand-blue/45"
            >
              Dashboard
            </Link>
          </div>
        </header>

        <CalculatorWorkbench slug={slug} />
      </div>
    </main>
  );
}
