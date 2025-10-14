import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server.js";


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ adminId: string; courseId: string; tutorialId: string; }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }   
    const ownTutor = await db.tutor.findUnique({
      where: {
        id: (await params).tutorialId,
        userId,
      },
    });
    if (!ownTutor) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedTutorial = await db.tutor.update({
      where: {
        id: (await params).tutorialId,
        courseId: (await params).courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });
    const publishedTutorials = await db.tutor.findMany({
      where: {
        id: (await params).tutorialId,
        courseId: (await params).courseId,
        isPublished: true,
      },
    });
    if (!publishedTutorials.length) {
      await db.course.update({
        where: {
          id: (await params).courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(unpublishedTutorial);
  } catch (error) {
    console.log("[TUTORIAL_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
