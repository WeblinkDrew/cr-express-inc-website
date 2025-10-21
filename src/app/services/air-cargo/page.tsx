import { type Metadata } from 'next'
import Image from 'next/image'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { TagList, TagListItem } from '@/components/TagList'
import { ServiceQuoteForm } from '@/components/ServiceQuoteForm'
import { ServiceFAQSection, type FAQ } from '@/components/ServiceFAQSection'
import { RootLayout } from '@/components/RootLayout'

import imageHero from './hero.jpg'

import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-light.svg'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoHomeWork from '@/images/clients/home-work/logo-light.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-light.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobia from '@/images/clients/phobia/logo-light.svg'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'

const clients = [
  ['Phobia', logoPhobia],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoBrightPath],
  ['North Adventures', logoNorthAdventures],
]

function Hero() {
  return (
    <div className="relative isolate">
      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-20">
          <div className="lg:col-span-7">
            <FadeIn>
              <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 sm:text-6xl">
                Time-Critical Air Freight That Actually Arrives On Time
              </h1>
              <p className="mt-6 text-xl text-neutral-600">
                SIDA-badged drivers with plane-side access at O'Hare and Rockford airports.
                Same-day recovery for urgent shipments. TSA-approved operations you can trust.
              </p>
              <div className="mt-8">
                <TagList>
                  <TagListItem>TSA Approved</TagListItem>
                  <TagListItem>SIDA Airport Access</TagListItem>
                  <TagListItem>Same-Day Recovery</TagListItem>
                  <TagListItem>Plane-Side Pickup</TagListItem>
                </TagList>
              </div>
            </FadeIn>
          </div>

          <div className="mt-12 lg:col-span-5 lg:mt-0">
            <FadeIn>
              <ServiceQuoteForm
                serviceName="Air Cargo Services"
                serviceType="air-cargo"
              />
            </FadeIn>
          </div>
        </div>
      </Container>
    </div>
  )
}

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-40">
      <Container>
        <FadeIn>
          <h2 className="font-display text-2xl font-semibold text-white text-center">
            Trusted by Leading Companies
          </h2>
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
          >
            {clients.map(([client, logo]) => (
              <li key={client} className="flex justify-center">
                <FadeIn>
                  <Image src={logo} alt={client} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function Stats() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl text-center">
          By The Numbers
        </h2>
        <StatList className="mt-16">
          <StatListItem value="2" label="Major airport facilities" />
          <StatListItem value="<5 mi" label="From O'Hare Airport" />
          <StatListItem value="2-4 hrs" label="Typical recovery time" />
          <StatListItem value="200+" label="Zip codes served" />
        </StatList>
      </FadeIn>
    </Container>
  )
}

function Benefits() {
  return (
    <>
      <SectionIntro
        eyebrow="Key Benefits"
        title="Why Choose CR Express for Air Cargo"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Our TSA-approved operations and SIDA-badged drivers provide the fastest, most secure
          air freight service in the Chicago market.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Fastest Recovery Times in Chicago">
            SIDA-badged drivers access the ramp for plane-side pickups, eliminating intermediate handling.
            For domestic flights, we recover cargo within 2-4 hours. Urgent shipments get same-day
            recovery with delivery within hours of landing.
          </GridListItem>
          <GridListItem title="Direct Access to Both ORD and RFD">
            Less than 5 miles from O'Hare provides minimal transit times. We also serve Rockford (RFD)
            for cost advantages and less congestion. Choose the best airport for your specific route and timeline.
          </GridListItem>
          <GridListItem title="Complete Documentation Handling">
            In-house export documentation, PTT creation, 1F and 1D transfer processing, and comprehensive
            customs paperwork. We handle the complexity so your shipments clear faster with zero errors.
          </GridListItem>
          <GridListItem title="Pharmaceutical Cold Chain Expertise">
            GDP compliant operations with validated thermal packaging, temperature monitoring, refrigerated
            vehicles when needed, and complete chain of custody documentation for temperature-sensitive products.
          </GridListItem>
          <GridListItem title="Established Airline Partnerships">
            Daily sweeps with United (9:00 & 18:00), Lufthansa (5:00), Air France (5:00), and Delta (4:00-6:00).
            These partnerships ensure reliable service and optimal scheduling for your shipments.
          </GridListItem>
          <GridListItem title="Comprehensive Local Delivery Network">
            Same-day and next-day delivery to 200+ zip codes within 60 miles of O'Hare. Real-time proof of
            delivery, route optimization, and flexible delivery options including consolidation and cross-docking.
          </GridListItem>
        </GridList>
      </Container>
    </>
  )
}

function AirlinePartnerships() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
          Major Airline Partnerships & Sweep Services
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              United Airlines (016)
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Monday-Friday sweeps at 9:00 AM and 6:00 PM. Comprehensive domestic and international routes
              with multiple daily sweeps for flexible pickup timing.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Lufthansa Cargo (020, 724, 105)
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Daily sweeps at 5:00 AM. European and global destinations with early morning processing
              for same-day delivery coordination.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Air France (074, 057)
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Daily sweeps at 5:00 AM. European and international routes coordinated with European
              business hours for optimal timing.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Delta Air Lines (006, 074, 057)
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Daily sweeps between 4:00-6:00 AM. Extensive domestic and international network with
              multiple sweep codes for routing flexibility.
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

function Capabilities() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
          Complete Air Cargo Capabilities
        </h2>
        <div className="mt-12 space-y-8">
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              ULD & Specialized Equipment Handling
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Specialized equipment for Unit Load Device (ULD) transfers with plane-side loading/unloading,
              ULD breakdown and build-up in our CFS facility, and container/pallet configurations for all
              aircraft types. Complete 1F and 1D transfer processing for efficient freight movement.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Dangerous Goods Certification
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Fully certified for dangerous goods handling in compliance with IATA, DOT, and FAA regulations.
              Regular training on proper handling, documentation, and storage. We handle most DG classifications
              with proper advance notice.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Complete CFS Operations
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Container Freight Station services with consolidation and deconsolidation, cargo sorting,
              palletizing, same-day recovery capabilities, and screening equipment for complete TSA compliance.
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

const airCargoFAQs: FAQ[] = [
  {
    question: 'What\'s the difference between SIDA-approved and SIDA-badged drivers?',
    answer:
      'SIDA-approved drivers can access screened cargo areas for standard pickups and deliveries at the airport cargo facilities. SIDA-badged drivers have additional clearance allowing them to access the ramp and perform plane-side deliveries and recoveries, providing the fastest possible service for time-critical shipments by eliminating intermediate handling.',
  },
  {
    question: 'How quickly can you recover air cargo after it lands?',
    answer:
      'For domestic flights, we typically recover cargo within 2-4 hours of touchdown with our standard service. For urgent shipments, our same-day recovery with SIDA-badged drivers can pick up freight directly from the aircraft, enabling delivery within hours of landing. International shipments require customs clearance which typically adds 1-2 hours to the process.',
  },
  {
    question: 'Do you handle hazardous materials and dangerous goods?',
    answer:
      'Yes, we are fully certified for dangerous goods handling in compliance with IATA, DOT, and FAA regulations. Our staff receives regular training on proper handling, documentation, and storage of hazardous materials. We can handle most DG classifications with proper advance notice and documentation.',
  },
  {
    question: 'What temperature-controlled capabilities do you have for pharmaceuticals?',
    answer:
      'Our pharmaceutical cold chain services maintain strict temperature control from airport pickup through final delivery. We use validated thermal packaging, refrigerated vehicles when needed, temperature monitoring devices, and maintain complete chain of custody documentation. Our facilities are GDP compliant with proper storage for temperature-sensitive products.',
  },
  {
    question: 'Can you coordinate both O\'Hare and Rockford airport shipments?',
    answer:
      'Absolutely. We maintain operations at both ORD and RFD, allowing us to optimize routing based on your specific needs. Rockford often provides cost advantages and less congestion for certain routes, while O\'Hare offers more frequent flights and broader carrier options. We\'ll recommend the best airport for your shipment.',
  },
  {
    question: 'What documentation do I need to provide for international air exports?',
    answer:
      'For exports, you\'ll need to provide a commercial invoice, packing list, and any required export licenses or compliance documents. We can handle all other documentation including the air waybill, Shipper\'s Letter of Instruction, and certificates of origin. Our team will guide you through the specific requirements based on your destination country and product type.',
  },
]

export const metadata: Metadata = {
  title: 'Air Cargo Services - TSA Approved O\'Hare & Rockford | CR Express',
  description:
    'TSA-approved air freight with SIDA-badged drivers at O\'Hare and Rockford airports. Same-day recovery, plane-side pickup, and complete documentation services for time-critical shipments.',
}

export default function AirCargoService() {
  return (
    <RootLayout>
      <Hero />
      <Clients />
      <Stats />
      <Benefits />
      <AirlinePartnerships />
      <Capabilities />

      <ServiceFAQSection
        title="Air Cargo FAQs"
        description="Common questions about our TSA-approved air cargo operations, SIDA access, and airport services."
        faqs={airCargoFAQs}
      />

      <ContactSection />
    </RootLayout>
  )
}
