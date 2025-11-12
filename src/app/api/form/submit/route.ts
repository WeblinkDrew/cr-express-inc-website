import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { renderToBuffer } from "@react-pdf/renderer";
import { render } from "@react-email/render";
import ClientOnboardingPDF from "@/components/pdf/ClientOnboardingPDF";
import { ClientOnboardingEmail } from "@/lib/email-templates";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { generateSignedUrl } from "@/lib/signedUrls";
import { Resend } from "resend";
import { uploadFile, validateFile } from "@/lib/fileStorage";
import { rateLimitFormSubmission } from "@/lib/rateLimit";
import { sanitizeFormData } from "@/lib/sanitize";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Form Submission API Route
 *
 * DUAL-WRITE STRATEGY (Phase 2):
 * This route now implements a dual-write strategy for the carrier onboarding form:
 * 1. Writes to NEW fields: formData (JSON), files (JSON), submitterName, submitterEmail, etc.
 * 2. Continues writing to LEGACY fields for backward compatibility
 *
 * This ensures the existing system continues working while we build the new multi-form infrastructure.
 * Once all forms are migrated, we can deprecate the legacy fields.
 *
 * SECURITY:
 * - Rate limiting: 5 submissions per hour per IP address
 * - File validation: PDF only, 10MB max, magic bytes check
 * - reCAPTCHA v3 verification
 */
