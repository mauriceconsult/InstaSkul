// app/api/courses/[courseId]/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    console.log("Course route courseId:", (await params).courseId);
    const course = await prisma.course.findUnique({
      where: { id: (await params).courseId },
    });
    console.log("Course route fetched:", course);
    if (!course) {
      return NextResponse.json(
        { error: `Course not found: ${(await params).courseId}` },
        { status: 404 }
      );
    }
    return NextResponse.json(course);
  } catch (error) {
    console.error("Course route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
