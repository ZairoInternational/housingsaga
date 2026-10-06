import { withAuth } from "next-auth/middleware";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

import { defaultLocale, isLocale } from "@/i18n/config";

function withDefaultLocale(request: NextRequestWithAuth, response: NextResponse) {
  if (!isLocale(request.cookies.get("locale")?.value)) {
    response.cookies.set("locale", defaultLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return response;
}

// Routes that don't require onboarding
const unprotectedRoutes = [
  "/sign-in",
  "/sign-up",
  "/onboarding",
];  

// API routes are handled separately
const apiRoutes = /^\/api\//;

export default withAuth(function middleware(request: NextRequestWithAuth) {
  const token = request.nextauth.token;
  const pathname = request.nextUrl.pathname;

  // Allow API routes (they have their own auth checks)
  if (apiRoutes.test(pathname)) {
    return withDefaultLocale(request, NextResponse.next());
  }

  // Private owner portal uses its own PIN session, not the main site login.
  if (pathname.startsWith("/owner-access")) {
    const response = NextResponse.next();
    response.headers.set("Referrer-Policy", "no-referrer");
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  // Allow unprotected routes
  if (unprotectedRoutes.some(route => pathname.startsWith(route))) {
    return withDefaultLocale(request, NextResponse.next());
  }

  // Check if user is not onboarded
  if (token && !token.onboarded) {
    console.log("[Middleware] User not onboarded, redirecting to /onboarding");
    return withDefaultLocale(
      request,
      NextResponse.redirect(new URL("/onboarding", request.url)),
    );
  }

  return withDefaultLocale(request, NextResponse.next());
}, {
  callbacks: {
    authorized: () => {
      // Route-level checks use request.nextauth.token in the middleware function above.
      return true;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
