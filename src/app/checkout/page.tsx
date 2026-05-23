'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

function CheckoutForm() {
  const params = useSearchParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', whatsapp: '', email: '' });
  const [loading, setLoading] = useState(false);

  const variantId = params.get('variantId') || '';
  const productName = params.get('productName') || '';
  const variantName = params.get('variantName') || '';
  const price = parseInt(params.get('price') || '0');

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
        variantId,
        productName,
        variantName,
        sellingPrice: price
      })
    });
    const data = await res.json();

console.log(data);

if (data.redirectUrl) {

  window.location.href =
    data.redirectUrl;

} else {

  alert(
    data.message ||
    'Gagal membuat order'
  );

  setLoading(false);
}
};
  return (
    <main className="min-h-screen bg-transparent text-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-purple-100">
        <h1 className="text-xl font-bold mb-1">Checkout</h1>
        <div className="bg-purple-50 rounded-xl p-3 mb-6">
          <div className="text-sm text-gray-400">{productName}</div>
          <div className="font-semibold">{variantName}</div>
          <div className="text-purple-400 font-bold text-lg">Rp {price.toLocaleString('id-ID')}</div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Nama Lengkap *</label>
            <input className="w-full bg-purple-50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
              value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Nama kamu"/>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Nomor WhatsApp *</label>
            <input className="w-full bg-purple-50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
              value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} placeholder="08xxxxxxxxxx"/>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email (wajib)</label>
            <input className="w-full bg-purple-50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@kamu.com"/>
          </div>
          <button onClick={handleOrder} disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 py-3 rounded-xl font-semibold transition-all">
            {loading ? 'Memproses...' : 'Buat Pesanan →'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return <Suspense><CheckoutForm /></Suspense>;
}