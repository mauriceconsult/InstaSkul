"use server";

import { db } from "@/lib/db";
import { CourseWithProgressWithAdmin } from "@/actions/get-courses";

export async function getAdminData(
  adminId: string,
  userId: string
): Promise<{
  admin: { id: string; title: string; description: string | null } | null;
  courses: CourseWithProgressWithAdmin[];
} | null> {
  if (!userId) {
    console.log(
      `[${new Date().toISOString()} getAdminData] No userId, returning null`
    );
    return null;
  }

  if (!adminId || typeof adminId !== "string") {
    console.log(
      `[${new Date().toISOString()} getAdminData] Invalid adminId, returning null`
    );
    return null;
  }

  try {
    const admin = await db.admin.findUnique({
      where: { id: adminId, isPublished: true },
      include: {
        courses: {
          where: { isPublished: true },
          include: {
            admin: {
              select: {
                id: true,
                title: true,
                userId: true,
                description: true,
                imageUrl: true,
                position: true,
                isPublished: true,
                createdAt: true,
                updatedAt: true,
                schoolId: true,
              },
            },
            tutors: {
              select: {
                id: true,
                title: true,
                isFree: true,
                position: true,
                playbackId: true,
              },
            },
            tuitions: {
              where: { userId },
              select: {
                id: true,
                userId: true,
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
              where: { userId },
              select: {
                id: true,
                userId: true,
                createdAt: true,
                updatedAt: true,
                courseId: true,
                tutorId: true,
                courseworkId: true,
                assignmentId: true,
                isEnrolled: true,
                isCompleted: true,
              },
            },
          },
          orderBy: { position: "asc" },
        },
      },
    });

    if (!admin) {
      console.log(
        `[${new Date().toISOString()} getAdminData] Admin not found for adminId: ${adminId}`
      );
      return null;
    }

    interface Tutor {
      id: string;
      title: string;
      isFree: boolean;
      position: number;
      playbackId: string | null;
    }

    interface Tuition {
      id: string;
      userId: string;
      courseId: string;
      amount: number;
      status: string;
      partyId: string | null;
      username: string | null;
      transactionId: string | null;
      isActive: boolean;
      isPaid: boolean;
      transId: string | null;
      createdAt: Date;
      updatedAt: Date;
    }

    interface UserProgress {
      id: string;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
      courseId: string;
      tutorId: string | null;
      courseworkId: string | null;
      assignmentId: string | null;
      isEnrolled: boolean;
      isCompleted: boolean;
    }

    interface AdminCourse {
      id: string;
      title: string;
      isPublished: boolean;
      position: number;
      admin: {
        id: string;
        title: string;
        userId: string;
        description: string | null;
        imageUrl: string | null;
        position: number;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        schoolId: string | null;
      };
      tutors: Tutor[];
      tuitions: Tuition[];
      userProgress: UserProgress[];
    }

    const courses: CourseWithProgressWithAdmin[] = admin.courses.map(
      (course: AdminCourse) => {
        const totalTutors: number = course.tutors.length;
        const completedTutors: number = course.userProgress.filter(
          (up: UserProgress) => up.isCompleted
        ).length;
        const progress: number =
          totalTutors > 0 ? (completedTutors / totalTutors) * 100 : 0;
        return {
          ...course,
          progress,
          tuition: course.tuitions[0] || null,
          userProgress: course.userProgress,
        } as CourseWithProgressWithAdmin;
      }
    );

    console.log(`[${new Date().toISOString()} getAdminData] Admin response:`, {
      adminId,
      title: admin.title,
      courses: courses.map((c) => ({
        id: c.id,
        title: c.title,
        progress: c.progress,
      })),
    });

    return {
      admin: {
        id: admin.id,
        title: admin.title,
        description: admin.description,
      },
      courses,
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()} getAdminData] Error:`, error);
    return null;
  }
}
