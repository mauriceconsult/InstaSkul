/*
  Warnings:

  - You are about to drop the `About` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tuitionId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tuitionId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "tuitionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tuition" ADD COLUMN     "enrolleeUserId" TEXT;

-- DropTable
DROP TABLE "public"."About";

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_tuitionId_key" ON "Enrollment"("tuitionId");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_tuitionId_fkey" FOREIGN KEY ("tuitionId") REFERENCES "Tuition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
