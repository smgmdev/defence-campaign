import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Defence Trading\'s procurement team for authorised B2B enquiries, product information, and partnership requests.',
  keywords: 'contact defence trading, defence procurement enquiry, military supply contact',
  openGraph: {
    title: 'Contact Us — Defence Trading',
    description: 'Get in touch with Defence Trading\'s procurement team for authorised B2B enquiries.',
    images: [{ url: 'https://www.defencetrading.com/og-image.png', width: 1280, height: 640 }],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
