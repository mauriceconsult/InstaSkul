export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/.*|api/auth).*)"],
  runtime: "nodejs", // ✅ Force Node runtime
};

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/dashboard(.*)",
  "/courses(.*)",
  "/api/courses(.*)",
  "/payroll(.*)",
]);

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/public(.*)",
  "/",
]);

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
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/.*|api/auth).*)"],
  runtime: "nodejs", // ✅ add this line
};
