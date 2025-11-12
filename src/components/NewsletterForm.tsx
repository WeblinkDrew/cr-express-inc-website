'use client'

import { useState } from 'react'

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

export function NewsletterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      if (response.ok) {
        const result = await response.json()
        setMessage({ type: 'success', text: 'Successfully subscribed! Check your inbox.' })
        setName('') // Clear the inputs
        setEmail('')
      } else {
        let errorMessage = 'Failed to subscribe. Please try again.'
        try {
          const result = await response.json()
          errorMessage = result.error || errorMessage
        } catch (e) {
          // Response wasn't JSON (probably HTML error page from 405/500)
          errorMessage = `Server error: ${response.status}. Please try again later.`
        }
        setMessage({ type: 'error', text: errorMessage })
      }
    } catch (error) {
      console.error('Submission error:', error)
      setMessage({ type: 'error', text: 'Failed to subscribe. Please check your connection and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Industry insights newsletter
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Subscribe to get logistics updates, industry news, and supply chain
        best practices delivered to your inbox.
      </p>
      <div className="mt-6 space-y-3">
        <input
          type="text"
          placeholder="Full name"
          autoComplete="name"
          aria-label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          required
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 px-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden disabled:opacity-50"
        />
        <div className="relative">
          <input
            type="email"
            placeholder="Email address"
            autoComplete="email"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
            className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pr-20 pl-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden disabled:opacity-50"
          />
          <div className="absolute inset-y-1 right-1 flex justify-end">
            <button
              type="submit"
              aria-label="Submit"
              disabled={isSubmitting}
              className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowIcon className="w-4" />
            </button>
          </div>
        </div>
      </div>
      {message && (
        <p
          className={`mt-3 text-sm ${
            message.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  )
}
