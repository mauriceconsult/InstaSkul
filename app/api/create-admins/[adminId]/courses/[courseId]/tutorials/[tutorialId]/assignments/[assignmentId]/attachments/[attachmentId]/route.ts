import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      adminId: string;
      courseId: string;
      tutorialId: string;
      assignmentId: string;
      attachmentId: string;
    }>;
  }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const assignmentOwner = await prisma.assignment.findUnique({
      where: {
        id: (await params).assignmentId,
        userId: userId,
      },
    });
    if (!assignmentOwner) {
      return new NextResponse("Unathorized", { status: 401 });
    }
    const attachment = await prisma.attachment.delete({
      where: {
        assignmentId: (await params).assignmentId,
        id: (await params).attachmentId,
      },
    });
    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ASSIGNMENT_ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
