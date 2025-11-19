import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { LocationQuoteEmail } from '@/lib/email-templates';
import { locationQuoteSchema } from '@/lib/validation/schemas';
import { sanitizeFormData } from '@/lib/sanitize';
import { rateLimitFormSubmission } from '@/lib/rateLimit';
import { formatPhoneForClickUp, verifyRecaptcha } from '@/lib/formHelpers';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting check
    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     request.headers.get("x-real-ip") ||
                     "unknown";

    const rateLimitResult = await rateLimitFormSubmission(ipAddress);

    if (!rateLimitResult.success) {
      const minutesUntilReset = Math.ceil((rateLimitResult.reset - Date.now()) / 60000);
      return NextResponse.json(
        { error: `Too many requests. Please try again in ${minutesUntilReset} minutes.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { formData, cityName, recaptchaToken } = body;

    // 2. Validate with Zod
    const validation = locationQuoteSchema.safeParse({
      ...formData,
      cityName,
      recaptchaToken,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // 3. Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(validatedData.recaptchaToken);
    if (!recaptchaResult.success) {
      return NextResponse.json({ error: recaptchaResult.error }, { status: 400 });
    }

    // 4. Sanitize inputs
    const sanitizedData = sanitizeFormData({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || '',
      company: validatedData.company || '',
      message: validatedData.message,
      cityName: validatedData.cityName || '',
      service: formData.service || '', // Include service field for Zapier routing
    });

    // 5. Render and send email
    const emailHtml = await render(
      LocationQuoteEmail({
        data: sanitizedData,
        cityName: sanitizedData.cityName
      })
    );

    const { data, error } = await resend.emails.send({
      from: 'CR Express <contact@forms.crexpressinc.com>',
      to: ['aamro@crexpressinc.com'],
      replyTo: sanitizedData.email,
      subject: `New Location Quote Request: ${sanitizedData.cityName || 'Location'} - ${sanitizedData.name}`,
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // 6. Send to Zapier
    if (process.env.ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(process.env.ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formType: 'location-quote',
            ...sanitizedData,
            phone: sanitizedData.phone ? formatPhoneForClickUp(sanitizedData.phone) : '',
            submittedAt: new Date().toISOString(),
            ipAddress: ipAddress === 'unknown' ? null : ipAddress,
          }),
        });
      } catch (zapierError) {
        console.error('❌ Zapier error:', zapierError);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Location quote request submitted successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Location quote API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
