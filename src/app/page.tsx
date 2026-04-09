'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { PRODUCTS } from '@/lib/products'
import { ARTICLES } from '@/lib/articles'
import { supabase } from '@/lib/supabase'

const SEARCH_COMPANIES = [{"name":"Chase Tactical","category":"Protective Equipment","location":"USA"},{"name":"Hard Head Veterans","category":"Protective Equipment","location":"Sweetwater, TX"},{"name":"Hardwire LLC","category":"Protective Equipment","location":"Pocomoke City, MD"},{"name":"Sarkar Tactical","category":"Protective Equipment","location":"El Paso, TX"},{"name":"RMA Armament","category":"Protective Equipment","location":"Centerville, IA"},{"name":"Armor Express","category":"Protective Equipment","location":"Eden, NC"},{"name":"Team Wendy","category":"Protective Equipment","location":"Cleveland, OH"},{"name":"Gentex Corporation","category":"Protective Equipment","location":"Carbondale, PA"},{"name":"Point Blank Enterprises","category":"Protective Equipment","location":"Pompano Beach, FL"},{"name":"Revision Military","category":"Protective Equipment","location":"Essex Junction, VT"},{"name":"Crye Precision","category":"Military Uniforms","location":"Brooklyn, NY"},{"name":"5.11 Tactical","category":"Military Uniforms","location":"Modesto, CA"},{"name":"Viasat Inc.","category":"Communications Gear","location":"Carlsbad, CA"},{"name":"Silvus Technologies","category":"Communications Gear","location":"Los Angeles, CA"},{"name":"Leonardo DRS","category":"Communications Gear","location":"Arlington, VA"},{"name":"ADS Inc.","category":"Logistics & Supply","location":"Virginia Beach, VA"},{"name":"Oshkosh Defense","category":"Military Vehicles","location":"Oshkosh, WI"},{"name":"MBDA","category":"Defence Systems","location":"France/UK/Germany"},{"name":"Rohde & Schwarz","category":"Communications Gear","location":"Germany"}]

