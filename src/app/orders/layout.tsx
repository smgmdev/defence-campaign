import type { Metadata } from 'next'
import JsonLd, { breadcrumbSchema } from '@/components/JsonLd'

const SITE = 'https://www.defencetrading.com'

export const metadata: Metadata = {
  title: 'Orders — Defence Trading',
  description: 'Browse and place buy or sell orders for defence products. Connect with verified suppliers and procurement offices on the Defence Trading marketplace.',
  keywords: 'defence orders, military procurement orders, defence buy sell, defence trading marketplace, defence product orders, B2B defence order book',
  openGraph: {
    title: 'Orders — Defence Trading',
    description: 'Browse and place buy or sell orders for defence products. Connect with verified suppliers and procurement offices on the Defence Trading marketplace.',
    images: [{ url: `${SITE}/og-image.png`, width: 1280, height: 640 }],
  },
  alternates: { canonical: `${SITE}/orders` },
}

const ordersWebPage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE}/orders`,
  url: `${SITE}/orders`,
  name: 'Defence Trading Orders',
  description: 'Live order book for defence procurement: buy and sell orders posted by verified governments, contractors, and suppliers.',
  isPartOf: { '@id': `${SITE}/#website` },
  about: { '@id': `${SITE}/#organization` },
  primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}/og-image.png` },
}

const marketplaceServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/orders#service`,
  serviceType: 'B2B Defence Procurement Marketplace',
  provider: { '@id': `${SITE}/#organization` },
  areaServed: 'Worldwide',
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Governments, Defence Contractors, Procurement Offices',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Defence Trading Order Book',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Buy Orders',
        description: 'Open buy-side requirements posted by verified buyers.',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Sell Orders',
        description: 'Open sell-side listings from verified suppliers.',
      },
    ],
  },
  potentialAction: [
    {
      '@type': 'BuyAction',
      target: `${SITE}/orders?type=sell`,
      description: 'Place a buy order against open sell-side listings.',
    },
    {
      '@type': 'SellAction',
      target: `${SITE}/orders?type=buy`,
      description: 'Submit a sell offer against open buy-side requirements.',
    },
  ],
}

const ordersBreadcrumb = breadcrumbSchema([
  { name: 'Home', url: SITE },
  { name: 'Orders', url: `${SITE}/orders` },
])

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={ordersWebPage} />
      <JsonLd data={marketplaceServiceSchema} />
      <JsonLd data={ordersBreadcrumb} />
      {children}
    </>
  )
}
