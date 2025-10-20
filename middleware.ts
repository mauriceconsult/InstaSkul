import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/sign-in(.*)", "/sign-up(.*)", "/api/health", "/api/public(.*)"],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // protect everything except static assets
};
