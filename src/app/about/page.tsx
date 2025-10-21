import { type Metadata } from 'next'
import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import imageCarlosRosales from '@/images/team/carlos-rosales.jpg'
import imageJamalAmro from '@/images/team/jamal-amro.jpg'
import imageAlexAmro from '@/images/team/alex-amro.jpg'
import imageDerekMalazdra from '@/images/team/derek-malazdra.jpg'
import imageCarlosTruck from '@/images/Carlos Picture CR Express.png'
import imageHowWeDoIt from '@/images/how-we-do-it.jpg'
import { loadArticles } from '@/lib/mdx'
import { RootLayout } from '@/components/RootLayout'
import { StylizedImage } from '@/components/StylizedImage'
import { Blockquote } from '@/components/Blockquote'

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-[#2C3E50] py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Our culture"
        title="Built by drivers, driven by service."
        invert
      >
        <p>
          Founded by truck drivers who understand logistics from the ground up,
          we've built a culture centered on reliability, expertise, and putting
          our customers' success first.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Driver-Founded Heritage" invert>
            Our founders started behind the wheel in 1999, giving us unique insight
            into the challenges and opportunities in logistics. This perspective
            shapes every decision we make.
          </GridListItem>
          <GridListItem title="24/7 Commitment" invert>
            Logistics never sleeps, and neither does our dedication. With round-the-clock
            operations and support, we're always ready when our customers need us,
            ensuring their supply chains never stop moving.
          </GridListItem>
          <GridListItem title="Safety First" invert>
            From our TSA-approved operations to our comprehensive driver training
            programs, safety is embedded in everything we do. We protect your cargo,
            our team, and the communities we serve.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  {
    title: 'Executive Team',
    people: [
      {
        name: 'Carlos Rosales',
        role: 'Co-Founder',
        image: { src: imageCarlosRosales },
      },
      {
        name: 'Jamal Amro',
        role: 'Co-Founder',
        image: { src: imageJamalAmro },
      },
      {
        name: 'Alex Amro',
        role: 'Project Manager',
        image: { src: imageAlexAmro },
      },
      {
        name: 'Derek Malazdra',
        role: 'Key Accounts Manager',
        image: { src: imageDerekMalazdra },
      },
    ],
  },
]

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105 group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

