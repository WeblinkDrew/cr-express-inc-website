import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";
import SubmissionsClient from "./SubmissionsClient";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ cursor?: string; limit?: string }>;
}

export default async function SubmissionsPage({ params, searchParams }: PageProps) {
  // Check if user is authenticated
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const { cursor, limit = '50' } = await searchParams;
  const pageSize = parseInt(limit);

  // Fetch form metadata (no submissions included - too heavy)
  const form = await prisma.form.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      formType: true,
      description: true,
      isActive: true,
      slug: true,
      createdAt: true,
      _count: {
        select: { Submission: true }, // Total count for pagination UI
      },
    },
  });

  if (!form) {
    notFound();
  }

  // Fetch paginated submissions (optimized query with composite index)
  const submissions = await prisma.submission.findMany({
    where: { formId: id },
    orderBy: { submittedAt: "desc" },
    take: pageSize + 1, // Fetch one extra to check if there's a next page
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1, // Skip the cursor itself
    }),
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
      totalSize: true, // Show storage usage
      formData: true, // Include for client-side filtering/sorting
      // Don't fetch files - they can be huge!
      // These will be fetched on-demand when viewing individual submissions
    },
  });

  // Check if there are more submissions
  const hasMore = submissions.length > pageSize;
  const displaySubmissions = hasMore ? submissions.slice(0, -1) : submissions;
  const nextCursor = hasMore ? submissions[pageSize].id : null;

  // Convert user to plain object for client component
  const userData = {
    id: user.id,
    displayName: user.displayName,
    primaryEmail: user.primaryEmail,
    primaryEmailVerified: user.primaryEmailVerified,
    profileImageUrl: user.profileImageUrl,
  };

  return (
    <SubmissionsClient
      form={form}
      submissions={displaySubmissions}
      totalCount={form._count.Submission}
      nextCursor={nextCursor}
      hasMore={hasMore}
      user={userData}
    />
  );
}
