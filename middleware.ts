import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes using createRouteMatcher
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/public(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Await the auth() promise to get userId and redirectToSignIn
  const { userId, redirectToSignIn } = await auth();

  const url = req.nextUrl.clone();

  // If user is not authenticated and the route is not public, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    url.pathname = "/sign-in";
    url.searchParams.set("redirect_url", req.url);
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // If user is authenticated and trying to access sign-in or sign-up, redirect to dashboard
  if (userId && (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};

export const runtime = "nodejs";