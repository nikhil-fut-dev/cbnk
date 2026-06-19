import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "Electronics", path: "/electronics" },
    { name: "Fashion", path: "/fashion" },
    { name: "Home", path: "/home-category" },
    { name: "Accessories", path: "/accessories" },
  ];
  const benefits = [
    { value: "24h", label: "Fast dispatch" },
    { value: "4.8", label: "Customer rating" },
    { value: "7d", label: "Easy returns" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.slice(0, 4)); // Featured products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-eyebrow">Curated deals, delivered fast</span>
          <h1>Upgrade your everyday shopping with ShopNest.</h1>
          <p>
            Discover quality products, sharp prices, and a smoother checkout
            experience built for modern shoppers.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="btn">
              Shop collection
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn more
            </Link>
          </div>

          <div className="hero-stats" aria-label="ShopNest highlights">
            {benefits.map((benefit) => (
              <div className="hero-stat" key={benefit.label}>
                <strong>{benefit.value}</strong>
                <span>{benefit.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-showcase" aria-hidden="true">
          <div className="showcase-card showcase-main">
            <img src="/ShopNestLogo.png" alt="" />
            <span>Premium picks</span>
            <strong>New season essentials</strong>
          </div>
          <div className="showcase-card showcase-side">
            <span>Secure checkout</span>
            <strong>Trusted payments</strong>
          </div>
          <div className="showcase-card showcase-side">
            <span>Fresh arrivals</span>
            <strong>Updated weekly</strong>
          </div>
        </div>
      </section>

      <section className="category-strip" aria-label="Popular categories">
        {categories.map((category) => (
          <Link to={category.path} className="category-pill" key={category.name}>
            {category.name}
          </Link>
        ))}
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Handpicked for you</span>
            <h2>Featured Products</h2>
          </div>
          <Link to="/shop" className="view-all-link">
            View all
          </Link>
        </div>

      {loading ? (
          <div className="product-grid">
            {[1, 2, 3, 4].map((item) => (
              <div className="product-card product-skeleton" key={item}>
                <div className="skeleton-image" />
                <div className="skeleton-content">
                  <span />
                  <strong />
                  <em />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
      ) : (
          <div className="empty-products">
            <h3>No featured products yet</h3>
            <p>Check back soon for fresh picks from ShopNest.</p>
            <Link to="/shop" className="btn">
              Browse shop
            </Link>
          </div>
      )}
      </section>
    </div>
  );
};

export default Home;
