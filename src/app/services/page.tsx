import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'
import { RootLayout } from '@/components/RootLayout'

// Heroicons for service icons
import {
  BuildingStorefrontIcon,
  GlobeAltIcon,
  TruckIcon,
  RocketLaunchIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

// Trust badges and certifications
import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobia from '@/images/clients/phobia/logo-dark.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-dark.svg'
import logoUnseal from '@/images/clients/unseal/logo-dark.svg'
import logoHomeWork from '@/images/clients/home-work/logo-dark.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-dark.svg'

// CR Express Services with Heroicons
const services = [
  {
    href: '/services/warehousing',
    client: 'Bonded Warehouse',
    title: 'CBW Class 3 Certified Warehousing',
    icon: BuildingStorefrontIcon,
    service: 'Storage & Distribution',
    summary: [
      '280,000 square feet of secure, climate-controlled storage space with 24/7 surveillance and customs compliance.',
      'Strategically located less than 5 miles from O\'Hare International Airport for optimal logistics efficiency.',
    ],
    features: ['Duty-free storage up to 5 years', 'GDP compliant for pharmaceuticals', 'Container devanning services'],
  },
  {
    href: '/services/air-cargo',
    client: 'Air Cargo Services',
    title: 'TSA-Approved Air Freight Operations',
    icon: RocketLaunchIcon,
    service: 'Import & Export',
    summary: [
      'Full-service air freight operations at O\'Hare and Rockford airports with SIDA-badged drivers and plane-side pickups.',
      'Complete CFS operations with same-day recovery services and comprehensive import/export documentation.',
    ],
    features: ['TSA approved operations', 'Same-day recovery', 'Complete screening capabilities'],
  },
  {
    href: '/services/drayage',
    client: 'Intermodal Drayage',
    title: 'Container Transport & Rail Services',
    icon: GlobeAltIcon,
    service: 'Rail & Port',
    summary: [
      'Private chassis fleet serving 21 major Chicagoland railyards with 7-day operations and tri-axle capacity.',
      'Over 500 container storage capacity with bonded drivers for secure transportation throughout the Midwest.',
    ],
    features: ['21 railyard access', 'Private chassis fleet', '500+ container storage'],
  },
  {
    href: '/services/over-the-road',
    client: 'Over the Road',
    title: 'Nationwide Freight Solutions',
    icon: TruckIcon,
    service: 'FTL & LTL',
    summary: [
      'Top 1-2% U.S. carrier providing coverage across all 48 continental states with real-time GPS tracking.',
      'Full truckload and less-than-truckload services with dedicated trucking and expedited freight options.',
    ],
    features: ['48-state coverage', 'Real-time GPS tracking', 'Expedited services'],
  },
  {
    href: '/services/local-pd',
    client: 'Local P&D',
    title: 'Chicago Metro Pickup & Delivery',
    icon: MapPinIcon,
    service: 'Last Mile',
    summary: [
      'Same-day and next-day delivery services throughout Chicagoland with time-critical shipment capabilities.',
      'Specialized handling for medical supplies, automotive parts, and high-value cargo with proof of delivery.',
    ],
    features: ['Same-day delivery', 'Time-critical shipments', 'Proof of delivery'],
  },
]

function Services() {
  return (
    <Container className="mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Our Services
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        {services.map((service) => {
          const IconComponent = service.icon
          return (
            <FadeIn key={service.client}>
              <article>
                <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                  <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                    <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mt-6 text-base font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                        {service.client}
                      </h3>
                    </div>
                    <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                      <p className="text-base text-neutral-950 lg:mt-2">
                        {service.service}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                    <p className="font-display text-4xl font-medium text-neutral-950">
                      <Link href={service.href}>{service.title}</Link>
                    </p>
                    <div className="mt-6 space-y-6 text-base text-neutral-600">
                      {service.summary.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <div className="mt-6">
                      <ul className="flex flex-wrap gap-4">
                        {service.features.map((feature) => (
                          <li key={feature} className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm text-neutral-600">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8 flex">
                      <Button
                        href={service.href}
                        aria-label={`Get a quote for ${service.client}`}
                      >
                        Get a Quote
                      </Button>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          )
        })}
      </div>
    </Container>
  )
}

const certifications = [
  ['CBW Class 3', logoBrightPath],
  ['TSA Approved', logoFamilyFund],
  ['GDP Compliant', logoUnseal],
  ['SmartWay Partner', logoMailSmirk],
  ['ISO Certified', logoHomeWork],
  ['CTPAT Member', logoGreenLife],
  ['IATA Certified', logoBrightPath],
  ['Hazmat Certified', logoNorthAdventures],
]

function Certifications() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Industry Certifications & Compliance
        </h2>
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <Border as={FadeIn} />
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
        >
          {certifications.map(([cert, logo]) => (
            <li key={cert} className="group">
              <FadeIn className="overflow-hidden">
                <Border className="pt-12 group-nth-[-n+2]:-mt-px sm:group-nth-3:-mt-px lg:group-nth-4:-mt-px">
                  <Image src={logo} alt={cert} unoptimized />
                </Border>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Services - CR Express',
  description:
    'Comprehensive logistics services including bonded warehousing, air cargo, intermodal drayage, and nationwide freight. CBW Class 3 certified with 26+ years experience.',
}

export default function ServicesPage() {
  return (
    <RootLayout>
      <PageIntro
        eyebrow="Our Services"
        title="Comprehensive logistics solutions for your supply chain"
      >
        <p>
          From our 280,000 sq ft bonded warehouse to nationwide freight services,
          CR Express delivers integrated logistics solutions that keep your business moving.
          With 26+ years of experience and strategic positioning near O'Hare, we're your
          trusted partner for all transportation and warehousing needs.
        </p>
      </PageIntro>

      <Services />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Fortune 500 Automotive', logo: logoPhobia }}
      >
        CR Express has been instrumental in streamlining our supply chain operations.
        Their bonded warehouse services and seamless customs handling have reduced our
        logistics costs by 30% while improving delivery times.
      </Testimonial>

      <Certifications />

      <ContactSection />
    </RootLayout>
  )
}