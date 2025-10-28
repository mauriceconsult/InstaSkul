import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server.js";


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ adminId: string; courseId: string; tutorialId: string; }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }    
    
    const tutorial = await prisma.tutor.findUnique({
      where: {
        id: (await params).tutorialId,
        courseId: (await params).courseId,
        userId,
      },
    });
    if (!tutorial) {
      return new NextResponse("Not found", { status: 404 });
    }
    const deletedTutorial = await prisma.tutor.delete({
      where: {
        id: (await params).tutorialId,
      },
    });
    return NextResponse.json(deletedTutorial);
  } catch (error) {
    console.log("[TUTORIAL_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ adminId: string; courseId: string; tutorialId: string; }> }
) {
  try {
    const { userId } = await auth();
    const { tutorialId } = await params;
    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unathorized", { status: 401 });
    }    
    const tutorial = await prisma.tutor.update({
      where: {
        id: tutorialId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(tutorial);
  } catch (error) {
    console.log("[TUTORIAL_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
