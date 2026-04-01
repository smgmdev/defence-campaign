import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Companies',
  description: 'Explore verified defence and armament manufacturers and suppliers listed on Defence Trading — filtered by country, category, and certification.',
  keywords: 'defence companies, armament manufacturers, military suppliers, verified defence contractors, defence directory',
  openGraph: {
    title: 'Companies — Defence Trading',
    description: 'Explore verified defence and armament manufacturers and suppliers listed on Defence Trading.',
    images: [{ url: 'https://www.defencetrading.com/og-image.png', width: 1280, height: 640 }],
  },
}

export default function CompaniesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
