'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { PRODUCTS } from '@/lib/products'

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [results, setResults] = useState<typeof PRODUCTS>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.body.style.paddingTop = bannerOpen ? '92px' : '56px'
  }, [bannerOpen])

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
        setSearchVal('')
        setResults([])
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setSearchOpen(false); setSearchVal(''); setResults([]) }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => { document.removeEventListener('mousedown', handleClick); document.removeEventListener('keydown', handleKey) }
  }, [])

  function handleSearchInput(val: string) {
    setSearchVal(val)
    const q = val.trim().toLowerCase()
    if (!q) { setResults([]); return }
    setResults(PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.type || '').toLowerCase().includes(q)
    ).slice(0, 8))
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
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

        <div className="nav-search-wrap" ref={searchRef}>
          {searchOpen ? (
            <div className="nav-search-box">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="7"/><line x1="15" y1="15" x2="19" y2="19"/></svg>
              <input
                ref={inputRef}
                className="nav-search-input"
                placeholder="Search products…"
                value={searchVal}
                onChange={e => handleSearchInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && results.length > 0) {
                    router.push(`/products?search=${encodeURIComponent(searchVal)}`)
                    setSearchOpen(false); setSearchVal(''); setResults([])
                  }
                }}
              />
            </div>
          ) : (
            <button className="nav-search-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="7"/><line x1="15" y1="15" x2="19" y2="19"/></svg>
            </button>
          )}
          {searchOpen && results.length > 0 && (
            <div className="nav-search-dropdown">
              {results.map((p, i) => (
                <Link key={i} href={`/products?search=${encodeURIComponent(p.name)}`} className="nav-search-item"
                  onClick={() => { setSearchOpen(false); setSearchVal(''); setResults([]) }}>
                  <span className="nav-search-name">{p.name}</span>
                  <span className="nav-search-cat">{p.category}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

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
  )
}
