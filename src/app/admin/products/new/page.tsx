'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import { createProductAction } from '@/lib/supabase/product-actions';

const tagColors = ['#D77FA1', '#A07898', '#b5a0d8', '#6B4C5E'];

type CategoryOption = {
  id: string;
  name: string;
};

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [priceLabel, setPriceLabel] = useState('');
  const [tagLabel, setTagLabel] = useState('');
  const [tagColor, setTagColor] = useState(tagColors[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState('0');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      const supabase = createClient();
      const { data, error } = await supabase.from('categories').select('id, name').order('sort_order', { ascending: true });

      if (!error && data) {
        setCategories(data as CategoryOption[]);
      }
    }

    void loadCategories();
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const previewStyle = useMemo(() => ({
    backgroundColor: tagColor,
  }), [tagColor]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Nama produk wajib diisi.');
      return;
    }

    if (!categoryId) {
      setErrorMessage('Kategori wajib dipilih.');
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      let storagePath: string | undefined;

      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop() ?? 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const { data, error } = await supabase.storage.from('product-images').upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });

        if (error) {
          throw new Error(error.message || 'Gagal mengunggah foto.');
        }

        storagePath = data?.path;
      }

      const formData = new FormData();
      formData.set('name', name.trim());
      formData.set('category_id', categoryId);
      formData.set('description', description.trim());
      formData.set('price_label', priceLabel.trim());
      formData.set('tag_label', tagLabel.trim());
      formData.set('tag_color', tagColor);
      formData.set('is_visible', String(isVisible));
      formData.set('is_featured', String(isFeatured));
      formData.set('sort_order', sortOrder);

      if (storagePath) {
        formData.set('storage_path', storagePath);
      }

      await createProductAction(formData);
      router.push('/admin/products');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal menyimpan produk.');
      setIsSubmitting(false);
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#2D1B2E] px-6 py-8 text-white shadow-[0_20px_60px_rgba(45,27,46,0.18)] sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-200/90">Produk</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Tambah produk baru</h1>
            <p className="mt-3 text-sm text-pink-100/80">
              Lengkapi detail produk, unggah foto, dan atur visibilitas untuk storefront.
            </p>
          </div>
          <Link href="/admin/products" className="rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
            Batal
          </Link>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#F1DCE8] bg-white p-6 shadow-[0_16px_45px_rgba(45,27,46,0.06)]">
        {errorMessage ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#2D1B2E]">Nama produk</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-2xl border border-[#F1DCE8] bg-[#FFF8FC] px-4 py-3 text-sm outline-none transition focus:border-[#D77FA1]"
                placeholder="Contoh: Donat Matcha"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2D1B2E]">Kategori</label>
              <select
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                className="w-full rounded-2xl border border-[#F1DCE8] bg-[#FFF8FC] px-4 py-3 text-sm outline-none transition focus:border-[#D77FA1]"
                required
              >
                <option value="">Pilih kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2D1B2E]">Deskripsi</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="min-h-28 w-full rounded-2xl border border-[#F1DCE8] bg-[#FFF8FC] px-4 py-3 text-sm outline-none transition focus:border-[#D77FA1]"
                placeholder="Ceritakan keunggulan produk"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2D1B2E]">Label harga</label>
              <input
                value={priceLabel}
                onChange={(event) => setPriceLabel(event.target.value)}
                className="w-full rounded-2xl border border-[#F1DCE8] bg-[#FFF8FC] px-4 py-3 text-sm outline-none transition focus:border-[#D77FA1]"
                placeholder="12 pcs - Rp 60.000"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#2D1B2E]">Foto produk</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full rounded-2xl border border-dashed border-[#F1DCE8] bg-[#FFF8FC] px-4 py-3 text-sm text-[#6B4C5E] file:mr-3 file:rounded-full file:border-0 file:bg-[#D77FA1] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
              />

              {previewUrl ? (
                <div className="mt-4 overflow-hidden rounded-[24px] border border-[#F1DCE8]">
                  <Image src={previewUrl} alt="Preview produk" width={600} height={400} className="h-56 w-full object-cover" />
                </div>
              ) : (
                <div className="mt-4 flex h-56 items-center justify-center rounded-[24px] border border-dashed border-[#F1DCE8] bg-[#FFF8FC] text-sm text-[#6B4C5E]">
                  Preview foto akan muncul di sini
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2D1B2E]">Tag</label>
              <div className="space-y-3">
                <input
                  value={tagLabel}
                  onChange={(event) => setTagLabel(event.target.value)}
                  className="w-full rounded-2xl border border-[#F1DCE8] bg-[#FFF8FC] px-4 py-3 text-sm outline-none transition focus:border-[#D77FA1]"
                  placeholder="Contoh: Best Seller"
                />
                <div className="flex flex-wrap gap-2">
                  {tagColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setTagColor(color)}
                      className={`h-9 w-9 rounded-full border-2 ${tagColor === color ? 'border-[#2D1B2E]' : 'border-white'}`}
                      style={{ backgroundColor: color }}
                      aria-label={`Pilih warna ${color}`}
                    />
                  ))}
                </div>
                <div className="rounded-2xl border border-[#F1DCE8] bg-[#FFF8FC] px-4 py-3">
                  <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-white" style={previewStyle}>
                    {tagLabel || 'Tag preview'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 rounded-[24px] border border-[#F1DCE8] bg-[#FFF8FC] p-5 md:grid-cols-3">
          <label className="flex items-center justify-between rounded-2xl border border-[#F1DCE8] bg-white px-4 py-3 text-sm font-medium text-[#2D1B2E]">
            <span>Tampilkan di website</span>
            <input
              type="checkbox"
              checked={isVisible}
              onChange={(event) => setIsVisible(event.target.checked)}
              className="h-4 w-4 rounded border-[#F1DCE8] text-[#D77FA1] focus:ring-[#D77FA1]"
            />
          </label>

          <label className="flex items-center justify-between rounded-2xl border border-[#F1DCE8] bg-white px-4 py-3 text-sm font-medium text-[#2D1B2E]">
            <span>Tampilkan di homepage</span>
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(event) => setIsFeatured(event.target.checked)}
              className="h-4 w-4 rounded border-[#F1DCE8] text-[#D77FA1] focus:ring-[#D77FA1]"
            />
          </label>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#2D1B2E]">Sort order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="w-full rounded-2xl border border-[#F1DCE8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D77FA1]"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-[#D77FA1] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C8668F] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Produk'}
          </button>
          <Link href="/admin/products" className="rounded-full border border-[#F1DCE8] px-5 py-3 text-sm font-semibold text-[#6B4C5E] transition hover:bg-[#FFF8FC]">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
