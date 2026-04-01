import Link from 'next/link'
import type { ReactNode } from 'react'

export default function LegalPage({ title, date, children }: { title: string; date: string; children: ReactNode }) {
  return (
    <>
      <style>{`
        .legal-wrap { max-width: 860px; margin: 0; padding: 64px 48px 100px; }
        .legal-label { font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #E31837; margin-bottom: 16px; }
        .legal-title { font-size: clamp(28px, 4vw, 48px); font-weight: 900; color: #000; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 12px; }
        .legal-date { font-size: 13px; color: #666; margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px solid #e0e0e0; }
        .legal-body h2 { font-size: 18px; font-weight: 900; color: #000; margin: 36px 0 12px; letter-spacing: -0.3px; }
        .legal-body p { font-size: 15px; line-height: 1.8; color: #333; margin-bottom: 16px; }
        .legal-body ul { padding-left: 24px; margin-bottom: 16px; }
        .legal-body ul li { font-size: 15px; line-height: 1.75; color: #333; margin-bottom: 8px; }
        .legal-body a { color: #000; font-weight: 700; text-decoration: underline; }
        .legal-body a:hover { opacity: 0.6; }
        .legal-nav { background: #f5f5f5; border-bottom: 1px solid #e0e0e0; padding: 14px 0; }
        .legal-nav-inner { max-width: 860px; margin: 0; padding: 0 48px; display: flex; gap: 24px; flex-wrap: wrap; }
        .legal-nav a { font-size: 12px; font-weight: 700; color: #666; text-decoration: none; letter-spacing: 0.3px; transition: color 0.15s; white-space: nowrap; }
        .legal-nav a:hover { color: #000; }
        @media (max-width: 767px) {
          .legal-wrap { padding: 36px 20px 64px; }
          .legal-nav-inner { padding: 0 20px; gap: 16px; }
        }
      `}</style>

      <div className="legal-nav">
        <div className="legal-nav-inner">
          <Link href="/terms">Terms of Use</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/cookies">Cookie Policy</Link>
          <Link href="/export-control">Export Control</Link>
          <Link href="/end-user-certification">End-User Certification</Link>
        </div>
      </div>

      <div className="legal-wrap">
        <div className="legal-label">Legal</div>
        <h1 className="legal-title" dangerouslySetInnerHTML={{ __html: title }} />
        <div className="legal-date">{date}</div>
        <div className="legal-body">{children}</div>
      </div>
    </>
  )
}
