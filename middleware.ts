import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/health",
  "/api/public(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const url = req.nextUrl.clone();

  if (!userId && !isPublicRoute(req)) {
    url.pathname = "/sign-in";
    url.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(url);
  }

  if (userId && url.pathname === "/root") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
