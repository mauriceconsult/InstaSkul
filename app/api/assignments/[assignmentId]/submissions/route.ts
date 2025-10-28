import { prisma } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ assignmentId: string }> }
) {
  const { userId } = getAuth(_req);
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const submissions = await prisma.assignmentSubmission.findMany({
    where: { assignmentId: (await params).assignmentId },
    select: {
      id: true,
      userId: true,
      text: true,
      fileUrl: true,
      submittedAt: true,
      isGraded: true,
      grade: true,
      feedback: true,
    },
    orderBy: { submittedAt: "desc" },
  });

  return Response.json(submissions);
}