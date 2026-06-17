import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { getAccessibleCalculators, getRoleLabel } from "@/lib/permissions";

export default async function CalculatorsPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/auth/login?next=/calculators");
  }

  const calculators = getAccessibleCalculators(user.role);

  return (
    <main className="min-h-svh bg-surface-base px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="rounded-3xl border border-border-medium/70 bg-linear-to-b from-surface-card/95 to-surface-overlay/95 p-6 sm:p-8">
          <p className="text-sm font-semibold tracking-[0.16em] uppercase text-brand-blue-light">
            Engineering workspace
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-text-primary">
            Calculator suite
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-secondary">
            Your {getRoleLabel(user.role).toLowerCase()} account can launch these protected
            calculators directly from the application, with inputs saved locally for quick reuse.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl border border-border-medium bg-surface-overlay px-5 py-3 font-semibold text-text-primary transition hover:border-brand-blue/45"
            >
              Back to dashboard
            </Link>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-2">
          {calculators.map((calculator) => (
            <Link
              key={calculator.slug}
              href={`/calculators/${calculator.slug}`}
              className="rounded-3xl border border-border-medium/70 bg-surface-card/80 p-5 transition hover:border-brand-blue/45"
            >
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-brand-orange-light">
                {calculator.shortName}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-text-primary">{calculator.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {calculator.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
