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
      noticeboardId: string;
    }>;
  }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const admin = await prisma.admin.findUnique({
      where: {
        id: (await params).adminId,
        userId,
      },
    });
    if (!admin) {
      return new NextResponse("Not found", { status: 404 });
    }

    const noticeboard = await prisma.noticeboard.findUnique({
      where: {
        id: (await params).noticeboardId,
        adminId: (await params).adminId,
      },
    });
    // const hasPublishedNotice = noticeboard?.tutors?.some((tutor) => tutor.isPublished);

    if (!noticeboard || !noticeboard.description || !noticeboard.title) {
      return new NextResponse("Missing credentials", { status: 400 });
    }
    const publishedCourse = await prisma.noticeboard.update({
      where: {
        id: (await params).noticeboardId,
        adminId: (await params).adminId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[NOTICEBOARD_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
