// actions/get-dashboard-courses.ts
import prisma from "@/lib/prisma";

export async function getDashboardCourses() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        // userProgress: { /* ... */ } // Adjust based on your schema
      },
      include: {
        userProgress: true, // Include related data if needed
      },
    });
    console.log("Raw courses:", courses);

    // Example: Split courses into in-progress and completed
    const coursesInProgress = courses.filter((course) =>
      course.userProgress?.some((progress) => !progress.isCompleted)
    );
    const completedCourses = courses.filter((course) =>
      course.userProgress?.every((progress) => progress.isCompleted)
    );

    console.log("Courses in progress:", coursesInProgress);
    console.log("Completed courses:", completedCourses);

    return { coursesInProgress, completedCourses };
  } catch (error) {
    console.error("Database query failed:", error);
    return { coursesInProgress: [], completedCourses: [] }; // Fallback
  }
}
