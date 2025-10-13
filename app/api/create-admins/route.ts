import { db } from "@/lib/db.js";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server.js";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { title } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }
    const admin = await db.admin.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json(admin);
  } catch (error) {
    console.log("[CREATE_ADMINS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
