import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { renderToBuffer } from "@react-pdf/renderer";
import ClientOnboardingPDF from "@/components/pdf/ClientOnboardingPDF";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { generateSignedUrl } from "@/lib/signedUrls";

/**
 * Unified Form Submission API
 *
 * Handles submissions for all 13 form types:
 * - Stores data in formData JSON field
 * - Stores files in files JSON field
 * - Extracts common fields for universal querying
 * - Generates form-specific PDFs
 * - ONLY sends to Zapier for CARRIER_ONBOARDING (original complex form)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formId, formData, files } = body;

    // 1. Validate form exists and is active
    const form = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return NextResponse.json({ error: "Invalid form" }, { status: 404 });
    }

    if (!form.isActive) {
      return NextResponse.json({ error: "Form is no longer active" }, { status: 400 });
    }

    // 2. Get client metadata
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || null;
    const userAgent = request.headers.get("user-agent") || null;

    // 3. Extract common fields based on form type
    let submitterName = null;
    let submitterEmail = null;
    let submitterPhone = null;
    let companyName = null;

    switch (form.formType) {
      case "CARRIER_ONBOARDING":
        submitterName = `${formData.primaryContactFirstName} ${formData.primaryContactLastName}`;
        submitterEmail = formData.primaryContactEmail;
        submitterPhone = formData.primaryContactPhone;
        companyName = formData.companyLegalName;
        break;
      case "AXIOM_CARRIER_ONBOARDING":
        submitterName = null; // No contact name in this form
        submitterEmail = null;
        submitterPhone = null;
        companyName = formData.companyLegalName;
        break;
      case "BATHROOM_REQUEST":
        submitterName = `${formData.firstName} ${formData.lastName}`;
        break;
      case "WAREHOUSE_CHECKIN":
        submitterName = `${formData.driverFirstName} ${formData.driverLastName}`;
        submitterPhone = formData.phoneNumber;
        companyName = formData.companyName;
        break;
      case "DRIVER_FEEDBACK":
        submitterName = formData.driverName;
        break;
      case "EMPLOYEE_ASSET_CHECKIN":
      case "WAREHOUSE_SERVICES":
        submitterName = `${formData.firstName} ${formData.lastName}`;
        break;
      case "LOAD_CREATION_REQUEST":
        submitterName = `${formData.driverFirstName} ${formData.driverLastName}`;
        break;
      // Other forms don't have standard contact info
    }

    // 4. Create submission in database
    const submission = await prisma.submission.create({
      data: {
        formId: form.id,
        ipAddress,
        userAgent,
        browser: userAgent?.split(" ")[0] || null,
        location: null,

        // Common fields for universal querying
        submitterName,
        submitterEmail,
        submitterPhone,
        companyName,

        // Store complete form data as JSON
        formData: formData,

        // Store files as JSON
        files: files || undefined,
      },
    });

    console.log(`✅ ${form.formType} submission created:`, submission.id);

    // 5. Generate PDF (form-specific logic will be added later)
    let pdfBuffer = null;
    let pdfFilename = null;

    if (form.formType === "CARRIER_ONBOARDING") {
      // Use existing carrier onboarding PDF
      pdfBuffer = await renderToBuffer(
        ClientOnboardingPDF({
          formData: {
            ...formData,
            submittedAt: submission.submittedAt.toISOString(),
            submissionId: submission.id,
            ipAddress: ipAddress || "N/A",
            userAgent: userAgent || "N/A",
            browser: submission.browser || "N/A",
          },
        })
      );

      const sanitizedCompanyName = formData.companyLegalName
        .replace(/[^a-zA-Z0-9]/g, "_")
        .substring(0, 50);
      pdfFilename = `Carrier_Onboarding_${sanitizedCompanyName}_${submission.id}.pdf`;

      console.log("✅ Carrier Onboarding PDF generated");
    }
    // TODO: Add PDF generation for other form types in Phase 4

    // 6. Save PDF to temp directory if generated
    if (pdfBuffer) {
      const tempDir = join(process.cwd(), "temp", "submissions", submission.id);
      await mkdir(tempDir, { recursive: true });
      await writeFile(join(tempDir, pdfFilename!), pdfBuffer);
      console.log(`✅ PDF saved: ${pdfFilename}`);
    }

    // 7. Send to Zapier ONLY for CARRIER_ONBOARDING (original form)
    if (form.formType === "CARRIER_ONBOARDING" && process.env.ONBOARDING_ZAPIER_WEBHOOK_URL) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.headers.get("origin") || "http://localhost:3000";
      const onboardingUrl = `${baseUrl}${generateSignedUrl(submission.id, "onboarding", 7 * 24 * 60 * 60)}`;

      const zapierPayload = {
        submission_id: submission.id,
        company_name: formData.companyLegalName,
        submitted_at: submission.submittedAt.toISOString(),
        onboarding_pdf_url: onboardingUrl,
        onboarding_pdf_filename: pdfFilename,
        metadata: {
          division: formData.division,
          branch: `${formData.branchAddressLine1}, ${formData.branchCity}, ${formData.branchState} ${formData.branchZipCode}`,
          mc: formData.mc || "N/A",
          dot: formData.dot || "N/A",
          scac_code: formData.scacCode || "N/A",
          primary_contact_email: formData.primaryContactEmail,
        },
      };

      try {
        const zapierResponse = await fetch(process.env.ONBOARDING_ZAPIER_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(zapierPayload),
        });

        if (zapierResponse.ok) {
          await prisma.submission.update({
            where: { id: submission.id },
            data: {
              sentToZapier: true,
              zapierSentAt: new Date(),
            },
          });
          console.log("✅ Sent to Zapier successfully");
        } else {
          const errorText = await zapierResponse.text();
          await prisma.submission.update({
            where: { id: submission.id },
            data: {
              zapierError: `HTTP ${zapierResponse.status}: ${errorText}`,
            },
          });
          console.error("❌ Zapier webhook failed:", errorText);
        }
      } catch (zapierError: any) {
        console.error("❌ Error sending to Zapier:", zapierError);
        await prisma.submission.update({
          where: { id: submission.id },
          data: {
            zapierError: zapierError.message,
          },
        });
      }
    }

    console.log(`✅ ${form.formType} submission completed successfully`);

    return NextResponse.json({
      success: true,
      submission_id: submission.id,
      message: "Form submitted successfully",
    });
  } catch (error: any) {
    console.error("❌ Error submitting form:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit form" },
      { status: 500 }
    );
  }
}
