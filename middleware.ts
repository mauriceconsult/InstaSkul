import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// ✅ Define which routes require auth
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/dashboard(.*)",
  "/courses(.*)",
  "/api/courses(.*)",
  "/payroll(.*)",
]);

// ✅ Define which routes are public
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/public(.*)",
  "/",
]);

// ✅ Main middleware logic
export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();

  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  if (isPublicRoute(req) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

// ✅ Tell Vercel/Next.js to run this under the Node.js runtime
export const runtime = "nodejs";

// ✅ Define where the middleware applies
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/.*|api/auth).*)"],
};
