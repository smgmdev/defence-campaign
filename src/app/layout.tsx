import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Defence Trading',
    template: '%s — Defence Trading',
  },
  description: 'Defence Trading is a B2B procurement platform connecting governments and defence contractors with verified military and armament suppliers worldwide.',
  keywords: 'defence trading, military procurement, armament supplier, B2B defence platform, defence contractor, defence supplier',
  openGraph: {
    type: 'website',
    siteName: 'Defence Trading',
    title: 'Defence Trading',
    description: 'Defence Trading is a B2B procurement platform connecting governments and defence contractors with verified military and armament suppliers worldwide.',
    images: [{ url: 'https://www.defencetrading.com/og-image.png', width: 1280, height: 640 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Defence Trading',
    description: 'Defence Trading is a B2B procurement platform connecting governments and defence contractors with verified military and armament suppliers worldwide.',
    images: ['https://www.defencetrading.com/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
