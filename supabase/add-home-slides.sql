create table if not exists public.home_slides (
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

create index if not exists home_slides_sort_order_idx
on public.home_slides(sort_order asc);

alter table public.home_slides enable row level security;

drop policy if exists "Allow public home slide reads" on public.home_slides;

create policy "Allow public home slide reads"
on public.home_slides
for select
to anon
using (true);
