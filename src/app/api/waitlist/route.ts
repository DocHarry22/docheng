import { NextResponse } from "next/server";
import { existsSync, mkdirSync, appendFileSync } from "fs";
import { join } from "path";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, interests } = body as {
      email?: string;
      interests?: string[];
    };

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Persist to a local CSV file (swap for a database / third-party service in production)
    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

    const row = [
      new Date().toISOString(),
      email,
      (interests ?? []).join(";"),
    ].join(",");

    appendFileSync(join(dataDir, "waitlist.csv"), row + "\n", "utf-8");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
