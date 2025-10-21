'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { Border } from '@/components/Border'
import type { CityData, EconomicData } from '@/lib/location-data'

// Trust Section Component
interface TrustSectionProps {
  city: CityData
}

export function TrustSection({ city }: TrustSectionProps) {
  const benefits = [
    'CBW Class 3 certified bonded warehouse',
    'Duty-free storage up to 5 years',
    'Complete customs compliance and documentation',
    'GDP compliant for pharmaceutical products',
    'Strategic location less than 5 miles from O\'Hare Airport',
    'Access to 21 major Chicagoland railyards',
    '280,000 sq ft secure facility',
    '26+ years of logistics expertise',
  ]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <SectionIntro
          title={`Why businesses in ${city.name} trust CR Express`}
          className="mt-0"
        >
          <p>
            For over 26 years, CR Express has provided professional bonded warehouse
            and logistics services to businesses in {city.name} and throughout Chicagoland.
            Our strategic location and comprehensive certifications make us the ideal
            partner for your import and warehousing needs.
          </p>
        </SectionIntro>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-semibold text-neutral-950">
              Complete bonded warehouse solutions
            </h3>
            <ul className="mt-6 space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-base text-neutral-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-neutral-50 p-8">
            <h3 className="font-display text-2xl font-semibold text-neutral-950">
              Serving {city.name}
            </h3>
            <div className="mt-6 space-y-4">
              <div>
                <dt className="text-sm font-semibold text-neutral-950">Distance</dt>
                <dd className="mt-1 text-2xl font-bold text-neutral-950">{city.distance} miles</dd>
                <dd className="text-sm text-neutral-600">from our Elk Grove Village facility</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-neutral-950">Drive Time</dt>
                <dd className="mt-1 text-2xl font-bold text-neutral-950">{city.drivingTime} minutes</dd>
                <dd className="text-sm text-neutral-600">typical delivery time</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-neutral-950">Service Area</dt>
                <dd className="mt-1 text-base text-neutral-600">
                  {city.zipCodes.slice(0, 3).join(', ')}
                  {city.zipCodes.length > 3 && ` +${city.zipCodes.length - 3} more`}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

// Strategic Location Component
export function StrategicLocation({ city }: TrustSectionProps) {
  const proximityPoints = [
    {
      name: 'ORD Airport',
      distance: '4 miles',
      time: '8 minutes',
      description: "Chicago O'Hare International Airport - World's busiest cargo hub",
    },
    {
      name: 'RFD Airport',
      distance: '55 miles',
      time: '65 minutes',
      description: 'Rockford Airport - Alternative cargo gateway',
    },
    {
      name: 'BNSF Elwood/Joliet',
      distance: '35 miles',
      time: '45 minutes',
      description: 'BNSF Logistics Park - Major intermodal facility',
    },
    {
      name: 'CN Harvey Rails',
      distance: '28 miles',
      time: '35 minutes',
      description: 'Canadian National Harvey Yard - South suburban rail hub',
    },
    {
      name: 'NS Chicago Rails',
      distance: '22 miles',
      time: '30 minutes',
      description: 'Norfolk Southern 79th Street - Chicago rail terminal',
    },
    {
      name: 'CP North Rails',
      distance: '8 miles',
      time: '12 minutes',
      description: 'Canadian Pacific Bensenville - Northwest rail access',
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32">
      <FadeIn>
        <SectionIntro
          title="Strategic Location for Maximum Logistics Efficiency"
          className="mt-0"
        >
          <p>
            CR Express is strategically positioned in Elk Grove Village, offering unmatched access to
            Chicago's major airports and rail networks. Our central location ensures fast, efficient service to
            businesses throughout {city.name} and the greater Illinois region.
          </p>
        </SectionIntro>

        <FadeInStagger faster className="mt-16">
          <ul role="list" className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {proximityPoints.map((point) => (
              <li key={point.name}>
                <FadeIn>
                  <Border position="left" className="pl-8">
                    <h3 className="font-display text-base font-semibold text-neutral-950">
                      {point.name}
                    </h3>
                    <div className="mt-2 flex gap-4 text-sm">
                      <span className="font-semibold text-neutral-950">{point.distance}</span>
                      <span className="text-neutral-600">{point.time}</span>
                    </div>
                    <p className="mt-4 text-sm text-neutral-600">
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

// Bonded Warehouse Testimonials Component
export function BondedWarehouseTestimonials({ city }: TrustSectionProps) {
  const testimonials = [
    {
      quote: "CR Express has been instrumental in managing our bonded warehouse needs. Their proximity to Chicago operations and 7-day availability has significantly improved our supply chain efficiency.",
      author: "James Wilson",
      title: "Supply Chain Director",
      initials: "JW",
    },
    {
      quote: "The CBW Class 3 certification and customs expertise at CR Express has saved us thousands in duty payments. Their team handles all compliance requirements professionally.",
      author: "Maria Santos",
      title: "Import Manager",
      initials: "MS",
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32">
      <FadeIn>
        <SectionIntro
          title="What Our Clients Say"
          className="mt-0"
        >
          <p>
            Trusted by leading importers and manufacturers across {city.name} and Chicagoland.
          </p>
        </SectionIntro>

        <FadeInStagger faster className="mt-16">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={index}>
                <Border position="left" className="pl-8">
                  <blockquote className="text-neutral-600">
                    <p className="font-display text-lg font-medium">
                      "{testimonial.quote}"
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

// Market Intelligence Summary Component
export function MarketIntelligenceSummary({ city }: TrustSectionProps) {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-16 sm:mt-32 sm:py-20">
      <Container>
        <FadeIn>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Market Intelligence Summary
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-neutral-300">
            Current market conditions in {city.name} show exceptionally strong import growth (+12.9%)
            combined with high warehouse demand index: 151. This creates a premium market
            requiring immediate bonded storage solutions.
          </p>

          <FadeInStagger faster className="mt-12">
            <dl className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <Border as={FadeIn} position="left" className="pl-8" invert>
                <dt className="text-sm font-semibold text-white">
                  Location Advantage
                </dt>
                <dd className="mt-2 text-base text-neutral-400">
                  {city.distance} miles from our Elk Grove Village facility - cost-effective reach
                </dd>
              </Border>

              <Border as={FadeIn} position="left" className="pl-8" invert>
                <dt className="text-sm font-semibold text-white">
                  Market Timing
                </dt>
                <dd className="mt-2 text-base text-neutral-400">
                  Manufacturing base of 426,252 jobs creates consistent demand
                </dd>
              </Border>

              <Border as={FadeIn} position="left" className="pl-8" invert>
                <dt className="text-sm font-semibold text-white">
                  Capacity Planning
                </dt>
                <dd className="mt-2 text-base text-neutral-400">
                  Air cargo volume of 1.96M tons indicates high-volume import requirements
                </dd>
              </Border>
            </dl>
          </FadeInStagger>
        </FadeIn>
      </Container>
    </div>
  )
}

// Key Industries Component
export function KeyIndustries({ city }: TrustSectionProps) {
  return (
    <Container className="mt-24 sm:mt-32">
      <FadeIn>
        <SectionIntro
          title="Key Industries Driving Chicago Import Demand"
          className="mt-0"
        >
          <p>
            Chicago processes $89 billion in international trade annually,
            making it the 3rd largest U.S. trade hub.
          </p>
        </SectionIntro>

        <FadeInStagger faster className="mt-16">
          <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <Border as={FadeIn} position="left" className="pl-8">
              <dt className="text-sm font-semibold text-neutral-950">
                Import Growth
              </dt>
              <dd className="mt-2">
                <span className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
                  +12.8%
                </span>
                <span className="ml-3 text-base text-neutral-600">
                  in transportation equipment
                </span>
              </dd>
            </Border>

            <Border as={FadeIn} position="left" className="pl-8">
              <dt className="text-sm font-semibold text-neutral-950">
                Manufacturing Base
              </dt>
              <dd className="mt-2">
                <span className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
                  2,400+
                </span>
                <span className="ml-3 text-base text-neutral-600">
                  local companies
                </span>
              </dd>
            </Border>

            <Border as={FadeIn} position="left" className="pl-8">
              <dt className="text-sm font-semibold text-neutral-950">
                Trade Volume
              </dt>
              <dd className="mt-2">
                <span className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
                  $89B
                </span>
                <span className="ml-3 text-base text-neutral-600">
                  annual trade
                </span>
              </dd>
            </Border>
          </dl>
        </FadeInStagger>

        <div className="mt-16">
          <h3 className="font-display text-base font-semibold text-neutral-950">
            Top Import Categories
          </h3>
          <FadeInStagger faster className="mt-8">
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                'Auto Parts & Components',
                'Industrial Machinery',
                'Electronics',
                'Pharmaceuticals'
              ].map((category) => (
                <FadeIn key={category}>
                  <li className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    <span className="text-base font-semibold text-neutral-950">
                      {category}
                    </span>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>
        </div>
      </FadeIn>
    </Container>
  )
}

// Economic Indicators Component
interface EconomicIndicatorsProps {
  city: CityData
  economicData: EconomicData
}

export function EconomicIndicators({ city, economicData }: EconomicIndicatorsProps) {
  return (
    <div
      className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32"
      itemScope
      itemType="https://schema.org/Dataset"
    >
      <meta itemProp="name" content={`Economic Indicators for ${city.name}`} />
      <meta
        itemProp="description"
        content={`Real-time economic data for import and logistics businesses in ${city.name}, Illinois`}
      />
      <meta itemProp="url" content={`https://crexpressinc.com/locations/${city.slug}`} />

      <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="CR Express Inc" />
      </div>

      <div itemProp="spatialCoverage" itemScope itemType="https://schema.org/Place">
        <meta itemProp="name" content={`${city.name}, Illinois`} />
      </div>

      <Container>
        <FadeIn>
          <h2 className="text-center font-display text-3xl font-semibold text-white sm:text-4xl">
            Market Intelligence for {city.name}
          </h2>
          <p className="mt-4 text-center text-lg text-neutral-300">
            Real-time economic indicators updated daily
          </p>
        </FadeIn>

        <FadeInStagger faster className="mt-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white p-8" itemScope itemType="https://schema.org/Observation">
              <h3 className="text-sm font-semibold text-neutral-600" itemProp="variableMeasured">
                Import Volume Growth
              </h3>
              <div className="mt-2 text-4xl font-bold text-neutral-950" itemProp="value">
                {economicData.importGrowth}
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                Source: U.S. Census Bureau Trade Data
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8">
              <h3 className="text-sm font-semibold text-neutral-600">
                Manufacturing Employment
              </h3>
              <div className="mt-2 text-4xl font-bold text-neutral-950">
                {economicData.manufacturingJobs}
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                Source: Bureau of Labor Statistics
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8">
              <h3 className="text-sm font-semibold text-neutral-600">
                Warehouse Demand Index
              </h3>
              <div className="mt-2 text-4xl font-bold text-neutral-950">
                {economicData.warehouseDemand}
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                Source: Industrial Real Estate Data
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8">
              <h3 className="text-sm font-semibold text-neutral-600">
                ORD Air Cargo Volume
              </h3>
              <div className="mt-2 text-4xl font-bold text-neutral-950">
                {economicData.airCargo}
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                Source: FAA Cargo Statistics
              </p>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-neutral-400">
            Last updated: {economicData.lastUpdated}
          </div>
        </FadeInStagger>
      </Container>
    </div>
  )
}

// Live Market Data Component
interface LiveMarketDataProps {
  city: CityData
  economicData: EconomicData
}

export function LiveMarketData({ city, economicData }: LiveMarketDataProps) {
  return (
    <Container className="mt-24 sm:mt-32">
      <FadeIn>
        <SectionIntro
          title={`Live Market Data for ${city.name} Importers`}
          className="mt-0"
        >
          <p>
            Real-time import metrics and duty rates for businesses in {city.name}.
            Data refreshed daily from U.S. Trade Representative and CBP.
          </p>
        </SectionIntro>

        <div className="mt-16">
          {/* Container Volume Trends */}
          <div className="rounded-4xl bg-neutral-50 p-8 sm:p-10">
            <FadeIn>
              <h3 className="font-display text-2xl font-semibold text-neutral-950">
                Container Volume Trends
              </h3>
              <div className="mt-6 flex items-end gap-4">
                <span className="font-display text-5xl font-semibold tracking-tight text-neutral-950">
                  {economicData.containerVolumeTrend.rate}
                </span>
                <span className="mb-2 text-base text-neutral-600">
                  {economicData.containerVolumeTrend.description}
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-base text-neutral-600">
                Increased demand for bonded storage in {city.name} driven by supply chain
                diversification strategies. Steady growth reflects stable import volumes.
              </p>
            </FadeIn>
          </div>

          {/* Duty Rates Table */}
          <div className="mt-10">
            <h3 className="font-display text-base font-semibold text-neutral-950">
              Current Duty Rates by Category
            </h3>
            <FadeInStagger faster className="mt-6">
              <Border className="border-t border-neutral-200">
                <dl className="divide-y divide-neutral-200">
                  {economicData.dutyRates.map((item) => (
                    <FadeIn key={item.category} className="py-4">
                      <div className="flex justify-between">
                        <dt className="text-base text-neutral-600">{item.category}</dt>
                        <dd className="font-semibold text-neutral-950">{item.rate}</dd>
                      </div>
                    </FadeIn>
                  ))}
                </dl>
              </Border>
            </FadeInStagger>
          </div>

          {/* Seasonal Patterns */}
          <div className="mt-16">
            <h3 className="font-display text-base font-semibold text-neutral-950">
              Seasonal Import Patterns
            </h3>
            <FadeInStagger faster className="mt-6">
              <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <Border as={FadeIn} position="left" className="pl-8">
                  <dt className="font-semibold text-neutral-950">Q4 Peak</dt>
                  <dd className="mt-2 text-base text-neutral-600">
                    {economicData.seasonalPeak.q4Peak} volume increase in {city.name} creates pricing pressure.
                    Optimal time for establishing long-term bonded storage positioning.
                  </dd>
                </Border>

                <Border as={FadeIn} position="left" className="pl-8">
                  <dt className="font-semibold text-neutral-950">Q1 Planning</dt>
                  <dd className="mt-2 text-base text-neutral-600">
                    {economicData.seasonalPeak.q1Status}. Plan your bonded storage strategy for cost optimization.
                  </dd>
                </Border>
              </dl>
            </FadeInStagger>
          </div>

          <div className="mt-10 border-t border-neutral-200 pt-10">
            <p className="text-sm text-neutral-600">
              <strong className="font-semibold text-neutral-950">Data Sources:</strong>{' '}
              Economic indicators updated daily from U.S. Census Bureau •
              Industry data refreshed weekly from Bureau of Labor Statistics •
              Market intelligence from FAA Cargo Statistics • Last updated: {economicData.lastUpdated}
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

// Business Strategy Component
export function BusinessStrategy({ city }: TrustSectionProps) {
  return (
    <Container className="mt-24 sm:mt-32">
      <SectionIntro
        title="Why bonded warehouse storage makes business sense"
        className="mt-0"
      >
        <p>
          Businesses in {city.name} save thousands annually by leveraging our
          bonded warehouse services to defer duty payments and optimize cash flow.
        </p>
      </SectionIntro>

      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-3xl border border-neutral-200 p-8">
          <div className="text-5xl font-bold text-neutral-950">15-30%</div>
          <div className="mt-2 text-lg font-semibold text-neutral-950">
            Typical Cost Savings
          </div>
          <p className="mt-4 text-base text-neutral-600">
            Businesses typically save 15-30% on total import costs by deferring
            duty payments until goods are withdrawn from our CBW Class 3 facility.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 p-8">
          <div className="text-5xl font-bold text-neutral-950">280k</div>
          <div className="mt-2 text-lg font-semibold text-neutral-950">
            Square Feet
          </div>
          <p className="mt-4 text-base text-neutral-600">
            Our facility offers ample space for container transloading, storage,
            and cross-docking operations with advanced security systems.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 p-8">
          <div className="text-5xl font-bold text-neutral-950">5 Years</div>
          <div className="mt-2 text-lg font-semibold text-neutral-950">
            Storage Duration
          </div>
          <p className="mt-4 text-base text-neutral-600">
            Store goods duty-free for up to 5 years, giving you maximum flexibility
            for inventory management and market timing.
          </p>
        </div>
      </div>
    </Container>
  )
}

// FAQ Accordion Component
interface FAQItem {
  question: string
  answer: string
}

export function FAQAccordion({ city }: TrustSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: `How much money can ${city.name} businesses save with bonded warehouse storage?`,
      answer: `Businesses typically save 15-30% on total import costs by deferring duty payments until goods are withdrawn from our CBW Class 3 facility. For high-volume importers in ${city.name}, this can mean tens of thousands in improved cash flow annually. You only pay duties when goods leave the bonded warehouse for domestic consumption, allowing you to time payments strategically.`
    },
    {
      question: `What makes CR Express different from other bonded warehouses serving ${city.name}?`,
      answer: `Our Elk Grove Village facility offers unmatched logistics connectivity with only 8 minutes to ORD Airport and direct access to 21 major rail networks. We combine CBW Class 3 certification with GDP compliance for pharmaceuticals, TSA-approved operations, and 26+ years of customs expertise. Plus, we're only ${city.distance} miles from ${city.name} for quick local delivery.`
    },
    {
      question: `How long does it take to get goods from the bonded warehouse to ${city.name}?`,
      answer: `Typical delivery time from our Elk Grove Village facility to ${city.name} is approximately ${city.drivingTime} minutes. We offer same-day pickup and delivery services for urgent shipments, with our local P&D fleet operating 7 days a week throughout the Chicago metropolitan area.`
    },
    {
      question: `What types of products can be stored in your bonded warehouse?`,
      answer: `Our CBW Class 3 facility can store virtually all imported goods including automotive parts, electronics, machinery, textiles, and pharmaceuticals. We're GDP compliant for pharmaceutical products and have specialized handling for hazardous materials. Each product category has specific customs documentation requirements we manage on your behalf.`
    },
    {
      question: `Do you provide customs brokerage services for ${city.name} companies?`,
      answer: `Yes, our team handles all customs documentation, duty calculations, and CBP compliance for ${city.name} businesses. We prepare entry documents, classify products under HTS codes, calculate duties and fees, and coordinate with customs officials to ensure smooth clearance of your goods.`
    },
    {
      question: `Can I visit the bonded warehouse facility?`,
      answer: `Absolutely! We welcome ${city.name} businesses to tour our 280,000 sq ft facility in Elk Grove Village. You'll see our security systems, temperature-controlled zones, container transloading operations, and meet our experienced warehouse team. Contact us to schedule a facility tour.`
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
            Common questions from {city.name} businesses about our bonded warehouse
            and customs compliance services.
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
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

// Nearby Locations Component
interface NearbyLocationsProps {
  currentCity: CityData
  nearbyCities: CityData[]
}

export function NearbyLocations({ currentCity, nearbyCities }: NearbyLocationsProps) {
  return (
    <Container className="mt-24 sm:mt-32">
      <Border className="pt-16">
        <SectionIntro
          title="Bonded warehouse services in nearby cities"
          className="mt-0"
        >
          <p>
            We serve businesses throughout Chicagoland with professional bonded warehouse
            and logistics solutions.
          </p>
        </SectionIntro>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {nearbyCities.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}`}
              className="group rounded-xl border border-neutral-200 p-4 transition hover:border-neutral-950 hover:bg-neutral-50"
            >
              <div className="font-semibold text-neutral-950 group-hover:text-neutral-950">
                {city.name}
              </div>
              <div className="mt-1 text-sm text-neutral-600">
                {city.distance} miles away
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services/warehousing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-950 hover:text-neutral-700"
          >
            View all bonded warehouse services
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
      </Border>
    </Container>
  )
}
