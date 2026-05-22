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
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-purple-400">Toko Premium Kamu</h1>
          <span className="text-sm text-gray-400">Akun Premium Murah dan Terpercaya</span>
        </div>
      </header>

      <div className="bg-gray-900 py-12 px-6 text-center border-b border-gray-800">
        <h2 className="text-3xl font-bold mb-2">Akun Premium Harga Terjangkau</h2>
        <p className="text-gray-300 mb-6">Proses otomatis, pengiriman via WhatsApp</p>
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading && (
          <div className="text-center text-gray-400 py-20">
            <p>Memuat produk...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            <p>Produk tidak ditemukan</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product) =>
              product.variants.map((variant) => {
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
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:border-purple-500 transition-all flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{product.name}</h3>
                        <span className="text-xs text-purple-400">
                          {variant.name} - {variant.duration}
                        </span>
                      </div>
                      <span
                        className={
                          "text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2 " +
                          (soldOut ? "bg-red-900 text-red-400" : "bg-green-900 text-green-400")
                        }
                      >
                        {soldOut ? "Habis" : variant.stock + " stok"}
                      </span>
                    </div>

                    <div className="mb-4 flex-1">
                      <span className="text-xs text-gray-500 line-through block">
                        Rp {variant.original_price.toLocaleString("id-ID")}
                      </span>
                      <div className="text-lg font-bold text-purple-400">
                        Rp {variant.price.toLocaleString("id-ID")}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {variant.type} - Garansi tersedia
                      </div>
                    </div>

                    
                     <a
  href={href}
  className={
    "block w-full text-center py-2 rounded-xl text-sm font-medium transition-all " +
    (soldOut
      ? "bg-gray-800 text-gray-600 pointer-events-none"
      : "bg-purple-600 hover:bg-purple-500 text-white")
  }
>
  {soldOut ? "Stok Habis" : "Beli Sekarang"}
</a>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <footer className="border-t border-gray-800 text-center py-6 text-sm text-gray-600 mt-10">
        2026 Toko Premium Kamu - Transaksi aman dan otomatis
      </footer>
    </main>
  );
}
