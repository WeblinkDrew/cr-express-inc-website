'use client'

import { useState } from 'react'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'

export interface FAQ {
  question: string
  answer: string
}

interface ServiceFAQSectionProps {
  title: string
  description?: string
  faqs: FAQ[]
  eyebrow?: string
}

function FAQItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t border-neutral-950/10 pt-8 pb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between text-left gap-6"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg font-semibold text-neutral-950 leading-7">
          {question}
        </span>
        <span className="flex h-7 flex-shrink-0 items-center">
          <svg
            className={`h-6 w-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="mt-6 pr-12">
          <p className="text-base leading-7 text-neutral-600">{answer}</p>
        </div>
      )}
    </div>
  )
}

export function ServiceFAQSection({ title, description, faqs, eyebrow }: ServiceFAQSectionProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SectionIntro
        eyebrow={eyebrow || "FAQ"}
        title={title}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        {description && <p>{description}</p>}
      </SectionIntro>
      <Container className="mt-16">
        <FadeIn>
          <div className="mx-auto max-w-4xl">
            <FadeInStagger faster>
              {faqs.map((faq) => (
                <FadeIn key={faq.question}>
                  <FAQItem question={faq.question} answer={faq.answer} />
                </FadeIn>
              ))}
            </FadeInStagger>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
