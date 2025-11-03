import { BlogClient } from 'seobot'

// Article summary from the list view (getArticles)
export interface SeobotArticleSummary {
  id: string
  slug: string
  headline: string
  metaDescription: string
  image: string
  category?: {
    title: string
    slug: string
  } | null
  tags?: Array<{
    title: string
    slug: string
  }> | null
  publishedAt?: string
  createdAt: string
  readingTime?: number
  published?: boolean
}

// Full article from detail view (getArticle)
export interface SeobotArticle extends SeobotArticleSummary {
  html: string
  relatedPosts?: Array<{
    slug: string
    headline: string
  }>
}

export interface SeobotArticlesResponse {
  articles: SeobotArticleSummary[]
  total: number
}

/**
 * Fetch SEObot articles
 * Returns empty array if API key is not configured
 */
export async function getSeobotArticles(
  page: number = 0,
  limit: number = 100,
): Promise<SeobotArticlesResponse> {
  const key = process.env.SEOBOT_API_KEY

  if (!key) {
    console.warn('SEOBOT_API_KEY not configured, skipping SEObot articles')
    return { articles: [], total: 0 }
  }

  try {
    const client = new BlogClient(key)
    const result = await client.getArticles(page, limit)
    return {
      articles: result.articles || [],
      total: result.total || 0,
    }
  } catch (error) {
    console.error('Error fetching SEObot articles:', error)
    return { articles: [], total: 0 }
  }
}

/**
 * Fetch a single SEObot article by slug
 */
export async function getSeobotArticle(
  slug: string,
): Promise<SeobotArticle | null> {
  const key = process.env.SEOBOT_API_KEY

  if (!key) {
    return null
  }

  try {
    const client = new BlogClient(key)
    const article = await client.getArticle(slug)
    return article
  } catch (error) {
    console.error(`Error fetching SEObot article ${slug}:`, error)
    return null
  }
}

/**
 * Convert SEObot article to a format compatible with MDX articles
 * This allows both types to be displayed with the same component
 */
export function normalizeSeobotArticle(article: SeobotArticleSummary) {
  // Convert ISO date to YYYY-MM-DD format expected by formatDate
  const rawDate = article.publishedAt || article.createdAt
  const dateObj = new Date(rawDate)
  const formattedDate = dateObj.toISOString().split('T')[0] // YYYY-MM-DD

  return {
    href: `/blog/ai/${article.slug}`,
    title: article.headline,
    description: article.metaDescription,
    date: formattedDate,
    author: {
      name: 'CR Express Team',
      role: 'Logistics Team',
      image: {
        src: '/images/team/ai-author.svg',
        width: 48,
        height: 48,
      },
    },
    isSeobotArticle: true,
    seobotSlug: article.slug,
    image: article.image,
    category: article.category,
    tags: article.tags,
  }
}
