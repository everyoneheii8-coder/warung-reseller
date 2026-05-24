'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

function CheckoutForm() {
  const params = useSearchParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', whatsapp: '', email: '' });
  const [loading, setLoading] = useState(false);

  const variantId   = params.get('variantId') || '';
  const productName = params.get('productName') || '';
  const variantName = params.get('variantName') || '';
  const price       = parseInt(params.get('price') || '0');

  const handleOrder = async () => {
    if (!form.name || !form.whatsapp) return alert('Nama dan WhatsApp wajib diisi!');
    setLoading(true);
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        buyerName: form.name,
        buyerWhatsapp: form.whatsapp,
        buyerEmail: form.email,
        variantId, productName, variantName,
        sellingPrice: price
      })
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      router.push(
        `/invoice/${data.orderId}?amount=${price}&productName=${encodeURIComponent(productName)}&variantName=${encodeURIComponent(variantName)}`
      );
    } else {
      alert(data.message || 'Gagal membuat order');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(168,85,247,0.4); }
          50%       { box-shadow: 0 0 24px 6px rgba(168,85,247,0.15); }
        }

        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .co-wrap {
          min-height: 100vh;
          background: #0a0a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .co-wrap::before {
          content: '';
          position: fixed;
          top: -120px; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .co-card {
          width: 100%;
          max-width: 440px;
          background: #13131a;
          border: 1px solid rgba(139,92,246,0.25);
          border-radius: 24px;
          padding: 32px 28px;
          position: relative;
          z-index: 1;
          animation: fadeUp 0.5s ease both;
          box-shadow: 0 0 60px rgba(139,92,246,0.08), 0 2px 32px rgba(0,0,0,0.5);
        }

        .co-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #6b7280;
          text-decoration: none;
          margin-bottom: 20px;
          transition: color 0.2s;
        }

        .co-back:hover { color: #a78bfa; }

        .co-title {
          font-size: 22px;
          font-weight: 700;
          color: #f3f4f6;
          margin: 0 0 4px;
        }

        .co-subtitle {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 20px;
        }

        .co-product-box {
          background: linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.08));
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 16px;
          padding: 14px 16px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .co-product-name {
          font-size: 15px;
          font-weight: 700;
          color: #e5e7eb;
        }

        .co-product-variant {
          font-size: 12px;
          color: #a78bfa;
          margin-top: 2px;
        }

        .co-product-price {
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(90deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          white-space: nowrap;
          margin-left: 12px;
        }

        .co-label {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 6px;
          display: block;
          font-weight: 500;
        }

        .co-input {
          width: 100%;
          background: #1a1a24;
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 14px;
          padding: 12px 16px;
          font-size: 14px;
          color: #f3f4f6;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .co-input::placeholder { color: #374151; }

        .co-input:focus {
          border-color: rgba(167,139,250,0.6);
          box-shadow: 0 0 0 3px rgba(139,92,246,0.12);
        }

        .co-field { margin-bottom: 16px; }

        .co-btn {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          font-size: 15px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
          background: linear-gradient(90deg, #7c3aed, #6d28d9, #4f46e5, #7c3aed);
          background-size: 300% 100%;
          color: #ffffff;
          animation: shimmer 3s linear infinite;
          box-shadow: 0 4px 24px rgba(124,58,237,0.4);
          animation: glowPulse 2.5s ease infinite, shimmer 3s linear infinite;
        }

        .co-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(124,58,237,0.5);
        }

        .co-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .co-btn:disabled {
          background: #1f2937;
          color: #4b5563;
          cursor: not-allowed;
          box-shadow: none;
          animation: none;
        }

        .co-spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }

        .co-secure {
          text-align: center;
          font-size: 12px;
          color: #374151;
          margin-top: 16px;
        }
      `}</style>

      <div className="co-wrap">
        <div className="co-card">
          <a href="/" className="co-back">← Kembali</a>

          <h1 className="co-title">Checkout</h1>
          <p className="co-subtitle">Isi data dengan benar — produk dikirim ke WhatsApp kamu</p>

          <div className="co-product-box">
            <div>
              <div className="co-product-name">{productName}</div>
              <div className="co-product-variant">{variantName}</div>
            </div>
            <div className="co-product-price">Rp {price.toLocaleString('id-ID')}</div>
          </div>

          <div className="co-field">
            <label className="co-label">Nama Lengkap *</label>
            <input
              className="co-input"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Nama kamu"
            />
          </div>

          <div className="co-field">
            <label className="co-label">Nomor WhatsApp *</label>
            <input
              className="co-input"
              value={form.whatsapp}
              onChange={e => setForm({ ...form, whatsapp: e.target.value })}
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <div className="co-field">
            <label className="co-label">Email (wajib)</label>
            <input
              className="co-input"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="email@kamu.com"
            />
          </div>

          <button onClick={handleOrder} disabled={loading} className="co-btn">
            {loading ? (
              <><span className="co-spinner" />Memproses...</>
            ) : (
              '✦ Buat Pesanan →'
            )}
          </button>

          <div className="co-secure">🔒 Transaksi aman · Produk otomatis terkirim</div>
        </div>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return <Suspense><CheckoutForm /></Suspense>;
}