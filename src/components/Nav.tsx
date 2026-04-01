'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 200 }}>
      <div className="announce-bar-top">
        Due to a high volume of enquiries, response times may take up to 2 business days. We appreciate your patience.
      </div>
      <nav className="main-nav">
        <Link href="/" className="brand">DefenceTrading<span>®</span></Link>
        <div className="nav-links">
          <Link href="/about" className={isActive('/about') ? 'active' : ''}>About Us</Link>
          <Link href="/products" className={isActive('/products') ? 'active' : ''}>Products</Link>
          <Link href="/companies" className={isActive('/companies') ? 'active' : ''}>Companies</Link>
          <Link href="/insights" className={isActive('/insights') ? 'active' : ''}>Insights</Link>
        </div>

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </div>
        <div className={`mobile-nav${menuOpen ? ' open' : ''}`}>
          <Link href="/about" className={isActive('/about') ? 'active' : ''} onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link href="/products" className={isActive('/products') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="/companies" className={isActive('/companies') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Companies</Link>
          <Link href="/insights" className={isActive('/insights') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Insights</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </div>
      </nav>
    </div>
  )
}
