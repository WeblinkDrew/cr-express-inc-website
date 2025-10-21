import { type Metadata } from 'next'
import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/laptop.jpg'
import imageCareers from '@/images/IMG 4739 from CR Express.jpg'
import { RootLayout } from '@/components/RootLayout'
import { ServiceFAQSection, type FAQ } from '@/components/ServiceFAQSection'

function Positions() {
  const positions = [
    {
      department: 'Warehouse Operations',
      openings: [
        {
          title: 'Warehouse Manager',
          jobId: 'warehouse-manager',
          type: 'Full-time',
          location: 'Elk Grove Village, IL',
          description: 'Lead our 280,000 sq ft bonded warehouse operations, managing inventory, staff, and ensuring compliance with CBW Class 3 and GDP requirements.',
          isDriverPosition: false,
        },
        {
          title: 'Forklift Operator',
          jobId: 'forklift-operator',
          type: 'Full-time',
          location: 'Elk Grove Village, IL',
          description: 'Operate material handling equipment in our bonded warehouse facility. Experience with pharmaceutical and high-value cargo preferred.',
          isDriverPosition: false,
        },
        {
          title: 'Inventory Control Specialist',
          jobId: 'inventory-control-specialist',
          type: 'Full-time',
          location: 'Elk Grove Village, IL',
          description: 'Manage inventory accuracy and cycle counting in our WMS system. Ensure compliance with bonded warehouse regulations.',
          isDriverPosition: false,
        }
      ]
    },
    {
      department: 'Transportation',
      openings: [
        {
          title: 'CDL-A Driver - Local',
          jobId: 'cdl-driver-local',
          type: 'Full-time',
          location: 'Chicago Metro Area',
          description: 'Local pickup and delivery routes throughout Chicagoland. Home daily, competitive pay, and comprehensive benefits.',
          isDriverPosition: true,
        },
        {
          title: 'CDL-A Driver - OTR',
          jobId: 'cdl-driver-otr',
          type: 'Full-time',
          location: 'Nationwide',
          description: 'Over-the-road positions with dedicated lanes and competitive mileage pay. Owner-operators welcome.',
          isDriverPosition: true,
        },
        {
          title: 'Drayage Driver',
          jobId: 'drayage-driver',
          type: 'Full-time',
          location: 'Chicago, IL',
          description: 'Container movements between O\'Hare, Chicago\'s 21 railyards, and customer locations. TWIC card required.',
          isDriverPosition: true,
        }
      ]
    },
    {
      department: 'Operations & Support',
      openings: [
        {
          title: 'Logistics Coordinator',
          jobId: 'logistics-coordinator',
          type: 'Full-time',
          location: 'Elk Grove Village, IL',
          description: 'Coordinate shipments, manage carrier relationships, and ensure on-time delivery. Experience with TMS systems required.',
          isDriverPosition: false,
        },
        {
          title: 'Customer Service Representative',
          jobId: 'customer-service-representative',
          type: 'Full-time',
          location: 'Elk Grove Village, IL',
          description: 'Support our 24/7 operations, handling customer inquiries, tracking shipments, and providing logistics solutions.',
          isDriverPosition: false,
        },
        {
          title: 'Dispatch Coordinator',
          jobId: 'dispatch-coordinator',
          type: 'Full-time',
          location: 'Elk Grove Village, IL',
          description: 'Manage driver assignments, route optimization, and real-time problem-solving for our transportation network.',
          isDriverPosition: false,
        }
      ]
    }
  ]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="Current openings"
        title="Join our growing team"
      >
        <p>
          We're always looking for talented professionals who share our
          commitment to excellence in logistics. Explore our current openings
          and find your next career opportunity.
        </p>
      </SectionIntro>

      <div className="mt-24 space-y-24">
        {positions.map((dept) => (
          <FadeInStagger key={dept.department}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {dept.department}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul role="list" className="space-y-10">
                  {dept.openings.map((position) => (
                    <li key={position.title}>
                      <FadeIn>
                        <article className="group relative">
                          <h3 className="font-display text-xl font-semibold text-neutral-950">
                            {position.title}
                          </h3>
                          <div className="mt-2 flex gap-x-6 text-sm">
                            <span className="text-neutral-600">{position.type}</span>
                            <span className="text-neutral-600">•</span>
                            <span className="text-neutral-600">{position.location}</span>
                          </div>
                          <p className="mt-4 text-base text-neutral-600">
                            {position.description}
                          </p>
                          <div className="mt-6">
                            <Button
                              href={
                                position.isDriverPosition
                                  ? `/careers/apply/driver/${position.jobId}`
                                  : `/careers/apply/${position.jobId}`
                              }
                              invert={false}
                            >
                              Apply now
                            </Button>
                          </div>
                        </article>
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

function Benefits() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Why work at CR Express"
        title="Benefits that drive success"
        invert
      >
        <p>
          We believe in taking care of our team. From competitive compensation
          to comprehensive benefits, we ensure our employees have everything
          they need to thrive.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Competitive Pay" invert>
            Industry-leading wages for all positions, with performance bonuses,
            overtime opportunities, and annual reviews. Driver positions include
            mileage pay, detention pay, and safety bonuses.
          </GridListItem>
          <GridListItem title="Health & Wellness" invert>
            Comprehensive medical, dental, and vision insurance for you and your
            family. Company-paid life insurance and disability coverage. Employee
            assistance program for personal and professional support.
          </GridListItem>
          <GridListItem title="Time Off & Balance" invert>
            Paid time off that grows with tenure, paid holidays, and flexible
            scheduling options where available. Local drivers home daily, regional
            drivers home weekly.
          </GridListItem>
          <GridListItem title="Retirement Planning" invert>
            401(k) retirement plan with company matching to help secure your future.
            Financial planning resources and retirement counseling available.
          </GridListItem>
          <GridListItem title="Career Development" invert>
            Ongoing training programs, CDL school partnerships, and tuition
            reimbursement for job-related education. Clear paths for advancement
            within our growing company.
          </GridListItem>
          <GridListItem title="Safety & Equipment" invert>
            Modern, well-maintained fleet with latest safety technology. State-of-the-art
            warehouse equipment. Comprehensive safety training and PPE provided.
            Commitment to zero incidents.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

function Culture() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-135 flex-none lg:w-180">
            <div className="group">
              <StylizedImage
                src={imageCareers}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end grayscale transition duration-500 group-hover:grayscale-0"
              />
            </div>
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-148 lg:flex-none">
          <FadeIn>
            <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              Our Culture
            </h2>
            <div className="mt-6 space-y-6 text-base text-neutral-600">
              <p>
                <strong className="font-semibold text-neutral-950">Founded by drivers, for drivers.</strong> Our
                leadership team started behind the wheel, and that perspective shapes everything
                we do. We understand the challenges our team faces because we've been there.
              </p>
              <p>
                At CR Express, you're not just an employee number – you're part of a family
                that's been growing strong since 1999. We value <strong className="font-semibold text-neutral-950">hard work</strong>,{' '}
                <strong className="font-semibold text-neutral-950">dedication</strong>, and{' '}
                <strong className="font-semibold text-neutral-950">integrity</strong> above all else.
              </p>
              <p>
                Our 24/7 operations mean we're always moving, but we never forget that our
                success comes from our people. From our warehouse team to our drivers, from
                dispatch to customer service, every role is critical to keeping America's
                supply chains running.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Values() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="What we stand for"
        title="Values that guide us every day"
      >
        <p>
          These aren't just words on a wall – they're the principles that have
          guided CR Express for over 26 years and continue to shape our future.
        </p>
      </SectionIntro>

      <div className="mt-24">
        <GridList>
          <GridListItem title="Safety First">
            Zero incidents is our goal. We invest in training, equipment, and
            technology to ensure everyone goes home safely every day.
          </GridListItem>
          <GridListItem title="Driver Respect">
            Founded by drivers, we never forget who moves America. Fair pay,
            home time, and respect for the profession are non-negotiable.
          </GridListItem>
          <GridListItem title="Customer Success">
            Your success is our success. We go above and beyond to ensure
            on-time delivery and exceed expectations.
          </GridListItem>
          <GridListItem title="Team Unity">
            From warehouse to highway, we work as one team. Everyone's
            contribution matters, and we support each other.
          </GridListItem>
          <GridListItem title="Continuous Improvement">
            26+ years in business means constantly evolving. We embrace new
            technology and methods while maintaining proven practices.
          </GridListItem>
          <GridListItem title="Community Impact">
            We're proud to be part of the Chicago community, providing good
            jobs and supporting local initiatives.
          </GridListItem>
        </GridList>
      </div>
    </Container>
  )
}

function ApplicationProcess() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="lg:flex lg:items-center lg:justify-between lg:gap-x-8 xl:gap-x-20">
        <div className="lg:w-148 lg:flex-none">
          <FadeIn>
            <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              How to Apply
            </h2>
            <div className="mt-6">
              <h3 className="font-display text-base font-semibold text-neutral-950">
                Simple application process
              </h3>
              <TagList className="mt-4">
                <TagListItem>Online Application</TagListItem>
                <TagListItem>Phone Screening</TagListItem>
                <TagListItem>In-Person Interview</TagListItem>
                <TagListItem>Background Check</TagListItem>
                <TagListItem>Job Offer</TagListItem>
                <TagListItem>Onboarding</TagListItem>
              </TagList>
            </div>
            <div className="mt-10 space-y-6 text-base text-neutral-600">
              <p>
                <strong className="font-semibold text-neutral-950">Ready to join our team?</strong> Apply
                online or give us a call at (847) 354-7979. We review applications
                promptly and will contact qualified candidates within 48 hours.
              </p>
              <p>
                For driving positions, bring your CDL, medical card, and driving
                record. For warehouse positions, steel-toed boots are required
                for facility tours.
              </p>
            </div>
            <div className="mt-10">
              <Button href="/contact" invert={false}>
                Apply today
              </Button>
            </div>
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 flex justify-center">
          <FadeIn className="w-135 flex-none lg:w-180">
            <StylizedImage
              src={imageLaptop}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center"
              shape={1}
            />
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

const careersFAQs: FAQ[] = [
  {
    question: 'What types of driving positions do you have available?',
    answer:
      'We hire CDL-A drivers for several types of positions: Local pickup & delivery (home daily), Over-the-road (regional and long-haul routes), Drayage/container work (21 Chicago railyards), and Dedicated account positions. Both company drivers and owner-operators are welcome. Requirements include valid CDL-A, clean driving record, and DOT medical card.',
  },
  {
    question: 'Do local drivers get home every night?',
    answer:
      'Yes, our local pickup & delivery drivers and drayage drivers are home daily. These positions operate within the Chicago metropolitan area with routes designed to ensure you\'re home each night. We value work-life balance and understand the importance of time with family.',
  },
  {
    question: 'What benefits do you offer?',
    answer:
      'We provide comprehensive benefits including medical, dental, and vision insurance for you and your family, 401(k) with company matching, paid time off and holidays, company-paid life insurance and disability coverage, ongoing training and career development, safety bonuses and performance incentives, and modern, well-maintained equipment.',
  },
  {
    question: 'Do you require experience for warehouse positions?',
    answer:
      'Experience requirements vary by position. For forklift operators and specialized roles, we prefer 1-2 years of warehouse experience. However, we also hire entry-level candidates for general warehouse positions and provide comprehensive training. Certifications like forklift operation can be obtained through our training programs. The most important qualities are reliability, attention to detail, and willingness to learn.',
  },
  {
    question: 'How does the application process work?',
    answer:
      'The process typically takes 1-2 weeks: Submit your online application or call (847) 354-7979, complete a phone screening with our HR team (usually within 48 hours), attend an in-person interview at our Elk Grove Village facility, pass background check and drug screening, receive job offer with start date, and complete onboarding and orientation. For driving positions, bring your CDL, medical card, and driving record to your interview.',
  },
  {
    question: 'What opportunities are there for career advancement?',
    answer:
      'CR Express promotes from within whenever possible. Warehouse associates can advance to lead positions, supervisors, and management roles. Drivers can move into dispatcher, operations coordinator, or driver trainer positions. We provide ongoing training, tuition reimbursement for job-related education, and clear advancement paths. Many of our managers started in entry-level positions and grew their careers with us over the years.',
  },
]

export const metadata: Metadata = {
  title: 'Careers at CR Express - Chicago Logistics Jobs',
  description:
    'Join CR Express logistics team. Now hiring CDL drivers, warehouse workers, and logistics professionals. Competitive pay, benefits, and home time. Apply today.',
}

export default function Careers() {
  return (
    <RootLayout>
      <PageIntro eyebrow="Careers at CR Express" title="Build your future in logistics">
        <p>
          Join a team that values hard work, dedication, and the people who
          keep America moving. With competitive pay, comprehensive benefits,
          and a culture built on respect, CR Express is where careers thrive.
        </p>
      </PageIntro>

      <Positions />
      <Culture />
      <Benefits />
      <Values />
      <ApplicationProcess />

      <ServiceFAQSection
        title="Careers FAQs"
        description="Common questions about working at CR Express, benefits, and the application process."
        faqs={careersFAQs}
      />

      <ContactSection />
    </RootLayout>
  )
}