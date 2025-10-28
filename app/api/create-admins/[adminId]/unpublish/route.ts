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
    }>
  }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ownAdmin = await prisma.admin.findUnique({
      where: {
        id: (await params).adminId,
        userId,
      },
    });
    if (!ownAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }   
    const unpublishedadmin = await prisma.admin.update({
      where: {
        id: (await params).adminId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });
    const publishedadmin = await prisma.admin.findMany({
      where: {
        id: (await params).adminId,
        isPublished: true,
      }
    });
    if (!publishedadmin.length) {
      await prisma.admin.update({
        where: {
          id: (await params).adminId,
        },
        data: {
          isPublished: false,
        }
      })
    } 
    return NextResponse.json(unpublishedadmin);
  } catch (error) {
    console.log("[ADMIN_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
