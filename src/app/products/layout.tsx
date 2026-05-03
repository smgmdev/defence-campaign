import type { Metadata } from 'next'
import JsonLd, { breadcrumbSchema } from '@/components/JsonLd'
import { PRODUCTS } from '@/lib/products'

const SITE = 'https://www.defencetrading.com'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse Defence Trading\'s catalogue of military and defence products including firearms, ammunition, armoured vehicles, optics, and tactical equipment.',
  keywords: 'defense products, military equipment, firearms catalogue, ammunition supplier, armoured vehicles, tactical gear, defence procurement',
  openGraph: {
    title: 'Products — Defence Trading',
    description: 'Browse Defence Trading\'s catalogue of military and defence products including firearms, ammunition, armoured vehicles, optics, and tactical equipment.',
    images: [{ url: `${SITE}/og-image.png`, width: 1280, height: 640 }],
  },
  alternates: { canonical: `${SITE}/products` },
}

const productItemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Defence Trading Product Catalogue',
  description: 'Verified military and defence equipment available through Defence Trading.',
  numberOfItems: PRODUCTS.length,
  itemListElement: PRODUCTS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      '@id': `${SITE}/products#product-${p.id}`,
      name: p.name,
      sku: `DT-${p.id}`,
      category: p.category,
      description: p.desc,
      image: `${SITE}${p.img}`,
      url: p.url || `${SITE}/products?q=${encodeURIComponent(p.name)}`,
      brand: { '@type': 'Brand', name: 'Defence Trading' },
      manufacturer: { '@type': 'Organization', name: 'Defence Trading', url: SITE },
      additionalProperty: [
        ...(p.calibre ? [{ '@type': 'PropertyValue', name: 'Calibre', value: p.calibre }] : []),
        ...(p.type ? [{ '@type': 'PropertyValue', name: 'Type', value: p.type }] : []),
      ],
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          price: '0',
          valueAddedTaxIncluded: false,
        },
        url: `${SITE}/products?q=${encodeURIComponent(p.name)}`,
        seller: { '@type': 'Organization', name: 'Defence Trading', url: SITE },
        eligibleCustomerType: 'http://purl.org/goodrelations/v1#Business',
        businessFunction: 'http://purl.org/goodrelations/v1#Sell',
      },
    },
  })),
}

const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE}/products`,
  url: `${SITE}/products`,
  name: 'Defence Trading Products',
  description: 'B2B catalogue of military and defence equipment from verified suppliers worldwide.',
  isPartOf: { '@id': `${SITE}/#website` },
  about: { '@id': `${SITE}/#organization` },
  mainEntity: { '@type': 'ItemList', numberOfItems: PRODUCTS.length },
}

const productsBreadcrumb = breadcrumbSchema([
  { name: 'Home', url: SITE },
  { name: 'Products', url: `${SITE}/products` },
])

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={productItemList} />
      <JsonLd data={productsBreadcrumb} />
      {children}
    </>
  )
}
