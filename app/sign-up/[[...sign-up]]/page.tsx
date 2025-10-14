// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow border border-slate-200 p-8">
        <h1 className="text-2xl font-semibold text-center mb-6 text-slate-800">
          Create your account
        </h1>

        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          appearance={{
            elements: {
              formButtonPrimary: "bg-sky-600 hover:bg-sky-700 text-white",
              card: "shadow-none border border-slate-200",
            },
          }}
          redirectUrl="/dashboard"
        />
      </div>

      <p className="text-sm text-slate-500 mt-4">
        Already have an account?{" "}
        <a
          href="/sign-in"
          className="text-sky-600 hover:text-sky-700 font-medium"
        >
          Sign in
        </a>
      </p>
    </main>
  );
}
