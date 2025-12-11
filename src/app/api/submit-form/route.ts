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

// Database optimization constants
const MAX_FORM_DATA_SIZE = 10 * 1024 * 1024; // 10MB limit for formData JSON
const MAX_FILES_SIZE = 50 * 1024 * 1024; // 50MB limit for files JSON

// Initialize Resend for email notifications
const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { formId, formData, files, recaptchaToken } = body;

    // 1. Validate form exists and is active
    const form = await prisma.form.findUnique({
      where: { id: formId },
      select: {
        id: true,
        formType: true,
        isActive: true,
      },
    });

    if (!form) {
      return NextResponse.json({ error: "Invalid form" }, { status: 404 });
    }

    if (!form.isActive) {
      return NextResponse.json({ error: "Form is no longer active" }, { status: 400 });
    }

    // 1.5. Verify reCAPTCHA for CARRIER_ONBOARDING form
    if (form.formType === "CARRIER_ONBOARDING") {
      const BYPASS_RECAPTCHA = process.env.NODE_ENV === "development" || process.env.BYPASS_RECAPTCHA === "true";

      if (!BYPASS_RECAPTCHA) {
        if (!recaptchaToken) {
          return NextResponse.json(
            { error: "reCAPTCHA token missing" },
            { status: 400 }
          );
        }

        try {
          const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
          });

          const recaptchaResult = await recaptchaResponse.json();

          console.log("reCAPTCHA result:", {
            success: recaptchaResult.success,
            score: recaptchaResult.score,
            action: recaptchaResult.action,
          });

          if (!recaptchaResult.success || recaptchaResult.score < 0.3) {
            console.error("reCAPTCHA verification failed:", recaptchaResult);
            return NextResponse.json(
              {
                error: "reCAPTCHA verification failed. Please try again.",
                details: recaptchaResult["error-codes"],
              },
              { status: 400 }
            );
          }
        } catch (recaptchaError: any) {
          console.error("reCAPTCHA verification error:", recaptchaError);
          return NextResponse.json(
            { error: "reCAPTCHA verification failed" },
            { status: 500 }
          );
        }
      }
    }

    // 2. Validate data size to prevent database bloat
    const formDataSize = JSON.stringify(formData).length;
    const filesSize = files ? JSON.stringify(files).length : 0;

    if (formDataSize > MAX_FORM_DATA_SIZE) {
      return NextResponse.json(
        { error: `Form data too large (${(formDataSize / 1024 / 1024).toFixed(2)}MB). Maximum allowed is 10MB.` },
        { status: 413 }
      );
    }

    if (filesSize > MAX_FILES_SIZE) {
      return NextResponse.json(
        { error: `Files too large (${(filesSize / 1024 / 1024).toFixed(2)}MB). Maximum allowed is 50MB.` },
        { status: 413 }
      );
    }

    // 3. Get client metadata
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || null;
    const userAgent = request.headers.get("user-agent") || null;

    // 4. Extract common fields based on form type
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
      case "DOORDASH_DRIVER_CHECKIN":
        submitterName = `${formData.firstName} ${formData.lastName}`;
        submitterPhone = formData.phoneNumber;
        companyName = formData.carrierName;
        break;
      // Other forms don't have standard contact info
    }

    // 5. Create submission in database
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

    // 6. Generate PDF (form-specific logic will be added later)
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

    // 7. Save PDF to temp directory if generated
    if (pdfBuffer) {
      const tempDir = join(process.cwd(), "temp", "submissions", submission.id);
      await mkdir(tempDir, { recursive: true });
      await writeFile(join(tempDir, pdfFilename!), pdfBuffer);
      console.log(`✅ PDF saved: ${pdfFilename}`);
    }

    // 8. Send to Zapier ONLY for CARRIER_ONBOARDING (original form)
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

    // 9. Send email notifications for CARRIER_ONBOARDING form
    if (form.formType === "CARRIER_ONBOARDING" && pdfBuffer && files?.w9) {
      try {
        // Render HTML email
        const emailHtml = await render(
          ClientOnboardingEmail({
            data: formData,
            submissionId: submission.id,
          })
        );

        // Prepare W9 attachment (convert base64 to buffer)
        const w9Data = files.w9.data || files.w9; // Handle different formats
        const w9Buffer = Buffer.from(w9Data, "base64");

        // Send email to recipients with attachments
        // TODO: Update to production emails after testing
        const emailResult = await resend.emails.send({
          from: "CR Express <contact@forms.crexpressinc.com>",
          to: ["andrew@goweblink.io"], // Test email - change to production after verification
          // Production emails: ["cr@crexpressinc.com", "CLIENTONBOARDING@CREXPRESSINC.COM", "Aamro@crexpressinc.com"]
          subject: `[TEST] New Client Onboarding: ${formData.companyLegalName}`,
          html: emailHtml,
          attachments: [
            {
              filename: pdfFilename!,
              content: pdfBuffer,
            },
            {
              filename: `W9_${formData.companyLegalName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
              content: w9Buffer,
            },
          ],
        });

        console.log("✅ Email sent successfully:", emailResult.data?.id || "success");
      } catch (emailError: any) {
        console.error("❌ Error sending email:", emailError);
        // Don't fail the submission if email fails, just log it
      }
    }

    // 10. Send email for DOORDASH_DRIVER_CHECKIN form
    if (form.formType === "DOORDASH_DRIVER_CHECKIN") {
      try {
        // Prepare BOL attachment if provided
        let bolAttachment = null;
        if (files?.bol) {
          const bolData = files.bol.data || files.bol;
          const bolBuffer = Buffer.from(bolData, "base64");
          bolAttachment = {
            filename: files.bol.filename || `BOL_${formData.firstName}_${formData.lastName}.pdf`,
            content: bolBuffer,
          };
        }

        // Format the email body with form data
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
              New Driver Check-In Submission
            </h2>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold; width: 40%;">Driver Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${formData.firstName} ${formData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Carrier Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${formData.carrierName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Truck Type:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${formData.truckType}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Phone Number:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${formData.phoneNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Truck Number:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${formData.truckNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Trailer Number:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${formData.trailerNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Submitted At:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${new Date(formData.submittedAt).toLocaleString()}</td>
              </tr>
            </table>

            <p style="margin-top: 20px; color: #666;">
              ${bolAttachment ? "BOL document is attached to this email." : "No BOL document was uploaded."}
            </p>

            <p style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px; color: #92400e;">
              <strong>Submission ID:</strong> ${submission.id}
            </p>
          </div>
        `;

        const emailResult = await resend.emails.send({
          from: "CR Express <contact@forms.crexpressinc.com>",
          to: ["doordashlead@crexpressinc.com"],
          subject: `Driver Check-In: ${formData.firstName} ${formData.lastName} - ${formData.carrierName}`,
          html: emailHtml,
          attachments: bolAttachment ? [bolAttachment] : [],
        });

        console.log("✅ DoorDash Driver Check-In email sent:", emailResult.data?.id || "success");
      } catch (emailError: any) {
        console.error("❌ Error sending DoorDash Driver Check-In email:", emailError);
        // Don't fail the submission if email fails
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
