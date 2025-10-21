import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'

const airportSurchargeData = [
  { range: '$1.200-$1.449', percentage: '11.50%' },
  { range: '$1.450-$1.699', percentage: '12.00%' },
  { range: '$1.700-$1.949', percentage: '12.50%' },
  { range: '$1.950-$2.199', percentage: '13.00%' },
  { range: '$2.200-$2.449', percentage: '13.50%' },
  { range: '$2.450-$2.699', percentage: '14.00%' },
  { range: '$2.700-$2.949', percentage: '14.50%' },
  { range: '$2.950-$3.199', percentage: '15.00%' },
  { range: '$3.200-$3.449', percentage: '15.50%' },
  { range: '$3.450-$3.699', percentage: '16.00%' },
  { range: '$3.700-$3.949', percentage: '16.50%' },
  { range: '$3.950-$4.199', percentage: '17.00%' },
  { range: '$4.200-$4.449', percentage: '17.50%' },
  { range: '$4.450-$4.699', percentage: '18.00%' },
  { range: '$4.700-$4.949', percentage: '18.50%' },
  { range: '$4.950-$5.199', percentage: '19.00%' },
  { range: '$5.200-$5.449', percentage: '19.50%' },
  { range: '$5.450-$5.699', percentage: '20.00%' },
  { range: '$5.700-$5.949', percentage: '20.50%' },
  { range: '$5.950-$6.199', percentage: '21.00%' },
  { range: '$6.200-$6.449', percentage: '21.50%' },
  { range: '$6.450-$6.699', percentage: '22.00%' },
  { range: '$6.700-$6.949', percentage: '22.50%' },
  { range: '$6.950-$7.199', percentage: '23.00%' },
]

const railSurchargeData = [
  { range: '$1.200-$1.449', percentage: '20.00%' },
  { range: '$1.450-$1.699', percentage: '22.00%' },
  { range: '$1.700-$1.949', percentage: '24.00%' },
  { range: '$1.950-$2.199', percentage: '26.00%' },
  { range: '$2.200-$2.449', percentage: '28.00%' },
  { range: '$2.450-$2.699', percentage: '30.00%' },
  { range: '$2.700-$2.949', percentage: '32.00%' },
  { range: '$2.950-$3.199', percentage: '34.00%' },
  { range: '$3.200-$3.449', percentage: '36.00%' },
  { range: '$3.450-$3.699', percentage: '38.00%' },
  { range: '$3.700-$3.949', percentage: '40.00%' },
  { range: '$3.950-$4.199', percentage: '42.00%' },
  { range: '$4.200-$4.449', percentage: '44.00%' },
  { range: '$4.450-$4.699', percentage: '46.00%' },
  { range: '$4.700-$4.949', percentage: '48.00%' },
  { range: '$4.950-$5.199', percentage: '50.00%' },
  { range: '$5.200-$5.449', percentage: '52.00%' },
  { range: '$5.450-$5.699', percentage: '54.00%' },
  { range: '$5.700-$5.949', percentage: '56.00%' },
  { range: '$5.950-$6.199', percentage: '58.00%' },
  { range: '$6.200-$6.449', percentage: '60.00%' },
  { range: '$6.450-$6.699', percentage: '62.00%' },
  { range: '$6.700-$6.949', percentage: '64.00%' },
  { range: '$6.950-$7.199', percentage: '66.00%' },
]

function FuelSurchargeTable({
  title,
  description,
  data,
}: {
  title: string
  description: string
  data: Array<{ range: string; percentage: string }>
}) {
  return (
    <FadeIn>
      <div className="rounded-4xl bg-neutral-50 p-8 sm:p-10 lg:p-12">
        <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-6 text-base text-neutral-600">{description}</p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-100">
              <tr>
                <th
                  scope="col"
                  className="py-4 px-6 text-left text-base font-semibold text-neutral-950"
                >
                  Price Range of Fuel
                </th>
                <th
                  scope="col"
                  className="py-4 px-6 text-left text-base font-semibold text-neutral-950"
                >
                  {title === 'Airport Fuel Surcharge Table'
                    ? 'Fuel Surcharge Percentage (Air)'
                    : 'Fuel Surcharge Percentage (Rail)'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="transition hover:bg-neutral-50"
                >
                  <td className="whitespace-nowrap py-4 px-6 text-base text-neutral-700">
                    {row.range}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6 text-base text-neutral-700">
                    {row.percentage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FadeIn>
  )
}

export const metadata: Metadata = {
  title: 'Fuel Surcharge Tables - CR Express Logistics',
  description:
    'View current fuel surcharge rates for airport and rail transportation services. Updated monthly based on national on-highway diesel prices.',
}

export default function FuelSurcharge() {
  return (
    <RootLayout>
      <PageIntro eyebrow="Pricing" title="Fuel Surcharge Tables">
        <p>
          Our fuel surcharge rates are based on the most recent national on-highway
          diesel price as of the 15th of each month. These transparent rates ensure
          fair pricing that reflects current fuel costs in the logistics industry.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 sm:space-y-32 lg:space-y-40">
          <FuelSurchargeTable
            title="Airport Fuel Surcharge Table"
            description="Use the most recent national on-highway diesel price as of the 15th of each month to determine the following month's corresponding airport fuel surcharge percentage."
            data={airportSurchargeData}
          />

          <FuelSurchargeTable
            title="Rail Fuel Surcharge Table"
            description="Use the most recent national on-highway diesel price as of the 15th of each month to determine the following month's corresponding rail fuel surcharge percentage."
            data={railSurchargeData}
          />
        </div>
      </Container>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="rounded-4xl bg-neutral-950 p-8 sm:p-10 lg:p-12">
            <h2 className="font-display text-2xl font-semibold text-white">
              Questions about fuel surcharges?
            </h2>
            <p className="mt-4 text-base text-neutral-300">
              Our team is here to help explain how fuel surcharges are calculated
              and applied to your shipments. Contact us for more information about
              our transparent pricing structure.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-flex items-center gap-x-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-neutral-950 transition hover:bg-neutral-100"
              >
                Contact Us
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </RootLayout>
  )
}
