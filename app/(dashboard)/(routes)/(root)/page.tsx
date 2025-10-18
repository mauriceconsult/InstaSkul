export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { Clock, CheckCircle } from "lucide-react";
import InfoCard from "./_components/info-card";

export default async function Dashboard() {
  try {
    console.log("Fetching dashboard data...");
    const { coursesInProgress, completedCourses } = await getDashboardCourses();
    console.log("Dashboard data:", { coursesInProgress, completedCourses });
    return (
      <div>
        <InfoCard
          icon={Clock}
          label="In progress"
          numberOfItems={coursesInProgress ? coursesInProgress.length : 0}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses ? completedCourses.length : 0}
        />
      </div>
    );
  } catch (error) {
    console.error("Dashboard page error:", error);
    return (
      <div>
        <p>Error loading dashboard. Please try again.</p>
      </div>
    );
  }
}