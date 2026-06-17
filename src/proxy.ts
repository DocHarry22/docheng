import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth-constants";

const PROTECTED_PREFIXES = ["/dashboard", "/calculators"] as const;
const AUTH_ROUTES = ["/auth/login", "/auth/register"] as const;

function buildLoginRedirect(request: NextRequest) {
  const loginUrl = new URL("/auth/login", request.url);
  const pathWithSearch = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  loginUrl.searchParams.set("next", pathWithSearch);
  return loginUrl;
}

export function proxy(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  const { pathname } = request.nextUrl;
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isAuthRoute = AUTH_ROUTES.includes(pathname as (typeof AUTH_ROUTES)[number]);

  if (!hasSession && isProtectedRoute) {
    return NextResponse.redirect(buildLoginRedirect(request));
  }

  if (hasSession && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...PROTECTED_PREFIXES.map((prefix) => `${prefix}/:path*`), ...AUTH_ROUTES],
};
