import { prisma } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ assignmentId: string }> }
) {
  const { userId } = getAuth(req);
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { text, fileUrl } = await req.json();

  // CORRECT: Check via tutor → course
  const assignment = await prisma.assignment.findUnique({
    where: { id: (await params).assignmentId },
    select: {
      isPublished: true,
      tutor: { select: { courseId: true } },
    },
  });

  if (!assignment?.isPublished)
    return new Response("Assignment not published", { status: 400 });

  const courseId = assignment.tutor?.courseId;
  if (!courseId) return new Response("Invalid assignment", { status: 400 });

  // Check enrollment
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: { userId, courseId },
    },
  });

  if (!enrollment)
    return new Response("Not enrolled in course", { status: 403 });

  const submission = await prisma.assignmentSubmission.upsert({
    where: {
      assignmentId_userId: { assignmentId: (await params).assignmentId, userId },
    },
    update: { text, fileUrl, submittedAt: new Date() },
    create: { assignmentId: (await params).assignmentId, userId, text, fileUrl },
  });

  return Response.json(submission);
}