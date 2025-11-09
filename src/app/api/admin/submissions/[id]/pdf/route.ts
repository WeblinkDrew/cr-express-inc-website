import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";
import { renderToBuffer } from "@react-pdf/renderer";
import ClientOnboardingPDF from "@/components/pdf/ClientOnboardingPDF";

export async function GET(
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

    // Fetch the submission
    const submission = await prisma.submission.findUnique({
      where: { id },
    });

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    // Prepare form data for PDF generation
    const formData = {
      companyLegalName: submission.companyLegalName,
      division: submission.division,
      branchAddressLine1: submission.branchAddressLine1,
      branchCity: submission.branchCity,
      branchState: submission.branchState,
      branchZipCode: submission.branchZipCode,
      mc: submission.mc,
      dot: submission.dot,
      scacCode: submission.scacCode,
      primaryContactFirstName: submission.primaryContactFirstName,
      primaryContactLastName: submission.primaryContactLastName,
      primaryContactEmail: submission.primaryContactEmail,
      primaryContactPhone: submission.primaryContactPhone,
      secondaryContactFirstName: submission.secondaryContactFirstName,
      secondaryContactLastName: submission.secondaryContactLastName,
      secondaryContactEmail: submission.secondaryContactEmail,
      secondaryContactPhone: submission.secondaryContactPhone,
      escalationContactFirstName: submission.escalationContactFirstName,
      escalationContactLastName: submission.escalationContactLastName,
      escalationContactEmail: submission.escalationContactEmail,
      escalationContactPhone: submission.escalationContactPhone,
      accountsPayableFirstName: submission.accountsPayableFirstName,
      accountsPayableLastName: submission.accountsPayableLastName,
      accountsPayableEmail: submission.accountsPayableEmail,
      accountsPayablePhone: submission.accountsPayablePhone,
      billingAddressLine1: submission.billingAddressLine1,
      billingCity: submission.billingCity,
      billingState: submission.billingState,
      billingZipCode: submission.billingZipCode,
      invoicingInstructions: submission.invoicingInstructions,
      paymentMethod: submission.paymentMethod,
      w9Upload: submission.w9Upload,
      shipmentTypes: submission.shipmentTypes,
      equipmentTypes: submission.equipmentTypes,
      shipmentBuild: submission.shipmentBuild,
      additionalRequirements: submission.additionalRequirements,
      monthlyShipments: submission.monthlyShipments,
      exceptionCommunication: submission.exceptionCommunication,
      reviewFrequency: submission.reviewFrequency,
      submittedAt: submission.submittedAt.toISOString(),
      submissionId: submission.id,
      ipAddress: submission.ipAddress || "N/A",
      userAgent: submission.userAgent || "N/A",
      browser: submission.browser || "N/A",
    };

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      ClientOnboardingPDF({ formData })
    );

    // Create filename
    const sanitizedCompanyName = (submission.companyLegalName || "Unknown")
      .replace(/[^a-zA-Z0-9]/g, "_")
      .substring(0, 50);
    const filename = `Onboarding_${sanitizedCompanyName}_${submission.id}.pdf`;

    // Return PDF as download
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
