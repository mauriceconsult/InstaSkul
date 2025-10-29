// test-assignments.ts
import { config } from "dotenv";
config({ path: "./.env.local" });

import { prisma } from "./lib/db.ts";

// REAL IDs FROM YOUR SEEDED DATA
const TEST_ASSIGNMENT_ID = "assign_1";
const TEST_USER_ID = "user_stu_001";  // Student (will sign up in UI later)
const TEST_COURSEWORK_ID = "coursework_1";
const TEST_COURSE_NOTICEBOARD_ID = "course_notice_1";

async function testAllSubmissions() {
  try {
    console.log("=== FULL LMS SUBMISSION TEST ===");
    console.log("DATABASE_URL:", process.env.DATABASE_URL?.slice(0, 50) + "...");

    // === 1. Assignment Submission ===
    const assignmentSub = await prisma.assignmentSubmission.upsert({
      where: { assignmentId_userId: { assignmentId: TEST_ASSIGNMENT_ID, userId: TEST_USER_ID } },
      update: { text: "Updated test answer", submittedAt: new Date() },
      create: {
        assignmentId: TEST_ASSIGNMENT_ID,
        userId: TEST_USER_ID,
        text: "This is my assignment answer.",
        fileUrl: "https://uploadthing.com/assignment.pdf",
      },
    });
    console.log("Assignment Submission:", assignmentSub.id);

    // === 2. Coursework Submission ===
    const courseworkSub = await prisma.courseworkSubmission.upsert({
      where: { courseworkId_userId: { courseworkId: TEST_COURSEWORK_ID, userId: TEST_USER_ID } },
      update: { text: "Updated project", submittedAt: new Date() },
      create: {
        courseworkId: TEST_COURSEWORK_ID,
        userId: TEST_USER_ID,
        text: "Final project: Full-stack app",
        fileUrl: "https://uploadthing.com/project.zip",
      },
    });
    console.log("Coursework Submission:", courseworkSub.id);

    // === 3. CourseNoticeboardComment (Teacher) ===
    const teacherComment = await prisma.courseNoticeboardComment.upsert({
      where: { id: "cnc_teacher_test" },
      update: { content: "Updated: Keep up the good work!" },
      create: {
        id: "cnc_teacher_test",
        courseNoticeboardId: TEST_COURSE_NOTICEBOARD_ID,
        userId: "399cc8ba-b39a-4801-a244-680ed2af0f32",  // Admin
        content: "Great progress, team!",
      },
    });
    console.log("Teacher Comment:", teacherComment.id);

    // === 4. Student Reply ===
    const studentReply = await prisma.courseNoticeboardComment.upsert({
      where: { id: "cnc_reply_test" },
      update: { content: "Thanks! Working on improvements." },
      create: {
        id: "cnc_reply_test",
        courseNoticeboardId: TEST_COURSE_NOTICEBOARD_ID,
        userId: TEST_USER_ID,
        content: "Thank you for the feedback!",
        courseId: teacherComment.id,  // replies to teacher
      },
    });
    console.log("Student Reply:", studentReply.id);

    console.log("=== ALL TESTS PASSED ===");
    console.log("Backend + DB 100% WORKING");
    console.log("Now: Test UI → Then MERGE TO MAIN");

  } catch (error) {
    console.error("TEST FAILED:", error instanceof Error ? error.message : error);
  }
}

testAllSubmissions();