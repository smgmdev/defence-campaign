import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Defence Trading — our mission, team, and how we support governments and procurement offices with licensed defence supplier connections.',
  keywords: 'about defence trading, defence procurement company, defence trader, military supplier network, defence trading team',
  openGraph: {
    title: 'About Us — Defence Trading',
    description: 'Learn about Defence Trading — our mission, team, and how we support governments and procurement offices with licensed defence supplier connections.',
    images: [{ url: 'https://www.defencetrading.com/og-image.png', width: 1280, height: 640 }],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
