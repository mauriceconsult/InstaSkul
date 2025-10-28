import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server.js";


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ adminId: string; noticeboardId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ownFaculty = await prisma.admin.findUnique({
      where: {
        id: (await params).adminId,
        userId,
      },
    });
    if (!ownFaculty) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ownNotice = await prisma.noticeboard.findUnique({
      where: {
        id: (await params).noticeboardId,
        userId,
      },
    });
    if (!ownNotice) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedNoticeboard = await prisma.noticeboard.update({
      where: {
        id: (await params).noticeboardId,
        adminId: (await params).adminId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });
    const publishedNoticeboards = await prisma.noticeboard.findMany({
      where: {
        id: (await params).noticeboardId,
        adminId: (await params).adminId,
        isPublished: true,
      },
    });
    if (!publishedNoticeboards.length) {
      await prisma.admin.update({
        where: {
          id: (await params).adminId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(unpublishedNoticeboard);
  } catch (error) {
    console.log("[NOTICEBOARD_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
