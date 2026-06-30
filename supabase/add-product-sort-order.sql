alter table public.products
add column if not exists sort_order integer not null default 0;

create index if not exists products_sort_order_idx
on public.products(sort_order asc);

with ordered_products as (
  select
    id,
    row_number() over (order by created_at desc, name asc) as row_number
  from public.products
)
update public.products
set sort_order = ordered_products.row_number
from ordered_products
where public.products.id = ordered_products.id
  and public.products.sort_order = 0;
