import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ courseId: string; tutorialId: string }> }
) {
  try {
    const { userId } = await auth();
    const { isCompleted } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const resolvedParams = await params;
    const { courseId, tutorialId } = resolvedParams;

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_tutorId: {
          userId,
          tutorId: tutorialId, // Map tutorialId from URL to tutorId in schema
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        tutorId: tutorialId,
        courseId, // Required field
        isCompleted,
      },
    });

    // Revalidate paths to update UI
    revalidatePath(`/courses/${courseId}/tutorials/${tutorialId}`);
    revalidatePath(`/courses/${courseId}`);

    return NextResponse.json(userProgress);
  } catch (error) {
    console.error("[TUTORIAL_ID_PROGRESS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
