// app/(course)/courses/[courseId]/pay/actions.ts
import { prisma } from "@/lib/prisma";

export async function processPayment(courseId: string) {
  try {
    console.log("Processing payment for courseId:", courseId);
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course) {
      console.error("Course not found:", courseId);
      throw new Error(`Course not found: ${courseId}`);
    }
    console.log("Payment processed for course:", course);
    // Add actual payment logic here (e.g., Stripe, enrollment update)
    return { success: true, course };
  } catch (error) {
    console.error("Payment processing error:", error);
    throw error;
  }
}
