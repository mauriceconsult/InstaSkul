// app/api/courses/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await requireApiAuth(req);
  if (authResult instanceof NextResponse) return authResult; // Unauthorized

  const { userId } = authResult;
  const { id } = params;

  // Simulated course fetch (replace with your DB logic)
  const course = { id, title: "TypeScript Mastery", owner: userId };

  return NextResponse.json({ course });
}
