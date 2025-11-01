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

-- 1b) Kandidatinteresse-tabell (lettvekts innsamling)
create table if not exists public.candidate_interest (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  role text not null,
  region text,
  experience int,
  certificates text,
  notes text,
  start_from text,
  source text,
  ip text,
  user_agent text,
  consent boolean not null default true,
  honey text default ''
);
alter table if exists public.candidate_interest enable row level security;

-- 1a) Dropp ALLE policies på candidates/leads (idempotent)
do $$
declare
  r record;
begin
  for r in
    select policyname, tablename
    from pg_policies
    where schemaname = 'public'
      and tablename in ('candidates','leads','candidate_interest')
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

-- 2) Storage-objekter: RLS + dropp policies (valgfritt)
-- Merk: På Supabase er `storage.objects` eid av en intern rolle. Forsøk på å
-- endre RLS/policies kan feile med "must be owner of table objects". Vi pakker
-- derfor dette i try/catch og hopper over hvis vi ikke har privilegier.
do $$
declare
  r record;
begin
  begin
    execute 'alter table if exists storage.objects enable row level security';
  exception when insufficient_privilege then
    raise notice 'Skip: mangler privilegier for å endre RLS på storage.objects';
  when others then
    raise notice 'Skip: kunne ikke endre RLS på storage.objects (%).', SQLERRM;
  end;

  begin
    for r in
      select policyname
      from pg_policies
      where schemaname = 'storage' and tablename = 'objects'
    loop
      begin
        execute format('drop policy if exists %I on storage.objects', r.policyname);
      exception when insufficient_privilege then
        raise notice 'Skip: mangler privilegier for å droppe policy % på storage.objects', r.policyname;
      when others then
        raise notice 'Skip: kunne ikke droppe policy % på storage.objects (%).', r.policyname, SQLERRM;
      end;
    end loop;
  exception when others then
    raise notice 'Skip: policy-iterasjon på storage.objects feilet (%).', SQLERRM;
  end;
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
--   where n.nspname='public' and relname in ('candidates','leads','candidate_interest');
-- 3) Ingen åpne policies
--   select schemaname, tablename, policyname, cmd, roles
--   from pg_policies
--   where (schemaname='public' and tablename in ('candidates','leads','candidate_interest'))
--      or (schemaname='storage' and tablename='objects');
-- =========================================================
