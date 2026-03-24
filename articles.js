const ARTICLES = [
  {
    title: "The most traded military products in 2026 — and what the demand tells us about where the world is heading",
    url:   "most-traded-military-products-2026.html",
    cat:   "Market Analysis",
    date:  "24 Mar 2026"
  },
  {
    title: "Three years on, Russia's war economy is still running — and Europe is only just waking up",
    url:   "three-years-on-russias-war-economy-is-still-running.html",
    cat:   "Geopolitical Analysis",
    date:  "17 Mar 2026"
  },
  {
    title: "Taiwan is not Ukraine — and that distinction matters more than most defence planners admit",
    url:   "taiwan-is-not-ukraine-and-that-distinction-matters.html",
    cat:   "Geopolitical Analysis",
    date:  "15 Mar 2026"
  },
  {
    title: "Iran's proxy network is the most consequential military development in the Middle East since 2003",
    url:   "irans-proxy-network-most-consequential-military-development-since-2003.html",
    cat:   "Geopolitical Analysis",
    date:  "12 Mar 2026"
  },
  {
    title: "Europe's ammunition gap is bigger than anyone admits — and the production ramp-up is years behind",
    url:   "europes-ammunition-gap-bigger-than-anyone-admits.html",
    cat:   "Market Analysis",
    date:  "10 Mar 2026"
  },
  {
    title: "The Pentagon's $886 billion budget tells you everything about America's strategic priorities — if you know how to read it",
    url:   "pentagon-886-billion-budget-americas-strategic-priorities.html",
    cat:   "Market Analysis",
    date:  "8 Mar 2026"
  },
  {
    title: "The Red Sea crisis has permanently altered Gulf defence procurement thinking",
    url:   "red-sea-crisis-permanently-altered-gulf-defence-procurement.html",
    cat:   "Industry News",
    date:  "5 Mar 2026"
  },
  {
    title: "North Korean artillery shells are being fired at Ukrainian positions — what that tells us about the new arms trade",
    url:   "north-korean-shells-fired-at-ukrainian-positions.html",
    cat:   "Geopolitical Analysis",
    date:  "2 Mar 2026"
  },
  {
    title: "Germany's Zeitenwende is real this time — and the numbers finally back it up",
    url:   "germanys-zeitenwende-is-real-this-time.html",
    cat:   "Market Analysis",
    date:  "26 Feb 2026"
  },
  {
    title: "Saudi Arabia wants to manufacture 50% of its own defence equipment by 2030. Here's how realistic that actually is",
    url:   "saudi-arabia-50-percent-defence-manufacturing-by-2030.html",
    cat:   "Market Analysis",
    date:  "20 Feb 2026"
  },
  {
    title: "The defence industry just had its best decade since the Cold War — and the next ten years look even better",
    url:   "defence-industry-best-decade-since-cold-war.html",
    cat:   "Industry News",
    date:  "14 Feb 2026"
  }
];

// Render "More from Global Insights" grid (2 articles, excludes current)
function renderMoreArticles(currentUrl) {
  const el = document.getElementById('more-grid');
  if (!el) return;
  const others = ARTICLES.filter(a => a.url !== currentUrl).slice(0, 2);
  el.innerHTML = others.map(a => `
    <a href="${a.url}" class="more-card">
      <div class="more-card-cat">${a.cat}</div>
      <div class="more-card-title">${a.title}</div>
      <div class="more-card-date">${a.date}</div>
    </a>`).join('');
}

// Render sidebar "Related Articles" (3 articles, excludes current)
function renderRelatedArticles(currentUrl) {
  const el = document.getElementById('related-articles');
  if (!el) return;
  const others = ARTICLES.filter(a => a.url !== currentUrl).slice(0, 3);
  el.innerHTML = others.map(a => `
    <div class="sidebar-related-item">
      <div class="sidebar-related-cat">${a.cat}</div>
      <a href="${a.url}" class="sidebar-related-title">${a.title}</a>
      <div class="sidebar-related-date">${a.date}</div>
    </div>`).join('');
}
