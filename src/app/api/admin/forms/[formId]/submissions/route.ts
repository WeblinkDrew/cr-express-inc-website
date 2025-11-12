import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";

interface RouteParams {
  params: Promise<{ formId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Check if user is authenticated
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { formId } = await params;
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Fetch paginated submissions
    const submissions = await prisma.submission.findMany({
      where: { formId },
      orderBy: { submittedAt: "desc" },
      take: limit + 1, // Fetch one extra to check if there's a next page
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
        totalSize: true,
        formData: true, // Include formData for client-side filtering
      },
    });

    // Check if there are more submissions
    const hasMore = submissions.length > limit;
    const displaySubmissions = hasMore ? submissions.slice(0, -1) : submissions;
    const nextCursor = hasMore ? submissions[limit].id : null;

    return NextResponse.json({
      submissions: displaySubmissions,
      nextCursor,
      hasMore,
    });
  } catch (error: any) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
