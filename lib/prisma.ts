import { PrismaClient } from "@prisma/client";

console.log("Initializing Prisma with DATABASE_URL:", process.env.DATABASE_URL);

// Singleton pattern to avoid multiple instances in development
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

console.log("Prisma initialized successfully");
export { prisma };
