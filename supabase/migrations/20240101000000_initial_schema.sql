create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  name text not null,
  slug text not null unique,
  description text,
  price_label text,
  is_visible boolean not null default true,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  is_primary boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

create table if not exists public.product_tags (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  label text not null,
  color_class text not null,
  created_at timestamptz default now()
);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_tags enable row level security;

create policy "public read categories"
  on public.categories
  for select
  to anon, authenticated
  using (true);

create policy "admin insert categories"
  on public.categories
  for insert
  to authenticated
  with check (true);

create policy "admin update categories"
  on public.categories
  for update
  to authenticated
  using (true)
  with check (true);

create policy "admin delete categories"
  on public.categories
  for delete
  to authenticated
  using (true);

create policy "public read products"
  on public.products
  for select
  to anon, authenticated
  using (true);

create policy "admin insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

create policy "admin update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

create policy "admin delete products"
  on public.products
  for delete
  to authenticated
  using (true);

create policy "public read product_images"
  on public.product_images
  for select
  to anon, authenticated
  using (true);

create policy "admin insert product_images"
  on public.product_images
  for insert
  to authenticated
  with check (true);

create policy "admin update product_images"
  on public.product_images
  for update
  to authenticated
  using (true)
  with check (true);

create policy "admin delete product_images"
  on public.product_images
  for delete
  to authenticated
  using (true);

create policy "public read product_tags"
  on public.product_tags
  for select
  to anon, authenticated
  using (true);

create policy "admin insert product_tags"
  on public.product_tags
  for insert
  to authenticated
  with check (true);

create policy "admin update product_tags"
  on public.product_tags
  for update
  to authenticated
  using (true)
  with check (true);

create policy "admin delete product_tags"
  on public.product_tags
  for delete
  to authenticated
  using (true);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_categories
before update on public.categories
for each row
execute function public.set_updated_at();

create trigger set_updated_at_products
before update on public.products
for each row
execute function public.set_updated_at();
