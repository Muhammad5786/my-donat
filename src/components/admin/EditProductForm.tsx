'use client';

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import { deleteProductAction, updateProductAction } from '@/lib/supabase/product-actions';

const tagColors = ['#D77FA1', '#A07898', '#b5a0d8', '#6B4C5E'];

type CategoryOption = {
  id: string;
  name: string;
};

type ExistingImage = {
  id: string;
  storage_path: string;
  alt_text: string | null;
  is_primary: boolean;
};

export default function EditProductForm() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const productId = params?.id;

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
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!productId) {
        return;
      }

      const supabase = createClient();
      const [{ data: productData, error: productError }, { data: categoriesData, error: categoriesError }] = await Promise.all([
        supabase.from('products').select('id, name, category_id, description, price_label, is_visible, is_featured, sort_order').eq('id', productId).single(),
        supabase.from('categories').select('id, name').order('sort_order', { ascending: true }),
      ]);

      if (productError || !productData) {
        setErrorMessage('Produk tidak ditemukan.');
        return;
      }

      if (!categoriesError && categoriesData) {
        setCategories(categoriesData as CategoryOption[]);
      }

      const { data: imagesData } = await supabase
        .from('product_images')
        .select('id, storage_path, alt_text, is_primary')
        .eq('product_id', productId)
        .order('sort_order', { ascending: true });

      const { data: tagsData } = await supabase
        .from('product_tags')
        .select('id, label, color_class')
        .eq('product_id', productId)
        .order('created_at', { ascending: true });

      setName(productData.name ?? '');
      setCategoryId(productData.category_id ?? '');
      setDescription(productData.description ?? '');
      setPriceLabel(productData.price_label ?? '');
      setIsVisible(Boolean(productData.is_visible));
      setIsFeatured(Boolean(productData.is_featured));
      setSortOrder(String(productData.sort_order ?? 0));
      setExistingImages((imagesData ?? []) as ExistingImage[]);

      if (tagsData?.[0]) {
        setTagLabel(tagsData[0].label ?? '');
        setTagColor(tagsData[0].color_class || tagColors[0]);
      }
    }

    void loadData();
  }, [productId]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const previewStyle = useMemo(() => ({ backgroundColor: tagColor }), [tagColor]);

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
      const formData = new FormData();
      formData.set('id', productId ?? '');
      formData.set('name', name.trim());
      formData.set('category_id', categoryId);
      formData.set('description', description.trim());
      formData.set('price_label', priceLabel.trim());
      formData.set('tag_label', tagLabel.trim());
      formData.set('tag_color', tagColor);
      formData.set('is_visible', String(isVisible));
      formData.set('is_featured', String(isFeatured));
      formData.set('sort_order', sortOrder);

      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop() ?? 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const { data, error } = await supabase.storage.from('product-images').upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });

        if (error) {
          throw new Error(error.message || 'Gagal mengunggah foto baru.');
        }

        formData.set('storage_path', data?.path ?? '');
      }

      await updateProductAction(formData);
      router.push('/admin/products');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal memperbarui produk.');
      setIsSubmitting(false);
    }
  }

  async function handleRemoveExistingImage(storagePath: string, imageId: string) {
    const supabase = createClient();
    const { error } = await supabase.storage.from('product-images').remove([storagePath]);

    if (!error) {
      await supabase.from('product_images').delete().eq('id', imageId);
      setExistingImages((current) => current.filter((image) => image.id !== imageId));
    }
  }

  async function handleDeleteProduct() {
    if (!productId || !window.confirm('Hapus produk ini?')) {
      return;
    }

    const formData = new FormData();
    formData.set('id', productId);
    await deleteProductAction(formData);
    router.push('/admin/products');
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
            <h1 className="mt-3 text-3xl font-semibold text-white">Edit produk</h1>
            <p className="mt-3 text-sm text-pink-100/80">Perbarui detail produk, foto, dan status tampilannya.</p>
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
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2D1B2E]">Label harga</label>
              <input
                value={priceLabel}
                onChange={(event) => setPriceLabel(event.target.value)}
                className="w-full rounded-2xl border border-[#F1DCE8] bg-[#FFF8FC] px-4 py-3 text-sm outline-none transition focus:border-[#D77FA1]"
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

              {existingImages.length > 0 ? (
                <div className="mt-4 grid gap-3">
                  {existingImages.map((image) => (
                    <div key={image.id} className="overflow-hidden rounded-[24px] border border-[#F1DCE8] bg-[#FFF8FC] p-3">
                      <div className="relative h-40 w-full overflow-hidden rounded-[18px]">
                        <Image
                          src={createClient().storage.from('product-images').getPublicUrl(image.storage_path).data.publicUrl}
                          alt={image.alt_text ?? 'Foto produk'}
                          fill
                          sizes="(max-width: 640px) 100vw, 320px"
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => void handleRemoveExistingImage(image.storage_path, image.id)}
                        className="mt-3 rounded-full border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Hapus Foto
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}

              {previewUrl ? (
                <div className="mt-4 overflow-hidden rounded-[24px] border border-[#F1DCE8]">
                  <Image src={previewUrl} alt="Preview produk" width={600} height={400} className="h-56 w-full object-cover" />
                </div>
              ) : null}
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
            {isSubmitting ? 'Menyimpan...' : 'Update Produk'}
          </button>
          <Link href="/admin/products" className="rounded-full border border-[#F1DCE8] px-5 py-3 text-sm font-semibold text-[#6B4C5E] transition hover:bg-[#FFF8FC]">
            Batal
          </Link>
          <button
            type="button"
            onClick={() => void handleDeleteProduct()}
            className="rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Hapus Produk
          </button>
        </div>
      </form>
    </div>
  );
}
