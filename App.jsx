import React, { useMemo, useState } from "react";

const PRODUCTS = [
  {
    title: "Stainless Steel Air Fryer Toaster Oven",
    category: "Kitchen",
    price: "$$",
    rating: 91,
    tag: "Best Overall",
    retailer: "Amazon",
    affiliateUrl: "#",
    badges: ["Stainless Interior", "No Nonstick Basket"],
    why: "A better option for people trying to avoid traditional nonstick baskets while still wanting air-fryer convenience.",
    concerns: "Confirm tray and basket materials before buying.",
  },
  {
    title: "100% Cotton OEKO-TEX Bath Towel Set",
    category: "Textiles",
    price: "$",
    rating: 88,
    tag: "Budget Pick",
    retailer: "Target",
    affiliateUrl: "#",
    badges: ["OEKO-TEX", "100% Cotton"],
    why: "A simple textile swap for a cleaner bathroom routine without luxury pricing.",
    concerns: "Dark dyes and heavy softening finishes may still bother sensitive users.",
  },
  {
    title: "Glass Food Storage Container Set",
    category: "Food Storage",
    price: "$",
    rating: 94,
    tag: "Easy Swap",
    retailer: "Walmart",
    affiliateUrl: "#",
    badges: ["Glass", "Meal Prep"],
    why: "Great for reducing hot-food contact with plastic and making leftovers easier to store.",
    concerns: "Most lids still contain plastic or silicone; avoid microwaving lids.",
  },
  {
    title: "Fragrance-Free Castile Soap",
    category: "Cleaning",
    price: "$",
    rating: 86,
    tag: "Multi-Use",
    retailer: "Amazon",
    affiliateUrl: "#",
    badges: ["Fragrance-Free", "Concentrated"],
    why: "Useful as a simple base for hand soap, surface cleaning, and diluted household use.",
    concerns: "Can feel drying if too concentrated.",
  },
  {
    title: "Stainless Steel Cookware Starter Pan",
    category: "Cookware",
    price: "$$",
    rating: 93,
    tag: "Worth It",
    retailer: "Brand Site",
    affiliateUrl: "#",
    badges: ["Stainless Steel", "PFAS-Free"],
    why: "A durable alternative to coated nonstick pans for everyday cooking once you learn heat control.",
    concerns: "Learning curve for sticking.",
  },
  {
    title: "Fragrance-Free Laundry Detergent",
    category: "Laundry",
    price: "$",
    rating: 84,
    tag: "Sensitive Skin",
    retailer: "Target",
    affiliateUrl: "#",
    badges: ["Fragrance-Free", "Dye-Free"],
    why: "One of the easiest first swaps for reducing daily fragrance exposure on clothing and bedding.",
    concerns: "Check for preservatives or brighteners if sensitive.",
  },
  {
    title: "Water Filter Pitcher",
    category: "Water",
    price: "$$",
    rating: 89,
    tag: "Daily Use",
    retailer: "Brand Site",
    affiliateUrl: "#",
    badges: ["Filtered Water", "Apartment Friendly"],
    why: "A practical lower-cost step for people not ready for an under-sink system.",
    concerns: "Look for transparent third-party testing.",
  },
  {
    title: "Unscented Beeswax Taper Candles",
    category: "Home",
    price: "$$",
    rating: 87,
    tag: "Cozy Swap",
    retailer: "Etsy",
    affiliateUrl: "#",
    badges: ["Unscented", "Beeswax"],
    why: "A cozy option for people who love candles but want to avoid strong synthetic fragrances.",
    concerns: "Ventilate and use moderately.",
  },
];

const CATEGORIES = ["All", "Kitchen", "Cookware", "Food Storage", "Cleaning", "Laundry", "Textiles", "Water", "Home"];

const SWAP_DATA = {
  febreze: ["Fragrance-free fabric refresher", "Washable textiles routine", "Baking soda deodorizing before vacuuming"],
  "nonstick pan": ["Stainless steel skillet", "Cast iron pan", "Clearly disclosed ceramic-coated pan"],
  candles: ["Unscented beeswax candles", "Unscented soy candles", "Simmer pot with citrus and spices"],
  "plastic containers": ["Glass food storage", "Stainless steel lunch containers", "Silicone snack bags"],
};

function getFilteredProducts(products, category, query) {
  const normalizedQuery = query.trim().toLowerCase();
  return products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const searchBlob = JSON.stringify(product).toLowerCase();
    const matchesQuery = normalizedQuery.length === 0 || searchBlob.includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });
}

function getSwapSuggestions(value) {
  const normalized = value.toLowerCase();
  const key = Object.keys(SWAP_DATA).find((item) => normalized.includes(item));
  return key ? SWAP_DATA[key] : ["Fragrance-free option", "Glass or stainless alternative", "Simpler ingredient product with clear labeling"];
}

function getIngredientItems(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean).slice(0, 4);
}

