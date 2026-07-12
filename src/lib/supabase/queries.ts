'use server';

import { createServerSupabaseClient } from './server';
import type { CategoriesRow, ProductWithRelations } from './types';

export type CategoryWithProducts = CategoriesRow & {
  products: ProductWithRelations[];
};

export async function getCategories(): Promise<CategoryWithProducts[]> {
  const supabase = await createServerSupabaseClient();

  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true });

  if (categoriesError) {
    throw categoriesError;
  }

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*, category:categories(*), product_images(*), product_tags(*)')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true });

  if (productsError) {
    throw productsError;
  }

  const productsByCategory = new Map<string, ProductWithRelations[]>();

  for (const product of products ?? []) {
    const list = productsByCategory.get(product.category_id) ?? [];
    list.push(product as ProductWithRelations);
    productsByCategory.set(product.category_id, list);
  }

  return (categories ?? []).map((category) => ({
    ...category,
    products: productsByCategory.get(category.id) ?? [],
  }));
}

export async function getFeaturedProducts(): Promise<ProductWithRelations[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*), product_images(*), product_tags(*)')
    .eq('is_visible', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as ProductWithRelations[];
}

export async function getProductBySlug(slug: string): Promise<ProductWithRelations | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*), product_images(*), product_tags(*)')
    .eq('is_visible', true)
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as ProductWithRelations | null) ?? null;
}
