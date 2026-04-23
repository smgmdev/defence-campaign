'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', body: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bodyOpen, setBodyOpen] = useState(false)
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setBodyOpen(false) }
    function onClick(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('.custom-select-wrap')) setBodyOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick) }
  }, [])

  const bodyOptions = [
    'Government',
    'Licensed Defence Enterprise',
    'Individual Broker',
    'Defence Contractor',
    'Law Enforcement Agency',
    'Intelligence & Security Service',
    'Allied & Coalition Command',
    'Other',
  ]

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
        <div className="auth-left-inner">
          <Link href="/" className="auth-left-logo">DefenceTrading<span className="brand-dot"></span></Link>
          <div className="auth-left-bottom">
            <p className="auth-left-cta">Already have an account?</p>
            <Link href="/login" className="auth-left-create">SIGN IN &rsaquo;</Link>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h1 className="auth-form-title">Create Account</h1>

          {success ? (
            <div className="auth-success">
              <div className="auth-success-icon">&#10003;</div>
              <h3 className="auth-success-title">Check Your Email</h3>
              <p className="auth-success-text">We sent a verification link to <strong>{form.email}</strong>. Click the link to verify your account and get started.</p>
              <p className="auth-success-text" style={{fontSize: '12px', color: '#aaa', marginTop: '12px'}}>Didn&apos;t receive it? Check your spam folder or contact sales@defencetrading.com.</p>
              <Link href="/login" className="auth-goto-login" style={{marginTop: '24px'}}>Go to Sign In</Link>
            </div>
          ) : (<>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Full Name</label>
              <input type="text" className="auth-input" value={form.name} onChange={e => update('name', e.target.value)} required />
            </div>

            <div className="auth-field">
              <label className="auth-label">Organisation Type</label>
              <input type="hidden" value={form.body} required />
              <div className="custom-select-wrap">
                <button type="button" className={`custom-select-trigger${form.body ? ' has-value' : ''}`} onClick={() => setBodyOpen(!bodyOpen)}>
                  <span>{form.body || 'Select your organisation type'}</span>
                  <span className={`custom-select-arrow${bodyOpen ? ' open' : ''}`}>&#x276F;</span>
                </button>
                {bodyOpen && (
                  <div className="custom-select-options">
                    {bodyOptions.map(opt => (
                      <div
                        key={opt}
                        className={`custom-select-option${form.body === opt ? ' selected' : ''}`}
                        onClick={() => { update('body', opt); setBodyOpen(false) }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label">Work Email</label>
              <input type="email" className="auth-input" value={form.email} onChange={e => update('email', e.target.value)} required />
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input type="password" className="auth-input" placeholder="Minimum 8 characters" value={form.password} onChange={e => update('password', e.target.value)} required />
            </div>

            <div className="auth-field">
              <label className="auth-label">Confirm Password</label>
              <input type="password" className="auth-input" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} required />
            </div>

            <div className="auth-submit-row">
              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Creating...' : 'CREATE ACCOUNT'}
              </button>
            </div>
          </form>

          <p className="auth-terms">
            By creating an account, you agree to our <Link href="/terms">Terms & Conditions</Link> and <Link href="/privacy">Privacy Notice</Link>. All accounts are subject to Defence Trading&apos;s counterparty qualification policy.
          </p>

          </>)}
        </div>
        <div className="auth-footer">
          <span>&copy; 2026 Defence Trading by Black Rock Military, Abu Dhabi. License No: CN-6183305. All rights reserved.</span>
        </div>
      </div>

      <style>{`
        .auth-page { display: flex; min-height: 100vh; margin-top: -92px; padding-top: 0; }

        .auth-left { flex: 0 0 44%; background: #F5C400; display: flex; flex-direction: column; }
        .auth-left-inner { display: flex; flex-direction: column; height: 100%; padding: 120px 60px 60px; }
        .auth-left-logo { font-size: 32px; font-weight: 900; color: #000; letter-spacing: -1px; text-decoration: none; display: block; margin-bottom: 80px; }
        .auth-left-bottom { }
        .auth-left-cta { font-size: 18px; font-weight: 400; color: #000; margin-bottom: 8px; }
        .auth-left-create { font-size: 14px; font-weight: 800; color: #000; text-decoration: none; letter-spacing: 1px; display: inline-block; border-bottom: 2px solid #000; padding-bottom: 2px; transition: opacity 0.15s; }
        .auth-left-create:hover { opacity: 0.7; }

        .auth-right { flex: 1; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 140px 80px 60px; overflow-y: auto; }
        .auth-form-wrap { width: 100%; max-width: 480px; }
        .auth-form-title { font-size: clamp(36px, 5vw, 48px); font-weight: 900; color: #000; margin-bottom: 40px; letter-spacing: -1px; }
        .auth-form { display: flex; flex-direction: column; gap: 24px; }
        .auth-field { display: flex; flex-direction: column; gap: 8px; }
        .auth-label { font-size: 14px; font-weight: 600; color: #000; }
        .auth-input { width: 100%; padding: 14px 16px; font-size: 15px; font-family: inherit; border: 1px solid #ccc; outline: none; transition: border-color 0.15s; background: #fff; box-sizing: border-box; }
        .auth-input:focus { border-color: #000; }
        .auth-input::placeholder { color: #bbb; }

        .auth-submit-row { display: flex; justify-content: flex-end; margin-top: 8px; }
        .auth-submit { padding: 14px 40px; font-size: 14px; font-weight: 800; font-family: inherit; background: #F5C400; color: #000; border: none; cursor: pointer; letter-spacing: 1px; transition: background 0.15s; }
        .auth-submit:hover { background: #e0b200; }
        .auth-submit:disabled { background: #ddd; color: #999; cursor: not-allowed; }

        .custom-select-wrap { position: relative; }
        .custom-select-trigger {
          width: 100%; padding: 14px 16px; font-size: 15px; font-family: inherit;
          border: 1px solid #ccc; background: #fff; cursor: pointer; text-align: left;
          display: flex; align-items: center; justify-content: space-between;
          transition: border-color 0.15s; box-sizing: border-box; color: #999;
        }
        .custom-select-trigger.has-value { color: #000; }
        .custom-select-trigger:hover { border-color: #000; }
        .custom-select-arrow {
          font-size: 12px; color: #000; transition: transform 0.25s ease;
          transform: rotate(90deg); display: inline-flex; align-items: center; line-height: 1;
        }
        .custom-select-arrow.open { transform: rotate(270deg); }
        .custom-select-options {
          position: absolute; top: 100%; left: 0; right: 0; background: #fff;
          border: 1px solid #000; border-top: none; z-index: 50; max-height: 280px; overflow-y: auto;
        }
        .custom-select-option {
          padding: 12px 16px; font-size: 14px; color: #333; cursor: pointer;
          transition: background 0.1s;
        }
        .custom-select-option:hover { background: #f5f5f5; }
        .custom-select-option.selected { background: #000; color: #fff; font-weight: 600; }

        .auth-error { background: #fff3f3; border: 1px solid #fdd; color: #c00; font-size: 13px; padding: 12px 14px; margin-bottom: 8px; line-height: 1.5; }

        .auth-success { text-align: center; padding: 40px 0; }
        .auth-success-icon { width: 56px; height: 56px; background: #000; color: #fff; font-size: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .auth-success-title { font-size: 22px; font-weight: 700; color: #000; margin-bottom: 12px; }
        .auth-success-text { font-size: 14px; color: #666; line-height: 1.7; }
        .auth-goto-login { display: block; width: 100%; padding: 14px; font-size: 14px; font-weight: 700; text-align: center; color: #000; background: #F5C400; text-decoration: none; transition: background 0.15s; }
        .auth-goto-login:hover { background: #e0b200; }

        .auth-terms { font-size: 11px; color: #aaa; margin-top: 32px; line-height: 1.6; }
        .auth-terms a { color: #888; text-decoration: underline; }

        .auth-footer { margin-top: auto; padding-top: 40px; font-size: 12px; color: #ccc; width: 100%; max-width: 480px; }

        @media (max-width: 960px) {
          .auth-page { flex-direction: column; margin-top: -92px; }
          .auth-left { flex: none; }
          .auth-left-inner {
            flex-direction: row; align-items: center; justify-content: space-between;
            padding: 20px 24px;
          }
          .auth-left-bottom { margin-top: 0; text-align: right; }
          .auth-left-cta { font-size: 14px; margin-bottom: 2px; }
          .auth-left-create { font-size: 12px; }
          .auth-left-logo { font-size: 22px; margin-bottom: 0; }
          .auth-right { flex: 1; padding: 48px 24px 40px; }
          .auth-form-title { font-size: 32px; margin-bottom: 32px; }
        }
      `}</style>
    </div>
  )
}
