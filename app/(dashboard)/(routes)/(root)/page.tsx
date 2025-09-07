// app/(dashboard)/(routes)/(root)/page.tsx
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import InfoCard from "./_components/info-card"; // Adjust path as needed
import {
  Clock,
  // CheckCircle
} from "lucide-react";

export default async function Dashboard() {
  const courses = await getDashboardCourses(); // Returns an array

  return (
    <div>
      <InfoCard
        icon={Clock}
        label="In progress"
        numberOfItems={courses && courses.coursesInProgress ? courses.coursesInProgress.length : 0} // Fallback to 0
      />
      {/* If you want to show completed courses separately, you need to filter them here */}
      {/* <InfoCard
        icon={CheckCircle}
        label="Completed"
        numberOfItems={completedCourses ? completedCourses.length : 0}
      /> */}
    </div>
  );
}
