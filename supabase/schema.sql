create extension if not exists "pgcrypto";

drop table if exists public.products;
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

create index products_category_id_idx on public.products(category_id);
create index products_sort_order_idx on public.products(sort_order asc);
create index products_created_at_idx on public.products(created_at desc);

alter table public.categories enable row level security;
alter table public.products enable row level security;

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
