import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { verifySignedUrl } from "@/lib/signedUrls";

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

    // Verify signed URL
    const searchParams = request.nextUrl.searchParams;
    const expires = searchParams.get('expires');
    const signature = searchParams.get('signature');

    if (!expires || !signature) {
      return NextResponse.json(
        { error: "Missing signature or expiration" },
        { status: 401 }
      );
    }

    if (!verifySignedUrl(submissionId, fileType, expires, signature)) {
      return NextResponse.json(
        { error: "Invalid or expired download link" },
        { status: 403 }
      );
    }

    // Construct file path
    // Use /tmp for serverless environments (Vercel), otherwise use local temp
    const tempBase = process.env.VERCEL ? "/tmp" : join(process.cwd(), "temp");
    const tempDir = join(tempBase, "submissions", submissionId);
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
