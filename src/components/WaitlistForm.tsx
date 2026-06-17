"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  isValidEmail,
  normalizeEmail,
  WAITLIST_INTERESTS,
} from "@/lib/validation";

const interests = [
  { id: WAITLIST_INTERESTS[0], label: "Desk" },
  { id: WAITLIST_INTERESTS[1], label: "ChatPDF" },
  { id: WAITLIST_INTERESTS[2], label: "Resume Parser" },
  { id: WAITLIST_INTERESTS[3], label: "Course Compass" },
  { id: WAITLIST_INTERESTS[4], label: "Student App" },
  { id: WAITLIST_INTERESTS[5], label: "Research AI" },
];

interface WaitlistFormProps {
  showInterests?: boolean;
  compact?: boolean;
}

export default function WaitlistForm({
  showInterests = false,
  compact = false,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [website, setWebsite] = useState("");

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const normalized = normalizeEmail(email);
    if (!normalized || !isValidEmail(normalized)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalized,
          interests: selectedInterests,
          website,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Submission failed.");
      }

      setSubmitted(true);
      setEmail("");
      setSelectedInterests([]);
      setWebsite("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={compact ? "" : "max-w-lg mx-auto"}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-8"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-400/10 mb-4">
              <CheckCircle2 size={24} className="text-emerald-400" />
            </div>
            <p className="text-lg font-semibold text-white mb-1.5">
              You&apos;re on the list!
            </p>
            <p className="text-sm text-text-muted">
              We&apos;ll notify you when early access is available.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Interest chips - cleaner design */}
            {showInterests && (
              <div className="mb-7">
                <p className="text-[11px] text-text-muted mb-3 text-center uppercase tracking-wider">
                  Interests (optional)
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {interests.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                        selectedInterests.includes(item.id)
                          ? "bg-white text-[#0a0a12]"
                          : "text-text-muted border border-white/8 hover:border-white/15 hover:text-white bg-white/2"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Email form - premium, focused */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch gap-3"
              noValidate
              aria-busy={submitting}
            >
              <div className="hidden" aria-hidden="true">
                <label htmlFor="waitlist-website">Company website</label>
                <input
                  id="waitlist-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="relative flex-1">
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  aria-invalid={!!error}
                  aria-describedby={error ? "waitlist-error" : undefined}
                  className={`w-full h-full px-5 py-4 bg-white/4 border rounded-xl text-white placeholder:text-text-muted/70 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base transition-all ${
                    error ? "border-red-500/50" : "border-white/8 hover:border-white/15"
                  }`}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-[#0a0a12] rounded-xl font-semibold text-[15px] transition-all duration-200 hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base disabled:opacity-60 disabled:pointer-events-none"
              >
                {submitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <span>Join Waitlist</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Error message */}
            {error && (
              <p
                id="waitlist-error"
                role="alert"
                className="flex items-center justify-center gap-1.5 text-[13px] text-red-400 mt-3"
              >
                <AlertCircle size={14} />
                {error}
              </p>
            )}

            {/* Trust signals - minimal */}
            <p className="text-center text-[11px] text-text-muted/60 mt-5">
              Free forever · No spam · Unsubscribe anytime
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
