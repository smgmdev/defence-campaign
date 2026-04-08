'use client'

import React from 'react'
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
  const [activeTab, setActiveTab] = useState<'orders' | 'settings'>('orders')
  const [myOrders, setMyOrders] = useState<{id:string;type:string;product:string;quantity:string;unit:string;notes:string;created_at:string}[]>([])
  const [engagedOrders, setEngagedOrders] = useState<{product:string;orderType:string;quantity:string;date:string;engagedAt:string}[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [expandedMyOrder, setExpandedMyOrder] = useState<string | null>(null)
  const [expandedEngaged, setExpandedEngaged] = useState<number | null>(null)

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

      // Fetch user's orders and engagements
      Promise.all([
        fetch('/api/orders').then(r => r.json()),
        fetch(`/api/engagements?userId=${data.user!.id}`).then(r => r.json()),
      ]).then(([ordData, engData]) => {
        if (ordData.orders) {
          setMyOrders(ordData.orders.filter((o: Record<string,string>) => o.user_id === data.user!.id))
        }
        if (engData.engagements) {
          setEngagedOrders(engData.engagements.map((e: Record<string,string>) => ({
            product: e.product,
            orderType: e.order_type,
            quantity: e.quantity,
            date: new Date(e.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            engagedAt: new Date(e.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          })))
        }
      }).catch(() => {}).finally(() => setOrdersLoading(false))
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
              <h1 className="acc-h1">My Account</h1>
              <p className="acc-sub">Manage your orders, account, and security.</p>
            </div>
            <button className="acc-signout" onClick={handleSignOut}>Sign Out</button>
          </div>

          <div className="acc-tabs">
            <button className={`acc-tab${activeTab === 'orders' ? ' active' : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
            <button className={`acc-tab${activeTab === 'settings' ? ' active' : ''}`} onClick={() => setActiveTab('settings')}>Account Settings</button>
          </div>

          {activeTab === 'orders' && (
            <div className="acc-orders">
              {ordersLoading ? (
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'80px 0'}}>
                  <div style={{width:32,height:32,border:'3px solid #eee',borderTopColor:'#000',borderRadius:'50%',animation:'spin 0.7s linear infinite'}} />
                </div>
              ) : (<>
              <h3 className="acc-section-title">My Orders</h3>
              {myOrders.length > 0 ? (
                <table className="acc-order-table">
                  <thead><tr><th>Type</th><th>Product</th><th className="acc-hide-mobile">Qty</th><th className="acc-hide-mobile">Notes</th><th className="acc-hide-mobile">Expiry</th><th className="acc-hide-mobile">Date</th><th></th></tr></thead>
                  <tbody>
                    {myOrders.map(o => (
                      <React.Fragment key={o.id}>
                        <tr style={{cursor:'pointer'}} onClick={() => setExpandedMyOrder(expandedMyOrder === o.id ? null : o.id)}>
                          <td><span className={`acc-ord-type acc-ord-type--${o.type}`}>{o.type.toUpperCase()}</span></td>
                          <td style={{fontWeight:700}}>{o.product}</td>
                          <td className="acc-hide-mobile">{o.quantity} {o.unit}</td>
                          <td className="acc-hide-mobile" style={{color:'#666',fontSize:'12px'}}>{o.notes || '—'}</td>
                          <td className="acc-hide-mobile" style={{fontSize:'12px'}}>{(o as Record<string,string>).expires_at ? new Date((o as Record<string,string>).expires_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Perpetual'}</td>
                          <td className="acc-hide-mobile">{new Date(o.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                          <td><button className="acc-cancel-btn" onClick={e => { e.stopPropagation(); if (confirm('Are you sure you want to cancel this order?')) { fetch('/api/orders/cancel', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({orderId: o.id}) }).then(() => setMyOrders(prev => prev.filter(x => x.id !== o.id))) } }}>Cancel</button></td>
                        </tr>
                        {expandedMyOrder === o.id && (
                          <tr><td colSpan={7} style={{padding:'12px 8px',background:'#fafafa',borderBottom:'1px solid #eee'}}>
                            <div style={{display:'flex',flexDirection:'column',gap:'6px',fontSize:'13px'}}>
                              <div><span style={{fontWeight:700,marginRight:8}}>Qty</span>{o.quantity} {o.unit}</div>
                              <div><span style={{fontWeight:700,marginRight:8}}>Notes</span>{o.notes || '—'}</div>
                              <div><span style={{fontWeight:700,marginRight:8}}>Expiry</span>{(o as Record<string,string>).expires_at ? new Date((o as Record<string,string>).expires_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Perpetual'}</div>
                              <div><span style={{fontWeight:700,marginRight:8}}>Date</span>{new Date(o.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                            </div>
                          </td></tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="acc-empty-text">No orders created yet. <Link href="/orders">Go to Orders</Link></p>
              )}

              <h3 className="acc-section-title" style={{marginTop:'40px'}}>Engaged Orders</h3>
              {engagedOrders.length > 0 ? (
                <table className="acc-order-table">
                  <thead><tr><th>Type</th><th>Product</th><th className="acc-hide-mobile">Qty</th><th>Status</th></tr></thead>
                  <tbody>
                    {engagedOrders.map((o, i) => (
                      <React.Fragment key={i}>
                        <tr style={{cursor:'pointer'}} onClick={() => setExpandedEngaged(expandedEngaged === i ? null : i)}>
                          <td><span className={`acc-ord-type acc-ord-type--${o.orderType}`}>{o.orderType?.toUpperCase()}</span></td>
                          <td style={{fontWeight:700}}>{o.product}</td>
                          <td className="acc-hide-mobile">{o.quantity}</td>
                          <td><div><span style={{background:'#ddd',color:'#888',padding:'6px 16px',fontSize:'12px',fontWeight:700,display:'inline-block'}}>Engaged</span></div><div style={{color:'#888',fontSize:'9px',marginTop:'4px'}}>{o.engagedAt}</div></td>
                        </tr>
                        {expandedEngaged === i && (
                          <tr><td colSpan={4} style={{padding:'12px 8px',background:'#fafafa',borderBottom:'1px solid #eee'}}>
                            <div style={{display:'flex',flexDirection:'column',gap:'6px',fontSize:'13px'}}>
                              <div><span style={{fontWeight:700,marginRight:8}}>Product</span>{o.product}</div>
                              <div><span style={{fontWeight:700,marginRight:8}}>Type</span>{o.orderType?.toUpperCase()}</div>
                              <div><span style={{fontWeight:700,marginRight:8}}>Quantity</span>{o.quantity}</div>
                              <div><span style={{fontWeight:700,marginRight:8}}>Engaged On</span>{o.engagedAt}</div>
                            </div>
                          </td></tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="acc-empty-text">No engaged orders yet. <Link href="/orders">Browse Orders</Link></p>
              )}
              </>)}
            </div>
          )}

          {activeTab === 'settings' && (
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
          )}
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
        .acc-tabs { display: flex; gap: 0; border-bottom: 2px solid #eee; margin-bottom: 32px; }
        .acc-tab { background: none; border: none; padding: 14px 24px; font-size: 14px; font-weight: 600; font-family: inherit; color: #888; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: color 0.15s; }
        .acc-tab.active { color: #000; border-bottom-color: #000; }
        .acc-tab:hover { color: #000; }
        .acc-orders-empty { text-align: center; padding: 80px 20px; }
        .acc-orders-icon { font-size: 48px; margin-bottom: 16px; }
        .acc-orders-empty h3 { font-size: 20px; font-weight: 700; color: #000; margin-bottom: 8px; }
        .acc-orders-empty p { font-size: 14px; color: #888; margin-bottom: 24px; }
        .acc-orders-btn { display: inline-block; background: #000; color: #fff; padding: 12px 32px; font-size: 13px; font-weight: 700; text-decoration: none; transition: background 0.15s; }
        .acc-orders-btn:hover { background: #222; }
        .acc-section-title { font-size: 16px; font-weight: 700; color: #000; margin-bottom: 16px; }
        .acc-order-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .acc-order-table th { text-align: left; font-size: 11px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; padding: 10px 8px; border-bottom: 2px solid #000; }
        .acc-order-table td { padding: 8px 8px; border-bottom: 1px solid #eee; vertical-align: middle; transition: background 0.15s, color 0.15s; }
        .acc-order-table tbody tr:hover td { background: #0a0a0a; color: #fff; }
        .acc-order-table tbody tr:hover td span { color: #fff; }
        .acc-order-table tbody tr:hover .acc-cancel-btn { color: #fff; border-color: rgba(255,255,255,0.3); }
        .acc-order-table tbody tr:hover .acc-cancel-btn:hover { background: #c00; border-color: #c00; }
        .acc-ord-type { font-size: 10px; font-weight: 800; letter-spacing: 1px; padding: 3px 8px; color: #fff; }
        .acc-ord-type--buy { background: #2a7a2a; }
        .acc-ord-type--sell { background: #c00; }
        .acc-empty-text { font-size: 14px; color: #888; }
        .acc-empty-text a { color: #000; font-weight: 600; }
        .acc-cancel-btn { background: none; border: 1px solid #ddd; padding: 4px 14px; font-size: 11px; font-weight: 600; font-family: inherit; color: #c00; cursor: pointer; transition: all 0.15s; }
        .acc-cancel-btn:hover { background: #c00; color: #fff; border-color: #c00; }
        .acc-order-list { display: flex; flex-direction: column; gap: 12px; }
        .acc-order-card { border: 1px solid #eee; padding: 0; }
        .acc-order-card-top { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-bottom: 1px solid #f0f0f0; }
        .acc-order-product { font-size: 15px; font-weight: 700; color: #000; flex: 1; }
        .acc-order-date { font-size: 12px; color: #999; }
        .acc-order-details { padding: 12px 16px; display: flex; flex-direction: column; gap: 6px; }
        .acc-order-detail { display: flex; justify-content: space-between; font-size: 13px; padding: 4px 0; }
        .acc-order-detail span:first-child { color: #888; }
        .acc-order-detail span:last-child { color: #000; font-weight: 500; }
        .acc-btn--danger { background: #c00; }
        .acc-btn--danger:hover { background: #a00; }
        .acc-delete-confirm { margin-top: 12px; }
        .acc-delete-warn { font-size: 14px; font-weight: 600; color: #c00; margin-bottom: 12px; }
        .acc-delete-btns { display: flex; gap: 10px; }
        .acc-delete-btns .acc-btn { flex: 1; }
        @media (max-width: 768px) {
          .acc-hide-mobile { display: none; }
          .acc-grid { grid-template-columns: 1fr; }
          .acc-page { padding: 32px 0 60px; }
        }
      `}</style>
    </>
  )
}
