import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { renderToBuffer } from "@react-pdf/renderer";
import ClientOnboardingPDF from "@/components/pdf/ClientOnboardingPDF";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, formId, w9Upload, ...formData } = body;

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

    // 3. Create submission in database
    const submission = await prisma.submission.create({
      data: {
        formId: form.id,
        ipAddress,
        userAgent,
        browser: userAgent?.split(" ")[0] || null,
        location: null, // Could add geolocation later

        // Basic Client Information
        companyLegalName: formData.companyLegalName,
        division: formData.division,
        branchAddressLine1: formData.branchAddressLine1,
        branchCity: formData.branchCity,
        branchState: formData.branchState,
        branchZipCode: formData.branchZipCode,
        mc: formData.mc || null,
        dot: formData.dot || null,
        scacCode: formData.scacCode || null,

        // Contact Information
        primaryContactFirstName: formData.primaryContactFirstName,
        primaryContactLastName: formData.primaryContactLastName,
        primaryContactEmail: formData.primaryContactEmail,
        primaryContactPhone: formData.primaryContactPhone,
        secondaryContactFirstName: formData.secondaryContactFirstName,
        secondaryContactLastName: formData.secondaryContactLastName,
        secondaryContactEmail: formData.secondaryContactEmail,
        secondaryContactPhone: formData.secondaryContactPhone,
        escalationContactFirstName: formData.escalationContactFirstName,
        escalationContactLastName: formData.escalationContactLastName,
        escalationContactEmail: formData.escalationContactEmail,
        escalationContactPhone: formData.escalationContactPhone,
        accountsPayableFirstName: formData.accountsPayableFirstName,
        accountsPayableLastName: formData.accountsPayableLastName,
        accountsPayableEmail: formData.accountsPayableEmail,
        accountsPayablePhone: formData.accountsPayablePhone,

        // Financial Information
        billingAddressLine1: formData.billingAddressLine1,
        billingCity: formData.billingCity,
        billingState: formData.billingState,
        billingZipCode: formData.billingZipCode,
        invoicingInstructions: formData.invoicingInstructions || null,
        paymentMethod: formData.paymentMethod,
        w9Upload: w9Upload || null, // Store base64 W-9

        // Operations Information
        shipmentTypes: Array.isArray(formData.shipmentTypes)
          ? formData.shipmentTypes.join(", ")
          : formData.shipmentTypes,
        equipmentTypes: Array.isArray(formData.equipmentTypes)
          ? formData.equipmentTypes.join(", ")
          : formData.equipmentTypes,
        shipmentBuild: Array.isArray(formData.shipmentBuild)
          ? formData.shipmentBuild.join(", ")
          : formData.shipmentBuild,
        additionalRequirements: Array.isArray(formData.additionalRequirements)
          ? formData.additionalRequirements.join(", ")
          : formData.additionalRequirements,
        monthlyShipments: formData.monthlyShipments,
        exceptionCommunication: formData.exceptionCommunication,
        reviewFrequency: formData.reviewFrequency,
      },
    });

    console.log("✅ Submission created:", submission.id);

    // 4. Generate onboarding PDF
    const pdfBuffer = await renderToBuffer(
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

    console.log("✅ Onboarding PDF generated");

    // 5. Save PDFs to temporary directory
    const tempDir = join(process.cwd(), "temp", "submissions", submission.id);
    await mkdir(tempDir, { recursive: true });

    // Save onboarding PDF
    await writeFile(join(tempDir, "onboarding.pdf"), pdfBuffer);
    console.log("✅ Onboarding PDF saved to disk");

    // Save W9 PDF if provided
    if (w9Upload) {
      const w9Buffer = Buffer.from(w9Upload, "base64");
      await writeFile(join(tempDir, "w9.pdf"), w9Buffer);
      console.log("✅ W9 PDF saved to disk");
    }

    // 6. Prepare filenames
    const sanitizedCompanyName = formData.companyLegalName
      .replace(/[^a-zA-Z0-9]/g, "_")
      .substring(0, 50);
    const timestamp = Date.now();

    const onboardingFilename = `Onboarding_${sanitizedCompanyName}_${timestamp}.pdf`;
    const w9Filename = w9Upload ? `W9_${sanitizedCompanyName}_${timestamp}.pdf` : null;

    // 7. Generate download URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.headers.get("origin") || "http://localhost:3000";
    const onboardingUrl = `${baseUrl}/api/download/${submission.id}/onboarding`;
    const w9Url = w9Upload ? `${baseUrl}/api/download/${submission.id}/w9` : null;

    // 8. Send to Zapier webhook
    const zapierPayload = {
      submission_id: submission.id,
      company_name: formData.companyLegalName,
      submitted_at: submission.submittedAt.toISOString(),

      // Download URLs
      onboarding_pdf_url: onboardingUrl,
      onboarding_pdf_filename: onboardingFilename,

      w9_pdf_url: w9Url,
      w9_pdf_filename: w9Filename,

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
      const zapierResponse = await fetch(process.env.ONBOARDING_ZAPIER_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zapierPayload),
      });

      if (zapierResponse.ok) {
        // Update submission with Zapier success
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

    console.log("✅ Form submission completed successfully");

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
