import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import OnboardingFormClient from "./OnboardingFormClient";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function FormPage({ params }: PageProps) {
  const { slug } = await params;

  // Look up form by slug
  const form = await prisma.form.findUnique({
    where: { slug },
  });

  // Check if form exists
  if (!form) {
    notFound();
  }

  // Check if form is inactive
  if (!form.isActive) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Form Unavailable</h1>
          <p className="text-neutral-600">
            This form is currently unavailable and is not accepting submissions.
          </p>
        </div>
      </div>
    );
  }

  // Form is valid, show the form
  return <OnboardingFormClient slug={slug} formId={form.id} />;
}
