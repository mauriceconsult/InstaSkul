import { prisma } from "@/lib/db";
import { Attachment, Admin } from "@prisma/client";

interface GetAdminProps {
  userId: string;
  schoolId: string;
  adminId: string;
}
export const getAdmin = async ({
  userId,
  schoolId,
  adminId,
}: GetAdminProps) => {
  try {   
    const school = await prisma.school.findUnique({
      where: {        
        id: schoolId,        
      },   
    });
    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
        isPublished: true,
      },
    });
    if (!school || !admin) {
      throw new Error("School or Admin not found");
    }
    let attachments: Attachment[] = [];
    let nextAdmin: Admin | null = null;
    if (userId) {
      attachments = await prisma.attachment.findMany({
        where: {
          id: school.id,
        },
      });
    }
    if (admin.userId || userId) {    
      nextAdmin = await prisma.admin.findFirst({
        where: {
          schoolId: school.id,
          isPublished: true,
          position: {
            gt: admin?.position ?? 0,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }
    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: school.id,
        },
      },
    });
    return {
      admin,
      school,      
      attachments,
      nextAdmin,
      userProgress,    
    };
  } catch (error) {
    console.log("[GET_ADMIN_ERROR]", error);
    return {
      admin: null,
      school: null,      
      attachments: [],
      nextAdmin: null,
      userProgress: null,      
    };
  }
};
