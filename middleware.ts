import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // no public routes; all require Clerk auth
  publicRoutes: ["/api/health", "/api/public/hello"],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