function Logo() {
  return (
    <a className="brand" href="#home" aria-label="Wellnest home">
      <div className="logo">☘</div>
      <div>
        <div className="brand-title">Wellnest</div>
        <div className="brand-sub">clean living, made calmer</div>
      </div>
    </a>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product">
      <div className="product-top">
        <div className="icon">🛍</div>
        <button className="heart" type="button" aria-label={`Save ${product.title}`}>♡</button>
      </div>
      <div>
        <span className="badge tag">{product.tag}</span> <span className="badge">{product.price}</span>
      </div>
      <h3>{product.title}</h3>
      <small className="muted">{product.retailer} · {product.category}</small>
      <div className="score-row">
        <div className="score">{product.rating}</div>
        <div>
          <b>{product.rating >= 90 ? "Strong pick" : "Better swap"}</b>
          <br />
          <small className="muted">Wellnest Rating</small>
        </div>
      </div>
      <p>{product.why}</p>
      <p><b>Note:</b> {product.concerns}</p>
      <div className="badge-row">
        {product.badges.map((badge) => <span className="badge" key={badge}>{badge}</span>)}
      </div>
      <a className="btn btn-dark shop" href={product.affiliateUrl || "#affiliate-disclosure"}>Shop affiliate link ↗</a>
    </article>
  );
}

