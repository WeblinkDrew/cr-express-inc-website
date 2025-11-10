import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";
import { rm } from "fs/promises";
import { join } from "path";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// DELETE submission
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Get submission to check if it exists
    const submission = await prisma.submission.findUnique({
      where: { id },
    });

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    // Delete PDF files from temp directory if they exist
    try {
      const tempBase = process.env.VERCEL ? "/tmp" : join(process.cwd(), "temp");
      const tempDir = join(tempBase, "submissions", id);
      await rm(tempDir, { recursive: true, force: true });
      console.log(`✅ Deleted temp files for submission ${id}`);
    } catch (error) {
      console.log(`⚠️ No temp files to delete for submission ${id}`);
    }

    // Delete submission from database
    await prisma.submission.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Submission deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting submission:", error);
    return NextResponse.json(
      { error: "Failed to delete submission" },
      { status: 500 }
    );
  }
}
