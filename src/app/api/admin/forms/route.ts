import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all forms with submission counts
    const forms = await prisma.form.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: { Submission: true },
        },
      },
    });

    // Serialize dates for JSON
    const serializedForms = forms.map((form) => ({
      ...form,
      createdAt: form.createdAt.toISOString(),
      updatedAt: form.updatedAt.toISOString(),
      submissionCount: form._count.Submission,
    }));

    return NextResponse.json({ forms: serializedForms });
  } catch (error: any) {
    console.error("Error fetching forms:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch forms" },
      { status: 500 }
    );
  }
}
