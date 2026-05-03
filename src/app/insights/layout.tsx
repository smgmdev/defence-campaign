import type { Metadata } from 'next'
import JsonLd, { breadcrumbSchema } from '@/components/JsonLd'
import { ARTICLES } from '@/lib/articles'

const SITE = 'https://www.defencetrading.com'

export const metadata: Metadata = {
  title: 'Global Insights',
  description: 'Global Insights by Defence Trading — analysis, news, and regulatory updates on international defence procurement, export policy, and arms trade.',
  keywords: 'defence insights, military procurement news, arms export policy, defence industry analysis, IDEX, defence regulations',
  openGraph: {
    title: 'Global Insights — Defence Trading',
    description: 'Global Insights by Defence Trading — analysis, news, and regulatory updates on international defence procurement, export policy, and arms trade.',
    images: [{ url: `${SITE}/og-image.png`, width: 1280, height: 640 }],
  },
  alternates: { canonical: `${SITE}/insights` },
}

const insightsCollectionPage = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE}/insights`,
  url: `${SITE}/insights`,
  name: 'Defence Trading Global Insights',
  description: 'Analysis, news, and regulatory updates on international defence procurement, export policy, and arms trade.',
  isPartOf: { '@id': `${SITE}/#website` },
  about: { '@id': `${SITE}/#organization` },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: ARTICLES.length,
    itemListElement: ARTICLES.slice(0, 20).map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/insights/${a.slug}`,
      name: a.title,
    })),
  },
}

const insightsBreadcrumb = breadcrumbSchema([
  { name: 'Home', url: SITE },
  { name: 'Insights', url: `${SITE}/insights` },
])

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={insightsCollectionPage} />
      <JsonLd data={insightsBreadcrumb} />
      {children}
    </>
  )
}
