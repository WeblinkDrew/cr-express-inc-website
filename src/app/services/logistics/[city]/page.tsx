import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RootLayout } from '@/components/RootLayout'
import { LogisticsLocationHero } from '@/components/logistics/LogisticsLocationHero'
import {
  CertificationsBar,
  ServicesOverviewGrid,
  WhyChooseUsSection,
  GeographicAdvantageSection,
  IndustriesWeServe,
  LocalEconomicData,
  LocalChallengesSection,
  LogisticsFAQSection,
  NearbyLogisticsLocations,
  LogisticsQuoteFormSection,
  FinalCTASection,
  LogisticsBreadcrumb,
} from '@/components/logistics/LogisticsLocationComponents'
import {
  getLogisticsCityBySlug,
  getAllLogisticsCitySlugs,
  getNearbyLogisticsCities,
} from '@/lib/logistics-city-data'

// Generate static params for all cities at build time
export async function generateStaticParams() {
  const citySlugs = getAllLogisticsCitySlugs()

  return citySlugs.map((slug) => ({
    city: slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getLogisticsCityBySlug(citySlug)

  if (!city) {
    return {
      title: 'City Not Found',
    }
  }

  return {
    title: city.seoTitle,
    description: city.seoDescription,
    keywords: city.targetKeywords.join(', '),
    openGraph: {
      title: city.seoTitle,
      description: city.seoDescription,
      url: `https://crexpressinc.com/services/logistics/${city.slug}`,
      siteName: 'CR Express Inc',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: city.seoTitle,
      description: city.seoDescription,
    },
    alternates: {
      canonical: `https://crexpressinc.com/services/logistics/${city.slug}`,
    },
  }
}

export default async function LogisticsCityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: citySlug } = await params
  const city = getLogisticsCityBySlug(citySlug)

  if (!city) {
    notFound()
  }

  // Get nearby cities for internal linking
  const nearbyCities = getNearbyLogisticsCities(city.slug, 8)

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://crexpressinc.com/services/logistics/${city.slug}#business`,
    name: `CR Express Inc - Logistics Services ${city.name}`,
    description: `Professional logistics and freight transportation services for businesses in ${city.name}, Illinois. Trucking, warehousing, drayage, and air cargo.`,
    url: `https://crexpressinc.com/services/logistics/${city.slug}`,
    telephone: '+12244029537',
    email: 'info@crexpressinc.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2400 Arthur Ave',
      addressLocality: 'Elk Grove Village',
      addressRegion: 'IL',
      postalCode: '60007',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '42.0072',
      longitude: '-87.9706',
    },
    areaServed: {
      '@type': 'City',
      name: `${city.name}, Illinois`,
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: city.latitude,
        longitude: city.longitude,
      },
      geoRadius: '50 mi',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '07:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/crexpressinc',
      'https://www.linkedin.com/company/cr-express-inc',
    ],
  }

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://crexpressinc.com/services/logistics/${city.slug}#service`,
    name: `Logistics Services in ${city.name}, Illinois`,
    description: `Professional logistics and freight transportation services for businesses in ${city.name}, Illinois. Full truckload, LTL, warehousing, drayage, and air cargo services.`,
    url: `https://crexpressinc.com/services/logistics/${city.slug}`,
    serviceType: 'Logistics Services',
    provider: {
      '@type': 'LocalBusiness',
      '@id': `https://crexpressinc.com/services/logistics/${city.slug}#business`,
      name: 'CR Express Inc',
      telephone: '+12244029537',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2400 Arthur Ave',
        addressLocality: 'Elk Grove Village',
        addressRegion: 'IL',
        postalCode: '60007',
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'City',
      name: `${city.name}, Illinois`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Logistics Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Freight Trucking',
            description: 'Full truckload and LTL freight transportation services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Warehousing',
            description: 'Bonded warehouse storage and inventory management',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Drayage Services',
            description: 'Intermodal container drayage from rail yards',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Local Pickup & Delivery',
            description: 'Same-day and next-day local delivery services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Air Cargo Services',
            description: 'TSA-approved air cargo handling at O\'Hare Airport',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cross-Docking',
            description: 'Efficient cross-dock operations for rapid distribution',
          },
        },
      ],
    },
  }

  return (
    <RootLayout>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Geo meta tags for local SEO */}
      <meta name="geo.region" content="US-IL" />
      <meta name="geo.placename" content={`${city.name}, Illinois`} />
      <meta name="geo.position" content={`${city.latitude};${city.longitude}`} />
      <meta name="ICBM" content={`${city.latitude}, ${city.longitude}`} />

      {/* Hero Section with Video Background */}
      <LogisticsLocationHero city={city} />

      {/* White background for content below hero */}
      <div className="relative bg-white">
        {/* Breadcrumb Navigation */}
        <LogisticsBreadcrumb city={city} />

        {/* Certifications Bar */}
        <CertificationsBar />

        {/* City Introduction */}
        <div className="mx-auto mt-16 max-w-4xl px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-neutral-600">
            {city.cityIntro}
          </p>
        </div>

        {/* Services Overview Grid */}
        <ServicesOverviewGrid city={city} />

        {/* Why Choose Us Section */}
        <WhyChooseUsSection city={city} />

        {/* Geographic Advantage Section */}
        <GeographicAdvantageSection city={city} />

        {/* Industries We Serve */}
        <IndustriesWeServe city={city} />

        {/* Local Economic Data */}
        <LocalEconomicData city={city} />

        {/* Local Challenges Section */}
        <LocalChallengesSection city={city} />

        {/* Quote Form Section */}
        <LogisticsQuoteFormSection city={city} />

        {/* FAQ Section */}
        <LogisticsFAQSection city={city} />

        {/* Nearby Locations */}
        <NearbyLogisticsLocations currentCity={city} nearbyCities={nearbyCities} />

        {/* Final CTA */}
        <FinalCTASection city={city} />

        {/* Bottom spacing */}
        <div className="pb-24" />
      </div>
    </RootLayout>
  )
}
