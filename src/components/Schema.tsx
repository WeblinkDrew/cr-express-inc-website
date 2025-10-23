import React from 'react'

interface SchemaProps {
  schema: object
}

export function Schema({ schema }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CR Express, Inc.',
    alternateName: 'CR Express',
    url: 'https://www.crexpressinc.com',
    logo: 'https://www.crexpressinc.com/logo.png',
    description:
      'CR Express offers integrated supply chain solutions including warehousing, distribution, freight management, and customs compliance. Our technology platforms enable seamless logistics operations across the United States.',
    foundingDate: '1999',
    telephone: '+1-847-354-7979',
    email: 'quotes@crexpressinc.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-847-354-7979',
        contactType: 'Operations',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-224-402-9537',
        contactType: 'Sales',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        email: 'quotes@crexpressinc.com',
        contactType: 'Customer Service',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
    ],
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
      latitude: 41.9842,
      longitude: -87.9806,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'State',
        name: 'Illinois',
      },
      {
        '@type': 'State',
        name: 'Wisconsin',
      },
      {
        '@type': 'State',
        name: 'Michigan',
      },
      {
        '@type': 'State',
        name: 'Indiana',
      },
      {
        '@type': 'State',
        name: 'Ohio',
      },
      {
        '@type': 'State',
        name: 'Kentucky',
      },
      {
        '@type': 'State',
        name: 'Tennessee',
      },
      {
        '@type': 'State',
        name: 'Missouri',
      },
      {
        '@type': 'State',
        name: 'Iowa',
      },
      {
        '@type': 'State',
        name: 'Georgia',
      },
      {
        '@type': 'State',
        name: 'Florida',
      },
      {
        '@type': 'State',
        name: 'Texas',
      },
      {
        '@type': 'State',
        name: 'North Carolina',
      },
      {
        '@type': 'State',
        name: 'South Carolina',
      },
      {
        '@type': 'State',
        name: 'Mississippi',
      },
      {
        '@type': 'State',
        name: 'Pennsylvania',
      },
    ],
    sameAs: [
      'https://share.google/AraWPxeRmRrVTai7i',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      reviewCount: '20',
    },
  }

  return <Schema schema={schema} />
}

// LocalBusiness Schema
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.crexpressinc.com',
    name: 'CR Express, Inc.',
    image: 'https://www.crexpressinc.com/logo.png',
    description:
      'CR Express (Est. 1999) is a trusted name in the trucking and logistics industry, specializing in full-service logistics services including but not limited to: Airport Transfers (TSA/Bonded), Local Pickups & Deliveries, Over the Road Truckloads (OTR), Container Drayage, and Warehousing (Customs Bonded).',
    telephone: '+1-847-354-7979',
    email: 'info@crexpressinc.com',
    url: 'https://www.crexpressinc.com',
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
      latitude: 41.9842,
      longitude: -87.9806,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      reviewCount: '20',
    },
    sameAs: [
      'https://share.google/AraWPxeRmRrVTai7i',
    ],
  }

  return <Schema schema={schema} />
}

// Service Schema - Intermodal Drayage
export function IntermodalDrayageServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Intermodal Drayage',
    provider: {
      '@type': 'Organization',
      name: 'CR Express, Inc.',
      telephone: '+1-847-354-7979',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2400 Arthur Ave',
        addressLocality: 'Elk Grove Village',
        addressRegion: 'IL',
        postalCode: '60007',
        addressCountry: 'US',
      },
    },
    description:
      'Professional intermodal container drayage services with privately-owned chassis fleet. 7 days per week railyard pickup capabilities serving 300+ cities nationwide.',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Intermodal Drayage Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Container Drayage',
            description: '20ft, 40ft, and 45ft container drayage with private chassis fleet',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Railyard Pickup',
            description: '7 days per week pickup from major Chicagoland railyards',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Container Storage',
            description: 'Over 500 container parking spots in Chicagoland area',
          },
        },
      ],
    },
  }

  return <Schema schema={schema} />
}

