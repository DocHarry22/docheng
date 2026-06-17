import { NextResponse } from "next/server";
import {
  applySessionCookie,
  isAuthConfigured,
  registerUser,
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
      name?: string;
    };

    if (
      typeof body.email !== "string" ||
      typeof body.password !== "string" ||
      typeof body.name !== "string"
    ) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const user = await registerUser({
      email: body.email,
      password: body.password,
      name: body.name,
    });
    const response = NextResponse.json({ ok: true, user });
    applySessionCookie(response, user);
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "We could not create your account right now.",
      },
      { status: 400 }
    );
  }
}
