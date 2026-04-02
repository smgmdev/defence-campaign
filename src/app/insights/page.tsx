'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ARTICLES } from '@/lib/articles'

const SHOW_INITIAL = 7

export default function InsightsPage() {
  const [activeCat, setActiveCat] = useState('all')
  const [activeRegion, setActiveRegion] = useState('all')
  const [regionLabel, setRegionLabel] = useState('All')
  const [showing, setShowing] = useState(SHOW_INITIAL)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [heroImgLoaded, setHeroImgLoaded] = useState(false)
  const [searchQ, setSearchQ] = useState('')

  useEffect(() => {
    const img = new Image()
    img.onload = () => setHeroImgLoaded(true)
    img.onerror = () => setHeroImgLoaded(true)
    img.src = '/adnoc-hero.jpg'
  }, [])

  function filterTab(cat: string) {
    setActiveCat(cat)
    setShowing(SHOW_INITIAL)
  }

  function filterRegion(val: string) {
    setActiveRegion(val)
    setRegionLabel(val === 'all' ? 'All' : val)
    setShowing(SHOW_INITIAL)
  }

  function getFiltered() {
    const q = searchQ.toLowerCase().trim()
    return ARTICLES.filter(a => {
      const catMatch = activeCat === 'all' || a.cat === activeCat
      const regMatch = activeRegion === 'all' || a.region === activeRegion
      const searchMatch = !q || a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.keywords.toLowerCase().includes(q)
      return catMatch && regMatch && searchMatch
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const filtered = getFiltered()
  const total = filtered.length
  const visible = filtered.slice(0, showing)

  function showSubToast(msg: string) {
    setToastMsg(msg)
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
        f.querySelector('.sub-footer-row')?.setAttribute('style', 'display:none')
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
        .hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 480px; }
        .hero-left {
          background: #000; padding: 80px 0; display: flex; flex-direction: column; justify-content: center;
        }
        .hero-left h1 {
          font-size: clamp(32px, 4.5vw, 56px); font-weight: 900; color: #fff;
          line-height: 1.0; letter-spacing: -1.5px; margin-bottom: 24px;
        }
        .hero-left p {
          font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 420px; margin-bottom: 36px;
        }
        .hero-right {
          background: url('/adnoc-hero.jpg') center/cover no-repeat;
          min-height: 480px; position: relative;
        }
        .hero-right-spinner {
          display: flex; align-items: center; justify-content: center;
          position: absolute; inset: 0; background: #111;
          transition: opacity 0.4s;
        }
        .hero-right-spinner.loaded { opacity: 0; pointer-events: none; }
        .hero-right-spinner svg { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .tab-nav {
          background: #fff; border-bottom: 1px solid #e0e0e0;
          padding: 0 40px; display: flex; align-items: flex-end; gap: 0;
          position: sticky; top: 0; z-index: 90;
          overflow-x: auto; scrollbar-width: none;
        }
        .tab-nav::-webkit-scrollbar { display: none; }
        .tab-btn-insights {
          background: transparent; border: none; border-left: 1px solid transparent; border-right: 1px solid transparent;
          border-top: 1px solid transparent; border-radius: 0;
          padding: 16px 22px; font-size: 14px; font-weight: 600; color: #666;
          cursor: pointer; font-family: inherit; white-space: nowrap;
          margin-bottom: -1px; transition: color 0.15s, background 0.15s, border-color 0.15s;
        }
        .tab-btn-insights:hover { color: #1a1a1a; }
        .tab-btn-insights.active {
          background: #fff; color: #000;
          border-color: #e0e0e0; border-bottom-color: #fff;
        }
        .content-wrap { max-width: 900px; margin: 0; padding: 56px 0 24px; }
        .filter-search-row { display: flex; align-items: flex-end; gap: 24px; margin-bottom: 20px; }
        .filter-by { margin-bottom: 0; flex-shrink: 0; }
        .filter-by-label { font-size: 13px; color: #666; margin-bottom: 8px; }
        .filter-dropdown-wrap { position: relative; display: inline-block; }
        .filter-dropdown-display {
          display: flex; align-items: center; gap: 10px;
          font-size: 32px; font-weight: 900; color: #000; letter-spacing: -1px;
          border-bottom: 2px solid #000; padding-bottom: 4px; cursor: pointer;
        }
        .filter-dropdown-display .fd-chev { color: #E31837; font-size: 20px; font-weight: 400; }
        .filter-dropdown-wrap select {
          position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; font-size: 16px;
        }
        .article-list {}
        .article-item { padding: 36px 0; border-bottom: 1px solid #e0e0e0; display: block; cursor: pointer; }
        .insights-search { position: relative; flex: 1; }
        .insights-search-input { width: 100%; padding: 14px 44px 14px 16px; font-size: 15px; font-family: inherit; border: 1px solid #e0e0e0; background: #fff; outline: none; transition: border-color 0.15s; }
        .insights-search-input:focus { border-color: #000; }
        .insights-search-input::placeholder { color: #aaa; }
        .insights-search-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #999; pointer-events: none; }
        .article-item:first-child { border-top: none; }
        .article-item:last-child { border-bottom: none; }
        .art-source {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;
          color: #000; margin-bottom: 16px;
        }
        .art-source-icon {
          width: 18px; height: 18px; background: #000; border-radius: 2px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .art-source-icon svg { width: 10px; height: 10px; fill: white; }
        .art-title {
          font-size: clamp(22px, 3vw, 30px); font-weight: 900; color: #000;
          line-height: 1.1; letter-spacing: -0.5px; margin-bottom: 14px;
          text-decoration: none; display: block;
        }
        .art-title:hover { color: #E31837; }
        .art-date { font-size: 13px; color: #666; }
        .load-more-wrap { margin-top: 20px; display: flex; align-items: center; gap: 20px; }
        .load-more-btn {
          background: #000; color: #fff; border: none;
          padding: 13px 28px; font-size: 13px; font-weight: 700;
          cursor: pointer; font-family: inherit; transition: background 0.15s;
        }
        .load-more-btn:hover { background: #222; }
        .showing-label { font-size: 13px; color: #666; }
        @media (max-width: 767px) {
          .hero { grid-template-columns: 1fr; width: 100%; }
          .hero { min-height: 240px; }
          .hero-left { padding: 24px 20px; align-items: flex-start; text-align: left; }
          .hero-left h1, .hero-left p { text-align: left; }
          .hero-right { display: none; }
          .tab-nav { padding: 0 16px; }
          .tab-btn-insights { padding: 14px 14px; font-size: 13px; }
          .content-wrap { padding: 36px 0 56px; }
          .filter-dropdown-display { font-size: 24px; }
          .filter-search-row { flex-direction: column; align-items: stretch; gap: 16px; }
          .art-title { font-size: 22px; }
        }
      `}</style>

      {/* HERO */}
      <div className="hero">
        <div className="hero-left">
          <div className="pg-wrap">
            <h1>Defence Trading&apos;s Global Insights</h1>
            <p>Our latest intelligence, analysis, and commentary on the global defence procurement market — covering industry news, regulatory updates, and geopolitical shifts.</p>
          </div>
        </div>
        <div className="hero-right" id="hero-right">
          <div className={`hero-right-spinner${heroImgLoaded ? ' loaded' : ''}`}>
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3"/>
              <path d="M16 4 A12 12 0 0 1 28 16" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* TAB NAV */}
      <div className="tab-nav">
        <button className={`tab-btn-insights${activeCat === 'all' ? ' active' : ''}`} onClick={() => filterTab('all')}>All Insights</button>
        <button className={`tab-btn-insights${activeCat === 'industry' ? ' active' : ''}`} onClick={() => filterTab('industry')}>Industry News</button>
        <button className={`tab-btn-insights${activeCat === 'market' ? ' active' : ''}`} onClick={() => filterTab('market')}>Market Analysis</button>
        <button className={`tab-btn-insights${activeCat === 'geo' ? ' active' : ''}`} onClick={() => filterTab('geo')}>Geopolitical</button>
      </div>

      {/* CONTENT */}
      <div className="pg-wrap">
        <div className="content-wrap">
          <div className="filter-search-row">
            <div className="filter-by">
              <div className="filter-by-label">Filter by:</div>
              <div className="filter-dropdown-wrap">
                <div className="filter-dropdown-display">
                  <span>{regionLabel}</span>
                  <span className="fd-chev">&#8964;</span>
                </div>
                <select onChange={e => filterRegion(e.target.value)} value={activeRegion}>
                  <option value="all">All</option>
                  <option value="Middle East">Middle East</option>
                  <option value="Europe">Europe</option>
                  <option value="North America">North America</option>
                  <option value="Global">Global</option>
                </select>
              </div>
            </div>
            <div className="insights-search">
            <input
              className="insights-search-input"
              type="text"
              placeholder="Search articles..."
              value={searchQ}
              onChange={e => { setSearchQ(e.target.value); setShowing(SHOW_INITIAL) }}
            />
            <svg className="insights-search-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="7"/><line x1="15" y1="15" x2="19" y2="19"/></svg>
            </div>
          </div>

          <div className="article-list">
            {visible.map((a, idx) => (
              <div key={idx} className="article-item">
                <div className="art-source">
                  <div className="art-source-icon">
                    <svg viewBox="0 0 10 10"><rect x="1" y="1" width="3" height="3"/><rect x="6" y="1" width="3" height="3"/><rect x="1" y="6" width="3" height="3"/><rect x="6" y="6" width="3" height="3"/></svg>
                  </div>
                  {a.source}
                </div>
                <Link className="art-title" href={`/insights/${a.slug}`}>{a.title}</Link>
                <div className="art-date">{a.date} · <span style={{color:'#999'}}>{a.region}</span></div>
              </div>
            ))}
          </div>

          <div className="load-more-wrap">
            {showing < total && (
              <button className="load-more-btn" onClick={() => setShowing(s => s + 4)}>Load more insights</button>
            )}
            <div className="showing-label">Showing {Math.min(showing, total)} of {total} insights</div>
          </div>
        </div>
      </div>

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
              <input type="checkbox" id="sub-consent-insights" required />
              <label htmlFor="sub-consent-insights">Please click here to opt-in to receiving procurement insights and marketing communications from Defence Trading. Data collected will be processed in accordance with our privacy notice. You may unsubscribe at any time.</label>
            </div>
            <div className="sub-footer-row">
              <div className="sub-required">*Required information &nbsp;|&nbsp; Read our <Link href="/privacy">Privacy notice</Link></div>
              <button type="submit" className="sub-btn">Subscribe to Defence Trading</button>
            </div>
          </form>
        </div>
      </div>

      <div className={`sub-toast${toastVisible ? ' show' : ''}`}>{toastMsg}</div>
    </>
  )
}
