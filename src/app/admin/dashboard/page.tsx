import Link from 'next/link';
import { getAdminDashboardData } from '@/lib/supabase/queries';

export default async function AdminDashboardPage() {
  const { totalCategories, totalActiveProducts, totalFeaturedProducts, recentProducts } =
    await getAdminDashboardData();

  const stats = [
    {
      label: 'Produk aktif',
      value: totalActiveProducts,
      accent: 'from-[#D77FA1] to-[#C8668F]',
    },
    {
      label: 'Kategori',
      value: totalCategories,
      accent: 'from-[#2D1B2E] to-[#4B2C45]',
    },
    {
      label: 'Produk featured',
      value: totalFeaturedProducts,
      accent: 'from-[#F2C6D8] to-[#E8AFC1]',
    },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] bg-[#2D1B2E] px-6 py-8 text-white shadow-[0_20px_60px_rgba(45,27,46,0.18)] sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-200/90">
              Admin Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Ringkasan konten D&apos;Mimah Donuts
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-pink-100/80">
              Pantau produk, kategori, dan item featured yang tampil di landing page.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/products"
              className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#2D1B2E] transition hover:bg-pink-50"
            >
              Tambah Produk Baru
            </Link>
            <Link
              href="/admin/categories"
              className="rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kelola Kategori
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-[24px] border border-[#F1DCE8] bg-white p-6 shadow-[0_16px_45px_rgba(45,27,46,0.06)]">
            <div className={`mb-4 h-2 w-20 rounded-full bg-gradient-to-r ${item.accent}`} />
            <p className="text-sm font-medium text-[#6B4C5E]">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-[#2D1B2E]">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[28px] border border-[#F1DCE8] bg-white p-6 shadow-[0_16px_45px_rgba(45,27,46,0.06)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-[#2D1B2E]">Produk terbaru</h2>
            <p className="mt-1 text-sm text-[#6B4C5E]">5 produk terakhir yang dibuat</p>
          </div>
          <Link href="/admin/products" className="text-sm font-semibold text-[#D77FA1] transition hover:text-[#C8668F]">
            Lihat semua
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-[#F1DCE8]">
          <table className="min-w-full divide-y divide-[#F1DCE8] text-left text-sm">
            <thead className="bg-[#FFF7FB] text-[#6B4C5E]">
              <tr>
                <th className="px-4 py-3 font-semibold">Nama</th>
                <th className="px-4 py-3 font-semibold">Kategori</th>
                <th className="px-4 py-3 font-semibold">Harga</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Featured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1DCE8] bg-white">
              {recentProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-[#6B4C5E]">
                    Belum ada produk yang tersimpan.
                  </td>
                </tr>
              ) : (
                recentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#FFF7FB]">
                    <td className="px-4 py-3 font-medium text-[#2D1B2E]">{product.name}</td>
                    <td className="px-4 py-3 text-[#6B4C5E]">{product.category?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-[#6B4C5E]">{product.price_label ?? 'Hubungi'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          product.is_visible
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {product.is_visible ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          product.is_featured
                            ? 'bg-[#F8DCE9] text-[#A84A72]'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {product.is_featured ? 'Ya' : 'Tidak'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
