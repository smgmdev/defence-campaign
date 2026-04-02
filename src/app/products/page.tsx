'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PRODUCTS, CATEGORIES, Product } from '@/lib/products'
import SubscribeStrip from '@/components/SubscribeStrip'

function ProductsContent() {
  const searchParams = useSearchParams()
  const initialQ = searchParams.get('q') || ''
  const initialCat = searchParams.get('cat') || ''

  const [search, setSearch] = useState(initialQ)
  const [category, setCategory] = useState(initialCat)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sortCol, setSortCol] = useState('id')
  const [sortDir, setSortDir] = useState(1)
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null)
  const [enquirySubmitted, setEnquirySubmitted] = useState(false)
  const [enquirySubmitting, setEnquirySubmitting] = useState(false)
  const [enquiryError, setEnquiryError] = useState(false)
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})
  const [imgLoaded, setImgLoaded] = useState<Record<number, boolean>>({})

  // Sync URL params to state when navigating from other pages
  useEffect(() => {
    const urlQ = searchParams.get('q') || ''
    const urlCat = searchParams.get('cat') || ''
    if (urlQ !== search) setSearch(urlQ)
    if (urlCat !== category) setCategory(urlCat)
  }, [searchParams])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setEnquiryProduct(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const filtered = PRODUCTS.filter(p => {
    if (category && p.category !== category) return false
    const q = search.toLowerCase()
    if (q && !p.name.toLowerCase().includes(q) && !p.calibre.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false
    return true
  }).sort((a, b) => {
    const av = (a as unknown as Record<string, string>)[sortCol] ?? ''
    const bv = (b as unknown as Record<string, string>)[sortCol] ?? ''
    if (av < bv) return -sortDir
    if (av > bv) return sortDir
    return 0
  })

  // Group by category for grid
  const grouped: Record<string, Product[]> = {}
  filtered.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = []
    grouped[p.category].push(p)
  })

  function exportCSV() {
    const headers = ['ID', 'Name', 'Calibre', 'Category', 'Type', 'Description']
    const allGrouped: Record<string, Product[]> = {}
    PRODUCTS.forEach(p => {
      if (!allGrouped[p.category]) allGrouped[p.category] = []
      allGrouped[p.category].push(p)
    })
    const ordered = CATEGORIES.flatMap(cat => allGrouped[cat] ?? [])
    const rows = ordered.map((p, i) => [
      i + 1, `"${p.name}"`, `"${p.calibre}"`, `"${p.category}"`, `"${p.type}"`,
      `"${p.desc.replace(/"/g, '""')}"`
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'defence-trading-products.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  function sortList(col: string) {
    if (sortCol === col) setSortDir(d => -d)
    else { setSortCol(col); setSortDir(1) }
  }

  async function handleEnquirySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!enquiryProduct) return
    const data = new FormData(e.currentTarget)
    const full_name = data.get('full_name') as string
    const company = data.get('company') as string
    const country = data.get('country') as string
    const email = data.get('email') as string
    const whatsapp = data.get('whatsapp') as string
    setEnquirySubmitting(true)
    setEnquiryError(false)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: enquiryProduct.name, calibre: enquiryProduct.calibre, full_name, company, country, email, whatsapp }),
      })
      const d = await res.json()
      if (d.ok) {
        setEnquirySubmitted(true)
      } else {
        setEnquiryError(true)
      }
    } catch {
      setEnquiryError(true)
    } finally {
      setEnquirySubmitting(false)
    }
  }

  return (
    <>
      <style>{`
        .products-hero { background: #F5C400; padding: 36px 0 0; }
        .products-hero h1 { font-size: clamp(32px, 7vw, 52px); font-weight: 900; color: #000; letter-spacing: -1px; line-height: 1; margin-bottom: 8px; }
        .products-hero .sub { font-size: clamp(14px, 2.5vw, 19px); font-weight: 700; color: #000; margin-bottom: 20px; }
        .notice-box { background: rgba(255,255,255,0.45); border: 1px solid rgba(0,0,0,0.12); padding: 14px 18px; font-size: 12px; color: #333; line-height: 1.6; margin-bottom: 0; max-width: 900px; }
        .filter-bar { background: #F5C400; padding: 20px 0 28px; display: flex; align-items: flex-end; gap: 24px; flex-wrap: wrap; }
        .filter-bar > .pg-wrap { display: flex; align-items: flex-end; gap: 24px; flex-wrap: wrap; width: 100%; }
        .fg { display: flex; flex-direction: column; gap: 8px; }
        .fgrow { flex: 1; }
        .filter-btns { display: flex; gap: 8px; flex-wrap: wrap; }
        .fg-label { font-size: 11px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #000; }
        .fbtn {
          border: 1.5px solid #000; background: #fff; padding: 11px 16px;
          font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; color: #000;
          display: flex; align-items: center; gap: 8px; white-space: nowrap; position: relative;
          transition: all 0.15s;
        }
        .fbtn.active { background: #000; color: #fff; }
        .fbtn .chev { color: #E31837; font-size: 10px; }
        .fbtn.active .chev { color: #F5C400; }
        .fbtn select { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; }
        .search-wrap { display: flex; width: 100%; }
        .search-input { flex: 1; border: 2px solid #000; padding: 11px 16px; font-size: 14px; font-family: inherit; outline: none; background: #fff; }
        .search-input::placeholder { color: #999; }
        .search-btn { background: #000; border: none; width: 48px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .search-btn svg { width: 18px; height: 18px; fill: white; }
        .toolbar { background: #fff; border-bottom: 2px solid #000; padding: 0; display: flex; align-items: center; gap: 0; min-height: 52px; flex-wrap: wrap; }
        .toolbar > .pg-wrap { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; min-height: 52px; width: 100%; }
        .view-toggle { display: flex; gap: 0; }
        .vtbtn { border: 1.5px solid #000; background: #fff; padding: 0 14px; font-size: 18px; cursor: pointer; font-family: inherit; transition: background 0.15s; height: 36px; display: flex; align-items: center; }
        .vtbtn:first-child { border-right: none; }
        .vtbtn.active { background: #000; color: #fff; }
        .reset-btn { background: none; border: none; cursor: pointer; font-family: inherit; font-size: 13px; font-weight: 600; color: #000; padding: 8px 4px; }
        .reset-btn:hover { opacity: 0.6; }
        .count-label { margin-left: auto; font-size: 13px; color: #555; white-space: nowrap; }
        .count-label strong { color: #000; }
        .dl-btn { border: 1.5px solid #000; background: #fff; padding: 0 16px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 6px; height: 36px; }
        .dl-btn:hover { background: #f5f5f5; }
        .products-section { padding: 28px 0 100px; }
        .cat-header { font-size: 11px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #555; background: #f0f0f0; border-top: 2px solid #000; border-bottom: 1px solid #e0e0e0; padding: 8px 12px; margin: 32px 0 0; display: flex; align-items: center; justify-content: space-between; }
        .cat-header .cat-count { font-size: 11px; color: #aaa; font-weight: 400; letter-spacing: 0; }
        .grid-view { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1px; background: #e0e0e0; }
        .prod-card { background: #fff; display: flex; flex-direction: column; transition: box-shadow 0.2s; cursor: default; }
        .prod-card:hover { box-shadow: 0 0 0 2px #000; z-index: 1; }
        .prod-img { width: 100%; aspect-ratio: 4/3; background: #f0f0f0; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
        .prod-img img { width: 100%; height: 100%; object-fit: contain; padding: 16px; }
        .prod-img .no-img { font-size: 40px; color: #ccc; }
        .img-spinner { width: 28px; height: 28px; border: 3px solid #e0e0e0; border-top-color: #000; border-radius: 50%; animation: spin 0.7s linear infinite; position: absolute; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .prod-img .cat-ribbon { position: absolute; top: 12px; left: 10px; background: #fff; border: 1px solid #000; color: #000; font-size: 10px; font-weight: 700; letter-spacing: 1px; padding: 4px 10px; text-transform: uppercase; }
        .prod-info { padding: 16px; flex: 1; display: flex; flex-direction: column; }
        .prod-name { font-size: 15px; font-weight: 900; color: #000; margin-bottom: 6px; line-height: 1.2; }
        .prod-cal { display: inline-block; background: #F5C400; color: #000; font-size: 10px; font-weight: 800; padding: 3px 8px; letter-spacing: 0.5px; margin-bottom: 10px; }
        .prod-desc { font-size: 12px; color: #555; line-height: 1.6; flex: 1; }
        .prod-footer { padding: 12px 16px; border-top: 1px solid #e0e0e0; display: flex; align-items: center; justify-content: flex-end; }
        .prod-tag { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #999; }
        .enquire-btn { background: #000; color: #fff; border: none; padding: 7px 14px; font-size: 11px; font-weight: 700; cursor: pointer; font-family: inherit; letter-spacing: 0.5px; transition: background 0.15s; text-decoration: none; display: inline-block; }
        .enquire-btn:hover { background: #E31837; }
        .list-view table { width: 100%; border-collapse: collapse; }
        .list-view thead tr { border-top: 2px solid #000; border-bottom: 2px solid #000; }
        .list-view th { padding: 10px 12px; font-size: 11px; font-weight: 700; text-align: left; white-space: nowrap; cursor: pointer; }
        .list-view th:hover { color: #E31837; }
        .list-view td { padding: 8px 12px; border-bottom: 1px solid #e0e0e0; font-size: 13px; vertical-align: middle; }
        .list-view td:first-child { padding: 6px 12px; width: 80px; }
        .list-thumb-wrap { width: 64px; height: 64px; background: #f0f0f0; flex-shrink: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .list-cat { color: #6b7280; }
        .list-type { color: #555; }
        .list-view tr:hover td { background: #000; color: #fff !important; }
        .list-view tr:hover td * { color: #fff !important; }
        .list-view tr:hover .enquire-btn { background: #fff; color: #000 !important; }
        .list-thumb { width: 56px; height: 56px; object-fit: contain; padding: 6px; display: block; }
        .list-no-img { width: 64px; height: 64px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; font-size: 22px; }
        .empty { text-align: center; padding: 60px 20px; }
        .empty h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
        .empty p { color: #555; font-size: 14px; }
        .enq-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 9000; align-items: center; justify-content: center; padding: 20px; }
        .enq-overlay.open { display: flex; }
        .enq-modal { background: #fff; width: 100%; max-width: 520px; padding: 40px; position: relative; max-height: 90vh; overflow-y: auto; }
        .enq-modal-close { position: absolute; top: 16px; right: 20px; font-size: 22px; font-weight: 300; cursor: pointer; color: #555; line-height: 1; background: none; border: none; }
        .enq-modal-close:hover { color: #000; }
        .enq-label { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #c8102e; margin-bottom: 8px; }
        .enq-title { font-size: 20px; font-weight: 900; color: #000; margin-bottom: 6px; line-height: 1.2; }
        .enq-product-name { font-size: 13px; color: #555; margin-bottom: 24px; }
        .enq-field { margin-bottom: 16px; }
        .enq-field label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #333; margin-bottom: 6px; }
        .enq-field input, .enq-field select { width: 100%; padding: 11px 14px; border: 1.5px solid #ccc; font-size: 14px; font-family: inherit; outline: none; box-sizing: border-box; transition: border-color 0.15s; background: #fff; appearance: none; -webkit-appearance: none; }
        .enq-field input:focus, .enq-field select:focus { border-color: #000; }
        .enq-select-wrap { position: relative; }
        .enq-select-wrap::after { content: ''; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid #000; pointer-events: none; }
        .enq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .enq-submit { width: 100%; background: #000; color: #fff; border: none; padding: 14px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; margin-top: 8px; transition: background 0.15s; }
        .enq-submit:hover { background: #c8102e; }
        .enq-success { text-align: center; padding: 24px 0; }
        .enq-success-icon { font-size: 40px; margin-bottom: 12px; }
        .enq-success h3 { font-size: 20px; font-weight: 900; margin-bottom: 8px; }
        .enq-success p { font-size: 14px; color: #555; }
        @media (max-width: 767px) {
          .products-hero { padding: 24px 0 0; }
          .filter-bar { padding: 16px 0 20px; flex-direction: column; align-items: stretch; gap: 16px; }
          .filter-bar > .pg-wrap { flex-direction: column; align-items: stretch; gap: 16px; }
          .filter-bar .fg[style] { flex: 0 0 auto !important; width: 100% !important; }
          .fbtn { width: 100%; }
          .grid-view { grid-template-columns: repeat(2, 1fr); }
          .enq-grid { grid-template-columns: 1fr; }
          .enq-modal { padding: 28px 20px; }
        }
        @media (max-width: 420px) {
          .grid-view { grid-template-columns: 1fr; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .grid-view { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      {/* HERO */}
      <div className="products-hero">
        <div className="pg-wrap">
          <h1>Product catalogue</h1>
          <div className="sub">Defence-grade ammunition, munitions &amp; ordnance supply</div>
          <div className="notice-box">
            Defence Trading supplies military and defence products through its licensed procurement network. All equipment is sourced exclusively from officially licensed and certified manufacturers and suppliers. Transactions are conducted in compliance with applicable export control regulations, end-user certification requirements, and relevant government authorisations. Please contact Defence Trading directly for pricing, availability, and compliance documentation.
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filter-bar">
        <div className="pg-wrap">
          <div className="fg">
            <div className="fg-label">Category</div>
            <div className="filter-btns">
              <button className={`fbtn${category === '' ? ' active' : ''}`} onClick={() => setCategory('')}>
                {category || 'All categories'} <span className="chev">▼</span>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">All categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </button>
            </div>
          </div>
          <div className="fg" style={{flex:'0 0 380px'}}>
            <div className="fg-label">Find products by</div>
            <div className="search-wrap">
              <input
                className="search-input"
                type="text"
                placeholder="Search by name or calibre..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className="search-btn">
                <svg viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.15 6.15a7.5 7.5 0 0 0 10.5 10.5z" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar">
        <div className="pg-wrap">
          <div className="view-toggle">
            <button className={`vtbtn${view === 'grid' ? ' active' : ''}`} onClick={() => setView('grid')} title="Grid view">⊞</button>
            <button className={`vtbtn${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')} title="List view">☰</button>
          </div>
          <button className="dl-btn" onClick={exportCSV}>⬇ Download</button>
          <button className="reset-btn" onClick={() => { setSearch(''); setCategory('') }}>↺ Reset all</button>
          <div className="count-label">Showing <strong>{filtered.length}</strong> products</div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="products-section">
        <div className="pg-wrap">
          {filtered.length === 0 && (
            <div className="empty">
              <h3>No products found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}

          {/* GRID VIEW */}
          {view === 'grid' && filtered.length > 0 && (
            <div>
              {CATEGORIES.filter(cat => grouped[cat]?.length).map(cat => (
                <div key={cat}>
                  <div className="cat-header">
                    <span>{cat}</span>
                    <span className="cat-count">{grouped[cat].length} item{grouped[cat].length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="grid-view">
                    {grouped[cat].map(p => (
                      <div key={p.id} className="prod-card">
                        <div className="prod-img">
                          {!imgErrors[p.id] ? (
                            <>
                              {!imgLoaded[p.id] && <div className="img-spinner" />}
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={p.img}
                                alt={p.name}
                                style={imgLoaded[p.id] ? {} : { opacity: 0, position: 'absolute' }}
                                onLoad={() => setImgLoaded(prev => ({ ...prev, [p.id]: true }))}
                                onError={() => { setImgErrors(prev => ({ ...prev, [p.id]: true })); setImgLoaded(prev => ({ ...prev, [p.id]: true })) }}
                              />
                            </>
                          ) : (
                            <span className="no-img">📦</span>
                          )}
                          <div className="cat-ribbon">{p.type}</div>
                        </div>
                        <div className="prod-info">
                          <div className="prod-name">{p.name}</div>
                          <span className="prod-cal">{p.calibre}</span>
                          <div className="prod-desc">{p.desc}</div>
                        </div>
                        <div className="prod-footer">
                          <button className="enquire-btn" onClick={() => { setEnquiryProduct(p); setEnquirySubmitted(false); setEnquiryError(false) }}>Enquire →</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LIST VIEW */}
          {view === 'list' && filtered.length > 0 && (
            <div className="list-view">
              <table>
                <thead>
                  <tr>
                    <th style={{width:'60px'}}></th>
                    <th onClick={() => sortList('name')}>Product Name</th>
                    <th onClick={() => sortList('calibre')}>Calibre</th>
                    <th onClick={() => sortList('category')}>Category</th>
                    <th onClick={() => sortList('type')}>Type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {CATEGORIES.flatMap(cat => grouped[cat] ?? []).map(p => (
                    <tr key={p.id}>
                      <td>
                        <div className="list-thumb-wrap" style={{position:'relative'}}>
                          {!imgErrors[p.id] ? (
                            <>
                              {!imgLoaded[p.id] && <div className="img-spinner" style={{width:20,height:20,borderWidth:2}} />}
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                className="list-thumb"
                                src={p.img}
                                alt={p.name}
                                style={imgLoaded[p.id] ? {} : { opacity: 0, position: 'absolute' }}
                                onLoad={() => setImgLoaded(prev => ({ ...prev, [p.id]: true }))}
                                onError={() => { setImgErrors(prev => ({ ...prev, [p.id]: true })); setImgLoaded(prev => ({ ...prev, [p.id]: true })) }}
                              />
                            </>
                          ) : (
                            <div className="list-no-img">📦</div>
                          )}
                        </div>
                      </td>
                      <td style={{fontWeight:700}}>{p.name}</td>
                      <td>{p.calibre}</td>
                      <td className="list-cat">{p.category}</td>
                      <td className="list-type">{p.type}</td>
                      <td>
                        <button className="enquire-btn" onClick={() => { setEnquiryProduct(p); setEnquirySubmitted(false); setEnquiryError(false) }}>Enquire →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ENQUIRY MODAL */}
      <div className={`enq-overlay${enquiryProduct ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) setEnquiryProduct(null) }}>
        <div className="enq-modal">
          <button className="enq-modal-close" onClick={() => setEnquiryProduct(null)}>×</button>
          {enquiryProduct && !enquirySubmitted && (
            <>
              <div className="enq-label">Product Enquiry</div>
              <div className="enq-title">Request Information</div>
              <div className="enq-product-name">{enquiryProduct.name} — {enquiryProduct.calibre}</div>
              <form onSubmit={handleEnquirySubmit}>
                <div className="enq-grid">
                  <div className="enq-field">
                    <label>Full Name *</label>
                    <input type="text" name="full_name" placeholder="Full name" required />
                  </div>
                  <div className="enq-field">
                    <label>Company Name *</label>
                    <input type="text" name="company" placeholder="Company / Government body" required />
                  </div>
                </div>
                <div className="enq-field">
                  <label>Country *</label>
                  <div className="enq-select-wrap">
                    <select name="country" required defaultValue="">
                      <option value="" disabled>Select country</option>
                      {['United Arab Emirates','Saudi Arabia','Qatar','Kuwait','Bahrain','Oman','United States','United Kingdom','Germany','France','Poland','Turkey','Israel','India','Pakistan','Egypt','Jordan','Morocco','Nigeria','South Africa','Other'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="enq-grid">
                  <div className="enq-field">
                    <label>Business Email *</label>
                    <input type="email" name="email" placeholder="Work email address" required />
                  </div>
                  <div className="enq-field">
                    <label>WhatsApp Number *</label>
                    <input type="tel" name="whatsapp" placeholder="+1 000 000 0000" required />
                  </div>
                </div>
                {enquiryError && <div style={{color:'#E31837',fontSize:'13px',marginBottom:'8px'}}>Something went wrong — please try again.</div>}
                <button type="submit" className="enq-submit" disabled={enquirySubmitting}>
                  {enquirySubmitting ? 'Sending…' : 'Send Enquiry →'}
                </button>
              </form>
            </>
          )}
          {enquiryProduct && enquirySubmitted && (
            <div className="enq-success">
              <div className="enq-success-icon"></div>
              <h3>Enquiry Submitted</h3>
              <p>Our procurement team will review your request and respond within 2 business days.</p>
            </div>
          )}
        </div>
      </div>

      <SubscribeStrip />
    </>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{padding:'80px',textAlign:'center'}}>Loading…</div>}>
      <ProductsContent />
    </Suspense>
  )
}
