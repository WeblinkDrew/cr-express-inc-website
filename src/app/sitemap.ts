import { type MetadataRoute } from 'next'
import { loadArticles, loadCaseStudies } from '@/lib/mdx'
import { citiesData } from '@/lib/location-data'
import { getSeobotArticles } from '@/lib/seobot'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.crexpressinc.com'

  // Static routes with their priorities and change frequencies
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/air-cargo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/drayage`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/local-pd`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/over-the-road`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/warehousing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/why-choose-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/fuel-surcharge`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic blog posts (MDX)
  const articles = await loadArticles()
  const blogRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}${article.href}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Dynamic SEObot AI blog posts
  const { articles: seobotArticles } = await getSeobotArticles(0, 1000)
  const seobotBlogRoutes: MetadataRoute.Sitemap = seobotArticles.map(
    (article) => ({
      url: `${baseUrl}/blog/ai/${article.slug}`,
      lastModified: new Date(article.publishedAt || article.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  )

  // Dynamic location pages
  const locationRoutes: MetadataRoute.Sitemap = citiesData.map((city) => ({
    url: `${baseUrl}/locations/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic work/case study pages
  const caseStudies = await loadCaseStudies()
  const workRoutes: MetadataRoute.Sitemap = caseStudies.map((caseStudy) => ({
    url: `${baseUrl}${caseStudy.href}`,
    lastModified: new Date(caseStudy.date),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  // Combine all routes
  return [
    ...staticRoutes,
    ...blogRoutes,
    ...seobotBlogRoutes,
    ...locationRoutes,
    ...workRoutes,
  ]
}
