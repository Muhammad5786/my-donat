'use client';

import { toggleProductVisibilityAction } from '@/lib/supabase/product-actions';

export default function ProductVisibilityToggle({
  productId,
  isVisible,
}: {
  productId: string;
  isVisible: boolean;
}) {
  return (
    <form action={toggleProductVisibilityAction}>
      <input type="hidden" name="id" value={productId} />
      <input type="hidden" name="visible" value={String(isVisible)} />
      <button
        type="submit"
        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
          isVisible ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
        }`}
      >
        {isVisible ? 'Visible' : 'Hidden'}
      </button>
    </form>
  );
}
