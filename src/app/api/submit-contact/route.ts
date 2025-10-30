import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { ContactEmail } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

// Format phone number to +1 123 456 7890 format for ClickUp
function formatPhoneForClickUp(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')

  // Take last 10 digits (in case country code is included)
  const last10 = cleaned.slice(-10)

  // Format as +1 XXX XXX XXXX
  if (last10.length === 10) {
    return `+1 ${last10.slice(0, 3)} ${last10.slice(3, 6)} ${last10.slice(6)}`
  }

  // Return original if not 10 digits
  return phone
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formData, recaptchaToken } = body

    // Validate required fields
    if (!formData.name || !formData.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TEMPORARY: Skip reCAPTCHA if bypass is enabled (for testing only)
    const BYPASS_RECAPTCHA = process.env.NODE_ENV === 'development' || process.env.BYPASS_RECAPTCHA === 'true'

    if (!BYPASS_RECAPTCHA) {
      // Verify reCAPTCHA token
      if (!recaptchaToken) {
        return NextResponse.json(
          { error: 'reCAPTCHA token missing' },
          { status: 400 }
        )
      }

      // Log what we're sending
      console.log('Verifying reCAPTCHA with:', {
        hasSecret: !!process.env.RECAPTCHA_SECRET_KEY,
        secretPreview: process.env.RECAPTCHA_SECRET_KEY?.substring(0, 10) + '...',
        tokenLength: recaptchaToken?.length,
        tokenPreview: recaptchaToken?.substring(0, 20) + '...'
      })

      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      })

      const recaptchaResult = await recaptchaResponse.json()

      // Log detailed reCAPTCHA response for debugging
      console.log('reCAPTCHA result:', {
        success: recaptchaResult.success,
        score: recaptchaResult.score,
        action: recaptchaResult.action,
        hostname: recaptchaResult.hostname,
        'error-codes': recaptchaResult['error-codes']
      })

      // Lower threshold to 0.3 (was 0.5) and provide better error messages
      if (!recaptchaResult.success) {
        console.error('reCAPTCHA verification failed:', recaptchaResult)

        // Provide more helpful error messages
        const errorMessage = recaptchaResult['error-codes']?.[0] === 'invalid-input-response'
          ? 'reCAPTCHA token is invalid or expired. Please refresh the page and try again.'
          : `reCAPTCHA verification failed: ${recaptchaResult['error-codes']?.join(', ') || 'Unknown error'}`

        return NextResponse.json(
          { error: errorMessage },
          { status: 400 }
        )
      }

      // Check score only if successful (score is only present in v3)
      if (recaptchaResult.score !== undefined && recaptchaResult.score < 0.3) {
        console.error('reCAPTCHA score too low:', recaptchaResult.score)
        return NextResponse.json(
          { error: 'Security verification failed. Please try again.' },
          { status: 400 }
        )
      }
    } else {
      console.log('⚠️ reCAPTCHA bypassed for testing')
    }

    // Render the email template to HTML
    const emailHtml = await render(
      ContactEmail({ data: formData })
    )

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'CR Express <contact@forms.crexpressinc.com>', // Using verified subdomain - "contact" is more trustworthy than "noreply"
      to: ['aamro@crexpressinc.com'], // Send to CR Express
      replyTo: formData.email,
      subject: `New Contact Form: ${formData.category || 'General Inquiry'} - ${formData.name}`,
      html: emailHtml,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: `Failed to send email: ${error.message || 'Unknown error'}` },
        { status: 500 }
      )
    }

    // Send data to Zapier webhook (if configured)
    if (process.env.ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(process.env.ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formType: 'contact',
            ...formData,
            phone: formatPhoneForClickUp(formData.phone), // Format phone for ClickUp
            submittedAt: new Date().toISOString(),
          }),
        })
      } catch (zapierError) {
        console.error('Zapier webhook error:', zapierError)
        // Don't fail the request if Zapier fails - email was already sent successfully
      }
    }

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully', id: data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
