import CategoryForm from '@/components/admin/CategoryForm';
import CategoryDeleteButton from '@/components/admin/CategoryDeleteButton';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { CategoriesRow } from '@/lib/supabase/types';

async function getCategories() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, description, sort_order, is_visible, created_at, updated_at')
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as CategoriesRow[];
}

async function getCategoryProductCount(categoryId: string) {
  const supabase = await createServerSupabaseClient();

  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', categoryId);

  if (error) {
    throw error;
  }

  return count ?? 0;
}

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams?: Promise<{ edit?: string; error?: string }>;
}) {
  const params = await searchParams;
  const categories = await getCategories();
  const categoryProductCounts = await Promise.all(
    categories.map(async (category) => ({
      id: category.id,
      count: await getCategoryProductCount(category.id),
    })),
  );

  const editingCategory = params?.edit
    ? categories.find((category) => category.id === params.edit) ?? null
    : null;

  const errorMessage = params?.error ? decodeURIComponent(params.error) : null;

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#2D1B2E] px-6 py-8 text-white shadow-[0_20px_60px_rgba(45,27,46,0.18)] sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-200/90">Kategori</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Kelola kategori produk</h1>
            <p className="mt-3 text-sm text-pink-100/80">
              Atur kategori untuk menampilkan produk di storefront.
            </p>
          </div>
          <a
            href="#category-form"
            className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#2D1B2E] transition hover:bg-pink-50"
          >
            Tambah Kategori
          </a>
        </div>
      </section>

      {errorMessage ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <section id="category-form" className="rounded-[28px] border border-[#F1DCE8] bg-white p-6 shadow-[0_16px_45px_rgba(45,27,46,0.06)]">
        <CategoryForm initialValues={editingCategory ? {
          id: editingCategory.id,
          name: editingCategory.name,
          slug: editingCategory.slug,
          description: editingCategory.description ?? '',
          sort_order: String(editingCategory.sort_order),
          is_visible: editingCategory.is_visible ? 'on' : 'off',
        } : null} />
      </section>

      <section className="rounded-[28px] border border-[#F1DCE8] bg-white p-6 shadow-[0_16px_45px_rgba(45,27,46,0.06)]">
        <div className="overflow-hidden rounded-2xl border border-[#F1DCE8]">
          <table className="min-w-full divide-y divide-[#F1DCE8] text-left text-sm">
            <thead className="bg-[#FFF7FB] text-[#6B4C5E]">
              <tr>
                <th className="px-4 py-3 font-semibold">Nama</th>
                <th className="px-4 py-3 font-semibold">Slug</th>
                <th className="px-4 py-3 font-semibold">Jumlah Produk</th>
                <th className="px-4 py-3 font-semibold">Urutan</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1DCE8] bg-white">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-[#6B4C5E]">
                    Belum ada kategori.
                  </td>
                </tr>
              ) : (
                categories.map((category) => {
                  const productCount = categoryProductCounts.find((item) => item.id === category.id)?.count ?? 0;

                  return (
                    <tr key={category.id} className="hover:bg-[#FFF7FB]">
                      <td className="px-4 py-3">
                        <div className="font-medium text-[#2D1B2E]">{category.name}</div>
                        <div className="mt-1 text-xs text-[#6B4C5E]">{category.description ?? '—'}</div>
                      </td>
                      <td className="px-4 py-3 text-[#6B4C5E]">{category.slug}</td>
                      <td className="px-4 py-3 text-[#6B4C5E]">{productCount}</td>
                      <td className="px-4 py-3 text-[#6B4C5E]">{category.sort_order}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            category.is_visible
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {category.is_visible ? 'Visible' : 'Hidden'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={`/admin/categories?edit=${category.id}`}
                            className="rounded-full border border-[#F1DCE8] px-3 py-2 text-xs font-semibold text-[#2D1B2E] transition hover:bg-[#FFF7FB]"
                          >
                            Edit
                          </a>
                          <CategoryDeleteButton categoryId={category.id} />
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
