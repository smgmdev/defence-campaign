import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Global Insights',
  description: 'Global Insights by Defence Trading — analysis, news, and regulatory updates on international defence procurement, export policy, and arms trade.',
  keywords: 'defence insights, military procurement news, arms export policy, defence industry analysis, IDEX, defence regulations',
  openGraph: {
    title: 'Global Insights — Defence Trading',
    description: 'Global Insights by Defence Trading — analysis, news, and regulatory updates on international defence procurement, export policy, and arms trade.',
    images: [{ url: 'https://www.defencetrading.com/og-image.png', width: 1280, height: 640 }],
  },
}

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
