// app/dashboard/page.tsx
import { requireAuth } from "@/lib/auth";

export default async function DashboardPage() {
  // ✅ Enforce server-side authentication
  const { userId } = await requireAuth();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 p-8">
      <h1 className="text-3xl font-semibold text-slate-800">
        Welcome to your Dashboard 👋
      </h1>

      <div className="bg-white shadow rounded-2xl p-6 w-full max-w-md text-center border border-slate-200">
        <p className="text-slate-600 text-lg">
          You’re signed in as:
        </p>
        <code className="text-sm bg-slate-100 text-slate-800 p-2 rounded-md block mt-2">
          {userId}
        </code>

        <p className="text-slate-500 mt-6">
          This page is <strong>protected</strong> by Clerk middleware.
        </p>
      </div>
    </main>
  );
}
