'use client';

import { deleteCategoryAction } from '@/lib/supabase/category-actions';

export default function CategoryDeleteButton({ categoryId }: { categoryId: string }) {
  return (
    <form action={deleteCategoryAction}>
      <input type="hidden" name="id" value={categoryId} />
      <button
        type="submit"
        onClick={(event) => {
          if (!window.confirm('Hapus kategori ini? Produk yang terkait mungkin tidak bisa dipindahkan.')) {
            event.preventDefault();
          }
        }}
        className="rounded-full border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
      >
        Hapus
      </button>
    </form>
  );
}
