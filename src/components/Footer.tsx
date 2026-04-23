import Link from 'next/link'
import CookieSettings from './CookieSettings'

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-desc-row pg-wrap">
        <p className="ft-desc">As a defence trader, our role is to connect governments, armed forces, and defence contractors with certified military products through compliant and established procurement channels. We work exclusively with licensed enterprises and authorised suppliers, ensuring that all equipment is sourced from certified manufacturers and delivered in accordance with applicable regulatory and export control requirements.</p>
      </div>
      <div className="ft-inner pg-wrap">

        {/* Left col */}
        <div className="ft-left">
          <div className="ft-copy">© 2026 Defence Trading by Black Rock Military, Abu Dhabi. License No: CN-6183305.<br />All rights reserved.</div>
          <div className="ft-divider" />
          <CookieSettings />
        </div>

        {/* Link columns */}
        <div className="ft-cols">
          <div className="ft-col">
            <div className="ft-col-label">Our Offerings</div>
            <Link href="/strategic-defence-solutions">Strategic Defence Solutions</Link>
            <Link href="/arcana-satellite-program">Arcana Satellite Program</Link>
          </div>
          <div className="ft-col">
            <div className="ft-col-label">Corporate</div>
            <Link href="/about">About Defence Trading</Link>
            <Link href="/products">Products</Link>
            <Link href="/companies">Companies</Link>
            <Link href="/insights">Global Insights</Link>
            <Link href="/contact">Contact Us</Link>
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
            <div className="ft-col-label">Legal</div>
            <Link href="/who-we-work-with">Who We Work With</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/privacy">Privacy Notice</Link>
            <Link href="/export-control">Export Control Policy</Link>
            <Link href="/end-user-certification">End-User Certification</Link>
            <Link href="/cookies">Cookie Notice</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
