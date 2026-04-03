'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setLoading(true)
    setVisible(true)
    window.scrollTo(0, 0)

    const timer = setTimeout(() => {
      setLoading(false)
      setTimeout(() => setVisible(false), 500)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname])

  if (!visible) return null

  return (
    <div className={`page-loader${loading ? ' active' : ' fade-out'}`}>
      <div className="page-loader-content">
        <div className="pl-d-wrap">
          <div className="pl-d-top">
            <span className="pl-d-letter">D</span>
          </div>
          <div className="pl-d-bottom">
            <span className="pl-d-letter">D</span>
          </div>
          <span className="page-loader-dot" />
        </div>
      </div>
    </div>
  )
}
