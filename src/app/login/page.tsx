'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const verified = searchParams.get('verified')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState('')
  const [showForgot, setShowForgot] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const [resetMsg, setResetMsg] = useState('')
  const [resetError, setResetError] = useState('')

  useEffect(() => {
    if (verified) setInfo('Email verified successfully. You can now sign in.')
  }, [verified])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setInfo('')
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    router.push('/account')
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    setResetError('')
    setResetMsg('')
    setResetLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/account`,
    })
    setResetLoading(false)
    if (error) {
      setResetError(error.message)
    } else {
      setResetMsg('Password reset link sent. Check your email.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-inner">
          <Link href="/" className="auth-left-logo">DefenceTrading<span className="brand-dot"></span></Link>
          <div className="auth-left-bottom">
            <p className="auth-left-cta">New to Defence Trading?</p>
            <Link href="/signup" className="auth-left-create">CREATE AN ACCOUNT &rsaquo;</Link>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h1 className="auth-form-title">Sign In</h1>

          {info && <div className="auth-info">{info}</div>}
          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Email Address</label>
              <input
                type="email"
                className="auth-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                type="password"
                className="auth-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-remember-row">
              <label className="auth-remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Signing in...' : 'NEXT'}
              </button>
            </div>
          </form>

          <div className="auth-links-section">
            <button type="button" className="auth-forgot" onClick={() => setShowForgot(!showForgot)}>
              <span className={`auth-forgot-arrow${showForgot ? ' open' : ''}`}>&#x276F;</span> Forgot Your Password?
            </button>
            {showForgot && (
              <div className="auth-reset-form">
                {resetMsg && <div className="auth-info">{resetMsg}</div>}
                {resetError && <div className="auth-error">{resetError}</div>}
                <form onSubmit={handleResetPassword}>
                  <div className="auth-field">
                    <label className="auth-label">Enter your email address</label>
                    <input
                      type="email"
                      className="auth-input"
                      value={resetEmail}
                      onChange={e => setResetEmail(e.target.value)}
                      placeholder="name@organisation.com"
                      required
                    />
                  </div>
                  <button type="submit" className="auth-reset-btn" disabled={resetLoading}>
                    {resetLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              </div>
            )}
          </div>

          <p className="auth-terms">
            By signing in, you agree to our <Link href="/terms">Terms & Conditions</Link> and <Link href="/privacy">Privacy Notice</Link>.
          </p>

        </div>
        <div className="auth-footer">
          <span>© 2026 Defence Trading. All rights reserved.</span>
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
        .auth-right-logo { font-size: 22px; font-weight: 900; color: #000; letter-spacing: -1px; text-decoration: none; display: block; margin-bottom: 48px; }
        .auth-form-title { font-size: clamp(36px, 5vw, 48px); font-weight: 900; color: #000; margin-bottom: 40px; letter-spacing: -1px; }
        .auth-form { display: flex; flex-direction: column; gap: 24px; }
        .auth-field { display: flex; flex-direction: column; gap: 8px; }
        .auth-label { font-size: 14px; font-weight: 600; color: #000; }
        .auth-input { width: 100%; padding: 14px 16px; font-size: 15px; font-family: inherit; border: 1px solid #ccc; outline: none; transition: border-color 0.15s; background: #fff; box-sizing: border-box; }
        .auth-input:focus { border-color: #000; }

        .auth-remember-row { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
        .auth-remember { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #333; cursor: pointer; }
        .auth-remember input[type="checkbox"] { width: 16px; height: 16px; accent-color: #000; cursor: pointer; }
        .auth-submit { padding: 14px 40px; font-size: 14px; font-weight: 800; font-family: inherit; background: #F5C400; color: #000; border: none; cursor: pointer; letter-spacing: 1px; transition: background 0.15s; }
        .auth-submit:hover { background: #e0b200; }
        .auth-submit:disabled { background: #ddd; color: #999; cursor: not-allowed; }

        .auth-links-section { margin-top: 40px; }
        .auth-forgot { font-size: 15px; font-weight: 700; color: #000; text-decoration: none; transition: opacity 0.15s; background: none; border: none; cursor: pointer; padding: 0; font-family: inherit; display: flex; align-items: center; gap: 6px; }
        .auth-forgot:hover { opacity: 0.6; }
        .auth-forgot-arrow { display: inline-flex; align-items: center; font-size: 12px; transition: transform 0.25s ease; transform: rotate(0deg); line-height: 1; }
        .auth-forgot-arrow.open { transform: rotate(90deg); }
        .auth-reset-form { margin-top: 20px; padding: 24px; background: #fafafa; border: 1px solid #eee; }
        .auth-reset-form .auth-field { margin-bottom: 16px; }
        .auth-reset-btn { width: 100%; padding: 14px; font-size: 14px; font-weight: 700; font-family: inherit; background: #000; color: #fff; border: none; cursor: pointer; transition: background 0.15s; }
        .auth-reset-btn:hover { background: #222; }
        .auth-reset-btn:disabled { background: #666; cursor: not-allowed; }

        .auth-help-section { margin-top: 40px; }
        .auth-help-divider { height: 2px; background: #000; }
        .auth-help-details { padding: 16px 0; }
        .auth-help-details summary {
          font-size: 14px; font-weight: 800; letter-spacing: 1px; color: #000; cursor: pointer;
          list-style: none; display: flex; align-items: center; gap: 8px;
        }
        .auth-help-details summary::before { content: '▾'; font-size: 12px; }
        .auth-help-details[open] summary::before { content: '▴'; }
        .auth-help-details summary::-webkit-details-marker { display: none; }
        .auth-help-details p { font-size: 14px; color: #555; line-height: 1.7; margin-top: 12px; }
        .auth-help-details p a { color: #000; font-weight: 600; }

        .auth-error { background: #fff3f3; border: 1px solid #fdd; color: #c00; font-size: 13px; padding: 12px 14px; margin-bottom: 8px; line-height: 1.5; }
        .auth-info { background: #f0f9f0; border: 1px solid #cec; color: #2a7a2a; font-size: 13px; padding: 12px 14px; margin-bottom: 8px; line-height: 1.5; }

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
          .auth-left-logo { font-size: 22px; }
          .auth-right { flex: 1; padding: 48px 24px 40px; }
          .auth-form-title { font-size: 32px; margin-bottom: 32px; }
        }
      `}</style>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
