import { stackServerApp } from "@/lib/stack";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboardPage() {
  console.log("Dashboard: Starting");
  console.log("Dashboard: Environment check:", {
    hasDbUrl: !!process.env.DATABASE_URL,
    hasStackProject: !!process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
    hasStackKey: !!process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
    hasStackSecret: !!process.env.STACK_SECRET_SERVER_KEY,
  });

  try {
    console.log("Dashboard: Getting user from Stack Auth");
    const user = await stackServerApp.getUser();
    console.log("Dashboard: User result:", user ? `Found: ${user.primaryEmail}` : "Not found");

    if (!user) {
      console.log("Dashboard: Redirecting to login");
      redirect("/admin/login");
    }

    console.log("Dashboard: Attempting database query");
    // Fetch all forms with submission counts
    const forms = await prisma.form.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { Submission: true },
        },
      },
    });
    console.log("Dashboard: Database query successful, found", forms.length, "forms");

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
  } catch (error: any) {
    console.error("Dashboard: Critical error:", {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      stack: error?.stack,
    });

    // Try to get more specific error info
    if (error?.code === 'P1001') {
      console.error("Dashboard: Database connection error - Can't reach database server");
    } else if (error?.code === 'P1002') {
      console.error("Dashboard: Database timeout - The database server was reached but timed out");
    } else if (error?.code === 'P1003') {
      console.error("Dashboard: Database does not exist");
    }

    // Return a fallback with empty forms
    try {
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
    } catch (fallbackError) {
      console.error("Dashboard: Even fallback failed:", fallbackError);
      throw fallbackError;
    }
  }
}
