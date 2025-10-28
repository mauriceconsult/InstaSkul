import { prisma } from "@/lib/db";
import { Course, UserProgress } from "@prisma/client";

type CourseWithProgress = Course & { userProgress: UserProgress[] };

export async function getDashboardCourses(): Promise<{
  coursesInProgress: CourseWithProgress[];
  completedCourses: CourseWithProgress[];
}> {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        userProgress: true,
      },
    });
    console.log("Courses fetched:", courses);

    const coursesInProgress = courses.filter((course) =>
      course.userProgress.some((progress) => !progress.isCompleted)
    );
    const completedCourses = courses.filter((course) =>
      course.userProgress.every((progress) => progress.isCompleted)
    );

    console.log("Courses in progress:", coursesInProgress);
    console.log("Completed courses:", completedCourses);

    return { coursesInProgress, completedCourses };
  } catch (error) {
    console.error("Database query failed:", error);
    return { coursesInProgress: [], completedCourses: [] };
  }
}