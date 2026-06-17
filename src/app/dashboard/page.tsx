import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { calculatorDefinitions } from "@/lib/calculators";
import {
  canAccessCalculator,
  getAccessibleCalculators,
  getLockedCalculators,
  getRoleLabel,
  getRoleSummary,
} from "@/lib/permissions";

export default async function DashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/auth/login?next=/dashboard");
  }

  const accessibleCalculators = getAccessibleCalculators(user.role);
  const lockedCalculators = getLockedCalculators(user.role);

  return (
    <main className="min-h-svh bg-surface-base px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-6 rounded-3xl border border-border-medium/70 bg-linear-to-br from-surface-card/95 to-surface-overlay/95 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.3)] sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-brand-blue-light">
              Authenticated workspace
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-text-primary">
              Welcome back, {user.name.split(" ")[0]}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
              Your account now unlocks a real DoCHEng experience with session-based auth,
              protected routes, calculator persistence, and role-aware access control.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-brand-blue to-brand-blue-dark px-5 py-3 font-semibold text-white transition hover:brightness-110"
            >
              Open calculators
            </Link>
            <form action="/auth/logout" method="post">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl border border-border-medium bg-surface-overlay px-5 py-3 font-semibold text-text-primary transition hover:border-brand-blue/45"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="glass rounded-3xl p-6">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-text-label">
              Account
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text-primary">{user.email}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Signed in with a secure, signed cookie session.
            </p>
          </div>
          <div className="glass rounded-3xl p-6">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-text-label">
              Role
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text-primary">
              {getRoleLabel(user.role)}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {getRoleSummary(user.role)}
            </p>
          </div>
          <div className="glass rounded-3xl p-6">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-text-label">
              Access snapshot
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text-primary">
              {accessibleCalculators.length} calculators live
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {lockedCalculators.length} protected tool
              {lockedCalculators.length === 1 ? "" : "s"} remain gated by permissions.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-border-medium/70 bg-surface-card/80 p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] uppercase text-brand-orange-light">
                Available tools
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-text-primary">
                Production dashboard modules
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
              Accessible modules now open into actual protected routes rather than marketing-only
              sections on the landing page.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {accessibleCalculators.map((calculator) => (
              <Link
                key={calculator.slug}
                href={`/calculators/${calculator.slug}`}
                className="rounded-3xl border border-border-medium/70 bg-linear-to-b from-surface-card/95 to-surface-overlay/95 p-5 transition hover:border-brand-blue/45"
              >
                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-brand-blue-light">
                  {calculator.shortName}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-text-primary">
                  {calculator.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {calculator.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section id="permissions" className="rounded-3xl border border-border-medium/70 bg-surface-card/80 p-6 sm:p-8">
          <p className="text-sm font-semibold tracking-[0.16em] uppercase text-brand-blue-light">
            Permissions
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary">
            Role-aware access rules are now enforced
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">
            Every protected route checks the signed session and then evaluates the role required by
            the underlying tool before rendering it.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {calculatorDefinitions.map((calculator) => {
              const allowed = canAccessCalculator(user.role, calculator.slug);

              return (
                <div
                  key={calculator.slug}
                  className={`rounded-3xl border p-5 ${
                    allowed
                      ? "border-emerald-400/20 bg-emerald-400/8"
                      : "border-border-medium/70 bg-surface-overlay/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold text-text-primary">{calculator.name}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                        allowed
                          ? "bg-emerald-400/15 text-emerald-300"
                          : "bg-surface-card text-text-muted"
                      }`}
                    >
                      {allowed ? "Granted" : `Requires ${getRoleLabel(calculator.requiredRole)}`}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {calculator.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
