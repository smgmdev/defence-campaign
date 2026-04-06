'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function VerifyContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [name, setName] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      return
    }

    fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success')
          setName(data.name || '')
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <div className="verify-page">
      <div className="verify-card">
        <Link href="/" className="verify-logo">DefenceTrading<span className="brand-dot"></span></Link>

        {status === 'loading' && (
          <div className="verify-loading">
            <div className="verify-spinner" />
            <p>Verifying your email...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="verify-result">
            <div className="verify-icon verify-icon--success">✓</div>
            <h2>Email Verified</h2>
            <p>Thank you{name ? `, ${name}` : ''}. Your email has been verified and your account is now active.</p>
            <Link href="/login" className="verify-btn">Sign In to Your Account</Link>
          </div>
        )}

        {status === 'error' && (
          <div className="verify-result">
            <div className="verify-icon verify-icon--error">✕</div>
            <h2>Verification Failed</h2>
            <p>This verification link is invalid or has expired. Please try registering again or contact sales@defencetrading.com.</p>
            <Link href="/signup" className="verify-btn">Register Again</Link>
          </div>
        )}
      </div>

      <style>{`
        .verify-page { min-height: 100vh; background: #f5f5f5; display: flex; align-items: center; justify-content: center; padding: 20px; margin-top: -92px; }
        .verify-card { background: #fff; padding: 48px; max-width: 480px; width: 100%; text-align: center; }
        .verify-logo { font-size: 22px; font-weight: 900; color: #000; letter-spacing: -1px; text-decoration: none; display: block; margin-bottom: 40px; }
        .verify-loading { padding: 40px 0; }
        .verify-loading p { font-size: 14px; color: #888; margin-top: 16px; }
        .verify-spinner { width: 32px; height: 32px; border: 3px solid #eee; border-top-color: #000; border-radius: 50%; animation: spin 0.7s linear infinite; margin: 0 auto; }
        .verify-result { padding: 20px 0; }
        .verify-icon { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700; margin: 0 auto 20px; }
        .verify-icon--success { background: #000; color: #fff; }
        .verify-icon--error { background: #fee; color: #c00; }
        .verify-result h2 { font-size: 22px; font-weight: 700; color: #000; margin-bottom: 12px; }
        .verify-result p { font-size: 14px; color: #666; line-height: 1.7; margin-bottom: 28px; }
        .verify-btn { display: inline-block; background: #000; color: #fff; padding: 14px 36px; font-size: 14px; font-weight: 700; text-decoration: none; transition: background 0.15s; }
        .verify-btn:hover { background: #333; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  )
}
