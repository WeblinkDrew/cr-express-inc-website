import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { SectionIntro } from '@/components/SectionIntro'

const sectors = [
  {
    title: 'Automotive',
    description: 'Parts distribution, JIT delivery, and specialized automotive logistics management.',
  },
  {
    title: 'Healthcare/Pharmaceutical',
    description: 'GDP compliant storage, cold chain logistics, and medical device distribution.',
  },
  {
    title: 'Electronics',
    description: 'High-value cargo handling, secure transportation, and technology equipment shipping.',
  },
  {
    title: 'Food & Beverage',
    description: 'Temperature-controlled logistics, food-grade warehousing, and timely distribution.',
  },
  {
    title: 'Construction & Infrastructure',
    description: 'Heavy equipment shipping, building materials, and project-based logistics solutions.',
  },
  {
    title: 'Retail',
    description: 'E-commerce fulfillment, cross docking, and last-mile delivery services.',
  },
  {
    title: 'Government/Defense',
    description: 'Secure handling, compliance documentation, and specialized government freight services.',
  },
  {
    title: 'Prototypes/Concept Products',
    description: 'White glove service, confidential handling, and expedited delivery for new products.',
  },
]

export function SectorsWeServe() {
  return (
    <>
      <SectionIntro
        eyebrow="Industries"
        title="Sectors we serve"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Freight forwarders and shippers use our services to ship and handle
          goods from the following sectors with specialized expertise and
          industry-specific solutions.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeIn>
          <GridList>
            {sectors.map((sector) => (
              <GridListItem key={sector.title} title={sector.title}>
                {sector.description}
              </GridListItem>
            ))}
          </GridList>
        </FadeIn>
      </Container>
    </>
  )
}
