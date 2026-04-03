import type { Metadata } from 'next'
import Link from 'next/link'
import SubscribeStrip from '@/components/SubscribeStrip'
import { VideoLoader } from '@/components/MediaLoader'

export const metadata: Metadata = {
  title: 'Arcana Satellite Program — AI Threat Detection',
  description: 'Arcana Precision AI connects to global satellites and radars for real-time detection of drones, missiles, and nuclear threats. Autonomous AI-powered threat detection, fire control, and multi-sensor fusion for governments and allied forces. Available through Defence Trading.',
  keywords: 'Arcana Precision AI, Arcana Mace, satellite threat detection, AI defence system, counter-UAV AI, missile detection, nuclear threat detection, drone detection AI, real-time threat intelligence, defence AI platform, autonomous targeting, military AI system, radar integration, satellite defence program',
  openGraph: {
    title: 'Arcana Satellite Program — AI-Powered Threat Detection',
    description: 'Arcana Precision AI connects to global satellites and radars for real-time detection of drones, missiles, and nuclear threats. Available through Defence Trading.',
    type: 'website',
    images: [{ url: 'https://www.defencetrading.com/og-image.png', width: 1280, height: 640 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arcana Satellite Program — AI-Powered Threat Detection',
    images: ['https://www.defencetrading.com/og-image.png'],
  },
}

const CAPABILITIES = [
  { title: 'Autonomous Target Acquisition', desc: 'AI-driven detection and classification of threats across visual, infrared, and radar spectra — enabling precision engagement without operator dependency.' },
  { title: 'Real-Time Fire Control', desc: 'Sub-second firing solutions computed in real-time, integrating ballistic modelling, wind compensation, and platform motion stabilisation for maximum first-round hit probability.' },
  { title: 'Multi-Sensor Fusion', desc: 'Simultaneous processing of EO/IR, radar, LIDAR, and acoustic sensor data into a unified threat picture — eliminating blind spots across the operational environment.' },
  { title: 'Satellite-Linked C2', desc: 'Persistent command and control connectivity via LEO satellite constellation, maintaining operational links in GPS-denied and communications-degraded environments.' },
  { title: 'Edge AI Processing', desc: 'On-device neural network inference at the tactical edge — no cloud dependency. Decisions made locally in milliseconds with full autonomy when communications are severed.' },
  { title: 'Threat Pattern Recognition', desc: 'Machine learning models trained on operational datasets to identify behavioural patterns, predict threat trajectories, and recommend pre-emptive engagement windows.' },
  { title: 'Electronic Warfare Integration', desc: 'Spectrum awareness and countermeasure coordination — detecting jamming attempts, adapting frequencies, and maintaining targeting lock through contested electromagnetic environments.' },
  { title: 'Platform Agnostic Deployment', desc: 'Arcana Precision integrates with ground vehicles, naval vessels, UAS platforms, and static defence installations — a single AI core across all operational domains.' },
  { title: 'Swarm Coordination', desc: 'Multi-unit coordination protocol enabling synchronised engagement across distributed platforms — AI-optimised kill chains with zero human-to-human communication latency.' },
  { title: 'Battle Damage Assessment', desc: 'Automated post-engagement analysis using imagery and sensor data to confirm target neutralisation, assess collateral impact, and recommend follow-on actions.' },
  { title: 'Predictive Maintenance', desc: 'Continuous self-diagnostics monitoring weapon system health, predicting component failure, and scheduling maintenance — maximising platform availability in the field.' },
  { title: 'Secure Data Architecture', desc: 'Military-grade encryption across all data layers — from sensor input to command output. Zero-trust architecture with hardware-level key management and tamper detection.' },
]

export default function ArcanaSatelliteProgramPage() {
  return (
    <>
      {/* ── HERO WITH VIDEO ── */}
      <section className="arc-hero">
        <VideoLoader src="/arcana-hero.mp4" className="arc-hero-video" fill />
        <div className="arc-hero-overlay" />
        <h1 className="arc-hero-h1">ARCANA PRECISION</h1>
      </section>

      {/* ── STATEMENT SECTION ── */}
      <section className="arc-statement">
        <div className="arc-statement-inner">
          <h2 className="arc-statement-h2">
            <span className="arc-st-line1">Detect the undetectable.</span>
            <span className="arc-st-line2">Missiles. Drones. Nukes.</span>
          </h2>
          <p className="arc-statement-sub">
            <span className="arc-st-sub-faded">Turn AI in your Defence Systems</span>
            <br />
            into Autonomous Targeting and Fire Control
          </p>
          <div className="arc-scroll-hint">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3v14M5 12l5 5 5-5"/></svg>
            <span>Scroll to Explore</span>
          </div>
        </div>
      </section>

      {/* ── INTRO SPLIT ── */}
      <section className="arc-intro">
        <div className="pg-wrap arc-intro-grid">
          <div className="arc-intro-left">
            <h2 className="arc-intro-h2">Satellite-connected AI — from raw signal to real-time threat response.</h2>
          </div>
          <div className="arc-intro-right">
            <p className="arc-intro-body">Arcana Precision connects directly to satellite constellations and ground-based radar networks, ingesting data streams in real-time across every operational domain. It analyses electromagnetic signatures, radar returns, infrared patterns, and trajectory data — then builds dynamic threat models that update continuously as the battlespace evolves.</p>
            <p className="arc-intro-body">From detection to protection in milliseconds. Arcana Precision identifies incoming missiles, hostile drones, and nuclear launch signatures — then generates autonomous countermeasure recommendations, activates defence protocols, and delivers real-time threat alerts to command. One AI core. Every sensor. Every threat. Every domain.</p>
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section className="arc-video-section">
        <VideoLoader src="/arcana-analysis.mp4" className="arc-video-player" />
      </section>

      {/* ── CAPABILITIES ROWS ── */}
      <section className="arc-cap-rows">
        <div className="pg-wrap">
          <p className="arc-section-tag arc-section-tag--light">Platform Capabilities</p>
          <h2 className="arc-section-h2 arc-section-h2--dark">Twelve core capabilities powering autonomous defence operations.</h2>
          {CAPABILITIES.map((c, i) => (
            <div key={i} className="arc-cap-row">
              <h3 className="arc-cap-row-title">{c.title}</h3>
              <p className="arc-cap-row-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="arc-quote-section">
        <div className="pg-wrap">
          <blockquote className="arc-quote">
            &ldquo;In contested environments, the force that processes information fastest and acts with the highest precision will prevail. Arcana Precision is built for that reality.&rdquo;
          </blockquote>
          <p className="arc-quote-attr">Arcana Defence Systems</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="arc-cta-section">
        <div className="pg-wrap arc-cta-inner">
          <h2 className="arc-cta-title">Ready to integrate Arcana Precision into your defence programme?</h2>
          <p className="arc-cta-desc">Contact our team to schedule a classified briefing, discuss technical and integration requirements.</p>
          <div className="arc-cta-btns">
            <Link href="/contact" className="arc-btn-primary"><span>Contact Us</span></Link>
            <Link href="/products?cat=AI%20Systems" className="arc-cta-link">View AI Systems →</Link>
          </div>
        </div>
      </section>

      <style>{`
        /* ── HERO ── */
        .arc-hero { background: #0a0a0a; position: relative; overflow: hidden; min-height: 100vh; display: flex; align-items: flex-end; padding: 0 48px 48px; }
        .arc-hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center center; }
        .arc-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%); }
        .arc-hero-h1 { position: relative; z-index: 1; font-size: clamp(48px, 10vw, 120px); font-weight: 700; color: #fff; line-height: 1.0; letter-spacing: -2px; margin: 0; }
        .arc-btn-primary { display: inline-block; padding: 14px 36px; background: #fff; color: #000; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; text-decoration: none; text-transform: uppercase; position: relative; overflow: hidden; z-index: 1; transition: color 0.3s; }
        .arc-btn-primary::before { content: ''; position: absolute; inset: 0; background: #d0d0d0; transform: scaleX(0); transform-origin: left; transition: transform 0.3s; z-index: -1; }
        .arc-btn-primary:hover::before { transform: scaleX(1); }

        /* ── STATEMENT ── */
        .arc-statement { background: #f0f0f0; min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 80px 24px; }
        .arc-statement-inner { max-width: 900px; }
        .arc-statement-h2 { margin-bottom: 48px; }
        .arc-st-line1 { display: block; font-size: clamp(36px, 7vw, 80px); font-weight: 500; color: #000; line-height: 1.1; letter-spacing: -2px; animation: arc-fade-up 1s ease-out both; }
        .arc-st-line2 { display: block; font-size: clamp(36px, 7vw, 80px); font-weight: 500; line-height: 1.1; letter-spacing: -2px; background: linear-gradient(135deg, #8b5cf6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: arc-fade-up 1s ease-out 0.3s both; }
        .arc-statement-sub { font-size: clamp(16px, 2vw, 20px); line-height: 1.6; margin-bottom: 56px; animation: arc-fade-up 1s ease-out 0.6s both; }
        .arc-st-sub-faded { color: #aaa; }
        .arc-statement-sub { color: #000; }
        .arc-scroll-hint { display: flex; flex-direction: column; align-items: center; gap: 8px; color: #666; animation: arc-fade-up 1s ease-out 0.9s both, arc-bounce 2s ease-in-out 2s infinite; }
        .arc-scroll-hint span { font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
        @keyframes arc-fade-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes arc-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }

        /* ── INTRO ── */
        .arc-intro { background: #fff; padding: 100px 0; }
        .arc-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .arc-intro-h2 { font-size: clamp(26px, 3.5vw, 42px); font-weight: 400; color: #000; line-height: 1.2; }
        .arc-intro-body { font-size: 15px; color: #555; line-height: 1.8; margin-bottom: 20px; }
        .arc-intro-body:last-child { margin-bottom: 0; }

        /* ── VIDEO SECTION ── */
        .arc-video-section { background: #000; width: 100%; }
        .arc-video-player { display: block; width: 100%; }

        .arc-section-tag { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: rgba(255,255,255,0.35); text-transform: uppercase; margin-bottom: 20px; }
        .arc-section-tag--light { color: #999; }
        .arc-section-h2 { font-size: clamp(26px, 3.5vw, 44px); font-weight: 400; color: #fff; line-height: 1.15; max-width: 700px; margin-bottom: 64px; }
        .arc-section-h2--dark { color: #000; }

        /* ── CAPABILITIES ROWS ── */
        .arc-cap-rows { background: #fff; padding: 100px 0; }
        .arc-cap-row { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; padding: 48px 0; border-bottom: 1px solid #e8e8e8; }
        .arc-cap-row:first-child { border-top: 1px solid #e8e8e8; }
        .arc-cap-row-title { font-size: clamp(22px, 3vw, 32px); font-weight: 400; color: #000; line-height: 1.2; }
        .arc-cap-row-desc { font-size: 16px; color: #444; line-height: 1.75; }

        /* ── QUOTE ── */
        .arc-quote-section { background: #fff; padding: 100px 0; }
        .arc-quote { font-size: clamp(22px, 3vw, 36px); font-weight: 400; color: #000; line-height: 1.35; max-width: 800px; margin: 0 0 32px; border: none; padding: 0; }
        .arc-quote-attr { font-size: 13px; font-weight: 600; color: #999; letter-spacing: 1px; text-transform: uppercase; }

        /* ── CTA ── */
        .arc-cta-section { background: #0a0a0a; padding: 100px 0; }
        .arc-cta-inner { max-width: 640px; margin: 0; }
        .arc-cta-title { font-size: clamp(26px, 3.5vw, 40px); font-weight: 400; color: #fff; line-height: 1.2; margin-bottom: 20px; }
        .arc-cta-desc { font-size: 15px; color: rgba(255,255,255,0.45); line-height: 1.75; margin-bottom: 36px; }
        .arc-cta-btns { display: flex; gap: 24px; align-items: center; }
        .arc-cta-link { font-size: 14px; color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s; }
        .arc-cta-link:hover { color: #fff; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .arc-intro-grid { grid-template-columns: 1fr; gap: 40px; }
          .arc-cap-row { grid-template-columns: 1fr; gap: 16px; }
        }
        @media (max-width: 768px) {
          .arc-hero { padding: 0 20px 32px; }
          .arc-visual-box { padding: 48px; }
          .arc-intro { padding: 64px 0; }
          .arc-capabilities { padding: 64px 0; }
          .arc-cap-rows { padding: 64px 0; }
          .arc-quote-section { padding: 64px 0; }
          .arc-deployment { padding: 64px 0; }
          .arc-cta-section { padding: 64px 0; }
          .arc-cta-btns { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <SubscribeStrip />
    </>
  )
}
