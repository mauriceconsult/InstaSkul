import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge.tsx";
import { BookOpen } from "lucide-react";

interface TutorCardProps {
  id: string;
  title: string;
  tutorsLength: number;
  course: string;
}

export const TutorCard = ({
  id,
  title,
  tutorsLength,
  course,
}: TutorCardProps) => {
  return (
    <Link href={`/admins/${id}/courses/${id}/tutors/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt="title"
            src={"/instaskul_logo.svg"}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{course}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size={"sm"} icon={BookOpen} />
              <span>
                {tutorsLength} {tutorsLength === 1 ? "Tutorial" : "Tutorials"}
              </span>
            </div>
          </div>
          {/* {progress !== null ? (
            <div>TODO: Progress component</div>
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatAmount(amount.toString())}
            </p>
          )} */}
        </div>
      </div>
    </Link>
  );
};
