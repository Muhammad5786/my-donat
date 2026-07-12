'use client';

import { deleteProductAction } from '@/lib/supabase/product-actions';

export default function ProductDeleteButton({ productId }: { productId: string }) {
  return (
    <form action={deleteProductAction}>
      <input type="hidden" name="id" value={productId} />
      <button
        type="submit"
        onClick={(event) => {
          if (!window.confirm('Hapus produk ini?')) {
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
