import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { JobApplicationEmail } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Parse FormData from request
    const formDataRequest = await request.formData()

    // Extract text data
    const formDataJson = formDataRequest.get('formData') as string
    const formData = JSON.parse(formDataJson)
    const jobTitle = formDataRequest.get('jobTitle') as string
    const department = formDataRequest.get('department') as string
    const recaptchaToken = formDataRequest.get('recaptchaToken') as string

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

    // Process file attachments
    const attachments = []
    const files = formDataRequest.getAll('attachments') as File[]

    for (const file of files) {
      if (file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        attachments.push({
          filename: file.name,
          content: buffer,
        })
      }
    }

    // Add attachment count to formData for email template
    const formDataWithAttachments = {
      ...formData,
      attachments: attachments.length > 0 ? attachments.map(a => ({ name: a.filename })) : null,
    }

    // Render the email template to HTML
    const emailHtml = await render(
      JobApplicationEmail({ data: formDataWithAttachments, jobTitle, department })
    )

    // Send email using Resend
    // Note: Update 'from' email to use your verified domain in Resend dashboard
    const { data, error} = await resend.emails.send({
      from: 'CR EXPRESS <onboarding@resend.dev>',
      to: ['andrew@squarewaves.io'], // Resend test mode - Change to aamro@crexpressinc.com after domain verification
      replyTo: formData.email,
      subject: `New Job Application: ${jobTitle} - ${formData.firstName} ${formData.lastName}`,
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
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
          formType: 'job-application',
          ...formDataWithAttachments,
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
      { success: true, message: 'Application submitted successfully', id: data?.id },
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
