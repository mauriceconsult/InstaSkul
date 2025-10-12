/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `objective` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `facultyPayrollId` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `partyId` on the `CourseNoticeboard` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `Noticeboard` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the `Faculty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FacultyPayroll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,courseId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,courseId]` on the table `UserProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Attachment" DROP CONSTRAINT "Attachment_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Attachment" DROP CONSTRAINT "Attachment_facultyPayrollId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Course" DROP CONSTRAINT "Course_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Enrollment" DROP CONSTRAINT "Enrollment_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Enrollment" DROP CONSTRAINT "Enrollment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Enrollment" DROP CONSTRAINT "Enrollment_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Faculty" DROP CONSTRAINT "Faculty_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FacultyPayroll" DROP CONSTRAINT "FacultyPayroll_payrollId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Noticeboard" DROP CONSTRAINT "Noticeboard_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Student" DROP CONSTRAINT "Student_courseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Student" DROP CONSTRAINT "Student_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Submission" DROP CONSTRAINT "Submission_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Submission" DROP CONSTRAINT "Submission_courseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Submission" DROP CONSTRAINT "Submission_courseworkId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Submission" DROP CONSTRAINT "Submission_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tuition" DROP CONSTRAINT "Tuition_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserProgress" DROP CONSTRAINT "UserProgress_userId_fkey";

-- DropIndex
DROP INDEX "public"."Attachment_facultyId_courseId_courseworkId_noticeboardId_co_idx";

-- DropIndex
DROP INDEX "public"."Course_facultyId_idx";

-- DropIndex
DROP INDEX "public"."Noticeboard_facultyId_idx";

-- DropIndex
DROP INDEX "public"."Tutor_facultyId_courseId_idx";

-- DropIndex
DROP INDEX "public"."UserProgress_tutorId_assignmentId_courseworkId_idx";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "isCompleted",
DROP COLUMN "objective",
ADD COLUMN     "publishDate" TIMESTAMP(3),
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "facultyId",
DROP COLUMN "facultyPayrollId",
ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "adminPayrollId" TEXT;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "facultyId",
ADD COLUMN     "adminId" TEXT;

-- AlterTable
ALTER TABLE "CourseNoticeboard" DROP COLUMN "partyId";

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "facultyId",
DROP COLUMN "name",
DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "Noticeboard" DROP COLUMN "facultyId",
ADD COLUMN     "adminId" TEXT;

-- AlterTable
ALTER TABLE "Tuition" ADD COLUMN     "status" TEXT,
ADD COLUMN     "transId" TEXT,
ADD COLUMN     "transactionId" TEXT;

-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "facultyId",
ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserProgress" ADD COLUMN     "isEnrolled" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "tutorId" DROP NOT NULL,
ALTER COLUMN "assignmentId" DROP NOT NULL,
ALTER COLUMN "courseworkId" DROP NOT NULL,
ALTER COLUMN "courseId" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."Faculty";

-- DropTable
DROP TABLE "public"."FacultyPayroll";

-- DropTable
DROP TABLE "public"."Student";

-- DropTable
DROP TABLE "public"."Submission";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "AdminPayroll" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "payrollId" TEXT,
    "position" INTEGER,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminId" TEXT,

    CONSTRAINT "AdminPayroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "position" INTEGER,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "schoolId" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdminPayroll_payrollId_adminId_userId_idx" ON "AdminPayroll"("payrollId", "adminId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminPayroll_userId_payrollId_adminId_key" ON "AdminPayroll"("userId", "payrollId", "adminId");

-- CreateIndex
CREATE INDEX "Admin_schoolId_idx" ON "Admin"("schoolId");

-- CreateIndex
CREATE INDEX "Attachment_adminId_courseId_courseworkId_noticeboardId_cour_idx" ON "Attachment"("adminId", "courseId", "courseworkId", "noticeboardId", "courseNoticeboardId", "payrollId", "tuitionId", "tutorId");

-- CreateIndex
CREATE INDEX "Course_adminId_idx" ON "Course"("adminId");

-- CreateIndex
CREATE INDEX "Enrollment_userId_idx" ON "Enrollment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userId_courseId_key" ON "Enrollment"("userId", "courseId");

-- CreateIndex
CREATE INDEX "Noticeboard_adminId_idx" ON "Noticeboard"("adminId");

-- CreateIndex
CREATE INDEX "Tutor_courseId_idx" ON "Tutor"("courseId");

-- CreateIndex
CREATE INDEX "UserProgress_courseId_courseworkId_tutorId_assignmentId_idx" ON "UserProgress"("courseId", "courseworkId", "tutorId", "assignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_courseId_key" ON "UserProgress"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "AdminPayroll" ADD CONSTRAINT "AdminPayroll_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_adminPayrollId_fkey" FOREIGN KEY ("adminPayrollId") REFERENCES "AdminPayroll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noticeboard" ADD CONSTRAINT "Noticeboard_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
