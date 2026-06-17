import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import {
  isValidEmail,
  normalizeEmail,
  normalizeInterests,
} from "@/lib/validation";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, number[]>();

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const secFetchSite = request.headers.get("sec-fetch-site");

  if (secFetchSite === "cross-site") return false;
  if (!origin) return secFetchSite !== "cross-site";

  const allowedOrigins = new Set<string>();
  const requestUrl = new URL(request.url);
  allowedOrigins.add(requestUrl.origin);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      allowedOrigins.add(new URL(siteUrl).origin);
    } catch {
      return false;
    }
  }

  const extraOrigins = process.env.WAITLIST_ALLOWED_ORIGINS;
  if (extraOrigins) {
    for (const value of extraOrigins.split(",")) {
      const trimmed = value.trim();
      if (!trimmed) continue;

      try {
        allowedOrigins.add(new URL(trimmed).origin);
      } catch {
        return false;
      }
    }
  }

  return allowedOrigins.has(origin);
}

function getClientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const recentRequests = (rateLimitStore.get(clientKey) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(clientKey, recentRequests);
    return true;
  }

  recentRequests.push(now);
  rateLimitStore.set(clientKey, recentRequests);
  return false;
}

function getWaitlistFilePath() {
  if (process.env.WAITLIST_FILE_PATH) {
    return process.env.WAITLIST_FILE_PATH;
  }

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return join(process.cwd(), "data", "waitlist.csv");
}

function escapeCsv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json(
        { error: "This request origin is not allowed." },
        { status: 403 }
      );
    }

    const clientKey = getClientKey(request);
    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, interests, website } = body as {
      email?: string;
      interests?: unknown;
      website?: string;
    };

    if (website?.trim()) {
      return NextResponse.json({ ok: true });
    }

    if (typeof email !== "string") {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const normalizedEmail = normalizeEmail(email);
    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const normalizedInterests = normalizeInterests(interests);
    const waitlistFilePath = getWaitlistFilePath();
    if (!waitlistFilePath) {
      return NextResponse.json(
        { error: "Waitlist storage is not configured." },
        { status: 503 }
      );
    }

    await mkdir(dirname(waitlistFilePath), { recursive: true });

    const row = [
      new Date().toISOString(),
      normalizedEmail,
      normalizedInterests.join(";"),
    ]
      .map(escapeCsv)
      .join(",");

    await appendFile(waitlistFilePath, row + "\n", "utf-8");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
