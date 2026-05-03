type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[]
interface JsonLdObject { [key: string]: JsonLdValue }

export default function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const SITE = 'https://www.defencetrading.com'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Defence Trading',
  url: SITE,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/og-image.png`,
    width: 1280,
    height: 640,
  },
  description: 'B2B defence procurement platform connecting governments and contractors with verified military and armament suppliers worldwide.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AE',
    addressLocality: 'Dubai',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'info@defencetrading.com',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
  ],
  areaServed: 'Worldwide',
  industry: 'Defence and Aerospace',
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: SITE,
  name: 'Defence Trading',
  description: 'B2B defence procurement platform.',
  publisher: { '@id': `${SITE}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE}/products?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}
