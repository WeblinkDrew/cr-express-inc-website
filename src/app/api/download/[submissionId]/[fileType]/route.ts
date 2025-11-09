import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

interface RouteParams {
  params: Promise<{
    submissionId: string;
    fileType: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { submissionId, fileType } = await params;

    // Validate fileType
    if (fileType !== "onboarding" && fileType !== "w9") {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Construct file path
    const tempDir = join(process.cwd(), "temp", "submissions", submissionId);
    const filePath = join(tempDir, `${fileType}.pdf`);

    // Read the file
    const fileBuffer = await readFile(filePath);

    // Return the PDF file
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileType}_${submissionId}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("Error downloading file:", error);

    if (error.code === "ENOENT") {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }
}
