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

import imageHero from './hero.jpg'

function Hero() {
  return (
    <div className="relative isolate">
      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-20">
          <div className="lg:col-span-7">
            <FadeIn>
              <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 sm:text-6xl">
                Stop Waiting for Chassis. Start Moving Containers.
              </h1>
              <p className="mt-6 text-xl text-neutral-600">
                Private chassis fleet serving all 21 Chicagoland railyards. No "grey pool" shortages.
                Same-day and next-day pickup with 7-day operations and 500+ container storage.
              </p>
              <div className="mt-8">
                <TagList>
                  <TagListItem>Private Chassis Fleet</TagListItem>
                  <TagListItem>21 Railyards</TagListItem>
                  <TagListItem>7-Day Operations</TagListItem>
                  <TagListItem>500+ Storage</TagListItem>
                </TagList>
              </div>
            </FadeIn>
          </div>

          <div className="mt-12 lg:col-span-5 lg:mt-0">
            <FadeIn>
              <ServiceQuoteForm
                serviceName="Intermodal Drayage Services"
                serviceType="drayage"
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
          <StatListItem value="21" label="Railyards serviced" />
          <StatListItem value="500+" label="Container storage capacity" />
          <StatListItem value="7 days" label="Weekly operations" />
          <StatListItem value="100%" label="Private chassis availability" />
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
            alt="Drayage facility"
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
            alt="Drayage operations"
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
            alt="Drayage services"
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
        title="Why Private Chassis Make All the Difference"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Our privately-owned chassis fleet eliminates the delays and uncertainty of shared pools,
          giving you reliable, consistent container transportation.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Never Hear 'No Chassis Available' Again">
            Grey pool shortages plague intermodal drayage. With our owned fleet of 20ft, 40ft, and 45ft
            chassis plus tri-axles for heavy containers, equipment is always ready when you need it.
            No waiting, no surprise fees.
          </GridListItem>
          <GridListItem title="Complete Railyard Coverage in One Call">
            Access to all 21 major Chicagoland railyards including BNSF Logistics Park Chicago, UP Global
            facilities, CSX Bedford Park, NS Landers, CN Harvey, and CP Bensenville. One provider, complete coverage.
          </GridListItem>
          <GridListItem title="Same-Day and Weekend Service">
            7-day operations with round-the-clock railyard pickup capabilities. Weekend and holiday coverage,
            24/7 dispatch support, and afterhours expedited service for time-sensitive movements.
          </GridListItem>
          <GridListItem title="Massive 500+ Container Storage Capacity">
            Secure staging at strategic Chicagoland locations for import containers awaiting delivery,
            export containers before rail movement, or empty equipment repositioning. Flexible daily, weekly,
            or monthly terms.
          </GridListItem>
          <GridListItem title="Tri-Axle Service for Heavy Containers">
            Specialized tri-axle chassis handle containers up to 44,000 lbs cargo weight (67,200 lbs gross).
            Experienced drivers ensure proper permitting, legal routing, and compliant transport of overweight
            machinery, steel, and industrial equipment.
          </GridListItem>
          <GridListItem title="Seamless Warehouse Integration">
            Containers move directly from railyard to our 280,000 sq ft bonded warehouse for transloading,
            storage, or cross-docking. Single-source accountability from rail arrival through final delivery
            eliminates hand-offs.
          </GridListItem>
        </GridList>
      </Container>
    </>
  )
}

