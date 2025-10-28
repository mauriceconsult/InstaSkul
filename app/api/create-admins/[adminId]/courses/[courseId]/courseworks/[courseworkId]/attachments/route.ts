import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ adminId: string; courseId: string; courseworkId: string; }>}
) {
  try {
    const userId = await auth();
    const { url } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseworkOwner = await prisma.coursework.findUnique({
      where: {
        id: (await params).courseworkId,
      },
    });
    if (!courseworkOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const attachment = await prisma.attachment.create({
      data: {
        url,       
        courseworkId: (await params).courseworkId,       
      }
    });
    return NextResponse.json(attachment)
  } catch (error) {
    console.log("COURSEWORK_ID_ATTACHMENT", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}