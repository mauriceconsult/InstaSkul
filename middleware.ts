import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in(.*)", "/sign-up(.*)", "/api/public(.*)"],
  afterAuth(auth, req: NextRequest) {
    const url = req.nextUrl.clone();
    if (!auth.userId && !url.pathname.startsWith("/sign-in") && !url.pathname.startsWith("/sign-up")) {
      url.pathname = "/sign-in";
      url.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(url);
    }
    if (auth.userId && (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))) {
      url.pathname = "/dashboard/dashboard";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};

export const runtime = "nodejs";