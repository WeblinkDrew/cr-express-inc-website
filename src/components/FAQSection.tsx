'use client'

import { useState } from 'react'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'

const faqs = [
  {
    question: 'What bonded warehouse services does CR Express provide?',
    answer:
      'CR Express operates a Customs Bonded Warehouse (CBW Class 3) facility in Elk Grove Village, IL. Our bonded warehouse services include duty-free storage, customs clearance warehousing, bonded distribution, and customs compliance management. Located less than 5 miles from O\'Hare Airport (ORD), we provide secure bonded storage solutions for international freight with full customs oversight and documentation.',
  },
  {
    question:
      'How long can cargo sit in a Class III Bonded Warehouse before being Customs Cleared?',
    answer:
      'Class III bonded cargo can sit in our CBW for up to 5 years without paying duties. This is unlike the 15-day-rule for CFS cargo, providing significantly more flexibility for international shipments requiring extended storage before customs clearance.',
  },
  {
    question: 'What cross docking services are available near Chicago?',
    answer:
      'Our cross docking facility offers comprehensive freight consolidation and distribution services. We provide cross docking with access to all major railyards all across Chicagoland and ORD airport, with capabilities for container devanning, LTL consolidation, and same-day cross docking operations. Our 227,000 square foot facility supports cross docking for e-commerce, retail, and manufacturing clients with 7-days-per-week operations.',
  },
  {
    question: 'Do you provide FTL and LTL freight shipping nationwide?',
    answer:
      'Yes, CR Express provides both Full Truckload (FTL) and Less Than Truckload (LTL) freight shipping services to all 48 U.S. states. Our asset-based fleet includes dry van, reefer, flatbed, and specialized equipment options. As a top 1-2% U.S. fleet, we offer dedicated trucking services, expedited freight, and real-time GPS tracking for complete shipment visibility.',
  },
  {
    question: 'What air cargo services do you offer at O\'Hare Airport?',
    answer:
      'CR Express provides comprehensive air import and export services at ORD and RFD airports. Our TSA-approved, bonded drivers handle screened cargo deliveries, plane-side pickups, and Container Freight Station (CFS) operations. We offer same-day air cargo recovery, export documentation services, and specialized Unit Load Device (ULD) handling with SIDA-badged drivers for secure airport operations.',
  },
  {
    question: 'What container freight services are available in Chicago?',
    answer:
      'Our Container Freight Station (CFS) provides complete container freight services including container devanning, transloading, drayage, and intermodal transportation. We handle 20ft, 40ft, and 45ft containers with privately-owned chassis to avoid supply shortages. Our facility with access to all major railyards all across Chicagoland offers container storage for over 500 containers and serves 300+ cities nationwide.',
  },
  {
    question: 'How do your logistics solutions support supply chain management?',
    answer:
      'CR Express offers integrated supply chain solutions including warehousing, distribution, freight management, and customs compliance. Our technology platforms provide real-time visibility, automated reporting, and seamless coordination between air, intermodal, and over-the-road transportation. We serve automotive, pharmaceutical, healthcare, telecommunications, and retail industries with scalable logistics solutions.',
  },
  {
    question: 'What makes your Chicago logistics location strategically advantageous?',
    answer:
      'Our Elk Grove Village headquarters is strategically located less than 5 miles from O\'Hare Airport (ORD) with access to all major railyards all across Chicagoland. This prime location enables minimal transit times, same-day deliveries within 200+ zip codes, and seamless intermodal connections. Our Chicago logistics hub provides access to the nation\'s transportation network with unmatched efficiency.',
  },
  {
    question: 'Are you GDP compliant for pharmaceutical and healthcare logistics?',
    answer:
      'Yes, CR Express is GDP (Global Distribution Practice) compliant for pharmaceutical and healthcare logistics. We maintain temperature-controlled storage, proper documentation, and validated cold chain logistics processes. Our facility is equipped for pharmaceutical freight services, medical device distribution, and healthcare supply chain management with full regulatory compliance and specialized handling protocols.',
  },
  {
    question: 'What specialized freight services do you offer for automotive logistics?',
    answer:
      'CR Express provides specialized automotive freight services including automotive parts shipping, just-in-time delivery, and automotive logistics management. Our automotive freight capabilities include flatbed trucking for larger components, expedited services for critical parts, and dedicated automotive supply chain solutions. We serve major automotive manufacturers with reliable, time-sensitive freight solutions.',
  },
  {
    question: 'How long has CR Express been providing logistics services?',
    answer:
      'CR Express has been a trusted logistics partner since 1999, providing 26 years of transportation and warehousing expertise. Founded by truck drivers, we\'ve grown into a top 1-2% U.S. fleet while maintaining our commitment to personalized service. We\'re a SmartWay partner focused on sustainability and have built lasting relationships across automotive, pharmaceutical, telecommunications, healthcare, and retail industries.',
  },
]

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

export function FAQSection() {
  return (
    <>
      <SectionIntro
        eyebrow="FAQ"
        title="Frequently asked questions"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Have questions about our logistics services? Find answers to common
          questions about bonded warehousing, freight shipping, air cargo, and
          supply chain solutions.
        </p>
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
