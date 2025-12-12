import Link from 'next/link'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import type { LogisticsCityData } from '@/lib/logistics-city-data'

interface LogisticsLocationHeroProps {
  city: LogisticsCityData
}

export function LogisticsLocationHero({ city }: LogisticsLocationHeroProps) {
  return (
    <div className="relative min-h-[700px] lg:w-screen lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw]">
      {/* Background video - same as homepage */}
      <div className="absolute inset-0 -top-32 -z-20 overflow-hidden">
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
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />

      <Container className="relative pt-24 sm:pt-32 md:pt-56 pb-24">
        <FadeIn className="max-w-4xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            Logistics Services in {city.name}, {city.stateAbbr}
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Professional logistics and freight transportation services for businesses in {city.name}, {city.state}.
            Only {city.distanceFromHQ} miles from our 227,000 sq ft facility—{city.driveTimeMinutes} minute response time
            with access to O&apos;Hare air cargo, all major railyards, and nationwide trucking coverage.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-8 py-4 text-lg font-semibold text-white transition hover:bg-neutral-800"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:+12244029537"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-neutral-950 ring-1 ring-inset ring-neutral-950/10 transition hover:bg-neutral-950 hover:text-white"
            >
              Call (224) 402-9537
            </a>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-4">
            <div className="border-l-2 border-neutral-950 pl-4">
              <div className="text-xs font-medium uppercase tracking-wide text-neutral-600">Experience</div>
              <div className="mt-1 text-xl font-semibold text-neutral-950">26+ Years</div>
            </div>
            <div className="border-l-2 border-neutral-950 pl-4">
              <div className="text-xs font-medium uppercase tracking-wide text-neutral-600">Facility Size</div>
              <div className="mt-1 text-xl font-semibold text-neutral-950">227,000 sq ft</div>
            </div>
            <div className="border-l-2 border-neutral-950 pl-4">
              <div className="text-xs font-medium uppercase tracking-wide text-neutral-600">From {city.name}</div>
              <div className="mt-1 text-xl font-semibold text-neutral-950">{city.distanceFromHQ} Miles</div>
            </div>
            <div className="border-l-2 border-neutral-950 pl-4">
              <div className="text-xs font-medium uppercase tracking-wide text-neutral-600">Response Time</div>
              <div className="mt-1 text-xl font-semibold text-neutral-950">{city.driveTimeMinutes} Min</div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}