function ServiceSatisfaction() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-135 flex-none lg:w-180">
            <div className="group">
              <StylizedImage
                src={imageCarlosTruck}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end grayscale transition duration-500 group-hover:grayscale-0"
              />
            </div>
            <p className="mt-4 text-sm text-neutral-600 text-center lg:text-right">
              Pictured above, Carlos Rosales and his first truck in 1999.
            </p>
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-148 lg:flex-none">
          <FadeIn>
            <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              Service is our Satisfaction
            </h2>
            <div className="mt-6 space-y-6 text-base text-neutral-600">
              <p>
                CR Express was built on unmatched service that goes above and beyond
                customer expectations. The industry recognition and trust we've formed
                over the years is a true staple in the organization's success and how
                customers will continue to recognize us for many years to come.
              </p>
            </div>
            <Blockquote
              author={{ name: 'Carlos Rosales', role: 'Founder' }}
              className="mt-12"
            >
              CR Express is not like any other trucking company. It's first class
              service on a large scale and that's what makes us such a great partner
              to work with.
            </Blockquote>
          </FadeIn>
        </div>
      </div>

      {/* How We Do It Section */}
      <div className="mt-24 lg:flex lg:items-center lg:justify-start lg:gap-x-8 xl:gap-x-20 sm:mt-32 lg:mt-40">
        <div className="lg:w-148 lg:flex-none">
          <FadeIn>
            <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              How We Do It
            </h2>
            <div className="mt-6 space-y-6 text-base text-neutral-600">
              <p>
                CR Express aims to be our valued customers' one-stop solution for all
                their logistics needs. What do we offer?
              </p>
            </div>
            <ul className="mt-8 space-y-3 text-base text-neutral-600">
              <li className="flex items-start gap-3">
                <svg className="h-6 w-6 flex-none fill-neutral-950" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Certified for Transportation of TSA Goods</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-6 w-6 flex-none fill-neutral-950" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Certified for Direct Airport Ramp Access</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-6 w-6 flex-none fill-neutral-950" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Certified for Transportation of Customs Bonded Goods</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-6 w-6 flex-none fill-neutral-950" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Certified Container Freight Station (CFS) for Bonded Goods</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-6 w-6 flex-none fill-neutral-950" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Certified for Storage of Hazardous Materials</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-6 w-6 flex-none fill-neutral-950" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Certified for Transportation of Hazardous Materials</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-6 w-6 flex-none fill-neutral-950" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Certified High-Value Carrier and Warehouse</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-6 w-6 flex-none fill-neutral-950" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Compliant with GDP Transportation and Storage Requirements</span>
              </li>
            </ul>
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 flex justify-center">
          <FadeIn className="w-135 flex-none lg:w-180">
            <div className="group">
              <StylizedImage
                src={imageHowWeDoIt}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-start grayscale transition duration-500 group-hover:grayscale-0"
                shape={1}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Philanthropy() {
  return (
    <div className="mt-24 rounded-4xl bg-[#2C3E50] py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Giving back"
        title="Philanthropy"
        invert
      >
        <p>
          CR Express offers several funding opportunities to nonprofit organizations
          at a local, national, and global scale. Those opportunities include supporting
          youth programs, low-income communities, and educating the workforce. CR Express
          remains fundamentally involved in charitable foundations.
        </p>
        <p className="mt-6">
          CR Express' staff also helps local communities through volunteerism, connecting
          non-profits and communities to much needed resources.
        </p>
      </SectionIntro>

      <Container className="mt-16">
        <FadeIn>
          <h3 className="font-display text-xl font-semibold text-white mb-8">
            Just a few of the organizations CR has worked with include:
          </h3>
        </FadeIn>
        <GridList>
          <GridListItem title="Boys and Girls Club" invert>
            CR Express wrapped a Semi-Truck with the Boys and Girls Club Branding to
            Spread Awareness Statistics about the Free Membership Club. It also hosted a
            "touch a truck" event for the club, to showcase how the logistics industry
            works and let the members of the club get a first-hand look at CR Express' day to day.
          </GridListItem>
          <GridListItem title="Wings Soccer Club" invert>
            CR Express is a sponsor of the competitive soccer team, Wings SC. The Wings
            Soccer Club is located in the greater Chicagoland area and has teams from all
            age groups that compete at a local scale.
          </GridListItem>
          <GridListItem title="Ginger Creek Community Church" invert>
            CR Express extended funding for a church mission trip to Mexico in order to
            help restore low-income communities/homes.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'About CR Express - Chicago Logistics Company Since 1999',
  description:
    'Founded by truck drivers in 1999, CR Express has grown into a premier logistics provider with 280,000 sq ft of bonded warehouse space and comprehensive transportation services.',
}

export default async function About() {
  let blogArticles = (await loadArticles()).slice(0, 2)

  return (
    <RootLayout>
      <PageIntro eyebrow="About CR Express" title="Founded by drivers, powered by expertise">
        <p>
          Since 1999, we've built our reputation on understanding logistics from
          the ground up, delivering solutions that keep America's supply chains moving.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            CR Express was founded by truck drivers who saw an opportunity to do
            logistics differently. Starting with a handful of trucks and a commitment
            to exceptional service, we've grown into a comprehensive logistics provider
            operating from a strategic 280,000 square foot facility less than 5 miles
            from O'Hare International Airport.
          </p>
          <p>
            Our founder-driven perspective means we understand the challenges our
            customers face because we've been there ourselves. From navigating Chicago's
            21 railyards to managing time-critical air cargo operations, our team brings
            26+ years of hands-on experience to every shipment we handle.
          </p>
          <p>
            Today, CR Express serves as a trusted logistics partner to Fortune 500
            companies and growing businesses alike. Our CBW Class 3 bonded warehouse,
            TSA-approved operations, and comprehensive transportation network provide
            the flexibility and reliability modern supply chains demand.
          </p>
        </div>
      </PageIntro>

      <Container className="mt-16">
        <StatList>
          <StatListItem value="280K" label="Square feet of warehouse space" />
          <StatListItem value="100+" label="Dedicated employees" />
          <StatListItem value="26+" label="Years of experience" />
        </StatList>
      </Container>

      <Culture />

      <Team />

      <ServiceSatisfaction />

      <Philanthropy />

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="Latest insights"
        intro="Stay informed about the latest developments in logistics, supply chain management, and industry trends through our expert insights and updates."
        pages={blogArticles}
      />

      <ContactSection />
    </RootLayout>
  )
}