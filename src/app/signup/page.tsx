'use client'

import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', body: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
          body: form.body,
        },
        emailRedirectTo: `${window.location.origin}/login?verified=true`,
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Notify sales about new registration
    await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, body: form.body, email: form.email }),
    })

    setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-left-tag">Defence Trading Platform</div>
          <h1 className="auth-left-h1">Register for secure platform access.</h1>
          <p className="auth-left-desc">Create an account to access advanced procurement features, product availability, and direct communication with our supply chain team.</p>
          <div className="auth-left-features">
            <div className="auth-feature">
              <span className="auth-feature-icon">→</span>
              <span>Verified government & defence enterprise accounts</span>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">→</span>
              <span>Counterparty qualification required</span>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">→</span>
              <span>All accounts subject to compliance review</span>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">→</span>
              <span>Access granted upon email verification</span>
            </div>
          </div>
        </div>
        <div className="auth-left-footer">
          <span>© 2026 Defence Trading. All rights reserved.</span>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <Link href="/" className="auth-logo">DefenceTrading<span className="brand-dot"></span></Link>
          <h2 className="auth-form-title">Create an account</h2>
          <p className="auth-form-sub">All registrations require email verification.</p>

          {success ? (
            <div className="auth-success">
              <div className="auth-success-icon">✓</div>
              <h3 className="auth-success-title">Check Your Email</h3>
              <p className="auth-success-text">We sent a verification link to <strong>{form.email}</strong>. Click the link to verify your account and get started.</p>
              <p className="auth-success-text" style={{fontSize: '12px', color: '#aaa', marginTop: '12px'}}>Didn&apos;t receive it? Check your spam folder or contact sales@defencetrading.com.</p>
              <Link href="/login" className="auth-alt-btn" style={{marginTop: '24px'}}>Go to Sign In</Link>
            </div>
          ) : (<>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Full name</label>
              <input type="text" className="auth-input" placeholder="Your full name" value={form.name} onChange={e => update('name', e.target.value)} required />
            </div>

            <div className="auth-field">
              <label className="auth-label">Body</label>
              <select className="auth-input" value={form.body} onChange={e => update('body', e.target.value)} required>
                <option value="" disabled>Select your organisation type</option>
                <option value="Government">Government</option>
                <option value="Licensed Defence Enterprise">Licensed Defence Enterprise</option>
                <option value="Individual Broker">Individual Broker</option>
                <option value="Defence Contractor">Defence Contractor</option>
                <option value="Law Enforcement Agency">Law Enforcement Agency</option>
                <option value="Intelligence & Security Service">Intelligence & Security Service</option>
                <option value="Allied & Coalition Command">Allied & Coalition Command</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="auth-field">
              <label className="auth-label">Work email</label>
              <input type="email" className="auth-input" placeholder="name@organisation.com" value={form.email} onChange={e => update('email', e.target.value)} required />
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input type="password" className="auth-input" placeholder="Minimum 8 characters" value={form.password} onChange={e => update('password', e.target.value)} required />
            </div>

            <div className="auth-field">
              <label className="auth-label">Confirm password</label>
              <input type="password" className="auth-input" placeholder="Re-enter your password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} required />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <Link href="/login" className="auth-alt-btn">Sign in to existing account</Link>

          <p className="auth-terms">
            By creating an account, you agree to our <Link href="/terms">Terms & Conditions</Link> and <Link href="/privacy">Privacy Notice</Link>. All accounts are subject to Defence Trading&apos;s counterparty qualification policy.
          </p>

          </>)}
        </div>
      </div>

      <style>{`
        .auth-page { display: flex; min-height: 100vh; margin-top: -92px; padding-top: 0; }
        .auth-left { flex: 1; background: #0a0a0a; display: flex; flex-direction: column; justify-content: space-between; padding: 80px 60px 40px; }
        .auth-left-content { max-width: 520px; padding-top: 60px; }
        .auth-left-tag { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: rgba(255,255,255,0.35); text-transform: uppercase; margin-bottom: 24px; }
        .auth-left-h1 { font-size: clamp(28px, 3.5vw, 40px); font-weight: 400; color: #fff; line-height: 1.2; margin-bottom: 20px; }
        .auth-left-desc { font-size: 15px; color: rgba(255,255,255,0.45); line-height: 1.75; margin-bottom: 40px; }
        .auth-left-features { display: flex; flex-direction: column; gap: 14px; }
        .auth-feature { display: flex; align-items: center; gap: 12px; font-size: 14px; color: rgba(255,255,255,0.55); }
        .auth-feature-icon { color: rgba(255,255,255,0.25); font-size: 12px; }
        .auth-left-footer { font-size: 12px; color: rgba(255,255,255,0.2); }
        .auth-right { flex: 0 0 520px; background: #fff; display: flex; align-items: center; justify-content: center; padding: 60px; overflow-y: auto; }
        .auth-form-wrap { width: 100%; max-width: 380px; }
        .auth-logo { font-size: 22px; font-weight: 900; color: #000; letter-spacing: -1px; margin-bottom: 40px; text-decoration: none; display: block; }
        .auth-form-title { font-size: 24px; font-weight: 700; color: #000; margin-bottom: 8px; }
        .auth-form-sub { font-size: 14px; color: #888; margin-bottom: 32px; }
        .auth-form { display: flex; flex-direction: column; gap: 20px; }
        .auth-field { display: flex; flex-direction: column; gap: 6px; }
        .auth-label { font-size: 13px; font-weight: 600; color: #333; }
        .auth-input { width: 100%; padding: 12px 14px; font-size: 14px; font-family: inherit; border: 1px solid #ddd; outline: none; transition: border-color 0.15s; background: #fafafa; }
        .auth-input:focus { border-color: #000; background: #fff; }
        .auth-input::placeholder { color: #bbb; }
        .auth-submit { width: 100%; padding: 14px; font-size: 14px; font-weight: 700; font-family: inherit; background: #000; color: #fff; border: none; cursor: pointer; transition: background 0.15s; margin-top: 4px; }
        .auth-submit:hover { background: #222; }
        .auth-submit:disabled { background: #666; cursor: not-allowed; }
        .auth-error { background: #fff3f3; border: 1px solid #fdd; color: #c00; font-size: 13px; padding: 12px 14px; margin-bottom: 8px; line-height: 1.5; }
        .auth-success { text-align: center; padding: 40px 0; }
        .auth-success-icon { width: 56px; height: 56px; background: #000; color: #fff; font-size: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .auth-success-title { font-size: 22px; font-weight: 700; color: #000; margin-bottom: 12px; }
        .auth-success-text { font-size: 14px; color: #666; line-height: 1.7; }
        .auth-divider { text-align: center; margin: 24px 0; position: relative; }
        .auth-divider::before { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: #eee; }
        .auth-divider span { background: #fff; padding: 0 16px; font-size: 12px; color: #bbb; position: relative; }
        .auth-alt-btn { display: block; width: 100%; padding: 14px; font-size: 14px; font-weight: 700; text-align: center; color: #000; background: #fff; border: 2px solid #000; text-decoration: none; transition: background 0.15s; }
        .auth-alt-btn:hover { background: #f5f5f5; }
        .auth-terms { font-size: 11px; color: #aaa; margin-top: 24px; line-height: 1.6; text-align: center; }
        .auth-terms a { color: #888; text-decoration: underline; }
        @media (max-width: 960px) {
          .auth-left { display: none; }
          .auth-right { flex: 1; }
          .auth-page { margin-top: 0; }
        }
        @media (max-width: 600px) {
          .auth-right { padding: 32px 20px; }
        }
      `}</style>
    </div>
  )
}
