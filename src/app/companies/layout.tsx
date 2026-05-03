import type { Metadata } from 'next'
import JsonLd, { breadcrumbSchema } from '@/components/JsonLd'

const SITE = 'https://www.defencetrading.com'

export const metadata: Metadata = {
  title: 'Companies',
  description: 'Explore verified defence and armament manufacturers and suppliers listed on Defence Trading — filtered by country, category, and certification.',
  keywords: 'defence companies, armament manufacturers, military suppliers, verified defence contractors, defence directory',
  openGraph: {
    title: 'Companies — Defence Trading',
    description: 'Explore verified defence and armament manufacturers and suppliers listed on Defence Trading.',
    images: [{ url: `${SITE}/og-image.png`, width: 1280, height: 640 }],
  },
  alternates: { canonical: `${SITE}/companies` },
}

const companiesCollectionPage = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE}/companies`,
  url: `${SITE}/companies`,
  name: 'Verified Defence Companies and Suppliers',
  description: 'Directory of verified defence and armament manufacturers and suppliers on the Defence Trading platform.',
  isPartOf: { '@id': `${SITE}/#website` },
  about: { '@id': `${SITE}/#organization` },
}

const companiesBreadcrumb = breadcrumbSchema([
  { name: 'Home', url: SITE },
  { name: 'Companies', url: `${SITE}/companies` },
])

export default function CompaniesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={companiesCollectionPage} />
      <JsonLd data={companiesBreadcrumb} />
      {children}
    </>
  )
}
