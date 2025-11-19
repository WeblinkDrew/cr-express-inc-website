'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import type { CityData } from '@/lib/location-data'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

interface LocationQuoteFormProps {
  city: CityData
}

export function LocationQuoteForm({ city }: LocationQuoteFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'bonded-warehouse', // Auto-set for bonded warehouse landing pages
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!executeRecaptcha) {
      alert('reCAPTCHA not ready. Please try again.')
      return
    }

    setIsSubmitting(true)

    try {
      // Generate reCAPTCHA token
      const recaptchaToken = await executeRecaptcha('location_quote_submit')

      const response = await fetch('/api/submit-location-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          cityName: city.name,
          recaptchaToken,
        }),
      })

      if (response.ok) {
        alert('Quote request submitted successfully! We will get back to you within 24 hours.')
        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: 'bonded-warehouse', // Auto-set for bonded warehouse landing pages
          message: '',
        })
      } else {
        let errorMessage = 'Failed to submit quote request. Please try again.'
        try {
          const result = await response.json()
          errorMessage = result.error || errorMessage
        } catch (e) {
          // Response wasn't JSON (probably HTML error page from 405/500)
          errorMessage = `Server error: ${response.status}. Please try again later.`
        }
        alert(`Error: ${errorMessage}`)
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit quote request. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-24 sm:mt-32 bg-neutral-50 py-24">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
          {/* Form */}
          <FadeIn>
            <h2 className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
              Get a quote for {city.name}
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Request pricing for bonded warehouse storage, container transloading,
              or customs brokerage services. Our team will respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-10">
              <div className="isolate -space-y-px rounded-2xl bg-white/50">
                <TextInput
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  label="Company"
                  name="company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  label="Phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  label="Message or special requirements"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="mt-10" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Request Quote'}
              </Button>
            </form>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn>
            <div className="rounded-3xl bg-neutral-950 p-12 text-white">
              <h3 className="font-display text-2xl font-semibold">
                Or contact us directly
              </h3>
              <p className="mt-4 text-neutral-300">
                Speak with our bonded warehouse team to discuss your specific needs.
              </p>

              <div className="mt-10 space-y-8">
                <div>
                  <dt className="text-sm font-semibold text-neutral-400">Sales</dt>
                  <dd className="mt-2">
                    <a
                      href="tel:+12244029537"
                      className="text-2xl font-semibold hover:text-neutral-300 transition"
                    >
                      +1 (224) 402-9537
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-semibold text-neutral-400">Operations</dt>
                  <dd className="mt-2">
                    <a
                      href="tel:+18473547979"
                      className="text-2xl font-semibold hover:text-neutral-300 transition"
                    >
                      +1 (847) 354-7979
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-semibold text-neutral-400">Address</dt>
                  <dd className="mt-2 text-neutral-300">
                    2400 Arthur Ave<br />
                    Elk Grove Village, IL 60007
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-semibold text-neutral-400">
                    Distance from {city.name}
                  </dt>
                  <dd className="mt-2 text-neutral-300">
                    {city.distance} miles ({city.drivingTime} minute drive)
                  </dd>
                </div>

                <div className="pt-8 border-t border-neutral-700">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-neutral-300 transition"
                  >
                    Visit full contact page
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  )
}
