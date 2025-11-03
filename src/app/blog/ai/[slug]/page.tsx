import { type Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { RootLayout } from '@/components/RootLayout'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { ContactSection } from '@/components/ContactSection'
import { formatDate } from '@/lib/formatDate'
import { getSeobotArticle } from '@/lib/seobot'
import { SeobotArticleContent } from '@/components/SeobotArticleContent'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getSeobotArticle(params.slug)

  if (!post) {
    return {
      title: 'Article Not Found',
    }
  }

  const title = post.headline
  const description = post.metaDescription

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      images: post.image ? [post.image] : [],
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function SeobotArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getSeobotArticle(params.slug)

  if (!post) {
    notFound()
  }

  const publishDate = post.publishedAt || post.createdAt

  return (
    <RootLayout>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          {/* Breadcrumb */}
          {post.category && (
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-neutral-600">
              <Link href="/" className="hover:text-neutral-950">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-neutral-950">
                Blog
              </Link>
              <span>/</span>
              <span className="text-neutral-950">{post.category.title}</span>
            </div>
          )}

          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-6xl">
              {post.headline}
            </h1>
            <time
              dateTime={publishDate}
              className="order-first text-sm text-neutral-950"
            >
              {formatDate(publishDate)}
            </time>
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              by CR Express AI, Automated Content
              {post.readingTime && ` • ${post.readingTime} min read`}
            </p>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={post.image}
                alt={post.headline}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </FadeIn>

        <FadeIn>
          <SeobotArticleContent html={post.html} />
        </FadeIn>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <FadeIn>
            <div className="mx-auto mt-12 flex max-w-5xl flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-100 px-4 py-2 text-sm text-neutral-700"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <FadeIn>
            <div className="mx-auto mt-16 max-w-5xl border-t border-neutral-200 pt-16">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                Related Articles
              </h2>
              <ul className="mt-6 space-y-4">
                {post.relatedPosts.map((relatedPost, index) => (
                  <li key={index}>
                    <Link
                      href={`/blog/ai/${relatedPost.slug}`}
                      className="text-base text-neutral-700 hover:text-neutral-950"
                    >
                      {relatedPost.headline}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        )}
      </Container>

      <ContactSection />
    </RootLayout>
  )
}
