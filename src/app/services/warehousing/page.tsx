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
import imageWarehouse from './warehouse-interior.jpg'

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
          {/* Left Column - Content */}
          <div className="lg:col-span-7">
            <FadeIn>
              <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 sm:text-6xl">
                Stop Paying Customs Duties on Inventory You Haven't Sold Yet
              </h1>
              <p className="mt-6 text-xl text-neutral-600">
                Defer duties for up to 5 years with our CBW Class 3 certified bonded warehouse.
                280,000 sq ft of secure, compliant storage less than 5 miles from O'Hare Airport.
              </p>
              <div className="mt-8">
                <TagList>
                  <TagListItem>CBW Class 3 Certified</TagListItem>
                  <TagListItem>Up to 5 Years Duty-Free</TagListItem>
                  <TagListItem>24/7 Security</TagListItem>
                  <TagListItem>GDP Compliant</TagListItem>
                </TagList>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Quote Form */}
          <div className="mt-12 lg:col-span-5 lg:mt-0">
            <FadeIn>
              <ServiceQuoteForm
                serviceName="Bonded Warehouse Services"
                serviceType="warehousing"
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
          <StatListItem value="280,000" label="Square feet of secure storage" />
          <StatListItem value="<5 mi" label="Distance from O'Hare Airport" />
          <StatListItem value="5 years" label="Duty-free storage capacity" />
          <StatListItem value="24/7" label="Security & surveillance" />
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
            src={imageHero}
            alt="Bonded warehouse facility exterior"
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
            src={imageWarehouse}
            alt="Warehouse interior operations"
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
            src={imageHero}
            alt="Bonded warehouse services"
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
        title="How Bonded Warehouse Services Save You Money"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Our CBW Class 3 certified facility transforms how you manage imports,
          dramatically improving cash flow while maintaining compliance.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Defer Customs Duties Up to 5 Years">
            Store imported goods duty-free until they're sold or distributed. This cash flow
            advantage can save high-volume importers tens of thousands annually by paying duties
            only when inventory moves, not when it arrives.
          </GridListItem>
          <GridListItem title="Reduce Carrying Costs by 15-30%">
            Eliminate the burden of paying duties on unsold inventory. Combined with strategic
            location near O'Hare and major railyards, you optimize both cash flow and logistics costs.
          </GridListItem>
          <GridListItem title="Eliminate Customs Hassles">
            Our experienced team handles all CBP documentation, customs examinations, entry forms,
            and withdrawal paperwork. Focus on your business while we ensure complete compliance.
          </GridListItem>
          <GridListItem title="Scale Flexibly with Your Business">
            From a few pallets to full truckloads, our 280,000 sq ft facility adapts to your needs.
            Climate-controlled zones, GDP compliant storage, and specialized handling for any cargo type.
          </GridListItem>
          <GridListItem title="Move Goods Faster to Market">
            Less than 5 miles from ORD, direct access to 21 railyards, and same-day/next-day
            delivery to 200+ zip codes. Your inventory reaches customers faster from our strategic location.
          </GridListItem>
          <GridListItem title="Protect High-Value Cargo">
            24/7 CCTV surveillance, secured dock doors, segregated high-value storage areas, and
            motion-activated lighting provide maximum security for electronics, pharmaceuticals, and luxury goods.
          </GridListItem>
        </GridList>
      </Container>
    </>
  )
}

function Process() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
          Simple, Streamlined Bonded Operations
        </h2>
        <div className="mt-12 space-y-12">
          <div className="flex gap-6">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-neutral-950 text-white font-display text-xl font-semibold">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold text-neutral-950">
                Cargo Receipt & Documentation
              </h3>
              <p className="mt-2 text-base text-neutral-600">
                Your shipment arrives and our team immediately manages all CBP documentation including
                customs entry forms, bonded warehouse receipts, and inventory tracking. We coordinate
                with customs brokers ensuring complete compliance from day one.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-neutral-950 text-white font-display text-xl font-semibold">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold text-neutral-950">
                Secure Storage & Real-Time Visibility
              </h3>
              <p className="mt-2 text-base text-neutral-600">
                Goods are stored in our secure, climate-controlled facility with 24/7 monitoring. Access
                real-time inventory visibility through our WMS, track stock levels, monitor expiration dates,
                and generate detailed reports through our secure online portal.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-neutral-950 text-white font-display text-xl font-semibold">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold text-neutral-950">
                Value-Added Services
              </h3>
              <p className="mt-2 text-base text-neutral-600">
                While under bond, we can transform your goods with sorting, repackaging, labeling, quality
                inspections, and assembly operations. Customize products for specific markets without paying
                duties until they're ready for distribution.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-neutral-950 text-white font-display text-xl font-semibold">
              4
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold text-neutral-950">
                Customs Release & Distribution
              </h3>
              <p className="mt-2 text-base text-neutral-600">
                When you're ready to release goods, we handle all withdrawal documentation and coordinate
                final delivery. Whether distributing domestically or re-exporting internationally, we ensure
                seamless transitions from bonded storage to final destination.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

