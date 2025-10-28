import { prisma } from "@/lib/db";
import { Attachment, CourseNoticeboard } from "@prisma/client";

interface GetCourseNoticeboardProps {
  userId: string;
  courseId: string;
  courseNoticeboardId: string;
}
export const getCourseNoticeboard = async ({
  userId,
  courseId,
  courseNoticeboardId,
}: GetCourseNoticeboardProps) => {
  try {   
    const course = await prisma.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },   
    });
    const courseNoticeboard = await prisma.courseNoticeboard.findUnique({
      where: {
        id: courseNoticeboardId,
        isPublished: true,
      },
    });
    if (!course || !courseNoticeboard) {
      throw new Error("Course or Course Noticeboard not found");
    }
    let attachments: Attachment[] = [];
    let nextCourseNoticeboard: CourseNoticeboard | null = null;
    if (userId) {
      attachments = await prisma.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }
    if (courseNoticeboard.userId || userId) {    
      nextCourseNoticeboard = await prisma.courseNoticeboard.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: courseNoticeboard?.position ?? 0,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    return {
      courseNoticeboard,
      course,      
      attachments,
      nextCourseNoticeboard,  
    };
  } catch (error) {
    console.log("[GET_TUTOR_ERROR]", error);
    return {
      courseNoticeboard: null,
      course: null,      
      attachments: [],
      nextCourseNoticeboard: null,          
    };
  }
};
