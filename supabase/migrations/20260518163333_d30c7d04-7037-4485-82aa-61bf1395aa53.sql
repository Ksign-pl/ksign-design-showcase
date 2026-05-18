
create table public.email_resend_attempts (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null,
  email_type text not null default 'order-confirmation',
  recipient_email text,
  status text not null check (status in ('pending','sent','error')),
  error_message text,
  idempotency_key text,
  created_at timestamptz not null default now()
);

create index email_resend_attempts_order_id_idx on public.email_resend_attempts (order_id, created_at desc);

alter table public.email_resend_attempts enable row level security;

create policy "Service role manages resend attempts"
  on public.email_resend_attempts
  for all
  to service_role
  using (true)
  with check (true);

create policy "Admins can view resend attempts"
  on public.email_resend_attempts
  for select
  to authenticated
  using (has_role(auth.uid(), 'admin'::app_role));
