'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { Border } from '@/components/Border'
import { GridList, GridListItem } from '@/components/GridList'
import type { DrayageCityData } from '@/lib/drayage-city-data'
import { railyards, getNearbyDrayageCities } from '@/lib/drayage-city-data'
import drayageFacilityImage from '@/images/IMG 4255 Media Library.jpg'

// Service Overview Section
interface DrayageServiceOverviewProps {
  city: DrayageCityData
}

export function DrayageServiceOverview({ city }: DrayageServiceOverviewProps) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
          Intermodal Drayage Services in {city.name}
        </h2>
        <div className="mt-6 max-w-full text-base leading-relaxed text-neutral-600">
          <p>
            CR Express provides professional intermodal drayage services for businesses in {city.name}, {city.stateAbbr}.
            Our privately-owned chassis fleet eliminates grey pool shortages, and our strategic location provides
            direct access to all major Chicagoland railyards including BNSF, CN, NS, and CP terminals.
          </p>
          <p className="mt-4">
            With 7-day operations, same-day rail pickup capabilities, and 500+ container parking spots,
            we deliver the reliability and capacity your supply chain demands. From single containers to
            high-volume weekly moves, our asset-based operation ensures equipment is always available when you need it.
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}

// Why Choose Section
export function WhyChooseCRExpressDrayage({ city }: DrayageServiceOverviewProps) {
  const benefits = [
    {
      title: 'Asset-Based Operation',
      description: 'Own trucks, own chassis, own container yard. No dependence on brokers or rental equipment. Our privately-owned chassis fleet eliminates grey pool shortage delays.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      ),
    },
    {
      title: '500+ Container Parking Spaces',
      description: 'Secure container storage at strategic Chicagoland locations. Flexible daily, weekly, or monthly terms for loaded imports, export staging, or empty repositioning.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
    },
    {
      title: '7-Day Operation',
      description: 'Weekend and holiday rail pickups with 24/7 dispatch support. Immediate recovery from demurrage risks and flexibility to match railroad operating schedules.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Proximity to Major Railyards',
      description: `Located within ${city.railyardDistance} miles of ${city.nearestRailyard}. Direct access to BNSF, CN, NS, and CP terminals means faster pickups and cost savings from reduced miles.`,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
    {
      title: 'Tri-Axle Chassis for Overweight Loads',
      description: 'Specialized tri-axle chassis handle containers up to 44,000 lbs cargo weight. Experienced drivers ensure proper permitting and legal routing for heavy machinery, steel, and industrial equipment.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
        </svg>
      ),
    },
    {
      title: 'TSA-Approved & Bonded Drivers',
      description: '26+ years of experience with TSA-approved drivers, bonded trucking, and high-value cargo certifications. Complete security and compliance for regulated and high-value shipments.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <SectionIntro
          title={`Why ${city.name} Shippers Choose CR Express`}
          className="mt-0"
        >
          <p>
            Our privately-owned fleet and strategic location deliver reliability that rental-dependent
            competitors cannot match. When rail congestion hits, our 500+ container parking spots keep
            your cargo moving.
          </p>
        </SectionIntro>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <FadeIn key={benefit.title}>
              <div className="flex h-full min-h-[280px] flex-col rounded-3xl border border-neutral-200 p-8 hover:border-neutral-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white">
                    {benefit.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-neutral-950">
                    {benefit.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {benefit.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </Container>
  )
}

// Drayage Capabilities Section
export function DrayageCapabilities({ city }: DrayageServiceOverviewProps) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        title="Full-Service Drayage Capabilities"
        className="mt-0"
      >
        <p>
          Comprehensive intermodal container transportation serving {city.name} and the greater
          Chicagoland area with privately-owned equipment and 7-day operations.
        </p>
      </SectionIntro>

      <div className="mt-16">
        <GridList>
          <GridListItem title="Intermodal Rail Drayage">
            Container pickup and delivery from all major Chicagoland railyards including BNSF Logistics Park,
            UP Global facilities, CSX Bedford Park, NS Landers, CN Harvey, and CP Bensenville. Same-day and
            next-day pickup available.
          </GridListItem>
          <GridListItem title="Container Drayage & Storage">
            20', 40', and 45' container handling with same-day rail pickup when available. 500+ secure container
            parking spots with flexible storage terms. OS&D documentation and damage inspection services.
          </GridListItem>
          <GridListItem title="Overweight & Tri-Axle Drayage">
            Specialized tri-axle chassis for containers up to 44,000 lbs cargo weight (67,200 lbs gross).
            Experienced drivers handle proper permitting, legal routing, and compliant transport of heavy machinery,
            steel, and industrial cargo.
          </GridListItem>
          <GridListItem title="Port-to-Rail Inland Port Strategy">
            Avoid coastal port congestion by routing shipments through Chicago's inland port advantage.
            Dual-coast rail connectivity from both West Coast (LA/Long Beach, Oakland) and East Coast (NY/NJ, Savannah)
            ports to Chicago rail terminals.
          </GridListItem>
          <GridListItem title="Drayage + Cross-Docking Integration">
            Seamless integration with our 227,000 sq ft bonded warehouse. Container-to-cross-dock-to-outbound-TL
            in hours, not days. Same-day transloading with sorting, palletizing, and labeling services. Eliminate
            warehouse storage fees.
          </GridListItem>
          <GridListItem title="Specialized Cargo Handling">
            TSA-approved drivers for high-value cargo. GDP compliance for pharmaceutical shipments.
            Hazmat certification for regulated materials. Bonded trucking for customs cargo.
            Temperature monitoring coordination when required.
          </GridListItem>
        </GridList>
      </div>
    </Container>
  )
}

// Railyard Proximity Section
export function RailyardProximity({ city }: DrayageServiceOverviewProps) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <SectionIntro
          title={`Drayage Near ${city.name} Railyards`}
          className="mt-0"
        >
          <p>
            Our Elk Grove Village location provides direct access to all major Chicagoland rail terminals.
            Proximity means faster pickups, lower costs, and better service for your {city.name} operations.
          </p>
        </SectionIntro>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {railyards.map((railyard) => (
            <FadeIn key={railyard.name}>
              <div className="flex h-full min-h-[240px] flex-col rounded-3xl bg-neutral-50 p-8">
                <h3 className="font-display text-xl font-semibold text-neutral-950">
                  {railyard.name}
                </h3>
                <div className="mt-4 flex gap-6">
                  <div>
                    <dt className="text-sm font-semibold text-neutral-600">Distance</dt>
                    <dd className="mt-1 text-2xl font-bold text-neutral-950">{railyard.distance} miles</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-neutral-600">Drive Time</dt>
                    <dd className="mt-1 text-2xl font-bold text-neutral-950">{railyard.driveTime} min</dd>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600">
                  {railyard.description}
                </p>
                {railyard.name === city.nearestRailyard && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Nearest to {city.name}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-neutral-950 p-8 text-white">
          <h4 className="font-display text-xl font-semibold">
            Cost Savings from Proximity
          </h4>
          <p className="mt-4 text-neutral-300">
            Every mile matters in drayage costs. Our central location reduces fuel surcharges,
            minimizes driver hours, and enables faster turnaround times. For {city.name} shippers,
            this proximity translates to lower per-move costs and the ability to accommodate
            last-minute pickup requests.
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}

// Industry-Specific Expertise Section
export function IndustryExpertise({ city }: DrayageServiceOverviewProps) {
  const industries = [
    {
      title: 'Automotive & Manufacturing',
      description: `Specialized drayage for automotive parts, machinery, and manufacturing components serving ${city.name}'s industrial sector. Tri-axle chassis for heavy equipment, just-in-time delivery coordination, and damage-free handling of high-value automotive shipments.`,
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
    },
    {
      title: 'Pharmaceutical & Healthcare',
      description: 'GDP-compliant drayage for pharmaceutical products with temperature monitoring coordination. TSA-approved drivers for high-value medications, sterile handling protocols, and expedited service for time-sensitive healthcare shipments.',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
    },
    {
      title: 'Technology & Electronics',
      description: 'Secure drayage for high-value technology shipments with bonded truck service. Real-time GPS tracking, climate-controlled coordination when needed, and specialized handling for sensitive electronics and telecommunications equipment.',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
        </svg>
      ),
    },
    {
      title: 'Consumer Goods & E-commerce',
      description: `Fast-turnaround drayage for retail and e-commerce shipments serving ${city.name}'s distribution network. Cross-docking capabilities for rapid throughput, weekend service for peak season support, and scalable capacity from single containers to high-volume programs.`,
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <SectionIntro
          title={`Industry-Specific Drayage Expertise in ${city.name}`}
          className="mt-0"
        >
          <p>
            From automotive manufacturing to pharmaceutical distribution, CR Express delivers
            specialized drayage solutions tailored to your industry's unique requirements in {city.name}.
          </p>
        </SectionIntro>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {industries.map((industry) => (
            <FadeIn key={industry.title}>
              <div className="flex h-full min-h-[220px] flex-col rounded-3xl border border-neutral-200 p-8 hover:border-neutral-300 transition-all hover:shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                    {industry.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-neutral-950">
                      {industry.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                      {industry.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </Container>
  )
}

// Local Context Section
export function LocalContext({ city }: DrayageServiceOverviewProps) {
  // City-specific data
  const cityContext = {
    chicago: {
      title: 'Serving Chicago\'s Logistics Hub',
      description: 'As the third-largest city in the United States and a critical junction for transcontinental rail freight, Chicago handles more intermodal containers than any other North American city. The city\'s manufacturing sector, including major automotive and food processing facilities, relies on consistent drayage service.',
      stats: [
        { label: 'Annual Container Volume', value: '4M+', description: 'TEUs through Chicago rail terminals' },
        { label: 'Industrial Employment', value: '280K+', description: 'Manufacturing & logistics jobs' },
        { label: 'Warehouse Space', value: '1.2B sq ft', description: 'In Chicagoland area' },
      ],
      keyIndustries: 'Manufacturing, food processing, distribution, pharmaceuticals, e-commerce fulfillment',
    },
    'elk-grove-village': {
      title: 'Heart of Elk Grove Village\'s Industrial Corridor',
      description: 'Elk Grove Village is home to the largest industrial park in North America, with over 3,600 businesses operating in manufacturing, distribution, and logistics. Our headquarters location provides immediate access to this concentrated industrial activity.',
      stats: [
        { label: 'Business Park Size', value: '#1', description: 'Largest industrial park in North America' },
        { label: 'Local Businesses', value: '3,600+', description: 'Manufacturing & distribution firms' },
        { label: 'Daily Workforce', value: '110K+', description: 'Employees in industrial corridor' },
      ],
      keyIndustries: 'Precision manufacturing, distribution centers, food processing, pharmaceuticals, automotive parts',
    },
    schaumburg: {
      title: 'Supporting Schaumburg\'s Corporate & Retail Hub',
      description: 'Schaumburg serves as a major corporate headquarters location and retail center in the northwest suburbs. The area\'s concentration of Fortune 500 companies and retail distribution facilities creates consistent demand for reliable intermodal drayage.',
      stats: [
        { label: 'Corporate HQs', value: '50+', description: 'Fortune 1000 companies based here' },
        { label: 'Retail Centers', value: '2nd Largest', description: 'In Illinois, after Magnificent Mile' },
        { label: 'Employment', value: '78K+', description: 'Daily workforce population' },
      ],
      keyIndustries: 'Corporate offices, retail distribution, technology, healthcare, insurance',
    },
    'des-plaines': {
      title: 'Des Plaines Manufacturing & Distribution Network',
      description: 'Des Plaines strategic location between O\'Hare Airport and major rail lines makes it a key logistics node. The city\'s manufacturing base and proximity to transportation infrastructure drives steady container volumes.',
      stats: [
        { label: 'Airport Distance', value: '3 miles', description: 'From O\'Hare cargo facilities' },
        { label: 'Manufacturing Base', value: '400+', description: 'Industrial facilities' },
        { label: 'Highway Access', value: 'I-90/I-294', description: 'Direct interstate connectivity' },
      ],
      keyIndustries: 'Manufacturing, distribution, food service, medical devices, industrial equipment',
    },
    'arlington-heights': {
      title: 'Arlington Heights Industrial & Medical Corridor',
      description: 'Arlington Heights combines a strong manufacturing sector with major healthcare facilities and corporate offices. The diverse industrial base requires flexible drayage solutions for everything from medical equipment to manufactured components.',
      stats: [
        { label: 'Medical Facilities', value: 'Major Hub', description: 'Including Northwest Community Hospital' },
        { label: 'Manufacturing Jobs', value: '8,500+', description: 'In advanced manufacturing' },
        { label: 'Population', value: '77K+', description: 'Supporting strong consumer market' },
      ],
      keyIndustries: 'Medical devices, pharmaceuticals, manufacturing, retail distribution, technology',
    },
    rosemont: {
      title: 'Rosemont\'s Entertainment & Convention Hub',
      description: 'Rosemont\'s proximity to O\'Hare Airport and concentration of hotels, convention centers, and entertainment venues creates unique drayage needs for event logistics, hospitality supplies, and retail operations.',
      stats: [
        { label: 'Hotel Rooms', value: '4,000+', description: 'In convention district' },
        { label: 'Airport Distance', value: '2 miles', description: 'From O\'Hare terminals' },
        { label: 'Convention Space', value: '840K sq ft', description: 'Donald E. Stephens Center' },
      ],
      keyIndustries: 'Hospitality, entertainment, convention services, retail, logistics',
    },
    bensenville: {
      title: 'Bensenville Rail & Logistics Center',
      description: 'Bensenville is home to the massive CP Bensenville rail yard, making it a critical node for intermodal drayage. The city\'s industrial base and direct rail access position it as a premier logistics location.',
      stats: [
        { label: 'Railyard Access', value: '2 miles', description: 'To CP Bensenville terminal' },
        { label: 'Industrial Base', value: '600+', description: 'Manufacturing & logistics firms' },
        { label: 'Rail Volume', value: 'High', description: 'Major intermodal gateway' },
      ],
      keyIndustries: 'Rail logistics, manufacturing, distribution, warehousing, industrial services',
    },
    'wood-dale': {
      title: 'Wood Dale Industrial Corridor',
      description: 'Wood Dale\'s industrial parks and manufacturing facilities benefit from exceptional highway access and proximity to both O\'Hare Airport and major rail lines, creating consistent container demand.',
      stats: [
        { label: 'Airport Proximity', value: '4 miles', description: 'From O\'Hare cargo operations' },
        { label: 'Highway Access', value: 'I-355/I-290', description: 'Direct interstate routes' },
        { label: 'Industrial Parks', value: 'Multiple', description: 'Modern warehouse facilities' },
      ],
      keyIndustries: 'Manufacturing, distribution, aviation support, logistics, industrial equipment',
    },
    itasca: {
      title: 'Itasca Corporate & Distribution Hub',
      description: 'Itasca hosts numerous Fortune 500 headquarters and distribution centers, requiring reliable drayage for corporate supply chains, technology equipment, and consumer goods distribution.',
      stats: [
        { label: 'Corporate HQs', value: '30+', description: 'Major company headquarters' },
        { label: 'Business Park', value: 'Hamilton Lakes', description: 'Premium office & logistics' },
        { label: 'Highway Access', value: 'I-290/I-355', description: 'Major corridor connectivity' },
      ],
      keyIndustries: 'Corporate headquarters, distribution, technology, healthcare, manufacturing',
    },
    addison: {
      title: 'Addison Manufacturing & Logistics Network',
      description: 'Addison\'s extensive industrial infrastructure includes major manufacturing facilities, distribution centers, and automotive operations requiring specialized overweight and standard drayage services.',
      stats: [
        { label: 'Industrial Space', value: '20M+ sq ft', description: 'Manufacturing & warehouse' },
        { label: 'Manufacturing Jobs', value: '15K+', description: 'In industrial sector' },
        { label: 'Business Base', value: '2,000+', description: 'Companies in industrial parks' },
      ],
      keyIndustries: 'Manufacturing, distribution, automotive, logistics, industrial equipment',
    },
    'hoffman-estates': {
      title: 'Hoffman Estates Corporate & Retail Center',
      description: 'Hoffman Estates combines major corporate headquarters with retail distribution, technology firms, and healthcare operations, all requiring consistent drayage support for diverse supply chains.',
      stats: [
        { label: 'Sears Holdings', value: 'Former HQ', description: 'Major distribution legacy' },
        { label: 'Employment Base', value: '75K+', description: 'Daily workforce' },
        { label: 'Retail Hub', value: 'Major', description: 'Regional shopping destination' },
      ],
      keyIndustries: 'Corporate headquarters, technology, healthcare, retail distribution, manufacturing',
    },
    palatine: {
      title: 'Palatine Industrial & Technology Corridor',
      description: 'Palatine\'s growing manufacturing sector and technology companies require reliable drayage for precision components, technology equipment, and general freight distribution.',
      stats: [
        { label: 'Manufacturing Base', value: '200+', description: 'Industrial facilities' },
        { label: 'Technology Sector', value: 'Growing', description: 'Tech & medical devices' },
        { label: 'Rail Access', value: 'Metra/UP-NW', description: 'Regional connectivity' },
      ],
      keyIndustries: 'Manufacturing, technology, healthcare, distribution, retail',
    },
    wheeling: {
      title: 'Wheeling Distribution & Manufacturing Hub',
      description: 'Wheeling\'s industrial parks and strategic location along major transportation corridors serve manufacturing, distribution, and hospitality operations with consistent drayage needs.',
      stats: [
        { label: 'Industrial Parks', value: 'Multiple', description: 'Modern facilities' },
        { label: 'Manufacturing Jobs', value: '12K+', description: 'In industrial sector' },
        { label: 'Highway Access', value: 'I-294', description: 'Tri-State Tollway direct access' },
      ],
      keyIndustries: 'Manufacturing, distribution, hospitality, industrial services, logistics',
    },
    northbrook: {
      title: 'Northbrook Corporate & Medical Center',
      description: 'Northbrook hosts corporate headquarters, advanced manufacturing, and major healthcare facilities requiring specialized drayage for medical equipment, technology, and corporate supplies.',
      stats: [
        { label: 'Corporate HQs', value: '40+', description: 'Including Allstate, UL' },
        { label: 'Medical Facilities', value: 'Major', description: 'Healthcare & research' },
        { label: 'Median Income', value: 'Top Tier', description: 'High-value market' },
      ],
      keyIndustries: 'Corporate headquarters, manufacturing, technology, healthcare, retail',
    },
    glenview: {
      title: 'Glenview Technology & Corporate Hub',
      description: 'Glenview combines corporate operations, technology firms, and healthcare facilities with proximity to O\'Hare, creating diverse drayage requirements for precision equipment and supplies.',
      stats: [
        { label: 'Naval Air Station', value: 'Redeveloped', description: 'The Glen mixed-use district' },
        { label: 'Corporate Base', value: '50+', description: 'Major employers' },
        { label: 'Airport Access', value: '8 miles', description: 'To O\'Hare cargo' },
      ],
      keyIndustries: 'Corporate operations, technology, healthcare, manufacturing, distribution',
    },
    skokie: {
      title: 'Skokie Manufacturing & Healthcare Corridor',
      description: 'Skokie\'s diverse industrial base includes manufacturing, healthcare, technology, and distribution operations requiring flexible drayage solutions for varied container types and schedules.',
      stats: [
        { label: 'Manufacturing Base', value: '300+', description: 'Industrial facilities' },
        { label: 'Healthcare Sector', value: 'Major', description: 'Hospitals & medical supply' },
        { label: 'Business Diversity', value: 'High', description: 'Varied industrial mix' },
      ],
      keyIndustries: 'Manufacturing, healthcare, technology, distribution, retail',
    },
    evanston: {
      title: 'Evanston Education & Research Economy',
      description: 'Home to Northwestern University and major healthcare institutions, Evanston requires specialized drayage for research equipment, medical supplies, educational materials, and technology infrastructure.',
      stats: [
        { label: 'Northwestern University', value: 'Major Research', description: 'R1 research institution' },
        { label: 'Healthcare Facilities', value: 'NorthShore System', description: 'Major hospital network' },
        { label: 'Lakefront Access', value: 'Strategic', description: 'Chicago border location' },
      ],
      keyIndustries: 'Education, healthcare, technology, research, manufacturing',
    },
    elmhurst: {
      title: 'Elmhurst Healthcare & Education Hub',
      description: 'Elmhurst Memorial Hospital and Elmhurst University anchor a strong healthcare and education economy, with supporting distribution and retail operations requiring consistent drayage service.',
      stats: [
        { label: 'Healthcare Employment', value: 'Top Sector', description: 'Elmhurst Hospital system' },
        { label: 'Retail Hub', value: 'Major', description: 'Regional shopping district' },
        { label: 'Rail Access', value: 'Metra UP-W', description: 'Direct Chicago connection' },
      ],
      keyIndustries: 'Healthcare, education, retail, technology, distribution',
    },
    lombard: {
      title: 'Lombard Corporate & Distribution Center',
      description: 'Lombard\'s corporate offices, distribution centers, and technology firms benefit from central location and excellent highway access, driving steady container volumes.',
      stats: [
        { label: 'Corporate Base', value: '60+', description: 'Major employers' },
        { label: 'Highway Access', value: 'I-88/I-355', description: 'Major corridor junction' },
        { label: 'Business Parks', value: 'Multiple', description: 'Modern facilities' },
      ],
      keyIndustries: 'Corporate operations, technology, healthcare, distribution, manufacturing',
    },
    'carol-stream': {
      title: 'Carol Stream Distribution & E-commerce Hub',
      description: 'Carol Stream\'s massive distribution infrastructure serves major e-commerce and retail operations, with extensive warehouse space driving high container volumes and fast-turnaround drayage needs.',
      stats: [
        { label: 'Warehouse Space', value: '40M+ sq ft', description: 'Distribution facilities' },
        { label: 'E-commerce Hub', value: 'Major', description: 'Amazon & other fulfillment' },
        { label: 'Highway Access', value: 'I-355/I-59', description: 'Interstate connectivity' },
      ],
      keyIndustries: 'Distribution, logistics, e-commerce, manufacturing, industrial services',
    },
    'downers-grove': {
      title: 'Downers Grove Technology & Corporate Center',
      description: 'Downers Grove hosts major technology firms, corporate headquarters, and healthcare operations, requiring specialized drayage for high-value equipment, technology infrastructure, and corporate supplies.',
      stats: [
        { label: 'Corporate HQs', value: '50+', description: 'Including Dover Corporation' },
        { label: 'Technology Sector', value: 'Strong', description: 'IT & professional services' },
        { label: 'Metra Access', value: 'Three Lines', description: 'Exceptional rail transit' },
      ],
      keyIndustries: 'Technology, healthcare, corporate operations, retail, distribution',
    },
    'oak-brook': {
      title: 'Oak Brook Corporate Headquarters Hub',
      description: 'Oak Brook\'s concentration of Fortune 500 headquarters and upscale retail creates premium drayage demand for corporate equipment, technology infrastructure, and retail distribution.',
      stats: [
        { label: 'Fortune 500 HQs', value: '10+', description: 'Major corporate presence' },
        { label: 'Retail Hub', value: 'Oakbrook Center', description: 'Premier shopping destination' },
        { label: 'Office Space', value: '20M+ sq ft', description: 'Corporate facilities' },
      ],
      keyIndustries: 'Corporate headquarters, retail, technology, healthcare, distribution',
    },
    naperville: {
      title: 'Naperville Technology & Corporate Innovation Center',
      description: 'Naperville\'s thriving technology sector, corporate operations, and advanced manufacturing require reliable drayage for precision equipment, technology infrastructure, and corporate supply chains.',
      stats: [
        { label: 'Technology Jobs', value: '25K+', description: 'IT & tech sector' },
        { label: 'Corporate Base', value: '100+', description: 'Major employers' },
        { label: 'Education Level', value: 'Top 5%', description: 'Highly educated workforce' },
      ],
      keyIndustries: 'Technology, healthcare, corporate operations, manufacturing, distribution',
    },
    aurora: {
      title: 'Aurora Manufacturing & Distribution Powerhouse',
      description: 'As Illinois\' second-largest city, Aurora\'s extensive manufacturing base, distribution networks, and proximity to BNSF\'s Logistics Park Chicago create massive drayage demand for diverse industries.',
      stats: [
        { label: 'Manufacturing Jobs', value: '30K+', description: 'Industrial employment' },
        { label: 'BNSF Proximity', value: '15 miles', description: 'To Logistics Park Chicago' },
        { label: 'Industrial Space', value: '60M+ sq ft', description: 'Warehouse & manufacturing' },
      ],
      keyIndustries: 'Manufacturing, distribution, healthcare, technology, logistics',
    },
    bolingbrook: {
      title: 'Bolingbrook E-commerce & Distribution Epicenter',
      description: 'Bolingbrook\'s strategic location and massive distribution infrastructure make it a key e-commerce fulfillment hub, with major operations from Amazon, Target, and other retail giants driving high container volumes.',
      stats: [
        { label: 'E-commerce Space', value: '80M+ sq ft', description: 'Distribution & fulfillment' },
        { label: 'Major Tenants', value: 'Amazon, Target', description: 'Top-tier fulfillment' },
        { label: 'BNSF Access', value: '12 miles', description: 'To Logistics Park Chicago' },
      ],
      keyIndustries: 'Distribution, logistics, e-commerce, manufacturing, retail',
    },
    joliet: {
      title: 'Joliet Intermodal & Logistics Capital',
      description: 'Joliet\'s position as home to BNSF Logistics Park Chicago and Union Pacific\'s Joliet Intermodal Terminal makes it the epicenter of Midwest intermodal drayage, with massive daily container volumes.',
      stats: [
        { label: 'BNSF Logistics Park', value: '6,300 acres', description: 'Largest intermodal facility' },
        { label: 'Rail Volume', value: '1.5M+ TEUs', description: 'Annual container throughput' },
        { label: 'Warehouse Space', value: '150M+ sq ft', description: 'Distribution facilities' },
      ],
      keyIndustries: 'Logistics, distribution, manufacturing, rail operations, e-commerce',
    },
  }

  const context = cityContext[city.slug as keyof typeof cityContext] || cityContext.chicago

  return (
    <div className="mt-24 sm:mt-32 lg:mt-40 bg-neutral-50 py-24 sm:py-32">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 lg:items-start">
            {/* Left: Context Content */}
            <div className="flex flex-col">
              <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
                {context.title}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-neutral-600">
                {context.description}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-6">
                {context.stats.map((stat, index) => (
                  <div key={index} className="border-l-4 border-neutral-950 pl-6">
                    <dt className="text-sm font-semibold text-neutral-600">{stat.label}</dt>
                    <dd className="mt-2 text-3xl font-bold text-neutral-950">{stat.value}</dd>
                    <dd className="mt-1 text-sm text-neutral-600">{stat.description}</dd>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-neutral-950">
                  Key Industries Served
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  {context.keyIndustries}
                </p>
              </div>
            </div>

            {/* Right: Placeholder Image */}
            <div className="flex flex-col gap-6">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-100">
                <Image
                  src={drayageFacilityImage}
                  alt={`CR Express drayage services in ${city.name}`}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>

              {/* Stats card below image */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  Serving {city.name}
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-neutral-950">
                  {city.distance === 0 ? 'Headquartered Here' : `${city.distance} Miles Away`}
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  {city.distance === 0 ? 'Direct access to all services' : `${city.drivingTime} minute drive time`}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

// How It Works Section
export function HowItWorks({ city }: DrayageServiceOverviewProps) {
  const steps = [
    {
      number: '01',
      title: 'Container Arrival Notification',
      description: `When your container arrives at a Chicagoland rail terminal, you receive immediate notification via email and our customer portal. We monitor all railyard releases 24/7 to ensure we're ready when your cargo is available.`,
    },
    {
      number: '02',
      title: 'Pickup Coordination',
      description: `Our dispatch team coordinates same-day or next-day pickup based on your delivery requirements. We handle all railyard documentation, chassis positioning, and driver assignment to ensure smooth pickup.`,
    },
    {
      number: '03',
      title: `Transport to ${city.name}`,
      description: `Your container is transported directly to your ${city.name} facility using our private chassis fleet. Real-time GPS tracking provides visibility throughout the journey, with estimated arrival updates sent automatically.`,
    },
    {
      number: '04',
      title: 'Delivery & Documentation',
      description: `We deliver to your specified location in ${city.name} during your preferred time window. Our drivers handle all delivery documentation, container inspection reports, and can coordinate with your receiving team for efficient unloading.`,
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <SectionIntro
          title={`How Our ${city.name} Drayage Service Works`}
          className="mt-0"
        >
          <p>
            From rail arrival to delivery at your door, our streamlined process ensures your containers
            move efficiently through the Chicagoland drayage network.
          </p>
        </SectionIntro>

        <div className="mt-16 space-y-16">
          {steps.map((step, index) => (
            <FadeIn key={index}>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Step Number */}
                <div className="lg:col-span-2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                    <span className="font-display text-3xl font-bold">{step.number}</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="lg:col-span-10">
                  <h3 className="font-display text-2xl font-semibold text-neutral-950">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-neutral-600">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && (
                    <div className="mt-8 border-b border-neutral-200" />
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA Box */}
        <FadeIn>
          <div className="mt-16 rounded-3xl bg-neutral-950 p-8 text-center lg:p-12">
            <h3 className="font-display text-2xl font-semibold text-white">
              Ready to streamline your {city.name} drayage?
            </h3>
            <p className="mt-4 text-neutral-300">
              Get a custom quote and see how our process saves you time and money.
            </p>
            <div className="mt-8">
              <a
                href="tel:+12244029537"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-neutral-950 transition hover:bg-neutral-100"
              >
                Call +1 (224) 402-9537
              </a>
            </div>
          </div>
        </FadeIn>
      </FadeIn>
    </Container>
  )
}

// FAQ Section (EXPANDED TO 10 QUESTIONS)
export function DrayageFAQ({ city }: DrayageServiceOverviewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: `How does drayage work in ${city.name}?`,
      answer: `Drayage is the short-distance transportation of containers from railyards to your ${city.name} facility or our warehouse. When your container arrives at a Chicagoland rail terminal, we pick it up with our private chassis fleet and deliver it to your destination. We serve all major railyards (BNSF, CN, NS, CP) with same-day or next-day pickup depending on container availability.`,
    },
    {
      question: 'What is intermodal drayage?',
      answer: 'Intermodal drayage specifically refers to moving shipping containers between rail terminals and final destinations. "Intermodal" means the cargo stays in the same container while being transferred between different transportation modes (ship to rail, then rail to truck). This is the most common type of drayage in Chicago\'s logistics network.',
    },
    {
      question: 'How fast can you pick up from the railyard?',
      answer: 'We offer same-day pickup when containers are released and available before noon. Next-day pickup is standard for later releases. Our 7-day operation means weekend and holiday pickups are available, unlike competitors who only operate Monday-Friday. For urgent shipments, expedited service can retrieve containers within hours of availability.',
    },
    {
      question: 'Do you have chassis available?',
      answer: 'Yes. Unlike most drayage companies that rely on shared "grey pool" chassis, we own our fleet of 20\', 40\', and 45\' chassis plus tri-axles. This eliminates the common "no chassis available" problem that causes costly delays. Our equipment is always ready when you need it, with no surprise chassis usage fees.',
    },
    {
      question: 'Do you handle overweight containers?',
      answer: 'Absolutely. Our tri-axle chassis handle containers up to 44,000 lbs cargo weight (67,200 lbs gross including container and chassis). We have experienced drivers trained in overweight permitting, legal routing, and compliant transport. We regularly move heavy machinery, steel coils, and industrial equipment that exceed standard weight limits.',
    },
    {
      question: `Can you deliver to ${city.name} on weekends?`,
      answer: `Yes. CR Express operates 7 days a week including weekends and most holidays. We can pick up from railyards and deliver to your ${city.name} location on Saturdays and Sundays. This is critical for avoiding demurrage charges when containers are released on Fridays or over holiday weekends.`,
    },
    {
      question: `What industries do you serve in ${city.name}?`,
      answer: `We serve diverse industries including automotive manufacturing, pharmaceuticals and healthcare, technology and electronics, consumer goods and e-commerce, food processing, and industrial equipment. Our TSA-approved drivers and specialized equipment handle everything from temperature-sensitive pharmaceuticals to heavy machinery components. Each industry has unique requirements, and our 26 years of experience ensures we understand your specific needs.`,
    },
    {
      question: 'How do I track my container during drayage?',
      answer: `All shipments include real-time GPS tracking through our customer portal. You receive automatic notifications at key milestones: when the container is picked up from the railyard, when it's in transit, and estimated arrival time updates. Our dispatch team is available 24/7 via phone or email for status updates and can provide exact location information at any time.`,
    },
    {
      question: `What are your delivery hours in ${city.name}?`,
      answer: `We accommodate your receiving schedule. Standard deliveries occur Monday through Friday, 7 AM to 5 PM. Weekend deliveries are available for an additional fee. We can also coordinate early morning (before 7 AM) or evening (after 5 PM) deliveries if your facility has extended receiving hours. Appointments are scheduled based on your preference to ensure smooth coordination with your warehouse team.`,
    },
    {
      question: 'Do you offer temperature-controlled or specialized drayage?',
      answer: `While our trucks are not refrigerated, we coordinate with temperature-controlled carriers when needed for pharmaceutical or food shipments requiring climate control. For high-value cargo, we provide dedicated security measures including sealed containers, GPS tracking, and bonded truck service. Our TSA-approved drivers are cleared for handling sensitive and regulated materials. We also offer white-glove service for delicate electronics and specialized handling for hazardous materials with proper certifications.`,
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <SectionIntro
          title={`Drayage FAQs for ${city.name} Customers`}
          className="mt-0"
        >
          <p>
            Common questions about our intermodal drayage services, private chassis fleet,
            and railyard coverage serving {city.name} and Chicagoland.
          </p>
        </SectionIntro>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index}>
              <div className="rounded-3xl border border-neutral-200 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                >
                  <h3 className="font-display text-lg font-semibold text-neutral-950 pr-8">
                    {faq.question}
                  </h3>
                  <svg
                    className={`h-6 w-6 flex-shrink-0 text-neutral-950 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-neutral-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </Container>
  )
}

// Nearby Locations Section
interface NearbyDrayageLocationsProps {
  currentCitySlug: string
}

export function NearbyDrayageLocations({ currentCitySlug }: NearbyDrayageLocationsProps) {
  const nearbyCities = getNearbyDrayageCities(currentCitySlug, 5)

  if (nearbyCities.length === 0) return null

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <SectionIntro
          title="Drayage Services in Nearby Cities"
          className="mt-0"
        >
          <p>
            CR Express provides professional intermodal drayage services throughout Chicagoland.
            Explore our coverage in nearby cities.
          </p>
        </SectionIntro>

        <div className="mt-12 flex flex-wrap gap-3">
          {nearbyCities.map((city) => (
            <Link
              key={city.slug}
              href={`/services/drayage/${city.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-950 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {city.name} Drayage Services
            </Link>
          ))}
        </div>
      </FadeIn>
    </Container>
  )
}
