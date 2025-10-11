import Link from "next/link";
import { Metadata } from "next";
import { InstaSkulLogo } from "@/components/instaskul-logo";
import Image from "next/image";

export const metadata: Metadata = {
  title: "InstaSkul User Guide and Terms of Use",
  description: "Documentation for InstaSkul transformative LMS.",
  keywords: [
    "InstaSkul",
    "Learning Management System",
    "online education",
    "digital education",
    "knowledge sharing",
    "e-learning",
    "education",
  ],
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-center mb-6">
          <InstaSkulLogo size="md" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-6 text-center">
          InstaSkul User Guide
        </h1>
        <p className="text-slate-600 mb-8 text-center">
          Learning Management Platform. Version 1.0 | August 2025.
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Introduction
        </h2>
        <p className="text-slate-600 mb-8">
          Welcome to InstaSkul, a platform designed to connect educators and
          learners through engaging online courses. This document provides a
          concise guide for using the platform and outlines the Terms of Use to
          protect our content and ensure a fair, professional experience for all
          users.
        </p>

        <h3 className="text-xl font-medium text-slate-800 mb-2">
          About InstaSkul
        </h3>

        <Image
          src="/adminImage.png"
          alt="Admin Image"
          width={500}
          height={300}
          className="rounded-md mb-8"
        />

        <p className="text-slate-600 mb-8">
          InstaSkul enables educators to build and share educational courses,
          while learners can enroll, track progress, and complete tutorials. Our
          platform is accessible on web and mobile, with secure payments.
        </p>

        <h3 className="text-xl font-medium text-slate-800 mb-2">
          Purpose of This Document
        </h3>
        <p className="text-slate-600 mb-8">
          This guide helps educators and learners navigate InstaSkul’s features.
          The Terms of Use section ensures proper use and protects intellectual
          property. For updates, visit our{" "}
          <Link href="/docs" className="text-blue-600 hover:underline">
            docs page
          </Link>
          .
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          User Guide for Educators
        </h2>
        <p className="text-slate-600 mb-4">
          This section explains how educators can set up and manage courses on
          InstaSkul.
        </p>
        <h3 className="text-xl font-medium text-slate-800 mb-2">
          Navigating the Admin Interface
        </h3>
        <p className="text-slate-600 mb-4">
          The admin provides organizational space to embark on your Course
          creation and management. If you are an organization, such as an
          education institution or a company, you can create multiple admins
          that suit your organization’s Faculties or Departments. InstaSkul
          facilitates continuous improvement allowing you to create and produce
          Courses at own pace and publish only when you are ready. You can also
          unpublish your works. You maintain copyright to your content.
        </p>
        <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
          <li>
            Log In: Sign in at{" "}
            <Link
              href="https://instaskul.com"
              className="text-blue-600 hover:underline"
            >
              instaskul.com
            </Link>{" "}
            using your credentials.
          </li>
          <li>
            Access Dashboard: Navigate to the Creator Dashboard from the
            sidebar.
          </li>
          <li>
            Click on create admin and give a title to your admin. This will be
            your admin’s brand. You can, if necessary, change it.
          </li>
          <li>This enables you to navigate to your admin.</li>
          <li>
            Inside your admin select your school of specialization from the
            dropdown, e.g., Science, Arts, Business, etc.
          </li>
          <li>
            In the description, provide the necessary metadata, i.e., a brief
            updated description of your admin.
          </li>
          <li>Upload admin’s cover image.</li>
          <li>
            If and when necessary, provide supporting materials in the form of
            pdfs, videos, text or images.
          </li>
          <li>
            Use the admin noticeboard to communicate with your Faculty or
            Department when and if necessary.
          </li>
          <li>
            Course creation begins inside the Admin when you create a Course a
            title. This enables the edit link that navigates to the course page.
          </li>
          <li>
            At least one Course is required before you can publish your Admin.
            Afterwards, you can continue adding more Courses to the admin.
          </li>
          <li>
            Customized configurations if needed can be arranged on request as
            separate projects.
          </li>
        </ul>

        <h3 className="text-xl font-medium text-slate-800 mb-2">
          Navigating the Course Interface
        </h3>
        <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
          <li>
            The course page enables you to develop Course(s) in your Admin. Each
            Course you create is identified with your admin.
          </li>
          <li>
            The Course title and Admin - to which the Course belongs - are
            already indicated as set them in the admin page. You can edit any or
            both of them if necessary.
          </li>
          <li>
            Provide a brief updated description of your Course to attract and
            inform your visitors about the Course.
          </li>
          <li>Upload the course cover image.</li>
          <li>
            Set your Course price in by filling in the course amount. This will
            be used for checkout.
          </li>
          <li>
            Consider breaking your Course into multiple Tutorials, e.g.,
            Tutorial 1: Introduction; Tutorial 2: Basics, etc.
          </li>
          <li>
            You can add support materials (when and if necessary) in the form of
            pdfs, videos, text or images.
          </li>
          <li>
            Communicate internally with your student when and if necessary,
            through Course Noticeboard.
          </li>
          <li>Give a coursework to be submitted at Course completion.</li>
          <li>
            Tutorial creation begins here when you give your tutorial a title.
            This enables an edit link to navigate to the Tutorial page.
          </li>
          <li>
            You must first publish at least one Tutorial before you can publish
            a Course. Afterwards you can continue adding more Tutorials.
          </li>
          <li>
            Customized configurations if needed can be arranged on request as
            separate projects.
          </li>
        </ul>

        <h3 className="text-xl font-medium text-slate-800 mb-2">
          Navigating the Tutorial Interface
        </h3>
        <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
          <li>
            The tutorial page enables you to specialize on an individual lesson
            in the corresponding Course.
          </li>
          <li>
            The Course and Admin to which the Tutorial belongs are already
            indicated. You can change any or both of them if necessary.
          </li>
          <li>
            Provide the Tutorial’s objective(s). NOTE: Ensure that you set and
            achieve the objective(s) within the limited Tutorial span.
          </li>
          <li>
            Consider breaking down multiple objectives into multiple Tutorials
            rather than cramming them in one Tutorial.
          </li>
          <li>
            For Tutorial videos you can save your PowerPoint or Google slides
            presentations as videos and upload them as Tutorials.
          </li>
          <li>
            You can also attach additional details (when and if necessary) in
            the form of pdfs, videos, text or images.
          </li>
          <li>
            Ensure that each Tutorial is accompanied by an assignment for
            students to submit upon watching the Tutorial.
          </li>
          <li>
            Customized configurations if needed can be arranged on request as
            separate projects.
          </li>
        </ul>

        <h3 className="text-xl font-medium text-slate-800 mb-2">
          Managing Tutorials
        </h3>
        <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
          <li>
            Edit Content: From the course page, edit tutorial titles, content,
            or order (via "position" field).
          </li>
          <li>
            Track Progress: Monitor learner enrollment and progress via the
            dashboard analytics.
          </li>
          <li>
            Set Free/Locked: Mark tutorials as free or locked (requires
            enrollment) in the tutorial settings.
          </li>
        </ul>

        <h3 className="text-xl font-medium text-slate-800 mb-2">
          Publishing Your Content
        </h3>
        <p className="text-slate-600 mb-4">
          Note: When publishing your first admin, your publishing will begin at
          the Tutorial page, then use the backlink (at the top of the page) to
          navigate to Course and publish it and then use the backlink to Admin
          and publish it. You now have a published Course under your Admin. You
          can then continue adding Courses and Tutorials to your Admin.
        </p>

        <h3 className="text-xl font-medium text-slate-800 mb-2">
          Best Practices
        </h3>
        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
          <li>Use clear, concise titles and descriptions.</li>
          <li>Ensure content is original to avoid copyright issues.</li>
          <li>Test tutorials for accessibility on mobile and web.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          User Guide for Learners
        </h2>
        <p className="text-slate-600 mb-4">
          This section guides learners on enrolling in and navigating courses.
        </p>
        <h3 className="text-xl font-medium text-slate-800 mb-2">
          Enrolling in a Course
        </h3>
        <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
          <li>
            Browse Courses: Visit{" "}
            <Link
              href="https://instaskul.com"
              className="text-blue-600 hover:underline"
            >
              instaskul.com/admin/courses
            </Link>{" "}
            and use the search bar to find courses.
          </li>
          <li>
            Enroll: Click a course, then select "Enroll" and complete payment
            via MoMo API (enter a 12-digit MSISDN, e.g., 256123456789).
          </li>
          <li>
            Confirm Enrollment: After payment, the course appears in your
            dashboard.
          </li>
        </ul>

        <h3 className="text-xl font-medium text-slate-800 mb-2">
          Navigating Courses
        </h3>
        <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
          <li>
            Access Sidebar: On desktop, view the sidebar at{" "}
            instaskul.com/courses/[courseId] . On mobile, tap the menu icon to
            open it.
          </li>
          <li>
            View Tutorials: Click tutorial titles to access content. Locked
            tutorials require enrollment.
          </li>
          <li>
            Track Progress: Check completion status (checkmark for completed,
            play icon for in-progress) and overall progress percentage in the
            sidebar.
          </li>
        </ul>

        <h3 className="text-xl font-medium text-slate-800 mb-2">
          Payment Instructions
        </h3>
        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
          <li>Use a valid 12-digit MSISDN for MoMo payments.</li>
          <li>
            Ensure the course amount is valid (contact support if errors occur).
          </li>
          <li>After payment, tutorials unlock automatically.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Terms of Use
        </h2>
        <p className="text-slate-600 mb-4">
          By using InstaSkul, you agree to these Terms of Use, which protect our
          intellectual property and ensure a fair platform experience.
        </p>
        <h3 className="text-xl font-medium text-slate-800 mb-2">
          Copyright and Intellectual Property
        </h3>
        <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
          <li>
            All content on InstaSkul, including courses, tutorials, and the
            InstaSkul logo, is owned by InstaSkul or its creators and protected
            by copyright law.
          </li>
          <li>
            Users may not reproduce, distribute, or modify content without
            written permission from InstaSkul.
          </li>
          <li>
            Creators retain ownership of their course content but grant
            InstaSkul a non-exclusive license to host and display it.
          </li>
        </ul>

        <h3 className="text-xl font-medium text-slate-800 mb-2">
          User Responsibilities
        </h3>
        <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
          <li>
            Creators: Must upload original content and comply with copyright
            laws. InstaSkul is not liable for user-generated content violations.
          </li>
          <li>
            Learners: Must use content for personal learning only. Sharing login
            credentials or course materials is prohibited.
          </li>
          <li>
            Report copyright concerns to{" "}
            <Link
              href="mailto:support@instaskul.com"
              className="text-blue-600 hover:underline"
            >
              support@instaskul.com
            </Link>
            .
          </li>
        </ul>

        <h3 className="text-xl font-medium text-slate-800 mb-2">
          Limitations of Liability
        </h3>
        <p className="text-slate-600 mb-8">
          InstaSkul is not responsible for payment issues due to invalid MSISDN
          or course data errors. Contact support for assistance.
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Contact and Support
        </h2>
        <p className="text-slate-600 mb-8">
          Join our community on{" "}
          <Link
            href="https://x.com/instaskul"
            className="text-blue-600 hover:underline"
          >
            X
          </Link>
          ,{" "}
          <Link
            href="https://linkedin.com/company/instaskul"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </Link>
          ,{" "}
          <Link
            href="https://discord.gg/instaskul"
            className="text-blue-600 hover:underline"
          >
            Discord
          </Link>
          ,{" "}
          <Link
            href="https://whatsapp.com/channel/instaskul"
            className="text-blue-600 hover:underline"
          >
            WhatsApp
          </Link>
          , or{" "}
          <Link
            href="https://facebook.com/instaskul"
            className="text-blue-600 hover:underline"
          >
            Facebook
          </Link>
          . Contact us at{" "}
          <Link
            href="mailto:support@instaskul.com"
            className="text-blue-600 hover:underline"
          >
            support@instaskul.com
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
