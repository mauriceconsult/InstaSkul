// app/api/db-test/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$connect();
    return Response.json({ message: "Database connection successful" });
  } catch (error) {
    return Response.json(
      { error: "Database connection failed", details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
