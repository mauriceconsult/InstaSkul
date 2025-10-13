import { db } from "@/lib/db.js";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server.js";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      payrollId: string;
    }>;
  }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ownPayroll = await db.payroll.findUnique({
      where: {
        id: (await params).payrollId,
        userId,
      },
    });
    if (!ownPayroll) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const payroll = await db.payroll.findUnique({
      where: {
        id: (await params).payrollId,
        userId,
      },
      include: {
        attachments: true,
      },
    });
    if (
      !payroll ||   
      !payroll.title     
    ) {
      return new NextResponse("Missing credentials", { status: 400 });
    }

    const publishedpayroll = await db.payroll.update({
      where: {
        id: (await params).payrollId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedpayroll);
  } catch (error) {
    console.log("[PAYROLL_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
