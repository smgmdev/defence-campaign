'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('tab-services')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  function switchTab(tabId: string) {
    setActiveTab(tabId)
  }

  function toggleFaq(idx: number) {
    setOpenFaq(openFaq === idx ? null : idx)
  }

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
    const location = (f.querySelector('select') as HTMLSelectElement)?.value.trim()
    const btn = f.querySelector('.sub-btn') as HTMLButtonElement
    const orig = btn.textContent
    btn.disabled = true
    btn.textContent = 'Submitting…'
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, location })
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

  const faqs = [
    {
      q: 'What documentation is required to purchase?',
      a: 'All transactions require valid end-user certificates (EUC), government authorisation where applicable, and full KYC documentation. We work with clients to ensure all compliance requirements are met before any transaction proceeds.'
    },
    {
      q: 'Which markets does Defence Trading serve?',
      a: 'We serve clients across the Middle East, Europe, Africa, Asia, and the Americas. Our trade routes are established and our regulatory compliance covers cross-border procurement across these regions. Each transaction is assessed individually for export licensing requirements.'
    },
    {
      q: 'Can Defence Trading fulfil custom or large-volume orders?',
      a: 'Yes. Defence Trading works with a network of established and licensed manufacturers, producers, and suppliers capable of fulfilling custom specifications and large-volume orders. We connect clients with the most suitable production partners for their requirements and coordinate sourcing based on client-provided technical specifications for uniforms, protective equipment, and certain munitions components, ensuring access to reliable large-scale production capacity.'
    },
    {
      q: 'How do I start a procurement inquiry?',
      a: 'Navigate to the product section and submit an inquiry directly from the product catalogue, or contact our sales team for assistance. Our team will review your requirements and respond with information regarding pricing, availability, and applicable compliance or documentation requirements.'
    },
  ]

  return (
    <>
      <style>{`
        /* HERO */
        .hero {
          position: relative; height: 580px;
          display: flex; align-items: center; overflow: hidden;
        }
        .hero-bg { position: absolute; inset: 0; overflow: hidden; }
        .hero-bg video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%);
        }
        .hero-content { position: relative; z-index: 1; padding: 0; max-width: 780px; }
        .hero-content h1 {
          font-size: clamp(32px, 5.5vw, 62px); font-weight: 900; color: #fff;
          line-height: 1.0; letter-spacing: -1.5px; margin-bottom: 24px;
        }
        .hero-content p {
          font-size: clamp(14px, 1.8vw, 18px); color: rgba(255,255,255,0.8);
          line-height: 1.3; max-width: 520px;
        }
        .hero-cta { margin-top: 32px; display: flex; gap: 12px; flex-wrap: wrap; }

        /* CONTACT BANNER */
        .contact-banner { background: #f0ebe1; border-bottom: 1px solid #e0e0e0; }
        .contact-banner .pg-wrap { display: flex; align-items: center; justify-content: space-between; padding-top: 24px; padding-bottom: 24px; }
        .contact-banner-text { font-size: 18px; font-weight: 700; color: #000; }
        .contact-banner-btn { background: #000; color: #fff; text-decoration: none; padding: 14px 28px; font-size: 14px; font-weight: 700; white-space: nowrap; transition: background 0.15s; }
        .contact-banner-btn:hover { background: #333; }

        /* WHY SECTION */
        .why-section { border-bottom: 1px solid #e0e0e0; }
        .why-section .pg-wrap { padding-top: 72px; padding-bottom: 72px; }
        .why-heading { font-size: clamp(28px, 3.5vw, 46px); font-weight: 900; color: #000; line-height: 1.05; letter-spacing: -1px; margin-bottom: 24px; max-width: 680px; }
        .why-body { font-size: 15px; color: #1a1a1a; line-height: 1.7; max-width: 760px; }

        /* TABS */
        .tabs-nav { display: flex; border-bottom: 2px solid #e0e0e0; margin-top: 40px; margin-bottom: 40px; }
        .tab-btn-about { background: none; border: none; padding: 14px 24px 14px 0; font-size: 15px; font-weight: 600; color: #666; cursor: pointer; border-bottom: 3px solid transparent; margin-bottom: -2px; transition: all 0.15s; font-family: inherit; }
        .tab-btn-about:hover { color: #000; }
        .tab-btn-about.active { color: #000; border-bottom-color: #000; }
        .tab-panel { display: none; }
        .tab-panel.active { display: block; }
        .tab-panel-title { font-size: clamp(22px, 2.5vw, 32px); font-weight: 900; color: #000; margin-bottom: 16px; letter-spacing: -0.5px; }
        .tab-panel-body { font-size: 15px; color: #1a1a1a; line-height: 1.7; max-width: 720px; margin-bottom: 20px; }
        .tab-panel-label { font-size: 14px; font-weight: 700; color: #000; margin-bottom: 12px; }
        .tab-list { list-style: disc; padding-left: 20px; display: flex; flex-direction: column; gap: 8px; }
        .tab-list li { font-size: 14px; color: #1a1a1a; line-height: 1.6; }

        /* FAQ */
        .faq-section { border-bottom: 1px solid #e0e0e0; }
        .faq-section > .pg-wrap { padding-top: 72px; padding-bottom: 72px; }
        .faq-header { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; margin-bottom: 48px; align-items: end; }
        .faq-header h2 { font-size: clamp(24px, 3vw, 38px); font-weight: 900; color: #000; line-height: 1.1; letter-spacing: -0.5px; margin-top: 12px; }
        .faq-list { border-top: 2px solid #000; }
        .faq-item { border-bottom: 1px solid #e0e0e0; }
        .faq-q {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 0; cursor: pointer; font-size: 15px; font-weight: 700;
          color: #000; gap: 20px; user-select: none;
        }
        .faq-q:hover { color: #E31837; }
        .faq-icon { font-size: 22px; font-weight: 300; transition: transform 0.2s; flex-shrink: 0; color: #000; }
        .faq-item.open .faq-icon { transform: rotate(45deg); }
        .faq-a { display: none; padding: 0 48px 22px 0; font-size: 14px; color: #666; line-height: 1.8; }
        .faq-item.open .faq-a { display: block; }
        .section-eyebrow { font-size: 10px; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; color: #555; }

        @media (max-width: 767px) {
          .hero { height: 420px; }
          .hero-content { padding: 0; }
          .contact-banner .pg-wrap { flex-direction: column; align-items: flex-start; gap: 16px; }
          .why-section .pg-wrap { padding-top: 48px; padding-bottom: 48px; }
          .faq-section > .pg-wrap { padding-top: 48px; padding-bottom: 48px; }
          .faq-header { grid-template-columns: 1fr; gap: 16px; }
          .tab-btn-about { padding: 12px 16px 12px 0; font-size: 14px; }
        }
      `}</style>

      {/* HERO */}
      <div className="hero">
        <div className="hero-bg">
          <video autoPlay muted loop playsInline onCanPlay={() => setVideoLoaded(true)}>
            <source src="/hero-bg-about.mp4" type="video/mp4" />
          </video>
          {!videoLoaded && (
            <div style={{position:'absolute',bottom:'24px',left:'24px',zIndex:10,width:'28px',height:'28px'}}>
              <svg viewBox="0 0 28 28" style={{width:'28px',height:'28px',animation:'spin 1s linear infinite'}} xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="11" fill="none" stroke="rgba(180,180,180,0.3)" strokeWidth="2.5"/>
                <path d="M14 3 A11 11 0 0 1 25 14" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          )}
        </div>
        <div className="hero-overlay"></div>
        <div className="pg-wrap" style={{position:'relative',zIndex:1,width:'100%'}}>
          <div className="hero-content">
            <h1>Connecting the world&apos;s defence supply chains</h1>
            <p>We support governments, armed forces, and defence contractors by facilitating access to certified military and defence products across the Middle East, Europe, Africa, and global markets through established procurement and supply networks.</p>
            <div className="hero-cta">
              <Link href="/products" className="btn-yellow">View Product Catalogue</Link>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT BANNER */}
      <div className="contact-banner">
        <div className="pg-wrap">
          <span className="contact-banner-text">Contact our procurement team</span>
          <Link href="/contact" className="contact-banner-btn">Contact us →</Link>
        </div>
      </div>

      {/* WHY SECTION */}
      <div className="why-section">
        <div className="pg-wrap">
          <h2 className="why-heading">Why Defence Trading for procurement?</h2>
          <p className="why-body">Our team works directly with governments, armed forces, and defence contractors to facilitate access to certified military products through compliant procurement channels. We coordinate with licensed manufacturers and authorised suppliers across multiple jurisdictions, providing clients with the documentation, traceability, and regulatory certainty required for defence procurement at government level.</p>

          <h2 className="why-heading" style={{marginTop:'64px'}}>Learn more about Defence Trading</h2>

          {/* TABS */}
          <div className="tabs-nav">
            <button className={`tab-btn-about${activeTab === 'tab-services' ? ' active' : ''}`} onClick={() => switchTab('tab-services')}>Our services</button>
            <button className={`tab-btn-about${activeTab === 'tab-clients' ? ' active' : ''}`} onClick={() => switchTab('tab-clients')}>Our clients</button>
            <button className={`tab-btn-about${activeTab === 'tab-team' ? ' active' : ''}`} onClick={() => switchTab('tab-team')}>Our team</button>
          </div>

          <div className={`tab-panel${activeTab === 'tab-services' ? ' active' : ''}`} id="tab-services">
            <h3 className="tab-panel-title">Our services</h3>
            <p className="tab-panel-body">Defence Trading connects governments, armed forces, and institutional procurement agencies with authorised and licensed military product suppliers, armament producers, and heavy defence manufacturers. We act as a trusted intermediary, ensuring that every supply relationship is conducted through verified, compliant, and fully licensed channels — from initial sourcing through to final delivery.</p>
            <p className="tab-panel-label">Our core services include:</p>
            <ul className="tab-list">
              <li>Access to licensed military and armament suppliers across global markets</li>
              <li>Connections to certified heavy defence manufacturers and OEMs</li>
              <li>End-to-end procurement coordination and supplier due diligence</li>
              <li>Export control compliance and regulatory documentation</li>
              <li>End-user certification and government authorisation management</li>
              <li>Logistics, freight, and delivery coordination for sensitive cargo</li>
            </ul>
          </div>

          <div className={`tab-panel${activeTab === 'tab-clients' ? ' active' : ''}`} id="tab-clients">
            <h3 className="tab-panel-title">Our clients</h3>
            <p className="tab-panel-body">We work with a broad range of institutional clients who require certified defence products and reliable supply chains.</p>
            <p className="tab-panel-label">Our client base includes:</p>
            <ul className="tab-list">
              <li>National governments and ministries of defence</li>
              <li>Armed forces and military procurement agencies</li>
              <li>Prime defence contractors and system integrators</li>
              <li>Law enforcement and border security agencies</li>
              <li>International peacekeeping and security organisations</li>
            </ul>
          </div>

          <div className={`tab-panel${activeTab === 'tab-team' ? ' active' : ''}`} id="tab-team">
            <h3 className="tab-panel-title">Our team</h3>
            <p className="tab-panel-body">Defence Trading is supported by a team with extensive experience in international trade, defence procurement coordination, and global supply chain operations. Our professionals work across multiple regions, connecting clients with trusted manufacturers and suppliers while managing complex procurement and logistics requirements.</p>
            <p className="tab-panel-label">Core capabilities include:</p>
            <ul className="tab-list">
              <li>International trade and cross-border procurement coordination</li>
              <li>Import and export operations across multiple jurisdictions</li>
              <li>Global logistics, shipping, and supply chain management</li>
              <li>Supplier sourcing and coordination with certified manufacturers</li>
              <li>Technical product knowledge across defence supply categories</li>
              <li>Contract coordination and large-scale procurement support</li>
              <li>Multi-region trade route and delivery management</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <div className="pg-wrap">
          <div className="faq-header">
            <div>
              <div className="section-eyebrow">FAQ</div>
              <h2>Common Questions</h2>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item${openFaq === idx ? ' open' : ''}`}>
                <div className="faq-q" onClick={() => toggleFaq(idx)}>
                  {faq.q}<span className="faq-icon">+</span>
                </div>
                <div className="faq-a">{faq.a}</div>
              </div>
            ))}
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
              <input type="checkbox" id="sub-consent-about" required />
              <label htmlFor="sub-consent-about">Please click here to opt-in to receiving procurement insights and marketing communications from Defence Trading. Data collected will be processed in accordance with our privacy notice. You may unsubscribe at any time.</label>
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
