import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RootLayout } from '@/components/RootLayout'
import { ContactSection } from '@/components/ContactSection'
import { RelatedServices } from '@/components/RelatedServices'
import { DrayageLocationHero } from '@/components/drayage/DrayageLocationHero'
import {
  DrayageServiceOverview,
  WhyChooseCRExpressDrayage,
  DrayageCapabilities,
  IndustryExpertise,
  LocalContext,
  RailyardProximity,
  HowItWorks,
  DrayageFAQ,
  NearbyDrayageLocations,
} from '@/components/drayage/DrayageLocationComponents'
import {
  getDrayageCityBySlug,
  getAllDrayageCitySlugs,
} from '@/lib/drayage-city-data'

// Generate static params for all drayage cities
export async function generateStaticParams() {
  const slugs = getAllDrayageCitySlugs()
  return slugs.map((slug) => ({
    city: slug,
  }))
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getDrayageCityBySlug(citySlug)

  if (!city) {
    return {
      title: 'City Not Found',
      description: 'The requested drayage location page could not be found.',
    }
  }

  return {
    title: city.seoTitle,
    description: city.seoDescription,
    keywords: city.targetKeywords.join(', '),
    openGraph: {
      title: city.seoTitle,
      description: city.seoDescription,
      type: 'website',
      url: `https://www.crexpressinc.com/services/drayage/${city.slug}`,
      siteName: 'CR Express',
    },
    twitter: {
      card: 'summary_large_image',
      title: city.seoTitle,
      description: city.seoDescription,
    },
    alternates: {
      canonical: `https://www.crexpressinc.com/services/drayage/${city.slug}`,
    },
    // Geo meta tags for local SEO
    other: {
      'geo.region': `US-${city.stateAbbr}`,
      'geo.placename': `${city.name}, ${city.stateAbbr}`,
      'geo.position': '42.0039;-87.9704', // Elk Grove Village coordinates
      'ICBM': '42.0039, -87.9704',
    },
  }
}

