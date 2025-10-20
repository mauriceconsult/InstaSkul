import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/api/health", "/api/public/hello"],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
