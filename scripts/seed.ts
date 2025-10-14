import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
  try {
    // Seed Admin data
    await database.admin.createMany({
      data: [
        {
          id: "admin-1",
          userId: "clerk_admin_1", // Clerk user ID (adjust after Clerk setup)
          title: "Site Administrator",
          // email: "admin@instaskul.com", // Add if schema updated
          schoolId: "school-1",
          createdAt: new Date(),
          updatedAt: new Date(),
          isPublished: true,
        },
      ],
      skipDuplicates: true,
    });
    console.log("Successfully seeded admins");

    // Seed School data
    await database.school.createMany({
      data: [
        { id: "school-1", name: "Engineering & Technology" },
        { id: "school-2", name: "Arts & Humanities" },
        { id: "school-3", name: "Social Sciences" },
        { id: "school-4", name: "Natural Sciences" },
        { id: "school-5", name: "Business & Management" },
        { id: "school-6", name: "Health Sciences" },
        { id: "school-7", name: "Sports & Fitness" },
      ],
      skipDuplicates: true,
    });
    console.log("Successfully seeded schools");

    // Seed Course data
    await database.course.createMany({
      data: [
        {
          id: "course-1",
          title: "Intro to Programming",
          adminId: "admin-1",
          // schoolId: "school-1",
          userId: "clerk_admin_1", // Optional, Clerk user ID
          amount: "100.00",
          description: "Learn JavaScript basics for beginners.",
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          publishDate: new Date(),
        },
        {
          id: "course-2",
          title: "Web Development 101",
          adminId: "admin-1",
          // schoolId: "school-1",
          userId: "clerk_admin_1",
          amount: "150.00",
          description: "Build web apps with Next.js and React.",
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          publishDate: new Date(),
        },
      ],
      skipDuplicates: true,
    });
    console.log("Successfully seeded courses");
  } catch (error) {
    console.log("Error seeding the database", error);
  } finally {
    await database.$disconnect();
  }
}

main();