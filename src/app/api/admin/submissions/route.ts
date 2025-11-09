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

    // Get search query from URL params
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";

    // Fetch submissions with optional search filter
    const submissions = await prisma.submission.findMany({
      where: search
        ? {
            companyLegalName: {
              contains: search,
              mode: "insensitive",
            },
          }
        : undefined,
      orderBy: {
        submittedAt: "desc",
      },
      take: 100, // Limit to 100 most recent
    });

    // Serialize dates for JSON
    const serializedSubmissions = submissions.map((submission) => ({
      ...submission,
      submittedAt: submission.submittedAt.toISOString(),
      zapierSentAt: submission.zapierSentAt?.toISOString() || null,
    }));

    return NextResponse.json({ submissions: serializedSubmissions });
  } catch (error: any) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
