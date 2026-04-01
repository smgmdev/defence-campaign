import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ARTICLES, getArticle } from '@/lib/articles'

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title + ' — Defence Trading',
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: ['Defence Trading'],
      images: [{ url: 'https://www.defencetrading.com/og-image.png', width: 1280, height: 640 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
    alternates: {
      canonical: `https://www.defencetrading.com/insights/${slug}`,
    },
  }
}


const CAT_LABELS: Record<string, string> = {
  geo: 'Geopolitical Analysis',
  market: 'Market Analysis',
  tech: 'Defence Technology',
  industry: 'Industry News',
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const bodyHtml = article.body
  const related = ARTICLES.filter(a => a.slug !== slug && (a.cat === article.cat || a.region === article.region)).slice(0, 4)
  const more = ARTICLES.filter(a => a.slug !== slug).slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: [{ '@type': 'Organization', name: 'Defence Trading', url: 'https://www.defencetrading.com' }],
    publisher: {
      '@type': 'Organization',
      name: 'Defence Trading',
      logo: { '@type': 'ImageObject', url: 'https://www.defencetrading.com/og-image.png' },
    },
    image: 'https://www.defencetrading.com/og-image.png',
    url: `https://www.defencetrading.com/insights/${slug}`,
    articleSection: CAT_LABELS[article.cat] || article.source,
    keywords: article.keywords,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        .art-header { border-bottom: 1px solid #e0e0e0; padding: 56px 0 48px; }
        .art-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #666; margin-bottom: 32px; }
        .art-breadcrumb a { color: #666; text-decoration: none; transition: color 0.15s; }
        .art-breadcrumb a:hover { color: #000; }
        .art-breadcrumb-sep { color: #e0e0e0; font-size: 14px; }
        .art-breadcrumb-current { color: #000; }
        .art-tag { display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #E31837; margin-bottom: 20px; }
        .art-headline { font-size: clamp(28px, 3.5vw, 48px); font-weight: 900; color: #000; line-height: 1.05; letter-spacing: -1.5px; max-width: 860px; margin-bottom: 32px; }
        .art-header-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 0; font-size: 13px; color: #666; margin-bottom: 28px; }
        .art-header-meta-author { font-weight: 700; color: #1a1a1a; }
        .art-header-meta-sep { margin: 0 12px; color: #e0e0e0; }
        .art-share-row { display: flex; align-items: center; gap: 10px; }
        .share-label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #666; margin-right: 4px; }
        .share-btn { width: 34px; height: 34px; border: 1px solid #e0e0e0; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 13px; text-decoration: none; color: #1a1a1a; transition: all 0.15s; }
        .share-btn:hover { border-color: #000; background: #f5f5f5; }
        .art-layout { display: grid; grid-template-columns: 1fr 320px; gap: 64px; padding: 56px 0 100px; align-items: start; }
        .art-body { font-size: 17px; line-height: 1.8; color: #1a1a1a; }
        .art-body p { margin-bottom: 26px; }
        .art-body p:last-child { margin-bottom: 0; }
        .art-body h2 { font-size: 23px; font-weight: 900; color: #000; letter-spacing: -0.4px; margin: 48px 0 16px; line-height: 1.2; }
        .art-body h3 { font-size: 19px; font-weight: 800; color: #000; margin: 32px 0 12px; }
        .art-body strong { font-weight: 700; color: #000; }
        .art-body blockquote { border-left: 4px solid #000; margin: 40px 0; padding: 8px 0 8px 28px; font-size: 21px; font-weight: 800; color: #000; line-height: 1.4; font-style: normal; letter-spacing: -0.3px; }
        .art-body a { color: #000; font-weight: 700; }
        .art-body a:hover { opacity: 0.6; }
        .art-body ul { padding-left: 24px; margin-bottom: 26px; }
        .art-body ul li { margin-bottom: 10px; line-height: 1.7; }
        .art-body hr { border: none; border-top: 1px solid #e0e0e0; margin: 40px 0; }
        .stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #e0e0e0; border: 1px solid #e0e0e0; margin: 40px 0; }
        .stat-box { background: #fff; padding: 28px 24px; }
        .stat-num { font-size: 36px; font-weight: 900; color: #000; letter-spacing: -1.5px; line-height: 1; margin-bottom: 8px; }
        .stat-num span { color: #E31837; }
        .stat-label { font-size: 12px; font-weight: 700; color: #666; text-transform: uppercase; letter-spacing: 1px; line-height: 1.4; }
        .scenario-grid { display: grid; grid-template-columns: 1fr; gap: 0; border: 1px solid #e0e0e0; margin: 40px 0; }
        .scenario-card { padding: 28px 32px; border-bottom: 1px solid #e0e0e0; }
        .scenario-card:last-child { border-bottom: none; }
        .scenario-num { font-size: 10px; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; color: #E31837; margin-bottom: 8px; }
        .scenario-title { font-size: 18px; font-weight: 900; color: #000; margin-bottom: 10px; letter-spacing: -0.3px; }
        .scenario-body { font-size: 15px; color: #666; line-height: 1.7; }
        .scenario-likelihood { display: inline-block; margin-top: 12px; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 12px; background: #f5f5f5; color: #1a1a1a; }
        .align-table { width: 100%; border-collapse: collapse; margin: 40px 0; font-size: 14px; }
        .align-table th { background: #000; color: #fff; padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; }
        .align-table td { padding: 14px 16px; border-bottom: 1px solid #e0e0e0; vertical-align: top; line-height: 1.5; }
        .align-table tr:last-child td { border-bottom: none; }
        .align-table tr:nth-child(even) td { background: #f5f5f5; }
        .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 6px; vertical-align: middle; }
        .dot-green { background: #22c55e; }
        .dot-yellow { background: #eab308; }
        .dot-red { background: #E31837; }
        .prep-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid #e0e0e0; margin: 40px 0; }
        .prep-card { padding: 28px; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; }
        .prep-card:nth-child(2n) { border-right: none; }
        .prep-card:nth-last-child(-n+2) { border-bottom: none; }
        .prep-icon { font-size: 28px; margin-bottom: 12px; }
        .prep-title { font-size: 16px; font-weight: 900; color: #000; margin-bottom: 10px; }
        .prep-body { font-size: 14px; color: #555; line-height: 1.65; }
        .product-spotlight { border: 1px solid #e0e0e0; margin: 40px 0; }
        .product-spotlight-header { background: #000; padding: 16px 24px; display: flex; align-items: center; gap: 12px; }
        .product-spotlight-tag { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #E31837; }
        .product-spotlight-name { font-size: 18px; font-weight: 900; color: #fff; }
        .product-spotlight-body { padding: 24px; }
        .product-spotlight-body p { font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 16px; }
        .product-spotlight-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #000; text-decoration: none; border-bottom: 1.5px solid #000; padding-bottom: 2px; }
        .conflict-table { width: 100%; border-collapse: collapse; margin: 40px 0; font-size: 14px; }
        .conflict-table th { background: #000; color: #fff; padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; }
        .conflict-table td { padding: 14px 16px; border-bottom: 1px solid #e0e0e0; vertical-align: top; line-height: 1.5; }
        .conflict-table tr:last-child td { border-bottom: none; }
        .conflict-table tr:nth-child(even) td { background: #f5f5f5; }
        .status-badge { display: inline-block; font-size: 10px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; padding: 3px 8px; }
        .status-active { background: #fee2e2; color: #991b1b; }
        .status-frozen { background: #fef9c3; color: #854d0e; }
        .status-latent { background: #f0fdf4; color: #166534; }
        .art-sidebar { position: sticky; top: 80px; }
        .sidebar-block { border-top: 2px solid #000; padding-top: 24px; margin-bottom: 40px; }
        .sidebar-block-label { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #666; margin-bottom: 16px; }
        .sidebar-block-title { font-size: 16px; font-weight: 900; color: #000; line-height: 1.3; letter-spacing: -0.3px; margin-bottom: 12px; }
        .sidebar-block p { font-size: 13px; color: #666; line-height: 1.65; margin-bottom: 16px; }
        .sidebar-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #000; text-decoration: none; border-bottom: 1.5px solid #000; padding-bottom: 2px; transition: opacity 0.15s; }
        .sidebar-link:hover { opacity: 0.6; }
        .sidebar-related-item { padding: 16px 0; border-bottom: 1px solid #e0e0e0; }
        .sidebar-related-item:first-child { padding-top: 0; }
        .sidebar-related-cat { font-size: 10px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #666; margin-bottom: 6px; }
        .sidebar-related-title { font-size: 14px; font-weight: 700; color: #000; line-height: 1.3; text-decoration: none; display: block; transition: opacity 0.15s; }
        .sidebar-related-title:hover { opacity: 0.6; }
        .sidebar-related-date { font-size: 12px; color: #666; margin-top: 4px; }
        .more-articles { margin-top: 56px; }
        .more-label { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #666; margin-bottom: 24px; }
        .more-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid #e0e0e0; }
        .more-card { padding: 28px; border-right: 1px solid #e0e0e0; text-decoration: none; display: block; transition: background 0.15s; }
        .more-card:nth-child(2n) { border-right: none; }
        .more-card:nth-child(n+3) { border-top: 1px solid #e0e0e0; }
        .more-card:hover { background: #f5f5f5; }
        .more-card-cat { font-size: 10px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #666; margin-bottom: 10px; }
        .more-card-title { font-size: 16px; font-weight: 800; color: #000; line-height: 1.25; margin-bottom: 10px; }
        .more-card-date { font-size: 12px; color: #666; }
        @media (max-width: 1024px) { .art-layout { grid-template-columns: 1fr; gap: 48px; } .art-sidebar { position: static; } }
        @media (max-width: 767px) {
          .art-header { padding: 36px 0 32px; }
          .art-layout { padding: 36px 0 64px; gap: 32px; }
          .art-body { font-size: 16px; }
          .art-body blockquote { font-size: 18px; padding-left: 20px; }
          .stat-row { grid-template-columns: 1fr; }
          .prep-grid { grid-template-columns: 1fr; }
          .more-grid { grid-template-columns: 1fr; }
          .more-card { border-right: none; border-bottom: 1px solid #e0e0e0; }
          .more-card:last-child { border-bottom: none; }
          .align-table { font-size: 12px; }
          .align-table td, .align-table th { padding: 10px 12px; }
        }
      `}</style>

      {/* ARTICLE HEADER */}
      <div className="art-header">
        <div className="pg-wrap">
          <div className="art-breadcrumb">
            <Link href="/">Home</Link>
            <span className="art-breadcrumb-sep">/</span>
            <Link href="/insights">Global Insights</Link>
            <span className="art-breadcrumb-sep">/</span>
            <span className="art-breadcrumb-current">{CAT_LABELS[article.cat] || article.source}</span>
          </div>
          <div className="art-tag">{CAT_LABELS[article.cat] || article.source}</div>
          <h1 className="art-headline">{article.title}</h1>
          <div className="art-header-meta">
            <span className="art-header-meta-author">Editorial Team — Defence Trading</span>
            <span className="art-header-meta-sep">|</span>
            <span>{article.date}</span>
            <span className="art-header-meta-sep">|</span>
            <span>{article.region}</span>
          </div>
          <div className="art-share-row">
            <span className="share-label">Share</span>
            <a className="share-btn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.defencetrading.com/insights/' + slug)}`} target="_blank" rel="noopener" title="Share on LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a className="share-btn" href={`https://x.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent('https://www.defencetrading.com/insights/' + slug)}`} target="_blank" rel="noopener" title="Share on X">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
            </a>
            <a className="share-btn" href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent('https://www.defencetrading.com/insights/' + slug)}`} title="Share via Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* ARTICLE BODY + SIDEBAR */}
      <div className="pg-wrap">
        <div className="art-layout">
          <div>
            <div className="art-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

            {more.length > 0 && (
              <div className="more-articles">
                <div className="more-label">More from Global Insights</div>
                <div className="more-grid">
                  {more.map(a => (
                    <Link key={a.slug} href={`/insights/${a.slug}`} className="more-card">
                      <div className="more-card-cat">{CAT_LABELS[a.cat] || a.source}</div>
                      <div className="more-card-title">{a.title}</div>
                      <div className="more-card-date">{a.date}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="art-sidebar">
            {related.slice(0, 3).map(r => (
              <div key={r.slug} className="sidebar-block">
                <div className="sidebar-block-label">Related Analysis</div>
                <div className="sidebar-block-title">{r.title}</div>
                <p>{r.description}</p>
                <Link href={`/insights/${r.slug}`} className="sidebar-link">Read analysis →</Link>
              </div>
            ))}

            {related.length > 3 && (
              <div className="sidebar-block">
                <div className="sidebar-block-label">Related Articles</div>
                {related.slice(3).map(r => (
                  <div key={r.slug} className="sidebar-related-item">
                    <div className="sidebar-related-cat">{CAT_LABELS[r.cat]}</div>
                    <Link href={`/insights/${r.slug}`} className="sidebar-related-title">{r.title}</Link>
                    <div className="sidebar-related-date">{r.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
