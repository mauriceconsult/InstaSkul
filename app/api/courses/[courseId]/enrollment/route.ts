import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { courseId } = await params; // Await params to resolve courseId

  const enrollment = await prisma.userProgress.findFirst({
    where: { userId, courseId, isEnrolled: true },
    select: { isEnrolled: true },
  });

  return NextResponse.json({ isEnrolled: !!enrollment });
}
