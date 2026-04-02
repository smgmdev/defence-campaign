import type { Metadata } from 'next'
import Link from 'next/link'
import SubscribeStrip from '@/components/SubscribeStrip'

export const metadata: Metadata = {
  title: 'Strategic Defence Solutions',
  description: 'Defence Trading delivers custom strategic defence solutions across ground and air domains — bespoke equipment packages, tiered procurement programmes, and multi-purpose operational configurations for governments and licensed defence enterprises.',
}

const SERVICES = [
  {
    label: 'Ground Forces',
    sub: 'Infantry · Armour · Artillery · Force Protection',
    desc: 'From individual infantry kits to full armoured platform packages — we source, configure, and deliver ground force equipment to operational specifications. Small arms, crew-served weapons, ammunition, protective equipment, mortar systems, armoured vehicles, and counter-IED solutions.',
    link: '/products',
    linkLabel: 'Browse Ground Products',
  },
  {
    label: 'Air & Counter-UAV',
    sub: 'UAS · Counter-Drone · ISR · Electronic Warfare',
    desc: 'Unmanned aerial systems, autonomous AI-guided drone interceptors, aerial surveillance platforms, and electronic warfare packages. Our counter-UAV interceptors deliver 360° radar coverage with ≥90% recognition rates, operational from −20°C to +60°C.',
    link: '/products?cat=Drone%20Interceptor',
    linkLabel: 'View Counter-UAV Systems',
  },
  {
    label: 'Logistics & Sustainment',
    sub: 'Ammunition · Storage · Resupply · Maintenance',
    desc: 'Ammunition storage systems, maintenance kits, field resupply packages, and sustainment chains designed for extended operational deployment. Transport containers, packaging solutions, and forward-base logistics infrastructure.',
    link: '/products?cat=Ammo%20Boxes%20%26%20Tubes',
    linkLabel: 'View Logistics Products',
  },
  {
    label: 'AI & Command Systems',
    sub: 'Precision Targeting · Situational Awareness · C2',
    desc: 'AI-powered precision targeting, fire control systems, communications equipment, and situational awareness platforms. Integrated command and control solutions for joint force operations across multiple domains.',
    link: '/products?cat=AI%20Systems',
    linkLabel: 'View AI Systems',
  },
]

const STATS = [
  { value: '34+', label: 'Certified Products' },
  { value: '14', label: 'Product Categories' },
  { value: '4', label: 'Operational Domains' },
  { value: '3', label: 'Procurement Tiers' },
]

const TIERS = [
  {
    tier: 'Tier I',
    name: 'Standard Configuration',
    desc: 'Off-catalogue supply of certified, in-production equipment from verified manufacturers. Standard specifications, established lead times, and full export documentation.',
    items: ['Catalogue product selection', 'Standard packaging & markings', 'Export documentation included', 'Delivery to agreed incoterms', 'Quality certificates provided'],
  },
  {
    tier: 'Tier II',
    name: 'Modified Configuration',
    desc: 'Factory-modified or field-adapted variants configured to client specifications. Calibre changes, optical fit, suppressor compatibility, and integration with existing platforms.',
    items: ['Custom calibre or ammunition type', 'Optics & accessories integration', 'Platform modification packages', 'Extended lead time provisioning', 'Dedicated programme manager'],
  },
  {
    tier: 'Tier III',
    name: 'Bespoke Programme',
    desc: 'End-to-end custom defence programmes for complex, multi-domain requirements. Full needs assessment, manufacturer coordination, phased delivery, and operational integration support.',
    items: ['Needs assessment & scoping', 'Multi-manufacturer coordination', 'Phased delivery scheduling', 'In-country delivery support', 'Training & integration packages', 'Long-term sustainment options'],
  },
]

export default function StrategicDefenceSolutionsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="sds-hero">
        <div className="pg-wrap sds-hero-inner">
          <p className="sds-hero-tag">Defence Trading — Offerings</p>
          <h1 className="sds-hero-h1">The Equipment Advantage</h1>
          <p className="sds-hero-body">
            Defence-grade procurement capability built over years of sourcing certified military products through compliant channels — for governments and licensed defence enterprises operating across any theatre.
          </p>
          <div className="sds-hero-cta-row">
            <Link href="/products" className="sds-hero-btn-primary"><span>Explore Products</span></Link>
            <Link href="/contact" className="sds-hero-btn-ghost">Contact Us →</Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="sds-stats-bar">
        <div className="pg-wrap">
          <div className="sds-stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="sds-stat">
                <div className="sds-stat-value">{s.value}</div>
                <div className="sds-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCOVER BY SERVICE ── */}
      <section className="sds-services">
        <div className="pg-wrap">
          <p className="sds-section-tag">Discover by Domain</p>
          <h2 className="sds-section-h2">Multi-domain defence procurement across ground, air, and joint operations.</h2>
        </div>
        <div className="sds-service-blocks">
          {SERVICES.map((s, i) => (
            <div key={i} className="sds-service">
              <div className="pg-wrap sds-service-inner">
                <div className="sds-service-left">
                  <div className="sds-service-num">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="sds-service-title">{s.label}</h3>
                  <p className="sds-service-sub">{s.sub}</p>
                </div>
                <div className="sds-service-right">
                  <p className="sds-service-desc">{s.desc}</p>
                  <Link href={s.link} className="sds-service-link">{s.linkLabel} →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUOTE / AUTHORITY SECTION ── */}
      <section className="sds-quote-section">
        <div className="pg-wrap">
          <blockquote className="sds-quote">
            &ldquo;We work exclusively with sovereign governments, national armed forces, and fully licensed defence enterprises. No exceptions. No discretionary waivers.&rdquo;
          </blockquote>
          <p className="sds-quote-attr">Defence Trading — Counterparty Policy</p>
          <Link href="/who-we-work-with" className="sds-quote-link">Who We Work With →</Link>
        </div>
      </section>

      {/* ── PROCUREMENT TIERS ── */}
      <section className="sds-tiers-section">
        <div className="pg-wrap">
          <p className="sds-section-tag sds-section-tag--light">Procurement Structure</p>
          <h2 className="sds-section-h2 sds-section-h2--light">Three tiers of solution capability</h2>
          <p className="sds-tiers-intro">Every client requirement is unique. Our tiered framework allows us to deliver at any level — from fast standard supply to fully bespoke multi-phase programmes.</p>
        </div>
        <div className="pg-wrap">
          <div className="sds-tiers-grid">
            {TIERS.map((t, i) => (
              <div key={i} className={`sds-tier-card${i === 2 ? ' sds-tier-card--accent' : ''}`}>
                <div className="sds-tier-badge">{t.tier}</div>
                <h3 className="sds-tier-name">{t.name}</h3>
                <p className="sds-tier-desc">{t.desc}</p>
                <ul className="sds-tier-list">
                  {t.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DUAL CTA ── */}
      <section className="sds-dual-cta">
        <div className="pg-wrap">
          <div className="sds-dual-grid">
            <div className="sds-dual-block">
              <h3 className="sds-dual-title">Explore our full product catalogue</h3>
              <p className="sds-dual-desc">Certified, in-production defence products spanning ammunition, firearms, armoured vehicles, AI systems, and drone interceptors — all available through established procurement channels.</p>
              <Link href="/products" className="sds-hero-btn-primary"><span>Browse Products</span></Link>
            </div>
            <div className="sds-dual-block">
              <h3 className="sds-dual-title">Custom requirements? Talk to our team.</h3>
              <p className="sds-dual-desc">If your operational requirement falls outside our catalogue, our procurement team will assess feasibility, identify qualified manufacturers, and structure a bespoke supply programme.</p>
              <Link href="/contact" className="sds-hero-btn-primary"><span>Submit Enquiry</span></Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── HERO ── */
        .sds-hero { background: #0a0a0a; padding: 140px 0 100px; position: relative; overflow: hidden; }
        .sds-hero::before { content: ''; position: absolute; top: -200px; right: -200px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%); pointer-events: none; }
        .sds-hero-inner { position: relative; z-index: 1; }
        .sds-hero-tag { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: rgba(255,255,255,0.35); text-transform: uppercase; margin-bottom: 32px; }
        .sds-hero-h1 { font-size: clamp(40px, 7vw, 80px); font-weight: 400; color: #fff; line-height: 1.0; max-width: 700px; margin-bottom: 32px; letter-spacing: -1px; }
        .sds-hero-body { font-size: 17px; color: rgba(255,255,255,0.55); line-height: 1.75; max-width: 560px; margin-bottom: 48px; }
        .sds-hero-cta-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
        .sds-hero-btn-primary { display: inline-block; padding: 14px 36px; background: #fff; color: #000; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; text-decoration: none; text-transform: uppercase; position: relative; overflow: hidden; z-index: 1; transition: color 0.3s; }
        .sds-hero-btn-primary::before { content: ''; position: absolute; inset: 0; background: #d0d0d0; transform: scaleX(0); transform-origin: left; transition: transform 0.3s; z-index: -1; }
        .sds-hero-btn-primary:hover::before { transform: scaleX(1); }
        .sds-hero-btn-ghost { font-size: 14px; color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s; }
        .sds-hero-btn-ghost:hover { color: #fff; }

        /* ── STATS BAR ── */
        .sds-stats-bar { background: #111; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); }
        .sds-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
        .sds-stat { padding: 40px 0; text-align: center; border-right: 1px solid rgba(255,255,255,0.08); }
        .sds-stat:last-child { border-right: none; }
        .sds-stat-value { font-size: clamp(28px, 4vw, 48px); font-weight: 400; color: #fff; letter-spacing: -1px; margin-bottom: 6px; }
        .sds-stat-label { font-size: 11px; font-weight: 600; letter-spacing: 2px; color: rgba(255,255,255,0.35); text-transform: uppercase; }

        /* ── SERVICES ── */
        .sds-services { background: #0a0a0a; padding: 100px 0 0; }
        .sds-section-tag { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: rgba(255,255,255,0.35); text-transform: uppercase; margin-bottom: 20px; }
        .sds-section-tag--light { color: #999; }
        .sds-section-h2 { font-size: clamp(26px, 3.5vw, 44px); font-weight: 400; color: #fff; line-height: 1.15; max-width: 700px; margin-bottom: 0; }
        .sds-section-h2--light { color: #fff; }
        .sds-service-blocks { margin-top: 64px; }
        .sds-service { border-top: 1px solid rgba(255,255,255,0.08); transition: background 0.3s; }
        .sds-service:hover { background: rgba(255,255,255,0.02); }
        .sds-service-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; padding: 56px 0; align-items: start; }
        .sds-service-left {}
        .sds-service-num { font-size: 11px; font-weight: 700; letter-spacing: 2px; color: rgba(255,255,255,0.2); margin-bottom: 16px; }
        .sds-service-title { font-size: clamp(22px, 3vw, 32px); font-weight: 400; color: #fff; line-height: 1.15; margin-bottom: 12px; }
        .sds-service-sub { font-size: 13px; color: rgba(255,255,255,0.35); letter-spacing: 0.5px; }
        .sds-service-right { padding-top: 4px; }
        .sds-service-desc { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.75; margin-bottom: 24px; }
        .sds-service-link { font-size: 14px; color: #fff; text-decoration: none; font-weight: 500; transition: opacity 0.2s; }
        .sds-service-link:hover { opacity: 0.7; }

        /* ── QUOTE ── */
        .sds-quote-section { background: #fff; padding: 100px 0; }
        .sds-quote { font-size: clamp(22px, 3vw, 36px); font-weight: 400; color: #000; line-height: 1.35; max-width: 800px; margin: 0 0 32px; border: none; padding: 0; }
        .sds-quote-attr { font-size: 13px; font-weight: 600; color: #999; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
        .sds-quote-link { font-size: 14px; color: #000; text-decoration: none; font-weight: 500; transition: opacity 0.2s; }
        .sds-quote-link:hover { opacity: 0.5; }

        /* ── TIERS ── */
        .sds-tiers-section { background: #0a0a0a; padding: 100px 0; }
        .sds-tiers-intro { font-size: 15px; color: rgba(255,255,255,0.45); line-height: 1.75; max-width: 560px; margin-top: 20px; }
        .sds-tiers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 64px; background: rgba(255,255,255,0.08); }
        .sds-tier-card { background: #111; padding: 48px 36px; }
        .sds-tier-card--accent { background: #151515; }
        .sds-tier-badge { font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 24px; }
        .sds-tier-card--accent .sds-tier-badge { color: #F5C400; }
        .sds-tier-name { font-size: 22px; font-weight: 500; color: #fff; margin-bottom: 16px; }
        .sds-tier-desc { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 28px; }
        .sds-tier-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .sds-tier-list li { font-size: 13px; color: rgba(255,255,255,0.6); padding-left: 16px; position: relative; }
        .sds-tier-list li::before { content: '→'; position: absolute; left: 0; color: rgba(255,255,255,0.25); }

        /* ── DUAL CTA ── */
        .sds-dual-cta { background: #fff; padding: 100px 0; border-top: 1px solid #e0e0e0; }
        .sds-dual-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
        .sds-dual-block {}
        .sds-dual-title { font-size: clamp(20px, 2.5vw, 28px); font-weight: 500; color: #000; margin-bottom: 16px; line-height: 1.25; }
        .sds-dual-desc { font-size: 14px; color: #666; line-height: 1.7; margin-bottom: 32px; }
        .sds-dual-cta .sds-hero-btn-primary { background: #000; color: #fff; }
        .sds-dual-cta .sds-hero-btn-primary::before { background: #333; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .sds-service-inner { grid-template-columns: 1fr; gap: 24px; }
          .sds-tiers-grid { grid-template-columns: 1fr; }
          .sds-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .sds-stat { border-bottom: 1px solid rgba(255,255,255,0.08); }
          .sds-dual-grid { grid-template-columns: 1fr; gap: 56px; }
        }
        @media (max-width: 768px) {
          .sds-hero { padding: 100px 0 64px; }
          .sds-services { padding: 64px 0 0; }
          .sds-service-inner { padding: 36px 0; }
          .sds-quote-section { padding: 64px 0; }
          .sds-tiers-section { padding: 64px 0; }
          .sds-dual-cta { padding: 64px 0; }
          .sds-stats-grid { grid-template-columns: 1fr 1fr; }
          .sds-stat { padding: 28px 0; }
        }
      `}</style>

      <SubscribeStrip />
    </>
  )
}
