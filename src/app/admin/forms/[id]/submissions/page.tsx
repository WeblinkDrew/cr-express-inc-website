import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";
import SubmissionsClient from "./SubmissionsClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SubmissionsPage({ params }: PageProps) {
  // Check if user is authenticated
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  const { id } = await params;

  // Fetch form with submissions (optimized: only fetch necessary fields)
  const form = await prisma.form.findUnique({
    where: { id },
    include: {
      Submission: {
        orderBy: {
          submittedAt: "desc",
        },
        select: {
          id: true,
          submittedAt: true,
          submitterName: true,
          submitterEmail: true,
          submitterPhone: true,
          companyName: true,
          ipAddress: true,
          sentToZapier: true,
          zapierSentAt: true,
          // Don't fetch formData or files - they can be huge!
          // These will be fetched on-demand when viewing individual submissions
        },
      },
    },
  });

  if (!form) {
    notFound();
  }

  // Convert user to plain object for client component
  const userData = {
    id: user.id,
    displayName: user.displayName,
    primaryEmail: user.primaryEmail,
    primaryEmailVerified: user.primaryEmailVerified,
    profileImageUrl: user.profileImageUrl,
  };

  return <SubmissionsClient form={form} user={userData} />;
}
