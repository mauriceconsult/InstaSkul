import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server.js";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      adminId: string;
      courseId: string;
    }>;
  }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ownCourse = await prisma.course.findUnique({
      where: {
        id: (await params).courseId,
        userId,
      },
    });
    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const unpublishedCourse = await prisma.course.update({
      where: {
        id: (await params).courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });
    const publishedCourse = await prisma.course.findMany({
      where: {
        id: (await params).courseId,
        isPublished: true,
      },
    });
    if (!publishedCourse.length) {
      await prisma.course.update({
        where: {
          id: (await params).courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log("[COURSE_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
