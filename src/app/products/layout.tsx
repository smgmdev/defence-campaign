import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse Defence Trading\'s catalogue of military and defence products including firearms, ammunition, armoured vehicles, optics, and tactical equipment.',
  keywords: 'defense products, military equipment, firearms catalogue, ammunition supplier, armoured vehicles, tactical gear, defence procurement',
  openGraph: {
    title: 'Products — Defence Trading',
    description: 'Browse Defence Trading\'s catalogue of military and defence products including firearms, ammunition, armoured vehicles, optics, and tactical equipment.',
    images: [{ url: 'https://www.defencetrading.com/og-image.png', width: 1280, height: 640 }],
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
