import Link from 'next/link'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import type { CityData } from '@/lib/location-data'

interface LocationHeroProps {
  city: CityData
}

export function LocationHero({ city }: LocationHeroProps) {
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
            Your #1 Bonded Warehouse Solution in {city.name}
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Professional CBW Class 3 bonded warehouse services for businesses in {city.name}, Illinois.
            Only {city.distance} miles from our 280,000 sq ft facility in Elk Grove Village,
            with customs compliance, duty-free storage up to 5 years, and strategic access to O'Hare Airport.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-8 py-4 text-lg font-semibold text-white transition hover:bg-neutral-800"
            >
              Get Started
            </Link>
            <a
              href="tel:+12244029537"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-neutral-950 ring-1 ring-inset ring-neutral-950/10 transition hover:bg-neutral-950 hover:text-white"
            >
              Call +1 (224) 402-9537
            </a>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="border-l-2 border-neutral-950 pl-4">
              <div className="text-xs font-medium uppercase tracking-wide text-neutral-600">CBW Certified</div>
              <div className="mt-1 text-xl font-semibold text-neutral-950">Class 3</div>
            </div>
            <div className="border-l-2 border-neutral-950 pl-4">
              <div className="text-xs font-medium uppercase tracking-wide text-neutral-600">Experience</div>
              <div className="mt-1 text-xl font-semibold text-neutral-950">26+ Years</div>
            </div>
            <div className="border-l-2 border-neutral-950 pl-4">
              <div className="text-xs font-medium uppercase tracking-wide text-neutral-600">Distance from {city.name}</div>
              <div className="mt-1 text-xl font-semibold text-neutral-950">{city.distance} Miles</div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}
