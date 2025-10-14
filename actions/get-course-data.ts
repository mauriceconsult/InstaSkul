"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { CourseWithProgressWithAdmin } from "./get-courses";
import { getProgress } from "./get-progress";

export async function getCourseData(
  courseId: string
): Promise<CourseWithProgressWithAdmin | null> {
  const user = await currentUser();
  if (!user) {
    console.error("[GET_COURSE_DATA_ERROR] User not authenticated");
    throw new Error("User not authenticated");
  }

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      admin: true,
      tutors: {
        where: { isPublished: true },
        select: {
          id: true,
          title: true,
          isPublished: true,
          isFree: true,
          position: true,
          playbackId: true,
        },
      },
      tuitions: {
        where: { userId: user.id },
        select: {
          id: true,
          userId: true,
          enrolleeUserId: true,
          courseId: true,
          amount: true,
          status: true,
          partyId: true,
          username: true,
          transactionId: true,
          isActive: true,
          isPaid: true,
          transId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      userProgress: {
        where: { userId: user.id },
        select: {
          id: true,
          userId: true,
          courseId: true,
          tutorId: true,
          courseworkId: true,
          assignmentId: true,
          isEnrolled: true,
          isCompleted: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!course) {
    console.error("[GET_COURSE_DATA_ERROR] Course not found");
    return null;
  }

  const progress: number = await getProgress(user.id, courseId);
  const courseWithProgress: CourseWithProgressWithAdmin = {
    ...course,
    admin: course.admin,
    tutors: course.tutors,
    progress,
    tuition:
      course.tuitions.find(
        (t) => t.userId === user.id || t.enrolleeUserId === user.id
      ) || null,
    userProgress: course.userProgress,
    tuitions: course.tuitions,
  };

  console.log(`[getCourseData] Course response:`, {
    courseId,
    course: courseWithProgress,
  });
  return courseWithProgress;
}
