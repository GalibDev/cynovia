create extension if not exists "pgcrypto";

drop table if exists public.products;
drop table if exists public.home_slides;
drop table if exists public.categories;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order integer not null default 0
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order integer not null default 0,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.home_slides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  badge text,
  image_url text,
  primary_label text not null default 'Explore Products',
  primary_href text not null default '/categories',
  secondary_label text,
  secondary_href text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index products_category_id_idx on public.products(category_id);
create index products_sort_order_idx on public.products(sort_order asc);
create index products_created_at_idx on public.products(created_at desc);
create index home_slides_sort_order_idx on public.home_slides(sort_order asc);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.home_slides enable row level security;

create policy "Allow public category reads"
on public.categories
for select
to anon
using (true);

create policy "Allow public product reads"
on public.products
for select
to anon
using (true);

create policy "Allow public home slide reads"
on public.home_slides
for select
to anon
using (true);
