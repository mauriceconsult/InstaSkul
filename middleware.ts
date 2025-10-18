import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Only these routes are public (no Clerk login required)
  publicRoutes: ["/sign-in", "/sign-up"],
});

export const config = {
  // This pattern protects everything except static assets and Next internals
  matcher: ["/((?!_next|.*\\..*).*)"],
};
