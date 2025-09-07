// app/(course)/courses/[courseId]/pay/actions.ts
import { prisma } from "@/lib/prisma";

export async function processPayment(courseId: string) {
  try {
    console.log("Processing payment for courseId:", courseId);
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course) {
      throw new Error(`Course not found: ${courseId}`);
    }
    console.log("Payment processed for course:", course);
    return { success: true, course };
  } catch (error) {
    console.error("Payment processing error:", error);
    throw error;
  }
}
