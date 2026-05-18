insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'brief-assets',
  'brief-assets',
  false,
  10485760, -- 10 MB
  array[
    'image/jpeg','image/png','image/webp','image/gif','image/svg+xml',
    'application/pdf','text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip'
  ]
)
on conflict (id) do nothing;