// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define route matchers
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/courses/(.*)",
  "/search",
  "/courses/(.*)",
  "/payroll(.*)",
  "/dashboard(.*)",
]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/public(.*)",
]);

// Main middleware
export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect signed-in users away from public pages (optional)
  if (isPublicRoute(req) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

// Middleware configuration
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/.*|api/auth).*)"],
};

// Force Node.js runtime (avoid Edge errors)
export const runtime = "nodejs";
