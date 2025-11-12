import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { ContactEmail } from '@/lib/email-templates';
import { contactSchema } from '@/lib/validation/schemas';
import { sanitizeFormData } from '@/lib/sanitize';
import { rateLimitFormSubmission } from '@/lib/rateLimit';

const resend = new Resend(process.env.RESEND_API_KEY);

// Format phone number to +1 123 456 7890 format for ClickUp
function formatPhoneForClickUp(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Take last 10 digits (in case country code is included)
  const last10 = cleaned.slice(-10);

  // Format as +1 XXX XXX XXXX
  if (last10.length === 10) {
    return `+1 ${last10.slice(0, 3)} ${last10.slice(3, 6)} ${last10.slice(6)}`;
  }

  // Return original if not 10 digits
  return phone;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting check (5 requests per hour per IP)
    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     request.headers.get("x-real-ip") ||
                     "unknown";

    const rateLimitResult = await rateLimitFormSubmission(ipAddress);

    if (!rateLimitResult.success) {
      const minutesUntilReset = Math.ceil((rateLimitResult.reset - Date.now()) / 60000);
      console.log(`⚠️ Rate limit exceeded for contact form from IP: ${ipAddress}`);

      return NextResponse.json(
        {
          error: `Too many contact form submissions. Please try again in ${minutesUntilReset} minutes.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { formData, recaptchaToken } = body;

    // 2. Validate with Zod schema (merge formData with recaptchaToken for validation)
    const validation = contactSchema.safeParse({
      ...formData,
      recaptchaToken,
    });

    if (!validation.success) {
      console.log('❌ Contact form validation failed:', validation.error.flatten());
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // 3. Verify reCAPTCHA (ONLY bypass in development, NOT in production)
    const BYPASS_RECAPTCHA = process.env.NODE_ENV === 'development'; // REMOVED production bypass

    if (!BYPASS_RECAPTCHA) {
      try {
        console.log('Verifying reCAPTCHA...');

        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${validatedData.recaptchaToken}`,
        });

        const recaptchaResult = await recaptchaResponse.json();

        console.log('reCAPTCHA result:', {
          success: recaptchaResult.success,
          score: recaptchaResult.score,
          action: recaptchaResult.action,
        });

        if (!recaptchaResult.success) {
          console.error('❌ reCAPTCHA verification failed:', recaptchaResult);

          const errorMessage = recaptchaResult['error-codes']?.[0] === 'invalid-input-response'
            ? 'reCAPTCHA token is invalid or expired. Please refresh the page and try again.'
            : `reCAPTCHA verification failed: ${recaptchaResult['error-codes']?.join(', ') || 'Unknown error'}`;

          return NextResponse.json(
            { error: errorMessage },
            { status: 400 }
          );
        }

        // Check score (0.3 threshold - reasonable but secure)
        if (recaptchaResult.score !== undefined && recaptchaResult.score < 0.3) {
          console.error('❌ reCAPTCHA score too low:', recaptchaResult.score);
          return NextResponse.json(
            { error: 'Security verification failed. Please try again.' },
            { status: 400 }
          );
        }

        console.log(`✅ reCAPTCHA passed (score: ${recaptchaResult.score})`);
      } catch (recaptchaError) {
        console.error('❌ reCAPTCHA error:', recaptchaError);
        return NextResponse.json(
          { error: 'Failed to verify reCAPTCHA. Please try again.' },
          { status: 500 }
        );
      }
    } else {
      console.log('⚠️ reCAPTCHA bypassed (development mode only)');
    }

    // 4. Sanitize inputs to prevent XSS
    const sanitizedData = sanitizeFormData({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || '',
      message: validatedData.message,
      category: formData.category || 'General Inquiry',
    });
    console.log('✅ Contact form data sanitized');

    // 5. Render the email template to HTML
    const emailHtml = await render(
      ContactEmail({ data: sanitizedData })
    );

    // 6. Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'CR Express <contact@forms.crexpressinc.com>',
      to: ['aamro@crexpressinc.com'],
      replyTo: sanitizedData.email,
      subject: `New Contact Form: ${sanitizedData.category} - ${sanitizedData.name}`,
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return NextResponse.json(
        { error: `Failed to send email: ${error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    console.log(`✅ Contact form email sent: ${data?.id}`);

    // 7. Send data to Zapier webhook (if configured)
    if (process.env.ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(process.env.ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formType: 'contact',
            ...sanitizedData,
            phone: sanitizedData.phone ? formatPhoneForClickUp(sanitizedData.phone) : '',
            submittedAt: new Date().toISOString(),
            ipAddress: ipAddress === 'unknown' ? null : ipAddress,
          }),
        });
        console.log('✅ Contact form sent to Zapier');
      } catch (zapierError) {
        console.error('❌ Zapier webhook error:', zapierError);
        // Don't fail the request if Zapier fails - email was already sent successfully
      }
    }

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Contact form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
