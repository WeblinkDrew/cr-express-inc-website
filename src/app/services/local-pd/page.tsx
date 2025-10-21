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
                Same-Day Chicago Delivery That Actually Happens Same Day
              </h1>
              <p className="mt-6 text-xl text-neutral-600">
                Professional local pickup and delivery throughout the Chicago metro area. Same-day and next-day
                service with time-critical capabilities for medical supplies, automotive parts, and urgent freight.
              </p>
              <div className="mt-8">
                <TagList>
                  <TagListItem>Same-Day Delivery</TagListItem>
                  <TagListItem>200+ Zip Codes</TagListItem>
                  <TagListItem>Medical Certified</TagListItem>
                  <TagListItem>Real-Time POD</TagListItem>
                </TagList>
              </div>
            </FadeIn>
          </div>

          <div className="mt-12 lg:col-span-5 lg:mt-0">
            <FadeIn>
              <ServiceQuoteForm
                serviceName="Local Pickup & Delivery"
                serviceType="local-pd"
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
          <StatListItem value="Same-day" label="Available delivery speed" />
          <StatListItem value="200+" label="Zip codes served" />
          <StatListItem value="100%" label="Proof of delivery documentation" />
          <StatListItem value="6 days" label="Weekly operations" />
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
            alt="Local delivery facility"
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
            src={imageHero}
            alt="Local delivery operations"
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
            alt="Local delivery services"
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
        title="Fast, Reliable Chicago-Area Delivery"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Based in Elk Grove Village at the center of Chicagoland, our strategic location enables
          efficient service throughout the entire metro area.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="True Same-Day Delivery Capability">
            Orders placed by early afternoon get pickup within 1-2 hours with same-day delivery. For urgent
            situations, on-demand service provides even faster response. We understand time-critical means
            TODAY, not tomorrow.
          </GridListItem>
          <GridListItem title="Complete Chicago Metro Coverage">
            All of Cook, DuPage, Lake, Will, and Kane counties – over 200 zip codes. Naperville, Aurora,
            Joliet, Schaumburg, Elgin, Palatine, Arlington Heights, Waukegan, and everywhere in between.
            Extended service to Northwest Indiana and Southern Wisconsin.
          </GridListItem>
          <GridListItem title="Specialized Medical Delivery Expertise">
            Chain of custody documentation for controlled substances, temperature monitoring for cold chain
            products, HIPAA-compliant handling, direct-to-department delivery within facilities, and trained
            drivers familiar with medical facility protocols.
          </GridListItem>
          <GridListItem title="Time-Critical Appointment Windows">
            Coordinate deliveries to specific 1-hour windows. Medical facilities needing 10:00-11:00 AM,
            loading docks closing at 3:00 PM, production line support requiring precise timing – we plan routes
            to hit your windows consistently.
          </GridListItem>
          <GridListItem title="Complete Proof of Delivery Documentation">
            Electronic signatures on mobile devices, photos when requested, precise delivery times, recipient
            names, and instant POD upload to online portal for 24/7 access. Retrieve documentation immediately
            after delivery completion.
          </GridListItem>
          <GridListItem title="Seamless Integration with Other Services">
            Shipments from our bonded warehouse move directly to local delivery. Air cargo from O'Hare transfers
            immediately. Containers from drayage get transloaded and distributed. OTR freight breaks down for
            multi-stop delivery. Single-source simplicity.
          </GridListItem>
        </GridList>
      </Container>
    </>
  )
}

function SpecializedServices() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
          Specialized Handling Capabilities
        </h2>
        <div className="mt-12 space-y-8">
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Medical & Pharmaceutical Delivery
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Temperature-sensitive medications, medical devices, and laboratory specimens with chain of custody
              documentation, temperature monitoring, HIPAA-compliant handling, trained medical logistics drivers,
              and direct-to-facility delivery for hospitals, clinics, pharmacies, and laboratories.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Automotive Parts Just-in-Time Delivery
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Production line support with emergency breakdown deliveries, multi-location distribution for
              dealerships and repair facilities, quality control handling, and precise timing coordination.
              We understand automotive manufacturing can't wait.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              High-Value Cargo Protection
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Electronics, jewelry, artwork, and sensitive documents with signature required delivery, limited
              vehicle access, GPS tracking, additional insurance available, and photo documentation for complete
              security and accountability.
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

