import { CourseCard } from "@/components/course-card";
import { Faculty, Course } from "@prisma/client";

type CourseWithProgressWithFaculty = Course & {
  faculty: Faculty | null;
  tutors: { id: string }[];
  progress: number | null;
};
interface CoursesListProps {
  items: CourseWithProgressWithFaculty[];
}
export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl ?? ""}
            amount={item.amount}
            faculty={item?.faculty?.title ?? ""}
            facultyId={""}           
            role={null} />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Courses found.
        </div>
      )}
    </div>
  );
};
