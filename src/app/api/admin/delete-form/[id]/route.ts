import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if user is authenticated
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if form exists
    const form = await prisma.form.findUnique({
      where: { id },
      include: {
        _count: {
          select: { Submission: true },
        },
      },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    // Delete all submissions first (cascade delete)
    await prisma.submission.deleteMany({
      where: { formId: id },
    });

    // Delete the form
    await prisma.form.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Form deleted successfully",
      deletedSubmissions: form._count.Submission,
    });
  } catch (error: any) {
    console.error("Error deleting form:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete form" },
      { status: 500 }
    );
  }
}
