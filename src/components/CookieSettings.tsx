'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const TABS = [
  {
    id: 'privacy',
    label: 'Your Privacy',
    content: (
      <>
        <h3 className="cs-tab-title">Your Privacy</h3>
        <p className="cs-tab-body">When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences, or your device, and is mostly used to make the site work as you expect. The information does not usually identify you directly, but it can give you a more personalised web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the different category headings to learn more and change our default settings. Blocking some types of cookies may impact your experience of the site and the services we are able to offer.</p>
        <Link href="/cookies" className="cs-more-link">More information</Link>
      </>
    ),
  },
  {
    id: 'necessary',
    label: 'Strictly Necessary Cookies',
    content: (
      <>
        <h3 className="cs-tab-title">Strictly Necessary Cookies</h3>
        <p className="cs-tab-body">These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.</p>
        <p className="cs-always-active">Always Active</p>
      </>
    ),
  },
  {
    id: 'targeting',
    label: 'Targeting Cookies',
    content: (
      <>
        <h3 className="cs-tab-title">Targeting Cookies</h3>
        <p className="cs-tab-body">These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.</p>
      </>
    ),
  },
]

export default function CookieSettings() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('privacy')

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) {
    return (
      <button className="cs-trigger" onClick={() => setOpen(true)}>Cookie Settings</button>
    )
  }

  return (
    <>
      <button className="cs-trigger" onClick={() => setOpen(true)}>Cookie Settings</button>
      <div className="cs-backdrop" onClick={() => setOpen(false)} />
      <div className="cs-modal">
        <div className="cs-modal-head">
          <div className="cs-modal-logo"><span>DefenceTrading<span className="brand-dot"></span></span> <span className="cs-modal-title-text">Privacy Preference Centre</span></div>
          <button className="cs-modal-close" onClick={() => setOpen(false)}>&#x2715;</button>
        </div>

        <div className="cs-modal-body">
          <div className="cs-sidebar">
            {TABS.map(t => (
              <button key={t.id} className={`cs-sidebar-tab${activeTab === t.id ? ' active' : ''}`} onClick={() => setActiveTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="cs-content">
            {TABS.find(t => t.id === activeTab)?.content}
          </div>
        </div>

        <div className="cs-modal-footer">
          <button className="cs-btn-confirm" onClick={() => setOpen(false)}>Confirm My Choices</button>
          <button className="cs-btn-reject" onClick={() => setOpen(false)}>Reject All</button>
        </div>
      </div>
    </>
  )
}
