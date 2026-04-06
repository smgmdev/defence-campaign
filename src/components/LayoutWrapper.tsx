'use client'

import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import PageLoader from './PageLoader'

const AUTH_ROUTES = ['/login', '/signup']

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuth = AUTH_ROUTES.includes(pathname)

  if (isAuth) {
    return <>{children}</>
  }

  return (
    <>
      <PageLoader />
      <Nav />
      {children}
      <Footer />
    </>
  )
}
