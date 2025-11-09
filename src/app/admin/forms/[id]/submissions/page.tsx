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
    redirect("/handler/signin");
  }

  const { id } = await params;

  // Fetch form with submissions
  const form = await prisma.form.findUnique({
    where: { id },
    include: {
      Submission: {
        orderBy: {
          submittedAt: "desc",
        },
      },
    },
  });

  if (!form) {
    notFound();
  }

  return <SubmissionsClient form={form} />;
}
