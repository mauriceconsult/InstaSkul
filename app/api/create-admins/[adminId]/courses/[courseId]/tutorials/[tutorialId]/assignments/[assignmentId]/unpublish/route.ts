import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ adminId: string; courseId: string; tutorialId: string; assignmentId: string; }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ownAssignment = await prisma.assignment.findUnique({
      where: {
        id: (await params).assignmentId,
        userId,
      },
    });
    if (!ownAssignment) {
      return new NextResponse("Unauthorized", { status: 401 });
    }   

    const unpublishedAssignment = await prisma.assignment.update({
      where: {
        id: (await params).assignmentId,
        tutorId: (await params).tutorialId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });
    const publishedAssignments = await prisma.assignment.findMany({
      where: {
        id: (await params).assignmentId,
        tutorId: (await params).tutorialId,
        isPublished: true,
      },
    });
    if (!publishedAssignments.length) {
      await prisma.tutor.update({
        where: {
          id: (await params).tutorialId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(unpublishedAssignment);
  } catch (error) {
    console.log("[ASSIGNMENT_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