function RailyardNetwork() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
          Strategic Railyard Network Coverage
        </h2>
        <div className="mt-12 space-y-8">
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              North Railyard Network - Canadian Pacific
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Bensenville Yard provides direct access to Canadian markets via CP network. Efficient
              cross-border freight movement with streamlined customs clearance for Canadian shipments.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              City Railyard Network - CSX/NS/BNSF
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              CSX Bedford Park and 59th Street, Norfolk Southern Landers Yard and 47th Street, BNSF Cicero
              and Corwith facilities. Central Chicago positioning for rapid distribution with multiple carrier
              routing options.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              South Railyard Network - CN Harvey/NFS
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              Canadian National Harvey facility, 47th Street terminal, and Norfolk Southern NFS Calumet terminal.
              Strategic southern positioning for Indiana/Michigan corridors and major distribution centers.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              Elwood/Joliet Network - Primary Intermodal Hub
            </h3>
            <p className="mt-2 text-base text-neutral-600">
              BNSF Logistics Park Chicago (one of North America's largest), UP Global II/III/IV terminals,
              and CN Joliet facilities. Critical east-west freight corridor for high-volume intermodal
              operations and transcontinental rail movements.
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

const drayageFAQs: FAQ[] = [
  {
    question: 'Why is a private chassis fleet better than using shared pool chassis?',
    answer:
      'Private chassis eliminate the "grey pool" equipment shortages that plague intermodal drayage. With our owned fleet, you never hear "no chassis available." We control maintenance quality, sizing for customer demand, and equipment positioning. This translates to faster pickup times, better reliability, and no surprise chassis usage fees that can add hundreds of dollars per move.',
  },
  {
    question: 'Which railyards do you serve and how quickly can you pick up containers?',
    answer:
      'We serve all 21 major Chicagoland railyards including BNSF Logistics Park Chicago, UP Global facilities, CSX Bedford Park, NS Landers, CN Harvey, and CP Bensenville, plus all Joliet-area terminals. Standard pickup is same-day or next-day depending on arrival time and railyard. Expedited service can retrieve containers within hours of availability for urgent shipments.',
  },
  {
    question: 'Can you handle overweight containers?',
    answer:
      'Yes, our tri-axle chassis handle containers up to 44,000 lbs cargo weight (67,200 lbs gross including container and chassis). Our experienced drivers and logistics team ensure proper permitting, legal routing, and compliant transport. We regularly move overweight machinery, steel, and industrial equipment shipments.',
  },
  {
    question: 'Do you offer weekend and after-hours drayage service?',
    answer:
      'Absolutely. We operate 7 days a week including weekends and most holidays. Our 24/7 dispatch team coordinates afterhours pickups and deliveries for time-critical shipments. This flexibility is essential for matching railroad operating schedules and meeting tight consignee appointments.',
  },
  {
    question: 'What\'s included in your container storage services?',
    answer:
      'Our secure container yards include fenced facilities with 24/7 video surveillance, online inventory management with real-time visibility, flexible daily/weekly/monthly storage terms, lift equipment for loading/unloading, and container maintenance services. We can store import containers awaiting delivery, loaded export containers before rail movement, or empty equipment for repositioning.',
  },
  {
    question: 'Can you coordinate drayage with your warehouse and distribution services?',
    answer:
      'Yes, that\'s one of our key advantages. Containers can move directly from railyard to our 280,000 sq ft bonded warehouse for transloading, storage, or cross-docking. This integrated approach eliminates multiple hand-offs, reduces costs, and provides single-source accountability from rail arrival through final delivery. We can also coordinate with our air cargo and OTR services for complete supply chain solutions.',
  },
]

export const metadata: Metadata = {
  title: 'Intermodal Drayage Services - 21 Chicago Railyards | CR Express',
  description:
    'Private chassis fleet serving all 21 Chicagoland railyards. No grey pool shortages. 7-day operations, tri-axle service, 500+ container storage. Same-day and next-day pickup available.',
}

export default function DrayageService() {
  return (
    <RootLayout>
      <Hero />
      <Clients />
      <Stats />
      <ImageSection1 />
      <Benefits />
      <ImageSection2 />
      <RailyardNetwork />
      <ImageSection3 />

      <RelatedServices currentService="/services/drayage" />

      <ServiceFAQSection
        title="Drayage Services FAQs"
        description="Common questions about our private chassis fleet, railyard coverage, and container drayage operations."
        faqs={drayageFAQs}
      />

      <ContactSection />
    </RootLayout>
  )
}
