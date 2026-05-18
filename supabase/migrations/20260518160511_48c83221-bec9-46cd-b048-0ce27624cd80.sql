
-- Lock down orders & briefs: only service role. App reads/writes via server functions.
drop policy if exists "Public can read order by session id" on public.orders;
drop policy if exists "Public can insert brief" on public.briefs;
drop policy if exists "Public can read brief" on public.briefs;

-- Harden function search_path
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
