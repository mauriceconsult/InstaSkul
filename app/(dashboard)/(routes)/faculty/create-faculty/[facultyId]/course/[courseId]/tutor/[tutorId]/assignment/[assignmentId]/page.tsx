import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  File,
  ArrowLeft,
} from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { AssignmentTitleForm } from "./_components/assignment-title-form";
import Link from "next/link";
import { AssignmentTutorForm } from "./_components/assignment-tutor-form";
import { AssignmentDescriptionForm } from "./_components/assignment-description-form";
import { AssignmentActions } from "./_components/assignment-actions";
import { AssignmentAttachmentForm } from "./_components/assignment-attachment-form";

const AssignmentIdPage = async ({
  params,
}: {
  params: Promise<{
    facultyId: string;
    courseId: string;
    tutorId: string;
    assignmentId: string;
  }>;
}) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const resolvedParams = await params;
  const assignment = await db.assignment.findUnique({
    where: {
      id: resolvedParams.assignmentId,
      userId,
    },
    include: {      
      attachments: true,  
    },
  });

  const tutor = await db.tutor.findMany({
    orderBy: {
      title: "asc",
    },
  });

  if (!assignment || tutor.length === 0) {
    console.error(
      `[${new Date().toISOString()} AssignmentIdPage] Assignment or school not found:`,
      { courseId: resolvedParams.courseId, userId }
    );
    return redirect("/");
  }
  const initialData = {
    ...assignment,
    description: assignment.description ?? "", 
  };

  const requiredFields = [
    initialData.title,
    initialData.tutorId,
    initialData.description,    
  ];
  const optionalFields = [initialData.attachments.length > 0];
  const allFields = [...requiredFields, ...optionalFields];
  const totalFields = allFields.length;
  const completedFields = allFields.filter(Boolean).length;
  const completionText = `(${completedFields} of ${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!initialData.isPublished && (
        <Banner
          variant="warning"
          label="This Assignment is unpublished. It is not visible to the students. Complete the required* fields to publish."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
              href={`/faculty/create-faculty/${
                (await params).facultyId
              }/course/${(await params).courseId}/${(await params).tutorId}`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tutor creation.
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Assignment creation</h1>
                <div className="text-sm text-slate-700">
                  <div>Completed fields {completionText}</div>
                </div>
              </div>
              <AssignmentActions
                disabled={!isComplete}                
                facultyId={resolvedParams.facultyId}
                courseId={resolvedParams.courseId}
                tutorId={resolvedParams.tutorId}
                assignmentId={resolvedParams.assignmentId}
                isPublished={initialData.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Enter the Assignment details</h2>
              </div>
              <AssignmentTitleForm
                initialData={initialData}
                facultyId={resolvedParams.facultyId}
                courseId={resolvedParams.courseId}
                tutorId={resolvedParams.tutorId}
                assignmentId={resolvedParams.assignmentId}
              />
              <AssignmentTutorForm
                initialData={initialData}
                facultyId={resolvedParams.facultyId}
                courseId={resolvedParams.courseId}
                tutorId={resolvedParams.tutorId}
                assignmentId={resolvedParams.assignmentId}
                options={tutor.map((cat) => ({
                  label: cat.title,
                  value: cat.id,
                }))}
              />
              <AssignmentDescriptionForm
                initialData={initialData}
                facultyId={resolvedParams.facultyId}
                courseId={resolvedParams.courseId}
                tutorId={resolvedParams.tutorId}
                assignmentId={resolvedParams.assignmentId}
              />
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={File} />
                  <h2 className="text-xl">Resources & Attachments</h2>
                </div>
                <AssignmentAttachmentForm
                  initialData={initialData}
                  facultyId={resolvedParams.facultyId}
                  courseId={resolvedParams.courseId}
                  tutorId={resolvedParams.tutorId}
                  assignmentId={resolvedParams.assignmentId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignmentIdPage;
