import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { LocationQuoteEmail } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formData, cityName, recaptchaToken } = body

    // Validate required fields
    if (!formData.name || !formData.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA token missing' },
        { status: 400 }
      )
    }

    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    })

    const recaptchaResult = await recaptchaResponse.json()

    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      console.error('reCAPTCHA verification failed:', recaptchaResult)
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Render the email template to HTML
    const emailHtml = await render(
      LocationQuoteEmail({ data: formData, cityName })
    )

    // Send email using Resend
    // Note: Update 'from' email to use your verified domain in Resend dashboard
    const { data, error } = await resend.emails.send({
      from: 'CR EXPRESS <onboarding@resend.dev>',
      to: ['andrew@squarewaves.io'], // Resend test mode - Change to aamro@crexpressinc.com after domain verification
      replyTo: formData.email,
      subject: `New Location Quote Request: ${cityName} - ${formData.name}`,
      html: emailHtml,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Quote request submitted successfully', id: data?.id },
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
