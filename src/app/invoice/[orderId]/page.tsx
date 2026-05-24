'use client';

import { useSearchParams } from 'next/navigation';
import {
  Suspense,
  use,
  useState
} from 'react';

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
  const productName =
  params.get('productName') || '';

  const variantName =
  params.get('variantName') || '';

  const [
  processed,
  setProcessed
] = useState(false);

const [
  proof,
  setProof
] = useState<File | null>(null);

const [
  showProcess,
  setShowProcess
] = useState(false);

  return (

    <main
      style={{
        minHeight: '100vh',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmerBtn {
          0%   { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }

        .inv-card {
          animation: fadeIn 0.6s ease forwards;
        }

        .inv-icon {
          animation: floatUp 3s ease-in-out infinite;
        }

        .inv-divider {
          border: none;
          height: 0.5px;
          background: linear-gradient(90deg, transparent, rgba(180,160,255,0.25), transparent);
          margin: 14px 0;
        }

        .inv-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 12px;
        }

        .inv-label {
          font-size: 13px;
          color: rgba(196,176,255,0.55);
          font-weight: 500;
        }

        .inv-value {
          font-size: 14px;
          font-weight: 700;
          color: #e8e6f0;
        }

        .btn-whatsapp {
          display: block;
          width: 100%;
          padding: 15px;
          border-radius: 16px;
          text-decoration: none;
          text-align: center;
          background: linear-gradient(135deg, #16a34a, #22c55e, #16a34a);
          background-size: 200% 100%;
          animation: shimmerBtn 2.5s linear infinite;
          color: #fff;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.4px;
          box-shadow: 0 6px 28px rgba(34,197,94,0.3);
          transition: transform 0.15s, box-shadow 0.15s;
        }

        .btn-whatsapp:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 36px rgba(34,197,94,0.45);
        }

        .btn-whatsapp:active { transform: scale(0.97); }

        .btn-process {
          width: 100%;
          margin-top: 12px;
          padding: 15px;
          border-radius: 16px;
          border: none;
          background: linear-gradient(90deg, #6d3fc4, #4f7de0, #9b59d6, #4f7de0, #6d3fc4);
          background-size: 300% 100%;
          animation: shimmerBtn 2.2s linear infinite;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 6px 28px rgba(109,63,196,0.35);
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
        }

        .btn-process:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 10px 36px rgba(109,63,196,0.5);
        }

        .btn-process:active:not(:disabled) { transform: scale(0.97); }
        .btn-process:disabled { opacity: 0.5; cursor: not-allowed; animation: none; background: rgba(109,63,196,0.3); }
      `}</style>

      {/* Card */}
      <div
        className="inv-card"
        style={{
          width: '100%',
          maxWidth: 440,
          borderRadius: 28,
          background: 'linear-gradient(160deg, rgba(30,24,54,0.95) 0%, rgba(20,18,40,0.98) 100%)',
          border: '0.5px solid rgba(180,160,255,0.2)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          padding: '32px 28px',
          position: 'relative',
          backdropFilter: 'blur(20px)',
        }}
      >

        {/* Corner ornaments */}
        <div style={{ position: 'absolute', top: 16, left: 16, width: 18, height: 18,
          borderTop: '1.5px solid rgba(196,176,255,0.4)', borderLeft: '1.5px solid rgba(196,176,255,0.4)', borderRadius: '4px 0 0 0' }} />
        <div style={{ position: 'absolute', top: 16, right: 16, width: 18, height: 18,
          borderTop: '1.5px solid rgba(196,176,255,0.4)', borderRight: '1.5px solid rgba(196,176,255,0.4)', borderRadius: '0 4px 0 0' }} />

        {/* Icon */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>

          <div
            className="inv-icon"
            style={{
              width: 84, height: 84, margin: '0 auto 16px',
              borderRadius: 26,
              background: 'linear-gradient(135deg, #6d3fc4, #4f7de0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 38,
              boxShadow: '0 8px 32px rgba(109,63,196,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            💳
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 26, fontWeight: 900,
            background: 'linear-gradient(90deg, #d4c4ff, #a8d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}>
            Invoice Pembayaran
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: 'rgba(196,176,255,0.5)', marginTop: 6, fontSize: 13, fontWeight: 500,
          }}>
            Selesaikan pembayaran untuk melanjutkan
          </p>

        </div>

        {/* Order ID */}
        <div
          style={{
            background: 'rgba(109,63,196,0.15)',
            border: '0.5px solid rgba(196,176,255,0.2)',
            borderRadius: 16,
            padding: '12px 16px',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, color: 'rgba(196,176,255,0.5)', textTransform: 'uppercase',
            letterSpacing: '1.5px', fontWeight: 600,
          }}>
            Order ID
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 17, fontWeight: 900,
            color: '#d4c4ff',
            marginTop: 4, letterSpacing: 1,
          }}>
            {orderId}
          </div>
        </div>

        {/* Payment Detail */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 20,
            border: '0.5px solid rgba(180,160,255,0.15)',
            padding: '18px 18px 6px',
            marginBottom: 16,
          }}
        >
          <div className="inv-row" style={{ marginBottom: 14 }}>
            <span className="inv-label">Total Bayar</span>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26, fontWeight: 900,
              background: 'linear-gradient(90deg, #d4c4ff, #a8d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Rp {amount.toLocaleString('id-ID')}
            </span>
          </div>

          <hr className="inv-divider" />

          <div className="inv-row">
            <span className="inv-label">Metode</span>
            <span className="inv-value">{bank}</span>
          </div>

          <div className="inv-row">
            <span className="inv-label">Rekening</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#c4b0ff', fontSize: 15, letterSpacing: 1 }}>
              {acc}
            </span>
          </div>

          <div className="inv-row">
            <span className="inv-label">Atas Nama</span>
            <span className="inv-value">{accName}</span>
          </div>
        </div>

        {/* Upload Bukti */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 10, color: '#d4c4ff', fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
            Upload Bukti Transfer
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setProof(e.target.files[0]);
              }
            }}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: 12,
              border: '0.5px solid rgba(196,176,255,0.25)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(196,176,255,0.7)',
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          {proof && (
            <img
              src={URL.createObjectURL(proof)}
              style={{
                width: '100%',
                borderRadius: 16,
                marginTop: 12,
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              }}
            />
          )}
        </div>

        {/* QRIS */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 20,
            border: '0.5px solid rgba(180,160,255,0.15)',
            padding: '18px',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 17, fontWeight: 800,
            color: '#d4c4ff',
            marginBottom: 14,
          }}>
            Scan QRIS Pembayaran
          </div>

          <img
            src="/qris.jpeg"
            style={{
              width: '100%',
              borderRadius: 16,
              marginBottom: 14,
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            }}
          />

          <div
            style={{
              background: 'rgba(109,63,196,0.15)',
              border: '0.5px solid rgba(196,176,255,0.2)',
              padding: '14px',
              borderRadius: 14,
              color: 'rgba(220,210,255,0.85)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.7,
            }}
          >
            ⚠️ Transfer tepat sesuai nominal:
            <br />
            <span style={{
              fontSize: 22, fontWeight: 900,
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(90deg, #d4c4ff, #a8d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Rp {amount.toLocaleString('id-ID')}
            </span>
            <br />
            agar pembayaran dapat diproses otomatis.
          </div>
        </div>

        {/* Warning */}
        <div
          style={{
            background: 'rgba(234,179,8,0.08)',
            border: '0.5px solid rgba(234,179,8,0.25)',
            borderRadius: 14,
            padding: '12px 16px',
            fontSize: 13,
            color: 'rgba(253,230,138,0.8)',
            marginBottom: 20,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          ⚠️ Transfer tepat sesuai nominal agar pembayaran terdeteksi otomatis.
        </div>

        {/* Button WA */}
        <a
          onClick={() => { setShowProcess(true); }}
          href={`https://wa.me/6287851853393?text=${encodeURIComponent(
            `Halo admin, saya sudah transfer untuk order:\n\nOrder ID: ${orderId}\nProduk: ${productName}\nVarian: ${variantName}\nTotal: Rp ${amount.toLocaleString('id-ID')}\nkirim bukti tf nya disini yaa, terimakasih 🙏`
          )}`}
          target="_blank"
          className="btn-whatsapp"
        >
          ✅ Saya Sudah Bayar
        </a>

        {/* Button Proses Otomatis */}
        {showProcess && !processed && (
          <button
            disabled={processed}
            onClick={async () => {
              const res = await fetch('/api/process-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId }),
              });
              const data = await res.json();
              if (data.success) {
                setProcessed(true);
                alert('Order berhasil diproses otomatis!');
              } else {
                alert(data.message);
              }
            }}
            className="btn-process"
          >
            🚀 Proses Order Otomatis
          </button>
        )}

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          fontSize: 12,
          color: 'rgba(196,176,255,0.4)',
          marginTop: 20,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
        }}>
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