import type { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.defencetrading.com'

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/insights`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/companies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/strategic-defence-solutions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/arcana-satellite-program`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/who-we-work-with`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/export-control`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/end-user-certification`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
  ]

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map(a => ({
    url: `${base}/insights/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...articlePages]
}
