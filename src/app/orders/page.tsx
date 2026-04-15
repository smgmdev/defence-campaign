'use client'

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { PRODUCTS } from '@/lib/products'
import { supabase } from '@/lib/supabase'
import CreateOrderModal from '@/components/CreateOrderModal'

interface Order {
  id: string
  type: 'buy' | 'sell'
  product: string
  category: string
  quantity: string
  unit: string
  status: 'Open' | 'Pending' | 'Completed' | 'Cancelled'
  date: string
  notes: string
  user: string
  userId?: string
  expiresAt?: string | null
}

const SAMPLE_ORDERS: Order[] = []

function OrdersContent() {
  const searchParams = useSearchParams()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [filterType, setFilterType] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [searchQ, setSearchQ] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    document.body.style.overflow = showCreate ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showCreate])

  useEffect(() => {
    const q = searchParams.get('q')
    setSearchQ(q || '')
  }, [searchParams])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setShowCreate(false); setCancelOrderId(null); setShowLoginPrompt(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const [sortCol, setSortCol] = useState('date')
  const [sortDir, setSortDir] = useState(-1)
  const [dbOrders, setDbOrders] = useState<Order[]>([])
  const [userId, setUserId] = useState('')
  const [pageLoading, setPageLoading] = useState(true)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [userBody, setUserBody] = useState('')
  const [interestedSent, setInterestedSent] = useState<Set<string>>(new Set())
  const [engagingId, setEngagingId] = useState<string | null>(null)

  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null)
  const [, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session)
      if (data.session?.user) {
        setUserEmail(data.session.user.email || '')
        setUserName(data.session.user.user_metadata?.full_name || '')
        setUserBody(data.session.user.user_metadata?.body || '')
        setUserId(data.session.user.id)
        // Load engagements for this user
        fetch(`/api/engagements?userId=${data.session.user.id}`).then(r => r.json()).then(d => {
          if (d.engagements) {
            setInterestedSent(new Set(d.engagements.map((e: Record<string,string>) => e.order_id)))
          }
        }).catch(() => {})
      }
    })
    // Load orders from DB
    fetch('/api/orders').then(r => r.json()).then(ordData => {
      if (ordData.orders) {
        setDbOrders(ordData.orders.map((o: Record<string, string>) => ({
          id: o.id,
          type: o.type,
          product: o.product,
          quantity: o.quantity,
          unit: o.unit,
          notes: o.notes || '',
          status: 'Open',
          date: new Date(o.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          user: o.user_name || '',
          userId: o.user_id || '',
          expiresAt: o.expires_at || null,
        })))
      }
    }).catch(() => {}).finally(() => setPageLoading(false))
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('orders-list')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        const o = payload.new as Record<string, string>
        setDbOrders(prev => [{
          id: o.id,
          type: o.type as 'buy' | 'sell',
          product: o.product,
          category: '',
          quantity: o.quantity,
          unit: o.unit,
          status: 'Open',
          date: new Date(o.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          notes: o.notes || '',
          user: o.user_name || '',
          userId: o.user_id || '',
          expiresAt: o.expires_at || null,
        }, ...prev.filter(x => x.id !== o.id)])
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'orders' }, (payload) => {
        const id = (payload.old as { id?: string })?.id
        if (id) setDbOrders(prev => prev.filter(x => x.id !== id))
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const allOrders = [...dbOrders, ...SAMPLE_ORDERS]
  const orders = allOrders.filter(o => {
    if (filterType && o.type !== filterType) return false
    if (filterStatus && o.status !== filterStatus) return false
    if (searchQ) {
      const q = searchQ.toLowerCase()
      if (!o.product.toLowerCase().includes(q) && !o.id.toLowerCase().includes(q) && !o.notes.toLowerCase().includes(q)) return false
    }
    return true
  })

  function getCountdown(expiresAt: string | null | undefined): string {
    if (!expiresAt) return 'Perpetual'
    const diff = new Date(expiresAt).getTime() - Date.now()
    if (diff <= 0) return 'Expired'
    const d = Math.floor(diff / 86400000)
    const h = Math.floor((diff % 86400000) / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    if (d > 0) return `${d}d ${h}h ${m}m`
    if (h > 0) return `${h}h ${m}m ${s}s`
    return `${m}m ${s}s`
  }

  function showToast(msg: string) {
    setToastMsg(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 5000)
  }

  async function handleInterested(e: React.MouseEvent, order: Order) {
    e.stopPropagation()
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }
    if (interestedSent.has(order.id)) {
      return
    }
    setEngagingId(order.id)
    // Save engagement to DB
    await fetch('/api/engagements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId, userEmail, userName,
        orderId: order.id, product: order.product,
        orderType: order.type, quantity: `${order.quantity} ${order.unit}`,
      }),
    })
    // Notify sales
    await fetch('/api/interested', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName || userEmail,
        userBody: userBody,
        email: userEmail,
        product: order.product,
        orderId: order.id,
        orderType: order.type,
        quantity: `${order.quantity} ${order.unit}`,
      }),
    })
    setEngagingId(null)
    setInterestedSent(prev => new Set(prev).add(order.id))
    showToast(`You have engaged your interest in ${order.product} order. Defence Trading will reach out to you for details.`)
  }

  function handleSort(col: string) {
    if (sortCol === col) setSortDir(d => d * -1)
    else { setSortCol(col); setSortDir(1) }
  }

  function handleOrderCreated(o: Record<string, string>) {
    setDbOrders(prev => [{
      id: o.id,
      type: o.type,
      product: o.product,
      quantity: o.quantity,
      unit: o.unit,
      notes: o.notes || '',
      status: 'Open',
      date: new Date(o.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      user: o.user_name || '',
      userId: o.user_id || '',
      expiresAt: o.expires_at || null,
    } as Order, ...prev])
  }

  return (
    <>
      {/* HERO */}
      <section className="ord-hero">
        <div className="pg-wrap">
          <h1 className="ord-hero-h1">Orders</h1>
          <p className="ord-hero-sub">Buy and sell certified defence products through compliant procurement channels.</p>
          <div className="ord-notice">
            All orders are subject to counterparty verification, export control compliance, and end-user certification.
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="ord-filters">
        <div className="pg-wrap">
          <div className="ord-filter-row">
            <div className="ord-filter-left">
              <div className="ord-filter-label">FILTERS</div>
              <div className="ord-filter-group">
                <div className="ord-select-wrap">
                  <select className="ord-select ord-select--yellow" value={filterType} onChange={e => setFilterType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="buy">Buy Orders</option>
                    <option value="sell">Sell Orders</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="ord-filter-right">
              <div className="ord-filter-label">FIND ORDERS BY</div>
              <div className="ord-search-wrap">
                <input className="ord-search" type="text" placeholder="Search by product name" value={searchQ} onChange={e => setSearchQ(e.target.value)} />
                <div className="ord-search-icon">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="7"/><line x1="15" y1="15" x2="19" y2="19"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="ord-toolbar">
        <div className="pg-wrap ord-toolbar-inner">
          {isLoggedIn ? (
            <button className="ord-create-btn" onClick={() => setShowCreate(true)}>Create Order</button>
          ) : (
            <Link href="/login" className="ord-create-btn">Login to Create Order</Link>
          )}
          <div className="ord-count">Showing <strong>{orders.length}</strong> orders</div>
        </div>
      </section>

      {/* TABLE */}
      <section className="ord-table-section">
        <div className="pg-wrap">
          {pageLoading ? (
            <div className="ord-loading">
              <div className="ord-loading-spinner" />
            </div>
          ) : (
          <div className="ord-table-wrap">
            <table className="ord-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('type')}>Type</th>
                  <th onClick={() => handleSort('product')}>Product</th>
                  <th className="ord-hide-mobile" onClick={() => handleSort('quantity')}>Qty</th>
                  <th className="ord-hide-mobile">Notes</th>
                  <th className="ord-hide-mobile">Expiry</th>
                  <th className="ord-hide-mobile" onClick={() => handleSort('date')}>Order Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <React.Fragment key={o.id}>
                    <tr className="ord-row" onClick={(e) => {
                      const isOwner = (o as Order & {userId?: string}).userId === userId && userId
                      if (isOwner) { setCancelOrderId(o.id) } else if (!interestedSent.has(o.id)) { handleInterested(e as unknown as React.MouseEvent, o) }
                    }}>
                      <td><span className={`ord-type ord-type--${o.type}`}>{o.type.toUpperCase()}</span></td>
                      <td className="ord-cell-product">{o.product}</td>
                      <td className="ord-hide-mobile">{o.quantity} {o.unit}</td>
                      <td className="ord-cell-notes ord-hide-mobile">{o.notes}</td>
                      <td className="ord-cell-expiry ord-hide-mobile">
                        {(() => {
                          const cd = getCountdown(o.expiresAt)
                          return <span className={`ord-expiry${cd === 'Expired' ? ' ord-expiry--expired' : cd === 'Perpetual' ? ' ord-expiry--perp' : ' ord-expiry--countdown'}`}>{cd}</span>
                        })()}
                      </td>
                      <td className="ord-hide-mobile">{o.date}</td>
                      <td className="ord-cell-action">
                        {(o as Order & {userId?: string}).userId === userId && userId ? (
                          <button className="ord-cancel-btn" onClick={e => { e.stopPropagation(); setCancelOrderId(o.id) }}>Cancel</button>
                        ) : (
                          <button
                            className={`ord-interested-btn${interestedSent.has(o.id) ? ' ord-engaged' : ''}`}
                            onClick={e => handleInterested(e, o)}
                            disabled={engagingId === o.id}
                          >
                            {engagingId === o.id ? (
                              <span className="ord-btn-spinner" />
                            ) : interestedSent.has(o.id) ? (
                              'Engaged'
                            ) : (
                              'Engage'
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                    {expandedRow === o.id && (
                      <tr className="ord-expanded-row">
                        <td colSpan={7}>
                          <div className="ord-expanded">
                            <div className="ord-expanded-item"><span className="ord-expanded-label">Qty</span>{o.quantity} {o.unit}</div>
                            <div className="ord-expanded-item"><span className="ord-expanded-label">Expiry</span>{getCountdown(o.expiresAt)}</div>
                            <div className="ord-expanded-item"><span className="ord-expanded-label">Order Date</span>{o.date}</div>
                            <div className="ord-expanded-item"><span className="ord-expanded-label">Notes</span>{o.notes || '—'}</div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                {orders.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign: 'center', padding: '48px 0', color: '#888' }}>No orders found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </section>

      {/* CREATE ORDER MODAL */}
      {showCreate && (
        <CreateOrderModal
          userId={userId}
          userEmail={userEmail}
          userName={userName}
          onClose={() => setShowCreate(false)}
          onCreated={handleOrderCreated}
        />
      )}

      {/* CANCEL CONFIRM MODAL */}
      {cancelOrderId && (
        <>
          <div className="ord-modal-backdrop" onClick={() => setCancelOrderId(null)} />
          <div className="ord-cancel-modal">
            <div className="ord-cancel-modal-icon">⚠</div>
            <h3 className="ord-cancel-modal-title">Cancel Order</h3>
            <p className="ord-cancel-modal-text">Are you sure you want to cancel this order? This action cannot be undone.</p>
            <div className="ord-cancel-modal-btns">
              <button className="ord-cancel-modal-yes" disabled={cancelling} onClick={async () => {
                const id = cancelOrderId
                setCancelling(true)
                try {
                  await fetch('/api/orders/cancel', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({orderId: id, userId}) })
                  setDbOrders(prev => prev.filter(x => x.id !== id))
                  setCancelOrderId(null)
                } finally {
                  setCancelling(false)
                }
              }}>
                {cancelling ? <span className="ord-cancel-spinner" /> : 'Yes, Cancel Order'}
              </button>
              <button className="ord-cancel-modal-no" disabled={cancelling} onClick={() => setCancelOrderId(null)}>Keep Order</button>
            </div>
          </div>
        </>
      )}

      {/* LOGIN PROMPT MODAL */}
      {showLoginPrompt && (
        <>
          <div className="ord-modal-backdrop" onClick={() => setShowLoginPrompt(false)} />
          <div className="ord-cancel-modal">
            <h3 className="ord-cancel-modal-title">Sign In Required</h3>
            <p className="ord-cancel-modal-text">You need to sign in to engage with orders on the platform.</p>
            <div className="ord-cancel-modal-btns">
              <Link href="/login" className="ord-cancel-modal-no" style={{textDecoration:'none',textAlign:'center',background:'#000',color:'#fff',borderColor:'#000'}}>Go to Login</Link>
              <button className="ord-cancel-modal-no" onClick={() => setShowLoginPrompt(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}

      {/* TOAST */}
      <div className={`ord-toast${toastVisible ? ' show' : ''}`}>{toastMsg}</div>

      <style>{`
        .ord-hero { background: #F5C400; padding: 40px 0 28px; }
        .ord-hero-h1 { font-size: clamp(32px, 5vw, 56px); font-weight: 900; color: #000; margin-bottom: 8px; }
        .ord-hero-sub { font-size: 16px; font-weight: 600; color: #000; margin-bottom: 20px; }
        .ord-notice { background: rgba(0,0,0,0.06); padding: 14px 18px; font-size: 13px; color: #333; line-height: 1.6; }

        .ord-filters { background: #F5C400; padding: 0 0 28px; }
        .ord-filter-row { display: flex; justify-content: flex-start; align-items: flex-end; gap: 16px; flex-wrap: wrap; }
        .ord-filter-left { display: flex; flex-direction: column; gap: 10px; }
        .ord-filter-right { display: flex; flex-direction: column; gap: 10px; flex: 1; max-width: 400px; }
        .ord-filter-label { font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #000; }
        .ord-filter-group { display: flex; gap: 8px; flex-wrap: wrap; }
        .ord-select-wrap { position: relative; }
        .ord-select { appearance: none; background: #fff; border: 2px solid #000; padding: 0 36px 0 16px; font-size: 14px; font-weight: 600; font-family: inherit; cursor: pointer; height: 44px; box-sizing: border-box; }
        .ord-select--yellow { background: #000; color: #fff; border-color: #000; }
        .ord-select-wrap::after { content: '▼'; position: absolute; right: 12px; top: 50%; transform: translateY(-50%); font-size: 8px; color: #fff; pointer-events: none; }
        .ord-search-wrap { position: relative; display: flex; }
        .ord-search { flex: 1; border: 2px solid #000; padding: 0 16px; font-size: 14px; font-family: inherit; background: #fff; outline: none; height: 44px; box-sizing: border-box; }
        .ord-search::placeholder { color: #999; }
        .ord-search-icon { position: absolute; right: 0; top: 0; bottom: 0; width: 48px; background: #000; display: flex; align-items: center; justify-content: center; color: #fff; }

        .ord-toolbar { background: #fff; border-bottom: none; }
        .ord-toolbar-inner { display: flex; align-items: center; gap: 16px; min-height: 52px; flex-wrap: wrap; }
        .ord-create-btn { background: #fff; color: #000; border: 2px solid #000; padding: 10px 24px; font-size: 13px; font-weight: 700; font-family: inherit; cursor: pointer; text-decoration: none; display: inline-block; transition: background 0.15s, color 0.15s; }
        .ord-create-btn:hover { background: #000; color: #fff; }
        .ord-reset { background: none; border: none; font-size: 13px; font-family: inherit; cursor: pointer; color: #666; }
        .ord-reset:hover { color: #000; }
        .ord-count { margin-left: auto; font-size: 13px; color: #666; }

        .ord-table-section { padding: 0; }
        .ord-table-wrap { overflow-x: auto; }
        .ord-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .ord-table thead tr { border-top: 2px solid #000; border-bottom: 2px solid #000; }
        .ord-table th { padding: 12px 10px; text-align: left; font-weight: 800; font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase; color: #000; cursor: pointer; white-space: nowrap; }
        .ord-table th:hover { color: #666; }
        .ord-table td { padding: 12px 10px; border-bottom: 1px solid #eee; vertical-align: middle; transition: background 0.15s, color 0.15s; }
        .ord-table tbody tr:hover td { background: #0a0a0a; color: #fff; }
        .ord-table tbody tr:hover td.ord-cell-notes,
        .ord-table tbody tr:hover .ord-cell-notes { color: #fff !important; }
        .ord-table tbody tr:hover td.ord-cell-product,
        .ord-table tbody tr:hover .ord-cell-product { color: #fff !important; }
        .ord-table tbody tr:hover .ord-expanded-label { color: #fff; }
        .ord-table tbody tr:hover .ord-expanded-item { color: rgba(255,255,255,0.6); }
        .ord-table tbody tr:hover .ord-interested-btn { background: #fff; color: #000; }
        .ord-table tbody tr:hover .ord-engaged { background: #ddd; color: #888; }
        .ord-table tbody tr:hover .ord-expiry { background: #fff; color: #000; }
        .ord-table tbody tr:hover .ord-expiry--expired { background: #c00; color: #fff; }
        .ord-cell-id { font-weight: 700; color: #000; white-space: nowrap; }
        .ord-cell-product { font-weight: 700; color: #000; }
        .ord-cell-notes { color: #000; max-width: 240px; font-size: 12px; line-height: 1.5; }
        .ord-row--completed { opacity: 0.5; }
        .ord-type { font-size: 10px; font-weight: 800; letter-spacing: 1px; padding: 4px 10px; }
        .ord-type--buy { background: #2a7a2a; color: #fff; }
        .ord-type--sell { background: #c00; color: #fff; }
        .ord-status { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 2px; }
        .ord-status--open { background: #e3f2fd; color: #1565c0; }
        .ord-status--pending { background: #fff8e1; color: #f9a825; }
        .ord-status--completed { background: #e8f5e9; color: #2e7d32; }
        .ord-status--cancelled { background: #fce4ec; color: #c62828; }

        .csel-wrap { position: relative; }
        .csel-trigger {
          width: 100%; padding: 10px 12px; font-size: 14px; font-family: inherit;
          border: 1px solid #ddd; background: #fafafa; cursor: pointer; text-align: left;
          display: flex; align-items: center; justify-content: space-between;
          transition: border-color 0.15s; box-sizing: border-box; color: #000;
        }
        .csel-trigger:hover { border-color: #000; }
        .csel-arrow {
          font-size: 10px; color: #666; transition: transform 0.25s ease;
          transform: rotate(90deg); display: inline-flex; align-items: center; line-height: 1;
        }
        .csel-arrow.open { transform: rotate(270deg); }
        .csel-options {
          position: absolute; top: 100%; left: 0; right: 0; background: #fff;
          border: 1px solid #000; border-top: none; z-index: 50; max-height: 220px; overflow-y: auto;
        }
        .csel-option {
          padding: 10px 12px; font-size: 13px; color: #333; cursor: pointer; transition: background 0.1s;
        }
        .csel-option:hover { background: #eee; }
        .csel-option.selected { background: #000; color: #fff; font-weight: 600; }
        .csel-option.selected:hover { background: #333; }
        .ord-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 900; }
        .ord-modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); background: #fff; z-index: 901; width: min(520px, 95vw); max-height: 90vh; overflow-y: auto; }
        .ord-modal-head { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #eee; }
        .ord-modal-head h2 { font-size: 18px; font-weight: 700; }
        .ord-modal-close { background: none; border: none; font-size: 18px; cursor: pointer; color: #666; }
        .ord-modal-body { padding: 24px; }
        .ord-field { margin-bottom: 16px; }
        .ord-field label { display: block; font-size: 13px; font-weight: 600; color: #333; margin-bottom: 6px; }
        .ord-field input, .ord-field select, .ord-field textarea { width: 100%; padding: 10px 12px; font-size: 14px; font-family: inherit; border: 1px solid #ddd; background: #fafafa; outline: none; }
        .ord-field input:focus, .ord-field select:focus, .ord-field textarea:focus { border-color: #000; background: #fff; }
        .ord-field textarea { resize: vertical; }
        .ord-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .ord-suggestions { position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #ddd; border-top: none; z-index: 10; max-height: 200px; overflow-y: auto; }
        .ord-suggestion { padding: 10px 12px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.1s; }
        .ord-suggestion:hover { background: #f5f5f5; }
        .ord-suggestion-name { font-size: 13px; font-weight: 600; color: #000; }
        .ord-suggestion-cat { font-size: 11px; color: #999; }
        .ord-submit { width: 100%; padding: 14px; font-size: 14px; font-weight: 700; font-family: inherit; background: #000; color: #fff; border: none; cursor: pointer; margin-top: 8px; }
        .ord-submit:hover { background: #222; }
        .ord-submit:disabled { background: #666; cursor: not-allowed; }
        .ord-submit { display: flex; align-items: center; justify-content: center; }
        .ord-modal-note { font-size: 11px; color: #aaa; text-align: center; margin-top: 16px; line-height: 1.5; }

        .ord-loading { display: flex; align-items: center; justify-content: center; padding: 80px 0; }
        .ord-loading-spinner { width: 32px; height: 32px; border: 3px solid #eee; border-top-color: #000; border-radius: 50%; animation: spin 0.7s linear infinite; }
        .ord-interested-btn { background: #000; color: #fff; border: none; padding: 6px 16px; font-size: 12px; font-weight: 700; font-family: inherit; cursor: pointer; white-space: nowrap; transition: background 0.15s; min-width: 80px; text-align: center; display: inline-flex; align-items: center; justify-content: center; height: 32px; }
        .ord-interested-btn:hover { background: #fff; color: #000; }
        .ord-engaged { background: #ddd; color: #888; cursor: default; }
        .ord-engaged:hover { background: #ddd; color: #888; }
        .ord-btn-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(150,150,150,0.3); border-top-color: #999; border-radius: 50%; animation: spin 0.6s linear infinite; }
        .ord-cancel-modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); background: #fff; z-index: 901; width: min(420px, 90vw); padding: 40px 32px; text-align: center; }
        .ord-cancel-modal-icon { font-size: 36px; margin-bottom: 16px; }
        .ord-cancel-modal-title { font-size: 20px; font-weight: 700; color: #000; margin-bottom: 10px; }
        .ord-cancel-modal-text { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 28px; }
        .ord-cancel-modal-btns { display: flex; flex-direction: column; gap: 10px; }
        .ord-cancel-modal-yes { width: 100%; padding: 14px; font-size: 14px; font-weight: 700; font-family: inherit; background: #c00; color: #fff; border: none; cursor: pointer; transition: background 0.15s; display: inline-flex; align-items: center; justify-content: center; min-height: 46px; }
        .ord-cancel-modal-yes:hover { background: #a00; }
        .ord-cancel-modal-yes:disabled { background: #a00; cursor: wait; }
        .ord-cancel-spinner { width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.6s linear infinite; display: inline-block; }
        .ord-cancel-modal-no { width: 100%; padding: 14px; font-size: 14px; font-weight: 700; font-family: inherit; background: #fff; color: #000; border: 2px solid #000; cursor: pointer; transition: background 0.15s, color 0.15s; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; }
        .ord-cancel-modal-no:hover { background: #000; color: #fff; }

        .ord-toast { position: fixed; bottom: 32px; right: 32px; background: #000; color: #fff; padding: 16px 24px; font-size: 14px; line-height: 1.5; max-width: 380px; z-index: 9999; opacity: 0; transform: translateY(12px); transition: opacity 0.3s, transform 0.3s; pointer-events: none; }
        .ord-toast.show { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .ord-cell-expiry { white-space: nowrap; }
        .ord-expiry { font-size: 11px; font-weight: 700; font-variant-numeric: tabular-nums; padding: 4px 10px; display: inline-block; }
        .ord-expiry--perp { background: #000; color: #fff; }
        .ord-expiry--expired { background: #c00; color: #fff; }
        .ord-expiry--countdown { background: #000; color: #fff; }
        .ord-cancel-btn { background: none; border: 1px solid #ddd; padding: 6px 16px; font-size: 12px; font-weight: 700; font-family: inherit; color: #c00; cursor: pointer; transition: all 0.15s; min-width: 80px; height: 32px; display: inline-flex; align-items: center; justify-content: center; }
        .ord-cancel-btn:hover { background: #c00; color: #fff; border-color: #c00; }
        .ord-table tbody tr:hover .ord-cancel-btn { color: #fff; border-color: rgba(255,255,255,0.3); }
        .ord-table tbody tr:hover .ord-cancel-btn:hover { background: #c00; border-color: #c00; }
        .ord-cell-action { text-align: right; }
        .ord-row { cursor: pointer; }
        .ord-expanded-row { display: none; }
        .ord-expanded { padding: 12px 0; display: flex; flex-direction: column; gap: 8px; }
        .ord-expanded-item { font-size: 13px; color: #555; }
        .ord-expanded-label { font-weight: 700; color: #000; margin-right: 8px; }

        @media (max-width: 1024px) {
          .ord-hide-mobile { display: none; }
          .ord-expanded-row { display: table-row; }
          .ord-expanded-row td { padding: 0 10px 0; border-bottom: 1px solid #eee; background: #fafafa; }
        }
        @media (max-width: 768px) {
          .ord-filter-row { flex-direction: column; align-items: stretch; }
          .ord-filter-right { max-width: 100%; }
          .ord-filter-group { flex-direction: column; }
          .ord-select-wrap { width: 100%; }
          .ord-select { width: 100%; }
          .ord-toolbar-inner { padding: 10px 20px; }
          .ord-field-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div style={{padding:'80px',textAlign:'center'}}>Loading…</div>}>
      <OrdersContent />
    </Suspense>
  )
}
