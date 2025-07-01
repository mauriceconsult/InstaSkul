import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  request: Request,
  { params }: { params: { facultyId: string;  courseId: string; tutorId: string } }
) {
  const body = await request.json();
  const { description } = body;
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!description || description.length === 0) {
    return new Response("No data provided", { status: 400 });
  }
  const tutor = await db.tutor.findUnique({
    where: {
      id: params.tutorId,
      userId,
    },
  });
  if (!tutor) {
    return new Response("Tutor not found", { status: 404 });
  }
  await db.tutor.update({
    where: {
      id: tutor.id,
    },
    data: {
      description,      
    },
  });
  return new Response("Success", { status: 200 });
}