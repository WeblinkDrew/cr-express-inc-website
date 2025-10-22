import Link from 'next/link'
import { BuildingStorefrontIcon, TruckIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Border } from '@/components/Border'

interface Service {
  href: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const allServices: Service[] = [
  {
    href: '/services/warehousing',
    name: 'Bonded Warehouse',
    description: 'CBW Class 3 certified facility with duty-free storage up to 5 years. 227,000 sq ft of secure, compliant warehousing.',
    icon: BuildingStorefrontIcon,
  },
  {
    href: '/services/air-cargo',
    name: 'Air Cargo Services',
    description: 'TSA-approved operations at O\'Hare and Rockford with SIDA-badged drivers and same-day recovery.',
    icon: PaperAirplaneIcon,
  },
  {
    href: '/services/drayage',
    name: 'Intermodal Drayage',
    description: 'Private chassis fleet serving all major Chicagoland railyards. 7-day operations with 500+ Container Storage Spaces.',
    icon: TruckIcon,
  },
  {
    href: '/services/over-the-road',
    name: 'Over the Road Freight',
    description: 'Top 1-2% U.S. carrier with 98%+ on-time delivery. FTL and LTL service to all 48 states.',
    icon: TruckIcon,
  },
  {
    href: '/services/local-pd',
    name: 'Local Pickup & Delivery',
    description: 'Same-day and next-day delivery throughout Chicago metro. 200+ zip codes with time-critical capabilities.',
    icon: TruckIcon,
  },
]

export function RelatedServices({ currentService }: { currentService: string }) {
  // Filter out the current service
  const otherServices = allServices.filter((service) => service.href !== currentService)

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
          Explore Our Other Services
        </h2>
        <p className="mt-6 text-xl text-neutral-600">
          Comprehensive logistics solutions to optimize your entire supply chain
        </p>
      </FadeIn>

      <FadeInStagger className="mt-16" faster>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {otherServices.map((service) => (
            <FadeIn key={service.href}>
              <Border className="group relative flex flex-col overflow-hidden rounded-3xl p-8 hover:bg-neutral-50 transition">
                <Link href={service.href} className="absolute inset-0" aria-label={service.name} />
                <div className="flex items-start gap-6">
                  <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-neutral-950">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-neutral-950 group-hover:text-neutral-700 transition">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-base text-neutral-600">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-neutral-950 group-hover:gap-3 transition-all">
                      Learn more
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
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Border>
            </FadeIn>
          ))}
        </div>
      </FadeInStagger>
    </Container>
  )
}
