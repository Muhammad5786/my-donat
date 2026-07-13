import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { MessageCircle } from 'lucide-react';
import { businessWhatsApp } from '@/lib/content';
import { getCategories } from '@/lib/supabase/queries';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Lihat menu lengkap donat mini premium D\'Mimah Donuts. Semua produk tersedia via preorder WhatsApp dan dibuat fresh.',
  alternates: {
    canonical: '/menu',
  },
  openGraph: {
    title: "Menu D'Mimah Donuts",
    description:
      'Lihat menu lengkap donat mini premium D\'Mimah Donuts. Semua produk tersedia via preorder WhatsApp dan dibuat fresh.',
    url: '/menu',
    type: 'website',
  },
};

export default async function MenuPage() {
  const supabase = await createServerSupabaseClient();
  const categories = (await getCategories())
    .filter((cat) => cat.products?.length > 0)
    .map((cat) => ({
      name: cat.name,
      products: cat.products.map((product) => {
        const firstImage = product.product_images?.[0];
        const firstTag = product.product_tags?.[0];
        const image = firstImage?.storage_path
          ? supabase.storage.from('product-images').getPublicUrl(firstImage.storage_path).data.publicUrl ?? undefined
          : undefined;

        return {
          id: product.id,
          name: product.name,
          description: product.description ?? '',
          price: product.price_label ?? '',
          emoji: '🍩',
          image,
          tag: firstTag?.label ?? undefined,
          tagColor: firstTag?.color_class ?? undefined,
        };
      }),
    }));

  const menuSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: "Menu D'Mimah Donuts",
    url: 'https://www.dmimahdonuts.com/menu',
    description:
      'Menu lengkap donat mini premium D\'Mimah Donuts yang siap dipesan via preorder WhatsApp.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categories.flatMap((category, categoryIndex) =>
        category.products.map((product, productIndex) => ({
          '@type': 'ListItem',
          position: categoryIndex * 100 + productIndex + 1,
          name: product.name,
          description: product.description ?? '',
        })),
      ),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }} />
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
    </>
  );
}
