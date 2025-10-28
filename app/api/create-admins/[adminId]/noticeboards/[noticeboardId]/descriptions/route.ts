import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ adminId: string; noticeboardId: string }> }
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
  const admin = await prisma.admin.findUnique({
    where: {
      id: (await params).adminId,
      userId,
    },
  });
  if (!admin) {
    return new Response("Admin not found", { status: 404 });
  }
  const noticeboard = await prisma.noticeboard.findUnique({
    where: {
      id: (await params).noticeboardId,
      adminId: (await params).adminId,
      userId,
    },
  });
  if (!noticeboard) {
    return new Response("Admin not found", { status: 404 });
  }
  await prisma.noticeboard.update({
    where: {
      id: noticeboard.id,
    },
    data: {
      description,
    },
  });
  return new Response("Success", { status: 200 });
}