function IndustriesServed() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
          Specialized Industry Solutions
        </h2>
        <div className="mt-12 space-y-8">
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Pharmaceutical & Healthcare
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              GDP compliant facility with validated cold chain logistics, temperature-controlled environments,
              comprehensive documentation, and pharmaceutical-specific security protocols for medications and medical devices.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Automotive Components
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Just-in-time delivery support for manufacturers with OEM compliance, specialized storage for automotive
              parts and components, and expedited delivery services for critical production needs.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              High-Value Cargo
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Enhanced security protocols for electronics, luxury goods, and valuable inventory with segregated storage,
              additional surveillance, $300,000 cargo liability insurance, and high-value carrier certification.
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

const warehouseFAQs: FAQ[] = [
  {
    question: 'How does bonded warehouse storage save my business money?',
    answer:
      'Bonded warehouse storage defers customs duties and fees until goods are withdrawn from the facility. This can save 15-30% on total import costs by improving cash flow, allowing you to pay duties only when inventory sells. For high-volume importers, this can mean tens of thousands in annual savings. Additionally, goods stored for up to 5 years without duty payment give you flexibility for seasonal inventory and slow-moving products.',
  },
  {
    question: 'What types of cargo can be stored in your bonded warehouse?',
    answer:
      'Our CBW Class 3 facility can store virtually any type of imported merchandise including consumer goods, industrial equipment, automotive parts, pharmaceuticals, electronics, textiles, food products (with proper permits), and raw materials. We maintain specialized storage zones for temperature-sensitive, high-value, and hazardous materials with appropriate certifications.',
  },
  {
    question: 'How does the customs examination process work?',
    answer:
      'We provide dedicated CBP examination space within our facility when customs officers need to inspect shipments. Our staff coordinates examination appointments, prepares cargo for inspection, and ensures all documentation is readily available. We handle the entire process to minimize delays and ensure compliance.',
  },
  {
    question: 'Can I combine bonded warehouse services with your other logistics offerings?',
    answer:
      'Absolutely. We specialize in integrated logistics solutions. Your bonded cargo can seamlessly transition to our drayage services for container transport from railyards, our air cargo services for time-sensitive shipments, or our OTR trucking for nationwide distribution. This integration eliminates hand-offs and streamlines your entire supply chain.',
  },
  {
    question: 'What reporting and visibility do I have for bonded inventory?',
    answer:
      'Our warehouse management system provides real-time inventory visibility through a secure online portal. Access current stock levels, view transaction history, generate custom reports, track lot numbers and serial numbers, monitor inventory aging, and receive automated alerts for low stock or approaching deadlines.',
  },
  {
    question: 'How quickly can you receive and process inbound containers?',
    answer:
      'We operate 7 days a week and can schedule container devanning within 24 hours of arrival. Our experienced team typically processes a 40ft container in 2-4 hours depending on contents. Urgent shipments can be prioritized for same-day processing to keep your supply chain moving without delays.',
  },
]

export const metadata: Metadata = {
  title: 'Bonded Warehouse Services - CBW Class 3 Certified | CR Express',
  description:
    'Defer customs duties up to 5 years with our CBW Class 3 certified bonded warehouse. 280,000 sq ft near O\'Hare Airport. GDP compliant, 24/7 security, real-time inventory visibility.',
}

export default function WarehousingService() {
  return (
    <RootLayout>
      <Hero />
      <Clients />
      <Stats />
      <ImageSection1 />
      <Benefits />
      <ImageSection2 />
      <Process />
      <IndustriesServed />
      <ImageSection3 />

      <ServiceFAQSection
        title="Bonded Warehouse FAQs"
        description="Common questions about our CBW Class 3 certified facility, customs compliance, and warehousing services."
        faqs={warehouseFAQs}
      />

      <ContactSection />
    </RootLayout>
  )
}
