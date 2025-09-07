// lib/prisma.ts
import { PrismaClient, Prisma } from "@prisma/client";

export const prisma = new PrismaClient();

export type NoticeboardWithComments = Prisma.NoticeboardGetPayload<{
  include: { comments: true };
}>;

export type Comment = Prisma.CommentGetPayload<true>;
