import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { formatDate } from '@/lib/formatDate'
import { loadArticles } from '@/lib/mdx'
import { ServiceFAQSection, type FAQ } from '@/components/ServiceFAQSection'
import { getSeobotArticles, normalizeSeobotArticle } from '@/lib/seobot'

const blogFAQs: FAQ[] = [
  {
    question: 'How often do you publish new blog content?',
    answer:
      'We publish new articles regularly, typically 2-3 times per month. Our content calendar focuses on timely industry topics, seasonal logistics considerations, regulatory updates, and best practices based on our 26+ years of experience in transportation and warehousing.',
  },
  {
    question: 'Can I subscribe to blog updates?',
    answer:
      'Yes! You can stay informed about our latest blog posts and logistics insights by following us on LinkedIn where we share all new articles. You can also contact us to join our email newsletter for monthly updates on industry trends, company news, and helpful logistics tips.',
  },
  {
    question: 'Do you accept guest blog posts or industry contributions?',
    answer:
      'We occasionally feature guest posts from industry experts, partners, and thought leaders in the logistics and supply chain space. If you have expertise to share that would benefit our audience, please contact us at quotes@crexpressinc.com with your topic proposal and a brief outline.',
  },
  {
    question: 'Can I share your blog articles?',
    answer:
      'Absolutely! We encourage sharing our content. All our blog articles can be shared via social media, email, or linked from your own website. We appreciate proper attribution and a link back to the original article on our site.',
  },
  {
    question: 'How can I get answers to specific logistics questions not covered in the blog?',
    answer:
      'If you have specific questions about logistics, shipping, warehousing, or our services that aren\'t addressed in our blog content, we\'re here to help! Call our team at +1 (224) 402-9537 or submit your question through our contact form. Our logistics experts are happy to provide personalized answers and guidance.',
  },
]

export const metadata: Metadata = {
  title: 'CR Express Blog - Logistics Insights & Industry News',
  description:
    'Expert insights on logistics, supply chain management, and transportation from CR Express. Stay informed about industry trends, shipping best practices, and warehousing solutions.',
}

export default async function Blog() {
  // Load both MDX articles and SEObot articles
  let mdxArticles = await loadArticles()
  const { articles: seobotArticles } = await getSeobotArticles(0, 100)

  // Normalize SEObot articles to match MDX format
  const normalizedSeobotArticles = seobotArticles.map(normalizeSeobotArticle)

  // Merge and sort by date (newest first)
  const allArticles = [...mdxArticles, ...normalizedSeobotArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <RootLayout>
      <PageIntro eyebrow="Blog" title="Logistics insights and industry expertise">
        <p>
          Stay informed about the latest developments in logistics, supply chain management,
          and transportation. Our team shares expert insights, best practices, and industry
          trends to help you optimize your operations and stay ahead in the ever-evolving
          world of freight and warehousing.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {allArticles.map((article) => (
            <FadeIn key={article.href}>
              <article>
                <Border className="pt-16">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <h2 className="font-display text-2xl font-semibold text-neutral-950">
                        <Link href={article.href}>{article.title}</Link>
                      </h2>
                      <dl className="lg:absolute lg:top-0 lg:left-0 lg:w-1/3 lg:px-4">
                        <dt className="sr-only">Published</dt>
                        <dd className="absolute top-0 left-0 text-sm text-neutral-950 lg:static">
                          <time dateTime={article.date}>
                            {formatDate(article.date)}
                          </time>
                        </dd>
                        <dt className="sr-only">Author</dt>
                        <dd className="mt-6 flex gap-x-4">
                          <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                            <Image
                              alt={`${article.author.name}, ${article.author.role}`}
                              {...article.author.image}
                              className="h-12 w-12 object-cover grayscale"
                            />
                          </div>
                          <div className="text-sm text-neutral-950">
                            <div className="font-semibold">
                              {article.author.name}
                            </div>
                            <div>{article.author.role}</div>
                          </div>
                        </dd>
                      </dl>
                      <p className="mt-6 max-w-2xl text-base text-neutral-600">
                        {article.description}
                      </p>
                      <Button
                        href={article.href}
                        aria-label={`Read more: ${article.title}`}
                        className="mt-8"
                      >
                        Read more
                      </Button>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>

      <ServiceFAQSection
        title="Blog FAQs"
        description="Questions about our blog content, subscriptions, and how to stay informed about logistics industry insights."
        faqs={blogFAQs}
      />

      <ContactSection />
    </RootLayout>
  )
}
