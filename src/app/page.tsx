"use client";
import { useEffect, useState } from "react";

interface Variant {
  id: string;
  name: string;
  price: number;
  original_price: number;
  duration: string;
  type: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  variants: Variant[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.data || []);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseGold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.25); }
          50% { box-shadow: 0 0 0 6px rgba(245,158,11,0); }
        }

        @keyframes shimmerBtn {
          0% { background-position: -300px 0; }
          100% { background-position: 300px 0; }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .product-card {
          animation: cardIn 0.45s ease both;
          background: #ffffff;
          border: 1.5px solid rgba(251,191,36,0.2);
          border-radius: 20px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          box-shadow: 0 2px 12px rgba(180,83,9,0.06);
          font-family: 'DM Sans', sans-serif;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(180,83,9,0.13);
          border-color: rgba(251,191,36,0.6);
        }

        .badge-sold {
          background: #fff1f2;
          color: #e11d48;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
          letter-spacing: 0.3px;
          border: 1px solid rgba(225,29,72,0.15);
          flex-shrink: 0;
        }

        .badge-stock {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          color: #15803d;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
          letter-spacing: 0.3px;
          border: 1px solid rgba(21,128,61,0.2);
          flex-shrink: 0;
        }

        .price-gold {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 900;
          background: linear-gradient(90deg, #92400e, #d97706, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-buy {
          display: block;
          width: 100%;
          text-align: center;
          padding: 10px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          background: linear-gradient(90deg, #b45309, #d97706, #fbbf24, #f59e0b, #d97706, #b45309);
          background-size: 300px 100%;
          animation: shimmerBtn 3s linear infinite;
          color: #451a03;
          letter-spacing: 0.3px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 4px 16px rgba(180,83,9,0.25);
          animation: shimmerBtn 3s linear infinite, pulseGold 2.5s ease infinite;
        }

        .btn-buy:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 24px rgba(180,83,9,0.35);
        }

        .btn-buy:active {
          transform: scale(0.97);
        }

        .btn-sold {
          display: block;
          width: 100%;
          text-align: center;
          padding: 10px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          background: #f5f5f5;
          color: #9ca3af;
          cursor: default;
          pointer-events: none;
        }

        .hero-section {
          padding: 48px 24px 40px;
          text-align: center;
          border-bottom: 1px solid rgba(251,191,36,0.2);
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 500px; height: 200px;
          background: radial-gradient(ellipse, rgba(251,191,36,0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 900;
          color: #1c1917;
          margin-bottom: 8px;
          position: relative;
        }

        .hero-title span {
          background: linear-gradient(90deg, #92400e, #d97706, #f59e0b, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-family: 'DM Sans', sans-serif;
          color: #78716c;
          font-size: 15px;
          margin-bottom: 24px;
        }

        .search-input {
          width: 100%;
          max-width: 440px;
          padding: 13px 20px;
          border-radius: 16px;
          background: #ffffff;
          border: 1.5px solid rgba(251,191,36,0.35);
          color: #1c1917;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          box-shadow: 0 2px 12px rgba(180,83,9,0.08);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .search-input:focus {
          border-color: rgba(245,158,11,0.7);
          box-shadow: 0 0 0 3px rgba(251,191,36,0.12);
        }

        .search-input::placeholder {
          color: #a8a29e;
        }

        .divider-gold {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent);
          margin: 10px 0 14px;
        }

        .product-name {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #1c1917;
        }

        .variant-label {
          font-size: 12px;
          color: #a16207;
          font-weight: 500;
          margin-top: 2px;
        }

        .original-price {
          font-size: 12px;
          color: #a8a29e;
          text-decoration: line-through;
          font-family: 'DM Sans', sans-serif;
        }

        .type-label {
          font-size: 11px;
          color: #78716c;
          margin-top: 4px;
          font-family: 'DM Sans', sans-serif;
        }

        .loading-text {
          font-family: 'DM Sans', sans-serif;
          color: #a16207;
          text-align: center;
          padding: 80px 0;
          font-size: 15px;
        }

        .empty-text {
          font-family: 'DM Sans', sans-serif;
          color: #a8a29e;
          text-align: center;
          padding: 80px 0;
          font-size: 15px;
        }

        .gold-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          margin-right: 4px;
          vertical-align: middle;
        }

        .footer-text {
          font-family: 'DM Sans', sans-serif;
          color: #a8a29e;
          font-size: 13px;
          text-align: center;
          padding: 24px 0;
          border-top: 1px solid rgba(251,191,36,0.15);
          margin-top: 40px;
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: 'transparent', color: '#1c1917' }}>

        {/* Hero / Search Section */}
        <div className="hero-section">
          <h2 className="hero-title">
            Akun Premium <span>Harga Terjangkau</span>
          </h2>
          <p className="hero-sub">
            ✦ Proses otomatis · Pengiriman via WhatsApp ✦
          </p>
          <input
            type="text"
            placeholder="🔍  Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Product Grid */}
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '36px 24px' }}>

          {loading && (
            <div className="loading-text">
              <div style={{
                width: 36, height: 36, margin: '0 auto 12px',
                borderRadius: '50%',
                border: '3px solid rgba(251,191,36,0.2)',
                borderTop: '3px solid #f59e0b',
                animation: 'spinSlow 0.8s linear infinite',
              }} />
              Memuat produk...
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="empty-text">Produk tidak ditemukan</div>
          )}

          {!loading && filtered.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: 16,
            }}>
              {filtered.map((product, pi) =>
                product.variants.map((variant, vi) => {
                  const soldOut = variant.stock <= 0;
                  const href = soldOut
                    ? "#"
                    : "/checkout?variantId=" + variant.id +
                      "&productName=" + encodeURIComponent(product.name) +
                      "&variantName=" + encodeURIComponent(variant.name) +
                      "&price=" + variant.price;

                  return (
                    <div
                      key={variant.id}
                      className="product-card"
                      style={{ animationDelay: `${(pi * 4 + vi) * 0.04}s` }}
                    >
                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="product-name">{product.name}</div>
                          <div className="variant-label">
                            {variant.name} · {variant.duration}
                          </div>
                        </div>
                        <span className={soldOut ? 'badge-sold' : 'badge-stock'} style={{ marginLeft: 8 }}>
                          {soldOut ? 'Habis' : variant.stock + ' stok'}
                        </span>
                      </div>

                      <hr className="divider-gold" />

                      {/* Price */}
                      <div style={{ marginBottom: 14, flex: 1 }}>
                        <div className="original-price">
                          Rp {variant.original_price.toLocaleString('id-ID')}
                        </div>
                        <div className="price-gold">
                          Rp {variant.price.toLocaleString('id-ID')}
                        </div>
                        <div className="type-label">
                          <span className="gold-dot" />
                          {variant.type} · Garansi tersedia
                        </div>
                      </div>

                      {/* Button */}
                      <a
                        href={href}
                        className={soldOut ? 'btn-sold' : 'btn-buy'}
                      >
                        {soldOut ? 'Stok Habis' : '✦ Beli Sekarang'}
                      </a>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="footer-text">
          ✦ 2026 Toko Premium Kamu — Transaksi aman dan otomatis ✦
        </div>

      </main>
    </>
  );
}
