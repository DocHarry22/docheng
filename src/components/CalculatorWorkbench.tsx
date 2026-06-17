"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getCalculatorBySlug,
  type CalculatorDefinition,
} from "@/lib/calculators";

function formatResult(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (Math.abs(value) >= 1000) {
    return value.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
  }

  return value.toLocaleString(undefined, {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 4,
  });
}

function getStorageKey(slug: string) {
  return `docheng-calculator:${slug}`;
}

export default function CalculatorWorkbench({ slug }: { slug: string }) {
  const calculator = getCalculatorBySlug(slug);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!calculator) return;

    const stored = window.localStorage.getItem(getStorageKey(slug));
    if (!stored) {
      setInputs(
        Object.fromEntries(calculator.fields.map((field) => [field.key, ""]))
      );
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Record<string, string>;
      setInputs(
        Object.fromEntries(
          calculator.fields.map((field) => [field.key, parsed[field.key] ?? ""])
        )
      );
    } catch {
      setInputs(
        Object.fromEntries(calculator.fields.map((field) => [field.key, ""]))
      );
    }
  }, [calculator, slug]);

  useEffect(() => {
    if (!calculator || Object.keys(inputs).length === 0) return;
    window.localStorage.setItem(getStorageKey(slug), JSON.stringify(inputs));
  }, [calculator, inputs, slug]);

  const calculation = useMemo(() => {
    if (!calculator) {
      return null;
    }

    const parsedValues: Record<string, number> = {};

    for (const field of calculator.fields) {
      const rawValue = inputs[field.key];
      const value = Number(rawValue);
      if (!rawValue || Number.isNaN(value) || !Number.isFinite(value)) {
        return null;
      }

      if (typeof field.min === "number" && value < field.min) {
        return null;
      }

      parsedValues[field.key] = value;
    }

    return calculator.compute(parsedValues);
  }, [calculator, inputs]);

  if (!calculator) {
    return null;
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
      <section className="glass rounded-3xl p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-brand-blue-light">
            Inputs
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-text-primary">
            {calculator.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Saved automatically in your browser so you can continue iterating.
          </p>
        </div>

        <div className="space-y-4">
          {calculator.fields.map((field) => (
            <label key={field.key} className="block space-y-2">
              <span className="text-sm font-medium text-text-primary">{field.label}</span>
              <div className="flex items-center rounded-2xl border border-border-medium bg-surface-overlay px-4">
                <input
                  type="number"
                  min={field.min}
                  step={field.step ?? 0.01}
                  value={inputs[field.key] ?? ""}
                  onChange={(event) =>
                    setInputs((current) => ({
                      ...current,
                      [field.key]: event.target.value,
                    }))
                  }
                  placeholder={field.placeholder}
                  className="w-full bg-transparent py-3 text-text-primary outline-none"
                />
                {field.unit ? (
                  <span className="text-xs font-medium text-text-muted">{field.unit}</span>
                ) : null}
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border-medium/70 bg-linear-to-b from-surface-card/95 to-surface-overlay/95 p-6 sm:p-8">
        {calculation ? (
          <>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/8 p-5">
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-emerald-300">
                Result
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-text-primary">
                {calculation.headline}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {calculation.summary}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {calculation.results.map((result) => (
                <div
                  key={result.label}
                  className="rounded-2xl border border-border-medium/70 bg-surface-card/75 p-5"
                >
                  <p className="text-xs font-semibold tracking-[0.12em] uppercase text-text-label">
                    {result.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-text-primary">
                    {formatResult(result.value)}
                  </p>
                  {result.unit ? (
                    <p className="mt-1 text-sm text-text-secondary">{result.unit}</p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border-medium/70 bg-surface-card/60 p-5">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-text-label">
                Engineering notes
              </p>
              <ul className="mt-3 space-y-3 text-sm leading-relaxed text-text-secondary">
                {calculation.notes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="glass rounded-3xl p-6 sm:p-8">
            <p className="text-sm font-semibold tracking-[0.15em] uppercase text-brand-orange-light">
              Waiting for inputs
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-text-primary">
              Add all required values to run the calculation
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Every field must contain a valid number that meets the minimum range before results
              are generated.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
