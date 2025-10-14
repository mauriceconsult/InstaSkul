import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
  try {
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
          userId: "admin-1",
          schoolId: "school-1", // Links to Engineering & Technology
          amount: "100.00",
          createdAt: new Date(),
          updatedAt: new Date(),
          publishDate: new Date(),
          description: "Learn JavaScript basics for beginners.",
          isPublished: true,
        },
        {
          id: "course-2",
          title: "Web Development 101",
          userId: "admin-1",
          schoolId: "school-1",
          amount: "150.00",
          createdAt: new Date(),
          updatedAt: new Date(),
          publishDate: new Date(),
          description: "Build web apps with Next.js and React.",
          isPublished: true,
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