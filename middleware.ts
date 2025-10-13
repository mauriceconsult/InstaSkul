import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server.js";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/courses/(.*)",
  "/search",
  "/courses/(.*)",
  "/payroll/(.*)",
]);

export default clerkMiddleware((auth, req: NextRequest) => {
  console.log("Middleware processing:", req.url);

  const sessionCookie = req.cookies.get("__session")?.value;
  console.log("__session cookie:", sessionCookie || "Not found");

  const { userId, sessionId } = auth(); // ✅ Only access needed values
  console.log("User ID:", userId);
  console.log("Session ID:", sessionId);

  if (isProtectedRoute(req)) {
    if (!userId) {
      console.log("Redirecting to sign-in, no userId found");
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/.*|api/auth).*)"],
};
