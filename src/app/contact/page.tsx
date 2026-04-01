'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [interestError, setInterestError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const checked = form.querySelectorAll('input[name="interests"]:checked')
    if (checked.length === 0) {
      setInterestError(true)
      return
    }
    setInterestError(false)

    const data = new FormData(form)
    const payload = {
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      email: data.get('email'),
      company: data.get('company'),
      country: data.get('country'),
      phone: data.get('phone'),
      org_type: data.get('org_type'),
      role: data.get('role'),
      request_type: data.get('request_type'),
      interests: data.getAll('interests'),
      message: data.get('message'),
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const d = await res.json()
      if (d.ok) {
        setSubmitted(true)
      } else {
        alert('Something went wrong. Please try again or email sales@defencetrading.com directly.')
      }
    } catch {
      alert('Something went wrong. Please try again or email sales@defencetrading.com directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <style>{`
        .page-header { border-bottom: 1px solid #e0e0e0; padding: 56px 0 48px; }
        .page-header h1 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 900; color: #000; letter-spacing: -1px; line-height: 1.05; max-width: 700px; margin-bottom: 16px; }
        .page-header p { font-size: 15px; color: #666; max-width: 580px; line-height: 1.65; }
        .contact-wrap { padding: 56px 0 100px; display: grid; grid-template-columns: 1fr 340px; gap: 80px; align-items: start; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 40px; }
        .form-field { display: flex; flex-direction: column; border-bottom: 1.5px solid #000; padding-bottom: 8px; margin-bottom: 36px; }
        .form-field label { font-size: 13px; font-weight: 700; color: #000; margin-bottom: 8px; }
        .form-field label span { color: #E31837; }
        .form-field input, .form-field select, .form-field textarea {
          border: none; background: transparent; outline: none;
          font-size: 15px; font-family: inherit; color: #000; padding: 4px 0;
          -webkit-appearance: none; appearance: none;
        }
        .form-field input::placeholder, .form-field textarea::placeholder { color: #bbb; }
        .form-field select { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23000' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 4px center; padding-right: 20px; }
        .form-field--full { grid-column: 1 / -1; }
        .form-field textarea { resize: none; min-height: 80px; line-height: 1.6; padding-top: 4px; }
        .interests-section { grid-column: 1 / -1; margin-bottom: 36px; }
        .interests-label { font-size: 13px; font-weight: 700; color: #000; margin-bottom: 20px; display: block; }
        .interests-label span { color: #E31837; }
        .interests-error { font-size: 12px; color: #E31837; margin-top: 8px; }
        .interests-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px 24px; }
        .interest-item { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .interest-item input[type=checkbox] { width: 16px; height: 16px; flex-shrink: 0; cursor: pointer; -webkit-appearance: none; appearance: none; border: 1.5px solid #999; border-radius: 0; background: transparent; position: relative; }
        .interest-item input[type=checkbox]:checked { border-color: #000; background: #000; }
        .interest-item input[type=checkbox]:checked::after { content: ""; position: absolute; left: 3px; top: 0px; width: 6px; height: 10px; border: 2px solid #fff; border-top: none; border-left: none; transform: rotate(45deg); }
        .interest-item label { font-size: 13px; color: #1a1a1a; cursor: pointer; line-height: 1.4; }
        .form-divider { grid-column: 1 / -1; border: none; border-top: 1.5px solid #000; margin-bottom: 36px; }
        .form-footer-row { grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-top: 8px; }
        .opt-in-row { grid-column: 1 / -1; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px; }
        .opt-in-row input[type=checkbox] { width: 16px; height: 16px; flex-shrink: 0; margin-top: 2px; cursor: pointer; -webkit-appearance: none; appearance: none; border: 1.5px solid #999; border-radius: 0; background: transparent; position: relative; }
        .opt-in-row input[type=checkbox]:checked { border-color: #000; background: #000; }
        .opt-in-row input[type=checkbox]:checked::after { content: ""; position: absolute; left: 3px; top: 0px; width: 6px; height: 10px; border: 2px solid #fff; border-top: none; border-left: none; transform: rotate(45deg); }
        .opt-in-row label { font-size: 13px; color: #666; line-height: 1.55; cursor: pointer; }
        .form-required { font-size: 12px; color: #666; }
        .form-required a { color: #000; font-weight: 700; text-decoration: none; }
        .form-required a:hover { text-decoration: underline; }
        .submit-btn { background: #999; color: #fff; border: none; padding: 16px 48px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; white-space: nowrap; transition: background 0.15s; letter-spacing: 0.3px; }
        .submit-btn:hover { background: #000; }
        .contact-sidebar { position: sticky; top: 80px; }
        .sidebar-block { border-top: 2px solid #000; padding-top: 24px; margin-bottom: 40px; }
        .sidebar-block-label { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #555; margin-bottom: 16px; }
        .sidebar-block-title { font-size: 17px; font-weight: 900; color: #000; line-height: 1.3; letter-spacing: -0.3px; margin-bottom: 12px; }
        .sidebar-block p { font-size: 13px; color: #666; line-height: 1.65; margin-bottom: 12px; }
        .sidebar-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #000; text-decoration: none; border-bottom: 1.5px solid #000; padding-bottom: 2px; transition: opacity 0.15s; }
        .sidebar-link:hover { opacity: 0.6; }
        .sidebar-detail { font-size: 13px; color: #666; line-height: 1.8; }
        .sidebar-detail strong { color: #000; font-weight: 700; display: block; margin-bottom: 4px; }
        .form-success { text-align: center; padding: 64px 0; }
        .form-success h2 { font-size: 28px; font-weight: 900; color: #000; margin-bottom: 16px; letter-spacing: -0.5px; }
        .form-success p { font-size: 15px; color: #666; line-height: 1.65; }
        @media (max-width: 1024px) {
          .contact-wrap { grid-template-columns: 1fr; gap: 48px; }
          .contact-sidebar { position: static; }
          .interests-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 767px) {
          .page-header { padding: 36px 0 32px; }
          .contact-wrap { padding: 36px 0 64px; }
          .form-grid { grid-template-columns: 1fr; }
          .form-field--full, .interests-section, .form-divider, .opt-in-row, .form-footer-row { grid-column: 1; }
          .interests-grid { grid-template-columns: 1fr 1fr; }
          .form-footer-row { flex-direction: column; align-items: flex-start; }
          .submit-btn { width: 100%; text-align: center; }
        }
      `}</style>

      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="pg-wrap">
          <h1>Get in touch with Defence Trading</h1>
          <p>For authorised B2B procurement enquiries, partnership requests, and product information. All enquiries are reviewed by our procurement team.</p>
        </div>
      </div>

      {/* CONTACT FORM + SIDEBAR */}
      <div className="pg-wrap">
        <div className="contact-wrap">

          {/* FORM */}
          <div>
            {submitted ? (
              <div className="form-success">
                <h2>Thank you for your enquiry.</h2>
                <p>Our procurement team will review your submission and respond within 2 business days.<br />For urgent matters, contact us directly at <a href="mailto:sales@defencetrading.com">sales@defencetrading.com</a></p>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-field">
                    <label>First Name <span>*</span></label>
                    <input type="text" name="first_name" placeholder="First name" required />
                  </div>
                  <div className="form-field">
                    <label>Last Name <span>*</span></label>
                    <input type="text" name="last_name" placeholder="Last name" required />
                  </div>
                  <div className="form-field">
                    <label>Business Email <span>*</span></label>
                    <input type="email" name="email" placeholder="Work email address" required />
                  </div>

                  <div className="form-field">
                    <label>Company Name <span>*</span></label>
                    <input type="text" name="company" placeholder="Organisation name" required />
                  </div>
                  <div className="form-field">
                    <label>Country <span>*</span></label>
                    <select name="country" required>
                      <option value="" disabled>Select</option>
                      <option>United Arab Emirates</option>
                      <option>Saudi Arabia</option>
                      <option>Qatar</option>
                      <option>Kuwait</option>
                      <option>Bahrain</option>
                      <option>Oman</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>France</option>
                      <option>Poland</option>
                      <option>Turkey</option>
                      <option>Israel</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Egypt</option>
                      <option>Jordan</option>
                      <option>Morocco</option>
                      <option>Nigeria</option>
                      <option>South Africa</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Phone Number <span>*</span></label>
                    <input type="tel" name="phone" placeholder="+1 000 000 0000" required />
                  </div>

                  <div className="form-field">
                    <label>Organisation Type <span>*</span></label>
                    <select name="org_type" required>
                      <option value="" disabled>Select</option>
                      <option>Government / Ministry of Defence</option>
                      <option>Armed Forces</option>
                      <option>Prime Defence Contractor</option>
                      <option>Defence Manufacturer</option>
                      <option>Security Agency</option>
                      <option>Law Enforcement</option>
                      <option>Private Military Company</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Primary Role <span>*</span></label>
                    <select name="role" required>
                      <option value="" disabled>Select</option>
                      <option>Procurement Officer</option>
                      <option>Defence Attaché</option>
                      <option>Project Manager</option>
                      <option>Business Development</option>
                      <option>CEO / Director</option>
                      <option>Legal / Compliance</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Request Type <span>*</span></label>
                    <select name="request_type" required>
                      <option value="" disabled>Select</option>
                      <option>Product Enquiry</option>
                      <option>Company Partnership</option>
                      <option>Procurement Support</option>
                      <option>Compliance Information</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>

                  {/* INTERESTED IN */}
                  <div className="interests-section">
                    <span className="interests-label">Interested In <span>*</span></span>
                    <div className="interests-grid">
                      {['Ammunition & Ordnance','Protective Equipment','Communications & Electronics','Medical Supplies','Military Uniforms','Logistics & Supply','Military Vehicles','AI & Technology'].map(interest => (
                        <label key={interest} className="interest-item">
                          <input type="checkbox" name="interests" value={interest} onChange={() => setInterestError(false)} />
                          <span>{interest}</span>
                        </label>
                      ))}
                    </div>
                    {interestError && <div className="interests-error">Please select at least one area of interest.</div>}
                  </div>

                  <hr className="form-divider" />

                  <div className="form-field form-field--full">
                    <label>Message <span>*</span></label>
                    <textarea name="message" placeholder="Describe your procurement requirement or enquiry..." rows={4} required></textarea>
                  </div>

                  <div className="opt-in-row">
                    <input type="checkbox" id="opt-in" required />
                    <label htmlFor="opt-in">I confirm this is an authorised B2B enquiry. I agree to Defence Trading processing my data in accordance with the <Link href="/privacy">Privacy Notice</Link>. I understand that Defence Trading operates under applicable export control regulations.</label>
                  </div>

                  <div className="form-footer-row">
                    <div className="form-required">*Required fields &nbsp;|&nbsp; <Link href="/privacy">Privacy Notice</Link></div>
                    <button type="submit" className="submit-btn" disabled={submitting}>{submitting ? 'Sending…' : 'Submit Enquiry'}</button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="contact-sidebar">
            <div className="sidebar-block">
              <div className="sidebar-block-label">Response Time</div>
              <div className="sidebar-block-title">2 business days</div>
              <p>All enquiries are reviewed by our procurement team. Urgent operational requirements should be flagged in your message.</p>
            </div>
            <div className="sidebar-block">
              <div className="sidebar-block-label">Authorised Enquiries Only</div>
              <p>Defence Trading works exclusively with government entities, licensed defence contractors, and authorised procurement organisations. All transactions are subject to compliance review and applicable export control regulations.</p>
              <Link href="/export-control" className="sidebar-link">Export Control Policy →</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
