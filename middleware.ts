import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default authMiddleware({
  publicRoutes: ["/sign-in(.*)", "/sign-up(.*)", "/api/health", "/api/public(.*)"],

  afterAuth(auth, req: NextRequest) {
    // Redirect unauthenticated users trying to access protected pages
    if (!auth.userId && !req.nextUrl.pathname.match(/^\/(sign-in|sign-up|api\/health|api\/public)/)) {
      const url = req.nextUrl.clone();
      url.pathname = "/sign-in";
      url.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(url);
    }

    // Optional: redirect authenticated users away from landing page
    // if (auth.userId && req.nextUrl.pathname === "/") {
    //   return NextResponse.redirect(new URL("/dashboard", req.url));
    // }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

export const runtime = "nodejs";
