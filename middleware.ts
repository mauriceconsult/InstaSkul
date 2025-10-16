// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// ✅ Define which routes require authentication
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/courses/(.*)",
  "/search",
  "/courses/(.*)",
  "/payroll(.*)",
]);

// ✅ Define public routes (optional)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/public(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();

  // 🔒 Redirect unauthenticated users
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // 🪩 Redirect signed-in users away from public routes (optional)
  if (isPublicRoute(req) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

// ✅ Tell Vercel to run this in Node.js runtime (not Edge)
export const runtime = "nodejs";

// ✅ Configure matcher (which routes trigger middleware)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/.*|api/auth).*)"],
};
