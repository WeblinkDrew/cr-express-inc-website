import { type Metadata } from 'next'

import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { List, ListItem } from '@/components/List'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageOne from '@/images/IMG 4255 Media Library.jpg'
import imageTwo from '@/images/IMG 3625 from CR Express.jpg'
import imageThree from '@/images/IMG 6739 Media Library.jpg'
import { RootLayout } from '@/components/RootLayout'

function Section({
  title,
  image,
  children,
}: {
  title: string
  image: React.ComponentPropsWithoutRef<typeof StylizedImage>
  children: React.ReactNode
}) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-135 flex-none lg:w-180">
            <div className="group">
              <StylizedImage
                {...image}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end lg:group-even/section:justify-start grayscale transition duration-500 group-hover:grayscale-0"
              />
            </div>
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-148 lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Assessment() {
  return (
    <Section title="Assessment" image={{ src: imageOne }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          We begin every partnership by conducting a thorough assessment of your{' '}
          <strong className="font-semibold text-neutral-950">current logistics operations</strong>.
          Our team analyzes your supply chain from origin to destination, identifying
          opportunities for optimization and cost savings.
        </p>
        <p>
          Our logistics experts review your shipping patterns, seasonal fluctuations,
          and special handling requirements. We examine your{' '}
          <strong className="font-semibold text-neutral-950">compliance needs</strong>,{' '}
          whether it's customs documentation for international shipments or GDP requirements
          for pharmaceutical products.
        </p>
        <p>
          The assessment concludes with a comprehensive{' '}
          <strong className="font-semibold text-neutral-950">logistics strategy</strong> tailored
          to your business, complete with projected cost savings and efficiency improvements.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        What we evaluate
      </h3>
      <TagList className="mt-4">
        <TagListItem>Shipping volumes & patterns</TagListItem>
        <TagListItem>Storage requirements</TagListItem>
        <TagListItem>Compliance needs</TagListItem>
        <TagListItem>Seasonal variations</TagListItem>
        <TagListItem>Cost optimization opportunities</TagListItem>
        <TagListItem>Technology integration</TagListItem>
      </TagList>
    </Section>
  )
}

function Implementation() {
  return (
    <Section title="Implementation" image={{ src: imageTwo, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Once we understand your needs, we implement a seamless transition to our
          services. Our{' '}
          <strong className="font-semibold text-neutral-950">dedicated account team</strong>{' '}
          coordinates every aspect of the onboarding process, ensuring zero disruption
          to your operations.
        </p>
        <p>
          For warehousing clients, we establish inventory management protocols, create
          custom reporting dashboards, and integrate with your existing systems. Our{' '}
          <strong className="font-semibold text-neutral-950">technology platform</strong>{' '}
          provides real-time visibility from day one.
        </p>
        <p>
          Transportation customers benefit from immediate access to our carrier network,
          GPS tracking systems, and 24/7 dispatch support. We handle all the complexities
          while you maintain complete{' '}
          <strong className="font-semibold text-neutral-950">visibility and control</strong>.
        </p>
      </div>

      <Blockquote
        author={{ name: 'Supply Chain Director', role: 'Fortune 500 Manufacturer' }}
        className="mt-12"
      >
        CR Express made the transition incredibly smooth. Within two weeks, they had
        our entire operation running more efficiently than it had in years.
      </Blockquote>
    </Section>
  )
}

function Partnership() {
  return (
    <Section title="Partnership" image={{ src: imageThree, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Our relationship doesn't end at implementation. We view ourselves as an{' '}
          <strong className="font-semibold text-neutral-950">
            extension of your team
          </strong>
          , continuously monitoring performance and identifying new opportunities for improvement.
        </p>
        <p>
          Regular business reviews ensure our services evolve with your{' '}
          <strong className="font-semibold text-neutral-950">changing needs</strong>.{' '}
          Whether you're launching new products, entering new markets, or experiencing
          seasonal surges, we scale our operations to match your requirements.
        </p>
        <p>
          With CR Express, you gain more than a logistics provider — you gain a{' '}
          <strong className="font-semibold text-neutral-950">
            strategic partner
          </strong>{' '}
          committed to your long-term success. Our founder-driven values and 26+ years
          of experience ensure we deliver on that commitment every day.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Ongoing support includes
      </h3>
      <List className="mt-8">
        <ListItem title="Performance Monitoring">
          Monthly reporting and analysis of key metrics including on-time delivery,
          inventory accuracy, and cost per shipment.
        </ListItem>
        <ListItem title="Continuous Optimization">
          Regular reviews to identify cost savings, route improvements, and
          efficiency gains across your supply chain.
        </ListItem>
        <ListItem title="Scalable Solutions">
          Flexible capacity that grows with your business, from seasonal peaks
          to long-term expansion plans.
        </ListItem>
      </List>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-linear-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-neutral-100 stroke-neutral-950/5"
          yOffset={-270}
        />
      </div>

      <SectionIntro
        eyebrow="Our values"
        title="What drives us every day"
      >
        <p>
          For 26+ years, we've built our reputation on core values that guide
          every decision, every shipment, and every customer interaction. These
          principles aren't just words — they're the foundation of how we operate.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Reliability">
            With 98% on-time delivery and 24/7 operations, we're the partner you
            can count on. Your deadlines become our deadlines, and we treat every
            shipment with the urgency it deserves.
          </GridListItem>
          <GridListItem title="Expertise">
            Founded by truck drivers and staffed by logistics professionals, we
            bring deep industry knowledge to every challenge. Our experience means
            we've seen it all and solved it all.
          </GridListItem>
          <GridListItem title="Flexibility">
            From single pallets to full truckloads, one-time shipments to dedicated
            contracts, we adapt our services to match your exact needs. No customer
            is too big or too small.
          </GridListItem>
          <GridListItem title="Transparency">
            Real-time tracking, clear communication, and straightforward pricing.
            You'll always know where your freight is, when it will arrive, and
            what it costs.
          </GridListItem>
          <GridListItem title="Safety">
            TSA-approved, GDP compliant, and committed to zero incidents. We protect
            your cargo, our drivers, and the public through rigorous safety protocols
            and continuous training.
          </GridListItem>
          <GridListItem title="Innovation">
            While staying true to proven methods, we embrace technology that improves
            efficiency. From GPS tracking to warehouse management systems, we invest
            in tools that benefit our customers.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Why Choose CR Express - Chicago Logistics Partner',
  description:
    'Discover why Fortune 500 companies and growing businesses choose CR Express for their logistics needs. 26+ years experience, strategic location, comprehensive services.',
}

export default function WhyChooseUs() {
  return (
    <RootLayout>
      <PageIntro eyebrow="Why choose us" title="Your strategic logistics advantage">
        <p>
          In an industry where promises are easy and delivery is hard, CR Express
          stands apart. Our founder-driven values, strategic Chicago location, and
          comprehensive service portfolio make us the logical choice for businesses
          that can't afford to compromise on their supply chain.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Assessment />
        <Implementation />
        <Partnership />
      </div>

      <Values />

      <ContactSection />
    </RootLayout>
  )
}