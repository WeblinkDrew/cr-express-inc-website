import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate required field
    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Send data to Zapier webhook for newsletter
    if (process.env.ZAPIER_NEWSLETTER_WEBHOOK_URL) {
      try {
        const response = await fetch(process.env.ZAPIER_NEWSLETTER_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            subscribedAt: new Date().toISOString(),
            source: 'website-footer',
          }),
        })

        if (!response.ok) {
          console.error('Zapier webhook error:', await response.text())
          return NextResponse.json(
            { error: 'Failed to subscribe. Please try again.' },
            { status: 500 }
          )
        }
      } catch (zapierError) {
        console.error('Zapier webhook error:', zapierError)
        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        )
      }
    } else {
      console.error('Newsletter webhook URL not configured')
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter!' },
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
