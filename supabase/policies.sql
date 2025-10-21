-- =========================================================
-- Bluecrew – Security Policies (RLS & Storage)
-- Idempotent: kan kjøres flere ganger uten feil
-- =========================================================

-- 0) Storage bucket: sørg for at 'candidates-private' finnes og er privat
insert into storage.buckets (id, name, public)
values ('candidates-private', 'candidates-private', false)
on conflict (id) do update set public = excluded.public;

-- 1) RLS for tabellene vi bruker
alter table if exists public.candidates enable row level security;
alter table if exists public.leads      enable row level security;

-- 1a) Dropp ALLE policies på candidates/leads (idempotent)
do $$
declare
  r record;
begin
  for r in
    select policyname, tablename
    from pg_policies
    where schemaname = 'public'
      and tablename in ('candidates','leads')
  loop
    execute format('drop policy if exists %I on public.%I', r.policyname, r.tablename);
  end loop;
end $$;

-- Ingen allow-policies = ingen klienttilgang.
-- (Service role på serveren bypasser RLS automatisk)

-- Valgfritt (dokumenterende) – bare hvis du vil synliggjøre service_role:
-- create policy "service_role_full_candidates" on public.candidates
--   for all to service_role using (true) with check (true);
-- create policy "service_role_full_leads" on public.leads
--   for all to service_role using (true) with check (true);

-- 2) Storage-objekter: RLS + dropp policies
alter table if exists storage.objects enable row level security;

do $$
declare
  r record;
begin
  for r in
    select policyname
    from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
  loop
    execute format('drop policy if exists %I on storage.objects', r.policyname);
  end loop;
end $$;

-- Valgfritt (dokumenterende):
-- create policy "service_role_storage_full" on storage.objects
--   for all to service_role using (true) with check (true);

-- =========================================================
-- Verifikasjon (kjør under i SQL Editor etterpå)
-- 1) Bucket er privat
--   select id, name, public from storage.buckets where id='candidates-private';
-- 2) RLS er aktiv
--   select relname as table, relrowsecurity
--   from pg_class c join pg_namespace n on n.oid=c.relnamespace
--   where n.nspname='public' and relname in ('candidates','leads');
-- 3) Ingen åpne policies
--   select schemaname, tablename, policyname, cmd, roles
--   from pg_policies
--   where (schemaname='public' and tablename in ('candidates','leads'))
--      or (schemaname='storage' and tablename='objects');
-- =========================================================
