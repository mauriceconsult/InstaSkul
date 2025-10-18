import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/ui/toast";
import Footer from "@/components/footer";



export const metadata: Metadata = {
  title: "InstaSkul",
  description: "A modern and fully secure learning management system built with Next.js & Clerk. ",
  keywords: [
    "IT",
    "Consulting",
    "Agency",
    "digital courses",
    "online courses",
    "education",
    "Training",
    "Course management",
    "learning management system",
    "LMS",
    "e-learning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="min-h-full">
        <body className="flex flex-col min-h-full bg-gray-50">
          <ToastProvider />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
