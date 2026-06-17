export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MAX_EMAIL_LENGTH = 254;

export const WAITLIST_INTERESTS = [
  "desk",
  "chatpdf",
  "resume",
  "compass",
  "student",
  "research",
] as const;

export type WaitlistInterest = (typeof WAITLIST_INTERESTS)[number];

const allowedInterestSet = new Set<string>(WAITLIST_INTERESTS);

export function isValidEmail(email: string) {
  return email.length <= MAX_EMAIL_LENGTH && EMAIL_REGEX.test(email);
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizeInterests(interests: unknown): WaitlistInterest[] {
  if (!Array.isArray(interests)) return [];

  return Array.from(
    new Set(
      interests
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter((value): value is WaitlistInterest => allowedInterestSet.has(value))
    )
  ).slice(0, WAITLIST_INTERESTS.length);
}
