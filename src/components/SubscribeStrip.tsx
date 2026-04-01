'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SubscribeStrip() {
  const [toast, setToast] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.querySelector('input[type=email]') as HTMLInputElement)?.value?.trim()
    const company = (form.querySelector('.sub-field input[type=text]') as HTMLInputElement)?.value?.trim()
    const location = (form.querySelector('select') as HTMLSelectElement)?.value?.trim()
    setSubmitting(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, location })
      })
      const d = await res.json()
      if (d.ok) {
        form.reset()
        showToast()
      } else {
        showToast()
      }
    } catch {
      showToast()
    } finally {
      setSubmitting(false)
    }
  }

  function showToast() {
    setToast(true)
    setTimeout(() => setToast(false), 4000)
  }

  return (
    <>
      <div className="subscribe-strip">
        <div className="pg-wrap">
          <h2>Subscribe to Defence Trading&apos;s Insights</h2>
          <p className="sub-intro">To receive the latest procurement intelligence, product updates, and market analysis — sign up below.</p>
          <form onSubmit={handleSubmit}>
            <div className="sub-fields">
              <div className="sub-field">
                <label>Email <span>*</span></label>
                <input type="email" placeholder="Work email address" required />
              </div>
              <div className="sub-field">
                <label>Location <span>*</span></label>
                <select required>
                  <option value="" disabled>Select</option>
                  <option>United Arab Emirates</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Poland</option>
                  <option>Saudi Arabia</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="sub-field">
                <label>Company <span>*</span></label>
                <input type="text" placeholder="Your organisation" required />
              </div>
            </div>
            <div className="sub-check">
              <input type="checkbox" id="sub-consent" required />
              <label htmlFor="sub-consent">Please click here to opt-in to receiving procurement insights and marketing communications from Defence Trading. Data collected will be processed in accordance with our privacy notice. You may unsubscribe at any time.</label>
            </div>
            <div className="sub-footer-row">
              <div className="sub-required">*Required information &nbsp;|&nbsp; Read our <Link href="/privacy">Privacy notice</Link></div>
              <button type="submit" className="sub-btn" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Subscribe to Defence Trading'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={`sub-toast${toast ? ' show' : ''}`}>
        You have subscribed to Defence Trading&apos;s Insights.
      </div>
    </>
  )
}