// Service Schema - Air Cargo
export function AirCargoServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Air Cargo Services',
    provider: {
      '@type': 'Organization',
      name: 'CR Express, Inc.',
      telephone: '+1-847-354-7979',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2400 Arthur Ave',
        addressLocality: 'Elk Grove Village',
        addressRegion: 'IL',
        postalCode: '60007',
        addressCountry: 'US',
      },
    },
    description:
      'TSA-approved air cargo services at ORD and RFD airports. SIDA-badged drivers for secure airport operations, same-day recovery, and 24/7 tracking.',
    areaServed: {
      '@type': 'Place',
      name: 'Chicago, IL',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Air Cargo Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Air Import',
            description: 'CFS pickups, plane-side recoveries, and same-day cargo recovery',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Air Export',
            description: 'Screened cargo deliveries to ORD/RFD with TSA-approved drivers',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'ULD Handling',
            description: 'Specialized equipment for Unit Load Device transfers',
          },
        },
      ],
    },
  }

  return <Schema schema={schema} />
}

// Service Schema - Warehousing
export function WarehousingServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Bonded Warehouse',
    provider: {
      '@type': 'Organization',
      name: 'CR Express, Inc.',
      telephone: '+1-847-354-7979',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2400 Arthur Ave',
        addressLocality: 'Elk Grove Village',
        addressRegion: 'IL',
        postalCode: '60007',
        addressCountry: 'US',
      },
    },
    description:
      'Customs Bonded Warehouse (CBW Class 3) with 280,000 square feet of flexible storage. Container transloading, cross-docking, and 7 days per week operations.',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Warehousing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bonded Warehouse',
            description: 'CBW Class 3 bonded warehouse for duty-free storage up to 5 years',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Container Transloading',
            description: 'Floor-loaded and palletized container devanning capabilities',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cross Docking',
            description: 'Freight consolidation and cross-docking services',
          },
        },
      ],
    },
  }

  return <Schema schema={schema} />
}

// Service Schema - Over the Road
export function OTRServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Freight Trucking',
    provider: {
      '@type': 'Organization',
      name: 'CR Express, Inc.',
      telephone: '+1-847-354-7979',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2400 Arthur Ave',
        addressLocality: 'Elk Grove Village',
        addressRegion: 'IL',
        postalCode: '60007',
        addressCountry: 'US',
      },
    },
    description:
      'Nationwide FTL and LTL freight shipping to all 48 U.S. states. Top 1-2% U.S. fleet with real-time GPS tracking and flexible equipment options.',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Over the Road Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full Truckload (FTL)',
            description: 'Nationwide full truckload freight to 48 U.S. states',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Less Than Truckload (LTL)',
            description: 'LTL freight shipping with consolidation services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Specialized Equipment',
            description: 'Dry van, reefer, flatbed, roller bed, straight truck, and sprinter options',
          },
        },
      ],
    },
  }

  return <Schema schema={schema} />
}

// Service Schema - Local Pickup & Delivery
export function LocalPDServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Local Delivery Service',
    provider: {
      '@type': 'Organization',
      name: 'CR Express, Inc.',
      telephone: '+1-847-354-7979',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2400 Arthur Ave',
        addressLocality: 'Elk Grove Village',
        addressRegion: 'IL',
        postalCode: '60007',
        addressCountry: 'US',
      },
    },
    description:
      'Local pickup and delivery services covering 200+ zip codes within 60-mile radius of Chicago. Same-day and next-day delivery with POD and time stamps.',
    areaServed: {
      '@type': 'Place',
      name: 'Chicago Metropolitan Area',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Local Pickup & Delivery Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Same-Day Delivery',
            description: 'Fast same-day delivery within Chicago area',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Next-Day Delivery',
            description: 'Reliable next-day delivery with proof of delivery',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Local LTL',
            description: 'Local less than truckload consolidation and delivery',
          },
        },
      ],
    },
  }

  return <Schema schema={schema} />
}

// WebSite Schema for enhanced search features and sitelinks
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CR Express, Inc.',
    alternateName: 'CR Express',
    url: 'https://www.crexpressinc.com',
    description: 'Full-Service Logistics, Drayage - Bonded Storage',
    publisher: {
      '@type': 'Organization',
      name: 'CR Express, Inc.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.crexpressinc.com/logo.png',
      },
    },
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://www.crexpressinc.com/#organization',
    },
  }

  return <Schema schema={schema} />
}
