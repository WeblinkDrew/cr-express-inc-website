'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { Border } from '@/components/Border'
import type { LogisticsCityData } from '@/lib/logistics-city-data'
import { ServiceQuoteForm } from '@/components/ServiceQuoteForm'

// Import certification logos
import logoTSA from '@/images/certifications/TSA Logo.svg'
import logoSmartWay from '@/images/certifications/SmartWay Partner Logo.svg'
import logoCBP from '@/images/certifications/Customs Border Protection Logo.svg'

// Heroicons
import {
  BuildingStorefrontIcon,
  GlobeAltIcon,
  TruckIcon,
  RocketLaunchIcon,
  MapPinIcon,
  ShieldCheckIcon,
  BeakerIcon,
  ClockIcon,
  CheckCircleIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

// =============================================================================
// TRUST BAR / CERTIFICATIONS
// =============================================================================
export function CertificationsBar() {
  const certifications = [
    { name: 'TSA Approved', logo: logoTSA },
    { name: 'SmartWay Partner', logo: logoSmartWay },
    { name: 'Customs Bonded', logo: logoCBP },
  ]

  return (
    <Container className="mt-16 sm:mt-20">
      <FadeIn>
        <div className="rounded-3xl bg-neutral-50 px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-16">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-center gap-3">
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  className="h-12 w-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
            <div className="flex items-center gap-3">
              <BeakerIcon className="h-10 w-10 text-neutral-950" />
              <span className="font-semibold text-neutral-950">GDP Compliant</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="h-10 w-10 text-neutral-950" />
              <span className="font-semibold text-neutral-950">Hazmat Certified</span>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

// =============================================================================
// SERVICES OVERVIEW GRID
// =============================================================================
interface ServicesGridProps {
  city: LogisticsCityData
}

export function ServicesOverviewGrid({ city }: ServicesGridProps) {
  const services = [
    {
      title: 'Bonded Warehouse',
      description: `CBW Class 3 certified storage with duty-free options for ${city.name} importers.`,
      icon: BuildingStorefrontIcon,
      href: '/services/warehousing',
    },
    {
      title: 'Intermodal Drayage',
      description: `Container transport from all major railyards serving ${city.name} businesses.`,
      icon: GlobeAltIcon,
      href: '/services/drayage',
    },
    {
      title: 'Over-the-Road Trucking',
      description: `FTL and LTL freight services with 48-state coverage from ${city.name}.`,
      icon: TruckIcon,
      href: '/services/over-the-road',
    },
    {
      title: 'Air Cargo Services',
      description: `TSA-approved air freight operations at O'Hare for ${city.name} shippers.`,
      icon: RocketLaunchIcon,
      href: '/services/air-cargo',
    },
    {
      title: 'Local P&D',
      description: `Same-day pickup and delivery throughout ${city.name} and Chicagoland.`,
      icon: MapPinIcon,
      href: '/services/local-pd',
    },
    {
      title: 'Cross-Docking',
      description: `Streamlined transfer operations reducing handling time for ${city.name} supply chains.`,
      icon: ClockIcon,
      href: '/services/warehousing',
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32">
      <FadeIn>
        <SectionIntro
          title={`Logistics services available to ${city.name} businesses`}
          className="mt-0"
        >
          <p>
            Comprehensive freight and transportation solutions tailored for {city.name}&apos;s
            diverse business community. From warehousing to nationwide trucking, we have
            you covered.
          </p>
        </SectionIntro>
      </FadeIn>

      <FadeInStagger faster className="mt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <FadeIn key={service.title}>
              <Link
                href={service.href}
                className="group block rounded-3xl border border-neutral-200 p-8 transition hover:border-neutral-950 hover:bg-neutral-50"
              >
                <service.icon className="h-10 w-10 text-neutral-950" />
                <h3 className="mt-6 font-display text-xl font-semibold text-neutral-950">
                  {service.title}
                </h3>
                <p className="mt-4 text-base text-neutral-600">
                  {service.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950 group-hover:text-neutral-700">
                  Learn more
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </FadeInStagger>
    </Container>
  )
}

// =============================================================================
// WHY [CITY] BUSINESSES CHOOSE US
// =============================================================================
interface WhyChooseUsProps {
  city: LogisticsCityData
}

export function WhyChooseUsSection({ city }: WhyChooseUsProps) {
  const benefits = [
    {
      stat: `${city.driveTimeMinutes} min`,
      label: 'Response Time',
      description: 'From our Elk Grove Village facility to your location',
    },
    {
      stat: `${city.airportDistance} mi`,
      label: "To O'Hare",
      description: 'Direct access to air cargo operations',
    },
    {
      stat: '227K',
      label: 'Sq Ft Warehouse',
      description: 'CBW Class 3 bonded facility',
    },
    {
      stat: '26+',
      label: 'Years Experience',
      description: 'Chicago logistics expertise',
    },
    {
      stat: '48',
      label: 'State Coverage',
      description: 'Nationwide trucking network',
    },
    {
      stat: '24/7',
      label: 'Operations',
      description: 'Round-the-clock availability',
    },
  ]

  return (
    <div className="mt-24 sm:mt-32">
      <Container>
        <FadeIn>
          <div className="lg:flex lg:items-start lg:gap-16">
            {/* Left content */}
            <div className="lg:w-1/2">
              <h2 className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
                Why {city.name} businesses choose CR Express
              </h2>
              <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
                {city.whyChooseUs}
              </p>

              {/* Key capabilities list */}
              <div className="mt-10">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-950">
                  Key Capabilities
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    'TSA-approved operations',
                    'SIDA-badged drivers',
                    'GDP pharmaceutical compliance',
                    'Hazmat certified',
                    'Real-time GPS tracking',
                    'All railyard access',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-600" />
                      <span className="text-sm text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right stats grid */}
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {benefits.map((benefit, index) => (
                  <FadeIn key={index}>
                    <div className="rounded-2xl bg-neutral-950 p-6 text-center">
                      <div className="text-3xl font-bold text-white">{benefit.stat}</div>
                      <div className="mt-2 text-sm font-semibold text-white">{benefit.label}</div>
                      <div className="mt-1 text-xs text-neutral-400">{benefit.description}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

// =============================================================================
// GEOGRAPHIC ADVANTAGE SECTION
// =============================================================================
interface GeographicAdvantageProps {
  city: LogisticsCityData
}

export function GeographicAdvantageSection({ city }: GeographicAdvantageProps) {
  const infrastructurePoints = [
    {
      name: "O'Hare International (ORD)",
      distance: `${city.airportDistance} miles`,
      type: 'Airport',
      description: "World's busiest cargo hub with same-day air freight access",
    },
    {
      name: 'Rockford Airport (RFD)',
      distance: '55 miles',
      type: 'Airport',
      description: 'Alternative cargo gateway for overflow and specialized freight',
    },
    {
      name: 'CP Bensenville',
      distance: '8 miles',
      type: 'Rail',
      description: 'Canadian Pacific rail access for Canadian market connectivity',
    },
    {
      name: 'BNSF Elwood/Joliet',
      distance: '35 miles',
      type: 'Rail',
      description: 'Major intermodal facility for transcontinental rail shipping',
    },
    {
      name: 'NS Chicago Rails',
      distance: '22 miles',
      type: 'Rail',
      description: 'Norfolk Southern terminal for eastern corridor freight',
    },
    {
      name: 'CN Harvey Rails',
      distance: '28 miles',
      type: 'Rail',
      description: 'Canadian National yard for midwest and Canadian freight',
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32">
      <FadeIn>
        <SectionIntro
          title="Strategic location for maximum logistics efficiency"
          className="mt-0"
        >
          <p>
            Our Elk Grove Village facility provides unmatched access to Chicago&apos;s transportation
            infrastructure, enabling fast and efficient service to {city.name} businesses.
          </p>
        </SectionIntro>

        {/* Highway Access */}
        <div className="mt-12 rounded-3xl bg-neutral-50 p-8">
          <h3 className="font-display text-xl font-semibold text-neutral-950">
            Highway access from {city.name}
          </h3>
          <div className="mt-6 flex flex-wrap gap-4">
            {city.majorHighways.map((highway) => (
              <span
                key={highway}
                className="inline-flex items-center rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
              >
                {highway}
              </span>
            ))}
          </div>
        </div>

        {/* Infrastructure Grid */}
        <FadeInStagger faster className="mt-12">
          <ul role="list" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {infrastructurePoints.map((point) => (
              <li key={point.name}>
                <FadeIn>
                  <Border position="left" className="pl-8">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                        {point.type}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-neutral-950">
                      {point.name}
                    </h3>
                    <div className="mt-2 text-lg font-bold text-neutral-950">
                      {point.distance}
                    </div>
                    <p className="mt-2 text-sm text-neutral-600">
                      {point.description}
                    </p>
                  </Border>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </FadeIn>
    </Container>
  )
}

// =============================================================================
// INDUSTRIES WE SERVE
// =============================================================================
interface IndustriesProps {
  city: LogisticsCityData
}

export function IndustriesWeServe({ city }: IndustriesProps) {
  return (
    <Container className="mt-24 sm:mt-32">
      <FadeIn>
        <SectionIntro
          title={`Industries we serve in ${city.name}, ${city.stateAbbr}`}
          className="mt-0"
        >
          <p>
            Our logistics solutions are tailored to the unique needs of {city.name}&apos;s
            key industries, with specialized handling and compliance expertise.
          </p>
        </SectionIntro>

        {/* Top Industries */}
        <div className="mt-12">
          <h3 className="font-display text-base font-semibold text-neutral-950">
            Key industries in {city.name}
          </h3>
          <FadeInStagger faster className="mt-6">
            <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {city.topIndustries.map((industry) => (
                <FadeIn key={industry}>
                  <li className="flex items-center gap-4 rounded-xl border border-neutral-200 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    <span className="text-base font-semibold text-neutral-950">
                      {industry}
                    </span>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>
        </div>

        {/* Industry Challenges & Solutions */}
        <div className="mt-16">
          <h3 className="font-display text-xl font-semibold text-neutral-950">
            Industry-specific challenges we solve
          </h3>
          <FadeInStagger faster className="mt-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {city.industrySpecificChallenges.map((item) => (
                <FadeIn key={item.industry}>
                  <div className="rounded-3xl border border-neutral-200 p-6">
                    <h4 className="font-display text-lg font-semibold text-neutral-950">
                      {item.industry}
                    </h4>
                    <div className="mt-4">
                      <dt className="text-sm font-semibold text-red-600">Challenge:</dt>
                      <dd className="mt-1 text-sm text-neutral-600">{item.challenge}</dd>
                    </div>
                    <div className="mt-4">
                      <dt className="text-sm font-semibold text-green-600">Our Solution:</dt>
                      <dd className="mt-1 text-sm text-neutral-600">{item.solution}</dd>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>
        </div>

      </FadeIn>
    </Container>
  )
}

// =============================================================================
// LOCAL ECONOMIC & LOGISTICS DATA
// =============================================================================
interface EconomicDataProps {
  city: LogisticsCityData
}

export function LocalEconomicData({ city }: EconomicDataProps) {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32">
      <Container>
        <FadeIn>
          <h2 className="text-center font-display text-3xl font-semibold text-white sm:text-4xl">
            {city.name} logistics market data
          </h2>
          <p className="mt-4 text-center text-lg text-neutral-300">
            Key economic indicators for businesses shipping to and from {city.name}
          </p>
        </FadeIn>

        <FadeInStagger faster className="mt-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white p-8">
              <h3 className="text-sm font-semibold text-neutral-600">Population</h3>
              <div className="mt-2 text-4xl font-bold text-neutral-950">{city.population}</div>
              <p className="mt-2 text-xs text-neutral-500">{city.county}</p>
            </div>

            <div className="rounded-3xl bg-white p-8">
              <h3 className="text-sm font-semibold text-neutral-600">Total Businesses</h3>
              <div className="mt-2 text-4xl font-bold text-neutral-950">{city.totalBusinesses}</div>
              <p className="mt-2 text-xs text-neutral-500">Potential customers</p>
            </div>

            <div className="rounded-3xl bg-white p-8">
              <h3 className="text-sm font-semibold text-neutral-600">Manufacturing Jobs</h3>
              <div className="mt-2 text-4xl font-bold text-neutral-950">{city.manufacturingEmployment}</div>
              <p className="mt-2 text-xs text-neutral-500">Industrial demand</p>
            </div>

            <div className="rounded-3xl bg-white p-8">
              <h3 className="text-sm font-semibold text-neutral-600">Median Income</h3>
              <div className="mt-2 text-4xl font-bold text-neutral-950">{city.medianHouseholdIncome}</div>
              <p className="mt-2 text-xs text-neutral-500">Household purchasing power</p>
            </div>
          </div>
        </FadeInStagger>

      </Container>
    </div>
  )
}

// =============================================================================
// HOW IT WORKS
// =============================================================================
export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Request a Quote',
      description: 'Tell us about your shipment needs—origin, destination, cargo type, and timeline.',
    },
    {
      number: '02',
      title: 'We Assess Your Needs',
      description: 'Our team analyzes your requirements and designs the optimal logistics solution.',
    },
    {
      number: '03',
      title: 'Custom Solution Design',
      description: 'Receive a tailored proposal with competitive pricing and routing.',
    },
    {
      number: '04',
      title: 'Reliable Execution',
      description: 'We handle pickup, transport, tracking, and delivery with full visibility.',
    },
  ]

  return (
    <div className="mt-24 sm:mt-32 bg-neutral-50 py-20 sm:py-24">
      <Container>
        <FadeIn>
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
              Getting started with CR Express is simple. Our streamlined process ensures
              you receive the right logistics solution quickly.
            </p>
          </div>

          <FadeInStagger faster className="mt-16">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <FadeIn key={step.number}>
                  <div className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-neutral-950/5">
                    {/* Step number badge */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-lg font-bold text-white">
                      {step.number}
                    </div>

                    {/* Connector line (hidden on last item and mobile) */}
                    {index < steps.length - 1 && (
                      <div className="absolute right-0 top-14 hidden h-0.5 w-6 bg-neutral-200 lg:block" style={{ transform: 'translateX(100%)' }} />
                    )}

                    <h3 className="mt-6 font-display text-lg font-semibold text-neutral-950">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-base font-semibold text-neutral-950 hover:text-neutral-700"
            >
              Get started today
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

// =============================================================================
// LOCAL CHALLENGES SECTION
// =============================================================================
interface LocalChallengesProps {
  city: LogisticsCityData
}

export function LocalChallengesSection({ city }: LocalChallengesProps) {
  return (
    <Container className="mt-24 sm:mt-32">
      <FadeIn>
        <div className="rounded-4xl bg-neutral-50 p-8 sm:p-12">
          <h2 className="font-display text-2xl font-semibold text-neutral-950 sm:text-3xl">
            Navigating {city.name}&apos;s logistics challenges
          </h2>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
            {city.localChallenges}
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-base font-semibold text-neutral-950 hover:text-neutral-700"
            >
              Talk to a local logistics expert
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

// =============================================================================
// TESTIMONIALS SECTION
// =============================================================================
interface TestimonialsProps {
  city: LogisticsCityData
}

export function LogisticsTestimonials({ city }: TestimonialsProps) {
  const testimonials = [
    {
      quote: "CR Express has transformed our supply chain operations. Their proximity to O'Hare and deep understanding of Chicago logistics has cut our delivery times by 40%.",
      author: 'Michael Chen',
      title: 'VP of Operations, Manufacturing Company',
    },
    {
      quote: "We needed a logistics partner who could handle our complex pharmaceutical shipping requirements. CR Express's GDP compliance and attention to detail has been exceptional.",
      author: 'Dr. Sarah Williams',
      title: 'Supply Chain Director, Healthcare',
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32">
      <FadeIn>
        <SectionIntro
          title="Trusted by businesses across Chicagoland"
          className="mt-0"
        >
          <p>
            Companies throughout {city.name} rely on CR Express for reliable logistics.
          </p>
        </SectionIntro>

        <FadeInStagger faster className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={index}>
                <Border position="left" className="pl-8">
                  <blockquote className="text-neutral-600">
                    <p className="font-display text-lg font-medium">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <footer className="mt-6">
                      <p className="font-semibold text-neutral-950">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {testimonial.title}
                      </p>
                    </footer>
                  </blockquote>
                </Border>
              </FadeIn>
            ))}
          </div>
        </FadeInStagger>
      </FadeIn>
    </Container>
  )
}

// =============================================================================
// FAQ SECTION
// =============================================================================
interface FAQProps {
  city: LogisticsCityData
}

export function LogisticsFAQSection({ city }: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: `What logistics services does CR Express offer in ${city.name}, IL?`,
      answer: `We provide comprehensive logistics services to ${city.name} businesses including: freight trucking (FTL and LTL), bonded warehouse storage, intermodal drayage, air cargo handling at O'Hare, and local pickup and delivery. Our services are tailored to ${city.name}'s key industries including ${city.topIndustries.slice(0, 3).join(', ')}.`,
    },
    {
      question: 'Do you offer same-day delivery in the Chicago area?',
      answer: `Yes, we offer same-day delivery throughout Chicagoland, including ${city.name}. Our local P&D fleet operates 7 days a week, and with our facility's proximity to ${city.name} (${city.driveTimeMinutes} minutes), we can provide rapid response for urgent shipments. Contact us by 10 AM for same-day delivery options.`,
    },
    {
      question: 'What makes CR Express different from other logistics companies?',
      answer: `Our unique combination of capabilities sets us apart: TSA-approved air cargo operations, CBW Class 3 bonded warehouse, GDP compliance for pharmaceuticals, access to all major railyards, and 26+ years of Chicago logistics expertise. We're not just a trucking company—we're a full-service logistics partner with the infrastructure to handle complex supply chain needs.`,
    },
    {
      question: `What industries do you specialize in serving around ${city.name}?`,
      answer: `We serve ${city.name}'s diverse economy with specialized solutions for ${city.topIndustries.join(', ')}. Our GDP-compliant operations support healthcare and pharmaceutical companies, while our secure handling protocols protect high-value technology shipments. Major employers in ${city.name} like ${city.majorEmployers.slice(0, 3).join(', ')} represent the types of companies we're equipped to serve.`,
    },
    {
      question: 'How do I get a quote for logistics services?',
      answer: `Getting a quote is easy. Call us at (224) 402-9537 or fill out our online contact form with your shipment details. We'll provide a competitive quote typically within 2-4 hours. For regular shippers, we offer custom pricing programs based on volume and service frequency.`,
    },
  ]

  // FAQ Schema JSON-LD
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
    <div className="mt-24 sm:mt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Container>
        <SectionIntro
          title="Frequently asked questions"
          className="mt-0"
        >
          <p>
            Common questions from {city.name} businesses about our logistics services.
          </p>
        </SectionIntro>

        <div className="mt-16">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-neutral-200 overflow-hidden"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full text-left px-8 py-6 flex items-center justify-between gap-4 hover:bg-neutral-50 transition"
                >
                  <span className="font-display text-lg font-semibold text-neutral-950">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-6 w-6 flex-shrink-0 text-neutral-950 transition-transform ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeIndex === index && (
                  <div className="px-8 pb-6">
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

// =============================================================================
// NEARBY LOCATIONS
// =============================================================================
interface NearbyLocationsProps {
  currentCity: LogisticsCityData
  nearbyCities: LogisticsCityData[]
}

export function NearbyLogisticsLocations({ currentCity, nearbyCities }: NearbyLocationsProps) {
  // If no nearby cities, show link to main services page only
  if (nearbyCities.length === 0) {
    return (
      <Container className="mt-24 sm:mt-32">
        <Border className="pt-16">
          <SectionIntro
            title="Logistics services throughout Chicagoland"
            className="mt-0"
          >
            <p>
              We serve businesses throughout the Chicago metropolitan area with comprehensive
              logistics solutions.
            </p>
          </SectionIntro>

          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-950 hover:text-neutral-700"
            >
              View all logistics services
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </Border>
      </Container>
    )
  }

  return (
    <Container className="mt-24 sm:mt-32">
      <Border className="pt-16">
        <SectionIntro
          title="Logistics services in nearby cities"
          className="mt-0"
        >
          <p>
            We serve businesses throughout Chicagoland with professional logistics
            and freight transportation solutions.
          </p>
        </SectionIntro>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {nearbyCities.map((city) => (
            <Link
              key={city.slug}
              href={`/services/logistics/${city.slug}`}
              className="group rounded-xl border border-neutral-200 p-4 transition hover:border-neutral-950 hover:bg-neutral-50"
            >
              <div className="font-semibold text-neutral-950 group-hover:text-neutral-950">
                {city.name}
              </div>
              <div className="mt-1 text-sm text-neutral-600">
                {city.distanceFromHQ} miles
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-950 hover:text-neutral-700"
          >
            View all logistics services
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </Border>
    </Container>
  )
}

// =============================================================================
// QUOTE FORM SECTION
// =============================================================================
interface QuoteFormSectionProps {
  city: LogisticsCityData
}

export function LogisticsQuoteFormSection({ city }: QuoteFormSectionProps) {
  return (
    <div className="mt-24 sm:mt-32 bg-neutral-950 py-20 sm:py-24">
      <Container>
        <div className="lg:flex lg:items-center lg:gap-16">
          {/* Left content */}
          <div className="lg:w-1/2">
            <FadeIn>
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                Get a free logistics quote for {city.name}
              </h2>
              <p className="mt-6 text-lg text-neutral-300">
                Tell us about your shipping needs and our team will provide a custom quote
                within 24 hours. No obligation, no pressure—just straightforward pricing
                for {city.name} businesses.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  'Free, no-obligation quote',
                  'Response within 24 hours',
                  'Custom solutions for your needs',
                  'Competitive pricing guaranteed',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-neutral-300">
                    <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Right form */}
          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <FadeIn>
              <ServiceQuoteForm
                serviceName={`Logistics Services - ${city.name}`}
                serviceType="logistics"
              />
            </FadeIn>
          </div>
        </div>
      </Container>
    </div>
  )
}

// =============================================================================
// FINAL CTA SECTION
// =============================================================================
interface FinalCTAProps {
  city: LogisticsCityData
}

export function FinalCTASection({ city }: FinalCTAProps) {
  return (
    <div className="mt-24 sm:mt-32">
      <Container>
        <FadeIn>
          <div className="rounded-4xl bg-neutral-950 px-8 py-16 text-center sm:px-12 sm:py-20">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Ready to streamline your {city.name} logistics?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300">
              Get a custom logistics solution designed for your {city.name} business.
              From same-day local delivery to nationwide freight—we have you covered.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-neutral-950 transition hover:bg-neutral-100"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:+12244029537"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent px-8 py-4 text-lg font-semibold text-white ring-1 ring-inset ring-white/20 transition hover:bg-white/10"
              >
                <PhoneIcon className="h-5 w-5" />
                (224) 402-9537
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <ClockIcon className="h-5 w-5" />
                <span>26+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>TSA Approved</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <TruckIcon className="h-5 w-5" />
                <span>48-State Coverage</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

// =============================================================================
// BREADCRUMB COMPONENT
// =============================================================================
interface BreadcrumbProps {
  city: LogisticsCityData
}

export function LogisticsBreadcrumb({ city }: BreadcrumbProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://crexpressinc.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://crexpressinc.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Logistics Services',
        item: 'https://crexpressinc.com/services/logistics',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${city.name}, ${city.stateAbbr}`,
        item: `https://crexpressinc.com/services/logistics/${city.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Container className="pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-neutral-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-neutral-950">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/services" className="hover:text-neutral-950">
                Services
              </Link>
            </li>
            <li>/</li>
            <li>
              <span className="text-neutral-950">{city.name}</span>
            </li>
          </ol>
        </nav>
      </Container>
    </>
  )
}
