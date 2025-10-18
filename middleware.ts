import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/sign-in(.*)", "/sign-up(.*)"],
});

export const config = {
  matcher: [
    // Match all routes except static assets and API
    "/((?!_next|.*\\..*|favicon.ico|api).*)",
  ],
};
