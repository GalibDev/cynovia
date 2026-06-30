insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cynovia-images',
  'cynovia-images',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Allow public CYNOVIA image reads" on storage.objects;

create policy "Allow public CYNOVIA image reads"
on storage.objects
for select
to anon
using (bucket_id = 'cynovia-images');
