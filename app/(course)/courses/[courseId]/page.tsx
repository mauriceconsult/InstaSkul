// D:\lms\app\(dashboard)\(routes)\courses\[courseId]\page.tsx
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const user = await currentUser();

  if (!user || !user.id) {
    console.error(
      `[${new Date().toISOString()} CoursePage] Unauthorized access for course ${courseId}`
    );
    return redirect("/sign-in");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
    include: {
      tutors: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    console.error(
      `[${new Date().toISOString()} CoursePage] Course not found or not published: ${courseId}`
    );
    return redirect("/");
  }

  const userProgress = await db.userProgress.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: courseId,
      },
    },
    select: { isEnrolled: true },
  });

  if (!userProgress?.isEnrolled) {
    console.log(
      `[${new Date().toISOString()} CoursePage] User ${
        user.id
      } not enrolled in course ${courseId}`
    );
    return redirect(`/courses/${courseId}/pay`);
  }

  console.log(
    `[${new Date().toISOString()} CoursePage] User ${
      user.id
    } enrolled in course ${courseId}, redirecting to first tutor`
  );

  return redirect(
    `/courses/${course.id}/tutorials/${course.tutors[0]?.id || ""}`
  );
};

export default CourseIdPage;
