import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

function buildLoginRedirect(request: NextRequest) {
  const loginUrl = new URL("/auth/login", request.url);
  const pathWithSearch = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  loginUrl.searchParams.set("next", pathWithSearch);
  return loginUrl;
}

export function middleware(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  const { pathname } = request.nextUrl;

  if (!hasSession && (pathname.startsWith("/dashboard") || pathname.startsWith("/calculators"))) {
    return NextResponse.redirect(buildLoginRedirect(request));
  }

  if (hasSession && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/calculators/:path*", "/auth/login", "/auth/register"],
};
