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
import { RelatedServices } from '@/components/RelatedServices'
import { Clients } from '@/components/Clients'
import { RootLayout } from '@/components/RootLayout'
import { OTRServiceSchema } from '@/components/Schema'

import imageHero from './hero.jpg'
import imageOTR1 from '@/images/service-photos/IMG 4656 Media Library.webp'
import imageOTR2 from '@/images/service-photos/Media Library Image 6986.webp'
import imageOTR3 from '@/images/service-photos/Media Library Image 3.webp'

function Hero() {
  return (
    <div className="relative isolate">
      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-20">
          <div className="lg:col-span-7">
            <FadeIn>
              <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 sm:text-6xl">
                Nationwide Freight That Actually Arrives on Schedule
              </h1>
              <p className="mt-6 text-xl text-neutral-600">
                Top 1-2% U.S. carrier with 98%+ on-time delivery across all 48 states. Real-time GPS tracking,
                dedicated lanes, and personalized service from a family-owned business.
              </p>
              <div className="mt-8">
                <TagList>
                  <TagListItem>48-State Coverage</TagListItem>
                  <TagListItem>98% On-Time</TagListItem>
                  <TagListItem>GPS Tracking</TagListItem>
                  <TagListItem>FTL & LTL</TagListItem>
                </TagList>
              </div>
            </FadeIn>
          </div>

          <div className="mt-12 lg:col-span-5 lg:mt-0">
            <FadeIn>
              <ServiceQuoteForm
                serviceName="Over the Road Freight"
                serviceType="otr"
              />
            </FadeIn>
          </div>
        </div>
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
          <StatListItem value="48" label="States covered" />
          <StatListItem value="98%" label="On-time delivery rate" />
          <StatListItem value="Top 2%" label="U.S. carrier ranking" />
          <StatListItem value="24/7" label="Dispatch availability" />
        </StatList>
      </FadeIn>
    </Container>
  )
}

function ImageSection1() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="relative aspect-[16/9] overflow-hidden rounded-4xl bg-neutral-100">
          <Image
            src={imageOTR1}
            alt="Over the road freight facility"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 67rem, 100vw"
          />
        </div>
      </FadeIn>
    </Container>
  )
}

function ImageSection2() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="relative aspect-[16/9] overflow-hidden rounded-4xl bg-neutral-100">
          <Image
            src={imageOTR2}
            alt="Over the road freight operations"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 67rem, 100vw"
          />
        </div>
      </FadeIn>
    </Container>
  )
}

function ImageSection3() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="relative aspect-[16/9] overflow-hidden rounded-4xl bg-neutral-100">
          <Image
            src={imageOTR3}
            alt="Over the road freight services"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 67rem, 100vw"
          />
        </div>
      </FadeIn>
    </Container>
  )
}


function Benefits() {
  return (
    <>
      <SectionIntro
        eyebrow="Key Benefits"
        title="Why Top Companies Choose CR Express for OTR"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Ranked in the top 1-2% of U.S. carriers, we deliver the reliability of a large carrier
          with the personalized service only a family-owned business can provide.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="98%+ On-Time Performance You Can Count On">
            We don't just promise on-time delivery, we deliver it consistently. Realistic transit quotes,
            proactive traffic monitoring, weather contingency planning, and regular driver communication
            ensure your freight arrives when promised.
          </GridListItem>
          <GridListItem title="Real-Time Tracking Every Mile">
            GPS tracking on all equipment provides current location, ETA based on actual progress, route
            monitoring, geofence alerts, and proof of delivery with timestamps. Always know exactly where
            your freight is.
          </GridListItem>
          <GridListItem title="True Nationwide 48-State Coverage">
            One carrier for all your freight needs from coast to coast. Midwest (same/next-day), Southeast
            (Florida to Carolinas), Northeast (New England & Mid-Atlantic), Southwest (Texas to Arizona),
            and West Coast (CA, OR, WA) with regular lanes.
          </GridListItem>
          <GridListItem title="Dedicated Contract Carriage Options">
            Committed capacity for regular lanes with the same drivers who learn your requirements, consistent
            equipment, predictable schedules, and contracted pricing locked in against spot market fluctuations.
            Priority service during peak seasons.
          </GridListItem>
          <GridListItem title="Expedited Team Driver Service">
            Cut transit time by up to 50% with two-driver teams for continuous driving. Coast-to-coast in 5-7
            days becomes 2-3 days. Perfect for time-critical shipments requiring the fastest possible delivery.
          </GridListItem>
          <GridListItem title="24/7 Personalized Dispatch Support">
            Talk to real people who know your account, not automated systems. Afterhours pickup/delivery
            coordination, real-time problem resolution, proactive delay communication, and personal account
            management you won't find at mega-carriers.
          </GridListItem>
        </GridList>
      </Container>
    </>
  )
}

