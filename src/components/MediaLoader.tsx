'use client'

import { useState } from 'react'

export function VideoLoader({ src, className, fill, autoPlay = true, muted = true, loop = true, playsInline = true }: {
  src: string
  className?: string
  fill?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
}) {
  const [loaded, setLoaded] = useState(false)

  if (fill) {
    return (
      <>
        {!loaded && (
          <div className="media-spinner-wrap" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <div className="media-spinner" />
          </div>
        )}
        <video
          className={className}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          onCanPlay={() => setLoaded(true)}
          style={loaded ? {} : { opacity: 0 }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!loaded && (
        <div className="media-spinner-wrap">
          <div className="media-spinner" />
        </div>
      )}
      <video
        className={className}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        onCanPlay={() => setLoaded(true)}
        style={loaded ? {} : { opacity: 0 }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}

export function ImageLoader({ src, alt, className, style }: {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{ position: 'relative', ...style }}>
      {!loaded && (
        <div className="media-spinner-wrap">
          <div className="media-spinner" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        style={loaded ? {} : { opacity: 0 }}
      />
    </div>
  )
}
