import type { Metadata } from 'next'
import JsonLd, { breadcrumbSchema } from '@/components/JsonLd'

const SITE = 'https://www.defencetrading.com'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Defence Trading\'s procurement team for authorised B2B enquiries, product information, and partnership requests.',
  keywords: 'contact defence trading, defence procurement enquiry, military supply contact',
  openGraph: {
    title: 'Contact Us — Defence Trading',
    description: 'Get in touch with Defence Trading\'s procurement team for authorised B2B enquiries.',
    images: [{ url: `${SITE}/og-image.png`, width: 1280, height: 640 }],
  },
  alternates: { canonical: `${SITE}/contact` },
}

const contactPage = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE}/contact`,
  url: `${SITE}/contact`,
  name: 'Contact Defence Trading',
  isPartOf: { '@id': `${SITE}/#website` },
  about: { '@id': `${SITE}/#organization` },
}

const contactBreadcrumb = breadcrumbSchema([
  { name: 'Home', url: SITE },
  { name: 'Contact', url: `${SITE}/contact` },
])

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={contactPage} />
      <JsonLd data={contactBreadcrumb} />
      {children}
    </>
  )
}
