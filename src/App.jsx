export default function App() {
  const products = [
    {
      title: "Stainless Steel Air Fryer",
      category: "Kitchen",
      rating: 91,
      description:
        "A better option for people trying to avoid traditional nonstick baskets.",
    },
    {
      title: "Glass Food Storage Containers",
      category: "Food Storage",
      rating: 94,
      description:
        "Great for reducing hot-food contact with plastic and making leftovers easier to store.",
    },
    {
      title: "Fragrance-Free Laundry Detergent",
      category: "Laundry",
      rating: 84,
      description:
        "One of the easiest first swaps for reducing daily fragrance exposure.",
    },
  ];

  return (
    <div className="site">
      <header className="header">
        <div className="container nav">
          <div className="brand">
            <div className="logo">☘</div>

            <div>
              <div className="brand-title">Wellnest</div>

              <div className="brand-sub">
                clean living, made calmer
              </div>
            </div>
          </div>

          <nav className="links">
            <a href="#products">Products</a>
            <a href="#guides">Guides</a>
            <a href="#registry">Registry</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div>
            <div className="pill">
              ✨ Lower-tox shopping without the overwhelm
            </div>

            <h1>
              Find cleaner home products you can actually afford.
            </h1>

            <p className="lead">
              Wellnest helps you compare safer swaps,
              discover cleaner products, and build a healthier
              home realistically.
            </p>

            <div className="hero-buttons">
              <button className="dark-btn">
                Explore Products
              </button>

              <button className="light-btn">
                View Guides
              </button>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-dark">
              <small>Featured Swap</small>

              <h2>Ditch the scratched nonstick pan</h2>

              <p>
                Try stainless steel or cast iron for a
                longer-lasting kitchen upgrade.
              </p>
            </div>
          </div>
        </section>

        <section id="products" className="container section">
          <div className="section-top">
            <div>
              <div className="eyebrow">
                Product Finder
              </div>

              <h2>Browse cleaner living picks</h2>
            </div>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.title}>
                <div className="rating">
                  {product.rating}
                </div>

                <small>{product.category}</small>

                <h3>{product.title}</h3>

                <p>{product.description}</p>

                <button className="dark-btn full">
                  Shop Affiliate Link ↗
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="guides" className="container section">
          <div className="eyebrow">Guides + SEO</div>

          <h2>Pinterest-friendly clean living guides</h2>

          <div className="blog-grid">
            <div className="blog-card">
              <h3>
                Best Lower-Tox Air Fryers for Real-Life Kitchens
              </h3>

              <p>
                What to look for when choosing an air fryer
                without getting overwhelmed.
              </p>
            </div>

            <div className="blog-card">
              <h3>
                Affordable Clean Living Swaps Under $25
              </h3>

              <p>
                Realistic first swaps when you are not
                replacing your whole house overnight.
              </p>
            </div>

            <div className="blog-card">
              <h3>
                PFAS-Free Cookware Explained
              </h3>

              <p>
                Beginner-friendly breakdown of cookware
                materials and what actually matters.
              </p>
            </div>
          </div>
        </section>

        <section id="registry" className="container section">
          <div className="cta">
            <h2>Start with one better swap.</h2>

            <p>
              Build a healthier home realistically — not
              perfectly.
            </p>

            <div className="email-box">
              <input
                type="email"
                placeholder="Enter your email"
              />

              <button className="dark-btn">
                Join Free
              </button>
            </div>

            <small>
              Affiliate disclosure: Wellnest may earn a
              commission when you purchase through
              recommended links.
            </small>
          </div>
        </section>
      </main>
    </div>
  );
}
