-- Ksign Demo Generator — dema klienckie, historia zdarzeń, storage na loga.
-- Doradca widzi wyłącznie swoje dema; administrator wszystkie.

create type public.demo_status as enum ('draft', 'sent', 'paid', 'expired');

create table public.demos (
  id uuid primary key default gen_random_uuid(),
  advisor_id uuid not null references auth.users (id) on delete cascade,
  advisor_name text,
  slug text not null unique,
  company_name text not null,
  main_service text not null,
  target_audience text not null,
  city text not null,
  client_email text not null,
  site_type text not null
    check (site_type in ('local', 'b2b', 'beauty', 'construction', 'gastro', 'realestate')),
  package_id text not null
    check (package_id in ('start', 'business', 'premium', 'ecommerce')),
  brand_color text,
  logo_url text,
  -- Wygenerowane przez AI treści (DemoContent) — null dopóki doradca nie kliknie „Generuj treści demo".
  content jsonb,
  status public.demo_status not null default 'draft',
  generated_at timestamptz,
  sent_at timestamptz,
  paid_at timestamptz,
  expired_at timestamptz,
  -- Okno życia publicznego linku: 72h aktywne, do 30 dni ekran „Oferta wygasła", potem 404.
  expires_at timestamptz,
  purge_after timestamptz,
  stripe_session_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index demos_advisor_id_idx on public.demos (advisor_id, created_at desc);
create index demos_status_expires_idx on public.demos (status, expires_at);

create trigger demos_set_updated_at
  before update on public.demos
  for each row execute function public.set_updated_at();

alter table public.demos enable row level security;

create policy "Advisors can view own demos"
  on public.demos for select
  to authenticated
  using (advisor_id = auth.uid() or public.has_role(auth.uid(), 'admin'::app_role));

create policy "Advisors can create own demos"
  on public.demos for insert
  to authenticated
  with check (advisor_id = auth.uid());

create policy "Advisors can update own demos"
  on public.demos for update
  to authenticated
  using (advisor_id = auth.uid() or public.has_role(auth.uid(), 'admin'::app_role))
  with check (advisor_id = auth.uid() or public.has_role(auth.uid(), 'admin'::app_role));

create policy "Advisors can delete own demos"
  on public.demos for delete
  to authenticated
  using (advisor_id = auth.uid() or public.has_role(auth.uid(), 'admin'::app_role));

create policy "Service role manages demos"
  on public.demos for all
  to service_role
  using (true)
  with check (true);

-- Historia zdarzeń: wygenerowanie, wysłanie, wejście na demo, płatność, wygaszenie
-- (+ błędy integracji dla diagnostyki). Zapis wyłącznie server-side (service role).
create table public.demo_events (
  id uuid primary key default gen_random_uuid(),
  demo_id uuid not null references public.demos (id) on delete cascade,
  event_type text not null
    check (event_type in ('generated', 'sent', 'visited', 'paid', 'expired', 'sheets_error', 'email_error')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index demo_events_demo_id_idx on public.demo_events (demo_id, created_at desc);

alter table public.demo_events enable row level security;

create policy "Advisors can view own demo events"
  on public.demo_events for select
  to authenticated
  using (
    exists (
      select 1 from public.demos d
      where d.id = demo_events.demo_id
        and (d.advisor_id = auth.uid() or public.has_role(auth.uid(), 'admin'::app_role))
    )
  );

create policy "Service role manages demo events"
  on public.demo_events for all
  to service_role
  using (true)
  with check (true);

-- Bucket na loga klientów — publiczny odczyt (logo wyświetla się na publicznej
-- stronie demo), zapis tylko do własnego folderu (<user_id>/...).
insert into storage.buckets (id, name, public)
values ('demo-logos', 'demo-logos', true)
on conflict (id) do nothing;

create policy "Public can read demo logos"
  on storage.objects for select
  using (bucket_id = 'demo-logos');

create policy "Advisors can upload own demo logos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'demo-logos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Advisors can update own demo logos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'demo-logos' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'demo-logos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Advisors can delete own demo logos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'demo-logos' and (storage.foldername(name))[1] = auth.uid()::text);
