'use client'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { TagList, TagListItem } from '@/components/TagList'
import type { DrayageCityData } from '@/lib/drayage-city-data'
import { DrayageQuoteForm } from './DrayageQuoteForm'

interface DrayageLocationHeroProps {
  city: DrayageCityData
}

export function DrayageLocationHero({ city }: DrayageLocationHeroProps) {
  return (
    <div className="relative min-h-[700px] lg:w-screen lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw]">
      {/* Background video - same as homepage and bonded warehouse pages */}
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
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-20">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7">
            <FadeIn>
              <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-6xl">
                {city.name} Drayage Services | Intermodal Rail Container Transport
              </h1>
              <p className="mt-6 text-xl text-neutral-600">
                Professional intermodal drayage services in {city.name}, {city.stateAbbr}.
                Same-day rail pickup, 7-day operation, privately-owned chassis fleet serving all major Chicagoland railyards.
              </p>

              {/* Key Benefits Tags */}
              <div className="mt-8">
                <TagList>
                  <TagListItem>Private Chassis Fleet</TagListItem>
                  <TagListItem>7-Day Operation</TagListItem>
                  <TagListItem>500+ Container Storage</TagListItem>
                  <TagListItem>Same-Day Pickup</TagListItem>
                </TagList>
              </div>

              {/* Stats Bar */}
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="border-l-2 border-neutral-950 pl-4">
                  <div className="text-xs font-medium uppercase tracking-wide text-neutral-600">Nearest Railyard</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-950">{city.nearestRailyard}</div>
                  <div className="text-sm text-neutral-600">{city.railyardDistance} miles away</div>
                </div>
                <div className="border-l-2 border-neutral-950 pl-4">
                  <div className="text-xs font-medium uppercase tracking-wide text-neutral-600">Experience</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-950">26+ Years</div>
                  <div className="text-sm text-neutral-600">Established 1999</div>
                </div>
                <div className="border-l-2 border-neutral-950 pl-4">
                  <div className="text-xs font-medium uppercase tracking-wide text-neutral-600">From {city.name}</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-950">{city.distance === 0 ? 'Headquartered' : `${city.distance} Miles`}</div>
                  <div className="text-sm text-neutral-600">
                    {city.distance === 0 ? 'In Elk Grove Village' : `${city.drivingTime} min drive`}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Quote Form */}
          <div className="mt-12 lg:col-span-5 lg:mt-0">
            <FadeIn>
              <DrayageQuoteForm
                cityName={city.name}
              />
            </FadeIn>
          </div>
        </div>
      </Container>
    </div>
  )
}
