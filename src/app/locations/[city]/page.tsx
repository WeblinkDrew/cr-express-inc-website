import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RootLayout } from '@/components/RootLayout'
import { LocationHero } from '@/components/locations/LocationHero'
import { Breadcrumb } from '@/components/locations/Breadcrumb'
import {
  TrustSection,
  StrategicLocation,
  BondedWarehouseTestimonials,
  KeyIndustries,
  MarketIntelligenceSummary,
  EconomicIndicators,
  LiveMarketData,
  BusinessStrategy,
  FAQAccordion,
  NearbyLocations,
} from '@/components/locations/LocationComponents'
import { LocationQuoteForm } from '@/components/locations/LocationQuoteForm'
import { VideoSection } from '@/components/VideoSection'
import { getCityBySlug, getAllCitySlugs, getNearbyCities } from '@/lib/location-data'
import { getEconomicData } from '@/lib/economic-data'

// Generate static params for all 26 cities at build time
export async function generateStaticParams() {
  const citySlugs = getAllCitySlugs()

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
  const city = getCityBySlug(citySlug)

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
      url: `https://crexpressinc.com/locations/${city.slug}`,
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
      canonical: `https://crexpressinc.com/locations/${city.slug}`,
    },
  }
}

export default async function CityLocationPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    notFound()
  }

  // Fetch economic data for this city
  const economicData = await getEconomicData(city.name)

  // Get nearby cities for internal linking
  const nearbyCities = getNearbyCities(city.slug, 8)

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `CR Express Inc - Bonded Warehouse Services ${city.name}`,
    description: `Professional CBW Class 3 bonded warehouse services for businesses in ${city.name}, Illinois. Customs compliance, duty-free storage, and logistics solutions.`,
    url: `https://crexpressinc.com/locations/${city.slug}`,
    telephone: '+12244029537',
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
      latitude: '42.0417',
      longitude: '-87.9873',
    },
    areaServed: {
      '@type': 'City',
      name: `${city.name}, Illinois`,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/crexpressinc',
      'https://www.linkedin.com/company/cr-express-inc',
    ],
  }

  return (
    <RootLayout>
      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Geo meta tags for local SEO */}
      <meta name="geo.region" content="US-IL" />
      <meta name="geo.placename" content={`${city.name}, Illinois`} />
      <meta name="geo.position" content="42.0417;-87.9873" />
      <meta name="ICBM" content="42.0417, -87.9873" />

      {/* Hero Section with Video Background */}
      <LocationHero city={city} />

      {/* White background for content below hero */}
      <div className="relative bg-white">
        {/* Breadcrumb Navigation */}
        <Breadcrumb city={city} />

        {/* Video Section */}
        <VideoSection />

        {/* Why Trust Us Section */}
        <TrustSection city={city} />

        {/* Strategic Location */}
        <StrategicLocation city={city} />

        {/* Client Testimonials */}
        <BondedWarehouseTestimonials city={city} />

        {/* Key Industries */}
        <KeyIndustries city={city} />

        {/* Market Intelligence Summary */}
        <MarketIntelligenceSummary city={city} />

        {/* Economic Data Section with Dataset Schema */}
        <EconomicIndicators city={city} economicData={economicData} />

        {/* Live Market Data */}
        <LiveMarketData city={city} economicData={economicData} />

        {/* Business Strategy Section */}
        <BusinessStrategy city={city} />

        {/* FAQ Section with FAQPage Schema */}
        <FAQAccordion city={city} />

        {/* Quote Form */}
        <LocationQuoteForm city={city} />

        {/* Nearby Locations Internal Linking */}
        <NearbyLocations currentCity={city} nearbyCities={nearbyCities} />
      </div>
    </RootLayout>
  )
}