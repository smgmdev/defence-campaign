import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="pg-wrap">
          <div className="footer-brand-col">
            <div className="footer-logo">DefenceTrading<span>®</span></div>
            <p className="footer-desc">As a defence trader, our role is to connect governments, armed forces, and defence contractors with certified military products through compliant and established procurement channels. We work exclusively with licensed enterprises and authorised suppliers, ensuring that all equipment is sourced from certified manufacturers and delivered in accordance with applicable regulatory and export control requirements.</p>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-cols">
            <div className="footer-col">
              <div className="footer-col-label">Corporate</div>
              <Link href="/about">About Us</Link>
              <Link href="/insights">Global Insights</Link>
              <Link href="/products">Products</Link>
              <Link href="/companies">Companies</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-label">Legal</div>
              <Link href="/terms">Terms &amp; Conditions</Link>
              <Link href="/privacy">Privacy Notice</Link>
              <Link href="/export-control">Export Control Policy</Link>
              <Link href="/end-user-certification">End-User Certification</Link>
              <Link href="/cookies">Cookie Notice</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="pg-wrap">
          <span className="footer-copy">© 2026 Defence Trading. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
