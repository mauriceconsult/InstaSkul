import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      payrollId: string; 
    }>
  }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ownPayroll = await prisma.payroll.findUnique({
      where: {
        id: (await params).payrollId,
        userId,
      },
    });
    if (!ownPayroll) {
      return new NextResponse("Unauthorized", { status: 401 });
    }   
    const unpublishedpayroll = await prisma.payroll.update({
      where: {
        id: (await params).payrollId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });
    const publishedpayroll = await prisma.payroll.findMany({
      where: {
        id: (await params).payrollId,
        isPublished: true,
      }
    });
    if (!publishedpayroll.length) {
      await prisma.payroll.update({
        where: {
          id: (await params).payrollId,
        },
        data: {
          isPublished: false,
        }
      })
    } 
    return NextResponse.json(unpublishedpayroll);
  } catch (error) {
    console.log("[PAYROLL_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
