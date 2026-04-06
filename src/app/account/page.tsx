'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; email: string; full_name: string; body: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [delLoading, setDelLoading] = useState(false)

  // Password change
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwMsg, setPwMsg] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwLoading, setPwLoading] = useState(false)

  // Email change
  const [newEmail, setNewEmail] = useState('')
  const [emMsg, setEmMsg] = useState('')
  const [emError, setEmError] = useState('')
  const [emLoading, setEmLoading] = useState(false)

  // Profile
  const [fullName, setFullName] = useState('')
  const [profMsg, setProfMsg] = useState('')
  const [profLoading, setProfLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login')
        return
      }
      const meta = data.user.user_metadata || {}
      setUser({
        id: data.user.id,
        email: data.user.email || '',
        full_name: meta.full_name || '',
        body: meta.body || '',
      })
      setFullName(meta.full_name || '')
      setLoading(false)
    })
  }, [router])

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    setPwMsg('')
    setPwError('')

    if (newPassword.length < 8) {
      setPwError('Password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPwError('Passwords do not match.')
      return
    }

    setPwLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setPwError(error.message)
    } else {
      setPwMsg('Password updated successfully.')
      setNewPassword('')
      setConfirmPassword('')
    }
    setPwLoading(false)
  }

  async function handleEmailChange(e: React.FormEvent) {
    e.preventDefault()
    setEmMsg('')
    setEmError('')

    if (!newEmail) {
      setEmError('Please enter a new email address.')
      return
    }

    setEmLoading(true)
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    if (error) {
      setEmError(error.message)
    } else {
      setEmMsg('Verification email sent to your new address. Please confirm to complete the change.')
      setNewEmail('')
    }
    setEmLoading(false)
  }

  async function handleProfileUpdate(e: React.FormEvent) {
    e.preventDefault()
    setProfMsg('')
    setProfLoading(true)

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    })

    if (!error) {
      setProfMsg('Profile updated.')
      setUser(prev => prev ? { ...prev, full_name: fullName } : prev)
    }
    setProfLoading(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>
  }

  if (!user) return null

  return (
    <>
      <div className="acc-page">
        <div className="pg-wrap">
          <div className="acc-header">
            <div>
              <h1 className="acc-h1">Account Settings</h1>
              <p className="acc-sub">Manage your account, security, and preferences.</p>
            </div>
            <button className="acc-signout" onClick={handleSignOut}>Sign Out</button>
          </div>

          <div className="acc-grid">
            {/* Profile Card */}
            <div className="acc-card">
              <div className="acc-card-head">
                <h2>Profile</h2>
              </div>
              <div className="acc-card-body">
                <div className="acc-info-row">
                  <span className="acc-info-label">Email</span>
                  <span className="acc-info-value">{user.email}</span>
                </div>
                <div className="acc-info-row">
                  <span className="acc-info-label">Body</span>
                  <span className="acc-info-value">{user.body || '—'}</span>
                </div>
                <form onSubmit={handleProfileUpdate} style={{ marginTop: '20px' }}>
                  <label className="acc-label">Full name</label>
                  <input className="acc-input" type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
                  {profMsg && <div className="acc-msg">{profMsg}</div>}
                  <button className="acc-btn" type="submit" disabled={profLoading}>
                    {profLoading ? 'Saving...' : 'Update Profile'}
                  </button>
                </form>
              </div>
            </div>

            {/* Change Password */}
            <div className="acc-card">
              <div className="acc-card-head">
                <h2>Change Password</h2>
              </div>
              <div className="acc-card-body">
                <form onSubmit={handlePasswordChange}>
                  <label className="acc-label">New password</label>
                  <input className="acc-input" type="password" placeholder="Minimum 8 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                  <label className="acc-label" style={{ marginTop: '14px' }}>Confirm new password</label>
                  <input className="acc-input" type="password" placeholder="Re-enter new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                  {pwError && <div className="acc-error">{pwError}</div>}
                  {pwMsg && <div className="acc-msg">{pwMsg}</div>}
                  <button className="acc-btn" type="submit" disabled={pwLoading}>
                    {pwLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>

            {/* Change Email */}
            <div className="acc-card">
              <div className="acc-card-head">
                <h2>Change Email</h2>
              </div>
              <div className="acc-card-body">
                <form onSubmit={handleEmailChange}>
                  <p className="acc-note">Current email: {user.email}</p>
                  <label className="acc-label">New email address</label>
                  <input className="acc-input" type="email" placeholder="new@organisation.com" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                  {emError && <div className="acc-error">{emError}</div>}
                  {emMsg && <div className="acc-msg">{emMsg}</div>}
                  <button className="acc-btn" type="submit" disabled={emLoading}>
                    {emLoading ? 'Sending...' : 'Change Email'}
                  </button>
                </form>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="acc-card acc-card--danger">
              <div className="acc-card-head">
                <h2>Delete Account</h2>
              </div>
              <div className="acc-card-body">
                <p className="acc-note">This will permanently delete your account and all associated data. This action cannot be undone.</p>
                {!showDeleteConfirm ? (
                  <button className="acc-btn acc-btn--danger" onClick={() => setShowDeleteConfirm(true)}>Delete My Account</button>
                ) : (
                  <div className="acc-delete-confirm">
                    <p className="acc-delete-warn">Are you sure? This cannot be undone.</p>
                    <div className="acc-delete-btns">
                      <button className="acc-btn acc-btn--danger" disabled={delLoading} onClick={async () => {
                        setDelLoading(true)
                        const res = await fetch('/api/delete-account', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ userId: user.id }),
                        })
                        const data = await res.json()
                        if (data.success) {
                          await supabase.auth.signOut()
                          router.push('/')
                        }
                        setDelLoading(false)
                      }}>{delLoading ? 'Deleting...' : 'Yes, Delete'}</button>
                      <button className="acc-btn" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .acc-page { padding: 48px 0 80px; min-height: 80vh; }
        .acc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; gap: 20px; flex-wrap: wrap; }
        .acc-h1 { font-size: 28px; font-weight: 900; color: #000; margin-bottom: 6px; }
        .acc-sub { font-size: 14px; color: #888; }
        .acc-signout { background: none; border: 1px solid #ddd; padding: 10px 24px; font-size: 13px; font-weight: 600; font-family: inherit; cursor: pointer; color: #333; transition: border-color 0.15s; }
        .acc-signout:hover { border-color: #000; }
        .acc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .acc-card { background: #fff; border: 1px solid #eee; }
        .acc-card--danger { border-color: #fdd; }
        .acc-card-head { padding: 20px 24px; border-bottom: 1px solid #eee; }
        .acc-card-head h2 { font-size: 16px; font-weight: 700; color: #000; }
        .acc-card--danger .acc-card-head { background: #fff8f8; }
        .acc-card-body { padding: 24px; }
        .acc-info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f5f5f5; font-size: 14px; }
        .acc-info-label { color: #888; }
        .acc-info-value { color: #000; font-weight: 500; }
        .acc-label { display: block; font-size: 13px; font-weight: 600; color: #333; margin-bottom: 6px; }
        .acc-input { width: 100%; padding: 10px 12px; font-size: 14px; font-family: inherit; border: 1px solid #ddd; background: #fafafa; outline: none; margin-bottom: 4px; }
        .acc-input:focus { border-color: #000; background: #fff; }
        .acc-btn { display: block; width: 100%; padding: 12px; font-size: 13px; font-weight: 700; font-family: inherit; background: #000; color: #fff; border: none; cursor: pointer; margin-top: 16px; transition: background 0.15s; }
        .acc-btn:hover { background: #222; }
        .acc-btn:disabled { background: #666; cursor: not-allowed; }
        .acc-error { font-size: 13px; color: #c00; margin-top: 10px; }
        .acc-msg { font-size: 13px; color: #2a7a2a; margin-top: 10px; }
        .acc-note { font-size: 13px; color: #888; line-height: 1.6; margin-bottom: 14px; }
        .acc-note a { color: #000; }
        .acc-btn--danger { background: #c00; }
        .acc-btn--danger:hover { background: #a00; }
        .acc-delete-confirm { margin-top: 12px; }
        .acc-delete-warn { font-size: 14px; font-weight: 600; color: #c00; margin-bottom: 12px; }
        .acc-delete-btns { display: flex; gap: 10px; }
        .acc-delete-btns .acc-btn { flex: 1; }
        @media (max-width: 768px) {
          .acc-grid { grid-template-columns: 1fr; }
          .acc-page { padding: 32px 0 60px; }
        }
      `}</style>
    </>
  )
}
