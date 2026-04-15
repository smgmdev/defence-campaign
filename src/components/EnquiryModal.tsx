'use client'

import { useState, useEffect } from 'react'

interface EnquiryModalProps {
  product: { name: string; calibre: string } | null
  onClose: () => void
}

const COUNTRIES = [
  'United Arab Emirates','Saudi Arabia','Qatar','Kuwait','Bahrain','Oman',
  'United States','United Kingdom','Germany','France','Poland','Turkey',
  'Israel','India','Pakistan','Egypt','Jordan','Morocco','Nigeria','South Africa','Other',
]

export default function EnquiryModal({ product, onClose }: EnquiryModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!product) {
      setSubmitted(false)
      setError(false)
      setSubmitting(false)
    }
  }, [product])

  useEffect(() => {
    if (!product) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!product) return
    const f = new FormData(e.currentTarget)
    setSubmitting(true)
    setError(false)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: product.name,
          calibre: product.calibre,
          full_name: f.get('full_name'),
          company: f.get('company'),
          country: f.get('country'),
          email: f.get('email'),
          whatsapp: f.get('whatsapp'),
        }),
      })
      if (res.ok) setSubmitted(true)
      else setError(true)
    } catch {
      setError(true)
    }
    setSubmitting(false)
  }

  return (
    <>
      <div className={`enq-overlay${product ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
        <div className="enq-modal">
          <button className="enq-modal-close" onClick={onClose} aria-label="Close">×</button>
          {product && !submitted && (
            <>
              <div className="enq-label">Product Enquiry</div>
              <div className="enq-title">Request Information</div>
              <div className="enq-product-name">{product.name}{product.calibre ? ` — ${product.calibre}` : ''}</div>
              <form onSubmit={handleSubmit}>
                <div className="enq-grid">
                  <div className="enq-field">
                    <label>Full Name *</label>
                    <input type="text" name="full_name" placeholder="Full name" required />
                  </div>
                  <div className="enq-field">
                    <label>Company Name *</label>
                    <input type="text" name="company" placeholder="Company / Government body" required />
                  </div>
                </div>
                <div className="enq-field">
                  <label>Country *</label>
                  <div className="enq-select-wrap">
                    <select name="country" required defaultValue="">
                      <option value="" disabled>Select country</option>
                      {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="enq-grid">
                  <div className="enq-field">
                    <label>Business Email *</label>
                    <input type="email" name="email" placeholder="Work email address" required />
                  </div>
                  <div className="enq-field">
                    <label>WhatsApp Number *</label>
                    <input type="tel" name="whatsapp" placeholder="+1 000 000 0000" required />
                  </div>
                </div>
                {error && <div style={{ color: '#E31837', fontSize: '13px', marginBottom: '8px' }}>Something went wrong — please try again.</div>}
                <button type="submit" className="enq-submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Enquiry'}
                </button>
              </form>
            </>
          )}
          {product && submitted && (
            <div className="enq-success">
              <div className="enq-success-icon"></div>
              <h3>Enquiry Submitted</h3>
              <p>Our procurement team will review your request and respond within 2 business days.</p>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .enq-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 9000; align-items: center; justify-content: center; padding: 20px; }
        .enq-overlay.open { display: flex; }
        .enq-modal { background: #fff; width: 100%; max-width: 520px; padding: 40px; position: relative; max-height: 90vh; overflow-y: auto; }
        .enq-modal-close { position: absolute; top: 16px; right: 20px; font-size: 22px; font-weight: 300; cursor: pointer; color: #555; line-height: 1; background: none; border: none; }
        .enq-modal-close:hover { color: #000; }
        .enq-label { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #c8102e; margin-bottom: 8px; }
        .enq-title { font-size: 20px; font-weight: 900; color: #000; margin-bottom: 6px; line-height: 1.2; }
        .enq-product-name { font-size: 13px; color: #555; margin-bottom: 24px; }
        .enq-field { margin-bottom: 16px; }
        .enq-field label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #333; margin-bottom: 6px; }
        .enq-field input, .enq-field select { width: 100%; padding: 11px 14px; border: 1.5px solid #ccc; border-radius: 0; font-size: 14px; font-family: inherit; outline: none; box-sizing: border-box; transition: border-color 0.15s; background: #fff; appearance: none; -webkit-appearance: none; }
        .enq-field input:focus, .enq-field select:focus { border-color: #000; }
        .enq-select-wrap { position: relative; }
        .enq-select-wrap::after { content: ''; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid #000; pointer-events: none; }
        .enq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .enq-submit { width: 100%; background: #000; color: #fff; border: none; padding: 14px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; margin-top: 8px; transition: background 0.15s; }
        .enq-submit:hover { background: #c8102e; }
        .enq-submit:disabled { opacity: 0.7; cursor: wait; }
        .enq-success { text-align: center; padding: 24px 0; }
        .enq-success-icon { font-size: 40px; margin-bottom: 12px; }
        .enq-success h3 { font-size: 20px; font-weight: 900; margin-bottom: 8px; }
        .enq-success p { font-size: 14px; color: #555; }
        @media (max-width: 767px) {
          .enq-grid { grid-template-columns: 1fr; gap: 0; }
          .enq-modal { padding: 28px 20px; }
        }
      `}</style>
    </>
  )
}
