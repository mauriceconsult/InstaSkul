import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 new type
) {
  const { params } = context; // 👈 await the params
  const { id } =await params;

  const authResult = await requireApiAuth(req);
  if (authResult instanceof NextResponse) return authResult; // Unauthorized

  const { userId } = authResult;

  // Simulated course fetch (replace with real DB call)
  const course = { id, title: "TypeScript Mastery", owner: userId };

  return NextResponse.json({ course });
}
