import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-inner pg-wrap">

        {/* Left col */}
        <div className="ft-left">
          <div className="ft-copy">© 2026 Defence Trading.<br />All rights reserved.</div>
          <div className="ft-divider" />
          <div className="ft-social">
            <a href="https://linkedin.com" target="_blank" rel="noopener" className="ft-social-btn">LINKEDIN</a>
            <a href="https://x.com" target="_blank" rel="noopener" className="ft-social-btn">X</a>
          </div>
        </div>

        {/* Link columns */}
        <div className="ft-cols">
          <div className="ft-col">
            <div className="ft-col-label">Corporate</div>
            <Link href="/about">About Us</Link>
            <Link href="/products">Products</Link>
            <Link href="/companies">Companies</Link>
            <Link href="/insights">Global Insights</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className="ft-col">
            <div className="ft-col-label">Legal</div>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/privacy">Privacy Notice</Link>
            <Link href="/export-control">Export Control Policy</Link>
            <Link href="/end-user-certification">End-User Certification</Link>
            <Link href="/cookies">Cookie Notice</Link>
          </div>
          <div className="ft-col">
            <div className="ft-col-label">Products</div>
            <Link href="/products?cat=Drone%20Interceptor">Drone Interceptor</Link>
            <Link href="/products?cat=AI%20Systems">AI Systems</Link>
            <Link href="/products?cat=Rifles">Rifles</Link>
            <Link href="/products?cat=Armored%20Vehicles">Armored Vehicles</Link>
            <Link href="/products?cat=Mortars">Mortars</Link>
          </div>
          <div className="ft-col">
            <div className="ft-col-label">Compliance</div>
            <Link href="/export-control">Export Control</Link>
            <Link href="/end-user-certification">End-User Cert.</Link>
            <Link href="/privacy">Privacy Statement</Link>
            <Link href="/cookies">Cookie Notice</Link>
            <Link href="/terms">Terms of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
