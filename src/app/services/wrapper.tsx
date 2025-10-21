import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { MDXComponents } from '@/components/MDXComponents'
import { PageIntro } from '@/components/PageIntro'
import { Border } from '@/components/Border'
import { SectionIntro } from '@/components/SectionIntro'
import { GridPattern } from '@/components/GridPattern'
import { RootLayout } from '@/components/RootLayout'
import { Blockquote } from '@/components/Blockquote'
import { type Service, type MDXEntry, loadServices } from '@/lib/mdx'
import Link from 'next/link'

export default async function ServiceLayout({
  service,
  children,
}: {
  service: MDXEntry<Service>
  children: React.ReactNode
}) {
  // Load all services dynamically
  let allServices = await loadServices()

  // Filter out current service and take first 2 for "More services"
  let moreServices = allServices
    .filter(({ metadata }) => metadata !== service)
    .slice(0, 2)

  return (
    <RootLayout>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro eyebrow="Our Services" title={service.title} centered>
            <p>{service.description}</p>
          </PageIntro>

          <FadeIn>
            <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                      <dt className="font-semibold">Service</dt>
                      <dd>{service.name}</dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                      <dt className="font-semibold">Since</dt>
                      <dd>
                        <time dateTime={service.date}>
                          {service.date}
                        </time>
                      </dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                      <dt className="font-semibold">Category</dt>
                      <dd>{service.category}</dd>
                    </div>
                  </dl>
                </div>
              </Container>
            </div>

            <div className="border-y border-neutral-200 bg-neutral-100">
              <div className="mx-auto -my-px max-w-304 bg-neutral-200">
                <GrayscaleTransitionImage
                  {...service.image}
                  alt={service.title}
                  quality={90}
                  className="w-full"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </header>

        {/* Service Overview Section */}
        {service.summary && service.summary.length > 0 && (
          <Container className="mt-24 sm:mt-32 lg:mt-40">
            <FadeIn>
              <h2 className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
                Overview
              </h2>
              <div className="mt-6 space-y-6 text-base text-neutral-600">
                {service.summary.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </FadeIn>
          </Container>
        )}

        {/* Client Testimonial Section */}
        {service.testimonial && (
          <Container className="mt-24 sm:mt-32 lg:mt-40">
            <FadeIn>
              <Blockquote
                author={{
                  name: service.testimonial.author.name,
                  role: service.testimonial.author.role,
                }}
              >
                {service.testimonial.content}
              </Blockquote>
            </FadeIn>
          </Container>
        )}

        {/* Main Service Content */}
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <MDXComponents.wrapper>{children}</MDXComponents.wrapper>
          </FadeIn>
        </Container>
      </article>

      {moreServices.length > 0 && (
        <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
          <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-linear-to-b from-neutral-50">
            <GridPattern
              className="absolute inset-0 h-full w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-neutral-100 stroke-neutral-950/5"
              yOffset={-270}
            />
          </div>

          <SectionIntro title="More services" smaller />

          <Container className="mt-16">
            <FadeInStagger className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              {moreServices.map(({ href, metadata }) => (
                <FadeIn key={href}>
                  <article>
                    <Border position="left" className="relative flex flex-col items-start pl-8">
                      <h3 className="mt-6 text-base font-semibold text-neutral-950">
                        {metadata.name}
                      </h3>
                      <p className="mt-2.5 text-base text-neutral-600">{metadata.description}</p>
                      <Link
                        href={href}
                        className="mt-6 flex gap-x-3 text-base font-semibold text-neutral-950 transition hover:text-neutral-700"
                        aria-label={`Learn more about ${metadata.name}`}
                      >
                        Learn more
                        <svg viewBox="0 0 24 6" aria-hidden="true" className="w-6 flex-none fill-current">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M24 3 18 .5v2H0v1h18v2L24 3Z"
                          />
                        </svg>
                        <span className="absolute inset-0" />
                      </Link>
                    </Border>
                  </article>
                </FadeIn>
              ))}
            </FadeInStagger>
          </Container>
        </div>
      )}

      <ContactSection />
    </RootLayout>
  )
}
