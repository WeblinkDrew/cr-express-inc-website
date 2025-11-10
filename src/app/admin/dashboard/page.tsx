import { stackServerApp } from "@/lib/stack";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboardPage() {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      redirect("/admin/login");
    }

    // Fetch all forms with submission counts
    const forms = await prisma.form.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { Submission: true },
        },
      },
    });

    // Convert user to plain object for client component
    const userData = {
      id: user.id,
      displayName: user.displayName,
      primaryEmail: user.primaryEmail,
      primaryEmailVerified: user.primaryEmailVerified,
      profileImageUrl: user.profileImageUrl,
    };

    // Convert dates to strings for serialization
    const serializedForms = forms.map((form: any) => ({
      ...form,
      createdAt: form.createdAt.toISOString(),
      updatedAt: form.updatedAt.toISOString(),
      submissionCount: form._count.Submission,
    }));

    return <DashboardClient user={userData} initialForms={serializedForms} />;
  } catch (error) {
    console.error("Dashboard error:", error);
    // Return a fallback with empty forms
    const user = await stackServerApp.getUser();
    if (!user) {
      redirect("/admin/login");
    }

    const userData = {
      id: user.id,
      displayName: user.displayName,
      primaryEmail: user.primaryEmail,
      primaryEmailVerified: user.primaryEmailVerified,
      profileImageUrl: user.profileImageUrl,
    };

    return <DashboardClient user={userData} initialForms={[]} />;
  }
}
