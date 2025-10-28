import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ adminId: string; courseId: string }> }
) {
  try {
    const { userId } = await auth();
    const { title } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
   
    const lastCourse = await prisma.course.findFirst({
      where: {
        id: (await params).courseId,
      },
      orderBy: {
        position: "desc",
      },
    });
    const newPosition = lastCourse ? (lastCourse.position ?? 0) + 1 : 1;
    const course = await prisma.course.create({
      data: {
        title,
        id: (await params).courseId,
        position: newPosition,
        userId,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ adminId: string; courseId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const adminOwner = prisma.admin.findUnique({
      where: {
        id: (await params).adminId,
        userId: userId,
      },
    });
    if (!adminOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = prisma.course.findUnique({
      where: {
        id: (await params).courseId,
        userId: userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await prisma.course.findUnique({
      where: {
        id: (await params).courseId,
        userId: userId,
      },
      include: {
        tutors: {
          where: {
            isPublished: true,
          },
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }
    const deletedFaculty = await prisma.admin.delete({
      where: {
        id: (await params).adminId,
        userId: userId,
      },
    });
    return NextResponse.json(deletedFaculty);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
