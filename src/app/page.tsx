'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { PRODUCTS } from '@/lib/products'

const SEARCH_COMPANIES = [{"name":"Chase Tactical","category":"Protective Equipment","location":"USA"},{"name":"Hard Head Veterans","category":"Protective Equipment","location":"Sweetwater, TX"},{"name":"Hardwire LLC","category":"Protective Equipment","location":"Pocomoke City, MD"},{"name":"Sarkar Tactical","category":"Protective Equipment","location":"El Paso, TX"},{"name":"RMA Armament","category":"Protective Equipment","location":"Centerville, IA"},{"name":"Armor Express","category":"Protective Equipment","location":"Eden, NC"},{"name":"Team Wendy","category":"Protective Equipment","location":"Cleveland, OH"},{"name":"Gentex Corporation","category":"Protective Equipment","location":"Carbondale, PA"},{"name":"Point Blank Enterprises","category":"Protective Equipment","location":"Pompano Beach, FL"},{"name":"Revision Military","category":"Protective Equipment","location":"Essex Junction, VT"},{"name":"Crye Precision","category":"Military Uniforms","location":"Brooklyn, NY"},{"name":"5.11 Tactical","category":"Military Uniforms","location":"Modesto, CA"},{"name":"Viasat Inc.","category":"Communications Gear","location":"Carlsbad, CA"},{"name":"Silvus Technologies","category":"Communications Gear","location":"Los Angeles, CA"},{"name":"Leonardo DRS","category":"Communications Gear","location":"Arlington, VA"},{"name":"ADS Inc.","category":"Logistics & Supply","location":"Virginia Beach, VA"},{"name":"Oshkosh Defense","category":"Military Vehicles","location":"Oshkosh, WI"},{"name":"MBDA","category":"Defence Systems","location":"France/UK/Germany"},{"name":"Rohde & Schwarz","category":"Communications Gear","location":"Germany"}]

