import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BuildingStorefrontIcon, TruckIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { FAQSection } from '@/components/FAQSection'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { SectorsWeServe } from '@/components/SectorsWeServe'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import { VideoSection } from '@/components/VideoSection'
import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-light.svg'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoHomeWork from '@/images/clients/home-work/logo-light.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-light.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import logoPhobiaLight from '@/images/clients/phobia/logo-light.svg'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'
import imageLaptop from '@/images/IMG 4204 Media Library.jpg'
import { RootLayout } from '@/components/RootLayout'

// Trust badges and certifications for CR Express
// TODO: Replace with actual certification badge images
const certifications = [
  ['CBW Class 3', logoPhobiaLight],
  ['TSA Approved', logoFamilyFund],
  ['GDP Compliant', logoUnseal],
  ['SmartWay Partner', logoMailSmirk],
  ['ISO Certified', logoHomeWork],
  ['CTPAT Member', logoGreenLife],
  ['IATA Certified', logoBrightPath],
  ['Hazmat Certified', logoNorthAdventures],
]

// Icon wrapper component with circle
function IconWithCircle({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="relative h-16 w-16">
      <div className="absolute inset-0 rounded-full border-2 border-neutral-950" />
      <div className="flex h-full w-full items-center justify-center">
        <Icon className="h-8 w-8 text-neutral-950" />
      </div>
    </div>
  )
}

// CR Express core services for homepage
const services = [
  {
    href: '/services/warehousing',
    title: 'Bonded Warehouse Services',
    description:
      '280,000 sq ft CBW Class 3 certified facility with duty-free storage up to 5 years, complete customs compliance, and GDP compliant operations.',
    icon: BuildingStorefrontIcon,
    year: '1999',
  },
  {
    href: '/services/drayage',
    title: 'Intermodal Drayage',
    description:
      'Private chassis fleet serving 21 major Chicagoland railyards with 7-day operations, tri-axle capacity, and 500+ container storage.',
    icon: TruckIcon,
    year: '1999',
  },
  {
    href: '/services/air-cargo',
    title: 'Air Cargo Services',
    description:
      'Full-service air freight at O\'Hare and Rockford airports with TSA-approved operations, SIDA-badged drivers, and same-day recovery.',
    icon: PaperAirplaneIcon,
    year: '1999',
  },
]

function Certifications() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-40">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            Trusted certifications and industry partnerships since 1999
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {certifications.map(([cert, logo]) => (
              <li key={cert}>
                <FadeIn>
                  <Image src={logo} alt={cert} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function CoreServices() {
  return (
    <>
      <SectionIntro
        title="Comprehensive logistics solutions for your supply chain"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          From our 280,000 sq ft bonded warehouse to nationwide freight services,
          CR Express delivers integrated logistics solutions that keep your business moving.
          Strategically located less than 5 miles from O'Hare Airport with access to 21 major railyards.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="flex justify-end">
          <Link
            href="/services"
            className="inline-flex items-center gap-x-2 rounded-full bg-neutral-950 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Explore Our Services
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
        <FadeInStagger className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {services.map((service) => (
            <FadeIn key={service.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={service.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <IconWithCircle icon={service.icon} />
                  </Link>
                </h3>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {service.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {service.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function WhyChooseUs() {
  return (
    <>
      <SectionIntro
        eyebrow="Why CR Express"
        title="Built by truck drivers, trusted by industry leaders"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Since 1999, we've grown from a small trucking operation to a comprehensive
          logistics provider serving automotive, pharmaceutical, retail, and manufacturing
          industries across North America. Our founder-driven values ensure every shipment
          gets the attention it deserves.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-135 flex-none lg:w-180">
              <div className="group">
                <StylizedImage
                  src={imageLaptop}
                  sizes="(min-width: 1024px) 41rem, 31rem"
                  className="justify-center lg:justify-end grayscale transition duration-500 group-hover:grayscale-0"
                />
              </div>
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-132 lg:pl-4">
            <ListItem title="Bonded warehouse services">
              280,000 sq ft CBW Class 3 certified facility with duty-free storage
              up to 5 years. Complete customs compliance, GDP compliant for
              pharmaceuticals, and strategically located less than 5 miles from
              O'Hare International Airport.
            </ListItem>
            <ListItem title="Intermodal drayage">
              Private chassis fleet serving 21 major Chicagoland railyards with
              7-day operations. Tri-axle capacity for heavy containers, 500+
              container storage, and TSA-approved bonded drivers for secure
              transportation.
            </ListItem>
            <ListItem title="Air cargo operations">
              Full-service air freight at O'Hare and Rockford airports. SIDA-badged
              drivers, plane-side pickups, CFS operations, and same-day recovery
              services. Complete import/export documentation and screening capabilities.
            </ListItem>
            <ListItem title="Nationwide freight">
              Top 1-2% U.S. carrier with coverage across all 48 continental states.
              Full truckload (FTL) and less-than-truckload (LTL) services with
              real-time GPS tracking, dedicated trucking, and expedited freight options.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  title: 'CR Express Inc - Professional Logistics & Warehousing Services',
  description:
    'Leading Chicago logistics company providing bonded warehouse services, air cargo, intermodal drayage, and nationwide freight. CBW Class 3 certified, 26+ years experience, <5 miles from O\'Hare.',
}

export default function Home() {
  return (
    <RootLayout>
      {/* Hero section with background video on desktop only */}
      <div className="relative min-h-[600px] lg:min-h-[700px] lg:w-screen lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw]">
        {/* Background video - desktop only, full viewport width and height */}
        <div className="absolute inset-0 -top-32 -z-20 hidden lg:block overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-[calc(100%+8rem)] w-full object-cover"
          >
            <source src="/videos/hero-background-video.webm" type="video/webm" />
          </video>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 -top-32 h-[calc(100%+8rem)] bg-white/80" />
        </div>
        {/* White background to cover video after hero section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent hidden lg:block z-10" />

        <Container className="relative pt-24 sm:pt-32 md:pt-56 pb-24">
          <FadeIn className="max-w-3xl">
            <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
              Your trusted partner in logistics excellence
            </h1>
            <p className="mt-6 text-xl text-neutral-600">
              Professional freight, warehousing, and supply chain solutions serving
              Chicago and beyond since 1999. Founded by truck drivers who understand
              your business from the ground up.
            </p>
          </FadeIn>
        </Container>
      </div>

      {/* White background for content below hero */}
      <div className="relative bg-white">
        <Certifications />

        <CoreServices />

        <Testimonial
          className="mt-24 sm:mt-32 lg:mt-40"
          client={{ name: 'Phobia', logo: logoPhobiaDark }}
        >
          CR Express has been our go-to logistics partner for over 10 years. Their
          bonded warehouse services and customs expertise have streamlined our
          international operations, saving us both time and money. The team's
          responsiveness and attention to detail is unmatched.
        </Testimonial>

        <SectorsWeServe />

        <WhyChooseUs />

        <VideoSection />

        <FAQSection />

        <ContactSection />
      </div>
    </RootLayout>
  )
}
