import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/health",
  "/api/public(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl.clone();

  // Redirect unauthenticated users to sign-in
  if (!userId && !isPublicRoute(req)) {
    url.pathname = "/sign-in";
    url.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(url);
  }

  // Proceed as normal
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
