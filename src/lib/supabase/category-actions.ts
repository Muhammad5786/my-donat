'use server';

import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from './server';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export type CategoryFormPayload = {
  id?: string | null;
  name: string;
  slug: string;
  description: string;
  sort_order: string;
  is_visible: string;
};

export async function saveCategoryAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const id = formData.get('id')?.toString() ?? '';
  const name = formData.get('name')?.toString().trim() ?? '';
  const slug = (formData.get('slug')?.toString().trim() || slugify(name)).toLowerCase();
  const description = formData.get('description')?.toString().trim() ?? '';
  const sortOrder = Number(formData.get('sort_order')?.toString() ?? 0);
  const isVisible = formData.get('is_visible') === 'on';

  if (!name) {
    redirect('/admin/categories?error=' + encodeURIComponent('Nama kategori wajib diisi.'));
  }

  const payload = {
    name,
    slug,
    description: description || null,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    is_visible: isVisible,
  };

  if (id) {
    const { error } = await supabase.from('categories').update(payload).eq('id', id);

    if (error) {
      redirect('/admin/categories?error=' + encodeURIComponent(error.message));
    }
  } else {
    const { error } = await supabase.from('categories').insert(payload);

    if (error) {
      redirect('/admin/categories?error=' + encodeURIComponent(error.message));
    }
  }

  redirect('/admin/categories');
}

export async function deleteCategoryAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const id = formData.get('id')?.toString();

  if (!id) {
    redirect('/admin/categories?error=' + encodeURIComponent('Kategori tidak ditemukan.'));
  }

  const { error } = await supabase.from('categories').delete().eq('id', id);

  if (error) {
    redirect('/admin/categories?error=' + encodeURIComponent(error.message));
  }

  redirect('/admin/categories');
}
