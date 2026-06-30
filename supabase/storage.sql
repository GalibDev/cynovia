insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'bizmart-images',
  'bizmart-images',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Allow public BizMart image reads" on storage.objects;

create policy "Allow public BizMart image reads"
on storage.objects
for select
to anon
using (bucket_id = 'bizmart-images');
