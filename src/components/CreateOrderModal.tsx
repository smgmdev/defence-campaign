'use client'

import { useState } from 'react'
import { PRODUCTS } from '@/lib/products'

const UNIT_OPTIONS = ['KG', 'MT', 'Pcs', 'Rounds', 'Sets', 'Systems', 'Units', 'Vehicles']

const TYPE_OPTIONS = [
  { v: 'buy', l: 'Buy — I want to purchase' },
  { v: 'sell', l: 'Sell — I want to sell' },
]

const EXPIRY_OPTIONS = [
  { v: 'perpetual', l: 'Perpetual (No expiry)' },
  { v: '24h', l: '24 Hours' },
  { v: '3d', l: '3 Days' },
  { v: '7d', l: '7 Days' },
  { v: '14d', l: '14 Days' },
  { v: '30d', l: '30 Days' },
]

const EXPIRY_MAP: Record<string, number | null> = {
  perpetual: null, '24h': 24, '3d': 72, '7d': 168, '14d': 336, '30d': 720,
}

interface Props {
  userId: string
  userEmail: string
  userName: string
  onClose: () => void
  onCreated?: (order: Record<string, string>) => void
}

export default function CreateOrderModal({ userId, userEmail, userName, onClose, onCreated }: Props) {
  const [newOrder, setNewOrder] = useState({ type: 'buy', product: '', quantity: '', unit: 'Units', notes: '', expiry: 'perpetual' })
  const [productSuggestions, setProductSuggestions] = useState<typeof PRODUCTS>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [creating, setCreating] = useState(false)
  const [typeOpen, setTypeOpen] = useState(false)
  const [unitOpen, setUnitOpen] = useState(false)
  const [expiryOpen, setExpiryOpen] = useState(false)

  function handleProductInput(val: string) {
    setNewOrder(p => ({ ...p, product: val }))
    if (val.trim().length > 0) {
      const q = val.toLowerCase()
      setProductSuggestions(PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 8))
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  function selectProduct(name: string) {
    setNewOrder(p => ({ ...p, product: name }))
    setShowSuggestions(false)
  }

  function closeAllDropdowns() {
    setTypeOpen(false)
    setUnitOpen(false)
    setExpiryOpen(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    const hours = EXPIRY_MAP[newOrder.expiry]
    const expiresAt = hours ? new Date(Date.now() + hours * 3600000).toISOString() : null
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: newOrder.type,
        product: newOrder.product,
        quantity: newOrder.quantity,
        unit: newOrder.unit,
        notes: newOrder.notes,
        expiresAt,
        userId, userEmail, userName,
      }),
    })
    const data = await res.json()
    if (data.order && onCreated) {
      onCreated(data.order)
    }
    setCreating(false)
    onClose()
  }

  return (
    <>
      <div className="ord-modal-backdrop" onClick={onClose} />
      <div className="ord-modal">
        <div className="ord-modal-head">
          <h2>Create Order</h2>
          <button className="ord-modal-close" onClick={onClose}>&#10005;</button>
        </div>
        <form onSubmit={handleSubmit} className="ord-modal-body">
          <div className="ord-field">
            <label>Order Type</label>
            <div className="csel-wrap">
              <button type="button" className="csel-trigger" onClick={() => { setTypeOpen(!typeOpen); setUnitOpen(false); setExpiryOpen(false) }}>
                <span>{TYPE_OPTIONS.find(o => o.v === newOrder.type)?.l}</span>
                <span className={`csel-arrow${typeOpen ? ' open' : ''}`}>&#x276F;</span>
              </button>
              {typeOpen && (
                <div className="csel-options">
                  {TYPE_OPTIONS.map(o => (
                    <div key={o.v} className={`csel-option${newOrder.type === o.v ? ' selected' : ''}`} onClick={() => { setNewOrder(p => ({ ...p, type: o.v })); setTypeOpen(false) }}>{o.l}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="ord-field" style={{ position: 'relative' }}>
            <label>Product</label>
            <input
              type="text"
              placeholder="Type product name..."
              value={newOrder.product}
              onChange={e => handleProductInput(e.target.value)}
              onFocus={() => { if (newOrder.product) handleProductInput(newOrder.product); closeAllDropdowns() }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              required
              autoComplete="off"
            />
            {showSuggestions && productSuggestions.length > 0 && (
              <div className="ord-suggestions">
                {productSuggestions.map(p => (
                  <div key={p.id} className="ord-suggestion" onMouseDown={() => selectProduct(p.name)}>
                    <span className="ord-suggestion-name">{p.name}</span>
                    <span className="ord-suggestion-cat">{p.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="ord-field-row">
            <div className="ord-field">
              <label>Quantity</label>
              <input type="text" placeholder="e.g. 10,000" value={newOrder.quantity} onChange={e => setNewOrder(p => ({ ...p, quantity: e.target.value }))} required />
            </div>
            <div className="ord-field">
              <label>Unit</label>
              <div className="csel-wrap">
                <button type="button" className="csel-trigger" onClick={() => { setUnitOpen(!unitOpen); setTypeOpen(false); setExpiryOpen(false) }}>
                  <span>{newOrder.unit}</span>
                  <span className={`csel-arrow${unitOpen ? ' open' : ''}`}>&#x276F;</span>
                </button>
                {unitOpen && (
                  <div className="csel-options">
                    {UNIT_OPTIONS.map(u => (
                      <div key={u} className={`csel-option${newOrder.unit === u ? ' selected' : ''}`} onClick={() => { setNewOrder(p => ({ ...p, unit: u })); setUnitOpen(false) }}>{u}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="ord-field">
            <label>Order Expiry</label>
            <div className="csel-wrap">
              <button type="button" className="csel-trigger" onClick={() => { setExpiryOpen(!expiryOpen); setTypeOpen(false); setUnitOpen(false) }}>
                <span>{EXPIRY_OPTIONS.find(o => o.v === newOrder.expiry)?.l}</span>
                <span className={`csel-arrow${expiryOpen ? ' open' : ''}`}>&#x276F;</span>
              </button>
              {expiryOpen && (
                <div className="csel-options">
                  {EXPIRY_OPTIONS.map(o => (
                    <div key={o.v} className={`csel-option${newOrder.expiry === o.v ? ' selected' : ''}`} onClick={() => { setNewOrder(p => ({ ...p, expiry: o.v })); setExpiryOpen(false) }}>{o.l}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="ord-field">
            <label>Notes / Requirements</label>
            <textarea placeholder="Specifications, delivery requirements, timeline..." value={newOrder.notes} onChange={e => {
              const v = e.target.value
              if (v.length > 50) return
              if (/[0-9]{7,}/.test(v.replace(/\s/g, ''))) return
              if (/@/.test(v)) return
              if (/https?:\/\/|www\.|\.com|\.net|\.org|\.io|\.co/i.test(v)) return
              setNewOrder(p => ({ ...p, notes: v }))
            }} rows={3} maxLength={50} />
            <div style={{ fontSize: '11px', color: '#aaa', textAlign: 'right', marginTop: '4px' }}>{newOrder.notes.length}/50</div>
          </div>
          <button type="submit" className="ord-submit" disabled={creating}>
            {creating ? <span className="ord-btn-spinner" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} /> : 'Submit Order'}
          </button>
          <p className="ord-modal-note">All orders are reviewed by our procurement team and subject to compliance verification.</p>
        </form>
      </div>
    </>
  )
}
