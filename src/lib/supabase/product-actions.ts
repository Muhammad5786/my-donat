'use server';

import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from './server';

export async function createProductAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const name = formData.get('name')?.toString().trim() ?? '';
  const categoryId = formData.get('category_id')?.toString().trim() ?? '';
  const description = formData.get('description')?.toString().trim() ?? '';
  const priceLabel = formData.get('price_label')?.toString().trim() ?? '';
  const tagLabel = formData.get('tag_label')?.toString().trim() ?? '';
  const tagColor = formData.get('tag_color')?.toString().trim() ?? '';
  const isVisible = formData.get('is_visible') === 'true';
  const isFeatured = formData.get('is_featured') === 'true';
  const sortOrder = Number(formData.get('sort_order') ?? 0);
  const storagePath = formData.get('storage_path')?.toString().trim() ?? '';

  if (!name || !categoryId) {
    redirect('/admin/products?error=' + encodeURIComponent('Nama produk dan kategori wajib diisi.'));
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const { data: insertedProduct, error: insertError } = await supabase
    .from('products')
    .insert({
      name,
      slug,
      category_id: categoryId,
      description: description || null,
      price_label: priceLabel || null,
      is_visible: isVisible,
      is_featured: isFeatured,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    })
    .select('id')
    .single();

  if (insertError || !insertedProduct) {
    redirect('/admin/products?error=' + encodeURIComponent(insertError?.message ?? 'Gagal membuat produk.'));
  }

  if (storagePath) {
    const { error: imageError } = await supabase.from('product_images').insert({
      product_id: insertedProduct.id,
      storage_path: storagePath,
      alt_text: name,
      is_primary: true,
      sort_order: 0,
    });

    if (imageError) {
      redirect('/admin/products?error=' + encodeURIComponent(imageError.message));
    }
  }

  if (tagLabel) {
    const { error: tagError } = await supabase.from('product_tags').insert({
      product_id: insertedProduct.id,
      label: tagLabel,
      color_class: tagColor || '#D77FA1',
    });

    if (tagError) {
      redirect('/admin/products?error=' + encodeURIComponent(tagError.message));
    }
  }

  redirect('/admin/products');
}

export async function toggleProductVisibilityAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const id = formData.get('id')?.toString();
  const visible = formData.get('visible')?.toString() === 'true';

  if (!id) {
    redirect('/admin/products?error=' + encodeURIComponent('Produk tidak ditemukan.'));
  }

  const { error } = await supabase.from('products').update({ is_visible: !visible }).eq('id', id);

  if (error) {
    redirect('/admin/products?error=' + encodeURIComponent(error.message));
  }

  redirect('/admin/products');
}

export async function updateProductAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const id = formData.get('id')?.toString();
  const name = formData.get('name')?.toString().trim() ?? '';
  const categoryId = formData.get('category_id')?.toString().trim() ?? '';
  const description = formData.get('description')?.toString().trim() ?? '';
  const priceLabel = formData.get('price_label')?.toString().trim() ?? '';
  const tagLabel = formData.get('tag_label')?.toString().trim() ?? '';
  const tagColor = formData.get('tag_color')?.toString().trim() ?? '';
  const isVisible = formData.get('is_visible') === 'true';
  const isFeatured = formData.get('is_featured') === 'true';
  const sortOrder = Number(formData.get('sort_order') ?? 0);
  const storagePath = formData.get('storage_path')?.toString().trim() ?? '';

  if (!id || !name || !categoryId) {
    redirect('/admin/products?error=' + encodeURIComponent('Nama produk dan kategori wajib diisi.'));
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const { error: updateError } = await supabase.from('products').update({
    name,
    slug,
    category_id: categoryId,
    description: description || null,
    price_label: priceLabel || null,
    is_visible: isVisible,
    is_featured: isFeatured,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
  }).eq('id', id);

  if (updateError) {
    redirect('/admin/products?error=' + encodeURIComponent(updateError.message));
  }

  if (storagePath) {
    const { error: imageError } = await supabase.from('product_images').insert({
      product_id: id,
      storage_path: storagePath,
      alt_text: name,
      is_primary: false,
      sort_order: 0,
    });

    if (imageError) {
      redirect('/admin/products?error=' + encodeURIComponent(imageError.message));
    }
  }

  const existingTags = await supabase.from('product_tags').select('id').eq('product_id', id);

  if (tagLabel) {
    if (existingTags.data?.[0]?.id) {
      const { error: tagUpdateError } = await supabase.from('product_tags').update({
        label: tagLabel,
        color_class: tagColor || '#D77FA1',
      }).eq('id', existingTags.data[0].id);

      if (tagUpdateError) {
        redirect('/admin/products?error=' + encodeURIComponent(tagUpdateError.message));
      }
    } else {
      const { error: tagInsertError } = await supabase.from('product_tags').insert({
        product_id: id,
        label: tagLabel,
        color_class: tagColor || '#D77FA1',
      });

      if (tagInsertError) {
        redirect('/admin/products?error=' + encodeURIComponent(tagInsertError.message));
      }
    }
  }

  redirect('/admin/products');
}

export async function deleteProductAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const id = formData.get('id')?.toString();

  if (!id) {
    redirect('/admin/products?error=' + encodeURIComponent('Produk tidak ditemukan.'));
  }

  const { data: images } = await supabase.from('product_images').select('storage_path').eq('product_id', id);

  if (images?.length) {
    const storagePaths = images.map((image) => image.storage_path).filter(Boolean);
    if (storagePaths.length) {
      await supabase.storage.from('product-images').remove(storagePaths);
    }
  }

  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    redirect('/admin/products?error=' + encodeURIComponent(error.message));
  }

  redirect('/admin/products');
}
