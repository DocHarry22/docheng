"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

interface AuthFormProps {
  mode: "login" | "register";
  nextPath?: string;
}

export default function AuthForm({ mode, nextPath = "/dashboard" }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const copy = useMemo(() => {
    if (mode === "register") {
      return {
        title: "Create your DoCHEng account",
        description:
          "Register to unlock the dashboard, live calculators, and permission-aware product access.",
        submitLabel: "Create account",
        alternateLabel: "Already have an account?",
        alternateHref:
          nextPath !== "/dashboard"
            ? `/auth/login?next=${encodeURIComponent(nextPath)}`
            : "/auth/login",
        alternateAction: "Sign in",
      };
    }

    return {
      title: "Sign in to continue",
      description:
        "Use your DoCHEng account to access the dashboard and engineering workspace.",
      submitLabel: "Sign in",
      alternateLabel: "Need an account?",
      alternateHref:
        nextPath !== "/dashboard"
          ? `/auth/register?next=${encodeURIComponent(nextPath)}`
          : "/auth/register",
      alternateAction: "Register",
    };
  }, [mode, nextPath]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error || "Unable to continue. Please try again.");
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Unable to continue. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-6xl items-center justify-center px-6 py-20 sm:px-8">
      <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <section className="space-y-6">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-brand-blue-light">
            DoCHEng Workspace
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            {copy.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {copy.description}
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "Protected sessions with signed cookies",
              "Permission-aware dashboard views",
              "Engineering calculators with saved inputs",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border-medium/70 bg-surface-card/85 p-4 text-sm text-text-secondary"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="glass rounded-3xl p-6 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === "register" ? (
              <label className="block space-y-2">
                <span className="text-sm font-medium text-text-primary">Full name</span>
                <input
                  required
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-2xl border border-border-medium bg-surface-overlay px-4 py-3 text-text-primary outline-none transition focus:border-brand-blue"
                  placeholder="Ada Lovelace"
                />
              </label>
            ) : null}

            <label className="block space-y-2">
              <span className="text-sm font-medium text-text-primary">Email address</span>
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-border-medium bg-surface-overlay px-4 py-3 text-text-primary outline-none transition focus:border-brand-blue"
                placeholder="you@example.com"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-text-primary">Password</span>
              <input
                required
                minLength={8}
                type="password"
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-border-medium bg-surface-overlay px-4 py-3 text-text-primary outline-none transition focus:border-brand-blue"
                placeholder="At least 8 characters"
              />
            </label>

            {error ? (
              <div
                className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                role="alert"
              >
                {error}
              </div>
            ) : null}

            {mode === "register" ? (
              <p className="text-xs leading-relaxed text-text-muted">
                The first registered account is promoted to administrator automatically so the
                initial team can manage protected tools and permissions.
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-brand-blue to-brand-blue-dark px-5 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Working..." : copy.submitLabel}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-text-secondary">
            <span>{copy.alternateLabel}</span>
            <Link className="font-semibold text-brand-blue-light hover:text-white" href={copy.alternateHref}>
              {copy.alternateAction}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
