import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server.js";


export async function POST(
  req: Request,
  { params }: { params: Promise<{ adminId: string }> }
) {
  try {
    const { userId } = await auth();
    const { title } = await req.json();
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
    const lastAdmin = await prisma.admin.findFirst({
      where: {
        id: (await params).adminId,
      },
      orderBy: {
        position: "desc",
      },
    });
    const newPosition = lastAdmin ? (lastAdmin.position ?? 0) + 1 : 1;
    const admin = await prisma.admin.create({
      data: {
        title,
        id: (await params).adminId,
        position: newPosition,
        userId,
      },
    });

    return NextResponse.json(admin);
  } catch (error) {
    console.log("[ADMIN]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ adminId: string }> }
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
      include: {
        courses: {
          where: {
            isPublished: true,
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
        },
      },
    });
    if (!adminOwner) {
      return new NextResponse("Not found", { status: 404 });
    }
    const deletedAdmin = await prisma.admin.delete({
      where: {
        id: (await params).adminId,
        userId: userId,
      },
    });
    return NextResponse.json(deletedAdmin);
  } catch (error) {
    console.log("[ADMIN_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
