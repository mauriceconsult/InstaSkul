import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

// Create UploadThing instance
const f = createUploadthing();

// Auth function with proper async handling
const handleAuth = async () => {
  const { userId } = await auth(); // Await the promise to get the auth object
  console.log("UploadThing auth check:", { userId }); // Debug
  if (!userId) throw new Error("Unauthorized");
  return { userId }; // Return the userId object
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => await handleAuth()) // Await the auth function
    .onUploadComplete((data) => {
      console.log("Upload complete:", data);
    }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(async () => await handleAuth())
    .onUploadComplete((data) => {
      console.log("Upload complete:", data);
    }),
  tutorVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(async () => await handleAuth())
     .onUploadComplete((data) => {
      console.log("Upload complete:", data);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