function Services() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
          Complete OTR Solutions
        </h2>
        <div className="mt-12 space-y-8">
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Full Truckload (FTL) Service
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Dedicated truck capacity for 10+ pallets or 15,000+ lbs with direct origin-to-destination service.
              No transfers, no terminals – your cargo stays on one truck for maximum security and fastest transit.
              Both company drivers and owner-operators available.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Less Than Truckload (LTL) Service
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Cost-effective for 1-9 pallets where you share trailer space. Consolidation at our facility provides
              economical rates while maintaining reliable service and careful handling. Volume LTL programs available
              for consistent shippers.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Specialized Equipment & Handling
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              53' dry van trailers, temperature-controlled refrigerated units, flatbed service for oversized/unconventional
              cargo, hazmat certification for all classes, high-value freight with enhanced security, and white glove
              service with lift-gate and inside delivery.
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

const otrFAQs: FAQ[] = [
  {
    question: 'What\'s the difference between FTL and LTL, and how do I know which I need?',
    answer:
      'FTL (Full Truckload) is typically used for shipments of 10+ pallets or 15,000+ lbs that justify dedicating an entire trailer. Your freight goes directly from pickup to delivery on one truck with no stops or transfers, providing the fastest transit and least handling. LTL (Less Than Truckload) is cost-effective for smaller shipments (1-9 pallets) where you share trailer space with other customers\' freight. LTL involves terminal transfers and consolidation but costs significantly less for partial loads. Our team can help determine the most economical option for your specific shipment.',
  },
  {
    question: 'How does real-time GPS tracking work and what information can I see?',
    answer:
      'All our tractors are equipped with GPS tracking devices that report location every few minutes. You can access our online portal 24/7 to view current location on a map, estimated time of arrival based on actual route progress, recent stops and movements, and delivery status. You\'ll also receive automated notifications for pickup confirmation, en-route updates, and delivery completion with proof of delivery including time stamps and signatures.',
  },
  {
    question: 'What transit times should I expect for different distances?',
    answer:
      'Transit times vary by distance and service level. Standard FTL service typically provides: 0-500 miles in 1-2 days, 500-1000 miles in 2-3 days, 1000-1500 miles in 3-4 days, and coast-to-coast (2500+ miles) in 5-7 days. Expedited service with team drivers can cut these times by 40-50%. LTL service typically adds 1-2 days to FTL times due to terminal processing. We provide specific transit time estimates for every quote.',
  },
  {
    question: 'Do you offer dedicated contract carriage for regular lanes?',
    answer:
      'Yes, dedicated contract carriage is ideal for businesses with consistent freight needs on specific lanes. You receive committed capacity with the same drivers who learn your requirements, consistent equipment type and condition, predictable pickup and delivery schedules, contracted pricing that\'s locked in (not subject to spot market fluctuations), and priority service during peak seasons. Minimum volumes typically required - contact us to discuss your specific needs.',
  },
  {
    question: 'Can you handle oversized, overweight, or specialized cargo?',
    answer:
      'Yes, we have specialized equipment and expertise for non-standard freight. Our flatbed trailers handle oversized items that won\'t fit in standard 53\' dry vans. Step-deck and double-drop trailers accommodate tall or extremely heavy cargo. We arrange permits and route planning for overweight and overdimensional loads, provide specialized securement for unusual shapes, and coordinate pilot cars and escort services when required. Our team will assess your specific cargo and recommend the appropriate equipment and routing.',
  },
  {
    question: 'What happens if my delivery is delayed due to weather or traffic?',
    answer:
      'We proactively monitor weather and traffic conditions along your freight\'s route. If delays are anticipated, our dispatch team contacts you immediately with updated ETAs and options. We reroute when possible to minimize impacts, may add team drivers to expedited shipments to make up time, and maintain 24/7 communication so you\'re never in the dark. Our on-time performance over 98% reflects our commitment to reliable delivery even when conditions are challenging.',
  },
]

export const metadata: Metadata = {
  title: 'Over the Road Freight Services - FTL & LTL Nationwide | CR Express',
  description:
    'Top 1-2% U.S. carrier with 98%+ on-time delivery across 48 states. Full truckload and LTL services with real-time GPS tracking, dedicated lanes, and 24/7 dispatch support.',
}

export default function OverTheRoadService() {
  return (
    <RootLayout>
      <OTRServiceSchema />
      <Hero />
      <Clients />
      <Stats />
      <ImageSection1 />
      <Benefits />
      <ImageSection2 />
      <Services />
      <ImageSection3 />

      <RelatedServices currentService="/services/over-the-road" />

      <ServiceFAQSection
        title="Over the Road FAQs"
        description="Common questions about our nationwide FTL and LTL freight services, tracking, and delivery times."
        faqs={otrFAQs}
      />

      <ContactSection />
    </RootLayout>
  )
}
