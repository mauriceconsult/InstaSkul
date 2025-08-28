import { db } from "@/lib/db";
import { Schools } from "./_components/schools";
import { SearchInput } from "./_components/search-input";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAdmins } from "@/actions/get-admins";
import { AdminCourseList } from "../admin/create-admin/[adminId]/_components/admin-course-list";

interface SearchPageProps {
  searchParams: Promise<{
    title: string;
    schoolId: string;
  }>
}

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/"); 
  }
  const schools = await db.school.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const admins = await getAdmins({
    userId,
    ...await searchParams
  }) 
  return (
    <>
      <div className="px-6 pt-4 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Schools items={schools} />
        <AdminCourseList items={admins} />
      </div>
    </>
  );
};

export default SearchPage;
