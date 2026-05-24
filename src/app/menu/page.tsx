import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Menu - D'Mimah Donuts",
  description: "Explore our full menu of premium homemade donuts and baked goods. Order fresh via WhatsApp.",
};

const categories = [
  {
    name: 'Donat',
    products: [
      { name: 'Domini', description: 'Donat mini premium dengan berbagai topping. Perfect for sharing, aesthetic presentation, and sweet gifts.', price: '12 pcs - Rp 60.000', emoji: '🍩', tag: 'Best Seller', tagColor: 'bg-[#D77FA1]' },
      { name: 'DonPiz', description: 'Mini donut pizza with bolognese, mozzarella, and real chicken. Savory meets sweet.', price: '12 pcs - Rp 70.000', emoji: '🍕', tag: 'Savory', tagColor: 'bg-[#A07898]' },
      { name: 'Big Donut', description: 'Donat ukuran besar dengan topping premium.', price: '6 pcs - Rp 50.000', emoji: '🎉' },
      { name: 'Bomboloni', description: 'Italian-style filled donuts, soft and pillowy with creamy fillings.', price: '8 pcs Rp 40k / 10 pcs Rp 50k', emoji: '🧁', tag: 'Filling', tagColor: 'bg-[#b5a0d8]' },
    ],
  },
  {
    name: 'Brownies & Kue',
    products: [
      { name: 'Fudgy Brownies', description: 'Premium baked brownies with high quality chocolate and butter. Various toppings available. Can ship nationwide!', price: 'Hubungi kami', emoji: '🍫', tag: 'Ship Nationwide', tagColor: 'bg-[#6B4C5E]' },
      { name: 'Brownies Kukus', description: 'Steamed brownies with a moist, rich texture. Classic Indonesian favourite.', price: 'Hubungi kami', emoji: '🟫' },
      { name: 'Rollcake', description: 'Premium butter rollcake with generous, creamy fillings.', price: 'Hubungi kami', emoji: '🎂' },
    ],
  },
  {
    name: 'Bolu',
    products: [
      { name: 'Bolu Tape', description: 'Soft sponge cake made with traditional tape fermented cassava. Uniquely Indonesian.', price: 'Hubungi kami', emoji: '🍰' },
      { name: 'Bolu Pisang', description: 'Moist banana sponge cake with a warm homemade aroma.', price: 'Hubungi kami', emoji: '🍌' },
    ],
  },
];

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
            href="https://wa.me/62000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D77FA1] hover:bg-[#c06890] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md shadow-pink-200/50"
          >
            <MessageCircle size={16} />
            Pesan via WhatsApp
          </a>
        </div>

        {/* Categories */}
        {categories.map((cat) => (
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
