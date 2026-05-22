'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, use } from 'react';

function InvoiceContent({
  orderId
}: {
  orderId: string
}) {

  const params = useSearchParams();

  const amount =
    parseInt(params.get('amount') || '0');

  const bank =
    params.get('bank') || '';

  const acc =
    params.get('acc') || '';

  const accName =
    params.get('accName') || '';

  return (

    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fffbe6 0%, #fff8d6 30%, #fef3c7 60%, #fde68a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Playfair Display', 'Georgia', serif",
      }}
    >

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .gold-card {
          animation: fadeIn 0.6s ease forwards;
        }

        .gold-icon {
          animation: floatUp 3s ease-in-out infinite;
        }

        .shimmer-btn {
          background: linear-gradient(90deg, #b45309, #d97706, #f59e0b, #fbbf24, #f59e0b, #d97706, #b45309);
          background-size: 400px 100%;
          animation: shimmer 2.5s linear infinite;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .shimmer-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 12px 40px rgba(180, 83, 9, 0.4) !important;
        }

        .shimmer-btn:active {
          transform: scale(0.98);
        }

        .row-item {
          font-family: 'DM Sans', sans-serif;
        }

        .divider-gold {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, #fbbf24, transparent);
        }
      `}</style>

      {/* Decorative Blobs */}
      <div style={{
        position: 'absolute', top: -100, left: -100,
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -100, right: -100,
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: -60,
        width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(253,230,138,0.5) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      {/* Card */}
      <div
        className="gold-card"
        style={{
          width: '100%',
          maxWidth: 440,
          borderRadius: 32,
          background: 'linear-gradient(160deg, #ffffff 0%, #fffbeb 60%, #fef9ee 100%)',
          border: '1.5px solid rgba(251,191,36,0.5)',
          boxShadow: '0 24px 64px rgba(180,83,9,0.15), 0 4px 16px rgba(251,191,36,0.2), inset 0 1px 0 rgba(255,255,255,0.9)',
          padding: '32px 28px',
        }}
      >

        {/* Corner ornaments */}
        <div style={{ position: 'absolute', top: 16, left: 16, width: 20, height: 20,
          borderTop: '2px solid #f59e0b', borderLeft: '2px solid #f59e0b', borderRadius: '4px 0 0 0' }} />
        <div style={{ position: 'absolute', top: 16, right: 16, width: 20, height: 20,
          borderTop: '2px solid #f59e0b', borderRight: '2px solid #f59e0b', borderRadius: '0 4px 0 0' }} />

        {/* Icon */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>

          <div
            className="gold-icon"
            style={{
              width: 88, height: 88, margin: '0 auto 16px',
              borderRadius: 28,
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 40%, #fde68a 70%, #f59e0b 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40,
              boxShadow: '0 8px 32px rgba(245,158,11,0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
              border: '2px solid rgba(255,255,255,0.6)',
            }}
          >
            💳
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28, fontWeight: 900,
            color: '#78350f',
            margin: 0, letterSpacing: '-0.5px',
          }}>
            Invoice Pembayaran
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: '#a16207', marginTop: 6, fontSize: 14, fontWeight: 500,
          }}>
            Selesaikan pembayaran untuk melanjutkan
          </p>

        </div>

        {/* Order ID */}
        <div
          style={{
            background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
            border: '1px solid rgba(251,191,36,0.4)',
            borderRadius: 20,
            padding: '12px 16px',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, color: '#92400e', textTransform: 'uppercase',
            letterSpacing: '1.5px', fontWeight: 600,
          }}>
            Order ID
          </div>

          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 18, fontWeight: 900,
              color: '#92400e',
              marginTop: 4,
              letterSpacing: 1,
            }}
          >
            {orderId}
          </div>

        </div>

        {/* Payment Detail */}
        <div
          style={{
            background: 'linear-gradient(160deg, #ffffff, #fffbeb)',
            borderRadius: 24,
            border: '1px solid rgba(251,191,36,0.35)',
            boxShadow: '0 4px 20px rgba(245,158,11,0.08)',
            padding: '20px 20px',
            marginBottom: 16,
          }}
        >

          <div className="row-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>

            <span style={{ color: '#a16207', fontSize: 14, fontWeight: 500 }}>
              Total Bayar
            </span>

            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 28, fontWeight: 900,
                background: 'linear-gradient(90deg, #b45309, #d97706, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Rp {amount.toLocaleString('id-ID')}
            </span>

          </div>

          <hr className="divider-gold" style={{ marginBottom: 16 }} />

          <div className="row-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: '#a16207', fontSize: 14, fontWeight: 500 }}>Metode</span>
            <span style={{ fontWeight: 700, color: '#78350f', fontSize: 14 }}>{bank}</span>
          </div>

          <div className="row-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: '#a16207', fontSize: 14, fontWeight: 500 }}>Rekening</span>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900, color: '#92400e', fontSize: 15, letterSpacing: 1,
            }}>
              {acc}
            </span>
          </div>

          <div className="row-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#a16207', fontSize: 14, fontWeight: 500 }}>Atas Nama</span>
            <span style={{ fontWeight: 600, color: '#78350f', fontSize: 14 }}>{accName}</span>
          </div>

        </div>

        {/* Warning */}
        <div
          style={{
            background: 'linear-gradient(135deg, #fffbeb, #fef9c3)',
            border: '1px solid rgba(234,179,8,0.4)',
            borderRadius: 18,
            padding: '14px 16px',
            fontSize: 13,
            color: '#854d0e',
            marginBottom: 20,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          ⚠️ Transfer tepat sesuai nominal agar pembayaran terdeteksi otomatis.
        </div>

        {/* Button */}
        <button
          className="shimmer-btn"
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 20,
            border: 'none',
            color: '#451a03',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 17,
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(180,83,9,0.3)',
            letterSpacing: 0.5,
          }}
        >
          ✦ Saya Sudah Bayar ✦
        </button>

        {/* Footer */}
        <p
          style={{
            textAlign: 'center',
            fontSize: 13,
            color: '#a16207',
            marginTop: 18,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
          }}
        >
          Produk akan dikirim otomatis ke WhatsApp setelah pembayaran berhasil ✅
        </p>

      </div>

    </main>
  );
}

export default function InvoicePage({
  params
}: {
  params: Promise<{ orderId: string }>
}) {

  const { orderId } = use(params);

  return (
    <Suspense>
      <InvoiceContent orderId={orderId} />
    </Suspense>
  );
}
