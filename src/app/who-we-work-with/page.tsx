import type { Metadata } from 'next'
import Link from 'next/link'
import SubscribeStrip from '@/components/SubscribeStrip'

export const metadata: Metadata = {
  title: 'Who We Work With — Governments & Licensed Defence Enterprises',
  description: 'Defence Trading works exclusively with sovereign governments, national armed forces, law enforcement agencies, intelligence services, and fully licensed defence companies. Mandatory counterparty qualification including defence trading licences, export control compliance, end-user certification, and sanctions screening.',
  keywords: 'defence counterparty policy, government defence procurement, military equipment buyers, licensed defence companies, defence trading compliance, export control, end-user certification, sanctions screening, NATO defence procurement, defence trading licence, military supply requirements, government arms procurement',
  openGraph: {
    title: 'Who We Work With — Defence Trading',
    description: 'We work exclusively with sovereign governments, national armed forces, and fully licensed defence enterprises. No exceptions. No discretionary waivers.',
    type: 'website',
  },
}

const GOVERNMENT_TYPES = [
  { title: 'Sovereign Governments', desc: 'Ministries of Defence, state procurement agencies, and central government bodies with mandated authority to acquire military and defence equipment.' },
  { title: 'National Armed Forces', desc: 'Army, Navy, Air Force, and Joint Forces commands operating under national defence authority with verified procurement mandates.' },
  { title: 'Law Enforcement Agencies', desc: 'State and federal law enforcement bodies authorised to procure defence-grade equipment under applicable national law.' },
  { title: 'Intelligence & Security Services', desc: 'Government intelligence and internal security agencies operating under statutory authority with verified end-user documentation.' },
  { title: 'Government Procurement Bodies', desc: 'Centralised acquisition agencies and defence procurement directorates acting on behalf of sovereign governments.' },
  { title: 'Allied & Coalition Commands', desc: 'NATO member state commands, UN-mandated forces, and multilateral coalition procurement offices with verified authorisation.' },
]

const COMPANY_REQUIREMENTS = [
  { title: 'Defence Trading Licence', desc: 'A current, valid licence issued by the relevant national authority to trade in controlled military goods. Expired, suspended or revoked licences are not accepted under any circumstances.' },
  { title: 'Export Control Compliance', desc: 'Full compliance with applicable export control regulations including ITAR, EAR, EU Dual-Use Regulation, and equivalent national frameworks. Exporters must hold all required export authorisations.' },
  { title: 'End-User Certification', desc: 'Provision of a signed End-User Certificate (EUC) for all transactions, confirming the identity of the ultimate end-user and the intended final destination and use of all equipment.' },
  { title: 'Company Registration & Ownership', desc: 'Verified corporate registration in a jurisdiction with recognised defence trade regulations. Beneficial ownership structures must be disclosed and must not include sanctioned individuals or entities.' },
  { title: 'Sanctions Screening', desc: 'All counterparties are screened against OFAC, UN, EU, and UK HM Treasury consolidated sanctions lists prior to engagement. Sanctions exposure results in immediate disqualification.' },
  { title: 'Anti-Bribery & Corruption', desc: 'Adherence to anti-bribery and corruption standards consistent with the UK Bribery Act, FCPA, or equivalent. Counterparties must maintain documented compliance programmes.' },
]

