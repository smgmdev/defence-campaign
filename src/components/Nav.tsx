'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { PRODUCTS, CATEGORIES } from '@/lib/products'

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [results, setResults] = useState<typeof PRODUCTS>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.body.style.paddingTop = bannerOpen ? '92px' : '56px'
  }, [bannerOpen])

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setSearchVal('')
      setResults([])
    }
  }, [searchOpen])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  function handleSearchInput(val: string) {
    setSearchVal(val)
    const q = val.trim().toLowerCase()
    if (!q) { setResults([]); return }
    setResults(PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.type || '').toLowerCase().includes(q) ||
      (p.tags || []).some(t => t.toLowerCase().includes(q))
    ).slice(0, 12))
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const popularCategories = CATEGORIES.slice(0, 5)

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200 }}>
        {bannerOpen && (
          <div className="announce-bar-top">
            <span>Due to a high volume of enquiries, response times may take up to 2 business days. We appreciate your patience.</span>
            <button className="announce-close" onClick={() => setBannerOpen(false)} aria-label="Close">&#x2715;</button>
          </div>
        )}
        <nav className="main-nav">
          <Link href="/" className="brand">DefenceTrading<span>®</span></Link>
          <div className="nav-links">
            <Link href="/about" className={isActive('/about') ? 'active' : ''}>About Us</Link>
            <Link href="/products" className={isActive('/products') ? 'active' : ''}>Products</Link>
            <Link href="/companies" className={isActive('/companies') ? 'active' : ''}>Companies</Link>
            <Link href="/insights" className={isActive('/insights') ? 'active' : ''}>Insights</Link>
          </div>

          <button className="nav-search-btn" onClick={() => setSearchOpen(true)} aria-label="Search" style={{ marginLeft: 'auto' }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="7"/><line x1="15" y1="15" x2="19" y2="19"/></svg>
          </button>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
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

      {/* ── FULL-SCREEN SEARCH OVERLAY ── */}
      {searchOpen && (
        <div className="search-overlay">
          <button className="search-overlay-close" onClick={() => setSearchOpen(false)} aria-label="Close search">&#x2715;</button>

          <div className="search-overlay-inner">
            <div className="search-overlay-field">
              <input
                ref={inputRef}
                className="search-overlay-input"
                placeholder="Start typing to search"
                value={searchVal}
                onChange={e => handleSearchInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && results.length > 0) {
                    router.push(`/products?search=${encodeURIComponent(searchVal)}`)
                    setSearchOpen(false)
                  }
                }}
              />
              <div className="search-overlay-line" />
            </div>

            {!searchVal && (
              <div className="search-popular">
                <span className="search-popular-label">POPULAR SEARCHES</span>
                {popularCategories.map(cat => (
                  <button key={cat} className="search-popular-tag"
                    onClick={() => { router.push(`/products?category=${encodeURIComponent(cat)}`); setSearchOpen(false) }}>
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {results.length > 0 && (
              <div className="search-results-grid">
                {results.map((p, i) => (
                  <Link key={i} href={`/products?search=${encodeURIComponent(p.name)}`} className="search-result-card"
                    onClick={() => setSearchOpen(false)}>
                    <div className="search-result-img">
                      <Image src={p.img} alt={p.name} width={80} height={80} style={{ objectFit: 'contain' }} unoptimized />
                    </div>
                    <div className="search-result-info">
                      <div className="search-result-name">{p.name}</div>
                      <div className="search-result-cat">{p.category}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {searchVal && results.length === 0 && (
              <p className="search-no-results">No products found for &ldquo;{searchVal}&rdquo;</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
