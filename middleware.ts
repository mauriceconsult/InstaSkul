import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// ✅ Define protected routes
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/dashboard(.*)",
  "/courses(.*)",
  "/api/courses(.*)",
  "/payroll(.*)",
]);

// ✅ Define explicitly public routes
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/public(.*)",
  "/",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();

  // 🔒 Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // 🪩 Redirect authenticated users away from public routes
  if (isPublicRoute(req) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ Allow normal request flow
  return NextResponse.next();
});

// ✅ Define routes middleware applies to
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/.*|api/auth).*)",
  ],
};

// ✅ Force runtime to Node.js (required for Clerk)
export const runtime = "nodejs";