// LocalBusiness Schema Component
function DrayageLocationSchema({ city }: { city: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://www.crexpressinc.com/services/drayage/${city.slug}`,
    name: 'CR Express',
    description: `Professional intermodal drayage services in ${city.name}, ${city.stateAbbr}. Same-day rail pickup, 7-day operation, privately-owned chassis.`,
    url: `https://www.crexpressinc.com/services/drayage/${city.slug}`,
    telephone: '+12244029537',
    email: 'aamro@crexpressinc.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2400 Arthur Avenue',
      addressLocality: 'Elk Grove Village',
      addressRegion: 'IL',
      postalCode: '60007',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '42.0039',
      longitude: '-87.9704',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      '@id': `https://www.wikidata.org/wiki/Q${city.name === 'Chicago' ? '1297' : ''}`, // Wikidata IDs can be added for each city
    },
    serviceType: 'Intermodal Drayage Services',
    priceRange: '$$',
    openingHours: 'Mo-Su',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Drayage Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Intermodal Rail Drayage',
            description: 'Container pickup and delivery from all major Chicagoland railyards',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Container Storage',
            description: '500+ container parking spots with flexible terms',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tri-Axle Overweight Drayage',
            description: 'Specialized chassis for heavy containers up to 44,000 lbs cargo weight',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQPage Schema Component
function DrayageFAQSchema({ city }: { city: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How does drayage work in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Drayage is the short-distance transportation of containers from railyards to your ${city.name} facility or our warehouse. When your container arrives at a Chicagoland rail terminal, we pick it up with our private chassis fleet and deliver it to your destination. We serve all major railyards (BNSF, CN, NS, CP) with same-day or next-day pickup depending on container availability.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is intermodal drayage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Intermodal drayage specifically refers to moving shipping containers between rail terminals and final destinations. "Intermodal" means the cargo stays in the same container while being transferred between different transportation modes (ship to rail, then rail to truck). This is the most common type of drayage in Chicago\'s logistics network.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fast can you pick up from the railyard?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer same-day pickup when containers are released and available before noon. Next-day pickup is standard for later releases. Our 7-day operation means weekend and holiday pickups are available, unlike competitors who only operate Monday-Friday. For urgent shipments, expedited service can retrieve containers within hours of availability.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you have chassis available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Unlike most drayage companies that rely on shared "grey pool" chassis, we own our fleet of 20\', 40\', and 45\' chassis plus tri-axles. This eliminates the common "no chassis available" problem that causes costly delays. Our equipment is always ready when you need it, with no surprise chassis usage fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you handle overweight containers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Our tri-axle chassis handle containers up to 44,000 lbs cargo weight (67,200 lbs gross including container and chassis). We have experienced drivers trained in overweight permitting, legal routing, and compliant transport. We regularly move heavy machinery, steel coils, and industrial equipment that exceed standard weight limits.',
        },
      },
      {
        '@type': 'Question',
        name: `Can you deliver to ${city.name} on weekends?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. CR Express operates 7 days a week including weekends and most holidays. We can pick up from railyards and deliver to your ${city.name} location on Saturdays and Sundays. This is critical for avoiding demurrage charges when containers are released on Fridays or over holiday weekends.`,
        },
      },
      {
        '@type': 'Question',
        name: `What industries do you serve in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `We serve diverse industries including automotive manufacturing, pharmaceuticals and healthcare, technology and electronics, consumer goods and e-commerce, food processing, and industrial equipment. Our TSA-approved drivers and specialized equipment handle everything from temperature-sensitive pharmaceuticals to heavy machinery components. Each industry has unique requirements, and our 26 years of experience ensures we understand your specific needs.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How do I track my container during drayage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `All shipments include real-time GPS tracking through our customer portal. You receive automatic notifications at key milestones: when the container is picked up from the railyard, when it's in transit, and estimated arrival time updates. Our dispatch team is available 24/7 via phone or email for status updates and can provide exact location information at any time.`,
        },
      },
      {
        '@type': 'Question',
        name: `What are your delivery hours in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `We accommodate your receiving schedule. Standard deliveries occur Monday through Friday, 7 AM to 5 PM. Weekend deliveries are available for an additional fee. We can also coordinate early morning (before 7 AM) or evening (after 5 PM) deliveries if your facility has extended receiving hours. Appointments are scheduled based on your preference to ensure smooth coordination with your warehouse team.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer temperature-controlled or specialized drayage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. We handle reefer (refrigerated) containers, hazmat shipments (with proper documentation and certifications), overweight and oversized loads, flatracks and open-top containers, and high-value cargo requiring additional security. Our drivers are trained and certified for specialized cargo handling, and we maintain the appropriate insurance coverage for all shipment types.`,
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Main Page Component
export default async function DrayageCityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: citySlug } = await params
  const city = getDrayageCityBySlug(citySlug)

  // Return 404 if city not found
  if (!city) {
    notFound()
  }

  return (
    <RootLayout>
      {/* Schema Markup */}
      <DrayageLocationSchema city={city} />
      <DrayageFAQSchema city={city} />

      {/* Hero Section with Form on Right */}
      <DrayageLocationHero city={city} />

      {/* Service Overview */}
      <DrayageServiceOverview city={city} />

      {/* Why Choose CR Express */}
      <WhyChooseCRExpressDrayage city={city} />

      {/* Drayage Capabilities */}
      <DrayageCapabilities city={city} />

      {/* Industry-Specific Expertise */}
      <IndustryExpertise city={city} />

      {/* Local Context Section (with city-specific data and image placeholder) */}
      <LocalContext city={city} />

      {/* Railyard Proximity */}
      <RailyardProximity city={city} />

      {/* How It Works Process */}
      <HowItWorks city={city} />

      {/* FAQ Section (Expanded to 10 questions) */}
      <DrayageFAQ city={city} />

      {/* Related Services */}
      <RelatedServices currentService="/services/drayage" />

      {/* Nearby Drayage Locations */}
      <NearbyDrayageLocations currentCitySlug={city.slug} />

      {/* Contact CTA */}
      <ContactSection />
    </RootLayout>
  )
}
