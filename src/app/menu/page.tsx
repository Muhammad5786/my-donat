import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { MessageCircle } from 'lucide-react';
import { businessWhatsApp, menuCategories } from '@/lib/content';

export const metadata: Metadata = {
  title: "Menu - D'Mimah Donuts",
  description: "Explore our full menu of premium homemade donuts and baked goods. Order fresh via WhatsApp.",
};


export default function MenuPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-pink-50 text-[#D77FA1] text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            Our Full Menu
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-[#2D1B2E] mb-4">
            Semua Produk <span className="gradient-text">D&apos;Mimah</span>
          </h1>
          <p className="text-[#A07898] max-w-md mx-auto mb-6">
            Dibuat fresh dengan bahan pilihan. Semua tersedia via preorder WhatsApp.
          </p>
          <a
            href={businessWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D77FA1] hover:bg-[#c06890] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md shadow-pink-200/50"
          >
            <MessageCircle size={16} />
            Pesan via WhatsApp
          </a>
        </div>

        {/* Categories */}
        {menuCategories.map((cat) => (
          <section key={cat.name} className="mb-16">
            <div className="flex items-center gap-4 mb-7">
              <h2 className="font-heading text-2xl font-semibold text-[#2D1B2E]">{cat.name}</h2>
              <div className="flex-1 h-px bg-pink-100" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {cat.products.map((product, i) => (
                <ProductCard key={product.name} {...product} delay={i * 0.08} />
              ))}
            </div>
          </section>
        ))}

        {/* Note */}
        <div className="bg-gradient-to-br from-pink-50 to-[#D6E5FA]/30 border border-pink-100 rounded-2xl p-7 text-center">
          <p className="text-[#6B4C5E] mb-2 font-medium">Harga bisa berubah sewaktu-waktu. Cek info terbaru via WhatsApp atau Instagram.</p>
          <p className="text-[#A07898] text-sm">Minimum order Rp 60.000 per transaksi.</p>
        </div>
      </div>
    </main>
  );
}
