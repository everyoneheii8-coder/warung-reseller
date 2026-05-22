'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { use } from 'react';

function InvoiceContent({ orderId }: { orderId: string }) {
  const params = useSearchParams();
  const amount = parseInt(params.get('amount') || '0');
  const bank = params.get('bank') || '';
  const acc = params.get('acc') || '';
  const accName = params.get('accName') || '';

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
        <div className="text-4xl mb-3">🧾</div>
        <h1 className="text-xl font-bold mb-1">Invoice Pembayaran</h1>
        <p className="text-gray-400 text-sm mb-6">Order ID: <span className="text-white font-mono">{orderId}</span></p>

        <div className="bg-gray-800 rounded-xl p-4 mb-4 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Total Bayar</span>
            <span className="text-purple-400 font-bold text-lg">Rp {amount.toLocaleString('id-ID')}</span>
          </div>
          <hr className="border-gray-700"/>
          <div className="flex justify-between">
            <span className="text-gray-400">Bank</span>
            <span className="font-semibold">{bank}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">No. Rekening</span>
            <span className="font-mono font-semibold">{acc}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Atas Nama</span>
            <span className="font-semibold">{accName}</span>
          </div>
        </div>

        <div className="bg-yellow-900/40 border border-yellow-700/50 rounded-xl p-3 text-sm text-yellow-300 mb-4">
          ⚠️ Transfer tepat sesuai nominal. Setelah transfer, konfirmasi via WhatsApp admin.
        </div>

        <p className="text-xs text-gray-500">Produk dikirim otomatis ke WhatsApp kamu setelah pembayaran dikonfirmasi</p>
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