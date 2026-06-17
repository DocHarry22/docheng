import { NextResponse } from "next/server";
import {
  applySessionCookie,
  authenticateUser,
  isAuthConfigured,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: "Authentication is not configured for this environment." },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (typeof body.email !== "string" || typeof body.password !== "string") {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await authenticateUser(body);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ ok: true, user });
    applySessionCookie(response, user);
    return response;
  } catch {
    return NextResponse.json(
      { error: "We could not sign you in right now." },
      { status: 500 }
    );
  }
}
