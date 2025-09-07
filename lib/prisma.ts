// lib/prisma.ts
import { PrismaClient, Prisma } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  throw new Error("DATABASE_URL is not set");
}

console.log("Initializing Prisma with DATABASE_URL:", process.env.DATABASE_URL);
const prisma = new PrismaClient();
console.log("Prisma initialized successfully");

export { prisma };

export type NoticeboardWithComments = Prisma.NoticeboardGetPayload<{
  include: { comments: true };
}>;

export type Comment = Prisma.CommentGetPayload<true>;
