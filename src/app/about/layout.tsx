import type { Metadata } from 'next'
import JsonLd, { breadcrumbSchema } from '@/components/JsonLd'

const SITE = 'https://www.defencetrading.com'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Defence Trading — our mission, team, and how we support governments and procurement offices with licensed defence supplier connections.',
  keywords: 'about defence trading, defence procurement company, defence trader, military supplier network, defence trading team',
  openGraph: {
    title: 'About Us — Defence Trading',
    description: 'Learn about Defence Trading — our mission, team, and how we support governments and procurement offices with licensed defence supplier connections.',
    images: [{ url: `${SITE}/og-image.png`, width: 1280, height: 640 }],
  },
  alternates: { canonical: `${SITE}/about` },
}

const aboutPage = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE}/about`,
  url: `${SITE}/about`,
  name: 'About Defence Trading',
  isPartOf: { '@id': `${SITE}/#website` },
  about: { '@id': `${SITE}/#organization` },
}

const aboutBreadcrumb = breadcrumbSchema([
  { name: 'Home', url: SITE },
  { name: 'About', url: `${SITE}/about` },
])

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={aboutPage} />
      <JsonLd data={aboutBreadcrumb} />
      {children}
    </>
  )
}
