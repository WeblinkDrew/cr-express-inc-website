import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { RootLayout } from '@/components/RootLayout'
import { DriverApplicationForm } from '@/components/DriverApplicationForm'

// Driver positions data (from careers page)
const driverPositions = {
  'cdl-driver-local': {
    title: 'CDL-A Driver - Local',
    department: 'Transportation',
    type: 'Full-time',
    location: 'Chicago Metro Area',
    description:
      'Local pickup and delivery routes throughout Chicagoland. Home daily, competitive pay, and comprehensive benefits.',
  },
  'cdl-driver-otr': {
    title: 'CDL-A Driver - OTR',
    department: 'Transportation',
    type: 'Full-time',
    location: 'Nationwide',
    description:
      'Over-the-road positions with dedicated lanes and competitive mileage pay. Owner-operators welcome.',
  },
  'drayage-driver': {
    title: 'Drayage Driver',
    department: 'Transportation',
    type: 'Full-time',
    location: 'Chicago, IL',
    description:
      "Container movements between O'Hare, Chicago's major railyards, and customer locations. TWIC card required.",
  },
}

type JobId = keyof typeof driverPositions

export async function generateStaticParams() {
  return Object.keys(driverPositions).map((jobId) => ({
    jobId,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ jobId: string }>
}): Promise<Metadata> {
  const { jobId } = await params
  const job = driverPositions[jobId as JobId]

  if (!job) {
    return {
      title: 'Job Not Found - CR Express Careers',
    }
  }

  return {
    title: `Apply for ${job.title} - CR Express Careers`,
    description: `Submit your driver application for the ${job.title} position at CR Express. ${job.description}`,
  }
}

export default async function DriverApplicationPage({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {
  const { jobId } = await params
  const job = driverPositions[jobId as JobId]

  if (!job) {
    notFound()
  }

  return (
    <RootLayout>
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="mx-auto max-w-4xl">
            {/* Job Header */}
            <div className="mb-16 border-b border-neutral-200 pb-12">
              <div className="mb-4">
                <a
                  href="/careers"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-neutral-950"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Careers
                </a>
              </div>
              <h1 className="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
                {job.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base text-neutral-600">
                <span>{job.department}</span>
                <span>•</span>
                <span>{job.type}</span>
                <span>•</span>
                <span>{job.location}</span>
              </div>
              <p className="mt-6 text-lg text-neutral-600">{job.description}</p>
            </div>

            {/* Driver Application Form */}
            <DriverApplicationForm jobTitle={job.title} department={job.department} />
          </div>
        </FadeIn>
      </Container>
    </RootLayout>
  )
}
