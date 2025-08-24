"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface TutorActionsProps {
  disabled: boolean;
  adminId: string;
  courseId: string;
  tutorialId: string;
  isPublished: boolean;
}

export const TutorActions = ({
  disabled,
  adminId,
  courseId,
  tutorialId,
  isPublished,
}: TutorActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(
          `/api/create-admins/${adminId}/courses/${courseId}/tutors/${tutorialId}/unpublish`
        );
        toast.success("Tutor unpublished");
      } else {
        await axios.patch(
          `/api/create-admins/${adminId}/courses/${courseId}/tutors/${tutorialId}/publish`
        );
        
        toast.success("Topic published");
      }
        router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/create-admins/${adminId}/courses/${courseId}/tutors/${tutorialId}`);
      toast.success("Topic deleted");
      router.refresh();
      router.push(`/admin/create-admin/${adminId}/course/${courseId}/tutor`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
