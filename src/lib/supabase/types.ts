export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type CategoriesRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type CategoriesInsert = {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  sort_order?: number;
  is_visible?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
};

export type CategoriesUpdate = {
  id?: string;
  name?: string;
  slug?: string;
  description?: string | null;
  sort_order?: number;
  is_visible?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
};

export type ProductsRow = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  price_label: string | null;
  is_visible: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string | null;
  updated_at: string | null;
};

export type ProductsInsert = {
  id?: string;
  category_id: string;
  name: string;
  slug: string;
  description?: string | null;
  price_label?: string | null;
  is_visible?: boolean;
  is_featured?: boolean;
  sort_order?: number;
  created_at?: string | null;
  updated_at?: string | null;
};

export type ProductsUpdate = {
  id?: string;
  category_id?: string;
  name?: string;
  slug?: string;
  description?: string | null;
  price_label?: string | null;
  is_visible?: boolean;
  is_featured?: boolean;
  sort_order?: number;
  created_at?: string | null;
  updated_at?: string | null;
};

export type ProductImagesRow = {
  id: string;
  product_id: string;
  storage_path: string;
  alt_text: string | null;
  is_primary: boolean;
  sort_order: number;
  created_at: string | null;
};

export type ProductImagesInsert = {
  id?: string;
  product_id: string;
  storage_path: string;
  alt_text?: string | null;
  is_primary?: boolean;
  sort_order?: number;
  created_at?: string | null;
};

export type ProductImagesUpdate = {
  id?: string;
  product_id?: string;
  storage_path?: string;
  alt_text?: string | null;
  is_primary?: boolean;
  sort_order?: number;
  created_at?: string | null;
};

export type ProductTagsRow = {
  id: string;
  product_id: string;
  label: string;
  color_class: string;
  created_at: string | null;
};

export type ProductTagsInsert = {
  id?: string;
  product_id: string;
  label: string;
  color_class: string;
  created_at?: string | null;
};

export type ProductTagsUpdate = {
  id?: string;
  product_id?: string;
  label?: string;
  color_class?: string;
  created_at?: string | null;
};

export type ProductWithRelations = ProductsRow & {
  category: CategoriesRow | null;
  product_images: ProductImagesRow[];
  product_tags: ProductTagsRow[];
};

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: CategoriesRow;
        Insert: CategoriesInsert;
        Update: CategoriesUpdate;
        Relationships: [];
      };
      products: {
        Row: ProductsRow;
        Insert: ProductsInsert;
        Update: ProductsUpdate;
        Relationships: [
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      product_images: {
        Row: ProductImagesRow;
        Insert: ProductImagesInsert;
        Update: ProductImagesUpdate;
        Relationships: [
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
        ];
      };
      product_tags: {
        Row: ProductTagsRow;
        Insert: ProductTagsInsert;
        Update: ProductTagsUpdate;
        Relationships: [
          {
            foreignKeyName: 'product_tags_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
