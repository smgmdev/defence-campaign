import type { Metadata } from 'next'
import Link from 'next/link'
import SubscribeStrip from '@/components/SubscribeStrip'

export const metadata: Metadata = {
  title: 'Who We Work With',
  description: 'Defence Trading works exclusively with sovereign governments, national armed forces, and fully licensed defence enterprises. No exceptions.',
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
      <section style={{ background: '#0a0a0a', padding: '100px 0 80px' }}>
        <div className="pg-wrap">
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '24px' }}>Counterparty Policy</p>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 400, color: '#fff', lineHeight: 1.1, maxWidth: '780px', marginBottom: '28px' }}>
            We work exclusively with governments and fully licensed defence enterprises.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '620px', marginBottom: '40px' }}>
            Defence Trading does not engage with private individuals, unlicensed intermediaries, or entities operating outside applicable defence trade regulations. Every counterparty — without exception — must meet our mandatory qualification criteria before any engagement proceeds.
          </p>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', maxWidth: '620px' }} />
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginTop: '20px', fontStyle: 'italic' }}>
            No exceptions. No discretionary waivers.
          </p>
        </div>
      </section>

      {/* ── GOVERNMENTS ── */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="pg-wrap">
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: '#999', textTransform: 'uppercase', marginBottom: '12px' }}>Category 01</p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 400, color: '#000', lineHeight: 1.15, marginBottom: '16px' }}>Governments &amp; State Authorities</h2>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.7, maxWidth: '640px' }}>
              We supply governments, national armed forces, and state security agencies operating with full legal mandate and verified procurement authority. All government counterparties must provide official procurement documentation and verified end-user details.
            </p>
          </div>
          <div className="www-grid">
            {GOVERNMENT_TYPES.map((item, i) => (
              <div key={i} className="www-card">
                <div className="www-card-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="www-card-title">{item.title}</h3>
                <p className="www-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANIES ── */}
      <section style={{ background: '#f5f5f5', padding: '80px 0' }}>
        <div className="pg-wrap">
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: '#999', textTransform: 'uppercase', marginBottom: '12px' }}>Category 02</p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 400, color: '#000', lineHeight: 1.15, marginBottom: '16px' }}>Licensed Defence Companies</h2>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.7, maxWidth: '640px' }}>
              Corporate counterparties must hold all applicable licences and authorisations without exception. The following requirements are mandatory — not advisory — for all defence enterprise engagements.
            </p>
          </div>
          <div className="www-grid">
            {COMPANY_REQUIREMENTS.map((item, i) => (
              <div key={i} className="www-card www-card--dark">
                <div className="www-card-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="www-card-title">{item.title}</h3>
                <p className="www-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTICE ── */}
      <section style={{ background: '#0a0a0a', padding: '64px 0' }}>
        <div className="pg-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '48px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '560px' }}>
            <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 400, color: '#fff', marginBottom: '16px' }}>Non-compliance results in immediate disqualification.</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
              Any misrepresentation of licensing status, end-use, or corporate identity will result in permanent disqualification and may be referred to the relevant national authorities. Defence Trading reserves the right to terminate any engagement at any stage upon discovery of non-compliance.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
            <Link href="/contact" className="btn-browse-products"><span>Submit an Enquiry</span></Link>
            <Link href="/export-control" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>View Export Control Policy</Link>
          </div>
        </div>
      </section>

      <style>{`
        .www-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #e0e0e0; }
        .www-card { background: #fff; padding: 32px 28px; }
        .www-card--dark { background: #f5f5f5; }
        .www-card-num { font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #bbb; margin-bottom: 16px; }
        .www-card-title { font-size: 15px; font-weight: 600; color: #000; margin-bottom: 10px; line-height: 1.3; }
        .www-card-desc { font-size: 13px; color: #666; line-height: 1.65; }
        @media (max-width: 900px) { .www-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .www-grid { grid-template-columns: 1fr; } }
      `}</style>

      <SubscribeStrip />
    </>
  )
}
