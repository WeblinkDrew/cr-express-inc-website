import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { RootLayout } from '@/components/RootLayout'
import { JobApplicationForm } from '@/components/JobApplicationForm'

// Job positions data (same as careers page)
const jobPositions = {
  'warehouse-manager': {
    title: 'Warehouse Manager',
    department: 'Warehouse Operations',
    type: 'Full-time',
    location: 'Elk Grove Village, IL',
    description:
      'Lead our 280,000 sq ft bonded warehouse operations, managing inventory, staff, and ensuring compliance with CBW Class 3 and GDP requirements.',
  },
  'forklift-operator': {
    title: 'Forklift Operator',
    department: 'Warehouse Operations',
    type: 'Full-time',
    location: 'Elk Grove Village, IL',
    description:
      'Operate material handling equipment in our bonded warehouse facility. Experience with pharmaceutical and high-value cargo preferred.',
  },
  'inventory-control-specialist': {
    title: 'Inventory Control Specialist',
    department: 'Warehouse Operations',
    type: 'Full-time',
    location: 'Elk Grove Village, IL',
    description:
      'Manage inventory accuracy and cycle counting in our WMS system. Ensure compliance with bonded warehouse regulations.',
  },
  'logistics-coordinator': {
    title: 'Logistics Coordinator',
    department: 'Operations & Support',
    type: 'Full-time',
    location: 'Elk Grove Village, IL',
    description:
      'Coordinate shipments, manage carrier relationships, and ensure on-time delivery. Experience with TMS systems required.',
  },
  'customer-service-representative': {
    title: 'Customer Service Representative',
    department: 'Operations & Support',
    type: 'Full-time',
    location: 'Elk Grove Village, IL',
    description:
      'Support our 24/7 operations, handling customer inquiries, tracking shipments, and providing logistics solutions.',
  },
  'dispatch-coordinator': {
    title: 'Dispatch Coordinator',
    department: 'Operations & Support',
    type: 'Full-time',
    location: 'Elk Grove Village, IL',
    description:
      'Manage driver assignments, route optimization, and real-time problem-solving for our transportation network.',
  },
}

type JobId = keyof typeof jobPositions

export async function generateStaticParams() {
  return Object.keys(jobPositions).map((jobId) => ({
    jobId,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ jobId: string }>
}): Promise<Metadata> {
  const { jobId } = await params
  const job = jobPositions[jobId as JobId]

  if (!job) {
    return {
      title: 'Job Not Found - CR Express Careers',
    }
  }

  return {
    title: `Apply for ${job.title} - CR Express Careers`,
    description: `Submit your application for the ${job.title} position at CR Express. ${job.description}`,
  }
}

export default async function JobApplicationPage({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {
  const { jobId } = await params
  const job = jobPositions[jobId as JobId]

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

            {/* Application Form */}
            <JobApplicationForm jobTitle={job.title} department={job.department} />
          </div>
        </FadeIn>
      </Container>
    </RootLayout>
  )
}
