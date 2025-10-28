// POST: Grade submission
import { prisma } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ assignmentId: string }> }
) {
  const { userId } = getAuth(req);
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { submissionId, grade, feedback } = await req.json();

  const updated = await prisma.assignmentSubmission.update({
    where: { id: submissionId },
    data: { isGraded: true, grade, feedback },
  });

  return Response.json(updated);
}