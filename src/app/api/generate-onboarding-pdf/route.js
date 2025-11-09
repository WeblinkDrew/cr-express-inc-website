import { renderToBuffer } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import ClientOnboardingPDF from '@/components/pdf/ClientOnboardingPDF';

// Set Vercel function timeout to 10 seconds
export const maxDuration = 10;

/**
 * Generate PDF from form data using React-PDF
 */
async function generateFormPDF(formData) {
  console.log('📄 Generating onboarding PDF...');
  const pdfBuffer = await renderToBuffer(
    <ClientOnboardingPDF data={formData} />
  );
  return pdfBuffer;
}

/**
 * Download W-9 PDF from Formstack URL
 */
async function downloadW9(url) {
  console.log('⬇️  Downloading W-9 from:', url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download W-9: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Convert buffer to base64 string
 */
function convertToBase64(buffer) {
  return buffer.toString('base64');
}

/**
 * Generate filename from company name and unique ID
 * Sanitizes company name by removing special characters
 */
function generateFilename(companyName, uniqueId, type) {
  // Sanitize company name: remove special chars, replace spaces with dashes
  const sanitized = companyName
    .replace(/[^a-z0-9\s]/gi, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .replace(/^-|-$/g, ''); // Remove leading/trailing dashes

  return `${type}-${sanitized}-${uniqueId}.pdf`;
}

/**
 * POST endpoint to generate onboarding PDF and download W-9
 * Receives form data from Zapier webhook
 * Returns both PDFs as base64 encoded strings
 */
export async function POST(request) {
  try {
    // Parse incoming JSON from Zapier
    const formData = await request.json();

    console.log('📝 Generating PDFs for:', formData.company_legal_name);
    console.log('   Submission ID:', formData.unique_id);

    // Validate required fields
    if (!formData.company_legal_name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: company_legal_name'
        },
        { status: 400 }
      );
    }

    if (!formData.unique_id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: unique_id'
        },
        { status: 400 }
      );
    }

    // Generate onboarding form PDF
    const formPdfBuffer = await generateFormPDF(formData);
    console.log('✅ Onboarding PDF generated');

    // Handle W-9 PDF
    let w9Base64 = null;
    let w9Filename = null;

    // Option 1: W-9 already provided as base64 from Zapier (recommended)
    if (formData.w9_file_base64) {
      console.log('📎 Using W-9 base64 from Zapier');
      w9Base64 = formData.w9_file_base64;
      w9Filename = generateFilename(
        formData.company_legal_name,
        formData.unique_id,
        'W9'
      );
      console.log('✅ W-9 received from Zapier');
    }
    // Option 2: Try to download W-9 from URL (may fail if auth required)
    else if (formData.w9_upload) {
      try {
        console.log('⬇️  Attempting to download W-9 from URL...');
        const w9Buffer = await downloadW9(formData.w9_upload);
        w9Base64 = convertToBase64(w9Buffer);
        w9Filename = generateFilename(
          formData.company_legal_name,
          formData.unique_id,
          'W9'
        );
        console.log('✅ W-9 downloaded and converted');
      } catch (w9Error) {
        console.error('⚠️  W-9 download failed:', w9Error.message);
        console.error('   Note: Formstack URLs require authentication');
        console.error('   Solution: Have Zapier download and send as base64');
        // Continue without W-9 - not a fatal error
      }
    } else {
      console.log('ℹ️  No W-9 provided, skipping');
    }

    // Convert onboarding PDF to base64
    const formPdfBase64 = convertToBase64(formPdfBuffer);

    // Generate filenames
    const onboardingFilename = generateFilename(
      formData.company_legal_name,
      formData.unique_id,
      'Onboarding'
    );

    // Prepare response
    const response = {
      success: true,
      files: {
        onboarding_pdf: formPdfBase64,
      },
      filenames: {
        onboarding: onboardingFilename,
      }
    };

    // Add W-9 to response if available
    if (w9Base64) {
      response.files.w9_pdf = w9Base64;
      response.filenames.w9 = w9Filename;
    }

    console.log('✅ PDFs ready for delivery');
    console.log('   Onboarding filename:', onboardingFilename);
    if (w9Filename) {
      console.log('   W-9 filename:', w9Filename);
    }

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('❌ Error generating PDFs:', error);
    console.error('   Stack:', error.stack);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
