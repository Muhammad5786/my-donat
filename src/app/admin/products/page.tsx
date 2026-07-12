import Image from 'next/image';
import Link from 'next/link';
import ProductDeleteButton from '@/components/admin/ProductDeleteButton';
import ProductVisibilityToggle from '@/components/admin/ProductVisibilityToggle';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { CategoriesRow, ProductImagesRow, ProductsRow } from '@/lib/supabase/types';

async function getCategories() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as CategoriesRow[];
}

async function getProducts(categoryId?: string) {
  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from('products')
    .select('*, category:categories(name), product_images(*)')
    .order('created_at', { ascending: false });

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  const products = (data ?? []) as Array<
    ProductsRow & {
      category: { name: string } | null;
      product_images: ProductImagesRow[];
    }
  >;

  return Promise.all(
    products.map(async (product) => {
      const primaryImage = product.product_images?.find((image) => image.is_primary) ?? product.product_images?.[0];
      let imageUrl: string | null = null;

      if (primaryImage?.storage_path) {
        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(primaryImage.storage_path);

        imageUrl = publicUrlData.publicUrl ?? null;
      }

      return {
        ...product,
        image_url: imageUrl,
      };
    }),
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; error?: string }>;
}) {
  const params = await searchParams;
  const categories = await getCategories();
  const categoryId = params?.category ?? '';
  const products = await getProducts(categoryId || undefined);
  const errorMessage = params?.error ? decodeURIComponent(params.error) : null;

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#2D1B2E] px-6 py-8 text-white shadow-[0_20px_60px_rgba(45,27,46,0.18)] sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-200/90">Produk</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Kelola daftar produk</h1>
            <p className="mt-3 text-sm text-pink-100/80">
              Filter produk, lihat thumbnail, dan atur visibilitas dari satu layar.
            </p>
          </div>
          <Link
            href="/admin/products/new"
            className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#2D1B2E] transition hover:bg-pink-50"
          >
            Tambah Produk
          </Link>
        </div>
      </section>

      {errorMessage ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <section className="rounded-[28px] border border-[#F1DCE8] bg-white p-6 shadow-[0_16px_45px_rgba(45,27,46,0.06)]">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#2D1B2E]">Daftar produk</h2>
            <p className="mt-1 text-sm text-[#6B4C5E]">Filter berdasarkan kategori</p>
          </div>

          <form method="get" action="/admin/products" className="flex w-full flex-wrap gap-2 md:w-auto">
            <label className="sr-only" htmlFor="category-filter">
              Filter kategori
            </label>
            <select
              id="category-filter"
              name="category"
              defaultValue={categoryId}
              className="w-full rounded-full border border-[#F1DCE8] bg-[#FFF8FC] px-4 py-2.5 text-sm text-[#2D1B2E] outline-none transition focus:border-[#D77FA1] md:w-56"
            >
              <option value="">Semua kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-full bg-[#D77FA1] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#C8668F]"
            >
              Filter
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[900px] divide-y divide-[#F1DCE8] text-left text-sm">
            <thead className="bg-[#FFF7FB] text-[#6B4C5E]">
              <tr>
                <th className="px-4 py-3 font-semibold">Foto</th>
                <th className="px-4 py-3 font-semibold">Nama</th>
                <th className="px-4 py-3 font-semibold">Kategori</th>
                <th className="px-4 py-3 font-semibold">Harga</th>
                <th className="px-4 py-3 font-semibold">Tag</th>
                <th className="px-4 py-3 font-semibold">Featured</th>
                <th className="px-4 py-3 font-semibold">Visible</th>
                <th className="px-4 py-3 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1DCE8] bg-white">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-[#6B4C5E]">
                    Tidak ada produk yang sesuai filter.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const imageUrl = product.image_url;

                  return (
                    <tr key={product.id} className="hover:bg-[#FFF7FB]">
                      <td className="px-4 py-3">
                        {imageUrl ? (
                          <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-[#F1DCE8] bg-[#FFF8FC]">
                            <Image
                              src={imageUrl}
                              alt={product.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-[#F1DCE8] bg-[#FFF8FC] text-xs text-[#6B4C5E]">
                            No Img
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-[#2D1B2E]">{product.name}</div>
                        <div className="mt-1 text-xs text-[#6B4C5E]">{product.slug}</div>
                      </td>
                      <td className="px-4 py-3 text-[#6B4C5E]">{product.category?.name ?? '—'}</td>
                      <td className="px-4 py-3 text-[#6B4C5E]">{product.price_label ?? 'Hubungi'}</td>
                      <td className="px-4 py-3 text-[#6B4C5E]">—</td>
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
                      <td className="px-4 py-3">
                        <ProductVisibilityToggle productId={product.id} isVisible={product.is_visible} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="rounded-full border border-[#F1DCE8] px-3 py-2 text-xs font-semibold text-[#2D1B2E] transition hover:bg-[#FFF7FB]"
                          >
                            Edit
                          </Link>
                          <ProductDeleteButton productId={product.id} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
