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

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-left-tag">Defence Trading Platform</div>
          <h1 className="auth-left-h1">Secure access for governments and licensed defence enterprises.</h1>
          <p className="auth-left-desc">Sign in to access advanced procurement features, real-time product availability, pricing, and direct communication with our supply chain team.</p>
          <div className="auth-left-features">
            <div className="auth-feature">
              <span className="auth-feature-icon">→</span>
              <span>Real-time product availability & pricing</span>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">→</span>
              <span>Direct enquiry management dashboard</span>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">→</span>
              <span>Export documentation & compliance tracking</span>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">→</span>
              <span>Priority access to new product listings</span>
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
          <h2 className="auth-form-title">Sign in to your account</h2>
          <p className="auth-form-sub">Enter your credentials to access the platform.</p>

          {info && <div className="auth-info">{info}</div>}
          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Email address</label>
              <input
                type="email"
                className="auth-input"
                placeholder="name@organisation.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label className="auth-label">Password</label>
                <Link href="/login" className="auth-forgot">Forgot password?</Link>
              </div>
              <input
                type="password"
                className="auth-input"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <Link href="/signup" className="auth-alt-btn">Create an account</Link>

          <p className="auth-terms">
            By signing in, you agree to our <Link href="/terms">Terms & Conditions</Link> and <Link href="/privacy">Privacy Notice</Link>.
          </p>
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
        .auth-right { flex: 0 0 520px; background: #fff; display: flex; align-items: center; justify-content: center; padding: 60px; }
        .auth-form-wrap { width: 100%; max-width: 380px; }
        .auth-logo { font-size: 22px; font-weight: 900; color: #000; letter-spacing: -1px; margin-bottom: 40px; text-decoration: none; display: block; }
        .auth-form-title { font-size: 24px; font-weight: 700; color: #000; margin-bottom: 8px; }
        .auth-form-sub { font-size: 14px; color: #888; margin-bottom: 32px; }
        .auth-form { display: flex; flex-direction: column; gap: 20px; }
        .auth-field { display: flex; flex-direction: column; gap: 6px; }
        .auth-label { font-size: 13px; font-weight: 600; color: #333; }
        .auth-label-row { display: flex; justify-content: space-between; align-items: center; }
        .auth-forgot { font-size: 12px; color: #888; text-decoration: none; transition: color 0.15s; }
        .auth-forgot:hover { color: #000; }
        .auth-input { width: 100%; padding: 12px 14px; font-size: 14px; font-family: inherit; border: 1px solid #ddd; outline: none; transition: border-color 0.15s; background: #fafafa; }
        .auth-input:focus { border-color: #000; background: #fff; }
        .auth-input::placeholder { color: #bbb; }
        .auth-submit { width: 100%; padding: 14px; font-size: 14px; font-weight: 700; font-family: inherit; background: #000; color: #fff; border: none; cursor: pointer; transition: background 0.15s; margin-top: 4px; }
        .auth-submit:hover { background: #222; }
        .auth-submit:disabled { background: #666; cursor: not-allowed; }
        .auth-error { background: #fff3f3; border: 1px solid #fdd; color: #c00; font-size: 13px; padding: 12px 14px; margin-bottom: 8px; line-height: 1.5; }
        .auth-info { background: #f0f9f0; border: 1px solid #cec; color: #2a7a2a; font-size: 13px; padding: 12px 14px; margin-bottom: 8px; line-height: 1.5; }
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
