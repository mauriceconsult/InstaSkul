import { prisma } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedTutorials = await prisma.tutor.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });
    const publishedTutorialsIds = publishedTutorials.map(
      (tutorial) => tutorial.id
    );
    const validCompletedTutorials = await prisma.userProgress.count({
      where: {
        userId: userId,
        tutorId: {
          in: publishedTutorialsIds,
        },
        isCompleted: true,
      },
    });
    const progressPercentage =
      (validCompletedTutorials / publishedTutorialsIds.length) * 100;
    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
};



