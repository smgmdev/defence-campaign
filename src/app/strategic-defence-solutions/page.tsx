import type { Metadata } from 'next'
import Link from 'next/link'
import SubscribeStrip from '@/components/SubscribeStrip'

export const metadata: Metadata = {
  title: 'Strategic Defence Solutions',
  description: 'Defence Trading delivers custom strategic defence solutions across ground and air domains — bespoke equipment packages, tiered procurement programmes, and multi-purpose operational configurations for governments and licensed defence enterprises.',
}

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
          </div>
        </div>
      </section>

      {/* ── DISCOVER BY SERVICE ── */}
      <section className="sds-discover">
        <div className="pg-wrap">
          <h2 className="sds-discover-h2">Discover by Service</h2>
          <div className="sds-discover-grid">
            <div className="sds-discover-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/grid-platforms.png" alt="Defence platforms" className="sds-discover-img" />
            </div>
            <div className="sds-discover-content">
              <h3 className="sds-discover-title">Defence Trading provides configurable procurement solutions for the most demanding operational requirements.</h3>
              <p className="sds-discover-body">From sourcing certified infantry systems and armoured platforms to deploying AI-guided counter-UAV interceptors, Defence Trading is committed to delivering equipment solutions that strengthen deterrence and operational advantage for governments and allied forces.</p>
              <div className="sds-discover-links">
                <Link href="/products?cat=Standard%20Ammunition" className="sds-discover-link">
                  <span>Ground Forces &amp; Infantry</span><span>→</span>
                </Link>
                <Link href="/products?cat=Drone%20Interceptor" className="sds-discover-link">
                  <span>Air &amp; Counter-UAV Systems</span><span>→</span>
                </Link>
                <Link href="/products?cat=Armored%20Vehicles" className="sds-discover-link">
                  <span>Armoured Vehicle Platforms</span><span>→</span>
                </Link>
                <Link href="/products?cat=AI%20Systems" className="sds-discover-link">
                  <span>AI &amp; Command Systems</span><span>→</span>
                </Link>
              </div>
            </div>
          </div>
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
              <Link href="/contact" className="sds-hero-btn-primary"><span>Contact Us</span></Link>
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

        /* ── DISCOVER BY SERVICE ── */
        .sds-discover { background: #111; padding: 100px 0; border-top: 1px solid rgba(255,255,255,0.08); }
        .sds-discover-h2 { font-size: clamp(32px, 5vw, 56px); font-weight: 400; color: #fff; margin-bottom: 64px; letter-spacing: -0.5px; }
        .sds-discover-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .sds-discover-visual { display: flex; align-items: center; justify-content: center; }
        .sds-discover-img { width: 100%; max-width: 520px; opacity: 0.7; }
        .sds-discover-title { font-size: clamp(22px, 2.8vw, 32px); font-weight: 400; color: #fff; line-height: 1.3; margin-bottom: 24px; }
        .sds-discover-body { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.75; margin-bottom: 40px; }
        .sds-discover-links { display: flex; flex-direction: column; }
        .sds-discover-link { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 16px; color: rgba(255,255,255,0.75); text-decoration: none; transition: color 0.2s; }
        .sds-discover-link:first-child { border-top: 1px solid rgba(255,255,255,0.1); }
        .sds-discover-link:hover { color: #fff; }

        .sds-section-tag { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: rgba(255,255,255,0.35); text-transform: uppercase; margin-bottom: 20px; }
        .sds-section-tag--light { color: #999; }
        .sds-section-h2 { font-size: clamp(26px, 3.5vw, 44px); font-weight: 400; color: #fff; line-height: 1.15; max-width: 700px; margin-bottom: 0; }
        .sds-section-h2--light { color: #fff; }

        /* ── QUOTE ── */
        .sds-quote-section { background: #fff; padding: 100px 0; }
        .sds-quote { font-size: clamp(22px, 3vw, 36px); font-weight: 400; color: #000; line-height: 1.35; max-width: 800px; margin: 0 0 32px; border: none; padding: 0; }
        .sds-quote-attr { font-size: 13px; font-weight: 600; color: #999; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
        .sds-quote-link { font-size: 14px; color: #000; text-decoration: none; font-weight: 500; transition: opacity 0.2s; }
        .sds-quote-link:hover { opacity: 0.5; }

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
          .sds-discover-grid { grid-template-columns: 1fr; gap: 48px; }
          .sds-dual-grid { grid-template-columns: 1fr; gap: 56px; }
        }
        @media (max-width: 768px) {
          .sds-hero { padding: 100px 0 64px; }
          .sds-discover { padding: 64px 0; }
          .sds-discover-h2 { margin-bottom: 40px; }
          .sds-quote-section { padding: 64px 0; }
          .sds-dual-cta { padding: 64px 0; }
        }
      `}</style>

      <SubscribeStrip />
    </>
  )
}
