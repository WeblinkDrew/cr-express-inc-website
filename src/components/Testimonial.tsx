import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'

export function Testimonial({
  children,
  client,
  className,
}: {
  children: React.ReactNode
  client: { logo?: ImageProps['src']; name: string }
  className?: string
}) {
  return (
    <div
      className={clsx(
        'relative isolate bg-[#F5F7F9] py-16 sm:py-28 md:py-32',
        className,
      )}
    >
      <GridPattern
        className="absolute inset-0 -z-10 h-full w-full mask-[linear-gradient(to_bottom_left,white_50%,transparent_60%)] fill-[#13B5EA]/5 stroke-[#13B5EA]/10"
        yOffset={-256}
      />
      <Container>
        <FadeIn>
          <figure className="mx-auto max-w-4xl">
            <blockquote className="relative font-display text-3xl font-medium tracking-tight text-[#2C3E50] sm:text-4xl">
              <p className="before:content-['\201C'] after:content-['\201D'] sm:before:absolute sm:before:right-full">
                {children}
              </p>
            </blockquote>
            <figcaption className="mt-10">
              {client.logo ? (
                <Image src={client.logo} alt={client.name} unoptimized />
              ) : (
                <p className="font-display text-base font-semibold text-[#2C3E50]">
                  {client.name}
                </p>
              )}
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </div>
  )
}
