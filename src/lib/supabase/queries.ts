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

export async function getAdminDashboardData() {
  const supabase = await createServerSupabaseClient();

  const [categoriesResult, productsResult, featuredResult, recentProductsResult] = await Promise.all([
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_visible', true),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_visible', true).eq('is_featured', true),
    supabase
      .from('products')
      .select('id, name, price_label, is_visible, is_featured, created_at, category:categories(name)')
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  if (categoriesResult.error) {
    throw categoriesResult.error;
  }

  if (productsResult.error) {
    throw productsResult.error;
  }

  if (featuredResult.error) {
    throw featuredResult.error;
  }

  if (recentProductsResult.error) {
    throw recentProductsResult.error;
  }

  const recentProducts = (recentProductsResult.data ?? []).map((product) => {
    const categoryValue = Array.isArray(product.category) ? product.category[0] ?? null : product.category;

    return {
      id: product.id,
      name: product.name,
      price_label: product.price_label,
      is_visible: product.is_visible,
      is_featured: product.is_featured,
      created_at: product.created_at,
      category: categoryValue ? { name: categoryValue.name } : null,
    };
  });

  return {
    totalCategories: categoriesResult.count ?? 0,
    totalActiveProducts: productsResult.count ?? 0,
    totalFeaturedProducts: featuredResult.count ?? 0,
    recentProducts,
  };
}