const localPDFAQs: FAQ[] = [
  {
    question: 'How quickly can you pick up for same-day delivery?',
    answer:
      'Same-day delivery is available for orders placed by early afternoon, typically with pickup within 1-2 hours of your call. For urgent situations, we can often provide faster response with our on-demand service. The exact cutoff time varies by pickup and delivery locations within our service area. Contact our dispatch team for specific timing on your delivery needs.',
  },
  {
    question: 'What areas do you cover for local pickup and delivery?',
    answer:
      'We serve the entire Chicago metropolitan area including all of Cook, DuPage, Lake, Will, and Kane counties. This covers over 200 zip codes including Chicago and all suburbs. We provide service to major cities like Naperville, Aurora, Joliet, Schaumburg, Elgin, Palatine, Arlington Heights, Waukegan, and many more. Extended service is available to Northwest Indiana, Southern Wisconsin, and outlying Illinois communities.',
  },
  {
    question: 'Do you provide proof of delivery documentation?',
    answer:
      'Yes, comprehensive proof of delivery is provided for all deliveries. Our drivers capture electronic signatures on mobile devices, take photos when requested or required, record precise delivery times and recipient names, and upload POD documentation to our online portal for 24/7 access. You can retrieve POD images and details immediately after delivery completion.',
  },
  {
    question: 'Can you handle time-critical deliveries to specific appointment windows?',
    answer:
      'Absolutely. We specialize in time-critical deliveries with appointment scheduling capabilities. Whether you need delivery between 10:00-11:00 AM for a medical facility, coordination with a loading dock that closes at 3:00 PM, or precise timing for production line support, our dispatch team plans routes to meet your specific delivery windows. We maintain communication throughout to ensure on-time arrival.',
  },
  {
    question: 'What types of specialized handling do you provide for medical deliveries?',
    answer:
      'Our medical delivery services include chain of custody documentation for controlled substances and specimens, temperature monitoring for cold chain products, HIPAA-compliant handling of protected health information, direct-to-department delivery within healthcare facilities, and trained drivers familiar with medical facility protocols. We serve hospitals, clinics, pharmacies, laboratories, and medical device distributors throughout Chicagoland.',
  },
  {
    question: 'How do your local delivery services integrate with your other logistics offerings?',
    answer:
      'Integration is one of our key advantages. Shipments arriving at our bonded warehouse can move directly to local delivery without additional hand-offs. Air cargo from O\'Hare or Rockford can transfer immediately to local delivery trucks. Containers from our drayage services can be transloaded and distributed locally. Over-the-road freight arriving from out of state can be broken down for multi-stop Chicago-area delivery. This single-source approach simplifies your logistics, reduces costs, and improves reliability.',
  },
]

export const metadata: Metadata = {
  title: 'Local Pickup & Delivery Chicago - Same-Day Service | CR Express',
  description:
    'Professional same-day and next-day delivery throughout Chicago metro area. 200+ zip codes, medical certified, time-critical capabilities. Real-time proof of delivery.',
}

export default function LocalPDService() {
  return (
    <RootLayout>
      <Hero />
      <Clients />
      <Stats />
      <ImageSection1 />
      <Benefits />
      <ImageSection2 />
      <SpecializedServices />
      <ImageSection3 />

      <RelatedServices currentService="/services/local-pd" />

      <ServiceFAQSection
        title="Local Pickup & Delivery FAQs"
        description="Common questions about our same-day delivery, coverage areas, and specialized Chicago metro services."
        faqs={localPDFAQs}
      />

      <ContactSection />
    </RootLayout>
  )
}
