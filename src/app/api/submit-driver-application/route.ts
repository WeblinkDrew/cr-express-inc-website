import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { DriverApplicationEmail } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formData, jobTitle, department, recaptchaToken } = body

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
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
      DriverApplicationEmail({ data: formData, jobTitle, department })
    )

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'CR Express <noreply@forms.crexpressinc.com>', // Using verified subdomain
      to: ['aamro@crexpressinc.com'], // Send to CR Express
      replyTo: formData.email,
      subject: `New Driver Application: ${jobTitle} - ${formData.firstName} ${formData.lastName}`,
      html: emailHtml,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    // Send data to Zapier webhook
    try {
      await fetch('https://hooks.zapier.com/hooks/catch/24939636/uiqxiij/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'driver-application',
          ...formData,
          jobTitle,
          department,
          submittedAt: new Date().toISOString(),
        }),
      })
    } catch (zapierError) {
      console.error('Zapier webhook error:', zapierError)
      // Don't fail the request if Zapier fails - email was already sent successfully
    }

    return NextResponse.json(
      { success: true, message: 'Driver application submitted successfully', id: data?.id },
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