export default function HomePage() {
  const [searchVal, setSearchVal] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownItems, setDropdownItems] = useState<{type: string, name: string, category: string, sub: string}[]>([])
  const [spinnerHidden, setSpinnerHidden] = useState(false)
  const [subToast, setSubToast] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [activeOrders, setActiveOrders] = useState<{id: string, type: string, product: string, quantity: string, unit: string, date: string, user: string, orderUserId: string}[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [userBody, setUserBody] = useState('')
  const [interestedSent, setInterestedSent] = useState<Set<string>>(new Set())
  const [engagingId, setEngagingId] = useState<string | null>(null)
  const [orderToast, setOrderToast] = useState('')
  const [orderToastVisible, setOrderToastVisible] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [newOrder, setNewOrder] = useState({ type: 'buy', product: '', quantity: '', unit: 'units', notes: '', expiry: 'perpetual' })
  const [productSuggestions, setProductSuggestions] = useState<typeof PRODUCTS>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [creating, setCreating] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null)
  const [typeOpen, setTypeOpen] = useState(false)
  const [unitOpen, setUnitOpen] = useState(false)
  const [expiryOpen, setExpiryOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const searchWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/orders').then(r => r.json()).then(d => {
      if (d.orders) {
        setActiveOrders(d.orders.slice(0, 5).map((o: Record<string, string>) => ({
          id: o.id,
          type: o.type,
          product: o.product,
          quantity: o.quantity,
          unit: o.unit,
          date: new Date(o.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          user: o.user_name || '',
          orderUserId: o.user_id || '',
        })))
      }
    }).catch(() => {}).finally(() => setOrdersLoading(false))
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session)
      if (data.session?.user) {
        setUserEmail(data.session.user.email || '')
        setUserName(data.session.user.user_metadata?.full_name || '')
        setUserBody(data.session.user.user_metadata?.body || '')
        setUserId(data.session.user.id)
        fetch(`/api/engagements?userId=${data.session.user.id}`).then(r => r.json()).then(d => {
          if (d.engagements) {
            setInterestedSent(new Set(d.engagements.map((e: Record<string,string>) => e.order_id)))
          }
        }).catch(() => {})
      }
    })
  }, [])

  function showOrderToast(msg: string) {
    setOrderToast(msg)
    setOrderToastVisible(true)
    setTimeout(() => setOrderToastVisible(false), 5000)
  }

  async function handleEngage(e: React.MouseEvent, order: {id: string, type: string, product: string, quantity: string, unit: string}) {
    e.preventDefault()
    e.stopPropagation()
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }
    if (interestedSent.has(order.id)) return
    setEngagingId(order.id)
    await fetch('/api/engagements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId, userEmail, userName,
        orderId: order.id, product: order.product,
        orderType: order.type, quantity: `${order.quantity} ${order.unit}`,
      }),
    })
    await fetch('/api/interested', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName || userEmail,
        userBody,
        email: userEmail,
        product: order.product,
        orderId: order.id,
        orderType: order.type,
        quantity: `${order.quantity} ${order.unit}`,
      }),
    })
    setEngagingId(null)
    setInterestedSent(prev => new Set(prev).add(order.id))
    showOrderToast(`You have engaged your interest in ${order.product} order. Defence Trading will reach out to you for details.`)
  }

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

  async function handleCreateOrder(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    const expiryMap: Record<string,number|null> = { 'perpetual': null, '24h': 24, '3d': 72, '7d': 168, '14d': 336, '30d': 720 }
    const hours = expiryMap[newOrder.expiry]
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
    if (data.order) {
      const o = data.order
      setActiveOrders(prev => [{
        id: o.id, type: o.type, product: o.product, quantity: o.quantity, unit: o.unit,
        date: new Date(o.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        user: o.user_name || '', orderUserId: o.user_id || '',
      }, ...prev].slice(0, 5))
    }
    setCreating(false)
    setShowCreate(false)
    setNewOrder({ type: 'buy', product: '', quantity: '', unit: 'units', notes: '', expiry: 'perpetual' })
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const hide = () => setSpinnerHidden(true)
    v.addEventListener('playing', hide)
    v.addEventListener('canplay', hide)
    return () => { v.removeEventListener('playing', hide); v.removeEventListener('canplay', hide) }
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { setDropdownOpen(false); setShowCreate(false); setShowLoginPrompt(false); setCancelOrderId(null); setTypeOpen(false); setUnitOpen(false); setExpiryOpen(false) }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function openDefaultDropdown() {
    const items = PRODUCTS.map(p => ({ type: 'product', name: p.name, category: p.category, sub: p.type }))
    setDropdownItems(items)
    setDropdownOpen(true)
  }

  function handleSearch(val: string) {
    setSearchVal(val)
    const q = val.trim().toLowerCase()
    if (!q) { openDefaultDropdown(); return }
    const matchP = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || (p.category||'').toLowerCase().includes(q) || (p.type||'').toLowerCase().includes(q)
    )
    const matchC = SEARCH_COMPANIES.filter(c =>
      c.name.toLowerCase().includes(q) || (c.category||'').toLowerCase().includes(q) || (c.location||'').toLowerCase().includes(q)
    ).slice(0, 4)
    const items = [
      ...matchP.map(p => ({ type: 'product', name: p.name, category: p.category, sub: p.type })),
      ...matchC.map(c => ({ type: 'company', name: c.name, category: c.category, sub: c.location })),
    ]
    setDropdownItems(items)
    setDropdownOpen(items.length > 0)
  }

  function showSubToast(msg: string) {
    setSubToast(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 4000)
  }

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    const email = (f.querySelector('input[type=email]') as HTMLInputElement)?.value.trim()
    const company = (f.querySelector('.sub-field input[type=text]') as HTMLInputElement)?.value.trim()
    const btn = f.querySelector('.sub-btn') as HTMLButtonElement
    const orig = btn.textContent
    btn.disabled = true
    btn.textContent = 'Submitting…'
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company })
      })
      const d = await res.json()
      if (d.ok) {
        f.reset()
        btn.disabled = false
        btn.textContent = orig
        showSubToast("You have subscribed to Defence Trading's Insights.")
      } else {
        btn.disabled = false
        btn.textContent = orig
        showSubToast('Could not subscribe — please try again.')
      }
    } catch {
      btn.disabled = false
      btn.textContent = orig
    }
  }

  return (
    <>
      <style>{`
        .top-hero {
          position: relative; background: #5BA8D9;
          display: flex; align-items: center; min-height: 520px;
          border-bottom: 4px solid #F5C400;
        }
        .top-hero-grid {
          display: grid; grid-template-columns: 1fr 540px; gap: 48px;
          align-items: center; padding-top: 80px; padding-bottom: 80px; width: 100%;
        }
        .top-hero-left { text-align: left; }
        .top-hero-left h1 {
          font-size: clamp(34px, 5.5vw, 60px); font-weight: 900; color: #fff;
          line-height: 1.05; letter-spacing: -2px; margin-bottom: 22px;
        }
        .top-hero-left p {
          font-size: clamp(14px, 1.7vw, 17px); color: rgba(255,255,255,0.65);
          line-height: 1.7; max-width: 540px; margin-bottom: 40px; margin-left: 0;
        }
        .btn-create-order {
          display: inline-flex; align-items: center; justify-content: center;
          background: #F5C400; color: #000; padding: 18px 44px;
          font-size: 15px; font-weight: 800; letter-spacing: 0.5px;
          text-decoration: none; transition: background 0.15s; line-height: 1;
        }
        .btn-create-order:hover { background: #ffd633; }
        button.btn-create-order { border: none; cursor: pointer; font-family: inherit; }
        .top-hero-right { display: flex; flex-direction: column; gap: 8px; justify-self: end; width: 100%; }
        .orders-panel-label {
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.4); margin-bottom: 4px;
        }
        .orders-panel-loading { display: flex; align-items: center; justify-content: center; padding: 48px 0; }
        .orders-panel-spinner {
          width: 28px; height: 28px; border: 3px solid rgba(255,255,255,0.15);
          border-top-color: rgba(255,255,255,0.7); border-radius: 50%; animation: spin 0.7s linear infinite;
        }
        .orders-panel-empty {
          font-size: 14px; color: rgba(255,255,255,0.3); padding: 32px 0; text-align: center;
        }
        .order-card {
          display: block; background: #fff; border: 1px solid #eee;
          padding: 16px 18px; text-decoration: none; transition: box-shadow 0.15s;
        }
        .order-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
        .order-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .order-type-badge {
          font-size: 10px; font-weight: 800; letter-spacing: 1px; padding: 3px 8px;
        }
        .order-type-badge.buy { background: #0a7c42; color: #fff; }
        .order-type-badge.sell { background: #c62828; color: #fff; }
        .order-card-date { font-size: 11px; color: #999; }
        .order-card-product { font-size: 14px; font-weight: 600; color: #000; margin-bottom: 8px; }
        .order-card-bottom { display: flex; align-items: center; justify-content: space-between; }
        .order-card-qty { font-size: 12px; color: #888; }
        .order-engage-btn {
          background: transparent; border: 1px solid #ccc; color: #000;
          padding: 10px 28px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;
          cursor: pointer; transition: all 0.15s; font-family: inherit;
        }
        .order-engage-btn:hover { background: #000; color: #fff; border-color: #000; }
        .order-engage-btn.engaged { background: transparent; border-color: #0a7c42; color: #0a7c42; cursor: default; }
        .order-engage-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .order-cancel-btn {
          background: transparent; border: 1px solid #ccc; color: #c62828;
          padding: 10px 28px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;
          cursor: pointer; transition: all 0.15s; font-family: inherit;
        }
        .order-cancel-btn:hover { background: #c62828; color: #fff; border-color: #c62828; }
        .cancel-confirm-yes {
          width: 100%; padding: 14px; font-size: 14px; font-weight: 700; font-family: inherit;
          background: #c62828; color: #fff; border: none; cursor: pointer; transition: background 0.15s;
        }
        .cancel-confirm-yes:hover { background: #a00; }
        .order-engage-spinner {
          display: inline-block; width: 12px; height: 12px;
          border: 2px solid rgba(0,0,0,0.15); border-top-color: #000;
          border-radius: 50%; animation: spin 0.6s linear infinite;
        }
        .login-prompt-modal {
          position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);
          background: #fff; z-index: 901; width: min(420px, 90vw); padding: 40px 32px; text-align: center;
        }
        .login-prompt-modal h3 { font-size: 20px; font-weight: 700; color: #000; margin-bottom: 10px; }
        .login-prompt-modal p { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 28px; }
        .login-prompt-btns { display: flex; flex-direction: column; gap: 10px; }
        .login-prompt-yes {
          width: 100%; padding: 14px; font-size: 14px; font-weight: 700; font-family: inherit;
          background: #000; color: #fff; border: none; cursor: pointer; text-decoration: none;
          text-align: center; display: block; transition: background 0.15s; box-sizing: border-box;
        }
        .login-prompt-yes:hover { background: #222; }
        .login-prompt-no {
          width: 100%; padding: 14px; font-size: 14px; font-weight: 700; font-family: inherit;
          background: #fff; color: #000; border: 2px solid #000; cursor: pointer; transition: background 0.15s;
        }
        .login-prompt-no:hover { background: #f5f5f5; }
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
        .ord-field input, .ord-field select, .ord-field textarea { width: 100%; padding: 10px 12px; font-size: 14px; font-family: inherit; border: 1px solid #ddd; background: #fafafa; outline: none; box-sizing: border-box; }
        .ord-field input:focus, .ord-field select:focus, .ord-field textarea:focus { border-color: #000; background: #fff; }
        .ord-field textarea { resize: vertical; }
        .ord-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .ord-suggestions { position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #ddd; border-top: none; z-index: 10; max-height: 200px; overflow-y: auto; }
        .ord-suggestion { padding: 10px 12px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.1s; }
        .ord-suggestion:hover { background: #f5f5f5; }
        .ord-suggestion-name { font-size: 13px; font-weight: 600; color: #000; }
        .ord-suggestion-cat { font-size: 11px; color: #999; }
        .ord-submit { width: 100%; padding: 14px; font-size: 14px; font-weight: 700; font-family: inherit; background: #000; color: #fff; border: none; cursor: pointer; margin-top: 8px; display: flex; align-items: center; justify-content: center; }
        .ord-submit:hover { background: #222; }
        .ord-submit:disabled { background: #666; cursor: not-allowed; }
        .ord-modal-note { font-size: 11px; color: #aaa; text-align: center; margin-top: 16px; line-height: 1.5; }
        .ord-btn-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(150,150,150,0.3); border-top-color: #999; border-radius: 50%; animation: spin 0.6s linear infinite; }
        .orders-panel-viewall {
          font-size: 12px; font-weight: 600; color: #F5C400; text-decoration: none;
          margin-top: 4px; transition: color 0.15s;
        }
        .orders-panel-viewall:hover { color: #ffd633; }
        @media (max-width: 900px) {
          .top-hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .top-hero-right { width: 100%; }
        }
        @media (max-width: 767px) {
          .top-hero { min-height: auto; }
          .top-hero-grid { padding: 48px 24px; }
          .hero-content { padding: 0 24px !important; }
        }
        .hero {
          position: relative; height: 620px;
          display: flex; align-items: center; overflow: hidden;
        }
        .hero-bg { position: absolute; inset: 0; background: #0a0a0a; }
        .hero-video {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center; opacity: 0.6;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(100deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.1) 100%);
        }
        .hero-content { position: relative; z-index: 1; }
        .hero-content h1 {
          font-size: clamp(34px, 5.5vw, 64px); font-weight: 900; color: #fff;
          line-height: 1.01; letter-spacing: -2px; margin-bottom: 22px;
        }
        .hero-content p {
          font-size: clamp(14px, 1.7vw, 17px); color: rgba(255,255,255,0.78);
          line-height: 1.7; max-width: 500px; margin-bottom: 36px;
        }
        .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .hero-spinner {
          position: absolute; inset: 0; z-index: 2;
          display: flex; align-items: center; justify-content: center;
          background: #0a0a0a; transition: opacity 0.4s ease;
        }
        .hero-spinner.hidden { opacity: 0; pointer-events: none; }
        .hero-spinner-ring {
          width: 48px; height: 48px;
          border: 3px solid rgba(255,255,255,0.15);
          border-top-color: rgba(255,255,255,0.75);
          border-radius: 50%; animation: spin 0.8s linear infinite;
        }
        /* NEWS SLIDER */
        .news-slider { background: #0a0a0a; padding: 80px 0 64px; overflow: hidden; }
        .news-slider-intro { margin-bottom: 40px; }
        .news-slider-label { font-size: 11px; font-weight: 700; letter-spacing: 2px; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 12px; }
        .news-slider-h2 { font-size: clamp(28px, 4vw, 42px); font-weight: 900; color: #fff; letter-spacing: -0.5px; margin-bottom: 12px; }
        .news-slider-desc { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 600px; }
        .news-slider-track { display: flex; gap: 12px; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; padding: 0 max(48px, calc((100% - 1344px) / 2)); }
        .news-slider-track::-webkit-scrollbar { display: none; }
        .news-slide { flex: 0 0 320px; background: #fff; padding: 28px 24px; text-decoration: none; transition: box-shadow 0.2s; display: flex; flex-direction: column; border: 1px solid #eee; }
        .news-slide:hover { background: #f5f5f5; }
        .news-slide-source { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; color: #999; text-transform: uppercase; margin-bottom: 12px; }
        .news-slide-title { font-size: 15px; font-weight: 600; color: #000; line-height: 1.4; margin-bottom: 16px; flex: 1; }
        .news-slide-meta { font-size: 11px; color: #aaa; }

        .discovery { background: #f0ebe1; padding: 96px 0; }
        .disc-inner { max-width: 860px; }
        .disc-label {
          font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #000;
          padding-bottom: 6px; border-bottom: 2px solid #E31837; display: inline-block; margin-bottom: 24px;
        }
        .disc-inner h2 { font-size: clamp(28px, 4.5vw, 56px); font-weight: 900; color: #000; line-height: 1.0; letter-spacing: -2px; margin-bottom: 20px; }
        .disc-inner > p { font-size: 15px; color: #555; line-height: 1.75; max-width: 680px; margin-bottom: 52px; }
        .disc-search-wrap { position: relative; max-width: 820px; }
        .disc-search { display: flex; align-items: center; overflow: hidden; background: #fff; max-width: 820px; height: 72px; }
        .disc-search input {
          flex: 1; border: none; background: transparent; padding: 0 32px;
          font-size: 16px; font-family: inherit; outline: none; color: #000; height: 100%;
        }
        .disc-search input::placeholder { color: #aaa; }
        .disc-search-btn {
          width: 72px; height: 100%; background: #000; border: none; cursor: pointer;
          flex-shrink: 0; display: flex; align-items: center; justify-content: center;
          transition: background 0.25s ease;
        }
        .disc-search-btn:hover { background: #333; }
        .disc-search-btn svg { width: 20px; height: 20px; fill: #fff; }
        .disc-disclaimer { font-size: 13px; color: #555; line-height: 1.65; max-width: 640px; margin-top: 36px; }
        .disc-disclaimer strong { color: #000; }
        .disc-dropdown {
          display: none; position: absolute; top: 100%; left: 0; right: 0; margin-top: -1px;
          background: #fff; box-shadow: 0 8px 32px rgba(0,0,0,0.14);
          overflow: hidden; z-index: 100; max-height: 400px; overflow-y: auto;
        }
        .disc-dropdown.open { display: block; }
        .disc-dd-label { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #aaa; padding: 12px 20px 6px; }
        .disc-dd-item {
          display: flex; align-items: center; gap: 12px; padding: 10px 20px;
          cursor: pointer; transition: background 0.1s; text-decoration: none; color: #000;
        }
        .disc-dd-item:hover { background: #f5f5f5; }
        .disc-dd-badge {
          font-size: 10px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;
          padding: 2px 7px; border: 1px solid #000; flex-shrink: 0;
        }
        .disc-dd-badge.product { background: #000; color: #fff; }
        .disc-dd-badge.company { background: #fff; color: #000; }
        .disc-dd-name { font-size: 14px; font-weight: 600; }
        .disc-dd-sub { font-size: 12px; color: #999; margin-left: auto; white-space: nowrap; }
        .disc-dd-empty { padding: 20px; font-size: 14px; color: #aaa; text-align: center; }
        .disc-dd-divider { border: none; border-top: 1px solid #f0f0f0; margin: 4px 0; }
        .featured-split {
          position: relative; height: 560px;
          display: flex; align-items: center; overflow: hidden; background: #000;
        }
        .featured-split > .pg-wrap { width: 100%; }
        .fs-content { position: relative; z-index: 1; padding: 0; max-width: 820px; }
        .fs-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #F5C400; margin-bottom: 20px; }
        .fs-content h2 { font-size: clamp(32px, 5vw, 64px); font-weight: 900; color: #fff; line-height: 1.0; letter-spacing: -2px; margin-bottom: 24px; }
        .fs-content p { font-size: clamp(14px, 1.7vw, 17px); color: rgba(255,255,255,0.78); line-height: 1.7; max-width: 500px; margin-bottom: 36px; }
        @media (max-width: 900px) {
          .featured-split { height: 440px; }
          .discovery { padding: 64px 0; }
        }
        @media (max-width: 767px) {
          .hero { height: 520px; }
          .hero-content { padding: 0 24px; }
          .featured-split { height: 380px; }
          .news-slider-track { padding: 0 20px; }
          .news-slider { padding: 48px 0; }
          .news-slide { flex: 0 0 260px; padding: 20px 18px; }
          .news-slide-title { font-size: 14px; }
          .discovery { padding: 48px 0; }
          .disc-search { height: 60px; }
          .disc-search input { font-size: 12px; padding: 0 14px; }
          .disc-search-btn { width: 60px; }
        }
      `}</style>

      {/* TOP HERO — CREATE ORDER */}
      <section className="top-hero">
        <div className="top-hero-grid pg-wrap">
          <div className="top-hero-left">
            <h1>Procure defence products from verified global suppliers</h1>
            <p>Create a real-time order for your current buy or sell requirement. Our platform will match you with verified counterparties for a trade deal — instantly and compliantly.</p>
            {isLoggedIn ? (
              <button className="btn-create-order" onClick={() => setShowCreate(true)}>Create Order</button>
            ) : (
              <Link href="/login" className="btn-create-order">Login to Create Order</Link>
            )}
          </div>
          <div className="top-hero-right">
            <div className="orders-panel-label">Active Orders</div>
            {ordersLoading ? (
              <div className="orders-panel-loading"><div className="orders-panel-spinner" /></div>
            ) : activeOrders.length === 0 ? (
              <div className="orders-panel-empty">No active orders</div>
            ) : (
              activeOrders.map(o => (
                <div key={o.id} className="order-card">
                  <div className="order-card-top">
                    <span className={`order-type-badge ${o.type}`}>{o.type === 'buy' ? 'BUY' : 'SELL'}</span>
                    <span className="order-card-date">{o.date}</span>
                  </div>
                  <div className="order-card-product">{o.product}</div>
                  <div className="order-card-bottom">
                    <span className="order-card-qty">{o.quantity} {o.unit}</span>
                    {o.orderUserId === userId && userId ? (
                      <button className="order-cancel-btn" onClick={e => { e.stopPropagation(); setCancelOrderId(o.id) }}>Cancel</button>
                    ) : (
                      <button
                        className={`order-engage-btn${interestedSent.has(o.id) ? ' engaged' : ''}`}
                        onClick={e => handleEngage(e, o)}
                        disabled={engagingId === o.id}
                      >
                        {engagingId === o.id ? (
                          <span className="order-engage-spinner" />
                        ) : interestedSent.has(o.id) ? 'Engaged' : 'Engage'}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
            <Link href="/orders" className="orders-panel-viewall">View All Orders &rarr;</Link>
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className={`hero-spinner${spinnerHidden ? ' hidden' : ''}`}>
            <div className="hero-spinner-ring"></div>
          </div>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content pg-wrap">
          <h1>The global marketplace for defence procurement</h1>
          <p>Certified products, verified companies, and documented procurement channels — serving government and military clients worldwide.</p>
          <div className="hero-cta">
            <Link href="/products" className="btn-browse-products"><span>Browse Products</span></Link>
          </div>
        </div>
      </section>

      {/* DISCOVERY SECTION */}
      <section className="discovery">
        <div className="pg-wrap">
          <div className="disc-inner">
            <div className="disc-label">Defence Trading Catalogue</div>
            <h2>Find the right defence product or partner</h2>
            <p>Each procurement requirement is different — and we are steadfast partners to our clients because we listen. Browse our full range of certified products and verified companies across every defence category.</p>
            <div className="disc-search-wrap" ref={searchWrapRef}>
              <div className="disc-search">
                <input
                  type="text"
                  placeholder="Search for products, companies..."
                  value={searchVal}
                  onChange={e => handleSearch(e.target.value)}
                  onFocus={openDefaultDropdown}
                  autoComplete="off"
                />
                <button className="disc-search-btn" onClick={() => { if (searchVal) window.location.href = `/products?q=${encodeURIComponent(searchVal)}` }}>
                  <svg viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.15 6.15a7.5 7.5 0 0 0 10.5 10.5z" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
                </button>
              </div>
              <div className={`disc-dropdown${dropdownOpen ? ' open' : ''}`}>
                {dropdownItems.length === 0 ? (
                  <div className="disc-dd-empty">No results found</div>
                ) : (
                  <>
                    {dropdownItems.filter(i => i.type === 'product').length > 0 && (
                      <div className="disc-dd-label">Products</div>
                    )}
                    {dropdownItems.filter(i => i.type === 'product').map((item, idx) => (
                      <Link key={`p-${idx}`} className="disc-dd-item" href={`/products?q=${encodeURIComponent(item.name)}`}>
                        <span className="disc-dd-badge product">Product</span>
                        <span className="disc-dd-name">{item.name}</span>
                        <span className="disc-dd-sub">{item.sub}</span>
                      </Link>
                    ))}
                    {dropdownItems.filter(i => i.type === 'company').length > 0 && (
                      <>
                        <hr className="disc-dd-divider" />
                        <div className="disc-dd-label">Companies</div>
                      </>
                    )}
                    {dropdownItems.filter(i => i.type === 'company').map((item, idx) => (
                      <Link key={`c-${idx}`} className="disc-dd-item" href="/companies">
                        <span className="disc-dd-badge company">Company</span>
                        <span className="disc-dd-name">{item.name}</span>
                        <span className="disc-dd-sub">{item.sub}</span>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
            <p className="disc-disclaimer"><strong>Authorised enquiries only.</strong> All products are available through compliant, documented procurement channels. Defence Trading trades with licensed companies only. All outreach must comply with applicable export control regulations and end-user certification requirements.</p>
          </div>
        </div>
      </section>

      {/* GLOBAL INSIGHTS */}
      <section className="news-slider">
        <div className="pg-wrap">
          <div className="news-slider-intro">
            <div className="news-slider-label">Defence Trading</div>
            <h2 className="news-slider-h2">Global Insights</h2>
            <p className="news-slider-desc">Stay ahead with the latest defence procurement intelligence, geopolitical analysis, and market trends — curated for governments, armed forces, and prime contractors worldwide.</p>
            <div style={{marginTop: '24px'}}><Link href="/insights" className="btn-yellow">Explore Global Insights</Link></div>
          </div>
        </div>
        <div className="news-slider-track">
          {ARTICLES.slice(0, 8).map((a, i) => (
            <Link key={i} href={`/insights/${a.slug}`} className="news-slide">
              <div className="news-slide-source">{a.source}</div>
              <div className="news-slide-title">{a.title}</div>
              <div className="news-slide-meta">{a.date} · {a.region}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* SUBSCRIBE STRIP */}
      <div className="subscribe-strip">
        <div className="pg-wrap">
          <h2>Subscribe to Defence Trading&apos;s Insights</h2>
          <p className="sub-intro">To receive the latest procurement intelligence, product updates, and market analysis — sign up below.</p>
          <form onSubmit={handleSubscribe}>
            <div className="sub-fields">
              <div className="sub-field">
                <label>Email <span>*</span></label>
                <input type="email" placeholder="Work email address" required />
              </div>
              <div className="sub-field">
                <label>Location <span>*</span></label>
                <select required defaultValue="">
                  <option value="" disabled></option>
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
              <button type="submit" className="sub-btn">Subscribe to Defence Trading</button>
            </div>
          </form>
        </div>
      </div>

      <div className={`sub-toast${toastVisible ? ' show' : ''}`}>{subToast}</div>
      <div className={`sub-toast${orderToastVisible ? ' show' : ''}`}>{orderToast}</div>

      {/* CANCEL ORDER MODAL */}
      {cancelOrderId && (
        <>
          <div className="ord-modal-backdrop" onClick={() => setCancelOrderId(null)} />
          <div className="login-prompt-modal">
            <h3>Cancel Order</h3>
            <p>Are you sure you want to cancel this order? This action cannot be undone.</p>
            <div className="login-prompt-btns">
              <button className="cancel-confirm-yes" onClick={() => {
                fetch('/api/orders/cancel', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({orderId: cancelOrderId}) })
                  .then(() => { setActiveOrders(prev => prev.filter(x => x.id !== cancelOrderId)); setCancelOrderId(null) })
              }}>Yes, Cancel Order</button>
              <button className="login-prompt-no" onClick={() => setCancelOrderId(null)}>Keep Order</button>
            </div>
          </div>
        </>
      )}

      {/* LOGIN PROMPT MODAL */}
      {showLoginPrompt && (
        <>
          <div className="ord-modal-backdrop" onClick={() => setShowLoginPrompt(false)} />
          <div className="login-prompt-modal">
            <h3>Sign in required</h3>
            <p>You need to sign in to engage with orders.</p>
            <div className="login-prompt-btns">
              <Link href="/login" className="login-prompt-yes">Go to Login</Link>
              <button className="login-prompt-no" onClick={() => setShowLoginPrompt(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}

      {/* CREATE ORDER MODAL */}
      {showCreate && (
        <>
          <div className="ord-modal-backdrop" onClick={() => setShowCreate(false)} />
          <div className="ord-modal">
            <div className="ord-modal-head">
              <h2>Create Order</h2>
              <button className="ord-modal-close" onClick={() => setShowCreate(false)}>&#10005;</button>
            </div>
            <form onSubmit={handleCreateOrder} className="ord-modal-body">
              <div className="ord-field">
                <label>Order Type</label>
                <div className="csel-wrap">
                  <button type="button" className="csel-trigger" onClick={() => { setTypeOpen(!typeOpen); setUnitOpen(false); setExpiryOpen(false) }}>
                    <span>{newOrder.type === 'buy' ? 'Buy — I want to purchase' : 'Sell — I want to sell'}</span>
                    <span className={`csel-arrow${typeOpen ? ' open' : ''}`}>&#x276F;</span>
                  </button>
                  {typeOpen && (
                    <div className="csel-options">
                      {[{v:'buy',l:'Buy — I want to purchase'},{v:'sell',l:'Sell — I want to sell'}].map(o => (
                        <div key={o.v} className={`csel-option${newOrder.type === o.v ? ' selected' : ''}`} onClick={() => { setNewOrder(p => ({...p, type: o.v})); setTypeOpen(false) }}>{o.l}</div>
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
                  onFocus={() => { if (newOrder.product) handleProductInput(newOrder.product) }}
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
                      <span>{newOrder.unit.charAt(0).toUpperCase() + newOrder.unit.slice(1)}</span>
                      <span className={`csel-arrow${unitOpen ? ' open' : ''}`}>&#x276F;</span>
                    </button>
                    {unitOpen && (
                      <div className="csel-options">
                        {['units','rounds','systems','vehicles','sets'].map(u => (
                          <div key={u} className={`csel-option${newOrder.unit === u ? ' selected' : ''}`} onClick={() => { setNewOrder(p => ({...p, unit: u})); setUnitOpen(false) }}>{u.charAt(0).toUpperCase() + u.slice(1)}</div>
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
                    <span>{{ perpetual:'Perpetual (No expiry)', '24h':'24 Hours', '3d':'3 Days', '7d':'7 Days', '14d':'14 Days', '30d':'30 Days' }[newOrder.expiry]}</span>
                    <span className={`csel-arrow${expiryOpen ? ' open' : ''}`}>&#x276F;</span>
                  </button>
                  {expiryOpen && (
                    <div className="csel-options">
                      {[{v:'perpetual',l:'Perpetual (No expiry)'},{v:'24h',l:'24 Hours'},{v:'3d',l:'3 Days'},{v:'7d',l:'7 Days'},{v:'14d',l:'14 Days'},{v:'30d',l:'30 Days'}].map(o => (
                        <div key={o.v} className={`csel-option${newOrder.expiry === o.v ? ' selected' : ''}`} onClick={() => { setNewOrder(p => ({...p, expiry: o.v})); setExpiryOpen(false) }}>{o.l}</div>
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
                <div style={{fontSize:'11px',color:'#aaa',textAlign:'right',marginTop:'4px'}}>{newOrder.notes.length}/50</div>
              </div>
              <button type="submit" className="ord-submit" disabled={creating}>
                {creating ? <span className="ord-btn-spinner" style={{borderColor:'rgba(255,255,255,0.3)',borderTopColor:'#fff'}} /> : 'Submit Order'}
              </button>
              <p className="ord-modal-note">All orders are reviewed by our procurement team and subject to compliance verification.</p>
            </form>
          </div>
        </>
      )}
    </>
  )
}