export default function App() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [swapQuery, setSwapQuery] = useState("nonstick pan");
  const [ingredientText, setIngredientText] = useState("fragrance, sodium lauryl sulfate, phenoxyethanol");

  const filteredProducts = useMemo(() => getFilteredProducts(PRODUCTS, category, query), [category, query]);
  const swapSuggestions = useMemo(() => getSwapSuggestions(swapQuery), [swapQuery]);
  const ingredientItems = useMemo(() => getIngredientItems(ingredientText), [ingredientText]);

  return (
    <div className="site-shell">
      <header>
        <div className="container nav">
          <Logo />
          <nav className="links">
            <a href="#finder">Find products</a>
            <a href="#swaps">Clean swaps</a>
            <a href="#decoder">Ingredient decoder</a>
            <a href="#registry">Registry</a>
            <a href="#blog">Guides</a>
          </nav>
          <div className="actions">
            <a className="btn btn-light" href="#home">Sign in</a>
            <a className="btn btn-dark" href="#finder">Start free</a>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="container hero">
          <div>
            <div className="pill">✨ Lower-tox shopping without the panic spiral</div>
            <h1>Find cleaner home products you can actually afford.</h1>
            <p className="lead">Wellnest helps you compare safer swaps, decode ingredient labels, build clean registries, and shop curated product picks with calm, practical explanations.</p>
            <div className="hero-actions">
              <a className="btn btn-dark" href="#finder">Explore picks</a>
              <a className="btn btn-light" href="#registry">Build a registry</a>
            </div>
            <div className="stats">
              <div className="stat"><b>200+</b><span>curated picks</span></div>
              <div className="stat"><b>4.8/5</b><span>trust rating</span></div>
              <div className="stat"><b>$</b><span>budget swaps</span></div>
            </div>
          </div>

          <div className="feature-card">
            <div className="dark-card">
              <div>
                <div className="featured-top"><span>Today’s featured swap</span><span>✓</span></div>
                <h2>Ditch the scratched nonstick pan</h2>
                <p>Try stainless steel or cast iron for a longer-lasting, coating-free kitchen upgrade.</p>
              </div>
            </div>
            <div className="mini-grid">
              <div className="mini">🌬<br /><small>Air</small></div>
              <div className="mini">💧<br /><small>Water</small></div>
              <div className="mini">🍳<br /><small>Kitchen</small></div>
            </div>
            <div className="rating-box">
              <b>Wellnest Rating</b>
              <div className="bar"><div /></div>
              <small className="muted">Based on materials, coatings, transparency, and daily-use practicality.</small>
            </div>
          </div>
        </section>

        <section className="container section compressed">
          <div className="four-grid">
            <div className="info-card"><div className="icon">🛍</div><h3>Shop curated picks</h3><p className="muted">Affiliate-ready product cards.</p></div>
            <div className="info-card"><div className="icon">📷</div><h3>Decode labels</h3><p className="muted">Plain-language ingredient notes.</p></div>
            <div className="info-card"><div className="icon">🎁</div><h3>Build registries</h3><p className="muted">Wedding, baby, apartment lists.</p></div>
            <div className="info-card"><div className="icon">🌱</div><h3>Learn calmly</h3><p className="muted">No fear-based wellness content.</p></div>
          </div>
        </section>

        <section id="finder" className="container section">
          <div className="section-head">
            <div>
              <div className="eyebrow">Product Finder</div>
              <h2>Browse clean-living picks</h2>
              <p className="muted">Product cards are designed to connect to your affiliate links.</p>
            </div>
            <label className="search">
              <span>🔎</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search air fryer, towels, PFAS..." />
            </label>
          </div>
          <div className="chips">
            {CATEGORIES.map((item) => (
              <button key={item} type="button" className={`chip ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <div className="products">
            {filteredProducts.map((product) => <ProductCard key={product.title} product={product} />)}
          </div>
        </section>

        <section id="swaps" className="container section">
          <div className="split panel">
            <div>
              <div className="icon">🧼</div>
              <h2>Clean swap finder</h2>
              <p className="muted">Type a product you currently use and get practical alternatives at different effort levels.</p>
              <input className="soft-input" value={swapQuery} onChange={(event) => setSwapQuery(event.target.value)} />
            </div>
            <div>
              {swapSuggestions.map((suggestion, index) => (
                <div className="swap-item" key={suggestion}>
                  <div className="num">{index + 1}</div>
                  <div><b>{suggestion}</b><p className="muted tiny-margin">Suggested lower-tox swap</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="decoder" className="container section">
          <div className="split">
            <div>
              <div className="eyebrow">Ingredient Decoder</div>
              <h2>Paste a label. Get a calm explanation.</h2>
              <p className="muted">This section would later use AI or label uploads. For the site mockup, it shows how results should feel.</p>
              <textarea value={ingredientText} onChange={(event) => setIngredientText(event.target.value)} />
            </div>
            <div>
              {ingredientItems.map((item, index) => (
                <div className="ingredient-item" key={`${item}-${index}`}>
                  <div>{index === 0 ? "⚠️" : "✅"}</div>
                  <div><b>{item}</b><p className="muted tiny-margin">Plain-language note: this ingredient may be used for scent, cleansing, preservation, or texture. Review if you are fragrance-sensitive or have irritation concerns.</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="registry" className="container section">
          <div className="section-head">
            <div>
              <div className="eyebrow">Registry Builder</div>
              <h2>Starter registries</h2>
              <p className="muted">Turn curated clean-living picks into shareable lists.</p>
            </div>
            <a className="btn btn-light" href="#registry">+ New registry</a>
          </div>
          <div className="collections">
            <div className="collection"><div className="icon">🍽</div><h3>Clean Kitchen Starter</h3><p className="muted">Cookware, food storage, towels, and safer basics.</p><small>12 products · Featured</small></div>
            <div className="collection"><div className="icon">🏠</div><h3>First Apartment</h3><p className="muted">Affordable swaps for a healthier home setup.</p><small>18 products · Featured</small></div>
            <div className="collection"><div className="icon">💍</div><h3>Wedding Registry</h3><p className="muted">Pretty, practical picks guests can actually buy.</p><small>24 products · Featured</small></div>
            <div className="collection"><div className="icon">🍼</div><h3>Baby Registry</h3><p className="muted">Gentler product categories for nursery and laundry.</p><small>20 products · Featured</small></div>
          </div>
        </section>

        <section id="blog" className="container section">
          <div className="eyebrow">Guides + SEO</div>
          <h2>Pinterest-friendly clean living guides</h2>
          <div className="blogs">
            <div className="blog"><span className="badge tag">Kitchen</span><h3>Best Lower-Tox Air Fryers for Real-Life Kitchens</h3><p className="muted">What to look for when choosing an air fryer without falling into marketing confusion.</p><small>6 min read →</small></div>
            <div className="blog"><span className="badge tag">Budget</span><h3>Affordable Clean Living Swaps Under $25</h3><p className="muted">Realistic first swaps when you are not replacing your whole house overnight.</p><small>5 min read →</small></div>
            <div className="blog"><span className="badge tag">Cookware</span><h3>PFAS-Free Cookware: Stainless, Cast Iron, Ceramic</h3><p className="muted">A beginner-friendly breakdown of common cookware materials and where each one fits.</p><small>8 min read →</small></div>
          </div>
        </section>

        <section className="container section">
          <div className="admin">
            <div>
              <div className="eyebrow admin-eyebrow">Admin Preview</div>
              <h2>Affiliate product manager</h2>
              <p>This is the backend-style view you would use to update product cards, ratings, categories, and affiliate URLs.</p>
              <a className="btn btn-light" href="#home">⚙ Open admin</a>
            </div>
            <div className="table">
              <div className="row"><span>Product</span><span>Rating</span><span>Link</span><span>Status</span></div>
              {PRODUCTS.slice(0, 4).map((product) => (
                <div className="row" key={product.title}><span>{product.title}</span><span>{product.rating}</span><span>Affiliate</span><span>✓ Live</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="container section" id="affiliate-disclosure">
          <div className="cta">
            <h2>Start with one better swap.</h2>
            <p className="muted">Join the list for budget-friendly clean living picks, practical guides, and new product reviews.</p>
            <div className="email">
              <input placeholder="Enter your email" />
              <button className="btn btn-dark" type="button">Join free</button>
            </div>
            <p className="disclosure">Affiliate disclosure: Wellnest may earn a commission when you purchase through recommended links.</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <Logo />
          <div className="footer-links"><a href="#affiliate-disclosure">Disclosure</a><a href="#home">Privacy</a><a href="#home">Contact</a><a href="#home">Instagram</a></div>
        </div>
      </footer>
    </div>
  );
}
