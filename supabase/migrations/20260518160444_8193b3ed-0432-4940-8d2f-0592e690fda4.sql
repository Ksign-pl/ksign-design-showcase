
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  stripe_customer_id text,
  customer_email text,
  customer_name text,
  price_id text not null,
  product_name text not null,
  amount_cents integer not null,
  currency text not null default 'pln',
  status text not null default 'paid',
  environment text not null default 'sandbox',
  brief_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_orders_session on public.orders(stripe_session_id);
create index idx_orders_email on public.orders(customer_email);
create index idx_orders_created on public.orders(created_at desc);

alter table public.orders enable row level security;

-- Public can look up a single order by session id (needed for /checkout/return + /brief pages, no login).
-- Exposes only what the customer already knows (their own session id from URL).
create policy "Public can read order by session id"
  on public.orders for select
  to anon, authenticated
  using (true);

-- Only service role (webhooks, server-side admin) writes.
create policy "Service role manages orders"
  on public.orders for all
  to service_role
  using (true) with check (true);

create table public.briefs (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  company_name text,
  industry text,
  goals text,
  brand_colors text,
  content_notes text,
  logo_url text,
  inspirations text,
  phone text,
  created_at timestamptz not null default now()
);

create unique index idx_briefs_order on public.briefs(order_id);

alter table public.briefs enable row level security;

-- Public can insert a brief tied to an existing order id (validated by knowing session id → order id).
create policy "Public can insert brief"
  on public.briefs for insert
  to anon, authenticated
  with check (true);

create policy "Public can read brief"
  on public.briefs for select
  to anon, authenticated
  using (true);

create policy "Service role manages briefs"
  on public.briefs for all
  to service_role
  using (true) with check (true);

-- updated_at trigger for orders
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();