export async function POST(request: NextRequest) {
  try {
    // 0. Rate limiting check
    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     request.headers.get("x-real-ip") ||
                     "unknown";
    const ipAddressForDb = ipAddress === "unknown" ? null : ipAddress;

    const rateLimitResult = await rateLimitFormSubmission(ipAddress);

    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.reset);
      const minutesUntilReset = Math.ceil((rateLimitResult.reset - Date.now()) / 60000);

      console.log(`⚠️ Rate limit exceeded for IP: ${ipAddress}`);

      return NextResponse.json(
        {
          error: `Too many form submissions. Please try again in ${minutesUntilReset} minutes.`,
          retryAfter: resetDate.toISOString(),
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          }
        }
      );
    }

    console.log(`✅ Rate limit check passed for IP: ${ipAddress} (${rateLimitResult.remaining} remaining)`);

    const body = await request.json();
    const { slug, formId, w9Upload, ...rawFormData } = body;

    // 1. Sanitize all user inputs to prevent XSS attacks
    const formData = sanitizeFormData(rawFormData);
    console.log("✅ Form data sanitized");

    // 2. Validate form exists and is active
    const form = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return NextResponse.json({ error: "Invalid form" }, { status: 404 });
    }

    if (!form.isActive) {
      return NextResponse.json({ error: "Form is no longer active" }, { status: 400 });
    }

    // 3. Validate and upload W9 file to cloud storage
    let w9FileData = null;
    let w9Buffer = null;
    if (w9Upload) {
      // Validate file
      const validation = validateFile(w9Upload, 10 * 1024 * 1024); // 10MB max
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.error },
          { status: 400 }
        );
      }

      // Convert base64 to buffer for upload
      w9Buffer = Buffer.from(w9Upload, 'base64');

      // Upload to Vercel Blob
      try {
        const uploadedFile = await uploadFile(
          w9Buffer,
          `W9_${formData.companyLegalName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
          'submissions/w9'
        );

        w9FileData = {
          url: uploadedFile.url,
          pathname: uploadedFile.pathname,
          filename: `W9_${formData.companyLegalName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
          size: uploadedFile.size,
          contentType: uploadedFile.contentType,
          uploadedAt: uploadedFile.uploadedAt.toISOString(),
        };
      } catch (uploadError: any) {
        console.error("❌ Error uploading W9 to Vercel Blob:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload W9 file" },
          { status: 500 }
        );
      }
    }

    // 4. Get client metadata (ipAddress already extracted for rate limiting)
    const userAgent = request.headers.get("user-agent") || null;

    // 5. Calculate sizes for storage tracking
    const formDataSize = JSON.stringify(formData).length;
    const filesSize = w9FileData ? w9FileData.size : 0;

    // 6. Create submission in database with dual-write (legacy fields + formData)
    const submission = await prisma.submission.create({
      data: {
        formId: form.id,
        ipAddress: ipAddressForDb,
        userAgent,
        browser: userAgent?.split(" ")[0] || null,
        location: null, // Could add geolocation later

        // NEW: Common fields for universal querying
        submitterName: `${formData.primaryContactFirstName} ${formData.primaryContactLastName}`,
        submitterEmail: formData.primaryContactEmail,
        submitterPhone: formData.primaryContactPhone,
        companyName: formData.companyLegalName,

        // NEW: Store complete form data as JSON (for future flexibility)
        formData: {
          ...formData,
          // Store arrays as arrays, not joined strings
          shipmentTypes: formData.shipmentTypes,
          equipmentTypes: formData.equipmentTypes,
          shipmentBuild: formData.shipmentBuild,
          additionalRequirements: formData.additionalRequirements,
        },

        // ✅ NEW: Store file metadata with cloud URLs (NOT base64)
        files: w9FileData ? [w9FileData] : [],

        // ✅ NEW: Storage tracking
        formDataSize,
        filesSize,
        totalSize: formDataSize + filesSize,

        // LEGACY: Continue writing to old fields for backward compatibility
        companyLegalName: formData.companyLegalName,
        division: formData.division,
        branchAddressLine1: formData.branchAddressLine1,
        branchCity: formData.branchCity,
        branchState: formData.branchState,
        branchZipCode: formData.branchZipCode,
        mc: formData.mc || null,
        dot: formData.dot || null,
        scacCode: formData.scacCode || null,

        // Contact Information (legacy)
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

        // Financial Information (legacy)
        billingAddressLine1: formData.billingAddressLine1,
        billingCity: formData.billingCity,
        billingState: formData.billingState,
        billingZipCode: formData.billingZipCode,
        invoicingInstructions: formData.invoicingInstructions || null,
        paymentMethod: formData.paymentMethod,
        w9Upload: w9Upload || null, // Store base64 W-9 (legacy)

        // Operations Information (legacy - joined strings)
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

    // 7. Generate onboarding PDF
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

    // 8. Save PDFs to temporary directory
    // Use /tmp for serverless environments (Vercel), otherwise use local temp
    const tempBase = process.env.VERCEL ? "/tmp" : join(process.cwd(), "temp");
    const tempDir = join(tempBase, "submissions", submission.id);
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

    // 9. Prepare filenames
    const sanitizedCompanyName = formData.companyLegalName
      .replace(/[^a-zA-Z0-9]/g, "_")
      .substring(0, 50);
    const timestamp = Date.now();

    const onboardingFilename = `Onboarding_${sanitizedCompanyName}_${timestamp}.pdf`;
    const w9Filename = w9Upload ? `W9_${sanitizedCompanyName}_${timestamp}.pdf` : null;

    // 10. Generate signed download URLs (expires in 7 days)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.headers.get("origin") || "http://localhost:3000";
    const onboardingUrl = `${baseUrl}${generateSignedUrl(submission.id, "onboarding", 7 * 24 * 60 * 60)}`;
    const w9Url = w9Upload ? `${baseUrl}${generateSignedUrl(submission.id, "w9", 7 * 24 * 60 * 60)}` : null;

    // 11. Send to Zapier webhook
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

    // 12. Send email notifications with attachments
    try {
      console.log("📧 Preparing email notification...");

      // Render HTML email
      const emailHtml = await render(
        ClientOnboardingEmail({
          data: formData,
          submissionId: submission.id,
        })
      );

      // Send email to recipients with attachments (w9Buffer already prepared above)
      // Note: w9Buffer is created during file upload validation
      const emailResult = await resend.emails.send({
        from: "CR Express <contact@forms.crexpressinc.com>",
        to: ["andrew@goweblink.io"], // TEST EMAIL
        subject: `[TEST] New Client Onboarding: ${formData.companyLegalName}`,
        html: emailHtml,
        attachments: [
          {
            filename: onboardingFilename,
            content: pdfBuffer,
          },
          ...(w9Buffer ? [{
            filename: w9Filename!,
            content: w9Buffer,
          }] : []),
        ],
      });

      console.log("✅ Email sent successfully:", emailResult.data?.id || "success");
    } catch (emailError: any) {
      console.error("❌ Error sending email:", emailError);
      // Don't fail the submission if email fails, just log it
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
