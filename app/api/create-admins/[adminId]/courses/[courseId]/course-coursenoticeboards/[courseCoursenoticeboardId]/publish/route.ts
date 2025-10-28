import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      adminId: string;
      courseId: string;
      courseCoursenoticeboardId: string;
    }>;
  }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ownCourseNoticeboard = await prisma.courseNoticeboard.findUnique({
      where: {
        id: (await params).courseCoursenoticeboardId,
        userId,
      },
    });
    if (!ownCourseNoticeboard) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseNoticeboard = await prisma.courseNoticeboard.findUnique({
      where: {
        id: (await params).courseCoursenoticeboardId,
        userId,
      },     
    });

    if (
      !courseNoticeboard ||
      !courseNoticeboard.description ||
      !courseNoticeboard.title    
   
    ) {
      return new NextResponse("Missing credentials", { status: 400 });
    }

    const publishedcourseNoticeboard = await prisma.courseNoticeboard.update({
      where: {
        id: (await params).courseCoursenoticeboardId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedcourseNoticeboard);
  } catch (error) {
    console.log("[COURSE_NOTICEBOARD_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
