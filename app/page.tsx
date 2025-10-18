export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to the LMS</h1>
      <p className="mt-4">
        Explore our learning management system.{" "}
        <a href="/sign-in" className="text-blue-500">Sign in</a> or{" "}
        <a href="/sign-up" className="text-blue-500">Sign up</a> to get started.
      </p>
      <p className="mt-2">
        Already have an account? Visit the{" "}
        <a href="/dashboard/dashboard" className="text-blue-500">Dashboard</a>.
      </p>
    </div>
  );
}