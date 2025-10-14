// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/courses/(.*)",
  "/search",
  "/courses/(.*)",
  "/payroll(.*)",
]);

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/public(.*)",
  "/",
]);

// ✅ Clerk middleware (Node runtime only)
export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();

  // 🔒 Block protected routes if unauthenticated
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // 🪩 Redirect signed-in users away from public routes
  if (isPublicRoute(req) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

// ✅ Explicitly tell Vercel to use Node runtime (NOT Edge)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/.*|api/auth).*)",
  ],
  runtime: "nodejs",
};
