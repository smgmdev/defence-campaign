import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Orders — Defence Trading',
  description: 'Browse and place buy or sell orders for defence products. Connect with verified suppliers and procurement offices on the Defence Trading marketplace.',
  keywords: 'defence orders, military procurement orders, defence buy sell, defence trading marketplace, defence product orders',
  openGraph: {
    title: 'Orders — Defence Trading',
    description: 'Browse and place buy or sell orders for defence products. Connect with verified suppliers and procurement offices on the Defence Trading marketplace.',
    images: [{ url: 'https://www.defencetrading.com/og-image.png', width: 1280, height: 640 }],
  },
}

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
