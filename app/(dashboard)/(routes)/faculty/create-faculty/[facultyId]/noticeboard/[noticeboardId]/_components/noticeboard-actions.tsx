"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface NoticeboardActionsProps {
  disabled: boolean;
  facultyId: string;
  noticeboardId: string;
  isPublished: boolean;
}
export const NoticeboardActions = ({
  disabled,
  facultyId,
  noticeboardId,
  isPublished,
}: NoticeboardActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/create-faculties/${facultyId}/noticeboards/${noticeboardId}/unpublish`);
        toast.success("Noticeboard unpublished");
      } else {
        await axios.patch(
          `/api/create-faculties/${facultyId}/noticeboards/${noticeboardId}/publish`
        );
        toast.success("Noticeboard published");
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
      await axios.delete(`/api/create-noticeboards/${noticeboardId}`);
      toast.success("Noticeboard deleted");
      router.refresh();
      router.push(`/noticeboard/create-noticeboard`);
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
