import type { Metadata } from 'next'
import Link from 'next/link'
import SubscribeStrip from '@/components/SubscribeStrip'

export const metadata: Metadata = {
  title: 'Strategic Defence Solutions',
  description: 'Defence Trading delivers custom strategic defence solutions across ground and air domains — bespoke equipment packages, tiered procurement programmes, and multi-purpose operational configurations for governments and licensed defence enterprises.',
}

const GROUND_CAPABILITIES = [
  { label: 'Infantry Systems', desc: 'Small arms, crew-served weapons, ammunition packages, and personal protective equipment configured to unit specification and operational theatre.' },
  { label: 'Armoured & Vehicle Platforms', desc: 'Light patrol vehicles to fully armoured troop carriers, IFVs, and specialised logistical platforms — sourced, configured, and delivered to programme requirements.' },
  { label: 'Fire Support & Artillery', desc: 'Mortar systems, artillery ammunition, and indirect fire support packages — calibrated to force structure and target engagement profiles.' },
  { label: 'Force Protection', desc: 'Perimeter defence systems, counter-IED solutions, ballistic barriers, and static protection packages for forward operating bases and critical installations.' },
  { label: 'Counter-UAV Ground Systems', desc: 'Ground-based counter-drone solutions including AI-guided interceptors, electronic warfare jamming platforms, and integrated C-UAS system packages.' },
  { label: 'Logistics & Sustainment', desc: 'Ammunition storage, maintenance kits, field resupply packages, and sustainment chains designed for extended operational deployment cycles.' },
]

const AIR_CAPABILITIES = [
  { label: 'Unmanned Aerial Systems', desc: 'Reconnaissance, strike, and multi-role UAS platforms across tactical and operational ranges — supplied with operator training and maintenance support packages.' },
  { label: 'Counter-UAV Interceptors', desc: 'Autonomous AI-guided drone interceptors with 360° radar coverage, pixel-level targeting, and ≥90% recognition rates — operational in temperatures from −20°C to +60°C.' },
  { label: 'Aerial Surveillance Packages', desc: 'EO/IR sensor-equipped aerial platforms for persistent ISR (intelligence, surveillance, reconnaissance) missions in contested and permissive environments.' },
  { label: 'Air Defence Components', desc: 'Radar systems, detection arrays, and short-range air defence components for protecting ground assets, installations, and forward bases.' },
  { label: 'Airborne Logistics Support', desc: 'Supply and resupply delivery systems, including cargo UAS and precision airdrop systems for remote or contested operational areas.' },
  { label: 'Electronic Warfare', desc: 'Spectrum denial, GPS jamming countermeasures, and signals intelligence packages for electronic dominance in contested operational environments.' },
]

const TIERS = [
  {
    tier: 'Tier I',
    name: 'Standard Configuration',
    color: '#e8e8e8',
    textColor: '#000',
    desc: 'Off-catalogue supply of certified, in-production equipment from verified manufacturers. Standard specifications, established lead times, and full export documentation.',
    items: ['Catalogue product selection', 'Standard packaging & markings', 'Export documentation included', 'Delivery to agreed incoterms', 'Quality certificates provided'],
  },
  {
    tier: 'Tier II',
    name: 'Modified Configuration',
    color: '#1a1a1a',
    textColor: '#fff',
    desc: 'Factory-modified or field-adapted variants configured to client specifications. Calibre changes, optical fit, suppressor compatibility, and integration with existing platforms.',
    items: ['Custom calibre or ammunition type', 'Optics & accessories integration', 'Platform modification packages', 'Extended lead time provisioning', 'Dedicated programme manager'],
  },
  {
    tier: 'Tier III',
    name: 'Bespoke Programme',
    color: '#0a0a0a',
    textColor: '#fff',
    accent: '#F5C400',
    desc: 'End-to-end custom defence programmes for complex, multi-domain requirements. Full needs assessment, manufacturer coordination, phased delivery, and operational integration support.',
    items: ['Needs assessment & scoping', 'Multi-manufacturer coordination', 'Phased delivery scheduling', 'In-country delivery support', 'Training & integration packages', 'Long-term sustainment options'],
  },
]

const DOMAINS = [
  { icon: '⬛', label: 'Ground Domain', detail: 'Infantry · Armour · Artillery · Force Protection · Logistics' },
  { icon: '◈', label: 'Air Domain', detail: 'UAS · Counter-UAV · ISR · Air Defence · Electronic Warfare' },
  { icon: '◉', label: 'Multi-Domain', detail: 'Integrated packages spanning ground and air for joint force operations' },
  { icon: '▣', label: 'Command & Control', detail: 'Comms systems, situational awareness tools, and C2 integration equipment' },
]

export default function StrategicDefenceSolutionsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: '#0a0a0a', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="pg-wrap" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '24px' }}>Our Offerings</p>
          <h1 style={{ fontSize: 'clamp(34px, 6vw, 72px)', fontWeight: 400, color: '#fff', lineHeight: 1.05, maxWidth: '860px', marginBottom: '32px', letterSpacing: '-0.5px' }}>
            Strategic Defence Solutions. Ground, Air, and Multi-Domain.
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: '620px', marginBottom: '48px' }}>
            We deliver bespoke defence procurement programmes — from individual product supply to full multi-tier equipment packages — for governments and licensed defence enterprises operating across any theatre.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn-browse-products"><span>View Product Catalogue</span></Link>
            <Link href="/contact" className="sds-ghost-btn">Custom Enquiry</Link>
          </div>
        </div>
      </section>

      {/* ── DOMAIN COVERAGE ── */}
      <section style={{ background: '#111', borderTop: '1px solid #222' }}>
        <div className="pg-wrap">
          <div className="sds-domains">
            {DOMAINS.map((d, i) => (
              <div key={i} className="sds-domain">
                <div className="sds-domain-icon">{d.icon}</div>
                <div className="sds-domain-label">{d.label}</div>
                <div className="sds-domain-detail">{d.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GROUND CAPABILITIES ── */}
      <section style={{ background: '#fff', padding: '80px 0 0' }}>
        <div className="pg-wrap" style={{ marginBottom: '0' }}>
          <p className="sds-label">Ground Domain</p>
          <h2 className="sds-h2" style={{ marginBottom: '8px' }}>Ground Force Solutions</h2>
          <p style={{ fontSize: '15px', color: '#888', maxWidth: '560px', lineHeight: 1.6, marginBottom: '64px' }}>From individual infantry kit to full armoured platform packages.</p>
        </div>
        {GROUND_CAPABILITIES.map((c, i) => (
          <div key={i} className={`sds-band ${i % 2 === 0 ? 'sds-band--white' : 'sds-band--gray'}`}>
            <div className="pg-wrap sds-band-inner">
              <h3 className="sds-band-title">{c.label}</h3>
              <p className="sds-band-desc">{c.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── AIR CAPABILITIES ── */}
      <section style={{ background: '#0a0a0a', padding: '80px 0 0' }}>
        <div className="pg-wrap">
          <p className="sds-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Air Domain</p>
          <h2 className="sds-h2" style={{ color: '#fff', marginBottom: '8px' }}>Aerial &amp; Counter-UAV Solutions</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', maxWidth: '560px', lineHeight: 1.6, marginBottom: '64px' }}>Counter-drone interceptors, ISR platforms, and electronic warfare packages.</p>
        </div>
        {AIR_CAPABILITIES.map((c, i) => (
          <div key={i} className={`sds-band-dark ${i % 2 === 0 ? 'sds-band-dark--a' : 'sds-band-dark--b'}`}>
            <div className="pg-wrap sds-band-inner">
              <h3 className="sds-band-title" style={{ color: '#fff' }}>{c.label}</h3>
              <p className="sds-band-desc" style={{ color: 'rgba(255,255,255,0.5)' }}>{c.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── TIER SYSTEM ── */}
      <section style={{ background: '#fff', padding: '88px 0' }}>
        <div className="pg-wrap">
          <div style={{ marginBottom: '56px' }}>
            <p className="sds-label">Procurement Structure</p>
            <h2 className="sds-h2" style={{ maxWidth: '560px' }}>Three tiers of custom solution capability</h2>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7, maxWidth: '580px', marginTop: '16px' }}>Every client requirement is unique. Our tiered framework allows us to deliver at any level — from fast standard supply to fully bespoke multi-phase programmes.</p>
          </div>
          <div className="sds-tier-grid">
            {TIERS.map((t, i) => (
              <div key={i} className="sds-tier" style={{ background: t.color, color: t.textColor }}>
                <div className="sds-tier-badge" style={{ color: t.accent || (t.textColor === '#fff' ? 'rgba(255,255,255,0.4)' : '#999') }}>{t.tier}</div>
                <h3 className="sds-tier-name" style={{ color: t.textColor }}>{t.name}</h3>
                <p className="sds-tier-desc" style={{ color: t.textColor === '#fff' ? 'rgba(255,255,255,0.6)' : '#555' }}>{t.desc}</p>
                <ul className="sds-tier-list">
                  {t.items.map((item, j) => (
                    <li key={j} style={{ color: t.textColor === '#fff' ? 'rgba(255,255,255,0.8)' : '#333' }}>↳ {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOGUE + CUSTOM CTA ── */}
      <section style={{ background: '#f5f5f5', padding: '80px 0', borderTop: '1px solid #e0e0e0' }}>
        <div className="pg-wrap">
          <div className="sds-cta-grid">
            <div className="sds-cta-block">
              <p className="sds-label">Product Catalogue</p>
              <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 500, color: '#000', marginBottom: '14px', lineHeight: 1.2 }}>Review our full range of certified products</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.65, marginBottom: '28px' }}>Browse our catalogue of verified, in-production defence products spanning ammunition, small arms, armoured vehicles, AI systems, drone interceptors, and more — all available through established procurement channels.</p>
              <Link href="/products" className="btn-browse-products"><span>Browse Product Catalogue</span></Link>
            </div>
            <div className="sds-cta-divider" />
            <div className="sds-cta-block">
              <p className="sds-label">Custom Enquiries</p>
              <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 500, color: '#000', marginBottom: '14px', lineHeight: 1.2 }}>Requirements not listed? Contact our team.</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.65, marginBottom: '28px' }}>If your operational requirement falls outside our standard catalogue, our procurement team will assess feasibility, identify qualified manufacturers, and structure a bespoke supply programme to your specifications.</p>
              <Link href="/contact" className="btn-browse-products"><span>Submit Custom Enquiry</span></Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .sds-domains { display: grid; grid-template-columns: repeat(4,1fr); border-left: 1px solid #222; }
        .sds-domain { padding: 32px 28px; border-right: 1px solid #222; border-top: 1px solid #222; border-bottom: 1px solid #222; }
        .sds-domain-icon { font-size: 20px; color: rgba(255,255,255,0.3); margin-bottom: 14px; }
        .sds-domain-label { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 8px; }
        .sds-domain-detail { font-size: 12px; color: rgba(255,255,255,0.4); line-height: 1.6; }
        .sds-section-head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 48px; align-items: start; }
        .sds-label { font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #999; text-transform: uppercase; margin-bottom: 10px; }
        .sds-h2 { font-size: clamp(24px,3.5vw,42px); font-weight: 400; color: #000; line-height: 1.1; }
        .sds-section-intro { font-size: 15px; color: #666; line-height: 1.7; padding-top: 32px; }
        .sds-band, .sds-band-dark { padding: 48px 0; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .sds-band--white { background: #fff; }
        .sds-band--gray { background: #f7f7f7; }
        .sds-band-dark--a { background: #111; border-bottom-color: rgba(255,255,255,0.06); }
        .sds-band-dark--b { background: #151515; border-bottom-color: rgba(255,255,255,0.06); }
        .sds-band-inner { display: flex; justify-content: space-between; align-items: baseline; gap: 48px; }
        .sds-band-title { font-size: 18px; font-weight: 600; color: #000; white-space: nowrap; flex-shrink: 0; }
        .sds-band-desc { font-size: 14px; color: #666; line-height: 1.7; max-width: 600px; text-align: right; }
        .sds-tier-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; }
        .sds-tier { padding: 40px 32px; }
        .sds-tier-badge { font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; }
        .sds-tier-name { font-size: 20px; font-weight: 600; margin-bottom: 16px; }
        .sds-tier-desc { font-size: 13px; line-height: 1.65; margin-bottom: 24px; }
        .sds-tier-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
        .sds-tier-list li { font-size: 13px; }
        .sds-cta-grid { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 0; align-items: start; }
        .sds-cta-block { padding: 0 48px 0 0; }
        .sds-cta-block:last-child { padding: 0 0 0 48px; }
        .sds-cta-divider { background: #e0e0e0; align-self: stretch; }
        .sds-ghost-btn { display: inline-block; padding: 14px 32px; font-size: 13px; color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.25); text-decoration: none; transition: border-color 0.2s, color 0.2s; letter-spacing: 1px; text-transform: uppercase; }
        .sds-ghost-btn:hover { border-color: #fff; color: #fff; }
        @media (max-width: 1024px) {
          .sds-domains { grid-template-columns: repeat(2,1fr); }
          .sds-tier-grid { grid-template-columns: 1fr; gap: 2px; }
          .sds-section-head { grid-template-columns: 1fr; gap: 16px; }
          .sds-section-intro { padding-top: 0; }
          .sds-band-inner { flex-direction: column; gap: 12px; }
          .sds-band-desc { text-align: left; max-width: 100%; }
        }
        @media (max-width: 768px) {
          .sds-domains { grid-template-columns: 1fr 1fr; }
          .sds-band, .sds-band-dark { padding: 32px 0; }
          .sds-cta-grid { grid-template-columns: 1fr; }
          .sds-cta-divider { height: 1px; width: 100%; margin: 40px 0; }
          .sds-cta-block, .sds-cta-block:last-child { padding: 0; }
        }
      `}</style>

      <SubscribeStrip />
    </>
  )
}