export default function HomePage() {
  const [searchVal, setSearchVal] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownItems, setDropdownItems] = useState<{type: string, name: string, category: string, sub: string}[]>([])
  const [spinnerHidden, setSpinnerHidden] = useState(false)
  const [subToast, setSubToast] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const hide = () => setSpinnerHidden(true)
    v.addEventListener('playing', hide)
    v.addEventListener('canplay', hide)
    return () => { v.removeEventListener('playing', hide); v.removeEventListener('canplay', hide) }
  }, [])

  function openDefaultDropdown() {
    const items = PRODUCTS.map(p => ({ type: 'product', name: p.name, category: p.category, sub: p.type }))
    setDropdownItems(items)
    setDropdownOpen(true)
  }

  function handleSearch(val: string) {
    setSearchVal(val)
    const q = val.trim().toLowerCase()
    if (!q) { openDefaultDropdown(); return }
    const matchP = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || (p.category||'').toLowerCase().includes(q) || (p.type||'').toLowerCase().includes(q)
    )
    const matchC = SEARCH_COMPANIES.filter(c =>
      c.name.toLowerCase().includes(q) || (c.category||'').toLowerCase().includes(q) || (c.location||'').toLowerCase().includes(q)
    ).slice(0, 4)
    const items = [
      ...matchP.map(p => ({ type: 'product', name: p.name, category: p.category, sub: p.type })),
      ...matchC.map(c => ({ type: 'company', name: c.name, category: c.category, sub: c.location })),
    ]
    setDropdownItems(items)
    setDropdownOpen(items.length > 0)
  }

  function showSubToast(msg: string) {
    setSubToast(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 4000)
  }

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    const email = (f.querySelector('input[type=email]') as HTMLInputElement)?.value.trim()
    const company = (f.querySelector('.sub-field input[type=text]') as HTMLInputElement)?.value.trim()
    const btn = f.querySelector('.sub-btn') as HTMLButtonElement
    const orig = btn.textContent
    btn.disabled = true
    btn.textContent = 'Submitting…'
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company })
      })
      const d = await res.json()
      if (d.ok) {
        f.reset()
        btn.disabled = false
        btn.textContent = orig
        showSubToast("You have subscribed to Defence Trading's Insights.")
      } else {
        btn.disabled = false
        btn.textContent = orig
        showSubToast('Could not subscribe — please try again.')
      }
    } catch {
      btn.disabled = false
      btn.textContent = orig
    }
  }

  return (
    <>
      <style>{`
        .hero {
          position: relative; height: 620px;
          display: flex; align-items: center; overflow: hidden;
        }
        .hero-bg { position: absolute; inset: 0; background: #0a0a0a; }
        .hero-video {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center; opacity: 0.6;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(100deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.1) 100%);
        }
        .hero-content { position: relative; z-index: 1; padding: 0 64px; max-width: 820px; margin-left: 0; }
        .hero-content h1 {
          font-size: clamp(34px, 5.5vw, 64px); font-weight: 900; color: #fff;
          line-height: 1.01; letter-spacing: -2px; margin-bottom: 22px;
        }
        .hero-content p {
          font-size: clamp(14px, 1.7vw, 17px); color: rgba(255,255,255,0.78);
          line-height: 1.7; max-width: 500px; margin-bottom: 36px;
        }
        .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .hero-spinner {
          position: absolute; inset: 0; z-index: 2;
          display: flex; align-items: center; justify-content: center;
          background: #0a0a0a; transition: opacity 0.4s ease;
        }
        .hero-spinner.hidden { opacity: 0; pointer-events: none; }
        .hero-spinner-ring {
          width: 48px; height: 48px;
          border: 3px solid rgba(255,255,255,0.15);
          border-top-color: rgba(255,255,255,0.75);
          border-radius: 50%; animation: spin 0.8s linear infinite;
        }
        .discovery { background: #f0ebe1; padding: 96px 0; }
        .disc-inner { max-width: 860px; }
        .disc-label {
          font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #000;
          padding-bottom: 6px; border-bottom: 2px solid #E31837; display: inline-block; margin-bottom: 24px;
        }
        .disc-inner h2 { font-size: clamp(28px, 4.5vw, 56px); font-weight: 900; color: #000; line-height: 1.0; letter-spacing: -2px; margin-bottom: 20px; }
        .disc-inner > p { font-size: 15px; color: #555; line-height: 1.75; max-width: 680px; margin-bottom: 52px; }
        .disc-search-wrap { position: relative; max-width: 820px; }
        .disc-search { display: flex; align-items: center; overflow: hidden; background: #fff; max-width: 820px; height: 72px; }
        .disc-search input {
          flex: 1; border: none; background: transparent; padding: 0 32px;
          font-size: 16px; font-family: inherit; outline: none; color: #000; height: 100%;
        }
        .disc-search input::placeholder { color: #aaa; }
        .disc-search-btn {
          width: 72px; height: 100%; background: #000; border: none; cursor: pointer;
          flex-shrink: 0; display: flex; align-items: center; justify-content: center;
          transition: background 0.25s ease;
        }
        .disc-search-btn:hover { background: #333; }
        .disc-search-btn svg { width: 20px; height: 20px; fill: #fff; }
        .disc-disclaimer { font-size: 13px; color: #555; line-height: 1.65; max-width: 640px; margin-top: 36px; }
        .disc-disclaimer strong { color: #000; }
        .disc-dropdown {
          display: none; position: absolute; top: calc(100% + 8px); left: 0; right: 0;
          background: #fff; box-shadow: 0 8px 32px rgba(0,0,0,0.14);
          overflow: hidden; z-index: 100; max-height: 400px; overflow-y: auto;
        }
        .disc-dropdown.open { display: block; }
        .disc-dd-label { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #aaa; padding: 12px 20px 6px; }
        .disc-dd-item {
          display: flex; align-items: center; gap: 12px; padding: 10px 20px;
          cursor: pointer; transition: background 0.1s; text-decoration: none; color: #000;
        }
        .disc-dd-item:hover { background: #f5f5f5; }
        .disc-dd-badge {
          font-size: 10px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;
          padding: 2px 7px; border: 1px solid #000; flex-shrink: 0;
        }
        .disc-dd-badge.product { background: #000; color: #fff; }
        .disc-dd-badge.company { background: #fff; color: #000; }
        .disc-dd-name { font-size: 14px; font-weight: 600; }
        .disc-dd-sub { font-size: 12px; color: #999; margin-left: auto; white-space: nowrap; }
        .disc-dd-empty { padding: 20px; font-size: 14px; color: #aaa; text-align: center; }
        .disc-dd-divider { border: none; border-top: 1px solid #f0f0f0; margin: 4px 0; }
        .featured-split {
          position: relative; height: 560px;
          display: flex; align-items: center; overflow: hidden; background: #000;
        }
        .featured-split > .pg-wrap { width: 100%; }
        .fs-content { position: relative; z-index: 1; padding: 0; max-width: 820px; }
        .fs-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #F5C400; margin-bottom: 20px; }
        .fs-content h2 { font-size: clamp(32px, 5vw, 64px); font-weight: 900; color: #fff; line-height: 1.0; letter-spacing: -2px; margin-bottom: 24px; }
        .fs-content p { font-size: clamp(14px, 1.7vw, 17px); color: rgba(255,255,255,0.78); line-height: 1.7; max-width: 500px; margin-bottom: 36px; }
        @media (max-width: 900px) {
          .featured-split { height: 440px; }
          .discovery { padding: 64px 0; }
        }
        @media (max-width: 767px) {
          .hero { height: 520px; }
          .hero-content { padding: 0 24px; }
          .featured-split { height: 380px; }
          .discovery { padding: 48px 0; }
          .disc-search { height: 60px; }
          .disc-search input { font-size: 12px; padding: 0 14px; }
          .disc-search-btn { width: 60px; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className={`hero-spinner${spinnerHidden ? ' hidden' : ''}`}>
            <div className="hero-spinner-ring"></div>
          </div>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content pg-wrap">
          <h1>The global marketplace for defence procurement</h1>
          <p>Certified products, verified companies, and documented procurement channels — serving government and military clients worldwide.</p>
          <div className="hero-cta">
            <Link href="/products" style={{display:'inline-block',background:'#E31837',color:'#fff',padding:'14px 32px',fontSize:'13px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',textDecoration:'none'}}>Browse Products</Link>
          </div>
        </div>
      </section>

      {/* DISCOVERY SECTION */}
      <section className="discovery">
        <div className="pg-wrap">
          <div className="disc-inner">
            <div className="disc-label">Defence Trading Catalogue</div>
            <h2>Find the right defence product or partner</h2>
            <p>Each procurement requirement is different — and we are steadfast partners to our clients because we listen. Browse our full range of certified products and verified companies across every defence category.</p>
            <div className="disc-search-wrap">
              <div className="disc-search">
                <input
                  type="text"
                  placeholder="Search products, companies, or categories..."
                  value={searchVal}
                  onChange={e => handleSearch(e.target.value)}
                  onFocus={openDefaultDropdown}
                  autoComplete="off"
                />
                <button className="disc-search-btn" onClick={() => { if (searchVal) window.location.href = `/products?q=${encodeURIComponent(searchVal)}` }}>
                  <svg viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.15 6.15a7.5 7.5 0 0 0 10.5 10.5z" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
                </button>
              </div>
              <div className={`disc-dropdown${dropdownOpen ? ' open' : ''}`}>
                {dropdownItems.length === 0 ? (
                  <div className="disc-dd-empty">No results found</div>
                ) : (
                  <>
                    {dropdownItems.filter(i => i.type === 'product').length > 0 && (
                      <div className="disc-dd-label">Products</div>
                    )}
                    {dropdownItems.filter(i => i.type === 'product').map((item, idx) => (
                      <Link key={`p-${idx}`} className="disc-dd-item" href={`/products?q=${encodeURIComponent(item.name)}`}>
                        <span className="disc-dd-badge product">Product</span>
                        <span className="disc-dd-name">{item.name}</span>
                        <span className="disc-dd-sub">{item.sub}</span>
                      </Link>
                    ))}
                    {dropdownItems.filter(i => i.type === 'company').length > 0 && (
                      <>
                        <hr className="disc-dd-divider" />
                        <div className="disc-dd-label">Companies</div>
                      </>
                    )}
                    {dropdownItems.filter(i => i.type === 'company').map((item, idx) => (
                      <Link key={`c-${idx}`} className="disc-dd-item" href="/companies">
                        <span className="disc-dd-badge company">Company</span>
                        <span className="disc-dd-name">{item.name}</span>
                        <span className="disc-dd-sub">{item.sub}</span>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
            <p className="disc-disclaimer"><strong>Authorised enquiries only.</strong> All products are available through compliant, documented procurement channels. Defence Trading trades with licensed companies only. All outreach must comply with applicable export control regulations and end-user certification requirements.</p>
          </div>
        </div>
      </section>

      {/* FEATURED SPLIT */}
      <section className="featured-split">
        <div className="pg-wrap">
          <div className="fs-content">
            <div className="fs-eyebrow">Defence Trading</div>
            <h2>Global Insights</h2>
            <p>Stay ahead with the latest defence procurement intelligence, geopolitical analysis, and market trends — curated by our team for governments, armed forces, and prime contractors worldwide.</p>
            <Link href="/insights" className="btn-yellow">Explore Global Insights</Link>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE STRIP */}
      <div className="subscribe-strip">
        <div className="pg-wrap">
          <h2>Subscribe to Defence Trading&apos;s Insights</h2>
          <p className="sub-intro">To receive the latest procurement intelligence, product updates, and market analysis — sign up below.</p>
          <form onSubmit={handleSubscribe}>
            <div className="sub-fields">
              <div className="sub-field">
                <label>Email <span>*</span></label>
                <input type="email" placeholder="Work email address" required />
              </div>
              <div className="sub-field">
                <label>Location <span>*</span></label>
                <select required defaultValue="">
                  <option value="" disabled></option>
                  <option>United Arab Emirates</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Poland</option>
                  <option>Saudi Arabia</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="sub-field">
                <label>Company <span>*</span></label>
                <input type="text" placeholder="Your organisation" required />
              </div>
            </div>
            <div className="sub-check">
              <input type="checkbox" id="sub-consent" required />
              <label htmlFor="sub-consent">Please click here to opt-in to receiving procurement insights and marketing communications from Defence Trading. Data collected will be processed in accordance with our privacy notice. You may unsubscribe at any time.</label>
            </div>
            <div className="sub-footer-row">
              <div className="sub-required">*Required information &nbsp;|&nbsp; Read our <Link href="/privacy">Privacy notice</Link></div>
              <button type="submit" className="sub-btn">Subscribe to Defence Trading</button>
            </div>
          </form>
        </div>
      </div>

      <div className={`sub-toast${toastVisible ? ' show' : ''}`}>{subToast}</div>
    </>
  )
}
