import { NextRequest, NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validation/schemas';
import { sanitizeFormData } from '@/lib/sanitize';
import { rateLimitFormSubmission } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting check (5 requests per hour per IP)
    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     request.headers.get("x-real-ip") ||
                     "unknown";

    const rateLimitResult = await rateLimitFormSubmission(ipAddress);

    if (!rateLimitResult.success) {
      const minutesUntilReset = Math.ceil((rateLimitResult.reset - Date.now()) / 60000);
      console.log(`⚠️ Rate limit exceeded for newsletter subscription from IP: ${ipAddress}`);

      return NextResponse.json(
        {
          error: `Too many subscription attempts. Please try again in ${minutesUntilReset} minutes.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 2. Validate with Zod schema
    const validation = newsletterSchema.safeParse(body);

    if (!validation.success) {
      console.log('❌ Newsletter validation failed:', validation.error.flatten());
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, recaptchaToken } = validation.data;

    // 3. Verify reCAPTCHA
    try {
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        }
      );

      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.log('❌ reCAPTCHA verification failed:', {
          success: recaptchaData.success,
          score: recaptchaData.score,
          action: recaptchaData.action,
        });

        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }

      console.log(`✅ reCAPTCHA passed (score: ${recaptchaData.score})`);
    } catch (recaptchaError) {
      console.error('❌ reCAPTCHA error:', recaptchaError);
      return NextResponse.json(
        { error: 'Failed to verify reCAPTCHA. Please try again.' },
        { status: 500 }
      );
    }

    // 4. Sanitize inputs to prevent XSS
    const sanitizedData = sanitizeFormData({ name, email });
    console.log('✅ Newsletter data sanitized');

    // 5. Send data to Zapier webhook for newsletter
    if (process.env.ZAPIER_NEWSLETTER_WEBHOOK_URL) {
      try {
        const response = await fetch(process.env.ZAPIER_NEWSLETTER_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: sanitizedData.name,
            email: sanitizedData.email,
            subscribedAt: new Date().toISOString(),
            source: 'website-footer',
            ipAddress: ipAddress === 'unknown' ? null : ipAddress,
          }),
        });

        if (!response.ok) {
          console.error('❌ Zapier webhook error:', await response.text());
          return NextResponse.json(
            { error: 'Failed to subscribe. Please try again.' },
            { status: 500 }
          );
        }

        console.log(`✅ Newsletter subscription sent to Zapier: ${sanitizedData.email}`);
      } catch (zapierError) {
        console.error('❌ Zapier webhook error:', zapierError);
        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        );
      }
    } else {
      console.error('❌ Newsletter webhook URL not configured');
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
