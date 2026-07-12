'use client';

import { useEffect, useMemo, useState } from 'react';
import { saveCategoryAction, type CategoryFormPayload } from '@/lib/supabase/category-actions';

export default function CategoryForm({
  initialValues,
  onCancel,
}: {
  initialValues?: CategoryFormPayload | null;
  onCancel?: () => void;
}) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [slug, setSlug] = useState(initialValues?.slug ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [sortOrder, setSortOrder] = useState(initialValues?.sort_order ?? '0');
  const [isVisible, setIsVisible] = useState(initialValues?.is_visible === 'on' || initialValues?.is_visible === 'true');

  useEffect(() => {
    setName(initialValues?.name ?? '');
    setSlug(initialValues?.slug ?? '');
    setDescription(initialValues?.description ?? '');
    setSortOrder(initialValues?.sort_order ?? '0');
    setIsVisible(initialValues?.is_visible === 'on' || initialValues?.is_visible === 'true');
  }, [initialValues]);

  const generatedSlug = useMemo(() => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }, [name]);

  return (
    <form action={saveCategoryAction} className="space-y-4 rounded-[24px] border border-[#F1DCE8] bg-[#FFF8FC] p-5">
      {initialValues?.id ? <input type="hidden" name="id" value={initialValues.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#2D1B2E]">Nama</label>
          <input
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (!slug) {
                setSlug(event.target.value);
              }
            }}
            className="w-full rounded-2xl border border-[#F1DCE8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D77FA1]"
            placeholder="Contoh: Classic"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#2D1B2E]">Slug</label>
          <input
            name="slug"
            value={slug || generatedSlug}
            onChange={(event) => setSlug(event.target.value)}
            className="w-full rounded-2xl border border-[#F1DCE8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D77FA1]"
            placeholder="classic"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#2D1B2E]">Deskripsi</label>
        <textarea
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="min-h-24 w-full rounded-2xl border border-[#F1DCE8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D77FA1]"
          placeholder="Deskripsi singkat kategori"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#2D1B2E]">Sort Order</label>
          <input
            name="sort_order"
            type="number"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="w-full rounded-2xl border border-[#F1DCE8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D77FA1]"
          />
        </div>

        <label className="flex items-center gap-3 rounded-2xl border border-[#F1DCE8] bg-white px-4 py-3 text-sm text-[#2D1B2E]">
          <input
            name="is_visible"
            type="checkbox"
            checked={isVisible}
            onChange={(event) => setIsVisible(event.target.checked)}
            className="h-4 w-4 rounded border-[#F1DCE8] text-[#D77FA1] focus:ring-[#D77FA1]"
          />
          <span>Tampilkan di storefront</span>
        </label>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="rounded-full bg-[#D77FA1] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#C8668F]"
        >
          {initialValues?.id ? 'Simpan Perubahan' : 'Tambah Kategori'}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-[#F1DCE8] px-4 py-2.5 text-sm font-semibold text-[#6B4C5E] transition hover:bg-white"
          >
            Batal
          </button>
        ) : null}
      </div>
    </form>
  );
}