export default function WhoWeWorkWithPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="www-hero">
        <div className="pg-wrap">
          <p className="www-tag">Counterparty Policy</p>
          <h1 className="www-hero-h1">
            We work exclusively with governments and fully licensed defence enterprises.
          </h1>
          <p className="www-hero-body">
            Defence Trading does not engage with private individuals, unlicensed intermediaries, or entities operating outside applicable defence trade regulations. Every counterparty — without exception — must meet our mandatory qualification criteria before any engagement proceeds.
          </p>
          <div className="www-hero-line" />
          <p className="www-hero-note">No exceptions. No discretionary waivers.</p>
        </div>
      </section>

      {/* ── GOVERNMENTS ── */}
      <section className="www-section www-section--white">
        <div className="pg-wrap">
          <div className="www-section-head">
            <p className="www-tag www-tag--dark">Category 01</p>
            <h2 className="www-section-h2">Governments &amp; State Authorities</h2>
            <p className="www-section-body">
              We supply governments, national armed forces, and state security agencies operating with full legal mandate and verified procurement authority. All government counterparties must provide official procurement documentation and verified end-user details.
            </p>
          </div>
          <div className="www-split">
            <div className="www-split-left">
              <div className="www-split-label-box">
                <span className="www-split-label">Governments</span>
              </div>
              <p className="www-split-desc">We work with sovereign states, allied commands, and state security agencies across every continent. Each government counterparty is verified against national defence procurement mandates and international sanctions frameworks before any engagement proceeds.</p>
            </div>
            <div className="www-split-right">
              {GOVERNMENT_TYPES.map((item, i) => (
                <div key={i} className="www-feature">
                  <h3 className="www-feature-title">{item.title}</h3>
                  <p className="www-feature-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANIES ── */}
      <section className="www-section www-section--dark">
        <div className="pg-wrap">
          <div className="www-section-head">
            <p className="www-tag">Category 02</p>
            <h2 className="www-section-h2 www-section-h2--light">Licensed Defence Companies</h2>
            <p className="www-section-body www-section-body--light">
              Corporate counterparties must hold all applicable licences and authorisations without exception. The following requirements are mandatory — not advisory — for all defence enterprise engagements.
            </p>
          </div>
          <div className="www-split">
            <div className="www-split-left">
              <div className="www-split-label-box www-split-label-box--dark">
                <span className="www-split-label">Compliance</span>
              </div>
              <p className="www-split-desc www-split-desc--light">Every corporate counterparty undergoes mandatory due diligence — licence verification, sanctions screening, ownership disclosure, and anti-corruption compliance — before Defence Trading will proceed with any transaction.</p>
            </div>
            <div className="www-split-right">
              {COMPANY_REQUIREMENTS.map((item, i) => (
                <div key={i} className="www-feature www-feature--light">
                  <h3 className="www-feature-title www-feature-title--light">{item.title}</h3>
                  <p className="www-feature-desc www-feature-desc--light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NOTICE ── */}
      <section className="www-notice">
        <div className="pg-wrap www-notice-inner">
          <div className="www-notice-text">
            <h2 className="www-notice-h2">Non-compliance results in immediate disqualification.</h2>
            <p className="www-notice-body">
              Any misrepresentation of licensing status, end-use, or corporate identity will result in permanent disqualification and may be referred to the relevant national authorities. Defence Trading reserves the right to terminate any engagement at any stage upon discovery of non-compliance.
            </p>
          </div>
          <div className="www-notice-actions">
            <Link href="/contact" className="btn-browse-products"><span>Submit an Enquiry</span></Link>
            <Link href="/export-control" className="www-notice-link">View Export Control Policy</Link>
          </div>
        </div>
      </section>

      <style>{`
        /* ── HERO ── */
        .www-hero { background: #0a0a0a; padding: 140px 0 80px; }
        .www-tag { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 24px; }
        .www-tag--dark { color: #999; }
        .www-hero-h1 { font-size: clamp(32px, 5vw, 60px); font-weight: 400; color: #fff; line-height: 1.1; max-width: 780px; margin-bottom: 28px; }
        .www-hero-body { font-size: 16px; color: rgba(255,255,255,0.6); line-height: 1.7; max-width: 620px; margin-bottom: 40px; }
        .www-hero-line { height: 1px; background: rgba(255,255,255,0.12); max-width: 620px; }
        .www-hero-note { font-size: 13px; color: rgba(255,255,255,0.35); margin-top: 20px; font-style: italic; }

        /* ── SECTIONS ── */
        .www-section { padding: 100px 0; }
        .www-section--white { background: #fff; }
        .www-section--dark { background: #0a0a0a; }
        .www-section-head { margin-bottom: 64px; }
        .www-section-h2 { font-size: clamp(28px, 4vw, 48px); font-weight: 400; color: #000; line-height: 1.1; margin-bottom: 16px; }
        .www-section-h2--light { color: #fff; }
        .www-section-body { font-size: 15px; color: #555; line-height: 1.7; max-width: 640px; }
        .www-section-body--light { color: rgba(255,255,255,0.5); }

        /* ── SPLIT LAYOUT ── */
        .www-split { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .www-split-left { position: sticky; top: 120px; }
        .www-split-label-box { display: inline-flex; align-items: center; gap: 12px; border: 1px solid #ddd; border-radius: 8px; padding: 16px 28px; margin-bottom: 32px; }
        .www-split-label-box--dark { border-color: rgba(255,255,255,0.15); }
        .www-split-dot { width: 14px; height: 14px; background: #fff; border-radius: 50%; flex-shrink: 0; }
        .www-split-label { font-size: clamp(22px, 3vw, 32px); font-weight: 400; color: #000; }
        .www-split-label-box--dark .www-split-label { color: #fff; }
        .www-split-desc { font-size: 15px; color: #555; line-height: 1.8; }
        .www-split-desc--light { color: rgba(255,255,255,0.45); }

        /* ── FEATURE ITEMS ── */
        .www-feature { margin-bottom: 48px; }
        .www-feature:last-child { margin-bottom: 0; }
        .www-feature-title { font-size: clamp(20px, 2.5vw, 28px); font-weight: 500; color: #000; margin-bottom: 12px; line-height: 1.2; }
        .www-feature-title--light { color: #fff; }
        .www-feature-desc { font-size: 14px; color: #666; line-height: 1.7; }
        .www-feature-desc--light { color: rgba(255,255,255,0.45); }

        /* ── NOTICE ── */
        .www-notice { background: #0a0a0a; padding: 80px 0; border-top: 1px solid rgba(255,255,255,0.08); }
        .www-notice-inner { display: flex; justify-content: space-between; align-items: flex-start; gap: 48px; flex-wrap: wrap; }
        .www-notice-text { max-width: 560px; }
        .www-notice-h2 { font-size: clamp(20px, 2.5vw, 30px); font-weight: 400; color: #fff; margin-bottom: 16px; }
        .www-notice-body { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.7; }
        .www-notice-actions { display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; }
        .www-notice-link { font-size: 13px; color: rgba(255,255,255,0.5); text-decoration: underline; text-underline-offset: 3px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .www-split { grid-template-columns: 1fr; gap: 48px; }
          .www-split-left { position: static; }
        }
        @media (max-width: 768px) {
          .www-hero { padding: 100px 0 64px; }
          .www-section { padding: 64px 0; }
          .www-notice { padding: 48px 0; }
          .www-notice-inner { flex-direction: column; }
        }
      `}</style>

      <SubscribeStrip />
    </>
  )
}
