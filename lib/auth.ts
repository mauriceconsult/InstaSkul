// lib/auth.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { redirect } from "next/navigation";

/**
 * ✅ For server components (redirects if not signed in)
 */
export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return { userId };
}

/**
 * ✅ For API routes (returns a NextResponse if unauthorized)
 */
export async function requireApiAuth(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return { userId };
}

/**
 * 🧠 Optional: Get auth info without enforcing redirect
 */
export async function getAuthUser() {
  const { userId, sessionId, getToken } = await auth();
  return { userId, sessionId, getToken };
}
